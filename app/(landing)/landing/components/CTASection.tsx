'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text Animate
            gsap.from(".cta-text-reveal", {
                x: -50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            });

            // Form Animate
            gsap.from(formRef.current, {
                x: 50,
                opacity: 0,
                duration: 1.2,
                delay: 0.3,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            });

            // Blueprint Grid Parallax
            gsap.to(".blueprint-pattern", {
                y: 60,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-12 md:py-20 bg-white relative overflow-hidden border-t border-gray-100">
            {/* Architectural Blueprint Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] blueprint-pattern">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f2937" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cta-grid)" />
                    {/* Technical Annotations */}
                    <text x="50" y="50" fontSize="10" fill="#1f2937" className="font-mono uppercase opacity-40">X-AXIS: GROWTH</text>
                    <text x="90%" y="10%" fontSize="10" fill="#1f2937" className="font-mono uppercase opacity-40">REF: ARCH_SUCCESS_V12</text>
                    <text x="50" y="95%" fontSize="10" fill="#1f2937" className="font-mono uppercase opacity-40">BUILD_PATH: 90_DAY_BOOTCAMP</text>
                </svg>
            </div>

            {/* Corner Decorative Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b00]/5 rounded-bl-[200px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ff6b00]/5 rounded-tr-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-12 max-w-[1300px] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Column: Narrative */}
                    <div ref={contentRef} className="space-y-8">
                        <div className="cta-text-reveal">
                            <span className="text-[#ff6b00] font-black uppercase tracking-[0.3em] text-xs mb-4 block">
                                The Master Plan
                            </span>
                            <h2 className="text-4xl md:text-6xl xl:text-7xl font-black text-[#1f2937] leading-[1.1] tracking-tight mb-8">
                                The Blueprint is Ready.<br />
                                <span className="bg-gradient-to-r from-[#ff6b00] to-[#ff8c3a] bg-clip-text text-transparent">
                                    Now, It's Your Turn to Build.
                                </span>
                            </h2>
                            <p className="text-[#4b5563] text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                                You’ve seen how others engineered their success. We have the architecture, the labs, and the placement engine ready for you.
                            </p>
                        </div>

                        <div className="cta-text-reveal space-y-8 pt-4">
                            <div className="flex flex-col gap-2 group">
                                <h4 className="text-[#1f2937] font-black uppercase text-sm tracking-widest border-l-4 border-[#ff6b00] pl-4">Work on Live Projects</h4>
                                <p className="text-gray-500 text-base pl-5">Gain hands-on experience with real-world scenarios and labs.</p>
                            </div>
                            <div className="flex flex-col gap-2 group">
                                <h4 className="text-[#1f2937] font-black uppercase text-sm tracking-widest border-l-4 border-[#ff6b00] pl-4">Get Hired Faster</h4>
                                <p className="text-gray-500 text-base pl-5">Our placement team works with you until you land your first job.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The Form */}
                    <div ref={formRef} className="relative">
                        {/* Designer Shadow Accent */}
                        <div className="absolute -inset-4 bg-[#ff6b00]/5 blur-3xl rounded-full opacity-60"></div>

                        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 relative shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
                            <div className="mb-8">
                                <h3 className="text-2xl font-black text-[#1f2937] mb-2 tracking-tight">Request Your Blueprint</h3>
                                <p className="text-gray-500 text-sm">Fill in your details and our career architects will reach out within 24 hours.</p>
                            </div>

                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/5 transition-all font-medium text-[#1f2937]"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/5 transition-all font-medium text-[#1f2937]"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/5 transition-all font-medium text-[#1f2937]"
                                        />
                                    </div>
                                    <select defaultValue="" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/5 transition-all font-medium text-[#1f2937] appearance-none cursor-pointer">
                                        <option value="" disabled>Select Your Program</option>
                                        <option value="masters">Masters Program (v13 AI)</option>
                                        <option value="graduate">Graduate Program</option>
                                        <option value="elite">Elite Program</option>
                                    </select>
                                </div>

                                <button className="w-full bg-[#1f2937] text-white rounded-2xl py-5 font-black text-lg shadow-xl hover:bg-[#ff6b00] transition-all flex items-center justify-center gap-3 active:scale-95 group">
                                    SUBMIT REQUEST
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </button>

                                <div className="flex items-center justify-center gap-2 pt-2 opacity-50">
                                    <svg className="w-4 h-4 text-[#ff6b00]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1f2937]">Secure & 100% Confidential</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
