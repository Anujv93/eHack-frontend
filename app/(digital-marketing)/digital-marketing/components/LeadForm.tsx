'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// --- Validation Schema ---
const inquirySchema = z.object({
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
    purpose: z.string().min(1, 'Please select a purpose'),
    website: z.string().optional(), // Honeypot field
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

interface LeadFormProps {
    customTitle?: React.ReactNode;
    customSubtitle?: string;
    customButtonText?: string;
    showDigitalMarketingTag?: boolean;
    noShadow?: boolean;
    paddingClass?: string;
    hideSubtitle?: boolean;
    hideTerms?: boolean;
    isCompact?: boolean;
    formSource?: string;
    onSuccess?: () => void;
}

export default function LeadForm({
    customTitle,
    customSubtitle,
    customButtonText,
    showDigitalMarketingTag = true,
    noShadow = false,
    paddingClass = 'p-6 sm:p-8',
    hideSubtitle = false,
    hideTerms = false,
    isCompact = false,
    formSource = 'Digital Marketing Landing Page',
    onSuccess
}: LeadFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [generalError, setGeneralError] = useState('');

    // Time-based bot detection — record mount time
    const mountTimeRef = useRef<number>(Date.now());

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
            purpose: '',
            website: ''
        }
    });

    const purposeLabels: Record<string, string> = {
        course_inquiry: 'Course Inquiry',
        career_counseling: 'Career Counseling',
        corporate_training: 'Corporate Training',
    };

    const onSubmit = async (data: InquiryFormValues) => {
        console.log('[DM LeadForm] onSubmit called with data:', JSON.stringify(data));

        // Bot check 1: Honeypot — if the hidden field is filled, silently "succeed"
        if (data.website) {
            console.log('[DM LeadForm] ❌ Honeypot triggered — silent success');
            setIsSubmitted(true);
            return;
        }

        // Bot check 2: Time-based — if submitted within 2 seconds of mount, silently "succeed"
        const elapsed = Date.now() - mountTimeRef.current;
        console.log(`[DM LeadForm] Time since mount: ${elapsed}ms`);
        if (elapsed < 2000) {
            console.log('[DM LeadForm] ❌ Time-based bot check triggered — silent success');
            setIsSubmitted(true);
            return;
        }

        console.log('[DM LeadForm] ✅ Bot checks passed, calling API...');
        setIsSubmitting(true);
        setGeneralError('');

        try {
            const payload = {
                firstName: data.fullName,
                lastName: '-',
                email: data.email.toLowerCase(),
                phone: data.phone,
                city: '',
                totalAmount: 0,
                inquiryName: `DM Diploma - ${data.fullName} - ${purposeLabels[data.purpose] || data.purpose}`,
                leadSource: formSource,
                courses: [{
                    name: 'Digital Marketing Diploma',
                    code: 'dm-diploma',
                    category: 'Digital Marketing',
                    price: 0
                }],
                message: `Purpose: ${purposeLabels[data.purpose] || data.purpose}\nSource: ${formSource}`,
                agreeWhatsApp: true,
                pipeline: 'Digital Marketing Leads',
                stage: 'New Inquiry',
                website: data.website,
            };
            console.log('[DM LeadForm] Sending payload to /api/zoho/inquiry:', JSON.stringify(payload));

            const response = await fetch('/api/zoho/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            console.log('[DM LeadForm] API response status:', response.status);
            const responseData = await response.json().catch(() => ({}));
            console.log('[DM LeadForm] API response body:', JSON.stringify(responseData));

            if (!response.ok) {
                throw new Error(responseData.details || 'Failed to submit');
            }

            console.log('[DM LeadForm] ✅ SUCCESS! Deal created:', responseData.dealId);
            setIsSubmitted(true);
            if (onSuccess) {
                onSuccess();
            }

            // Mark DM form as submitted for other sections
            localStorage.setItem('ehack_dm_form_submitted', 'true');

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
            console.error('[DM LeadForm] ❌ ERROR:', err);
            setGeneralError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`bg-white rounded-2xl ${noShadow ? '' : 'shadow-[0_10px_40px_-10px_rgba(255,107,0,0.15)] border border-[#ff6b00]/20'} ${paddingClass} w-full max-w-[420px] mx-auto relative z-10`}>
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
                    <div className="mb-4">
                        {customTitle ? (
                            customTitle
                        ) : (
                            <h3 className={`${isCompact ? 'text-lg sm:text-xl mb-0.5' : 'text-xl sm:text-2xl mb-1'} font-bold text-gray-900`}>
                                Talk to a <span className="text-[#ff6b00]">Consultant</span>
                            </h3>
                        )}

                        {customSubtitle !== undefined ? (
                            customSubtitle && <p className="text-sm text-gray-500 mt-1">{customSubtitle}</p>
                        ) : (
                            !hideSubtitle && <p className="text-sm text-gray-500">Fill in the details to get started</p>
                        )}
                    </div>

                    {generalError && <div className="mb-3 p-2 text-xs text-red-600 bg-red-50 rounded-md border border-red-100 text-center">{generalError}</div>}

                    <form className={isCompact ? 'space-y-3' : 'space-y-4'} onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Honeypot field — invisible to real users, bots auto-fill it */}
                        <input
                            type="text"
                            autoComplete="off"
                            tabIndex={-1}
                            aria-hidden="true"
                            {...register('website')}
                            style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, width: 0 }}
                        />

                        <div>
                            <input
                                type="text"
                                placeholder="Full Name*"
                                {...register('fullName')}
                                className={`w-full px-4 ${isCompact ? 'py-2' : 'py-3'} rounded-lg border ${errors.fullName ? 'border-red-400 focus:border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-[#ff6b00]/50 focus:border-[#ff6b00]'} focus:outline-none focus:ring-2 text-sm text-gray-900 placeholder-gray-500 bg-white`}
                            />
                            {errors.fullName && <p className="mt-1 text-[11px] text-red-500">{errors.fullName.message}</p>}
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email Id*"
                                {...register('email')}
                                className={`w-full px-4 ${isCompact ? 'py-2' : 'py-3'} rounded-lg border ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-[#ff6b00]/50 focus:border-[#ff6b00]'} focus:outline-none focus:ring-2 text-sm text-gray-900 placeholder-gray-500 bg-white`}
                            />
                            {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className={`flex border rounded-lg overflow-hidden focus-within:ring-2 bg-white ${errors.phone ? 'border-red-400 focus-within:ring-red-400 focus-within:border-red-500' : 'border-gray-300 focus-within:ring-[#ff6b00]/50 focus-within:border-[#ff6b00]'}`}>
                            <div className="flex items-center px-3 border-r border-gray-300 bg-gray-50 text-gray-700 text-sm">
                                <span className="mr-1">🇮🇳</span>
                                <span>+91</span>
                            </div>
                            <input
                                type="tel"
                                inputMode="numeric"
                                placeholder="Phone*"
                                maxLength={10}
                                {...register('phone', {
                                    onChange: (e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        setValue('phone', val);
                                    }
                                })}
                                className={`w-full px-4 ${isCompact ? 'py-2' : 'py-3'} focus:outline-none text-sm text-gray-900 placeholder-gray-500`}
                            />
                        </div>
                        {errors.phone && <p className="-mt-2 text-[11px] text-red-500">{errors.phone.message}</p>}

                        <div className={`relative border rounded-lg ${errors.purpose ? 'border-red-400' : 'border-gray-300'}`}>
                            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-gray-500">Purpose*</label>
                            <select
                                {...register('purpose')}
                                className={`w-full px-4 ${isCompact ? 'py-2 pt-3' : 'py-3 pt-4'} rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 focus:border-[#ff6b00] text-sm text-gray-900 appearance-none cursor-pointer`}
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="course_inquiry">Course Inquiry</option>
                                <option value="career_counseling">Career Counseling</option>
                                <option value="corporate_training">Corporate Training</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        {errors.purpose && <p className="-mt-2 text-[11px] text-red-500">{errors.purpose.message}</p>}

                        {!hideTerms && (
                            <div className="flex items-start gap-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="dm-agreed"
                                    className="mt-1 w-4 h-4 text-[#ff6b00] border-gray-300 rounded focus:ring-[#ff6b00]"
                                />
                                <label htmlFor="dm-agreed" className="text-xs text-gray-600">
                                    I agree to eHack Academy&apos;s <a href="#" className="font-semibold text-gray-800 hover:text-[#ff6b00]">Terms &amp; Conditions</a> and <a href="#" className="font-semibold text-gray-800 hover:text-[#ff6b00]">Privacy Policy</a>.
                                </label>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`w-full bg-[#ff6b00] hover:bg-[#e56000] text-white font-bold ${isCompact ? 'py-2.5' : 'py-3.5'} rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg shadow-[#ff6b00]/20 disabled:opacity-70 disabled:cursor-not-allowed`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : (customButtonText || 'Submit')} {!isSubmitting && <span className="text-lg leading-none">→</span>}
                        </button>

                        {showDigitalMarketingTag && (
                            <div className="mt-4 pt-4 text-center">
                                <div className="inline-block border border-[#ff6b00] rounded-lg px-8 py-3 w-full bg-white font-bold text-gray-900 shadow-[0_2px_10px_rgba(255,107,0,0.1)]">
                                    Digital Marketing Course
                                </div>
                            </div>
                        )}
                    </form>
                </>
            )}
        </div>
    );
}
