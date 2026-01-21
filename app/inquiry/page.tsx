'use client';

import { useState } from 'react';
import Link from 'next/link';
import './page.css';

// Course options matching your Zoho Products/Courses
const COURSES = [
    {
        value: 'ceh-v13',
        label: 'Certified Ethical Hacker (CEH v13)',
        price: 85000,
        category: 'EC-Council Certification'
    },
    {
        value: 'ceh-master',
        label: 'CEH Master Program (3 Certifications)',
        price: 125000,
        category: 'EC-Council Certification'
    },
    {
        value: 'cnd',
        label: 'Certified Network Defender (CND)',
        price: 45000,
        category: 'EC-Council Certification'
    },
    {
        value: 'chfi',
        label: 'Computer Hacking Forensic Investigator (CHFI)',
        price: 55000,
        category: 'EC-Council Certification'
    },
    {
        value: 'csa',
        label: 'Certified SOC Analyst (CSA)',
        price: 45000,
        category: 'EC-Council Certification'
    },
    {
        value: 'cpent',
        label: 'Certified Penetration Testing Professional (CPENT)',
        price: 85000,
        category: 'EC-Council Certification'
    },
    {
        value: 'masters-ethical-hacking',
        label: 'Masters in Ethical Hacking (6 Certifications)',
        price: 150000,
        category: 'eHack Program'
    },
    {
        value: 'graduate-ethical-hacking',
        label: 'Graduate in Ethical Hacking',
        price: 99000,
        category: 'eHack Program'
    },
    {
        value: 'bscs',
        label: 'Bachelor of Science in Cyber Security (BSCS)',
        price: 250000,
        category: 'Kennedy Degree'
    },
    {
        value: 'mscs',
        label: 'Master of Science in Cyber Security (MSCS)',
        price: 200000,
        category: 'Kennedy Degree'
    },
    {
        value: 'bscs-mscs-integrated',
        label: 'Integrated BSCS + MSCS (Dual Degree)',
        price: 350000,
        category: 'Kennedy Degree'
    },
];

const LEAD_SOURCES = [
    { value: '', label: 'How did you hear about us?' },
    { value: 'google', label: 'Google Search' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'friend-referral', label: 'Friend / Family Referral' },
    { value: 'college', label: 'College / University' },
    { value: 'event', label: 'Workshop / Event' },
    { value: 'walk-in', label: 'Walk-in / Office Visit' },
    { value: 'other', label: 'Other' },
];

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    selectedCourses: string[];
    message: string;
    leadSource: string;
    agreeWhatsApp: boolean;
}

const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    selectedCourses: [],
    message: '',
    leadSource: '',
    agreeWhatsApp: true,
};

