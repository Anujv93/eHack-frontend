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
    guideCard?: GuideCardData;
};

type UserInfo = {
    name: string;
    email: string;
    phone: string;
    city: string;
    qualification: string;
    interest: string;
    message: string;
};

type GuideCardData =
    | { type: "welcome-choices" }
    | { type: "lead-form" }
    | { type: "profile-select" }
    | { type: "cyber-options" }
    | { type: "graduate-program" }
    | { type: "masters-program" }
    | { type: "ceh-program" }
    | { type: "higher-edu" }
    | { type: "need-guidance" }
    | { type: "comparison-table" }
    | { type: "ds-options" }
    | { type: "dm-options" }
    | { type: "robotics-options" }
    | { type: "corporate-options" }
    | { type: "conversion-cta"; programUrl?: string }
    | { type: "domain-select" }
    | { type: "cyber-path-select" }
    | { type: "ehack-programs" }
    | { type: "kennedy-programs" }
    | { type: "cert-partner-select" }
    | { type: "cert-list"; partner: string }
    | { type: "cert-detail"; cert: CertInfo };

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
        { name: "Certified Ethical Hacker (CEH AI v13)", short: "CEH", hours: "60–80 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ceh-v13", description: "World's #1 Ethical Hacking certification. 221+ labs, 550+ attack techniques, 4000+ tools." },
        { name: "C|PENT – Penetration Testing Professional", short: "CPENT", hours: "60–80 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-cpent", description: "Advanced pentest training covering IoT, OT, cloud, and live cyber ranges." },
        { name: "C|HFI – Hacking Forensic Investigator", short: "CHFI", hours: "60–80 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-chfi", description: "Digital forensics & incident response investigation." },
        { name: "C|ND – Network Defender", short: "CND", hours: "40 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-cnd", description: "Enterprise network defense — firewalls, IDS/IPS, VPN, cloud security." },
        { name: "CCSE – Cloud Security Engineer", short: "CCSE", hours: "40–60 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-csse", description: "Multi-cloud security (AWS, Azure, GCP)." },
        { name: "C|SA – SOC Analyst", short: "CSA", hours: "40 hrs", partner: "EC-Council", url: "https://www.ehackacademy.com/certificate/ecc-csoc", description: "Security Operations Center analyst training." },
    ],
    "ISACA": [
        { name: "CISM – Information Security Manager", short: "CISM", hours: "40–60 hrs", partner: "ISACA", url: "https://www.ehackacademy.com/certificate/isaca-cism", description: "Management-level cybersecurity certification." },
        { name: "CISA – Information Systems Auditor", short: "CISA", hours: "40–60 hrs", partner: "ISACA", url: "https://www.ehackacademy.com/certificate/isaca-cisa", description: "IT audit, control & assurance certification." },
    ],
    "ISC2": [
        { name: "CISSP – Information Systems Security Professional", short: "CISSP", hours: "40–60 hrs", partner: "ISC2", url: "https://www.ehackacademy.com/certificate/isc2-cissp", description: "Most prestigious global cybersecurity cert." },
    ],
    "CompTIA": [
        { name: "Security+", short: "Sec+", hours: "40–60 hrs", partner: "CompTIA", url: "https://www.ehackacademy.com/certificate/comptia-security", description: "Baseline cybersecurity certification." },
        { name: "PenTest+", short: "PT+", hours: "60–90 hrs", partner: "CompTIA", url: "https://www.ehackacademy.com/certificate/comptia-pentest", description: "Practical penetration testing certification." },
    ],
    "Cisco": [
        { name: "CCNA", short: "CCNA", hours: "60–80 hrs", partner: "Cisco", url: "https://www.ehackacademy.com/certificate/cisco-ccna", description: "Industry-standard networking certification." },
        { name: "CCNP", short: "CCNP", hours: "40–60 hrs", partner: "Cisco", url: "https://www.ehackacademy.com/certificate/cisco-ccnp", description: "Advanced networking for professionals." },
    ],
    "Offensive Security": [
        { name: "OSCP", short: "OSCP", hours: "3 months", partner: "Offensive Security", url: "https://www.ehackacademy.com/certificate/oscp", description: "The most respected hands-on pentest cert." },
    ],
};

function makeAssistantMsg(content: string, guideCard?: GuideCardData): Message {
    return { role: "assistant", content, timestamp: new Date(), guideCard };
}
function makeUserMsg(content: string): Message {
    return { role: "user", content, timestamp: new Date() };
}

const INTEREST_OPTIONS = [
    "Cyber Security", "Data Science", "Digital Marketing",
    "Robotics", "Corporate Services", "Not Sure – Need Guidance"
];
const QUALIFICATION_OPTIONS = [
    "10th / 12th", "Graduate / Degree", "Post Graduate",
    "Working Professional", "Other"
];

