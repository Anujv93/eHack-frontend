'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';

import StickySectionNav from '@/components/global/sticky-section-nav/sticky-section-nav';
import InquiryForm from '@/components/global/inquiry-form/inquiry-form';
import { BriefcaseBusiness, CheckCircle, ArrowRight, Phone, Star, FileText, Gem, Banknote, Landmark, Shield, CreditCard } from 'lucide-react';


import { ProgramLabsWrapper } from '@/components/global/certificate-labs/ProgramLabsWrapper';

// Navigation sections for MSCS page
const MSCS_NAV_SECTIONS = [
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
    title: "Master of Science in Cyber Security",
    slug: "mscs",
    category: "cybersecurity",
    subtitle: "Postgraduate Degree",
    partner: "Kennedy University",
    stats: {
        totalHours: "1000+",
        membership: "Alumni Network"
    },
    certifications: [
        { code: "MSCS", name: "Master of Science", image: "/images/certificates/mscs-cert.jpg" }
    ],
    jobRoles: [
        "Ethical Hacker", "Security Analyst", "Penetration Tester",
        "Vulnerability Analyst", "Digital Forensic Analyst", "Security Architect",
        "Network Security Engineer", "SOC Manager", "CISO", "Security Consultant"
    ],
    careerROI: {
        title: "Great Career ROI",
        subtitle: "This MSCS program equips you with advanced cybersecurity skills, preparing you for leadership roles in the industry.",
        chartTitle: "Chart Your Earning Potential",
        salaryIntro: "Masters graduates command higher starting salaries and faster career progression.",
        salaryLevels: [
            { label: "₹8L", level: "Entry" },
            { label: "₹18L", level: "Mid" },
            { label: "₹35L+", level: "Senior" }
        ],
        chartDesc: "A Cybersecurity Expert's Salary Progression",
        chartNote: "Organizations offer highly competitive salaries to recruit qualified professionals."
    },
    targetAudience: [
        { title: "Fresh Graduates", desc: "Completed your Bachelor's? Specialise in cybersecurity to launch a high-paying career.", tag: "Postgraduate" },
        { title: "IT Professionals", desc: "Working in IT? Transition to cybersecurity for better growth and salary.", tag: "Career Switch" },
        { title: "Security Analysts", desc: "Already in security? Upkill yourself with a formal Master's degree.", tag: "Upskill" },
        { title: "Tech Leaders", desc: "Aspiring to be a CISO? This program covers strategic leadership.", tag: "Leadership" }
    ],
    pricing: {
        applicationFee: "₹1,000",
        admissionFee: "₹3,00,000",
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
                { q: "Is this a recognized degree?", a: "Yes, the MSCS is a fully recognized postgraduate degree awarded by Kennedy University." },
                { q: "What is the duration of the program?", a: "The program is an accelerated 12-month fast-track course." },
                { q: "Who delivers the training?", a: "The training is delivered by eHack Academy's industry-certified experts." }
            ]
        },
        {
            category: "Admissions",
            questions: [
                { q: "What is the eligibility criteria?", a: "Bachelor's degree in any stream with a basic understanding of computers." },
                { q: "Is there an entrance exam?", a: "Yes, there is a screening process to assess basic aptitude and interest." }
            ]
        },
        {
            category: "Career",
            questions: [
                { q: "What job roles can I apply for?", a: "Graduates can apply for roles like Security Architect, Penetration Tester, and SOC Manager." },
                { q: "Is there placement assistance?", a: "Yes, eHack Academy provides placement assistance and internship opportunities." }
            ]
        }
    ],
    newsItems: [
        {
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
            date: "February 2026",
            headline: "Global Cybercrime Costs to Reach $10.5 Trillion Annually by 2025",
            source: "Cybersecurity Ventures"
        },
        {
            image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=250&fit=crop",
            date: "January 2026",
            headline: "Cybersecurity Workforce Gap Widens to 3.4 Million Globally",
            source: "ISC2 Study"
        },
        {
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
            date: "January 2026",
            headline: "AI-Driven Cyber Attacks on the Rise: How Organizations are Responding",
            source: "TechCrunch"
        },
        {
            image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=250&fit=crop",
            date: "December 2025",
            headline: "Ransomware Attacks Increased by 93% in 2024",
            source: "The Hacker News"
        },
        {
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop",
            date: "December 2025",
            headline: "Zero Trust Architecture Becomes the New Standard for Enterprise Security",
            source: "CSO Online"
        },
        {
            image: "https://images.unsplash.com/photo-1618060932014-4deda4932554?w=400&h=250&fit=crop",
            date: "November 2025",
            headline: "Cloud Security Failures Will Account for 99% of Breaches Through 2025",
            source: "Gartner"
        },
        {
            image: "https://images.unsplash.com/photo-1504384308090-c54be3855091?w=400&h=250&fit=crop",
            date: "October 2025",
            headline: "India Records 500% Increase in Cyberattacks - Skilled Professionals in High Demand",
            source: "Economic Times"
        },
        {
            image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&h=250&fit=crop",
            date: "October 2025",
            headline: "IoT Vulnerabilities: The Next Big Threat in Cybersecurity",
            source: "Wired"
        },
        {
            image: "https://images.unsplash.com/photo-1526374804325-e4d0d580e309?w=400&h=250&fit=crop",
            date: "September 2025",
            headline: "Data Privacy Regulations Tighten Globally: GDPR and Beyond",
            source: "Reuters"
        },
        {
            image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop",
            date: "September 2025",
            headline: "The Role of Machine Learning in Threat Detection and Response",
            source: "MIT Tech Review"
        }
    ]
};


