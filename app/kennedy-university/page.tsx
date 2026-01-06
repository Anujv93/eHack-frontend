'use client';

import { useState } from 'react';
import './page.css';

// MSCS Curriculum Data
const mscsCurriculum = [
    {
        number: "01",
        title: "P|SCSPᴬᴵ - Professional | Secure Computer Systems Programᴬᴵ",
        duration: "8 Weeks",
        certification: "EC-Council CSCU",
        description: "Establish a strong foundation in cybersecurity principles. Learn essential security awareness and secure computing practices for personal and professional environments.",
        topics: [
            "Introduction to Digital Security",
            "Operating System Protection Techniques",
            "Malicious Software and System Defense",
            "Internet Usage Security Practices",
            "Security Awareness for Social Media Platforms",
            "Email Communication Protection Methods",
            "Mobile Device Security Fundamentals",
            "Cloud Usage and Data Protection",
            "Network Connectivity and Access Security",
            "Data Backup and Business Continuity Planning",
            "Protection of Smart and Connected Devices",
            "Safe Digital Workspaces and Remote Access Security"
        ]
    },
    {
        number: "02",
        title: "P|NDPᴬᴵ - Professional | Network Defense Programᴬᴵ",
        duration: "12 Weeks",
        certification: "EC-Council CND",
        description: "Master the protect, detect, respond, and predict approach to network security with enterprise-level defense strategies.",
        topics: [
            "Network Attacks and Defense Approaches",
            "Administrative Network Security",
            "Technical Network Security",
            "Network Boundary and Perimeter Security",
            "Endpoint Protection for Windows Systems",
            "Endpoint Protection for Linux Systems",
            "Endpoint Protection for Mobile Devices",
            "Endpoint Protection for IoT and Smart Devices",
            "Administrative Application Security",
            "Data Security and Protection Controls",
            "Network Threat Analysis and Response",
            "Network Policy and Governance Management",
            "Secure Network Architecture Design",
            "Perimeter Monitoring and Defense Systems",
            "Windows Endpoint Hardening Techniques",
            "Linux Endpoint Hardening Techniques",
            "IoT Security Administration",
            "Application Security Administration",
            "Enterprise Data Protection Strategies"
        ]
    },
    {
        number: "03",
        title: "P|EHCOPᴬᴵ - Professional | Ethical Hacking and Cyber Offense Programᴬᴵ",
        duration: "12 Weeks",
        certification: "EC-Council CEH",
        description: "Think like an attacker to defend like a professional. Master reconnaissance, exploitation, and over 550 attack techniques.",
        topics: [
            "Fundamentals of Ethical Hacking",
            "Information Gathering and Reconnaissance",
            "Network Scanning Techniques",
            "System Enumeration Methods",
            "Vulnerability Identification and Analysis",
            "System Exploitation Techniques",
            "Malware Threat Analysis",
            "Network Traffic Monitoring and Sniffing",
            "Social Engineering Attack Methods",
            "Service Disruption Attacks",
            "Session Control and Hijacking",
            "Security Control Evasion Techniques",
            "Web Server Security Testing",
            "Web Application Security Assessment",
            "Database and Injection Attacks",
            "Wireless Network Exploitation",
            "Mobile Platform Security Testing",
            "IoT Security Attacks",
            "Cloud Infrastructure Security Risks",
            "Cryptography and Data Protection Basics"
        ]
    },
    {
        number: "04",
        title: "P|DFIPᴬᴵ - Professional | Digital Forensics and Investigation Programᴬᴵ",
        duration: "8 Weeks",
        certification: "EC-Council CHFI",
        description: "Master the science of cyber investigations with evidence collection, forensic analysis, and reporting techniques.",
        topics: [
            "Computer Forensics Overview",
            "Digital Investigation Methodology",
            "Storage Media and File System Analysis",
            "Evidence Acquisition and Duplication",
            "Anti-Forensics and Counter Techniques",
            "Windows System Forensics",
            "Linux and macOS Forensics",
            "Network Forensics Analysis",
            "Malware Forensic Investigation",
            "Web Attack Investigation",
            "Dark Web Investigation Techniques",
            "Cloud Forensics and Data Analysis",
            "Email and Social Media Forensics",
            "Mobile Device Forensics",
            "IoT Forensic Investigation"
        ]
    },
    {
        number: "05",
        title: "P|APTPᴬᴵ - Professional | Advanced Penetration Testing Programᴬᴵ",
        duration: "10 Weeks",
        certification: "EC-Council CPENT",
        description: "Elevate your skills with advanced red team techniques including IoT exploitation, OT/SCADA security, and live cyber range exercises.",
        topics: [
            "Penetration Testing Foundations",
            "Testing Scope and Engagement Planning",
            "Open-Source Intelligence Techniques",
            "Social Engineering Assessment",
            "External Network Penetration Testing",
            "Internal Network Penetration Testing",
            "Perimeter Network Testing",
            "Web Application Penetration Testing",
            "Wireless Security Testing",
            "IoT Penetration Testing",
            "Operational Technology and SCADA Security Testing",
            "Cloud Penetration Testing",
            "Binary Analysis and Exploitation",
        ]
    }
];

