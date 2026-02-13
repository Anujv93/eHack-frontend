import React from 'react';
import CTAButton from './CTAButton';
import HeroRightPanel from './HeroRightPanel';

const HeroSection = () => {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">

            {/* BACKGROUND: Full Width Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                    alt="Cybersecurity Cohort Learning Together"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 max-w-[1300px] relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

                    {/* Left Content - Copy & Direct Response */}
                    <div className="lg:w-[58%] text-center lg:text-left z-10">
                        {/* Urgency / Authority Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-8 animate-fadeIn">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b00]"></span>
                            </span>
                            <span className="text-white font-bold text-xs uppercase tracking-wider">
                                New Cohort Starting Soon
                            </span>
                        </div>

                        {/* Main Headline - Problem/Solution Oriented */}
                        <h1 className="font-montserrat font-black text-white text-3xl md:text-3xl lg:text-[1.85rem] xl:text-[2.5rem] 2xl:text-[3rem] leading-[1.2] mb-8 tracking-tight drop-shadow-lg">
                            <span className="whitespace-nowrap">Launch Your <span className="text-[#ff6b00]">High-Paying</span></span> <br className="hidden lg:block" />
                            <span className="text-[#ff6b00] whitespace-nowrap">Cybersecurity Career</span> <br className="hidden lg:block" />
                            In 90 Days...
                        </h1>

                        {/* Subheadline - Immediate Objection Handling */}
                        <h2 className="text-gray-200 text-lg md:text-xl font-medium mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 shadow-black drop-shadow-md">
                            <span className="block mb-2">Even if you have <span className="text-white font-bold bg-[#ff6b00]/20 px-1 rounded-sm border border-[#ff6b00]/30">Zero IT Experience</span> or <span className="text-white font-bold bg-[#ff6b00]/20 px-1 rounded-sm border border-[#ff6b00]/30">No Technical Degree</span>.</span>
                            Master practical hacking skills & get hired.
                        </h2>

                        {/* CTA Area */}
                        <div className="flex flex-col items-center lg:items-start gap-6 mb-6 w-full">
                            <CTAButton
                                className="shadow-orange-500/20 hover:shadow-orange-500/40"
                            />
                            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs md:text-sm text-gray-300 font-medium">
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
                        <div className="pt-8 border-t border-white/10">
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">Trusted by 500+ Alumni Working At:</p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-80 hover:opacity-100 transition-all duration-300">
                                {['GOOGLE', 'MICROSOFT', 'DELOITTE', 'INFOSEC', 'HCL'].map((company, i) => (
                                    <span key={i} className="text-xl font-bold text-gray-300 hover:text-white cursor-default transition-colors">{company}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Visual/Animation - COMPACT */}
                    <div className="lg:w-[42%] w-full relative mt-12 lg:mt-0 flex flex-col justify-center items-center">
                        <HeroRightPanel />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
