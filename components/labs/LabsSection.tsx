'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Terminal, Shield, Globe, Lock, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import './LabsSection.css';

interface Lab {
    id: string;
    title: string;
    tool: string;
    description: string;
    skills: string[];
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    thumbnail: string;
    videoPlaceholder?: string;
    features: string[];
}

const labsData: Lab[] = [
    {
        id: 'metasploit',
        title: 'Penetration Testing with Metasploit',
        tool: 'Metasploit Framework',
        description: 'Master the art of exploitation using the world\'s most powerful penetration testing framework. Learn to identify vulnerabilities, develop exploits, and execute payloads in controlled environments.',
        skills: ['Exploitation', 'Payload Development', 'Post-Exploitation', 'Vulnerability Assessment'],
        duration: '12+ Hours',
        difficulty: 'Advanced',
        thumbnail: '/images/labs/metasploit-lab.png',
        features: [
            'Live target exploitation',
            'Custom payload creation',
            'Session management',
            'Real-world scenarios'
        ]
    },
    {
        id: 'nmap',
        title: 'Network Reconnaissance with Nmap',
        tool: 'Nmap Scanner',
        description: 'Discover and explore networks like a professional ethical hacker. Learn comprehensive network scanning techniques, service detection, and vulnerability identification.',
        skills: ['Network Scanning', 'Port Analysis', 'Service Detection', 'OS Fingerprinting'],
        duration: '8+ Hours',
        difficulty: 'Intermediate',
        thumbnail: '/images/labs/nmap-lab.png',
        features: [
            'Host discovery techniques',
            'Advanced scan types',
            'Script engine (NSE)',
            'Reporting & analysis'
        ]
    },
    {
        id: 'burpsuite',
        title: 'Web App Security with Burp Suite',
        tool: 'Burp Suite Professional',
        description: 'Become an expert in web application security testing. Learn to intercept, analyze, and manipulate HTTP traffic to discover and exploit web vulnerabilities.',
        skills: ['Web Security', 'Traffic Analysis', 'SQL Injection', 'XSS Attacks'],
        duration: '15+ Hours',
        difficulty: 'Advanced',
        thumbnail: '/images/labs/burpsuite-lab.png',
        features: [
            'Proxy interception',
            'Intruder attacks',
            'Vulnerability scanning',
            'OWASP Top 10'
        ]
    },
    {
        id: 'kali',
        title: 'Ethical Hacking with Kali Linux',
        tool: 'Kali Linux OS',
        description: 'Get hands-on experience with the most popular penetration testing distribution. Learn to use 600+ pre-installed security tools for comprehensive security assessments.',
        skills: ['Linux Mastery', 'Tool Integration', 'CTF Challenges', 'Red Team Ops'],
        duration: '20+ Hours',
        difficulty: 'Intermediate',
        thumbnail: '/images/labs/kali-lab.png',
        features: [
            'Pre-configured environment',
            'Tool collection access',
            'Command line mastery',
            'Real attack simulations'
        ]
    }
];

