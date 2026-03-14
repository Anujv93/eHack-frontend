"use client";

import { useState, useRef, useEffect } from "react";
import "./floating-chat.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* ─── Types ──────────────────────────────────────────── */
type Message = {
    role: "user" | "assistant";
    content: string;
    timestamp?: Date;
    guideCard?: GuideCardData;   // optional embedded card in the assistant bubble
};

type UserInfo = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

/* ─── Guide Flow Data ────────────────────────────────── */
type GuideCardData =
    | { type: "domain-select" }
    | { type: "cyber-path-select" }
    | { type: "ehack-programs" }
    | { type: "kennedy-programs" }
    | { type: "cert-partner-select" }
    | { type: "cert-list"; partner: string }
    | { type: "cert-detail"; cert: CertInfo }
    | { type: "dm-options" }
    | { type: "ds-options" };

type CertInfo = {
    name: string;
    short: string;
    hours: string;
    partner: string;
    url: string;
    description: string;
};

/* ─── Certificate Data ───────────────────────────────── */
const CERT_DATA: Record<string, CertInfo[]> = {
    "EC-Council": [
        { name: "Certified Ethical Hacker (CEH AI v13)", short: "CEH", hours: "60–80 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ceh-v13", description: "World's #1 Ethical Hacking certification. 221+ labs, 550+ attack techniques, 4000+ tools. ANAB accredited & DoD 8140 approved." },
        { name: "C|PENT – Penetration Testing Professional", short: "CPENT", hours: "60–80 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-cpent", description: "Advanced pentest training covering IoT, OT, cloud, and live cyber ranges. The step-up after CEH." },
        { name: "C|HFI – Hacking Forensic Investigator", short: "CHFI", hours: "60–80 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-chfi", description: "Digital forensics & incident response. Learn to investigate cybercrimes, recover evidence, and build watertight cases." },
        { name: "C|ND – Network Defender", short: "CND", hours: "40 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-cnd", description: "Defend enterprise networks. Covers firewalls, IDS/IPS, VPN, cloud security, and network monitoring." },
        { name: "CCSE – Cloud Security Engineer", short: "CCSE", hours: "40–60 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-csse", description: "Multi-cloud security (AWS, Azure, GCP). Design, implement & manage cloud security architectures." },
        { name: "C|SA – SOC Analyst", short: "CSA", hours: "40 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-csoc", description: "Become a Security Operations Center analyst. Threat monitoring, SIEM tools, and incident triage." },
        { name: "CTIA – Threat Intelligence Analyst", short: "CTIA", hours: "40 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-ctia", description: "Build cyber threat intelligence programs. Collect, analyze, and act on threat data." },
        { name: "ECIH – Incident Handler", short: "ECIH", hours: "40 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-ecih", description: "Handle cyber incidents from identification to containment and recovery." },
        { name: "C|SCU – Secure Computer User", short: "CSCU", hours: "24 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-cscu", description: "Perfect beginner course. Safe internet habits, data protection, and basic security concepts." },
        { name: "C|CISO – Chief Info Security Officer", short: "CCISO", hours: "60–80 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-cciso", description: "Executive-level cybersecurity leadership. Governance, risk management, and CISO program management." },
    ],
    "ISACA": [
        { name: "CISM – Information Security Manager", short: "CISM", hours: "40–60 hrs", partner: "ISACA", url: "https://www.ehackacademy.com/certificate/isaca-cism", description: "Globally recognized management-level cert. Governance, risk, incident management & program development." },
        { name: "CISA – Information Systems Auditor", short: "CISA", hours: "40–60 hrs", partner: "ISACA", url: "https://www.ehackacademy.com/certificate/isaca-cisa", description: "Gold standard for IT audit, control & assurance. Highly valued in banking, finance & compliance roles." },
    ],
    "ISC2": [
        { name: "CISSP – Information Systems Security Professional", short: "CISSP", hours: "40–60 hrs", partner: "ISC2", url: "https://www.ehackacademy.com/certificate/isc2-cissp", description: "The most prestigious global cybersecurity cert. Covers 8 CISSP domains — ideal for senior security architects." },
    ],
    "CompTIA": [
        { name: "Security+", short: "Sec+", hours: "40–60 hrs", partner: "CompTIA", url: "https://www.ehackacademy.com/certificate/comptia-security", description: "Baseline cybersecurity cert. DoD 8140 approved. Perfect foundation for any cybersecurity career." },
        { name: "PenTest+", short: "PT+", hours: "60–90 hrs", partner: "CompTIA", url: "https://www.ehackacademy.com/certificate/comptia-pentest", description: "Practical penetration testing & vulnerability assessment. Vendor-neutral & highly respected." },
        { name: "Network+", short: "Net+", hours: "20 hrs", partner: "CompTIA", url: "https://www.ehackacademy.com/certificate/comptia-network", description: "Foundation networking cert. Understand protocols, infrastructure & troubleshooting." },
        { name: "A+", short: "A+", hours: "20 hrs", partner: "CompTIA", url: "https://www.ehackacademy.com/certificate/comptia-a", description: "The entry-level IT support certification. Hardware, OS, troubleshooting & operational procedures." },
    ],
    "Cisco": [
        { name: "CCNA – Cisco Certified Network Associate", short: "CCNA", hours: "60–80 hrs", partner: "Cisco", url: "https://www.ehackacademy.com/certificate/cisco-ccna", description: "Industry-standard networking cert. Routing, switching, IP services, automation & programmability." },
        { name: "CCNP – Cisco Certified Network Professional", short: "CCNP", hours: "40–60 hrs", partner: "Cisco", url: "https://www.ehackacademy.com/certificate/cisco-ccnp", description: "Advanced networking for professionals. Enterprise-level design, implementation & optimization." },
        { name: "CCNA Security", short: "CCNA Sec", hours: "40–60 hrs", partner: "Cisco", url: "https://www.ehackacademy.com/certificate/cisco-ccnas", description: "Network security on Cisco platforms — ACLs, VPNs, firewalls, and IPS." },
    ],
    "Offensive Security": [
        { name: "OSCP – Offensive Security Certified Professional", short: "OSCP", hours: "3 months", partner: "Offensive Security", url: "https://www.ehackacademy.com/certificate/oscp", description: "The most respected hands-on pentest cert. 24-hour exam in a live network — prove real-world skills." },
    ],
};

