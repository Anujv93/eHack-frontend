'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';
import './page.css';
import '../../programs/[slug]/program.css';
import StickySectionNav from '@/components/global/sticky-section-nav/sticky-section-nav';
import InquiryForm from '@/components/global/inquiry-form/inquiry-form';
import { BriefcaseBusiness, CheckCircle, ArrowRight, Phone, Star, FileText, Gem, Banknote, Landmark, Shield, CreditCard } from 'lucide-react';


import { ProgramLabsWrapper } from '@/components/global/certificate-labs/ProgramLabsWrapper';

// Navigation sections for Integrated BSCS+MSCS page
const INTEGRATED_NAV_SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'career', label: 'Career' },
    { id: 'structure', label: 'Who Should Enroll' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'live-labs', label: 'Hands-On Labs' },
    { id: 'credits', label: 'Credits' },
    { id: 'pricing', label: 'Investment' },
    { id: 'faq', label: 'FAQ' },
    { id: 'degrees', label: 'Degrees' },
    { id: 'criteria', label: 'Criteria' },
    { id: 'apply', label: 'Apply Now' },
];

const program = {
    title: "Integrated Bachelor + Master in Cyber Security",
    slug: "integrated-bscs-mscs",
    category: "cybersecurity",
    subtitle: "Dual Degree",
    partner: "Kennedy University",
    stats: {
        totalHours: "1800+",
        membership: "Alumni Network"
    },
    certifications: [
        { code: "BSCS", name: "Bachelor of Science", image: "/images/certificates/bscs-cert.jpg" },
        { code: "MSCS", name: "Master of Science", image: "/images/certificates/mscs-cert.jpg" }
    ],
    jobRoles: [
        "Cyber Security Engineer", "SOC Analyst", "Penetration Tester",
        "Security Architect", "Network Defense Specialist", "Digital Forensics Investigator",
        "Cloud Security Engineer", "CISO", "Security Consultant", "Threat Hunter"
    ],
    careerROI: {
        title: "Great Career ROI",
        subtitle: "This Integrated program fast-tracks you from foundational skills to advanced leadership, maximizing your career potential.",
        chartTitle: "Chart Your Earning Potential",
        salaryIntro: "Dual degree holders with specialized skills command premium salaries in the cybersecurity market.",
        salaryLevels: [
            { label: "₹6L", level: "Entry" },
            { label: "₹15L", level: "Mid" },
            { label: "₹30L+", level: "Senior" }
        ],
        chartDesc: "A Cybersecurity Professional's Salary Progression",
        chartNote: "The industry rewards comprehensive expertise with accelerated career growth."
    },
    targetAudience: [
        { title: "12th Pass (Fast Track)", desc: "Finished 12th? Earn both Bachelor's and Master's in just 15 months.", tag: "Accelerated" },
        { title: "Diploma Holders", desc: "Upgrade your diploma to a dual degree and jumpstart your career.", tag: "Degree Upgrade" },
        { title: "Career Starters", desc: "Want to enter the workforce with a competitive edge? This is the ultimate launchpad.", tag: "High Impact" },
        { title: "Tech Enthusiasts", desc: "Deep dive into cybersecurity from basics to advanced leadership concepts.", tag: "Comprehensive" }
    ],
    pricing: {
        applicationFee: "₹1,000",
        admissionFee: "₹4,50,000",
        companyEMI: "₹5,00,000",
        upfrontPercentage: "50%",
        upfrontAmount: "₹2,50,000",
        emiCount: 4,
        emiAmount: "₹62,500",
        note: "*GST as applicable"
    },
    faq: [
        {
            category: "Program",
            questions: [
                { q: "How can I get two degrees in 15 months?", a: "This is a fast-track integrated program designed for intensive learning, combining BSCS and MSCS curriculums." },
                { q: "Are the degrees recognized?", a: "Yes, both BSCS and MSCS degrees are fully recognized and awarded by Kennedy University." },
                { q: "Is it difficult to cope with the pace?", a: "The program is intensive but structured with mentorship to ensure student success." }
            ]
        },
        {
            category: "Admissions",
            questions: [
                { q: "What is the eligibility?", a: "12th pass or diploma in any stream. Basic computer knowledge is recommended." },
                { q: "Can I join after 10th?", a: "No, minimum eligibility is 12th grade or equivalent diploma." }
            ]
        },
        {
            category: "Career",
            questions: [
                { q: "What are the job prospects?", a: "Graduates are prepared for a wide range of roles from SOC Analyst to Security Architect." },
                { q: "Do I get internship support?", a: "Yes, the program includes mandatory internships and industry projects." }
            ]
        }
    ]
};


