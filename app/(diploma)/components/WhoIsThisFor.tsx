'use client';

import React, { useState } from 'react';
import CounselingModal from './CounselingModal';

const WhoIsThisFor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="w-full bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 font-montserrat">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Scroll Action / Pill */}
                <div className="flex justify-center mb-12 lg:mb-16">
                    <button 
                        onClick={() => {
                            const section = document.getElementById('why-join-grid');
                            if (section) {
                                const y = section.getBoundingClientRect().top + window.scrollY - 100;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                        }}
                        className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-orange-50 border border-orange-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b00] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff6b00]"></span>
                        </span>
                        <span className="text-[#ff6b00] font-bold text-xs sm:text-sm uppercase tracking-widest">
                            Why Join This Program?
                        </span>
                        <svg className="w-4 h-4 text-[#ff6b00] animate-bounce group-hover:text-[#e65c00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </button>
                </div>

                {/* Headline Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 lg:mb-16 gap-8 lg:gap-12">
                    <div className="w-full md:w-5/12 lg:w-2/5 flex flex-col items-center md:items-start text-center md:text-left">
                        <h2 className="font-montserrat font-black text-[26px] sm:text-3xl lg:text-[42px] text-[#0b162c] leading-tight text-center md:text-left">
                            <span className="whitespace-nowrap">Designed for Ambitious</span> <br />
                            Action-Takers.
                        </h2>
                    </div>
                    <div className="w-full md:w-7/12 lg:w-1/2">
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed border-l-4 border-[#ff6b00] pl-4 sm:pl-6 md:mt-2 text-left">
                            Build in-demand Cybersecurity & AI skills. Get hands-on with real-world projects, master an industry-aligned curriculum, and earn your globally recognized eHack certification.
                        </p>
                    </div>
                </div>

                {/* Features Grid - 2x2 Clean Layout */}
                <div id="why-join-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Feature 1: Cyber Meets AI */}
                    <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] border border-[#ff6b00]/40 hover:border-[#ff6b00] hover:shadow-[0_20px_50px_-10px_rgba(255,107,0,0.15)] transition-all duration-300 group flex flex-col">
                        <div className="h-64 w-full overflow-hidden relative">
                            <img 
                                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1470&auto=format&fit=crop" 
                                alt="Cyber Meets AI" 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <div className="bg-[#ff6b00] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max mb-2">Advanced Training</div>
                                <h3 className="font-montserrat font-black text-2xl lg:text-3xl">Cyber Meets AI</h3>
                            </div>
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <p className="text-gray-600 text-base leading-relaxed">
                                Intensive training in GenAI and offensive & defensive security. Attend live online and offline masterclasses from top cybersecurity experts on AI-powered threat intelligence and advanced defense strategies.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2: Industry-Aligned Curriculum */}
                    <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] border border-[#ff6b00]/40 hover:border-[#ff6b00] hover:shadow-[0_20px_50px_-10px_rgba(255,107,0,0.15)] transition-all duration-300 group flex flex-col">
                        <div className="h-64 w-full overflow-hidden relative">
                            <img 
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop" 
                                alt="eHack Certification" 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <div className="bg-[#ff6b00] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max mb-2">High Value Curriculum</div>
                                <h3 className="font-montserrat font-black text-2xl lg:text-3xl">eHack Certification</h3>
                            </div>
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <p className="text-gray-600 text-base leading-relaxed">
                                Master Network Defense, Ethical Hacking, Penetration Testing, and OWASP Top 10. Our curriculum is similar to leading global standards, giving you the real, high-impact value at a lower price.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3: Guaranteed Internship */}
                    <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] border border-[#ff6b00]/40 hover:border-[#ff6b00] hover:shadow-[0_20px_50px_-10px_rgba(255,107,0,0.15)] transition-all duration-300 group flex flex-col">
                        <div className="h-64 w-full overflow-hidden relative">
                            <img 
                                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1470&auto=format&fit=crop" 
                                alt="Internship Guarantee" 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <div className="bg-[#ff6b00] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max mb-2">Guaranteed Internship</div>
                                <h3 className="font-montserrat font-black text-2xl lg:text-3xl">Earn While You Learn</h3>
                            </div>
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <p className="text-gray-600 text-base leading-relaxed">
                                Accelerate your career with a guaranteed 3-month internship on real-time industry projects. Select two advanced focus areas ranging from Network Security & SOC Operations, Application Testing, Digital Forensics to Cloud Infrastructure Security.
                            </p>
                        </div>
                    </div>

                    {/* Feature 4: The eHack Advantage */}
                    <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] border border-[#ff6b00]/40 hover:border-[#ff6b00] hover:shadow-[0_20px_50px_-10px_rgba(255,107,0,0.15)] transition-all duration-300 group flex flex-col">
                        <div className="h-64 w-full overflow-hidden relative">
                            <img 
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop" 
                                alt="The eHack Advantage" 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <div className="bg-[#ff6b00] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max mb-2">EC-Council Partner</div>
                                <h3 className="font-montserrat font-black text-2xl lg:text-3xl">The eHack Advantage</h3>
                            </div>
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <p className="text-gray-600 text-base leading-relaxed">
                                Leverage our 10+ year legacy of excellence. As an official EC-Council partner training center, we've empowered over 50,000 ambitious students and professionals to achieve high-paying dream roles in cybersecurity.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
            
            <CounselingModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </section>
    );
};

export default WhoIsThisFor;
