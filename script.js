* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    height: 100vh; /* Make body fill the viewport height */
    overflow: hidden; /* Prevent scrolling on the page */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    background: #f8fafc;
    color: #1e293b;
}

.container {
    max-width: 1600px;
    height: 100%;
    margin: 0 auto;
    background: #ffffff;
    border-left: 1px solid #e2e8f0;
    border-right: 1px solid #e2e8f0;
    overflow: hidden;
    display: flex; /* Use flexbox to manage layout */
    flex-direction: column;
}

.header {
    background: #1e293b;
    color: white;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0; /* Prevent header from shrinking */
}

.header-left {
    display: flex;
    gap: 16px;
    align-items: center;
}

.scene-info, .student-info {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
}

.scene-info {
    background: #334155;
    color: #e2e8f0;
}

.student-info {
    background: #dc2626;
    color: white;
}

.student-info::before {
    content: "👤";
    font-size: 12px;
    margin-right: 6px;
}

/* NEW: Wrapper for the main content area */
.main-content-wrapper {
    display: grid;
    grid-template-columns: 2.5fr 1fr; /* 2.5 parts for CPU, 1 part for controls */
    gap: 20px;
    padding: 20px;
    flex-grow: 1; /* Allow this wrapper to fill available vertical space */
    overflow: hidden;
}

.cpu-grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: repeat(4, 1fr);
    gap: 12px;
    height: 100%; /* Make grid fill its container */
    position: relative;
}

.data-transfer-box {
    position: absolute;
    background: #ef4444;
    color: white;
    padding: 5px 10px;
    border-radius: 10px;
    font-family: 'VT323', monospace;
    font-size: 20px;
    font-weight: bold;
    z-index: 10;
    opacity: 0;
    pointer-events: none;
    transition: top 1.5s ease-in-out, left 1.5s ease-in-out, opacity 0.5s ease-in-out;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    text-align: center;
}

.component {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 600;
    color: #374151;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 10px;
    text-align: center;
    z-index: 1;
}

.component.active {
    border-color: #3b82f6;
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.pc {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border-color: #1d4ed8;
    position: relative;
}

.pc-value {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ef4444;
    color: white;
    padding: 4px 8px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 700;
    box-shadow: 0 2px 4px rgba(239, 68, 68, 0.25);
    font-family: 'VT323', monospace;
}

.control-unit {
    background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
    border-color: #6366f1;
    color: #4338ca;
    grid-row: span 2;
    font-size: 16px;
}

.registers {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border-color: #f59e0b;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    grid-row: span 2;
}

.register-row {
    display: flex;
    justify-content: space-around;
    gap: 8px;
    margin: 4px 0;
}

.register {
    flex: 1;
    background: white;
    border: 2px solid #d97706;
    border-radius: 8px;
    padding: 8px;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.register.highlighted {
    border-color: #dc2626;
    background: #fee2e2;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
}

.register-label {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #374151;
}

.register-value {
    font-size: 20px;
    font-weight: 700;
    color: white;
    background: #374151;
    padding: 4px 6px;
    border-radius: 5px;
    font-family: 'VT323', monospace;
}

.alu, .memory {
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    border-color: #64748b;
    color: #475569;
}

.flags {
    background: linear-gradient(135deg, #dcfce7, #bbf7d0);
    border-color: #16a34a;
    color: #15803d;
    padding: 8px;
}

.flag-item {
    margin: 4px 0;
    padding: 2px 6px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    font-family: 'SF Mono', Monaco, Consolas, 'Courier New', monospace;
    font-size: 11px;
    font-weight: 600;
}

.internal-bus {
    background: linear-gradient(135deg, #1f2937, #374151);
    color: white;
    border-color: #374151;
}

/* Explicit Grid Area Declarations */
#pc { grid-area: 1 / 1 / 2 / 2; }
#mar { grid-area: 2 / 1 / 3 / 2; }
#memory { grid-area: 3 / 1 / 4 / 2; }
#mdr { grid-area: 4 / 1 / 5 / 2; }
#control-unit { grid-area: 1 / 2 / 3 / 3; }
#internal-bus { grid-area: 3 / 2 / 4 / 3; }
#ir { grid-area: 4 / 2 / 5 / 3; }
#registers { grid-area: 1 / 3 / 3 / 4; }
#alu { grid-area: 3 / 3 / 4 / 4; }
#flags { grid-area: 4 / 3 / 5 / 4; }

/* NEW: Styles for the right-side info and controls wrapper */
.info-controls-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center items vertically */
    gap: 20px;
}

.instruction-panel {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    flex-grow: 1; /* Allow panel to grow */
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.instruction-text {
    font-size: 16px;
    line-height: 1.6;
    color: #374151;
    margin-bottom: 16px;
    min-height: 90px; /* Reserve space for text */
}

.current-instruction {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    padding: 14px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: white;
    font-family: 'SF Mono', Monaco, Consolas, 'Courier New', monospace;
}

.step-indicator {
    display: flex;
    justify-content: center;
    gap: 12px;
}

.step-dot {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #64748b;
    transition: all 0.3s ease;
    font-size: 14px;
    cursor: pointer;
}

.step-dot.active {
    background: #3b82f6;
    color: white;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.step-dot.completed {
    background: #059669;
    color: white;
}

.controls {
    display: grid; /* Changed to grid for equal sizing */
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.control-btn {
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.control-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.control-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}

.start-btn { background: #059669; }
.step-btn { background: #d97706; }
.audio-btn { background: #7c3aed; }
.reset-btn { background: #dc2626; }

@keyframes pulse {
    50% { transform: scale(1.05); }
}
.pulsing {
    animation: pulse 1s infinite;
}

/* Styles for smaller screens where scrolling is acceptable */
@media (max-width: 1279px) {
    html, body {
        height: auto;
        overflow: auto;
    }
    .main-content-wrapper {
        grid-template-columns: 1fr; /* Stack columns vertically */
        padding: 16px;
        gap: 16px;
    }
    .cpu-grid {
        min-height: 500px;
    }
    .instruction-text {
        min-height: 75px;
    }
    .controls {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
}
