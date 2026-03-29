'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import InquiryForm from '@/components/global/inquiry-form/inquiry-form';
import './ceh-offer-modal.css';

interface CehOfferModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const modules = [
    { num: '01', title: 'Introduction to Ethical Hacking' },
    { num: '02', title: 'Footprinting and Reconnaissance' },
    { num: '03', title: 'Scanning Networks' },
    { num: '04', title: 'Enumeration' },
    { num: '05', title: 'Vulnerability Analysis' },
    { num: '06', title: 'System Hacking' },
    { num: '07', title: 'Malware Threats' },
    { num: '08', title: 'Sniffing' },
    { num: '09', title: 'Social Engineering' },
    { num: '10', title: 'Denial-of-Service' },
    { num: '11', title: 'Session Hijacking' },
    { num: '12', title: 'Evading IDS, Firewalls & Honeypots' },
    { num: '13', title: 'Hacking Web Servers' },
    { num: '14', title: 'Hacking Web Applications' },
    { num: '15', title: 'SQL Injection' },
    { num: '16', title: 'Hacking Wireless Networks' },
    { num: '17', title: 'Hacking Mobile Platforms' },
    { num: '18', title: 'IoT and OT Hacking' },
    { num: '19', title: 'Cloud Computing' },
    { num: '20', title: 'Cryptography' }
];

const tools = [
    { name: 'Kali Linux', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kalilinux/kalilinux-original.svg' },
    { name: 'Wireshark', src: 'https://cdn.simpleicons.org/wireshark/0A58CA' },
    { name: 'Burp Suite', src: 'https://www.kali.org/tools/burpsuite/images/burpsuite-logo.svg' },
    { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' }
];

export default function CehOfferModal({ isOpen, onClose }: CehOfferModalProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isOpen) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden';
        } else {
            timeoutId = setTimeout(() => setIsAnimating(false), 300);
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    return (
        <div className={`ceh-modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className={`ceh-modal-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="ceh-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="ceh-modal-layout">
                    {/* Left Column: Details */}
                    <div className="ceh-modal-left">
                        {/* Header */}
                        <div className="ceh-modal-header">
                            <span className="ceh-modal-badge">Special Offer Details</span>
                            <h2>Master <span>Practical Ethical Hacking</span> — The Masterclass</h2>
                            <p>
                                Designed with real-world attack simulations and hands-on labs, this masterclass prepares you to think like a hacker and build a successful career in cybersecurity.
                            </p>
                        </div>

                        {/* Tools Section (Moved here) */}
                        <div className="ceh-modal-tools-section">
                            <h3>Master Industry-Standard Tools</h3>
                            <div className="ceh-tools-grid">
                                {tools.map((tool, idx) => (
                                    <div key={idx} className="ceh-tool-item">
                                        <img src={tool.src} alt={`${tool.name} logo`} className="ceh-tool-img" />
                                        <span>{tool.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="ceh-modal-stats">
                            <div className="ceh-stat-item">
                                <div className="ceh-stat-info">
                                    <span className="ceh-stat-value">20</span>
                                    <span className="ceh-stat-label">Modules</span>
                                </div>
                            </div>
                            <div className="ceh-stat-item">
                                <div className="ceh-stat-info">
                                    <span className="ceh-stat-value">40+</span>
                                    <span className="ceh-stat-label">Hours</span>
                                </div>
                            </div>
                            <div className="ceh-stat-item">
                                <div className="ceh-stat-info">
                                    <span className="ceh-stat-value">24/7</span>
                                    <span className="ceh-stat-label">Lab Access</span>
                                </div>
                            </div>
                            {/* <div className="ceh-stat-item">
                                <div className="ceh-stat-info">
                                    <span className="ceh-stat-value">1</span>
                                    <span className="ceh-stat-label">Certifications</span>
                                </div>
                            </div> */}
                        </div>

                        {/* Modules Grid */}
                        <div className="ceh-modal-modules-section">
                            <h3>Curriculum Breakdown</h3>
                            <div className="ceh-modules-grid">
                                {modules.map((mod, idx) => (
                                    <div key={idx} className="ceh-module-card">
                                        <span className="ceh-module-num">Module {mod.num}</span>
                                        <span className="ceh-module-title">{mod.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Form */}
                    <div className="ceh-modal-right">
                        <div className="ceh-modal-sticky-sidebar">
                            <InquiryForm
                                courseName="30000 - Practical Ethical Hacking Masterclass"
                                courseCode="masterclass-practical-ethical-hacking"
                                variant="hero"
                                title="Claim Your Masterclass Offer"
                                subtitle="Speak with our team to secure your special ₹30,000 offer"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
