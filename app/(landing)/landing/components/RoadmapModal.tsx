'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateRoadmapPDF } from './generateRoadmapPDF';

const leadFormSchema = z.object({
    fullName: z.string().trim()
        .min(1, 'Please enter your full name')
        .min(2, 'Name must be at least 2 characters'),
    phone: z.string().trim()
        .min(1, 'Please enter your phone number')
        .length(10, 'Please enter a valid 10-digit phone number')
        .regex(/^[6-9]/, 'Phone number must start with 6, 7, 8, or 9')
        .regex(/^\d+$/, 'Phone number must contain only digits'),
    currentStatus: z.string().min(1, 'Please select your current status'),
    budget: z.string().min(1, 'Please select a budget range'),
    website: z.string().optional(), // Honeypot
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

interface RoadmapModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RoadmapModal: React.FC<RoadmapModalProps> = ({ isOpen, onClose }) => {
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
            phone: '',
            currentStatus: '',
            budget: '',
            website: '',
        },
    });

    useEffect(() => {
        if (isOpen) {
            mountTimeRef.current = Date.now();
            setIsSubmitted(false);
            setGeneralError('');
            reset();
        }
    }, [isOpen, reset]);

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
        if (data.website) { setIsSubmitted(true); return; }
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
                    email: `no-email-${Date.now()}@ehackacademy.com`, // Email is not collected but required by backend pattern
                    phone: data.phone,
                    city: '',
                    totalAmount: 0,
                    inquiryName: `Website - ${data.fullName} - Action Roadmap Generator`,
                    leadSource: 'Website Landing Page - Action Roadmap',
                    courses: [{
                        name: 'Action Roadmap Generator',
                        code: 'action-roadmap',
                        category: 'General',
                        price: 0,
                    }],
                    message: `Action Roadmap Generated\nCurrent Status: ${data.currentStatus}\nBudget Range: ${data.budget}`,
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

            localStorage.setItem('ehack_roadmap_generated', 'true');
            setIsSubmitted(true);

            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'conversion', {
                    send_to: 'AW-17944571400/8OiVCJHss_cbEIjc0exC',
                    value: 1.0,
                    currency: 'INR',
                    event_callback: () => {},
                });
            }

            // Generate PDF
            await generateRoadmapPDF(data.fullName, data.currentStatus);

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
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
            
            <div ref={panelRef} className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row" style={{ opacity: 0, maxHeight: '90vh' }}>
                
                {/* Left Section: Form */}
                <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
                    <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10 md:hidden cursor-pointer">
                        <CloseIcon />
                    </button>
                    
                    {isSubmitted ? (
                        <div className="text-center py-12 animate-fadeIn h-full flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Roadmap Generated! 🎉</h3>
                            <p className="text-gray-600 mb-4">Your personalized action plan has been downloaded.</p>
                            <button onClick={handleClose} className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h3 className="text-2xl font-black text-[#1f2937] mb-2">Generate Your Roadmap</h3>
                                <p className="text-gray-500 text-sm">Tell us about yourself to tailor your 90-day action plan.</p>
                            </div>

                            {generalError && <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 text-center">{generalError}</div>}

                            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                                <input type="text" autoComplete="off" tabIndex={-1} aria-hidden="true" {...register('website')} style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, width: 0 }} />

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        {...register('fullName')}
                                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${errors.fullName ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]'}`}
                                    />
                                    {errors.fullName && <p className="mt-1 text-[11px] text-red-500">{errors.fullName.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="9999999999"
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
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Current Status</label>
                                    <select
                                        {...register('currentStatus')}
                                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all appearance-none cursor-pointer ${errors.currentStatus ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]'}`}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select your status...</option>
                                        <option value="12th Pass">12th Pass</option>
                                        <option value="Graduate">Graduate</option>
                                        <option value="Working Professional">Working Professional</option>
                                    </select>
                                    {errors.currentStatus && <p className="mt-1 text-[11px] text-red-500">{errors.currentStatus.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Budget Range</label>
                                    <select
                                        {...register('budget')}
                                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all appearance-none cursor-pointer ${errors.budget ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]'}`}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select a budget range...</option>
                                        <option value="Under ₹1L">Under ₹1L</option>
                                        <option value="₹1L – ₹2L">₹1L – ₹2L</option>
                                        <option value="₹2L – ₹3L">₹2L – ₹3L</option>
                                        <option value="₹3L+">₹3L+</option>
                                    </select>
                                    {errors.budget && <p className="mt-1 text-[11px] text-red-500">{errors.budget.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-[#ff6b00] hover:bg-[#e66000] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#ff6b00]/20 hover:shadow-xl hover:shadow-[#ff6b00]/30 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed text-sm cursor-pointer"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Generating...' : 'Generate My Roadmap'}
                                </button>
                            </form>
                        </>
                    )}
                </div>

                {/* Right Section: Placeholder for Phase 2 */}
                <div className="w-full md:w-1/2 bg-gray-900 p-10 hidden md:flex flex-col items-center justify-center relative">
                    <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 cursor-pointer">
                        <CloseIcon />
                    </button>
                    
                    <div className="text-center">
                        <div className="w-32 h-40 bg-gray-800 rounded-lg shadow-2xl mx-auto mb-8 relative border border-gray-700 flex flex-col">
                            <div className="h-8 bg-[#ff6b00] rounded-t-lg w-full"></div>
                            <div className="flex-1 p-3 flex flex-col gap-2">
                                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                                <div className="mt-auto h-12 bg-gray-700 rounded w-full flex items-center justify-center opacity-50">
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                </div>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-[#ff6b00] rounded-full blur-xl opacity-30"></div>
                            <div className="absolute -left-4 -top-4 w-12 h-12 bg-blue-500 rounded-full blur-xl opacity-20"></div>
                        </div>
                        
                        <h4 className="text-xl font-bold text-white mb-2">Your Career Blueprint</h4>
                        <p className="text-gray-400 text-sm max-w-[250px] mx-auto leading-relaxed">
                            A complete step-by-step PDF guide customized for your current experience level.
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default RoadmapModal;
