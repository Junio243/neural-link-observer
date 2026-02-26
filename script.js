// ========================================
// NEURAL-LINK OBSERVER - VANILLA JS ENGINE
// ========================================

// State Management
const state = {
    uptime: 0,
    neuralData: [],
    metrics: {
        cpu: 0,
        memory: 0,
        latency: 0,
        throughput: 0
    }
};

// ========================================
// UPTIME COUNTER
// ========================================
function initializeUptime() {
    setInterval(() => {
        state.uptime++;
        const hours = Math.floor(state.uptime / 3600);
        const minutes = Math.floor((state.uptime % 3600) / 60);
        const seconds = state.uptime % 60;
        
        const uptimeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.getElementById('uptime').textContent = uptimeStr;
    }, 1000);
}

// ========================================
// NEURAL ACTIVITY GRAPH (Canvas)
// ========================================
function initializeNeuralGraph() {
    const canvas = document.getElementById('neuralCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let dataPoints = [];
    let currentValue = 50;
    let average = 50;
    let peak = 50;
    
    function drawGraph() {
        // Generate new data point
        currentValue = 30 + Math.sin(Date.now() / 1000) * 20 + Math.random() * 30;
        currentValue = Math.max(0, Math.min(100, currentValue));
        dataPoints.push(currentValue);
        
        // Keep only last 100 points
        if (dataPoints.length > 100) {
            dataPoints.shift();
        }
        
        // Calculate stats
        average = dataPoints.reduce((a, b) => a + b, 0) / dataPoints.length;
        peak = Math.max(...dataPoints);
        
        // Clear canvas
        ctx.fillStyle = 'rgba(0, 20, 40, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = (canvas.height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Draw graph line
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.5)';
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        for (let i = 0; i < dataPoints.length; i++) {
            const x = (canvas.width / 100) * i;
            const y = canvas.height - (dataPoints[i] / 100) * canvas.height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowColor = 'transparent';
        
        // Update stats display
        document.getElementById('current-activity').textContent = currentValue.toFixed(1);
        document.getElementById('avg-activity').textContent = average.toFixed(1);
        document.getElementById('peak-activity').textContent = peak.toFixed(1);
        
        requestAnimationFrame(drawGraph);
    }
    
    drawGraph();
}

// ========================================
// COMMAND TERMINAL
// ========================================
const commands = {
    help: () => {
        return `Available commands:
  help         - Show this help message
  status       - Show system status
  clear        - Clear terminal
  neural       - Show neural stats
  metrics      - Show performance metrics
  info         - Show system information
  scan         - Run neural scan
  matrix       - Display matrix code
  echo [text]  - Echo text back`;
    },
    status: () => {
        return `STATUS REPORT:\nSystem: OPERATIONAL\nNeural Link: CONNECTED\nSecurity Level: MAX\nEncryption: 256-BIT AES`;
    },
    neural: () => {
        const current = document.getElementById('current-activity').textContent;
        const avg = document.getElementById('avg-activity').textContent;
        return `NEURAL ACTIVITY:\nCurrent: ${current}%\nAverage: ${avg}%\nSync Status: 99.7%`;
    },
    metrics: () => {
        return `PERFORMANCE METRICS:\nCPU: ${state.metrics.cpu.toFixed(1)}%\nMemory: ${state.metrics.memory.toFixed(1)}%\nLatency: ${state.metrics.latency.toFixed(0)}ms\nThroughput: ${state.metrics.throughput.toFixed(2)} Mbps`;
    },
    info: () => {
        return `NEURAL-LINK OBSERVER v2.7.3\nPlatform: AI Monitoring System\nKernel: Neural Engine X\nMemory: 16GB DDR5\nProcessor: Neural-Core TPU v4`;
    },
    scan: () => {
        return `INITIATING NEURAL SCAN...\n[######################] 100%\nScan Complete. All systems nominal.`;
    },
    matrix: () => {
        return generateMatrixCode();
    },
    clear: () => {
        return 'CLEAR';
    },
    echo: (args) => {
        return args.join(' ');
    }
};

function executeCommand(commandStr) {
    const [cmd, ...args] = commandStr.toLowerCase().trim().split(' ');
    
    if (cmd === '') return '';
    if (commands[cmd]) {
        return commands[cmd](args);
    } else {
        return `Unknown command: ${cmd}. Type 'help' for available commands.`;
    }
}

function initializeTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = input.value;
            
            // Add command to output
            const cmdLine = document.createElement('div');
            cmdLine.className = 'terminal-line';
            cmdLine.innerHTML = `<span class="prompt">$</span> ${command}`;
            output.appendChild(cmdLine);
            
            // Execute command
            const result = executeCommand(command);
            
            if (result === 'CLEAR') {
                output.innerHTML = '<div class="terminal-line"><span class="prompt">$</span> Terminal cleared</div>';
            } else if (result) {
                const resultLine = document.createElement('div');
                resultLine.className = 'terminal-line';
                resultLine.style.whiteSpace = 'pre-wrap';
                resultLine.textContent = result;
                output.appendChild(resultLine);
            }
            
            // Scroll to bottom
            output.scrollTop = output.scrollHeight;
            
            // Clear input
            input.value = '';
        }
    });
}

