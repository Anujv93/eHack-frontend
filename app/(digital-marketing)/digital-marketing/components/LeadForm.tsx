'use client';

import React, { useState } from 'react';

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
}

export default function LeadForm({
    customTitle,
    customSubtitle,
    customButtonText,
    showDigitalMarketingTag = true,
    noShadow = false,
    paddingClass = "p-6 sm:p-8",
    hideSubtitle = false,
    hideTerms = false,
    isCompact = false
}: LeadFormProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        purpose: '',
        agreed: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <div className={`bg-white rounded-2xl ${noShadow ? '' : 'shadow-[0_10px_40px_-10px_rgba(255,107,0,0.15)] border border-[#ff6b00]/20'} ${paddingClass} w-full max-w-[420px] mx-auto relative z-10`}>
            <div className="mb-6">
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

            <form onSubmit={handleSubmit} className={isCompact ? "space-y-3" : "space-y-4"}>
                <div>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name*"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 ${isCompact ? 'py-2' : 'py-3'} rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 focus:border-[#ff6b00] text-sm text-gray-900 placeholder-gray-500 bg-white`}
                    />
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Id*"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 ${isCompact ? 'py-2' : 'py-3'} rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 focus:border-[#ff6b00] text-sm text-gray-900 placeholder-gray-500 bg-white`}
                    />
                </div>

                <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#ff6b00]/50 focus-within:border-[#ff6b00] bg-white">
                    <div className="flex items-center px-3 border-r border-gray-300 bg-gray-50 text-gray-700 text-sm">
                        <span className="mr-1">🇮🇳</span>
                        <select className="bg-transparent focus:outline-none appearance-none">
                            <option value="+91">+91</option>
                        </select>
                    </div>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone*"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 ${isCompact ? 'py-2' : 'py-3'} focus:outline-none text-sm text-gray-900 placeholder-gray-500`}
                    />
                </div>

                <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-gray-500">Purpose*</label>
                    <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
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

                {!hideTerms && (
                <div className="flex items-start gap-2 pt-1">
                    <input
                        type="checkbox"
                        name="agreed"
                        id="agreed"
                        checked={formData.agreed}
                        onChange={handleChange}
                        required
                        className="mt-1 w-4 h-4 text-[#ff6b00] border-gray-300 rounded focus:ring-[#ff6b00]"
                    />
                    <label htmlFor="agreed" className="text-xs text-gray-600">
                        I agree to eHack Academy's <a href="#" className="font-semibold text-gray-800 hover:text-[#ff6b00]">Terms & Conditions</a> and <a href="#" className="font-semibold text-gray-800 hover:text-[#ff6b00]">Privacy Policy</a>.
                    </label>
                </div>
                )}

                <button
                    type="submit"
                    className={`w-full bg-[#ff6b00] hover:bg-[#e56000] text-white font-bold ${isCompact ? 'py-2.5' : 'py-3.5'} rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg shadow-[#ff6b00]/20`}
                >
                    {customButtonText || "Submit"} <span className="text-lg leading-none">→</span>
                </button>
                
                {showDigitalMarketingTag && (
                    <div className="mt-4 pt-4 text-center">
                        <div className="inline-block border border-[#ff6b00] rounded-lg px-8 py-3 w-full bg-white font-bold text-gray-900 shadow-[0_2px_10px_rgba(255,107,0,0.1)]">
                            Digital Marketing Course
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
