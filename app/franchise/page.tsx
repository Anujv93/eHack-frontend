'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import './franchise.css';
import CertificateHeader from "@/components/single-certificate/header/header";

// SOP Data
const sopData = [
    {
        title: "Franchise Onboarding SOP",
        items: [
            "Initial enquiry and eligibility assessment",
            "Business discussion and evaluation",
            "Franchise agreement and documentation",
            "Infrastructure planning and setup guidance",
            "Brand onboarding and center launch support"
        ]
    },
    {
        title: "Infrastructure & Branding SOP",
        items: [
            "Classroom and lab setup standards",
            "Hardware, software, and connectivity guidelines",
            "Approved branding usage (logo, creatives, signage)",
            "Compliance with academic and brand policies"
        ]
    },
    {
        title: "Sales & Counselling SOP",
        items: [
            "Central and local lead handling framework",
            "Structured counselling process",
            "Clear course communication and fee transparency",
            "Strict policy against false commitments or misleading claims"
        ]
    },
    {
        title: "Marketing SOP",
        items: [
            "Central digital marketing and campaign support",
            "Access to approved creatives and communication material",
            "Local marketing guidelines (offline & partnerships)",
            "Brand consistency across all channels"
        ]
    },
    {
        title: "Academic Delivery SOP",
        items: [
            "Standardized curriculum and learning roadmap",
            "Trainer qualification and onboarding guidelines",
            "Hands-on, lab-focused training methodology",
            "Periodic assessments, projects, and evaluations"
        ]
    },
    {
        title: "Student Management SOP",
        items: [
            "Student onboarding and documentation process",
            "LMS access and learning resources",
            "Academic support and grievance handling",
            "Feedback and continuous improvement mechanism"
        ]
    },
    {
        title: "Placement & Career Support SOP",
        items: [
            "Placement eligibility criteria",
            "Resume building and interview preparation support",
            "Career guidance and industry exposure sessions",
            "Ethical placement assistance without guarantees"
        ]
    },
    {
        title: "Finance & Governance SOP",
        items: [
            "Fee collection and accounting guidelines",
            "Revenue sharing and reporting structure",
            "Compliance, audits, and escalation matrix",
            "Governance and performance review framework"
        ]
    }
];

