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
                            <img src="/images/about-us/manager.jpeg" alt="Sanjeev Gupta" className="founder-image" />
                        </div>
                        <div className="founder-content">
                            <h3 className="founder-name"> Sanjeev Gupta</h3>
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


                </div>
            </section>

            {/* Management & Advisory Board */}
            <section className="advisory-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Management & Advisory Board</h2>
                    </div>
                </div>

                <div className="advisory-marquee-wrapper">
                    <div className="advisory-marquee">
                        <div className="advisory-marquee-content">
                            <div className="advisory-card">
                                <img src="/images/about-us/peterjp.jpeg" alt="J.P Peter" className="advisory-image" />
                                <h3 className="advisory-name">J.P Peter</h3>
                                <p className="advisory-role">Director - Administration & Internal Controls</p>
                                <p className="advisory-bio">
                                    Over 3 decades of experience in Financial Services, Banking, and Broking. Expert in Capital Restructuring, Risk Management, and Organizational IT Security Infrastructure.
                                </p>
                            </div>

                            <div className="advisory-card">
                                <div className="advisory-image-placeholder" style={{ background: '#FFF7ED', color: '#FF6B00', border: '3px solid #FFEDD5' }}>
                                    <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>NK</span>
                                </div>
                                <h3 className="advisory-name">N. Kumar</h3>
                                <p className="advisory-role">Head Advisory & Consultant - Cyber Security</p>
                                <p className="advisory-bio">
                                    9+ years in Penetration Testing, Red Teaming & Cyber Incident Response. Trained Interpol, CBI & solved 350+ cyber crime cases. OSCP, CEH & 20+ global certifications.
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

                        {/* Duplicate for seamless loop */}
                        <div className="advisory-marquee-content" aria-hidden="true">
                            <div className="advisory-card">
                                <img src="/images/about-us/peterjp.jpeg" alt="J.P Peter" className="advisory-image" />
                                <h3 className="advisory-name">J.P Peter</h3>
                                <p className="advisory-role">Director - Administration & Internal Controls</p>
                                <p className="advisory-bio">
                                    Over 3 decades of experience in Financial Services, Banking, and Broking. Expert in Capital Restructuring, Risk Management, and Organizational IT Security Infrastructure.
                                </p>
                            </div>

                            <div className="advisory-card">
                                <div className="advisory-image-placeholder" style={{ background: '#FFF7ED', color: '#FF6B00', border: '3px solid #FFEDD5' }}>
                                    <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>NK</span>
                                </div>
                                <h3 className="advisory-name">N. Kumar</h3>
                                <p className="advisory-role">Head Advisory & Consultant - Cyber Security</p>
                                <p className="advisory-bio">
                                    9+ years in Penetration Testing, Red Teaming & Cyber Incident Response. Trained Interpol, CBI & solved 350+ cyber crime cases. OSCP, CEH & 20+ global certifications.
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
                </div>
            </section>

            {/* Contact Us Section - Premium Redesign */}
            <section className="contact-section-pro">
                {/* Background Elements */}
                <div className="contact-bg-pattern"></div>
                <div className="contact-bg-gradient"></div>

                <div className="container">
                    {/* Section Header */}
                    <div className="contact-header">
                        <div className="contact-header-badge">
                            <span className="pulse-dot"></span>
                            <span>We're Here to Help</span>
                        </div>
                        <h2 className="contact-header-title">Let's Start a Conversation</h2>
                        <p className="contact-header-subtitle">
                            Whether you have questions about our programs, need guidance on your career path, or want to explore partnership opportunities — we're just a message away.
                        </p>
                    </div>

                    {/* Main Contact Grid */}
                    <div className="contact-pro-grid">
                        {/* Left Column - Contact Info */}
                        <div className="contact-info-column">
                            {/* Quick Actions */}
                            <div className="quick-actions-card">
                                <h3 className="quick-actions-title">Quick Connect</h3>
                                <div className="quick-actions-grid">
                                    <a href="tel:+919886035330" className="quick-action-btn quick-action-call">
                                        <div className="quick-action-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div className="quick-action-content">
                                            <span className="quick-action-label">Call Us</span>
                                            <span className="quick-action-value">+91-9886035330</span>
                                        </div>
                                        <div className="quick-action-arrow">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </a>

                                    <a href="mailto:info@ehackacademy.com" className="quick-action-btn quick-action-email">
                                        <div className="quick-action-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="quick-action-content">
                                            <span className="quick-action-label">Email Us</span>
                                            <span className="quick-action-value">info@ehackacademy.com</span>
                                        </div>
                                        <div className="quick-action-arrow">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </a>

                                    <a href="https://wa.me/919886035330" target="_blank" rel="noopener noreferrer" className="quick-action-btn quick-action-whatsapp">
                                        <div className="quick-action-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </div>
                                        <div className="quick-action-content">
                                            <span className="quick-action-label">WhatsApp</span>
                                            <span className="quick-action-value">Chat with us</span>
                                        </div>
                                        <div className="quick-action-arrow">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Location Card */}
                            <div className="location-card">
                                <div className="location-card-header">
                                    <div className="location-icon-wrapper">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="location-card-title">Visit Our Campus</h4>
                                        <span className="location-badge">Bangalore, India</span>
                                    </div>
                                </div>
                                <div className="location-address">
                                    <p>
                                        <strong>eHack Academy</strong><br />
                                        No. 202, I Floor, New BEL Road,<br />
                                        Opposite HP Petrol Pump,<br />
                                        Bangalore 560094
                                    </p>
                                </div>
                                <a
                                    href="https://www.google.com/maps/search/No.+202,+I+Floor,+New+BEL+Road,+Opposite+HP+Petrol+Pump,+Bangalore+560094"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="location-directions-link"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    Get Directions
                                </a>
                            </div>

                            {/* Working Hours Card */}
                            <div className="hours-card">
                                <div className="hours-card-header">
                                    <div className="hours-icon-wrapper">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                    </div>
                                    <h4 className="hours-card-title">Working Hours</h4>
                                </div>
                                <div className="hours-list">
                                    <div className="hours-item hours-item-open">
                                        <div className="hours-day">
                                            <span className="status-indicator status-open"></span>
                                            Tuesday - Sunday
                                        </div>
                                        <div className="hours-time">9:30 AM - 6:30 PM</div>
                                    </div>
                                    <div className="hours-item hours-item-closed">
                                        <div className="hours-day">
                                            <span className="status-indicator status-closed"></span>
                                            Monday
                                        </div>
                                        <div className="hours-time">Closed</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Map */}
                        <div className="contact-map-column">
                            <div className="map-card">
                                <div className="map-card-header">
                                    <span className="map-live-badge">
                                        <span className="live-dot"></span>
                                        Live Location
                                    </span>
                                </div>
                                <div className="map-frame">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.1639088571997!2d77.55799367507656!3d13.024997387278707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d68c8000001%3A0xe7ec9d97db3fe36b!2sNew%20BEL%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1704871234567!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="eHack Academy Location"
                                    ></iframe>
                                </div>
                                <div className="map-card-footer">
                                    <div className="map-info">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>New BEL Road, Bangalore</span>
                                    </div>
                                    <a
                                        href="https://www.google.com/maps/search/No.+202,+I+Floor,+New+BEL+Road,+Opposite+HP+Petrol+Pump,+Bangalore+560094"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="map-open-btn"
                                    >
                                        Open in Maps
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Response Time Card */}
                            <div className="response-card">
                                <div className="response-icon">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="response-content">
                                    <h4>Quick Response</h4>
                                    <p>We typically respond within <strong>2-4 hours</strong> during business hours</p>
                                </div>
                            </div>
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