export function LabsSection() {
    const [activeLab, setActiveLab] = useState<Lab>(labsData[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const handleLabChange = (lab: Lab, index: number) => {
        setActiveLab(lab);
        setActiveIndex(index);
        setIsPlaying(false);
    };

    const handlePrev = () => {
        const newIndex = activeIndex === 0 ? labsData.length - 1 : activeIndex - 1;
        handleLabChange(labsData[newIndex], newIndex);
    };

    const handleNext = () => {
        const newIndex = activeIndex === labsData.length - 1 ? 0 : activeIndex + 1;
        handleLabChange(labsData[newIndex], newIndex);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner': return 'difficulty-beginner';
            case 'Intermediate': return 'difficulty-intermediate';
            case 'Advanced': return 'difficulty-advanced';
            default: return '';
        }
    };

    return (
        <section className="labs-section" id="live-labs">
            {/* Background Elements */}
            <div className="labs-bg-grid"></div>
            <div className="labs-bg-gradient"></div>
            <div className="labs-floating-elements">
                <div className="floating-code">&lt;exploit/&gt;</div>
                <div className="floating-binary">01001000 01100001 01100011 01101011</div>
                <div className="floating-terminal">$ sudo access granted</div>
            </div>

            <div className="container">
                {/* Section Header */}
                <div className="labs-header">
                    <div className="labs-badge">
                        <Terminal size={16} />
                        <span>HANDS-ON LEARNING</span>
                    </div>
                    <h2 className="labs-title">
                        Practice on <span className="gradient-text">Live Labs</span>
                    </h2>
                    <p className="labs-subtitle">
                        Get real-world cybersecurity experience with our interactive lab environments.
                        Practice with industry-standard tools in safe, controlled sandboxes.
                    </p>
                </div>

                {/* Main Lab Display */}
                <div className="labs-showcase">
                    {/* Lab Preview */}
                    <div className="lab-preview-container">
                        <div className="lab-preview-wrapper">
                            {/* Video/Image Display */}
                            <div className="lab-display">
                                <img
                                    src={activeLab.thumbnail}
                                    alt={activeLab.title}
                                    className="lab-thumbnail"
                                />
                                <div className="lab-overlay">
                                    <button
                                        className="play-button"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                    >
                                        <Play size={32} fill="white" />
                                        <span className="play-pulse"></span>
                                    </button>
                                    <span className="play-text">Watch Demo</span>
                                </div>

                                {/* Tool Badge */}
                                <div className="tool-badge">
                                    <Terminal size={14} />
                                    {activeLab.tool}
                                </div>

                                {/* Live Indicator */}
                                <div className="live-indicator">
                                    <span className="live-dot"></span>
                                    LIVE LAB
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button className="nav-arrow nav-prev" onClick={handlePrev}>
                                <ChevronLeft size={24} />
                            </button>
                            <button className="nav-arrow nav-next" onClick={handleNext}>
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Lab Dots Indicator */}
                        <div className="lab-dots">
                            {labsData.map((lab, index) => (
                                <button
                                    key={lab.id}
                                    className={`lab-dot ${index === activeIndex ? 'active' : ''}`}
                                    onClick={() => handleLabChange(lab, index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Lab Details */}
                    <div className="lab-details">
                        <div className="lab-meta">
                            <span className={`difficulty-badge ${getDifficultyColor(activeLab.difficulty)}`}>
                                {activeLab.difficulty}
                            </span>
                            <span className="duration-badge">
                                <span className="duration-icon">⏱</span>
                                {activeLab.duration}
                            </span>
                        </div>

                        <h3 className="lab-title">{activeLab.title}</h3>
                        <p className="lab-description">{activeLab.description}</p>

                        {/* Skills Tags */}
                        <div className="skills-container">
                            <h4 className="skills-label">Skills You'll Gain:</h4>
                            <div className="skills-tags">
                                {activeLab.skills.map((skill, index) => (
                                    <span key={index} className="skill-tag">
                                        <Shield size={12} />
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="features-container">
                            <ul className="feature-list">
                                {activeLab.features.map((feature, index) => (
                                    <li key={index} className="feature-item">
                                        <span className="feature-check">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA Button */}
                        <button className="start-lab-btn">
                            <Lock size={18} />
                            Start Lab Now
                            <ExternalLink size={16} />
                        </button>
                    </div>
                </div>

                {/* Lab Cards Carousel */}
                <div className="labs-carousel" ref={carouselRef}>
                    {labsData.map((lab, index) => (
                        <button
                            key={lab.id}
                            className={`lab-card ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => handleLabChange(lab, index)}
                        >
                            <div className="lab-card-image">
                                <img src={lab.thumbnail} alt={lab.title} />
                                <div className="card-overlay"></div>
                            </div>
                            <div className="lab-card-content">
                                <span className="card-tool">{lab.tool}</span>
                                <h4 className="card-title">{lab.title}</h4>
                                <div className="card-meta">
                                    <span className={`card-difficulty ${getDifficultyColor(lab.difficulty)}`}>
                                        {lab.difficulty}
                                    </span>
                                    <span className="card-duration">{lab.duration}</span>
                                </div>
                            </div>
                            {index === activeIndex && <div className="active-indicator"></div>}
                        </button>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="labs-stats">
                    <div className="stat-item">
                        <span className="stat-number">50+</span>
                        <span className="stat-label">Lab Exercises</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">100+</span>
                        <span className="stat-label">Hours of Practice</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">24/7</span>
                        <span className="stat-label">Lab Access</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">4</span>
                        <span className="stat-label">Core Tools</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LabsSection;
