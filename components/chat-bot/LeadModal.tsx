"use client";
import { useState } from "react";
import "./floating-chat.css";

type Props = {
    onSubmit: (lead: { name: string; phone: string }) => void;
    onClose: () => void;
};

// Legacy LeadModal – kept for backwards compatibility
// Main implementation is now embedded in FloatingChat.tsx
export default function LeadModal({ onSubmit, onClose }: Props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    function submit() {
        if (!name || !phone) return;
        onSubmit({ name, phone });
    }

    return (
        <div className="git-backdrop" onClick={onClose}>
            <div className="git-modal" onClick={(e) => e.stopPropagation()}>
                <button className="git-close" onClick={onClose}>✕</button>
                <h2 className="git-title">Get in Touch</h2>
                <p className="git-subtitle">Share your details and we'll get back to you shortly</p>
                <form className="git-form" onSubmit={(e) => { e.preventDefault(); submit(); }}>
                    <div className="form-group">
                        <label className="form-label">Name <span className="required">*</span></label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone <span className="required">*</span></label>
                        <input
                            type="tel"
                            className="form-input"
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="git-submit">Start Chat</button>
                </form>
            </div>
        </div>
    );
}
