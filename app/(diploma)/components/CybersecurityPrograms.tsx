'use client';

import React from 'react';
import Link from 'next/link';
import { programs } from '@/data/programs';

const CybersecurityPrograms = () => {
    const targetSlugs = [
        "masters-ethical-hacking",
        "graduate-cybersecurity",
        "masterclass-ethical-hacking-ceh-v13"
    ];

    const displayPrograms = targetSlugs.map(slug => 
        programs.find(p => p.slug === slug)
    ).filter(Boolean);

    return (
        <section className="w-full bg-white pt-10 pb-10 lg:pt-16 lg:pb-16 font-montserrat">
            <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-montserrat font-black text-3xl sm:text-4xl text-[#0b162c] mb-10 text-left">
                    Cybersecurity Programs
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {displayPrograms.map((program: any) => (
                        <Link 
                            href={`/programs/${program.slug}`} 
                            key={program.slug}
                            className="group block relative rounded-xl overflow-hidden border-2 border-[#ff6b00]/80 shadow-[0_4px_20px_rgba(255,107,0,0.15)] hover:shadow-[0_8px_30px_rgba(255,107,0,0.3)] h-[320px] sm:h-[340px] transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Background Image */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${program.heroImage})` }}
                            />
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b162c] via-[#0b162c]/90 to-transparent opacity-95" />
                            
                            {/* Content at bottom */}
                            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 flex flex-col justify-end h-full z-10">
                                <div className="mt-auto flex flex-col">
                                    <span className="text-[#ff0000] font-black text-xl sm:text-2xl mb-2 tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                                        {program.partner || 'EC-Council'}
                                    </span>
                                    <h3 className="text-white font-bold text-lg sm:text-[1.15rem] leading-snug mb-6 pr-2">
                                        {program.title}
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <span className="bg-[#2a2f3a] text-gray-300 text-xs sm:text-sm px-3 py-1.5 rounded border border-gray-600 font-medium">
                                            {program.stats?.duration || 'TBA'}
                                        </span>
                                        <span className="text-[#ff6b00] font-black text-lg sm:text-xl">
                                            {program.pricing?.discounted || 'Price on Request'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CybersecurityPrograms;
