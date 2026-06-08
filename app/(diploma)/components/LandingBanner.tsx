'use client';

import React, { useState } from 'react';
import SessionBookingModal from './SessionBookingModal';
import SyllabusDownloadModal from './SyllabusDownloadModal';

const LandingBanner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    return (
        <div className="w-full bg-white pt-0 pb-0 font-montserrat overflow-hidden">
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
            {/* Academy Logo Header */}
            <div className="max-w-[1250px] mx-auto w-full flex flex-col items-center lg:items-start px-4 sm:px-6 lg:px-8 pt-2 pb-0 animate-in fade-in slide-in-from-top-4 duration-700">
                <img 
                    src="/images/newnew-ehack-removebg-preview.png" 
                    alt="eHack Academy" 
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain transition-all duration-500 hover:scale-[1.03]"
                />
            </div>

            {/* TRULY Full Width Line Separator */}
            <div className="w-full h-[1px] bg-gray-200"></div>

            {/* Main Content Container */}
            <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative w-full flex flex-col justify-between">
                <div className="relative z-10 flex flex-col lg:flex-row w-full justify-between items-center gap-8 lg:gap-12 py-6 lg:py-10 mb-0">
                    
                    {/* Left Column: Offer Copy */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
                        
                        <h1 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-[2.2rem] xl:text-[2.6rem] leading-[1.2] mb-3 tracking-tight text-[#0b162c] w-full text-center lg:text-left mt-2">
                            <span className="text-[#ff6b00]">AI-Powered</span> Advanced <br className="hidden lg:block" /> Diploma in Cybersecurity
                        </h1>
                        
                        <div className="w-16 h-1 bg-[#ff6b00] rounded-full mb-4 mx-auto lg:mx-0"></div>

                        <p className="text-gray-600 text-sm sm:text-base font-medium mb-6 w-full text-center lg:text-left">
                            India’s Top-Rated Practical Cybersecurity Diploma
                        </p>

                        <ul className="flex flex-col gap-3 mb-6 text-gray-700 text-sm sm:text-base font-medium text-left w-full">
                            <li className="flex items-start sm:items-center gap-3">
                                <div className="bg-[#ff6b00] rounded-full p-0.5 shrink-0 mt-0.5 sm:mt-0">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span>Master offensive and defensive tactics in AI-driven hacking labs</span>
                            </li>
                            <li className="flex items-start sm:items-center gap-3">
                                <div className="bg-[#ff6b00] rounded-full p-0.5 shrink-0 mt-0.5 sm:mt-0">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span>Defend against live cyber threats with 30+ hands-on tools</span>
                            </li>
                            <li className="flex items-start sm:items-center gap-3">
                                <div className="bg-[#ff6b00] rounded-full p-0.5 shrink-0 mt-0.5 sm:mt-0">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span>Earn globally recognized credentials to fast-track your career</span>
                            </li>
                            <li className="flex items-start sm:items-center gap-3">
                                <div className="bg-[#ff6b00] rounded-full p-0.5 shrink-0 mt-0.5 sm:mt-0">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span>Land your dream cybersecurity role with comprehensive placement support</span>
                            </li>
                        </ul>

                        {/* Authorized Training Partners */}
                        <div className="mb-6 w-full text-center lg:text-left flex flex-col items-center lg:items-start">
                            <p className="text-gray-500 text-[11px] uppercase tracking-wider font-bold mb-3">Authorized Training Partners:</p>
                            <div className="flex flex-row flex-nowrap items-center justify-center lg:justify-start gap-2 sm:gap-6 w-full">
                                <img src="/images/ec-council-logo.png" alt="EC-Council" className="h-6 sm:h-10 object-contain shrink-0" />
                                <div className="w-px h-6 sm:h-10 bg-gray-300 shrink-0"></div>
                                <div className="flex items-center gap-1.5 sm:gap-3 bg-white px-1 sm:px-2 py-1 rounded-lg shrink-0">
                                    <img src="/images/cropped-jiub-logo-Baptist.png" alt="JIUB" className="h-8 sm:h-12 w-8 sm:w-12 object-contain shrink-0" />
                                    <div className="flex flex-col text-left">
                                        <span className="text-[#0b162c] font-extrabold text-[8px] sm:text-[11px] leading-[1.2] tracking-wide whitespace-nowrap">
                                            JEFFERSON INTERNATIONAL
                                        </span>
                                        <span className="text-gray-600 font-semibold text-[7px] sm:text-[10px] leading-[1.2] tracking-wide whitespace-nowrap">
                                            UNIVERSITY OF BAPTIST
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="group flex justify-center items-center gap-2 bg-[#ff6b00] text-white px-6 sm:px-8 py-3.5 rounded-md font-bold text-sm hover:bg-[#e65c00] hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.23)] transition-all w-full sm:w-auto"
                            >
                                Book a Live 1:1 Session
                            </button>
                            
                            <button 
                                onClick={() => setIsSyllabusModalOpen(true)}
                                className="group flex justify-center items-center gap-2 bg-transparent border-2 border-gray-200 text-[#0b162c] px-6 sm:px-8 py-3.5 rounded-md font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all w-full sm:w-auto backdrop-blur-sm"
                            >
                                Download Syllabus
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Floating Elements */}
                    <div className="w-full lg:w-1/2 max-w-xl relative flex flex-col items-center justify-center shrink-0 mx-auto">
                        
                        {/* ================= YOUTUBE VIDEO ================= */}
                        <div className="w-full">
                            <div className="group relative z-30 mb-6 mt-4">
                                {/* Glow behind video */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#ff6b00]/40 via-orange-500/20 to-[#ff6b00]/40 rounded-[2rem] blur-2xl opacity-80 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-1000 z-0"></div>

                                {/* Video Container */}
                                <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 z-10 group/container">
                                    {!isVideoPlaying ? (
                                        <div 
                                            className="absolute inset-0 w-full h-full cursor-pointer group/play"
                                            onClick={() => setIsVideoPlaying(true)}
                                        >
                                            <img 
                                                src="https://img.youtube.com/vi/UrH9MuspUjQ/maxresdefault.jpg" 
                                                alt="eHack Academy Video Thumbnail"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover/play:scale-105"
                                            />

                                            {/* Play Button Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-[#ff6b00] rounded-full flex items-center justify-center shadow-lg group-hover/play:bg-[#e66000] group-hover/play:scale-105 transition-all duration-300">
                                                    <svg className="relative w-5 h-5 sm:w-7 sm:h-7 text-white ml-1 sm:ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <iframe
                                            className="absolute inset-0 w-full h-full"
                                            src="https://www.youtube.com/embed/UrH9MuspUjQ?rel=0&autoplay=1&modestbranding=1"
                                            title="eHack Academy"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Stats Pill below video */}
                            <div className="w-full bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] px-2 sm:px-6 md:px-8 py-3.5 sm:py-5 flex flex-row items-center justify-around text-[#0b162c] relative z-30 mt-4 overflow-hidden">
                                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#ff6b00] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-0.5 sm:gap-1.5 whitespace-nowrap">
                                        <span className="text-[13px] sm:text-base md:text-lg font-black leading-none">150+</span>
                                        <span className="text-[9px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider leading-none">Batches</span>
                                    </div>
                                </div>
                                <div className="w-px h-6 sm:h-10 bg-gray-200 shrink-0 mx-1 sm:mx-2"></div>
                                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#ff6b00] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                    <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-0.5 sm:gap-1.5 whitespace-nowrap">
                                        <span className="text-[13px] sm:text-base md:text-lg font-black leading-none">4.9</span>
                                        <span className="text-[9px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider leading-none">Ratings</span>
                                    </div>
                                </div>
                                <div className="w-px h-6 sm:h-10 bg-gray-200 shrink-0 mx-1 sm:mx-2"></div>
                                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#ff6b00] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-0.5 sm:gap-1.5 whitespace-nowrap">
                                        <span className="text-[13px] sm:text-base md:text-lg font-black leading-none">50K+</span>
                                        <span className="text-[9px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider leading-none">Learners</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            </div>
            
            <SessionBookingModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
            <SyllabusDownloadModal 
                isOpen={isSyllabusModalOpen} 
                onClose={() => setIsSyllabusModalOpen(false)} 
            />
        </div>
    );
};

export default LandingBanner;
