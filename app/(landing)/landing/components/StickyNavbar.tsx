'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'problem', label: 'Why Now?' },
    { id: 'solution', label: 'The Solution' },
    { id: 'reviews', label: 'Success Stories' },
    { id: 'programs', label: 'Programs' },
    { id: 'faq', label: 'FAQ' },
];

export default function StickyNavbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Update scrolled state for navbar styling
            setScrolled(window.scrollY > 50);

            // Find current active section
            const sections = navItems.map(item => document.getElementById(item.id));

            const scrollPosition = window.scrollY + 100; // Offset for better triggering

            for (const section of sections) {
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveSection(section.id);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    return (
        <nav
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-5xl rounded-full ${scrolled
                ? 'bg-white/80 backdrop-blur-md shadow-lg py-3 border border-gray-200/50'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="flex items-center justify-between px-6">




                {/* Desktop Nav Items */}
                <div
                    className={`hidden md:flex items-center gap-1 bg-gray-100/50 p-1.5 rounded-full border border-gray-200/50 backdrop-blur-sm transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                        }`}
                >
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 relative ${activeSection === item.id
                                ? 'text-white shadow-md'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {activeSection === item.id && (
                                <span className="absolute inset-0 bg-[#ff6b00] rounded-full -z-10 animate-in fade-in zoom-in duration-300"></span>
                            )}
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button - Placeholder for mobile solution */}
                <div className={`md:hidden transition-all duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    {/* Simplified mobile indicator */}
                    <span className="text-xs font-bold text-[#ff6b00] bg-[#ff6b00]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        {navItems.find(i => i.id === activeSection)?.label || 'Menu'}
                    </span>
                </div>

                {/* CTA Button */}
                <button
                    onClick={() => scrollToSection('programs')}
                    className={`hidden md:block px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${scrolled
                        ? 'bg-[#1f2937] text-white hover:bg-black opacity-100 translate-y-0'
                        : 'bg-white text-[#1f2937] hover:bg-gray-100 opacity-0 -translate-y-4 pointer-events-none'
                        }`}
                >
                    Apply Now
                </button>
            </div>
        </nav>
    );
}
