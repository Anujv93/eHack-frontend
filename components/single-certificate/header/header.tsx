import "./header.css"
import { getStrapiMediaUrl } from "@/lib/strapi";

interface CertificateHeaderProps {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
}

export default function CertificateHeader({
    title,
    subtitle,
    backgroundImage
}: CertificateHeaderProps) {
    // Don't render if no content from Strapi
    if (!title && !subtitle) {
        return null;
    }

    // Parse title to highlight text in parentheses
    const parseTitle = (titleText: string) => {
        const match = titleText.match(/^(.*?)(\([^)]+\))(.*)$/);
        if (match) {
            return (
                <>
                    {match[1]}
                    <span className="ai-highlight">{match[2]}</span>
                    {match[3]}
                </>
            );
        }
        return titleText;
    };

    const backgroundStyle = backgroundImage ? {
        backgroundImage: `url(${getStrapiMediaUrl(backgroundImage)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : undefined;

    return (
        <section className="hero-banner" style={{ borderBottom: 'solid 1px #ff6b00', ...backgroundStyle }}>
            <div className="hero-content-wrapper container">
                {title && (
                    <h1 className="hero-title-main">
                        {parseTitle(title)}
                    </h1>
                )}
                <div className="hero-underline"></div>
                {subtitle && <p className="hero-subtitle-main">{subtitle}</p>}
            </div>
        </section>
    )
}