// Program data - Add new programs here and they'll automatically be available
export const programs = [
    {
        slug: "masters-ethical-hacking",
        category: "cybersecurity",
        title: "Masters Program in Ethical Hacking & Cyber Security powered by AI",
        subtitle: "with 6 Global Certifications",
        description: "Equip yourself with the skills to protect IT infrastructure, perform vulnerability assessments, and secure organizations against cyber threats.",
        features: "Includes real-time labs, hands-on penetration testing, network defense training, and internationally recognized certifications.",
        batchInfo: "IN JANUARY",
        partner: "EC-Council",
        partnerLogo: "/images/ec-council-logo.png",
        ehackLogo: "/ehack-black.png",
        stats: {
            startDate: "5th of Every Month",
            duration: "9-12 Months",
            mode: "Classroom + Live Online",
            totalHours: "300 ",
            membership: "2 Years Free Support"
        },
        schedule: "Weekday (Tue-Fri): 2 hrs/day | Weekend (Sat-Sun): 4 hrs/day",
        certifications: [
            { code: "CSCU", name: "Certified Secure Computer User", image: "/images/certificates/cert-cscu.jpg" },
            { code: "CND", name: "Certified Network Defender", image: "/images/certificates/cert-cnd.jpg" },
            { code: "CEH", name: "Certified Ethical Hacker", image: "/images/certificates/ceh-certificate.jpg" },
            { code: "CHFI", name: "Computer Hacking Forensic Investigator", image: "/images/certificates/cert-chfi.jpg" },
            { code: "CPENT", name: "Certified Penetration Testing Professional", image: "/images/certificates/cert-cpent.jpg" },
            { code: "LPT", name: "Licensed Penetration Tester", image: "/images/lpt-certification.jpg" }
        ],
        skills: [
            { name: "Network Security", desc: "Master firewall configuration, IPS/IDS implementation, VPN setup, and network defense strategies." },
            { name: "Application Security", desc: "Learn input validation, authentication mechanisms, session management, and cryptographic techniques." },
            { name: "Penetration Testing", desc: "Develop expertise in vulnerability assessment, ethical hacking methodologies, and real-world testing." },
            { name: "Digital Forensics", desc: "Master evidence collection, forensic analysis, incident investigation, and reporting techniques." },
            { name: "Risk Assessment", desc: "Learn to identify vulnerabilities, assess security risks, and develop mitigation strategies." },
            { name: "Information Security", desc: "Understand data protection, compliance requirements, security policies, and governance." }
        ],
        curriculum: [
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
                    "Security AwarSecuring Emaeness for Social Media Platforms",
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
                    "Windows Endpoint Hardening Techniques ",
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
                    "Session HijackingSession Control and Hijacking",
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
                    "Reporting, Documentation, and Post-Test Actions"

                ]
            }
        ],
        targetAudience: [
            { title: "Career Transitioners", desc: "Professionals from IT, networking, or any technical background seeking to pivot into cybersecurity.", tag: "New to Cybersecurity" },
            { title: "Security Professionals", desc: "Cybersecurity practitioners looking to upskill, earn global certifications, and advance their careers.", tag: "Skill Enhancement" },
            { title: "Entrepreneurs", desc: "Business owners and startup founders who want to understand security to protect their digital assets.", tag: "Business Protection" },
            { title: "Tech Enthusiasts", desc: "Passionate individuals excited about ethical hacking, penetration testing, and cybersecurity.", tag: "Passion Driven" }
        ],
        jobRoles: [
            "Ethical Hacker", "Information Security Analyst", "Penetration Tester", "Vulnerability Analyst",
            "Digital Forensic Analyst", "Security Software Developer", "Network Security Engineer", "SOC Analyst",
            "Chief Information Security Officer", "Cybersecurity Consultant", "Incident Response Analyst", "Cloud Security Architect"
        ],
        pricing: {
            original: "₹5,00,000",
            discounted: "₹3,50,000",
            emi: "₹23,333/month",
            applicationFee: "₹1,000",
            admissionFee: "₹3,50,000",
            companyEMI: "₹4,00,000",
            upfrontPercentage: "50%",
            upfrontAmount: "₹2,00,000",
            emiCount: 4,
            emiAmount: "₹50,000"
        },
        partnerLogos: [
            "/images/partners/checkpoint.png",
            "/images/partners/oracle.png",
            "/images/partners/hpe.png",
            "/images/partners/dell.png",
            "/images/partners/ntt.png"
        ],
        careerROI: {
            title: "Great Career ROI",
            subtitle: "This program equips you with advanced cybersecurity skills essential for protecting organizations from cyber threats. Master ethical hacking, network defense, digital forensics, and penetration testing—preparing you for high-impact roles in the rapidly growing cybersecurity industry.",
            chartTitle: "Chart Your Earning Potential",
            salaryIntro: "Cybersecurity professionals are among the highest-paid IT specialists with average salaries exceeding ₹12,00,000 annually.",
            salaryLevels: [
                { label: "₹8L", level: "Entry" },
                { label: "₹18L", level: "Mid" },
                { label: "₹35L+", level: "Senior" }
            ],
            chartDesc: "A Cybersecurity Expert's Salary Progression",
            chartNote: "Organizations offer highly competitive salaries to recruit and retain qualified cybersecurity professionals who can protect their digital assets."
        },
        whyEhack: [
            { title: "Real Time Labs", desc: "Associated with EC-Council and CISCO, we ensure candidates get exposed to real time labs - how vulnerabilities are found and exploited, how pen testing is done for a network." },
            { title: "World Class Infrastructure", desc: "Lab infrastructure built according to EC-Council and Cisco standards with dedicated high speed broadband connectivity and well stacked library resources." },
            { title: "Certified Faculties", desc: "Our experienced instructors are duly certified by EC-Council and CISCO, providing the latest internationally practiced technological knowledge." },
            { title: "Study Abroad Programs", desc: "International collaboration with universities and institutions worldwide to provide an enabling environment through constant engagement with global partners." }
        ],

        programExcellence: [
            { title: "Real Time Labs", desc: "Hands-on experience with industry-standard security tools and live environments.", icon: "lab" },
            { title: "World Class Infrastructure", desc: "State-of-the-art training facilities with latest hardware and software.", icon: "infrastructure" },
            { title: "Certified Faculties", desc: "Learn from EC-Council certified instructors with real industry experience.", icon: "certificate" },
            { title: "Study Abroad Programs", desc: "Global exposure through international training opportunities and partnerships.", icon: "global" }
        ],
        faq: [
            {
                category: "Career",
                questions: [
                    { q: "What jobs can I get after this program?", a: "Graduates can pursue roles like Ethical Hacker, Security Analyst, Penetration Tester, SOC Analyst, Network Security Engineer, and many more cybersecurity positions." },
                    { q: "What is the average salary for cybersecurity professionals?", a: "Entry-level positions start at ₹4-6 LPA, mid-level at ₹8-15 LPA, and senior roles can go up to ₹25-40+ LPA depending on skills and certifications." },
                    { q: "Will I get placement assistance?", a: "Yes, we provide comprehensive placement support including resume building, interview preparation, and connections with 100+ hiring partners." }
                ]
            },
            {
                category: "Certifications",
                questions: [
                    { q: "Are the certifications globally recognized?", a: "Yes, all EC-Council certifications (CSCU, CND, CEH, CHFI, CPENT) are globally recognized and accepted by organizations worldwide." },
                    { q: "What is the pass rate for certifications?", a: "Our students have a 95%+ pass rate due to our comprehensive training methodology and practice labs." },
                    { q: "How long are certifications valid?", a: "EC-Council certifications are valid for 3 years and can be renewed through continuing education credits." }
                ]
            },
            {
                category: "Fees",
                questions: [
                    { q: "Are there EMI options available?", a: "Yes, we offer flexible EMI options starting from ₹23,333/month. We also partner with leading NBFCs for easy financing." },
                    { q: "Is there any scholarship available?", a: "Merit-based scholarships are available for exceptional candidates. Contact our counselors for eligibility." },
                    { q: "What does the fee include?", a: "The fee covers all training materials, lab access, certification exam vouchers, and 2 years of post-training support." }
                ]
            },
            {
                category: "Eligibility",
                questions: [
                    { q: "What is the minimum qualification required?", a: "A basic understanding of computers and networking is helpful. Graduates from any stream can apply." },
                    { q: "Is coding knowledge required?", a: "Basic programming knowledge is beneficial but not mandatory. We cover necessary scripting as part of the curriculum." },
                    { q: "Can working professionals join?", a: "Absolutely! We offer flexible weekend and evening batches designed for working professionals." }
                ]
            }
        ]
    },

    {
        slug: "graduate-cybersecurity",
        category: "cybersecurity",
        title: "Graduate Program in Ethical Hacking & Cyber Security powered by AI",
        subtitle: "with 2 Global Complimentary Certifications",
        description: "Equip yourself with skills to protect IT infrastructure, secure data, run risk analysis, architect cloud-based security, and achieve compliance.",
        features: "Includes IT Fundamentals, CSCU, CND certifications, Ethical Hacking, Penetration Testing, Digital Forensics & OWASP Top 10.",
        batchInfo: "5TH OF EVERY MONTH",
        partner: "EC-Council",
        partnerLogo: "/images/ec-council-logo.png",
        ehackLogo: "/ehack-black.png",
        stats: {
            startDate: "5th of Every Month",
            duration: "7-9 Months",
            mode: "Classroom + Live Online",
            totalHours: "200+ ",
            membership: "2 Years Free Support"
        },
        schedule: "Weekday (Tue-Fri): 2 hrs/day | Weekend (Sat-Sun): 4 hrs/day",
        certifications: [
            { code: "CSCU", name: "Certified Secure Computer User", image: "/images/certificates/cert-cscu.jpg" },
            { code: "CND", name: "Certified Network Defender", image: "/images/certificates/cert-cnd.jpg" },
        ],
        skills: [
            { name: "Application Security", desc: "Input parameter validation, User/Role Authentication & Authorization, Session management, parameter manipulation & exception management, Auditing and logging." },
            { name: "Information Security", desc: "Protects information from unauthorized access, identity theft prevention, privacy protection through identification, authentication, authorization & cryptography." },
            { name: "Disaster Recovery", desc: "Risk assessment, establishing priorities, developing recovery strategies to resume normal business operations as quickly as possible after a disaster." },
            { name: "Network Security", desc: "Anti-virus, anti-spyware, Firewall configuration, Intrusion prevention systems (IPS), and Virtual Private Networks (VPNs) for secure remote access." },
            { name: "Penetration Testing", desc: "Learn vulnerability assessment, ethical hacking methodologies, and real-world penetration testing techniques used by security professionals." },
            { name: "Digital Forensics", desc: "Evidence collection, forensic analysis, incident investigation, and reporting techniques for cybercrime cases." }
        ],
        curriculum: [
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
                    "Security AwarSecuring Emaeness for Social Media Platforms",
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
                    "Windows Endpoint Hardening Techniques ",
                    "Linux Endpoint Hardening Techniques",
                    "IoT Security Administration",
                    "Application Security Administration",
                    "Enterprise Data Protection Strategies",
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
        ],
        careerROI: {
            title: "Great Career ROI",
            subtitle: "This program equips you with advanced cybersecurity skills essential for protecting organizations from cyber threats. Master ethical hacking, network defense, digital forensics, and penetration testing—preparing you for high-impact roles in the rapidly growing cybersecurity industry.",
            chartTitle: "Chart Your Earning Potential",
            salaryIntro: "Cybersecurity professionals are among the highest-paid IT specialists with average salaries exceeding ₹12,00,000 annually.",
            salaryLevels: [
                { label: "₹8L", level: "Entry" },
                { label: "₹18L", level: "Mid" },
                { label: "₹35L+", level: "Senior" }
            ],
            chartDesc: "A Cybersecurity Expert's Salary Progression",
            chartNote: "Organizations offer highly competitive salaries to recruit and retain qualified cybersecurity professionals who can protect their digital assets."
        },
        whyEhack: [
            { title: "Real Time Labs", desc: "Associated with EC-Council and CISCO, we ensure candidates get exposed to real time labs - how vulnerabilities are found and exploited, how pen testing is done for a network." },
            { title: "World Class Infrastructure", desc: "Lab infrastructure built according to EC-Council and Cisco standards with dedicated high speed broadband connectivity and well stacked library resources." },
            { title: "Certified Faculties", desc: "Our experienced instructors are duly certified by EC-Council and CISCO, providing the latest internationally practiced technological knowledge." },
            { title: "Study Abroad Programs", desc: "International collaboration with universities and institutions worldwide to provide an enabling environment through constant engagement with global partners." }
        ],
        targetAudience: [
            { title: "Career Transitioners", desc: "Professionals from IT, networking, or any technical background seeking to pivot into the high-demand cybersecurity field.", tag: "New to Cybersecurity" },
            { title: "Security Professionals", desc: "Cybersecurity practitioners looking to upskill, earn global certifications, and advance their careers to senior roles.", tag: "Skill Enhancement" },
            { title: "Entrepreneurs", desc: "Business owners and startup founders who want to understand security to protect their digital assets and customer data.", tag: "Business Protection" },
            { title: "Tech Enthusiasts", desc: "Passionate individuals excited about ethical hacking, penetration testing, and entering the thrilling world of cybersecurity.", tag: "Passion Driven" }
        ],
        jobRoles: [
            "Ethical Hacker", "Information Security Analyst", "Penetration Tester",
            "Digital Forensic Analyst", "Security Software Developer", "Chief Information Security Officer",
            "Network Engineer/Security Architect", "Incident Handler"
        ],
        pricing: {
            original: "₹2,05,000",
            discounted: "₹1,50,000",
            emi: "₹29,750/month (4 EMIs after 30% upfront)",
            applicationFee: "₹1,000",
            admissionFee: "₹1,50,000",
            companyEMI: "₹1,70,000",
            upfrontPercentage: "30%",
            upfrontAmount: "₹51,000",
            emiCount: 4,
            emiAmount: "₹29,750"
        },
        partnerLogos: [
            "/images/partners/checkpoint.png",
            "/images/partners/oracle.png",
            "/images/partners/hpe.png",
            "/images/partners/dell.png",
            "/images/partners/ntt.png"
        ],
        programExcellence: [
            { title: "Real Time Labs", desc: "Hands-on experience with industry-standard security tools and live environments.", icon: "lab" },
            { title: "World Class Infrastructure", desc: "State-of-the-art training facilities with latest hardware and software.", icon: "infrastructure" },
            { title: "Certified Faculties", desc: "Learn from EC-Council certified instructors with real industry experience.", icon: "certificate" },
            { title: "Study Abroad Programs", desc: "Global exposure through international training opportunities and partnerships.", icon: "global" }
        ],
        faq: [
            {
                category: "Program",
                questions: [
                    { q: "What is the Graduate Program in Cyber Security?", a: "A 7-9 month comprehensive program covering IT Fundamentals, CSCU, CND certifications, Ethical Hacking, Penetration Testing, Digital Forensics & OWASP Top 10 with 200+ hours of training." },
                    { q: "What certifications are included?", a: "2 Global EC-Council Certifications: CSCU (Certified Secure Computer User) and CND (Certified Network Defender)." },
                    { q: "What are the schedule options?", a: "Weekday (Tuesday to Friday): 2 hrs/day OR Weekend (Saturday & Sunday): 4 hrs/day. Course starts 5th of every month." },
                    { q: "What is the program fee?", a: "Program Fee: ₹2,05,000 | Offer Price: ₹1,50,000 | EMI Option: ₹1,70,000 (30% upfront: ₹51,000 + 4 EMIs of ₹29,750). Application fee: ₹1,000 (adjustable in program fee). GST as applicable." }
                ]
            },
            {
                category: "Eligibility",
                questions: [
                    { q: "What is the minimum qualification required?", a: "A basic understanding of computers and networking is helpful. Graduates from any stream can apply." },
                    { q: "Is coding knowledge required?", a: "Basic programming knowledge is beneficial but not mandatory. We cover necessary scripting as part of the curriculum." },
                    { q: "Can working professionals join?", a: "Absolutely! We offer flexible weekend and evening batches designed for working professionals." }
                ]
            },
            {
                category: "Fees",
                questions: [
                    { q: "Are there EMI options available?", a: "Yes, we offer flexible EMI options. EMI Option: ₹1,70,000 (30% upfront payment of ₹51,000 + 4 equal EMIs of ₹29,750)." },
                    { q: "Is there any scholarship available?", a: "Merit-based scholarships are available up to ₹20,000 for exceptional candidates. Contact our counselors for eligibility." },
                    { q: "What does the fee include?", a: "The fee covers all training materials, lab access, certification exam vouchers, and 2 years of post-training support." }
                ]
            }
        ]
    },

    {
        slug: "digital-marketing-masterprogram",
        category: "digital-marketing",
        title: "Master's Program in Digital Marketing powered by AI",
        subtitle: "Build Digital Careers - Agency Style Training",
        description: "eHack Digital Academy equips you to build your career from scratch with hands-on agency-style training to bridge the industry gap in skilled digital marketing professionals.",
        features: "Includes Website Design, Copywriting, Social Media Marketing, SEO, Paid Advertising, Digital Tools, ORM & Email Marketing, and complete Job Readiness training.",
        batchInfo: "5TH OF EVERY MONTH",
        partner: "eHack Digital Academy",
        partnerLogo: "/ehack-black.png",
        ehackLogo: "/ehack-black.png",
        stats: {
            startDate: "5th of Every Month",
            duration: "4 Months",
            mode: "Classroom + Live Online",
            totalHours: "160+ ",
            membership: "Working Hours: Tue-Sun, 9:30 AM - 6:30 PM"
        },
        schedule: "Tuesday to Sunday: 9:30 AM - 6:30 PM (Monday Off)",
        certifications: [
            { code: "DIGITAL", name: "eHack Digital Academy Certificate", image: "/images/certificates/digital-marketing-certificate.jpeg" }
        ],
        skills: [
            { name: "Website Design", desc: "Create and design websites from scratch with zero-code knowledge using modern website builders and design tools." },
            { name: "Copywriting", desc: "Ace copywriting skills to sell products effectively through compelling content and persuasive marketing copy." },
            { name: "Social Media Marketing", desc: "Understanding social media dynamics to generate traffic and sales across all major platforms." },
            { name: "SEO (Search Engine Optimization)", desc: "Master skills to drive consistent organic website traffic through on-page, off-page, and technical SEO." },
            { name: "Paid Advertising", desc: "Manage and optimize Google Ads, Facebook Ads, and related campaigns for maximum ROI." },
            { name: "Digital Tools", desc: "Excel in advanced digital tools for convincing social media campaigns and marketing automation." },
            { name: "ORM & Email Marketing", desc: "Hone brand reputation through Online Reputation Management and ace email marketing strategies." },
            { name: "Job Readiness", desc: "Proficient training in various skills to land high-paying jobs in the digital marketing industry." }
        ],
        curriculum: [
            {
                number: "01",
                title: "Website Design & Development",
                duration: "2 Weeks",
                certification: "",
                description: "Learn to create professional websites from scratch without any coding knowledge using modern design tools and platforms.",
                topics: ["Website Fundamentals", "No-Code Builders", "UI/UX Basics", "Responsive Design", "Website Launch"]
            },
            {
                number: "02",
                title: "Copywriting Mastery",
                duration: "2 Weeks",
                certification: "",
                description: "Master the art of persuasive writing and creating compelling content that converts visitors into customers.",
                topics: ["Copywriting Fundamentals", "Sales Copy", "Content Strategy", "Persuasion Techniques", "Call-to-Action"]
            },
            {
                number: "03",
                title: "Social Media Marketing",
                duration: "3 Weeks",
                certification: "",
                description: "Understand social media platforms dynamics and learn to generate consistent traffic and sales through strategic campaigns.",
                topics: ["Platform Strategies", "Content Planning", "Community Management", "Social Analytics", "Influencer Marketing"]
            },
            {
                number: "04",
                title: "Search Engine Optimization (SEO)",
                duration: "3 Weeks",
                certification: "",
                description: "Drive consistent organic traffic to websites through proven SEO techniques and best practices.",
                topics: ["On-Page SEO", "Off-Page SEO", "Keyword Research", "Technical SEO", "Link Building"]
            },
            {
                number: "05",
                title: "Paid Advertising & PPC",
                duration: "3 Weeks",
                certification: "",
                description: "Master paid advertising on Google Ads, Facebook Ads, and other platforms to maximize return on investment.",
                topics: ["Google Ads", "Facebook Ads", "Campaign Setup", "Bid Management", "Conversion Tracking"]
            },
            {
                number: "06",
                title: "Advanced Digital Tools",
                duration: "2 Weeks",
                certification: "",
                description: "Learn to use professional digital marketing tools for analytics, automation, and campaign optimization.",
                topics: ["Marketing Automation", "Analytics Tools", "Design Tools", "SEO Tools", "Social Media Tools"]
            },
            {
                number: "07",
                title: "ORM & Email Marketing",
                duration: "2 Weeks",
                certification: "",
                description: "Manage online reputation and create effective email marketing campaigns to nurture leads and drive conversions.",
                topics: ["Online Reputation Management", "Email Campaigns", "Lead Nurturing", "List Building", "Email Automation"]
            },
            {
                number: "08",
                title: "Job Readiness & Portfolio",
                duration: "1 Week",
                certification: "eHack Digital Academy",
                description: "Prepare for the job market with portfolio development, interview preparation, and career guidance.",
                topics: ["Portfolio Creation", "Resume Building", "Interview Skills", "Freelancing", "Career Planning"]
            }
        ],
        targetAudience: [
            { title: "Career Transitioners", desc: "Professionals from any background seeking to enter the high-growth digital marketing field with hands-on training.", tag: "Career Switch" },
            { title: "Fresh Graduates", desc: "Recent graduates looking to build practical digital marketing skills and launch a successful career in the industry.", tag: "Entry Level" },
            { title: "Entrepreneurs", desc: "Business owners and startup founders who want to market their products/services effectively using digital channels.", tag: "Business Growth" },
            { title: "Marketing Professionals", desc: "Traditional marketers looking to upskill in digital marketing and stay competitive in the modern landscape.", tag: "Skill Enhancement" }
        ],
        jobRoles: [
            "Social Media Executive", "Digital Marketing Strategist", "SEO Expert", "Content Writer",
            "Client Service Executive", "Account Manager", "Copywriter", "Media Planner",
            "Business Development Executive", "PPC Specialist", "Email Marketing Manager", "Digital Marketing Consultant"
        ],
        pricing: {
            original: "₹75,000",
            discounted: "₹45,000",
            emi: "Contact for EMI options"
        },
        partnerLogos: [
            "/images/partners/google.png",
            "/images/partners/facebook.png",
            "/images/partners/semrush.png",
            "/images/partners/hubspot.png"
        ],
        careerROI: {
            title: "Great Career ROI",
            subtitle: "This program equips you with practical digital marketing skills essential for the modern business landscape. Master SEO, social media, paid advertising, and more—preparing you for high-demand roles in the rapidly growing digital marketing industry.",
            chartTitle: "Chart Your Earning Potential",
            salaryIntro: "Digital marketing professionals are in high demand with competitive salaries averaging ₹6,00,000 annually.",
            salaryLevels: [
                { label: "₹3L", level: "Entry" },
                { label: "₹6L", level: "Mid" },
                { label: "₹15L+", level: "Senior" }
            ],
            chartDesc: "A Digital Marketing Professional's Salary Progression",
            chartNote: "Companies offer competitive salaries to skilled digital marketers who can drive measurable business growth through online channels."
        },
        whyEhack: [
            { title: "Agency-Style Training", desc: "Get hands-on, practical training that mirrors real agency work environments, preparing you for actual job scenarios." },
            { title: "Expert Instructors", desc: "Learn from Prof. Dr. Murali & Dr. Sheenu Jain - experienced digital marketing professionals who guide, coach, and mentor you." },
            { title: "High-End Infrastructure", desc: "Access to latest technology and tools used by professional digital marketing agencies and companies." },
            { title: "Job Readiness Focus", desc: "Comprehensive training designed to make you job-ready with portfolio development and career support." }
        ],
        programExcellence: [
            { title: "Agency-Style Training", desc: "Hands-on practical training that simulates real agency work environments.", icon: "lab" },
            { title: "High-End Infrastructure", desc: "Access to latest digital marketing tools and technology platforms.", icon: "infrastructure" },
            { title: "Expert Instructors", desc: "Learn from experienced digital marketing professionals and consultants.", icon: "certificate" },
            { title: "Job Support", desc: "Complete job readiness training with portfolio development and career guidance.", icon: "global" }
        ],
        faq: [
            {
                category: "Program",
                questions: [
                    { q: "What is the Digital Marketing Master's Program?", a: "A comprehensive 4-month program covering Website Design, Copywriting, Social Media Marketing, SEO, Paid Advertising, ORM & Email Marketing with agency-style hands-on training." },
                    { q: "Who teaches the program?", a: "The program is taught by Prof. Dr. Murali & Dr. Sheenu Jain, experienced digital marketing professionals who serve as guides, coaches, consultants and advisors." },
                    { q: "What are the schedule options?", a: "Tuesday to Sunday: 9:30 AM - 6:30 PM (Monday Off). New batches start on the 5th of every month." },
                    { q: "What is the program fee?", a: "Original Price: ₹75,000 | Discounted Offer: ₹45,000. Contact us for flexible EMI options." }
                ]
            },
            {
                category: "Career",
                questions: [
                    { q: "What jobs can I get after this program?", a: "Graduates can pursue roles like Social Media Executive, Digital Marketing Strategist, SEO Expert, Content Writer, Account Manager, Copywriter, Media Planner, and Business Development Executive." },
                    { q: "What is the average salary for digital marketing professionals?", a: "Entry-level positions start at ₹2-4 LPA, mid-level at ₹5-8 LPA, and senior roles can go up to ₹12-20+ LPA depending on skills and experience." },
                    { q: "Will I get placement assistance?", a: "Yes, we provide comprehensive job readiness training including portfolio development, resume building, and interview preparation." }
                ]
            },
            {
                category: "Eligibility",
                questions: [
                    { q: "What is the minimum qualification required?", a: "No specific qualification required. Anyone interested in digital marketing can join - fresh graduates, working professionals, or entrepreneurs." },
                    { q: "Is technical knowledge required?", a: "No technical or coding knowledge required. We teach everything from scratch including website design with zero-code platforms." },
                    { q: "Can working professionals join?", a: "Yes! The program runs Tuesday to Sunday (9:30 AM - 6:30 PM) which can accommodate various schedules. Contact us to discuss your availability." }
                ]
            },
            {
                category: "Training",
                questions: [
                    { q: "What makes this program different?", a: "We offer agency-style hands-on training that bridges the industry gap. You work on real projects and learn practical skills used in actual digital marketing agencies." },
                    { q: "Will I get hands-on practice?", a: "Absolutely! The training is designed to be practical and hands-on. You'll work on real campaigns and build a professional portfolio." },
                    { q: "What tools will I learn?", a: "You'll learn industry-standard tools for SEO, social media management, paid advertising, email marketing, analytics, and design." }
                ]
            }
        ]
    },

    {
        slug: "robotics-for-all",
        category: "robotics-iot",
        title: "Robotics for Every One - Build Your First Robot with AI",
        subtitle: "Sensors & Actuators | Line Following | Obstacle Avoidance | Bluetooth Control",
        description: "This comprehensive course is designed for absolute beginners who want to learn how to build and program their very own robots from scratch. It takes students on an exciting journey into the world of robotics, starting from basic electronics to building autonomous and remotely controlled robots.",
        features: "Hands-on projects including Roach Bot, Obstacle Avoidance Robot, Line Follower Robot, and Bluetooth Controlled Robot with lifetime access to learning materials.",
        batchInfo: "5TH OF EVERY MONTH",
        partner: "eHack Academy",
        partnerLogo: "/ehack-black.png",
        ehackLogo: "/ehack-black.png",
        stats: {
            startDate: "5th of Every Month",
            duration: "60 Days",
            mode: "Live Sessions + LMS Access",
            totalHours: "120+ ",
            membership: "Lifetime Access to LMS"
        },
        schedule: "Tuesday to Sunday: 9:30 AM - 6:30 PM (Monday Off)",
        certifications: [
            { code: "ROBOTICS", name: "eHack Academy Robotics Certificate", image: "/images/certificates/robotics-image.jpeg" }
        ],
        skills: [
            { name: "Introduction to Robotics", desc: "Learn the fundamentals of robotics and control systems, understanding how robots work and interact with their environment." },
            { name: "Basic Electronics", desc: "Master electronic fundamentals and component identification for building robust robotic systems." },
            { name: "Circuit Simulation", desc: "Learn to design and simulate circuits using professional simulation tools before physical implementation." },
            { name: "Wheeled Robot Control", desc: "Build and program wheeled robots with precise motor control and navigation capabilities." },
            { name: "Autonomous Navigation", desc: "Implement line following and obstacle avoidance algorithms for autonomous robot movement." },
            { name: "Wireless Control", desc: "Develop Bluetooth-controlled robots with remote operation capabilities using mobile applications." }
        ],
        curriculum: [
            {
                number: "01",
                title: "Introduction to Robotics",
                duration: "1 Week",
                certification: "",
                description: "Get introduced to the exciting world of robotics. Learn about different types of robots and their applications in real-world scenarios.",
                topics: ["Course Overview", "Robotics Fundamentals", "Types of Robots", "Applications", "Safety Guidelines"]
            },
            {
                number: "02",
                title: "Basic Electronics & Circuit Simulation",
                duration: "1 Week",
                certification: "",
                description: "Build a strong foundation in electronics. Learn to identify components, understand circuit diagrams, and simulate circuits.",
                topics: ["Electronic Components", "Circuit Theory", "Simulation Software", "Breadboard Basics", "Multimeter Usage"]
            },
            {
                number: "03",
                title: "Introduction to Robotics Kit",
                duration: "1 Week",
                certification: "",
                description: "Get familiar with your robotics kit components including motors, sensors, microcontrollers, and chassis.",
                topics: ["Kit Components", "Arduino/Microcontroller", "Motors & Drivers", "Sensors Overview", "Assembly Basics"]
            },
            {
                number: "04",
                title: "Project - Building a Roach Bot",
                duration: "1 Week",
                certification: "",
                description: "Create your first simple mechanical/electronic robot. Learn basic assembly and understand how simple robots function.",
                topics: ["Mechanical Assembly", "Motor Wiring", "Basic Programming", "Testing & Debugging", "Project Documentation"]
            },
            {
                number: "05",
                title: "Project - Obstacle Avoidance Robot",
                duration: "2 Weeks",
                certification: "",
                description: "Build an autonomous robot that can navigate around obstacles using ultrasonic sensors and intelligent programming.",
                topics: ["Ultrasonic Sensors", "Distance Measurement", "Obstacle Detection", "Navigation Logic", "Autonomous Movement"]
            },
            {
                number: "06",
                title: "Project - Line Follower Robot",
                duration: "2 Weeks",
                certification: "",
                description: "Develop a robot that can track and follow a designated path using IR sensors and PID control algorithms.",
                topics: ["IR Sensors", "Line Detection", "PID Control", "Path Following", "Speed Optimization"]
            },
            {
                number: "07",
                title: "Project - Bluetooth Controlled Robot",
                duration: "2 Weeks",
                certification: "eHack Academy",
                description: "Implement wireless control for your robot via Bluetooth. Learn to create mobile app interfaces for robot control.",
                topics: ["Bluetooth Module", "Wireless Communication", "Mobile App Control", "Command Processing", "Final Presentation"]
            }
        ],
        targetAudience: [
            { title: "Absolute Beginners", desc: "Students and hobbyists with no prior programming or robotics experience who want to enter the exciting world of robotics.", tag: "Beginner Friendly" },
            { title: "School/College Students", desc: "Young learners looking to build practical skills in robotics and electronics through hands-on project-based learning.", tag: "Student Program" },
            { title: "Tech Enthusiasts", desc: "Hobbyists passionate about building and programming robots as a creative and technical outlet.", tag: "Hobby Learning" },
            { title: "Career Starters", desc: "Individuals exploring a career path in robotics, automation, or embedded systems engineering.", tag: "Career Exploration" }
        ],
        jobRoles: [
            "Robotics Technician", "Junior Robotics Developer", "Automation Specialist", "Embedded Systems Engineer",
            "Robotics Instructor", "STEM Educator", "Mechatronics Engineer", "Electronics Technician"
        ],
        pricing: {
            original: "₹30,000",
            discounted: "₹20,000",
            emi: "Contact for EMI options"
        },
        partnerLogos: [
            "/images/partners/arduino.png",
            "/images/partners/raspberry-pi.png"
        ],
        careerROI: {
            title: "Great Learning ROI",
            subtitle: "This program provides hands-on experience in robotics and electronics, perfect for beginners. Build practical skills that prepare you for careers in automation, robotics, and embedded systems—fields experiencing rapid growth worldwide.",
            chartTitle: "Chart Your Career Path",
            salaryIntro: "Robotics professionals are in growing demand with competitive entry-level salaries averaging ₹3,50,000 annually.",
            salaryLevels: [
                { label: "₹3L", level: "Entry" },
                { label: "₹6L", level: "Mid" },
                { label: "₹12L+", level: "Senior" }
            ],
            chartDesc: "A Robotics Professional's Salary Progression",
            chartNote: "Companies are investing heavily in automation and robotics, creating exciting opportunities for skilled professionals."
        },
        whyEhack: [
            { title: "Hands-On Learning", desc: "Build 4 complete robot projects from scratch with comprehensive guidance and real hardware components." },
            { title: "Lifetime LMS Access", desc: "Get lifetime access to all course materials, video tutorials, and project documentation for continuous learning." },
            { title: "Live Interactive Sessions", desc: "Learn in real-time with expert instructors who guide you through every step of the building process." },
            { title: "No Prerequisites", desc: "Designed for absolute beginners with no prior programming or electronics knowledge required." }
        ],
        programExcellence: [
            { title: "Hands-On Projects", desc: "Build real robots and gain practical experience with actual hardware components.", icon: "lab" },
            { title: "Lifetime Access", desc: "Unlimited access to learning materials and video tutorials even after course completion.", icon: "infrastructure" },
            { title: "Expert Instructors", desc: "Learn from experienced robotics professionals and educators.", icon: "certificate" },
            { title: "Beginner Friendly", desc: "No prior knowledge required - everything taught from scratch.", icon: "global" }
        ],
        faq: [
            {
                category: "Course Details",
                questions: [
                    { q: "What will I learn in this course?", a: "You'll learn to build 4 complete robots: Roach Bot, Obstacle Avoidance Robot, Line Follower Robot, and Bluetooth Controlled Robot. The course covers electronics, programming, sensors, and autonomous navigation." },
                    { q: "Do I need any prior experience?", a: "No! This course is designed for absolute beginners. We teach everything from scratch including basic electronics and programming." },
                    { q: "What is included in the robotics kit?", a: "The kit includes Arduino/microcontroller, motors, motor drivers, various sensors (ultrasonic, IR), Bluetooth module, chassis, wheels, batteries, and all necessary components." },
                    { q: "How long is the course?", a: "The course duration is 60 days with live sessions Tuesday to Sunday, 9:30 AM - 6:30 PM. You also get lifetime access to course materials." }
                ]
            },
            {
                category: "Pricing & Payment",
                questions: [
                    { q: "What is the course fee?", a: "The original price is ₹30,000 but with our 10th Anniversary Offer, you get it for ₹20,000. This includes all learning materials and the robotics kit." },
                    { q: "Are EMI options available?", a: "Yes, we offer flexible EMI options. Contact our counselors for detailed payment plans." },
                    { q: "Is the robotics kit included?", a: "Yes, the course fee includes all learning materials and the complete robotics kit with all components needed to build your robots." }
                ]
            },
            {
                category: "Technical Requirements",
                questions: [
                    { q: "What software do I need?", a: "We'll guide you through installing free software including Arduino IDE and circuit simulation tools. All software used is free and open-source." },
                    { q: "Do I need a laptop?", a: "Yes, you'll need a laptop/computer to program your robots and access the learning management system." },
                    { q: "Can I keep the robots after the course?", a: "Yes! All robots you build during the course are yours to keep, modify, and show off to friends and family." }
                ]
            },
            {
                category: "Career & Support",
                questions: [
                    { q: "Will I get a certificate?", a: "Yes, you'll receive a Certificate of Completion from eHack Academy after successfully completing all projects." },
                    { q: "What support is available after the course?", a: "You get lifetime access to the learning management system with all course materials, videos, and documentation. You can revisit any topic anytime." },
                    { q: "Can this help me get a job in robotics?", a: "This course provides foundational skills in robotics and electronics. It's perfect for starting a career in robotics, automation, or embedded systems." }
                ]
            }
        ]
    },

    {
        slug: "data-science-analytics",
        category: "data-science",
        title: "Data Science & Data Analytics Powered by AI",
        subtitle: "with 100% Job Assistance & Industry Projects",
        description: "Master our AI-Powered Data Science and Data Analytics certification course. Gain exceptional experience and skills while working on industrial projects with hands-on training in Python, SQL, Machine Learning, and Power BI.",
        features: "Includes Python Programming, SQL, Advanced Excel, Machine Learning, Supervised & Unsupervised Learning, Power BI Dashboard Creation, Exploratory Data Analysis with NumPy & Pandas, and 10+ Industry Projects.",
        batchInfo: "5TH OF EVERY MONTH",
        partner: "eHack Academy",
        partnerLogo: "/ehack-black.png",
        ehackLogo: "/ehack-black.png",
        stats: {
            startDate: "5th of Every Month",
            duration: "6 Months",
            mode: "Classroom + Live Online",
            totalHours: "240+",
            membership: "100% Job Assistance"
        },
        schedule: "Weekday (Tue-Fri): 2 hrs/day | Weekend (Sat-Sun): 4 hrs/day",
        certifications: [
            { code: "DSDA", name: "Data Science & Data Analytics with AI", image: "/images/data_science certificate.jpeg" }
        ],
        skills: [
            { name: "Python Programming", desc: "Master Python for data analysis including syntax, data structures, functions, and libraries essential for data science workflows." },
            { name: "SQL & Database", desc: "Learn SQL for data querying, manipulation, and database management to extract insights from structured data sources." },
            { name: "Excel & Advanced Excel", desc: "Master spreadsheet analysis including pivot tables, VLOOKUP, complex formulas, and data visualization techniques." },
            { name: "Machine Learning", desc: "Understand ML algorithms including supervised and unsupervised learning, model training, evaluation, and deployment." },
            { name: "Power BI Dashboards", desc: "Create interactive dashboards and reports for business intelligence and data-driven decision making." },
            { name: "Data Analysis with Pandas & NumPy", desc: "Perform exploratory data analysis, data cleaning, transformation, and statistical analysis using Python libraries." }
        ],
        curriculum: [
            {
                number: "01",
                title: "Python Programming Fundamentals",
                duration: "4 Weeks",
                certification: "",
                description: "Build a strong foundation in Python programming covering syntax, data types, control structures, functions, and object-oriented concepts.",
                topics: ["Python Basics", "Data Structures", "Functions", "OOP Concepts", "File Handling"]
            },
            {
                number: "02",
                title: "SQL & Database Management",
                duration: "3 Weeks",
                certification: "",
                description: "Master SQL for data querying, joins, aggregations, and database design principles for efficient data retrieval.",
                topics: ["SQL Fundamentals", "Joins & Subqueries", "Aggregations", "Database Design", "Query Optimization"]
            },
            {
                number: "03",
                title: "Excel & Advanced Analytics",
                duration: "2 Weeks",
                certification: "",
                description: "Learn advanced Excel techniques for data analysis including pivot tables, charts, and complex formulas.",
                topics: ["Pivot Tables", "VLOOKUP & XLOOKUP", "Data Visualization", "Statistical Functions", "Macros Basics"]
            },
            {
                number: "04",
                title: "Data Analysis with Pandas & NumPy",
                duration: "4 Weeks",
                certification: "",
                description: "Master data manipulation, cleaning, and exploratory data analysis using Python's most powerful libraries.",
                topics: ["NumPy Arrays", "Pandas DataFrames", "Data Cleaning", "EDA Techniques", "Data Transformation"]
            },
            {
                number: "05",
                title: "Machine Learning Foundations",
                duration: "5 Weeks",
                certification: "",
                description: "Learn supervised and unsupervised machine learning algorithms, model training, and evaluation techniques.",
                topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering", "Model Deployment"]
            },
            {
                number: "06",
                title: "Power BI & Dashboard Creation",
                duration: "3 Weeks",
                certification: "",
                description: "Create interactive business intelligence dashboards and reports for data visualization and storytelling.",
                topics: ["Power BI Interface", "Data Modeling", "DAX Functions", "Interactive Reports", "Dashboard Design"]
            },
            {
                number: "07",
                title: "Industry Projects & Capstone",
                duration: "3 Weeks",
                certification: "eHack Academy",
                description: "Apply your skills on real-world industry projects including fraud detection, price prediction, and customer analytics.",
                topics: ["Vehicle Sales Analysis", "Credit Card Fraud Detection", "Price Prediction", "Customer Segmentation", "Final Presentation"]
            }
        ],
        targetAudience: [
            { title: "Fresh Graduates", desc: "Undergraduates or graduates wishing to start their career in Data Analytics or Data Science with hands-on training.", tag: "Entry Level" },
            { title: "Career Transitioners", desc: "Professionals looking to switch to high-demand data science roles with comprehensive skill development.", tag: "Career Switch" },
            { title: "Business Analysts", desc: "Working professionals who want to enhance their analytical skills with Python, ML, and advanced visualization.", tag: "Skill Enhancement" },
            { title: "Tech Enthusiasts", desc: "Individuals passionate about data, AI, and machine learning who want to build a strong foundation.", tag: "Passion Driven" }
        ],
        jobRoles: [
            "Data Scientist", "Data Analyst", "ML Engineer", "SQL Developer",
            "Power BI Developer", "Data Science Associate", "Applied Data Scientist", "Business Intelligence Analyst"
        ],
        pricing: {
            original: "₹1,50,000",
            discounted: "₹99,000",
            emi: "No Cost EMI available"
        },
        partnerLogos: [
            "/images/partners/python.png",
            "/images/partners/microsoft.png",
            "/images/partners/google.png"
        ],
        careerROI: {
            title: "Great Career ROI",
            subtitle: "This program equips you with in-demand data science skills essential for transforming raw data into actionable insights. Master Python, SQL, Machine Learning, and Power BI—preparing you for high-impact roles in the rapidly growing data analytics industry.",
            chartTitle: "Chart Your Earning Potential",
            salaryIntro: "Data Science professionals are among the highest-paid tech specialists with starting salaries of ₹3-8 LPA.",
            salaryLevels: [
                { label: "₹4L", level: "Entry" },
                { label: "₹10L", level: "Mid" },
                { label: "₹25L+", level: "Senior" }
            ],
            chartDesc: "A Data Scientist's Salary Progression",
            chartNote: "Organizations offer highly competitive salaries to recruit data professionals who can drive data-driven decision making."
        },
        whyEhack: [
            { title: "Industry Projects", desc: "Work on 10+ real-world projects including fraud detection, price prediction, and customer analytics to build a strong portfolio." },
            { title: "100% Job Assistance", desc: "Comprehensive placement support including resume building, interview preparation, and connections with hiring partners." },
            { title: "Hands-On Training", desc: "Practical, project-based learning approach with industry-standard tools and real datasets." },
            { title: "Expert Instructors", desc: "Learn from experienced data science professionals with industry experience in analytics and machine learning." }
        ],
        programExcellence: [
            { title: "Industry Projects", desc: "Work on 10+ real-world data science projects to build a professional portfolio.", icon: "lab" },
            { title: "Job Assistance", desc: "100% placement assistance with resume building and interview preparation.", icon: "infrastructure" },
            { title: "Expert Faculty", desc: "Learn from experienced data scientists and industry practitioners.", icon: "certificate" },
            { title: "Modern Tools", desc: "Hands-on experience with Python, SQL, Power BI, and ML frameworks.", icon: "global" }
        ],
        faq: [
            {
                category: "Program",
                questions: [
                    { q: "What is Data Science?", a: "Data Science is used to extract knowledge and insights from structured and unstructured data using scientific methods, algorithms, different processes, and systems." },
                    { q: "What is Data Analytics?", a: "Data Analytics is the process of examining data-sets to deliver insights about the information the data contains, generally with the help of dedicated processes and software." },
                    { q: "What will I learn in this program?", a: "You'll learn Python, SQL, Excel, Machine Learning (Supervised & Unsupervised Learning), Power BI Dashboard creation, and Exploratory Data Analysis with NumPy and Pandas." },
                    { q: "What is the program duration?", a: "The program duration is 6 months with comprehensive hands-on training and industry projects." }
                ]
            },
            {
                category: "Career",
                questions: [
                    { q: "What job positions can I apply for?", a: "You can apply for roles like Data Scientist, Data Analyst, ML Engineer, SQL Developer, Power BI Developer, Data Science Associate, and Business Intelligence Analyst." },
                    { q: "What is the minimum CTC offered?", a: "A career in Data Science or Data Analytics will fetch you 3LPA to 8LPA initially, with potential for rapid growth." },
                    { q: "When do placements start?", a: "The placement process starts after you finish the course, which depends on your successful completion of tests and interviews. The placement drive begins towards the end of the program." },
                    { q: "Will I get placement assistance?", a: "Yes, we provide 100% job assistance including resume building, interview preparation, and mock interviews." }
                ]
            },
            {
                category: "Eligibility",
                questions: [
                    { q: "Who is eligible for this course?", a: "Any undergraduate or graduate wishing to start their career in Data Analytics or Data Science can join this program." },
                    { q: "Is coding knowledge required?", a: "No prior coding knowledge is required. We teach Python programming from scratch as part of the curriculum." },
                    { q: "Can I apply without my degree certificate?", a: "Yes, you may apply. However, to get placement assistance, you must submit your final year's grades." }
                ]
            },
            {
                category: "Certification",
                questions: [
                    { q: "Will I get a certificate?", a: "Yes, once you complete the Data Science and Data Analytics Certification course, you will receive the industry-recognized certificate from eHack Academy." },
                    { q: "Is the certificate industry-recognized?", a: "Yes, our Data Science and Data Analytics with AI certification is widely recognized for its up-to-date syllabus and practical training approach." },
                    { q: "What projects will be included in my portfolio?", a: "Your portfolio will include projects like Vehicle Sales Analysis, Credit Card Fraud Detection, Heart Disease Prediction, Customer Pattern Matching, and more." }
                ]
            }
        ]
    }
];


