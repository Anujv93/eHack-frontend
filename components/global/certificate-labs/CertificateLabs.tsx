'use client';

import { useState, useMemo, useEffect } from 'react';
import { Terminal, Shield, Monitor, Server, Code, Database, Eye, Wifi, Bug } from 'lucide-react';
import './CertificateLabs.css';

// Terminal simulation outputs for different tools
const terminalOutputs: { [key: string]: string[] } = {
    // Metasploit outputs
    'metasploit': [
        '┌──────────────────────────────────────────────────────────┐',
        '│                                                          │',
        '│   ███╗   ███╗███████╗████████╗ █████╗ ███████╗██████╗    │',
        '│   ████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔════╝██╔══██╗   │',
        '│   ██╔████╔██║█████╗     ██║   ███████║███████╗██████╔╝   │',
        '│   ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║╚════██║██╔═══╝    │',
        '│   ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║███████║██║        │',
        '│   ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝        │',
        '│                                                          │',
        '└──────────────────────────────────────────────────────────┘',
        '',
        '<span class="term-info">[*]</span> Starting Metasploit Framework v6.3.4-dev',
        '<span class="term-success">[+]</span> Loaded 2354 exploits, 1234 auxiliary modules',
        '<span class="term-success">[+]</span> Loaded 593 payloads, 45 encoders, 11 nops',
        '',
        '<span class="term-prompt">msf6 ></span> <span class="term-command">use exploit/windows/smb/ms17_010_eternalblue</span>',
        '<span class="term-prompt">msf6 exploit(ms17_010_eternalblue) ></span> <span class="term-command">set RHOSTS 192.168.1.100</span>',
        'RHOSTS => 192.168.1.100',
        '<span class="term-prompt">msf6 exploit(ms17_010_eternalblue) ></span> <span class="term-command">exploit</span>',
        '',
        '<span class="term-info">[*]</span> Started reverse TCP handler on 192.168.1.50:4444',
        '<span class="term-info">[*]</span> 192.168.1.100:445 - Connecting to target...',
        '<span class="term-success">[+]</span> 192.168.1.100:445 - Connection established!',
        '<span class="term-info">[*]</span> 192.168.1.100:445 - Target is Windows Server 2016',
        '<span class="term-success">[+]</span> <span class="term-highlight">Meterpreter session 1 opened!</span>',
        '',
        '<span class="term-prompt">meterpreter ></span> <span class="term-cursor">_</span>',
    ],
    // Nmap outputs
    'nmap': [
        '<span class="term-prompt">root@kali:~#</span> <span class="term-command">nmap -sV -sC -A 192.168.1.0/24</span>',
        '',
        'Starting Nmap 7.94 ( https://nmap.org )',
        '<span class="term-info">[*]</span> Scanning 256 hosts...',
        '',
        'Nmap scan report for <span class="term-highlight">192.168.1.1</span>',
        'Host is up (0.0023s latency).',
        '',
        '  PORT     STATE  SERVICE      VERSION',
        '  <span class="term-success">22/tcp   open</span>   ssh          OpenSSH 8.9p1',
        '  <span class="term-success">80/tcp   open</span>   http         Apache httpd 2.4.52',
        '  <span class="term-success">443/tcp  open</span>   ssl/http     Apache httpd 2.4.52',
        '  <span class="term-warning">3306/tcp open</span>   mysql        MySQL 8.0.32',
        '  <span class="term-error">8080/tcp open</span>   http-proxy   Jenkins CI',
        '',
        'Nmap scan report for <span class="term-highlight">192.168.1.100</span>',
        'Host is up (0.0045s latency).',
        '',
        '  PORT     STATE  SERVICE      VERSION',
        '  <span class="term-error">445/tcp  open</span>   microsoft-ds Windows SMB',
        '  <span class="term-error">3389/tcp open</span>   ms-wbt-server Microsoft RDP',
        '',
        '<span class="term-info">[*]</span> OS detection: Windows Server 2016 (96% confidence)',
        '<span class="term-warning">[!]</span> <span class="term-highlight">Vulnerability: MS17-010 EternalBlue</span>',
        '',
        '<span class="term-prompt">root@kali:~#</span> <span class="term-cursor">_</span>',
    ],
    // Burp Suite outputs
    'burp': [
        '┌─────────────────────────────────────────────────────────────┐',
        '│           <span class="term-highlight">BURP SUITE PROFESSIONAL v2024.1</span>                   │',
        '└─────────────────────────────────────────────────────────────┘',
        '',
        '<span class="term-info">[PROXY]</span> Intercepting HTTP/HTTPS traffic on 127.0.0.1:8080',
        '<span class="term-success">[+]</span> TLS interception enabled',
        '',
        '─────────────────── <span class="term-warning">REQUEST INTERCEPTED</span> ───────────────────',
        '',
        'POST /api/login HTTP/1.1',
        'Host: target-app.com',
        'Content-Type: application/json',
        'Cookie: session=abc123def456',
        '',
        '{',
        '  "username": "admin",',
        '  "password": "<span class="term-error">\' OR 1=1 --</span>"',
        '}',
        '',
        '────────────────── <span class="term-success">VULNERABILITY FOUND</span> ──────────────────',
        '',
        '<span class="term-error">[!] SQL INJECTION DETECTED</span>',
        '    <span class="term-warning">Parameter:</span> password',
        '    <span class="term-warning">Type:</span> Boolean-based blind',
        '    <span class="term-warning">Severity:</span> <span class="term-error">HIGH</span>',
        '',
        '<span class="term-prompt">[Scanner]</span> <span class="term-cursor">_</span>',
    ],
    // Kali Linux general
    'kali': [
        '<span class="term-prompt">┌──(root㉿kali)-[~]</span>',
        '<span class="term-prompt">└─#</span> <span class="term-command">ls -la /usr/share/</span>',
        '',
        'drwxr-xr-x   2 root root  4096 Jan 15 wordlists/',
        'drwxr-xr-x  12 root root  4096 Jan 15 metasploit-framework/',
        'drwxr-xr-x   8 root root  4096 Jan 15 exploitdb/',
        'drwxr-xr-x   4 root root  4096 Jan 15 nmap/',
        'drwxr-xr-x   6 root root  4096 Jan 15 sqlmap/',
        '',
        '<span class="term-prompt">┌──(root㉿kali)-[~]</span>',
        '<span class="term-prompt">└─#</span> <span class="term-command">aircrack-ng -a2 -b 00:11:22:33:44:55 capture.cap -w rockyou.txt</span>',
        '',
        '<span class="term-info">[*]</span> Opening capture.cap',
        '<span class="term-info">[*]</span> Read 45823 packets.',
        '<span class="term-info">[*]</span> Testing WPA handshake...',
        '',
        '                                  Aircrack-ng 1.7',
        '',
        '      [00:01:34] 142823/14344392 keys tested (3847.12 k/s)',
        '',
        '      <span class="term-success">KEY FOUND! [ SecureP@ss2024 ]</span>',
        '',
        '      Master Key     : A3 4B 7C 8D 9E F0 12 34 56 78 9A BC DE F0 12',
        '',
        '<span class="term-prompt">┌──(root㉿kali)-[~]</span>',
        '<span class="term-prompt">└─#</span> <span class="term-cursor">_</span>',
    ],
    // Forensics/Autopsy
    'forensics': [
        '╔═══════════════════════════════════════════════════════════════╗',
        '║              <span class="term-highlight">AUTOPSY DIGITAL FORENSICS</span>                       ║',
        '╚═══════════════════════════════════════════════════════════════╝',
        '',
        '<span class="term-info">[*]</span> Loading disk image: suspect_drive.E01',
        '<span class="term-success">[+]</span> Image verified: SHA256 hash matches',
        '<span class="term-info">[*]</span> Analyzing file system: NTFS',
        '',
        '─────────────────── FILE ANALYSIS ───────────────────',
        '',
        '<span class="term-warning">[!] Deleted files recovered: 847</span>',
        '<span class="term-warning">[!] Encrypted files found: 23</span>',
        '',
        '  <span class="term-success">[RECOVERED]</span> /Users/suspect/Documents/secret_plans.docx',
        '  <span class="term-success">[RECOVERED]</span> /Users/suspect/Downloads/malware.exe',
        '  <span class="term-error">[ENCRYPTED]</span> /Users/suspect/Private/bitcoin_wallet.dat',
        '',
        '─────────────────── TIMELINE ANALYSIS ───────────────────',
        '',
        '  2024-01-15 02:34:12  File deleted: evidence.zip',
        '  2024-01-15 02:35:08  USB device connected',
        '  2024-01-15 02:37:44  File copied to USB',
        '',
        '<span class="term-prompt">[Autopsy]</span> <span class="term-cursor">_</span>',
    ],
    // Risk Assessment / CCISO
    'risk': [
        '╔═══════════════════════════════════════════════════════════════╗',
        '║          <span class="term-highlight">ENTERPRISE RISK ASSESSMENT CONSOLE</span>                  ║',
        '╚═══════════════════════════════════════════════════════════════╝',
        '',
        '<span class="term-info">[*]</span> Loading enterprise risk framework...',
        '<span class="term-success">[+]</span> Connected to GRC Platform',
        '',
        '─────────────────── RISK DASHBOARD ───────────────────',
        '',
        '  <span class="term-error">■ CRITICAL:</span>  3 risks require immediate attention',
        '  <span class="term-warning">■ HIGH:</span>      12 risks above threshold',
        '  <span class="term-info">■ MEDIUM:</span>   45 risks being monitored',
        '  <span class="term-success">■ LOW:</span>       89 risks under control',
        '',
        '─────────────────── TOP THREATS ───────────────────',
        '',
        '  1. <span class="term-error">[CRITICAL]</span> Ransomware - Business Impact: $5.2M',
        '  2. <span class="term-error">[CRITICAL]</span> Data Breach - Business Impact: $3.8M',
        '  3. <span class="term-warning">[HIGH]</span>     Supply Chain Attack - Impact: $2.1M',
        '',
        '<span class="term-info">[*]</span> Generating ISO 27001 compliance report...',
        '<span class="term-success">[+]</span> Current compliance score: <span class="term-highlight">87.5%</span>',
        '',
        '<span class="term-prompt">[CISO Dashboard]</span> <span class="term-cursor">_</span>',
    ],
    // Default fallback
    'default': [
        '<span class="term-prompt">┌──(root㉿kali)-[~]</span>',
        '<span class="term-prompt">└─#</span> <span class="term-command">sudo systemctl start lab-environment</span>',
        '',
        '<span class="term-info">[*]</span> Initializing secure lab environment...',
        '<span class="term-success">[+]</span> Network isolation: ENABLED',
        '<span class="term-success">[+]</span> Virtual machines: READY',
        '<span class="term-success">[+]</span> Tools loaded: 600+',
        '',
        '─────────────────── LAB STATUS ───────────────────',
        '',
        '  <span class="term-success">●</span> Kali Linux VM     : Running',
        '  <span class="term-success">●</span> Target Windows    : Running',
        '  <span class="term-success">●</span> Target Linux      : Running',
        '  <span class="term-success">●</span> Network Services  : Active',
        '',
        '<span class="term-info">[*]</span> All systems operational',
        '<span class="term-success">[+]</span> Lab environment ready for exercises',
        '',
        '<span class="term-prompt">┌──(root㉿kali)-[~]</span>',
        '<span class="term-prompt">└─#</span> <span class="term-cursor">_</span>',
    ],
};

