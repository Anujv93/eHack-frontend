'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const placementStories = [
    {
        id: 1,
        name: "Anmol Gupta",
        image: "/testimonials/person1.jpg",
        before: { role: "B.Tech Student", company: "Fresher" },
        after: { role: "APV-DELIVERY", company: "Ampcus Cyber", logo: "/images/ampcuscyber.png" },
        hike: "Start",
        program: "Masters Program"
    },
    {
        id: 2,
        name: "Rohit Prasad",
        image: "/testimonials/person8.jpg",
        before: { role: "IT Manager", company: "Mid-size Firm" },
        after: { role: "Advisor", company: "Fiserv", logo: "/images/fiserv.png" },
        hike: "200%",
        program: "Masters Program"
    },
    {
        id: 3,
        name: "Snigdha Suresh Poonghat",
        image: "/testimonials/person7.jpg",
        before: { role: "IT Support", company: "Tech Support" },
        after: { role: "Technical Support Engineer", company: "ASK4", logo: "/images/ask4_limited_logo.jpg" },
        hike: "150%",
        program: "Graduate Program"
    },
    {
        id: 4,
        name: "Damini Ranganath",
        image: "/testimonials/person4.jpg",
        before: { role: "Software Dev", company: "Startup" },
        after: { role: "Cybersecurity Engineer", company: "Anuvu", logo: "/images/anuvu.png" },
        hike: "120%",
        program: "Masters Program"
    },
    {
        id: 5,
        name: "Vaddi . Paneendar",
        image: "/testimonials/person3.jpg",
        before: { role: "Support Engineer", company: "Tech Support" },
        after: { role: "Red Teamer", company: "SISA", logo: "/images/sisa.webp" },
        hike: "300%",
        program: "Masters Program"
    },
    {
        id: 6,
        name: "Rajiv Govind",
        image: "/testimonials/person2.jpg",
        before: { role: "System Admin", company: "Local IT Firm" },
        after: { role: "Head Teaching Assistant", company: "GT Compution", logo: "/images/gtlogo.jpg" },
        hike: "140%",
        program: "Graduate Program"
    },
    {
        id: 7,
        name: "Pranshu Tiwari",
        image: "/testimonials/person5.jpg",
        before: { role: "Network Admin", company: "ISP" },
        after: { role: "Director Security Services", company: "Ampcus Cyber", logo: "/images/ampcuscyber.png" },
        hike: "160%",
        program: "Elite Program"
    },
    {
        id: 8,
        name: "Abhinav Choubey",
        image: "/testimonials/person6.jpg",
        before: { role: "IT Manager", company: "Mid-size Firm" },
        after: { role: "Associate Director", company: "SISA", logo: "/images/sisa.webp" },
        hike: "200%",
        program: "Masters Program"
    }
];

export default function TransformationSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 85%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-12 bg-white overflow-hidden border-t border-gray-100 relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b00]/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff6b00]/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-10">
                    <span className="text-[#ff6b00] font-bold tracking-widest uppercase mb-4 text-sm md:text-base block">
                        The Proof
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-[#1f2937]">
                        The Architecture of <span className="text-[#ff6b00]">Success</span><br />
                        Just Like How They All Did It.
                    </h3>
                    <p className="text-[#1f2937] text-lg md:text-xl max-w-2xl mx-auto">
                        Real transformations from our elite programs. From standard IT roles to high-stakes cybersecurity leadership.
                    </p>
                </div>
            </div>

            {/* Marquee Track */}
            <div className="w-full relative py-6">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes slideTransform {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee-slow {
                        animation: slideTransform 50s linear infinite;
                    }
                    .animate-marquee-slow:hover {
                        animation-play-state: paused;
                    }
                    .mask-transformation {
                        mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    }
                `}} />

                <div className="flex mask-transformation overflow-hidden whitespace-nowrap">
                    <div className="flex animate-marquee-slow py-4 gap-8">
                        {[...placementStories, ...placementStories].map((story, index) => (
                            <div
                                key={`${story.id}-${index}`}
                                className="inline-block w-[380px] group transition-all duration-500"
                            >
                                <div className="bg-white border border-gray-100 rounded-3xl p-8 h-full shadow-xl hover:shadow-2xl hover:border-[#ff6b00]/30 transition-all relative overflow-hidden">
                                    {/* Glass Accent */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b00]/5 rounded-full blur-3xl -tr-8 transition-opacity opacity-0 group-hover:opacity-100"></div>

                                    <div className="flex items-center gap-5 mb-8 relative">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-100 group-hover:border-[#ff6b00] transition-colors bg-gray-50">
                                                <img src={story.image} alt={story.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 bg-[#ff6b00] text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg transform rotate-3">
                                                {story.hike} HIKE
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-[#1f2937] font-bold text-lg">{story.name}</h3>
                                            <span className="text-[#ff6b00] text-[10px] font-black uppercase tracking-wider bg-[#ff6b00]/10 px-2 py-0.5 rounded">
                                                {story.program}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-6 relative">
                                        {/* Before */}
                                        <div className="transition-opacity">
                                            <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest block mb-2 font-black">Before eHack</span>
                                            <div className="flex flex-col">
                                                <span className="text-[#374151] font-bold text-sm">{story.before.company}</span>
                                                <span className="text-gray-500 text-xs italic">{story.before.role}</span>
                                            </div>
                                        </div>

                                        {/* Connector */}
                                        <div className="relative pl-3 py-1">
                                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gray-100 via-[#ff6b00] to-gray-100"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#ff6b00] absolute -left-1.5 top-1/2 -mt-1.5 shadow-[0_0_10px_#ff6b00]"></div>
                                        </div>

                                        {/* After */}
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 group-hover:border-[#ff6b00]/20 transition-all">
                                            <span className="text-[#ff6b00] text-[9px] font-black uppercase tracking-widest block mb-3">Today</span>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded-lg p-1.5 flex items-center justify-center shadow-sm shrink-0">
                                                    <img src={story.after.logo} alt={story.after.company} className="max-w-full max-h-full object-contain" />
                                                </div>
                                                <div className="flex flex-col overflow-hidden">
                                                    <span className="text-[#1f2937] font-black text-sm truncate">{story.after.company}</span>
                                                    <span className="text-[#ff6b00] text-xs font-bold truncate">{story.after.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Proof Section */}
            <div className="container mx-auto px-4 mt-10 text-center">
                <div className="inline-flex items-center flex-wrap justify-center gap-4 md:gap-8 py-4 px-6 md:px-10 rounded-3xl bg-gray-50 border border-gray-100">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                                <img src={`/images/testimonials/person${i}.jpg`} alt="" />
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4b5563] text-sm font-medium">
                        Joined 5,000+ graduates in <span className="text-[#1f2937] font-black underline decoration-[#ff6b00] decoration-2">Elite Security Roles</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
