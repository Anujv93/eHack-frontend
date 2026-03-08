"use client";
import { useState } from "react";

type Props = {
    onSubmit: (lead: { name: string; phone: string }) => void;
    onClose: () => void;
};

export default function LeadModal({ onSubmit, onClose }: Props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    function submit() {
        if (!name || !phone) return;
        onSubmit({ name, phone });
    }

    return (
        <div className="lead-modal-backdrop" onClick={onClose}>
            <div
                className="lead-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="lead-close" onClick={onClose}>×</button>

                <h2 className="lead-title">Get Expert Guidance</h2>
                <p className="lead-subtitle">
                    Talk to a career counselor today.
                </p>

                <div className="lead-form">
                    <input
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <button className="lead-submit" onClick={submit}>
                        Start Chat
                    </button>
                </div>
            </div>
        </div>
    );
}
