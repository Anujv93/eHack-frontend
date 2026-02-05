'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';
import './page.css';
import '../../programs/[slug]/program.css';
import StickySectionNav from '@/components/global/sticky-section-nav/sticky-section-nav';
import InquiryForm from '@/components/global/inquiry-form/inquiry-form';
import { BriefcaseBusiness, CheckCircle, ArrowRight, Phone, Star, FileText, Gem, Banknote, Landmark, Shield, CreditCard } from 'lucide-react';


import { ProgramLabsWrapper } from '@/components/global/certificate-labs/ProgramLabsWrapper';

// Navigation sections for BSCS page
const BSCS_NAV_SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'career', label: 'Career' },
    { id: 'structure', label: 'Who Should Enroll' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'live-labs', label: 'Hands-On Labs' },
    { id: 'pricing', label: 'Investment' },
    { id: 'faq', label: 'FAQ' },
    { id: 'criteria', label: 'Criteria' },
    { id: 'apply', label: 'Apply Now' },
];

const program = {
    title: "Bachelor of Science in Cyber Security",
    slug: "bscs",
    category: "cybersecurity",
    subtitle: "Undergraduate Degree",
    partner: "Kennedy University",
    stats: {
        totalHours: "1200+",
        membership: "Alumni Network"
    },
    certifications: [
        { code: "BSCS", name: "Bachelor of Science", image: "/images/certificates/bscs-cert.jpg" }
    ],
    jobRoles: [
        "Network Security Engineer", "SOC Analyst", "Information Security Analyst",
        "Vulnerability Assessment Analyst", "Junior Penetration Tester",
        "Technical Support Engineer", "System Administrator", "IT Security Coordinator"
    ],
    careerROI: {
        title: "Great Career ROI",
        subtitle: "This BSCS program equips you with foundational and advanced cybersecurity skills, preparing you for high-impact roles in the industry.",
        chartTitle: "Chart Your Earning Potential",
        salaryIntro: "Cybersecurity graduates are in high demand with competitive starting salaries.",
        salaryLevels: [
            { label: "₹5L", level: "Entry" },
            { label: "₹12L", level: "Mid" },
            { label: "₹25L+", level: "Senior" }
        ],
        chartDesc: "A Cybersecurity Professional's Salary Progression",
        chartNote: "Organizations offer highly competitive salaries to recruit qualified professionals."
    },
    targetAudience: [
        { title: "12th Pass Outcomes", desc: "Completed your 12th grade? Start your journey towards a global degree in cybersecurity.", tag: "Undergraduate" },
        { title: "Diploma Holders", desc: "Upgrade your diploma to a full-fledged degree with specialized cybersecurity skills.", tag: "Degree Upgrade" },
        { title: "Career Starters", desc: "Looking for a high-growth career path? Cybersecurity offers immense opportunities.", tag: "High Groth" },
        { title: "Tech Enthusiasts", desc: "Passionate about technology and security? Turn your interest into a profession.", tag: "Passion Driven" }
    ],
    pricing: {
        applicationFee: "₹1,000",
        admissionFee: "₹3,50,000",
        companyEMI: "₹4,00,000",
        upfrontPercentage: "50%",
        upfrontAmount: "₹2,00,000",
        emiCount: 4,
        emiAmount: "₹50,000",
        note: "*GST as applicable"
    },
    faq: [
        {
            category: "Program",
            questions: [
                { q: "Is this a recognized degree?", a: "Yes, the BSCS is a fully recognized undergraduate degree awarded by Kennedy University." },
                { q: "What is the duration of the program?", a: "The program is an accelerated 12-month fast-track course." },
                { q: "Who delivers the training?", a: "The training is delivered by eHack Academy's industry-certified experts." }
            ]
        },
        {
            category: "Admissions",
            questions: [
                { q: "What is the eligibility criteria?", a: "12th pass or diploma in any stream with a basic understanding of computers." },
                { q: "Is there an entrance exam?", a: "Yes, there is a screening process to assess basic aptitude and interest." }
            ]
        },
        {
            category: "Career",
            questions: [
                { q: "What job roles can I apply for?", a: "Graduates can apply for roles like Network Engineer, SOC Analyst, and Junior Security Analyst." },
                { q: "Is there placement assistance?", a: "Yes, eHack Academy provides placement assistance and internship opportunities." }
            ]
        }
    ]
};


