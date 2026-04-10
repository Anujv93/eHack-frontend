'use client';

import { useEffect, useRef } from 'react';
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import TransformationSection from "./components/TransformationSection";
import MarketDemandSection from "./components/MarketDemandSection";
import ProgramDetailsSection from "./components/ProgramDetailsSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import StickyNavbar from "./components/StickyNavbar";
import OurCoursesSection from "./components/OurCoursesSection";
import { trackLandingPageView, trackSectionViewed } from '@/lib/posthog-events';

export default function Home() {
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Track page view with UTM parameters from the URL
        const params = new URLSearchParams(window.location.search);
        const utmParams: Record<string, string> = {};
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach(key => {
            const val = params.get(key);
            if (val) utmParams[key] = val;
        });
        trackLandingPageView(utmParams);

        // Observe each section for scroll-into-view tracking
        const sections = mainRef.current?.querySelectorAll('section[id]');
        const seen = new Set<string>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const id = entry.target.id;
                    if (entry.isIntersecting && !seen.has(id)) {
                        seen.add(id);
                        trackSectionViewed(id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections?.forEach(section => observer.observe(section));
        return () => observer.disconnect();
    }, []);
    return (
        <main ref={mainRef} className="min-h-screen bg-white relative">
            <StickyNavbar />

            <section id="home">
                <HeroSection />
            </section>

            <section id="problem">
                <ProblemSection />
            </section>

            <section id="solution">
                <SolutionSection />
            </section>

            <section id="reviews">
                <TransformationSection />
            </section>

            <section id="market-demand">
                <MarketDemandSection />
            </section>

            <section id="programs">
                <ProgramDetailsSection />
            </section>

            <section id="courses">
                <OurCoursesSection />
            </section>

            <section id="faq">
                <FAQSection />
            </section>

            <CTASection />
        </main>
    );
}
