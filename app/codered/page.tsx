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
        {
            title: 'Python Security',
            description: 'Master secure coding practices in Python with hands-on vulnerability analysis and exploitation techniques',
            status: 'available',
            duration: '12 hours',
            modules: 8,
            level: 'Intermediate',
            hasLabs: true,
            category: 'Application Security'
        },
        {
            title: 'PHP Security',
            description: 'Learn to identify and mitigate common PHP vulnerabilities including SQL injection and XSS attacks',
            status: 'available',
            duration: '10 hours',
            modules: 6,
            level: 'Intermediate',
            hasLabs: true,
            category: 'Web Security'
        },
        {
            title: 'Hands-On Android Security',
            description: 'Deep dive into Android app security, reverse engineering, and mobile penetration testing',
            status: 'available',
            duration: '15 hours',
            modules: 10,
            level: 'Advanced',
            hasLabs: true,
            category: 'Mobile Security'
        },
        {
            title: 'Cloud Security',
            description: 'Secure cloud infrastructures across AWS, Azure, and GCP with industry best practices',
            status: 'coming-soon',
            duration: '14 hours',
            modules: 9,
            level: 'Advanced',
            hasLabs: true,
            category: 'Cloud Security'
        },
        {
            title: 'AI for Cybersecurity',
            description: 'Leverage machine learning for threat detection, anomaly analysis, and automated response',
            status: 'coming-soon',
            duration: '16 hours',
            modules: 11,
            level: 'Expert',
            hasLabs: true,
            category: 'AI & Security'
        }
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
            {/* Hero Section */}
            <section className="codered-hero-clean">
                <div className="hero-clean-bg">
                    <img src="/images/codered-hero-new.jpg" alt="Background" className="hero-bg-img" />
                    <div className="hero-overlay-gradient"></div>
                </div>

                <div className="container">
                    <div className="hero-content-clean">
                        <div className="clean-brand-header">
                            <span className="clean-code">CODE</span>
                            <span className="clean-red">RED</span>
                        </div>

                        <h1 className="hero-title-clean">
                            Cybersecurity courses
                            <br />
                            for the real world
                        </h1>

                        <p className="hero-subtitle-clean">
                            Get certified with the industry leaders in
                            <br />
                            cybersecurity training
                        </p>

                        <div className="hero-actions-clean">
                            <a href="#register" className="btn-clean-primary">
                                GET TRAINING!
                            </a>
                            <a href="https://codered.eccouncil.org" target="_blank" rel="noopener noreferrer" className="btn-clean-outline">
                                View Platform
                            </a>
                        </div>
                    </div>
                </div>

                <div className="hero-trust-bar">
                    <div className="container">
                        <div className="trust-bar-content">
                            <span className="trust-text">Trusted by 400,000+ Certified Professionals Worldwide</span>
                            <div className="trust-rating">
                                <span className="rating-score">4.7</span>
                                <div className="stars">★★★★★</div>
                                <span className="rating-platform">Trustpilot</span>
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

            {/* Microdegrees Section - Redesigned */}
            <section className="codered-microdegrees">
                <div className="container">
                    <div className="microdegrees-header">
                        <span className="section-badge">MICRODEGREES</span>
                        <h2 className="section-title">Specialized Learning Paths</h2>
                        <p className="section-subtitle">
                            Deep dive into specific security domains with comprehensive, hands-on microdegrees
                            <br />
                            <span className="subtitle-accent">Earn certificates of completion and build real-world skills</span>
                        </p>
                    </div>

                    <div className="microdegrees-grid-new">
                        {microdegrees.map((course, index) => (
                            <div
                                key={index}
                                className={`microdegree-card-new ${course.status}`}
                                style={{ '--card-index': index } as React.CSSProperties}
                            >
                                {/* Status Badge */}
                                {course.status === 'coming-soon' ? (
                                    <div className="card-status-badge coming-soon">
                                        <span className="pulse-dot"></span>
                                        Coming Soon
                                    </div>
                                ) : (
                                    <div className="card-status-badge available">
                                        Available Now
                                    </div>
                                )}

                                {/* Category Tag */}
                                <div className="card-category">{course.category}</div>

                                {/* Main Content */}
                                <div className="card-main-content">
                                    <h3 className="card-title">{course.title}</h3>
                                    <p className="card-description">{course.description}</p>
                                </div>

                                {/* Stats Row */}
                                <div className="card-stats">
                                    <div className="stat">
                                        <span className="stat-value">{course.duration}</span>
                                        <span className="stat-label">Duration</span>
                                    </div>
                                    <div className="stat-divider"></div>
                                    <div className="stat">
                                        <span className="stat-value">{course.modules}</span>
                                        <span className="stat-label">Modules</span>
                                    </div>
                                    <div className="stat-divider"></div>
                                    <div className="stat">
                                        <span className="stat-value">{course.level}</span>
                                        <span className="stat-label">Level</span>
                                    </div>
                                </div>

                                {/* Features Row */}
                                <div className="card-features">
                                    {course.hasLabs && (
                                        <span className="feature-tag labs">
                                            <span className="feature-dot"></span>
                                            Hands-on Labs
                                        </span>
                                    )}
                                    <span className="feature-tag cert">
                                        <span className="feature-dot"></span>
                                        Certificate
                                    </span>
                                </div>

                                {/* CTA */}
                                <div className="card-cta">
                                    {course.status === 'available' ? (
                                        <button className="cta-button">
                                            <span>Start Learning</span>
                                            <span className="cta-arrow">→</span>
                                        </button>
                                    ) : (
                                        <button className="cta-button notify">
                                            <span>Notify Me</span>
                                            <span className="cta-icon">🔔</span>
                                        </button>
                                    )}
                                </div>

                                {/* Decorative Elements */}
                                <div className="card-glow"></div>
                                <div className="card-corner-accent"></div>
                            </div>
                        ))}
                    </div>

                    {/* Section Footer */}
                    <div className="microdegrees-footer">
                        <div className="footer-stats">
                            <div className="footer-stat">
                                <span className="footer-stat-number">5+</span>
                                <span className="footer-stat-label">Microdegrees</span>
                            </div>
                            <div className="footer-stat">
                                <span className="footer-stat-number">44+</span>
                                <span className="footer-stat-label">Total Modules</span>
                            </div>
                            <div className="footer-stat">
                                <span className="footer-stat-number">67+</span>
                                <span className="footer-stat-label">Hours of Content</span>
                            </div>
                        </div>
                        <p className="footer-note">
                            All microdegrees include iLabs access, eCourseware, and certificate of completion
                        </p>
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
                            <div className="certificate-image-wrapper">
                                <img
                                    src="/images/codered-certificate.jpg"
                                    alt="CodeRed Certificate of Attendance"
                                    className="cert-img"
                                />
                                <div className="cert-glow"></div>
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
