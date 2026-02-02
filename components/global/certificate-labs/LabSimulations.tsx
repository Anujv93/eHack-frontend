import React, { useState, useEffect } from 'react';
import {
    Play, Pause, RefreshCw, Send,
    BarChart2, PieChart, TrendingUp, Users,
    Bot, Cpu, Wifi, MessageSquare,
    Search, Globe, Mail, Video, Mic,
    Code as CodeIcon, Terminal, Database, Layers
} from 'lucide-react';

/* ==========================================
   Robotics Simulation
   ========================================== */
export const RoboticsSimulation = ({ mode }: { mode: 'arduino' | 'iot' | 'robot' }) => {
    // Robot State
    const [position, setPosition] = useState({ x: 50, y: 50, rotation: 0 });
    const [path, setPath] = useState<{ x: number, y: number }[]>([]);

    // IoT State
    const [temp, setTemp] = useState(24);
    const [humidity, setHumidity] = useState(60);

    // Arduino State
    const [ledState, setLedState] = useState(false);

    useEffect(() => {
        if (mode === 'iot') {
            const interval = setInterval(() => {
                setTemp(prev => prev + (Math.random() - 0.5));
                setHumidity(prev => prev + (Math.random() * 2 - 1));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [mode]);

    const move = (dx: number, dy: number, rot: number) => {
        setPosition(prev => {
            const newPos = {
                x: Math.min(100, Math.max(0, prev.x + dx)),
                y: Math.min(100, Math.max(0, prev.y + dy)),
                rotation: rot
            };
            setPath(curr => [...curr, newPos]);
            return newPos;
        });
    };

    if (mode === 'arduino') {
        return (
            <div className="sim-container robotics-sim arduino-mode">
                <div className="arduino-board">
                    <div className="board-chip">ATmega328</div>
                    <div className={`led-component ${ledState ? 'on' : 'off'}`}></div>
                    <div className="pin-connectors">
                        {[...Array(8)].map((_, i) => <div key={i} className="pin"></div>)}
                    </div>
                </div>
                <div className="code-editor-sim">
                    <div className="code-header">sketch_nov15a.ino</div>
                    <pre>
                        <code>
                            <span className="kw">void</span> setup() {'{'}{'\n'}
                            {'  '}pinMode(LED_BUILTIN, OUTPUT);{'\n'}
                            {'}'}{'\n'}
                            <span className="kw">void</span> loop() {'{'}{'\n'}
                            {'  '}digitalWrite(LED_BUILTIN, <span className="str">{ledState ? 'HIGH' : 'LOW'}</span>);{'\n'}
                            {'  '}delay(1000);{'\n'}
                            {'}'}
                        </code>
                    </pre>
                    <button className="compile-btn" onClick={() => setLedState(!ledState)}>
                        {ledState ? 'Turn LED OFF' : 'Turn LED ON'}
                    </button>
                </div>
            </div>
        );
    }

    if (mode === 'iot') {
        return (
            <div className="sim-container robotics-sim iot-mode">
                <div className="iot-dashboard">
                    <h3>Home Automation Hub</h3>
                    <div className="iot-grid">
                        <div className="iot-card">
                            <Cpu size={24} color="#3b82f6" />
                            <span className="label">Living Room Temp</span>
                            <span className="value">{temp.toFixed(1)}°C</span>
                        </div>
                        <div className="iot-card">
                            <Wifi size={24} color="#10b981" />
                            <span className="label">Network Status</span>
                            <span className="value">Connected</span>
                        </div>
                        <div className="iot-card">
                            <div className="humidity-ring" style={{ '--p': humidity } as any}></div>
                            <span className="label">Humidity</span>
                            <span className="value">{Math.round(humidity)}%</span>
                        </div>
                    </div>
                    <div className="iot-log">
                        <div>[10:42:01] Sensor reading received</div>
                        <div>[10:42:05] Uploaded to AWS IoT Core</div>
                        <div className="highlight">[10:42:10] Truncating DB logs...</div>
                    </div>
                </div>
            </div>
        );
    }

    // Default Robot Mode
    return (
        <div className="sim-container robotics-sim">
            <div className="sim-viewport">
                <div className="sim-grid">
                    <svg className="sim-path-trace">
                        <polyline points={path.map(p => `${p.x}% ${p.y}%`).join(' ')} fill="none" stroke="rgba(255, 107, 0, 0.3)" strokeWidth="2" />
                    </svg>
                    <div className="sim-robot" style={{ left: `${position.x}%`, top: `${position.y}%`, transform: `translate(-50%, -50%) rotate(${position.rotation}deg)` }}>
                        <Bot size={32} color="#FF6B00" />
                    </div>
                </div>
            </div>
            <div className="sim-controls">
                <div className="joystick-pad">
                    <button className="joy-btn up" onClick={() => move(0, -10, 0)}>⬆️</button>
                    <div className="joy-row">
                        <button className="joy-btn left" onClick={() => move(-10, 0, -90)}>⬅️</button>
                        <div className="joy-center">🕹️</div>
                        <button className="joy-btn right" onClick={() => move(10, 0, 90)}>➡️</button>
                    </div>
                    <button className="joy-btn down" onClick={() => move(0, 10, 180)}>⬇️</button>
                </div>
            </div>
        </div>
    );
};

/* ==========================================
   Data Science Simulation
   ========================================== */
export const DataScienceSimulation = ({ mode }: { mode: 'python' | 'ml' | 'viz' }) => {
    const [dataPoints, setDataPoints] = useState([40, 65, 30, 85, 50, 75]);
    const [trainingStep, setTrainingStep] = useState(0);

    useEffect(() => {
        if (mode === 'viz') {
            const interval = setInterval(() => {
                setDataPoints(prev => prev.map(v => Math.max(10, Math.min(100, v + (Math.random() * 20 - 10)))));
            }, 2000);
            return () => clearInterval(interval);
        }
        if (mode === 'ml') {
            const interval = setInterval(() => {
                setTrainingStep(prev => (prev + 1) % 100);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [mode]);

    if (mode === 'python') {
        return (
            <div className="sim-container datascience-sim python-mode">
                <div className="notebook-cell">
                    <div className="cell-type">[1] Code</div>
                    <pre>
                        <code>
                            <span className="kw">import</span> pandas <span className="kw">as</span> pd{'\n'}
                            df = pd.read_csv(<span className="str">'customer_churn.csv'</span>){'\n'}
                            df.describe()
                        </code>
                    </pre>
                </div>
                <div className="notebook-output">
                    <div className="cell-type">Output</div>
                    <table className="sim-table">
                        <thead><tr><th>ID</th><th>Age</th><th>Spend</th><th>Churn</th></tr></thead>
                        <tbody>
                            <tr><td>101</td><td>24</td><td>$405</td><td>No</td></tr>
                            <tr><td>102</td><td>35</td><td>$120</td><td>Yes</td></tr>
                            <tr><td>103</td><td>42</td><td>$850</td><td>No</td></tr>
                        </tbody>
                    </table>
                    <div className="more-rows">... 5000 rows hidden ...</div>
                </div>
            </div>
        );
    }

    if (mode === 'ml') {
        return (
            <div className="sim-container datascience-sim ml-mode">
                <div className="ml-header">
                    <h3>Training Model: NeuralNetwork_v2</h3>
                    <span className="badge">Running</span>
                </div>
                <div className="epoch-progress">
                    <div className="epoch-bar-bg"><div className="epoch-bar-fill" style={{ width: `${trainingStep}%` }}></div></div>
                    <span>Epoch {Math.floor(trainingStep / 10) + 1}/10</span>
                </div>
                <div className="ml-stats">
                    <div className="stat-box">
                        <span className="label">Loss</span>
                        <span className="value">{(0.9 - (trainingStep / 200)).toFixed(4)}</span>
                    </div>
                    <div className="stat-box">
                        <span className="label">Accuracy</span>
                        <span className="value">{(0.5 + (trainingStep / 250)).toFixed(3)}</span>
                    </div>
                </div>
                <div className="layer-viz">
                    {[1, 2, 3].map(i => <div key={i} className="layer"></div>)}
                </div>
            </div>
        );
    }

    return (
        <div className="sim-container datascience-sim viz-mode">
            <div className="sim-toolbar">
                <div className="tool-btn active"><BarChart2 size={14} /> Visualize</div>
                <div className="tool-btn"><TrendingUp size={14} /> Trends</div>
                <div className="tool-btn"><PieChart size={14} /> Distribution</div>
            </div>
            <div className="sim-chart-area">
                <div className="sim-bar-chart">
                    {dataPoints.map((h, i) => (
                        <div key={i} className="sim-bar-col">
                            <div className="sim-bar" style={{ height: `${h}%` }} title={`Value: ${Math.round(h)}`}></div>
                            <span className="sim-bar-label">Q{i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

/* ==========================================
   Marketing Simulation
   ========================================== */
export const MarketingSimulation = ({ mode }: { mode: 'seo' | 'ads' | 'analytics' }) => {
    const [metrics, setMetrics] = useState({ i: 1200, c: 45 });

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(p => ({ i: p.i + 10, c: p.c + 1 }));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    if (mode === 'seo') {
        return (
            <div className="sim-container marketing-sim seo-mode">
                <div className="seo-score">
                    <div className="score-circle">85</div>
                    <span>SEO Health Score</span>
                </div>
                <div className="seo-checklist">
                    <div className="check-item good">✅ SSL Certificate Valid</div>
                    <div className="check-item good">✅ Mobile Responsiveness</div>
                    <div className="check-item warn">⚠️ H1 Tag Missing on 2 pages</div>
                    <div className="check-item error">❌ Meta Description Duplicates</div>
                </div>
            </div>
        );
    }

    if (mode === 'analytics') {
        return (
            <div className="sim-container marketing-sim analytics-mode">
                <div className="analytics-map">
                    <Globe size={48} className="map-icon" />
                    <div className="visitor-bubble" style={{ top: '30%', left: '40%' }}>34</div>
                    <div className="visitor-bubble" style={{ top: '50%', left: '60%' }}>12</div>
                    <div className="visitor-bubble" style={{ top: '40%', left: '20%' }}>89</div>
                </div>
                <div className="analytics-stats">
                    <div className="stat"><span>Active Users</span> <strong>145</strong></div>
                    <div className="stat"><span>Bounce Rate</span> <strong>42%</strong></div>
                </div>
            </div>
        );
    }

    return (
        <div className="sim-container marketing-sim ads-mode">
            <div className="ad-card-mockup">
                <div className="ad-header"><div className="ad-name">Brand</div></div>
                <div className="ad-text-block"><h4>Special Offer!</h4></div>
                <div className="sim-metrics-grid">
                    <div className="metric-card"><span className="metric-value">{metrics.i}</span>Imp</div>
                    <div className="metric-card"><span className="metric-value">{metrics.c}</span>Click</div>
                </div>
            </div>
        </div>
    );
};

/* ==========================================
   Soft Skills Simulation
   ========================================== */
export const SoftSkillsSimulation = ({ mode }: { mode: 'chat' | 'leadership' | 'interview' }) => {
    const [messages, setMessages] = useState([{ id: 1, sender: 'bot', text: "Hello! Ready?" }]);
    const [wave, setWave] = useState([10, 20, 15, 30, 20]);

    useEffect(() => {
        if (mode === 'interview') {
            const int = setInterval(() => {
                setWave(prev => prev.map(() => Math.random() * 40 + 10));
            }, 100);
            return () => clearInterval(int);
        }
    }, [mode]);

    if (mode === 'leadership') {
        return (
            <div className="sim-container softskills-sim leadership-mode">
                <div className="scenario-card">
                    <h4>Scenario: Conflict</h4>
                    <p>Two senior devs are arguing about architecture. The deadline is tomorrow.</p>
                </div>
                <div className="decision-tree">
                    <button className="decision-btn A">Intervene and decide now</button>
                    <button className="decision-btn B">Let them sort it out</button>
                    <button className="decision-btn C">Delay the deadline</button>
                </div>
            </div>
        );
    }

    if (mode === 'interview') {
        return (
            <div className="sim-container softskills-sim interview-mode">
                <div className="video-feed">
                    <div className="avatar-large"><Users size={64} /></div>
                    <div className="audio-wave">
                        {wave.map((h, i) => <div key={i} style={{ height: h }} className="bar"></div>)}
                    </div>
                    <div className="transcription">"Tell me about your weakness..."</div>
                </div>
                <div className="mic-controls">
                    <button className="mic-btn"><Mic /></button>
                    <button className="cam-btn"><Video /></button>
                </div>
            </div>
        );
    }

    return (
        <div className="sim-container softskills-sim chat-mode">
            <div className="chat-messages">
                {messages.map(m => <div key={m.id} className="chat-bubble bot">{m.text}</div>)}
            </div>
            <div className="chat-options">
                <button className="chat-opt-btn">I'm ready.</button>
            </div>
        </div>
    );
};