// Accordion Component
function Accordion({ items }: { items: typeof sopData }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="accordion-container">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                >
                    <div
                        className="accordion-header"
                        onClick={() => toggleAccordion(index)}
                    >
                        <div className="accordion-header-left">
                            <span className="accordion-number">{String(index + 1).padStart(2, '0')}</span>
                            <span className="accordion-title">{item.title}</span>
                        </div>
                        <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="accordion-content">
                        <div className="accordion-body">
                            <ul>
                                {item.items.map((listItem, i) => (
                                    <li key={i}>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {listItem}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function FranchisePage() {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            // Show nav after scrolling past hero section (100px)
            setIsNavVisible(window.scrollY > 100);

            // Determine active section
            const sections = ['programs', 'why-choose', 'sop-framework', 'business-model', 'apply', 'enquire'];
            let currentSection = '';

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if section is in the middle of the viewport
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        currentSection = sectionId;
                        break;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const openFranchisePopup = (e: React.MouseEvent) => {
        e.preventDefault();
        window.dispatchEvent(new Event('openFranchisePopup'));
    };

    return (
        <main>
            {/* Sticky Section Nav */}
            <nav className={`franchise-section-nav ${isNavVisible ? 'visible' : ''}`}>
                <div className="section-nav-container">
                    <div className="section-nav-links">
                        <button
                            className={`section-nav-link ${activeSection === 'programs' ? 'active' : ''}`}
                            onClick={() => scrollToSection('programs')}
                        >
                            Programs
                        </button>
                        <button
                            className={`section-nav-link ${activeSection === 'why-choose' ? 'active' : ''}`}
                            onClick={() => scrollToSection('why-choose')}
                        >
                            Why Choose
                        </button>
                        <button
                            className={`section-nav-link ${activeSection === 'sop-framework' ? 'active' : ''}`}
                            onClick={() => scrollToSection('sop-framework')}
                        >
                            SOPs
                        </button>
                        <button
                            className={`section-nav-link ${activeSection === 'business-model' ? 'active' : ''}`}
                            onClick={() => scrollToSection('business-model')}
                        >
                            Business Model
                        </button>
                        <button
                            className={`section-nav-link ${activeSection === 'apply' ? 'active' : ''}`}
                            onClick={() => scrollToSection('apply')}
                        >
                            Who Apply
                        </button>
                        <button
                            className={`section-nav-link ${activeSection === 'enquire' ? 'active' : ''}`}
                            onClick={() => scrollToSection('enquire')}
                        >
                            Enquire
                        </button>
                    </div>
                    <div className="nav-cta">
                        <a href="tel:+919886035330" className="nav-call-btn">
                            <Phone size={16} />
                            <span>Call Now</span>
                        </a>
                    </div>
                </div>
            </nav>

            <CertificateHeader
                title="Partner with eHack Academy"
                subtitle="eHack Academy offers a structured and scalable franchise opportunity in the fast-growing domain of cybersecurity and emerging technologies. With over a decade of experience in professional training and enterprise security services, we've built a strong reputation for industry-aligned education, ethical practices, and outcome-focused learning."
                backgroundImage="/images/franchise-popup-image.jpg"
            />

            {/* Programs Offered Section */}
            <section id="programs" className="programs-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Programs You&apos;ll <span className="text-orange">Deliver</span></h2>
                        <p>As a franchise partner, you become part of a future-ready education ecosystem delivering high-demand programs</p>
                    </div>
                    <div className="programs-image-grid">
                        <div className="program-image-card">
                            <div className="program-image-wrapper">
                                <Image
                                    src="/images/cybersecurity.jpg"
                                    alt="Cyber Security Program"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="program-image-overlay"></div>
                            </div>
                            <div className="program-card-content">
                                <div className="program-card-badge">Most Popular</div>
                                <h3>Cyber Security</h3>
                                <p>Industry-leading certifications including CEH, CHFI, CPENT & more with EC-Council partnership</p>
                                <div className="program-card-stats">
                                    <span><strong>6+</strong> Certifications</span>
                                    <span><strong>100%</strong> Practical</span>
                                </div>
                            </div>
                        </div>
                        <div className="program-image-card">
                            <div className="program-image-wrapper">
                                <Image
                                    src="/images/datascience.jpeg"
                                    alt="Data Science & Analytics Program"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="program-image-overlay"></div>
                            </div>
                            <div className="program-card-content">
                                <h3>Data Science & Analytics</h3>
                                <p>Comprehensive training in Python, Machine Learning, AI & Big Data technologies</p>
                                <div className="program-card-stats">
                                    <span><strong>AI</strong> Focused</span>
                                    <span><strong>Job</strong> Ready</span>
                                </div>
                            </div>
                        </div>
                        <div className="program-image-card">
                            <div className="program-image-wrapper">
                                <Image
                                    src="/images/robotics.jpeg"
                                    alt="Robotics, IoT & AI Program"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="program-image-overlay"></div>
                            </div>
                            <div className="program-card-content">
                                <h3>Robotics, IoT & AI</h3>
                                <p>Hands-on learning with Arduino, Raspberry Pi, sensors & automation systems</p>
                                <div className="program-card-stats">
                                    <span><strong>Hands-on</strong> Labs</span>
                                    <span><strong>Industry</strong> Projects</span>
                                </div>
                            </div>
                        </div>
                        <div className="program-image-card">
                            <div className="program-image-wrapper">
                                <Image
                                    src="/images/social-media-marketing.jpg"
                                    alt="Digital Marketing Program"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="program-image-overlay"></div>
                            </div>
                            <div className="program-card-content">
                                <h3>Digital Marketing</h3>
                                <p>Master SEO, Social Media, PPC, Content Marketing & Analytics strategies</p>
                                <div className="program-card-stats">
                                    <span><strong>10+</strong> Modules</span>
                                    <span><strong>Live</strong> Projects</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section id="why-choose" className="why-choose-section">
                <div className="section-container">
                    <div className="section-header why-choose-header">
                        <h2>Why Choose an <span className="text-orange">eHack Academy</span> Franchise</h2>
                        <p className="why-choose-description">Join a proven ecosystem designed for quality consistency, operational clarity, and long-term sustainability</p>
                    </div>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <span className="benefit-number">01</span>
                            <h3><span className="text-orange">10+ Years</span> of Domain Experience</h3>
                            <p>Proven expertise in cybersecurity training and enterprise security services with a track record of success.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="benefit-number">02</span>
                            <h3><span className="text-orange">High-Demand</span> Skill Programs</h3>
                            <p>Industry-relevant programs aligned with current and emerging job roles in the technology sector.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="benefit-number">03</span>
                            <h3>Centralized <span className="text-orange">Support</span> System</h3>
                            <p>Academic design, marketing strategy, sales enablement, and operational guidance provided centrally.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="benefit-number">04</span>
                            <h3><span className="text-orange">Ethical</span> & Process-Driven Model</h3>
                            <p>Transparent counselling, structured SOPs, and compliance-first operations ensure trust and quality.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="benefit-number">05</span>
                            <h3><span className="text-orange">Scalable</span> Business Opportunity</h3>
                            <p>Designed for growth across classroom, online, and corporate training segments with multiple revenue streams.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SOP Framework Section */}
            <section id="sop-framework" className="sop-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Franchise SOP <span className="text-orange">Framework</span></h2>
                        <p>Our comprehensive <span className="text-orange">Standard Operating Procedures</span> ensure quality consistency across all franchise locations</p>
                    </div>
                    <div className="sop-intro">
                        <p>Click on each section to explore the detailed processes and guidelines that power every eHack Academy franchise.</p>
                    </div>
                    <Accordion items={sopData} />
                </div>
            </section>

            {/* Business Model Section */}
            <section id="business-model" className="business-model-section">
                <div className="section-container">
                    <div className="section-header business-model-header">
                        <h2>Franchise <span className="text-orange">Business Model</span> Highlights</h2>
                        <p className="business-model-description">A balanced model designed for profitability with quality delivery</p>
                    </div>
                    <div className="model-highlights-grid">
                        <div className="model-card">
                            <div className="model-card-image">
                                <Image
                                    src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80"
                                    alt="Low to Moderate Investment"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="model-card-content">
                                <h3><span className="text-orange">Low to Moderate</span> Investment</h3>
                                <p>Accessible entry point with flexible investment options suited for various business scales.</p>
                            </div>
                        </div>
                        <div className="model-card">
                            <div className="model-card-image">
                                <Image
                                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80"
                                    alt="Revenue Sharing Structure"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="model-card-content">
                                <h3><span className="text-orange">Revenue Sharing</span> Structure</h3>
                                <p>Transparent and fair revenue sharing model that aligns incentives for mutual growth.</p>
                            </div>
                        </div>
                        <div className="model-card">
                            <div className="model-card-image">
                                <Image
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
                                    alt="Multiple Revenue Streams"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="model-card-content">
                                <h3><span className="text-orange">Multiple</span> Revenue Streams</h3>
                                <p>Diversified income from classroom, online, and corporate training segments.</p>
                            </div>
                        </div>
                    </div>
                    <div className="revenue-streams">
                        <h3>Available Revenue Streams</h3>
                        <div className="streams-grid">
                            <div className="stream-item">
                                <div className="stream-image">
                                    <Image
                                        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
                                        alt="Classroom Training Programs"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <span>Classroom Training Programs</span>
                            </div>
                            <div className="stream-item">
                                <div className="stream-image">
                                    <Image
                                        src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80"
                                        alt="Online & Hybrid Learning"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <span>Online & Hybrid Learning</span>
                            </div>
                            <div className="stream-item">
                                <div className="stream-image">
                                    <Image
                                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                                        alt="Corporate Training & Upskilling"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <span>Corporate Training & Upskilling</span>
                            </div>
                            <div className="stream-item">
                                <div className="stream-image">
                                    <Image
                                        src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80"
                                        alt="Security Assessments"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <span>Security Assessments</span>
                            </div>
                            <div className="stream-item">
                                <div className="stream-image">
                                    <Image
                                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
                                        alt="Compliance Audits"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <span>Compliance Audits</span>
                            </div>
                            <div className="stream-item">
                                <div className="stream-image">
                                    <Image
                                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
                                        alt="Digital Forensics & Analysis"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <span>Digital Forensics & Analysis</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Can Apply Section */}
            <section id="apply" className="apply-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Who Can Apply</h2>
                        <p>This franchise opportunity is ideal for forward-thinking professionals and organizations</p>
                    </div>
                    <div className="apply-grid">
                        <div className="apply-card">
                            <div className="apply-card-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Entrepreneurs & Business Owners</h3>
                        </div>
                        <div className="apply-card">
                            <div className="apply-card-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Existing Training Institutes</h3>
                        </div>
                        <div className="apply-card">
                            <div className="apply-card-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>IT Professionals & Consultants</h3>
                        </div>
                        <div className="apply-card">
                            <div className="apply-card-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 10V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 8H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 8H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="19" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
                                    <path d="M21.5 18.5L23 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Education & Skill Partners</h3>
                        </div>
                    </div>
                    <div className="apply-note">
                        <p><strong>No mandatory cybersecurity background is required.</strong> Complete training, documentation, and SOP support are provided by eHack Academy.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="enquire" className="cta-section">
                <div className="section-container">
                    <div className="cta-content">
                        <h2>Partner With eHack Academy</h2>
                        <p>Take the next step toward building a future-ready education business. Enquire now to explore partnership opportunities.</p>
                        <div className="cta-buttons">
                            <a href="#" onClick={openFranchisePopup} className="cta-btn-white">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Enquire Now
                            </a>
                            <a href="tel:+919886035330" className="cta-btn-outline">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4136 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Schedule a Discussion
                            </a>
                        </div>
                        <p className="cta-contact">
                            Or reach us directly at <a href="mailto:info@ehackacademy.com">info@ehackacademy.com</a> | <a href="tel:+919886035330">+91-9886035330</a>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