export default function FloatingChat() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<"welcome" | "lead" | "chat">("welcome");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: "", email: "", phone: "", city: "",
        qualification: "", interest: "", message: ""
    });
    const [formErrors, setFormErrors] = useState<Partial<UserInfo>>({});
    const [showGetInTouch, setShowGetInTouch] = useState(false);
    const [consumedCards, setConsumedCards] = useState<Set<number>>(new Set());
    const [userProfile, setUserProfile] = useState("");

    const bodyRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, [messages, loading]);

    useEffect(() => {
        if (step === "chat" && open) setTimeout(() => inputRef.current?.focus(), 100);
    }, [step, open]);

    /* ── Form Validation ── */
    function validateLeadForm(): boolean {
        const errors: Partial<UserInfo> = {};
        if (!userInfo.name.trim()) errors.name = "Name is required";
        if (!userInfo.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(userInfo.email)) errors.email = "Enter a valid email";
        if (!userInfo.phone.trim()) errors.phone = "Phone is required";
        else if (!/^\d{10}$/.test(userInfo.phone.trim())) errors.phone = "Enter a valid 10-digit number";
        if (!userInfo.city.trim()) errors.city = "City is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    /* ── Welcome choice handler ── */
    function handleWelcomeChoice(choice: string, msgIndex: number) {
        consumeCard(msgIndex);
        const userMsg = makeUserMsg(choice);

        if (choice === "Talk to a Counsellor") {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg("Our counsellors are ready to help! 😊\n\n📞 **+91 98860 35330**\n💬 [WhatsApp us →](https://wa.me/919886035330)\n✉️ info@ehackacademy.com\n\nThey'll guide you with zero pressure!", { type: "conversion-cta", programUrl: "https://www.ehackacademy.com/programs/graduate-cybersecurity" })
            ]);
            return;
        }
        if (choice === "Get Course Recommendation") {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg("Great! To recommend the perfect course for you, I need a few details. Please fill in the form below:", { type: "lead-form" })
            ]);
            return;
        }
        // For domain selections, go to lead capture first
        setUserInfo(prev => ({ ...prev, interest: choice.replace("Explore ", "") }));
        setMessages(prev => [...prev, userMsg,
            makeAssistantMsg("Excellent choice! To recommend the right program for you, please share your details:", { type: "lead-form" })
        ]);
    }

    /* ── Lead form submit ── */
    async function handleLeadSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validateLeadForm()) return;

        await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
        }).catch(() => { });

        setStep("chat");
        // After lead capture, show profile selection
        setMessages(prev => [...prev,
            makeAssistantMsg(
                `Great, thank you **${userInfo.name}**! 🎉\n\nPlease select your current profile so I can guide you better:`,
                { type: "profile-select" }
            )
        ]);
    }

    /* ── Profile selection handler ── */
    function handleProfileSelect(profile: string, msgIndex: number) {
        consumeCard(msgIndex);
        setUserProfile(profile);
        const userMsg = makeUserMsg(profile);
        const interest = userInfo.interest || "Cyber Security";

        if (interest === "Cyber Security" || interest === "Not Sure – Need Guidance") {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg(
                    "Excellent choice! 🔒 **Cyber Security** is one of the fastest-growing careers globally.\n\nAt eHack Academy, we provide practical training, global certification preparation, internships, and placement support.\n\nPlease choose what suits you best:",
                    { type: "cyber-options" }
                )
            ]);
        } else if (interest === "Data Science") {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg("We offer:\n\n**Master's Program in Data Science and Analytics**\n\nBest for candidates interested in analytics, data-driven decision-making, and future technology roles.\n\nIf your goal is stronger placement-focused employability in a high-demand security field, you may also explore our **Graduate Program in Cyber Security**.", { type: "ds-options" })
            ]);
        } else if (interest === "Digital Marketing") {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg("We offer:\n\n**Master's Program in Digital Marketing**\n\nIdeal for candidates who want careers in branding, performance marketing, SEO, social media, and online growth.\n\nIf you are open to a more technical and high-growth career path, you can also explore our **Graduate Program in Cyber Security**.", { type: "dm-options" })
            ]);
        } else if (interest === "Robotics") {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg("We offer:\n\n**Certification Program in Robotics for Students**\n\nBest for school and college students interested in practical robotics learning.", { type: "robotics-options" })
            ]);
        } else if (interest === "Corporate Services") {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg("eHack Academy supports corporate requirements through **EHACK Global Technology** in:\n\n• VAPT\n• Digital Forensics\n• Security Audits\n• Corporate Training\n\nPlease choose your enquiry type:", { type: "corporate-options" })
            ]);
        } else {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg("Based on your interests, let me show you the best options:", { type: "cyber-options" })
            ]);
        }
    }

    /* ── Cyber Security option handler ── */
    function handleCyberOption(option: string, msgIndex: number) {
        consumeCard(msgIndex);
        const userMsg = makeUserMsg(option);

        if (option === "cost-effective") {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg("Our most recommended option for students and freshers is:", { type: "graduate-program" })
            ]);
        } else if (option === "premium") {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg("Our premium advanced option is:", { type: "masters-program" })
            ]);
        } else if (option === "ceh-focused") {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg("If you specifically want a certification-led ethical hacking path:", { type: "ceh-program" })
            ]);
        } else if (option === "higher-edu") {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg("eHack Academy also supports candidates looking for academic progression through accredited pathways.", { type: "higher-edu" })
            ]);
        } else if (option === "guidance") {
            setMessages(prev => [...prev, userMsg,
                makeAssistantMsg("No problem! Based on what most students and freshers need, our top recommendation is:", { type: "need-guidance" })
            ]);
        }
    }

    function consumeCard(msgIndex: number) {
        setConsumedCards(prev => new Set(prev).add(msgIndex));
    }

    /* ── Cybersecurity intent detector ── */
    function isCyberSecurityQuery(text: string): boolean {
        const lower = text.toLowerCase();
        const keywords = [
            "cybersecurity", "cyber security", "ethical hacking", "hacking",
            "ceh", "cpent", "chfi", "penetration", "pentest",
            "network security", "information security", "infosec",
            "cissp", "cism", "cisa", "security+", "oscp",
            "courses", "programs", "course", "program",
        ];
        const cyberTerms = ["cyber", "hack", "security", "forensic", "pentest", "ceh", "cpent", "oscp", "cissp"];
        const hasCyber = cyberTerms.some(t => lower.includes(t));
        const hasQueryIntent = ["course", "program", "training", "learn", "career", "start", "begin", "want to", "which", "option", "explore"].some(t => lower.includes(t));
        return keywords.some(k => lower.includes(k)) || (hasCyber && hasQueryIntent);
    }

    /* ── Free-text Chat ── */
    async function sendMessage(text: string) {
        if (!text.trim() || loading) return;
        const showCyberMenu = isCyberSecurityQuery(text);
        const newMessages: Message[] = [...messages, makeUserMsg(text)];
        setMessages(newMessages);
        setInput("");

        if (showCyberMenu) {
            setMessages(prev => [...prev,
                makeAssistantMsg("Great question! Here are the cyber security pathways at eHack Academy:", { type: "cyber-options" }),
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
                    history: newMessages.map(m => ({ role: m.role, content: m.content })),
                    profile: { name: userInfo.name, email: userInfo.email, qualification: userInfo.qualification, interest: userInfo.interest, userProfile },
                }),
            });
            const data = await res.json();
            const reply = data.reply || data.response || "Sorry, I couldn't understand that.";
            setMessages(m => [...m, makeAssistantMsg(reply)]);
        } catch {
            setMessages(m => [...m, makeAssistantMsg("Oops! Something went wrong. Please try again.")]);
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

        if (card.type === "welcome-choices") {
            const choices = [
                "Explore Cyber Security",
                "Explore Data Science",
                "Explore Digital Marketing",
                "Explore Robotics",
                "Corporate Services",
                "Talk to a Counsellor",
                "Get Course Recommendation",
            ];
            return (
                <div className="welcome-choices">
                    {choices.map((label) => (
                        <button key={label} className={`welcome-choice-btn ${consumed ? "welcome-choice-btn--done" : ""}`}
                            onClick={() => !consumed && handleWelcomeChoice(label, msgIndex)} disabled={consumed}>
                            <span className="welcome-choice-label">{label}</span>
                            <svg className="path-row-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                    ))}
                </div>
            );
        }

        if (card.type === "lead-form") {
            return (
                <div className="inline-lead-form">
                    <form onSubmit={handleLeadSubmit} noValidate>
                        <div className="ilf-row">
                            <div className="form-group"><label className="form-label">Full Name *</label>
                                <input type="text" className={`form-input ${formErrors.name ? "form-input--error" : ""}`} placeholder="Your name"
                                    value={userInfo.name} onChange={e => setUserInfo({ ...userInfo, name: e.target.value })} />
                                {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                            </div>
                            <div className="form-group"><label className="form-label">Email *</label>
                                <input type="email" className={`form-input ${formErrors.email ? "form-input--error" : ""}`} placeholder="your@email.com"
                                    value={userInfo.email} onChange={e => setUserInfo({ ...userInfo, email: e.target.value })} />
                                {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                            </div>
                        </div>
                        <div className="ilf-row">
                            <div className="form-group"><label className="form-label">Phone *</label>
                                <input type="tel" className={`form-input ${formErrors.phone ? "form-input--error" : ""}`} placeholder="10-digit number"
                                    value={userInfo.phone} onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })} />
                                {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
                            </div>
                            <div className="form-group"><label className="form-label">City *</label>
                                <input type="text" className={`form-input ${formErrors.city ? "form-input--error" : ""}`} placeholder="Your city"
                                    value={userInfo.city} onChange={e => setUserInfo({ ...userInfo, city: e.target.value })} />
                                {formErrors.city && <span className="form-error">{formErrors.city}</span>}
                            </div>
                        </div>
                        <div className="form-group"><label className="form-label">Highest Qualification</label>
                            <select className="form-input" value={userInfo.qualification} onChange={e => setUserInfo({ ...userInfo, qualification: e.target.value })}>
                                <option value="">Select...</option>
                                {QUALIFICATION_OPTIONS.map(q => <option key={q} value={q}>{q}</option>)}
                            </select>
                        </div>
                        <div className="form-group"><label className="form-label">Area of Interest</label>
                            <select className="form-input" value={userInfo.interest} onChange={e => setUserInfo({ ...userInfo, interest: e.target.value })}>
                                <option value="">Select...</option>
                                {INTEREST_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                        <button type="submit" className="form-submit-btn">Continue →</button>
                    </form>
                </div>
            );
        }

        if (card.type === "profile-select") {
            const profiles = [
                "Student after 10th / 12th",
                "Graduate / Degree Student",
                "Working Professional",
                "Career Switcher",
                "Business / Corporate Enquiry",
                "Just Exploring",
            ];
            return (
                <div className="welcome-choices">
                    {profiles.map((label) => (
                        <button key={label} className={`welcome-choice-btn ${consumed ? "welcome-choice-btn--done" : ""}`}
                            onClick={() => !consumed && handleProfileSelect(label, msgIndex)} disabled={consumed}>
                            <span className="welcome-choice-label">{label}</span>
                            <svg className="path-row-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                    ))}
                </div>
            );
        }

        if (card.type === "cyber-options") {
            const options = [
                { id: "cost-effective", label: "Cost-effective job-oriented program" },
                { id: "premium", label: "Premium advanced program" },
                { id: "ceh-focused", label: "CEH-focused certification path" },
                { id: "higher-edu", label: "Higher education / university pathway" },
                { id: "guidance", label: "I need guidance" },
            ];
            return (
                <div className="welcome-choices">
                    {options.map(({ id, label }) => (
                        <button key={id} className={`welcome-choice-btn ${consumed ? "welcome-choice-btn--done" : ""}`}
                            onClick={() => !consumed && handleCyberOption(id, msgIndex)} disabled={consumed}>
                            <span className="welcome-choice-label">{label}</span>
                            <svg className="path-row-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                    ))}
                </div>
            );
        }

        if (card.type === "graduate-program") {
            return (
                <div className="guide-programs">
                    <div className="program-card program-card--grad">
                        <div className="program-card-badge">⭐ Best Value — Most Recommended</div>
                        <div className="program-card-title">Graduate Program in Cyber Security</div>
                        <div className="program-card-subtitle">with 2 Global Certifications</div>
                        <ul className="program-card-bullets">
                            <li>Cost-effective & career-oriented</li>
                            <li>Practical labs & hands-on learning</li>
                            <li>Internship support included</li>
                            <li>Placement via EHACK Global Technology</li>
                            <li>AI-integrated latest curriculum</li>
                            <li>2 years free unlimited membership</li>
                        </ul>
                        <div className="program-card-note"><strong>Best for:</strong> Students, fresh graduates, beginners, career switchers</div>
                        <a href="https://www.ehackacademy.com/programs/graduate-cybersecurity" target="_blank" rel="noopener noreferrer" className="program-card-link">View Graduate Program →</a>
                    </div>
                    <div className="program-next-choices">
                        <button className="pnc-btn" onClick={() => sendMessage("Compare with Master's Program")}>Compare with Master&apos;s Program</button>
                        <button className="pnc-btn" onClick={() => sendMessage("Compare with CEH v13 Master's")}>Compare with CEH v13</button>
                        <button className="pnc-btn pnc-btn--primary" onClick={() => { setMessages(m => [...m, makeAssistantMsg("Please choose how you'd like to proceed:", { type: "conversion-cta", programUrl: "https://www.ehackacademy.com/programs/graduate-cybersecurity" })]); }}>Apply Now</button>
                        <button className="pnc-btn" onClick={() => { window.open("https://wa.me/919886035330", "_blank"); }}>Talk to Counsellor</button>
                    </div>
                </div>
            );
        }

        if (card.type === "masters-program") {
            return (
                <div className="guide-programs">
                    <div className="program-card program-card--master">
                        <div className="program-card-badge">Premium Advanced</div>
                        <div className="program-card-title">Master&apos;s Program in Cyber Security</div>
                        <div className="program-card-subtitle">with 6 Global Certifications</div>
                        <ul className="program-card-bullets">
                            <li><strong>6 Global Certifications</strong></li>
                            <li>Advanced learning & broader domain exposure</li>
                            <li>Real-time labs + Expert faculties</li>
                            <li>Internship + Placement support</li>
                            <li>AI-integrated curriculum</li>
                            <li>2 years free unlimited membership</li>
                        </ul>
                        <div className="program-card-note"><strong>Best for:</strong> Serious aspirants, deeper specialization, premium roles</div>
                        <a href="https://www.ehackacademy.com/programs/masters-ethical-hacking" target="_blank" rel="noopener noreferrer" className="program-card-link">View Master&apos;s Program →</a>
                    </div>
                    <div className="program-card-note" style={{ marginTop: 8, padding: "8px 12px", background: "#fff3e0", borderRadius: 8, fontSize: 12 }}>
                        💡 For a more <strong>cost-effective</strong> option, we strongly recommend the <strong>Graduate Program</strong> — our most popular choice.
                    </div>
                    <div className="program-next-choices">
                        <button className="pnc-btn" onClick={() => { setMessages(m => [...m, makeUserMsg("Show Graduate Program"), makeAssistantMsg("Here's our best-value option:", { type: "graduate-program" })]); }}>See Graduate Program</button>
                        <button className="pnc-btn pnc-btn--primary" onClick={() => { setMessages(m => [...m, makeAssistantMsg("Please choose how you'd like to proceed:", { type: "conversion-cta", programUrl: "https://www.ehackacademy.com/programs/masters-ethical-hacking" })]); }}>Apply Now</button>
                        <button className="pnc-btn" onClick={() => { window.open("https://wa.me/919886035330", "_blank"); }}>Talk to Counsellor</button>
                    </div>
                </div>
            );
        }

        if (card.type === "ceh-program") {
            return (
                <div className="guide-programs">
                    <div className="program-card program-card--ceh">
                        <div className="program-card-badge">CEH Specialized</div>
                        <div className="program-card-title">CEH v13 Master&apos;s Program</div>
                        <div className="program-card-subtitle">with 3 Global Certifications</div>
                        <ul className="program-card-bullets">
                            <li>CEH v13 aligned learning</li>
                            <li>3 Global Certifications</li>
                            <li>Practical labs & ethical hacking focus</li>
                            <li>Industry-relevant training</li>
                        </ul>
                        <div className="program-card-note"><strong>Best for:</strong> CEH-focused ethical hacking candidates</div>
                        <a href="https://www.ehackacademy.com/programs/masterclass-ethical-hacking-ceh-v13" target="_blank" rel="noopener noreferrer" className="program-card-link">View CEH Program →</a>
                    </div>
                    <div className="program-card-note" style={{ marginTop: 8, padding: "8px 12px", background: "#fff3e0", borderRadius: 8, fontSize: 12 }}>
                        💡 For broader career growth + better affordability, the <strong>Graduate Program</strong> is still our most recommended option.
                    </div>
                    <div className="program-next-choices">
                        <button className="pnc-btn pnc-btn--primary" onClick={() => { setMessages(m => [...m, makeAssistantMsg("Please choose how you'd like to proceed:", { type: "conversion-cta", programUrl: "https://www.ehackacademy.com/programs/masterclass-ethical-hacking-ceh-v13" })]); }}>Apply Now</button>
                        <button className="pnc-btn" onClick={() => { setMessages(m => [...m, makeUserMsg("Show Graduate Program"), makeAssistantMsg("Here's our best-value option:", { type: "graduate-program" })]); }}>See Graduate Program</button>
                        <button className="pnc-btn" onClick={() => { setMessages(m => [...m, makeUserMsg("Compare all programs"), makeAssistantMsg("Here's a side-by-side comparison:", { type: "comparison-table" })]); }}>Compare All Programs</button>
                        <button className="pnc-btn" onClick={() => { window.open("https://wa.me/919886035330", "_blank"); }}>Talk to Counsellor</button>
                    </div>
                </div>
            );
        }

        if (card.type === "higher-edu") {
            return (
                <div className="guide-programs">
                    <div className="program-card program-card--edu">
                        <div className="program-card-title">University Pathway</div>
                        <p style={{ fontSize: 13, margin: "8px 0", lineHeight: 1.5 }}>We have accreditation / association support from:</p>
                        <ul className="program-card-bullets">
                            <li><strong>EC Council</strong> — Global cybersecurity certifications</li>
                            <li><strong>Kennedy University</strong> — International degree programs</li>
                        </ul>
                        <a href="https://www.ehackacademy.com/kennedy-university" target="_blank" rel="noopener noreferrer" className="program-card-link">See Accreditation Details →</a>
                    </div>
                    <div className="program-card-note" style={{ marginTop: 8, padding: "8px 12px", background: "#fff3e0", borderRadius: 8, fontSize: 12 }}>
                        💡 For strong employability-focused option with practical training, our <strong>Graduate Program</strong> remains the best-value choice.
                    </div>
                    <div className="program-next-choices">
                        <button className="pnc-btn" onClick={() => { setMessages(m => [...m, makeUserMsg("Show Graduate Program"), makeAssistantMsg("Here's our best-value option:", { type: "graduate-program" })]); }}>See Graduate Program</button>
                        <button className="pnc-btn" onClick={() => { window.open("https://wa.me/919886035330", "_blank"); }}>Talk to Counsellor</button>
                    </div>
                </div>
            );
        }

        if (card.type === "need-guidance") {
            return (
                <div className="guide-programs">
                    <div className="program-card program-card--grad">
                        <div className="program-card-badge">⭐ Top Recommendation</div>
                        <div className="program-card-title">Graduate Program in Cyber Security</div>
                        <ul className="program-card-bullets">
                            <li>Affordable & practical</li>
                            <li>Career-focused with certification support</li>
                            <li>Internship & placement support</li>
                            <li>2 years free unlimited membership</li>
                        </ul>
                        <a href="https://www.ehackacademy.com/programs/graduate-cybersecurity" target="_blank" rel="noopener noreferrer" className="program-card-link">View Graduate Program →</a>
                    </div>
                    <div className="program-next-choices">
                        <button className="pnc-btn" onClick={() => sendMessage("Why is Graduate Program best for me?")}>Why is this best for me?</button>
                        <button className="pnc-btn" onClick={() => { setMessages(m => [...m, makeUserMsg("Compare all programs"), makeAssistantMsg("Here's a comparison:", { type: "comparison-table" })]); }}>Compare all options</button>
                        <button className="pnc-btn" onClick={() => { window.open("https://wa.me/919886035330", "_blank"); }}>Talk to Counsellor</button>
                    </div>
                </div>
            );
        }

        if (card.type === "comparison-table") {
            return (
                <div className="comparison-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr><th>Program</th><th>Best For</th><th>Certs</th><th>Placement</th><th>Pick</th></tr>
                        </thead>
                        <tbody>
                            <tr className="ct-highlight"><td><strong>Graduate Program</strong></td><td>Students, beginners</td><td>2</td><td>Yes</td><td>⭐ Best Value</td></tr>
                            <tr><td><strong>Master&apos;s Program</strong></td><td>Advanced learners</td><td>6</td><td>Yes</td><td>Premium</td></tr>
                            <tr><td><strong>CEH v13 Master&apos;s</strong></td><td>CEH focused</td><td>3</td><td>Yes</td><td>CEH Path</td></tr>
                        </tbody>
                    </table>
                    <p style={{ fontSize: 12, marginTop: 8, color: "#666", lineHeight: 1.5 }}>
                        💡 Best cost-effective option → <strong>Graduate Program</strong> | Premium multi-cert → <strong>Master&apos;s</strong> | CEH specialization → <strong>CEH v13</strong>
                    </p>
                    <div className="program-next-choices">
                        <button className="pnc-btn pnc-btn--primary" onClick={() => { setMessages(m => [...m, makeAssistantMsg("Please choose how you'd like to proceed:", { type: "conversion-cta", programUrl: "https://www.ehackacademy.com/programs/graduate-cybersecurity" })]); }}>Apply Now</button>
                        <button className="pnc-btn" onClick={() => { window.open("https://wa.me/919886035330", "_blank"); }}>Talk to Counsellor</button>
                    </div>
                </div>
            );
        }

        if (card.type === "conversion-cta") {
            const applyUrl = card.programUrl || "https://www.ehackacademy.com/programs/graduate-cybersecurity";
            return (
                <div className="conversion-ctas">
                    <a href={applyUrl} target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn--primary">🚀 Apply Now</a>
                    <button className="cta-btn cta-btn--secondary" onClick={() => setShowGetInTouch(true)}>📞 Request Callback</button>
                    <a href="https://www.ehackacademy.com/courses" target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn--outline">📄 Download Brochure</a>
                    <a href="https://wa.me/919886035330" target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn--whatsapp">💬 WhatsApp Counsellor</a>
                    <button className="cta-btn cta-btn--outline" onClick={() => { setMessages(m => [...m, makeUserMsg("Compare programs again"), makeAssistantMsg("Here's the comparison:", { type: "comparison-table" })]); }}>🔄 Compare Programs Again</button>
                </div>
            );
        }

        if (card.type === "ds-options") {
            return (
                <div className="guide-programs">
                    <div className="program-card program-card--ds">
                        <div className="program-card-badge">🤖 AI-Powered</div>
                        <div className="program-card-title">Master&apos;s Program in Data Science & Analytics</div>
                        <ul className="program-card-bullets">
                            <li>Analytics, ML, and data-driven decision-making</li>
                            <li>Real-world projects & expert trainers</li>
                            <li>Placement support</li>
                        </ul>
                        <a href="https://www.ehackacademy.com/courses" target="_blank" rel="noopener noreferrer" className="program-card-link">See Data Science Details →</a>
                    </div>
                    <div className="program-next-choices">
                        <button className="pnc-btn pnc-btn--primary" onClick={() => { setMessages(m => [...m, makeAssistantMsg("Please choose how you'd like to proceed:", { type: "conversion-cta", programUrl: "https://www.ehackacademy.com/courses" })]); }}>Apply Now</button>
                        <button className="pnc-btn" onClick={() => { setMessages(m => [...m, makeUserMsg("Compare with Cyber Security"), makeAssistantMsg("Here's a comparison:", { type: "comparison-table" })]); }}>Compare with Cyber Security</button>
                        <button className="pnc-btn" onClick={() => { window.open("https://wa.me/919886035330", "_blank"); }}>Talk to Counsellor</button>
                    </div>
                </div>
            );
        }

        if (card.type === "dm-options") {
            return (
                <div className="guide-programs">
                    <div className="program-card program-card--dm">
                        <div className="program-card-badge">🚀 Flagship</div>
                        <div className="program-card-title">Master&apos;s Program in Digital Marketing</div>
                        <ul className="program-card-bullets">
                            <li>SEO, SEM, Social Media, Content & Analytics</li>
                            <li>Live projects with real brands</li>
                            <li>Industry expert trainers & Placement support</li>
                        </ul>
                        <a href="https://www.ehackacademy.com/programs/digital-marketing-masterprogram" target="_blank" rel="noopener noreferrer" className="program-card-link">See Digital Marketing Details →</a>
                    </div>
                    <div className="program-next-choices">
                        <button className="pnc-btn pnc-btn--primary" onClick={() => { setMessages(m => [...m, makeAssistantMsg("Please choose how you'd like to proceed:", { type: "conversion-cta", programUrl: "https://www.ehackacademy.com/programs/digital-marketing-masterprogram" })]); }}>Apply Now</button>
                        <button className="pnc-btn" onClick={() => { setMessages(m => [...m, makeUserMsg("Compare with Cyber Security"), makeAssistantMsg("Here's a comparison:", { type: "comparison-table" })]); }}>Compare with Cyber Security</button>
                        <button className="pnc-btn" onClick={() => { window.open("https://wa.me/919886035330", "_blank"); }}>Talk to Counsellor</button>
                    </div>
                </div>
            );
        }

        if (card.type === "robotics-options") {
            return (
                <div className="guide-programs">
                    <div className="program-card" style={{ borderLeft: "4px solid #8b5cf6" }}>
                        <div className="program-card-badge" style={{ background: "#8b5cf6" }}>🤖 For Students</div>
                        <div className="program-card-title">Certification Program in Robotics</div>
                        <ul className="program-card-bullets">
                            <li>Practical robotics learning for school & college students</li>
                            <li>Hands-on training</li>
                        </ul>
                        <a href="https://www.ehackacademy.com/programs/robotics-for-all" target="_blank" rel="noopener noreferrer" className="program-card-link">See Robotics Details →</a>
                    </div>
                    <div className="program-next-choices">
                        <button className="pnc-btn pnc-btn--primary" onClick={() => { setMessages(m => [...m, makeAssistantMsg("Please choose how you'd like to proceed:", { type: "conversion-cta", programUrl: "https://www.ehackacademy.com/programs/robotics-for-all" })]); }}>Apply Now</button>
                        <button className="pnc-btn" onClick={() => { window.open("https://wa.me/919886035330", "_blank"); }}>Talk to Counsellor</button>
                        <button className="pnc-btn" onClick={() => { setMessages(m => [...m, makeUserMsg("Get course recommendation"), makeAssistantMsg("Based on your profile, I recommend:", { type: "graduate-program" })]); }}>Get Course Recommendation</button>
                    </div>
                </div>
            );
        }

        if (card.type === "corporate-options") {
            const services = [
                "VAPT Services",
                "Digital Forensics",
                "Audit Services",
                "Corporate Training",
                "Talk to Business Team",
            ];
            return (
                <div className="welcome-choices">
                    {services.map((label) => (
                        <button key={label} className={`welcome-choice-btn ${consumed ? "welcome-choice-btn--done" : ""}`}
                            onClick={() => {
                                if (consumed) return;
                                consumeCard(msgIndex);
                                if (label === "Talk to Business Team") {
                                    window.open("https://wa.me/919886035330", "_blank");
                                } else {
                                    sendMessage(`Tell me about ${label}`);
                                }
                            }} disabled={consumed}>
                            <span className="welcome-choice-label">{label}</span>
                        </button>
                    ))}
                </div>
            );
        }

        // Legacy cards for backward compatibility
        if (card.type === "cert-partner-select") {
            const partners = Object.keys(CERT_DATA);
            return (
                <div className="welcome-choices">
                    {partners.map(name => (
                        <button key={name} className={`welcome-choice-btn ${consumed ? "welcome-choice-btn--done" : ""}`}
                            onClick={() => { if (!consumed) { consumeCard(msgIndex); setMessages(m => [...m, makeUserMsg(name), makeAssistantMsg(`Here are **${name}** certifications:`, { type: "cert-list", partner: name })]); } }} disabled={consumed}>
                            <span className="welcome-choice-label">{name}</span>
                        </button>
                    ))}
                </div>
            );
        }

        if (card.type === "cert-list") {
            const certs = CERT_DATA[card.partner] || [];
            return (
                <div className="cert-list">
                    {certs.map(cert => (
                        <button key={cert.short} className={`cert-list-item ${consumed ? "cert-list-item--done" : ""}`}
                            onClick={() => { if (!consumed) { consumeCard(msgIndex); setMessages(m => [...m, makeUserMsg(cert.short), makeAssistantMsg(`Details for **${cert.name}**:`, { type: "cert-detail", cert })]); } }} disabled={consumed}>
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
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="program-card-link">View Full Details →</a>
                </div>
            );
        }

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

    /* ── open handler ── */
    function handleOpen() {
        setOpen(true);
        if (messages.length === 0) {
            setMessages([
                makeAssistantMsg(
                    `**Welcome to eHack Academy Bangalore!**\n\nWe offer career-focused training in: **Cyber Security, Data Science, Robotics, Digital Marketing**, and **Corporate Services**.\n\nOur key advantages:\n\n• 11+ years of expertise\n• Real-time labs & certified industry faculties\n• Latest AI-integrated curriculum\n• 2 years free unlimited membership\n• Internship & placement support\n• Accreditation from EC Council & Kennedy University\n\nPlease choose one option below to continue:`,
                    { type: "welcome-choices" }
                ),
            ]);
        }
    }

    /* ── Render ── */
    return (
        <>
            {!open && (
                <button id="chat-fab-btn" className="chat-fab" onClick={handleOpen} aria-label="Open chat">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </button>
            )}

            {open && (
                <div className={`chat-window ${open ? "chat-window--open" : ""}`}>
                    <div className="chat-header">
                        <div className="chat-header-left">
                            <div className="chat-avatar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
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

                    <div className="chat-body" ref={bodyRef}>
                        {messages.map((m, i) => (
                            <div key={i} className={`message-row ${m.role === "user" ? "message-row--user" : "message-row--bot"}`}>
                                {m.role === "assistant" && (
                                    <div className="bot-avatar">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
                                        </svg>
                                    </div>
                                )}
                                <div className="message-wrapper">
                                    <div className={`message ${m.role === "user" ? "user-message" : "bot-message"}`}>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents(m.role) as Parameters<typeof ReactMarkdown>[0]["components"]}>
                                            {m.content}
                                        </ReactMarkdown>
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
                                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                            </div>
                        )}
                    </div>

                    <div className="chat-footer">Powered by eHack AI</div>
                </div>
            )}

            {showGetInTouch && (
                <div className="git-backdrop" onClick={() => setShowGetInTouch(false)}>
                    <div className="git-modal" onClick={e => e.stopPropagation()}>
                        <button className="git-close" onClick={() => setShowGetInTouch(false)} aria-label="Close">✕</button>
                        <h2 className="git-title">Get in Touch</h2>
                        <p className="git-subtitle">Share your details and we&apos;ll get back to you shortly</p>
                        <form className="git-form" onSubmit={async (e) => {
                            e.preventDefault();
                            await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userInfo) }).catch(() => { });
                            setShowGetInTouch(false);
                        }}>
                            <div className="form-group"><label className="form-label" htmlFor="git-name">Name *</label>
                                <input id="git-name" type="text" className="form-input" placeholder="Your name" value={userInfo.name} onChange={e => setUserInfo({ ...userInfo, name: e.target.value })} required /></div>
                            <div className="form-group"><label className="form-label" htmlFor="git-email">Email *</label>
                                <input id="git-email" type="email" className="form-input" placeholder="your@email.com" value={userInfo.email} onChange={e => setUserInfo({ ...userInfo, email: e.target.value })} required /></div>
                            <div className="form-group"><label className="form-label" htmlFor="git-phone">Phone</label>
                                <input id="git-phone" type="tel" className="form-input" placeholder="+91 98765 43210" value={userInfo.phone} onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label" htmlFor="git-message">Message</label>
                                <textarea id="git-message" className="form-textarea" placeholder="Tell us about your requirements..." value={userInfo.message} onChange={e => setUserInfo({ ...userInfo, message: e.target.value })} rows={3} /></div>
                            <button id="send-enquiry-btn" type="submit" className="git-submit">Send Enquiry</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
