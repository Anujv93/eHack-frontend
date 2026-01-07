'use client';

import { useState } from 'react';
import Link from 'next/link';
import './page.css';

export default function CodeRedPage() {
    const [activeTab, setActiveTab] = useState('overview');

    const features = [
        {
            title: 'New Videos & Courses Every Month',
            description: 'Stay updated with fresh cybersecurity content added monthly by top industry experts.'
        },
        {
            title: 'Anytime, Anywhere & Any Device',
            description: 'Stream world-class cybersecurity videos online from any device at your convenience.'
        },
        {
            title: 'Practical Labs Included',
            description: 'Hands-on learning with iLabs included in Microdegrees for real-world experience.'
        }
    ];

    const keyHighlights = [
        'Hands-on Learning on Latest Cybersecurity Topics',
        'One platform for all Cybersecurity Updates with Certificate of Attendance for every course',
        'Ability to delve deeper into comprehensive topics with Microdegrees and earn Certificate of Completion',
        'New Videos & Courses Every Month',
        'Practical Labs Included in Microdegrees (selected courses)'
    ];

    const microdegrees = [
        { title: 'Python Security', status: 'available' },
        { title: 'PHP Security', status: 'available' },
        { title: 'Hands-On Android Security', status: 'available' },
        { title: 'Cloud Security', status: 'coming-soon' },
        { title: 'AI for Cybersecurity', status: 'coming-soon' }
    ];

    const pillars = [
        { title: 'Ultra High-Quality Content' },
        { title: 'Skill Oriented' },
        { title: 'Build Perpetual Skill Sets' },
        { title: 'Experts Only' },
        { title: 'Enterprise Courses' }
    ];

    return (
        <>
            {/* Promotional Banner */}
            <div className="codered-promo-banner">
                <div className="promo-content">
                    <span className="promo-badge">10th Anniversary Offer!</span>
                    <span className="promo-text">Few Seats – Enroll Now! Batch Starts Every 5th of the Month.</span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="codered-hero">
                <div className="codered-hero-bg">
                    <div className="hero-gradient-overlay"></div>
                    <div className="hero-particles"></div>
                </div>
                <div className="container">
                    <div className="hero-content">
                        <div className="codered-logo-wrapper">
                            <span className="code-text">CODE</span>
                            <span className="red-box">RED</span>
                        </div>
                        <p className="codered-tagline">Empowering Cyber Professionals</p>

                        <h1 className="hero-title">
                            EC-Council's Continuous Learning Platform
                            <br />
                            <span className="highlight">For Busy Cyber Professionals</span>
                        </h1>

                        <div className="fastest-badge">
                            <span>One of The Fastest Growing Platforms</span>
                        </div>

                        <p className="hero-description">
                            Help busy professionals and career starters stay up-to-date with cutting edge
                            solutions through world-class courses and videos that span every topic in
                            cybersecurity and beyond.
                        </p>

                        <div className="hero-actions">
                            <a href="#register" className="btn-unlock">
                                Unlock your 30-Days Free Access
                            </a>
                            <a href="https://codered.eccouncil.org" target="_blank" rel="noopener noreferrer" className="btn-secondary-cta">
                                Visit CodeRed Platform →
                            </a>
                        </div>

                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-number">2500+</span>
                                <span className="stat-label">Videos</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">45+</span>
                                <span className="stat-label">Courses</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">100+</span>
                                <span className="stat-label">Expert Authors</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Pillars Section */}
            <section className="codered-pillars">
                <div className="container">
                    <div className="pillars-grid">
                        {pillars.map((pillar, index) => (
                            <div key={index} className="pillar-item">
                                <span className="pillar-title">{pillar.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="codered-highlights">
                <div className="container">
                    <div className="highlights-grid">
                        <div className="highlights-left">
                            <span className="section-badge">KEY HIGHLIGHTS</span>
                            <h2 className="highlights-title">
                                Stream World-class<br />
                                Cybersecurity Videos Online<br />
                                <span className="accent-text">Anytime. Anywhere.</span>
                            </h2>
                        </div>
                        <div className="highlights-right">
                            <ul className="highlights-list">
                                {keyHighlights.map((highlight, index) => (
                                    <li key={index} className="highlight-item">
                                        <span className="check-icon">✓</span>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="codered-features">
                <div className="container">
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Offerings Section */}
            <section className="codered-offerings">
                <div className="container">
                    <div className="offerings-header">
                        <span className="section-badge">WHAT YOU GET</span>
                        <h2 className="section-title">Offerings Snapshot</h2>
                    </div>

                    <div className="offerings-grid">
                        <div className="offering-card">
                            <h3>Video Library</h3>
                            <p>9000+ videos, 200+ courses curated by leading industry experts</p>
                            <span className="offering-stat">Updated Monthly</span>
                        </div>
                        <div className="offering-card featured">
                            <div className="offering-badge">POPULAR</div>
                            <h3>Microdegrees</h3>
                            <p>Comprehensive learning with eCourseware, hands-on videos, and iLabs</p>
                            <span className="offering-stat">With Certification</span>
                        </div>
                        <div className="offering-card">
                            <h3>Resources</h3>
                            <p>Research papers, blogs, and webinars for continuous learning</p>
                            <span className="offering-stat">Free Access</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Microdegrees Section */}
            <section className="codered-microdegrees">
                <div className="container">
                    <div className="microdegrees-header">
                        <span className="section-badge">MICRODEGREES</span>
                        <h2 className="section-title">Specialized Learning Paths</h2>
                        <p className="section-subtitle">Deep dive into specific domains with comprehensive microdegrees</p>
                    </div>

                    <div className="microdegrees-grid">
                        {microdegrees.map((course, index) => (
                            <div key={index} className={`microdegree-card ${course.status}`}>
                                <div className="microdegree-content">
                                    <h3>{course.title}</h3>
                                    {course.status === 'coming-soon' && (
                                        <span className="coming-soon-badge">Coming Soon</span>
                                    )}
                                </div>
                                <div className="microdegree-arrow">→</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certificate Section */}
            <section className="codered-certificate">
                <div className="container">
                    <div className="certificate-content">
                        <div className="certificate-info">
                            <span className="section-badge">RECOGNITION</span>
                            <h2 className="section-title">Certificate of Attendance</h2>
                            <p className="certificate-description">
                                Earn a Certificate of Attendance for every course you complete.
                                Showcase your continuous learning journey to employers and stand out
                                in the competitive cybersecurity job market.
                            </p>
                            <ul className="certificate-benefits">
                                <li>✓ Globally recognized EC-Council certification</li>
                                <li>✓ Digital and printable formats</li>
                                <li>✓ Shareable on LinkedIn and other platforms</li>
                                <li>✓ Verifiable online</li>
                            </ul>
                        </div>
                        <div className="certificate-preview">
                            <div className="certificate-frame">
                                <div className="cert-header">
                                    <span className="code-text-small">CODE</span>
                                    <span className="red-box-small">RED</span>
                                    <p className="cert-tagline">Empowering Cyber Professionals</p>
                                </div>
                                <h3 className="cert-title">CERTIFICATE OF ATTENDANCE</h3>
                                <p className="cert-text">THIS IS TO CERTIFY THAT</p>
                                <div className="cert-name">[Your Name]</div>
                                <p className="cert-completion">HAS ATTENDED AND SUCCESSFULLY COMPLETED THE COURSE</p>
                                <h4 className="cert-course">Hands-On Android Security</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="codered-pricing" id="register">
                <div className="container">
                    <div className="pricing-header">
                        <span className="section-badge">GET STARTED</span>
                        <h2 className="section-title">All in a Single Fee for One Whole Year</h2>
                        <p className="section-subtitle">Start with 30 days free access to explore comprehensive courses</p>
                    </div>

                    <div className="pricing-card">
                        <div className="pricing-highlight">
                            30-Days Free Access
                        </div>
                        <div className="pricing-content">
                            <h3>Explore the Platform</h3>
                            <p>Get full access to the entire content library for 30 days</p>
                            <ul className="pricing-features">
                                <li>✓ 2500+ cybersecurity videos</li>
                                <li>✓ 45+ curated courses</li>
                                <li>✓ Certificate of Attendance</li>
                                <li>✓ New content every month</li>
                                <li>✓ Access on any device</li>
                            </ul>
                            <a href="https://codered.eccouncil.org/register" target="_blank" rel="noopener noreferrer" className="pricing-cta">
                                Click to Register
                                <span className="cta-arrow">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="codered-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Elevate Your Cybersecurity Skills?</h2>
                        <p>Join thousands of cyber professionals who are staying ahead with CodeRed</p>
                        <div className="cta-buttons">
                            <a href="https://codered.eccouncil.org" target="_blank" rel="noopener noreferrer" className="btn-primary-cta">
                                Start Learning Today
                            </a>
                            <Link href="/courses" className="btn-explore">
                                Explore Other Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
