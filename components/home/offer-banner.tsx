'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './offer-banner.css';
import CehOfferModal from './ceh-offer-modal';

const offers = [
    {
        id: 'ceh',
        ribbonTexts: ['Special Offer', 'Hacking Masterclass @ ₹30K', 'Huge Discount!', 'EMI Available'],
        pretitle: 'Practical Ethical Hacking Masterclass^AI',
        title: (
            <>
                Just ₹30,000 <span style={{ textDecoration: 'line-through', opacity: 0.7, fontSize: '0.85em', marginLeft: '6px' }}>₹1,00,000</span>
            </>
        ),
        description: 'Launch your cybersecurity career! Master advanced ethical hacking directly through hands-on Live Online or Offline sessions, and get fully certified upon completion.',
        certifications: (
            <>
                <strong>Easy 3-Split EMI:</strong> ₹10,000 upfront and the remaining in two splits.
            </>
        ),
        ctaText: 'View Offer Details',
        ctaLink: '/offers/ceh-offer',
        imageSrc: '/portrait-hacker-removebg-preview.png',
    },
    {
        id: 'laptop',
        ribbonTexts: ['Special Offer', 'Free Laptop!', 'Limited Time', '₹50K Value'],
        pretitle: 'Cybersecurity Career Accelerator',
        title: (
            <>
                Free Laptop <span>(Worth ₹50,000)</span>
            </>
        ),
        description: 'Exclusively for students enrolling in Graduate or Master Program + Purchasing Certified SOC Analyst (CSA) & Certified Cloud Security Engineer (CCSE) Bundle (Worth ₹1,15,000).',
        certifications: (
            <>
                Includes certification training for: <strong>CEH, CPENT, CND, CHFI</strong> & more.
            </>
        ),
        ctaText: 'Enroll & Claim Offer Now',
        ctaLink: '/offers/laptop-offer',
        imageSrc: '/images/offer-image-2-removebg-preview.png',
    }
];

export default function OfferBanner() {
    const [tick, setTick] = useState(0);
    const [showCehModal, setShowCehModal] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTick((t) => t + 1);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const currentOfferIndex = Math.floor(tick / 4) % offers.length;
    const currentOffer = offers[currentOfferIndex];
    const currentTextIndex = tick % currentOffer.ribbonTexts.length;

    const handleNextOffer = () => {
        setTick((t) => Math.floor(t / 4) * 4 + 4);
    };

    return (
        <section className={`offer-banner ${currentOffer.id === 'ceh' ? 'offer-banner-blue' : ''}`}>
            {/* Animated Loader Bar */}
            <div key={`${currentOffer.id}-loader`} className="offer-banner-loader" />

            {/* Tilted Special Offer Ribbon */}
            <div className={`offer-ribbon ${currentOffer.id === 'ceh' ? 'offer-ribbon-blue' : ''}`}>
                <span key={`${currentOffer.id}-${currentTextIndex}`} className="ribbon-text">
                    {currentOffer.ribbonTexts[currentTextIndex]}
                </span>
            </div>
            <div className="offer-banner-container">
                {/* Left Content */}
                <div key={currentOffer.id} className="offer-banner-content" style={{ animation: 'fadeInOut 0.5s ease-in-out' }}>
                    <h2 className="offer-banner-pretitle">
                        {currentOffer.pretitle}
                    </h2>
                    <h3 className="offer-banner-title">
                        {currentOffer.title}
                    </h3>
                    <p className="offer-banner-description">
                        {currentOffer.description}
                    </p>
                    <p className="offer-banner-certifications">
                        {currentOffer.certifications}
                    </p>
                    {currentOffer.id === 'ceh' ? (
                        <button onClick={() => setShowCehModal(true)} className="offer-banner-cta">
                            {currentOffer.ctaText}
                        </button>
                    ) : (
                        <Link href={currentOffer.ctaLink} className="offer-banner-cta">
                            {currentOffer.ctaText}
                        </Link>
                    )}
                </div>

                {/* Offer Toggle Control (Absolute Desktop / Centered Mobile flow) */}
                <div className="offer-toggle-wrapper">
                    <button
                        onClick={handleNextOffer}
                        className="offer-toggle-btn"
                        aria-label="Next Offer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>

                {/* Right Image Area */}
                <div key={`${currentOffer.id}-image`} className={`offer-banner-image ${currentOffer.id === 'ceh' ? 'ceh-image' : ''}`} style={{ animation: 'fadeInOut 0.5s ease-in-out' }}>
                    <Image
                        src={currentOffer.imageSrc}
                        alt="Offer Image"
                        width={340}
                        height={240}
                        className={currentOffer.id === 'ceh' ? 'ceh-offer-img' : ''}
                    />
                </div>
            </div>
            <CehOfferModal isOpen={showCehModal} onClose={() => setShowCehModal(false)} />
        </section>
    );
}
