'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './offer-banner.css';

export default function OfferBanner() {
    const ribbonTexts = ['Special Offer', 'Free Laptop!', 'Limited Time', '₹50K Value'];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % ribbonTexts.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [ribbonTexts.length]);

    return (
        <section className="offer-banner">
            {/* Tilted Special Offer Ribbon */}
            <div className="offer-ribbon">
                <span key={currentTextIndex} className="ribbon-text">
                    {ribbonTexts[currentTextIndex]}
                </span>
            </div>
            <div className="offer-banner-container">
                {/* Left Content */}
                <div className="offer-banner-content">
                    <h2 className="offer-banner-pretitle">
                        Cybersecurity Career Accelerator
                    </h2>
                    <h3 className="offer-banner-title">
                        Free Laptop <span>(Worth ₹50,000)</span>
                    </h3>
                    <p className="offer-banner-description">
                        Exclusively for students enrolling in Graduate or Master
                        Program + Purchasing Certified SOC Analyst (CSA) & Certified Cloud Security Engineer (CCSE) Bundle (Worth ₹1,15,000).
                    </p>
                    <p className="offer-banner-certifications">
                        Includes certification training for: <strong>CEH, CPENT, CND, CHFI</strong> & more.
                    </p>
                    <Link href="/offers/laptop-offer" className="offer-banner-cta">
                        Enroll & Claim Offer Now
                    </Link>
                </div>

                {/* Right Image Area */}
                <div className="offer-banner-image">
                    <Image
                        src="/images/offer-image-2-removebg-preview.png"
                        alt="Free Laptop Offer"
                        width={340}
                        height={240}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
        </section>
    );
}
