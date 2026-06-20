'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const projects = [
    {
        title: "Business Strategy",
        description: "In this project, learners will design a comprehensive digital marketing strategy for a startup—real or fictional. They will define business objectives, identify target audiences, conduct competitor analysis, select appropriate digital channels (such as SEO, Social Media Marketing, Email Marketing, etc.), and establish key performance indicators (KPIs). This hands-on project equips learners with practical insights into planning and executing a digital marketing strategy from the ground up."
    },
    {
        title: "UI and UX Design",
        description: "In this hands-on project, learners will design and optimize the user interface (UI) and user experience (UX) for a digital marketing landing page or mobile application. The project will involve conducting user research, creating wireframes and interactive prototypes, applying modern design principles, and running usability tests to maximize conversion rates. Through this project, learners will gain practical experience in crafting intuitive, user-centric designs that drive business objectives and improve customer satisfaction."
    },
    {
        title: "Search Engine Optimization",
        description: "In this project, learners will conduct a comprehensive SEO audit of an existing website or blog and implement optimization strategies to enhance its visibility on search engines. Key tasks will include keyword research, refining meta tags, improving page structure, adding internal linking, and identifying potential backlink opportunities. This project provides learners with hands-on experience in applying SEO best practices to improve a website’s search engine ranking and overall digital presence."
    },
    {
        title: "Social Media Marketing",
        description: "In this project, students will create a 30-day content strategy to enhance a brand’s presence across selected social media platforms such as Instagram, Facebook, and X (formerly Twitter). The project will involve identifying the appropriate platforms, developing post concepts, researching effective hashtags, outlining engagement tactics, and structuring a consistent publishing calendar. This hands-on experience will equip students with the skills to plan and execute a cohesive social media strategy aimed at building audience engagement and brand visibility."
    },
    {
        title: "Paid Advertising",
        description: "In this project, students will design and configure a Google Ads campaign for a chosen product or service. They will select the appropriate campaign type (Search, Display, or Video), conduct keyword research, craft compelling ad copy, define budget and geographic targeting parameters, and establish key performance tracking mechanisms. This project provides practical exposure to paid advertising strategy, campaign execution, and performance analysis using Google Ads."
    },
    {
        title: "Content Marketing",
        description: "In this project, students will develop a blog focused on a chosen topic or product niche and publish 2–3 SEO-optimized articles. They will identify a target audience, perform keyword research, apply content structuring techniques, and implement optimization best practices. Additionally, students will explore methods to promote their blog through social media and other digital channels. This project equips learners with practical skills in content creation, organic traffic generation, and audience engagement strategies."
    }
];

export default function ProjectsSection() {
    const [showAll, setShowAll] = useState(false);
    const visibleProjects = showAll ? projects : projects.slice(0, 2);

    return (
        <div className="w-full bg-[#f8f9fa] rounded-2xl pt-2 sm:pt-3 pb-4 sm:pb-5 px-4 sm:px-8 border border-gray-200 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-100/60 to-green-100/40 blur-3xl translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a202c] font-montserrat mb-4 pl-2 sm:pl-4 relative z-10">
                Capstone Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10 mb-6">
                {visibleProjects.map((project, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                        <h3 className="text-[17px] font-bold text-gray-900 mb-2.5">
                            {project.title}
                        </h3>
                        <p className="text-gray-600 text-[14px] leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center relative z-10">
                <button 
                    onClick={() => setShowAll(!showAll)}
                    className="flex items-center gap-2 bg-[#ff6b00]/10 text-[#ff6b00] font-bold py-2.5 px-6 rounded-lg hover:bg-[#ff6b00]/20 transition-colors text-[15px]"
                >
                    {showAll ? "View Less" : "View All"} 
                    {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>
        </div>
    );
}
