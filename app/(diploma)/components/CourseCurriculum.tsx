'use client';
import React, { useState, useEffect } from 'react';

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
    { name: 'Sprinto', url: 'https://www.google.com/s2/favicons?domain=sprinto.com&sz=128' },
    { name: 'Nessus Pro', url: 'https://www.google.com/s2/favicons?domain=tenable.com&sz=128' },
    { name: 'KisMAC', url: 'https://www.google.com/s2/favicons?domain=kismac-ng.org&sz=128' },
    { name: 'Nexpose', url: 'https://www.google.com/s2/favicons?domain=rapid7.com&sz=128' },
    { name: 'Forcepoint', url: 'https://www.google.com/s2/favicons?domain=forcepoint.com&sz=128' },
    { name: 'Nikto', url: 'https://www.google.com/s2/favicons?domain=cirt.net&sz=128' },
    { name: 'John the Ripper', url: 'https://www.google.com/s2/favicons?domain=openwall.com&sz=128' },
    { name: 'Aircrack-ng', url: 'https://www.google.com/s2/favicons?domain=aircrack-ng.org&sz=128' },
    { name: 'Cain and Abel', url: 'https://www.google.com/s2/favicons?domain=oxid.it&sz=128' }
];

const StaticToolsGrid = () => {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-[1px] bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
            {toolsList.map((tool, idx) => (
                <div
                    key={idx}
                    className="bg-white group relative flex flex-col items-center justify-center py-5 sm:py-8 px-2 sm:px-4 hover:bg-gray-50/50 transition-colors"
                >
                    <img
                        src={tool.url}
                        alt={tool.name}
                        className="w-9 h-9 sm:w-12 sm:h-12 object-contain drop-shadow-sm transition-all duration-300 group-hover:scale-110"
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
        <section className="w-full bg-slate-50 py-8 lg:py-12 relative overflow-hidden font-montserrat border-t border-gray-200">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="flex flex-col gap-10 lg:gap-12 items-center">
                    
                    {/* Headings */}
                    <div className="w-full text-center flex flex-col items-center">
                        <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b162c] mb-6 leading-tight">
                            Complete <span className="text-[#ff6b00]">Curriculum</span> Roadmap
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                            A step-by-step path from the basics to advanced cyber security mastery, packed with real-world methodologies.
                        </p>
                    </div>

                    {/* Curriculum List (Compact Vertical Timeline) */}
                    <div className="w-full max-w-4xl relative bg-transparent rounded-3xl mx-auto pb-10 mt-6">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-gray-200 hidden md:block">
                            <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[#ff6b00] to-transparent opacity-50"></div>
                        </div>

                        <div className="flex flex-col gap-4">
                            {curriculum.map((mod, i) => {
                                const isExpanded = expandedModule === i;

                                return (
                                    <div key={i} id={`curriculum-module-${i}`} className="relative flex flex-col md:flex-row gap-4 md:gap-6 group items-start">
                                        
                                        {/* Timeline Node */}
                                        <div className="relative shrink-0 hidden md:block z-20">
                                            <div 
                                                onClick={() => setExpandedModule(isExpanded ? null : i)}
                                                className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center border-[3px] border-white ring-1 ring-gray-200 group-hover:ring-[#ff6b00] cursor-pointer transition-all duration-300 hover:scale-105"
                                            >
                                                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-orange-50 group-hover:to-orange-100 flex items-center justify-center transition-colors">
                                                    <span className="font-montserrat font-bold text-gray-500 group-hover:text-[#ff6b00] transition-colors text-sm">{mod.number}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Card */}
                                        <div className="w-full">
                                            <div 
                                                className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-[#ff6b00]/30 hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)] transition-all duration-300 cursor-pointer relative overflow-hidden group/card flex flex-col"
                                                onClick={() => setExpandedModule(isExpanded ? null : i)}
                                            >
                                                {/* Left orange edge hover effect */}
                                                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-[#ff6b00] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                                                
                                                {/* Compact Header (Title & Badges on same line) */}
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 w-full pl-1 sm:pl-0">
                                                    <div className="flex items-start sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
                                                        <span className="text-[10px] sm:text-xs font-black text-white bg-[#0b162c] px-2 py-1 rounded-md tracking-wider shadow-sm md:hidden shrink-0 mt-0.5 sm:mt-0">
                                                            MOD {mod.number}
                                                        </span>
                                                        <h3 className="font-montserrat font-bold text-[15px] sm:text-lg md:text-xl text-[#0b162c] leading-snug group-hover/card:text-[#ff6b00] transition-colors duration-300 flex-1">
                                                            {mod.title}
                                                        </h3>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                                                        {mod.duration && (
                                                            <span className="text-[10px] sm:text-[11px] font-semibold text-[#ff6b00] bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100 whitespace-nowrap">
                                                                {mod.duration}
                                                            </span>
                                                        )}
                                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover/card:bg-orange-50 group-hover/card:text-[#ff6b00] transition-colors shadow-sm shrink-0">
                                                            <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={`grid transition-all duration-400 ease-in-out pl-2 sm:pl-0 ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-gray-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                                    <div className="overflow-hidden">
                                                        <p className="text-gray-500 text-base leading-relaxed mb-4">
                                                            {mod.description}
                                                        </p>
                                                        
                                                        <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100">
                                                            <h4 className="font-bold text-xs text-[#0b162c] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                                                <svg className="w-3.5 h-3.5 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                                Key Topics Covered
                                                            </h4>
                                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                                                {mod.topics.map((topic, j) => (
                                                                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0 mt-[7px] opacity-80"></div>
                                                                        <span className="leading-snug">{topic}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Tools UI box */}
                    <div className="w-full max-w-[1250px] mx-auto mt-4">
                        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full mx-auto">
                            <h3 className="font-montserrat font-medium text-xl sm:text-2xl text-[#0b162c] mb-8 text-center tracking-tight">
                                25+ Industry-Standard Tools You'll Master
                            </h3>
                            <StaticToolsGrid />
                        </div>
                    </div>

                    {/* CTA Boxes */}
                    <div className="w-full max-w-[1250px] mx-auto mt-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            
                            {/* Corporate Training Box */}
                            <div className="md:col-span-3 bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col sm:flex-row items-stretch justify-between overflow-hidden relative group">
                                <div className="flex-1 z-10 p-6 sm:p-8 flex flex-col justify-center items-start">
                                    <h4 className="font-montserrat font-bold text-2xl text-[#0b162c] mb-2">Corporate Training</h4>
                                    <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-[280px]">
                                        Empower your workforce. Upskill your entire team with our customized enterprise cybersecurity programs.
                                    </p>
                                    <a 
                                        href="tel:+919886035330" 
                                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg border-2 border-[#ff6b00] text-[#ff6b00] font-semibold hover:bg-[#ff6b00] hover:text-white transition-all text-sm shadow-sm bg-white mt-auto sm:mt-0 text-center block sm:inline-block"
                                    >
                                        Contact Enterprise Sales
                                    </a>
                                </div>
                                <div className="w-full sm:w-[45%] h-[200px] sm:h-auto shrink-0 relative overflow-hidden bg-gray-100">
                                    <img 
                                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop" 
                                        alt="Corporate Training Team" 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent sm:block hidden"></div>
                                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent sm:hidden block"></div>
                                </div>
                            </div>

                            {/* Advisor Box */}
                            <div className="md:col-span-2 bg-[#f8f9fa] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center border-2 border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                <h4 className="font-montserrat font-bold text-2xl text-[#0b162c] mb-3">Talk to an Advisor</h4>
                                <a 
                                    href="tel:+919886035330" 
                                    className="bg-white border border-gray-200 px-5 py-2.5 rounded-full mb-6 shadow-sm hover:border-[#ff6b00] transition-colors w-full sm:w-auto flex items-center justify-center group"
                                >
                                    <p className="text-[#0b162c] group-hover:text-[#ff6b00] text-base sm:text-lg font-bold tracking-wide transition-colors">
                                        +91-9886035330
                                    </p>
                                </a>
                                <a 
                                    href="tel:+919886035330" 
                                    className="w-full max-w-full sm:max-w-[220px] px-6 py-2.5 rounded-lg border-2 border-[#ff6b00] text-[#ff6b00] font-semibold hover:bg-[#ff6b00] hover:text-white transition-all text-sm bg-white hover:shadow-md mt-auto sm:mt-0 block text-center"
                                >
                                    Schedule a Call
                                </a>
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
