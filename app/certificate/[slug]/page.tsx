import CertificateHeader from "@/components/single-certificate/header/header";
import CertificateSummary from "@/components/single-certificate/summary/summary";
import FeaturesGrid from "@/components/global/features-grid/features-grid";
import TrainingSection from "@/components/global/training-section/training-section";
import LearningFramework from "@/components/global/learning-framework/learning-framework";
import TargetAudience from "@/components/global/target-audience/target-audience";
import Accreditations from "@/components/global/accreditations/accreditations";
import CTASection from "@/components/global/cta-section/cta-section";
import ExamDetails from "@/components/global/exam-details/exam-details";
import StickySectionNav from "@/components/global/sticky-section-nav/sticky-section-nav";
import RelatedCertificates from "@/components/global/related-certificates/related-certificates";
import CertificateLabsWrapper from "@/components/global/certificate-labs/CertificateLabsWrapper";
import CertificateInquirySection from "@/components/global/certificate-inquiry/certificate-inquiry";
import JobRolesSection from "@/components/single-certificate/job-roles-section/job-roles-section";
import PlacementSection from "@/components/home/placement-section";
import CourseOutlineSection from "@/components/single-certificate/course-outline-section/course-outline-section";
import FAQSection from "@/components/single-certificate/faq-section/faq-section";
import { WhyEhackSection } from "@/components/single-certificate/why-ehack-section/why-ehack-section";
import SkillsMatterSection from "@/components/global/skills-matter/skills-matter";
import CareerROI from "@/components/global/career-roi/career-roi";
import {
    getCertificateBySlug,
    getAdmissionProcess,
    getRelatedCertificates,
    HeroSection,
    CertificateSummarySection,
    FeaturesGridSection,
    TrainingSectionData,
    LearningFrameworkSection,
    TargetAudienceSection,
    AccreditationsSection,
    CTASection as CTASectionType,
    ExamDetailsSection,
    CareerStatsSection as CareerStatsSectionType,
    JobRolesSection as JobRolesSectionType,
    CourseOutlineSection as CourseOutlineSectionType,
    FAQSection as FAQSectionType,
    getStrapiMediaUrl
} from "@/lib/strapi";
import { notFound } from "next/navigation";
import CareerStatsSection from "@/components/single-certificate/career-stats-section/career-stats-section";


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

    // Extract category IDs and partner ID for related certificates
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const certWithRelations = certificate as any;
    const categoryIds = certWithRelations.certification_categories?.map((cat: { id: number }) => cat.id) || [];
    const partnerId = certWithRelations.certification_partner?.id;

    // Fetch related certificates
    const relatedCertificates = await getRelatedCertificates(slug, categoryIds, partnerId, 4);

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

    const careerStatsSection = certificate.pageContent?.find(
        (item): item is CareerStatsSectionType => item.__component === 'global.career-stats-section'
    );

    const jobRolesSection = certificate.pageContent?.find(
        (item): item is JobRolesSectionType => item.__component === 'global.job-roles-section'
    );

    const courseOutlineSection = certificate.pageContent?.find(
        (item): item is CourseOutlineSectionType => item.__component === 'global.course-outline-section'
    );

    let faqSection = certificate.pageContent?.find(
        (item): item is FAQSectionType => item.__component === 'global.faq-section'
    );



    // Build dynamic navigation sections based on available content
    const dynamicNavSections = [];

    // 1. Overview
    if (summarySection?.Heading || summarySection?.Description || (summarySection?.Features && summarySection.Features.length > 0)) {
        dynamicNavSections.push({ id: 'summary', label: 'Overview' });
    }

    // 2. What's New
    if (featuresGridSection?.Features && featuresGridSection.Features.length > 0) {
        dynamicNavSections.push({ id: 'whats-new', label: "What's New" });
    }

    // 3. Who Should Enroll
    if (targetAudienceSection?.Audiences && targetAudienceSection.Audiences.length > 0) {
        dynamicNavSections.push({ id: 'target-audience', label: 'Who Should Enroll' });
    }

    // 4. Hands-On Labs
    dynamicNavSections.push({ id: 'labs', label: 'Hands-On Labs' });

    // 5. Course Outline
    if (courseOutlineSection?.Modules && courseOutlineSection.Modules.length > 0) {
        dynamicNavSections.push({ id: 'course-outline', label: 'Course Outline' });
    }

    // 6. Pricing (Training)
    if (trainingSection?.Title || trainingSection?.pricing) {
        dynamicNavSections.push({ id: 'ehack-training', label: 'Pricing' });
    }

    // 7. Placements
    dynamicNavSections.push({ id: 'placements', label: 'Placements' });

    // 8. Exam Details
    if (examDetailsSection?.ExamCards && examDetailsSection.ExamCards.length > 0) {
        dynamicNavSections.push({ id: 'exam-details', label: 'Exam Details' });
    }

    // 9. Career ROI
    dynamicNavSections.push({ id: 'career-roi', label: 'Career ROI' });

    // 10. Career Value
    if (careerStatsSection?.Stats && careerStatsSection.Stats.length > 0) {
        dynamicNavSections.push({ id: 'career-value', label: 'Career Value' });
    }

    // 11. Job Roles
    if (jobRolesSection?.JobRoles && jobRolesSection.JobRoles.length > 0) {
        dynamicNavSections.push({ id: 'job-roles', label: 'Job Roles' });
    }

    // 12. FAQs
    if (faqSection?.FAQs && faqSection.FAQs.length > 0) {
        dynamicNavSections.push({ id: 'faqs', label: 'FAQs' });
    }

    // 13. Why eHack
    dynamicNavSections.push({ id: 'why-ehack', label: 'Why eHack' });

    // 14. CTA (Enquire Now)
    dynamicNavSections.push({ id: 'cta', label: 'Enquire Now' });

    // 15. Accreditations
    if (accreditationsSection?.Accreditations && accreditationsSection.Accreditations.length > 0) {
        dynamicNavSections.push({ id: 'accreditations', label: 'Accreditations' });
    }

    // 16. Explore More
    dynamicNavSections.push({ id: 'related-certificates', label: 'Explore More' });

    // 17. News
    dynamicNavSections.push({ id: 'news', label: 'News' });

    return (
        <div>
            {/* Sticky Section Navigation - Only shows sections that exist */}
            {dynamicNavSections.length > 1 && (
                <StickySectionNav
                    sections={dynamicNavSections}
                    scrollThreshold={350}
                />
            )}

            <CertificateHeader
                title={heroSection?.Title || certificate.Title}
                subtitle={heroSection?.Subtitle || certificate.Subtitle}
                backgroundImage={heroSection?.BackgroundImage?.url}
            />

            {/* 1. Overview */}
            <CertificateSummary
                heading={summarySection?.Heading}
                description={summarySection?.Description}
                features={summarySection?.Features}
                videoLink={summarySection?.CertificateVideo?.VideoLink}
                certificateTitle={certificate.Title}
                certificateSlug={slug}
            />

            {/* 2. What's New */}
            <FeaturesGrid
                title={featuresGridSection?.Title}
                features={featuresGridSection?.Features}
            />

            {/* 3. Who Should Enroll */}
            <TargetAudience
                title={targetAudienceSection?.Title}
                audiences={targetAudienceSection?.Audiences}
            />

            {/* 4. Hands-On Labs */}
            <CertificateLabsWrapper
                certificateSlug={slug}
                certificateTitle={certificate.Title}
            />

            {/* 5. Course Outline */}
            {courseOutlineSection && <CourseOutlineSection section={courseOutlineSection} brochureUrl={certificate.brochure?.url ? getStrapiMediaUrl(certificate.brochure.url) : undefined} />}

            {/* 6. Pricing (Training) */}
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

            {/* 7. Placements */}
            <PlacementSection />

            {/* Learning Framework - Kept in DOM but not in Nav as per request order? Or omitted? 
                User didn't list it. I will keep it hidden/removed to strictly follow the list. 
                Wait, if I remove it, I lose content. 
                I'll place it after Placements but before Exam Details, as it fits the flow, 
                BUT since it's not in the user's list, I am risking removing it.
                User said "above i have mentioned the sequence wise section".
                I'll place it here but NOT add to nav.
            */}
            <LearningFramework
                title={learningFrameworkSection?.Title}
                steps={learningFrameworkSection?.Steps}
            />

            {/* 8. Exam Details */}
            <ExamDetails
                title={examDetailsSection?.Title}
                examCards={examDetailsSection?.ExamCards}
            />

            {/* 9. Career ROI */}
            <CareerROI certificateSlug={slug} />

            {/* 10. Career Value */}
            {careerStatsSection && <CareerStatsSection section={careerStatsSection} />}

            {/* 11. Job Roles */}
            {jobRolesSection && <JobRolesSection section={jobRolesSection} />}

            {/* 12. FAQs */}
            {faqSection && <FAQSection section={faqSection} />}

            {/* 13. Why eHack */}
            <WhyEhackSection programType="cybersecurity" />

            {/* 14. CTA */}
            <CTASection
                title={ctaSection?.Title}
                subtitle={ctaSection?.Subtitle}
            />

            {/* 15. Accreditations */}
            <Accreditations
                title={accreditationsSection?.Title}
                accreditations={accreditationsSection?.Accreditations}
            />

            {/* 16. Explore More */}
            <RelatedCertificates
                title="Explore More Certifications"
                subtitle="Discover other certifications that can help advance your career"
                certificates={relatedCertificates}
            />

            {/* 17. News */}
            <SkillsMatterSection />
        </div>
    );
}