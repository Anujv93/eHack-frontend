import HomePage from '@/components/home/home-page';
import {
    getCertificationPartners,
    getCertificationCategories,
    getCoursesForListing,
    getStrapiMediaUrl
} from '@/lib/strapi';

export default async function Page() {
    // Fetch all data from Strapi
    const [partnersData, categoriesData, coursesData] = await Promise.all([
        getCertificationPartners(),
        getCertificationCategories(),
        getCoursesForListing()
    ]);

    // Transform courses first to count per partner
    const coursesTransformed = coursesData.map((course) => ({
        id: course.id,
        slug: course.slug,
        title: course.Title,
        level: course.Level,
        duration: course.Duration || undefined,
        partnerSlug: course.certification_partner?.slug,
        partnerName: course.certification_partner?.Name
    }));

    // Count courses per partner
    const courseCountByPartner: Record<string, number> = {};
    coursesTransformed.forEach(course => {
        if (course.partnerSlug) {
            courseCountByPartner[course.partnerSlug] = (courseCountByPartner[course.partnerSlug] || 0) + 1;
        }
    });

    // Transform partners with course count
    const partners = partnersData.map((partner) => ({
        id: partner.id,
        name: partner.Name,
        slug: partner.slug,
        logoUrl: partner.Logo?.url
            ? getStrapiMediaUrl(partner.Logo.url)
            : partner.LogoUrl || undefined,
        courseCount: courseCountByPartner[partner.slug] || 0
    })).sort((a, b) => {
        // Custom sort order: EC-Council first, Kennedy University second
        const order = ['ec-council', 'kennedy-university'];
        const indexA = order.indexOf(a.slug);
        const indexB = order.indexOf(b.slug);

        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        return a.name.localeCompare(b.name);
    });

    // Transform categories
    const categories = categoriesData.map((category) => ({
        id: String(category.id),
        name: category.Name,
        slug: category.slug,
        colorCode: category.ColorCode
    }));

    return (
        <HomePage
            partners={partners}
            courses={coursesTransformed}
            categories={categories}
        />
    );
}
