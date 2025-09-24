let currentStep = 0;
let isAnimating = false;
let stepMode = false;
let isMuted = false;
let stepInProgress = false;

const steps = [
    {
        title: "Instruction Fetch: PC → MAR",
        description: "The Program Counter's address, 300H, is sent to the Memory Address Register to begin fetching the instruction.",
        components: ['pc', 'mar'],
        duration: 8000,
        transfer: true,
        data: '300H',
        from: 'pc',
        to: 'mar'
    },
    {
        title: "Memory Read: Memory → MDR",
        description: "The instruction at address 300H is retrieved from Memory and placed into the Memory Data Register.",
        components: ['memory', 'mdr'],
        duration: 8000,
        transfer: true,
        data: 'MOVE',
        from: 'memory',
        to: 'mdr'
    },
    {
        title: "Instruction Decode: MDR → IR",
        description: "The instruction moves to the Instruction Register, where the Control Unit decodes it as a MOVE operation.",
        components: ['mdr', 'ir', 'control-unit'],
        duration: 9000,
        transfer: true,
        data: 'MOVE',
        from: 'mdr',
        to: 'ir'
    },
    {
        title: "Execute: R2 → Bus → R1",
        description: "The content of register R2, which is 42H, travels via the internal bus and is copied into register R1.",
        components: ['r2', 'internal-bus', 'r1'],
        duration: 9000,
        transfer: true,
        data: '42H',
        path: ['r2', 'internal-bus', 'r1']
    }
];

// --- Audio Functions ---
function toggleAudio() {
    isMuted = !isMuted;
    const audioBtn = document.getElementById('audio-btn');
    audioBtn.innerHTML = isMuted ? '🔇 Audio OFF' : '🔊 Audio ON';
    if (isMuted) {
        speechSynthesis.cancel();
    }
}

function speak(text) {
    if (isMuted || !text) return;
    setTimeout(() => {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        speechSynthesis.speak(utterance);
    }, 100);
}

// --- Animation Logic ---

function animateDirectTransfer(stepInfo, hideAtEnd = true) {
    const box = document.getElementById('data-transfer-box');
    const fromEl = document.getElementById(stepInfo.from);
    const toEl = document.getElementById(stepInfo.to);
    const grid = document.getElementById('cpu-grid');

    if (!box || !fromEl || !toEl || !grid) return;

    const gridRect = grid.getBoundingClientRect();
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    box.textContent = stepInfo.data;
    
    setTimeout(() => {
        const startX = fromRect.left - gridRect.left + (fromRect.width - box.offsetWidth) / 2;
        const startY = fromRect.top - gridRect.top + (fromRect.height - box.offsetHeight) / 2;
        box.style.transition = 'none';
        box.style.left = `${startX}px`;
        box.style.top = `${startY}px`;
        box.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        const endX = toRect.left - gridRect.left + (toRect.width - box.offsetWidth) / 2;
        const endY = toRect.top - gridRect.top + (toRect.height - box.offsetHeight) / 2;
        box.style.transition = 'top 1.5s ease-in-out, left 1.5s ease-in-out, opacity 0.5s ease-in-out';
        box.style.left = `${endX}px`;
        box.style.top = `${endY}px`;
    }, 200);

    if (hideAtEnd) {
        setTimeout(() => {
            box.style.opacity = '0';
        }, 2000);
    }
}

function animateMultiStepTransfer(stepInfo) {
    animateDirectTransfer({ ...stepInfo, from: stepInfo.path[0], to: stepInfo.path[1] }, false);
    setTimeout(() => {
        animateDirectTransfer({ ...stepInfo, from: stepInfo.path[1], to: stepInfo.path[2] }, true);
    }, 2000);
}

function updateInstructionPanel(step) {
    const instructionText = document.getElementById('instruction-text');
    if (step >= 0 && step < steps.length) {
        const stepInfo = steps[step];
        instructionText.textContent = `Step ${step + 1}: ${stepInfo.title} - ${stepInfo.description}`;
        speak(stepInfo.description);
    }
}

