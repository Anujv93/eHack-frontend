'use client';

import './page.css';
import Image from 'next/image';
import CertificateHeader from "@/components/single-certificate/header/header";
import CTASection from "@/components/global/cta-section/cta-section";
import {
    GraduationCap,
    School,
    Shield,
    Award,
    Lock,
    BarChart3,
    Target,
    Building,
    Phone
} from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

const NAV_SECTIONS = [
    { id: 'mission', label: 'Our Mission' },
    { id: 'impact', label: 'Impact' },
    { id: 'initiatives', label: 'Initiatives' },
    { id: 'partners', label: 'Partners' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'roadmap', label: 'Roadmap' },
];

export default function CSRPage() {
    const [activeSection, setActiveSection] = useState('mission');
    const [showStickyNav, setShowStickyNav] = useState(false);
    const stickyNavRef = useRef<HTMLDivElement>(null);

    // Handle scroll to update active section and sticky nav visibility
    useEffect(() => {
        const handleScroll = () => {
            // Show sticky nav after scrolling past the header (approximately 400px)
            const scrollY = window.scrollY;
            setShowStickyNav(scrollY > 400);

            // Find which section is currently in view
            const sectionElements = NAV_SECTIONS.map(section => ({
                id: section.id,
                element: document.getElementById(section.id),
            })).filter(s => s.element);

            const viewportHeight = window.innerHeight;
            const offset = 150; // Account for sticky nav height

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const { id, element } = sectionElements[i];
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= offset + viewportHeight * 0.3) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to section
    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Height of sticky nav
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, []);

    return (
        <div className="csr-page-wrapper">
            <CertificateHeader
                title="Corporate Social Responsibility"
                subtitle="Empowering Society Through Cybersecurity, Employability & Emerging Technologies"
                backgroundImage="/images/csr-banner-image.jpg"
            />

            {/* STICKY SECTION NAVIGATION */}
            <nav
                ref={stickyNavRef}
                className={`sticky-section-nav ${showStickyNav ? 'visible' : ''}`}
            >
                <div className="sticky-nav-container">
                    <div className="sticky-nav-links">
                        {NAV_SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                className={`sticky-nav-link ${activeSection === section.id ? 'active' : ''}`}
                                onClick={() => scrollToSection(section.id)}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>
                    <div className="sticky-nav-cta">
                        <a href="tel:+919886035330" className="sticky-nav-call-btn">
                            <Phone size={16} />
                            <span>Call Now</span>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Mission Section */}
            <section id="mission" className="csr-mission-section">
                <div className="container">
                    <div className="csr-mission-grid">
                        <div className="csr-mission-image-wrapper">
                            <Image
                                src="/images/csr-our-missioin.png"
                                alt="Our CSR Mission"
                                width={600}
                                height={450}
                                className="csr-mission-img"
                            />
                        </div>
                        <div className="csr-mission-content">
                            <div className="section-badge-wrapper">
                                <span className="section-badge-orange-big">OUR CSR MISSION</span>
                            </div>
                            <h2 className="csr-mission-title">"To make India Cyber <span className="text-orange">Secure</span>, Skill-Enabled and Employment Ready"</h2>
                            <div className="csr-mission-text">
                                <p>We strive to create a cyber-aware society, enable youth with future-ready skills, improve employability through industry-aligned training, and spread happiness by empowering lives with knowledge.</p>
                                <p>At eHack Academy Bangalore, CSR is not just a commitment—it is our mission. For over a decade, we have actively worked towards building a cyber-aware, skilled, and employable society.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section id="impact" className="impact-stats-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge-orange-big">OUR IMPACT</span>
                        <h2 className="section-title">10+ Years of CSR <span className="text-orange">Excellence</span></h2>
                        <p className="section-subtitle">Making a difference through education and empowerment</p>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon"><GraduationCap size={48} strokeWidth={1.5} /></div>
                            <div className="stat-value">50,000+</div>
                            <div className="stat-label">Students Trained</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><School size={48} strokeWidth={1.5} /></div>
                            <div className="stat-value">100+</div>
                            <div className="stat-label">Institutions Served</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><Shield size={48} strokeWidth={1.5} /></div>
                            <div className="stat-value">500+</div>
                            <div className="stat-label">Awareness Programs</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><Award size={48} strokeWidth={1.5} /></div>
                            <div className="stat-value">10+</div>
                            <div className="stat-label">Years of Service</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Focus Areas */}
            <section id="initiatives" className="focus-areas-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge-orange-big">FOCUS AREAS</span>
                        <h2 className="section-title">Our CSR <span className="text-orange">Initiatives</span></h2>
                    </div>

                    <div className="focus-grid">
                        <div className="focus-card">
                            <div className="focus-icon"><Lock size={56} strokeWidth={1.5} /></div>
                            <h3 className="focus-title">Cybersecurity Awareness</h3>
                            <ul className="focus-list">
                                <li>Cyber crime prevention programs</li>
                                <li>Digital safety for students and staff</li>
                                <li>Data privacy and cyber hygiene workshops</li>
                                <li>Ethical hacking fundamentals</li>
                            </ul>
                        </div>

                        <div className="focus-card">
                            <div className="focus-icon"><BarChart3 size={56} strokeWidth={1.5} /></div>
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
                            <div className="focus-icon"><Target size={56} strokeWidth={1.5} /></div>
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
            <section id="partners" className="institutions-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge-orange-big">INSTITUTIONS WE SERVE</span>
                        <h2 className="section-title"><span className="text-orange">Partnering</span> with Leading Educational Institutions</h2>
                        <p className="section-subtitle">
                            Over the last decade, we have proudly partnered with numerous educational institutions across Bangalore and India
                        </p>
                    </div>

                    <div className="institutions-grid">
                        <div className="institution-card">
                            <div className="institution-icon icon-dark-bg">
                                <Image
                                    src="/csr-uni-logo/ramaiah.png"
                                    alt="MS Ramaiah Institute of Technology"
                                    width={200}
                                    height={100}
                                />
                            </div>
                            <h4 className="institution-name">MS Ramaiah Institute of Technology</h4>
                            <p className="institution-desc">Engineering, BCA, MCA & Polytechnic</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon icon-dark-bg">
                                <Image
                                    src="/csr-uni-logo/ramaiah-management.png"
                                    alt="MS Ramaiah Institute of Management"
                                    width={200}
                                    height={100}
                                />
                            </div>
                            <h4 className="institution-name">MS Ramaiah Institute of Management</h4>
                            <p className="institution-desc">PGDM Programs</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon">
                                <Image
                                    src="/csr-uni-logo/christ.jpeg"
                                    alt="Christ University"
                                    width={200}
                                    height={100}
                                />
                            </div>
                            <h4 className="institution-name">Christ University</h4>
                            <p className="institution-desc">Multiple Departments</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon"><School size={40} strokeWidth={1.5} /></div>
                            <h4 className="institution-name">Sir M. Visvesvaraya Institute</h4>
                            <p className="institution-desc">Engineering & Technology</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon icon-dark-bg">
                                <Image
                                    src="/csr-uni-logo/reva-university.webp"
                                    alt="REVA University"
                                    width={200}
                                    height={100}
                                />
                            </div>
                            <h4 className="institution-name">REVA University</h4>
                            <p className="institution-desc">Postgraduate Programs</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon">
                                <Image
                                    src="/csr-uni-logo/PESU.png"
                                    alt="PES Institute of Technology"
                                    width={200}
                                    height={100}
                                />
                            </div>
                            <h4 className="institution-name">PES Institute of Technology</h4>
                            <p className="institution-desc">Engineering Programs</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon">
                                <Image
                                    src="/csr-uni-logo/nitte.svg"
                                    alt="Nitte Meenakshi Institute (NMIT)"
                                    width={200}
                                    height={100}
                                />
                            </div>
                            <h4 className="institution-name">Nitte Meenakshi Institute (NMIT)</h4>
                            <p className="institution-desc">Technology Programs</p>
                        </div>
                        <div className="institution-card">
                            <div className="institution-icon">
                                <Image
                                    src="/csr-uni-logo/sambhram.jpg"
                                    alt="Sambhram Institute"
                                    width={200}
                                    height={100}
                                />
                            </div>
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
            <section id="corporate" className="corporate-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge-orange-big">CORPORATE PARTNERSHIPS</span>
                        <h2 className="section-title">Corporate CSR <span className="text-orange">Engagements</span></h2>
                        <p className="section-subtitle">
                            Delivering customized cybersecurity and emerging technology workshops for leading organizations
                        </p>
                    </div>

                    <div className="corporate-grid">
                        <div className="corporate-card">
                            <div className="corporate-logo">
                                <Image
                                    src="/csr-uni-logo/cashfree.png"
                                    alt="Cashfree"
                                    width={200}
                                    height={100}
                                />
                            </div>
                            <h4 className="corporate-name">Cashfree</h4>
                            <p className="corporate-desc">Payment Technology Solutions</p>
                        </div>
                        <div className="corporate-card">
                            <div className="corporate-logo">
                                <Image
                                    src="/csr-uni-logo/bel.jpeg"
                                    alt="Bharat Electronics Limited (BEL)"
                                    width={200}
                                    height={100}
                                />
                            </div>
                            <h4 className="corporate-name">Bharat Electronics Limited (BEL)</h4>
                            <p className="corporate-desc">Defense & Aerospace</p>
                        </div>
                        <div className="corporate-card">
                            <div className="corporate-logo"><Building size={64} strokeWidth={1.5} /></div>
                            <h4 className="corporate-name">IT & Non-IT Organizations</h4>
                            <p className="corporate-desc">Various Industry Sectors</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap 2026-2028 */}
            <section id="roadmap" className="roadmap-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge-orange-big">FUTURE VISION</span>
                        <h2 className="section-title">Our <span className="text-orange">Roadmap</span>: 2026 – 2028</h2>
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

            <CTASection
                title="Partner with Us to Build a Safer, Smarter India"
                subtitle="We invite schools, colleges, corporates, trusts, NGOs, and government organizations to partner with us in building a safer, smarter and more skilled India."
                features={["Cybersecurity Awareness", "Skill Development", "Employability", "Digital Safety"]}
                customContent={
                    <div className="csr-cta-actions" style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>Get in Touch</h3>
                        <p style={{ color: '#666', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>Connect with us directly for partnership opportunities.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <a href="mailto:info@ehackacademy.com" className="btn-email" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                Email Us
                            </a>
                            <a href="https://wa.me/919886035330" className="btn-whatsapp" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
