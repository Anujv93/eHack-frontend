'use client';

import { useState } from 'react';
import Link from 'next/link';
import './kennedy-university.css';

export default function KennedyUniversityPage() {
    const [activeTab, setActiveTab] = useState('certifications');

    return (
        <div className="kennedy-page">
            {/* Navigation */}
            <nav className="program-nav">
                <div className="nav-container">
                    <div className="nav-left">
                        <Link href="/" className="nav-logo">
                            <span className="logo-badge">CYBERSECURITY + AI</span>
                        </Link>
                        <ul className="nav-menu">
                            <li><a href="#overview">Overview</a></li>
                            <li><a href="#programs">Programs</a></li>
                            <li><a href="#partners">Partners</a></li>
                            <li><a href="#experience">Learning</a></li>
                            <li><a href="#careers">Careers</a></li>
                            <li><a href="#faq">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="nav-right">
                        <button className="btn-apply">APPLY NOW</button>
                        <button className="btn-login">Login</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section" id="overview">
                <div className="hero-container">
                    {/* Left Content */}
                    <div className="hero-content">
                        <p className="hero-subtitle-top">
                            Industry Certifications & Global Degrees in Cybersecurity, Co-certified by Partner Universities.
                        </p>

                        <div className="partner-logos">
                            <div className="partner-logo">
                                <img src="/images/kennedy-university-logo.png" alt="Kennedy University" className="partner-logo-img" />
                            </div>
                            <div className="divider"></div>
                            <div className="partner-logo">
                                <img src="/images/ec-council-logo.png" alt="EC-Council" className="partner-logo-img ec-council" />
                            </div>
                            <div className="divider"></div>
                            <div className="partner-logo">
                                <img src="/images/ehack-logo.png" alt="eHack Academy" className="partner-logo-img ehack" />
                            </div>
                        </div>

                        <h1 className="hero-title">
                            Cybersecurity with <span className="text-accent">AI</span> – Industry Certifications & Global Degrees
                        </h1>

                        <p className="hero-description">
                            Launch your cybersecurity career with globally recognized EC-Council certifications and accredited
                            degrees from Kennedy University, powered by AI-driven learning at eHack Academy.
                        </p>

                        <p className="hero-features">
                            Includes AI-powered labs, real-world attack simulations, mentoring from industry experts, and
                            placement assistance.
                        </p>

                        <div className="batch-info">
                            <span className="batch-label">NEXT BATCH STARTS</span>
                            <span className="batch-date">IN JANUARY</span>
                        </div>

                        <a href="#" className="btn-download-brochure">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download Brochure
                        </a>
                    </div>

                    {/* Right Form Card */}
                    <div className="form-card">
                        <h2 className="form-title">Book a <span className="text-accent">FREE</span> Live class!</h2>
                        <p className="form-subtitle">Login to get started</p>

                        <div className="phone-input">
                            <div className="country-code">
                                <span className="flag">🇮🇳</span>
                                <span>+91</span>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                </svg>
                            </div>
                            <input type="tel" placeholder="Mobile Number" className="phone-field" />
                        </div>

                        <button className="btn-continue" disabled>CONTINUE</button>

                        <label className="checkbox-label">
                            <input type="checkbox" defaultChecked />
                            <span className="checkmark"></span>
                            I wish to receive updates via WhatsApp.
                        </label>

                        <p className="terms-text">
                            By continuing, you agree to eHack&apos;s <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Partnership Highlight Section */}
            <section className="partnership-highlight">
                {/* Floating Stats Card */}
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-label">PROGRAMS OFFERED</span>
                        <div className="stat-value"><strong>4</strong> Tracks</div>
                    </div>
                    <div className="stat-item stat-logo-item">
                        <span className="stat-label">CERTIFICATION PARTNER</span>
                        <div className="stat-value">
                            <img src="/images/ec-council-logo.png" alt="EC-Council" className="stat-logo" />
                        </div>
                    </div>
                    <div className="stat-item stat-logo-item">
                        <span className="stat-label">DEGREE PARTNER</span>
                        <div className="stat-value">
                            <img src="/images/kennedy-university-logo.png" alt="Kennedy University" className="stat-logo kennedy" />
                        </div>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">LEARNING FORMAT</span>
                        <div className="stat-value"><strong>Live</strong> + AI Labs</div>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">PLACEMENT</span>
                        <div className="stat-value"><strong>100%</strong> Assistance</div>
                    </div>
                </div>

                {/* Partnership Content */}
                <div className="partnership-container">
                    <div className="partnership-grid">
                        {/* Left: Content */}
                        <div className="partnership-content">
                            {/* Partner Logos */}
                            <div className="partnership-logos">
                                <img src="/images/kennedy-university-logo.png" alt="Kennedy University" className="partnership-logo kennedy" />
                                <span className="partnership-divider">|</span>
                                <img src="/images/ec-council-logo.png" alt="EC-Council" className="partnership-logo ec-council" />
                            </div>

                            <h2 className="partnership-title">
                                Integrated Program with <span className="text-accent">Kennedy University</span> & <span className="text-accent">EC-Council</span>
                            </h2>

                            <p className="partnership-description">
                                Our programs offer a unique combination of globally recognized EC-Council cybersecurity certifications
                                and accredited degrees from Kennedy University. This dual-credential approach ensures you graduate with
                                both the practical skills and academic qualifications demanded by the industry.
                            </p>

                            <div className="partnership-benefits">
                                <div className="benefit-item">
                                    <span className="benefit-icon">✦</span>
                                    <span>Internationally accredited degrees</span>
                                </div>
                                <div className="benefit-item">
                                    <span className="benefit-icon">✦</span>
                                    <span>Industry-recognized EC-Council certifications</span>
                                </div>
                                <div className="benefit-item">
                                    <span className="benefit-icon">✦</span>
                                    <span>AI-powered cybersecurity labs & simulations</span>
                                </div>
                                <div className="benefit-item">
                                    <span className="benefit-icon">✦</span>
                                    <span>Access to global alumni network</span>
                                </div>
                                <div className="benefit-item">
                                    <span className="benefit-icon">✦</span>
                                    <span>Mentorship from CISO-level professionals</span>
                                </div>
                                <div className="benefit-item">
                                    <span className="benefit-icon">✦</span>
                                    <span>100% placement assistance included</span>
                                </div>
                            </div>

                            <a href="#apply" className="partnership-cta">Download Brochure</a>
                        </div>

                        {/* Right: Certificate Images */}
                        <div className="partnership-certificates">
                            <div className="certificate-card">
                                <img src="/images/ec-council-certificate.jpg" alt="EC-Council CND Certificate" className="certificate-img" />
                                <p className="certificate-label">EC-Council Certification</p>
                            </div>
                            <div className="certificate-card">
                                <img src="/images/kennedy-university-certificate.png" alt="Kennedy University Degree" className="certificate-img" />
                                <p className="certificate-label">Kennedy University Degree</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="programs-section" id="programs">
                <div className="section-container">
                    <span className="section-badge">OUR PROGRAMS</span>
                    <h2 className="section-title">Choose Your <span className="text-accent">Cybersecurity</span> Pathway</h2>
                    <p className="section-subtitle">From industry certifications to global degrees, we have the right program for every career stage.</p>

                    {/* Program Tabs */}
                    <div className="program-tabs">
                        <button
                            className={`program-tab ${activeTab === 'certifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('certifications')}
                        >
                            EC-Council Certifications
                        </button>
                        <button
                            className={`program-tab ${activeTab === 'bscs' ? 'active' : ''}`}
                            onClick={() => setActiveTab('bscs')}
                        >
                            BSCS – Fast Track (1 Year)
                        </button>
                        <button
                            className={`program-tab ${activeTab === 'mscs' ? 'active' : ''}`}
                            onClick={() => setActiveTab('mscs')}
                        >
                            MSCS – Fast Track (1 Year)
                        </button>
                        <button
                            className={`program-tab ${activeTab === 'integrated' ? 'active' : ''}`}
                            onClick={() => setActiveTab('integrated')}
                        >
                            Integrated BSCS + MSCS (15 Months)
                        </button>
                    </div>

                    {/* Program Content */}
                    <div className="program-contents">
                        {/* EC-Council Certifications */}
                        {activeTab === 'certifications' && (
                            <div className="program-content active">
                                <div className="program-card">
                                    <div className="program-card-header">
                                        <div className="program-icon">
                                            <svg viewBox="0 0 48 48" fill="none">
                                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
                                                <path d="M16 24l6 6 10-12" stroke="currentColor" strokeWidth="3" />
                                            </svg>
                                        </div>
                                        <div className="program-badge">Popular Choice</div>
                                    </div>
                                    <h3 className="program-name">EC-Council Individual Cybersecurity Certifications</h3>
                                    <p className="program-description">Industry-recognized certifications that validate your expertise in ethical hacking, network defense, and incident handling.</p>

                                    <div className="program-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Duration</span>
                                            <span className="detail-value">3-6 Months per Certification</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Eligibility</span>
                                            <span className="detail-value">Graduate / Working Professional</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Certification</span>
                                            <span className="detail-value">EC-Council Certified</span>
                                        </div>
                                    </div>

                                    <div className="certification-list">
                                        <h4>Available Certifications:</h4>
                                        <ul>
                                            <li><span className="cert-icon">🎯</span> CEH - Certified Ethical Hacker</li>
                                            <li><span className="cert-icon">🛡️</span> CND - Certified Network Defender</li>
                                            <li><span className="cert-icon">🔍</span> ECIH - EC-Council Certified Incident Handler</li>
                                            <li><span className="cert-icon">⚡</span> CPENT - Certified Penetration Testing Professional</li>
                                            <li><span className="cert-icon">🔐</span> CHFI - Computer Hacking Forensic Investigator</li>
                                        </ul>
                                    </div>

                                    <div className="program-actions">
                                        <a href="#apply" className="btn-primary">Know More</a>
                                        <a href="#apply" className="btn-secondary">Apply Now</a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* BSCS Fast Track */}
                        {activeTab === 'bscs' && (
                            <div className="program-content active">
                                <div className="program-card">
                                    <div className="program-card-header">
                                        <div className="program-icon">
                                            <svg viewBox="0 0 48 48" fill="none">
                                                <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                                                <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        </div>
                                        <div className="program-badge featured">Fast-Track</div>
                                    </div>
                                    <h3 className="program-name">Bachelor of Science in Cybersecurity (BSCS) – Fast Track (1 Year)</h3>
                                    <p className="program-description">A fast-track BSCS designed for learners with prior academic or professional exposure, delivered in collaboration with eHack Academy as the industry training partner.</p>

                                    <div className="program-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Duration</span>
                                            <span className="detail-value">12 Months</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Mode</span>
                                            <span className="detail-value">Blended / On-Campus / Online</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Academic Ownership</span>
                                            <span className="detail-value">Kennedy University</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Industry Delivery Partner</span>
                                            <span className="detail-value">eHack Academy</span>
                                        </div>
                                    </div>

                                    <div className="curriculum-alignment">
                                        <h4>📚 Curriculum Alignment:</h4>
                                        <p>"The BSCS curriculum is aligned with eHack Academy's Graduate Program in Cybersecurity and enhanced with university-level academic rigor."</p>
                                    </div>

                                    <div className="program-highlights">
                                        <h4>Core Areas:</h4>
                                        <ul>
                                            <li><span className="highlight-icon">✓</span> Cybersecurity Fundamentals</li>
                                            <li><span className="highlight-icon">✓</span> Networking & OS</li>
                                            <li><span className="highlight-icon">✓</span> Ethical Hacking & Penetration Testing</li>
                                            <li><span className="highlight-icon">✓</span> Digital Forensics & Incident Response</li>
                                            <li><span className="highlight-icon">✓</span> Risk Management & Governance</li>
                                            <li><span className="highlight-icon">✓</span> Secure Application Development</li>
                                        </ul>
                                    </div>

                                    <div className="internship-info">
                                        <h4>🎯 Internship:</h4>
                                        <p>Mandatory project-based internship at eHack Academy, with industry mentors, real-world cyber projects, and internship evaluation mapped to academic credits.</p>
                                    </div>

                                    <div className="program-actions">
                                        <a href="#apply" className="btn-primary">Know More</a>
                                        <a href="#apply" className="btn-secondary">Apply Now</a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MSCS Fast Track */}
                        {activeTab === 'mscs' && (
                            <div className="program-content active">
                                <div className="program-card">
                                    <div className="program-card-header">
                                        <div className="program-icon">
                                            <svg viewBox="0 0 48 48" fill="none">
                                                <path d="M24 4L40 14v20L24 44 8 34V14L24 4z" stroke="currentColor" strokeWidth="2" />
                                                <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        </div>
                                        <div className="program-badge featured">Advanced</div>
                                    </div>
                                    <h3 className="program-name">Master of Science in Cybersecurity (MSCS) – Fast Track (1 Year)</h3>
                                    <p className="program-description">An advanced master's program focused on strategic, technical, and managerial cybersecurity skills for aspiring security leaders.</p>

                                    <div className="program-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Duration</span>
                                            <span className="detail-value">12 Months</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Eligibility</span>
                                            <span className="detail-value">Bachelor&apos;s Degree</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Academic Ownership</span>
                                            <span className="detail-value">Kennedy University</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Industry Delivery Partner</span>
                                            <span className="detail-value">eHack Academy</span>
                                        </div>
                                    </div>

                                    <div className="curriculum-alignment">
                                        <h4>📚 Curriculum Mapping:</h4>
                                        <p>"The MSCS curriculum is mapped to eHack Academy's Master-Level Cybersecurity Program with advanced research and capstone requirements."</p>
                                    </div>

                                    <div className="program-highlights">
                                        <h4>Advanced Topics:</h4>
                                        <ul>
                                            <li><span className="highlight-icon">✓</span> Advanced Network & Cloud Security</li>
                                            <li><span className="highlight-icon">✓</span> Cyber Threat Intelligence</li>
                                            <li><span className="highlight-icon">✓</span> Cryptography</li>
                                            <li><span className="highlight-icon">✓</span> GRC (Governance, Risk & Compliance)</li>
                                            <li><span className="highlight-icon">✓</span> Cyber Law & Ethics</li>
                                            <li><span className="highlight-icon">✓</span> Research Methodology</li>
                                        </ul>
                                    </div>

                                    <div className="internship-info">
                                        <h4>🎯 Capstone & Internship:</h4>
                                        <p>Applied research project + industry internship through eHack Academy, with evaluation by a joint academic & industry defense panel.</p>
                                    </div>

                                    <div className="program-actions">
                                        <a href="#apply" className="btn-primary">Know More</a>
                                        <a href="#apply" className="btn-secondary">Apply Now</a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Integrated BSCS + MSCS */}
                        {activeTab === 'integrated' && (
                            <div className="program-content active">
                                <div className="program-card">
                                    <div className="program-card-header">
                                        <div className="program-icon">
                                            <svg viewBox="0 0 48 48" fill="none">
                                                <rect x="6" y="12" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
                                                <path d="M18 12V8a6 6 0 1112 0v4" stroke="currentColor" strokeWidth="2" />
                                                <circle cx="24" cy="26" r="4" fill="currentColor" />
                                            </svg>
                                        </div>
                                        <div className="program-badge featured">Accelerated Pathway</div>
                                    </div>
                                    <h3 className="program-name">Integrated BSCS + MSCS – Accelerated (15 Months)</h3>
                                    <p className="program-description">An accelerated integrated pathway enabling learners to earn both bachelor's and master's qualifications through an intensive academic + industry-driven model.</p>

                                    <div className="program-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Duration</span>
                                            <span className="detail-value">15 Months</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Qualification</span>
                                            <span className="detail-value">BSCS + MSCS Dual Degree</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Academic Ownership</span>
                                            <span className="detail-value">Kennedy University</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Industry Delivery Partner</span>
                                            <span className="detail-value">eHack Academy</span>
                                        </div>
                                    </div>

                                    <div className="program-highlights">
                                        <h4>Program Structure:</h4>
                                        <ul>
                                            <li><span className="highlight-icon phase">Phase 1</span> BSCS Foundation</li>
                                            <li><span className="highlight-icon phase">Phase 2</span> Advanced MSCS Coursework</li>
                                            <li><span className="highlight-icon phase">Phase 3</span> Industry Internship & Capstone</li>
                                        </ul>
                                    </div>

                                    <div className="program-highlights">
                                        <h4>Key Benefits:</h4>
                                        <ul>
                                            <li><span className="highlight-icon">✓</span> Earn both degrees in just 15 months</li>
                                            <li><span className="highlight-icon">✓</span> Intensive academic + industry-driven model</li>
                                            <li><span className="highlight-icon">✓</span> Combined BSCS & MSCS curriculum</li>
                                            <li><span className="highlight-icon">✓</span> Industry internship through eHack Academy</li>
                                            <li><span className="highlight-icon">✓</span> Capstone project with joint evaluation panel</li>
                                            <li><span className="highlight-icon">✓</span> 100% Placement Assistance</li>
                                        </ul>
                                    </div>

                                    <div className="program-actions">
                                        <a href="#apply" className="btn-primary">Know More</a>
                                        <a href="#apply" className="btn-secondary">Apply Now</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="partners-section" id="partners">
                <div className="section-container">
                    <span className="section-badge">OUR PARTNERS</span>
                    <h2 className="section-title">Academic & <span className="text-accent">Industry Partners</span></h2>
                    <p className="section-subtitle">We collaborate with global leaders in cybersecurity education and certification.</p>

                    <div className="partners-grid">
                        {/* EC-Council */}
                        <div className="partner-card">
                            <div className="partner-card-logo">
                                <div className="partner-icon-large ec-council">
                                    <svg viewBox="0 0 80 80" fill="none">
                                        <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="3" />
                                        <path d="M20 40h40M40 20v40" stroke="currentColor" strokeWidth="3" />
                                        <circle cx="40" cy="40" r="15" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3>EC-Council</h3>
                            </div>
                            <div className="partner-card-content">
                                <p className="partner-role">Certification-Awarding Body</p>
                                <p className="partner-description">EC-Council is the world&apos;s largest cybersecurity technical certification body. They are the creators of the world-famous Certified Ethical Hacker (CEH) certification and many other industry-leading programs.</p>
                                <ul className="partner-credentials">
                                    <li>🌍 Operating in 145+ Countries</li>
                                    <li>👨‍🎓 350,000+ Certified Professionals</li>
                                    <li>🏢 Trusted by Fortune 500 Companies</li>
                                </ul>
                            </div>
                        </div>

                        {/* Kennedy University */}
                        <div className="partner-card">
                            <div className="partner-card-logo">
                                <div className="partner-icon-large kennedy">
                                    <svg viewBox="0 0 80 80" fill="none">
                                        <path d="M40 8L72 24v32L40 72 8 56V24L40 8z" stroke="currentColor" strokeWidth="3" fill="none" />
                                        <path d="M40 24v32M24 32l16 8 16-8" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3>Kennedy University</h3>
                            </div>
                            <div className="partner-card-content">
                                <p className="partner-role">Degree-Awarding Body</p>
                                <p className="partner-description">Kennedy University is an internationally recognized institution offering accredited degree programs. Their cybersecurity programs combine academic rigor with practical industry skills.</p>
                                <ul className="partner-credentials">
                                    <li>🎓 Internationally Accredited Degrees</li>
                                    <li>📚 Industry-Aligned Curriculum</li>
                                    <li>🌐 Global Alumni Network</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* eHack Role */}
                    <div className="ehack-role-card">
                        <div className="ehack-role-icon">
                            <span>🛡️</span>
                        </div>
                        <div className="ehack-role-content">
                            <h4>eHack Academy - Training & Facilitation Partner</h4>
                            <p>eHack Academy serves as the training and facilitation partner, providing world-class instruction, AI-powered labs, mentorship, and career support to help you succeed in your cybersecurity journey.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Experience Section */}
            <section className="experience-section" id="experience">
                <div className="experience-wrapper">
                    <div className="section-container">
                        <span className="section-badge">LEARNING EXPERIENCE</span>
                        <h2 className="section-title">AI-Powered <span className="text-accent">Learning</span> Environment</h2>
                        <p className="section-subtitle">Experience cutting-edge cybersecurity education with our advanced learning infrastructure.</p>

                        <div className="experience-grid">
                            <div className="experience-card">
                                <div className="experience-icon">
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
                                        <path d="M4 32h40M16 36h16" stroke="currentColor" strokeWidth="2" />
                                        <path d="M14 16l6 6-6 6M22 22h12" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3>AI-Based Labs</h3>
                                <p>Hands-on practice in virtualized environments with AI-powered threat simulations and adaptive learning paths.</p>
                            </div>

                            <div className="experience-card">
                                <div className="experience-icon">
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
                                        <path d="M24 14v10l7 7" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="24" cy="24" r="3" fill="currentColor" />
                                    </svg>
                                </div>
                                <h3>Real-World Simulations</h3>
                                <p>Practice defending against actual attack scenarios in our cyber range with real-time threat intelligence.</p>
                            </div>

                            <div className="experience-card">
                                <div className="experience-icon">
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <circle cx="24" cy="14" r="8" stroke="currentColor" strokeWidth="2" />
                                        <path d="M10 42c0-8 6-14 14-14s14 6 14 14" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3>Industry Mentors</h3>
                                <p>Learn from practicing CISOs, ethical hackers, and security architects with decades of industry experience.</p>
                            </div>

                            <div className="experience-card">
                                <div className="experience-icon">
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <rect x="6" y="6" width="36" height="36" rx="3" stroke="currentColor" strokeWidth="2" />
                                        <path d="M6 18h36M18 18v24" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="30" cy="30" r="6" stroke="currentColor" strokeWidth="2" />
                                        <path d="M34 34l6 6" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3>Capstone Projects</h3>
                                <p>Work on real security assessments, penetration tests, and incident response scenarios for actual organizations.</p>
                            </div>

                            <div className="experience-card">
                                <div className="experience-icon">
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="currentColor" strokeWidth="2" />
                                        <path d="M24 24l18-10M24 24v20M24 24L6 14" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                                    </svg>
                                </div>
                                <h3>Live Classes</h3>
                                <p>Interactive live sessions with industry experts, Q&A, and collaborative learning with peers from diverse backgrounds.</p>
                            </div>

                            <div className="experience-card">
                                <div className="experience-icon">
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <rect x="8" y="4" width="32" height="40" rx="3" stroke="currentColor" strokeWidth="2" />
                                        <path d="M16 12h16M16 20h16M16 28h10" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="32" cy="36" r="8" stroke="currentColor" strokeWidth="2" />
                                        <path d="M29 36l2 2 4-4" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3>Certification Prep</h3>
                                <p>Dedicated preparation for EC-Council exams with practice tests, study guides, and exam strategies.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Career Outcomes Section */}
            <section className="careers-section" id="careers">
                <div className="section-container">
                    <span className="section-badge">CAREER OUTCOMES</span>
                    <h2 className="section-title">Launch Your <span className="text-accent">Cybersecurity Career</span></h2>
                    <p className="section-subtitle">Our graduates work in top organizations across the globe in high-demand security roles.</p>

                    <div className="careers-grid">
                        <div className="career-card">
                            <div className="career-icon">🔍</div>
                            <h3>Cyber Analyst</h3>
                            <p>Monitor security systems, analyze threats, and protect organizational assets.</p>
                            <span className="salary-range">₹6-12 LPA</span>
                        </div>

                        <div className="career-card">
                            <div className="career-icon">🎯</div>
                            <h3>Ethical Hacker</h3>
                            <p>Identify vulnerabilities through authorized penetration testing.</p>
                            <span className="salary-range">₹8-18 LPA</span>
                        </div>

                        <div className="career-card">
                            <div className="career-icon">🛡️</div>
                            <h3>SOC Analyst</h3>
                            <p>Work in Security Operations Centers to detect and respond to incidents.</p>
                            <span className="salary-range">₹5-10 LPA</span>
                        </div>

                        <div className="career-card">
                            <div className="career-icon">📊</div>
                            <h3>Cyber Manager</h3>
                            <p>Lead security teams and manage organizational security programs.</p>
                            <span className="salary-range">₹15-30 LPA</span>
                        </div>

                        <div className="career-card featured">
                            <div className="career-icon">👔</div>
                            <h3>CISO</h3>
                            <p>Chief Information Security Officer - Lead enterprise security strategy.</p>
                            <span className="salary-range">₹40-80+ LPA</span>
                        </div>

                        <div className="career-card">
                            <div className="career-icon">🔐</div>
                            <h3>Security Consultant</h3>
                            <p>Advise organizations on security architecture and compliance.</p>
                            <span className="salary-range">₹12-25 LPA</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lead Capture Section */}
            <section className="apply-section" id="apply">
                <div className="apply-wrapper">
                    <div className="section-container">
                        <div className="apply-grid">
                            <div className="apply-content">
                                <h2>Ready to Start Your <span className="text-accent">Cybersecurity Journey</span>?</h2>
                                <p>Take the first step towards a rewarding career in cybersecurity. Our career counselors are here to help you choose the right program.</p>

                                <div className="apply-features">
                                    <div className="apply-feature">
                                        <span className="feature-icon">✓</span>
                                        <span>Free Career Counselling</span>
                                    </div>
                                    <div className="apply-feature">
                                        <span className="feature-icon">✓</span>
                                        <span>EMI Options Available</span>
                                    </div>
                                    <div className="apply-feature">
                                        <span className="feature-icon">✓</span>
                                        <span>Scholarships for Meritorious Students</span>
                                    </div>
                                </div>

                                <div className="contact-options">
                                    <a href="tel:+919876543210" className="contact-btn phone">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                        </svg>
                                        Call Us
                                    </a>
                                    <a href="https://wa.me/919876543210" className="contact-btn whatsapp">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        WhatsApp
                                    </a>
                                </div>
                            </div>

                            <div className="apply-form-card">
                                <h3>Request a Callback</h3>
                                <form className="apply-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you! Our team will contact you shortly.'); }}>
                                    <input type="text" placeholder="Full Name" required />
                                    <input type="email" placeholder="Email Address" required />
                                    <input type="tel" placeholder="Phone Number" required />
                                    <select required>
                                        <option value="">Select Program</option>
                                        <option value="ec-council">EC-Council Certifications</option>
                                        <option value="bscs">BSCS – Fast Track (1 Year)</option>
                                        <option value="mscs">MSCS – Fast Track (1 Year)</option>
                                        <option value="integrated">Integrated BSCS + MSCS (15 Months)</option>
                                    </select>
                                    <textarea placeholder="Your Message (Optional)" rows={3}></textarea>
                                    <button type="submit" className="btn-apply-form">Submit Inquiry</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer Section */}
            <section className="disclaimer-section">
                <div className="section-container">
                    <div className="disclaimer-card">
                        <h4>⚠️ Important Disclaimer</h4>
                        <p>eHack Academy acts as a training and facilitation partner only. Certifications and degrees are awarded solely by EC-Council and Kennedy University respectively, as per their norms. Students are advised to independently verify accreditation, recognition, program structure, and validity directly from the official websites of EC-Council and Kennedy University. eHack Academy shall not be responsible for any decisions made by students without conducting their own due diligence prior to enrollment.</p>
                    </div>
                </div>
            </section>

            {/* WhatsApp Widget */}
            <a href="https://wa.me/919876543210" className="whatsapp-widget" aria-label="Chat on WhatsApp">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </div>
    );
}
