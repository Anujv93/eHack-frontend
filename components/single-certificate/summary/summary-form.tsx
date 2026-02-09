'use client';

import { useState } from 'react';
import './summary-form.css';

interface SummaryInquiryFormProps {
    certificateTitle?: string;
    certificateSlug?: string;
}

export default function SummaryInquiryForm({
    certificateTitle = '',
    certificateSlug = '',
}: SummaryInquiryFormProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        trainingMode: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const validateForm = (): boolean => {
        if (!formData.firstName.trim()) {
            setError('Please enter your first name');
            return false;
        }
        if (!formData.lastName.trim()) {
            setError('Please enter your last name');
            return false;
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email');
            return false;
        }
        if (!formData.phone.trim()) {
            setError('Please enter your phone number');
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
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();
            const inquiryName = certificateTitle
                ? `Website - ${fullName} - ${certificateTitle}`
                : `Website Inquiry - ${fullName}`;

            const courses = certificateTitle ? [{
                name: certificateTitle,
                code: certificateSlug || certificateTitle.toLowerCase().replace(/\s+/g, '-'),
                price: 0,
                category: 'Certification Inquiry'
            }] : [{
                name: 'General Inquiry',
                code: 'general',
                price: 0,
                category: 'General'
            }];

            const trainingModeText = formData.trainingMode
                ? `Training Mode: ${formData.trainingMode}`
                : '';
            const countryText = formData.country
                ? `Country: ${formData.country}`
                : '';

            const response = await fetch('/api/zoho/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    city: formData.country,
                    inquiryName,
                    courses,
                    totalAmount: 0,
                    message: `Inquiry for: ${certificateTitle || 'General'}. ${trainingModeText}. ${countryText}`.trim(),
                    leadSource: 'Website Certificate Page',
                    agreeWhatsApp: true,
                    pipeline: 'Leads Pipeline Standard',
                    stage: 'New Inquiry',
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
            <div className="inquiry-form-card" id="inquiry">
                <div className="form-success">
                    <div className="success-checkmark">✓</div>
                    <h3>Thank You!</h3>
                    <p>Our counselor will call you within 2 hours.</p>
                    <div className="success-buttons">
                        <a href="tel:+919886035330" className="btn-call">Call Now</a>
                        <a href="https://wa.me/919886035330" className="btn-whatsapp">WhatsApp</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="inquiry-form-card" id="inquiry">
            <h3>Course Inquiry</h3>
            {error && <div className="form-error-msg">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-row two-col">
                    <div className="form-group">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name *"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name *"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email *"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number *"
                    />
                </div>
                <div className="form-group">
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Country *</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="UAE">UAE</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <select
                        name="trainingMode"
                        value={formData.trainingMode}
                        onChange={handleInputChange}
                    >
                        <option value="">Training Mode *</option>
                        <option value="Live Online">Live Online</option>
                        <option value="Classroom">Classroom</option>
                        <option value="Self-Paced">Self-Paced</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn-submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
            </form>
        </div>
    );
}
