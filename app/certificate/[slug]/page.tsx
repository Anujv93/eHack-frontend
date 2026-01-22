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
import CourseOutlineSection from "@/components/single-certificate/course-outline-section/course-outline-section";
import FAQSection from "@/components/single-certificate/faq-section/faq-section";
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
    FAQSection as FAQSectionType
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

    // Check each section and add to navigation if it has content
    if (summarySection?.Heading || summarySection?.Description || (summarySection?.Features && summarySection.Features.length > 0)) {
        dynamicNavSections.push({ id: 'summary', label: 'Overview' });
    }

    if (featuresGridSection?.Features && featuresGridSection.Features.length > 0) {
        dynamicNavSections.push({ id: 'whats-new', label: "What's New" });
    }

    if (trainingSection?.Title || trainingSection?.pricing) {
        dynamicNavSections.push({ id: 'ehack-training', label: 'Training' });
    }

    if (learningFrameworkSection?.Steps && learningFrameworkSection.Steps.length > 0) {
        dynamicNavSections.push({ id: 'learning-framework', label: 'Learning Path' });
    }

    if (examDetailsSection?.ExamCards && examDetailsSection.ExamCards.length > 0) {
        dynamicNavSections.push({ id: 'exam-details', label: 'Exam Details' });
    }

    // Always add Labs section for cybersecurity certifications
    dynamicNavSections.push({ id: 'labs', label: 'Hands-On Labs' });

    if (targetAudienceSection?.Audiences && targetAudienceSection.Audiences.length > 0) {
        dynamicNavSections.push({ id: 'target-audience', label: 'Who Should Enroll' });
    }

    if (accreditationsSection?.Accreditations && accreditationsSection.Accreditations.length > 0) {
        dynamicNavSections.push({ id: 'accreditations', label: 'Accreditations' });
    }

    // Add new sections to navigation
    if (careerStatsSection?.Stats && careerStatsSection.Stats.length > 0) {
        dynamicNavSections.push({ id: 'career-value', label: 'Career Value' });
    }

    if (jobRolesSection?.JobRoles && jobRolesSection.JobRoles.length > 0) {
        dynamicNavSections.push({ id: 'job-roles', label: 'Job Roles' });
    }

    if (courseOutlineSection?.Modules && courseOutlineSection.Modules.length > 0) {
        dynamicNavSections.push({ id: 'course-outline', label: 'Course Outline' });
    }

    if (faqSection?.FAQs && faqSection.FAQs.length > 0) {
        dynamicNavSections.push({ id: 'faqs', label: 'FAQs' });
    }

    // Always add Inquiry section
    dynamicNavSections.push({ id: 'inquiry', label: 'Enquire Now' });

    // Add new sections to navigation
    if (careerStatsSection?.Stats && careerStatsSection.Stats.length > 0) {
        dynamicNavSections.push({ id: 'career-value', label: 'Career Value' });
    }

    if (jobRolesSection?.JobRoles && jobRolesSection.JobRoles.length > 0) {
        dynamicNavSections.push({ id: 'job-roles', label: 'Job Roles' });
    }

    if (courseOutlineSection?.Modules && courseOutlineSection.Modules.length > 0) {
        dynamicNavSections.push({ id: 'course-outline', label: 'Course Outline' });
    }

    if (faqSection?.FAQs && faqSection.FAQs.length > 0) {
        dynamicNavSections.push({ id: 'faqs', label: 'FAQs' });
    }


    // Always add Inquiry section
    dynamicNavSections.push({ id: 'inquiry', label: 'Enquire Now' });

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
            <CertificateSummary
                heading={summarySection?.Heading}
                description={summarySection?.Description}
                features={summarySection?.Features}
                videoLink={summarySection?.CertificateVideo?.VideoLink}
                certificateTitle={certificate.Title}
                certificateSlug={slug}
            />
            <FeaturesGrid
                title={featuresGridSection?.Title}
                features={featuresGridSection?.Features}
            />

            <TargetAudience
                title={targetAudienceSection?.Title}
                audiences={targetAudienceSection?.Audiences}
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

            {/* Hands-On Labs Section */}
            <CertificateLabsWrapper
                certificateSlug={slug}
                certificateTitle={certificate.Title}
            />



            {/* Career Stats Section */}
            {careerStatsSection && <CareerStatsSection section={careerStatsSection} />}

            {/* Job Roles Section */}
            {jobRolesSection && <JobRolesSection section={jobRolesSection} />}

            {/* Course Outline Section */}
            {courseOutlineSection && <CourseOutlineSection section={courseOutlineSection} />}

            {/* FAQ Section */}
            {faqSection && <FAQSection section={faqSection} />}

            {/* Inquiry Form Section */}
            <CertificateInquirySection
                certificateTitle={certificate.Title}
                certificateSlug={slug}
            />
            <CTASection
                title={ctaSection?.Title}
                subtitle={ctaSection?.Subtitle}
                buttonText={ctaSection?.ButtonText}
                buttonLink={ctaSection?.ButtonLink}
            />

            <Accreditations
                title={accreditationsSection?.Title}
                accreditations={accreditationsSection?.Accreditations}
            />

            {/* Related Certificates Section */}
            <RelatedCertificates
                title="Explore More Certifications"
                subtitle="Discover other certifications that can help advance your career"
                certificates={relatedCertificates}
            />
        </div>
    );
}


