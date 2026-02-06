const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// Helper to get fetch headers (with optional auth)
function getHeaders(): HeadersInit {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (STRAPI_TOKEN) {
        headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    return headers;
}

// Type definitions based on your Strapi structure
export interface HeroSection {
    __component: 'single-certificate-section.hero-section';
    Title: string;
    Subtitle: string;
    BackgroundImage?: {
        url: string;
    };
}

export interface Feature {
    id: number;
    FeatureName: string;
}

export interface CertificateSummarySection {
    __component: 'single-certificate-section.certificate-summary';
    Heading: string;
    Description: string;
    Features: Feature[];
    CertificateVideo?: {
        VideoLink: string;
    };
}

export interface FeaturesGridFeature {
    id: number;
    Title: string;
    Description: string;
    svgIcon?: string;
}

export interface FeaturesGridSection {
    __component: 'global.features-grid';
    Title: string;
    Features: FeaturesGridFeature[];
}

// Training Section Types
export interface PricingFeature {
    id: number;
    FeatureName: string;
    isBold?: boolean | null;
}

export interface BatchItem {
    id: number;
    BatchName: string;
    Days: string;
    Duration: string;
    Icon?: string;
}

export interface PricingCard {
    ProgramName: string;
    SubTitle: string;
    OriginalPrice: string;
    DiscountedPrice: string;
    Duration: string;
    ButtonText: string;
    ButtonLink: string;
    UrgencyText: string;
    OfferBadge: string;
}

// Flattened structure - BatchItem and PricingFeatures directly on training-section
export interface TrainingSectionData {
    __component: 'global.training-section';
    BadgeText: string;
    Title: string;
    HighlightedText: string;
    Subtitle: string;
    pricing: PricingCard;
    // Flattened fields
    BatchScheduleTitle: string;
    AcademyHours: string;
    BatchItem: BatchItem[];
    PricingFeatures: PricingFeature[];
}

// Learning Framework Section
export interface FrameworkStep {
    id: number;
    StepNumber: number;
    StepTitle: string;
    Description: string;
    LinkText?: string;
    LinkUrl?: string;
}

export interface LearningFrameworkSection {
    __component: 'global.learning-framework';
    Title: string;
    Steps: FrameworkStep[];
}

// Target Audience Section
export interface AudienceCard {
    id: number;
    Title: string;
    Description: string;
    IconSvg?: string;
}

export interface TargetAudienceSection {
    __component: 'global.target-audience';
    Title: string;
    Audiences: AudienceCard[];
}

// Accreditations Section
export interface Accreditation {
    id: number;
    Name: string;
    BadgeText: string;
    LogoUrl?: string; // Text field with full URL
}

export interface AccreditationsSection {
    __component: 'global.accreditations-section';
    Title: string;
    Accreditations: Accreditation[];
}

// CTA Section
export interface CTASection {
    __component: 'global.cta-section';
    Title: string;
    Subtitle?: string;
    ButtonText?: string;
    ButtonLink?: string;
}

// Admission Process (Single Type)
export interface AdmissionStep {
    id: number;
    stepNumber: string;
    Title: string;
    Description: string;
}

export interface AdmissionProcess {
    Title: string;
    ContactPhone: string;
    ContactEmail: string;
    Location: string;
    steps: AdmissionStep[];
}

// Exam Details Section
export interface ExamCard {
    id: number;
    BadgeText: string;
    BadgeType?: string;
    CardTitle: string;
    Description: string;
    Stat1Value: string;
    Stat1Label: string;
    Stat2Value: string;
    Stat2Label: string;
    Stat3Value: string;
    Stat3Label: string;
    Stat4Value: string;
    Stat4Label: string;
}

export interface ExamDetailsSection {
    __component: 'global.exam-details';
    Title: string;
    ExamCards: ExamCard[];
}

// Career Stats Section
export interface StatItem {
    id?: number;
    StatText: string;
    IconSvg?: string;
}

export interface CareerStatsSection {
    __component: 'global.career-stats-section';
    Title: string;
    Subtitle?: string;
    Description?: string;
    ButtonText?: string;
    ButtonLink?: string;
    Stats: StatItem[];
}

// Job Roles Section
export interface JobRoleItem {
    id?: number;
    RoleName: string;
}

export interface JobRolesSection {
    __component: 'global.job-roles-section';
    Title: string;
    Description?: string;
    IconSvg?: string;
    JobRoles: JobRoleItem[];
}

// Course Outline Section
export interface ModuleTopic {
    id?: number;
    TopicName: string;
}

export interface CourseModule {
    id?: number;
    ModuleNumber: string;
    ModuleTitle: string;
    Topics?: ModuleTopic[];
}

export interface CourseOutlineSection {
    __component: 'global.course-outline-section';
    Title: string;
    Modules: CourseModule[];
    CTAButtonText?: string;
    CTAButtonLink?: string;
}

// FAQ Section
export interface FAQItem {
    id?: number;
    Question: string;
    Answer: string;
    Category: string;
}

export interface FAQSection {
    __component: 'global.faq-section';
    Title: string;
    FAQs: FAQItem[];
}

export type PageContent = HeroSection | CertificateSummarySection | FeaturesGridSection | TrainingSectionData | LearningFrameworkSection | TargetAudienceSection | AccreditationsSection | CTASection | ExamDetailsSection | CareerStatsSection | JobRolesSection | CourseOutlineSection | FAQSection;

export interface Certificate {
    id: number;
    documentId: string;
    Title: string;
    Subtitle: string;
    slug: string;
    brochure?: {
        url: string;
        name: string;
    };
}

// Fetch a single certificate by slug
export async function getCertificateBySlug(slug: string): Promise<Certificate | null> {
    try {
        // Use specific fields for brochure to avoid "Invalid key related at brochure.related" error
        // when using wildcard population on media fields
        const url = `${STRAPI_URL}/api/certificates?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[pageContent][populate]=*&populate[brochure][fields][0]=url&populate[brochure][fields][1]=name`;
        console.log('Fetching from:', url);

        const res = await fetch(url, {
            headers: getHeaders(),
            next: { revalidate: 60 }
        });

        console.log('Response status:', res.status);

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Error response:', errorText);
            throw new Error(`Failed to fetch certificate: ${res.status}`);
        }

        const data = await res.json();
        const certificate = data.data?.[0];

        // Log exam details section
        const examDetailsSection = certificate?.pageContent?.find(
            (item: { __component: string }) => item.__component === 'global.exam-details'
        );
        if (examDetailsSection) {
            console.log('Exam Details Section:', JSON.stringify(examDetailsSection, null, 2));
        } else {
            console.log('No Exam Details Section found. Available components:',
                certificate?.pageContent?.map((item: { __component: string }) => item.__component)
            );
        }

        return certificate || null;
    } catch (error) {
        console.error('Error fetching certificate:', error);
        return null;
    }
}

