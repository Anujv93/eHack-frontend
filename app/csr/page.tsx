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
            />
        </div>
    );
}
