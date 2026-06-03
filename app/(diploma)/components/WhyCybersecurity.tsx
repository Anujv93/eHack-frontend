'use client';
import React from 'react';

const WhyCybersecurity = () => {
    return (
        <section className="w-full bg-white py-12 relative overflow-hidden font-montserrat">
            <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Main Headline for both contents */}
                <div className="text-center mb-16 sm:mb-20 md:mb-24 relative px-4 sm:px-0">
                    <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-[#0b162c] mb-6 leading-tight">
                        The Market Has Shifted. <br />
                        <span className="text-[#ff6b00]">Are You Ready?</span>
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed italic">
                        "Discover why traditional tech roles are fading, and why eHack Academy is your ultimate launchpad."
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-12 xl:gap-20">
                    
                    {/* Left Column: Why Cybersecurity */}
                    <div className="flex flex-col">
                        <div className="mb-6 lg:mb-8 relative h-auto sm:h-12 flex items-end justify-center lg:justify-start">
                            <h3 className="font-montserrat font-black text-2xl sm:text-3xl xl:text-4xl text-[#0b162c] tracking-tight whitespace-nowrap text-center lg:text-left">
                                WHY <span className="text-red-500">CYBERSECURITY</span>
                            </h3>
                            {/* Floating Curved Arrow */}
                            <svg className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 text-red-500 opacity-20 hidden lg:block" fill="none" viewBox="0 0 100 150" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                                <path d="M10 10 Q 90 50, 20 130" />
                                <path d="M20 130 L 40 100 M 20 130 L 50 140" />
                            </svg>
                        </div>

                        <div className="flex flex-col gap-3">
                            {/* Row 1 */}
                            <div className="flex w-full h-auto lg:h-[160px] gap-2 sm:gap-3 group">
                                <div className="w-16 sm:w-20 lg:w-24 shrink-0 bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-100 transition-colors duration-300">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <div className="flex-1 bg-gray-50 border border-gray-100 p-4 sm:p-5 lg:p-6 flex flex-col justify-center group-hover:bg-red-50/40 group-hover:border-red-100 transition-colors duration-300">
                                    <h4 className="font-montserrat font-bold text-base sm:text-lg xl:text-xl text-[#0b162c] mb-1 sm:mb-2">The Saturated Market</h4>
                                    <p className="text-gray-600 text-[13px] sm:text-sm xl:text-base leading-relaxed">
                                        Traditional fields like web development are facing extreme saturation, massive layoffs, and fierce competition from AI.
                                    </p>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex w-full h-auto lg:h-[160px] gap-2 sm:gap-3 group">
                                <div className="w-16 sm:w-20 lg:w-24 shrink-0 bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-100 transition-colors duration-300">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1 bg-gray-50 border border-gray-100 p-4 sm:p-5 lg:p-6 flex flex-col justify-center group-hover:bg-red-50/40 group-hover:border-red-100 transition-colors duration-300">
                                    <h4 className="font-montserrat font-bold text-base sm:text-lg xl:text-xl text-[#0b162c] mb-1 sm:mb-2">3.5M+ Unfilled Jobs</h4>
                                    <p className="text-gray-600 text-[13px] sm:text-sm xl:text-base leading-relaxed">
                                        Stop fighting for a seat in a crowded room. Step into a high-growth, globally demanded career with a 0% unemployment rate.
                                    </p>
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="flex w-full h-auto lg:h-[160px] gap-2 sm:gap-3 group">
                                <div className="w-16 sm:w-20 lg:w-24 shrink-0 bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-100 transition-colors duration-300">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1 bg-gray-50 border border-gray-100 p-4 sm:p-5 lg:p-6 flex flex-col justify-center group-hover:bg-red-50/40 group-hover:border-red-100 transition-colors duration-300">
                                    <h4 className="font-montserrat font-bold text-base sm:text-lg xl:text-xl text-[#0b162c] mb-1 sm:mb-2">High Starting Salaries</h4>
                                    <p className="text-gray-600 text-[13px] sm:text-sm xl:text-base leading-relaxed">
                                        Cybersecurity professionals command some of the highest entry-level salaries in tech, driven directly by the massive talent shortage.
                                    </p>
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="flex w-full h-auto lg:h-[160px] gap-2 sm:gap-3 group">
                                <div className="w-16 sm:w-20 lg:w-24 shrink-0 bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-100 transition-colors duration-300">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="flex-1 bg-gray-50 border border-gray-100 p-4 sm:p-5 lg:p-6 flex flex-col justify-center group-hover:bg-red-50/40 group-hover:border-red-100 transition-colors duration-300">
                                    <h4 className="font-montserrat font-bold text-base sm:text-lg xl:text-xl text-[#0b162c] mb-1 sm:mb-2">Recession-Proof Security</h4>
                                    <p className="text-gray-600 text-[13px] sm:text-sm xl:text-base leading-relaxed">
                                        While other sectors face budget cuts during economic downturns, security remains mandatory. Your job stays safe, secure, and critical.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Why eHack */}
                    <div className="flex flex-col mt-4 sm:mt-12 lg:mt-0">
                        <div className="mb-6 lg:mb-8 relative h-auto sm:h-12 flex items-end justify-center lg:justify-start">
                            <h3 className="font-montserrat font-black text-2xl sm:text-3xl xl:text-4xl text-[#0b162c] tracking-tight flex items-center gap-3 whitespace-nowrap text-center lg:text-left">
                                WHY <span className="text-[#ff6b00]">EHACK</span>
                                <span className="w-10 xl:w-12 h-[3px] bg-[#ff6b00] relative hidden lg:block">
                                    <span className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-3 h-3 border-t-[3px] border-r-[3px] border-[#ff6b00] rotate-45 transform origin-center"></span>
                                </span>
                            </h3>
                            {/* Floating Squiggly */}
                            <svg className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-6 text-[#ff6b00] opacity-40 hidden lg:block" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 20 Q 15 5, 25 20 T 45 20 T 65 20 T 85 20" />
                            </svg>
                        </div>

                        <div className="flex flex-col gap-3">
                            {/* Row 1 */}
                            <div className="flex w-full h-auto lg:h-[160px] gap-2 sm:gap-3 group">
                                <div className="w-16 sm:w-20 lg:w-24 shrink-0 bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors duration-300">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 8h8" />
                                    </svg>
                                </div>
                                <div className="flex-1 bg-gray-50 border border-gray-100 p-4 sm:p-5 lg:p-6 flex flex-col justify-center group-hover:bg-orange-50/40 group-hover:border-orange-100 transition-colors duration-300">
                                    <h4 className="font-montserrat font-bold text-base sm:text-lg xl:text-xl text-[#0b162c] mb-1 sm:mb-2">10+ Years in Bangalore</h4>
                                    <p className="text-gray-600 text-[13px] sm:text-sm xl:text-base leading-relaxed">
                                        Born in the tech capital of India, we are a pure-play institution delivering raw, real-world, hands-on cybersecurity training.
                                    </p>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex w-full h-auto lg:h-[160px] gap-2 sm:gap-3 group">
                                <div className="w-16 sm:w-20 lg:w-24 shrink-0 bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors duration-300">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1 bg-gray-50 border border-gray-100 p-4 sm:p-5 lg:p-6 flex flex-col justify-center group-hover:bg-orange-50/40 group-hover:border-orange-100 transition-colors duration-300">
                                    <h4 className="font-montserrat font-bold text-base sm:text-lg xl:text-xl text-[#0b162c] mb-1 sm:mb-2">Premium Placement Aid</h4>
                                    <p className="text-gray-600 text-[13px] sm:text-sm xl:text-base leading-relaxed">
                                        We don't just teach you how to hack. We leverage our deeply rooted industry connections to engineer your entire career.
                                    </p>
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="flex w-full h-auto lg:h-[160px] gap-2 sm:gap-3 group">
                                <div className="w-16 sm:w-20 lg:w-24 shrink-0 bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors duration-300">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                    </svg>
                                </div>
                                <div className="flex-1 bg-gray-50 border border-gray-100 p-4 sm:p-5 lg:p-6 flex flex-col justify-center group-hover:bg-orange-50/40 group-hover:border-orange-100 transition-colors duration-300">
                                    <h4 className="font-montserrat font-bold text-base sm:text-lg xl:text-xl text-[#0b162c] mb-1 sm:mb-2">Expert Instructors</h4>
                                    <p className="text-gray-600 text-[13px] sm:text-sm xl:text-base leading-relaxed">
                                        Learn directly from battle-tested cybersecurity veterans and certified ethical hackers, not just academic theoreticians.
                                    </p>
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="flex w-full h-auto lg:h-[160px] gap-2 sm:gap-3 group">
                                <div className="w-16 sm:w-20 lg:w-24 shrink-0 bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors duration-300">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1 bg-gray-50 border border-gray-100 p-4 sm:p-5 lg:p-6 flex flex-col justify-center group-hover:bg-orange-50/40 group-hover:border-orange-100 transition-colors duration-300">
                                    <h4 className="font-montserrat font-bold text-base sm:text-lg xl:text-xl text-[#0b162c] mb-1 sm:mb-2">100% Practical Labs</h4>
                                    <p className="text-gray-600 text-[13px] sm:text-sm xl:text-base leading-relaxed">
                                        Forget boring lectures. Engage in real-world simulated attacks, defensive strategies, and live environment labs from day one.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyCybersecurity;
