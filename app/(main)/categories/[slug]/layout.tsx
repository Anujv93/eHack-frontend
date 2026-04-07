import { Metadata } from 'next';
import categoriesSeo from '@/data/seo/categories-seo.json';

// Type for SEO entries
type SeoEntry = { title: string; description: string; keywords: string };
const seoData: Record<string, SeoEntry> = categoriesSeo;

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { slug } = await params;
    const meta = seoData[slug];

    if (meta) {
        return {
            title: meta.title,
            description: meta.description,
            keywords: meta.keywords,
            alternates: {
                canonical: `/categories/${slug}`,
            },
        };
    }

    return {
        title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Programs`,
        alternates: {
            canonical: `/categories/${slug}`,
        },
    };
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