/* ─── Chat History Message Builder Helpers ─────────── */
function makeAssistantMsg(content: string, guideCard?: GuideCardData): Message {
    return { role: "assistant", content, timestamp: new Date(), guideCard };
}
function makeUserMsg(content: string): Message {
    return { role: "user", content, timestamp: new Date() };
}

export default function FloatingChat() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<"info" | "chat">("info");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "", phone: "", message: "" });
    const [formErrors, setFormErrors] = useState<Partial<UserInfo>>({});
    const [gitErrors, setGitErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
    const [showGetInTouch, setShowGetInTouch] = useState(false);

    // Track which guide cards have been "consumed" to prevent re-showing choices
    const [consumedCards, setConsumedCards] = useState<Set<number>>(new Set());

    const bodyRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [messages, loading]);

    useEffect(() => {
        if (step === "chat" && open) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [step, open]);

    /* ── Form Validation ── */
    function validateForm(): boolean {
        const errors: Partial<UserInfo> = {};
        if (!userInfo.name.trim()) errors.name = "Name is required";
        if (!userInfo.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(userInfo.email)) errors.email = "Enter a valid email";
        if (userInfo.phone.trim() && !/^\d{10}$/.test(userInfo.phone.trim())) {
            errors.phone = "Enter a valid 10-digit phone number";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function validateGitForm(): boolean {
        const errors: { name?: string; email?: string; phone?: string } = {};
        if (!userInfo.name.trim()) errors.name = "Name is required";
        if (!userInfo.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(userInfo.email))
            errors.email = "Enter a valid email";
        if (userInfo.phone.trim() && !/^\d{10}$/.test(userInfo.phone.trim()))
            errors.phone = "Phone number must be exactly 10 digits";
        setGitErrors(errors);
        return Object.keys(errors).length === 0;
    }

    async function handleInfoSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validateForm()) return;

        await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
        }).catch(() => { });

        setStep("chat");
        setMessages([
            makeAssistantMsg(
                `Hey **${userInfo.name}**! 👋 Welcome to **eHack Academy** — India's premier cybersecurity training institute.\n\nI'm here to guide you to the perfect learning path. What would you like to explore today?`,
                { type: "domain-select" }
            ),
        ]);
    }

    /* ── Guide Flow Handlers ── */
    function consumeCard(msgIndex: number) {
        setConsumedCards(prev => new Set(prev).add(msgIndex));
    }

    function handleDomainSelect(domain: string, msgIndex: number) {
        consumeCard(msgIndex);
        const userMsg = makeUserMsg(domain);

        if (domain === "Cybersecurity") {
            setMessages(prev => [...prev, userMsg,
            makeAssistantMsg(
                `Cybersecurity is one of the hottest and highest-paying career fields globally.\n\nAt eHack Academy, we offer **3 pathways** into cybersecurity. Which one fits your goal?`,
                { type: "cyber-path-select" }
            )
            ]);
        } else if (domain === "Digital Marketing") {
            setMessages(prev => [...prev, userMsg,
            makeAssistantMsg(
                `Digital Marketing is a high-demand skill in every industry. Let me show you what we offer.`,
                { type: "dm-options" }
            )
            ]);
        } else if (domain === "Data Science & AI") {
            setMessages(prev => [...prev, userMsg,
            makeAssistantMsg(
                `Data Science & AI is transforming every industry — a fantastic career choice.`,
                { type: "ds-options" }
            )
            ]);
        } else {
            // Fall through to free chat for other selections
            setMessages(prev => [...prev, userMsg]);
            sendMessage(domain);
        }
    }

    function handleCyberPath(path: string, msgIndex: number) {
        consumeCard(msgIndex);
        const userMsg = makeUserMsg(path);

        if (path === "eHack Original Programs") {
            setMessages(prev => [...prev, userMsg,
            makeAssistantMsg(
                `Our **eHack Original Programs** are our flagship offerings — combining multiple global certifications, live classroom training by industry experts, and dedicated placement support.\n\nHere's how our two main programs compare:`,
                { type: "ehack-programs" }
            )
            ]);
        } else if (path === "Kennedy University Degree") {
            setMessages(prev => [...prev, userMsg,
            makeAssistantMsg(
                `We partner with **Kennedy University** to offer internationally recognized degree programs in cybersecurity — perfect if you want a formal academic qualification alongside your professional skills.`,
                { type: "kennedy-programs" }
            )
            ]);
        } else if (path === "Single Certificates") {
            setMessages(prev => [...prev, userMsg,
            makeAssistantMsg(
                `We offer globally recognized certifications from the world's top cybersecurity bodies. Which partner's certifications would you like to explore?`,
                { type: "cert-partner-select" }
            )
            ]);
        }
    }

    function handleCertPartner(partner: string, msgIndex: number) {
        consumeCard(msgIndex);
        const userMsg = makeUserMsg(partner);
        setMessages(prev => [...prev, userMsg,
        makeAssistantMsg(
            `Here are all **${partner}** certifications we offer at eHack Academy — click any to learn more:`,
            { type: "cert-list", partner }
        )
        ]);
    }

    function handleCertSelect(cert: CertInfo, msgIndex: number) {
        consumeCard(msgIndex);
        const userMsg = makeUserMsg(cert.short);
        setMessages(prev => [...prev, userMsg,
        makeAssistantMsg(
            `Here are the details for **${cert.name}**:`,
            { type: "cert-detail", cert }
        )
        ]);
    }

    /* ── Cybersecurity intent detector ── */
    function isCyberSecurityQuery(text: string): boolean {
        const lower = text.toLowerCase();
        const keywords = [
            "cybersecurity", "cyber security", "cyber-security",
            "ethical hacking", "ethical hack", "hacking", "hacker",
            "ceh", "cpent", "chfi", "cnd", "ccse", "csoc", "ctia",
            "penetration", "pentest", "pen test",
            "network security", "information security", "infosec",
            "security course", "security program", "security training",
            "learn cybersecurity", "study cybersecurity",
            "career in cyber", "job in cyber", "cyber career",
            "digital forensics", "forensics", "soc analyst", "cloud security",
            "cissp", "cism", "cisa", "security+", "oscp",
            "courses", "programs", "course", "program",
        ];
        // Must also contain a signal that they are asking about cyber
        const cyberTerms = [
            "cyber", "hack", "security", "forensic", "pentest",
            "ceh", "cpent", "chfi", "oscp", "cissp", "cism", "cisa",
        ];
        const hasCyber = cyberTerms.some(t => lower.includes(t));
        const hasQueryIntent = [
            "course", "program", "training", "learn", "study", "career",
            "start", "begin", "want to", "how to", "what", "which",
            "offering", "option", "available", "explore", "join", "enroll",
            "certification", "certificate", "degree",
        ].some(t => lower.includes(t));
        // If any specific keyword matches, OR (cyber term + query intent), show the menu
        return keywords.some(k => lower.includes(k)) || (hasCyber && hasQueryIntent);
    }

    /* ── Free-text Chat ── */
    async function sendMessage(text: string) {
        if (!text.trim() || loading) return;

        const showCyberMenu = isCyberSecurityQuery(text);

        const newMessages: Message[] = [
            ...messages,
            makeUserMsg(text),
        ];
        setMessages(newMessages);
        setInput("");

        // ── Cybersecurity query: skip AI, show guided menu immediately ──
        if (showCyberMenu) {
            const lower = text.toLowerCase();
            // Pick a contextual intro based on what they said
            let intro = "Great question! We offer **3 clear pathways** into cybersecurity at eHack Academy. Choose the one that fits your goal best:";
            if (lower.includes("start") || lower.includes("beginner") || lower.includes("fresher") || lower.includes("new")) {
                intro = "Welcome to the world of cybersecurity! We have paths designed for every stage — whether you're just starting out or looking for a formal degree. Here are your **3 options**:";
            } else if (lower.includes("degree") || lower.includes("university") || lower.includes("college")) {
                intro = "We do offer university-backed degrees in cybersecurity! Here are all **3 pathways** we provide — including degree options:";
            } else if (lower.includes("certificate") || lower.includes("certification") || lower.includes("cert")) {
                intro = "We have a wide range of globally recognised certifications. Here are all **3 ways** to get certified through eHack Academy:";
            } else if (lower.includes("course") || lower.includes("program") || lower.includes("option") || lower.includes("available")) {
                intro = "Here's a full overview of what we offer in cybersecurity. Choose the pathway that suits you best:";
            }
            setMessages(prev => [
                ...prev,
                makeAssistantMsg(intro, { type: "cyber-path-select" }),
            ]);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    history: newMessages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                    profile: { name: userInfo.name, email: userInfo.email },
                }),
            });

            const data = await res.json();
            const reply = data.reply || data.response || "Sorry, I couldn't understand that.";
            setMessages((m) => [
                ...m,
                makeAssistantMsg(reply),
            ]);
        } catch {
            setMessages((m) => [
                ...m,
                makeAssistantMsg("Oops! Something went wrong. Please try again."),
            ]);
        }
        setLoading(false);
    }

    function formatTime(date?: Date) {
        if (!date) return "";
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    /* ── Guide Card Renderers ── */
    function renderGuideCard(card: GuideCardData, msgIndex: number) {
        const consumed = consumedCards.has(msgIndex);

        if (card.type === "domain-select") {
            const domains = [
                {
                    id: "Cybersecurity",
                    label: "Cybersecurity",
                    sub: "Ethical hacking, certifications & degrees",
                    color: "#ff6b00",
                    bg: "#fff0e6",
                    svg: (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    ),
                },
                {
                    id: "Digital Marketing",
                    label: "Digital Marketing",
                    sub: "SEO, social media, analytics & growth",
                    color: "#10b981",
                    bg: "#d1fae5",
                    svg: (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                    ),
                },
                {
                    id: "Data Science & AI",
                    label: "Data Science & AI",
                    sub: "Python, ML, deep learning & analytics",
                    color: "#7c3aed",
                    bg: "#f3e8ff",
                    svg: (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <ellipse cx="12" cy="5" rx="9" ry="3" />
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                        </svg>
                    ),
                },
            ];
            return (
                <div className="path-list">
                    {domains.map(({ id, label, sub, color, bg, svg }) => (
                        <button
                            key={id}
                            className={`path-row ${consumed ? "path-row--done" : ""}`}
                            onClick={() => !consumed && handleDomainSelect(id, msgIndex)}
                            disabled={consumed}
                        >
                            <span className="path-row-icon" style={{ background: bg, color }}>{svg}</span>
                            <span className="path-row-text">
                                <span className="path-row-label">{label}</span>
                                <span className="path-row-sub">{sub}</span>
                            </span>
                            <svg className="path-row-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    ))}
                </div>
            );
        }

        if (card.type === "ehack-programs") return (
            <div className="guide-programs">
                {/* Graduate Program */}
                <div className="program-card program-card--grad">
                    <div className="program-card-badge">Most Economical</div>
                    <div className="program-card-title">Graduate Program</div>
                    <div className="program-card-subtitle">Ethical Hacking & Cybersecurity AI</div>
                    <ul className="program-card-bullets">
                        <li><strong>2 Global Certifications</strong> (CEH AI v13 + 1 more)</li>
                        <li>AI-powered labs & real attack simulations</li>
                        <li>Classroom training by industry experts</li>
                        <li>Placement support included</li>
                        <li>FREE Laptop worth ₹50,000</li>
                        <li><strong>Most affordable entry point</strong></li>
                    </ul>
                    <div className="program-card-note">
                        <strong>Best for:</strong> Freshers, career switchers, budget-conscious learners
                    </div>
                    <a href="https://www.ehackacademy.com/programs/graduate-cybersecurity" target="_blank" rel="noopener noreferrer" className="program-card-link">
                        View Graduate Program →
                    </a>
                </div>
                {/* Masters Program */}
                <div className="program-card program-card--master">
                    <div className="program-card-badge">Most Comprehensive</div>
                    <div className="program-card-title">Master&apos;s Program</div>
                    <div className="program-card-subtitle">Ethical Hacking & Cybersecurity AI</div>
                    <ul className="program-card-bullets">
                        <li><strong>6 Global Certifications</strong> — CEH, CPENT, CHFI, CND, CSA, CCSE</li>
                        <li>Same great curriculum as Graduate + more depth</li>
                        <li>Enterprise-level cyber range training</li>
                        <li>Leadership-focused AI-driven content</li>
                        <li>Personal mentorship throughout</li>
                        <li>Placement support — until you land the job</li>
                        <li>FREE Laptop worth ₹50,000</li>
                    </ul>
                    <div className="program-card-note">
                        <strong>Best for:</strong> Serious career transformation, working professionals
                    </div>
                    <a href="https://www.ehackacademy.com/programs/masters-ethical-hacking" target="_blank" rel="noopener noreferrer" className="program-card-link">
                        View Master&apos;s Program →
                    </a>
                </div>
                {/* Difference note */}
                <div className="program-compare-note">
                    <strong>Same Curriculum. Same Quality.</strong> The Master&apos;s program simply unlocks <strong>4 more EC-Council certificates</strong> for a more comprehensive career profile. Both include a free laptop, expert trainers, and placement support.
                </div>
                <button
                    className="guide-ask-btn"
                    onClick={() => sendMessage("Tell me more about eHack original programs")}
                >
                    Ask me anything about these programs
                </button>
            </div>
        );

        if (card.type === "kennedy-programs") return (
            <div className="guide-programs">
                <div className="program-card program-card--kennedy">
                    <div className="program-card-badge">University Degree</div>
                    <div className="program-card-title">Kennedy University Partner Programs</div>
                    <div className="program-card-subtitle">Internationally Recognized Degrees in Cybersecurity</div>
                    <ul className="program-card-bullets">
                        <li>Formal university degree credential</li>
                        <li>Internationally recognized qualification</li>
                        <li>Cybersecurity & related disciplines</li>
                        <li>eHack Academy facilitation & support</li>
                        <li>Industry-aligned curriculum</li>
                    </ul>
                    <div className="program-card-note">
                        A great option if you want both practical skills <em>and</em> a formal degree for career advancement or further studies.
                    </div>
                    <a href="https://www.ehackacademy.com/kennedy-university" target="_blank" rel="noopener noreferrer" className="program-card-link">
                        Explore Kennedy University Programs →
                    </a>
                </div>
                <button
                    className="guide-ask-btn"
                    onClick={() => sendMessage("Tell me more about Kennedy University degree programs")}
                >
                    Ask about Kennedy University
                </button>
            </div>
        );

        if (card.type === "cyber-path-select") {
            const paths = [
                {
                    label: "eHack Original Programs",
                    sub: "Flagship programs · 2–6 global certs · placement support",
                    iconType: "ehack" as const,
                },
                {
                    label: "Kennedy University Degree",
                    sub: "International university degree · Formally accredited",
                    iconType: "kennedy" as const,
                },
                {
                    label: "Single Certificates",
                    sub: "EC-Council · CompTIA · Cisco · ISACA · ISC2 & more",
                    iconType: "eccouncil" as const,
                },
            ];

            const iconStyles: Record<string, { bg: string; color: string }> = {
                ehack: { bg: "#fff0e6", color: "#ff6b00" },
                kennedy: { bg: "#1a3a5c", color: "#fff" },
                eccouncil: { bg: "#fff5f5", color: "#dc2626" },
            };

            return (
                <div className="path-list">
                    {paths.map(({ label, sub, iconType }) => (
                        <button
                            key={label}
                            className={`path-row ${consumed ? "path-row--done" : ""}`}
                            onClick={() => !consumed && handleCyberPath(label, msgIndex)}
                            disabled={consumed}
                        >
                            <span
                                className="path-row-icon path-row-icon--img"
                                style={{ background: iconStyles[iconType].bg }}
                            >
                                {iconType === "ehack" && (
                                    <img
                                        src="/favicon.ico"
                                        alt="eHack Originals"
                                        className="path-row-logo"
                                    />
                                )}
                                {iconType === "kennedy" && (
                                    <img
                                        src="/images/kennedy-university-logo.png"
                                        alt="Kennedy University"
                                        className="path-row-logo"
                                    />
                                )}
                                {iconType === "eccouncil" && (
                                    <img
                                        src="/images/ec-council-logo.png"
                                        alt="EC-Council"
                                        className="path-row-logo"
                                    />
                                )}
                            </span>
                            <span className="path-row-text">
                                <span className="path-row-label">{label}</span>
                                <span className="path-row-sub">{sub}</span>
                            </span>
                            <svg className="path-row-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    ))}
                </div>
            );
        }

        if (card.type === "cert-partner-select") {
            const partners = [
                {
                    name: "EC-Council", sub: "CEH, CPENT, CHFI, CND, CSA & more",
                    color: "#dc2626", bg: "#fee2e2",
                    svg: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <line x1="8" y1="12" x2="16" y2="12" /><line x1="12" y1="8" x2="12" y2="16" />
                        </svg>
                    ),
                },
                {
                    name: "ISACA", sub: "CISM · CISA — governance & audit",
                    color: "#0284c7", bg: "#e0f2fe",
                    svg: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                    ),
                },
                {
                    name: "ISC2", sub: "CISSP — the gold standard in security",
                    color: "#059669", bg: "#d1fae5",
                    svg: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
                        </svg>
                    ),
                },
                {
                    name: "CompTIA", sub: "Security+ · PenTest+ · Network+ · A+",
                    color: "#d97706", bg: "#fef3c7",
                    svg: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                    ),
                },
                {
                    name: "Cisco", sub: "CCNA · CCNP · CCNA Security",
                    color: "#1d4ed8", bg: "#dbeafe",
                    svg: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="2" />
                            <path d="M7 10h2v4H7z" /><path d="M11 8h2v8h-2z" /><path d="M15 12h2v2h-2z" />
                        </svg>
                    ),
                },
                {
                    name: "Offensive Security", sub: "OSCP — elite hands-on pentest cert",
                    color: "#374151", bg: "#f3f4f6",
                    svg: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    ),
                },
            ];
            return (
                <div className="path-list">
                    {partners.map(({ name, sub, color, bg, svg }) => (
                        <button
                            key={name}
                            className={`path-row ${consumed ? "path-row--done" : ""}`}
                            onClick={() => !consumed && handleCertPartner(name, msgIndex)}
                            disabled={consumed}
                        >
                            <span className="path-row-icon" style={{ background: bg, color }}>{svg}</span>
                            <span className="path-row-text">
                                <span className="path-row-label">{name}</span>
                                <span className="path-row-sub">{sub}</span>
                            </span>
                            <svg className="path-row-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    ))}
                </div>
            );
        }

        if (card.type === "cert-list") {
            const certs = CERT_DATA[card.partner] || [];
            return (
                <div className="cert-list">
                    {certs.map((cert) => (
                        <button
                            key={cert.short}
                            className={`cert-list-item ${consumed ? "cert-list-item--done" : ""}`}
                            onClick={() => !consumed && handleCertSelect(cert, msgIndex)}
                            disabled={consumed}
                        >
                            <span className="cert-list-short">{cert.short}</span>
                            <span className="cert-list-name">{cert.name}</span>
                            <span className="cert-list-hours">{cert.hours}</span>
                        </button>
                    ))}
                </div>
            );
        }

        if (card.type === "cert-detail") {
            const { cert } = card;
            return (
                <div className="cert-detail-card">
                    <div className="cert-detail-header">
                        <span className="cert-detail-badge">{cert.partner}</span>
                        <div className="cert-detail-title">{cert.name}</div>
                        <div className="cert-detail-hours">{cert.hours}</div>
                    </div>
                    <p className="cert-detail-desc">{cert.description}</p>
                    <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="program-card-link"
                    >
                        View Full Details →
                    </a>
                    <button
                        className="guide-ask-btn"
                        style={{ marginTop: 8 }}
                        onClick={() => sendMessage(`Tell me more about ${cert.name}`)}
                    >
                        Ask me more about this cert
                    </button>
                </div>
            );
        }

        if (card.type === "dm-options") return (
            <div className="guide-programs">
                <div className="program-card program-card--dm">
                    <div className="program-card-badge">🚀 Flagship</div>
                    <div className="program-card-title">Digital Marketing Masters Program</div>
                    <ul className="program-card-bullets">
                        <li>✅ Comprehensive end-to-end digital marketing curriculum</li>
                        <li>✅ SEO, SEM, Social Media, Content, Analytics & more</li>
                        <li>✅ Live projects with real brands</li>
                        <li>✅ Industry expert trainers</li>
                        <li>✅ Placement support</li>
                    </ul>
                    <a href="https://www.ehackacademy.com/programs/digital-marketing-masterprogram" target="_blank" rel="noopener noreferrer" className="program-card-link">
                        View Digital Marketing Program →
                    </a>
                </div>
                <button
                    className="guide-ask-btn"
                    onClick={() => sendMessage("Tell me more about the Digital Marketing Masters Program")}
                >
                    Ask about Digital Marketing 💬
                </button>
            </div>
        );

        if (card.type === "ds-options") return (
            <div className="guide-programs">
                <div className="program-card program-card--ds">
                    <div className="program-card-badge">🤖 AI-Powered</div>
                    <div className="program-card-title">Data Science & AI Program</div>
                    <ul className="program-card-bullets">
                        <li>✅ Python, Machine Learning, Deep Learning</li>
                        <li>✅ Real-world AI & ML projects</li>
                        <li>✅ Data analysis, visualization & storytelling</li>
                        <li>✅ Cloud & big data tools</li>
                        <li>✅ Industry expert instructors</li>
                        <li>✅ Placement support</li>
                    </ul>
                    <a href="https://www.ehackacademy.com/courses" target="_blank" rel="noopener noreferrer" className="program-card-link">
                        Explore Data Science Programs →
                    </a>
                </div>
                <button
                    className="guide-ask-btn"
                    onClick={() => sendMessage("Tell me more about Data Science and AI programs")}
                >
                    Ask about Data Science & AI 💬
                </button>
            </div>
        );

        return null;
    }

    /* ── Markdown Components ── */
    const mdComponents = (role: "user" | "assistant") => ({
        h1: ({ children }: { children: React.ReactNode }) => <p style={{ fontWeight: 700, fontSize: "14px", margin: "8px 0 4px", color: "inherit" }}>{children}</p>,
        h2: ({ children }: { children: React.ReactNode }) => <p style={{ fontWeight: 700, fontSize: "13.5px", margin: "8px 0 4px", color: "inherit" }}>{children}</p>,
        h3: ({ children }: { children: React.ReactNode }) => <p style={{ fontWeight: 600, fontSize: "13px", margin: "6px 0 3px", color: "inherit" }}>{children}</p>,
        p: ({ children }: { children: React.ReactNode }) => <p style={{ margin: "0 0 6px 0", lineHeight: "1.55" }}>{children}</p>,
        ul: ({ children }: { children: React.ReactNode }) => <ul style={{ paddingLeft: "16px", margin: "4px 0 8px" }}>{children}</ul>,
        ol: ({ children }: { children: React.ReactNode }) => <ol style={{ paddingLeft: "16px", margin: "4px 0 8px" }}>{children}</ol>,
        li: ({ children }: { children: React.ReactNode }) => <li style={{ marginBottom: "5px", lineHeight: "1.5" }}>{children}</li>,
        strong: ({ children }: { children: React.ReactNode }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
        em: ({ children }: { children: React.ReactNode }) => <em style={{ fontStyle: "italic", opacity: 0.85 }}>{children}</em>,
        a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" style={{
                color: role === "user" ? "#ffd4b3" : "#e05c00",
                textDecoration: "underline", textUnderlineOffset: "2px", fontWeight: 500, wordBreak: "break-word"
            }}>{children}</a>
        ),
        code: ({ children }: { children: React.ReactNode }) => (
            <code style={{ background: "rgba(0,0,0,0.07)", borderRadius: "4px", padding: "1px 5px", fontSize: "12px", fontFamily: "monospace" }}>{children}</code>
        ),
        hr: () => <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "8px 0" }} />,
        blockquote: ({ children }: { children: React.ReactNode }) => (
            <blockquote style={{ borderLeft: "3px solid #ff6b00", margin: "6px 0", paddingLeft: "10px", opacity: 0.85 }}>{children}</blockquote>
        ),
    });

    /* ── Render ── */
    return (
        <>
            {/* Floating Button */}
            {!open && (
                <button id="chat-fab-btn" className="chat-fab" onClick={() => setOpen(true)} aria-label="Open chat">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </button>
            )}

            {/* Chat Window */}
            {open && (
                <div className={`chat-window ${open ? "chat-window--open" : ""}`}>
                    {/* Header */}
                    <div className="chat-header">
                        <div className="chat-header-left">
                            <div className="chat-avatar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                            </div>
                            <div>
                                <div className="chat-title">eHack Assistant</div>
                                <div className="chat-subtitle"><span className="online-dot" />Online</div>
                            </div>
                        </div>
                        <div className="chat-header-right">
                            <button id="get-in-touch-btn" className="get-in-touch-btn" onClick={() => setShowGetInTouch(true)}>Get in Touch</button>
                            <button id="chat-close-btn" className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
                        </div>
                    </div>

                    {/* Content */}
                    {step === "info" ? (
                        <div className="info-form-container">
                            <div className="info-form-header">
                                <div className="info-form-icon">👋</div>
                                <h2 className="info-form-title">Welcome to eHack!</h2>
                                <p className="info-form-desc">Share a few details and I&apos;ll personalize your learning journey</p>
                            </div>

                            <form className="info-form" onSubmit={handleInfoSubmit} noValidate>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="user-name">Name <span className="required">*</span></label>
                                    <input id="user-name" type="text" className={`form-input ${formErrors.name ? "form-input--error" : ""}`} placeholder="Your name"
                                        value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
                                    {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="user-email">Email <span className="required">*</span></label>
                                    <input id="user-email" type="email" className={`form-input ${formErrors.email ? "form-input--error" : ""}`} placeholder="your.email@example.com"
                                        value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
                                    {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="user-phone">Phone</label>
                                    <input id="user-phone" type="tel" className={`form-input ${formErrors.phone ? "form-input--error" : ""}`} placeholder="+91 98765 43210"
                                        value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
                                    {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="user-message">Message <span className="optional">(optional)</span></label>
                                    <textarea id="user-message" className="form-textarea" placeholder="Tell us about your training requirements..."
                                        value={userInfo.message} onChange={(e) => setUserInfo({ ...userInfo, message: e.target.value })} rows={3} />
                                </div>

                                <button id="start-chat-btn" type="submit" className="form-submit-btn">Start Exploring 🚀</button>
                            </form>
                        </div>
                    ) : (
                        <>
                            <div className="chat-body" ref={bodyRef}>
                                {messages.map((m, i) => (
                                    <div key={i} className={`message-row ${m.role === "user" ? "message-row--user" : "message-row--bot"}`}>
                                        {m.role === "assistant" && (
                                            <div className="bot-avatar">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="message-wrapper">
                                            <div className={`message ${m.role === "user" ? "user-message" : "bot-message"}`}>
                                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents(m.role) as Parameters<typeof ReactMarkdown>[0]["components"]}>
                                                    {m.content}
                                                </ReactMarkdown>
                                                {/* Guide card embedded in bot bubble */}
                                                {m.role === "assistant" && m.guideCard && (
                                                    <div className="guide-card-wrapper">
                                                        {renderGuideCard(m.guideCard, i)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className={`message-time ${m.role === "user" ? "message-time--user" : ""}`}>
                                                {formatTime(m.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {loading && (
                                    <div className="typing-indicator">
                                        <div className="typing-dot" />
                                        <div className="typing-dot" />
                                        <div className="typing-dot" />
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="chat-input">
                                <input
                                    ref={inputRef}
                                    id="chat-input-field"
                                    type="text"
                                    placeholder="Type a message or use the options above..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
                                    }}
                                    disabled={loading}
                                />
                                <button
                                    id="send-message-btn"
                                    className="send-btn"
                                    onClick={() => sendMessage(input)}
                                    disabled={loading || !input.trim()}
                                    aria-label="Send message"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </button>
                            </div>
                            <div className="chat-footer">Powered by eHack AI</div>
                        </>
                    )}
                </div>
            )}

            {/* Get in Touch Modal */}
            {showGetInTouch && (
                <div className="git-backdrop" onClick={() => setShowGetInTouch(false)}>
                    <div className="git-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="git-close" onClick={() => setShowGetInTouch(false)} aria-label="Close">✕</button>
                        <h2 className="git-title">Get in Touch</h2>
                        <p className="git-subtitle">Share your details and we&apos;ll get back to you shortly</p>

                        <form className="git-form" onSubmit={async (e) => {
                            e.preventDefault();
                            await fetch("/api/lead", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(userInfo),
                            }).catch(() => { });
                            setShowGetInTouch(false);
                        }}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="git-name">Name <span className="required">*</span></label>
                                <input id="git-name" type="text" className="form-input" placeholder="Your name"
                                    value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="git-email">Email <span className="required">*</span></label>
                                <input id="git-email" type="email" className="form-input" placeholder="your.email@example.com"
                                    value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="git-phone">Phone</label>
                                <input id="git-phone" type="tel" className="form-input" placeholder="+91 98765 43210"
                                    value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="git-message">Message <span className="optional">(optional)</span></label>
                                <textarea id="git-message" className="form-textarea" placeholder="Tell us about your training requirements..."
                                    value={userInfo.message} onChange={(e) => setUserInfo({ ...userInfo, message: e.target.value })} rows={3} />
                            </div>
                            <button id="send-enquiry-btn" type="submit" className="git-submit">Send Enquiry</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Note: close button is in the chat header — no floating FAB needed when chat is open */}
        </>
    );
}
