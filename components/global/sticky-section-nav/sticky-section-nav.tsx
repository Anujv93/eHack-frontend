'use client';

import { useState, useEffect, useCallback } from 'react';
import { Phone } from 'lucide-react';
import './sticky-section-nav.css';

// Section configuration type
export interface NavSection {
    id: string;
    label: string;
}

interface StickySectionNavProps {
    sections: NavSection[];
    scrollThreshold?: number; // How far to scroll before showing nav
    phoneNumber?: string;
}

export default function StickySectionNav({
    sections,
    scrollThreshold = 400,
    phoneNumber = '+919886035330'
}: StickySectionNavProps) {
    const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
    const [showStickyNav, setShowStickyNav] = useState(false);

    // Handle scroll to update active section and sticky nav visibility
    useEffect(() => {
        const handleScroll = () => {
            // Show sticky nav after scrolling past threshold
            const scrollY = window.scrollY;
            setShowStickyNav(scrollY > scrollThreshold);

            // Find which section is currently in view
            const sectionElements = sections.map(section => ({
                id: section.id,
                element: document.getElementById(section.id),
            })).filter(s => s.element);

            const viewportHeight = window.innerHeight;
            const offset = 150; // Account for sticky nav height

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const { id, element } = sectionElements[i];
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= offset + viewportHeight * 0.3) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections, scrollThreshold]);

    // Smooth scroll to section
    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Height of sticky nav
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, []);

    return (
        <nav className={`sticky-section-nav ${showStickyNav ? 'visible' : ''}`}>
            <div className="sticky-nav-container">
                <div className="sticky-nav-links">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            className={`sticky-nav-link ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(section.id)}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
                <div className="sticky-nav-cta">
                    <a href={`tel:${phoneNumber}`} className="sticky-nav-call-btn">
                        <Phone size={16} />
                        <span>Call Now</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}