function activateStep(stepNum) {
    document.querySelectorAll('.component').forEach(el => {
        el.classList.remove('active', 'pulsing', 'highlighted');
    });
    
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        if (index < stepNum) dot.classList.add('completed');
    });

    if (stepNum >= 0 && stepNum < steps.length) {
        document.getElementById(`step-${stepNum + 1}`).classList.add('active');
        
        const currentStepData = steps[stepNum];
        currentStepData.components.forEach(compId => {
            const element = document.getElementById(compId);
            if (element) {
                element.classList.add('active', 'pulsing');
            }
        });
        
        if (currentStepData.transfer) {
            if (currentStepData.path) {
                animateMultiStepTransfer(currentStepData);
            } else {
                animateDirectTransfer(currentStepData);
            }
        }

        if (stepNum === 3) {
            setTimeout(() => {
                const r1ValueEl = document.getElementById('r1-value');
                const r1El = document.getElementById('r1');
                if (r1ValueEl && r1El) {
                    r1ValueEl.textContent = '42H';
                    r1El.classList.add('highlighted');
                }
            }, 4000); 
        }

        updateInstructionPanel(stepNum);
    }
}

function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    stepMode = false;
    currentStep = 0;
    resetVisualElements();
    document.querySelector('.step-btn').disabled = true;
    
    function executeNextStep() {
        if (currentStep >= steps.length) {
            isAnimating = false;
            document.querySelector('.step-btn').disabled = false;
            completeExecution();
            return;
        }
        activateStep(currentStep);
        const stepDuration = steps[currentStep].duration;
        currentStep++;
        setTimeout(executeNextStep, stepDuration);
    }
    executeNextStep();
}

function stepAnimation() {
    if (stepInProgress || (isAnimating && !stepMode)) {
        return;
    }

    if (!stepMode) {
        stepMode = true;
        isAnimating = true; 
        currentStep = 0;
        resetVisualElements();
    }

    if (currentStep < steps.length) {
        stepInProgress = true;
        document.querySelector('.step-btn').disabled = true;
        document.querySelector('.start-btn').disabled = true;

        activateStep(currentStep);

        const currentStepDuration = steps[currentStep].duration;

        setTimeout(() => {
            stepInProgress = false;
            document.querySelector('.step-btn').disabled = false;
            
            if (currentStep >= steps.length - 1) {
                isAnimating = false;
                stepMode = false;
                document.querySelector('.start-btn').disabled = false;
                completeExecution();
            } else {
                currentStep++;
            }
        }, currentStepDuration);
    }
}


function resetAnimation() {
    isAnimating = false;
    stepMode = false;
    stepInProgress = false;
    currentStep = 0;
    speechSynthesis.cancel();
    
    document.querySelector('.step-btn').disabled = false;
    document.querySelector('.start-btn').disabled = false;
    
    resetVisualElements();
    
    const initialText = "Our CPU is ready to execute: MOVE R1, R2. This instruction will copy the contents of register R2 (42H) into register R1.";
    document.getElementById('instruction-text').textContent = initialText;
    speak(initialText);
}

function resetVisualElements() {
    document.querySelectorAll('.component, .step-dot').forEach(el => {
        el.classList.remove('active', 'pulsing', 'show', 'completed', 'highlighted');
    });
    
    const box = document.getElementById('data-transfer-box');
    if(box) box.style.opacity = '0';

    document.getElementById('r1-value').textContent = '00H';
}

function completeExecution() {
    const finalText = "✅ Execution complete! Register R1 now contains 42H. The instruction cycle is finished.";
    document.getElementById('instruction-text').textContent = finalText;
    speak(finalText);
    document.querySelectorAll('.component').forEach(el => el.classList.remove('pulsing'));
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    switch(e.key.toLowerCase()) {
        case ' ': e.preventDefault(); if (!isAnimating) startAnimation(); break;
        case 's': if(!document.querySelector('.step-btn').disabled) stepAnimation(); break;
        case 'r': resetAnimation(); break;
        case 'm': toggleAudio(); break;
    }
});

// Initialize on load
window.onload = resetAnimation;