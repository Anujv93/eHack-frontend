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
    suggestions?: string[];
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

/* ─── Quick-reply suggestions for different contexts ─── */
const WELCOME_SUGGESTIONS = [
    "I'm a fresher. Can I learn cybersecurity?",
    "Tell me about the Graduate Program",
    "What are the fees and EMI options?",
    "Do you have digital marketing courses?",
    "Tell me about CEH certification",
    "I want to talk to a counsellor",
];

function makeAssistantMsg(content: string, suggestions?: string[]): Message {
    return { role: "assistant", content, timestamp: new Date(), suggestions };
}
function makeUserMsg(content: string): Message {
    return { role: "user", content, timestamp: new Date() };
}

export default function FloatingChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showGetInTouch, setShowGetInTouch] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: "", email: "", phone: "", city: "",
        qualification: "", interest: "", message: ""
    });

    const bodyRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /* ── Auto-scroll to bottom ── */
    useEffect(() => {
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, [messages, loading]);

    /* ── Focus input on open ── */
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 200);
    }, [open]);

    /* ── Send message to RAG backend ── */
    async function sendMessage(text: string) {
        if (!text.trim() || loading) return;
        const newMessages: Message[] = [...messages, makeUserMsg(text)];
        setMessages(newMessages);
        setInput("");

        setLoading(true);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    history: newMessages.map(m => ({ role: m.role, content: m.content })),
                    profile: {
                        name: userInfo.name,
                        email: userInfo.email,
                        qualification: userInfo.qualification,
                        interest: userInfo.interest,
                    },
                }),
            });
            const data = await res.json();
            const reply = data.reply || data.response || "Sorry, I couldn't understand that. Please try again or contact us at +91 98860 35330.";
            setMessages(m => [...m, makeAssistantMsg(reply)]);
        } catch {
            setMessages(m => [...m, makeAssistantMsg(
                "Oops! Something went wrong. Please try again or reach us directly:\n\n📞 **+91 98860 35330**\n💬 [WhatsApp us](https://wa.me/919886035330)"
            )]);
        }
        setLoading(false);
    }

    function formatTime(date?: Date) {
        if (!date) return "";
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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

    /* ── Open handler — starts with conversational welcome ── */
    function handleOpen() {
        setOpen(true);
        if (messages.length === 0) {
            setMessages([
                makeAssistantMsg(
                    `Hi there! 👋 I'm the **eHack Academy** AI assistant.\n\nI can help you with:\n\n• **Cybersecurity programs** — Graduate, Master's, CEH\n• **Fees, EMI options** and enrollment process\n• **Digital Marketing, Data Science, Robotics** courses\n• **Certifications** — CEH, CPENT, CISSP, OSCP & more\n• **Corporate services** — VAPT, training, franchise\n• **Career guidance** for freshers & professionals\n\nAsk me anything, or try one of the suggestions below! 👇`,
                    WELCOME_SUGGESTIONS
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
                    {/* ── Header ── */}
                    <div className="chat-header">
                        <div className="chat-header-left">
                            <div className="chat-avatar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                            </div>
                            <div>
                                <div className="chat-title">eHack AI Assistant</div>
                                <div className="chat-subtitle"><span className="online-dot" />Online</div>
                            </div>
                        </div>
                        <div className="chat-header-right">
                            <button id="get-in-touch-btn" className="get-in-touch-btn" onClick={() => setShowGetInTouch(true)}>Get in Touch</button>
                            <button id="chat-close-btn" className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
                        </div>
                    </div>

                    {/* ── Chat Body ── */}
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
                                    </div>
                                    <div className={`message-time ${m.role === "user" ? "message-time--user" : ""}`}>
                                        {formatTime(m.timestamp)}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* ── Suggestion chips (shown after last assistant message) ── */}
                        {!loading && messages.length > 0 && messages[messages.length - 1].role === "assistant" && messages[messages.length - 1].suggestions && (
                            <div className="suggestion-chips">
                                {messages[messages.length - 1].suggestions!.map((s) => (
                                    <button
                                        key={s}
                                        className="suggestion-chip"
                                        onClick={() => sendMessage(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {loading && (
                            <div className="typing-indicator">
                                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                            </div>
                        )}
                    </div>

                    {/* ── Chat Input — Always visible ── */}
                    <div className="chat-input">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") sendMessage(input); }}
                            disabled={loading}
                        />
                        <button
                            className="chat-send-btn"
                            onClick={() => sendMessage(input)}
                            disabled={loading || !input.trim()}
                            aria-label="Send message"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                        </button>
                    </div>
                    <div className="chat-footer">Powered by eHack AI</div>
                </div>
            )}

            {/* ── Get in Touch Modal ── */}
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
                            setMessages(m => [...m, makeAssistantMsg("Thank you! Our team will reach out to you shortly. 😊\n\nIn the meantime, feel free to ask me anything!")]);
                        }}>
                            <div className="form-group"><label className="form-label" htmlFor="git-name">Name *</label>
                                <input id="git-name" type="text" className="form-input" placeholder="Your name" value={userInfo.name} onChange={e => setUserInfo({ ...userInfo, name: e.target.value })} required /></div>
                            <div className="form-group"><label className="form-label" htmlFor="git-email">Email *</label>
                                <input id="git-email" type="email" className="form-input" placeholder="your@email.com" value={userInfo.email} onChange={e => setUserInfo({ ...userInfo, email: e.target.value })} required /></div>
                            <div className="form-group"><label className="form-label" htmlFor="git-phone">Phone *</label>
                                <input id="git-phone" type="tel" className="form-input" placeholder="+91 98765 43210" value={userInfo.phone} onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })} required /></div>
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
