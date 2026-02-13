import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import TransformationSection from "./components/TransformationSection";
import ProgramDetailsSection from "./components/ProgramDetailsSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import StickyNavbar from "./components/StickyNavbar";

export default function Home() {
    return (
        <main className="min-h-screen bg-white relative">
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

            <section id="programs">
                <ProgramDetailsSection />
            </section>

            <section id="faq">
                <FAQSection />
            </section>

            <CTASection />
        </main>
    );
}
