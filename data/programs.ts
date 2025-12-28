// Program data - Add new programs here and they'll automatically be available
export const programs = [
    {
        slug: "masters-ethical-hacking",
        title: "Masters Program in Ethical Hacking & Cyber Security",
        subtitle: "with 5 Global Certifications",
        description: "Equip yourself with the skills to protect IT infrastructure, perform vulnerability assessments, and secure organizations against cyber threats.",
        features: "Includes real-time labs, hands-on penetration testing, network defense training, and internationally recognized certifications.",
        batchInfo: "IN JANUARY",
        partner: "EC-Council",
        partnerLogo: "/images/ec-council-badge.png",
        ehackLogo: "/ehack-black.png",
        stats: {
            startDate: "5th of Every Month",
            duration: "9-12 Months",
            mode: "Classroom + Live Online",
            totalHours: "300 Hours",
            membership: "2 Years Free Support"
        },
        schedule: "Weekday (Tue-Fri): 2 hrs/day | Weekend (Sat-Sun): 4 hrs/day",
        certifications: [
            { code: "CSCU", name: "Certified Secure Computer User", image: "/images/certifications/cert-cscu.jpg" },
            { code: "CND", name: "Certified Network Defender", image: "/images/certifications/cert-cnd.jpg" },
            { code: "CEH", name: "Certified Ethical Hacker", image: "/images/certifications/cert-ceh.jpg" },
            { code: "CHFI", name: "Computer Hacking Forensic Investigator", image: "/images/certifications/cert-chfi.jpg" },
            { code: "CPENT", name: "Certified Penetration Testing Professional", image: "/images/certifications/cert-cpent.jpg" }
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
                title: "Security Fundamentals & CSCU",
                duration: "8 Weeks",
                certification: "EC-Council CSCU",
                description: "Establish a strong foundation in cybersecurity principles. Learn to identify threats and implement security controls.",
                topics: ["Security Fundamentals", "Password Management", "Social Engineering Defense", "Email Security", "Data Protection"]
            },
            {
                number: "02",
                title: "Network Defense & CND",
                duration: "12 Weeks",
                certification: "EC-Council CND",
                description: "Learn to protect, detect, and respond to network security threats with enterprise-level defense strategies.",
                topics: ["Firewall Configuration", "IDS/IPS Systems", "VPN Architecture", "Traffic Analysis", "Incident Response"]
            },
            {
                number: "03",
                title: "Ethical Hacking & CEH",
                duration: "12 Weeks",
                certification: "EC-Council CEH",
                description: "Think like an attacker to defend like a professional. Master reconnaissance and exploitation methodologies.",
                topics: ["Reconnaissance", "Network Scanning", "System Exploitation", "Web App Attacks", "SQL Injection"]
            },
            {
                number: "04",
                title: "Digital Forensics & CHFI",
                duration: "8 Weeks",
                certification: "EC-Council CHFI",
                description: "Master the science of cyber investigations with evidence collection and forensic analysis techniques.",
                topics: ["Evidence Acquisition", "Disk Forensics", "Memory Analysis", "Network Forensics", "Report Writing"]
            },
            {
                number: "05",
                title: "Advanced Penetration Testing & CPENT",
                duration: "10 Weeks",
                certification: "EC-Council CPENT",
                description: "Elevate your skills with advanced red team techniques including IoT exploitation and OT/SCADA security.",
                topics: ["Advanced Exploitation", "Network Pivoting", "IoT Security", "OT/SCADA", "Red Team Ops"]
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
            original: "₹3,50,000",
            discounted: "₹2,80,000",
            emi: "₹23,333/month"
        }
    },
    {
        slug: "graduate-cybersecurity",
        title: "Graduate Program in Cyber Security",
        subtitle: "with 3 Global Certifications",
        description: "A comprehensive graduate-level program designed to build strong cybersecurity foundations and prepare you for industry certifications.",
        features: "Includes hands-on labs, real-world projects, network defense training, and EC-Council certifications.",
        batchInfo: "IN JANUARY",
        partner: "EC-Council",
        partnerLogo: "/images/ec-council-badge.png",
        ehackLogo: "/ehack-black.png",
        stats: {
            startDate: "5th of Every Month",
            duration: "6-9 Months",
            mode: "Classroom + Live Online",
            totalHours: "200 Hours",
            membership: "1 Year Free Support"
        },
        schedule: "Weekday (Tue-Fri): 2 hrs/day | Weekend (Sat-Sun): 4 hrs/day",
        certifications: [
            { code: "CSCU", name: "Certified Secure Computer User", image: "/images/certifications/cert-cscu.jpg" },
            { code: "CND", name: "Certified Network Defender", image: "/images/certifications/cert-cnd.jpg" },
            { code: "CEH", name: "Certified Ethical Hacker", image: "/images/certifications/cert-ceh.jpg" }
        ],
        skills: [
            { name: "Network Security", desc: "Master firewall configuration, IPS/IDS implementation, VPN setup, and network defense." },
            { name: "Ethical Hacking", desc: "Learn reconnaissance, scanning, exploitation, and vulnerability assessment." },
            { name: "Security Operations", desc: "Understand SOC operations, incident response, and threat management." },
            { name: "Risk Management", desc: "Assess security risks and develop mitigation strategies." }
        ],
        curriculum: [
            {
                number: "01",
                title: "Security Fundamentals & CSCU",
                duration: "8 Weeks",
                certification: "EC-Council CSCU",
                description: "Build a strong foundation in cybersecurity principles and best practices.",
                topics: ["Security Fundamentals", "Password Management", "Social Engineering", "Email Security"]
            },
            {
                number: "02",
                title: "Network Defense & CND",
                duration: "12 Weeks",
                certification: "EC-Council CND",
                description: "Learn to protect and defend network infrastructure against threats.",
                topics: ["Firewall Configuration", "IDS/IPS", "VPN Architecture", "Traffic Analysis"]
            },
            {
                number: "03",
                title: "Ethical Hacking & CEH",
                duration: "12 Weeks",
                certification: "EC-Council CEH",
                description: "Master ethical hacking techniques and vulnerability assessment.",
                topics: ["Reconnaissance", "Scanning", "Exploitation", "Web App Security"]
            }
        ],
        targetAudience: [
            { title: "IT Professionals", desc: "Professionals looking to transition into cybersecurity careers.", tag: "Career Growth" },
            { title: "Fresh Graduates", desc: "Recent graduates seeking to enter the cybersecurity field.", tag: "Entry Level" },
            { title: "Network Admins", desc: "Network administrators wanting to add security skills.", tag: "Skill Enhancement" }
        ],
        jobRoles: [
            "Security Analyst", "Network Security Engineer", "SOC Analyst", "Ethical Hacker",
            "Vulnerability Analyst", "Security Administrator", "IT Security Specialist"
        ],
        pricing: {
            original: "₹2,50,000",
            discounted: "₹1,80,000",
            emi: "₹15,000/month"
        }
    },
    {
        slug: "diploma-cybersecurity",
        title: "Diploma in Ethical Hacking & Cyber Security",
        subtitle: "with 2 Global Certifications",
        description: "A foundation-level diploma program designed to introduce you to the world of cybersecurity and ethical hacking.",
        features: "Includes practical labs, hands-on training, and industry-recognized EC-Council certifications.",
        batchInfo: "IN JANUARY",
        partner: "EC-Council",
        partnerLogo: "/images/ec-council-badge.png",
        ehackLogo: "/ehack-black.png",
        stats: {
            startDate: "5th of Every Month",
            duration: "4-6 Months",
            mode: "Classroom + Live Online",
            totalHours: "120 Hours",
            membership: "6 Months Free Support"
        },
        schedule: "Weekday (Tue-Fri): 2 hrs/day | Weekend (Sat-Sun): 4 hrs/day",
        certifications: [
            { code: "CSCU", name: "Certified Secure Computer User", image: "/images/certifications/cert-cscu.jpg" },
            { code: "CEH", name: "Certified Ethical Hacker", image: "/images/certifications/cert-ceh.jpg" }
        ],
        skills: [
            { name: "Cybersecurity Basics", desc: "Understand fundamental security concepts and best practices." },
            { name: "Ethical Hacking", desc: "Learn basic hacking techniques and vulnerability assessment." },
            { name: "Security Tools", desc: "Get hands-on experience with industry security tools." }
        ],
        curriculum: [
            {
                number: "01",
                title: "Security Fundamentals & CSCU",
                duration: "8 Weeks",
                certification: "EC-Council CSCU",
                description: "Learn the basics of cybersecurity and secure computing practices.",
                topics: ["Security Basics", "Password Security", "Social Engineering", "Safe Browsing"]
            },
            {
                number: "02",
                title: "Ethical Hacking & CEH",
                duration: "12 Weeks",
                certification: "EC-Council CEH",
                description: "Introduction to ethical hacking methodologies and tools.",
                topics: ["Hacking Fundamentals", "Scanning Techniques", "System Hacking", "Web Security"]
            }
        ],
        targetAudience: [
            { title: "Beginners", desc: "Complete beginners looking to start a career in cybersecurity.", tag: "No Experience Needed" },
            { title: "Students", desc: "College students wanting to build cybersecurity skills.", tag: "Academic" },
            { title: "Career Changers", desc: "Professionals from other fields exploring cybersecurity.", tag: "Career Switch" }
        ],
        jobRoles: [
            "Junior Security Analyst", "IT Security Associate", "Security Operations Assistant", "Cyber Security Intern"
        ],
        pricing: {
            original: "₹1,50,000",
            discounted: "₹99,000",
            emi: "₹8,250/month"
        }
    }
];

export function getProgramBySlug(slug: string) {
    return programs.find(p => p.slug === slug);
}

export function getAllProgramSlugs() {
    return programs.map(p => p.slug);
}
