'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './franchise-popup.css';

export default function FranchisePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Show popup after 5 seconds on every page load
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
        }, 300);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Close popup after showing success message
        setTimeout(() => {
            handleClose();
            // Reset form after closing
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    city: '',
                    message: ''
                });
            }, 500);
        }, 2000);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!isVisible) return null;

    return (
        <div
            className={`franchise-popup-overlay ${isClosing ? 'closing' : ''}`}
            onClick={handleOverlayClick}
        >
            <div className={`franchise-popup-container ${isClosing ? 'closing' : ''}`}>
                {/* Close Button */}
                <button
                    className="franchise-popup-close"
                    onClick={handleClose}
                    aria-label="Close popup"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Left Side - Image */}
                <div className="franchise-popup-image">
                    <Image
                        src="/images/franchise-popup-image.jpg"
                        alt="eHack Academy Franchise Opportunity"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div className="franchise-popup-image-overlay">
                        <div className="franchise-popup-image-content">
                            <span className="franchise-badge">🚀 Franchise Opportunity</span>
                            <h2>Partner with India&apos;s Leading Cybersecurity Training Academy</h2>
                            <p>Join the eHack Academy network and be part of the growing cybersecurity education revolution</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="franchise-popup-form-section">
                    {isSubmitted ? (
                        <div className="franchise-popup-success">
                            <div className="success-icon">
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="32" cy="32" r="32" fill="#10B981" fillOpacity="0.1" />
                                    <circle cx="32" cy="32" r="24" fill="#10B981" fillOpacity="0.2" />
                                    <path d="M22 32L28 38L42 24" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Thank You!</h3>
                            <p>We&apos;ve received your franchise enquiry. Our team will contact you within 24 hours.</p>
                        </div>
                    ) : (
                        <>
                            <div className="franchise-popup-header">
                                <div className="franchise-popup-logo">
                                    <Image
                                        src="/ehack-logo.png"
                                        alt="eHack Academy"
                                        width={120}
                                        height={40}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                                <h3>Franchise <span className="text-accent">Enquiry</span></h3>
                                <p>Fill in your details and we&apos;ll get back to you shortly</p>
                            </div>

                            <form className="franchise-popup-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="popup-name">Full Name</label>
                                        <input
                                            type="text"
                                            id="popup-name"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="popup-email">Email Address</label>
                                        <input
                                            type="email"
                                            id="popup-email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="popup-phone">Phone Number</label>
                                        <div className="phone-input-wrapper">
                                            <span className="phone-prefix">🇮🇳 +91</span>
                                            <input
                                                type="tel"
                                                id="popup-phone"
                                                name="phone"
                                                placeholder="Enter phone number"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="popup-city">City/Location</label>
                                        <input
                                            type="text"
                                            id="popup-city"
                                            name="city"
                                            placeholder="Your preferred city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <label htmlFor="popup-message">Message (Optional)</label>
                                    <textarea
                                        id="popup-message"
                                        name="message"
                                        placeholder="Tell us about your interest in the franchise"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={3}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="franchise-submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner"></span>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Enquiry
                                            <span className="btn-arrow">→</span>
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="franchise-popup-footer">
                                <p>Or call us directly: <a href="tel:+919886035330">+91-9886035330</a></p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
