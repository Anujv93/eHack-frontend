"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { trackFormStarted, trackFormSubmitted, trackFormError } from '@/lib/posthog-events';

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

const HeroRightPanel = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const formStartedRef = useRef(false);

    // Time-based bot detection — record mount time
    const mountTimeRef = useRef<number>(Date.now());

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
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



    const onSubmit = async (data: InquiryFormValues) => {
        // Bot check 1: Honeypot — if the hidden field is filled, silently "succeed"
        if (data.website) {
            setIsSubmitted(true);
            return;
        }

        // Bot check 2: Time-based — if submitted within 2 seconds of mount, silently "succeed"
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
                    inquiryName: `Website - ${data.fullName} - Landing Page Hero`,
                    leadSource: 'Website Landing Page',
                    courses: [{
                        name: 'Landing Page Hero Inquiry',
                        code: 'landing-hero',
                        category: 'General',
                        price: 0
                    }],
                    message: 'Inquiry from Landing Page Hero Section',
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
            trackFormSubmitted('hero');

            // Mark hero form as submitted for other sections
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
            reset();
        } catch (err: any) {
            console.error('Error submitting form:', err);
            setGeneralError(err.message || 'Something went wrong. Please try again.');
            trackFormError('hero', err.message || 'Unknown error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-[450px] sm:max-w-[550px] mx-auto perspective-1000 relative z-20">

            {/* ================= YOUTUBE VIDEO ================= */}
            <div className="group relative z-30">
                {/* Glow behind video */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

                {/* Video Container */}
                <div className="relative w-full aspect-video bg-black rounded-t-2xl rounded-b-none overflow-hidden shadow-2xl border border-gray-800 border-b-0">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/UrH9MuspUjQ?rel=0"
                        title="eHack Academy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>

            {/* ================= SEPARATE FORM CARD ================= */}
            <div id="hero-inquiry-form" className="bg-white rounded-b-2xl rounded-t-none shadow-xl border border-gray-200 border-t-0 overflow-hidden relative z-20">
                <div className="p-3 sm:p-4">
                    {isSubmitted ? (
                        <div className="text-center py-8 animate-fadeIn">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Request Received!</h3>
                            <p className="text-sm text-gray-600">Our team will contact you shortly.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                                <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                                    Request <span className="text-[#ff6b00]">Access</span>
                                </h3>
                                <div className="flex items-center gap-2 px-2 py-1 bg-green-50 rounded-full border border-green-100">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">Admissions Open</span>
                                </div>
                            </div>

                            {generalError && <div className="mb-3 p-2 text-xs text-red-600 bg-red-50 rounded-md border border-red-100 text-center">{generalError}</div>}

                            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate
                                onFocus={() => {
                                    if (!formStartedRef.current) {
                                        formStartedRef.current = true;
                                        trackFormStarted('hero');
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

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            {...register("fullName")}
                                            className={`w-full bg-gray-50 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none transition-all ${errors.fullName ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]'}`}
                                        />
                                        {errors.fullName && <p className="mt-1 text-[11px] text-red-500">{errors.fullName.message}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="Phone (10 digits)"
                                            maxLength={10}
                                            {...register("phone", {
                                                onChange: (e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                    setValue("phone", val);
                                                }
                                            })}
                                            className={`w-full bg-gray-50 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none transition-all ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]'}`}
                                        />
                                        {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        {...register("email")}
                                        className={`w-full bg-gray-50 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none transition-all ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]'}`}
                                    />
                                    {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#1a1a1a] hover:bg-black text-white font-bold py-3 sm:py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Processing...' : 'Book Your Spot'}
                                    {!isSubmitting && <svg className="w-4 h-4 text-[#ff6b00] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>}
                                </button>
                            </form>

                            <p className="text-center text-[10px] text-gray-400 mt-2 sm:mt-4">
                                Limited spots available for the upcoming cohort.
                            </p>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
};

export default HeroRightPanel;
