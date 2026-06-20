'use client';

import React, { useState } from 'react';
import { Calendar, Download, ArrowRight, Building2, CheckCircle2, ChevronRight } from 'lucide-react';

const modules = [
    {
        id: 1,
        title: "Module 1",
        subtitle: "Introduction to Digital Marketing",
        topics: [
            "What is Digital Marketing?",
            "Difference Between Traditional Marketing and Digital Marketing",
            "Latest Digital Marketing Trends",
            "Digital Marketing Strategies for B2B and B2C",
            "Career Opportunities in Digital Marketing",
            "How to Increase Visibility and People Engagement",
            "Digital Marketing Techniques for Product Marketing and Service Marketing",
            "Platforms, Functions, and Types of Digital Marketing"
        ]
    },
    {
        id: 2,
        title: "Module 2",
        subtitle: "SEO Training (Search Engine Optimization)",
        topics: [
            "Introduction to SEO",
            "On-page Optimization",
            "Off-page Optimization",
            "Technical SEO",
            "Local SEO Strategies",
            "SEO Audit and Tools"
        ]
    },
    {
        id: 3,
        title: "Module 3",
        subtitle: "SEM Training (Search Engine Marketing)",
        topics: [
            "Introduction to SEM and Google Ads",
            "Keyword Research and Planning",
            "Creating Ad Campaigns",
            "Bidding Strategies",
            "Ad Extensions and Formats",
            "Conversion Tracking"
        ]
    },
    {
        id: 4,
        title: "Module 4",
        subtitle: "SMO Training (Social Media Optimization)",
        topics: [
            "Introduction to Social Media Platforms",
            "Building a Social Media Strategy",
            "Facebook and Instagram Marketing",
            "LinkedIn B2B Strategies",
            "Twitter and Pinterest Marketing",
            "Social Media Analytics"
        ]
    },
    {
        id: 5,
        title: "Module 5",
        subtitle: "PPC Training (Pay Per Click)",
        topics: [
            "Understanding PPC Ecosystem",
            "Display Network Advertising",
            "Video Advertising on YouTube",
            "Shopping Campaigns",
            "Remarketing Strategies",
            "Performance Optimization"
        ]
    },
    {
        id: 6,
        title: "Blog Marketing Training",
        subtitle: "Blog Marketing Training",
        topics: [
            "Content Strategy and Planning",
            "Writing Engaging Blog Posts",
            "Content Distribution",
            "Guest Blogging and Outreach",
            "Monetizing Your Blog",
            "Analytics and Measurement"
        ]
    }
];

const careerTracks = [
    {
        id: 1,
        title: "Profile and Resume Building",
        description: "We help candidates build highly effective resumes that will help them secure jobs on the first attempt. We give you key points to add to the resume and help you stand apart from the crowd. Here is how we will help you:",
        points: [
            "Resume structure and building",
            "Portfolio building",
            "Build a highly optimized cover letter",
            "Help you create your LinkedIn profile"
        ]
    },
    {
        id: 2,
        title: "Technical Mock Interviews",
        description: "Our experts conduct realistic mock interviews to prepare you for actual technical rounds. We provide detailed feedback and improvement areas.",
        points: [
            "1-on-1 mock interview sessions",
            "Detailed feedback on technical knowledge",
            "Tips to handle tricky questions",
            "Confidence building exercises"
        ]
    },
    {
        id: 3,
        title: "Business Communication",
        description: "Enhance your professional communication skills to interact effectively with stakeholders, clients, and team members.",
        points: [
            "Email etiquette and professional writing",
            "Presentation and speaking skills",
            "Handling client meetings",
            "Active listening and negotiation"
        ]
    },
    {
        id: 4,
        title: "Competency Challenge Test",
        description: "Test your skills with real-world scenarios to ensure you're completely job-ready before appearing for interviews.",
        points: [
            "Real-world scenario testing",
            "Time-bound assignments",
            "Performance benchmarking",
            "Gap analysis and review"
        ]
    }
];

const hiringLogos = [
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Web_Services_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg"
];

