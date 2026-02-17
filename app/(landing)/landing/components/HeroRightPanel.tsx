"use client";

import React, { useState, useEffect, useRef } from "react";
import TerminalAnimation from "./TerminalAnimation";
import SuccessCard from "./SuccessCard";
import FolderLoader from "./FolderLoader";
import { studentTransformationLogs, studentStories } from "../data/programData";

const HeroRightPanel = () => {
    const [isPlaying] = useState(true);
    const [storyIndex, setStoryIndex] = useState(0);
    const [animationState, setAnimationState] = useState<'terminal' | 'unlocking' | 'success'>('terminal');
    const containerRef = useRef<HTMLDivElement>(null);

    const handleTerminalComplete = () => {
        setTimeout(() => {
            setAnimationState('unlocking');
        }, 300);
    };

    const handleUnlockComplete = () => {
        setAnimationState('success');
    };

    // Auto-loop logic
    useEffect(() => {
        let resetTimer: NodeJS.Timeout;
        if (animationState === 'success') {
            resetTimer = setTimeout(() => {
                setStoryIndex((prev) => (prev + 1) % studentStories.length);
                setAnimationState('terminal');
            }, 4000);
        }
        return () => clearTimeout(resetTimer);
    }, [animationState]);


    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.type === 'tel' ? 'phone' : e.target.type === 'email' ? 'email' : 'fullName']: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.fullName || !formData.email || !formData.phone) {
            setError('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/zoho/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.fullName,
                    lastName: '-',
                    email: formData.email,
                    phone: formData.phone,
                    city: '',
                    totalAmount: 0,
                    inquiryName: `Website - ${formData.fullName} - Landing Page Hero`,
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
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Submission failed:', errorData);
                throw new Error(errorData.details || 'Failed to submit');
            }

            setIsSubmitted(true);
            setFormData({ fullName: '', email: '', phone: '' });
        } catch (err: any) {
            console.error('Error submitting form:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-[450px] sm:max-w-[550px] mx-auto perspective-1000 relative z-20">

            {/* ================= MONITOR CONTENT (FRAMELESS) ================= */}
            <div className="group relative z-30">
                {/* Glow behind monitor */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

                {/* Screen Container - No Bezel */}
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[340px] bg-black rounded-t-2xl rounded-b-none overflow-hidden shadow-2xl border border-gray-800 border-b-0">

                    {/* TERMINAL LAYER */}
                    <div className={`absolute inset-0 transition-opacity duration-500 bg-[#0c0c0c] ${animationState === 'success' ? 'opacity-0' : 'opacity-100'}`}>
                        <TerminalAnimation
                            key={storyIndex}
                            customLogs={studentStories[storyIndex].logs}
                            onComplete={handleTerminalComplete}
                            autoScroll={true}
                            isPaused={false}
                        />
                    </div>

                    {/* 3. UNLOCK & 4. SUCCESS */}
                    {animationState === 'unlocking' && (
                        <div className="absolute inset-0 z-30"><FolderLoader onComplete={handleUnlockComplete} isPaused={false} /></div>
                    )}
                    {animationState === 'success' && (
                        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
                            <SuccessCard data={studentStories[storyIndex]} />
                        </div>
                    )}

                    {/* Subtle Scanline Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[60] bg-[length:100%_2px,3px_100%] opacity-20"></div>
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

                            {error && <div className="mb-3 p-2 text-xs text-red-600 bg-red-50 rounded-md border border-red-100 text-center">{error}</div>}

                            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00] transition-all"
                                        value={formData.fullName}
                                        onChange={(e) => {
                                            setFormData(prev => ({ ...prev, fullName: e.target.value }));
                                            setError('');
                                        }}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00] transition-all"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            setFormData(prev => ({ ...prev, phone: e.target.value }));
                                            setError('');
                                        }}
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00] transition-all"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, email: e.target.value }));
                                        setError('');
                                    }}
                                />

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
