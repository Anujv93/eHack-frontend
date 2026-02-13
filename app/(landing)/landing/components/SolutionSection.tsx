'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#ff6b00] shrink-0 mt-0.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mx-auto mb-2 text-gray-400">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mx-auto mb-2 text-gray-400">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const AwardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mx-auto mb-2 text-gray-400">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
);

const programs = [
    {
        title: 'CEH Masterclass | v13 AI',
        subtitle: 'The Gold Standard in Hacking',
        features: [
            "Master Real-World Ethical Hacking with AI-Powered Labs",
            "Globally Recognized, Fully Proctored Practical Certification",
            "Become Job-Ready with AI-Enhanced Training",
            "Official EC-Council Materials & Vouchers"
        ],
        meta: {
            duration: '4 Months',
            hours: '100+ Hours',
            certs: '3 Global Certs'
        },
        badge: 'Fastest Path',
        accent: '#ff6b00',
        certificateImages: [
            "/certificates/masterclass-2.jpeg",
            "/certificates/masterclass-3.jpeg",
            "/certificates/cert-ceh.jpg"
        ],
        marqueeCerts: ["CEH", "CEH Practical", "CEH Master"]
    },
    {
        title: 'Graduate Program',
        subtitle: 'Comprehensive Cyber Career Foundation',
        features: [
            "Industry-Integrated AI-Powered Curriculum",
            "Live Labs, Real Attack Simulations & Tool Mastery",
            "Career-Launch Focus with Global Certification Pathways",
            "CND & CSCU Certification Modules"
        ],
        meta: {
            duration: '7-9 Months',
            hours: '200+ Hours',
            certs: '2 Global Certs'
        },
        badge: 'Most Popular',
        accent: '#ff6b00',
        featured: true,
        certificateImages: [
            "/certificates/cert-cscu.jpg",
            "/certificates/certificate-cnd.jpg"
        ],
        marqueeCerts: ["CSCU", "CND"]
    },
    {
        title: "Master's Program",
        subtitle: 'Advanced Cyber Leadership Training',
        features: [
            "Advanced AI-Driven Cybersecurity Mastery",
            "Real-World Cyber Range & Enterprise Attack Simulations",
            "Leadership Role - Focused Career Acceleration",
            "6 Global Certifications Bundle"
        ],
        meta: {
            duration: '9-12 Months',
            hours: '300+ Hours',
            certs: '6 Global Certs'
        },
        badge: 'Elite Level',
        accent: '#ff6b00',
        certificateImages: [
            "/certificates/cert-ceh.jpg",
            "/certificates/cert-cpent.jpg",
            "/certificates/cert-chfi.jpg",
            "/certificates/certificate-cnd.jpg",
            "/certificates/cert-cscu.jpg",
            "/certificates/lpt-certification.jpg"
        ],
        marqueeCerts: ["CSCU", "CND", "CEH", "CHFI", "CPENT", "LPT"]
    }
];

