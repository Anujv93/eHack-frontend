'use client';

import React from 'react';
import { Award } from 'lucide-react';
import Link from 'next/link';

export default function IntroToDigitalMarketing() {
    return (
        <div className="w-full bg-[#f8f9fa] rounded-2xl pt-4 pb-4 px-4 sm:px-8 border border-gray-200 relative overflow-hidden">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-6 pl-2 sm:pl-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1a202c] font-montserrat z-10 relative">
                    Introduction to Digital Marketing Training
                </h2>
                
                {/* Decorative Graphic (Top Right) */}
                <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-32 opacity-30 md:opacity-100 pointer-events-none overflow-hidden rounded-tr-2xl">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-100/50 to-transparent"></div>
                    <div className="absolute top-4 right-8 bg-white p-4 rounded-xl shadow-sm border border-purple-100/50 rotate-6 flex items-center justify-center">
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
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm relative z-10 h-[320px] overflow-y-auto custom-scrollbar">
                <p className="text-gray-700 text-[15px] leading-loose mb-6">
                    <Link href="#" className="text-blue-600 hover:underline font-semibold">Digital marketing</Link> is a process where marketing efforts use the internet to promote products, services, or brands. It involves reaching consumers through various online channels, including search engines, social media, websites, email, mobile apps, and more.
                </p>

                <p className="text-gray-700 text-[15px] leading-loose mb-6">
                    Digital marketing Classes helps businesses to connect with audiences, target specific customer segments, and digital marketing helps to measure campaign performance with precision. It encompasses key techniques such as Search Engine Optimization (<Link href="#" className="text-blue-600 hover:underline font-semibold">SEO</Link>), Pay-Per-Click advertising (PPC), Social Media Marketing (SMM), Content Marketing, Email Marketing, and Affiliate Marketing.
                </p>

                <h4 className="font-bold text-gray-900 text-base mb-3">
                    What You'll Learn to Do
                </h4>
                <ul className="list-disc pl-5 space-y-3">
                    <li className="text-gray-700 text-[15px] leading-relaxed">
                        Plan and run online marketing campaigns.
                    </li>
                    <li className="text-gray-700 text-[15px] leading-relaxed">
                        Build and take care of your brand's online performance.
                    </li>
                    <li className="text-gray-700 text-[15px] leading-relaxed">
                        Master the tools needed to analyze consumer behavior.
                    </li>
                    <li className="text-gray-700 text-[15px] leading-relaxed">
                        Optimize conversions and maximize return on ad spend (ROAS).
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
