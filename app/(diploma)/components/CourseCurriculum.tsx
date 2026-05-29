'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

const curriculum = [
    {
        number: "00",
        title: "ICE Breaker, Program Kick-off & Orientation",
        duration: "4 Hours",
        certification: "",
        description: "Your journey into a high-growth cyber security career begins from Day One. The ICE Breaker & Orientation session is a power-packed 4-hour onboarding experience designed to align learners with industry expectations, global certifications, and a clear career roadmap—before core technical training begins.",
        topics: [
            "Interactive introductions to build confidence and collaboration",
            "Clear understanding of the Master’s Program structure",
            "Alignment on learning discipline, ethics, and performance standards",
            "Setting expectations for real-world cyber security careers",
            "Introduction to eHack Academy – Institute of Emerging Technologies",
            "Overview of EC-Council, the world’s leading cyber security certification body",
            "Academic, university, and industry partnerships",
            "Industry-aligned curriculum with real-world relevance",
            "Guided walkthrough of the EC-Council LMS",
            "Access to official courseware, labs, and licensed tools",
            "Importance of classroom training and hands-on practice",
            "Transparent evaluation, exam pattern, and certification process",
            "Cyber Security–specific resume building",
            "Understanding job roles, domains, and growth paths",
            "Smart job application strategies and LinkedIn optimization",
            "Long-term career success roadmap in cyber security"
        ]
    },
    {
        number: "01",
        title: "P|CSFᴬᴵ - Professional | Cybersecurity Fundamentals Programᴬᴵ",
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
        certification: "",
        description: "Learn essential cybersecurity awareness and secure computing practices .",
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
        certification: "",
        description: "Master the protect, detect, respond, and predict approach to network security .",
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
            "Windows Endpoint Hardening Techniques ",
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
    },
    {
        number: "07",
        title: "Personality and Softskill Development",
        duration: "2 Weeks",
        certification: "",
        description: "Understand the importance of personality in career growth, industry expectations, and placement readiness.",
        topics: [
            "Self-Awareness & Confidence Building",
            "Attitude, Mindset & Professional Behavior",
            "Emotional Intelligence (EQ)",
            "Time Management & Productivity",
            "Verbal Communication Skills",
            "Non-Verbal Communication & Body Language",
            "Listening Skills & Question Handling",
            "Public Speaking & Presentation Skills",
            "Teamwork & Leadership Skills",
            "Corporate Communication Skills",
            "Problem-Solving & Critical Thinking",
            "Resume Building (ATS-Friendly)",
            "LinkedIn Profile & Personal Branding",
            "Group Discussion (GD) Techniques",
            "HR Interview Preparation",
            "Mock Interviews – HR & Technical",
            "Corporate Readiness & Workplace Ethics",
            "Placement Readiness & Career Roadmap"
        ]
    },
    {
        number: "08",
        title: "3 Months Internship on real-time industry projects",
        duration: "3 Months",
        certification: "",
        description: "Each Master Program student must select ANY TWO advanced projects.",
        topics: [
            "1. Network Security & SOC Operations",
            "2. Application & Network Security Testing",
            "3. Digital Forensics & Incident Analysis",
            "4. Cloud Infrastructure Security"
        ]
    }
];

