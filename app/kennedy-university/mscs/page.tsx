'use client';

import Link from 'next/link';
import { useState } from 'react';
import './page.css';
import StickySectionNav from '@/components/global/sticky-section-nav/sticky-section-nav';

// Navigation sections for MSCS page
const MSCS_NAV_SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'criteria', label: 'Criteria' },
    { id: 'apply', label: 'Apply Now' },
];

export default function MSCSPage() {
    const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());

    const toggleCourse = (courseCode: string) => {
        setExpandedCourses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(courseCode)) {
                newSet.delete(courseCode);
            } else {
                newSet.add(courseCode);
            }
            return newSet;
        });
    };

    const curriculum = [
        {
            part: "Part I",
            title: "Advanced Cyber Defense, SOC Operations & Cyber Offense",
            duration: "6 Months",
            credits: 48,
            courses: [
                {
                    code: "MSCS-101",
                    name: "P|SCSPᴬᴵ – Professional Secure Computer Systems Program (Advanced Perspective)",
                    credits: 10,
                    description: "Advanced security foundations and secure computing practices"
                },
                {
                    code: "MSCS-102",
                    name: "P|NDPᴬᴵ – Professional Network Defense Program (Advanced Level)",
                    credits: 14,
                    description: "Advanced network security and defense strategies",
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
                    code: "MSCS-103",
                    name: "P|SOCAPᴬᴵ – Professional Security Operations Center Analyst Program",
                    credits: 12,
                    description: "SOC operations, threat monitoring, and incident response",
                    topics: [
                        "Security Operations Center Fundamentals",
                        "SIEM Technologies and Implementation",
                        "Threat Intelligence and Analysis",
                        "Security Monitoring and Detection",
                        "Incident Response Procedures",
                        "Log Management and Analysis",
                        "Vulnerability Management",
                        "Threat Hunting Techniques",
                        "SOC Metrics and Reporting"
                    ]
                },
                {
                    code: "MSCS-104",
                    name: "P|EHCOPᴬᴵ – Professional Ethical Hacking & Cyber Offense Program",
                    credits: 12,
                    description: "Advanced ethical hacking and offensive security techniques",
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
                }
            ],
            assessment: "Lab Evaluations, Practical Assignments, Scenario-Based Testing, Continuous Assessment",
            outcome: "Advanced competence in blue team operations, SOC analysis, network defense, and offensive security."
        },
        {
            part: "Part II",
            title: "Cloud Security, Specialisation, Research, Internship & Executive Leadership",
            duration: "6 Months",
            credits: 42,
            courses: [
                {
                    code: "MSCS-201",
                    name: "P|CSPᴬᴵ – Professional Cloud Security Program",
                    credits: 8,
                    description: "Cloud security architecture and best practices",
                    topics: [
                        "Cloud Computing Fundamentals",
                        "Cloud Security Architecture",
                        "Identity and Access Management",
                        "Data Protection in Cloud",
                        "Cloud Infrastructure Security",
                        "Container Security",
                        "Serverless Security",
                        "Cloud Compliance and Governance"
                    ]
                },
                {
                    code: "MSCS-202A",
                    name: "P|APTPᴬᴵ – Professional Advanced Penetration Testing Program",
                    credits: 14,
                    description: "Specialisation Option A",
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
                        "Reporting, Documentation, and Post-Test Actions"
                    ]
                },
                {
                    code: "MSCS-202B",
                    name: "P|DFIPᴬᴵ – Professional Digital Forensics & Investigation Program",
                    credits: 14,
                    description: "Specialisation Option B (Choose One)",
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
                    code: "MSCS-203",
                    name: "Cyber Security Research Methods & Technical Writing",
                    credits: 6,
                    description: "Research methodology and academic writing for cybersecurity"
                },
                {
                    code: "MSCS-204",
                    name: "Internship / Industrial Project / Thesis",
                    credits: 10,
                    description: "6 Months hands-on industry experience or research thesis"
                },
                {
                    code: "MSCS-205",
                    name: "P|HISOᴬᴵ – Professional Head Information Security Office",
                    credits: 4,
                    description: "CISO-level strategic security leadership and governance"
                }
            ],
            assessment: "Internship Supervisor Evaluation, Research Paper, Final Presentation, Viva Voce",
            outcome: "Mastery in cloud security, advanced specialisation, applied research, and HISO-level strategic security leadership."
        }
    ];

    const highlights = [
        { label: "University", value: "Kennedy University", isLogo: true, logoSrc: "/images/kennedy-university-logo.png" },
        { label: "Degree", value: "MSCS" },
        { label: "Duration", value: "12 Months" },
        { label: "Credits", value: "90" },
        { label: "Internship", value: "6 Months" },
        { label: "Delivery", value: "eHack Academy", isLogo: true, logoSrc: "/ehack-black.png" }
    ];

    return (
        <div className="program-detail-mscs">
            {/* Sticky Section Navigation */}
            <StickySectionNav
                sections={MSCS_NAV_SECTIONS}
                scrollThreshold={400}
            />

            {/* Hero Section */}
            <section className="program-hero">
                <div className="hero-grid-bg"></div>
                <div className="hero-container">
                    <Link href="/kennedy-university" className="back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Programs
                    </Link>

                    <div className="hero-content">
                        <div className="hero-left">
                            {/* Partner Logos */}
                            <div className="partner-logos-hero">
                                <img src="/images/kennedy-university-logo.png" alt="Kennedy University" className="partner-logo kennedy" />
                                <span className="divider-line"></span>
                                <img src="/images/ec-council-logo.png" alt="EC-Council" className="partner-logo" />
                            </div>

                            {/* Badges */}
                            <div className="program-badge-row">
                                <span className="badge-plain">Fast Track</span>
                                <span className="badge-separator">|</span>
                                <span className="badge-plain">Postgraduate Degree</span>
                            </div>

                            <h1 className="program-title">
                                Master of Science in<br />
                                <span className="highlight">Cyber Security</span>
                            </h1>
                            <p className="program-desc">
                                An advanced 1-year MSCS focused on strategic, technical, and managerial cybersecurity skills for aspiring security leaders.
                                Delivered through a unique industry-academic partnership between Kennedy University and eHack Academy.
                            </p>

                            <div className="hero-ctas">
                                <a href="#apply" className="btn-apply-now">Apply Now</a>
                                <a href="/brochures/mscs-fast-track.pdf" className="btn-download" target="_blank">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                    Download Brochure
                                </a>
                            </div>
                        </div>

                        <div className="hero-right">
                            {/* Lead Collection Form */}
                            <div className="lead-form-card">
                                <h3 className="form-title">Get Program Details</h3>
                                <p className="form-subtitle">Fill the form to receive a callback</p>
                                <form className="lead-form">
                                    <input type="text" placeholder="Your Name" className="form-input" required />
                                    <input type="email" placeholder="Email Address" className="form-input" required />
                                    <div className="phone-input-wrapper">
                                        <span className="country-code">+91</span>
                                        <input type="tel" placeholder="Phone Number" className="form-input phone" required />
                                    </div>
                                    <button type="submit" className="btn-submit-form">Request Callback</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Program Stats Bar */}
                    <div className="program-stats-bar">
                        {highlights.map((item, idx) => (
                            <div key={idx} className="stat-column">
                                <span className="stat-label">{item.label}</span>
                                {item.isLogo ? (
                                    <img
                                        src={item.logoSrc}
                                        alt={item.value}
                                        className={`stat-logo ${item.label === 'University' ? 'kennedy' : ''}`}
                                    />
                                ) : (
                                    <span className="stat-value">{item.value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Program Overview */}
            <section className="program-overview" id="overview">
                <div className="section-container">
                    <h2 className="section-title">Program <span className="accent">Overview</span></h2>
                    <div className="overview-grid">
                        <div className="overview-card">
                            <h3>Curriculum Framework</h3>
                            <p>eHack Certificationsᴬᴵ - AI-powered curriculum mapped to eHack Academy's Master-Level Cybersecurity Program.</p>
                        </div>
                        <div className="overview-card">
                            <h3>Fast Track Model</h3>
                            <p>90 credits delivered in 12 months through advanced research and capstone requirements.</p>
                        </div>
                        <div className="overview-card">
                            <h3>SOC & Cloud Security</h3>
                            <p>Master Security Operations Center analysis and cloud security architecture.</p>
                        </div>
                        <div className="overview-card">
                            <h3>Executive Leadership</h3>
                            <p>P|HISOᴬᴵ module prepares you for CISO-level strategic security leadership.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Curriculum Section */}
            <section className="curriculum-section" id="curriculum">
                <div className="section-container">
                    <h2 className="section-title">Program <span className="accent">Curriculum</span></h2>
                    <p className="section-subtitle">A structured learning path across 2 parts, covering 90 credits over 12 months.</p>

                    <div className="curriculum-timeline">
                        {curriculum.map((part, idx) => (
                            <div key={idx} className="curriculum-part expanded">
                                <div className="part-header-clickable">
                                    <div className="part-number-badge">{part.part}</div>
                                    <div className="part-info">
                                        <h3 className="part-title">{part.title}</h3>
                                        <div className="part-meta">
                                            <span className="meta-item">{part.duration}</span>
                                            <span className="meta-item">{part.credits} Credits</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="part-content">
                                    <div className="courses-list">
                                        {part.courses.map((course, cidx) => {
                                            const isExpanded = expandedCourses.has(course.code);
                                            return (
                                                <div
                                                    key={cidx}
                                                    className={`course-card ${course.topics ? 'has-topics' : ''} ${isExpanded ? 'expanded' : ''}`}
                                                >
                                                    <div
                                                        className={`course-header ${course.topics ? 'clickable' : ''}`}
                                                        onClick={() => course.topics && toggleCourse(course.code)}
                                                    >
                                                        <div className="course-code">{course.code}</div>
                                                        <div className="course-details">
                                                            <h4 className="course-name">{course.name}</h4>
                                                            <p className="course-desc">{course.description}</p>
                                                        </div>
                                                        <div className="course-right">
                                                            <div className="course-credits">{course.credits} Cr</div>
                                                            {course.topics && (
                                                                <div className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>
                                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                        <path d="M6 9l6 6 6-6" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {course.topics && isExpanded && (
                                                        <div className="course-topics">
                                                            <div className="topics-grid">
                                                                {course.topics.map((topic, tidx) => (
                                                                    <div key={tidx} className="topic-item">
                                                                        <span className="topic-bullet">▸</span>
                                                                        <span className="topic-text">{topic}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="assessment-info">
                                        <strong>Assessment:</strong> {part.assessment}
                                    </div>
                                    {part.outcome && (
                                        <div className="outcome-info">
                                            <strong>Outcome:</strong> {part.outcome}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Degree Award Criteria */}
            <section className="criteria-section" id="criteria">
                <div className="section-container">
                    <div className="criteria-card">
                        <h2>Degree Award Criteria – Kennedy University</h2>
                        <p className="criteria-intro">To be recommended by eHack Academy, the learner must:</p>
                        <ul className="criteria-list">
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Earn a minimum of <strong>90 credits</strong></span>
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Complete all <strong>core, SOC, cloud, specialisation, research, and P|HISOᴬᴵ modules</strong></span>
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Successfully complete the <strong>6-month internship / project / thesis</strong></span>
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Clear <strong>final evaluation</strong> and viva voce</span>
                            </li>
                        </ul>
                    </div>

                    <div className="certificate-showcase">
                        <div className="program-certificate">
                            <img src="/MSCS Degree Certificate.png" alt="MSCS Degree Certificate" className="certificate-image" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section" id="apply">
                <div className="section-container">
                    <div className="cta-content">
                        <h2>Advance Your Cybersecurity Career</h2>
                        <p>Join the MSCS Fast Track program and become a cybersecurity leader in just 12 months.</p>
                        <div className="cta-buttons">
                            <a href="#" className="btn-primary-lg">Apply Now</a>
                            <a href="/kennedy-university#programs" className="btn-outline-lg">Explore Other Programs</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
