"use client";

import { useState, useRef, useEffect } from "react";
import "./floating-chat.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
    role: "user" | "assistant";
    content: string;
    timestamp?: Date;
};

type UserInfo = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

const QUICK_REPLIES = [
    "Explore Courses",
    "Career Guidance",
    "Fees & Batches",
    "Talk to Counsellor",
];

export default function FloatingChat() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<"info" | "chat">("info");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [formErrors, setFormErrors] = useState<Partial<UserInfo>>({});
    const [showGetInTouch, setShowGetInTouch] = useState(false);

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

    function validateForm(): boolean {
        const errors: Partial<UserInfo> = {};
        if (!userInfo.name.trim()) errors.name = "Name is required";
        if (!userInfo.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(userInfo.email))
            errors.email = "Enter a valid email";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    async function handleInfoSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validateForm()) return;

        // Save lead
        await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
        }).catch(() => { });

        // Transition to chat
        setStep("chat");
        setMessages([
            {
                role: "assistant",
                content: `Hey **${userInfo.name}**! 👋 Great to have you here at eHack Academy.\n\nI'm here to help you kickstart your cybersecurity journey — whether it's choosing the right program, understanding fees, or planning your career.\n\nWhat would you like to know?`,
                timestamp: new Date(),
            },
        ]);
    }

    async function sendMessage(text: string) {
        if (!text.trim() || loading) return;

        const newMessages: Message[] = [
            ...messages,
            { role: "user", content: text, timestamp: new Date() },
        ];
        setMessages(newMessages);
        setInput("");
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
            setMessages((m) => [
                ...m,
                {
                    role: "assistant",
                    content: data.reply || data.response || "Sorry, I couldn't understand that.",
                    timestamp: new Date(),
                },
            ]);
        } catch {
            setMessages((m) => [
                ...m,
                {
                    role: "assistant",
                    content: "Oops! Something went wrong. Please try again.",
                    timestamp: new Date(),
                },
            ]);
        }
        setLoading(false);
    }

    function formatTime(date?: Date) {
        if (!date) return "";
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    function openChat() {
        setOpen(true);
    }

    function closeChat() {
        setOpen(false);
    }

    return (
        <>
            {/* Floating Button */}
            {!open && (
                <button
                    id="chat-fab-btn"
                    className="chat-fab"
                    onClick={openChat}
                    aria-label="Open chat"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
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
                                <div className="chat-subtitle">
                                    <span className="online-dot" />
                                    Online
                                </div>
                            </div>
                        </div>
                        <div className="chat-header-right">
                            <button
                                id="get-in-touch-btn"
                                className="get-in-touch-btn"
                                onClick={() => setShowGetInTouch(true)}
                            >
                                Get in Touch
                            </button>
                            <button
                                id="chat-close-btn"
                                className="chat-close"
                                onClick={closeChat}
                                aria-label="Close chat"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    {step === "info" ? (
                        /* Info Collection Form */
                        <div className="info-form-container">
                            <div className="info-form-header">
                                <div className="info-form-icon">👋</div>
                                <h2 className="info-form-title">Welcome to eHack!</h2>
                                <p className="info-form-desc">
                                    Share a few details and I'll personalize your experience
                                </p>
                            </div>

                            <form className="info-form" onSubmit={handleInfoSubmit} noValidate>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="user-name">
                                        Name <span className="required">*</span>
                                    </label>
                                    <input
                                        id="user-name"
                                        type="text"
                                        className={`form-input ${formErrors.name ? "form-input--error" : ""}`}
                                        placeholder="Your name"
                                        value={userInfo.name}
                                        onChange={(e) =>
                                            setUserInfo({ ...userInfo, name: e.target.value })
                                        }
                                    />
                                    {formErrors.name && (
                                        <span className="form-error">{formErrors.name}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="user-email">
                                        Email <span className="required">*</span>
                                    </label>
                                    <input
                                        id="user-email"
                                        type="email"
                                        className={`form-input ${formErrors.email ? "form-input--error" : ""}`}
                                        placeholder="your.email@example.com"
                                        value={userInfo.email}
                                        onChange={(e) =>
                                            setUserInfo({ ...userInfo, email: e.target.value })
                                        }
                                    />
                                    {formErrors.email && (
                                        <span className="form-error">{formErrors.email}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="user-phone">
                                        Phone
                                    </label>
                                    <input
                                        id="user-phone"
                                        type="tel"
                                        className="form-input"
                                        placeholder="+91 98765 43210"
                                        value={userInfo.phone}
                                        onChange={(e) =>
                                            setUserInfo({ ...userInfo, phone: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="user-message">
                                        Message <span className="optional">(optional)</span>
                                    </label>
                                    <textarea
                                        id="user-message"
                                        className="form-textarea"
                                        placeholder="Tell us about your training requirements..."
                                        value={userInfo.message}
                                        onChange={(e) =>
                                            setUserInfo({ ...userInfo, message: e.target.value })
                                        }
                                        rows={3}
                                    />
                                </div>

                                <button id="start-chat-btn" type="submit" className="form-submit-btn">
                                    Start Chat
                                </button>
                            </form>
                        </div>
                    ) : (
                        /* Chat Interface */
                        <>
                            <div className="chat-body" ref={bodyRef}>
                                {messages.map((m, i) => (
                                    <div
                                        key={i}
                                        className={`message-row ${m.role === "user" ? "message-row--user" : "message-row--bot"}`}
                                    >
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
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        // Headings → compact bold labels, never giant HTML headings
                                                        h1: ({ children }) => (
                                                            <p style={{ fontWeight: 700, fontSize: "14px", margin: "8px 0 4px", color: "inherit" }}>{children}</p>
                                                        ),
                                                        h2: ({ children }) => (
                                                            <p style={{ fontWeight: 700, fontSize: "13.5px", margin: "8px 0 4px", color: "inherit" }}>{children}</p>
                                                        ),
                                                        h3: ({ children }) => (
                                                            <p style={{ fontWeight: 600, fontSize: "13px", margin: "6px 0 3px", color: "inherit" }}>{children}</p>
                                                        ),
                                                        h4: ({ children }) => (
                                                            <p style={{ fontWeight: 600, fontSize: "13px", margin: "4px 0 2px", color: "inherit" }}>{children}</p>
                                                        ),
                                                        // Paragraphs
                                                        p: ({ children }) => (
                                                            <p style={{ margin: "0 0 6px 0", lineHeight: "1.55" }}>{children}</p>
                                                        ),
                                                        // Lists
                                                        ul: ({ children }) => (
                                                            <ul style={{ paddingLeft: "16px", margin: "4px 0 8px" }}>{children}</ul>
                                                        ),
                                                        ol: ({ children }) => (
                                                            <ol style={{ paddingLeft: "16px", margin: "4px 0 8px" }}>{children}</ol>
                                                        ),
                                                        li: ({ children }) => (
                                                            <li style={{ marginBottom: "5px", lineHeight: "1.5" }}>{children}</li>
                                                        ),
                                                        // Inline
                                                        strong: ({ children }) => (
                                                            <strong style={{ fontWeight: 700 }}>{children}</strong>
                                                        ),
                                                        em: ({ children }) => (
                                                            <em style={{ fontStyle: "italic", opacity: 0.85 }}>{children}</em>
                                                        ),
                                                        // Links → open in new tab, styled as blue clickable
                                                        a: ({ href, children }) => (
                                                            <a
                                                                href={href}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    color: m.role === "user" ? "#ffd4b3" : "#e05c00",
                                                                    textDecoration: "underline",
                                                                    textUnderlineOffset: "2px",
                                                                    fontWeight: 500,
                                                                    wordBreak: "break-word",
                                                                }}
                                                            >
                                                                {children}
                                                            </a>
                                                        ),
                                                        // Code
                                                        code: ({ children }) => (
                                                            <code style={{
                                                                background: "rgba(0,0,0,0.07)",
                                                                borderRadius: "4px",
                                                                padding: "1px 5px",
                                                                fontSize: "12px",
                                                                fontFamily: "monospace",
                                                            }}>{children}</code>
                                                        ),
                                                        // HR → thin separator
                                                        hr: () => (
                                                            <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "8px 0" }} />
                                                        ),
                                                        // Blockquote → subtle indent
                                                        blockquote: ({ children }) => (
                                                            <blockquote style={{
                                                                borderLeft: "3px solid #ff6b00",
                                                                margin: "6px 0",
                                                                paddingLeft: "10px",
                                                                opacity: 0.85,
                                                            }}>{children}</blockquote>
                                                        ),
                                                    }}
                                                >
                                                    {m.content}
                                                </ReactMarkdown>
                                            </div>
                                            <div className={`message-time ${m.role === "user" ? "message-time--user" : ""}`}>
                                                {formatTime(m.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Quick replies shown only after first bot message */}
                                {messages.length === 1 && !loading && (
                                    <div className="quick-replies">
                                        {QUICK_REPLIES.map((r) => (
                                            <button
                                                key={r}
                                                id={`quick-reply-${r.replace(/\s+/g, "-").toLowerCase()}`}
                                                className="quick-reply-btn"
                                                onClick={() => sendMessage(r)}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                )}

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
                                    placeholder="Type a message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            sendMessage(input);
                                        }
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
                <div
                    className="git-backdrop"
                    onClick={() => setShowGetInTouch(false)}
                >
                    <div
                        className="git-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="git-close"
                            onClick={() => setShowGetInTouch(false)}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                        <h2 className="git-title">Get in Touch</h2>
                        <p className="git-subtitle">
                            Share your details and we'll get back to you shortly
                        </p>

                        <form
                            className="git-form"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                await fetch("/api/lead", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(userInfo),
                                }).catch(() => { });
                                setShowGetInTouch(false);
                            }}
                        >
                            <div className="form-group">
                                <label className="form-label" htmlFor="git-name">
                                    Name <span className="required">*</span>
                                </label>
                                <input
                                    id="git-name"
                                    type="text"
                                    className="form-input"
                                    placeholder="Your name"
                                    value={userInfo.name}
                                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="git-email">
                                    Email <span className="required">*</span>
                                </label>
                                <input
                                    id="git-email"
                                    type="email"
                                    className="form-input"
                                    placeholder="your.email@example.com"
                                    value={userInfo.email}
                                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="git-phone">
                                    Phone
                                </label>
                                <input
                                    id="git-phone"
                                    type="tel"
                                    className="form-input"
                                    placeholder="+91 98765 43210"
                                    value={userInfo.phone}
                                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="git-message">
                                    Message <span className="optional">(optional)</span>
                                </label>
                                <textarea
                                    id="git-message"
                                    className="form-textarea"
                                    placeholder="Tell us about your training requirements..."
                                    value={userInfo.message}
                                    onChange={(e) => setUserInfo({ ...userInfo, message: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <button id="send-enquiry-btn" type="submit" className="git-submit">
                                Send Enquiry
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating close button when chat is open */}
            {open && (
                <button
                    id="chat-fab-close-btn"
                    className="chat-fab chat-fab--close"
                    onClick={closeChat}
                    aria-label="Close chat"
                >
                    ✕
                </button>
            )}
        </>
    );
}
