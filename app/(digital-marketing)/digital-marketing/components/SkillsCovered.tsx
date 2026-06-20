'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const skills = [
    "Social Media Marketing (Facebook, Instagram, Twitter/X)",
    "Keyword Research and Competitor Analysis",
    "Business Page Creation and Optimization",
    "Ad Copywriting and Creative Design",
    "Content Planning and Post Scheduling",
    "Conversion Tracking and ROI Optimization",
    "Blog Writing and Micro-blogging",
    "YouTube Video Marketing and Targeting",
    "WordPress Website Creation and Management",
    "Google AdSense and Website Monetization",
    "Email Campaign Planning",
    "Franchise Marketing Techniques",
    "SMS Marketing Strategy and Bulk Messaging",
    "AI Tools for Marketing Automation and Content Creation",
    "Search Engine Marketing (SEM) with Google Ads",
    "Analytics Interpretation for Campaign Improvement",
    "Pay-Per-Click (PPC) Campaign Management"
];

export default function SkillsCovered() {
    return (
        <div className="w-full bg-[#f8f9fa] rounded-2xl pt-2 sm:pt-3 pb-2 sm:pb-3 px-4 sm:px-8 border border-gray-200 relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a202c] font-montserrat mb-4 pl-2 sm:pl-4 relative z-10">
                Skills Covered
            </h2>

            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 shadow-sm relative z-10 overflow-hidden">
                {/* Decorative Backgrounds Inside Box */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-100/60 to-green-100/40 blur-3xl -translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-orange-100/40 to-yellow-100/30 blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 sm:gap-y-5 gap-x-8 relative z-10">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle2 size={20} className="text-white flex-shrink-0 mt-0.5" fill="#7f9ab2" strokeWidth={2}/>
                            <span className="text-gray-800 text-[15px] leading-snug">{skill}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
