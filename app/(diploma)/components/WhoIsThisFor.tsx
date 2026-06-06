'use client';

import React, { useState, useRef, useEffect } from 'react';
import CounselingModal from './CounselingModal';

const WhoIsThisFor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State & Logic
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        state: ''
    });
    const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; state?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [honeypot, setHoneypot] = useState('');
    const formOpenedAt = useRef<number>(0);

    useEffect(() => {
        formOpenedAt.current = Date.now();
    }, []);

    const validateName = (name: string): string | undefined => {
        const trimmed = name.trim();
        if (!trimmed) return 'Full name is required';
        if (trimmed.length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return 'Name can only contain letters, spaces, dots, and hyphens';
        return undefined;
    };

    const validatePhone = (phone: string): string | undefined => {
        const digits = phone.replace(/\D/g, '');
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
        if (!emailRegex.test(trimmed)) return 'Enter a valid email address';
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
        if (!formData.state) newErrors.state = 'Please select your current stage';
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const handlePhoneChange = (value: string) => {
        const cleaned = value.replace(/[^0-9+\-\s]/g, '');
        setFormData({ ...formData, phone: cleaned });
        if (errors.phone) setErrors({ ...errors, phone: validatePhone(cleaned) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (honeypot !== '') return;
        if (Date.now() - formOpenedAt.current < 3000) return;
        if (!validateAll()) return;

        setIsSubmitting(true);

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
                    inquiryName: `Diploma Landing Page - WhoIsThisFor Consultation`,
                    leadSource: 'Website Consultation Request',
                    courses: [{
                        name: 'Advanced Diploma in Cybersecurity',
                        code: 'adv-diploma',
                        category: 'Diploma',
                        price: 0
                    }],
                    message: `Stage: ${formData.state} | Consultation Request`,
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

            setFormData({ name: '', phone: '', email: '', state: '' });
            setErrors({});
            alert("Thanks for your request! Our career advisor will contact you shortly.");
        } catch (error) {
            console.error('Error submitting consultation form:', error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 font-montserrat">
            <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Stats Section replacing the scroll pill */}
                <div className="flex justify-center mb-12 lg:mb-16 relative z-20 -mt-2 sm:-mt-4 lg:-mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        
                        {/* Stat 1: Admission */}
                        <div className="flex items-center gap-4 p-6 lg:p-8 justify-center md:justify-start">
                            <div className="flex items-center justify-center shrink-0">
                                <svg className="w-8 h-8 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-semibold mb-0.5">Flexible Enrollment</p>
                                <p className="text-lg font-bold text-[#0b162c]">Start Anytime</p>
                            </div>
                        </div>

                        {/* Stat 2: Duration */}
                        <div className="flex items-center gap-4 p-6 lg:p-8 justify-center md:justify-start">
                            <div className="flex items-center justify-center shrink-0">
                                <svg className="w-8 h-8 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-semibold mb-0.5">Program Duration</p>
                                <p className="text-lg font-bold text-[#0b162c]">7 months</p>
                            </div>
                        </div>

                        {/* Stat 3: Format */}
                        <div className="flex items-center gap-4 p-6 lg:p-8 justify-center md:justify-start">
                            <div className="flex items-center justify-center shrink-0">
                                <svg className="w-8 h-8 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-semibold mb-0.5">Learning Format</p>
                                <p className="text-lg font-bold text-[#0b162c]">Live- Online, offline</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Headline Section */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-12 lg:mb-16 gap-6 lg:gap-12">
                    <div className="w-full md:w-5/12 lg:w-2/5 flex flex-col items-start text-left">
                        <h2 className="font-montserrat font-black text-[26px] sm:text-3xl lg:text-[42px] text-[#0b162c] leading-tight text-left">
                            <span className="whitespace-nowrap sm:whitespace-normal">Designed for Ambitious</span> <br />
                            Action-Takers.
                        </h2>
                    </div>
                    <div className="w-full md:w-7/12 lg:w-1/2">
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed border-l-4 border-[#ff6b00] pl-4 sm:pl-6 text-left">
                            Build in-demand Cybersecurity & AI skills. Get hands-on with real-world projects, master an industry-aligned curriculum, and earn your globally recognized eHack certification.
                        </p>
                    </div>
                </div>

                {/* Features List & Lead Form Split Layout */}
                <div id="why-join-grid" className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    
                    {/* Left Column: Features List */}
                    <div className="flex-1 flex flex-col gap-8 lg:gap-10 border border-gray-100 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
                        {/* Feature 1 */}
                        <div className="flex items-start gap-5 sm:gap-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-16.5v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-montserrat font-bold text-xl text-[#0b162c] mb-2">Cyber Meets AI</h3>
                                <ul className="flex flex-col gap-2.5 mt-3">
                                    <li className="flex items-start gap-2.5">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600 text-sm sm:text-base leading-relaxed">Intensive, hands-on training in both offensive & defensive security.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600 text-sm sm:text-base leading-relaxed">Master AI-powered threat intelligence and advanced defense strategies.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600 text-sm sm:text-base leading-relaxed">Live expert-led masterclasses available in both online & offline formats.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-start gap-5 sm:gap-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-montserrat font-bold text-xl text-[#0b162c] mb-2">eHack Certification</h3>
                                <ul className="flex flex-col gap-2.5 mt-3">
                                    <li className="flex items-start gap-2.5">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600 text-sm sm:text-base leading-relaxed">Master Network Defense, Penetration Testing, and the <strong>OWASP Top 10</strong>.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600 text-sm sm:text-base leading-relaxed">Industry-aligned curriculum meeting the highest global security standards.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600 text-sm sm:text-base leading-relaxed">High-impact, practical learning designed for immediate real-world application.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-start gap-5 sm:gap-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.896 1.989-2 1.989H5.75c-1.104 0-2-.895-2-1.989v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-montserrat font-bold text-xl text-[#0b162c] mb-2">Earn While You Learn</h3>
                                <ul className="flex flex-col gap-2.5 mt-3">
                                    <li className="flex items-start gap-2.5">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600 text-sm sm:text-base leading-relaxed">Guaranteed <strong>3-month internship</strong> working on real-time industry projects.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600 text-sm sm:text-base leading-relaxed">Specialize in 2 advanced focus areas of your choice to build expertise.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600 text-sm sm:text-base leading-relaxed">Hands-on experience in SOC Operations, Cloud Security, or Forensics.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="flex items-start gap-5 sm:gap-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-montserrat font-bold text-xl text-[#0b162c] mb-2">The eHack Advantage</h3>
                                <ul className="flex flex-col gap-2.5 mt-3">
                                    <li className="flex items-start gap-2.5">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600 text-sm sm:text-base leading-relaxed">Backed by a <strong>10+ year legacy</strong> of proven cybersecurity excellence.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600 text-sm sm:text-base leading-relaxed">Recognized officially as an EC-Council partner training center.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600 text-sm sm:text-base leading-relaxed">Joined by <strong>50,000+ alumni</strong> successfully securing high-paying dream roles.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Lead Capture Form */}
                    <div className="w-full lg:w-[450px] shrink-0">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)] border border-gray-100 lg:sticky lg:top-32">
                            <h3 className="font-montserrat font-black text-2xl text-[#0b162c] mb-2">Secure Your Future</h3>
                            <p className="text-gray-500 text-sm mb-6">Drop your details below and our career advisors will guide you to the right path.</p>
                            
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                                <div className="hidden" aria-hidden="true">
                                    <input type="text" tabIndex={-1} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} autoComplete="off" />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({...formData, name: e.target.value});
                                            if (errors.name) setErrors({...errors, name: validateName(e.target.value)});
                                        }}
                                        onBlur={() => setErrors({...errors, name: validateName(formData.name)})}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 focus:border-[#ff6b00] transition-all text-sm`} 
                                        placeholder="John Doe" 
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({...formData, email: e.target.value});
                                            if (errors.email) setErrors({...errors, email: validateEmail(e.target.value)});
                                        }}
                                        onBlur={() => setErrors({...errors, email: validateEmail(formData.email)})}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 focus:border-[#ff6b00] transition-all text-sm`} 
                                        placeholder="john@example.com" 
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => handlePhoneChange(e.target.value)}
                                        onBlur={() => setErrors({...errors, phone: validatePhone(formData.phone)})}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 focus:border-[#ff6b00] transition-all text-sm`} 
                                        placeholder="+91 98765 43210" 
                                        maxLength={15}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Stage *</label>
                                    <select 
                                        value={formData.state}
                                        onChange={(e) => {
                                            setFormData({...formData, state: e.target.value});
                                            if (errors.state) setErrors({...errors, state: undefined});
                                        }}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.state ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 focus:border-[#ff6b00] transition-all text-sm text-gray-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_auto] bg-no-repeat bg-[position:right_16px_center]`}
                                    >
                                        <option value="" disabled>Select your current stage...</option>
                                        <option value="high_school">High School Student (Looking for right career)</option>
                                        <option value="college">College Student (Building skills for placements)</option>
                                        <option value="working_it">IT Professional (Upskilling / Salary hike)</option>
                                        <option value="working_non_it">Non-IT Professional (Transition to Cyber)</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.state && <p className="text-red-500 text-xs mt-1 font-medium">{errors.state}</p>}
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full mt-2 bg-[#ff6b00] hover:bg-[#e65c00] text-white font-bold py-3.5 px-6 rounded-xl transition-all flex justify-center items-center gap-2 group shadow-[0_4px_15px_rgba(255,107,0,0.3)]">
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <>
                                            Request Free Consultation
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-center text-gray-400 mt-2">Your information is 100% secure with us.</p>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            
            <CounselingModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </section>
    );
};

export default WhoIsThisFor;