// BSCS Curriculum Data
const bscsCurriculum = [
    {
        number: "01",
        title: "IT Fundamentals",
        duration: "4 Weeks",
        certification: "",
        description: "Build a strong foundation in IT essentials covering hardware, operating systems, networking, servers, and cloud technologies.",
        topics: [
            "Computer Hardware & Architecture",
            "Operating Systems (Windows/Linux/Mac)",
            "Networking Fundamentals",
            "TCP/IP & Network Protocols",
            "Server Administration Basics",
            "Cloud Computing Concepts",
            "Virtualization Technologies",
            "Basic Troubleshooting"
        ]
    },
    {
        number: "02",
        title: "P|SCSPᴬᴵ - Professional | Secure Computer Systems Programᴬᴵ",
        duration: "6 Weeks",
        certification: "EC-Council CSCU",
        description: "Learn essential cybersecurity awareness and secure computing practices from the official EC-Council CSCU curriculum.",
        topics: [
            "Introduction to Digital Security",
            "Operating System Protection Techniques",
            "Malicious Software and System Defense",
            "Internet Usage Security Practices",
            "Security Awareness for Social Media Platforms",
            "Email Communication Protection Methods",
            "Mobile Device Security Fundamentals",
            "Cloud Usage and Data Protection",
            "Network Connectivity and Access Security",
            "Data Backup and Business Continuity Planning",
            "Protection of Smart and Connected Devices",
            "Safe Digital Workspaces and Remote Access Security"
        ]
    },
    {
        number: "03",
        title: "P|NDPᴬᴵ - Professional | Network Defense Programᴬᴵ",
        duration: "8 Weeks",
        certification: "EC-Council CND",
        description: "Master the protect, detect, respond, and predict approach to network security from the official EC-Council CND v3 curriculum.",
        topics: [
            "Network Attacks and Defense Approaches",
            "Administrative Network Security",
            "Technical Network Security",
            "Network Boundary and Perimeter Security",
            "Endpoint Protection for Windows Systems",
            "Endpoint Protection for Linux Systems",
            "Endpoint Protection for Mobile Devices",
            "Endpoint Protection for IoT and Smart Devices",
            "Administrative Application Security",
            "Data Security and Protection Controls",
            "Network Threat Analysis and Response",
            "Network Policy and Governance Management",
            "Secure Network Architecture Design",
            "Perimeter Monitoring and Defense Systems",
            "Windows Endpoint Hardening Techniques",
            "Linux Endpoint Hardening Techniques",
            "IoT Security Administration",
            "Application Security Administration",
            "Enterprise Data Protection Strategies"
        ]
    },
    {
        number: "04",
        title: "Ethical Hacking & Counter Measures",
        duration: "6 Weeks",
        certification: "",
        description: "Think like an attacker to defend like a professional. Master reconnaissance, exploitation, and vulnerability assessment.",
        topics: [
            "Footprinting & Reconnaissance",
            "Scanning Networks",
            "Enumeration Techniques",
            "Vulnerability Analysis",
            "System Hacking",
            "Malware Threats",
            "Sniffing & Packet Analysis",
            "Social Engineering",
            "Counter Measures & Defense"
        ]
    },
    {
        number: "05",
        title: "Penetration Testing / Digital Forensics",
        duration: "6 Weeks",
        certification: "Choose One",
        description: "Choose between Penetration Testing or Digital Forensic Investigator track based on your career goals.",
        topics: [
            "Penetration Testing Methodologies",
            "Web Application Testing",
            "Network Penetration Testing",
            "Computer Forensics Process",
            "Evidence Acquisition & Analysis",
            "Memory & Disk Forensics",
            "Report Writing & Documentation"
        ]
    },
    {
        number: "06",
        title: "OWASP Top 10",
        duration: "4 Weeks",
        certification: "",
        description: "Master the OWASP Top 10 web application security risks and learn how to identify, exploit, and mitigate them.",
        topics: [
            "Injection Attacks (SQL, NoSQL, OS)",
            "Broken Authentication",
            "Sensitive Data Exposure",
            "XML External Entities (XXE)",
            "Broken Access Control",
            "Security Misconfigurations",
            "Cross-Site Scripting (XSS)",
            "Insecure Deserialization",
            "Using Components with Known Vulnerabilities",
            "Insufficient Logging & Monitoring"
        ]
    }
];

