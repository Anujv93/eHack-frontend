'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

gsap.registerPlugin(ScrollTrigger);

// ─── Lead Form Schema ───
const leadFormSchema = z.object({
    fullName: z.string().trim()
        .min(1, 'Please enter your full name')
        .min(2, 'Name must be at least 2 characters'),
    email: z.string().trim()
        .min(1, 'Please enter your email address')
        .email('Please enter a valid email address'),
    phone: z.string().trim()
        .min(1, 'Please enter your phone number')
        .length(10, 'Please enter a valid 10-digit phone number')
        .regex(/^[6-9]/, 'Phone number must start with 6, 7, 8, or 9')
        .regex(/^\d+$/, 'Phone number must contain only digits'),
    currentStatus: z.string().min(1, 'Please select your current status'),
    experience: z.string().min(1, 'Please select your experience level'),
    website: z.string().optional(), // Honeypot
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

// ─── Icons ───
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#ff6b00] shrink-0 mt-0.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mx-auto mb-2 text-gray-400">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mx-auto mb-2 text-gray-400">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const AwardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mx-auto mb-2 text-gray-400">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// ─── Programs Data ───
const programs = [
    {
        title: 'CEH Masterclass | v13 AI',
        certInfo: null,
        subtitle: 'The Gold Standard in Hacking',
        features: [
            "Master Real-World Ethical Hacking with AI-Powered Labs",
            "Globally Recognized, Fully Proctored Practical Certification",
            "Become Job-Ready with AI-Enhanced Training",
            "Official EC-Council Materials & Vouchers"
        ],
        meta: {
            duration: '4 Months',
            hours: '100+ Hours',
            certs: '3 Global Certs'
        },
        badge: 'Fastest Path',
        accent: '#ff6b00',
        link: 'https://www.ehackacademy.com/programs/masterclass-ethical-hacking-ceh-v13',
        certificateImages: [
            "/certificates/masterclass-2.jpeg",
            "/certificates/masterclass-3.jpeg",
            "/certificates/cert-ceh.jpg"
        ],
        marqueeCerts: ["CEH", "CEH Practical", "CEH Master"]
    },
    {
        title: 'Job-Ready Program',
        certInfo: '(2 Global Certifications)',
        subtitle: 'Comprehensive Career Foundation',
        features: [
            "Industry-Integrated AI-Powered Curriculum",
            "Live Labs, Real Attack Simulations & Tool Mastery",
            "Career-Launch Focus with Global Certification Pathways",
            "CND & CSCU Certification Modules"
        ],
        meta: {
            duration: '7-9 Months',
            hours: '200+ Hours',
            certs: '2 Global Certs'
        },
        badge: 'Most Popular',
        accent: '#ff6b00',
        featured: true,
        link: 'https://www.ehackacademy.com/programs/graduate-cybersecurity',
        certificateImages: [
            "/certificates/cert-cscu.jpg",
            "/certificates/certificate-cnd.jpg"
        ],
        marqueeCerts: ["CSCU", "CND"]
    },
    {
        title: "Advanced Program",
        certInfo: '(6 Global Certifications)',
        subtitle: 'Advanced Leadership Training',
        features: [
            "Advanced AI-Driven Cybersecurity Mastery",
            "Real-World Cyber Range & Enterprise Attack Simulations",
            "Leadership Role - Focused Career Acceleration",
            "6 Global Certifications Bundle"
        ],
        meta: {
            duration: '9-12 Months',
            hours: '300+ Hours',
            certs: '6 Global Certs'
        },
        badge: 'Elite Level',
        accent: '#ff6b00',
        link: 'https://www.ehackacademy.com/programs/masters-ethical-hacking',
        certificateImages: [
            "/certificates/cert-ceh.jpg",
            "/certificates/cert-cpent.jpg",
            "/certificates/cert-chfi.jpg",
            "/certificates/certificate-cnd.jpg",
            "/certificates/cert-cscu.jpg",
            "/certificates/lpt-certification.jpg"
        ],
        marqueeCerts: ["CSCU", "CND", "CEH", "CHFI", "CPENT", "LPT"]
    }
];

// ─── Lead Capture Modal ───
interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    leadSource?: string;
}

const LeadCaptureModal: React.FC<LeadModalProps> = ({ isOpen, onClose, leadSource = 'Career Roadmap Request' }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const mountTimeRef = useRef<number>(Date.now());
    const overlayRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<LeadFormValues>({
        resolver: zodResolver(leadFormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            currentStatus: '',
            experience: '',
            website: '',
        },
    });

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            mountTimeRef.current = Date.now();
            setIsSubmitted(false);
            setGeneralError('');
            reset();
        }
    }, [isOpen, reset]);

    // Animate in/out
    useEffect(() => {
        if (!overlayRef.current || !panelRef.current) return;
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.fromTo(panelRef.current, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.4)', delay: 0.1 });
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleClose = () => {
        if (!overlayRef.current || !panelRef.current) { onClose(); return; }
        gsap.to(panelRef.current, { opacity: 0, y: 30, scale: 0.95, duration: 0.25, ease: 'power2.in' });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in', delay: 0.05, onComplete: onClose });
    };

    const onSubmit = async (data: LeadFormValues) => {
        // Honeypot
        if (data.website) { setIsSubmitted(true); return; }
        // Time-based bot check
        if (Date.now() - mountTimeRef.current < 2000) { setIsSubmitted(true); return; }

        setIsSubmitting(true);
        setGeneralError('');

        try {
            const response = await fetch('/api/zoho/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: data.fullName,
                    lastName: '-',
                    email: data.email.toLowerCase(),
                    phone: data.phone,
                    city: '',
                    totalAmount: 0,
                    inquiryName: `Website - ${data.fullName} - ${leadSource}`,
                    leadSource: 'Website Landing Page - Career Roadmap CTA',
                    courses: [{
                        name: leadSource,
                        code: leadSource.toLowerCase().replace(/\s+/g, '-'),
                        category: 'Cybersecurity',
                        price: 0,
                    }],
                    message: `${leadSource}\nCurrent Status: ${data.currentStatus}\nExperience Level: ${data.experience}\nSource: ${leadSource}`,
                    agreeWhatsApp: true,
                    pipeline: 'eHack Academy Leads',
                    stage: 'New Inquiry',
                    website: data.website,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.details || 'Failed to submit');
            }

            localStorage.setItem('ehack_hero_form_submitted', 'true');
            setIsSubmitted(true);

            // Google Ads Conversion
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'conversion', {
                    send_to: 'AW-17944571400/8OiVCJHss_cbEIjc0exC',
                    value: 1.0,
                    currency: 'INR',
                    event_callback: () => {},
                });
            }

            reset();
        } catch (err: any) {
            console.error('Error submitting form:', err);
            setGeneralError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div ref={overlayRef} className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ opacity: 0 }}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

            {/* Modal Panel */}
            <div ref={panelRef} className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ opacity: 0 }}>

                {/* Header */}
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 p-6 pb-5">
                    <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 cursor-pointer">
                        <CloseIcon />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-[#ff6b00] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">Free Guidance</span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-1">Your Personalized Career Roadmap</h3>
                    <p className="text-sm text-gray-300">Expert-crafted plan tailored to your goals</p>
                </div>

                {/* Body */}
                <div className="p-6">
                    {isSubmitted ? (
                        <div className="text-center py-8 animate-fadeIn">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re All Set! 🎉</h3>
                            <p className="text-sm text-gray-600 mb-1">Our industry expert will reach out to you shortly with your personalized career roadmap.</p>
                            <p className="text-xs text-gray-400 mt-3">Expect a call within 24 hours.</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-gray-600 mb-5">
                                Tell us a bit about yourself so we can guide you to the <span className="font-bold text-gray-900">right learning path</span>.
                            </p>

                            {generalError && <div className="mb-4 p-3 text-xs text-red-600 bg-red-50 rounded-lg border border-red-100 text-center">{generalError}</div>}

                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                                {/* Honeypot */}
                                <input type="text" autoComplete="off" tabIndex={-1} aria-hidden="true" {...register('website')} style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, width: 0 }} />

                                {/* Name */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Full Name *"
                                        {...register('fullName')}
                                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${errors.fullName ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]'}`}
                                    />
                                    {errors.fullName && <p className="mt-1 text-[11px] text-red-500">{errors.fullName.message}</p>}
                                </div>

                                {/* Phone & Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="Phone (10 digits) *"
                                            maxLength={10}
                                            {...register('phone', {
                                                onChange: (e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                    setValue('phone', val);
                                                },
                                            })}
                                            className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]'}`}
                                        />
                                        {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone.message}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email Address *"
                                            {...register('email')}
                                            className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]'}`}
                                        />
                                        {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email.message}</p>}
                                    </div>
                                </div>

                                {/* Current Status */}
                                <div>
                                    <select
                                        {...register('currentStatus')}
                                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all appearance-none cursor-pointer ${errors.currentStatus ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]'}`}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Where are you in your career? *</option>
                                        <option value="Student">Student (Pursuing Degree)</option>
                                        <option value="Fresher">Fresher (Recently Graduated)</option>
                                        <option value="Working Professional - Non IT">Working Professional - Non IT</option>
                                        <option value="Working Professional - IT">Working Professional - IT</option>
                                        <option value="Working Professional - Cybersecurity">Working Professional - Cybersecurity</option>
                                    </select>
                                    {errors.currentStatus && <p className="mt-1 text-[11px] text-red-500">{errors.currentStatus.message}</p>}
                                </div>

                                {/* Experience Level */}
                                <div>
                                    <select
                                        {...register('experience')}
                                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all appearance-none cursor-pointer ${errors.experience ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]'}`}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Your cybersecurity experience *</option>
                                        <option value="No Experience">No Experience - Complete Beginner</option>
                                        <option value="Self-Taught">Self-Taught (YouTube / Online courses)</option>
                                        <option value="0-1 Years">0-1 Years Professional Experience</option>
                                        <option value="1-3 Years">1-3 Years Professional Experience</option>
                                        <option value="3+ Years">3+ Years Professional Experience</option>
                                    </select>
                                    {errors.experience && <p className="mt-1 text-[11px] text-red-500">{errors.experience.message}</p>}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#ff6b00] hover:bg-[#e66000] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#ff6b00]/20 hover:shadow-xl hover:shadow-[#ff6b00]/30 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed text-sm cursor-pointer"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Get Your Personalized Roadmap
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="text-center text-[10px] text-gray-400 mt-3">
                                🔒 Your data is safe. We never spam or share your information.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


// ═══════════════════════════════════════
//              MAIN SECTION
// ═══════════════════════════════════════
const SolutionSection = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [leadSource, setLeadSource] = useState('Career Roadmap Request');

    // Global event listener for modal
    useEffect(() => {
        const handleOpenModal = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail?.source) {
                setLeadSource(customEvent.detail.source);
            } else {
                setLeadSource('Career Roadmap Request');
            }
            setModalOpen(true);
        };
        const handleCloseModal = () => setModalOpen(false);

        window.addEventListener('openGlobalLeadModal', handleOpenModal);
        window.addEventListener('closeGlobalLeadModal', handleCloseModal);

        return () => {
            window.removeEventListener('openGlobalLeadModal', handleOpenModal);
            window.removeEventListener('closeGlobalLeadModal', handleCloseModal);
        };
    }, []);

    const handleMouseEnter = (index: number) => {
        if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        leaveTimeout.current = setTimeout(() => {
            setHoveredCard(null);
        }, 200);
    };

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <>
            <section ref={sectionRef} className="py-16 md:py-24 bg-slate-50 text-gray-900 overflow-hidden relative border-t border-gray-200">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                    }}
                ></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1300px] relative z-10">

                    {/* Header */}
                    <div className="text-center mb-10 max-w-4xl mx-auto">
                        <h2 className="text-[#ff6b00] font-bold tracking-widest uppercase mb-4 text-sm md:text-base">The Roadmap</h2>
                        <h3 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                            How You Can <span className="text-[#ff6b00]">Finally Become</span> An Ethical Hacker
                        </h3>
                        <p className="text-[#1f2937] text-lg md:text-xl max-w-2xl mx-auto">
                            Stop the endless loop of tutorials. Choose a structured path designed by industry experts to take you from zero to job-ready.
                        </p>
                    </div>

                    {/* ─── CTA Button + Description ─── */}
                    <div className="mb-12 max-w-2xl mx-auto text-center">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="group relative inline-flex items-center justify-center gap-3 bg-[#ff6b00] hover:bg-[#e66000] text-white font-black text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl shadow-xl shadow-[#ff6b00]/20 hover:shadow-2xl hover:shadow-[#ff6b00]/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer border-b-4 border-[#cc5500] active:border-b-0 active:translate-y-1"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            GET YOUR FREE CAREER ROADMAP
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>

                            {/* Shine effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 rounded-xl" />
                        </button>
                        <p className="mt-4 text-gray-500 text-sm sm:text-base font-medium leading-relaxed max-w-xl mx-auto">
                            Tell us a little about yourself to get <span className="text-[#ff6b00] font-bold">free guidance</span> from our industry experts and kickstart your journey in cybersecurity — no commitment, just clarity.
                        </p>
                    </div>

                    {/* Solutions Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        {programs.map((program, index) => (
                            <div
                                key={index}
                                ref={addToRefs}
                                className={`bg-white border rounded-2xl p-5 sm:p-8 transition-all duration-500 group shadow-lg flex flex-col h-full relative ${index === hoveredCard
                                    ? 'z-[100] border-[#ff6b00] ring-4 ring-[#ff6b00]/10 shadow-2xl'
                                    : (program.featured ? 'border-[#ff6b00] ring-1 ring-[#ff6b00]/20 z-10' : 'border-gray-200 z-0 hover:border-[#ff6b00]/30 shadow-md')
                                    }`}
                            >
                                {/* Badge */}
                                <div className={`absolute -top-3 left-8 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${program.featured ? 'bg-[#ff6b00] text-white' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {program.badge}
                                </div>

                                <div className="mb-6 mt-2">
                                    <h4 className="text-xl lg:text-2xl font-black mb-2 text-[#1f2937]">
                                        {program.title}
                                        {program.certInfo && (
                                            <span className="block text-lg font-extrabold text-gray-500 mt-1">{program.certInfo}</span>
                                        )}
                                    </h4>
                                    <p className="text-[#ff6b00] font-bold text-sm uppercase tracking-wide">{program.subtitle}</p>
                                </div>

                                <div className="space-y-4 mb-8 flex-1">
                                    {program.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <CheckIcon />
                                            <p className="text-[#4b5563] text-sm font-medium leading-relaxed">{feature}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Meta Info */}
                                <div className="grid grid-cols-3 gap-2 py-6 border-y border-gray-100 mb-8">
                                    <div className="text-center">
                                        <ClockIcon />
                                        <p className="text-[10px] uppercase text-gray-500 font-bold">Duration</p>
                                        <p className="text-xs font-black text-[#1f2937]">{program.meta.duration}</p>
                                    </div>
                                    <div className="text-center border-x border-gray-100">
                                        <UsersIcon />
                                        <p className="text-[10px] uppercase text-gray-500 font-bold">Hours</p>
                                        <p className="text-xs font-black text-[#1f2937]">{program.meta.hours}</p>
                                    </div>
                                    <div className="text-center">
                                        <AwardIcon />
                                        <p className="text-[10px] uppercase text-gray-500 font-bold">Certs</p>
                                        <p className="text-xs font-black text-[#1f2937]">{program.meta.certs}</p>
                                    </div>
                                </div>

                                {/* Marquee Certification Strip */}
                                {program.marqueeCerts && (
                                    <div className="w-full bg-gray-50/80 py-2 border-y border-gray-100/50 mb-2 overflow-hidden flex whitespace-nowrap mask-fade-edges h-10 items-center">
                                        <style dangerouslySetInnerHTML={{
                                            __html: `
                                            @keyframes marquee {
                                                0% { transform: translateX(0); }
                                                100% { transform: translateX(-50%); }
                                            }
                                            .animate-marquee {
                                                display: flex;
                                                animation: marquee 20s linear infinite;
                                                width: max-content;
                                            }
                                            .mask-fade-edges {
                                                mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                                            }
                                        `}} />
                                        <div className="animate-marquee gap-8 items-center px-4">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="flex gap-8 items-center">
                                                    {program.marqueeCerts?.map((cert, idx) => (
                                                        <span key={`${i}-${idx}`} className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center">
                                                            <span className="text-[#ff6b00]">{cert.substring(0, 2)}</span>
                                                            <span className="text-gray-900">{cert.substring(2)}</span>
                                                            <span className="mx-6 text-gray-300 font-light translate-y-[0.5px]">|</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Certification Spread in Cards */}
                                {program.certificateImages && (
                                    <div
                                        className="relative h-32 sm:h-44 mb-10 sm:mb-14 mt-4 flex justify-center items-center cursor-pointer"
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className={`absolute -inset-x-20 -inset-y-10 z-0 transition-opacity duration-300 ${index === hoveredCard ? 'block' : 'hidden'}`}></div>

                                        {program.certificateImages.map((img, imgIdx) => {
                                            const total = program.certificateImages!.length;
                                            const offset = imgIdx - (total - 1) / 2;
                                            const isHovered = hoveredCard === index;

                                            const spreadValue = total > 3 ? 90 : 110;
                                            const xPos = isHovered ? offset * spreadValue : offset * (total > 3 ? 15 : 25);
                                            const rotationValue = total > 3 ? 12 : 18;
                                            const rotation = isHovered ? offset * rotationValue : offset * (total > 3 ? 5 : 8);
                                            const yPos = isHovered ? Math.pow(offset, 2) * (total > 3 ? 15 : 20) + (total > 3 ? 10 : 15) : Math.abs(offset) * (total > 3 ? 5 : 8);
                                            const scale = isHovered ? (imgIdx === Math.floor(total / 2) ? 1.55 : 1.4) : 1;

                                            return (
                                                <div
                                                    key={imgIdx}
                                                    className="absolute h-[130px] rounded-md border-2 border-white shadow-2xl overflow-hidden bg-white flex items-center justify-center pointer-events-none transition-all duration-500"
                                                    style={{
                                                        zIndex: isHovered ? Math.round(100 - Math.abs(offset) * 10) : (total - imgIdx),
                                                        transform: `translateX(${xPos}px) rotate(${rotation}deg) translateY(${yPos}px) scale(${scale})`,
                                                        willChange: 'transform, opacity',
                                                        transitionTimingFunction: 'cubic-bezier(0.2, 1, 0.3, 1)'
                                                    }}
                                                >
                                                    <img src={img} alt={`Certificate ${imgIdx + 1}`} className="h-full w-auto object-contain" />
                                                    <div className="absolute inset-0 bg-black/[0.01]"></div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Explore Program Link */}
                                <a
                                    href={program.link}
                                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto ${program.featured
                                        ? 'bg-[#ff6b00] text-white hover:bg-[#e66000] shadow-md shadow-[#ff6b00]/20'
                                        : 'bg-gray-900 text-white hover:bg-black'
                                        }`}
                                >
                                    Explore Program
                                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Path Footer */}
                    <div className="mt-16 text-center">
                        <p className="text-gray-500 font-medium italic text-sm">
                            * All programs include intensive hands-on labs and placement assistance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Lead Capture Modal */}
            <LeadCaptureModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                leadSource={leadSource}
            />
        </>
    );
};

export default SolutionSection;
