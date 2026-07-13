'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';

const navItems = [
    { id: 'key-features', label: 'Key Features' },
    { id: 'course-content', label: 'Curriculum' },
    { id: 'overview', label: 'Overview' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'certification', label: 'Certification' },
    { id: 'skills', label: 'Skills' },
    { id: 'tools', label: 'Tools' },
    { id: 'projects', label: 'Projects' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'intro', label: 'Intro' },
    { id: 'enterprise', label: 'Enterprise' },
];

export default function StickyNavbar() {
    const [activeSection, setActiveSection] = useState('key-features');
    const navContainerRef = useRef<HTMLDivElement>(null);

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

    // Scroll-spy: auto-highlight the active section as user scrolls
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            // Iterate in reverse so the last matching (topmost visible) section wins
            let found = false;
            for (let i = navItems.length - 1; i >= 0; i--) {
                const element = document.getElementById(navItems[i].id);
                if (element) {
                    const top = element.getBoundingClientRect().top + window.scrollY;
                    if (scrollPosition >= top) {
                        setActiveSection((prev) => {
                            if (prev !== navItems[i].id) {
                                // Auto-scroll the nav so the active tab is visible
                                const navBtn = document.querySelector(`button[data-id="${navItems[i].id}"]`);
                                if (navBtn && navContainerRef.current) {
                                    navBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                                }
                                return navItems[i].id;
                            }
                            return prev;
                        });
                        found = true;
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="sticky top-0 z-50 flex flex-col bg-white border-b border-gray-200 shadow-md">
            {/* Top row of the bottom bar */}
            <div className="container mx-auto px-2 sm:px-4 lg:px-8 max-w-7xl h-12 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">

                {/* Scrollable Links */}
                <div
                    ref={navContainerRef}
                    className="flex-1 flex items-center gap-3 sm:gap-8 overflow-x-auto no-scrollbar py-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                >
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            data-id={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`whitespace-nowrap py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium transition-all duration-200 relative ${activeSection === item.id
                                ? 'text-[#ff6b00] font-bold'
                                : 'text-gray-500 hover:text-gray-800'
                                }`}
                        >
                            {item.label}
                            {/* Active indicator bar */}
                            {activeSection === item.id && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff6b00] rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Call Button */}
                <div className="flex-shrink-0 flex items-center pr-1 sm:pr-0">
                    <a
                        href="tel:+919886035330"
                        className="inline-flex items-center gap-1 sm:gap-2 border border-gray-300 bg-white text-gray-800 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-[10px] sm:text-sm shadow-sm hover:bg-gray-50 transition-all duration-300"
                    >
                        <span className="bg-[#ff6b00] p-1 rounded-full text-white flex items-center justify-center">
                            <Phone size={12} className="sm:w-[14px] sm:h-[14px] fill-current" />
                        </span>
                        <span className="hidden sm:inline">+91-9886035330</span>
                        <span className="sm:hidden font-semibold ml-0.5 tracking-wide text-xs">Call</span>
                    </a>
                </div>
            </div>

            {/* Floating WhatsApp Button override for bottom spacing (remove if not needed anymore since navbar is top) */}
            <style>{`
                .whatsapp-float-button {
                    bottom: 20px !important;
                }
            `}</style>
        </div>
    );
}
