import { Metadata } from 'next';
import programsSeo from '@/data/seo/programs-seo.json';

// Type for SEO entries
type SeoEntry = { title: string; description: string; keywords: string };
const seoData: Record<string, SeoEntry> = programsSeo;

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
                canonical: `/programs/${slug}`,
            },
        };
    }

    return {
        alternates: {
            canonical: `/programs/${slug}`,
        },
    };
}

export default function ProgramLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