// Fetch all certificates
export async function getCertificates(): Promise<Certificate[]> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/certificates?populate[pageContent][populate]=*`,
            {
                headers: getHeaders(),
                next: { revalidate: 60 }
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch certificates: ${res.status}`);
        }

        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching certificates:', error);
        return [];
    }
}

// Fetch Admission Process (Single Type)
export async function getAdmissionProcess(): Promise<AdmissionProcess | null> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/admission-process?populate=*`,
            {
                headers: getHeaders(),
                next: { revalidate: 60 }
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch admission process: ${res.status}`);
        }

        const data = await res.json();
        return data.data || null;
    } catch (error) {
        console.error('Error fetching admission process:', error);
        return null;
    }
}

// Helper to get Strapi media URL
export function getStrapiMediaUrl(url: string): string {
    if (url.startsWith('http') || url.startsWith('/images/')) return url;
    return `${STRAPI_URL}${url}`;
}

// ============================================
// Certification Partners
// ============================================
export interface CertificationPartner {
    id: number;
    documentId: string;
    Name: string;
    slug: string;
    Logo?: {
        url: string;
    };
    LogoUrl?: string; // Text field with full URL
    Description?: string;
    WebsiteUrl?: string;
    FeaturedOrder: number;
}

export async function getCertificationPartners(): Promise<CertificationPartner[]> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/certification-partners?populate=*&sort=FeaturedOrder:asc`,
            {
                headers: getHeaders(),
                next: { revalidate: 60 }
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch partners: ${res.status}`);
        }

        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching partners:', error);
        return [];
    }
}

