'use client';

import React, { useState, useEffect } from 'react';
import LeadForm from './LeadForm';
import { Download, Eye } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
    const [currentPair, setCurrentPair] = useState(0);
    
    const pairs = [
        {
            book: "/images/books/100m-offers.jpg",
            bookAlt: "$100M Offers Book",
            author: "/images/books/Alex-Hermozi-Freelancing-removebg-preview.png",
            authorAlt: "Alex Hormozi",
            authorClass: "h-[250px]"
        },
        {
            book: "/images/books/100m-leads-original-imagvjkcv3cgu8mf.webp",
            bookAlt: "$100M Leads Book",
            author: "/images/books/Alex-Hermozi-Freelancing-removebg-preview.png",
            authorAlt: "Alex Hormozi",
            authorClass: "h-[250px]"
        },
        {
            book: "/images/books/purple-cow.jpg",
            bookAlt: "Purple Cow Book",
            author: "/images/books/seth%20godin.png",
            authorAlt: "Seth Godin",
            authorClass: "h-[210px]"
        },
        {
            book: "/images/books/traffic-secrets.jpg",
            bookAlt: "Traffic Secrets Book",
            author: "/images/books/Russell%20Brunson.png",
            authorAlt: "Russell Brunson",
            authorClass: "h-[250px]"
        },
        {
            book: "/images/books/22-laws.jpg",
            bookAlt: "22 Immutable Laws Book",
            author: "/images/books/al%20rise.png",
            authorAlt: "Al Ries",
            authorClass: "h-[250px]"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPair((prev) => (prev + 1) % pairs.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [pairs.length]);

    return (
        <section className="relative w-full min-h-screen flex items-center pt-32 pb-8 overflow-hidden bg-[#f8fafc]">
            {/* Background elements to match the soft light theme */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff6b00]/10 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ff6b00]/5 rounded-full blur-3xl opacity-50 -translate-x-1/4 translate-y-1/4"></div>
            </div>

            {/* Header/Logo */}
            <div className="absolute top-0 left-0 w-full z-50 py-4 border-none">
                <div className="container mx-auto px-6 lg:px-12 max-w-[1300px] flex justify-between items-center">
                    <img
                        src="/images/newnew-ehack-removebg-preview.png"
                        alt="eHack Academy"
                        className="h-16 sm:h-20 w-auto object-contain"
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1300px] relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                    
                    {/* Left Content */}
                    <div className="w-full lg:w-[55%] text-left pt-8 lg:pt-0">
                        
                        <h1 className="font-montserrat font-extrabold text-gray-900 text-3xl sm:text-4xl lg:text-[2.8rem] xl:text-[3rem] leading-[1.2] mb-4">
                            Digital Marketing Diploma That Builds Real Marketers.
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 mb-5">
                            <div className="flex items-center gap-1.5 bg-[#ff6b00]/10 text-[#ff6b00] px-3 py-1.5 rounded-full border border-[#ff6b00]/20 text-xs sm:text-sm font-semibold">
                                <span className="bg-[#ff6b00] rounded-full p-0.5">
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </span>
                                100% Placement Assistance
                                <span className="text-[#ff6b00] ml-1 text-xs">ⓘ</span>
                            </div>
                            
                            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                                <div className="flex -space-x-2">
                                    {/* Mock avatars, placeholder colors */}
                                    <div className="w-5 h-5 rounded-full bg-gray-200 border border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=1" alt="avatar" /></div>
                                    <div className="w-5 h-5 rounded-full bg-gray-300 border border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=2" alt="avatar" /></div>
                                    <div className="w-5 h-5 rounded-full bg-gray-400 border border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=3" alt="avatar" /></div>
                                    <div className="w-5 h-5 rounded-full bg-gray-500 border border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=4" alt="avatar" /></div>
                                </div>
                                <span className="text-xs font-bold text-gray-900">300K+ <span className="font-normal text-gray-500 text-[10px]">Learners</span></span>
                            </div>
                        </div>

                        <ul className="space-y-2 mb-6">
                            {[
                                "Strategy before software — learn positioning, branding & the laws that govern every winning campaign.",
                                "Understand why being first in a category beats being better — and how to own your market's mind.",
                                "Then master Google Ads, Meta Ads Manager, SEO, and AI tools with real strategic intent behind every click.",
                                "Build campaigns rooted in consumer perception, not guesswork — the way elite marketers operate.",
                                "Graduate with a portfolio that proves you can think, plan, and execute — not just push buttons.",
                            ].map((text, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="mt-1 flex-shrink-0 text-[#ff6b00]">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                        </svg>
                                    </span>
                                    <span className="text-gray-700 font-medium text-sm sm:text-[15px] leading-snug">{text}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2.5 shadow-sm">
                                <div className="flex flex-col items-center border-r border-gray-200 pr-6">
                                    <div className="flex items-center gap-1 text-gray-900 font-bold mb-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#ff6b00]" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                                        Trustpilot
                                    </div>
                                    <div className="flex text-[#ff6b00] gap-0.5 mb-1">
                                        {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-center font-bold text-gray-900 bg-gray-50 rounded-lg px-3 py-1">
                                    4.6/5
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2.5 shadow-sm">
                                <div className="flex flex-col items-center border-r border-gray-200 pr-6">
                                    <img src="/images/Google_2015_logo.svg.webp" alt="Google" className="h-[20px] mb-1 object-contain" />
                                    <div className="flex text-yellow-400 gap-0.5 mb-1">
                                        {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-center font-bold text-gray-900 bg-gray-50 rounded-lg px-3 py-1">
                                    4.8/5
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                            <button className="w-full sm:w-auto bg-[#ff6b00] hover:bg-[#e56000] text-white font-bold px-8 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#ff6b00]/20 text-base">
                                Download Brochure <Download size={20} />
                            </button>
                        </div>
                        
                        <p className="text-xs font-medium text-gray-600">
                            Looking for Corporate Training? <a href="#" className="text-[#ff6b00] hover:text-[#e56000] underline">Get a Quote</a>
                        </p>

                    </div>

                    {/* Right Column: Dynamic Book Image Panel & Form */}
                    <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-end">
                        <div className="w-full max-w-[400px] flex flex-col shadow-2xl shadow-[#ff6b00]/15 rounded-2xl overflow-hidden border border-gray-200/60 bg-white">
                            
                            {/* Book Panel (Top) */}
                            <div className="w-full bg-[#fcfcfc] border-b border-gray-200 px-5 pt-3 pb-3 relative overflow-hidden flex flex-col items-center">
                                <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-800 mb-2 text-center leading-snug">
                                    Includes #1 marketing strategies that experts recommend worldwide.
                                </h3>
                                
                                <div className="w-full relative h-[280px]">
                                    {pairs.map((pair, idx) => (
                                        <div 
                                            key={idx}
                                            className={`absolute inset-0 w-full h-full flex items-end justify-center gap-6 transition-opacity duration-1000 ${
                                                idx === currentPair ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                                            }`}
                                        >
                                            {/* Left: Book Cover Frame */}
                                            <div className="w-[140px] h-[190px] rounded-lg p-1.5 bg-white border border-gray-300 shadow-xl flex-shrink-0 relative mb-4 hover:-translate-y-1 transition-transform">
                                                <div className="w-full h-full rounded border border-gray-100 overflow-hidden">
                                                    <img src={pair.book} alt={pair.bookAlt} className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                            
                                            {/* Right: Author Frame */}
                                            <div className="w-[200px] h-[260px] rounded-xl p-2 bg-gradient-to-b from-white/60 to-white/90 border border-gray-200 shadow-lg flex items-end justify-center relative flex-shrink-0 group overflow-hidden mb-2">
                                                {/* Background glow to make author pop */}
                                                <div className="absolute bottom-6 w-[210px] h-[210px] bg-[#ff6b00]/15 rounded-full blur-2xl group-hover:bg-[#ff6b00]/25 transition-colors"></div>
                                                <img 
                                                    src={pair.author} 
                                                    alt={pair.authorAlt} 
                                                    className={`${pair.authorClass} w-auto max-w-none object-contain relative z-10 bottom-0 drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform origin-bottom`} 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Indicators */}
                                <div className="flex gap-1.5 mt-2 z-20">
                                    {pairs.map((_, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                idx === currentPair ? 'w-4 bg-[#ff6b00]' : 'w-1.5 bg-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Lead Form (Bottom) */}
                            <div className="w-full relative">
                                <LeadForm 
                                    showDigitalMarketingTag={false}
                                    noShadow={true}
                                    paddingClass="p-4 sm:p-5"
                                    hideSubtitle={true}
                                    hideTerms={true}
                                    isCompact={true}
                                />
                            </div>    
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
