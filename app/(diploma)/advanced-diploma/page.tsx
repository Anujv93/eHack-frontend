import React from 'react';
import LandingBanner from '../components/LandingBanner';
import WhoIsThisFor from '../components/WhoIsThisFor';
import CybersecurityPrograms from '../components/CybersecurityPrograms';
import WhyCybersecurity from '../components/WhyCybersecurity';
import CourseCurriculum from '../components/CourseCurriculum';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import StickyNavbar from '../components/StickyNavbar';
import CareerOpportunities from '../components/CareerOpportunities';
import EssentialSkills from '../components/EssentialSkills';
import ProgramAdvisor from '../components/ProgramAdvisor';

export const metadata = {
    title: 'Advanced Diploma in Cybersecurity | eHack Academy',
    description: 'Equip yourself with skills to protect IT infrastructure, secure data, and achieve compliance with our AI-powered Advanced Diploma in Cybersecurity.',
};

export default function AdvancedDiplomaLandingPage() {
    return (
        <main className="min-h-screen bg-white relative">
            <StickyNavbar />
            
            <section id="home">
                <LandingBanner />
            </section>

            <section id="who">
                <WhoIsThisFor />
            </section>


            <section id="curriculum">
                <CourseCurriculum />
            </section>

            <section id="testimonials">
                <Testimonials />
            </section>

            <section id="pricing">
                <Pricing />
            </section>

            <section id="career-opportunities">
                <CareerOpportunities />
            </section>

            <section id="essential-skills">
                <EssentialSkills />
            </section>

            <section id="programs">
                <CybersecurityPrograms />
            </section>

            <section id="why">
                <WhyCybersecurity />
            </section>

            <section id="advisor">
                <ProgramAdvisor />
            </section>

            <section id="faq">
                <FAQ />
            </section>

            <section id="apply">
                <FinalCTA />
            </section>

            {/* Other sections like Curriculum, ROI, Pricing, etc., can be added below */}
        </main>
    );
}
