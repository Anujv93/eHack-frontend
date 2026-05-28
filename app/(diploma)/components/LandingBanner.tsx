'use client';

import React, { useState } from 'react';
import bgImage from '../diploma-images/diploma-landing.png.jpg';
import SessionBookingModal from './SessionBookingModal';

const LandingBanner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Banner Form State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        status: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [honeypot, setHoneypot] = useState('');

    const handleBannerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (honeypot !== '') return;
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/zoho/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.name,
                    lastName: '-',
                    email: formData.email.toLowerCase(),
                    phone: formData.phone,
                    city: '',
                    totalAmount: 0,
                    inquiryName: `Website - ${formData.name} - Advanced Diploma Banner`,
                    leadSource: 'Website Advanced Diploma Page',
                    courses: [{
                        name: 'Advanced Diploma in Cybersecurity',
                        code: 'adv-diploma',
                        category: 'Diploma',
                        price: 0
                    }],
                    message: `Status: ${formData.status} | Inquiry from Banner`,
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

            alert("Thank you! Our team will contact you shortly.");
            setFormData({ name: '', phone: '', email: '', status: '' });
        } catch (error) {
            console.error('Error submitting banner form:', error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full bg-white px-4 sm:px-6 lg:px-8 pt-4 pb-10 font-inter">
            <style>
                {`
                    @keyframes marquee {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-100%); }
                    }
                    .animate-marquee {
                        animation: marquee 15s linear infinite;
                        display: flex;
                        width: max-content;
                    }
                    .animate-marquee:hover {
                        animation-play-state: paused;
                    }
                    .mask-fade-edges {
                        mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                        -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                    }
                `}
            </style>
            <div className="max-w-[1400px] mx-auto">
                {/* Main Rectangular Banner Container */}
            <div 
                className="relative w-full rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col justify-between min-h-[350px]"
                style={{
                    backgroundImage: `url(${bgImage.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* 
                  Gradient overlay to ensure text readability against the background image.
                  Blends dark blue into transparency to match the user's provided design aesthetic.
                */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b162c]/95 via-[#0b162c]/70 to-[#0b162c]/30 z-0"></div>

                <div className="relative z-10 flex flex-col lg:flex-row w-full justify-between items-start lg:items-center p-6 md:p-8 lg:p-10 mb-8 lg:mb-0">
                    
                    {/* Left Column: $100M Offer Copy */}
                    <div className="max-w-2xl text-white mb-4 lg:mb-0 mt-0 text-center lg:text-left flex flex-col items-center lg:items-start mx-auto lg:mx-0">
                        
                        {/* Academy Logo */}
                        <div className="-mt-2 lg:-mt-6 mb-1 animate-in fade-in slide-in-from-top-4 duration-700">
                            <img 
                                src="/images/white-academy.png" 
                                alt="eHack Academy" 
                                className="h-12 sm:h-14 lg:h-16 w-auto object-contain drop-shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:drop-shadow-[0_4px_30px_rgba(255,255,255,0.3)] transition-all duration-500 hover:scale-[1.03]"
                            />
                        </div>

                        <h1 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.2] mb-4 tracking-tight">
                            Become a <span className="text-[#ff6b00]">Highly-Paid Cybersecurity</span> Expert in 9 Months. <br className="hidden sm:block" />
                            <span className="text-[#ff6b00] text-xl sm:text-2xl lg:text-3xl block mt-2 font-bold opacity-90">
                                (Zero IT Experience Required)
                            </span>
                        </h1>
                        <p className="text-white/90 text-sm sm:text-base lg:text-lg font-medium mb-4 sm:mb-5 leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
                            Master Ethical Hacking, build job-ready skills through our <span className="font-bold text-white">Advanced Diploma</span>, and step into a ₹35L+ career with our real-time lab training.
                        </p>

                        {/* 1:1 Session CTA Button */}
                        <div className="mt-0 w-full sm:w-auto">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="group flex justify-center items-center gap-2 sm:gap-3 bg-[#ff6b00] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-[#e65c00] hover:shadow-[0_8px_30px_rgba(255,107,0,0.3)] hover:-translate-y-1 transition-all active:scale-95 w-full sm:w-auto"
                            >
                                Book a Live 1:1 Session
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Floating Elements */}
                    <div className="relative flex flex-col items-center lg:items-end w-full lg:w-auto h-full justify-between gap-8 pt-4 lg:pt-0 mx-auto lg:mx-0">
                        
                        {/* Floating Stats Card & Form */}
                        <div className="bg-white/95 backdrop-blur-xl border border-white/60 rounded-[1.5rem] p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] w-full max-w-[340px] lg:-translate-y-4 transition-transform hover:-translate-y-5 duration-300">
                            
                            {/* Single Line Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <h3 className="font-montserrat font-black text-4xl text-[#0b162c] tracking-tight leading-none">95<span className="text-2xl text-[#ff6b00]">%</span></h3>
                                <p className="text-gray-600 text-[11px] font-medium leading-snug">
                                    First-attempt pass rate for MNC examination.
                                </p>
                            </div>
                            
                            {/* Gradient Divider */}
                            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5"></div>
                            
                            {/* Embedded Lead Capture Form */}
                            <form className="flex flex-col gap-3 mb-5" onSubmit={handleBannerSubmit}>
                                {/* Honeypot */}
                                <div className="hidden" aria-hidden="true">
                                    <input type="text" tabIndex={-1} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                                </div>
                                
                                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff6b00] transition-all text-xs font-medium" />
                                <input type="tel" required pattern="^\+?[0-9\s\-]{10,15}$" title="Please enter a valid phone number (10-15 digits)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Contact Number" className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff6b00] transition-all text-xs font-medium" />
                                <input type="email" required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Please enter a valid email address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff6b00] transition-all text-xs font-medium" />
                                <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff6b00] transition-all text-xs font-medium outline-none cursor-pointer">
                                    <option value="" disabled>Current Status...</option>
                                    <option value="student">College Student</option>
                                    <option value="professional">Working Professional</option>
                                    <option value="job_seeker">Job Seeker</option>
                                    <option value="other">Other</option>
                                </select>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-[#ff6b00] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#e65c00] transition-all shadow-md mt-1 flex justify-center items-center">
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        "Apply Now"
                                    )}
                                </button>
                                <p className="text-gray-500 text-[11px] flex items-center justify-center gap-1.5 mt-1">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Your information is secure.
                                </p>
                            </form>



                        </div>



                    </div>
                </div>

                {/* Full Width Social Proof Ribbon at Bottom */}
                <div className="relative z-10 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 py-3 px-6 md:px-8 flex items-center justify-between gap-6">
                    
                    {/* Placed Alumni (Left) */}
                    <div className="flex items-center gap-4 shrink-0 border-r border-gray-200 pr-6 hidden sm:flex">
                        <div className="flex -space-x-3">
                            <img className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" src="/testimonials/person1.jpg" alt="Alumni 1" />
                            <img className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" src="/testimonials/person2.jpg" alt="Alumni 2" />
                            <img className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" src="/testimonials/person3.jpg" alt="Alumni 3" />
                            <img className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" src="/images/testimonials/person4.jpg" alt="Alumni 4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black text-[#0b162c] leading-tight">2000+</span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Placed Alumni</span>
                        </div>
                    </div>

                    {/* Hiring Partners Marquee (Right) */}
                    <div className="flex-1 overflow-hidden mask-fade-edges">
                        <div className="flex animate-marquee whitespace-nowrap items-center">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="flex items-center gap-16 mx-8">
                                    {[
                                        { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
                                        { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
                                        { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
                                        { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
                                        { name: 'Cisco', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' },
                                    ].map((company, index) => (
                                        <img
                                            key={`${i}-${index}`}
                                            src={company.logo}
                                            alt={company.name}
                                            className="h-5 sm:h-6 w-auto object-contain"
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            </div>
            
            <SessionBookingModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};

export default LandingBanner;
