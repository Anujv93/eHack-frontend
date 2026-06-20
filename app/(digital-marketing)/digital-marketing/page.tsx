'use client';

import React from 'react';
import HeroSection from './components/HeroSection';
import StickyNavbar from './components/StickyNavbar';
import KeyFeaturesSection from './components/KeyFeaturesSection';

export default function DigitalMarketingLandingPage() {
    return (
        <main className="min-h-screen relative bg-white pb-24">
            <HeroSection />
            <StickyNavbar />
            <KeyFeaturesSection />
        </main>
    );
}
