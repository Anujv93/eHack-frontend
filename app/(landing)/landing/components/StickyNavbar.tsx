'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'problem', label: 'Why Now?' },
    { id: 'solution', label: 'The Solution' },
    { id: 'reviews', label: 'Success Stories' },
    { id: 'programs', label: 'Programs' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'faq', label: 'FAQ' },
];

export default function StickyNavbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const navContainerRef = useRef<HTMLDivElement>(null);

    // Initial scroll check to avoid flashing
    useEffect(() => {
        setScrolled(window.scrollY > 100);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Show after 100px
            setScrolled(scrollY > 100);

            // Find current active section
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = scrollY + 150; // Offset

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

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-scroll the nav container to keep active tab in view
    useEffect(() => {
        if (activeSection && navContainerRef.current) {
            const activeBtn = navContainerRef.current.querySelector<HTMLButtonElement>(`button[data-id="${activeSection}"]`);
            if (activeBtn) {
                const container = navContainerRef.current;
                const scrollLeft = activeBtn.offsetLeft - (container.offsetWidth / 2) + (activeBtn.offsetWidth / 2);

                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        }
    }, [activeSection]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm ${scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
                }`}
        >
            <div className="container mx-auto px-3 sm:px-4 max-w-7xl h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">

                {/* Scrollable Links */}
                <div
                    ref={navContainerRef}
                    className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar mask-gradient"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            data-id={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`whitespace-nowrap px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 relative ${activeSection === item.id
                                ? 'text-[#ff6b00] bg-[#fff5ed] font-semibold'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {item.label}
                            {activeSection === item.id && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-[#ff6b00] rounded-t-full"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Call CTA */}
                <div className="flex-shrink-0 pl-2 sm:pl-4 border-l border-gray-100">
                    <a
                        href="tel:+919886035330"
                        className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#ff6b00] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-lg shadow-[#ff6b00]/20 hover:bg-[#e66000] hover:-translate-y-0.5 transition-all duration-300 group"
                    >
                        <Phone size={16} className="fill-current" />
                        <span className="hidden md:inline">Contact Us: +91-9886035330</span>
                        <span className="md:hidden">Call Now</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}
