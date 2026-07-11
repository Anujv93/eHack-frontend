'use client';

import React from 'react';
import LeadForm from './LeadForm';
import JourneyBox from './JourneyBox';
import CourseOverview from './CourseOverview';
import CertificationSection from './CertificationSection';
import SkillsCovered from './SkillsCovered';
import ToolsCovered from './ToolsCovered';
import ProjectsSection from './ProjectsSection';
import CourseReviews from './CourseReviews';
import FAQSection from './FAQSection';
import AchievementsSection from './AchievementsSection';
import IntroToDigitalMarketing from './IntroToDigitalMarketing';
import EnterpriseTrainingSection from './EnterpriseTrainingSection';
import FinalCTASection from './FinalCTASection';
import { Download, MessageCircleQuestion } from 'lucide-react';
import DownloadModal from './DownloadModal';
import { useState } from 'react';

export default function KeyFeaturesSection() {
    const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
    
    const features = [
        "Hands-on experience with Google Analytics and related tools.",
        "Real case studies from brands",
        "Learn to craft data-driven PPC",
        "Master AI-driven content and digital strategies.",
        "YouTube ad campaigns.",
        "Get skilled in SEO, SEM, SMO, Email, PPC",
        "Design social media calendars to run live campaigns.",
        "Get a 3-month internship certificate"
    ];

    return (
        <section id="key-features" className="pt-2 pb-16 bg-[#fafafa]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1300px]">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Column: Key Features & Demand Growth */}
                    <div className="w-full lg:w-[72%] flex flex-col gap-8">
                        {/* Wrapper mimicking the soft gradient/shape background from image */}
                        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-4 sm:p-10 relative overflow-hidden border border-gray-200">
                            {/* Subtle Color Design in Top Right Corner using Brand Color */}
                            <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-gradient-to-bl from-[#ff6b00]/20 via-[#ff6b00]/5 to-transparent opacity-80 rounded-bl-[150px] transform translate-x-8 -translate-y-8 pointer-events-none z-0"></div>
                            
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff6b00]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 font-montserrat">
                                    Digital Marketing Course Online - Key Features
                                </h2>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-8">
                                        {features.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-2.5 sm:gap-3">
                                                <span className="mt-0.5 flex-shrink-0 text-[#ff6b00] bg-[#ff6b00]/10 p-0.5 rounded-full">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                                    </svg>
                                                </span>
                                                <span className="text-gray-700 text-xs sm:text-sm font-medium leading-relaxed">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="flex justify-center mt-6 sm:mt-10">
                                        <button className="bg-[#ff6b00] hover:bg-[#e56000] text-white font-bold px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#ff6b00]/20 w-full sm:w-auto text-sm sm:text-base">
                                            Get Started <span className="text-lg leading-none">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Significant Demand Growth Box */}
                        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-4 sm:p-10 relative overflow-hidden border border-gray-200">
                            {/* Subtle Color Design in Top Left Corner */}
                            <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-[#ff6b00]/10 via-[#ff6b00]/5 to-transparent rounded-br-[150px] transform -translate-x-8 -translate-y-8 pointer-events-none z-0"></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 font-montserrat">
                                    Significant Demand Growth
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                                    
                                    {/* Annual Salary Card */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 relative overflow-hidden flex flex-col min-h-[260px] sm:h-[280px]">
                                        <div className="bg-[#e2e8f0] text-gray-700 font-bold text-[10px] sm:text-xs px-3 py-1.5 rounded-br-lg rounded-tl-xl absolute top-0 left-0">
                                            Annual Salary
                                        </div>
                                        
                                        <div className="mt-8 flex-grow relative w-full">
                                            <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible absolute inset-0">
                                                <defs>
                                                    <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.2" />
                                                        <stop offset="100%" stopColor="#ff6b00" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                                <path d="M0,90 C20,90 30,50 50,50 C70,50 80,10 100,10 C120,10 130,40 150,40 C170,40 180,80 200,80 L200,100 L0,100 Z" fill="url(#salaryGradient)" />
                                                <path d="M0,90 C20,90 30,50 50,50 C70,50 80,10 100,10 C120,10 130,40 150,40 C170,40 180,80 200,80" fill="none" stroke="#ff6b00" strokeWidth="2" />
                                                
                                                <circle cx="50" cy="50" r="4" fill="#ff6b00" className="stroke-white stroke-[2px]" />
                                                <text x="50" y="38" textAnchor="middle" className="text-[14px] font-bold fill-gray-800">₹6L</text>
                                                <text x="50" y="110" textAnchor="middle" className="text-[12px] fill-gray-400 font-medium">Min</text>

                                                <circle cx="100" cy="10" r="4" fill="#ff6b00" className="stroke-white stroke-[2px]" />
                                                <text x="100" y="-4" textAnchor="middle" className="text-[14px] font-bold fill-gray-800">₹24L</text>
                                                <text x="100" y="110" textAnchor="middle" className="text-[12px] fill-gray-400 font-medium">Max</text>

                                                <circle cx="150" cy="40" r="4" fill="#ff6b00" className="stroke-white stroke-[2px]" />
                                                <text x="150" y="26" textAnchor="middle" className="text-[14px] font-bold fill-gray-800">₹12L</text>
                                                <text x="150" y="110" textAnchor="middle" className="text-[12px] fill-gray-400 font-medium">Average</text>
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Hiring Companies Card */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 relative overflow-hidden flex flex-col min-h-[260px] sm:h-[280px]">
                                        <div className="bg-[#e2e8f0] text-gray-700 font-bold text-[10px] sm:text-xs px-3 py-1.5 rounded-br-lg rounded-tl-xl absolute top-0 left-0">
                                            Hiring Companies
                                        </div>
                                        <div className="mt-8 flex-grow flex items-center justify-center">
                                            <div className="grid grid-cols-3 gap-y-6 sm:gap-y-8 gap-x-2 sm:gap-x-4 w-full px-1">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="h-5 sm:h-8 object-contain mx-auto opacity-80" />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-5 sm:h-8 object-contain mx-auto" />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-5 sm:h-8 object-contain mx-auto" />
                                                
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-5 sm:h-8 object-contain mx-auto opacity-80" />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-4 sm:h-7 object-contain mx-auto" />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-6 sm:h-9 object-contain mx-auto opacity-80" />
                                                
                                                <img src="https://cdn.simpleicons.org/hcl" alt="HCLTech" className="h-7 sm:h-10 object-contain mx-auto opacity-90" />
                                                <img src="https://cdn.simpleicons.org/intel" alt="Intel" className="h-7 sm:h-10 object-contain mx-auto" />
                                                <img src="https://cdn.simpleicons.org/tata" alt="TCS" className="h-7 sm:h-10 object-contain mx-auto" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Available Jobs Card */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 relative overflow-hidden flex flex-col min-h-[260px] sm:h-[280px]">
                                        <div className="bg-[#e2e8f0] text-gray-700 font-bold text-[10px] sm:text-xs px-3 py-1.5 rounded-br-lg rounded-tl-xl absolute top-0 left-0 z-10">
                                            Available Jobs
                                        </div>
                                        
                                        <div className="mt-8 flex-grow relative w-full flex flex-col justify-end items-center">
                                            <div className="absolute top-2 left-0 w-full flex justify-between px-1 sm:px-2 text-gray-300">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="hidden sm:block"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                                <div className="text-[#ff6b00] transform scale-125 border-4 border-[#ff6b00]/20 rounded-full bg-white relative -top-2">
                                                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                                </div>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="hidden sm:block"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                            </div>

                                            {/* Semi-circle visual */}
                                            <div className="w-full h-[120px] overflow-hidden relative mt-8">
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] aspect-square bg-gradient-to-b from-[#ff6b00]/20 to-transparent rounded-t-full"></div>
                                                
                                                <div className="absolute top-6 w-full text-center px-2">
                                                    <h3 className="text-xl sm:text-3xl font-bold text-gray-900 leading-none mt-2 sm:mt-0">150,000+</h3>
                                                    <p className="text-[10px] sm:text-sm text-gray-600 mt-1 sm:mt-1.5 leading-snug">
                                                        Job Opening Annually<br/>for <strong className="text-gray-900">Digital Marketing</strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                                    Our Digital Marketing course is designed to equip you with the skills to build impactful online campaigns, drive traffic, and generate measurable results. We cover key areas like SEO, social media marketing, Google Ads, content strategy, email marketing, and analytics. You'll also get hands-on experience with tools like Meta Business Suite, SEMrush, and Google Analytics to help you become job-ready from day one.
                                </p>
                            </div>
                        </div>

                        {/* Journey Box / Curriculum */}
                        <div id="course-content">
                            <JourneyBox />
                        </div>
                        
                        {/* Digital Marketing Course Overview */}
                        <div id="overview">
                            <CourseOverview />
                        </div>

                        {/* Certification Section */}
                        <div id="certification">
                            <CertificationSection />
                        </div>

                        {/* Skills Covered */}
                        <div id="skills">
                            <SkillsCovered />
                        </div>

                        {/* Tools Covered */}
                        <div id="tools">
                            <ToolsCovered />
                        </div>

                        {/* Capstone Projects */}
                        <div id="projects">
                            <ProjectsSection />
                        </div>

                        {/* Course Reviews */}
                        <div id="reviews">
                            <CourseReviews />
                        </div>

                        {/* FAQ Section */}
                        <div id="faqs">
                            <FAQSection />
                        </div>

                        {/* Achievements Section */}
                        <div id="achievements">
                            <AchievementsSection />
                        </div>

                        {/* Intro to Digital Marketing */}
                        <div id="intro">
                            <IntroToDigitalMarketing />
                        </div>

                        {/* Enterprise Training Section */}
                        <div id="enterprise">
                            <EnterpriseTrainingSection />
                        </div>

                        {/* Final CTA Section */}
                        <div id="enroll">
                            <FinalCTASection />
                        </div>
                    </div>

                    {/* Right Column: Sidebar Forms (Sticky & Reduced Width) */}
                    <div className="w-full lg:w-[28%] flex flex-col gap-3 sticky top-[4.5rem] self-start z-20">
                        
                        {/* Assist Form Card */}
                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 relative overflow-hidden">
                            <LeadForm 
                                customTitle={
                                    <div className="flex items-center gap-2 text-[1.1rem] font-bold text-gray-900">
                                        <span className="bg-[#ff6b00] text-white p-1 rounded">
                                            <MessageCircleQuestion size={16} />
                                        </span>
                                        Are you Confused? Let us assist you.
                                    </div>
                                }
                                customSubtitle=""
                                customButtonText="Talk to Us"
                                showDigitalMarketingTag={false}
                                noShadow={true}
                                paddingClass="p-0"
                                formSource="DM Assist Sidebar"
                            />
                        </div>

                        {/* Brochure Card */}
                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 text-center">
                            <h4 className="font-bold text-gray-900 text-lg mb-6 leading-snug">
                                Discover the Ultimate<br />Brochure Now
                            </h4>
                            <button 
                                onClick={() => setIsBrochureModalOpen(true)}
                                className="w-full border-2 border-gray-800 text-gray-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                            >
                                Download Brochure <Download size={18} />
                            </button>
                        </div>
                        
                    </div>

                </div>
            </div>

            <DownloadModal 
                isOpen={isBrochureModalOpen}
                onClose={() => setIsBrochureModalOpen(false)}
                title="Download Digital Marketing Brochure"
                downloadUrl="/brochure/Digital-Marketing-MasterProgram-Brochure.pdf"
                downloadFilename="Digital_Marketing_Brochure.pdf"
                formSource="DM Brochure Download"
            />
        </section>
    );
}