export default function BSCSPage() {
    const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
    const [activeCategory, setActiveCategory] = useState(0);
    const [openQuestion, setOpenQuestion] = useState<number | null>(0);

    const toggleQuestion = (idx: number) => {
        setOpenQuestion(openQuestion === idx ? null : idx);
    };


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
            title: "Foundations of IT & Secure Computing",
            duration: "4 Months",
            credits: 36,
            courses: [
                { code: "BSCS-101", name: "P|ITFPᴬᴵ – Professional IT Fundamentals Program", credits: 12, description: "Hardware, OS, Networks & Servers" },
                {
                    code: "BSCS-102",
                    name: "P|SCSPᴬᴵ – Professional Secure Computer Systems Program",
                    credits: 16,
                    description: "Security foundations and secure computing practices",
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
                { code: "BSCS-103", name: "Basic Soft Skills & Career Foundations", credits: 8, description: "Communication, teamwork, and career readiness" }
            ],
            assessment: "Internal Assessments, Practical Labs, Assignments & Quizzes, Soft Skills Evaluation"
        },
        {
            part: "Part II",
            title: "Network Defense & Cyber Offense",
            duration: "4 Months",
            credits: 44,
            courses: [
                {
                    code: "BSCS-201",
                    name: "P|NDPᴬᴵ – Professional Network Defense Program",
                    credits: 20,
                    description: "Network security and defense strategies",
                    topics: [
                        "Network Attacks and Defense Approaches",
                        "Administrative Network Protection",
                        "Technical Network Safeguards",
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
                        "Mobile Endpoint Risk Management",
                        "IoT Security Administration",
                        "Application Security Administration",
                        "Enterprise Data Protection Strategies"
                    ]
                },
                {
                    code: "BSCS-202",
                    name: "P|EHCOPᴬᴵ – Professional Ethical Hacking & Cyber Offense Program",
                    credits: 20,
                    description: "Ethical hacking and penetration testing",
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
                { code: "BSCS-203", name: "Applied Cyber Labs & Case Studies", credits: 4, description: "Hands-on practical cybersecurity scenarios" }
            ],
            assessment: "Lab Evaluations, Practical Assignments, Scenario-Based Testing, Continuous Assessment"
        },
        {
            part: "Part III",
            title: "Specialisation, Internship & Professional Readiness",
            duration: "4 Months",
            credits: 40,
            courses: [
                {
                    code: "BSCS-301A",
                    name: "P|APTPᴬᴵ – Professional Advanced Penetration Testing Program",
                    credits: 16,
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
                    code: "BSCS-301B",
                    name: "P|DFIPᴬᴵ – Professional Digital Forensics & Investigation Program",
                    credits: 16,
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
                { code: "BSCS-302", name: "Advanced Soft Skills & Employability", credits: 6, description: "Leadership, interviews, and professional growth" },
                { code: "BSCS-303", name: "Internship / Industrial Project", credits: 18, description: "6 Months hands-on industry experience" }
            ],
            assessment: "Internship Supervisor Evaluation, Project Report, Final Presentation, Viva Voce"
        }
    ];

    const highlights = [
        { label: "University", value: "Kennedy University", isLogo: true, logoSrc: "/images/kennedy-university-logo.png" },
        { label: "Degree", value: "BSCS" },
        { label: "Duration", value: "12 Months" },
        { label: "Credits", value: "120" },
        { label: "Internship", value: "6 Months" },
        { label: "Delivery", value: "eHack Academy", isLogo: true, logoSrc: "/ehack-black.png" }
    ];

    return (
        <div className="program-detail-bscs program-page">
            {/* Sticky Section Navigation */}
            <StickySectionNav
                sections={BSCS_NAV_SECTIONS}
                scrollThreshold={400}
            />

            {/* Hero Section */}
            <section className="program-hero border-bottom">
                <div className="hero-background">
                    <div className="hero-overlay"></div>
                    <div className="hero-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')" }}></div>
                </div>
                <div className="hero-container">
                    <Link href="/kennedy-university" className="back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Programs
                    </Link>

                    <div className="hero-content">
                        <div className="hero-left">
                            {/* Partner Logos - Now at Top */}
                            <div className="partner-logos-hero">
                                <img src="/images/kennedy-university-logo.png" alt="Kennedy University" className="partner-logo kennedy" />
                                <span className="divider-line"></span>
                                <img src="/images/ec-council-logo.png" alt="EC-Council" className="partner-logo" />
                            </div>

                            {/* Badges - Below Logos */}
                            <div className="program-badge-row">
                                <span className="badge-plain">Fast Track</span>
                                <span className="badge-separator">|</span>
                                <span className="badge-plain">Undergraduate Degree</span>
                            </div>

                            <h1 className="program-title">
                                Bachelor of Science in<br />
                                <span className="highlight">Cyber Security</span>
                            </h1>
                            <p className="program-desc">
                                An accelerated 1-year BSCS designed for learners with prior academic or professional exposure.
                                Delivered through a unique industry-academic partnership between Kennedy University and eHack Academy.
                            </p>

                            <div className="hero-ctas">
                                <a href="#apply" className="btn-apply-now">Apply Now</a>
                                <a href="/brochures/bscs-fast-track.pdf" className="btn-download" target="_blank">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                    Download Brochure
                                </a>
                            </div>
                        </div>

                        <div className="hero-right">
                            {/* Lead Collection Form */}
                            <InquiryForm
                                courseName="Kennedy University - BSCS (Cyber Security)"
                                courseCode="kennedy-bscs"
                                variant="hero"
                                title="Get Program Details"
                                subtitle="Our counselor will call you within 2 hours"
                            />
                        </div>
                    </div>

                    {/* Program Stats Bar - Full Width */}
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
            <section className="program-overview border-bottom" id="overview">
                <div className="section-container">
                    <h2 className="section-title">Program <span className="accent">Overview</span></h2>
                    <div className="overview-grid">
                        <div className="overview-card">
                            <h3>Curriculum Framework</h3>
                            <p>eHack Certificationsᴬᴵ - AI-powered curriculum aligned with industry standards and EC-Council certifications.</p>
                        </div>
                        <div className="overview-card">
                            <h3>Fast Track Model</h3>
                            <p>120 credits delivered in 12 months through an intensive, industry-focused learning model.</p>
                        </div>
                        <div className="overview-card">
                            <h3>Practical Learning</h3>
                            <p>Hands-on labs, real-world case studies, and a 6-month internship with industry mentors.</p>
                        </div>
                        <div className="overview-card">
                            <h3>Specialisation Choice</h3>
                            <p>Choose between Advanced Penetration Testing or Digital Forensics as your specialisation track.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Great Career ROI Section */}
            <section className="roi-section border-bottom" id="career">
                <div className="section-container">
                    <h2 className="roi-title">
                        Great Career <span className="text-accent">ROI</span>
                    </h2>
                    <p className="roi-subtitle">{program.careerROI.subtitle}</p>

                    <div className="roi-grid">
                        <div className="salary-card">
                            <h3 className="roi-section-title"><span className="text-accent">Earning</span> Potential</h3>
                            <p className="salary-stat">{program.careerROI.salaryIntro}</p>
                            <div className="salary-chart">
                                <div className="salary-graph">
                                    <div className="graph-grid">
                                        <div className="grid-line"></div>
                                        <div className="grid-line"></div>
                                        <div className="grid-line"></div>
                                    </div>
                                    <svg className="graph-line" viewBox="0 0 300 120" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3" />
                                                <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.6" />
                                                <stop offset="100%" stopColor="#FF6B00" stopOpacity="1" />
                                            </linearGradient>
                                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.02" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M 30 100 L 30 85 Q 75 85 100 65 T 170 40 T 270 15 L 270 100 Z" fill="url(#areaGradient)" />
                                        <path d="M 30 85 Q 75 85 100 65 T 170 40 T 270 15" stroke="url(#lineGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                                    </svg>
                                    <div className="graph-points">
                                        {program.careerROI.salaryLevels.map((level, idx) => (
                                            <div key={idx} className={`graph-point point-${idx + 1}`}>
                                                <div className="point-marker">
                                                    <div className="point-pulse"></div>
                                                    <div className="point-dot"></div>
                                                </div>
                                                <div className="point-info">
                                                    <span className="point-value">{level.label}</span>
                                                    <span className="point-label">{level.level}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <h4 className="chart-title"><span className="text-accent">Salary</span> Progression</h4>
                            <p className="chart-desc">{program.careerROI.chartNote}</p>
                        </div>

                        <div className="jobroles-card-integrated">
                            <h3 className="roi-section-title"><span className="text-accent">{program.jobRoles.length}+</span> Career Paths</h3>
                            <div className="jobroles-grid-compact">
                                {program.jobRoles.slice(0, 9).map((role, idx) => (
                                    <div key={idx} className="job-role-tag">
                                        <BriefcaseBusiness size={14} />
                                        <span>{role}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Should Enroll Section */}
            <section className="audience-section-modern border-bottom" id="structure">
                <div className="section-container">
                    <div className="audience-header-modern">
                        <span className="audience-eyebrow">DESIGNED FOR BEGINNERS</span>
                        <h2 className="audience-title-modern">
                            <span className="text-accent">Who</span> should enroll?
                        </h2>
                        <p className="audience-subtitle-modern">
                            Whether you&apos;re a student, a diploma holder, or looking to start a career in tech—this program is built for you. No prior cybersecurity experience needed.
                        </p>
                    </div>

                    <div className="audience-grid-modern">
                        {program.targetAudience.map((audience, idx) => (
                            <div key={idx} className="audience-card-modern">
                                <div className="audience-card-number">{String(idx + 1).padStart(2, '0')}</div>
                                <div className="audience-card-content">
                                    <h3 className="audience-card-title-modern">{audience.title}</h3>
                                    <p className="audience-card-desc-modern">{audience.desc}</p>
                                    <span className="audience-tag-modern">{audience.tag}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="audience-cta-modern">
                        <div className="cta-content">
                            <h3>Not sure if this is right for you?</h3>
                            <p>Talk to our career counsellor for a personalized learning path recommendation.</p>
                        </div>
                        <a href="tel:+919886035330" className="btn-cta-modern">
                            Get Free Career Advice
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                    </div>
                </div>
            </section>


            {/* Curriculum Section */}
            <section className="curriculum-section border-bottom" id="curriculum">
                <div className="section-container">
                    <h2 className="section-title">Program <span className="accent">Curriculum</span></h2>
                    <p className="section-subtitle">A structured learning path across 3 parts, covering 120 credits over 12 months.</p>

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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hands-On Labs Section */}
            <div id="live-labs">
                <ProgramLabsWrapper
                    certificationCodes={['CEH', 'CND', 'CHFI', 'CPENT', 'CCISO']}
                    programTitle="Bachelor of Science in Cyber Security"
                    programSlug="bscs"
                />
            </div>

            {/* Pricing Section */}
            <section className="pricing-section border-bottom">
                <div className="pricing-container-full">
                    <div className="pricing-header">
                        <h2 className="pricing-title">Program Investment & <span className="text-accent">Financing</span></h2>
                        <p className="pricing-subtitle">Flexible payment options designed to make quality education accessible</p>
                    </div>

                    <div className="pricing-content-wrapper">
                        <div className="pricing-main-column">
                            <div className="fee-section">
                                <div className="fee-row">
                                    <span className="fee-label-text">
                                        <span className="fee-icon-wrapper"><FileText size={18} /></span>
                                        Application Fee
                                    </span>
                                    <span className="fee-value">{program.pricing.applicationFee}</span>
                                </div>
                                <p className="fee-note-text">Will be adjusted in the program fee. {program.pricing.note}</p>
                            </div>
                            <div className="fee-section primary">
                                <div className="fee-row">
                                    <span className="fee-label-text">
                                        <span className="fee-icon-wrapper primary"><Gem size={18} /></span>
                                        Program Admission Fee
                                    </span>
                                    <span className="fee-value-large">{program.pricing.admissionFee}</span>
                                </div>
                                <p className="fee-note-text">{program.pricing.note}</p>
                            </div>

                            <div className="payment-plans-section">
                                <h3 className="section-heading">Payment Plans</h3>
                                <div className="plan-option">
                                    <div className="plan-header">
                                        <div className="plan-title-group">
                                            <span className="plan-icon"><BriefcaseBusiness size={20} /></span>
                                            <h4 className="plan-name">Company EMI Plan</h4>
                                        </div>
                                        <span className="plan-price">{program.pricing.companyEMI}</span>
                                    </div>
                                    <p className="plan-description">Complete flexibility with company-sponsored EMI option</p>
                                </div>
                                <div className="plan-option">
                                    <div className="plan-header">
                                        <div className="plan-title-group">
                                            <span className="plan-icon"><Banknote size={20} /></span>
                                            <h4 className="plan-name">{program.pricing.upfrontPercentage} Upfront Payment</h4>
                                        </div>
                                        <span className="plan-price">{program.pricing.upfrontAmount}</span>
                                    </div>
                                    <p className="plan-description">Balance payable in {program.pricing.emiCount} equal EMIs of {program.pricing.emiAmount} each</p>
                                </div>
                            </div>
                        </div>

                        <div className="pricing-side-column">
                            <div className="financing-box">
                                <h3 className="section-heading">
                                    <span className="heading-icon"><Landmark size={20} /></span>
                                    Financing Options
                                </h3>
                                <p className="financing-description">We offer multiple financing solutions to make our programs accessible to all students.</p>
                                <div className="financing-list">
                                    <div className="financing-item">
                                        <div className="financing-icon"><Shield size={24} /></div>
                                        <div>
                                            <h4 className="financing-name">No Cost EMI (Internal)</h4>
                                            <p className="financing-desc">Zero interest installments through our internal program</p>
                                        </div>
                                    </div>
                                    <div className="financing-item">
                                        <div className="financing-icon"><CreditCard size={24} /></div>
                                        <div>
                                            <h4 className="financing-name">Bank/NBFC Financing</h4>
                                            <p className="financing-desc">Flexible payment plans through partner banks and NBFCs</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="whats-included-box" style={{ marginTop: '24px' }}>
                                <h3 className="section-heading">
                                    <span className="heading-icon"><CheckCircle size={20} /></span>
                                    What&apos;s Included
                                </h3>
                                <ul className="included-list">
                                    <li>Kennedy University Degree</li>
                                    <li>eHack Academy Certifications</li>
                                    <li>{program.stats.totalHours} of Hands-on Training</li>
                                    <li>Real-Time Labs & Practice Environment</li>
                                    <li>{program.stats.membership} Post-Training Support</li>
                                    <li>Internship & Placement Assistance</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="pricing-cta-section">
                        <button className="btn-enroll-primary">
                            Enroll Now
                            <ArrowRight size={18} />
                        </button>
                        <p className="cta-contact">Questions? Call us at <a href="tel:+919886035330">+91-9886035330</a></p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section border-bottom" id="faq">
                <div className="section-container">
                    <h2 className="faq-title">Frequently Asked <span className="text-accent">Questions</span></h2>
                    <div className="faq-container">
                        <div className="faq-categories">
                            {program.faq.map((cat, idx) => (
                                <button key={idx} className={`faq-category-btn ${activeCategory === idx ? 'active' : ''}`} onClick={() => { setActiveCategory(idx); setOpenQuestion(0); }}>{cat.category}</button>
                            ))}
                        </div>
                        <div className="faq-questions">
                            {program.faq[activeCategory].questions.map((item, idx) => (
                                <div key={idx} className={`faq-item ${openQuestion === idx ? 'open' : ''}`}>
                                    <button className="faq-question" onClick={() => toggleQuestion(idx)}>
                                        <span>{item.q}</span>
                                        <span className="faq-icon">{openQuestion === idx ? '−' : '+'}</span>
                                    </button>
                                    {openQuestion === idx && <div className="faq-answer"><p>{item.a}</p></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Degree Award Criteria */}
            <section className="criteria-section border-bottom" id="criteria">
                <div className="section-container">
                    <div className="criteria-card">
                        <h2>Degree Award Criteria – Kennedy University</h2>
                        <p className="criteria-intro">To be nominated and recommended by eHack Academy, the learner must:</p>
                        <ul className="criteria-list">
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Earn a minimum of <strong>120 credits</strong></span>
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Complete all <strong>mandatory courses</strong></span>
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Successfully finish the <strong>6-month internship</strong> / industrial project</span>
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Clear <strong>final evaluation</strong> and viva voce</span>
                            </li>
                        </ul>
                    </div>

                    <div className="certificate-showcase">
                        <div className="program-certificate">
                            <img src="/BSCS Degree Certificate.png" alt="BSCS Degree Certificate" className="certificate-image" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section border-bottom" id="apply">
                <div className="section-container">
                    <div className="cta-content">
                        <h2>Ready to Start Your Cybersecurity Career?</h2>
                        <p>Join the BSCS Fast Track program and become a cybersecurity professional in just 12 months.</p>
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
