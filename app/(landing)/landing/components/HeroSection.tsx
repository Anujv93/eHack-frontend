import React from 'react';
import CTAButton from './CTAButton';
import HeroRightPanel from './HeroRightPanel';

const HeroSection = () => {
    return (
        <section className="relative w-full min-h-[80vh] sm:min-h-[90vh] flex items-center pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-20 overflow-hidden">

            {/* BACKGROUND: Full Width Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                    alt="Cybersecurity Cohort Learning Together"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40"></div>
            </div>

            {/* Logo Container - Aligned with Grid */}
            <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
                <div className="container mx-auto px-6 lg:px-12 max-w-[1300px]">
                    <div className="pt-5 sm:pt-8">
                        <img
                            src="/images/white-academy.png"
                            alt="eHack Academy"
                            className="w-28 sm:w-40 md:w-48 lg:w-56 h-auto object-contain pointer-events-auto"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1300px] relative z-10">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-6 sm:gap-8 lg:gap-8">

                    {/* Left Content - Copy & Direct Response */}
                    <div className="w-full lg:w-[58%] text-center lg:text-left z-10">


                        {/* Main Headline - Problem/Solution Oriented */}
                        <h1 className="font-montserrat font-black text-white text-[1.3rem] sm:text-[1.7rem] md:text-3xl lg:text-[1.85rem] xl:text-[2.5rem] 2xl:text-[3rem] leading-[1.25] mb-4 sm:mb-6 md:mb-8 tracking-tight drop-shadow-lg">
                            <span>Launch Your <span className="text-[#ff6b00]">High-Paying</span></span> <br className="hidden lg:block" />
                            <span className="text-[#ff6b00]">Cybersecurity Career</span> <br className="hidden lg:block" />
                            In 90 Days...
                        </h1>

                        {/* Subheadline - Immediate Objection Handling */}
                        <h2 className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 shadow-black drop-shadow-md">
                            <span className="block mb-2">Even if you have <span className="text-white font-bold bg-[#ff6b00]/20 px-1 rounded-sm border border-[#ff6b00]/30">Zero IT Experience</span> or <span className="text-white font-bold bg-[#ff6b00]/20 px-1 rounded-sm border border-[#ff6b00]/30">No Technical Degree</span>.</span>
                            Master practical hacking skills & get hired.
                        </h2>

                        {/* CTA Area */}
                        <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-6 mb-4 sm:mb-6 w-full">
                            <CTAButton
                                className="shadow-orange-500/20 hover:shadow-orange-500/40"
                            />
                            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-6 text-[10px] sm:text-xs md:text-sm text-gray-300 font-medium">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                    100% Placement Assistance
                                </span>
                                <span className="hidden sm:inline text-gray-500">|</span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                                    Global Certifications
                                </span>
                                <span className="hidden sm:inline text-gray-500">|</span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#ff6b00] shadow-[0_0_8px_rgba(255,107,0,0.6)] animate-pulse"></span>
                                    EMI Options Available
                                </span>
                            </div>
                        </div>

                        {/* Social Proof - Trust Indicators */}
                        <style>
                            {`
                                    @keyframes marquee {
                                        0% { transform: translateX(0); }
                                        100% { transform: translateX(-50%); }
                                    }
                                    .animate-marquee {
                                        animation: marquee 30s linear infinite;
                                    }
                                    .animate-marquee:hover {
                                        animation-play-state: paused;
                                    }
                                `}
                        </style>
                        <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-bold mb-3 sm:mb-4">Trusted by 500+ Alumni Working At:</p>
                        <div className="w-full overflow-hidden relative">
                            <div className="flex animate-marquee whitespace-nowrap items-center hover:pause">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-12 sm:gap-24 mx-4 sm:mx-8">
                                        {[
                                            { name: 'Ampcus Cyber', logo: '/images/ampcuscyber.png', className: 'h-10 sm:h-16 scale-[1.8] sm:scale-[2.2] hover:scale-[2.3] mx-3 sm:mx-6' },
                                            { name: 'Anuvu', logo: '/images/anuvu.png', className: 'h-10 sm:h-14 scale-[1.4] sm:scale-[1.8] hover:scale-[1.9] mx-3 sm:mx-6' },
                                            { name: 'SISA', logo: '/images/sisa.webp', className: 'h-6 sm:h-8 scale-100' },
                                            { name: 'Google', logo: '/images/Google_2015_logo.svg.webp', className: 'h-7 sm:h-10 scale-100 rounded-sm' },
                                            { name: 'Microsoft', logo: '/images/Microsoft-logo-5-removebg-preview.png', className: 'h-7 sm:h-10 scale-100 rounded-sm' },
                                            // { name: 'Meta', logo: '/images/Meta-Logo.png', className: 'h-10 scale-100 rounded-sm' },
                                        ].map((company, index) => (
                                            <img
                                                key={`${i}-${index}`}
                                                src={company.logo}
                                                alt={company.name}
                                                className={`${company.className} w-auto object-contain transition-all duration-300 cursor-pointer`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Visual/Animation - COMPACT */}
                    <div className="lg:w-[42%] w-full relative mt-4 sm:mt-8 lg:mt-0 flex flex-col justify-center items-center">
                        <HeroRightPanel />
                    </div>

                </div>
            </div>
        </section >
    );
};

export default HeroSection;
