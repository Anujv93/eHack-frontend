import "./features-grid.css";

export interface FeatureItem {
    id: number;
    Title: string;
    Description: string;
    svgIcon?: string;
}

export interface FeaturesGridProps {
    title?: string;
    features?: FeatureItem[];
}

export default function FeaturesGrid({ title, features }: FeaturesGridProps) {
    // Don't render if no features
    if (!features || features.length === 0) {
        return null;
    }

    // Helper to process **highlighted** text or <span>highlighted</span> text
    const processText = (text: string) => {
        if (!text) return text;

        // Pattern 1: **text**
        const boldPattern = /\*\*(.*?)\*\*/g;
        // Pattern 2: <span>text</span>
        const spanPattern = /<span>(.*?)<\/span>/g;

        let hasManualHighlight = false;
        let processedContent: (string | React.ReactNode)[] = [text];

        // Process bold pattern
        if (text.match(boldPattern)) {
            hasManualHighlight = true;
            processedContent = text.split(boldPattern).map((part, i) =>
                i % 2 === 1 ? <span key={`b-${i}`} className="text-orange">{part}</span> : part
            );
        }
        // Process span pattern (if bold wasn't used or in addition)
        else if (text.match(spanPattern)) {
            hasManualHighlight = true;
            processedContent = text.split(spanPattern).map((part, i) =>
                i % 2 === 1 ? <span key={`s-${i}`} className="text-orange">{part}</span> : part
            );
        }

        // Fallback: Highlight first word if no manual tags found
        if (!hasManualHighlight) {
            const words = text.split(' ');
            if (words.length > 0) {
                return (
                    <>
                        <span className="text-orange">{words[0]}</span> {words.slice(1).join(' ')}
                    </>
                );
            }
        }

        return <>{processedContent}</>;
    };

    return (
        <section className="section section-gray border-bottom border-#ff6b00" id="whats-new">
            <div className="container">
                {title && (
                    <div className="section-header">
                        <h2>{processText(title)}</h2>
                        <div className="red-underline-center"></div>
                    </div>
                )}
                <div className="features-grid-ec">
                    {features.map((feature) => (
                        <div key={feature.id} className="feature-item-ec">
                            {/* {feature.svgIcon && (
                                <div
                                    className="feature-icon-ec"
                                    dangerouslySetInnerHTML={{ __html: feature.svgIcon }}
                                />
                            )} */}
                            <h3>{processText(feature.Title)}</h3>
                            <p>{feature.Description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
