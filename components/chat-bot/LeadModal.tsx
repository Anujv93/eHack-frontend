"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function LeadModal({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    async function submit() {
        if (!name || !phone) return;
        setLoading(true);
        try {
            await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone }),
            });
        } finally {
            setLoading(false);
            onClose();
        }
    }

    return (
        <div className="lead-modal-backdrop">
            <div className="lead-modal">
                <button onClick={onClose} className="lead-close">×</button>

                <h2 className="lead-title">Get Expert Guidance</h2>
                <p className="lead-subtitle">
                    Talk to a career counselor today.
                </p>

                <div className="lead-form">
                    <input type="text" placeholder="Your name" />
                    <input type="tel" placeholder="Phone number" />

                    <button className="lead-submit">
                        Request Call Back
                    </button>
                </div>
            </div>
        </div>
    );
}