// ============================================
// Certification Categories
// ============================================
export interface CertificationCategory {
    id: number;
    documentId: string;
    Name: string;
    slug: string;
    Description?: string;
    Icon?: {
        url: string;
    };
    ColorCode: string;
    DisplayOrder: number;
}

export async function getCertificationCategories(): Promise<CertificationCategory[]> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/certification-categories?populate=*&sort=DisplayOrder:asc`,
            {
                headers: getHeaders(),
                next: { revalidate: 60 }
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.status}`);
        }

        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// ============================================
// Courses List (simplified certificate for listing)
// ============================================
export interface CourseListItem {
    id: number;
    documentId: string;
    Title: string;
    slug: string;
    ShortDescription?: string;
    Level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    Duration?: string;
    FeaturedOrder: number;
    certification_partner?: {
        id: number;
        Name: string;
        slug: string;
        LogoUrl?: string;
    };
    certification_categories?: {
        id: number;
        Name: string;
        slug: string;
        ColorCode: string;
    }[];
}

export async function getCoursesForListing(): Promise<CourseListItem[]> {
    try {
        // Strapi v5 populate syntax - sort by FeaturedOrder in API
        const url = `${STRAPI_URL}/api/certificates?populate=*&sort=FeaturedOrder:asc`;
        console.log('Fetching courses from:', url);

        const res = await fetch(url, {
            headers: getHeaders(),
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Courses fetch error:', errorText);
            throw new Error(`Failed to fetch courses: ${res.status}`);
        }

        const data = await res.json();
        const courses: CourseListItem[] = data.data || [];

        // Debug: Log FeaturedOrder values
        console.log('Courses fetched:', courses.length);
        console.log('FeaturedOrder values:', courses.slice(0, 10).map(c => ({ title: c.Title, order: c.FeaturedOrder })));

        // Explicit client-side sort by FeaturedOrder (lower values first, then by title)
        // This ensures proper ordering even if Strapi API sort doesn't work as expected
        const sortedCourses = courses.sort((a, b) => {
            // Primary sort: by FeaturedOrder (lower values first)
            // Treat null/undefined/0 as high value to push them to the end
            const orderA = a.FeaturedOrder || 999;
            const orderB = b.FeaturedOrder || 999;

            if (orderA !== orderB) {
                return orderA - orderB;
            }

            // Secondary sort: alphabetically by title
            return a.Title.localeCompare(b.Title);
        });

        return sortedCourses;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

// ============================================
// Related Certificates
// ============================================
export async function getRelatedCertificates(
    currentSlug: string,
    categoryIds?: number[],
    partnerId?: number,
    limit: number = 4
): Promise<CourseListItem[]> {
    try {
        // Fetch all certificates with their relationships
        const url = `${STRAPI_URL}/api/certificates?populate=*&sort=FeaturedOrder:asc`;

        const res = await fetch(url, {
            headers: getHeaders(),
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch related certificates: ${res.status}`);
        }

        const data = await res.json();
        const allCertificates: CourseListItem[] = data.data || [];

        // Filter out current certificate and find related ones
        const relatedCertificates = allCertificates
            .filter((cert) => cert.slug !== currentSlug)
            .filter((cert) => {
                // Check if shares a category
                if (categoryIds && categoryIds.length > 0 && cert.certification_categories) {
                    const certCategoryIds = cert.certification_categories.map(cat => cat.id);
                    const hasMatchingCategory = categoryIds.some(id => certCategoryIds.includes(id));
                    if (hasMatchingCategory) return true;
                }

                // Check if shares the same partner
                if (partnerId && cert.certification_partner?.id === partnerId) {
                    return true;
                }

                return false;
            })
            .slice(0, limit);

        // If not enough related certificates found, fill with other top certificates
        if (relatedCertificates.length < limit) {
            const additionalCerts = allCertificates
                .filter((cert) =>
                    cert.slug !== currentSlug &&
                    !relatedCertificates.some(r => r.slug === cert.slug)
                )
                .slice(0, limit - relatedCertificates.length);

            relatedCertificates.push(...additionalCerts);
        }

        return relatedCertificates;
    } catch (error) {
        console.error('Error fetching related certificates:', error);
        return [];
    }
}