// ========================================
// MATRIX LOG FEED (Infinite Stream)
// ========================================
const matrixEvents = [
    'Neural pathway synchronized',
    'AI inference latency optimized',
    'Quantum entanglement detected',
    'Anomaly detection triggered',
    'Data integrity verified',
    'Security protocol updated',
    'Network bandwidth optimized',
    'Cache coherency maintained',
    'Vector quantization complete',
    'Gradient descent converged',
    'Backpropagation cycle finished',
    'Attention mechanism recalibrated',
    'Layer normalization applied',
    'Batch processing finalized',
    'Model inference time: 2.3ms'
];

function generateRandomEvent() {
    const event = matrixEvents[Math.floor(Math.random() * matrixEvents.length)];
    const types = ['success', 'warning', 'error'];
    const type = types[Math.floor(Math.random() * types.length)];
    const timestamp = new Date().toLocaleTimeString();
    
    return { event, type, timestamp };
}

function generateMatrixCode() {
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += String.fromCharCode(33 + Math.floor(Math.random() * 94));
    }
    return code;
}

function initializeMatrixFeed() {
    const feed = document.getElementById('matrix-feed');
    
    setInterval(() => {
        const { event, type, timestamp } = generateRandomEvent();
        
        const line = document.createElement('div');
        line.className = `matrix-line ${type}`;
        line.textContent = `[${timestamp}] ${event}`;
        
        feed.appendChild(line);
        
        // Keep only last 50 lines
        const lines = feed.querySelectorAll('.matrix-line');
        if (lines.length > 50) {
            lines[0].remove();
        }
        
        // Auto-scroll
        feed.scrollTop = feed.scrollHeight;
    }, Math.random() * 2000 + 1000);
}

// ========================================
// SYSTEM METRICS (Random Animation)
// ========================================
function initializeMetrics() {
    setInterval(() => {
        state.metrics.cpu = Math.random() * 80 + 10;
        state.metrics.memory = Math.random() * 70 + 20;
        state.metrics.latency = Math.random() * 100 + 5;
        state.metrics.throughput = Math.random() * 900 + 100;
        
        document.getElementById('cpu-fill').style.width = state.metrics.cpu + '%';
        document.getElementById('cpu-value').textContent = state.metrics.cpu.toFixed(1) + '%';
        
        document.getElementById('memory-fill').style.width = state.metrics.memory + '%';
        document.getElementById('memory-value').textContent = state.metrics.memory.toFixed(1) + '%';
        
        document.getElementById('latency-fill').style.width = Math.min(100, state.metrics.latency) + '%';
        document.getElementById('latency-value').textContent = state.metrics.latency.toFixed(0) + 'ms';
        
        document.getElementById('throughput-fill').style.width = Math.min(100, state.metrics.throughput / 10) + '%';
        document.getElementById('throughput-value').textContent = state.metrics.throughput.toFixed(0) + ' Mbps';
    }, 1500);
}

// ========================================
// INITIALIZATION
// ========================================
function initialize() {
    initializeUptime();
    initializeNeuralGraph();
    initializeTerminal();
    initializeMatrixFeed();
    initializeMetrics();
    console.log('%c NEURAL-LINK OBSERVER INITIALIZED', 'color: #00ffff; font-size: 16px; text-shadow: 0 0 10px #00ffff;');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}
