'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './offer-banner.css';

export default function OfferBanner() {
    return (
        <section className="offer-banner">
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
                        Program + Purchasing CSO & CSU Bundle (Worth ₹1,10,000).
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