export default function IntegratedBSCSMSCSPage() {
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
            title: "IT Foundations, Secure Systems & Career Readiness (UG Core)",
            duration: "5 Months",
            credits: 48,
            courses: [
                {
                    code: "IBMS-101",
                    name: "P|ITFP – Professional IT Fundamentals Program",
                    credits: 12,
                    description: "Hardware, OS, Networks & Servers foundation"
                },
                {
                    code: "IBMS-102",
                    name: "P|SCSPᴬᴵ – Professional Secure Computer Systems",
                    credits: 14,
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
                {
                    code: "IBMS-103",
                    name: "P|SOCAPᴬᴵ – SOC Analyst Foundations",
                    credits: 10,
                    description: "Security Operations Center awareness and fundamentals"
                },
                {
                    code: "IBMS-104",
                    name: "Basic Soft Skills & Career Foundations",
                    credits: 12,
                    description: "Communication, teamwork, and employability readiness"
                }
            ],
            assessment: "Internal Assessments, Practical Labs, Assignments & Quizzes",
            outcome: "Strong IT base, secure computing fundamentals, SOC awareness, and employability readiness."
        },
        {
            part: "Part II",
            title: "Network Defense, Ethical Hacking & Applied Cyber Labs (UG Advanced)",
            duration: "5 Months",
            credits: 56,
            courses: [
                {
                    code: "IBMS-201",
                    name: "P|NDPᴬᴵ – Professional Network Defense Program",
                    credits: 18,
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
                        "IoT Security Administration",
                        "Application Security Administration",
                        "Enterprise Data Protection Strategies"
                    ]
                },
                {
                    code: "IBMS-202",
                    name: "P|EHCOPᴬᴵ – Ethical Hacking & Cyber Offense",
                    credits: 18,
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
                {
                    code: "IBMS-203",
                    name: "OWASP Top 10 & Web Application Security",
                    credits: 6,
                    description: "Web application security vulnerabilities and mitigations"
                },
                {
                    code: "IBMS-204",
                    name: "Applied Cyber Labs, Case Studies & Simulations",
                    credits: 8,
                    description: "Hands-on practical cybersecurity scenarios"
                },
                {
                    code: "IBMS-205",
                    name: "Internship / Live Project – I",
                    credits: 6,
                    description: "First industry internship experience"
                }
            ],
            assessment: "Lab Evaluations, Practical Assignments, Scenario-Based Testing",
            outcome: "Blue + Red team capability with real-world attack–defense exposure."
        },
        {
            part: "Part III",
            title: "Advanced Cyber Security, Cloud & Postgraduate Core (PG Level)",
            duration: "3 Months",
            credits: 44,
            courses: [
                {
                    code: "IBMS-301",
                    name: "P|SCSPᴬᴵ – Advanced Secure Systems (PG Perspective)",
                    credits: 8,
                    description: "Advanced security concepts at postgraduate level"
                },
                {
                    code: "IBMS-302",
                    name: "P|SOCAPᴬᴵ – Advanced SOC Operations",
                    credits: 10,
                    description: "Advanced Security Operations Center management",
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
                    code: "IBMS-303",
                    name: "P|CSPᴬᴵ – Professional Cloud Security Program",
                    credits: 10,
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
                    code: "IBMS-304",
                    name: "Cyber Security Research Methods & Technical Writing",
                    credits: 6,
                    description: "Research methodology and academic writing"
                },
                {
                    code: "IBMS-305",
                    name: "Internship / Industrial Project – II",
                    credits: 10,
                    description: "Second industry internship or industrial project"
                }
            ],
            assessment: "Research Projects, Practical Assessments, Internship Evaluation",
            outcome: "PG-level expertise in SOC, cloud security, research, and enterprise security operations."
        },
        {
            part: "Part IV",
            title: "Specialisation, Forensics / Pentesting & Executive Leadership",
            duration: "2 Months",
            credits: 32,
            courses: [
                {
                    code: "IBMS-401A",
                    name: "P|APTPᴬᴵ – Advanced Penetration Testing",
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
                    code: "IBMS-401B",
                    name: "P|DFIPᴬᴵ – Digital Forensics & Investigation",
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
                    code: "IBMS-402",
                    name: "P|HISOᴬᴵ – Professional Head Information Security Office",
                    credits: 8,
                    description: "CISO-level strategic security leadership and governance"
                },
                {
                    code: "IBMS-403",
                    name: "Advanced Soft Skills, Leadership & Governance",
                    credits: 10,
                    description: "Executive leadership and governance readiness"
                }
            ],
            assessment: "Final Presentation, Viva Voce, Leadership Assessment",
            outcome: "Specialised technical mastery + CISO/HISO-level governance and leadership readiness."
        }
    ];

    const highlights = [
        { label: "University", value: "Kennedy University", isLogo: true, logoSrc: "/images/kennedy-university-logo.png" },
        { label: "Degrees", value: "BSCS + MSCS" },
        { label: "Duration", value: "15 Months" },
        { label: "Credits", value: "180" },
        { label: "Internships", value: "2 Projects" },
        { label: "Delivery", value: "eHack Academy", isLogo: true, logoSrc: "/ehack-black.png" }
    ];

    return (
        <div className="program-detail-integrated program-page">
            {/* Sticky Section Navigation */}
            <StickySectionNav
                sections={INTEGRATED_NAV_SECTIONS}
                scrollThreshold={400}
            />

            {/* Hero Section */}
            <section className="program-hero border-bottom">
                <div className="hero-background">
                    <div className="hero-overlay"></div>
                    <div className="hero-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop')" }}></div>
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
                            {/* Partner Logos */}
                            <div className="partner-logos-hero">
                                <img src="/images/kennedy-university-logo.png" alt="Kennedy University" className="partner-logo kennedy" />
                                <span className="divider-line"></span>
                                <img src="/images/ec-council-logo.png" alt="EC-Council" className="partner-logo" />
                            </div>

                            {/* Badges */}
                            <div className="program-badge-row">
                                <span className="badge-plain">Accelerated</span>
                                <span className="badge-separator">|</span>
                                <span className="badge-plain">Dual Degree</span>
                            </div>

                            <h1 className="program-title">
                                Integrated Bachelor + Master<br />
                                <span className="highlight">in Cyber Security</span>
                            </h1>
                            <p className="program-desc">
                                An accelerated 15-month integrated pathway enabling learners to earn both bachelor&apos;s and master&apos;s qualifications through an intensive academic + industry-driven model.
                            </p>



                            <div className="hero-ctas">
                                <a href="#apply" className="btn-apply-now">Apply Now</a>
                                <a href="/brochures/integrated-bscs-mscs.pdf" className="btn-download" target="_blank">
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
                                courseName="Kennedy University - Integrated BSCS + MSCS"
                                courseCode="kennedy-integrated"
                                variant="hero"
                                title="Get Program Details"
                                subtitle="Our counselor will call you within 2 hours"
                            />
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
            <section className="program-overview border-bottom" id="overview">
                <div className="section-container">
                    <h2 className="section-title">Program <span className="accent">Overview</span></h2>
                    <div className="overview-grid">
                        <div className="overview-card">
                            <h3>Dual Degree Program</h3>
                            <p>Earn both BSCS and MSCS degrees in just 15 months through an accelerated integration model.</p>
                        </div>
                        <div className="overview-card">
                            <h3>180 Total Credits</h3>
                            <p>120 UG credits + 60 PG credits delivered through an intensive industry-driven curriculum.</p>
                        </div>
                        <div className="overview-card">
                            <h3>Complete Pathway</h3>
                            <p>From IT foundations to CISO-level leadership across 4 comprehensive parts.</p>
                        </div>
                        <div className="overview-card">
                            <h3>Executive Leadership</h3>
                            <p>P|HISOᴬᴵ module prepares you for CISO/HISO-level strategic security roles.</p>
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
                        <span className="audience-eyebrow">DESIGNED FOR ACCELERATION</span>
                        <h2 className="audience-title-modern">
                            <span className="text-accent">Who</span> should enroll?
                        </h2>
                        <p className="audience-subtitle-modern">
                            Ideal for ambitious learners who want to fast-track their education and career by earning two prestigious degrees in record time.
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
                    <p className="section-subtitle">A comprehensive 4-part learning path covering 180 credits over 15 months.</p>

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

            {/* Hands-On Labs Section */}
            <div id="live-labs">
                <ProgramLabsWrapper
                    certificationCodes={['CEH', 'CND', 'CHFI', 'CPENT', 'CCISO']}
                    programTitle="Integrated Bachelor + Master in Cyber Security"
                    programSlug="integrated-bscs-mscs"
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


            {/* Credit Summary */}
            <section className="credit-summary-section border-bottom" id="credits">
                <div className="section-container">
                    <h2 className="section-title">Credit <span className="accent">Summary</span></h2>
                    <div className="credit-summary-grid">
                        <div className="credit-summary-card">
                            <div className="credit-part">Part I</div>
                            <div className="credit-value">48</div>
                            <div className="credit-label">Credits</div>
                        </div>
                        <div className="credit-summary-card">
                            <div className="credit-part">Part II</div>
                            <div className="credit-value">56</div>
                            <div className="credit-label">Credits</div>
                        </div>
                        <div className="credit-summary-card">
                            <div className="credit-part">Part III</div>
                            <div className="credit-value">44</div>
                            <div className="credit-label">Credits</div>
                        </div>
                        <div className="credit-summary-card">
                            <div className="credit-part">Part IV</div>
                            <div className="credit-value">32</div>
                            <div className="credit-label">Credits</div>
                        </div>
                        <div className="credit-summary-card total">
                            <div className="credit-part">Total</div>
                            <div className="credit-value">180</div>
                            <div className="credit-label">Credits</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Degrees Awarded Section */}
            <section className="degrees-awarded-section border-bottom" id="degrees">
                <div className="section-container">
                    <div className="degrees-card">
                        <h2>Degrees Awarded – Kennedy University</h2>
                        <p className="degrees-intro">Upon successful completion, the learner will be nominated & recommended by eHack Academy for:</p>
                        <div className="degrees-list">
                            <div className="degree-item-card">
                                <div className="degree-icon-wrapper">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                    </svg>
                                </div>
                                <div className="degree-content">
                                    <div className="degree-meta">
                                        <span className="degree-badge">UG</span>
                                        <span className="degree-type">Bachelor's Degree</span>
                                    </div>
                                    <div className="degree-name">Bachelor of Science in Cyber Security <span className="degree-abbr">(BSCS)</span></div>
                                </div>
                            </div>
                            <div className="degree-connection-line"></div>
                            <div className="degree-item-card">
                                <div className="degree-icon-wrapper">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                    </svg>
                                </div>
                                <div className="degree-content">
                                    <div className="degree-meta">
                                        <span className="degree-badge pg">PG</span>
                                        <span className="degree-type">Master's Degree</span>
                                    </div>
                                    <div className="degree-name">Master of Science in Cyber Security <span className="degree-abbr">(MSCS)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Degree Award Criteria */}
            <section className="criteria-section border-bottom" id="criteria">
                <div className="section-container">
                    <div className="criteria-card">
                        <h2>Degree Award Criteria</h2>
                        <p className="criteria-intro">The learner must:</p>
                        <ul className="criteria-list">
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Earn a total of <strong>180 credits</strong></span>
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Complete all <strong>UG + PG core, SOC, cloud, specialisation &amp; P|HISOᴬᴵ modules</strong></span>
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Successfully complete <strong>internships/projects</strong></span>
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Clear <strong>final evaluation</strong> &amp; viva voce</span>
                            </li>
                        </ul>
                    </div>

                    <div className="certificate-showcase">
                        <div className="program-certificate">
                            <img src="/Integrated MSCS Degree Certifcate.png" alt="Integrated BSCS + MSCS Degree Certificate" className="certificate-image" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section border-bottom" id="apply">
                <div className="section-container">
                    <div className="cta-content">
                        <h2>Get Dual Degrees in 15 Months</h2>
                        <p>Join the Integrated BSCS + MSCS program and fast-track your cybersecurity career.</p>
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
