'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Shield, Crosshair, Network, Activity, TrendingUp, Briefcase, ChevronRight, ChevronLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// =======================
// SUB-COMPONENTS (SLIDES)
// =======================

const SlideTools = ({ handleCtaClick }: { handleCtaClick: (source: string) => void }) => (
    <div className="peeking-card overflow-hidden shadow-2xl bg-white border border-gray-100 flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 min-h-[320px] lg:min-h-[380px]">
        {/* Left Content */}
        <div className="p-6 lg:p-10 flex flex-col justify-center bg-white z-10 relative">
            <h3 className="text-2xl md:text-5xl font-black text-gray-900 mb-3 md:mb-4 leading-[1.1]">
                Master Industry-{' '}<br className="hidden md:block" />Standard Tools
            </h3>
            <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-lg font-medium">
                Equip yourself with the tools the pros use. Master the arsenal required to defend and attack at an elite level.
            </p>
            <div>
                <button onClick={() => handleCtaClick('Tools Mastery Inquiry')} className="inline-flex items-center gap-2 bg-[#ff6b00] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold hover:bg-[#e66000] transition-all hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:-translate-y-1 group">
                    Get Your Free Roadmap
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
        {/* Right Visual */}
        <div className="bg-[#0f172a] p-4 md:p-6 lg:p-10 relative overflow-hidden flex items-center justify-center group border-l border-gray-100/10 min-h-[280px] md:min-h-[350px]">
            {/* Grid background effect */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff15 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500 rounded-full blur-[80px] opacity-15 pointer-events-none"></div>

            {/* Orbit System Container */}
            <div className="relative w-full h-full flex items-center justify-center max-w-[300px] md:max-w-[400px] min-h-[250px] md:min-h-[360px]">

                {/* Center Element */}
                <div className="absolute z-20 w-16 h-16 md:w-24 md:h-24 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)] border border-white/20 z-30 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500 opacity-10"></div>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kalilinux/kalilinux-original.svg" alt="Kali Linux" className="w-10 h-10 md:w-16 md:h-16 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                </div>

                {/* Orbit Ring 1 (Visual) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 w-[clamp(120px,30vw,180px)] h-[clamp(120px,30vw,180px)]"></div>

                {/* Orbit Ring 2 (Visual) - Increased space */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 border-dashed w-[clamp(220px,55vw,340px)] h-[clamp(220px,55vw,340px)]"></div>

                {/* Planets */}
                <div className="absolute inset-0">
                    {[
                        { src: 'https://cdn.simpleicons.org/metasploit/white', name: "Metasploit", ring: 1, angle: 0 },
                        { src: 'https://cdn.simpleicons.org/wireshark/0A58CA', name: "Wireshark", ring: 1, angle: 120 },
                        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', name: "Python", ring: 1, angle: 240 },

                        { src: 'https://www.kali.org/tools/burpsuite/images/burpsuite-logo.svg', name: "Burp", ring: 2, angle: 45 },
                        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', name: "Docker", ring: 2, angle: 105 },
                        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg', name: "Bash", ring: 2, angle: 165 },
                        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg', name: "C", ring: 2, angle: 225 },
                        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg', name: "Go", ring: 2, angle: 285 },
                        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', name: "Git", ring: 2, angle: 345 }
                    ].map((tool, idx) => {
                        const radiusExpr = tool.ring === 1 ? 'clamp(60px, 15vw, 90px)' : 'clamp(110px, 27.5vw, 170px)';
                        const duration = tool.ring === 1 ? '30s' : '45s';
                        const direction = tool.ring === 1 ? 'normal' : 'reverse';

                        return (
                            <div
                                key={idx}
                                className="absolute inset-0 m-auto pointer-events-none"
                                style={{ animation: `orbit-spin ${duration} linear infinite ${direction}` }}
                            >
                                <div
                                    className="absolute top-1/2 left-1/2 flex items-center justify-center"
                                    style={{
                                        marginTop: '-1.75rem',
                                        marginLeft: '-1.75rem',
                                        transform: `rotate(${tool.angle}deg) translateX(${radiusExpr}) rotate(-${tool.angle}deg)`
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 md:w-14 md:h-14 bg-[#1f2937]/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center shadow-lg group hover:scale-125 hover:border-[#ff6b00]/70 hover:bg-[#1f2937] transition-all pointer-events-auto cursor-pointer z-40"
                                        style={{ animation: `orbit-counter-spin ${duration} linear infinite ${direction}` }}
                                    >
                                        <img src={tool.src} alt={tool.name} className={`w-5 h-5 md:w-8 md:h-8 object-contain ${tool.name === 'Bash' ? 'invert brightness-0 pt-0.5 md:pt-1' : ''}`} />
                                        <div className="absolute -top-7 bg-black text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none line-clamp-1">
                                            {tool.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
);

const SlideInternship = ({ handleCtaClick, terminalRef }: { handleCtaClick: (source: string) => void, terminalRef?: React.RefObject<HTMLDivElement | null> }) => (
    <div className="peeking-card overflow-hidden shadow-2xl bg-white border border-gray-100 flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 min-h-[320px] lg:min-h-[380px]">
        {/* Left Content */}
        <div className="p-6 lg:p-10 flex flex-col justify-center bg-white z-10 relative">
            <h3 className="text-2xl md:text-5xl font-black text-gray-900 mb-3 md:mb-4 leading-[1.1]">
                100% Stipend{' '}<br className="hidden md:block" />Internship
            </h3>
            <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-lg font-medium">
                Bypass the &quot;fresher&quot; tag by working on real-world vulnerabilities and live company projects through our guaranteed internship.
            </p>
            <div>
                <button onClick={() => handleCtaClick('Internship Application')} className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold hover:bg-black transition-all hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:-translate-y-1 group">
                    Apply For Internship
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
        {/* Right Visual - Terminal */}
        <div className="bg-[#1e1e1e] p-4 md:p-6 lg:p-10 relative overflow-hidden flex flex-col items-center justify-center border-l border-gray-100/10">
            <div className="w-full max-w-md bg-[#0d0d0d] rounded-lg md:rounded-xl border border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Terminal Header */}
                <div className="h-7 md:h-8 bg-[#2d2d2d] flex items-center px-3 md:px-4 gap-1.5 md:gap-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                    <div className="mx-auto text-[10px] md:text-xs text-gray-400 font-mono">root@kali:~</div>
                </div>
                {/* Terminal Body */}
                <div className="p-3 md:p-6 font-mono text-[10px] md:text-sm leading-relaxed h-[180px] md:h-[240px] overflow-hidden relative">
                    <div ref={terminalRef} className="space-y-2">
                        <div className="text-green-400"><span className="text-blue-400">root@kali</span>:<span className="text-blue-400">~</span>$ msfconsole -q</div>
                        <div className="text-gray-300">msf6 &gt; use exploit/windows/smb/ms17_010_eternalblue</div>
                        <div className="text-gray-300">msf6 exploit(<span className="text-red-400">ms17_010_eternalblue</span>) &gt; set RHOSTS 192.168.1.100</div>
                        <div className="text-gray-300">RHOSTS =&gt; 192.168.1.100</div>
                        <div className="text-gray-300">msf6 exploit(<span className="text-red-400">ms17_010_eternalblue</span>) &gt; exploit</div>
                        <div className="text-blue-300">[*] Started reverse TCP handler on 192.168.1.50:4444</div>
                        <div className="text-blue-300">[*] 192.168.1.100:445 - Connecting to target for exploitation.</div>
                        <div className="text-green-500 font-bold">[+] 192.168.1.100:445 - WIN</div>
                        <div className="text-green-400">meterpreter &gt; getuid</div>
                        <div className="text-gray-300">Server username: NT AUTHORITY\SYSTEM</div>
                        <div className="text-green-400 flex items-center gap-2">meterpreter &gt; <span className="w-2 h-4 bg-green-400 animate-pulse inline-block"></span></div>
                    </div>
                    {/* Scanline overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
                </div>
            </div>
        </div>
    </div>
);

const SlideDemand = ({ handleCtaClick }: { handleCtaClick: (source: string) => void }) => (
    <div className="peeking-card overflow-hidden shadow-2xl bg-white border border-gray-100 flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 min-h-[320px] lg:min-h-[380px]">
        {/* Left Content */}
        <div className="p-6 lg:p-10 flex flex-col justify-center bg-white z-10 relative">
            <h3 className="text-2xl md:text-5xl font-black text-gray-900 mb-3 md:mb-4 leading-[1.1]">
                Unprecedented{' '}<br className="hidden md:block" />Market Demand
            </h3>
            <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-lg font-medium">
                Enter an industry with zero clutter. Cybersecurity faces a global shortage. Be the specialized talent companies hunt for.
            </p>
            <div>
                <button onClick={() => handleCtaClick('Market Demand Inquiry')} className="inline-flex items-center gap-2 bg-[#ff6b00] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold hover:bg-[#e66000] transition-all hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:-translate-y-1 group">
                    Claim Your Spot Now
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
        {/* Right Visual - Newspaper Cutouts */}
        <div className="bg-[#f8fafc] p-4 md:p-6 lg:p-10 relative overflow-hidden flex flex-col items-center justify-center border-l border-gray-100 min-h-[280px] md:min-h-full">
            {/* Subtle dot pattern background */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

            <div className="relative w-full max-w-[260px] md:max-w-md h-[240px] md:h-[320px] flex items-center justify-center group z-10">

                {/* 1. Base Newspaper (Main News) */}
                <div className="absolute top-0 md:top-2 left-0 right-0 md:right-12 bg-[#fcf9f2] p-3 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transform -rotate-1 md:-rotate-2 hover:rotate-0 hover:z-40 hover:scale-[1.02] transition-all duration-300 border border-[#e5e0d8] z-10 cursor-pointer">
                    <div className="border-b-2 border-black pb-1 mb-2 md:mb-3 flex justify-between items-center">
                        <span className="font-serif font-black text-[10px] md:text-sm tracking-widest text-black">THE GLOBAL TIMES</span>
                        <span className="font-serif text-[8px] md:text-[10px] uppercase text-gray-600 font-bold">Industry Report</span>
                    </div>
                    <h4 className="font-serif text-xl md:text-4xl font-black text-black leading-[0.9] mb-2 md:mb-3 uppercase tracking-tighter">
                        Cybersecurity Hits <br />
                        <span className="border-b-[3px] border-black">0% Unemployment</span>
                    </h4>
                    <p className="font-serif text-[10px] md:text-xs text-gray-800 leading-snug hidden sm:block">
                        Companies are struggling to fill crucial security roles as global threat levels rise. Salaries skyrocket as businesses fight for experts.
                    </p>
                </div>

                {/* 2. Overlapping Cutout 1: 3.5 Million Jobs */}
                <div className="absolute bottom-0 md:bottom-6 right-0 md:-right-4 w-[150px] md:w-[240px] bg-[#fffcf5] p-2 md:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.15)] transform rotate-2 md:rotate-4 hover:rotate-0 hover:z-40 hover:scale-[1.05] transition-all duration-300 border border-[#d6d3cc] z-20 cursor-pointer">
                    <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-1 md:w-1.5 h-full min-h-[30px] md:min-h-[40px] bg-black"></div>
                        <div>
                            <span className="font-sans text-[7px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Forbes Tech</span>
                            <h5 className="font-serif text-xs md:text-lg font-black text-black leading-tight">
                                3.5 Million <span className="bg-yellow-200/70 px-1">Unfilled</span> <br />Seats Globally
                            </h5>
                        </div>
                    </div>
                    {/* Semitransparent Tape */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 md:w-16 h-4 md:h-5 bg-[#ffffff50] backdrop-blur-md border border-white/40 shadow-sm transform -rotate-2"></div>
                </div>

                {/* 3. Overlapping Cutout 2: 150% Salary Surge */}
                <div className="absolute bottom-14 md:bottom-20 left-0 md:-left-8 w-[130px] md:w-[200px] bg-[#fefdfb] p-2 md:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.18)] transform -rotate-3 md:-rotate-6 hover:rotate-0 hover:z-40 hover:scale-[1.05] transition-all duration-300 border border-[#e5e0d8] z-30 cursor-pointer">
                    <p className="font-sans text-[7px] md:text-[9px] font-bold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 md:w-3 md:h-3" /> Market Spike
                    </p>
                    <h5 className="font-serif text-xs md:text-base font-black text-black leading-tight mb-2">
                        Ethical Hackers See <br /><span className="underline decoration-[3px] decoration-gray-400">150%+ Salary Surge</span>
                    </h5>

                    {/* Red marker circle */}
                    <div className="absolute -right-2 -bottom-2 w-8 h-8 md:w-10 md:h-10 border-[2px] md:border-[3px] border-red-600 rounded-[80%_60%_70%_50%] opacity-80 pointer-events-none transform -rotate-6"></div>
                </div>
            </div>
        </div>
    </div>
);

// =======================
// MAIN COMPONENT EXCELLENCE
// =======================
export default function MarketDemandSection() {
    // 0: Clone of Slide 3
    // 1: Real Slide 1 (Tools)
    // 2: Real Slide 2 (Internship)
    // 3: Real Slide 3 (Demand)
    // 4: Clone of Slide 1
    const [activeIndex, setActiveIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const terminalLinesRef = useRef<HTMLDivElement>(null);
    const isPausedRef = useRef(false);

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPausedRef.current) {
                setIsTransitioning(true);
                setActiveIndex((current) => current + 1);
            }
        }, 6000); // 6 seconds per slide
        return () => clearInterval(interval);
    }, []);

    // Handle seamless looping snap
    useEffect(() => {
        if (!isTransitioning) return;

        let timer: NodeJS.Timeout;
        if (activeIndex === 4) { // Reached clone of Slide 1
            timer = setTimeout(() => {
                setIsTransitioning(false);
                setActiveIndex(1); // Snap back to real Slide 1
            }, 700); // Wait for CSS transition match
        } else if (activeIndex === 0) { // Reached clone of Slide 3
            timer = setTimeout(() => {
                setIsTransitioning(false);
                setActiveIndex(3); // Snap back to real Slide 3
            }, 700);
        }
        return () => clearTimeout(timer);
    }, [activeIndex, isTransitioning]);

    // Terminal typing animation for Slide 2 (activeIndex 2)
    useEffect(() => {
        if (activeIndex === 2 && terminalLinesRef.current) {
            const lines = terminalLinesRef.current.children;
            gsap.fromTo(lines,
                { opacity: 0, x: -10 },
                { opacity: 1, x: 0, duration: 0.1, stagger: 0.8, ease: "none" }
            );
        }
    }, [activeIndex]);

    const handleCtaClick = (source: string) => {
        window.dispatchEvent(new CustomEvent('openGlobalLeadModal', { detail: { source } }));
    };

    const handleNext = () => {
        if (activeIndex >= 4) return;
        setIsTransitioning(true);
        setActiveIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (activeIndex <= 0) return;
        setIsTransitioning(true);
        setActiveIndex(prev => prev - 1);
    };

    return (
        <section ref={containerRef} className="py-10 sm:py-16 bg-[#fafafa] relative overflow-hidden">
            {/* Top Curvy Wave Divider */}
            <div className="absolute top-0 left-0 w-full h-[20px] md:h-[30px] z-20 pointer-events-none -mt-[1px]">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="wave-top" x="0" y="0" width="120" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 0 0 L 0 15 Q 30 30, 60 15 T 120 15 L 120 0 Z" fill="#ffffff" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#wave-top)" style={{ filter: 'drop-shadow(0 3px 2px rgba(0,0,0,0.06))' }} />
                </svg>
            </div>

            {/* Bottom Curvy Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full h-[20px] md:h-[30px] z-20 pointer-events-none -mb-[1px] rotate-180 transform">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="wave-bottom" x="0" y="0" width="120" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 0 0 L 0 15 Q 30 30, 60 15 T 120 15 L 120 0 Z" fill="#ffffff" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#wave-bottom)" style={{ filter: 'drop-shadow(0 3px 2px rgba(0,0,0,0.06))' }} />
                </svg>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff6b00]/3 rounded-full blur-[120px] -mr-[400px] -mt-[400px] pointer-events-none z-0"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Carousel Navigation/Dots */}
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1f2937] leading-tight mb-3 md:mb-4">
                            The Industry standard.<br />
                            <span className="text-[#ff6b00]">Zero Compromise.</span>
                        </h2>
                        <p className="text-gray-600 text-sm md:text-xl max-w-2xl font-medium">
                            Step into a high-growth secure career with the right skills, real experience, and massive market demand.
                        </p>
                    </div>

                    {/* Carousel Controls */}
                    <div className="flex items-center gap-4 hidden md:flex">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#ff6b00] hover:border-[#ff6b00] transition-colors bg-white hover:shadow-md z-10"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="flex gap-2">
                            {[1, 2, 3].map((realIdx) => (
                                <button
                                    key={realIdx}
                                    onClick={() => {
                                        setIsTransitioning(true);
                                        setActiveIndex(realIdx);
                                    }}
                                    className={`h-2.5 rounded-full transition-all duration-500 ease-out ${activeIndex === realIdx || (activeIndex === 0 && realIdx === 3) || (activeIndex === 4 && realIdx === 1)
                                        ? 'w-10 bg-[#ff6b00]'
                                        : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    aria-label={`Go to slide ${realIdx}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#ff6b00] hover:border-[#ff6b00] transition-colors bg-white hover:shadow-md z-10"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Carousel Track (Full width for peeking) */}
            <div
                className="w-full relative overflow-hidden py-6 peeking-container"
                onMouseEnter={() => isPausedRef.current = true}
                onMouseLeave={() => isPausedRef.current = false}
            >
                <div
                    className="flex peeking-track"
                    style={{
                        transform: `translateX(calc(50vw - (var(--gap) / 2) - (var(--card-w) / 2) - ${activeIndex} * (var(--card-w) + var(--gap))))`,
                        transition: isTransitioning ? 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                    }}
                >
                    {/* Index 0: Clone of Slide 3 */}
                    <SlideDemand handleCtaClick={handleCtaClick} />

                    {/* Index 1: Real Slide 1 (Tools) */}
                    <SlideTools handleCtaClick={handleCtaClick} />

                    {/* Index 2: Real Slide 2 (Internship with Ref) */}
                    <SlideInternship handleCtaClick={handleCtaClick} terminalRef={terminalLinesRef} />

                    {/* Index 3: Real Slide 3 (Demand) */}
                    <SlideDemand handleCtaClick={handleCtaClick} />

                    {/* Index 4: Clone of Slide 1 */}
                    <SlideTools handleCtaClick={handleCtaClick} />
                </div>
            </div>

            {/* Mobile Navigation: Arrows + Dots */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex justify-center items-center gap-4 mt-2 md:hidden">
                    <button
                        onClick={handlePrev}
                        className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 active:text-[#ff6b00] active:border-[#ff6b00] transition-colors bg-white shadow-sm"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex gap-2">
                        {[1, 2, 3].map((realIdx) => (
                            <button
                                key={realIdx}
                                onClick={() => {
                                    setIsTransitioning(true);
                                    setActiveIndex(realIdx);
                                }}
                                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${activeIndex === realIdx || (activeIndex === 0 && realIdx === 3) || (activeIndex === 4 && realIdx === 1)
                                    ? 'w-8 bg-[#ff6b00]'
                                    : 'w-2.5 bg-gray-300'
                                    }`}
                                aria-label={`Go to slide ${realIdx}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 active:text-[#ff6b00] active:border-[#ff6b00] transition-colors bg-white shadow-sm"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .peeking-container {
                    --card-w: min(80vw, 1100px);
                    --gap: 2rem;
                }
                .peeking-card {
                    width: var(--card-w);
                    margin: 0 calc(var(--gap) / 2);
                    border-radius: 1.5rem;
                }
                .peeking-track {
                    /* gap defined in container */
                }
                @media (min-width: 769px) {
                    .peeking-card {
                        border-radius: 2.5rem;
                    }
                }
                @media (max-width: 768px) {
                    .peeking-container {
                        --card-w: 82vw;
                        --gap: 0.75rem;
                    }
                }
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                @keyframes orbit-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes orbit-counter-spin {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
            `}} />
        </section>
    );
}
