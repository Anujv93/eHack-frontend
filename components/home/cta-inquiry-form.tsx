'use client';

import { useState } from 'react';
import './cta-inquiry-form.css';

const programOptions = [
    'Masters in Ethical Hacking',
    'Graduate Program in Cybersecurity',
    'Diploma in Ethical Hacking',
    'Digital Marketing Masterprogram',
    'Robotics for Everyone',
    'EC-Council Certifications',
    'Data Science & Analytics',
    'Other'
];

export default function CTAInquiryForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        program: '',
    });
    const [botTrap, setBotTrap] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            setError('Please enter your name');
            return;
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!formData.phone.trim()) {
            setError('Please enter your contact number');
            return;
        }
        if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        if (botTrap) {
            setIsSubmitted(true);
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const nameParts = formData.name.trim().split(/\s+/);
            const firstName = nameParts[0];
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '-';
            const courseName = formData.program || 'General Inquiry';
            const courseCode = courseName.toLowerCase().replace(/\s+/g, '-');

            const response = await fetch('/api/zoho/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    city: '',
                    inquiryName: `Website Home CTA - ${formData.name.trim()} - ${courseName}`,
                    courses: [{
                        name: courseName,
                        code: courseCode,
                        price: 0,
                        category: 'Program Inquiry'
                    }],
                    totalAmount: 0,
                    message: `Home Page CTA Inquiry${formData.program ? ` | Interested in: ${formData.program}` : ''}`,
                    leadSource: 'Website Home Page CTA',
                    agreeWhatsApp: true,
                    pipeline: 'eHack Academy Leads',
                    stage: 'Qualification',
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Failed to submit');
            }

            setIsSubmitted(true);

            // Google Ads Conversion Event
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-17944571400/8OiVCJHss_cbEIjc0exC',
                    'value': 1.0,
                    'currency': 'INR',
                });
            }
        } catch (err) {
            console.error('Error submitting CTA inquiry:', err);
            setError('Failed to submit. Please call us at +91 98860 35330');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="cta-form-success">
                <div className="cta-success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Our counselor will call you within 2 hours.</p>
                <div className="cta-success-actions">
                    <a href="tel:+919886035330" className="cta-success-call">📞 Call Now</a>
                    <a href="https://wa.me/919886035330" target="_blank" rel="noopener noreferrer" className="cta-success-whatsapp">💬 WhatsApp</a>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="cta-inquiry-form">
            {/* Honeypot */}
            <div style={{ display: 'none' }} aria-hidden="true">
                <input
                    type="text"
                    name="website"
                    value={botTrap}
                    onChange={(e) => setBotTrap(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            {error && <div className="cta-form-error">{error}</div>}

            <div className="cta-form-row">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name *"
                    className="cta-form-input"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address *"
                    className="cta-form-input"
                />
            </div>

            <div className="cta-form-row">
                <div className="cta-phone-wrapper">
                    <span className="cta-phone-prefix">🇮🇳 +91</span>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Mobile Number *"
                        maxLength={10}
                        className="cta-form-input cta-phone-input"
                    />
                </div>
                <select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    className="cta-form-select"
                >
                    <option value="">Interested Program (Optional)</option>
                    {programOptions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>

            <button type="submit" className="cta-form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Get Free Counselling'}
            </button>

            <p className="cta-form-terms">
                By submitting, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
            </p>
        </form>
    );
}