export default function KennedyUniversityPage() {
    const [activeTab, setActiveTab] = useState('certifications');
    const [activeModule, setActiveModule] = useState(0);
    const [bscsActiveModule, setBscsActiveModule] = useState(0);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    const toggleModule = (idx: number) => {
        setActiveModule(activeModule === idx ? -1 : idx);
    };

    const toggleBscsModule = (idx: number) => {
        setBscsActiveModule(bscsActiveModule === idx ? -1 : idx);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your inquiry! Our team will contact you shortly.');
    };

    return (
        <>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    {/* Left Content */}
                    <div className="hero-content">
                        <div className="partner-logos">
                            <div className="partner-logo">
                                <img src="/images/kennedy-university-logo.png" alt="Kennedy University" className="partner-logo-img kennedy" />
                            </div>
                            <div className="divider"></div>
                            <div className="partner-logo">
                                <img src="/images/ec-council-logo.png" alt="EC-Council" className="partner-logo-img ec-council" />
                            </div>
                            <div className="divider"></div>
                            <div className="partner-logo">
                                <img src="/ehack-black.png" alt="eHack Academy" className="partner-logo-img ehack-logo" />
                            </div>
                        </div>

                        <h1 className="hero-title">
                            Cybersecurity with <span className="text-accent">AI</span> – Industry Certifications &amp; Global Degrees
                        </h1>

                        <p className="hero-description">
                            Launch your cybersecurity career with globally recognized EC-Council certifications and accredited
                            degrees from Kennedy University, powered by AI-driven learning at eHack Academy.
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

            {/* Combined Dark Section: Stats + Partnership */}
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

                            <h2 className="partnership-title">Integrated Program with <span className="text-accent">Kennedy
                                University</span> &amp; <span className="text-accent">EC-Council</span></h2>

                            <p className="partnership-description">
                                Our programs offer a unique combination of globally recognized EC-Council cybersecurity
                                certifications
                                and accredited degrees from Kennedy University. This dual-credential approach ensures you
                                graduate with
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
                                    <span>AI-powered cybersecurity labs &amp; simulations</span>
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
                    <p className="section-subtitle">From industry certifications to global degrees, we have the right program for
                        every career stage.</p>

                    {/* Program Tabs */}
                    <div className="program-tabs">
                        <button className={`program-tab ${activeTab === 'certifications' ? 'active' : ''}`} onClick={() => handleTabClick('certifications')}>EC-Council Certifications</button>
                        <button className={`program-tab ${activeTab === 'bscs' ? 'active' : ''}`} onClick={() => handleTabClick('bscs')}>BSCS – Fast Track (1 Year)</button>
                        <button className={`program-tab ${activeTab === 'mscs' ? 'active' : ''}`} onClick={() => handleTabClick('mscs')}>MSCS – Fast Track (1 Year)</button>
                        <button className={`program-tab ${activeTab === 'integrated' ? 'active' : ''}`} onClick={() => handleTabClick('integrated')}>Integrated BSCS + MSCS (15 Months)</button>
                    </div>

                    {/* Program Content */}
                    <div className="program-contents">
                        {/* EC-Council Certifications */}
                        <div className={`program-content ${activeTab === 'certifications' ? 'active' : ''}`} id="certifications">
                            <div className="program-card">
                                <div className="program-card-header">
                                    <span className="program-badge">Popular Choice</span>
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
                                    <ul className="cert-grid">
                                        <li>CEH - Certified Ethical Hacker</li>
                                        <li>CND - Certified Network Defender</li>
                                        <li>ECIH - EC-Council Certified Incident Handler</li>
                                        <li>CPENT - Certified Penetration Testing Professional</li>
                                        <li>CHFI - Computer Hacking Forensic Investigator</li>
                                    </ul>
                                </div>

                                <div className="program-actions">
                                    <a href="/programs/ec-council-certifications" className="btn-primary">Know More</a>
                                    <a href="#apply" className="btn-secondary">Apply Now</a>
                                </div>
                            </div>
                        </div>

                        {/* BSCS Fast Track (1 Year) */}
                        <div className={`program-content ${activeTab === 'bscs' ? 'active' : ''}`} id="bscs">
                            <div className="program-card">
                                <div className="program-card-header">
                                    <span className="program-badge featured">Fast-Track</span>
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
                                    <h4>Curriculum Alignment</h4>
                                    <p>The BSCS curriculum is aligned with eHack Academy&apos;s Graduate Program in Cybersecurity and enhanced with university-level academic rigor.</p>
                                </div>

                                <div className="program-highlights">
                                    <h4>Core Areas:</h4>
                                    <ul>
                                        <li>Cybersecurity Fundamentals</li>
                                        <li>Networking &amp; OS</li>
                                        <li>Ethical Hacking &amp; Penetration Testing</li>
                                        <li>Digital Forensics &amp; Incident Response</li>
                                        <li>Risk Management &amp; Governance</li>
                                        <li>Secure Application Development</li>
                                    </ul>
                                </div>

                                {/* Curriculum Modules Section */}
                                <div className="mscs-curriculum-section">
                                    <h4>Program Curriculum</h4>
                                    <p className="curriculum-intro">A structured learning path with 6 professional modules. 34 weeks of intensive training.</p>

                                    <div className="curriculum-modules-kennedy">
                                        {bscsCurriculum.map((module, idx) => (
                                            <div key={idx} className="curriculum-module-kennedy">
                                                <div className={`module-card-kennedy ${bscsActiveModule === idx ? 'active' : ''}`}>
                                                    <div className="module-header-kennedy" onClick={() => toggleBscsModule(idx)}>
                                                        <div className="module-number-kennedy">{module.number}</div>
                                                        <div className="module-header-content-kennedy">
                                                            <h5 className="module-title-kennedy">{module.title}</h5>
                                                            <div className="module-meta-kennedy">
                                                                <span className="module-duration-kennedy">⏱️ {module.duration}</span>
                                                                {module.certification && <span className="module-cert-kennedy">{module.certification}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="module-expand-kennedy">
                                                            {bscsActiveModule === idx ? '▲' : '▼'}
                                                        </div>
                                                    </div>
                                                    {bscsActiveModule === idx && (
                                                        <div className="module-details-kennedy">
                                                            <p className="module-description-kennedy">{module.description}</p>
                                                            <div className="module-topics-label-kennedy">What you&apos;ll learn</div>
                                                            <div className="module-topics-kennedy">
                                                                {module.topics.map((topic, tidx) => (
                                                                    <span key={tidx} className="topic-tag-kennedy">{topic}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="internship-info">
                                    <h4>Internship</h4>
                                    <p>Mandatory project-based internship at eHack Academy, with industry mentors, real-world cyber projects, and internship evaluation mapped to academic credits.</p>
                                </div>

                                <div className="program-actions">
                                    <a href="/programs/bscs-cybersecurity" className="btn-primary">Know More</a>
                                    <a href="#apply" className="btn-secondary">Apply Now</a>
                                </div>
                            </div>
                        </div>

                        {/* MSCS Fast Track (1 Year) */}
                        <div className={`program-content ${activeTab === 'mscs' ? 'active' : ''}`} id="mscs">
                            <div className="program-card">
                                <div className="program-card-header">
                                    <span className="program-badge featured">Advanced</span>
                                </div>
                                <h3 className="program-name">Master of Science in Cybersecurity (MSCS) – Fast Track (1 Year)</h3>
                                <p className="program-description">An advanced master&apos;s program focused on strategic, technical, and managerial cybersecurity skills for aspiring security leaders.</p>

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
                                    <h4>Curriculum Mapping</h4>
                                    <p>The MSCS curriculum is mapped to eHack Academy&apos;s Master-Level Cybersecurity Program with advanced research and capstone requirements.</p>
                                </div>

                                <div className="program-highlights">
                                    <h4>Advanced Topics:</h4>
                                    <ul>
                                        <li>Advanced Network &amp; Cloud Security</li>
                                        <li>Cyber Threat Intelligence</li>
                                        <li>Cryptography</li>
                                        <li>GRC (Governance, Risk &amp; Compliance)</li>
                                        <li>Cyber Law &amp; Ethics</li>
                                        <li>Research Methodology</li>
                                    </ul>
                                </div>

                                {/* Curriculum Modules Section */}
                                <div className="mscs-curriculum-section">
                                    <h4>Program Curriculum</h4>
                                    <p className="curriculum-intro">A structured learning path with 5 professional modules aligned with EC-Council certifications. 50 weeks of intensive training.</p>

                                    <div className="curriculum-modules-kennedy">
                                        {mscsCurriculum.map((module, idx) => (
                                            <div key={idx} className="curriculum-module-kennedy">
                                                <div className={`module-card-kennedy ${activeModule === idx ? 'active' : ''}`}>
                                                    <div className="module-header-kennedy" onClick={() => toggleModule(idx)}>
                                                        <div className="module-number-kennedy">{module.number}</div>
                                                        <div className="module-header-content-kennedy">
                                                            <h5 className="module-title-kennedy">{module.title}</h5>
                                                            <div className="module-meta-kennedy">
                                                                <span className="module-duration-kennedy">⏱️ {module.duration}</span>
                                                                <span className="module-cert-kennedy">{module.certification}</span>
                                                            </div>
                                                        </div>
                                                        <div className="module-expand-kennedy">
                                                            {activeModule === idx ? '▲' : '▼'}
                                                        </div>
                                                    </div>
                                                    {activeModule === idx && (
                                                        <div className="module-details-kennedy">
                                                            <p className="module-description-kennedy">{module.description}</p>
                                                            <div className="module-topics-label-kennedy">What you&apos;ll learn</div>
                                                            <div className="module-topics-kennedy">
                                                                {module.topics.map((topic, tidx) => (
                                                                    <span key={tidx} className="topic-tag-kennedy">{topic}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="internship-info">
                                    <h4>Capstone &amp; Internship</h4>
                                    <p>Applied research project + industry internship through eHack Academy, with evaluation by a joint academic &amp; industry defense panel.</p>
                                </div>

                                <div className="program-actions">
                                    <a href="/programs/mscs-cybersecurity" className="btn-primary">Know More</a>
                                    <a href="#apply" className="btn-secondary">Apply Now</a>
                                </div>
                            </div>
                        </div>

                        {/* Integrated BSCS + MSCS (15 Months) */}
                        <div className={`program-content ${activeTab === 'integrated' ? 'active' : ''}`} id="integrated">
                            <div className="program-card">
                                <div className="program-card-header">
                                    <span className="program-badge featured">Accelerated Pathway</span>
                                </div>
                                <h3 className="program-name">Integrated BSCS + MSCS – Accelerated (15 Months)</h3>
                                <p className="program-description">An accelerated integrated pathway enabling learners to earn both bachelor&apos;s and master&apos;s qualifications through an intensive academic + industry-driven model.</p>

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
                                    <ul className="phase-list">
                                        <li><strong>Phase 1:</strong> BSCS Foundation</li>
                                        <li><strong>Phase 2:</strong> Advanced MSCS Coursework</li>
                                        <li><strong>Phase 3:</strong> Industry Internship &amp; Capstone</li>
                                    </ul>
                                </div>

                                <div className="program-highlights">
                                    <h4>Key Benefits:</h4>
                                    <ul>
                                        <li>Earn both degrees in just 15 months</li>
                                        <li>Intensive academic + industry-driven model</li>
                                        <li>Combined BSCS &amp; MSCS curriculum</li>
                                        <li>Industry internship through eHack Academy</li>
                                        <li>Capstone project with joint evaluation panel</li>
                                        <li>100% Placement Assistance</li>
                                    </ul>
                                </div>

                                <div className="program-actions">
                                    <a href="/programs/integrated-bscs-mscs" className="btn-primary">Know More</a>
                                    <a href="#apply" className="btn-secondary">Apply Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="partners-section" id="partners">
                <div className="section-container">
                    <span className="section-badge">OUR PARTNERS</span>
                    <h2 className="section-title">Academic &amp; <span className="text-accent">Industry Partners</span></h2>
                    <p className="section-subtitle">We collaborate with global leaders in cybersecurity education and certification.</p>

                    <div className="partners-grid">
                        {/* EC-Council */}
                        <div className="partner-card">
                            <div className="partner-card-header">
                                <img src="/images/ec-council-logo.png" alt="EC-Council" className="partner-card-logo-img" />
                            </div>
                            <div className="partner-card-content">
                                <span className="partner-role">Certification-Awarding Body</span>
                                <p className="partner-description">EC-Council is the world&apos;s largest cybersecurity technical certification body. They are the creators of the world-famous Certified Ethical Hacker (CEH) certification and many other industry-leading programs.</p>
                                <ul className="partner-credentials">
                                    <li>Operating in 145+ Countries</li>
                                    <li>350,000+ Certified Professionals</li>
                                    <li>Trusted by Fortune 500 Companies</li>
                                </ul>
                            </div>
                        </div>

                        {/* Kennedy University */}
                        <div className="partner-card">
                            <div className="partner-card-header">
                                <img src="/images/kennedy-university-logo.png" alt="Kennedy University" className="partner-card-logo-img kennedy" />
                            </div>
                            <div className="partner-card-content">
                                <span className="partner-role">Degree-Awarding Body</span>
                                <p className="partner-description">Kennedy University is an internationally recognized institution offering accredited degree programs. Their cybersecurity programs combine academic rigor with practical industry skills.</p>
                                <ul className="partner-credentials">
                                    <li>Internationally Accredited Degrees</li>
                                    <li>Industry-Aligned Curriculum</li>
                                    <li>Global Alumni Network</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* eHack Role */}
                    <div className="ehack-role-card">
                        <img src="/ehack-black.png" alt="eHack Academy" className="ehack-role-logo" />
                        <div className="ehack-role-content">
                            <h4>eHack Academy - Training &amp; Facilitation Partner</h4>
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
                        <p className="section-subtitle">Experience cutting-edge cybersecurity education with our advanced learning
                            infrastructure.</p>

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
                                <p>Hands-on practice in virtualized environments with AI-powered threat simulations and adaptive
                                    learning paths.</p>
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
                                <p>Practice defending against actual attack scenarios in our cyber range with real-time threat
                                    intelligence.</p>
                            </div>

                            <div className="experience-card">
                                <div className="experience-icon">
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <circle cx="24" cy="14" r="8" stroke="currentColor" strokeWidth="2" />
                                        <path d="M10 42c0-8 6-14 14-14s14 6 14 14" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3>Industry Mentors</h3>
                                <p>Learn from practicing CISOs, ethical hackers, and security architects with decades of
                                    industry experience.</p>
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
                                <p>Work on real security assessments, penetration tests, and incident response scenarios for
                                    actual organizations.</p>
                            </div>

                            <div className="experience-card">
                                <div className="experience-icon">
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="currentColor" strokeWidth="2" />
                                        <path d="M24 24l18-10M24 24v20M24 24L6 14" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                                    </svg>
                                </div>
                                <h3>Live Classes</h3>
                                <p>Interactive live sessions with industry experts, Q&amp;A, and collaborative learning with peers
                                    from diverse backgrounds.</p>
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
                                <p>Dedicated preparation for EC-Council exams with practice tests, study guides, and exam
                                    strategies.</p>
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
                            <h3>Cyber Analyst</h3>
                            <p>Monitor security systems, analyze threats, and protect organizational assets.</p>
                            <span className="salary-range">₹6-12 LPA</span>
                        </div>

                        <div className="career-card">
                            <h3>Ethical Hacker</h3>
                            <p>Identify vulnerabilities through authorized penetration testing.</p>
                            <span className="salary-range">₹8-18 LPA</span>
                        </div>

                        <div className="career-card">
                            <h3>SOC Analyst</h3>
                            <p>Work in Security Operations Centers to detect and respond to incidents.</p>
                            <span className="salary-range">₹5-10 LPA</span>
                        </div>

                        <div className="career-card">
                            <h3>Cyber Manager</h3>
                            <p>Lead security teams and manage organizational security programs.</p>
                            <span className="salary-range">₹15-30 LPA</span>
                        </div>

                        <div className="career-card featured">
                            <h3>CISO</h3>
                            <p>Chief Information Security Officer - Lead enterprise security strategy.</p>
                            <span className="salary-range">₹40-80+ LPA</span>
                        </div>

                        <div className="career-card">
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
                                <p>Take the first step towards a rewarding career in cybersecurity. Our career counselors are
                                    here to help you choose the right program.</p>

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
                                <form className="apply-form" onSubmit={handleFormSubmit}>
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
                        <p>eHack Academy acts as a training and facilitation partner only. Certifications and degrees are
                            awarded solely by EC-Council and Kennedy University respectively, as per their norms. Students are
                            advised to independently verify accreditation, recognition, program structure, and validity directly
                            from the official websites of EC-Council and Kennedy University. eHack Academy shall not be
                            responsible for any decisions made by students without conducting their own due diligence prior to
                            enrollment.</p>
                    </div>
                </div>
            </section>

            {/* WhatsApp Widget */}
            <a href="https://wa.me/919876543210" className="whatsapp-widget" aria-label="Chat on WhatsApp">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </>
    );
}
