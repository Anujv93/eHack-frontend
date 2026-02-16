'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        name: "Anmol Gupta",
        role: "APV-DELIVERY",
        company: "Ampcus Cyber",
        logo: "/images/ampcuscyber.png",
        quote: "Starting as a fresher, I had no roadmap. The Masters Program gave me the hands-on skills to land a core cybersecurity role immediately. Ideally, I'd still be searching without this guidance.",
        image: "/testimonials/person1.jpg",
        program: "Masters Program"
    },
    {
        id: 2,
        name: "Rohit Prasad",
        role: "Advisor",
        company: "Fiserv",
        logo: "/images/fiserv.png",
        quote: "Transitioning from IT management to cybersecurity felt risky, but the 200% hike proved it was the right move. The program's depth prepares you for real-world advisory roles.",
        image: "/testimonials/person8.jpg",
        program: "Masters Program"
    },
    {
        id: 3,
        name: "Snigdha S. Poonghat",
        role: "Tech Support Eng.",
        company: "ASK4",
        logo: "/images/ask4_limited_logo.jpg",
        quote: "I was in generic tech support. This program specialized my skills. Now I'm handling technical support for a major firm with a 150% salary jump. It changed my career trajectory completely.",
        image: "/testimonials/person7.jpg",
        program: "Graduate Program"
    },
    {
        id: 4,
        name: "Damini Ranganath",
        role: "Cybersecurity Eng.",
        company: "Anuvu",
        logo: "/images/anuvu.png",
        quote: "Software development was fine, but cybersecurity is where the future is. Validating my skills here led to a 120% hike and a core engineering role at a top firm.",
        image: "/testimonials/person4.jpg",
        program: "Masters Program"
    },
    {
        id: 5,
        name: "Vaddi Paneendar",
        role: "Red Teamer",
        company: "SISA",
        logo: "/images/sisa.webp",
        quote: "Red teaming requires deep technical knowledge. The advanced modules here covered everything I needed to clear the SISA interview and secure a massive 300% hike.",
        image: "/testimonials/person3.jpg",
        program: "Masters Program"
    },
    {
        id: 6,
        name: "Rajiv Govind",
        role: "Head Teaching Asst.",
        company: "GT Compution",
        logo: "/images/gtlogo.jpg",
        quote: "From system admin to teaching the next generation. The concepts I learned were so clear that I now mentor others. The 140% hike was just the cherry on top.",
        image: "/testimonials/person2.jpg",
        program: "Graduate Program"
    },
    {
        id: 7,
        name: "Pranshu Tiwari",
        role: "Director Security",
        company: "Ampcus Cyber",
        logo: "/images/ampcuscyber.png",
        quote: "Reaching a Director level requires more than just tools; it requires strategic understanding. This program bridged that gap for me, leading to a 160% hike.",
        image: "/testimonials/person5.jpg",
        program: "Elite Program"
    },
    {
        id: 8,
        name: "Abhinav Choubey",
        role: "Associate Director",
        company: "SISA",
        logo: "/images/sisa.webp",
        quote: "Managing IT is different from securing it. The transition to Associate Director at SISA was possible because of the rigorous, practical training I received here.",
        image: "/testimonials/person6.jpg",
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
        <section ref={containerRef} className="py-12 sm:py-20 bg-white overflow-hidden border-t border-gray-100 relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b00]/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff6b00]/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-[#ff6b00] font-bold tracking-widest uppercase mb-4 text-sm md:text-base block">
                        The Proof
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight text-[#1f2937]">
                        The Architecture of <span className="text-[#ff6b00]">Success</span><br />
                        Just Like How They All Did It.
                    </h3>
                    <p className="text-[#1f2937] text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
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
                        {[...testimonials, ...testimonials, ...testimonials].map((story, index) => (
                            <div
                                key={`${story.id}-${index}`}
                                className="inline-block w-[300px] sm:w-[380px] md:w-[450px] group transition-all duration-500 whitespace-normal"
                            >
                                <div className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-8 h-full shadow-xl hover:shadow-2xl hover:border-[#ff6b00]/30 transition-all relative overflow-hidden flex flex-col justify-between min-h-[280px] sm:min-h-[320px]">

                                    {/* Quote Icon Background */}
                                    <div className="absolute top-4 right-6 text-8xl text-gray-50 opacity-[0.4] font-serif font-black pointer-events-none select-none group-hover:scale-110 transition-transform duration-500">
                                        &rdquo;
                                    </div>

                                    <div>
                                        {/* Company Logo */}
                                        <div className="h-10 mb-6 relative z-10 flex items-center">
                                            <img
                                                src={story.logo}
                                                alt={story.company}
                                                className={`h-full w-auto object-contain object-left transition-transform duration-300 ${story.company === 'Ampcus Cyber' ? 'scale-[2.4] origin-left translate-x-4' :
                                                    story.company === 'Fiserv' ? 'scale-[2.0] origin-left translate-x-2' :
                                                        story.company === 'Anuvu' ? 'scale-[1.8] origin-left' :
                                                            story.company === 'ASK4' ? 'scale-[1.8] origin-left' :
                                                                story.company === 'GT Compution' ? 'scale-[1.8] origin-left' :
                                                                    'scale-100'
                                                    }`}
                                            />
                                        </div>

                                        {/* Quote */}
                                        <blockquote className="text-gray-600 text-sm sm:text-[1.05rem] leading-relaxed mb-4 sm:mb-6 italic relative z-10 font-medium">
                                            "{story.quote}"
                                        </blockquote>
                                    </div>

                                    {/* Author Info */}
                                    <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#ff6b00] p-0.5 shrink-0">
                                            <img src={story.image} alt={story.name} className="w-full h-full object-cover rounded-full" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{story.name}</h4>
                                            <p className="text-xs text-[#ff6b00] font-bold uppercase tracking-wide">{story.role}</p>
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
                                <img src={`/testimonials/person${i}.jpg`} alt="" />
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4b5563] text-base sm:text-lg md:text-xl font-bold">
                        Joined 5,000+ graduates in <span className="text-[#1f2937] font-black underline decoration-[#ff6b00] decoration-4">Elite Security Roles</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
