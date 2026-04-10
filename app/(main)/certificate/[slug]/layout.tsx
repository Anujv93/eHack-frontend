import { Metadata } from 'next';
import certificatesSeo from '@/data/seo/certificates-seo.json';

// Type for SEO entries
type SeoEntry = { title: string; description: string; keywords: string };
const seoData: Record<string, SeoEntry> = certificatesSeo;

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
                canonical: `/certificate/${slug}`,
            },
        };
    }

    return {
        alternates: {
            canonical: `/certificate/${slug}`,
        },
    };
}

export default function CertificateLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
