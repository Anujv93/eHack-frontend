'use client';

import React, { useState, useEffect } from 'react';
import './blinking-button.css';

export default function BlinkingMasterclassButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling 400px (approx past hero section)
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToMasterclass = () => {
        const element = document.getElementById('masterclass-section');
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={`blinking-masterclass-container ${isVisible ? 'visible' : 'hidden'}`}>
            <button 
                onClick={scrollToMasterclass}
                className="blinking-masterclass-button"
                aria-label="Scroll to 7-Day Live Master Class"
            >
                <div className="button-content-circle">
                    <span className="blinking-dot"></span>
                    <div className="text-wrapper">
                        <span className="text-small">7-Day Live</span>
                        <strong className="text-large">MASTER</strong>
                        <strong className="text-large">CLASS</strong>
                    </div>
                </div>
            </button>
        </div>
    );
}
