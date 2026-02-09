import "./summary.css"
import { Feature } from "@/lib/strapi";
import SummaryInquiryForm from "./summary-form";

interface CertificateSummaryProps {
    heading?: string;
    description?: string;
    features?: Feature[];
    videoLink?: string;
    certificateTitle?: string;
    certificateSlug?: string;
}

export default function CertificateSummary({
    heading,
    description,
    features,
    videoLink,
    certificateTitle,
    certificateSlug
}: CertificateSummaryProps) {
    // Parse heading to highlight standalone "AI" text only (not "ai" within words like "Gain")
    const parseHeading = (text: string) => {
        const parts = text.split(/\b(AI)\b/g);
        return parts.map((part, index) =>
            part === 'AI'
                ? <span key={index} className="ai-text">{part}</span>
                : part
        );
    };

    // Convert YouTube URL to embed format
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

    // Don't render the section if there's no content from Strapi
    const hasContent = heading || description || (features && features.length > 0) || videoLink;

    if (!hasContent) {
        return null;
    }

    return (
        <section className="hero-main" id="summary">


            <div className="container relative z-10">
                <div className="hero-grid">
                    <div className="hero-left">
                        {heading && (
                            <div className="hero-header">
                                <h2>{parseHeading(heading)}</h2>
                                <div className="accent-line"></div>
                            </div>
                        )}

                        {description && <div className="hero-description"><p>{description}</p></div>}

                        {features && features.length > 0 && (
                            <div className="features-wrapper">
                                <ul className="hero-features-list">
                                    {features.map((feature) => (
                                        <li key={feature.id} className="feature-card">
                                            <span className="check-icon">✓</span>
                                            <span className="feature-text">{feature.FeatureName}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Video Section - only show if videoLink exists */}
                        {videoLink && (
                            <div className="video-wrapper">
                                <div className="video-container">
                                    <iframe
                                        src={getEmbedUrl(videoLink)}
                                        title="Certificate Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Inquiry Form */}
                    <div className="form-wrapper">
                        <SummaryInquiryForm
                            certificateTitle={certificateTitle}
                            certificateSlug={certificateSlug}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
