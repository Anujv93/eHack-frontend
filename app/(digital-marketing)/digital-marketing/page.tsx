'use client';

import React from 'react';
import HeroSection from './components/HeroSection';
import StickyNavbar from './components/StickyNavbar';
import KeyFeaturesSection from './components/KeyFeaturesSection';
import MasterclassBanner from '@/components/MasterclassBanner';
import BlinkingMasterclassButton from './components/BlinkingMasterclassButton';
import { masterclasses } from '@/data/masterclasses';

export default function DigitalMarketingLandingPage() {
    return (
        <main className="min-h-screen relative bg-white pb-24">
            <HeroSection />
            <StickyNavbar />
            <KeyFeaturesSection />
            <MasterclassBanner data={masterclasses["digital-marketing"]} />
            <BlinkingMasterclassButton />
        </main>
    );
}
