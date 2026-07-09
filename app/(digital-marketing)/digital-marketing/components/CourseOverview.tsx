'use client';

import React from 'react';
import { Award } from 'lucide-react';

export default function CourseOverview() {
    return (
        <div className="w-full bg-[#f8f9fa] rounded-2xl pt-4 pb-4 px-4 sm:px-8 border border-gray-200 relative overflow-hidden">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4 sm:mb-6 pl-1 sm:pl-4 relative">
                <h2 className="text-xl sm:text-3xl font-bold text-[#1a202c] font-montserrat z-10 relative leading-tight pr-16 sm:pr-0">
                    Digital Marketing Course Overview
                </h2>
                
                {/* Decorative Graphic (Top Right) */}
                <div className="absolute top-[-16px] right-[-16px] sm:top-[-16px] sm:right-[-32px] w-32 h-32 md:w-64 md:h-32 opacity-15 md:opacity-100 pointer-events-none overflow-hidden rounded-tr-2xl">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-100/50 to-transparent"></div>
                    <div className="absolute top-4 right-4 sm:right-8 bg-white p-4 rounded-xl shadow-sm border border-purple-100/50 rotate-6 flex items-center justify-center">
                        <div className="w-24 h-16 border-2 border-purple-100 flex flex-col gap-2 p-2">
                            <div className="w-full h-1 bg-purple-100 rounded"></div>
                            <div className="w-3/4 h-1 bg-purple-100 rounded"></div>
                            <div className="w-1/2 h-1 bg-purple-100 rounded"></div>
                        </div>
                    </div>
                    {/* Seal / Badge */}
                    <div className="absolute bottom-2 right-4 bg-green-100 rounded-full p-2 shadow-sm">
                        <Award size={32} className="text-green-500" />
                    </div>
                    {/* Sparkles */}
                    <div className="absolute top-6 right-32 w-2 h-2 rounded-full bg-green-300"></div>
                    <div className="absolute bottom-10 right-2 w-1.5 h-1.5 rounded-full bg-purple-300"></div>
                </div>
            </div>

            {/* Inner Scrollable White Card */}
            <div className="bg-white rounded-xl p-4 sm:p-8 border border-gray-200 shadow-sm relative z-10 h-[300px] sm:h-[320px] overflow-y-auto custom-scrollbar">
                <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed sm:leading-loose mb-5 sm:mb-6">
                    Digital marketing Classes train people in online promotion of products and services through methods such as search engine optimisation, email campaigns, social media platforms, and paid ads. The curriculum includes everything from building websites and conducting market research to analysing data and using AI-driven marketing tools. The goal is to prepare learners with the expertise needed for different job positions and to create effective digital marketing campaigns.
                </p>

                <h4 className="font-bold text-gray-900 text-[15px] sm:text-base mb-2 sm:mb-3">
                    Online Digital Marketing Course Overview
                </h4>
                <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed sm:leading-loose mb-5 sm:mb-6">
                    This comprehensive Digital Marketing program equips learners with in-demand skills to excel in today's digital-first business world. Covering everything from SEO, SEM, SMO, and PPC to blogging and email marketing, the online digital marketing course blends strategic frameworks with hands-on practice.
                </p>

                <h4 className="font-bold text-gray-900 text-[15px] sm:text-base mb-2 sm:mb-3">
                    Key Topics Included:
                </h4>
                <ul className="list-disc pl-4 sm:pl-5 space-y-3 sm:space-y-4">
                    <li className="text-gray-700 text-sm sm:text-[15px] leading-relaxed">
                        <strong className="text-gray-900">Search Engine Optimisation (SEO):</strong> Methods to boost how easily people can find a website through search engines and increase organic traffic.
                    </li>
                    <li className="text-gray-700 text-sm sm:text-[15px] leading-relaxed">
                        <strong className="text-gray-900">Search Engine Marketing (SEM):</strong> Creating and managing paid advertising campaigns on Google and other search engines to drive targeted traffic.
                    </li>
                    <li className="text-gray-700 text-sm sm:text-[15px] leading-relaxed">
                        <strong className="text-gray-900">Social Media Marketing (SMM):</strong> Building brand awareness, audience engagement, and lead generation across platforms like Facebook, Instagram, and LinkedIn.
                    </li>
                    <li className="text-gray-700 text-sm sm:text-[15px] leading-relaxed">
                        <strong className="text-gray-900">Content Marketing & Strategy:</strong> Developing a cohesive strategy for creating, distributing, and measuring valuable content that attracts and retains a clearly defined audience.
                    </li>
                </ul>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                    margin: 4px 0;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
}
