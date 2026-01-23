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

    return (
        <section className="section section-gray border-bottom" id="whats-new">
            <div className="container">
                {title && (
                    <div className="section-header">
                        <h2>{title}</h2>
                        <div className="red-underline-center"></div>
                    </div>
                )}
                <div className="features-grid-ec">
                    {features.map((feature) => (
                        <div key={feature.id} className="feature-item-ec">
                            {feature.svgIcon && (
                                <div
                                    className="feature-icon-ec"
                                    dangerouslySetInnerHTML={{ __html: feature.svgIcon }}
                                />
                            )}
                            <h3>{feature.Title}</h3>
                            <p>{feature.Description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
