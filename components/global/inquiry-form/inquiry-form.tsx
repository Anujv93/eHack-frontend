'use client';

import { useState } from 'react';
import './inquiry-form.css';

interface InquiryFormProps {
    // Pre-fill the course/program name
    courseName?: string;
    courseCode?: string;
    // Custom styling variant
    variant?: 'hero' | 'sidebar' | 'section';
    // Custom title/subtitle
    title?: string;
    subtitle?: string;
    // Pipeline configuration
    pipeline?: string;
    stage?: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    agreeWhatsApp: boolean;
}

export default function InquiryForm({
    courseName = '',
    courseCode = '',
    variant = 'hero',
    title = 'Get Course Information',
    subtitle = 'Our counselor will call you within 2 hours',
    pipeline = 'Leads Pipeline Standard',
    stage = 'New Inquiry',
}: InquiryFormProps) {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        agreeWhatsApp: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    const validateForm = (): boolean => {
        if (!formData.firstName.trim()) {
            setError('Please enter your first name');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Please enter your email');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email');
            return false;
        }
        if (!formData.phone.trim()) {
            setError('Please enter your phone number');
            return false;
        }
        if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
            setError('Please enter a valid 10-digit phone number');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setError('');

        try {
            const fullName = `${formData.firstName} ${formData.lastName || formData.firstName}`.trim();
            const inquiryName = courseName
                ? `Website - ${fullName} - ${courseName}`
                : `Website Inquiry - ${fullName}`;

            const courses = courseName ? [{
                name: courseName,
                code: courseCode || courseName.toLowerCase().replace(/\s+/g, '-'),
                price: 0,
                category: 'Program Inquiry'
            }] : [{
                name: 'General Inquiry',
                code: 'general',
                price: 0,
                category: 'General'
            }];

            const response = await fetch('/api/zoho/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName || formData.firstName,
                    email: formData.email,
                    phone: formData.phone,
                    city: '',
                    inquiryName,
                    courses,
                    totalAmount: 0,
                    message: `Inquiry for: ${courseName || 'General'}`,
                    leadSource: 'Website Program Page',
                    agreeWhatsApp: formData.agreeWhatsApp,
                    pipeline,
                    stage,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Failed to submit');
            }

            setIsSubmitted(true);
        } catch (err) {
            console.error('Error submitting inquiry:', err);
            setError('Failed to submit. Please call us at +91 98860 35330');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className={`inquiry-form-wrapper ${variant}`}>
                <div className="inquiry-success">
                    <div className="success-icon">✓</div>
                    <h3>Thank You!</h3>
                    <p>Our counselor will call you within 2 hours.</p>
                    <div className="success-actions">
                        <a href="tel:+919886035330" className="call-now-btn">
                            Call Now
                        </a>
                        <a href="https://wa.me/919886035330" className="whatsapp-btn">
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`inquiry-form-wrapper ${variant}`}>
            <div className="inquiry-form-header">
                <div className="urgency-badge">LIMITED SEATS AVAILABLE</div>
                <h2 className="form-title">{title}</h2>
                <p className="form-subtitle">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="inquiry-form-body">
                {error && <div className="form-error">{error}</div>}

                <div className="form-row">
                    <div className="form-field">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name *"
                            className="form-input"
                        />
                    </div>
                    <div className="form-field">
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-field">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address *"
                        className="form-input"
                    />
                </div>

                <div className="form-field phone-field-wrapper">
                    <div className="country-code">
                        <span className="flag">🇮🇳</span>
                        <span>+91</span>
                    </div>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Mobile Number *"
                        maxLength={10}
                        className="form-input phone-input"
                    />
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Get Free Counselling'}
                </button>

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="agreeWhatsApp"
                        checked={formData.agreeWhatsApp}
                        onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    I wish to receive updates via WhatsApp
                </label>

                <p className="terms-text">
                    By submitting, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
                </p>
            </form>
        </div>
    );
}