export default function InquiryPage() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCourseToggle = (courseValue: string) => {
        setFormData(prev => ({
            ...prev,
            selectedCourses: prev.selectedCourses.includes(courseValue)
                ? prev.selectedCourses.filter(c => c !== courseValue)
                : [...prev.selectedCourses, courseValue]
        }));

        // Clear course error when a course is selected
        if (errors.selectedCourses) {
            setErrors(prev => ({ ...prev, selectedCourses: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = 'Please enter a valid email';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, '')))
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        if (formData.selectedCourses.length === 0)
            newErrors.selectedCourses = 'Please select at least one course';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getSelectedCoursesDetails = () => {
        return formData.selectedCourses.map(courseValue => {
            const course = COURSES.find(c => c.value === courseValue);
            return course ? {
                name: course.label,
                price: course.price,
                category: course.category,
                code: course.value
            } : null;
        }).filter(Boolean);
    };

    const getTotalPrice = () => {
        return formData.selectedCourses.reduce((total, courseValue) => {
            const course = COURSES.find(c => c.value === courseValue);
            return total + (course?.price || 0);
        }, 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();
            const selectedCoursesDetails = getSelectedCoursesDetails();
            const coursesText = selectedCoursesDetails.map(c => c?.name).join(', ');

            // Generate inquiry name
            const primaryCourse = selectedCoursesDetails[0]?.name || 'General';
            const inquiryName = `Website Inquiry - ${fullName} - ${primaryCourse}`;

            // Send to Zoho Bigin via API
            const response = await fetch('/api/zoho/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // Student data
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    city: formData.city,

                    // Inquiry data
                    inquiryName: inquiryName,
                    courses: selectedCoursesDetails,
                    totalAmount: getTotalPrice(),
                    message: formData.message,
                    leadSource: formData.leadSource || 'Website Inquiry Form',
                    agreeWhatsApp: formData.agreeWhatsApp,

                    // Pipeline info - using actual Zoho Bigin pipeline names
                    pipeline: 'Leads Pipeline Standard',
                    stage: 'New Inquiry',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit inquiry');
            }

            const result = await response.json();
            console.log('Inquiry submission successful:', result);

            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            alert('Failed to submit inquiry. Please try again or call us at +91 98860 35330');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    if (isSubmitted) {
        return (
            <main className="inquiry-page">
                <div className="inquiry-container">
                    <div className="success-card">
                        <div className="success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="16 10 11 16 8 13" />
                            </svg>
                        </div>
                        <h2>Thank You for Your Interest! 🎉</h2>
                        <p>We&apos;ve received your inquiry and our counselor will contact you within 2 hours.</p>

                        <div className="inquiry-summary">
                            <h4>Your Inquiry Details:</h4>
                            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                            <p><strong>Courses:</strong></p>
                            <ul>
                                {getSelectedCoursesDetails().map((course, idx) => (
                                    <li key={idx}>{course?.name}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="next-actions">
                            <p>Want to talk now?</p>
                            <div className="action-buttons">
                                <a href="tel:+919886035330" className="action-btn phone">
                                    📞 Call Now
                                </a>
                                <a href="https://wa.me/919886035330" className="action-btn whatsapp">
                                    💬 WhatsApp
                                </a>
                            </div>
                        </div>

                        <Link href="/" className="back-home">← Back to Home</Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="inquiry-page">
            {/* Hero Section */}
            <section className="inquiry-hero">
                <div className="hero-content">
                    <span className="hero-badge">Start Your Cybersecurity Journey</span>
                    <h1>Get Course Information</h1>
                    <p>Fill this quick form and our career counselor will call you within 2 hours</p>
                </div>
            </section>

            <div className="inquiry-container">
                <div className="inquiry-layout">
                    {/* Form Section */}
                    <div className="form-section">
                        <form onSubmit={handleSubmit} className="inquiry-form">
                            {/* Personal Information */}
                            <div className="form-section-header">
                                <span className="section-number">1</span>
                                <h3>Your Information</h3>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name *</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter first name"
                                        className={errors.firstName ? 'error' : ''}
                                    />
                                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name *</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter last name"
                                        className={errors.lastName ? 'error' : ''}
                                    />
                                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="error-text">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number *</label>
                                    <div className="phone-input">
                                        <span className="country-code">🇮🇳 +91</span>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="9876543210"
                                            maxLength={10}
                                            className={errors.phone ? 'error' : ''}
                                        />
                                    </div>
                                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="Your city"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="leadSource">How did you hear about us?</label>
                                    <select
                                        id="leadSource"
                                        name="leadSource"
                                        value={formData.leadSource}
                                        onChange={handleInputChange}
                                    >
                                        {LEAD_SOURCES.map(source => (
                                            <option key={source.value} value={source.value}>
                                                {source.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Course Selection */}
                            <div className="form-section-header">
                                <span className="section-number">2</span>
                                <h3>Select Courses You&apos;re Interested In *</h3>
                            </div>

                            {errors.selectedCourses && (
                                <span className="error-text course-error">{errors.selectedCourses}</span>
                            )}

                            <div className="courses-grid">
                                {COURSES.map(course => (
                                    <div
                                        key={course.value}
                                        className={`course-card ${formData.selectedCourses.includes(course.value) ? 'selected' : ''}`}
                                        onClick={() => handleCourseToggle(course.value)}
                                    >
                                        <div className="course-checkbox">
                                            {formData.selectedCourses.includes(course.value) ? (
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                </svg>
                                            ) : (
                                                <div className="empty-checkbox"></div>
                                            )}
                                        </div>
                                        <div className="course-info">
                                            <span className="course-name">{course.label}</span>
                                            <span className="course-meta">
                                                <span className="course-category">{course.category}</span>
                                                <span className="course-price">{formatPrice(course.price)}</span>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message */}
                            <div className="form-section-header">
                                <span className="section-number">3</span>
                                <h3>Additional Message (Optional)</h3>
                            </div>

                            <div className="form-group full-width">
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Any specific questions or requirements? Let us know..."
                                    rows={3}
                                />
                            </div>

                            {/* WhatsApp Consent */}
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    name="agreeWhatsApp"
                                    checked={formData.agreeWhatsApp}
                                    onChange={handleInputChange}
                                />
                                <span className="checkmark"></span>
                                I agree to receive updates via WhatsApp
                            </label>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Inquiry
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            <p className="form-note">
                                By submitting, you agree to our <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>
                            </p>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Selected Courses Summary */}
                        {formData.selectedCourses.length > 0 && (
                            <div className="summary-card">
                                <h4>Selected Courses</h4>
                                <ul className="selected-courses-list">
                                    {getSelectedCoursesDetails().map((course, idx) => (
                                        <li key={idx}>
                                            <span className="course-name">{course?.name}</span>
                                            <span className="course-price">{formatPrice(course?.price || 0)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="total-row">
                                    <span>Total Value</span>
                                    <span className="total-price">{formatPrice(getTotalPrice())}</span>
                                </div>
                                <p className="discount-note">
                                    💡 Special discounts available for combo enrollments!
                                </p>
                            </div>
                        )}

                        {/* Why eHack */}
                        <div className="info-card">
                            <h4>Why eHack Academy?</h4>
                            <ul className="benefits-list">
                                <li>
                                    <span className="benefit-icon">🏆</span>
                                    <span>EC-Council Authorized Training Center</span>
                                </li>
                                <li>
                                    <span className="benefit-icon">👨‍🏫</span>
                                    <span>Learn from Industry Experts (CISOs)</span>
                                </li>
                                <li>
                                    <span className="benefit-icon">💻</span>
                                    <span>AI-Powered Hands-on Labs</span>
                                </li>
                                <li>
                                    <span className="benefit-icon">🎯</span>
                                    <span>100% Placement Assistance</span>
                                </li>
                                <li>
                                    <span className="benefit-icon">📜</span>
                                    <span>Global Certifications Included</span>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Card */}
                        <div className="contact-card">
                            <h4>Need Immediate Help?</h4>
                            <p>Our counselors are available to assist you</p>
                            <div className="contact-options">
                                <a href="tel:+919886035330" className="contact-btn phone">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                    </svg>
                                    +91 98860 35330
                                </a>
                                <a href="https://wa.me/919886035330" className="contact-btn whatsapp">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