export default function JourneyBox() {
    const [activeModule, setActiveModule] = useState(modules[0]);
    const [activeTrack, setActiveTrack] = useState(careerTracks[0]);

    return (
        <div className="w-full">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 font-montserrat truncate">
                Let's walk you through the journey at ehackacademy
            </h2>

            <div className="bg-gradient-to-br from-[#ffe5cc] to-[#ffdbb8] rounded-2xl relative pt-6 sm:pt-8 pb-4 px-4 sm:px-8 border border-[#ffcca3] overflow-hidden shadow-sm">
                {/* Background ambient light */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b00]/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff6b00]/5 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Top Left Ribbon (Module Number) */}
                <div className="absolute top-0 left-6 sm:left-10 w-12 sm:w-16 h-16 sm:h-20 bg-[#ff6b00] flex justify-center pt-3 sm:pt-4 z-10 shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}>
                    <span className="text-white text-2xl sm:text-3xl font-bold font-montserrat leading-none">1</span>
                </div>

                {/* Top Right Duration Pill */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-8 bg-white border border-gray-200 text-gray-800 shadow-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-bold z-10">
                    <Calendar size={16} className="text-[#ff6b00]" />
                    3 months
                </div>

                <div className="relative z-10 mb-4 sm:mb-5 pl-20 sm:pl-24 sm:pr-16">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 font-montserrat">Course Curriculum</h3>
                    <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-none">
                        Our course is designed by industry experts for excellent academic and industrial experience. We have a balanced combination of theoretical, technical, and practical knowledge for you to get the best training experience for everyone regardless of their background.
                    </p>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-4 sm:gap-6 h-auto md:h-[300px]">
                    
                    {/* Left Panel: Modules List */}
                    <div className="w-full md:w-[35%] bg-white rounded-xl overflow-hidden flex flex-col border border-gray-200">
                        <div className="overflow-y-auto custom-scrollbar h-[300px] md:h-full p-2">
                            {modules.map((mod) => {
                                const isActive = activeModule.id === mod.id;
                                return (
                                    <button 
                                        key={mod.id}
                                        onClick={() => setActiveModule(mod)}
                                        className={`w-full text-left py-2.5 px-4 rounded-lg mb-1 transition-all flex justify-between items-center group ${
                                            isActive 
                                                ? 'bg-[#ff6b00]/10 border-l-4 border-[#ff6b00]' 
                                                : 'hover:bg-gray-50 border-l-4 border-transparent'
                                        }`}
                                    >
                                        <div>
                                            <h4 className={`font-bold text-[15px] mb-0.5 ${isActive ? 'text-[#ff6b00]' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                                {mod.title}
                                            </h4>
                                            <p className={`text-xs sm:text-sm ${isActive ? 'text-[#ff6b00]/80' : 'text-gray-500'}`}>
                                                {mod.subtitle.length > 35 ? mod.subtitle.substring(0, 35) + '...' : mod.subtitle}
                                            </p>
                                        </div>
                                        {isActive && <ArrowRight size={18} className="text-[#ff6b00] flex-shrink-0 ml-2" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Panel: Module Topics */}
                    <div className="w-full md:w-[65%] bg-white rounded-xl border border-gray-200 flex flex-col h-[400px] md:h-full overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-gray-100">
                            <h4 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight pr-4">
                                {activeModule.subtitle}
                            </h4>
                            <button className="flex-shrink-0 border border-[#ff6b00] text-[#ff6b00] hover:bg-[#ff6b00] hover:text-white transition-colors px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
                                <Download size={14} /> Download Syllabus
                            </button>
                        </div>
                        
                        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-grow bg-gray-50/50">
                            <ul className="space-y-3">
                                {activeModule.topics.map((topic, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ff6b00] flex-shrink-0"></span>
                                        <span className="text-gray-600 text-sm sm:text-[15px]">{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* Transition Arrows */}
            <div className="flex flex-col items-start justify-start py-4 pl-9 sm:pl-12">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="transform scale-y-125">
                    <path d="M4 2 L12 8 L20 2 L20 6 L12 12 L4 6 Z" fill="#ff6b00" fillOpacity="0.25"/>
                    <path d="M4 8 L12 14 L20 8 L20 12 L12 18 L4 12 Z" fill="#ff6b00" fillOpacity="0.55"/>
                    <path d="M4 14 L12 20 L20 14 L20 18 L12 24 L4 18 Z" fill="#ff6b00"/>
                </svg>
            </div>

            {/* Step 2: Career Track Box */}
            <div className="bg-gradient-to-br from-[#ffe5cc] to-[#ffdbb8] rounded-2xl relative pt-6 sm:pt-8 pb-4 px-4 sm:px-8 border border-[#ffcca3] overflow-hidden shadow-sm">
                {/* Background ambient light */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b00]/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff6b00]/5 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Top Left Ribbon (Step Number) */}
                <div className="absolute top-0 left-6 sm:left-10 w-12 sm:w-16 h-16 sm:h-20 bg-[#ff6b00] flex justify-center pt-3 sm:pt-4 z-10 shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}>
                    <span className="text-white text-2xl sm:text-3xl font-bold font-montserrat leading-none">2</span>
                </div>

                {/* Top Right Duration Pill */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-8 bg-white border border-gray-200 text-gray-800 shadow-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-bold z-10">
                    <Calendar size={16} className="text-[#ff6b00]" />
                    1 Month
                </div>

                <div className="relative z-10 mb-4 sm:mb-5 pl-20 sm:pl-24 sm:pr-16">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 font-montserrat">Career Track</h3>
                    <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-none">
                        Once you have enrolled for the program then you will have access to a wide range of resources which will help you in becoming a Job-Ready Candidate. We have a dedicated placement team of professionals who excel in their individual domains committed to assist you in our journey.
                    </p>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-4 sm:gap-6 h-auto md:h-[300px]">
                    
                    {/* Left Panel: Track List */}
                    <div className="w-full md:w-[35%] bg-white rounded-xl overflow-hidden flex flex-col border border-gray-200">
                        <div className="overflow-y-auto custom-scrollbar h-[250px] md:h-full p-2 flex flex-col justify-center">
                            {careerTracks.map((track) => {
                                const isActive = activeTrack.id === track.id;
                                return (
                                    <button 
                                        key={track.id}
                                        onClick={() => setActiveTrack(track)}
                                        className={`w-full text-left py-4 px-4 rounded-lg mb-1 transition-all flex justify-between items-center group ${
                                            isActive 
                                                ? 'bg-[#ff6b00]/10 border-l-4 border-[#ff6b00]' 
                                                : 'hover:bg-gray-50 border-l-4 border-transparent'
                                        }`}
                                    >
                                        <h4 className={`font-bold text-[15px] ${isActive ? 'text-[#ff6b00]' : 'text-gray-500 group-hover:text-gray-700'}`}>
                                            {track.title}
                                        </h4>
                                        {isActive && <ArrowRight size={18} className="text-[#ff6b00] flex-shrink-0 ml-2" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Panel: Track Details */}
                    <div className="w-full md:w-[65%] bg-white rounded-xl border border-gray-200 flex flex-col h-[350px] md:h-full overflow-hidden">
                        <div className="p-5 sm:p-6 border-b border-gray-100">
                            <h4 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                                {activeTrack.title}
                            </h4>
                        </div>
                        
                        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-grow bg-gray-50/50">
                            <p className="text-gray-600 text-sm sm:text-[15px] mb-4 leading-relaxed">
                                {activeTrack.description}
                            </p>
                            <ul className="space-y-2">
                                {activeTrack.points.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="mt-2 w-1 h-1 rounded-full bg-gray-500 flex-shrink-0"></span>
                                        <span className="text-gray-600 text-sm sm:text-[15px]">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* Transition Arrows */}
            <div className="flex flex-col items-start justify-start py-4 pl-9 sm:pl-12">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="transform scale-y-125">
                    <path d="M4 2 L12 8 L20 2 L20 6 L12 12 L4 6 Z" fill="#ff6b00" fillOpacity="0.25"/>
                    <path d="M4 8 L12 14 L20 8 L20 12 L12 18 L4 12 Z" fill="#ff6b00" fillOpacity="0.55"/>
                    <path d="M4 14 L12 20 L20 14 L20 18 L12 24 L4 18 Z" fill="#ff6b00"/>
                </svg>
            </div>

            {/* Step 3: Career Services Assistance */}
            <div className="bg-gradient-to-br from-[#ffe5cc] to-[#ffdbb8] rounded-2xl relative pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-8 border border-[#ffcca3] overflow-hidden shadow-sm">
                {/* Background ambient light */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b00]/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff6b00]/5 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Top Left Ribbon (Step Number) */}
                <div className="absolute top-0 left-6 sm:left-10 w-12 sm:w-16 h-16 sm:h-20 bg-[#ff6b00] flex justify-center pt-3 sm:pt-4 z-10 shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}>
                    <span className="text-white text-2xl sm:text-3xl font-bold font-montserrat leading-none">3</span>
                </div>

                <div className="relative z-10 mb-8 sm:mb-10 pl-20 sm:pl-24 pr-6 sm:pr-12">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-montserrat">Career Services Assistance</h3>
                    <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-none">
                        In the Career Services Assistance phase, relevant job opportunities are shared through a dedicated channel based on current hiring needs and market demand. Candidates receive direct application links and relevant application details, enabling them to actively explore and apply for suitable opportunities.
                    </p>
                </div>

                {/* Logo Marquee Rows */}
                <div className="relative z-10 flex flex-col gap-4 overflow-hidden logo-container mask-edges px-2">
                    {/* Row 1 */}
                    <div className="flex gap-4 w-max animate-scroll-left hover:pause">
                        {[...hiringLogos.slice(0, 4), ...hiringLogos.slice(0, 4), ...hiringLogos.slice(0, 4), ...hiringLogos.slice(0, 4)].map((logo, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-[#ffcca3] flex items-center justify-center w-[160px] h-[75px] flex-shrink-0">
                                <img src={logo} alt="Company Logo" className="max-w-[100px] max-h-[35px] object-contain opacity-80" />
                            </div>
                        ))}
                    </div>
                    {/* Row 2 */}
                    <div className="flex gap-4 w-max animate-scroll-right ml-[-80px] hover:pause">
                        {[...hiringLogos.slice(4, 8), ...hiringLogos.slice(4, 8), ...hiringLogos.slice(4, 8), ...hiringLogos.slice(4, 8)].map((logo, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-[#ffcca3] flex items-center justify-center w-[160px] h-[75px] flex-shrink-0">
                                <img src={logo} alt="Company Logo" className="max-w-[100px] max-h-[35px] object-contain opacity-80" />
                            </div>
                        ))}
                    </div>
                    {/* Row 3 */}
                    <div className="flex gap-4 w-max animate-scroll-left ml-[-40px] hover:pause">
                        {[...hiringLogos.slice(8, 12), ...hiringLogos.slice(8, 12), ...hiringLogos.slice(8, 12), ...hiringLogos.slice(8, 12)].map((logo, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-[#ffcca3] flex items-center justify-center w-[160px] h-[75px] flex-shrink-0">
                                <img src={logo} alt="Company Logo" className="max-w-[100px] max-h-[35px] object-contain opacity-80" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Banner */}
            <div className="mt-8 bg-gradient-to-br from-[#ffe5cc] to-[#ffdbb8] rounded-2xl py-8 px-4 sm:px-8 border border-[#ffcca3] shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 divide-y md:divide-y-0 md:divide-x divide-[#ffb380] text-center">
                    <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
                        <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 font-montserrat">₹25 LPA</h4>
                        <p className="text-gray-700 text-sm font-semibold">Average Package</p>
                    </div>
                    <div className="flex flex-col items-center justify-center pt-4 md:pt-0 border-t-0">
                        <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 font-montserrat">25%</h4>
                        <p className="text-gray-700 text-sm font-semibold">Average Hike</p>
                    </div>
                    <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
                        <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 font-montserrat">120%</h4>
                        <p className="text-gray-700 text-sm font-semibold">Highest Hike</p>
                    </div>
                    <div className="flex flex-col items-center justify-center pt-4 md:pt-0 border-t-0">
                        <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 font-montserrat">350+</h4>
                        <p className="text-gray-700 text-sm font-semibold">Hiring Partners</p>
                    </div>
                    <div className="flex flex-col items-center justify-center pt-4 md:pt-0 col-span-2 md:col-span-1">
                        <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 font-montserrat">125,000+</h4>
                        <p className="text-gray-700 text-sm font-semibold">Careers Transformed</p>
                    </div>
                </div>
            </div>

            {/* Corporate Training Banner */}
            <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#ff6b00]/10 flex items-center justify-center flex-shrink-0">
                            <Building2 size={32} className="text-[#ff6b00]" />
                        </div>
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 font-montserrat">Corporate Training</h3>
                            <p className="text-gray-600 text-sm sm:text-[15px]">
                                The work force is your asset. Up-Skill them with our Corporate Training Programs!
                            </p>
                        </div>
                    </div>
                    <button className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-colors w-full lg:w-auto text-[15px]">
                        Contact Us <ChevronRight size={18} />
                    </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-gray-400 flex-shrink-0" fill="#f3f4f6" strokeWidth={2.5}/>
                            <span className="text-gray-700 text-sm sm:text-[15px] font-medium">Unleash In-Demand Skills Across the Enterprise</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-gray-400 flex-shrink-0" fill="#f3f4f6" strokeWidth={2.5}/>
                            <span className="text-gray-700 text-sm sm:text-[15px] font-medium">Drive Increased Employee Productivity</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-gray-400 flex-shrink-0" fill="#f3f4f6" strokeWidth={2.5}/>
                            <span className="text-gray-700 text-sm sm:text-[15px] font-medium">Align Skill Development with Business Objectives</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-gray-400 flex-shrink-0" fill="#f3f4f6" strokeWidth={2.5}/>
                            <span className="text-gray-700 text-sm sm:text-[15px] font-medium">Leverage Immersive Learning</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #d1d5db;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #9ca3af;
                }
                
                /* Marquee Animations */
                .mask-edges {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                @keyframes scrollLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-25% - 0.25rem)); }
                }
                @keyframes scrollRight {
                    0% { transform: translateX(calc(-25% - 0.25rem)); }
                    100% { transform: translateX(0); }
                }
                .animate-scroll-left {
                    animation: scrollLeft 18s linear infinite;
                }
                .animate-scroll-right {
                    animation: scrollRight 18s linear infinite;
                }
                .hover\\:pause:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