// Map lab IDs to terminal output types
const getTerminalType = (labId: string): string => {
    if (labId.includes('metasploit') || labId.includes('exploit')) return 'metasploit';
    if (labId.includes('nmap') || labId.includes('network') || labId.includes('scan')) return 'nmap';
    if (labId.includes('burp') || labId.includes('web') || labId.includes('webapp')) return 'burp';
    if (labId.includes('kali') || labId.includes('wireless') || labId.includes('privesc')) return 'kali';
    if (labId.includes('autopsy') || labId.includes('forensic') || labId.includes('volatility') || labId.includes('chfi')) return 'forensics';
    if (labId.includes('risk') || labId.includes('cciso') || labId.includes('compliance') || labId.includes('incident')) return 'risk';
    return 'default';
};

// Terminal Simulation Component
function TerminalSimulation({ labId, labName }: { labId: string; labName: string }) {
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const terminalType = getTerminalType(labId);
    const lines = terminalOutputs[terminalType] || terminalOutputs['default'];

    useEffect(() => {
        setVisibleLines(0);
        const timer = setInterval(() => {
            setVisibleLines(prev => {
                if (prev >= lines.length) {
                    clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, 80);

        return () => clearInterval(timer);
    }, [labId, lines.length]);

    return (
        <div className="terminal-lines">
            {lines.slice(0, visibleLines).map((line, index) => (
                <div
                    key={index}
                    className="terminal-line"
                    dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }}
                />
            ))}
        </div>
    );
}


export interface LabTool {
    id: string;
    name: string;
    icon: string;
    description: string;
    skills: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    thumbnail: string;
    exercises: number;
}

export interface CertificateLabsData {
    [key: string]: {
        title: string;
        description: string;
        labs: LabTool[];
    };
}

// Comprehensive labs data mapped to certification codes/slugs
const certificateLabsMapping: CertificateLabsData = {
    // CEH - Certified Ethical Hacker
    'ceh': {
        title: 'CEH Practical Labs',
        description: 'Master ethical hacking with hands-on labs using industry-standard tools',
        labs: [
            {
                id: 'metasploit-ceh',
                name: 'Metasploit Framework',
                icon: '🎯',
                description: 'Master penetration testing with the most powerful exploitation framework. Practice exploiting vulnerabilities and managing sessions.',
                skills: ['Exploitation', 'Payload Creation', 'Post-Exploitation', 'Meterpreter'],
                difficulty: 'Advanced',
                duration: '15+ Hours',
                thumbnail: '/images/labs/metasploit-lab.png',
                exercises: 25
            },
            {
                id: 'nmap-ceh',
                name: 'Nmap Network Scanner',
                icon: '🔍',
                description: 'Learn comprehensive network reconnaissance with Nmap. Discover hosts, services, and vulnerabilities across networks.',
                skills: ['Network Scanning', 'Port Analysis', 'Service Detection', 'NSE Scripts'],
                difficulty: 'Intermediate',
                duration: '10+ Hours',
                thumbnail: '/images/labs/nmap-lab.png',
                exercises: 20
            },
            {
                id: 'burp-ceh',
                name: 'Burp Suite Professional',
                icon: '🕷️',
                description: 'Master web application security testing. Intercept HTTP traffic, find vulnerabilities, and exploit OWASP Top 10.',
                skills: ['Web Security', 'Proxy Interception', 'SQL Injection', 'XSS'],
                difficulty: 'Advanced',
                duration: '18+ Hours',
                thumbnail: '/images/labs/burpsuite-lab.png',
                exercises: 30
            },
            {
                id: 'kali-ceh',
                name: 'Kali Linux Tools',
                icon: '🐉',
                description: 'Get hands-on with 600+ security tools in Kali Linux. Learn the complete ethical hacker arsenal.',
                skills: ['Linux Mastery', 'Tool Integration', 'Scripting', 'CTF Challenges'],
                difficulty: 'Intermediate',
                duration: '20+ Hours',
                thumbnail: '/images/labs/kali-lab.png',
                exercises: 35
            }
        ]
    },
    // CND - Certified Network Defender
    'cnd': {
        title: 'Network Defense Labs',
        description: 'Build your network defense skills with practical security monitoring and incident response labs',
        labs: [
            {
                id: 'wireshark-cnd',
                name: 'Wireshark Analysis',
                icon: '📡',
                description: 'Master packet analysis and network traffic inspection with Wireshark. Detect threats and anomalies in real-time.',
                skills: ['Packet Analysis', 'Traffic Inspection', 'Protocol Analysis', 'Threat Detection'],
                difficulty: 'Intermediate',
                duration: '12+ Hours',
                thumbnail: '/images/labs/nmap-lab.png',
                exercises: 18
            },
            {
                id: 'snort-cnd',
                name: 'Snort IDS/IPS',
                icon: '🐷',
                description: 'Learn to configure and manage Snort for intrusion detection. Write custom rules and respond to alerts.',
                skills: ['IDS Configuration', 'Rule Writing', 'Alert Analysis', 'Threat Response'],
                difficulty: 'Advanced',
                duration: '14+ Hours',
                thumbnail: '/images/labs/metasploit-lab.png',
                exercises: 15
            },
            {
                id: 'firewall-cnd',
                name: 'Firewall Configuration',
                icon: '🧱',
                description: 'Configure enterprise firewalls using iptables/nftables and pfsense. Build defense-in-depth architectures.',
                skills: ['iptables', 'pfsense', 'Network Segmentation', 'Access Control'],
                difficulty: 'Intermediate',
                duration: '10+ Hours',
                thumbnail: '/images/labs/kali-lab.png',
                exercises: 12
            }
        ]
    },
    // CPENT - Certified Penetration Testing Professional
    'cpent': {
        title: 'Advanced Penetration Testing Labs',
        description: 'Master advanced penetration testing techniques with real-world attack scenarios',
        labs: [
            {
                id: 'metasploit-cpent',
                name: 'Advanced Metasploit',
                icon: '💉',
                description: 'Advanced exploitation techniques including pivoting, port forwarding, and custom module development.',
                skills: ['Pivoting', 'Port Forwarding', 'Custom Exploits', 'AV Evasion'],
                difficulty: 'Advanced',
                duration: '20+ Hours',
                thumbnail: '/images/labs/metasploit-lab.png',
                exercises: 30
            },
            {
                id: 'ad-cpent',
                name: 'Active Directory Attacks',
                icon: '🏢',
                description: 'Learn to compromise Active Directory environments. Practice Kerberoasting, Pass-the-Hash, and domain escalation.',
                skills: ['Kerberoasting', 'Pass-the-Hash', 'BloodHound', 'Domain Escalation'],
                difficulty: 'Advanced',
                duration: '18+ Hours',
                thumbnail: '/images/labs/kali-lab.png',
                exercises: 25
            },
            {
                id: 'webapp-cpent',
                name: 'Advanced Web Exploitation',
                icon: '🌐',
                description: 'Master advanced web attacks including SSRF, XXE, deserialization, and chained vulnerabilities.',
                skills: ['SSRF', 'XXE', 'Deserialization', 'Chain Exploitation'],
                difficulty: 'Advanced',
                duration: '16+ Hours',
                thumbnail: '/images/labs/burpsuite-lab.png',
                exercises: 22
            },
            {
                id: 'wireless-cpent',
                name: 'Wireless Network Attacks',
                icon: '📶',
                description: 'Crack WPA/WPA2, perform man-in-the-middle attacks, and exploit wireless network vulnerabilities.',
                skills: ['WPA Cracking', 'MITM Attacks', 'Evil Twin', 'Aircrack-ng'],
                difficulty: 'Advanced',
                duration: '12+ Hours',
                thumbnail: '/images/labs/nmap-lab.png',
                exercises: 18
            }
        ]
    },
    // CHFI - Computer Hacking Forensic Investigator
    'chfi': {
        title: 'Digital Forensics Labs',
        description: 'Investigate and analyze digital evidence with industry-standard forensic tools',
        labs: [
            {
                id: 'autopsy-chfi',
                name: 'Autopsy Forensics',
                icon: '🔬',
                description: 'Perform comprehensive digital forensic investigations with Autopsy. Analyze disk images and recover deleted files.',
                skills: ['Disk Analysis', 'File Recovery', 'Timeline Analysis', 'Evidence Collection'],
                difficulty: 'Intermediate',
                duration: '15+ Hours',
                thumbnail: '/images/labs/kali-lab.png',
                exercises: 20
            },
            {
                id: 'volatility-chfi',
                name: 'Memory Forensics',
                icon: '🧠',
                description: 'Analyze memory dumps with Volatility Framework. Extract processes, network connections, and malware artifacts.',
                skills: ['Memory Analysis', 'Process Extraction', 'Malware Detection', 'Artifact Recovery'],
                difficulty: 'Advanced',
                duration: '12+ Hours',
                thumbnail: '/images/labs/metasploit-lab.png',
                exercises: 15
            },
            {
                id: 'network-forensics-chfi',
                name: 'Network Forensics',
                icon: '🌐',
                description: 'Capture and analyze network traffic for forensic investigation. Reconstruct sessions and identify attack patterns.',
                skills: ['PCAP Analysis', 'Session Reconstruction', 'Attack Attribution', 'Evidence Chain'],
                difficulty: 'Advanced',
                duration: '10+ Hours',
                thumbnail: '/images/labs/nmap-lab.png',
                exercises: 12
            }
        ]
    },
    // CCISO - Certified Chief Information Security Officer
    'cciso': {
        title: 'Security Leadership Labs',
        description: 'Strategic security management simulations and governance exercises',
        labs: [
            {
                id: 'risk-cciso',
                name: 'Risk Assessment Simulation',
                icon: '📊',
                description: 'Conduct enterprise-level risk assessments. Evaluate threats, vulnerabilities, and business impact.',
                skills: ['Risk Analysis', 'Threat Modeling', 'Business Impact', 'Mitigation Strategy'],
                difficulty: 'Advanced',
                duration: '8+ Hours',
                thumbnail: '/images/labs/metasploit-lab.png',
                exercises: 10
            },
            {
                id: 'incident-cciso',
                name: 'Incident Response Management',
                icon: '🚨',
                description: 'Lead incident response teams through simulated security breaches. Practice crisis communication and recovery.',
                skills: ['IR Leadership', 'Crisis Management', 'Communication', 'Recovery Planning'],
                difficulty: 'Advanced',
                duration: '10+ Hours',
                thumbnail: '/images/labs/kali-lab.png',
                exercises: 8
            },
            {
                id: 'compliance-cciso',
                name: 'Compliance Framework Implementation',
                icon: '📋',
                description: 'Implement security frameworks including ISO 27001, NIST, and SOC 2 in simulated enterprise environments.',
                skills: ['ISO 27001', 'NIST CSF', 'SOC 2', 'Policy Development'],
                difficulty: 'Advanced',
                duration: '12+ Hours',
                thumbnail: '/images/labs/burpsuite-lab.png',
                exercises: 12
            }
        ]
    },
    // ECSA - EC-Council Certified Security Analyst
    'ecsa': {
        title: 'Security Analysis Labs',
        description: 'Advanced penetration testing methodology and reporting labs',
        labs: [
            {
                id: 'methodology-ecsa',
                name: 'Penetration Testing Methodology',
                icon: '📋',
                description: 'Apply structured penetration testing methodologies. Practice reconnaissance through reporting.',
                skills: ['PTEST Methodology', 'Reconnaissance', 'Exploitation', 'Reporting'],
                difficulty: 'Advanced',
                duration: '18+ Hours',
                thumbnail: '/images/labs/metasploit-lab.png',
                exercises: 25
            },
            {
                id: 'vulnerability-ecsa',
                name: 'Vulnerability Assessment',
                icon: '🔍',
                description: 'Conduct comprehensive vulnerability assessments using multiple scanning tools and techniques.',
                skills: ['Vuln Scanning', 'Nessus', 'OpenVAS', 'Risk Rating'],
                difficulty: 'Intermediate',
                duration: '12+ Hours',
                thumbnail: '/images/labs/nmap-lab.png',
                exercises: 18
            }
        ]
    },
    // CompTIA A+ equivalent
    'comptia-a-plus': {
        title: 'IT Fundamentals Labs',
        description: 'Hands-on labs for hardware, software, and network fundamentals',
        labs: [
            {
                id: 'hardware-comptia',
                name: 'Hardware Configuration',
                icon: '🖥️',
                description: 'Assemble, configure, and troubleshoot PC hardware components in virtual environments.',
                skills: ['PC Assembly', 'BIOS/UEFI', 'Troubleshooting', 'Upgrades'],
                difficulty: 'Beginner',
                duration: '10+ Hours',
                thumbnail: '/images/labs/kali-lab.png',
                exercises: 20
            },
            {
                id: 'os-comptia',
                name: 'Operating System Labs',
                icon: '💿',
                description: 'Install, configure, and manage Windows and Linux operating systems.',
                skills: ['Windows Admin', 'Linux Basics', 'File Systems', 'User Management'],
                difficulty: 'Beginner',
                duration: '12+ Hours',
                thumbnail: '/images/labs/metasploit-lab.png',
                exercises: 25
            },
            {
                id: 'network-comptia',
                name: 'Network Configuration',
                icon: '🌐',
                description: 'Configure network settings, troubleshoot connectivity issues, and set up small office networks.',
                skills: ['TCP/IP', 'DHCP/DNS', 'WiFi Configuration', 'Network Troubleshooting'],
                difficulty: 'Beginner',
                duration: '8+ Hours',
                thumbnail: '/images/labs/nmap-lab.png',
                exercises: 15
            }
        ]
    },
    // OSCP equivalent labs
    'oscp': {
        title: 'Offensive Security Labs',
        description: 'Real-world penetration testing labs modeled after OSCP challenges',
        labs: [
            {
                id: 'buffer-oscp',
                name: 'Buffer Overflow Exploitation',
                icon: '💉',
                description: 'Master stack-based buffer overflow attacks. Develop custom exploits from fuzzing to shell code.',
                skills: ['Fuzzing', 'Stack Smashing', 'Shellcode', 'Exploit Development'],
                difficulty: 'Advanced',
                duration: '20+ Hours',
                thumbnail: '/images/labs/metasploit-lab.png',
                exercises: 15
            },
            {
                id: 'privesc-oscp',
                name: 'Privilege Escalation',
                icon: '⬆️',
                description: 'Master Linux and Windows privilege escalation techniques. From initial foothold to root/SYSTEM.',
                skills: ['Linux PrivEsc', 'Windows PrivEsc', 'SUID/Sudo', 'Token Impersonation'],
                difficulty: 'Advanced',
                duration: '18+ Hours',
                thumbnail: '/images/labs/kali-lab.png',
                exercises: 30
            },
            {
                id: 'ctf-oscp',
                name: 'CTF Challenge Labs',
                icon: '🏴',
                description: 'Practice with real CTF-style challenges. Boot-to-root machines with increasing difficulty.',
                skills: ['Enumeration', 'Exploitation', 'Pivoting', 'Flag Capture'],
                difficulty: 'Advanced',
                duration: '30+ Hours',
                thumbnail: '/images/labs/burpsuite-lab.png',
                exercises: 25
            }
        ]
    },
    // Default labs for certifications without specific mapping
    'default': {
        title: 'Cybersecurity Practice Labs',
        description: 'Hands-on labs to reinforce your learning with real-world tools',
        labs: [
            {
                id: 'kali-default',
                name: 'Kali Linux Fundamentals',
                icon: '🐉',
                description: 'Get hands-on experience with the most popular penetration testing distribution.',
                skills: ['Linux Basics', 'Security Tools', 'Command Line', 'Scripting'],
                difficulty: 'Intermediate',
                duration: '12+ Hours',
                thumbnail: '/images/labs/kali-lab.png',
                exercises: 20
            },
            {
                id: 'nmap-default',
                name: 'Network Scanning',
                icon: '🔍',
                description: 'Learn network reconnaissance and discovery techniques with Nmap.',
                skills: ['Network Scanning', 'Port Analysis', 'Service Detection'],
                difficulty: 'Intermediate',
                duration: '8+ Hours',
                thumbnail: '/images/labs/nmap-lab.png',
                exercises: 15
            }
        ]
    }
};

// Helper function to match certificate slug to labs
const getLabsForCertificate = (slug: string): { title: string; description: string; labs: LabTool[] } => {
    // Try exact match first
    if (certificateLabsMapping[slug]) {
        return certificateLabsMapping[slug];
    }

    // Try partial matches
    const slugLower = slug.toLowerCase();
    for (const key of Object.keys(certificateLabsMapping)) {
        if (slugLower.includes(key) || key.includes(slugLower)) {
            return certificateLabsMapping[key];
        }
    }

    // Check for common patterns
    if (slugLower.includes('ceh') || slugLower.includes('ethical-hacker')) {
        return certificateLabsMapping['ceh'];
    }
    if (slugLower.includes('cpent') || slugLower.includes('penetration')) {
        return certificateLabsMapping['cpent'];
    }
    if (slugLower.includes('cnd') || slugLower.includes('network-defender')) {
        return certificateLabsMapping['cnd'];
    }
    if (slugLower.includes('chfi') || slugLower.includes('forensic')) {
        return certificateLabsMapping['chfi'];
    }
    if (slugLower.includes('cciso') || slugLower.includes('ciso')) {
        return certificateLabsMapping['cciso'];
    }

    return certificateLabsMapping['default'];
};

interface CertificateLabsProps {
    certificateSlug: string;
    certificateTitle?: string;
}

export function CertificateLabs({ certificateSlug, certificateTitle }: CertificateLabsProps) {
    const labsData = useMemo(() => getLabsForCertificate(certificateSlug), [certificateSlug]);
    const [activeLab, setActiveLab] = useState<LabTool>(labsData.labs[0]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleLabChange = (lab: LabTool, index: number) => {
        setActiveLab(lab);
        setActiveIndex(index);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner': return 'lab-difficulty-beginner';
            case 'Intermediate': return 'lab-difficulty-intermediate';
            case 'Advanced': return 'lab-difficulty-advanced';
            default: return '';
        }
    };

    const totalExercises = labsData.labs.reduce((sum, lab) => sum + lab.exercises, 0);
    const totalHours = labsData.labs.reduce((sum, lab) => {
        const match = lab.duration.match(/(\d+)/);
        return sum + (match ? parseInt(match[1]) : 0);
    }, 0);

    return (
        <section className="certificate-labs-section" id="labs">
            {/* Subtle Background */}
            <div className="cert-labs-bg-pattern"></div>

            <div className="container">
                {/* Section Header */}
                <div className="cert-labs-header">
                    <div className="cert-labs-badge">
                        <Terminal size={16} />
                        <span>HANDS-ON TRAINING</span>
                    </div>
                    <h2 className="cert-labs-title">
                        {labsData.title}
                    </h2>
                    <p className="cert-labs-subtitle">
                        {labsData.description}
                    </p>
                </div>
                {/* Main Content Grid */}
                <div className="cert-labs-content">
                    {/* Left Column - Labs Selection + Lab Info */}
                    <div className="cert-labs-left-column">
                        {/* Labs Selection Cards - No Icons */}
                        <div className="cert-labs-selector">
                            {labsData.labs.map((lab, index) => (
                                <button
                                    key={lab.id}
                                    className={`cert-lab-card ${index === activeIndex ? 'active' : ''}`}
                                    onClick={() => handleLabChange(lab, index)}
                                >
                                    <div className="lab-card-info">
                                        <h4>{lab.name}</h4>
                                        <div className="lab-card-meta">
                                            <span className={`lab-difficulty ${getDifficultyColor(lab.difficulty)}`}>
                                                {lab.difficulty}
                                            </span>
                                            <span className="lab-exercises">{lab.exercises} Exercises</span>
                                        </div>
                                    </div>
                                    {index === activeIndex && <div className="active-bar"></div>}
                                </button>
                            ))}
                        </div>

                        {/* Lab Info - Below Cards */}
                        <div className="lab-info-compact">
                            <h3 className="lab-info-title">{activeLab.name}</h3>
                            <p className="lab-info-description">{activeLab.description}</p>

                            {/* Skills */}
                            <div className="lab-skills">
                                <h5>Skills You'll Master:</h5>
                                <div className="skills-grid">
                                    {activeLab.skills.map((skill, index) => (
                                        <span key={index} className="skill-chip">
                                            <Shield size={12} />
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Terminal */}
                    <div className="cert-lab-details">
                        {/* Kali Linux Terminal Frame */}
                        <div className="kali-terminal-frame">
                            {/* Terminal Title Bar */}
                            <div className="terminal-title-bar">
                                <div className="terminal-buttons">
                                    <span className="terminal-btn close"></span>
                                    <span className="terminal-btn minimize"></span>
                                    <span className="terminal-btn maximize"></span>
                                </div>
                                <div className="terminal-title">
                                    <Terminal size={14} />
                                    <span>root@kali:~/{activeLab.name.toLowerCase().replace(/\s+/g, '-')}</span>
                                </div>
                                <div className="terminal-actions">
                                    <span className="terminal-action-btn">−</span>
                                    <span className="terminal-action-btn">□</span>
                                    <span className="terminal-action-btn">×</span>
                                </div>
                            </div>

                            {/* Terminal Menu Bar */}
                            <div className="terminal-menu-bar">
                                <span className="menu-item">File</span>
                                <span className="menu-item">Edit</span>
                                <span className="menu-item">View</span>
                                <span className="menu-item">Search</span>
                                <span className="menu-item">Terminal</span>
                                <span className="menu-item">Help</span>
                            </div>

                            {/* Interactive Terminal Content */}
                            <div className="terminal-content terminal-interactive">
                                <div className="terminal-output">
                                    {/* Dynamic content based on lab type */}
                                    <TerminalSimulation labId={activeLab.id} labName={activeLab.name} />
                                </div>

                                {/* Live indicator */}
                                <div className="terminal-live-badge">
                                    <span className="live-dot"></span>
                                    LIVE DEMO
                                </div>
                            </div>

                            {/* Terminal Status Bar */}
                            <div className="terminal-status-bar">
                                <div className="status-left">
                                    <span className="status-item">🐉 Kali Linux</span>
                                    <span className="status-item">|</span>
                                    <span className="status-item">{activeLab.name}</span>
                                </div>
                                <div className="status-right">
                                    <span className="status-item ready">● Ready</span>
                                    <span className="status-item">|</span>
                                    <span className="status-item">UTF-8</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="cert-labs-stats">
                    <div className="labs-stat">
                        <span className="stat-value">{labsData.labs.length}</span>
                        <span className="stat-text">Lab Tools</span>
                    </div>
                    <div className="labs-stat-divider"></div>
                    <div className="labs-stat">
                        <span className="stat-value">{totalExercises}+</span>
                        <span className="stat-text">Exercises</span>
                    </div>
                    <div className="labs-stat-divider"></div>
                    <div className="labs-stat">
                        <span className="stat-value">{totalHours}+</span>
                        <span className="stat-text">Hours of Practice</span>
                    </div>
                    <div className="labs-stat-divider"></div>
                    <div className="labs-stat">
                        <span className="stat-value">24/7</span>
                        <span className="stat-text">Lab Access</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CertificateLabs;
