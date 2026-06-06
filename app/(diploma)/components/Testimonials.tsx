'use client';
import React, { useState, useEffect } from 'react';

const testimonialsData = [
    {
        stat: "CORE CYBER ROLE",
        quote: "The hands-on skills helped me land a core cybersecurity role immediately.",
        body: "Starting as a fresher, I had no roadmap. The Masters Program gave me the hands-on skills to land a core cybersecurity role immediately. Ideally, I'd still be searching without this guidance.",
        name: "Anmol Gupta",
        title: "APV-DELIVERY",
        image: "/testimonials/person1.jpg",
        logo: "/images/ampcuscyber.png"
    },
    {
        stat: "140% SALARY HIKE",
        quote: "The concepts were so clear that I now mentor others.",
        body: "From system admin to teaching the next generation. The concepts I learned were so clear that I now mentor others. The 140% hike was just the cherry on top.",
        name: "Rajiv Govind",
        title: "Head Teaching Asst.",
        image: "/testimonials/person2.jpg",
        logo: "/images/gtlogo.jpg"
    },
    {
        stat: "300% SALARY HIKE",
        quote: "Covered everything I needed to secure a massive 300% hike.",
        body: "Red teaming requires deep technical knowledge. The advanced modules here covered everything I needed to clear the SISA interview and secure a massive 300% hike.",
        name: "Vaddi Paneendar",
        title: "Red Teamer",
        image: "/testimonials/person3.jpg",
        logo: "/images/sisa.webp"
    },
    {
        stat: "120% SALARY HIKE",
        quote: "Validating my skills here led to a core engineering role at a top firm.",
        body: "Software development was fine, but cybersecurity is where the future is. Validating my skills here led to a 120% hike and a core engineering role at a top firm.",
        name: "Damini Ranganath",
        title: "Cybersecurity Eng.",
        image: "/testimonials/person4.jpg",
        logo: "/images/anuvu.png"
    },
    {
        stat: "160% SALARY HIKE",
        quote: "This program bridged the gap for me, leading to a 160% hike.",
        body: "Reaching a Director level requires more than just tools; it requires strategic understanding. This program bridged that gap for me, leading to a 160% hike.",
        name: "Pranshu Tiwari",
        title: "Director Security",
        image: "/testimonials/person5.jpg",
        logo: "/images/ampcuscyber.png"
    },
    {
        stat: "LEADERSHIP TRANSITION",
        quote: "The transition to Associate Director was possible because of rigorous training.",
        body: "Managing IT is different from securing it. The transition to Associate Director at SISA was possible because of the rigorous, practical training I received here.",
        name: "Abhinav Choubey",
        title: "Associate Director",
        image: "/testimonials/person6.jpg",
        logo: "/images/sisa.webp"
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const visibleTestimonials = [
        testimonialsData[currentIndex],
        testimonialsData[(currentIndex + 1) % testimonialsData.length]
    ];

    return (
        <section className="w-full bg-[#f8fafc] py-8 lg:py-12 relative overflow-hidden font-montserrat border-t border-gray-200">
            <style>{`
                @keyframes fillProgress {
                    0% { stroke-dashoffset: 301; }
                    100% { stroke-dashoffset: 0; }
                }
            `}</style>

            {/* Subtle background pattern */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 -left-40 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-[100px]"></div>
                <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-[100px]"></div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Centered Header with Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left mb-8 lg:mb-12 gap-6">
                    <div className="w-full">
                        <h2 className="font-montserrat font-black text-3xl sm:text-4xl xl:text-5xl text-[#0b162c] leading-tight tracking-tight w-full whitespace-normal lg:whitespace-nowrap">
                            Don't Just Take <span className="text-[#ff6b00]">Our Word For It.</span>
                        </h2>
                        <p className="mt-4 sm:mt-5 text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto md:mx-0">
                            Hear directly from our alumni who transformed from beginners into highly-paid security analysts, penetration testers, and directors at top-tier global companies.
                        </p>
                    </div>

                </div>

                {/* Main Testimonial Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative w-full mx-auto">
                    {visibleTestimonials.map((t, idx) => {
                        const statParts = t.stat.split(' ');
                        const statHighlight = statParts[0];
                        const statRest = statParts.slice(1).join(' ');

                        return (
                            <div key={`${t.name}-${currentIndex}-${idx}`} className={`bg-white rounded-[2rem] shadow-[0_15px_40px_rgba(11,22,44,0.04)] border border-gray-100 p-6 sm:p-8 lg:p-10 relative overflow-hidden transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
                                
                                {/* Decorative internal blob */}
                                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-gradient-to-br from-orange-50 to-white rounded-full blur-3xl opacity-60 pointer-events-none"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    
                                    {/* Top row: Stat Badge */}
                                    <div className="mb-6 lg:mb-8">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0b162c] text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest shadow-sm">
                                            <span className="text-[#ff6b00]">{statHighlight}</span>
                                            <span>{statRest}</span>
                                        </div>
                                    </div>

                                    {/* Quote Content */}
                                    <div className="mb-8 lg:mb-10 relative flex-1">
                                        <span className="absolute -left-4 -top-6 text-6xl text-gray-100 font-serif leading-none select-none">"</span>
                                        <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-[#0b162c] leading-snug relative z-10 tracking-tight">
                                            {t.quote}
                                        </h3>
                                        <p className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base leading-relaxed font-medium relative z-10">
                                            {t.body}
                                        </p>
                                    </div>

                                    {/* Footer: User Info & Logo */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 pt-6 border-t border-gray-100 mt-auto">
                                        
                                        {/* User Info */}
                                        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                                                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col flex-1">
                                                <span className="font-black text-[#0b162c] text-sm sm:text-base leading-tight">{t.name}</span>
                                                <span className="text-[#ff6b00] font-bold text-[10px] sm:text-xs tracking-wide uppercase mt-0.5">{t.title}</span>
                                            </div>
                                        </div>

                                        {/* Company Logo */}
                                        <div className="flex items-center justify-start sm:justify-center bg-gray-50/50 px-3 py-2 sm:px-4 sm:py-2 rounded-xl border border-gray-50 w-full sm:w-auto">
                                            <img src={t.logo} alt="Company Logo" className={`w-auto object-contain ${
                                                t.logo.includes('sisa') ? 'h-6 sm:h-8 max-w-[80px]' : 
                                                (t.logo.includes('anuvu') || t.logo.includes('ampcuscyber') || t.logo.includes('gtlogo')) ? 'h-8 sm:h-10 max-w-[120px]' : 
                                                'h-6 sm:h-8 max-w-[100px]'
                                            }`} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Manual Slider Controls (Bottom) */}
                <div className="flex justify-center items-center gap-6 mt-10 lg:mt-14 w-full">
                    <button 
                        onClick={handlePrev}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-[#ff6b00] hover:border-[#ff6b00] hover:shadow-lg transition-all focus:outline-none group"
                    >
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button 
                        onClick={handleNext}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-[#ff6b00] hover:border-[#ff6b00] hover:shadow-lg transition-all focus:outline-none group"
                    >
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
