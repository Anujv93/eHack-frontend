import { MetadataRoute } from 'next'
import { programs, programCategories } from '@/data/programs'
import { services } from '@/data/services'
import { getCoursesForListing } from '@/lib/strapi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://ehackacademy.org'
    const currentDate = new Date().toISOString()

    // Fetch courses from Strapi
    const coursesData = await getCoursesForListing()

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/admission`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/careers`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/codered`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/courses`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/csr`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/franchise`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/inquiry`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/learning-options`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]

    // Kennedy University pages
    const kennedyPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/kennedy-university`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/kennedy-university/bscs`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/kennedy-university/integrated-bscs-mscs`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/kennedy-university/mscs`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]

    // Offers pages
    const offerPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/offers/laptop-offer`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]

    // Dynamic category pages
    const categoryPages: MetadataRoute.Sitemap = programCategories.map((category) => ({
        url: `${baseUrl}/categories/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // Dynamic program pages
    const programPages: MetadataRoute.Sitemap = programs.map((program) => ({
        url: `${baseUrl}/programs/${program.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    }))

    // Dynamic service pages
    const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
        url: `${baseUrl}/services/${service.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // Dynamic course/certificate pages from Strapi
    const coursePages: MetadataRoute.Sitemap = coursesData.map((course) => ({
        url: `${baseUrl}/certificate/${course.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // Combine all pages
    return [
        ...staticPages,
        ...kennedyPages,
        ...offerPages,
        ...categoryPages,
        ...programPages,
        ...servicePages,
        ...coursePages,
    ]
}
