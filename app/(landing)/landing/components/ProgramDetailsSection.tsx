"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackProgramEnquireCTAClicked, trackFormStarted, trackFormSubmitted, trackFormError } from '@/lib/posthog-events';

gsap.registerPlugin(ScrollTrigger);

// --- Validation Schema ---
const inquirySchema = z.object({
    fullName: z.string().trim()
        .min(1, "Please enter your full name")
        .min(2, "Name must be at least 2 characters"),
    email: z.string().trim()
        .min(1, "Please enter your email address")
        .email("Please enter a valid email address"),
    phone: z.string().trim()
        .min(1, "Please enter your phone number")
        .length(10, "Please enter a valid 10-digit phone number")
        .regex(/^[6-9]/, "Phone number must start with 6, 7, 8, or 9")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    website: z.string().optional(), // Honeypot field
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

const programs = [
    {
        name: "Masterclass",
        highlight: false,
        details: {
            startDate: "5th of Every Month",
            duration: "4 Months",
            mode: "Classroom + Live Online",
            hours: "100+ Hours",
            membership: "6 Months Membership",
            certifications: "3 Global Certifications",
            ecCouncilCerts: "CEH v13, CEH Practicals, CEH Masters",
            ehackCerts: "Nil",
            careerTraining: "Nil",
            emi: "₹28,750"
        }
    },
    {
        name: "Graduate",
        highlight: true,
        details: {
            startDate: "5th of Every Month",
            duration: "7-9 Months",
            mode: "Classroom + Live Online",
            hours: "200+ Hours",
            membership: "2 Years",
            certifications: "2 Global Certifications",
            ecCouncilCerts: "CSCU, CND v3",
            ehackCerts: "Cyber Security Fundamentals, Ethical Hacking, Penetration Testing / Digital Forensics, OWASP 10",
            careerTraining: "Personality Development & Soft Skills",
            emi: "₹29,750"
        }
    },
    {
        name: "Masters",
        highlight: false,
        details: {
            startDate: "5th of Every Month",
            duration: "9-12 Months",
            mode: "Classroom + Live Online",
            hours: "300+ Hours",
            membership: "2 Years Support",
            certifications: "6 Global Certifications",
            ecCouncilCerts: "CSCU, CND v3, CEH v13, Cpent v2+LPT, CHFI v11",
            ehackCerts: "Cyber Security Fundamentals, OWASP 10",
            careerTraining: "Personality Development & Soft Skills",
            emi: "₹50,000"
        }
    }
];

const rows = [
    { label: "Start Date", key: "startDate" },
    { label: "Duration", key: "duration" },
    { label: "Mode", key: "mode" },
    { label: "Total Hours", key: "hours" },
    { label: "Membership", key: "membership" },
    { label: "Global Certification", key: "certifications" },
    { label: "EC Council Certifications", key: "ecCouncilCerts" },
    { label: "Ehack Academy Certifications", key: "ehackCerts" },
    { label: "Career Development Training", key: "careerTraining" },
    { label: "EMI Options", key: "emi" },
];

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const formStartedRef = useRef(false);

    // Time-based bot detection — record mount time when modal opens
    const mountTimeRef = useRef<number>(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<InquiryFormValues>({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            website: ''
        }
    });

    // Reset state and set mount time when modal opens
    useEffect(() => {
        if (isOpen) {
            setIsSubmitted(false);
            setGeneralError('');
            reset();
            mountTimeRef.current = Date.now();
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data: InquiryFormValues) => {
        // Bot check 1: Honeypot — if the hidden field is filled, silently "succeed"
        if (data.website) {
            setIsSubmitted(true);
            return;
        }

        // Bot check 2: Time-based — if submitted within 2 seconds of modal opening, silently "succeed"
        if (Date.now() - mountTimeRef.current < 2000) {
            setIsSubmitted(true);
            return;
        }

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
                    inquiryName: `Website - ${data.fullName} - Choose Your Path`,
                    leadSource: 'Website Landing Page',
                    courses: [{
                        name: 'Choose Your Path Inquiry',
                        code: 'choose-your-path',
                        category: 'General',
                        price: 0
                    }],
                    message: 'Inquiry from Choose Your Path Section',
                    agreeWhatsApp: true,
                    pipeline: 'Leads Pipeline Standard',
                    stage: 'New Inquiry',
                    website: data.website,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.details || 'Failed to submit');
            }

            setIsSubmitted(true);
            trackFormSubmitted('program_enquiry');
            localStorage.setItem('ehack_hero_form_submitted', 'true');

            // Google Ads Conversion Event
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-17944571400/8OiVCJHss_cbEIjc0exC',
                    'value': 1.0,
                    'currency': 'INR',
                    'event_callback': () => { }
                });
            }
        } catch (err: any) {
            console.error('Error submitting form:', err);
            setGeneralError(err.message || 'Something went wrong. Please try again.');
            trackFormError('program_enquiry', err.message || 'Unknown error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            <div className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {isSubmitted ? (
                    <div className="text-center py-8 animate-fadeIn">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                        <p className="text-gray-600 mb-6">We have received your enquiry. Our team will contact you shortly to guide you on your path.</p>
                        <button
                            onClick={onClose}
                            className="w-full bg-[#ff6b00] text-white rounded-xl py-3 font-bold shadow-lg hover:bg-[#e66000] transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-black text-[#1f2937] mb-2">Enquire Now</h3>
                            <p className="text-gray-500 text-sm">Get detailed counseling for your career path.</p>
                        </div>

                        {generalError && <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 text-center">{generalError}</div>}

                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate
                            onFocus={() => {
                                if (!formStartedRef.current) {
                                    formStartedRef.current = true;
                                    trackFormStarted('program_enquiry');
                                }
                            }}
                        >
                            {/* Honeypot field — invisible to real users, bots auto-fill it */}
                            <input
                                type="text"
                                autoComplete="off"
                                tabIndex={-1}
                                aria-hidden="true"
                                {...register("website")}
                                style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, width: 0 }}
                            />

                            <div>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    {...register("fullName")}
                                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none transition-all font-medium ${errors.fullName ? 'border-red-400 focus:ring-2 focus:ring-red-400/10' : 'border-gray-100 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10'}`}
                                />
                                {errors.fullName && <p className="mt-1 text-[11px] text-red-500 pl-1">{errors.fullName.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    {...register("email")}
                                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none transition-all font-medium ${errors.email ? 'border-red-400 focus:ring-2 focus:ring-red-400/10' : 'border-gray-100 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10'}`}
                                />
                                {errors.email && <p className="mt-1 text-[11px] text-red-500 pl-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="Phone Number *"
                                    maxLength={10}
                                    {...register("phone", {
                                        onChange: (e) => {
                                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            setValue("phone", val);
                                        }
                                    })}
                                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none transition-all font-medium ${errors.phone ? 'border-red-400 focus:ring-2 focus:ring-red-400/10' : 'border-gray-100 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10'}`}
                                />
                                {errors.phone && <p className="mt-1 text-[11px] text-red-500 pl-1">{errors.phone.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#ff6b00] text-white rounded-xl py-4 font-bold shadow-lg shadow-[#ff6b00]/20 hover:bg-[#e66000] hover:shadow-xl hover:shadow-[#ff6b00]/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default function ProgramDetailsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(tableRef.current, {
                y: 10,
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: tableRef.current,
                    start: "top 98%"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-6 sm:py-10 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-12">
                    <span className="text-[#ff6b00] font-bold tracking-widest uppercase mb-4 text-sm md:text-base block">
                        Compare Programs
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight text-[#1f2937]">
                        Choose Your <span className="text-[#ff6b00]">Path</span>
                    </h3>
                    <p className="text-[#1f2937] text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                        Detailed breakdown of our elite cybersecurity programs to help you decide.
                    </p>
                </div>

                <div ref={tableRef}>
                    {/* ===== MOBILE: Stacked Program Cards (visible below md) ===== */}
                    <div className="md:hidden space-y-4">
                        {programs.map((prog, idx) => (
                            <div key={idx} className={`rounded-2xl shadow-lg border-2 overflow-hidden ${prog.highlight ? 'border-[#ff6b00]' : 'border-gray-200'}`}>
                                {/* Card Header */}
                                <div className={`p-4 text-center ${prog.highlight ? 'bg-[#ff6b00] text-white' : 'bg-gray-50 text-[#1f2937]'}`}>
                                    {prog.highlight && (
                                        <span className="inline-block bg-white text-[#ff6b00] text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full mb-2">Most Popular</span>
                                    )}
                                    <h4 className="text-xl font-black">{prog.name}</h4>
                                </div>
                                {/* Card Body - Feature Rows */}
                                <div className="divide-y divide-gray-100">
                                    {rows.map((row, rIdx) => (
                                        <div key={rIdx} className="flex justify-between items-start px-4 py-3">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide w-[40%] shrink-0">{row.label}</span>
                                            <span className="text-sm font-medium text-[#1f2937] text-right">
                                                {row.key === 'emi' ? (
                                                    <>
                                                        <span className="font-bold text-gray-700">Starting at </span>
                                                        {prog.details[row.key as keyof typeof prog.details]}
                                                    </>
                                                ) : (
                                                    prog.details[row.key as keyof typeof prog.details]
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                    {/* Common features */}
                                    {["Placement Support", "Internship", "24/7 Labs"].map((feature, fIdx) => (
                                        <div key={fIdx} className="flex justify-between items-center px-4 py-3">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide w-[40%] shrink-0">{feature}</span>
                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                                                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                </span>
                                                Included
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Mobile Schedule Footer */}
                        <div className="bg-gray-900 text-white p-5 rounded-2xl text-center">
                            <h5 className="font-bold uppercase tracking-widest text-[#ff6b00] text-xs mb-2">Schedule Options</h5>
                            <p className="text-sm font-medium">
                                <span className="block mb-1">Weekday (Tue-Fri): <span className="font-bold">2 hrs/day</span></span>
                                <span className="block">Weekend (Sat-Sun): <span className="font-bold">4 hrs/day</span></span>
                            </p>
                        </div>
                    </div>

                    {/* ===== DESKTOP: Original Comparison Table (visible md+) ===== */}
                    <div className="hidden md:block overflow-hidden bg-white rounded-3xl shadow-xl border-2 border-[#ff6b00]">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-6 text-left w-1/4 bg-gray-50 border-b border-r border-gray-300 border-gray-100">
                                        <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">Features</span>
                                    </th>
                                    {programs.map((prog, idx) => (
                                        <th key={idx} className={`p-6 text-center w-1/4 border-b border-r border-gray-300 last:border-r-0 border-gray-100 ${prog.highlight ? 'bg-[#ff6b00]/5' : 'bg-white'}`}>
                                            <h4 className={`text-xl font-black ${prog.highlight ? 'text-[#ff6b00]' : 'text-[#1f2937]'}`}>
                                                {prog.name}
                                            </h4>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-5 border-b border-r border-gray-300 border-gray-100 font-bold text-[#1f2937] text-base pl-8">
                                            {row.label}
                                        </td>
                                        {programs.map((prog, pIdx) => (
                                            <td key={pIdx} className={`p-5 text-center border-b border-r border-gray-300 last:border-r-0 border-gray-100 text-gray-600 font-medium ${prog.highlight ? 'bg-[#ff6b00]/5' : ''}`}>
                                                {row.key === 'emi' ? (
                                                    <>
                                                        <span className="font-bold text-gray-700">Starting at  </span>
                                                        {prog.details[row.key as keyof typeof prog.details]}
                                                    </>
                                                ) : (
                                                    prog.details[row.key as keyof typeof prog.details]
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {
                                    /* Common Features Rows */
                                }
                                {[
                                    { label: "Placement Support", value: "Included" },
                                    { label: "Internship", value: "Included" },
                                    { label: "24/7 Labs", value: "Included" },
                                ].map((common, cIdx) => (
                                    <tr key={cIdx} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-5 border-b border-r border-gray-300 border-gray-100 font-bold text-[#1f2937] text-base pl-8">
                                            {common.label}
                                        </td>
                                        {programs.map((prog, idx) => (
                                            <td key={idx} className={`p-5 text-center border-b border-r border-gray-300 last:border-r-0 border-gray-100 text-gray-600 font-medium ${prog.highlight ? 'bg-[#ff6b00]/5' : ''}`}>
                                                <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                </span>
                                                <span className="ml-2">{common.value}</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Schedule Footer */}
                        <div className="bg-gray-900 text-white p-6 text-center">
                            <h5 className="font-bold uppercase tracking-widest text-[#ff6b00] text-sm mb-3">Schedule Options</h5>
                            <p className="text-lg font-medium">
                                <span>Weekday (Tue-Fri): <span className="text-white font-bold">2 hrs/day</span></span>
                                <span className="mx-4 text-gray-600">|</span>
                                <span>Weekend (Sat-Sun): <span className="text-white font-bold">4 hrs/day</span></span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <button
                        onClick={() => { trackProgramEnquireCTAClicked(); setIsModalOpen(true); }}
                        className="inline-flex items-center gap-2 sm:gap-3 bg-[#ff6b00] text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-[#ff6b00]/20 hover:bg-[#e66000] hover:scale-105 transition-all group"
                    >
                        ENQUIRE NOW
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                    <p className="mt-4 text-gray-600 text-lg sm:text-xl font-semibold">
                        Speak to our career counselors starting at <span className="text-[#1f2937] font-bold text-xl sm:text-2xl">₹0</span>
                    </p>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </section>
    );
}
