'use client';

import { useState, useEffect, useRef } from 'react';
import './page.css';

export default function AboutPage() {
    const [showDebolinaModal, setShowDebolinaModal] = useState(false);
    const [showFounderModal, setShowFounderModal] = useState(false);
    const [showNeelKumarModal, setShowNeelKumarModal] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState('mission');
    const navRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    const sections = [
        { id: 'mission', label: 'Our Mission' },
        { id: 'promise', label: 'eHack Promise' },
        { id: 'philosophy', label: 'Philosophy' },
        { id: 'what-we-do', label: 'What We Do' },
        { id: 'why-choose-us', label: 'Why Us' },
        { id: 'leadership', label: 'Leadership' },
        { id: 'feedback', label: 'Student Feedback' },
        { id: 'contact', label: 'Contact' }
    ];

    // Sticky navigation scroll handling
    useEffect(() => {
        const handleScroll = () => {
            if (placeholderRef.current) {
                const placeholderTop = placeholderRef.current.getBoundingClientRect().top;
                setIsSticky(placeholderTop <= 0);
            }

            // Update active section based on scroll position
            const sectionElements = sections.map(s => document.getElementById(s.id));
            const scrollPosition = window.scrollY + 150;

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const section = sectionElements[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const top = element.offsetTop - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    const founderFullProfile = {
        quote: `"Skills create careers. Vision creates leaders."`,
        intro: `My journey has been a long one — over 30 years across banking, finance, leasing, and cyber security — and if there's one thing I've learned, it's this: technology keeps changing, but the need for the right guidance never does.`,
        education: `I have been privileged to learn at IIM Calcutta (Business Management), NIPM Calcutta (Personnel Management), along with Law and Commerce specialisation. These experiences shaped the way I think — not just about business or law, but about people, responsibility, and long-term growth.`,
        experience: `Alongside eHack Academy, I also serve as Director of Operations at Byte Code Cyber Security Pvt. Ltd., where I deal with real cyber security challenges every day. This keeps me closely connected to industry realities — what companies truly expect and what young professionals genuinely need to succeed.`,
        mission: `I started eHack Academy with a simple intention: to help people build real skills, gain confidence, and create a secure and meaningful career in cyber security. Whether someone is a student, a working professional, or restarting their journey, our focus has always been on clarity, honesty, and practical learning.`,
        vision: `At eHack Academy, we don't just teach technology. We mentor, guide, and prepare individuals to face the real world with confidence.`,
        closing: `If you're serious about your future in cyber security, we'll walk that journey with you.`
    };

    const debolinaFullProfile = {
        summary: `Dr. Debolina Gupta is a dynamic academician, mentor, and thought leader known for her proactive approach, exceptional leadership abilities, and deep commitment to education and entrepreneurship. A self-starter by nature, she brings clarity, confidence, and purpose to every role she undertakes. Her strong organisational acumen and coordination skills enable seamless engagement between students, institutions, and industry platforms.`,
        expertise: `Dr. Gupta specializes in the design and delivery of concurrent training and teaching programmes that integrate HR practices, entrepreneurship, personal effectiveness, leadership development, and soft skills. Her pedagogical approach blends academic rigour with real-world relevance, empowering learners to navigate today's dynamic business environment with confidence.`,
        collaboration: `Beyond the classroom, she plays a vital role in strengthening industry–academia collaboration. She actively participates in entrepreneurial consortia, offering training, mentoring, and strategic guidance to start-ups and emerging business ventures. Her consistent involvement of alumni in institutional initiatives further reinforces strong industry connections and enriches student exposure.`,
        advocacy: `A passionate advocate for entrepreneurship and leadership development, Dr. Gupta regularly curates and conducts capacity-building workshops aimed at fostering an entrepreneurial mindset and future-ready leadership skills among students. Her research interests span leadership, entrepreneurship, start-ups, higher education, and human resource management, reflecting her dedication to addressing contemporary business and educational challenges through practical, impactful insights.`,
        additional: `She is a thoughtful writer and editor at Spark: Igniting Minds, a fiction publishing house dedicated to nurturing original voices and crafting compelling narratives that inspire imagination, creativity, and thoughtful engagement.`,
        roles: `In addition to her academic and mentoring roles, Dr. Gupta serves as a Board of Advisory Member at eHack Academy, contributing strategic guidance to innovation-driven learning initiatives. She also holds the position of Joint Secretary of eMERG, an eminent professional association, where she actively supports initiatives focusing on women leadership, entrepreneurship, and professional empowerment.`
    };

    const neelKumarFullProfile = {
        title: `Neel Kumar (C|CISO) | OSCP | OSCE | OSWP`,
        role: `Sr. Cyber Security Analyst / IT Security Consultant / Mobile Pen-tester`,
        experience: `9+ Years in Penetration Testing & Red Teaming`,
        education: [
            'B. Tech & M. Tech in Computer Science',
            'Cyber Law from Indian Law Institute',
            'Advance Diploma in Cyber Law',
            'Diploma in International Cyber Law',
            'Diploma in Digital Forensic & Cyber Crime Investigation',
            'Diploma in Certified Information System Security Expert'
        ],
        certifications: [
            'Offensive Security Certified Professional (OSCP)',
            'Offensive Security Wireless Professional (OSWP)',
            'ISC2 Certified Information System Security Expert (CISE)',
            'SANS Advanced Web App Pen Test and Ethical Hacking',
            'EC Council Computer Hacking Forensic Investigator (CHFI)',
            'EC Council Certified Ethical Hacker (CEH)',
            'EC Council Certified Security Analyst (ECSA)',
            'EC Council Licensed Penetration Tester (LPT)',
            'Certified Network Defender (C|ND)',
            'EnCase Certified Examiner',
            'FTK Forensic Expert',
            'Mobile Device Forensic Examiner by CCFTC',
            'Certified Cyber Crime Investigator by IFCI',
            'Microsoft Certified Server Expert (MCSE)',
            'CISCO Certified Network Associate (CCNA)',
            'Certified Blockchain Expert',
            '20+ more global certifications'
        ],
        leaTraining: [
            'Singapore Police, Nepal Police, Sri-Lanka Cyber Crime Unit',
            'CBI (India) and CBI Academy, Ghaziabad',
            'Indian Intelligence Team, NIA (National Investigation Agency)',
            'Delhi Police, UP Police, MP Police, Punjab Police',
            'Delhi Cyber Cell, Cyber Cell Lucknow, Cyber Cell Chhattisgarh',
            'Rajasthan Police Academy, Karnataka Police Academy',
            'ATS Team, Special Task Force (Dehradun)',
            'DRDO, Cabinet Secretariat, PMO Team',
            'Ministry of Defense, Ministry of IT'
        ],
        corporateClients: [
            'C-DAC, IBM, BSNL, HCL, Google, Yahoo, GAIL India',
            'Gemalto, Samsung, MetLife, Aon Services',
            'NHPC, NDTV, Indian Post Payments Bank',
            'Kumari Bank Nepal, Agriculture Insurance Corp',
            'Bytes Software Services UK, Paladion Networks'
        ],
        careerSummary: `More than 9+ years of extensive experience in Penetration Testing and Red Teaming including Web, Network, Mobile, and Hardware pen-testing. Training other Pen-testers and staying up to date on OWASP and SANS standards. Carrying healthy experience in business impact analyses, threat and vulnerability assessments, and Corporate Crime Monitoring and Cyber Incident Response.`,
        forensicsExpertise: `Expertise in automated and manual Forensics tools such as FTK, Encase, Helix, SIFT Sans Toolkit, Oxygen Mobile Forensic Suite, Cellebrite UFED, XRY mobile forensics, and many more.`,
        casesSolved: `Solved 350+ cases including Hacking Cases, Online Blackmailing, Banking/Credit Card Crimes, Phishing, Email Hacking & Spoofing, Social Media Fake Profiles, Mobile Phone Hacking, Identity Theft, Data Stealing, Cyber Pornography, and Unauthorized Access cases.`
    };

    const studentFeedbacks = [
        { name: "Priya S.", feedback: "The cybersecurity bootcamp was intense but incredibly rewarding. I learned more in 12 weeks than I did in 4 years of college." },
        { name: "Rahul M.", feedback: "Excellent mentors and hands-on labs. The VAPT training is top-notch and industry-relevant." },
        { name: "Ankit V.", feedback: "Landed a job as a SOC Analyst within a month of graduating. The career support is fantastic." },
        { name: "Sneha K.", feedback: "The curriculum is updated with the latest threats and tools. Truly prepares you for the real world." },
        { name: "Vikram R.", feedback: "I was a complete beginner. enhancing my skills has completely changed my career trajectory." },
        { name: "Arjun D.", feedback: "The ethical hacking modules are deep and practical. Highly recommend to anyone serious about security." },
        { name: "Meera T.", feedback: "Great community and networking opportunities. I met my current employer through an eHack event." },
        { name: "Karthik N.", feedback: "The instructors are industry veterans. Their insights into real-world scenarios are invaluable." },
        { name: "Riya P.", feedback: "Flexible schedule helped me manage my job and studies. The recorded sessions are a lifesaver." },
        { name: "Sandeep G.", feedback: "From zero to hero in 6 months. The structure of the course is perfect for beginners." },
        { name: "Divya B.", feedback: "The hands-on labs are the best part. You actually get to hack into vulnerable machines." },
        { name: "Mohit J.", feedback: "Support team is always available. Doubts are cleared almost instantly." },
        { name: "Nisha C.", feedback: "The Digital Forensics module was an eye-opener. I love the depth of the content." },
        { name: "Aditya S.", feedback: "Best investment for my career. The ROI is high if you put in the effort." },
        { name: "Varun K.", feedback: "Challenging projects that push your limits. Precisely what I needed to grow." },
        { name: "Pooja L.", feedback: "Certification preparation is excellent. I cleared my CEH on the first attempt." },
        { name: "Rohan M.", feedback: "The syllabus is comprehensive. Covers everything from basics to advanced exploit development." },
        { name: "Swati R.", feedback: "I loved the capstone project. It gave me the confidence to handle real-world projects." },
        { name: "Amit B.", feedback: "Placement assistance is genuine. They guide you through resume building and mock interviews." },
        { name: "Neha S.", feedback: "A truly holistic learning experience. It's not just about tools, but the mindset." },
        { name: "Suresh P.", feedback: "The infrastructure and labs are world-class. No lag, just pure learning." },
        { name: "Kiran D.", feedback: "I appreciate the focus on ethics and legal boundaries. Critical for this field." },
        { name: "Manish T.", feedback: "Networking with peers was a highlight. We still collaborate on bug bounties." },
        { name: "Deepa A.", feedback: "Standard of teaching is very high. Rivals international bootcamps." }
    ];


    return (
        <>
            {/* Hero Section */}
            <section className="about-hero-light">
                <div className="about-container">
                    <div className="hero-content-compact">
                        <span className="hero-badge-light">ABOUT US</span>
                        <h1 className="hero-title-light">Global Leaders in Technology Education and Corporate Solutions</h1>
                        <p className="hero-subtitle-light">
                            Empowering the World with Emerging Technologies & High-Impact Learning
                        </p>
                    </div>
                </div>
            </section>

            {/* Sticky Navigation */}
            <div ref={placeholderRef} className={`about-nav-placeholder ${isSticky ? 'active' : ''}`}></div>
            <nav
                ref={navRef}
                className={`about-sticky-nav ${isSticky ? 'is-sticky' : ''}`}
            >
                <div className="about-nav-container">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            className={`about-nav-btn ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(section.id)}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Mission Section */}
            <section id="mission" className="mission-section">
                <div className="about-container">
                    <div className="mission-content-split">
                        <div className="mission-text-column">
                            <span className="section-badge ">OUR MISSION</span>
                            <h2 className="about-section-title">Bridging Technology & Innovation</h2>
                            <p className="mission-text">
                                At Ehack, we are committed to bridging emerging technologies with high-impact learning and corporate innovation. Our mission is to empower learners, professionals, and enterprises with the skills, knowledge, and tools they need to thrive in a rapidly evolving digital world.
                            </p>
                            <p className="mission-text">
                                We invite you to join a holistic ecosystem where technology meets learning, integrated with enterprise solutions and global knowledge empowerment.
                            </p>
                        </div>
                        <div className="mission-image-column">
                            <img src="/images/new-mission-aboutus.png" alt="Our Mission" className="mission-side-image" />
                        </div>
                    </div>
                </div>
            </section>

            {/* eHack Promise Section */}
            <section id="promise" className="promise-section">
                <div className="about-container">
                    <h2 className="promise-main-title">What is the <span style={{ color: '#FF6B00' }}>eHack Promise?</span></h2>

                    <div className="promise-grid">
                        <div className="promise-image-col">
                            <img src="/images/ehack_promise_realistic.png" alt="eHack Team" className="promise-feature-img" />
                        </div>
                        <div className="promise-content-col">
                            <div className="promise-card">
                                <div className="promise-item">
                                    <div className="promise-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p>At eHack Academy, your success is our priority. That's why we offer our comprehensive <strong>Skill Certification Guarantee</strong>.</p>
                                </div>

                                <div className="promise-item">
                                    <div className="promise-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p>We believe true learning happens when skills meet opportunity. This guarantee ensures you receive the <strong style={{ color: '#FF6B00' }}>high-quality training and practical exposure</strong> you deserve.</p>
                                </div>

                                <div className="promise-item">
                                    <div className="promise-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <p>If for any reason, you feel your learning gap isn't bridged, we promise to support you until you are <strong>industry-ready</strong>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section id="philosophy" className="philosophy-section">
                <div className="about-container">
                    <div className="philosophy-header">
                        <span className="philosophy-capsule">OUR PHILOSOPHY</span>
                        <p className="philosophy-intro">A holistic approach to empowering the digital future through technological excellence and education.</p>
                    </div>

                    <div className="philosophy-grid">
                        <div className="philosophy-card">
                            <span className="philosophy-letter">E</span>
                            <h3 className="philosophy-title">Emerging Technologies</h3>
                            <p className="philosophy-desc">Focus on Cybersecurity, AI, Robotics, and Data Science</p>
                        </div>

                        <div className="philosophy-card">
                            <span className="philosophy-letter">H</span>
                            <h3 className="philosophy-title">High-Impact Learning</h3>
                            <p className="philosophy-desc">Education, training, and skill empowerment for every stage</p>
                        </div>

                        <div className="philosophy-card">
                            <span className="philosophy-letter">A</span>
                            <h3 className="philosophy-title">Analytics & AI</h3>
                            <p className="philosophy-desc">Data-driven insights and AI-powered innovation</p>
                        </div>

                        <div className="philosophy-card">
                            <span className="philosophy-letter">C</span>
                            <h3 className="philosophy-title">Cybersecurity & Corporate</h3>
                            <p className="philosophy-desc">VAPT, Digital Forensics, IT Audits, and Compliance solutions</p>
                        </div>

                        <div className="philosophy-card">
                            <span className="philosophy-letter">K</span>
                            <h3 className="philosophy-title">Knowledge & Reach</h3>
                            <p className="philosophy-desc">Empowering learners and enterprises worldwide</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section id="what-we-do" className="what-we-do-section">
                <div className="about-container">
                    <div className="section-header">
                        <span className="section-badge-orange-big">OUR SERVICES</span>
                        <h2 className="about-section-title">Empowering <span style={{ color: '#FF6B00' }}>Digital</span> Excellence</h2>
                    </div>

                    <div className="what-we-do-grid">
                        <div className="what-card">
                            <h3>1. Industry Ready <br /> Learning</h3>
                            <p style={{ marginBottom: '1.5rem', color: '#fb6c07ff', fontWeight: 'bold' }}>We provide industry-aligned programs that equip learners with future-ready skills.</p>
                            <ul className="what-list">
                                <li>Advanced programs in Cybersecurity, Data Science, AI, Robotics, and Digital Marketing</li>
                                <li>Globally recognized certifications and hands-on training</li>
                                <li>Flexible online and offline live classes</li>
                                <li>Focused on skill development, employability, and professional growth</li>
                            </ul>
                            <img src="/images/about%20Learning%20%26%20Training.jpg" alt="Learning & Training" className="what-card-image" />
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                                <img src="/images/newnew-ehack.jpeg" alt="eHack Academy Logo" style={{ height: '80px', objectFit: 'contain' }} />
                            </div>
                        </div>

                        <div className="what-card">
                            <h3>2. Corporate & Technology Services</h3>
                            <p style={{ marginBottom: '1.5rem', color: '#fb6c07ff', fontWeight: 'bold' }}>Through Ehack Global Technology, we deliver enterprise-grade services.</p>
                            <ul className="what-list">
                                <li>VAPT (Vulnerability Assessment & Penetration Testing)</li>
                                <li>Digital Forensics & Incident Response</li>
                                <li>IT Audits & Compliance</li>
                                <li>Enterprise solutions for cybersecurity, analytics, and digital transformation</li>
                            </ul>
                            <img src="/images/corporate.jpeg" alt="Corporate Services" className="what-card-image" />
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                                <img src="/images/new-global-ehack.jpeg" alt="eHack Global Technologies Logo" style={{ height: '80px', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Why Choose Us Section */}
            <section id="why-choose-us" className="why-choose-section">
                <div className="about-container">
                    <div className="section-header">
                        <span className="section-badge-orange-big">WHY CHOOSE US</span>
                        <h2 className="about-section-title">Defining <span style={{ color: '#FF6B00' }}>Excellence</span></h2>
                        <p className="about-section-subtitle">We don't just teach technology; we shape the future leaders of the digital world through innovation and global connection.</p>
                    </div>

                    <div className="features-grid features-grid-2col">
                        <div className="feature-card">
                            <img src="/images/day-office-travel-agency.jpg" alt="Global Presence" className="feature-card-img" />
                            <h3 className="feature-title">Global Presence</h3>
                            <p className="feature-description">
                                Training and services with a worldwide footprint, connecting you to global opportunities.
                            </p>
                        </div>

                        <div className="feature-card">
                            <img src="/images/executive-manager-wearing-virtual-reality-headset.jpg" alt="Innovation-Driven" className="feature-card-img" />
                            <h3 className="feature-title">Innovation-Driven</h3>
                            <p className="feature-description">
                                Programs and solutions built on the latest technologies and emerging industry trends.
                            </p>
                        </div>

                        <div className="feature-card">
                            <img src="/images/young-student-wearing-graduation-cape-looking-her-notebook.jpg" alt="Trusted & Credible" className="feature-card-img" />
                            <h3 className="feature-title">Trusted & Credible</h3>
                            <p className="feature-description">
                                Empowering both learners and corporates with reliability, excellence, and proven results.
                            </p>
                        </div>

                        <div className="feature-card">
                            <img src="/images/front-view-businessman-with-colorful-cones-representing-growth.jpg" alt="Holistic Ecosystem" className="feature-card-img" />
                            <h3 className="feature-title">Holistic Ecosystem</h3>
                            <p className="feature-description">
                                Bridging skills, services, and knowledge under one roof for comprehensive growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section id="leadership" className="leadership-section">
                <div className="about-container">
                    <div className="section-header">
                        <span className="section-badge-orange-big">LEADERSHIP</span>
                        <h2 className="about-section-title">From the <span style={{ color: '#FF6B00' }}>Founder</span></h2>
                    </div>

                    <div className="founder-card">
                        <div className="founder-image-section">
                            <img src="/images/about-us/manager.jpeg" alt="Sanjeev Gupta" className="founder-image" />
                            <div className="founder-quote-badge">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p>Skills create careers. Vision creates leaders.</p>
                            </div>
                            <div className="founder-name-badge">
                                <h3 className="founder-name">Sanjeev Gupta</h3>
                                <p className="founder-role">Founder & Director</p>
                            </div>
                        </div>
                        <div className="founder-content">
                            <p className="founder-bio">
                                My journey has been a long one — over 30 years across banking, finance, leasing, and cyber security — and if there's one thing I've learned, it's this: <strong>technology keeps changing, but the need for the right guidance never does.</strong>
                            </p>
                            <p className="founder-bio">
                                I have been privileged to learn at IIM Calcutta (Business Management), NIPM Calcutta (Personnel Management), along with Law and Commerce specialisation. These experiences shaped the way I think — not just about business or law, but about people, responsibility, and long-term growth.
                            </p>
                            <div className="founder-education">
                                <strong>I started eHack Academy with a simple intention:</strong> to help people build real skills, gain confidence, and create a secure and meaningful career in cyber security.
                            </div>
                            <button className="read-more-btn" onClick={() => setShowFounderModal(true)}>
                                Read Full Message
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>


                </div>
            </section>


            {/* Management & Advisory Board */}
            <section id="advisory" className="advisory-section">
                <div className="about-container">
                    <div className="section-header">
                        <h2 className="about-section-title">Management & Advisory Board</h2>
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
                                <h3 className="advisory-name">Neel Kumar</h3>
                                <p className="advisory-role">Head Advisory & Consultant - Cyber Security</p>
                                <p className="advisory-bio">
                                    9+ years in Penetration Testing, Red Teaming & Cyber Incident Response. Trained Interpol, CBI & solved 350+ cyber crime cases. OSCP, CEH & 20+ global certifications.
                                </p>
                                <button className="read-more-btn" onClick={() => setShowNeelKumarModal(true)}>
                                    Read More
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
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

                            <div className="advisory-card">
                                <img src="/images/about-us/Dr. Debolina Gupta.jpg" alt="Dr. Debolina Gupta" className="advisory-image" />
                                <h3 className="advisory-name">Dr. Debolina Gupta</h3>
                                <p className="advisory-role">Advisory Board Member</p>
                                <p className="advisory-bio">
                                    OB-HR, Entrepreneurship, Training & Development expert. Dynamic academician, mentor, and thought leader committed to education and entrepreneurship.
                                </p>
                                <button className="read-more-btn" onClick={() => setShowDebolinaModal(true)}>
                                    Read More
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
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
                                <h3 className="advisory-name">Neel Kumar</h3>
                                <p className="advisory-role">Head Advisory & Consultant - Cyber Security</p>
                                <p className="advisory-bio">
                                    9+ years in Penetration Testing, Red Teaming & Cyber Incident Response. Trained Interpol, CBI & solved 350+ cyber crime cases. OSCP, CEH & 20+ global certifications.
                                </p>
                                <button className="read-more-btn" onClick={() => setShowNeelKumarModal(true)}>
                                    Read More
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
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

                            <div className="advisory-card">
                                <img src="/images/about-us/Dr. Debolina Gupta.jpg" alt="Dr. Debolina Gupta" className="advisory-image" />
                                <h3 className="advisory-name">Dr. Debolina Gupta</h3>
                                <p className="advisory-role">Advisory Board Member</p>
                                <p className="advisory-bio">
                                    OB-HR, Entrepreneurship, Training & Development expert. Dynamic academician, mentor, and thought leader committed to education and entrepreneurship.
                                </p>
                                <button className="read-more-btn" onClick={() => setShowDebolinaModal(true)}>
                                    Read More
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Student Feedback Section */}
            <section id="feedback" className="feedback-section">
                <div className="about-container">
                    <div className="section-header">
                        <span className="section-badge-orange-big">TESTIMONIALS</span>
                        <h2 className="about-section-title">Student <span style={{ color: '#FF6B00' }}>Feedback</span></h2>
                        <p className="feedback-disclaimer" style={{ marginTop: '-20px' }}>To ensure the privacy of our clients, we use pseudonyms.</p>
                    </div>

                    <div className="feedback-grid">
                        {studentFeedbacks.map((item, index) => (
                            <div key={index} className="feedback-card">
                                <div className="feedback-content">
                                    <p className="feedback-text">{item.feedback}</p>
                                    <div className="feedback-author">
                                        <div className="author-avatar-placeholder">
                                            {item.name.charAt(0)}
                                        </div>
                                        <span className="author-name">{item.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tagline Banner */}
            <div className="tagline-banner">
                <div className="about-container">
                    <h2 className="tagline-text">
                        Ehack – Empowering <span>Skills</span>, Securing <span>Enterprises</span>, Enabling <span>Innovation</span>
                    </h2>
                </div>
            </div>

            {/* Contact Us Section - Premium Redesign */}
            <section id="contact" className="contact-section-pro">
                {/* Background Elements */}
                <div className="contact-bg-pattern"></div>
                <div className="contact-bg-gradient"></div>

                <div className="about-container">
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
                                        <div className="hours-time">9:00 AM - 9:00 PM</div>
                                    </div>
                                    <div className="hours-item hours-item-closed">
                                        <div className="hours-day">
                                            <span className="status-indicator status-open"></span>
                                            Monday
                                        </div>
                                        <div className="hours-time">
                                            <span style={{ display: 'block', color: '#64748B', fontSize: '0.85rem' }}>Campus Closed</span>
                                            <span style={{ color: '#16A34A', fontWeight: '600' }}>Sales Office Open</span>
                                        </div>
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
            <section className="about-cta-section">
                <div className="about-container">
                    <div className="cta-box">
                        <div className="cta-content">
                            <div className="cta-tagline-highlight">FOLLOW US, JOB FOLLOWS YOU</div>
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

            {/* Dr. Debolina Gupta Profile Modal */}
            {showDebolinaModal && (
                <div className="profile-modal-overlay" onClick={() => setShowDebolinaModal(false)}>
                    <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="profile-modal-close" onClick={() => setShowDebolinaModal(false)} aria-label="Close">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="profile-modal-header">
                            <div className="profile-modal-avatar" style={{ background: '#F0FDF4', color: '#16A34A', border: '3px solid #DCFCE7' }}>
                                <span style={{ fontSize: '3rem', fontWeight: '800' }}>DG</span>
                            </div>
                            <div className="profile-modal-title-section">
                                <h2 className="profile-modal-name">Dr. Debolina Gupta</h2>
                                <p className="profile-modal-role">Advisory Board Member</p>
                                <p className="profile-modal-specialization">OB-HR, Entrepreneurship, Training & Development</p>
                            </div>
                        </div>

                        <div className="profile-modal-content">
                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Profile Summary</h3>
                                <p>{debolinaFullProfile.summary}</p>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Areas of Expertise</h3>
                                <p>{debolinaFullProfile.expertise}</p>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Industry-Academia Collaboration</h3>
                                <p>{debolinaFullProfile.collaboration}</p>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Entrepreneurship & Leadership Advocacy</h3>
                                <p>{debolinaFullProfile.advocacy}</p>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Additional Roles</h3>
                                <p>{debolinaFullProfile.additional}</p>
                                <p style={{ marginTop: '1rem' }}>{debolinaFullProfile.roles}</p>
                            </div>

                            <div className="profile-modal-highlights">
                                <div className="profile-highlight-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                    <span>Board of Advisory Member - eHack Academy</span>
                                </div>
                                <div className="profile-highlight-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                                    </svg>
                                    <span>Joint Secretary - eMERG</span>
                                </div>
                                <div className="profile-highlight-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                                    </svg>
                                    <span>Writer & Editor - Spark: Igniting Minds</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Founder Full Message Modal */}
            {showFounderModal && (
                <div className="profile-modal-overlay" onClick={() => setShowFounderModal(false)}>
                    <div className="profile-modal founder-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="profile-modal-close" onClick={() => setShowFounderModal(false)} aria-label="Close">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="profile-modal-header founder-modal-header">
                            <img src="/images/about-us/manager.jpeg" alt="Sanjeev Gupta" className="founder-modal-image" />
                            <div className="profile-modal-title-section">
                                <h2 className="profile-modal-name">Sanjeev Gupta</h2>
                                <p className="profile-modal-role">Founder & Director</p>
                                <p className="profile-modal-specialization">Skill to Employability</p>
                            </div>
                        </div>

                        <div className="founder-modal-quote">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.15">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p>{founderFullProfile.quote}</p>
                        </div>

                        <div className="profile-modal-content">
                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">The Journey</h3>
                                <p>{founderFullProfile.intro}</p>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Education & Growth</h3>
                                <p>{founderFullProfile.education}</p>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Industry Experience</h3>
                                <p>{founderFullProfile.experience}</p>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Our Mission</h3>
                                <p>{founderFullProfile.mission}</p>
                            </div>

                            <div className="founder-modal-vision">
                                <p>{founderFullProfile.vision}</p>
                            </div>

                            <div className="profile-modal-section">
                                <p className="founder-closing">{founderFullProfile.closing}</p>
                            </div>

                            <div className="founder-modal-signature">
                                <div className="signature-line"></div>
                                <p className="signature-name">Sanjeev Gupta</p>
                                <p className="signature-title">Founder & Director</p>
                                <p className="signature-org">eHack Academy – Institute of Emerging Technologies</p>
                                <p className="signature-domains">Cyber Security | Data Science | Robotics | Digital Marketing</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Neel Kumar Profile Modal */}
            {showNeelKumarModal && (
                <div className="profile-modal-overlay" onClick={() => setShowNeelKumarModal(false)}>
                    <div className="profile-modal neel-kumar-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="profile-modal-close" onClick={() => setShowNeelKumarModal(false)} aria-label="Close">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="profile-modal-header">
                            <div className="profile-modal-avatar" style={{ background: '#FFF7ED', color: '#FF6B00', border: '3px solid #FFEDD5' }}>
                                <span style={{ fontSize: '3rem', fontWeight: '800' }}>NK</span>
                            </div>
                            <div className="profile-modal-title-section">
                                <h2 className="profile-modal-name">{neelKumarFullProfile.title}</h2>
                                <p className="profile-modal-role">{neelKumarFullProfile.role}</p>
                                <p className="profile-modal-specialization">{neelKumarFullProfile.experience}</p>
                            </div>
                        </div>

                        <div className="profile-modal-content">
                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Career Summary</h3>
                                <p>{neelKumarFullProfile.careerSummary}</p>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Educational Background</h3>
                                <ul className="profile-list">
                                    {neelKumarFullProfile.education.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Certifications & Training</h3>
                                <div className="certification-grid">
                                    {neelKumarFullProfile.certifications.map((cert, index) => (
                                        <span key={index} className="certification-badge">{cert}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Law Enforcement & Government Training</h3>
                                <ul className="profile-list">
                                    {neelKumarFullProfile.leaTraining.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Corporate Clients</h3>
                                <ul className="profile-list">
                                    {neelKumarFullProfile.corporateClients.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Forensics Expertise</h3>
                                <p>{neelKumarFullProfile.forensicsExpertise}</p>
                            </div>

                            <div className="profile-modal-section">
                                <h3 className="profile-section-heading">Cases Solved</h3>
                                <p>{neelKumarFullProfile.casesSolved}</p>
                            </div>

                            <div className="profile-modal-highlights neel-kumar-highlights">
                                <div className="profile-highlight-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span>350+ Cyber Crime Cases Solved</span>
                                </div>
                                <div className="profile-highlight-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span>Trained CBI, Interpol, NIA Officers</span>
                                </div>
                                <div className="profile-highlight-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                    <span>20+ Global Security Certifications</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
