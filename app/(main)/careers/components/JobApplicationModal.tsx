'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Job } from '../data';
import './JobApplicationModal.css';

interface JobApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    job: Job | null;
}

export default function JobApplicationModal({ isOpen, onClose, job }: JobApplicationModalProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset form when closing except if it was just submitted
            if (!isSubmitted) {
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    city: '',
                    message: ''
                });
                setError(null);
            }
        }
    }, [isOpen, isSubmitted]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!job) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/zoho/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.fullName,
                    lastName: '-',
                    email: formData.email,
                    phone: formData.phone,
                    city: formData.city,
                    totalAmount: 0,
                    inquiryName: `Job Application - ${job.title} - ${formData.fullName}`,
                    leadSource: 'Careers Page',
                    courses: [{
                        name: `Job: ${job.title}`,
                        code: 'career-app',
                        category: 'Careers',
                        price: 0
                    }],
                    message: `Application for ${job.title}. Category: ${job.category}. \n\nMessage: ${formData.message || 'No additional message provided.'}`,
                    agreeWhatsApp: true,
                    pipeline: 'eHack Academy Leads',
                    stage: 'New Inquiry',
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.details || 'Failed to submit application');
            }

            setIsSubmitted(true);

            // Google Ads Conversion Event
            if (typeof window !== 'undefined' && (window as any).gtag) {
                const callback = () => {
                    // Conversion reported
                };
                (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-17944571400/8OiVCJHss_cbEIjc0exC',
                    'value': 1.0,
                    'currency': 'INR',
                    'event_callback': callback
                });
            }
        } catch (err: any) {
            console.error('Submission error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container fade-in">
                <button className="close-button" onClick={onClose} aria-label="Close modal">
                    <X size={24} />
                </button>

                <div className="modal-grid">
                    <div className="modal-header-image">
                        <div className="image-overlay">
                            <div className="header-badge">Join Our Team</div>
                            <h2>Applying for <span className="highlight-text">{job?.title}</span></h2>
                            <p className="job-category-tag">
                                {job?.category ? (job.category.charAt(0).toUpperCase() + job.category.slice(1)) : ''} • {job?.location}
                            </p>
                        </div>
                    </div>

                    <div className="modal-form-content">
                        {isSubmitted ? (
                            <div className="success-state">
                                <div className="success-icon-wrapper">
                                    <CheckCircle2 size={64} className="success-icon" />
                                </div>
                                <h3>Application Received!</h3>
                                <p>Thank you for applying to eHack Academy. Our HR team will review your profile and get back to you within 2-3 business days.</p>
                                <button className="modal-done-btn" onClick={onClose}>Done</button>
                            </div>
                        ) : (
                            <>
                                <div className="form-head">
                                    <img src="/ehack-black.png" alt="eHack Academy" className="form-logo" />
                                    <h3>Quick Application</h3>
                                    <p>Please provide your contact details to start the application process.</p>
                                </div>

                                {error && (
                                    <div className="error-message">
                                        <AlertCircle size={18} />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="application-form">
                                    <div className="form-row">
                                        <div className="input-group">
                                            <label htmlFor="fullName">Full Name</label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                required
                                                placeholder="Enter your full name"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row split">
                                        <div className="input-group">
                                            <label htmlFor="phone">Phone Number</label>
                                            <div className="phone-input-prefix">
                                                <span className="prefix">+91</span>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    required
                                                    pattern="[0-9]{10}"
                                                    placeholder="10 digit number"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="input-group">
                                            <label htmlFor="city">Current City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                placeholder="Enter your current city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="input-group">
                                            <label htmlFor="message">Message to Hiring Team (Optional)</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={3}
                                                placeholder="Tell us why you are a good fit for this role"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="submit-button"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                SUBMITTING...
                                            </>
                                        ) : (
                                            'SUBMIT APPLICATION'
                                        )}
                                    </button>

                                    <p className="form-footer">
                                        By submitting, you agree to our <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
