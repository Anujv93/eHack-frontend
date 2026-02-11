import React from "react";
import "./certificate.css";
import InquiryForm from "@/components/global/inquiry-form/inquiry-form";
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

    // Helper to get embed URL
    const getEmbedUrl = (url: string): string => {
        // Handle youtube.com/watch?v=VIDEO_ID
        const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
        if (watchMatch) {
            return `https://www.youtube.com/embed/${watchMatch[1]}`;
        }

        // Handle youtu.be/VIDEO_ID
        const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (shortMatch) {
            return `https://www.youtube.com/embed/${shortMatch[1]}`;
        }

        // Already an embed URL or other video URL
        return url;
    };

    return (
        <div className="certificate-page">
            {/* Sticky Section Navigation - Only shows sections that exist */}
            {dynamicNavSections.length > 1 && (
                <StickySectionNav
                    sections={dynamicNavSections}
                    scrollThreshold={350}
                />
            )}

            {/* Hero Section Replaced CertificateHeader */}
            <section className="hero-section" id="overview">
                <div className="hero-background">
                    <div className="hero-overlay"></div>
                    <div
                        className="hero-image"
                        style={{
                            backgroundImage: `url('${(heroSection?.BackgroundImage?.url ? getStrapiMediaUrl(heroSection.BackgroundImage.url) : "")}')`
                        }}
                    />
                </div>
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            {(() => {
                                const title = heroSection?.Title || certificate.Title || '';

                                // Helper to process **highlighted** text or <span>highlighted</span> text
                                const processText = (text: string) => {
                                    if (!text) return null;
                                    const parts = text.split(/(\*\*.*?\*\*|<span>.*?<\/span>)/g);
                                    let hasManualHighlight = false;

                                    const processed = parts.map((part, i) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            hasManualHighlight = true;
                                            return <span key={i} className="text-accent">{part.slice(2, -2)}</span>;
                                        }
                                        if (part.startsWith('<span>') && part.endsWith('</span>')) {
                                            hasManualHighlight = true;
                                            return <span key={i} className="text-accent">{part.slice(6, -7)}</span>;
                                        }
                                        return part;
                                    });

                                    return { processed, hasManualHighlight };
                                };

                                const result = processText(title);
                                let finalContent = result?.processed;

                                // Specialized rendering with AI superscripts and highlighting
                                if (title.includes('Ethical Hacking')) {
                                    return (
                                        <>
                                            {processText(title.split('Ethical Hacking')[0])?.processed}
                                            <span className="text-accent">Ethical Hacking & Cyber Security<sup style={{ fontSize: '0.3em', color: '#FFFFFF', top: '-1.2em', marginLeft: '2px' }}>AI</sup></span>
                                            {processText(title.split('Ethical Hacking')[1] || '')?.processed}
                                        </>
                                    );
                                } else if (title.includes('Digital Marketing')) {
                                    return (
                                        <>
                                            {processText(title.split('Digital Marketing')[0])?.processed}
                                            <span className="text-accent">Digital Marketing<sup style={{ fontSize: '0.3em', color: '#FFFFFF', top: '-1.2em', marginLeft: '2px' }}>AI</sup></span>
                                            {processText(title.split('Digital Marketing')[1] || '')?.processed}
                                        </>
                                    );
                                } else if (title.includes('Internship')) {
                                    return (
                                        <>
                                            {processText(title.split('Internship')[0])?.processed}
                                            <span className="text-accent">Internship Program<sup style={{ fontSize: '0.3em', color: '#FFFFFF', top: '-1.2em', marginLeft: '2px' }}>AI</sup></span>
                                            {processText(title.split('Internship')[1] || '')?.processed}
                                        </>
                                    );
                                } else if (title.includes('Data Science')) {
                                    return (
                                        <>
                                            <span className="text-accent">Data Science & Data Analytics</span> Powered by AI
                                        </>
                                    );
                                } else if (title.includes('Robotics')) {
                                    return (
                                        <>
                                            <span className="text-accent">Robotics for Every One</span> - Build Your First Robot with AI
                                        </>
                                    );
                                } else if (title.includes('Personality')) {
                                    return (
                                        <>
                                            <span className="text-accent">Personality & Soft Skill Development</span> Program
                                        </>
                                    );
                                }

                                // Fallback: If no manual highlight or specialized keyword, highlight the first word
                                if (!result?.hasManualHighlight && title) {
                                    const words = title.split(' ');
                                    if (words.length > 0) {
                                        return (
                                            <>
                                                <span className="text-accent">{words[0]}</span> {words.slice(1).join(' ')}
                                            </>
                                        );
                                    }
                                }

                                return <>{finalContent}</>;
                            })()}
                        </h1>

                        {/* Use Summary Section Heading/Description as requested */}
                        {summarySection?.Heading && (
                            <div>
                                <span className="hero-capsule-badge">
                                    {summarySection.Heading}
                                </span>
                            </div>
                        )}

                        <p className="hero-description">
                            {summarySection?.Description || heroSection?.Subtitle || certificate.Subtitle}
                        </p>

                        {/* Features from Summary Section as Tick Boxes */}
                        {summarySection?.Features && summarySection.Features.length > 0 && (
                            <ul className="hero-features-list">
                                {summarySection.Features.map((f, idx) => (
                                    <li key={idx} className="hero-feature-item">
                                        <span className="check-icon">✓</span>
                                        <span>{f.FeatureName}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Batch Info - Optional, if available in data. Currently mocked or omitted if not found. */}
                        {/* <div className="batch-info">
                            <span className="batch-label">NEXT BATCH STARTS</span>
                            <span className="batch-date">Coming Soon</span>
                        </div> */}
                    </div>

                    <InquiryForm
                        courseName={certificate.Title}
                        courseCode={slug}
                        variant="hero"
                        title="Get Course Information"
                        subtitle="Our counselor will call you within 2 hours"
                    />
                </div>
            </section>





            {/* 2. STATS BAR - Quick Credibility */}
            <section className="stats-bar">
                <div className="cert-stats-container">
                    <div className="cert-stat-item">
                        <span className="cert-stat-label">START DATE</span>
                        <div className="cert-stat-value"><strong>5th</strong> of Every Month</div>
                    </div>
                    <div className="cert-stat-item">
                        <span className="cert-stat-label">DURATION</span>
                        <div className="cert-stat-value"><strong>7-9</strong> Months</div>
                    </div>
                    <div className="cert-stat-item">
                        <span className="cert-stat-label">MODE</span>
                        <div className="cert-stat-value"><strong>Classroom</strong> + Live Online</div>
                    </div>
                    <div className="cert-stat-item">
                        <span className="cert-stat-label">TOTAL HOURS</span>
                        <div className="cert-stat-value"><strong>40+</strong>  Hours</div>
                    </div>
                    <div className="cert-stat-item">
                        <span className="cert-stat-label">MEMBERSHIP</span>
                        <div className="cert-stat-value"><strong>6 Months</strong> </div>
                    </div>
                </div>
            </section>

            {/* 2b. SCHEDULE BAR */}
            <section className="schedule-bar">
                <div className="banner-container">
                    <span className="schedule-badge">Schedule Options</span>
                    <span className="cert-text">Weekday (Tue-Fri): 2 hrs/day | Weekend (Sat-Sun): 4 hrs/day</span>
                </div>
            </section>

            {/* 2. What's New */}
            {/* <FeaturesGrid
                title={featuresGridSection?.Title}
                features={featuresGridSection?.Features}
            /> */}

            {/* 3. Who Should Enroll - Modern Design Replicated */}
            {targetAudienceSection && (
                <section className="audience-section-modern" id="target-audience" style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid #ff6b00' }}>
                    <div className="container">
                        <div className="audience-header-modern">
                            <span className="audience-eyebrow">BUILT FOR EVERYONE</span>
                            <h2 className="audience-title-modern">
                                {(() => {
                                    const title = targetAudienceSection.Title || "Who Should Enroll";
                                    const words = title.split(' ');
                                    const firstWord = words[0];
                                    const rest = words.slice(1).join(' ');
                                    return (
                                        <>
                                            <span className="text-accent">{firstWord}</span> {rest}
                                        </>
                                    );
                                })()}
                            </h2>
                        </div>

                        {targetAudienceSection.Audiences && targetAudienceSection.Audiences.length > 0 && (
                            <div className="audience-grid-modern">
                                {targetAudienceSection.Audiences.map((audience, idx) => (
                                    <React.Fragment key={audience.id || idx}>
                                        <div className="audience-card-modern">
                                            <div className="audience-card-number">{String(idx + 1).padStart(2, '0')}</div>
                                            <div className="audience-card-content">
                                                <h3 className="audience-card-title-modern">{audience.Title}</h3>
                                                <p className="audience-card-desc-modern">{audience.Description}</p>
                                                {/* <span className="audience-tag-modern">Recommended</span> -- Data doesn't have tag, omitted for now */}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}

                        {/* Hardcoded Stats Row */}
                        <div className="audience-stats-row">
                            <div className="audience-stat-item">
                                <span className="stat-number">85%</span>
                                <span className="stat-text">of our students are fresh graduates or career changers</span>
                            </div>
                            <div className="audience-stat-divider"></div>
                            <div className="audience-stat-item">
                                <span className="stat-number">Zero</span>
                                <span className="stat-text">prior experience required to get started</span>
                            </div>
                            <div className="audience-stat-divider"></div>
                            <div className="audience-stat-item">
                                <span className="stat-number">₹6-8 LPA</span>
                                <span className="stat-text">average starting salary for freshers</span>
                            </div>
                        </div>

                        {/* Modern CTA */}
                        <div className="audience-cta-modern">
                            <div className="cta-content">
                                <h3>Not sure if this is right for you?</h3>
                                <p>Talk to our career counsellor for a personalized learning path recommendation.</p>
                            </div>
                            <a href="tel:+919886035330" className="btn-cta-modern">
                                Get Free Career Advice
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </a>
                        </div>
                    </div>
                </section>
            )}

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
            <CareerROI
                certificateSlug={slug}
            />

            {/* 10. Career Value */}
            {careerStatsSection && (
                <CareerStatsSection
                    section={careerStatsSection}
                    videoLink={summarySection?.CertificateVideo?.VideoLink}
                />
            )}

            {/* 11. Job Roles */}
            {jobRolesSection && <JobRolesSection section={jobRolesSection} />}

            {/* 12. FAQs */}
            {faqSection && <FAQSection section={faqSection} />}

            {/* 2. What's New */}
            <FeaturesGrid
                title={featuresGridSection?.Title}
                features={featuresGridSection?.Features}
            />

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