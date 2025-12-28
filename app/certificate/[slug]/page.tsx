import CertificateHeader from "@/components/single-certificate/header/header";
import CertificateSummary from "@/components/single-certificate/summary/summary";
import FeaturesGrid from "@/components/global/features-grid/features-grid";
import TrainingSection from "@/components/global/training-section/training-section";
import LearningFramework from "@/components/global/learning-framework/learning-framework";
import TargetAudience from "@/components/global/target-audience/target-audience";
import Accreditations from "@/components/global/accreditations/accreditations";
import CTASection from "@/components/global/cta-section/cta-section";
import ExamDetails from "@/components/global/exam-details/exam-details";
import {
    getCertificateBySlug,
    getAdmissionProcess,
    HeroSection,
    CertificateSummarySection,
    FeaturesGridSection,
    TrainingSectionData,
    LearningFrameworkSection,
    TargetAudienceSection,
    AccreditationsSection,
    CTASection as CTASectionType,
    ExamDetailsSection
} from "@/lib/strapi";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function CertificatePage({ params }: PageProps) {
    const { slug } = await params;

    // Fetch certificate and admission process in parallel
    const [certificate, admissionProcess] = await Promise.all([
        getCertificateBySlug(slug),
        getAdmissionProcess()
    ]);

    if (!certificate) {
        notFound();
    }

    // Extract pageContent components
    const heroSection = certificate.pageContent?.find(
        (item): item is HeroSection => item.__component === 'single-certificate-section.hero-section'
    );

    const summarySection = certificate.pageContent?.find(
        (item): item is CertificateSummarySection => item.__component === 'single-certificate-section.certificate-summary'
    );

    const featuresGridSection = certificate.pageContent?.find(
        (item): item is FeaturesGridSection => item.__component === 'global.features-grid'
    );

    const trainingSection = certificate.pageContent?.find(
        (item): item is TrainingSectionData => item.__component === 'global.training-section'
    );

    const learningFrameworkSection = certificate.pageContent?.find(
        (item): item is LearningFrameworkSection => item.__component === 'global.learning-framework'
    );

    const targetAudienceSection = certificate.pageContent?.find(
        (item): item is TargetAudienceSection => item.__component === 'global.target-audience'
    );

    const accreditationsSection = certificate.pageContent?.find(
        (item): item is AccreditationsSection => item.__component === 'global.accreditations-section'
    );

    const ctaSection = certificate.pageContent?.find(
        (item): item is CTASectionType => item.__component === 'global.cta-section'
    );

    const examDetailsSection = certificate.pageContent?.find(
        (item): item is ExamDetailsSection => item.__component === 'global.exam-details'
    );

    return (
        <div>
            <CertificateHeader
                title={heroSection?.Title || certificate.Title}
                subtitle={heroSection?.Subtitle || certificate.Subtitle}
                backgroundImage={heroSection?.BackgroundImage?.url}
            />
            <CertificateSummary
                heading={summarySection?.Heading}
                description={summarySection?.Description}
                features={summarySection?.Features}
                videoLink={summarySection?.CertificateVideo?.VideoLink}
            />
            <FeaturesGrid
                title={featuresGridSection?.Title}
                features={featuresGridSection?.Features}
            />
            <TrainingSection
                badgeText={trainingSection?.BadgeText}
                title={trainingSection?.Title}
                highlightedText={trainingSection?.HighlightedText}
                subtitle={trainingSection?.Subtitle}
                pricing={trainingSection?.pricing}
                batchScheduleTitle={trainingSection?.BatchScheduleTitle}
                academyHours={trainingSection?.AcademyHours}
                batchItems={trainingSection?.BatchItem}
                pricingFeatures={trainingSection?.PricingFeatures}
                admissionProcess={admissionProcess || undefined}
            />
            <LearningFramework
                title={learningFrameworkSection?.Title}
                steps={learningFrameworkSection?.Steps}
            />
            <ExamDetails
                title={examDetailsSection?.Title}
                examCards={examDetailsSection?.ExamCards}
            />
            <TargetAudience
                title={targetAudienceSection?.Title}
                audiences={targetAudienceSection?.Audiences}
            />
            <Accreditations
                title={accreditationsSection?.Title}
                accreditations={accreditationsSection?.Accreditations}
            />
            <CTASection
                title={ctaSection?.Title}
                subtitle={ctaSection?.Subtitle}
                buttonText={ctaSection?.ButtonText}
                buttonLink={ctaSection?.ButtonLink}
            />
        </div>
    );
}
