'use client';

import React, { useState } from 'react';
import { Star, Globe, BadgeCheck, ChevronDown, ChevronUp } from 'lucide-react';

const reviews = [
    {
        name: "Rahul Sharma",
        role: "Digital Marketing Specialist",
        companyLogo: "/images/Google_2015_logo.svg.webp",
        text: "eHackAcademy's Digital Marketing Course includes comprehensive hands-on projects. The trainers have strong industry backgrounds and teach with practical examples. The learning experience exceeded my expectations.",
        date: "18th Oct, 2025",
        rating: 5
    },
    {
        name: "Priya Desai",
        role: "SEO Analyst",
        companyLogo: "/images/Meta-Logo.png",
        text: "Completed the Digital Marketing Certification Training and landed a job at a top agency within three months. The live projects gave me hands-on experience. The trainers were always available to clear doubts, even after class hours.",
        date: "16th Oct, 2025",
        rating: 5
    },
    {
        name: "Amit Patel",
        role: "Social Media Manager",
        companyLogo: "/images/Microsoft-logo-5-removebg-preview.png",
        text: "The course curriculum is highly updated with the latest trends in AI and automation tools for marketing. The mock interviews and resume building sessions were extremely helpful for my career transition.",
        date: "10th Oct, 2025",
        rating: 5
    },
    {
        name: "Neha Gupta",
        role: "Content Strategist",
        companyLogo: "/images/Google_2015_logo.svg.webp",
        text: "Excellent course! The modules on Paid Advertising and SEO were deep and very practical. I was able to apply the strategies to my own freelance clients immediately and saw a 40% increase in traffic.",
        date: "5th Oct, 2025",
        rating: 5
    }
];

export default function CourseReviews({ hideTitle = false }: { hideTitle?: boolean } = {}) {
    const [showAll, setShowAll] = useState(false);
    const visibleReviews = showAll ? reviews : reviews.slice(0, 2);

    return (
        <div className="w-full bg-[#f8f9fa] rounded-2xl pt-4 sm:pt-6 pb-4 sm:pb-6 px-4 sm:px-8 border border-gray-200 relative overflow-hidden mt-8">
            {!hideTitle && (
                <h2 className="text-xl sm:text-3xl font-bold text-[#1a202c] font-montserrat mb-4 sm:mb-6 pl-1 sm:pl-4 relative z-10 leading-tight">
                    Course Reviews
                </h2>
            )}

            <div className="bg-white rounded-2xl p-4 sm:p-8 border border-gray-200 shadow-sm relative z-10 mb-5 sm:mb-6">
                <div className="flex flex-col">
                    {visibleReviews.map((review, index) => (
                        <div key={index} className={`flex flex-col ${index !== visibleReviews.length - 1 ? 'border-b border-gray-200 mb-5 pb-5 sm:mb-8 sm:pb-8' : ''}`}>
                            {/* Review Header */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    {/* Avatar / Company Logo */}
                                    <div className="relative">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {review.companyLogo ? (
                                                <img src={review.companyLogo} alt={`${review.name} Company`} className="w-full h-full object-contain p-1.5 sm:p-2" />
                                            ) : (
                                                <span className="text-gray-400 font-bold text-lg sm:text-xl uppercase">{review.name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-sm border border-gray-100">
                                            <Globe className="text-blue-600 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        </div>
                                    </div>
                                    {/* Name & Role */}
                                    <div className="flex flex-col">
                                        <h4 className="font-bold text-gray-900 text-[15px] sm:text-[16px] leading-snug">{review.name}</h4>
                                        <span className="text-gray-600 text-[12px] sm:text-[13px]">{review.role}</span>
                                        <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
                                            <BadgeCheck className="text-blue-500 w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" />
                                            <span className="text-gray-900 text-[10px] sm:text-[12px] font-semibold">Verified Learner</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="text-yellow-400 fill-yellow-400 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                                        ))}
                                    </div>
                                    <span className="font-bold text-gray-900 ml-1 text-sm sm:text-base">{review.rating}/5</span>
                                </div>
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed mb-3 sm:mb-4">
                                {review.text}
                            </p>

                            {/* Date */}
                            <div className="flex justify-end">
                                <span className="text-gray-900 text-xs sm:text-[13px] font-bold">{review.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center relative z-10">
                <button 
                    onClick={() => setShowAll(!showAll)}
                    className="flex items-center gap-2 bg-[#ff6b00]/10 text-[#ff6b00] font-bold py-2 px-5 sm:py-2.5 sm:px-6 rounded-lg hover:bg-[#ff6b00]/20 transition-colors text-[14px] sm:text-[15px]"
                >
                    {showAll ? "View Less" : "View All"} 
                    {showAll ? <ChevronUp className="w-4 h-4 sm:w-[18px] sm:h-[18px]" /> : <ChevronDown className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
                </button>
            </div>
        </div>
    );
}
