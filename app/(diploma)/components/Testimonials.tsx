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

    // Auto-scrolling logic that resets when manual click occurs
    useEffect(() => {
        const timer = setInterval(() => {
            setIsAnimating(true);
            setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
            setTimeout(() => setIsAnimating(false), 500);
        }, 6000);
        
        return () => clearInterval(timer);
    }, [currentIndex]);

    const t = testimonialsData[currentIndex];

    // Split stat for styling
    const statParts = t.stat.split(' ');
    const statHighlight = statParts[0];
    const statRest = statParts.slice(1).join(' ');

    return (
        <section className="w-full bg-white py-12 lg:py-16 relative overflow-hidden font-inter border-t border-gray-100">
            <style>{`
                @keyframes fillProgress {
                    0% { stroke-dashoffset: 301; }
                    100% { stroke-dashoffset: 0; }
                }
            `}</style>
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Headline & Paragraph Pattern */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 lg:mb-12 gap-8 lg:gap-12">
                    <div className="w-full md:w-5/12 lg:w-2/5 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-6 shadow-sm mx-auto md:mx-0 w-max">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b00]"></span>
                            </span>
                            <span className="text-[#ff6b00] font-bold text-[11px] uppercase tracking-widest">
                                Success Stories
                            </span>
                        </div>
                        <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-[42px] text-[#0b162c] leading-tight tracking-tight">
                            Don't Just Take <br className="hidden md:block" />
                            <span className="text-[#ff6b00]">Our Word For It.</span>
                        </h2>
                    </div>
                    <div className="w-full md:w-7/12 lg:w-1/2">
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed border-l-4 border-[#ff6b00] pl-4 sm:pl-6 md:mt-8 lg:mt-10 text-left">
                            We don't just teach theory; we engineer careers. Hear directly from our alumni who transformed from complete beginners into highly-paid security analysts, penetration testers, and directors at top-tier global companies.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-12 items-center">
                    
                    {/* Left Column: Text & Controls */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center transition-opacity duration-500">
                        {/* Stat Badge */}
                        <div className="text-[11px] sm:text-[13px] font-bold text-gray-500 uppercase tracking-widest mb-6 lg:mb-8 flex items-center">
                            <span className="text-[#0b162c] border-b-2 border-[#ff6b00] pb-1 mr-2">{statHighlight}</span> 
                            {statRest}
                        </div>

                        {/* Text Container with Minimum Height to prevent layout jumping */}
                        <div className="min-h-[auto] lg:min-h-[340px] flex flex-col justify-start">
                            {/* Quote Headline */}
                            <h2 className="font-montserrat font-black text-2xl sm:text-3xl md:text-[2.75rem] text-[#0b162c] mb-6 lg:mb-10 leading-[1.2] lg:leading-[1.1] tracking-tight relative ml-2 sm:ml-0">
                                <span className="text-[#ff6b00] text-4xl sm:text-5xl md:text-7xl absolute -left-4 sm:-left-6 md:-left-10 -top-3 sm:-top-4 md:-top-6 opacity-30 font-serif">"</span>
                                {t.quote}
                            </h2>

                            {/* Quote Body with Orange Line */}
                            <div className="border-l-[3px] border-[#ff6b00] pl-4 sm:pl-6 md:pl-8 mb-8 lg:mb-10">
                                <p className="text-gray-600 text-base sm:text-lg md:text-xl italic leading-relaxed">
                                    {t.body}
                                </p>
                            </div>
                        </div>

                        {/* Author Info & Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex flex-row items-center gap-4">
                                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                    <span className="font-bold text-[#0b162c] text-base sm:text-lg mb-1">{t.name}</span>
                                    <span className="text-[#ff6b00] bg-orange-50 font-semibold px-2.5 py-1 rounded-md text-[10px] sm:text-xs uppercase tracking-wider border border-orange-100">{t.title}</span>
                                </div>
                                {/* Divider */}
                                <div className="h-8 sm:h-12 w-px bg-gray-200 block"></div>
                                {/* Company Logo */}
                                <div className="flex items-center justify-center">
                                    <img src={t.logo} alt="Company Logo" className={`w-auto object-contain ${
                                        t.logo.includes('sisa') ? 'h-6 sm:h-8 max-w-[80px]' : 
                                        (t.logo.includes('anuvu') || t.logo.includes('ampcuscyber')) ? 'h-10 sm:h-16 max-w-[120px] sm:max-w-[200px] sm:scale-110 origin-left sm:ml-2' : 
                                        'h-8 sm:h-12 max-w-[100px] sm:max-w-[160px]'
                                    }`} />
                                </div>
                            </div>

                            {/* Arrows */}
                            <div className="flex items-center gap-3 self-start sm:self-auto">
                                <button 
                                    onClick={handlePrev}
                                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#ff6b00] hover:border-[#ff6b00] hover:bg-orange-50 transition-all focus:outline-none"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={handleNext}
                                    className="relative w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-[#ff6b00] transition-colors focus:outline-none group"
                                >
                                    {/* Static background ring */}
                                    <svg className="absolute inset-0 w-full h-full text-gray-200 group-hover:text-orange-200 transition-colors" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="4" />
                                    </svg>
                                    
                                    {/* Animated progress ring */}
                                    <svg 
                                        key={currentIndex} // Reset animation when currentIndex changes
                                        className="absolute inset-0 w-full h-full text-[#ff6b00] -rotate-90 pointer-events-none" 
                                        viewBox="0 0 100 100"
                                    >
                                        <circle 
                                            cx="50" 
                                            cy="50" 
                                            r="48" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeDasharray="301"
                                            style={{
                                                animation: 'fillProgress 6s linear forwards'
                                            }}
                                        />
                                    </svg>

                                    <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image & Abstract Graphics */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[350px] sm:min-h-[450px] lg:min-h-[600px] mb-8 lg:mb-0">
                        
                        {/* Background Soft Blobs */}
                        <div className="absolute top-10 right-20 w-32 h-32 sm:w-48 sm:h-48 bg-[#eef2f6] rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
                        <div className="absolute bottom-10 left-10 w-40 h-40 sm:w-64 sm:h-64 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

                        {/* The Arch Portrait Container */}
                        <div className="relative z-10 w-[65%] sm:w-[50%] md:w-[45%] lg:w-[70%] max-w-[400px] aspect-[3/4] rounded-t-full rounded-b-[2rem] sm:rounded-b-3xl overflow-hidden shadow-[0_15px_30px_rgb(11,22,44,0.15)] sm:shadow-[0_20px_50px_rgb(11,22,44,0.15)] border-[6px] sm:border-[10px] border-white transition-transform duration-500 ease-in-out transform">
                            <img 
                                key={t.image} // Key forces re-render/fade if we add CSS animation
                                src={t.image} 
                                alt={t.name}
                                className={`w-full h-full object-cover object-center transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                            />
                        </div>

                        {/* Abstract Dots and Lines (Right Top) */}
                        <svg className="absolute top-[10%] right-[5%] w-32 h-32 text-[#ff6b00] opacity-60 hidden sm:block z-0" viewBox="0 0 100 100">
                            <circle cx="20" cy="20" r="4" fill="currentColor" />
                            <circle cx="50" cy="20" r="4" fill="#0b162c" />
                            <circle cx="80" cy="20" r="4" fill="currentColor" />
                            <circle cx="20" cy="50" r="4" fill="#0b162c" />
                            <circle cx="50" cy="50" r="4" fill="currentColor" />
                            <circle cx="80" cy="50" r="4" fill="#ff6b00" />
                            {/* Lines connecting dots */}
                            <line x1="20" y1="20" x2="50" y2="20" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="50" y1="20" x2="80" y2="20" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="20" y1="20" x2="20" y2="50" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="50" y1="20" x2="50" y2="50" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="50" y1="50" x2="80" y2="20" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>

                        {/* Abstract Curved Path (Left Bottom) */}
                        <svg className="absolute bottom-[15%] left-[5%] w-40 h-40 text-[#0b162c] opacity-40 hidden sm:block z-0" viewBox="0 0 100 100">
                            <path d="M 10 90 Q 30 10 90 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" />
                            <circle cx="10" cy="90" r="4" fill="#ff6b00" />
                            <circle cx="90" cy="30" r="4" fill="#ff6b00" />
                        </svg>

                        {/* Small abstract dashes */}
                        <svg className="absolute top-[30%] left-[10%] w-16 h-16 text-[#0b162c] opacity-20 hidden sm:block z-0" viewBox="0 0 50 50">
                            <line x1="10" y1="10" x2="20" y2="0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="20" y1="20" x2="30" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
