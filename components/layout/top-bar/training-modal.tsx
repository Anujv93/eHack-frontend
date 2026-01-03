'use client';

import { useState } from 'react';
import './training-modal.css';

interface TrainingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const courseOptions = [
    'Masters in Ethical Hacking',
    'Graduate Program in Cybersecurity',
    'Diploma in Ethical Hacking',
    'Digital Marketing Masterprogram',
    'Robotics for Everyone',
    'EC-Council Certifications',
    'Other'
];

const hearAboutOptions = [
    'Google Search',
    'Social Media',
    'Friend/Colleague',
    'Advertisement',
    'Blog/Article',
    'Other'
];

export default function TrainingModal({ isOpen, onClose }: TrainingModalProps) {
    const [formType, setFormType] = useState<'individual' | 'enterprise'>('individual');
    const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp'>('email');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        hearAbout: '',
        message: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', { formType, contactMethod, ...formData });
        alert('Thank you! We will contact you soon.');
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <h2 className="modal-title">Request Training Information</h2>

                {/* Contact Method Toggle */}
                <div className="contact-method-toggle">
                    <button
                        className={`method-btn ${contactMethod === 'email' ? 'active' : ''}`}
                        onClick={() => setContactMethod('email')}
                        type="button"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        Email
                    </button>
                    <button
                        className={`method-btn ${contactMethod === 'whatsapp' ? 'active' : ''}`}
                        onClick={() => setContactMethod('whatsapp')}
                        type="button"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        WhatsApp
                    </button>
                </div>

                {/* Form Type Toggle */}
                <div className="form-type-toggle">
                    <label className={`type-option ${formType === 'individual' ? 'active' : ''}`}>
                        <input
                            type="radio"
                            name="formType"
                            checked={formType === 'individual'}
                            onChange={() => setFormType('individual')}
                        />
                        <span className="radio-custom"></span>
                        Individual
                    </label>
                    <label className={`type-option ${formType === 'enterprise' ? 'active' : ''}`}>
                        <input
                            type="radio"
                            name="formType"
                            checked={formType === 'enterprise'}
                            onChange={() => setFormType('enterprise')}
                        />
                        <span className="radio-custom"></span>
                        Enterprise
                    </label>
                </div>

                <form onSubmit={handleSubmit} className="training-form">
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name *"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder={formType === 'enterprise' ? 'Business Email *' : 'Email *'}
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Course Name</option>
                                {courseOptions.map((course) => (
                                    <option key={course} value={course}>{course}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <select
                            name="hearAbout"
                            value={formData.hearAbout}
                            onChange={handleInputChange}
                        >
                            <option value="">How did you hear about us?</option>
                            {hearAboutOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <textarea
                            name="message"
                            placeholder="Tell us more about your Training Request"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
