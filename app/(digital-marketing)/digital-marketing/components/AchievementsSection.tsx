'use client';

import React from 'react';

const achievements = [
    {
        title: "Most Innovative EdTech Startup",
        description: "Recognized by Startup India for innovation in learning.",
        logo: "/images/companies/startup-india.png",
        fallbackIcon: "🚀"
    },
    {
        title: "Excellence in Digital Training",
        description: "National Education Awards by NASSCOM.",
        logo: "/images/companies/nasscom.svg",
        fallbackIcon: "🎓"
    },
    {
        title: "ISO 9001:2015 Certified",
        description: "Certified for Quality Education Management.",
        logo: "/images/companies/iso.svg",
        fallbackIcon: "🏆"
    }
];

export default function AchievementsSection() {
    return (
        <div className="w-full mt-4 sm:mt-8 mb-8 relative overflow-hidden">
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-4xl font-bold text-[#1a202c] font-montserrat mb-3">
                    Distinctions and Achievements
                </h2>
                <p className="text-gray-600 text-[15px] sm:text-[16px]">
                    Explore the milestones of our journey!
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-2">
                {achievements.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center text-center">
                        {/* Golden Badge Graphic */}
                        <div className="relative w-32 h-32 mb-8 flex justify-center items-center">
                            {/* SVG Golden Hexagon */}
                            <svg className="absolute inset-0 w-full h-full text-yellow-500 drop-shadow-md" viewBox="0 0 100 100">
                                <polygon fill="currentColor" points="50 3 93 25 93 75 50 97 7 75 7 25" />
                                <polygon fill="#fcd34d" points="50 8 88 28 88 72 50 92 12 72 12 28" />
                                {/* Inner details */}
                                <circle cx="50" cy="50" r="32" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 2"/>
                            </svg>
                            
                            {/* Floating White Pill with Logo */}
                            <div className="absolute z-10 bg-white rounded-lg px-4 py-2 shadow-md flex items-center justify-center border border-gray-50 min-w-[100px] h-12">
                                <img 
                                    src={item.logo} 
                                    alt={item.title} 
                                    className="h-full object-contain" 
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.innerHTML = `<span class="text-2xl">${item.fallbackIcon}</span>`;
                                    }} 
                                />
                            </div>
                        </div>

                        <h3 className="text-[17px] font-bold text-gray-900 mb-2 px-2 leading-snug">
                            {item.title}
                        </h3>
                        <p className="text-gray-500 text-[14px] leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
            
            {/* Slider Controls (Decorative since it's just 3 items in a grid) */}
            <div className="flex justify-center gap-4 mt-10">
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>
        </div>
    );
}
