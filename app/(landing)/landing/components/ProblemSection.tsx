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
            // Animate each problem card on scroll
            problemsRef.current.forEach((card, index) => {
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

            // 3. Resumes to Trash
            gsap.to(".resume-paper", {
                y: 100,
                opacity: 0,
                stagger: 0.8,
                duration: 2,
                repeat: -1,
                ease: "power1.in",
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

            // 5. Chaos Path
            gsap.to(".chaos-path, .chaos-path-2", {
                strokeDashoffset: 0,
                duration: 3,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true
            });


        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !problemsRef.current.includes(el)) {
            problemsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="py-8 bg-slate-50 text-gray-900 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            ></div>

            <div className="container mx-auto px-6 lg:px-12 max-w-[1300px] relative z-10">

                {/* Header */}
                <div className="text-center mb-8 max-w-4xl mx-auto">
                    <h2 className="text-[#ff6b00] font-bold tracking-widest uppercase mb-4 text-sm md:text-base">The Reality Check</h2>
                    <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                        Why You Are <span className="text-[#ff6b00]">Not An Ethical Hacker</span> Yet
                        <span className="text-gray-900">...</span>
                    </h3>
                    <p className="text-[#1f2937] text-lg md:text-xl max-w-2xl mx-auto">
                        Most aspiring hackers are stuck in a cycle of passive learning and zero results. Does this sound familiar?
                    </p>
                </div>

                {/* Problems Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Problem 1: Tutorial Hell */}
                    <div ref={addToRefs} className="bg-white border border-[#ff6b00] rounded-2xl p-8 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
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
                    <div ref={addToRefs} className="bg-white border border-[#ff6b00] rounded-2xl p-8 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
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
                    <div ref={addToRefs} className="bg-white border border-[#ff6b00] rounded-2xl p-8 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <div className="h-48 bg-gray-50 rounded-xl mb-6 relative overflow-hidden border border-gray-100 shadow-inner flex justify-center">
                            {/* Trash Can */}
                            <div className="absolute bottom-4 w-16 h-20 border-2 border-gray-400 rounded-b-lg border-t-0 flex justify-center items-end pb-2 z-10 bg-gray-100">
                                <div className="w-1 h-12 bg-gray-300 mx-1"></div>
                                <div className="w-1 h-12 bg-gray-300 mx-1"></div>
                                <div className="w-1 h-12 bg-gray-300 mx-1"></div>
                            </div>
                            {/* Falling Resumes */}
                            <div className="resume-paper absolute top-4 w-10 h-14 bg-white border border-gray-200 opacity-80 rounded flex flex-col gap-1 p-1 items-center shadow-sm">
                                <div className="w-6 h-1 bg-gray-300 rounded"></div>
                                <div className="w-8 h-0.5 bg-gray-100"></div>
                                <div className="w-8 h-0.5 bg-gray-100"></div>
                                <div className="w-8 h-0.5 bg-gray-100"></div>
                            </div>
                            <div className="resume-paper absolute top-8 w-10 h-14 bg-gray-100 border border-gray-200 opacity-60 rounded flex flex-col gap-1 p-1 items-center shadow-sm" style={{ animationDelay: '1s' }}>
                                <div className="w-6 h-1 bg-gray-300 rounded"></div>
                                <div className="w-8 h-0.5 bg-gray-200"></div>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <span className="text-[#ff6b00]">#3</span> Zero Career Guidance
                        </h4>
                        <p className="text-[#1f2937] text-sm leading-relaxed font-medium">
                            Learning skills is only half the battle. Without a roadmap to navigate HR filters and technical interviews, your resume ends up in the void.
                        </p>
                    </div>

                    {/* Problem 4: No Valid Certification */}
                    <div ref={addToRefs} className="bg-white border border-[#ff6b00] rounded-2xl p-8 transition-all duration-300 group lg:col-start-1 lg:justify-self-end shadow-lg hover:shadow-xl hover:-translate-y-1">
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
                    <div ref={addToRefs} className="bg-white border border-[#ff6b00] rounded-2xl p-8 transition-all duration-300 group lg:col-start-2 lg:justify-self-start lg:col-span-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <div className="h-48 bg-gray-50 rounded-xl mb-6 relative border border-gray-100 overflow-hidden flex items-center justify-center shadow-inner">
                            {/* Chaos Path SVG */}
                            <svg className="w-full h-full absolute inset-0 text-red-500 pointer-events-none opacity-30" viewBox="0 0 300 200">
                                <path className="chaos-path" d="M10,100 C50,10 50,190 100,100 C150,10 150,190 200,100 C250,10 250,190 290,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" />
                                <path className="chaos-path-2" d="M20,150 C40,50 80,50 100,150 C120,50 160,50 180,150 C200,50 240,50 260,150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" opacity="0.5" />
                            </svg>
                            <div className="z-10 bg-white/90 px-4 py-2 rounded border border-gray-300 text-center shadow-sm">
                                <span className="text-gray-500 text-xs uppercase block mb-1">Current Status:</span>
                                <span className="text-red-500 font-mono font-bold">LOST_IN_BASICS</span>
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