const SolutionSection = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (index: number) => {
        if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        leaveTimeout.current = setTimeout(() => {
            setHoveredCard(null);
        }, 200); // Increased buffer to 200ms for total stability
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(card,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            delay: index * 0.2,
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-slate-50 text-gray-900 overflow-hidden relative border-t border-gray-200">
            {/* Background Pattern - Matching ProblemSection */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            ></div>

            <div className="container mx-auto px-6 lg:px-12 max-w-[1300px] relative z-10">

                {/* Header - Contradicting the Problem Section */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h2 className="text-[#ff6b00] font-bold tracking-widest uppercase mb-4 text-sm md:text-base">The Roadmap</h2>
                    <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                        How You Can <span className="text-[#ff6b00]">Finally Become</span> An Ethical Hacker
                    </h3>
                    <p className="text-[#1f2937] text-lg md:text-xl max-w-2xl mx-auto">
                        Stop the endless loop of tutorials. Choose a structured path designed by industry experts to take you from zero to job-ready.
                    </p>
                </div>

                {/* Solutions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <div
                            key={index}
                            ref={addToRefs}
                            className={`bg-white border rounded-2xl p-8 transition-all duration-500 group shadow-lg flex flex-col h-full relative ${index === hoveredCard
                                ? 'z-[100] border-[#ff6b00] ring-4 ring-[#ff6b00]/10 shadow-2xl'
                                : (program.featured ? 'border-[#ff6b00] ring-1 ring-[#ff6b00]/20 z-10' : 'border-gray-200 z-0 hover:border-[#ff6b00]/30 shadow-md')
                                }`}
                        >
                            {/* Badge */}
                            <div className={`absolute -top-3 left-8 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${program.featured ? 'bg-[#ff6b00] text-white' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {program.badge}
                            </div>

                            <div className="mb-6 mt-2">
                                <h4 className="text-2xl font-black mb-2 text-[#1f2937]">{program.title}</h4>
                                <p className="text-[#ff6b00] font-bold text-sm uppercase tracking-wide">{program.subtitle}</p>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                {program.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckIcon />
                                        <p className="text-[#4b5563] text-sm font-medium leading-relaxed">{feature}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Meta Info */}
                            <div className="grid grid-cols-3 gap-2 py-6 border-y border-gray-100 mb-8">
                                <div className="text-center">
                                    <ClockIcon />
                                    <p className="text-[10px] uppercase text-gray-500 font-bold">Duration</p>
                                    <p className="text-xs font-black text-[#1f2937]">{program.meta.duration}</p>
                                </div>
                                <div className="text-center border-x border-gray-100">
                                    <UsersIcon />
                                    <p className="text-[10px] uppercase text-gray-500 font-bold">Hours</p>
                                    <p className="text-xs font-black text-[#1f2937]">{program.meta.hours}</p>
                                </div>
                                <div className="text-center">
                                    <AwardIcon />
                                    <p className="text-[10px] uppercase text-gray-500 font-bold">Certs</p>
                                    <p className="text-xs font-black text-[#1f2937]">{program.meta.certs}</p>
                                </div>
                            </div>

                            {/* Marquee Certification Strip */}
                            {program.marqueeCerts && (
                                <div className="w-full bg-gray-50/80 py-2 border-y border-gray-100/50 mb-2 overflow-hidden flex whitespace-nowrap mask-fade-edges h-10 items-center">
                                    <style dangerouslySetInnerHTML={{
                                        __html: `
                                        @keyframes marquee {
                                            0% { transform: translateX(0); }
                                            100% { transform: translateX(-50%); }
                                        }
                                        .animate-marquee {
                                            display: flex;
                                            animation: marquee 20s linear infinite;
                                            width: max-content;
                                        }
                                        .mask-fade-edges {
                                            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                                        }
                                    `}} />
                                    <div className="animate-marquee gap-8 items-center px-4">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="flex gap-8 items-center">
                                                {program.marqueeCerts?.map((cert, idx) => (
                                                    <span key={`${i}-${idx}`} className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center">
                                                        <span className="text-[#ff6b00]">{cert.substring(0, 2)}</span>
                                                        <span className="text-gray-900">{cert.substring(2)}</span>
                                                        <span className="mx-6 text-gray-300 font-light translate-y-[0.5px]">|</span>
                                                    </span>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Certification Spread in Cards */}
                            {program.certificateImages && (
                                <div
                                    className="relative h-44 mb-14 mt-4 flex justify-center items-center cursor-pointer"
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {/* Hit Area Expansion: Keeps certificates open while fanned out */}
                                    <div className={`absolute -inset-x-20 -inset-y-10 z-0 transition-opacity duration-300 ${index === hoveredCard ? 'block' : 'hidden'}`}></div>

                                    {program.certificateImages.map((img, imgIdx) => {
                                        const total = program.certificateImages!.length;
                                        const offset = imgIdx - (total - 1) / 2;
                                        const isHovered = hoveredCard === index;

                                        // Elite Fan Spread Calculations - Precision Targeted
                                        const spreadValue = total > 3 ? 90 : 110;
                                        const xPos = isHovered
                                            ? offset * spreadValue
                                            : offset * (total > 3 ? 15 : 25);

                                        const rotationValue = total > 3 ? 12 : 18;
                                        const rotation = isHovered
                                            ? offset * rotationValue
                                            : offset * (total > 3 ? 5 : 8);

                                        const yPos = isHovered
                                            ? Math.pow(offset, 2) * (total > 3 ? 15 : 20) + (total > 3 ? 10 : 15)
                                            : Math.abs(offset) * (total > 3 ? 5 : 8);

                                        const scale = isHovered
                                            ? (imgIdx === Math.floor(total / 2) ? 1.55 : 1.4)
                                            : 1;

                                        return (
                                            <div
                                                key={imgIdx}
                                                className="absolute h-[130px] rounded-md border-2 border-white shadow-2xl overflow-hidden bg-white flex items-center justify-center pointer-events-none transition-all duration-500"
                                                style={{
                                                    zIndex: isHovered
                                                        ? Math.round(100 - Math.abs(offset) * 10)
                                                        : (total - imgIdx),
                                                    transform: `
                                                        translateX(${xPos}px)
                                                        rotate(${rotation}deg)
                                                        translateY(${yPos}px)
                                                        scale(${scale})
                                                    `,
                                                    willChange: 'transform, opacity',
                                                    transitionTimingFunction: 'cubic-bezier(0.2, 1, 0.3, 1)'
                                                }}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Certificate ${imgIdx + 1}`}
                                                    className="h-full w-auto object-contain"
                                                />
                                                <div className="absolute inset-0 bg-black/[0.01]"></div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto ${program.featured
                                ? 'bg-[#ff6b00] text-white hover:bg-[#e66000] shadow-md shadow-[#ff6b00]/20'
                                : 'bg-gray-900 text-white hover:bg-black'
                                }`}>
                                Explore Program
                                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Path Footer */}
                <div className="mt-16 text-center">
                    <p className="text-gray-500 font-medium italic text-sm">
                        * All programs include intensive hands-on labs and placement assistance.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SolutionSection;