export function getProgramBySlug(slug: string) {
    return programs.find(p => p.slug === slug);
}

export function getAllProgramSlugs() {
    return programs.map(p => p.slug);
}

export function getProgramsByCategory(category: string) {
    return programs.filter(p => p.category === category);
}

export const programCategories = [
    {
        slug: 'cybersecurity',
        name: 'Cybersecurity Powered by AI',
        description: 'Master ethical hacking, network defense, and digital forensics',
        icon: '🛡️',
        color: '#FF6B00',
        backgroundImage: '/images/cybersecurity.jpg'
    },
    {
        slug: 'data-science',
        name: 'Data Science Powered by AI',
        description: 'Transform data into insights with analytics and AI',
        icon: '📊',
        color: '#3B82F6',
        backgroundImage: '/images/datascience.jpeg'
    },
    {
        slug: 'robotics-iot',
        name: 'Robotics & IoT Powered by AI',
        description: 'Build robots and smart connected devices',
        icon: '🤖',
        color: '#10B981',
        backgroundImage: '/images/robotics.jpeg'
    },
    {
        slug: 'digital-marketing',
        name: 'Digital Marketing Powered by AI',
        description: 'Master SEO, social media, and performance marketing',
        icon: '📈',
        color: '#8B5CF6',
        backgroundImage: '/images/social-media-marketing.jpg'
    }
];

export function getCategoryBySlug(slug: string) {
    return programCategories.find(c => c.slug === slug);
}
