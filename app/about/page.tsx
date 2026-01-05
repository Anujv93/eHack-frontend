'use client';

import './page.css';

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="about-hero-light">
                <div className="container">
                    <div className="hero-content-compact">
                        <span className="hero-badge-light">ABOUT US</span>
                        <h1 className="hero-title-light">Empowering the Next Generation of Tech Professionals</h1>
                        <p className="hero-subtitle-light">
                            Leading training institute dedicated to transforming careers through world-class education in Cybersecurity and Digital Marketing
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="container">
                    <div className="mission-content">
                        <span className="section-badge">OUR MISSION</span>
                        <h2 className="section-title">Shaping Careers, Securing the Future</h2>
                        <p className="mission-text">
                            At eHack Academy, our mission is to help students enhance their knowledge and skills in Cyber Security and Digital Marketing, thereby creating and improving their career opportunities in these rapidly evolving fields.
                        </p>
                        <p className="mission-text">
                            We provide high-end infrastructure with the latest technology and certified instructors to ensure effective and quality education that prepares our students for real-world challenges.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge section-badge-blue">WHY CHOOSE US</span>
                        <h2 className="section-title">What Sets Us Apart</h2>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-number">#1</div>
                            <h3 className="feature-title">#1 in Consistency</h3>
                            <p className="feature-description">
                                Ranked as India's #1 in classroom training with proven track record of student success.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper feature-icon-purple">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Innovative Approach</h3>
                            <p className="feature-description">
                                Recognized as a leading IT training company with cutting-edge curriculum and methodologies.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper feature-icon-green">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Expert Tutors</h3>
                            <p className="feature-description">
                                Training delivered by India's best industry experts with real-world experience.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper feature-icon-yellow">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Study Material</h3>
                            <p className="feature-description">
                                Comprehensive resources including e-books, HD videos, and hands-on lab access.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper feature-icon-cyan">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Global Reach</h3>
                            <p className="feature-description">
                                Strong global authorizations and strategic partnerships with industry leaders.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Practical Approach</h3>
                            <p className="feature-description">
                                Focus on live and real-time project-based training for hands-on experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="leadership-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge section-badge-purple">LEADERSHIP</span>
                        <h2 className="section-title">Meet Our Founder</h2>
                    </div>

                    <div className="founder-card">
                        <div className="founder-image-wrapper">
                            <img src="/images/about-us/manager.jpeg" alt="Mr. Sanjeev Gupta" className="founder-image" />
                        </div>
                        <div className="founder-content">
                            <h3 className="founder-name">Mr. Sanjeev Gupta</h3>
                            <p className="founder-role">Founder & CEO</p>
                            <p className="founder-bio">
                                With over 30+ years of experience spanning Banking, Finance, Leasing, and Cyber Security, Mr. Sanjeev Gupta is a visionary leader dedicated to shaping the next generation of cyber security professionals.
                            </p>
                            <div className="founder-education">
                                <strong>Education:</strong> IIM Calcutta (PG in Business Management), NIPM Calcutta (Personnel Management), Bangalore University (LLB), and NEHU Shillong (B.Com Hons).
                            </div>
                            <p className="founder-additional">
                                He also serves as Director of Operations at Byte Code Cyber Security Pvt. Ltd., bringing a unique blend of business acumen and technical expertise to eHack Academy's strategic direction.
                            </p>
                        </div>
                    </div>

                    <div className="founder-card">
                        <div className="founder-image-wrapper">
                            <div className="founder-image-placeholder" style={{ background: '#FFF7ED', color: '#FF6B00', border: '3px solid #FFEDD5' }}>
                                <span style={{ fontSize: '3.5rem', fontWeight: '800' }}>NK</span>
                            </div>
                        </div>
                        <div className="founder-content">
                            <h3 className="founder-name">Neel Kumar</h3>
                            <p className="founder-role">Sr. Cyber Security Analyst | CISO | OSCP | OSWP</p>

                            <p className="founder-bio">
                                With over 9+ years of extensive experience in Penetration Testing, Red Teaming, and Cyber Incident Response, Neel Kumar is a renowned expert in both offensive and defensive security credentials. He has trained law enforcement agencies globally including Interpol and CBI, and solved over 350+ cyber crime cases.
                            </p>

                            <div className="founder-education">
                                <strong>Education:</strong> B. Tech & M. Tech in Computer Science, Cyber Law (Indian Law Institute), Diploma in Digital Forensic & Cyber Crime Investigation.
                            </div>

                            <div className="profile-section">
                                <h4 className="profile-section-title">Professional Certifications</h4>
                                <ul className="profile-list">
                                    <li>Offensive Security Certified Professional (OSCP)</li>
                                    <li>Offensive Security Wireless Professional (OSWP)</li>
                                    <li>Licensed Penetration Tester (LPT)</li>
                                    <li>Certified Ethical Hacker (CEH)</li>
                                    <li>Computer Hacking Forensic Investigator (CHFI)</li>
                                    <li>SANS Advanced Web App Pen Test</li>
                                    <li>Certified Information System Security Expert (CISE)</li>
                                    <li>EnCase Certified Examiner</li>
                                    <li>Cisco Certified Network Associate (CCNA)</li>
                                    <li>Microsoft Certified Server Expert (MCSE)</li>
                                </ul>
                                <p className="founder-additional" style={{ fontSize: '0.9rem', fontStyle: 'italic', marginTop: '-0.5rem' }}>
                                    +20 more global certifications including OSSTMM, Mile2, Qualys, and IBM credentials.
                                </p>
                            </div>

                            <div className="profile-section">
                                <h4 className="profile-section-title">Key Assignments & Training Delivery</h4>
                                <div className="profile-grid">
                                    <div>
                                        <strong style={{ display: 'block', marginBottom: '0.8rem', color: '#1a1a1a' }}>Law Enforcement & Govt</strong>
                                        <ul className="profile-list single-col" style={{ marginBottom: 0 }}>
                                            <li>CBI & CBI Academy (India)</li>
                                            <li>Singapore & Nepal Police</li>
                                            <li>NIA (National Investigation Agency)</li>
                                            <li>Ministry of Defense & PMO Team</li>
                                            <li>Interpol Officials</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block', marginBottom: '0.8rem', color: '#1a1a1a' }}>Corporate Clients</strong>
                                        <div className="profile-tags">
                                            <span className="profile-tag">Google</span>
                                            <span className="profile-tag">IBM</span>
                                            <span className="profile-tag">Samsung</span>
                                            <span className="profile-tag">Yahoo</span>
                                            <span className="profile-tag">HCL</span>
                                            <span className="profile-tag">MetLife</span>
                                            <span className="profile-tag">Gemalto</span>
                                            <span className="profile-tag">Paladion</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-section">
                                <h4 className="profile-section-title">Forensic Expertise</h4>
                                <p className="founder-additional">
                                    Solved more than <strong>350+ cases</strong> involving Hacking, Online Blackmailing, Banking Crimes, and Identity Theft. Expert in automated tools like FTK, Encase, Cellebrite UFED, and Oxygen Mobile Forensic Suite.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Management & Advisory Board */}
            <section className="advisory-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Management & Advisory Board</h2>
                    </div>

                    <div className="advisory-grid">
                        <div className="advisory-card">
                            <img src="/images/about-us/peterjp.jpeg" alt="J.P Peter" className="advisory-image" />
                            <h3 className="advisory-name">J.P Peter</h3>
                            <p className="advisory-role">Director - Administration & Internal Controls</p>
                            <p className="advisory-bio">
                                Over 3 decades of experience in Financial Services, Banking, and Broking. Expert in Capital Restructuring, Risk Management, and Organizational IT Security Infrastructure.
                            </p>
                        </div>

                        <div className="advisory-card">
                            <img src="/images/about-us/sheenu.png" alt="Dr. Sheenu Jain" className="advisory-image" />
                            <h3 className="advisory-name">Dr. Sheenu Jain</h3>
                            <p className="advisory-role">Advisory Board Member</p>
                            <p className="advisory-bio">
                                PhD holder and Associate Professor at IIHMR University; Co-founder of IIHMR Startups. Selected as Young Management Scholar at IIM Calcutta and World Bank CES Global Tech Challenge winner.
                            </p>
                        </div>

                        <div className="advisory-card">
                            <img src="/images/about-us/murali.png" alt="Dr. Murali S" className="advisory-image" />
                            <h3 className="advisory-name">Dr. Murali S</h3>
                            <p className="advisory-role">Advisory Board Member</p>
                            <p className="advisory-bio">
                                24+ years of techno-management experience. Certified Handwriting Analyst, Career Coach, and Counselling Psychologist bringing unique perspectives to student development.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-box">
                        <div className="cta-content">
                            <h2 className="cta-title">Ready to Transform Your Career?</h2>
                            <p className="cta-subtitle">
                                Join thousands of professionals who have advanced their careers with eHack Academy. Start your journey today!
                            </p>
                        </div>
                        <div className="cta-actions">
                            <a href="/courses" className="cta-btn-primary">
                                Explore Courses
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
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
        </>
    );
}
