import { Metadata } from 'next';
import CoursesGrid from '@/components/courses/courses-grid/courses-grid';
import {
    getCoursesForListing,
    getCertificationPartners,
    getCertificationCategories,
    getStrapiMediaUrl
} from '@/lib/strapi';
import './page.css';

export const metadata: Metadata = {
    title: 'All Courses | eHack Academy',
    description: 'Explore our comprehensive catalog of cybersecurity certifications and training programs from leading partners like EC-Council, ISC2, and more.',
};

interface PageProps {
    searchParams: Promise<{ search?: string }>;
}

export default async function CoursesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const initialSearch = params.search || '';

    // Fetch all data in parallel
    const [coursesData, partnersData, categoriesData] = await Promise.all([
        getCoursesForListing(),
        getCertificationPartners(),
        getCertificationCategories()
    ]);

    // Transform courses for the grid (Strapi v5 uses snake_case)
    const courses = coursesData.map((course) => ({
        id: course.id,
        slug: course.slug,
        title: course.Title,
        shortDescription: course.ShortDescription,
        level: course.Level,
        duration: course.Duration,
        partnerSlug: course.certification_partner?.slug,
        partnerName: course.certification_partner?.Name,
        partnerLogo: course.certification_partner?.LogoUrl || undefined,
        categories: course.certification_categories?.map(cat => ({
            slug: cat.slug,
            name: cat.Name,
            colorCode: cat.ColorCode
        }))
    }));

    // Transform partners for the filter
    const partners = partnersData.map((partner) => ({
        id: partner.id,
        name: partner.Name,
        slug: partner.slug,
        logo: partner.Logo?.url ? getStrapiMediaUrl(partner.Logo.url) : undefined
    }));

    // Transform categories for the filter
    const categories = categoriesData.map((category) => ({
        id: category.id,
        name: category.Name,
        slug: category.slug,
        colorCode: category.ColorCode
    }));

    return (
        <main className="courses-page">
            <div className="page-header">
                <div className="container">
                    <h1>Our Courses</h1>
                    <p>Explore industry-leading certifications from world-class partners and transform your career</p>
                </div>
            </div>

            <section className="courses-content">
                <div className="container">
                    <CoursesGrid
                        courses={courses}
                        partners={partners}
                        categories={categories}
                        initialSearch={initialSearch}
                    />
                </div>
            </section>
        </main>
    );
}
