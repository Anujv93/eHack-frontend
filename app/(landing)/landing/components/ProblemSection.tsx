'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProblemSection = () => {
    const sectionRef = useRef(null);
    const problemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Specific Animations for Visuals

            // 1. YouTube/Tutorial Hell - Infinite Scroll
            gsap.to(".tutorial-scroll", {
                yPercent: -50,
                ease: "none",
                duration: 10,
                repeat: -1
            });

            // 2. Theory vs Practice - Endless Book
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".book-container",
                    start: "top 80%"
                }
            });

            // Continuous page flipping
            gsap.to(".book-page", {
                duration: 2,
                rotateY: -180,
                ease: "power1.inOut",
                stagger: {
                    each: 0.5,
                    repeat: -1,
                    repeatDelay: 0.5
                },
                transformOrigin: "left center"
            });

            // 3. ATS Filter Reject (Interactive & Premium)
            const tl3 = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
            
            tl3.set(".resume-card", { y: -100, opacity: 0, scale: 0.9, rotation: -2 })
               .set(".hr-laser", { top: "-10%", opacity: 0 })
               .set(".hr-laser-light", { top: "-10%", opacity: 0, height: 0 })
               .set(".reject-stamp", { scale: 4, opacity: 0 })
               .set(".terminal-output", { opacity: 0, x: 10 })
               .set(".err-hl", { x: "-100%" })
               .set(".status-text", { textContent: "READY", color: "#fff" })
               
               // Drop in securely
               .to(".resume-card", { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.6)" })
               
               // Initiate Scan
               .set(".status-text", { textContent: "SCANNING", color: "#facc15" })
               .to(".terminal-output", { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" })
               .to(".hr-laser", { opacity: 1, duration: 0.1 }, "<")
               .to(".hr-laser-light", { opacity: 1, height: 80, duration: 0.1 }, "<")
               
               // Sweep Down
               .to(".hr-laser", { top: "110%", duration: 1.2, ease: "power1.inOut" })
               .to(".hr-laser-light", { top: "110%", duration: 1.2, ease: "power1.inOut" }, "<")
               
               // Redact lines as laser passes
               .to(".err-hl", { x: "0%", duration: 0.1, stagger: 0.2 }, "-=1.0")

               // Scan Complete
               .to(".hr-laser, .hr-laser-light", { opacity: 0, duration: 0.1 })
               .set(".status-text", { textContent: "FAILED", color: "#ef4444" })
               
               // Stamp Impact (Violent)
               .to(".reject-stamp", { scale: 1, opacity: 1, duration: 0.3, ease: "power4.in" })
               // Impact Shakes the card heavily
               .to(".resume-card", { x: "random(-8, 8)", y: "random(-8, 8)", rotation: "random(-5, 5)", duration: 0.04, yoyo: true, repeat: 7, repeatRefresh: true })
               
               // Discard violently
               .to(".terminal-output", { opacity: 0, x: 10, duration: 0.2 }, "-=0.2")
               .to(".resume-card", { 
                   y: 180, 
                   x: 60,
                   rotation: 35, 
                   scale: 0.6,
                   opacity: 0, 
                   duration: 0.5, 
                   ease: "power2.in" 
               });

            // 4. VOID Stamp
            gsap.to(".void-stamp", {
                opacity: 0.8,
                scale: 1,
                duration: 0.3,
                delay: 1,
                ease: "power4.out",
                repeat: -1,
                repeatDelay: 2,
                yoyo: true
            });

            // 5. The Literal "Unguided" Maze
            const tl5 = gsap.timeline({ repeat: -1 });

            // Initial state
            tl5.set(".maze-chaos-path, .maze-chaos-glow", { strokeDasharray: 400, strokeDashoffset: 400 })
               .set(".maze-user-dot", { x: 10, y: 96, opacity: 1, scale: 1 })
               .set(".dead-end-overlay", { opacity: 0, scale: 1.1 })
               .set(".years-counter", { innerText: "0" });

            // Start HUD timer (3.81s total run)
            tl5.to(".years-counter", { innerText: 4, duration: 3.81, snap: "innerText", ease: "none" }, 0);
            
            // Draw path smoothly
            tl5.to(".maze-chaos-path, .maze-chaos-glow", { strokeDashoffset: 19, duration: 3.81, ease: "none" }, 0); 

            // Hardcode path tracing (perfect sync)
            let t = 0;
            tl5.to(".maze-user-dot", { x: 40, y: 96, duration: 0.3, ease: "none" }, t); t += 0.3;
            tl5.to(".maze-user-dot", { x: 40, y: 40, duration: 0.56, ease: "none" }, t); t += 0.56;
            tl5.to(".maze-user-dot", { x: 80, y: 40, duration: 0.4, ease: "none" }, t); t += 0.4;
            tl5.to(".maze-user-dot", { x: 80, y: 110, duration: 0.7, ease: "none" }, t); t += 0.7;
            tl5.to(".maze-user-dot", { x: 120, y: 110, duration: 0.4, ease: "none" }, t); t += 0.4;
            tl5.to(".maze-user-dot", { x: 120, y: 80, duration: 0.3, ease: "none" }, t); t += 0.3;
            tl5.to(".maze-user-dot", { x: 180, y: 80, duration: 0.6, ease: "none" }, t); t += 0.6;
            tl5.to(".maze-user-dot", { x: 180, y: 115, duration: 0.35, ease: "none" }, t); t += 0.35;
            tl5.to(".maze-user-dot", { x: 160, y: 115, duration: 0.2, ease: "none" }, t); t += 0.2;

            // Hit Dead End at (160, 115)
            tl5.to(".dead-end-overlay", { opacity: 1, scale: 1, duration: 0.15, ease: "power4.out" }, t);
            tl5.to(".maze-user-dot", { scale: 1.5, opacity: 0.5, yoyo: true, repeat: 5, duration: 0.05, ease: "none", filter: "drop-shadow(0 0 10px #fff)" }, t);
            tl5.to(".maze-error-glitch", { x: "random(-4, 4)", y: "random(-2, 2)", duration: 0.05, repeat: 6, yoyo: true, repeatRefresh: true }, t);
               
            // Full Reset
            tl5.to(".maze-chaos-path, .maze-chaos-glow, .maze-user-dot, .dead-end-overlay", { opacity: 0, duration: 0.5 }, "+=0.6")
               .set(".maze-chaos-path, .maze-chaos-glow", { strokeDashoffset: 400, opacity: 1 });


        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !problemsRef.current.includes(el)) {
            problemsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="py-6 sm:py-8 bg-slate-50 text-gray-900 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            ></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1300px] relative z-10">

                {/* Header */}
                <div className="text-center mb-8 max-w-4xl mx-auto">
                    <h2 className="text-[#ff6b00] font-bold tracking-widest uppercase mb-4 text-sm md:text-base">The Reality Check</h2>
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                        Why You Are <span className="text-[#ff6b00]">Not An Ethical Hacker</span> Yet
                        <span className="text-gray-900">...</span>
                    </h3>
                    <p className="text-[#1f2937] text-lg md:text-xl max-w-2xl mx-auto">
                        Most aspiring hackers are stuck in a cycle of passive learning and zero results. Does this sound familiar?
                    </p>
                </div>

                {/* Problems Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">

                    {/* Problem 1: Tutorial Hell */}
                    <div ref={addToRefs} className="bg-white border border-[#ff6b00] rounded-2xl p-5 sm:p-8 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <div className="h-48 bg-gray-900 rounded-xl mb-6 overflow-hidden relative border border-gray-800 shadow-inner flex flex-col">
                            {/* Browser Header */}
                            <div className="absolute top-0 left-0 w-full h-8 bg-gray-800 flex items-center px-3 gap-2 z-10 border-b border-gray-700">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                </div>
                                <div className="ml-2 px-2 py-0.5 bg-gray-900 rounded-md text-[10px] text-gray-500 font-mono w-3/4 truncate">
                                    youtube.com/watch?v=how-to-hack-nasa
                                </div>
                            </div>

                            {/* Video List Container */}
                            <div className="flex-1 mt-8 relative overflow-hidden bg-gray-900">
                                {/* Infinite Scrolling List */}
                                <div className="tutorial-scroll absolute top-0 left-0 w-full p-4 space-y-3">
                                    {/* Active Video (Blue Accent) */}
                                    <div className="flex gap-3 relative p-2 rounded bg-gray-800/80 border border-blue-500/30">
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 box-shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                                        <div className="w-16 h-10 bg-gray-800 rounded shrink-0 relative overflow-hidden group-hover:brightness-110">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-0 h-0 border-l-[6px] border-l-blue-500 border-y-[4px] border-y-transparent ml-1"></div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-2/3"></div>
                                        </div>
                                        <div className="space-y-1.5 w-full pt-1">
                                            <div className="h-2 bg-gray-700/80 rounded w-3/4 animate-pulse"></div>
                                            <div className="h-2 bg-gray-800/80 rounded w-1/2"></div>
                                        </div>
                                    </div>

                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="flex gap-3 opacity-60 hover:opacity-100 transition-opacity">
                                            <div className="w-16 h-10 bg-gray-800 rounded shrink-0"></div>
                                            <div className="space-y-1.5 w-full pt-1">
                                                <div className="h-2 bg-gray-700/50 rounded w-3/4"></div>
                                                <div className="h-2 bg-gray-800/50 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={`dup-${i}`} className="flex gap-3 opacity-60 hover:opacity-100 transition-opacity">
                                            <div className="w-16 h-10 bg-gray-800 rounded shrink-0"></div>
                                            <div className="space-y-1.5 w-full pt-1">
                                                <div className="h-2 bg-gray-700/50 rounded w-3/4"></div>
                                                <div className="h-2 bg-gray-800/50 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <span className="text-[#ff6b00]">#1</span> The "Tutorial Hell" Loop
                        </h4>
                        <p className="text-[#1f2937] text-sm leading-relaxed font-medium">
                            Watching hundreds of "How to Hack" videos without ever touching a real terminal. Passive consumption creates a false sense of competence.
                        </p>
                    </div>

                    {/* Problem 2: Theory Over Practice */}
                    <div ref={addToRefs} className="bg-white border border-[#ff6b00] rounded-2xl p-5 sm:p-8 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <div className="h-48 bg-gray-50 rounded-xl mb-6 relative border border-gray-100 shadow-inner overflow-hidden flex flex-col items-center justify-center p-4">
                            {/* Book Container */}
                            <div className="book-container relative w-32 h-40 perspective-[1000px] -mt-5">
                                {/* Back Cover */}
                                <div className="absolute inset-0 bg-[#0f172a] rounded-r-lg shadow-2xl border-l-[12px] border-[#1e293b]"></div>

                                {/* Static Right Pages - With Text */}
                                <div className="absolute inset-y-2 right-2 left-[14px] bg-white border-l border-gray-200 rounded-r-md shadow-sm overflow-hidden flex flex-col p-2">
                                    <div className="text-[4px] leading-[6px] text-gray-400 text-justify font-serif">
                                        <b className="block mb-1 text-center text-[5px] text-gray-600">Chapter 4: Cryptography</b>
                                        Cryptography is the practice and study of techniques for secure communication in the presence of adversarial behavior. More generally, cryptography is about constructing and analyzing protocols that prevent third parties or the public from reading private messages. Modern cryptography exists at the intersection of the disciplines of mathematics, computer science, information security, electrical engineering, digital signal processing.
                                        <br /><br />
                                        Core concepts include confidentiality, data integrity, authentication, and non-repudiation.
                                    </div>
                                </div>

                                {/* Flipping Pages - With Text */}
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="book-page absolute inset-y-2 right-2 left-[14px] bg-[#f8fafc] border border-gray-200 border-l-gray-300 rounded-r-md origin-left shadow-sm backface-hidden overflow-hidden" style={{ zIndex: 10 - i }}>
                                        <div className="h-full w-full p-2 bg-gradient-to-r from-gray-100 via-white to-white">
                                            <div className="text-[4px] leading-[6px] text-gray-400 text-justify font-serif opacity-80">
                                                <b className="block mb-1 text-center text-[5px] text-gray-600">RSA Algorithm {i}</b>
                                                RSA (Rivest–Shamir–Adleman) is a public-key cryptosystem that is widely used for secure data transmission. It is also one of the oldest. The acronym RSA comes from the surnames of Ron Rivest, Adi Shamir, and Leonard Adleman, who publicly described the algorithm in 1977. An equivalent system was developed secretly at GCHQ.
                                                <br /><br />
                                                The security of RSA relies on the practical difficulty of factoring the product of two large prime numbers.
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Front Cover Label */}
                                <div className="absolute -bottom-4 left-0 right-0 text-center">
                                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Theory.pdf</span>
                                </div>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <span className="text-[#ff6b00]">#2</span> All Theory, No Labs
                        </h4>
                        <p className="text-[#1f2937] text-sm leading-relaxed font-medium">
                            Universities teach you the <i>history</i> of encryption. We teach you how to fast-track breaking it. You need muscle memory, not memorization.
                        </p>
                    </div>

                    {/* Problem 3: Zero Career Guidance */}
                    <div ref={addToRefs} className="bg-white border border-[#ff6b00] rounded-2xl p-5 sm:p-8 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <div className="h-48 bg-slate-900 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center shadow-inner group-hover/card:border-red-500/50 transition-colors">
                            {/* Grid Background & Vignette */}
                            <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `linear-gradient(#f43f5e 1px, transparent 1px), linear-gradient(90deg, #f43f5e 1px, transparent 1px)`, backgroundSize: '16px 16px' }}></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.95)_100%)]"></div>
                            
                            {/* Top Left System Info */}
                            <div className="absolute top-2 left-3 flex flex-col gap-0.5 opacity-90">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                                    <span className="text-[10px] font-mono text-white tracking-wider font-bold">ATS_BOT_v2.1</span>
                                </div>
                                <span className="text-[8px] font-mono text-red-400">STATUS: <span className="status-text text-white">READY</span></span>
                            </div>

                            {/* Right Side Terminal (Scanning output) */}
                            <div className="terminal-output absolute right-3 top-8 flex flex-col gap-1 w-16 opacity-0">
                                <span className="text-[6.5px] font-mono text-gray-400 opacity-80">Extracting...</span>
                                <span className="text-[6px] font-mono text-red-500 font-bold bg-red-500/10 px-0.5 rounded">Exp. Not Found</span>
                                <span className="text-[6px] font-mono text-red-500 font-bold bg-red-500/10 px-0.5 rounded">No Certs</span>
                                <span className="text-[6px] font-mono text-gray-400 opacity-80 mt-1">Keywords: 0</span>
                                <div className="w-full h-1 mt-0.5 bg-gray-800 rounded overflow-hidden">
                                    <div className="h-full bg-red-500 w-[15%] shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
                                </div>
                            </div>

                            {/* Resume Card */}
                            <div className="resume-card relative w-24 h-[132px] bg-[#f8fafc] shadow-[0_0_20px_rgba(0,0,0,0.6)] rounded flex flex-col p-3 gap-2 z-10 mx-auto">
                                <div className="flex gap-2 items-center mb-1 bg-white p-1 rounded shadow-sm border border-gray-100">
                                    <div className="w-6 h-6 rounded bg-slate-300 shrink-0"></div>
                                    <div className="flex-1 space-y-1">
                                        <div className="h-2 bg-slate-400 w-full rounded"></div>
                                        <div className="h-1.5 bg-slate-300 w-2/3 rounded"></div>
                                    </div>
                                </div>
                                <div className="resume-line h-1.5 bg-slate-300 w-full rounded relative overflow-hidden"><div className="err-hl absolute inset-0 bg-red-500/80 -translate-x-full"></div></div>
                                <div className="resume-line h-1.5 bg-slate-300 w-5/6 rounded relative overflow-hidden"><div className="err-hl absolute inset-0 bg-red-500/80 -translate-x-full"></div></div>
                                <div className="resume-line h-1.5 bg-slate-300 w-4/6 rounded relative overflow-hidden"><div className="err-hl absolute inset-0 bg-red-500/80 -translate-x-full"></div></div>
                                <div className="resume-line mt-auto h-2 bg-slate-300 w-1/3 rounded relative overflow-hidden"><div className="err-hl absolute inset-0 bg-red-500/80 -translate-x-full"></div></div>
                                
                                {/* Rejected Stamp */}
                                <div className="reject-stamp absolute inset-0 flex items-center justify-center bg-red-500/10 rounded backdrop-blur-[1px]">
                                    <div className="border-[3px] border-red-600 text-red-600 font-black text-[15px] tracking-[0.2em] py-1 px-2.5 rotate-[-20deg] shadow-[0_4px_12px_rgba(220,38,38,0.3)] bg-white/95 ring-4 ring-white">REJECTED</div>
                                </div>
                            </div>
                            
                            {/* Scanning Laser */}
                            <div className="hr-laser absolute left-0 right-0 h-[2px] bg-red-500 z-20 shadow-[0_0_20px_5px_rgba(239,68,68,0.9)] flex items-center justify-center mix-blend-screen">
                                <div className="w-12 h-[3px] bg-white rounded-full opacity-90 shadow-[0_0_15px_2px_#fff]"></div>
                            </div>
                            
                            {/* Scanner light overlay */}
                            <div className="hr-laser-light absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-transparent via-red-500/10 to-red-500/30 z-10 opacity-0 border-b border-red-500/40 mix-blend-screen pointer-events-none"></div>

                            {/* Crosshairs corner marks */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gray-600 opacity-50"></div>
                            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gray-600 opacity-50"></div>
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gray-600 opacity-50"></div>
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gray-600 opacity-50"></div>
                        </div>
                        <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <span className="text-[#ff6b00]">#3</span> Zero Career Guidance
                        </h4>
                        <p className="text-[#1f2937] text-sm leading-relaxed font-medium">
                            Learning skills is only half the battle. Without a roadmap to navigate HR filters and technical interviews, your resume ends up in the void.
                        </p>
                    </div>

                    {/* Problem 4: No Valid Certification */}
                    <div ref={addToRefs} className="bg-white border border-[#ff6b00] rounded-2xl p-5 sm:p-8 transition-all duration-300 group lg:col-start-1 lg:justify-self-end shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <div className="h-48 bg-gray-50 rounded-xl mb-6 relative flex items-center justify-center border border-gray-100 overflow-hidden shadow-inner">
                            {/* Certificate */}
                            <div className="relative w-32 h-24 bg-[#fffaeb] rounded border-4 border-[#92400e] flex flex-col items-center justify-center p-2 shadow-lg">
                                <div className="text-[6px] text-center text-gray-500 mb-1">CERTIFICATE OF COMPLETION</div>
                                <div className="w-16 h-0.5 bg-gray-300 mb-1"></div>
                                <div className="w-20 h-0.5 bg-gray-300 mb-2"></div>
                                <div className="w-6 h-6 rounded-full bg-[#eca93e] opacity-50"></div>
                            </div>
                            {/* VOID Stamp */}
                            <div className="void-stamp absolute text-red-600 font-black text-4xl border-4 border-red-600 px-2 py-1 rotate-[-15deg] opacity-0 scale-150 tracking-widest bg-white/80">
                                VOID
                            </div>
                        </div>
                        <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <span className="text-[#ff6b00]">#4</span> Useless Paper Certs
                        </h4>
                        <p className="text-[#1f2937] text-sm leading-relaxed font-medium">
                            Most "completion certificates" are ignored by recruiters. Industry demands globally recognized, proctored certifications (like CEH, OSCP), not PDF participation trophies.
                        </p>
                    </div>

                    {/* Problem 5: Unguided Path */}
                    <div ref={addToRefs} className="bg-white border border-[#ff6b00] rounded-2xl p-5 sm:p-8 transition-all duration-300 group lg:col-start-2 lg:justify-self-start lg:col-span-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <div className="h-48 bg-slate-900 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center shadow-inner group-hover/maze:border-orange-500/50 transition-colors">
                            {/* Background Grid */}
                            <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: `linear-gradient(rgba(249,115,22,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.1) 1px, transparent 1px)`, backgroundSize: '16px 16px' }}></div>
                            
                            {/* HUD Timer */}
                            <div className="absolute top-4 right-4 bg-slate-950/90 border border-slate-700 px-3 py-1.5 rounded flex flex-col items-end backdrop-blur z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                <span className="text-[7.5px] text-gray-400 font-mono tracking-widest uppercase mb-0.5">Time Wasted</span>
                                <span className="font-mono text-orange-500 font-bold text-[13px] leading-none tracking-wider"><span className="years-counter">0</span> YEARS</span>
                            </div>

                            {/* Center SVG Maze Container */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 192" preserveAspectRatio="xMidYMid slice">
                                {/* Maze Walls (Slate/Cyan vibes) */}
                                <g stroke="#334155" strokeWidth="4" strokeLinecap="square" fill="none">
                                    {/* Outer Border */}
                                    <path d="M 20,80 L 20,20 L 300,20 L 300,172 L 20,172 L 20,112" />
                                    
                                    {/* Dead End Box Context */}
                                    <path d="M 150,130 L 150,105 L 170,105 L 170,130" stroke="#475569" />
                                    <path d="M 148,131 L 172,131" stroke="#ef4444" strokeWidth="2" opacity="0.6" /> {/* Dead end warning line */}
                                    
                                    {/* Obstacles & Corridors */}
                                    <path d="M 60,172 L 60,60" />
                                    <path d="M 60,20 L 60,40" />
                                    <path d="M 60,60 L 100,60" />
                                    <path d="M 100,20 L 100,90" />
                                    <path d="M 140,172 L 140,130 L 200,130" />
                                    <path d="M 140,60 L 220,60 L 220,100" />
                                    <path d="M 260,20 L 260,140" />
                                    <path d="M 180,172 L 180,150 L 280,150" />
                                </g>

                                {/* The Chaotic Red Traveled Path */}
                                <path className="maze-chaos-glow" d="M 10,96 L 40,96 L 40,40 L 80,40 L 80,110 L 120,110 L 120,80 L 180,80 L 180,115 L 160,115" 
                                      fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" filter="blur(3px)" />
                                      
                                <path className="maze-chaos-path" d="M 10,96 L 40,96 L 40,40 L 80,40 L 80,110 L 120,110 L 120,80 L 180,80 L 180,115 L 160,115" 
                                      fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                                {/* Moving Avatar Dot perfectly synced within SVG grid */}
                                <g className="maze-user-dot">
                                    <circle cx="0" cy="0" r="5" fill="#ef4444" opacity="0.8" />
                                    <circle cx="0" cy="0" r="2" fill="#ffffff" />
                                </g>
                            </svg>

                            {/* Interactive Error Overlay triggered on Dead End */}
                            <div className="dead-end-overlay absolute inset-0 bg-red-950/60 backdrop-blur-[2px] z-30 flex items-center justify-center pointer-events-none">
                                <div className="maze-error-glitch bg-black/90 px-4 py-2 border border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.7)] rounded flex flex-col items-center">
                                    <span className="text-red-500 font-mono font-black text-lg tracking-widest drop-shadow-[0_0_8px_#ef4444]">DEAD END</span>
                                    <span className="text-red-400 text-[8px] tracking-[0.2em] font-mono mt-0.5">BURN_OUT_DETECTED</span>
                                </div>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <span className="text-[#ff6b00]">#5</span> The "Unguided" Maze
                        </h4>
                        <p className="text-[#1f2937] text-sm leading-relaxed font-medium">
                            Trying to piece together a curriculum from random blog posts is efficient at only one thing: wasting years of your life. You need a structured, battle-tested path.
                        </p>
                    </div>
                </div>



            </div>
        </section>
    );
};

export default ProblemSection;
