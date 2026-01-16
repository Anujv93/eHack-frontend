'use client';

import './page.css';
import Link from 'next/link';

export default function CSRPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="csr-hero">
                <div className="container">
                    <div className="hero-content-compact">
                        <span className="hero-badge-light">CORPORATE SOCIAL RESPONSIBILITY</span>
                        <h1 className="hero-title-light">
                            Empowering Society Through
                            <span className="hero-highlight"> Cybersecurity, Employability & Emerging Technologies</span>
                        </h1>
                        <p className="hero-subtitle-light">
                            At eHack Academy Bangalore, CSR is not just a commitment—it is our mission. For over a decade, we have actively worked towards building a cyber-aware, skilled, and employable society.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="csr-mission-section">
                <div className="container">
                    <div className="mission-content">
                        <span className="section-badge">OUR CSR MISSION</span>
                        <h2 className="section-title">"To make India Cyber Secure, Skill-Enabled and Employment Ready"</h2>
                        <p className="mission-text">
                            We strive to create a cyber-aware society, enable youth with future-ready skills, improve employability through industry-aligned training, and spread happiness by empowering lives with knowledge.
                        </p>
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="impact-stats-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge section-badge-blue">OUR IMPACT</span>
                        <h2 className="section-title">10+ Years of CSR Excellence</h2>
                        <p className="section-subtitle">Making a difference through education and empowerment</p>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">🎓</div>
                            <div className="stat-value">50,000+</div>
                            <div className="stat-label">Students Trained</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🏫</div>
                            <div className="stat-value">100+</div>
                            <div className="stat-label">Institutions Served</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🔐</div>
                            <div className="stat-value">500+</div>
                            <div className="stat-label">Awareness Programs</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🌟</div>
                            <div className="stat-value">10+</div>
                            <div className="stat-label">Years of Service</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Focus Areas */}
            <section className="focus-areas-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge section-badge-purple">FOCUS AREAS</span>
                        <h2 className="section-title">Our CSR Initiatives</h2>
                    </div>

                    <div className="focus-grid">
                        <div className="focus-card">
                            <div className="focus-icon">🔐</div>
                            <h3 className="focus-title">Cybersecurity Awareness</h3>
                            <ul className="focus-list">
                                <li>Cyber crime prevention programs</li>
                                <li>Digital safety for students and staff</li>
                                <li>Data privacy and cyber hygiene workshops</li>
                                <li>Ethical hacking fundamentals</li>
                            </ul>
                        </div>

                        <div className="focus-card">
                            <div className="focus-icon">📊</div>
                            <h3 className="focus-title">Emerging Technology Training</h3>
                            <ul className="focus-list">
                                <li>Data Science & Artificial Intelligence</li>
                                <li>Cybersecurity & Ethical Hacking</li>
                                <li>Digital Marketing</li>
                                <li>Robotics & Automation</li>
                                <li>Corporate Skills & Career Readiness</li>
                            </ul>
                        </div>

                        <div className="focus-card">
                            <div className="focus-icon">🎯</div>
                            <h3 className="focus-title">Employability & Career Enablement</h3>
                            <ul className="focus-list">
                                <li>Career guidance & mentorship programs</li>
                                <li>Resume building & interview preparation</li>
                                <li>Industry readiness bootcamps</li>
                                <li>Soft skill development</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Institutions Served */}
            <section className="institutions-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">INSTITUTIONS WE SERVE</span>
                        <h2 className="section-title">Partnering with Leading Educational Institutions</h2>
                        <p className="section-subtitle">
                            Over the last decade, we have proudly partnered with numerous educational institutions across Bangalore and India
                        </p>
                    </div>

                    <div className="institutions-grid">
                        <div className="institution-card">
                            <div className="institution-icon">🏛️</div>
                            <h4 className="institution-name">MS Ramaiah Institute of Technology</h4>
                            <p className="institution-desc">Engineering, BCA, MCA & Polytechnic</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon">🎓</div>
                            <h4 className="institution-name">MS Ramaiah Institute of Management</h4>
                            <p className="institution-desc">PGDM Programs</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon">📚</div>
                            <h4 className="institution-name">Christ University</h4>
                            <p className="institution-desc">Multiple Departments</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon">🏫</div>
                            <h4 className="institution-name">Sir M. Visvesvaraya Institute</h4>
                            <p className="institution-desc">Engineering & Technology</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon">🎯</div>
                            <h4 className="institution-name">REVA University</h4>
                            <p className="institution-desc">Postgraduate Programs</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon">💼</div>
                            <h4 className="institution-name">PES Institute of Technology</h4>
                            <p className="institution-desc">Engineering Programs</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon">🌟</div>
                            <h4 className="institution-name">Nitte Meenakshi Institute (NMIT)</h4>
                            <p className="institution-desc">Technology Programs</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon">🚀</div>
                            <h4 className="institution-name">Sambhram Institute</h4>
                            <p className="institution-desc">Technology & Management</p>
                        </div>
                    </div>

                    <div className="institutions-more">
                        <p>And many more institutions across India...</p>
                    </div>
                </div>
            </section>

            {/* Corporate Engagements */}
            <section className="corporate-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge section-badge-blue">CORPORATE PARTNERSHIPS</span>
                        <h2 className="section-title">Corporate CSR Engagements</h2>
                        <p className="section-subtitle">
                            Delivering customized cybersecurity and emerging technology workshops for leading organizations
                        </p>
                    </div>

                    <div className="corporate-grid">
                        <div className="corporate-card">
                            <div className="corporate-logo">💳</div>
                            <h4 className="corporate-name">Cashfree</h4>
                            <p className="corporate-desc">Payment Technology Solutions</p>
                        </div>
                        <div className="corporate-card">
                            <div className="corporate-logo">⚡</div>
                            <h4 className="corporate-name">Bharat Electronics Limited (BEL)</h4>
                            <p className="corporate-desc">Defense & Aerospace</p>
                        </div>
                        <div className="corporate-card">
                            <div className="corporate-logo">🏢</div>
                            <h4 className="corporate-name">IT & Non-IT Organizations</h4>
                            <p className="corporate-desc">Various Industry Sectors</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap 2026-2028 */}
            <section className="roadmap-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge section-badge-purple">FUTURE VISION</span>
                        <h2 className="section-title">Our Roadmap: 2026 – 2028</h2>
                        <p className="section-subtitle">
                            Expanding our CSR footprint across schools, colleges, corporates, government bodies, and trusts
                        </p>
                    </div>

                    <div className="roadmap-grid">
                        <div className="roadmap-card">
                            <div className="roadmap-number">01</div>
                            <h4 className="roadmap-title">Large-scale Cyber Awareness Drives</h4>
                            <p className="roadmap-desc">Reaching millions across India with cybersecurity education</p>
                        </div>
                        <div className="roadmap-card">
                            <div className="roadmap-number">02</div>
                            <h4 className="roadmap-title">Digital Safety Programs</h4>
                            <p className="roadmap-desc">Targeted programs for schools & PU colleges</p>
                        </div>
                        <div className="roadmap-card">
                            <div className="roadmap-number">03</div>
                            <h4 className="roadmap-title">Free/Subsidized Certification Programs</h4>
                            <p className="roadmap-desc">Emerging technology certifications for underprivileged students</p>
                        </div>
                        <div className="roadmap-card">
                            <div className="roadmap-number">04</div>
                            <h4 className="roadmap-title">Corporate Cyber Readiness</h4>
                            <p className="roadmap-desc">Comprehensive security training for organizations</p>
                        </div>
                        <div className="roadmap-card">
                            <div className="roadmap-number">05</div>
                            <h4 className="roadmap-title">Women Empowerment & Youth Development</h4>
                            <p className="roadmap-desc">Specialized programs for inclusive growth</p>
                        </div>
                        <div className="roadmap-card">
                            <div className="roadmap-number">06</div>
                            <h4 className="roadmap-title">Government & NGO Partnerships</h4>
                            <p className="roadmap-desc">Collaborative initiatives for wider impact</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="csr-cta-section">
                <div className="container">
                    <div className="cta-box">
                        <div className="cta-content">
                            <span className="cta-badge">JOIN OUR CSR MOVEMENT</span>
                            <h2 className="cta-title">Partner with Us to Build a Safer, Smarter India</h2>
                            <p className="cta-subtitle">
                                We invite schools, colleges, corporates, trusts, NGOs, and government organizations to partner with us in building a safer, smarter and more skilled India.
                            </p>
                        </div>
                        <div className="cta-actions">
                            <a href="mailto:info@ehackacademy.com" className="cta-btn-primary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact Us for CSR Collaboration
                            </a>
                            <a href="tel:+919886035330" className="cta-btn-secondary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call Us Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Quote */}
            <section className="quote-section">
                <div className="container">
                    <div className="quote-card">
                        <div className="quote-icon">"</div>
                        <blockquote className="quote-text">
                            Knowledge is the strongest form of protection, and skills are the foundation of sustainable employment.
                        </blockquote>
                        <div className="quote-author">— eHack Academy CSR Philosophy</div>
                    </div>
                </div>
            </section>
        </>
    );
}
