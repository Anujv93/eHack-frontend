'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const courses = [
    {
        organization: "ISC2",
        logo: "/partner-logo/isc2.jpg",
        tag: "Popular",
        tagColor: "bg-green-100 text-green-800 border-green-200",
        name: "Certified Information Systems Security Professional",
        acronym: "(CISSP)",
        link: "#"
    },
    {
        organization: "EC Council",
        logo: "/images/ec-council-logo.png",
        tag: "In Demand",
        tagColor: "bg-blue-100 text-blue-800 border-blue-200",
        name: "C|CISO (Certified Chief Information Security Officer)",
        acronym: "",
        link: "#"
    },
    {
        organization: "ISACA",
        logo: "/partner-logo/ISACA.png",
        tag: "Essential",
        tagColor: "bg-red-100 text-red-800 border-red-200",
        name: "Certified Information Systems Auditors",
        acronym: "(CISA)",
        link: "#"
    },
    {
        organization: "ISACA",
        logo: "/partner-logo/ISACA.png",
        tag: "Top Rated",
        tagColor: "bg-purple-100 text-purple-800 border-purple-200",
        name: "Certified Information Security Manager",
        acronym: "(CISM)",
        link: "#"
    },
    {
        organization: "Offensive Security",
        logo: "/partner-logo/OffSec_Logo.jpg",
        tag: "Bestseller",
        tagColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
        name: "OSCP (Offensive Security Certified Professional)",
        acronym: "",
        link: "#"
    },
    {
        organization: "EC Council",
        logo: "/images/ec-council-logo.png",
        tag: "Trending",
        tagColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
        name: "Certified Ethical Hacker",
        acronym: "(CEH AI)",
        link: "#"
    }
];

export default function OurCoursesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".course-card",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
            {/* Background Decoration to match theme */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b00]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[#ff6b00] font-bold tracking-widest uppercase mb-4 text-sm md:text-base block">
                        Explore More Options
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-[#1f2937] leading-tight mb-6">
                        Looking for a <span className="text-[#ff6b00]">Specific Certification</span>?
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Beyond our flagship programs, we offer dedicated training for the industry&apos;s most sought-after global credentials.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className="course-card group relative bg-white border border-[#ff6b00] rounded-3xl p-8 hover:shadow-xl hover:shadow-[#ff6b00]/10 transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-6 h-16">
                                <div className="h-full flex items-center">
                                    {/* Logo with specific sizing */}
                                    <img
                                        src={course.logo}
                                        alt={`${course.organization} logo`}
                                        className="h-14 w-auto object-contain max-w-[160px]"
                                        onError={(e) => {
                                            // Fallback if image fails
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement!.innerText = course.organization;
                                        }}
                                    />
                                </div>
                                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-sm tracking-wide uppercase border ${course.tagColor}`}>
                                    {course.tag}
                                </span>
                            </div>

                            <div className="mb-8 flex-grow">
                                <h3 className="text-2xl font-bold text-[#1f2937] group-hover:text-black transition-colors mb-2 leading-tight">
                                    {course.name} <span className="text-gray-400 font-medium ml-1">{course.acronym}</span>
                                </h3>
                            </div>

                            <div className="mt-auto">
                                <a
                                    href={course.link}
                                    className="inline-flex items-center text-[#ff6b00] font-bold tracking-wide group-hover:text-[#e66000] transition-colors"
                                >
                                    View Details
                                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
