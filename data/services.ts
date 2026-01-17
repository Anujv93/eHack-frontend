// Corporate Security Services Data

export interface ServiceItem {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    whatWeOffer: string[];
    whatWeCover: string[];
    whyThisService: string;
    whyChooseUs: string;
    icon: string; // Kept for legacy/compat, even if not shown
    image: string; // New image property
    category: 'security-assessment' | 'compliance' | 'forensics';
}

export const services: ServiceItem[] = [
    {
        id: 'web-application-security',
        title: 'Web Application and Services Security Assessment',
        shortDescription: 'Comprehensive security evaluation combining industry-standard practices with specialized tools for websites, web services, and applications.',
        fullDescription: `Web application security evaluation combines industry-standard information security practices with tools explicitly designed to test websites, web-based services, and web applications. Web application security assessments can be carried out manually or automatically and carried out throughout the software development lifecycle (SDLC). It will typically include security measures, security audits, periodic inspections, secure coding practices, secure firewalls, vulnerability scanning, and the implementation of protocols that ensure safe operation.`,
        whatWeOffer: [
            'Web Application Security Assessment',
            'API & Web Services Security Assessment',
            'Web Application Secure Source Code Review'
        ],
        whatWeCover: [
            'Injections',
            'Broken Authentication',
            'Sensitive Data Exposure',
            'XML External Entities (XXE)',
            'Broken Access Control',
            'Security Misconfiguration',
            'Cross-Site Scripting (XSS)',
            'Insecure Deserialization',
            'Business Logic Vulnerability'
        ],
        whyThisService: `The primary advantage of performing a web application penetration test is that a highly qualified security specialist can attack your web application in a controlled, organized environment to detect vulnerabilities before a malicious attacker does. Attackers pose a significant threat to businesses that deploy web applications and their users; by gaining the insight provided by a penetration test, businesses may appropriately evaluate the risk to their assets and respond appropriately.

Additionally, a web application penetration test offers the following benefits:
• Assuring stakeholders/customers of a degree of assurance from a reputable security provider.
• Adhering to industry-wide compliance requirements or data security rules.
• Evaluate the efficacy of existing security strategies.
• Enhancements to the business's credibility and trust among application users.`,
        whyChooseUs: `Our Company is committed to providing businesses worldwide with cutting-edge cybersecurity solutions, and we are experts in our field. We leverage the experience of a diverse team to provide services for a variety of technologies and complex web applications, resulting in the highest possible level of assurance.`,
        icon: '🌐',
        image: '/images/services/security.png',
        category: 'security-assessment'
    },
    {
        id: 'mobile-application-security',
        title: 'Mobile Application Security Assessment',
        shortDescription: 'Evaluate mobile application security against a large pool of threat vectors to identify vulnerabilities and ensure secure operation.',
        fullDescription: `Over the last few years, mobile technology has accelerated its growth and seen a massive increase in its user base. Mobile applications store and process a wide variety of sensitive data, from credit card information to intellectual property to medical records. Malicious attackers easily target this sensitive information. According to research, there are nearly 20 million active vulnerabilities on mobile devices!

Due to the blurring of the lines between secure and exposed data. Mobile Application Security Testing evaluates an application's security and a large pool of mobile application threat vectors to identify inherent vulnerabilities and ensure the application's secure state while in use.`,
        whatWeOffer: [
            'Mobile Application Security Assessment',
            'API & Web Services Security Assessment',
            'Mobile Application Secure Source Code Review'
        ],
        whatWeCover: [
            'Improper Platform Usage',
            'Insecure Data Storage',
            'Insecure Communication',
            'Insecure Authentication',
            'Insufficient Cryptography',
            'Insecure Authorization',
            'Client Code Quality',
            'Code Tampering',
            'Reverse Engineering',
            'Extraneous Functionality',
            'Business Logic Vulnerability'
        ],
        whyThisService: `During a Mobile App Security Assessment, mobile app security experts use a rigorous methodology to determine the overall security posture of a given application. These experts model the threat posed by a range of threat actors with varying levels of sophistication. They'll be able to determine how resistant your mobile app is to these various threats. When security flaws are discovered, you'll be informed of the implications and, more importantly, how to resolve the issue. An in-depth mobile application security assessment will notify you of any identified positive security controls, allowing you to continue doing what you're doing with the confidence that you're doing things correctly.

Several groups benefit from a mobile application security assessment:
• Developers gain confidence in the safety and security of their products for their customers.
• Businesses gain confidence in the security of integrating a mobile application into their operations.
• Users feel safer knowing that the app has passed a mobile security test, giving them the confidence to use it.

Simply put, an excellent mobile app security assessment will tell you what a mobile app is doing correctly and incorrectly in terms of cybersecurity.`,
        whyChooseUs: `At Our Company, we employ advanced methodologies that have been tailored to specific applications. We have a sophisticated approach to detecting bugs, ensuring that no bug goes unnoticed, and expert guidance can help mitigate issues without interfering with existing systems. Our expert team of penetration testers works quickly to identify flaws in source code, binary files, applications, back-end integrations, and platform workflow. Keeping all of this in mind, we also make certain to develop a customized scope and approach as the variety of applications changes rapidly. Finally, our support and reporting abilities can assist developers in developing secure systems in the long run.`,
        icon: '📱',
        image: '/images/mobileapp_service_image.png',
        category: 'security-assessment'
    },
    {
        id: 'api-security',
        title: 'API Security Assessment',
        shortDescription: 'Comprehensive API security assessment ensuring all organizational concerns are addressed with priority-based remediation.',
        fullDescription: `Increased API services with web applications and mobiles make them vulnerable to various attack vectors. Integration of these APIs into your system can make the system prone to known vulnerabilities or unknown vulnerabilities if the functionality and the endpoints are not secured. API loophole detection can take time, and by the time it is known, the next challenge lies in patches and remediation. At Our Company, a comprehensive API security assessment ensures that all the organization's primary concerns are addressed and remediations are deployed on a priority basis. Our analysis program implies identifying high-risk vulnerabilities in the lowest possible time and acting quickly on them to prevent any underlying threat through our highly preferred manual and automated ways of API security assessment.`,
        whatWeOffer: [
            'API Discovery',
            'API Design Review',
            'API Secure code review',
            'API Penetration testing'
        ],
        whatWeCover: [
            'OWASP top 10 API Security',
            'API1:2019 Broken Object Level Authorization',
            'API2:2019 Broken User Authentication',
            'API3:2019 Excessive Data Exposure',
            'API4:2019 Lack of Resources & Rate Limiting',
            'API5:2019 Broken Function Level Authorization',
            'API6:2019 Mass Assignment',
            'API7:2019 Security Misconfiguration',
            'API8:2019 Injection',
            'API9:2019 Improper Assets Management',
            'API10:2019 Insufficient Logging & Monitoring'
        ],
        whyThisService: `API security assessment has many advantages, which in the long run prove helpful for business. It helps identify issues in the areas of development, configuration as well as business logic. It also helps to strengthen authentication and access control. API Assessment is also fair high when it comes to gaining technical insight and real-world compliance while discovering the vulnerabilities which can cause the application to be compromised.`,
        whyChooseUs: `Our Company is one of the pioneers in API Security Assessments since we take pride in providing secured API infrastructure. From the staging and development of the API process to the black box testing without any knowledge of the functioning, every aspect is considered, and custom-made tests and approaches are provided. Our coverage follows the standard methodologies to detect common vulnerabilities and provide unique business logic flaws in a more petite time frame.

Our team consists of skilled and experienced professionals, and each risk is taken seriously, devoid of any false assumptions. We constantly research and implement new and unknown bugs to widen our testing strategies. Our support has always been beyond technical assistance, and our client referrals are more than satisfactory with excellent reviews.`,
        icon: '🔌',
        image: '/images/API_service_image.png',
        category: 'security-assessment'
    },
    {
        id: 'secure-source-code-review',
        title: 'Secure Source Code Review',
        shortDescription: 'Thorough code analysis identifying vulnerable code lines and corrupted variables that introduce vulnerabilities.',
        fullDescription: `Secure Source Code reviews are an effective way to identify difficult or impossible bugs during black-box or grey-box testing. Our security architects and specialist developers conduct a thorough code analysis using a detailed checklist of common implementation and architecture errors. The source code review identifies the vulnerable assertion line of code and the corrupted variable that introduces the vulnerability. This demonstrates how an event spreads from its source to its conclusion. This provides application developers with a comprehensive view of each vulnerability, allowing them to assess the severity of the issue quickly.`,
        whatWeOffer: [
            'Manual Secure Source Code Review',
            'Automation Secure Source Code Review',
            'Software Composition Analysis Testing'
        ],
        whatWeCover: [
            'Compliant with industry security standards, including CWE, OWASP, PCI, CERT & SANS',
            'Technology coverage of 30+ and growing',
            'JAVA',
            'SWIFT',
            'Objective C',
            'FLUTTER',
            'KOTLIN',
            'DART',
            'PHP',
            'JavaScript',
            'ASP.NET',
            'C#',
            'C++',
            'Ruby',
            'GO'
        ],
        whyThisService: `When additional assurance is necessary, a secure source code review is recommended. Our Company can identify vulnerabilities in applications that would be extremely difficult to discover without source code access. Along with specific vulnerabilities, a secure source code review typically identifies deficient coding practices that leave the code vulnerable to future vulnerabilities.

If any of the following apply, you should consider conducting a source code review:
• Applications with a high degree of significance and ramifications
• Reliance on open-source software or libraries
• Appropriate acquisitions or contracting out
• Additional levels of assurance are required
• Conducted one or more dynamic penetration tests in the past`,
        whyChooseUs: `Our Company will assign one or more consultants with relevant programming experience to each engagement. Each security consultant has a great deal of experience with application security.

It is necessary to have a thorough understanding of the intended application. The lead security consultant will spend time with an appropriate developer to understand the software before beginning the actual source code review testing process. This will entail a group discussion on relevant topics such as design, documentation, and so on.

It is critical to achieving both breadth and depth of coverage unless Our Company has a specific focus. A hybrid approach combining dynamic tooling and manual review is used to accomplish this. Furthermore, having concurrent access to a running version of the target system while conducting the code review can maximize context and verify findings in real-time.`,
        icon: '💻',
        image: '/images/Source Code Review.png',
        category: 'security-assessment'
    },
    {
        id: 'red-team-assessment',
        title: 'Red Team Assessment',
        shortDescription: 'Simulated real-world intrusion assault against an enterprise without affecting normal operations.',
        fullDescription: `A Red Team Assessment is a simulated real-world intrusion assault against an enterprise that does not affect its normal operations. For a limited time span, attacks will be launched from various entry points to satisfy the organization's testing tasks and specifications.`,
        whatWeOffer: [
            'Red Teaming'
        ],
        whatWeCover: [
            'Network Attacks',
            'Wireless Attacks',
            'Advanced Penetration Testing',
            'Physical Security Testing',
            'Social Engineering Attacks',
            'Threat Intelligence',
            'Social Media Correlation',
            'Comprehensive Open-Source Intelligence (OSINT)',
            'Media Drops',
            'Targeted malware-based attacks'
        ],
        whyThisService: `Have you ever wondered, "How did I get hacked when I already purchased security equipment?" "Our bank performs penetration tests consistently. Why is it that our data is still being stolen or leaked in an unauthorized manner?" Organizations frequently struggle with self-defense because of information asymmetry between attackers and defenders. The presumed battlefield is frequently not the focus but rather boundary areas that were previously deemed completely unimportant. Is it enough to purchase traditional security services? A more thorough Red Team Assessment is required.`,
        whyChooseUs: `Our Company specializes in and is passionate about conducting large-scale attacks. Our team members are innovative problem solvers who possess a range of skills, including programming, network testing, wireless security, security code review, web application penetration testing, reverse engineering, and exploit research.

The Red Teaming concept begins with the challenge of comprehending the adversary's motivations and actions. We can anticipate an attacker's moves and develop effective countermeasures if we understand how he thinks. Red Team Exercises shed light on an organization's simulation of a real-world threat. This is accomplished by combining and chaining multiple domain-specific attacks. Our objective is to identify all possible entry points for an attacker to an organization's critical business assets and, on the other hand, to determine whether the organization can respond autonomously in the event of an attack.`,
        icon: '🎯',
        image: '/images/Red Team Assessment.png',
        category: 'security-assessment'
    },
    {
        id: 'infrastructure-security',
        title: 'Infrastructure Security Assessment',
        shortDescription: 'Comprehensive assessment of network components, configurations, and security equipment.',
        fullDescription: `The IT facilities of a company are pillared over the network components they use. To help the company, this consists of a variety of network and security equipment.

It's just as important to plan where each unit will go to configure it safely. The bugs are exploited as much for their design flaws as they are for their misconfiguration.

Daily enforcement, configuration, and security reviews of the network assist the company in maintaining a current view of the network and IT infrastructure.

Modern-day attacks are also looking for non-traditional entry points, such as wireless and VoIP infrastructure. Securing these aspects is just as crucial as securing a company's application.`,
        whatWeOffer: [
            'Network Security Assessment',
            'Router Security Assessment',
            'Firewall Security Assessment',
            'Cloud Security Assessment',
            'Host Level Security Assessment',
            'Container Security',
            'Comprehensive Active Directory assessment',
            'Attack simulation',
            'Ransomware simulation'
        ],
        whatWeCover: [
            'Asset criticality profiling for Impact Assessment',
            'Attack surface mapping',
            'Endpoint services and zero-day vulnerabilities',
            'Network sniffing, foot-printing and probing',
            'IAM, Active Directory, and LDAP Implementation flaws',
            'NAC bypass, DNS Enumeration issues',
            'Web Server Misconfiguration Exposure',
            'Authentication & Authorization Testing',
            'Database Script Injection Vulnerabilities',
            'Database Security Testing',
            'Evasion against IDS, honeypots, and Firewall Evasion Vectors'
        ],
        whyThisService: `The infrastructure security assessment is one of the most important factors of cybersecurity strategy. The assessment is the key to insight into the security framework of the network your organization has employed. It also ensures that any external and internal threats are detected in time, and the network is shielded against cyber-attacks as well as a timely remedy for the same.`,
        whyChooseUs: `Our Company has been helping various organizations past few years in mitigating the risks and flaws within their infrastructure. We deal with a wide range of policies, procedures, systems, and networks that are assessed individually and with a focused approach. We often indulge in comprehensive research that can help us to implement new security technologies and unknown threats in our assessments. Our combined approach with automation and manual approach enhances the range of threat identification, and the expert consultation on the mitigation technique help to make significant security improvements without compromising the existing procedures.`,
        icon: '🏗️',
        image: '/images/services/general.png',
        category: 'security-assessment'
    },
    {
        id: 'thick-client-security',
        title: 'Thick Client Security Assessment',
        shortDescription: 'Specialized security testing for thick client applications with potential memory corruption, injection, and cryptographic flaws.',
        fullDescription: `Many thick client applications are not thoroughly examined because security testing efforts are frequently focused on web and mobile applications. However, these applications could have serious security flaws like memory corruption, injection, cryptographic flaws, and client-side trust issues. These flaws can lead to complete system compromise and unauthorized access to server-side data on systems where the thick client software is installed.

Thick client applications process data on both the client and server sides and use proprietary protocols to communicate. They may also contain several client-side components that operate at different levels of trust. Using simple, automated methods to scan for vulnerabilities isn't enough. As a result, each of our thick client tests is tailored specifically for the application.`,
        whatWeOffer: [
            'Thick Client Application Penetration Testing',
            'API & Web Services Security Assessment',
            'Secure Source Code Review'
        ],
        whatWeCover: [
            'Injections',
            'Business Logic Vulnerability',
            'Analysing Config files',
            'Reverse Engineering',
            'Test encryption used in the application',
            'Identifying DLL Hijacking Vulnerability',
            'Test for sensitive data in memory',
            'Dependency mapping',
            'Broken Authentication',
            'Sensitive Data Exposure',
            'Broken Access Control',
            'Security Misconfiguration',
            'Insecure Deserialization'
        ],
        whyThisService: `Thick Client Application Security Testing necessitates highly skilled manual penetration testers and a methodical approach. These applications are critical for internal operations and frequently contain and process sensitive data. We can help you identify vulnerabilities in thick client applications that expose your organization to external or internal threats.`,
        whyChooseUs: `Since your thick client applications can involve intellectual property belonging to your company, you want to ensure that they are immune to reverse engineering and alteration. Without professional analysis of binary hardening mechanisms, you would be unaware of the ease with which an attacker can reverse engineer or change your client-side code. We provide the highest-quality cybersecurity services and have extensive experience analyzing obfuscated and hardened software, as well as breaching security controls such as white-box cryptography.`,
        icon: '🖥️',
        image: '/images/Thick Client Security.png',
        category: 'security-assessment'
    },
    {
        id: 'firewall-security',
        title: 'Firewall Security Assessment',
        shortDescription: 'Ensure firewall configuration and rules meet business and compliance needs.',
        fullDescription: `Our security test ensures that the firewall configuration and rules meet the company's business and compliance needs.

Every business, regardless of size, uses firewall technology to establish limits of trust and security and access the internet for inter-business communication.

Next-generation firewalls provide increasing complexity, and functionality requires you to manage firewalls appropriately.

The list of regulations will be thoroughly investigated following the operational assessment and based on the level of trust needed from the security apparatus.

A weak/outdated firewall may have made the target systems vulnerable to information disclosure, exploiting the compromise.`,
        whatWeOffer: [
            'Firewall Security Audit'
        ],
        whatWeCover: [
            'Software version and patch level',
            'The location of the firewall within the network',
            'Excessively permissive rules',
            'Laws that intersect',
            'Before the deny-all rules, permissive rules must be followed',
            'Abandoned objects',
            'Auditing is insufficient',
            'Encrypted passwords and account passwords are both insecure',
            'Insecure services',
            'Omissions from the rules',
            'Keeping the clocks in sync',
            'User accounts with an excessive number of privileges or an insufficient number of privileges',
            'The security of VPN configurations and the configuration of other modules',
            'Typical Denial-of-Service Attacks are mitigated'
        ],
        whyThisService: `For most organizations that do not use a multi-layer of security, a firewall device acts as the gatekeeper to the network and is often the first and last line of defense.

The Firewall is a device that sits between the inside and outside of your network and regulates who can enter and exit it.

A firewall that is incorrectly configured or has a software vulnerability due to a lack of patching can significantly impact your organization's security posture and allow a complete hacker access to the network.`,
        whyChooseUs: `Our company firewall audit identifies weak protocols, insecure rules, and additional data leakages that could jeopardize the firewall's infrastructure. Our team of cybersecurity experts has experience building firewalls from the ground up as well as implementing technology from a variety of leading firewall vendors. This allows us to see everything from both the attacker's and the defender's points of view. It enables us to conduct some of the most difficult and thorough assessments in our industry.`,
        icon: '🛡️',
        image: '/images/Firewall Security Assessment.png',
        category: 'security-assessment'
    },
    {
        id: 'digital-forensics',
        title: 'Digital Forensics & Incident Response',
        shortDescription: 'Comprehensive forensic investigation and incident response services for cyber breaches.',
        fullDescription: `Today, we live in a turbulent business environment where criminals are growing toward a virulent edge, as fraud risks are on the level of a crisis, and stakeholder expectations are far away.

As a result, the various fraud strategies and bribery, misconducts, cybercrimes, kick-give to various fraud schemes, and all these activities are impacting every business's branding value. It's not an overstatement to state that recognizing and reducing the risks involved is essential.

Forensic investigation and Consulting Services (FICS) help you address these inevitable irreparable problems for organizations. We offer a wide range of Logistics and Forensic Services and acknowledge the importance of self-reliance in dealing with different areas of concern and unpleasant industries. We can adapt according to the needs of our clients, and the dynamism, determination, and sensitivity we display regardless of the situation remain constant.`,
        whatWeOffer: [
            'Financial Statement Fraud Investigation',
            'Insider Trading Investigation',
            'Money Laundering Investigation',
            'Occupational Fraud Investigation',
            'Asset Misappropriation Ascertain – Money Trial, Diversion of Fund, end use of funds, etc.',
            'Collection of digital evidence from the crime scene',
            'Data Recovery from Laptop, Desktop, Portable Hard drive/Pen drive, memory card, etc.',
            'Password Recovery',
            'Email Analysis',
            'Internet Artifacts Analysis',
            'Image Analysis',
            'Live System Analysis for Vulnerability',
            'Volatility Analysis'
        ],
        whatWeCover: [
            'Any Cyber Fraud or Corruption',
            'Financial Statement Fraud',
            'Asset Embezzlement',
            'Corporate Frauds',
            'Data Leakage'
        ],
        whyThisService: `Steps for Forensic Audits:
• Planning
• Evidence Collection
• Report Creation
• Court Appearance (If required)`,
        whyChooseUs: `Our Company is committed to providing businesses worldwide with cutting-edge digital forensic solutions, and we are experts in our field. We are leveraging the experience of a diverse team to provide services for a variety of technologies and complex Cyber Frauds, resulting in the highest possible level of assurance.`,
        icon: '🔍',
        image: '/images/services/forensics.png',
        category: 'forensics'
    },
    {
        id: 'malware-analysis',
        title: 'Malware Analysis and Root Cause Detection',
        shortDescription: 'Understanding malware behavior and purpose to aid in detection and mitigation of potential threats.',
        fullDescription: `Incident Response and Malware Analysis will assist you to gauge the influence of cyber breaches. An investigation is necessary, and a containment and recovery technique needs to be carried out by experts.

Any corporation that is uncovered to an incident, faces a dent in their brand popularity and additionally any selfish liability.

Malware analysis is the process of understanding the behavior and purpose of a suspicious file or URL. The output of the analysis aids in the detection and mitigation of the potential threat.

The key benefit of malware analysis is that it helps incident responders and security analysts:
• Pragmatically triage incidents by the level of severity
• Uncover hidden indicators of compromise (IOCs) that should be blocked
• Improve the efficacy of IOC alerts and notifications
• Enrich context when threat hunting`,
        whatWeOffer: [
            'Address business vulnerability and assign roles and responsibility',
            'Identify relevant business departments and get them involved',
            'Identify Key Performance Indicators (KPIs) to measure the event',
            'Testing of the plan',
            'Review the plan constantly',
            'Determine incident',
            'Team formation and lead by IR analyst',
            'Right tools implementation',
            'Establishment of communication strategy'
        ],
        whatWeCover: [
            'Malware Behavior Analysis',
            'Static Analysis',
            'Dynamic Analysis',
            'Root Cause Detection',
            'Incident Response Planning'
        ],
        whyThisService: `When a cyber-attack happens in your organization, an expert dealing with it is the need of the hour. Precious time takes the side bench when you rely on in-house techniques to recover from the incident. A professional is required to handle and mitigate the problem without causing further harm to your organization's data.`,
        whyChooseUs: `Our Company is committed to providing businesses worldwide with cutting-edge digital forensic solutions, and we are experts in our field. We are leveraging the experience of a diverse team to provide services for a variety of technologies and complex Cyber Frauds, resulting in the highest possible level of assurance.`,
        icon: '🦠',
        image: '/images/Malware Analysis and Root Cause Detection.png',
        category: 'forensics'
    },
    {
        id: 'gdpr-consulting',
        title: 'GDPR Consulting and Audit',
        shortDescription: 'Comprehensive GDPR compliance consulting to protect EU citizens\' data privacy rights.',
        fullDescription: `The General Data Protection Regulation (GDPR) is a regulatory standard designed to protect citizens' data privacy rights in the European Union. It creates a legal framework for businesses that collect and process EU citizens' data. Organizations must ensure that personal data is collected legally and protected from misuse and exploitation to comply with GDPR. It also requires businesses that collect, process, and transmit personal data to respect the rights of data owners or face sanctions if they do not. Organizations will face significant penalties of up to 4% of annual revenue or 20 million euros, whichever is greater if they do not comply.`,
        whatWeOffer: [
            'GDPR Gap Analysis',
            'GDPR Risk Assessment',
            'Security Awareness Training Program',
            'Documentation of GDPR Rules & Regulations',
            'GDPR Continuation Support'
        ],
        whatWeCover: [
            'GDPR compliance Regulation'
        ],
        whyThisService: `While complying with GDPR can be overwhelming for many businesses, being proactive in your compliance efforts can be extremely beneficial to your business. You can earn the trust of digital consumers who are wary of unsolicited follow-up, sales pitches, and spam. GDPR Compliance can compel your business to prioritize the user experience and demonstrate a commitment to user preferences. Additionally, you can expand your reach by enabling you to market to new data subjects. Perhaps most importantly, achieving compliance now can significantly reduce the likelihood of your organization facing regulatory investigations and fines in the future.`,
        whyChooseUs: `Our Company has experience designing and implementing privacy systems that comply with GDPR. We understand that the best way to implement GDPR is to align technology with governance, risk, and compliance (GRC). Companies can use our ADAPT approach to help them meet GDPR compliance deadlines. Our team will assist you in continuing your GDPR journey without having to start over, regardless of your current GDPR enforcement status or efforts.`,
        icon: '🇪🇺',
        image: '/images/services/compliance.png',
        category: 'compliance'
    },
    {
        id: 'pci-dss-compliance',
        title: 'PCI DSS Compliance Audit',
        shortDescription: 'Internationally recognized data security standard audit for businesses processing credit card information.',
        fullDescription: `PCI DSS is an internationally recognized data security standard that applies to businesses that process credit card information. The Payment Card Industry Security Standards Council (PCI SSC) is responsible for overseeing the Standard, which is intended to safeguard credit card and debit card transactions against theft and fraud. On the other hand, while the set Standard is not a legal requirement, it is necessary to safeguard cardholder data and debit/credit card transactions. As a result, all businesses that accept and process debit and credit card payments must conduct a PCI DSS audit on an annual basis. Typically, an audit of security controls and processes would be included, such as data retention, encryption, physical security, authentication, and access management.`,
        whatWeOffer: [
            'PCI DSS Gap Analysis',
            'PCI DSS Risk Assessment',
            'PCI DSS Penetration Testing',
            'PCI DSS ASV Scanning',
            'Security Awareness Training Program',
            'PCI Certification'
        ],
        whatWeCover: [
            'PCI-DSS controls',
            'QSA-led audits',
            'Support of SAQs',
            'Pre-audit readiness assessment'
        ],
        whyThisService: `If you are a merchant or service provider that stores, handles, or transmits cardholder data, PCI enforcement is essential to your organization's operational security. A non-compliant company can face significant fines and penalties, as well as the loss of the right to accept card payments, loss of revenue, diminished consumer trust, and legal costs. PCI enforcement demonstrates your commitment to security and reassures clients about the security of their cardholder data.`,
        whyChooseUs: `PCI DSS is a comprehensive and granular requirement that applies to all entities that store, process, or distribute payment card data, as well as organizations that may affect the protection of a credit card processing environment. Our Qualified Security Assessor (QSA) will guide you through the PCI compliance process from initial examination to full compliance in the most effective and least intrusive manner possible.`,
        icon: '💳',
        image: '/images/PCI DSS Compliance Audit.png',
        category: 'compliance'
    },
    {
        id: 'iso-certification',
        title: 'ISO Certification Advisory',
        shortDescription: 'Comprehensive ISO 27001 certification advisory services for establishing information security management systems.',
        fullDescription: `Any organization faces challenges in implementing the ISO 27001 standard. Certification to any standard is frequently mandated by contractual obligations, regulatory requirements, or simply because it is the right thing to do for an organization; in nearly all cases, it can appear to be a daunting process that is difficult to evaluate.

For those interested in determining their current security posture, the products listed below can be used to establish a baseline and guide the evolution of their information security strategy this is true even if they do not wish to pursue full certification.`,
        whatWeOffer: [
            'Gap Analysis of the Information Security Management System',
            'Risk Assessment of the Information Security Management System',
            'Services for ISMS Implementation',
            'Pre-Audit Services for Information Security Management Systems',
            'Training for ISO 27001 Certification',
            'Coordination and Assistance with ISO 27001 Third-Party Certification'
        ],
        whatWeCover: [
            'ISO/IEC 27001:2013 controls'
        ],
        whyThisService: `All major Industries like Healthcare, Education, Fintech, and Hospitality require ISO 27001 adherence and enforcement due to the large volumes of data that must be properly managed due to the sensitivity of the information. If this data becomes available or is compromised, the financial, legal, and other consequences could be disastrous. Strict compliance with ISO 27001 standards ensures that a company is not vulnerable to bugs that could compromise the organization's information security.`,
        whyChooseUs: `Oftentimes, traditional certification approaches take a "one size fits all" approach that does not quite fit your true desires or align with your strategic goals. These "gap analysis exercises" frequently omit critical certification components, such as the following:
• What is the scope of your certification?
• What motivates you to earn your certification?
• Is it possible to find a more suitable substitute?

Our Company's experienced consultants, who are also Lead Auditors, will provide a practical perspective on implementing ISO/IEC 27001 and aligning it with your business goals using Our Company's proven methodology. This approach breaks down the certification process into manageable components, ensuring that you retain complete control over how your resources are used. When making these informed choices, only the elements you require assistance with and wish to evaluate will be chosen.`,
        icon: '📋',
        image: '/images/services/compliance.png',
        category: 'compliance'
    }
];

// Service categories for filtering
export const serviceCategories = [
    { id: 'all', label: 'All Services' },
    { id: 'security-assessment', label: 'Security Assessment' },
    { id: 'compliance', label: 'Compliance Audit' },
    { id: 'forensics', label: 'Forensics & Malware' }
];

// Get service by ID
export function getServiceById(id: string): ServiceItem | undefined {
    return services.find(service => service.id === id);
}

// Get services by category
export function getServicesByCategory(category: string): ServiceItem[] {
    if (category === 'all') return services;
    return services.filter(service => service.category === category);
}