export default function MSCSPage() {
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
        <div className="program-detail-mscs program-page">
            {/* Sticky Section Navigation */}
            <StickySectionNav
                sections={MSCS_NAV_SECTIONS}
                scrollThreshold={400}
            />

            {/* Hero Section */}
            <section className="program-hero border-bottom">
                <div className="hero-background">
                    <div className="hero-overlay"></div>
                    <div className="hero-image" style={{ backgroundImage: "url('https://images.pexels.com/photos/5473312/pexels-photo-5473312.jpeg?auto=compress&cs=tinysrgb&w=1920')" }}></div>
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
                            <InquiryForm
                                courseName="Kennedy University - MSCS (Cyber Security)"
                                courseCode="kennedy-mscs"
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
                            <h3>Curriculum <span className="text-accent">Framework</span></h3>
                            <p>eHack Certificationsᴬᴵ - AI-powered curriculum mapped to eHack Academy&apos;s Master-Level Cybersecurity Program.</p>
                        </div>
                        <div className="overview-card">
                            <h3>Fast <span className="text-accent">Track</span> Model</h3>
                            <p>90 credits delivered in 12 months through advanced research and capstone requirements.</p>
                        </div>
                        <div className="overview-card">
                            <h3>SOC & <span className="text-accent">Cloud</span> Security</h3>
                            <p>Master Security Operations Center analysis and cloud security architecture.</p>
                        </div>
                        <div className="overview-card">
                            <h3>Executive <span className="text-accent">Leadership</span></h3>
                            <p>P|HISOᴬᴵ module prepares you for CISO-level strategic security leadership.</p>
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
                        <span className="audience-eyebrow">DESIGNED FOR LEADERS</span>
                        <h2 className="audience-title-modern">
                            <span className="text-accent">Who</span> should enroll?
                        </h2>
                        <p className="audience-subtitle-modern">
                            Whether you&apos;re a fresh graduate or an experienced IT professional, this program is designed to elevate your career to the next level.
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

            {/* Hands-On Labs Section */}
            <div id="live-labs">
                <ProgramLabsWrapper
                    certificationCodes={['CEH', 'CND', 'CHFI', 'CPENT', 'CCISO']}
                    programTitle="Master of Science in Cyber Security"
                    programSlug="mscs"
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
                                            <h4 className="financing-name p-2"> EMI (3,50,000)</h4>
                                            {/* <p className="financing-desc">Zero interest installments through our internal program</p> */}
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
                    <div className="criteria-unified-wrapper">
                        <div className="criteria-grid">
                            <div className="criteria-content">
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
                            <div className="criteria-image-container">
                                <img src="/MSCS Degree Certificate.png" alt="MSCS Degree Certificate" className="criteria-cert-image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 13. NEWS SECTION - Industry Validation & Urgency */}
            <section className="news-section">
                <div className="news-container ">
                    <span className="news-badge">
                        CYBER THREATS ARE RISING
                    </span>
                    <h2 className="news-title">
                        Why Cybersecurity Skills Matter Now
                    </h2>
                    <div className="news-marquee-container">
                        <div className="news-marquee-track">
                            {/* Duplicate items for seamless loop */}
                            {[...program.newsItems, ...program.newsItems].map((item, idx) => (
                                <article key={idx} className="news-card">
                                    <div className="news-image"><img src={item.image} alt="Cybersecurity News" /></div>
                                    <div className="news-content">
                                        <span className="news-date">{item.date}</span>
                                        <h3 className="news-headline">{item.headline}</h3>
                                        <p className="news-source">{item.source}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section border-bottom" id="apply">
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
