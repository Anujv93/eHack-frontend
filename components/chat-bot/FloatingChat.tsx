"use client";

import { useState } from "react";
import "./floating-chat.css";
import LeadModal from "./LeadModal";
import { MessageCircleIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
    role: "user" | "assistant";
    content: string;
};

const SUGGESTIONS = [
    "Help me find the right career path",
    "Tell me about your courses",
    "I’m a beginner, what should I learn?",
    "Fees and duration details",
];

export default function FloatingChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showLeadModal, setShowLeadModal] = useState(false);
    const [profile, setProfile] = useState({});


    async function sendMessage(text: string) {
        if (!text.trim()) return;

        const newMessages: Message[] = [...messages, { role: "user", content: text }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text, history: newMessages, profile }),
        });

        const data = await res.json();
        if (data.profile) {
            setProfile(data.profile);
        }

        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);

        if (data.ask_lead) {
            setTimeout(() => setShowLeadModal(true), 800);
        }

        setLoading(false);
    }

    return (
        <>
            {/* Floating Button */}
            <button className="chat-fab flex justify-center items-center" onClick={() => setOpen(true)}>
                <MessageCircleIcon className="" />
            </button>

            {/* Chat Window */}
            {open && (
                <div className="chat-window">
                    {/* Header */}
                    <div className="chat-header">
                        <div>
                            <div className="chat-title">EHack Assistant</div>
                            <div className="chat-subtitle">Online • Replies instantly</div>
                        </div>
                        <button className="chat-close" onClick={() => setOpen(false)}>
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <div className="chat-body">
                        {messages.length === 0 && (
                            <div className="chat-intro">
                                <div className="intro-title">Hi there! 👋</div>
                                <div className="intro-text">
                                    I’m your eHack course assistant. How can I help you accelerate
                                    your career today?
                                </div>

                                <div className="suggestions">
                                    <div className="suggestions-label">SUGGESTED QUESTIONS</div>
                                    {SUGGESTIONS.map((s) => (
                                        <button
                                            key={s}
                                            className="suggestion-item"
                                            onClick={() => sendMessage(s)}
                                        >
                                            <span>{s}</span>
                                            <span className="arrow">›</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`message ${m.role === "user" ? "user-message" : "bot-message"
                                    }`}
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        ul: ({ children }) => <ul style={{ paddingLeft: "18px" }}>{children}</ul>,
                                        li: ({ children }) => <li style={{ marginBottom: "6px" }}>{children}</li>,
                                        strong: ({ children }) => (
                                            <strong style={{ fontWeight: 600 }}>{children}</strong>
                                        ),
                                    }}
                                >
                                    {m.content}
                                </ReactMarkdown>

                            </div>
                        ))}

                        {loading && <div className="typing">Assistant is typing…</div>}
                    </div>

                    {/* Input */}
                    <div className="chat-input">
                        <input
                            placeholder="Type your message…"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                        />
                        <button onClick={() => sendMessage(input)}>➤</button>
                    </div>
                </div>
            )}

            {showLeadModal && (
                <LeadModal onClose={() => setShowLeadModal(false)} />
            )}
        </>
    );
}