const toolsList = [
    { name: 'Kali Linux', url: 'https://cdn.simpleicons.org/kalilinux/557C94' },
    { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'Wireshark', url: 'https://www.vectorlogo.zone/logos/wireshark/wireshark-icon.svg' },
    { name: 'Nmap', url: '/nmap.png' },
    { name: 'Burp Suite', url: 'https://cdn.simpleicons.org/burpsuite/FF6633' },
    { name: 'Metasploit', url: '/metasploit.svg' },
    { name: 'Splunk', url: 'https://cdn.simpleicons.org/splunk/000000' },
    { name: 'Cisco', url: 'https://cdn.simpleicons.org/cisco/1BA0D7' },
    { name: 'AWS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'Linux', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
    { name: 'Bash', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg' },
    { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Kubernetes', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg' },
    { name: 'PostgreSQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
];

const FlippingToolsGrid = () => {
    const VISIBLE = 6;
    const [visibleTools, setVisibleTools] = useState(toolsList.slice(0, VISIBLE));
    const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

    const getRandomTool = useCallback((exclude: typeof toolsList) => {
        const available = toolsList.filter(t => !exclude.some(e => e.name === t.name));
        return available[Math.floor(Math.random() * available.length)];
    }, []);

    useEffect(() => {
        // Each cell gets a unique flip direction
        const flipDirections = [
            { prop: 'rotateY', out: 90, in: -90 },
            { prop: 'rotateX', out: -90, in: 90 },
            { prop: 'rotateY', out: -90, in: 90 },
            { prop: 'rotateX', out: 90, in: -90 },
            { prop: 'rotateY', out: 90, in: -90 },
            { prop: 'rotateX', out: -90, in: 90 },
        ];

        const interval = setInterval(() => {
            const cells = cellRefs.current.filter(Boolean) as HTMLDivElement[];
            if (cells.length === 0) return;

            const shuffled = [...toolsList].sort(() => 0.5 - Math.random());
            const newTools = shuffled.slice(0, VISIBLE);

            let completed = 0;
            cells.forEach((cell, i) => {
                const dir = flipDirections[i % flipDirections.length];
                gsap.to(cell, {
                    [dir.prop]: dir.out,
                    duration: 0.3,
                    ease: 'power2.in',
                    delay: i * 0.08,
                    onComplete: () => {
                        completed++;
                        if (completed === cells.length) {
                            setVisibleTools(newTools);
                            cells.forEach((c, j) => {
                                const d = flipDirections[j % flipDirections.length];
                                gsap.fromTo(c, { [d.prop]: d.in }, {
                                    [d.prop]: 0,
                                    duration: 0.3,
                                    ease: 'power2.out',
                                    delay: j * 0.08,
                                });
                            });
                        }
                    }
                });
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-3 gap-[1px] bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
            {visibleTools.map((tool, idx) => (
                <div
                    key={idx}
                    ref={el => { cellRefs.current[idx] = el; }}
                    className="bg-white group relative flex flex-col items-center justify-center py-6 sm:py-8 lg:py-8 px-4 hover:bg-gray-50/50 transition-colors"
                    style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
                >
                    <img
                        src={tool.url}
                        alt={tool.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain drop-shadow-sm transition-all duration-300 group-hover:scale-110"
                        title={tool.name}
                    />
                </div>
            ))}
        </div>
    );
};

const CourseCurriculum = () => {
    const [expandedModule, setExpandedModule] = useState<number | null>(0);

    useEffect(() => {
        const handleOpenModule = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail && typeof customEvent.detail.index === 'number') {
                const targetIndex = customEvent.detail.index;
                setExpandedModule(targetIndex);
                
                setTimeout(() => {
                    const moduleElement = document.getElementById(`curriculum-module-${targetIndex}`);
                    if (moduleElement) {
                        moduleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 300);
            }
        };

        window.addEventListener('openCurriculumModule', handleOpenModule);
        return () => window.removeEventListener('openCurriculumModule', handleOpenModule);
    }, []);

    return (
        <section className="w-full bg-slate-50 py-16 relative overflow-hidden font-inter border-t border-gray-200">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                    
                    {/* Left Static Column */}
                    <div className="w-full lg:w-1/2 mb-4 lg:mb-0 text-center lg:text-left flex flex-col items-center lg:items-start self-start">
                        <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b162c] mb-6 leading-tight">
                            Complete <br className="hidden lg:block"/><span className="text-[#ff6b00]">Curriculum</span> Roadmap
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg mb-4 lg:mb-4 leading-relaxed max-w-sm mx-auto lg:mx-0">
                            A step-by-step path from the basics to advanced cyber security mastery, packed with real-world methodologies.
                        </p>
                        
                        {/* Tools UI box */}
                        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full mt-2 mx-auto lg:mx-0">
                            <h4 className="font-bold text-sm lg:text-base text-gray-400 uppercase tracking-widest mb-6 lg:mb-8 text-center">Tools You Will Master</h4>
                            <FlippingToolsGrid />
                        </div>
                    </div>

                    {/* Right Internally Scrolling Column */}
                    <div className="w-full lg:w-1/2 h-[500px] lg:h-[600px] overflow-y-auto pr-2 sm:pr-4 md:pr-6 custom-scrollbar relative bg-transparent rounded-3xl">
                        <div className="relative pb-10">
                            {/* Vertical Timeline Line */}
                            <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gray-200 hidden md:block">
                                <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[#ff6b00] to-transparent opacity-50"></div>
                            </div>

                            <div className="flex flex-col gap-10">
                            {curriculum.map((mod, i) => {
                                const isExpanded = expandedModule === i;

                                return (
                                    <div key={i} id={`curriculum-module-${i}`} className="relative flex flex-col md:flex-row gap-4 md:gap-8 group items-start">
                                        
                                        {/* Timeline Node & Semantic Tools */}
                                        <div className="relative shrink-0 hidden md:block">
                                            <div 
                                                onClick={() => setExpandedModule(isExpanded ? null : i)}
                                                className="w-14 h-14 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center border-[3px] border-white ring-2 ring-gray-100 group-hover:ring-[#ff6b00] z-20 cursor-pointer transition-all duration-300 hover:scale-110 relative"
                                            >
                                                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-orange-50 group-hover:to-orange-100 flex items-center justify-center transition-colors">
                                                    <span className="font-montserrat font-black text-gray-400 group-hover:text-[#ff6b00] transition-colors">{mod.number}</span>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Content Card */}
                                        <div className="w-full">
                                            <div 
                                                className="bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 cursor-pointer relative overflow-hidden group/card"
                                                onClick={() => setExpandedModule(isExpanded ? null : i)}
                                            >
                                                {/* Left soft hover glow instead of top border for vertical lists */}
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#ff6b00] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                                                
                                                <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
                                                    <span className="text-[11px] font-bold text-[#ff6b00] bg-orange-50/80 px-3 py-1.5 rounded-full uppercase tracking-wider hidden md:inline-flex">
                                                        Module {mod.number}
                                                    </span>
                                                    <span className="text-[11px] font-bold text-[#ff6b00] bg-orange-50/80 px-3 py-1.5 rounded-full uppercase tracking-wider md:hidden flex items-center gap-1">
                                                        <span className="w-5 h-5 bg-white text-[#ff6b00] rounded-full flex items-center justify-center -ml-1 text-[10px] shadow-sm">{mod.number}</span>
                                                        Module
                                                    </span>
                                                    {mod.duration && (
                                                        <span className="text-[11px] font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                                            {mod.duration}
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="font-montserrat font-bold text-xl text-[#0b162c] leading-snug mb-2 group-hover/card:text-[#ff6b00] transition-colors duration-300">
                                                    {mod.title}
                                                </h3>

                                                <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6 border-t border-gray-100 pt-6' : 'grid-rows-[0fr] opacity-0'}`}>
                                                    <div className="overflow-hidden">
                                                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                                            {mod.description}
                                                        </p>
                                                        
                                                        <div className="bg-gray-50 rounded-2xl p-5">
                                                            <h4 className="font-bold text-[11px] text-gray-400 uppercase tracking-widest mb-4">Key Topics Covered</h4>
                                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                                                {mod.topics.map((topic, j) => (
                                                                    <li key={j} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0 mt-1.5 opacity-80"></div>
                                                                        <span className="leading-snug">{topic}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Expand/Collapse Indicator */}
                                                {!isExpanded && (
                                                    <div className="flex items-center gap-2 mt-4 md:mt-6">
                                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover/card:text-[#ff6b00] transition-colors">View details</span>
                                                        <svg className="w-4 h-4 text-gray-300 group-hover/card:text-[#ff6b00] group-hover/card:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                        </div>
                    </div>

                </div>
            </div>
            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #ff6b00;
                    border-radius: 4px;
                }

            `}</style>
        </section>
    );
};

export default CourseCurriculum;
