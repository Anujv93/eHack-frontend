'use client';

import React, { useState } from 'react';
import CounselingModal from './CounselingModal';

const WhoIsThisFor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = [
        {
            id: 1,
            title: <>12th Pass & <span className="text-[#ff6b00]">Beginners</span></>,
            plainTitle: "12th Pass & Beginners",
            subtitle: "Start Early, Get Ahead",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop",
            description: "No coding background? No problem. Skip the traditional 4-year college wait. We build your foundation from scratch through practical labs, making you highly employable in just 9 months.",
            tags: ["Zero Experience Needed", "Practical Labs", "Fast-Track Career"]
        },
        {
            id: 2,
            title: <>College Students & <span className="text-[#ff6b00]">Freshers</span></>,
            plainTitle: "College Students & Freshers",
            subtitle: "Don't Settle for Average Jobs",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop",
            description: "Stand out in a ruthlessly competitive job market. Master highly sought-after, hands-on cybersecurity skills that top employers actively seek, and command top-tier MNC salaries right out of college.",
            tags: ["Resume Building", "MNC Placements", "In-Demand Skills"]
        },
        {
            id: 3,
            title: <>Working <span className="text-[#ff6b00]">Professionals</span></>,
            plainTitle: "Working Professionals",
            subtitle: "Pivot & Multiply Your Salary",
            image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1469&auto=format&fit=crop",
            description: "Stuck in IT support or a dead-end tech role? Transition into the high-growth cybersecurity sector. Learn advanced penetration testing and drastically increase your earning potential.",
            tags: ["Career Transition", "Salary Hike", "Advanced Skills"]
        }
    ];

    return (
        <section className="w-full bg-white pt-0 pb-20 lg:pt-0 lg:pb-28 font-inter">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* New Headline & Paragraph Pattern */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 lg:gap-12">
                    <div className="w-full md:w-5/12 lg:w-2/5 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-6 shadow-sm mx-auto md:mx-0 w-max">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b00]"></span>
                            </span>
                            <span className="text-[#ff6b00] font-bold text-xs uppercase tracking-widest">
                                Is This Program For You?
                            </span>
                        </div>
                        <h2 className="font-montserrat font-black text-[26px] sm:text-3xl lg:text-[42px] text-[#0b162c] leading-tight text-center md:text-left">
                            <span className="whitespace-nowrap">Designed for Ambitious</span> <br />
                            Action-Takers.
                        </h2>
                    </div>
                    <div className="w-full md:w-7/12 lg:w-1/2">
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed border-l-4 border-[#ff6b00] pl-4 sm:pl-6 md:mt-8 lg:mt-10 text-left">
                            Whether you are just starting out or looking to escape a stagnant career, this diploma is engineered to take you from your current level to a highly-paid cybersecurity expert.
                        </p>
                    </div>
                </div>

                {/* Original Cards Grid (Image on top) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <div 
                            key={category.id} 
                            className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-200 hover:border-[#ff6b00]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] group flex flex-col"
                        >
                            {/* Image Container with Hover Zoom */}
                            <div className="relative h-56 w-full overflow-hidden">
                                <div className="absolute inset-0 bg-[#0b162c]/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                                <img 
                                    src={category.image} 
                                    alt={category.plainTitle} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                />
                                {/* Bottom Gradient for text readability */}
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                
                                <div className="absolute bottom-4 left-6 z-20">
                                    <h3 className="font-montserrat font-black text-2xl text-white tracking-tight">
                                        {category.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 sm:p-8 flex-1 flex flex-col">
                                <h4 className="text-[#ff6b00] font-bold text-sm mb-3">
                                    {category.subtitle}
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                                    {category.description}
                                </p>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {category.tags.map((tag, index) => (
                                        <span 
                                            key={index} 
                                            className="bg-orange-50 border border-orange-100/50 text-gray-900 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Stats & CTA Area */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                    
                    {/* Left Side: Stats */}
                    <div className="grid grid-cols-2 sm:flex sm:items-center gap-6 sm:gap-8 md:gap-12 w-full md:w-auto pb-4 md:pb-0 sm:pl-8">
                        <div className="flex flex-col">
                            <span className="font-montserrat text-2xl sm:text-3xl font-black text-[#ff6b00]">3<span className="text-[#0b162c]">X</span></span>
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">Avg Salary Hike</span>
                        </div>
                        <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                        <div className="flex flex-col">
                            <span className="font-montserrat text-2xl sm:text-3xl font-black text-[#ff6b00]">100<span className="text-[#0b162c]">%</span></span>
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">Placement Aid</span>
                        </div>
                        <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                        <div className="flex flex-col">
                            <span className="font-montserrat text-2xl sm:text-3xl font-black text-[#ff6b00]">12,000<span className="text-[#0b162c]">+</span></span>
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">Active Learners</span>
                        </div>
                        <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                        <div className="flex flex-col">
                            <span className="font-montserrat text-2xl sm:text-3xl font-black text-[#ff6b00]">Paid</span>
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">Internship + Stipend</span>
                        </div>
                    </div>

                    {/* Right Side: CTA */}
                    <div className="flex flex-col items-center md:items-end w-full md:w-auto shrink-0 border-t md:border-t-0 border-gray-100 pt-8 md:pt-0 sm:pr-8 text-center md:text-right">
                        <p className="text-gray-500 text-sm mb-3 font-medium">Still unsure if you qualify?</p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex justify-center items-center gap-2 bg-[#ff6b00] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-[#e65c00] transition-colors shadow-[0_10px_20px_-10px_rgba(255,107,0,0.4)] group w-full sm:w-auto"
                        >
                            Talk to a Career Counselor
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
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
