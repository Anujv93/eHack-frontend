'use client';

import React, { useState, useRef, useEffect } from 'react';

interface SyllabusDownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SyllabusDownloadModal: React.FC<SyllabusDownloadModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        status: ''
    });
    const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; status?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [honeypot, setHoneypot] = useState('');
    const formOpenedAt = useRef<number>(0);

    // Record when the modal opens (bots fill forms in < 3s)
    useEffect(() => {
        if (isOpen) {
            formOpenedAt.current = Date.now();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // --- Validation helpers ---
    const validateName = (name: string): string | undefined => {
        const trimmed = name.trim();
        if (!trimmed) return 'Full name is required';
        if (trimmed.length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return 'Name can only contain letters, spaces, dots, and hyphens';
        return undefined;
    };

    const validatePhone = (phone: string): string | undefined => {
        // Strip everything except digits
        const digits = phone.replace(/\D/g, '');
        // Remove leading country code +91 / 91
        const cleaned = digits.replace(/^91/, '');
        if (!cleaned) return 'Phone number is required';
        if (cleaned.length !== 10) return 'Enter a valid 10-digit mobile number';
        if (!/^[6-9]/.test(cleaned)) return 'Indian mobile numbers start with 6, 7, 8, or 9';
        return undefined;
    };

    const validateEmail = (email: string): string | undefined => {
        const trimmed = email.trim().toLowerCase();
        if (!trimmed) return 'Email address is required';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimmed)) return 'Enter a valid email address (e.g. you@example.com)';
        // Block disposable / obviously fake domains
        const blockedDomains = ['test.com', 'example.com', 'temp.com', 'fake.com', 'mailinator.com', 'guerrillamail.com', 'throwaway.email', 'yopmail.com'];
        const domain = trimmed.split('@')[1];
        if (blockedDomains.includes(domain)) return 'Please use a real email address';
        return undefined;
    };

    const validateAll = (): boolean => {
        const newErrors: typeof errors = {};
        newErrors.name = validateName(formData.name);
        newErrors.phone = validatePhone(formData.phone);
        newErrors.email = validateEmail(formData.email);
        if (!formData.status) newErrors.status = 'Please select your current status';
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    // Clean phone input to allow only digits, spaces, hyphens, plus
    const handlePhoneChange = (value: string) => {
        const cleaned = value.replace(/[^0-9+\-\s]/g, '');
        setFormData({ ...formData, phone: cleaned });
        if (errors.phone) setErrors({ ...errors, phone: validatePhone(cleaned) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Bot protection: honeypot
        if (honeypot !== '') return;

        // Bot protection: speed check (form filled in under 3 seconds = bot)
        if (Date.now() - formOpenedAt.current < 3000) return;

        // Validate all fields
        if (!validateAll()) return;

        setIsSubmitting(true);

        // Sanitize phone for API: strip to 10 digits
        const phoneDigits = formData.phone.replace(/\D/g, '').replace(/^91/, '');

        try {
            const response = await fetch('/api/zoho/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.name.trim(),
                    lastName: '-',
                    email: formData.email.trim().toLowerCase(),
                    phone: phoneDigits,
                    city: '',
                    totalAmount: 0,
                    inquiryName: `Diploma Landing Page - Syllabus Download`,
                    leadSource: 'Website Syllabus Download',
                    courses: [{
                        name: 'Advanced Diploma in Cybersecurity',
                        code: 'adv-diploma',
                        category: 'Diploma',
                        price: 0
                    }],
                    message: `Status: ${formData.status} | Syllabus Download Request`,
                    agreeWhatsApp: true,
                    pipeline: 'eHack Academy Leads',
                    stage: 'New Inquiry',
                    website: honeypot,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.details || 'Failed to submit');
            }

            // Trigger PDF download
            const link = document.createElement('a');
            link.href = '/syllabus.pdf';
            link.download = 'eHack_Advanced_Diploma_Syllabus.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setFormData({ name: '', phone: '', email: '', status: '' });
            setErrors({});
            onClose();
        } catch (error) {
            console.error('Error submitting syllabus form:', error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-montserrat">
            <div className="bg-white rounded-[2rem] w-full max-w-md max-h-[95vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors z-10"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="font-montserrat font-black text-2xl sm:text-3xl text-[#0b162c] mb-2">
                            Download <span className="text-[#ff6b00]">Syllabus</span>
                        </h2>
                        <p className="text-gray-500 text-sm font-medium">
                            Fill in your details to get the complete curriculum PDF.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        {/* Honeypot - hidden from real users, traps bots */}
                        <div className="hidden" aria-hidden="true">
                            <input type="text" tabIndex={-1} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} autoComplete="off" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({...formData, name: e.target.value});
                                    if (errors.name) setErrors({...errors, name: validateName(e.target.value)});
                                }}
                                onBlur={() => setErrors({...errors, name: validateName(formData.name)})}
                                className={`w-full bg-gray-50 border ${errors.name ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'} text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-all text-sm font-medium`} 
                                placeholder="Your full name" 
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
                            <input 
                                type="tel" 
                                value={formData.phone}
                                onChange={(e) => handlePhoneChange(e.target.value)}
                                onBlur={() => setErrors({...errors, phone: validatePhone(formData.phone)})}
                                className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'} text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-all text-sm font-medium`} 
                                placeholder="10-digit mobile number" 
                                maxLength={15}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                            <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({...formData, email: e.target.value});
                                    if (errors.email) setErrors({...errors, email: validateEmail(e.target.value)});
                                }}
                                onBlur={() => setErrors({...errors, email: validateEmail(formData.email)})}
                                className={`w-full bg-gray-50 border ${errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'} text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-all text-sm font-medium`} 
                                placeholder="you@example.com" 
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Current Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => {
                                    setFormData({...formData, status: e.target.value});
                                    if (errors.status) setErrors({...errors, status: undefined});
                                }}
                                className={`w-full bg-gray-50 border ${errors.status ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'} text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-all text-sm font-medium cursor-pointer`}
                            >
                                <option value="" disabled>Select your status...</option>
                                <option value="student">College Student</option>
                                <option value="professional">Working Professional</option>
                                <option value="job_seeker">Job Seeker</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-xs mt-1 font-medium">{errors.status}</p>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-[#ff6b00] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#e65c00] transition-all shadow-[0_8px_20px_rgba(255,107,0,0.25)] hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
                        >
                            {isSubmitting ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download Syllabus
                                </>
                            )}
                        </button>

                        <p className="text-gray-400 text-[11px] flex items-center justify-center gap-1.5 mt-2">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Your information is secure and never shared.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SyllabusDownloadModal;
