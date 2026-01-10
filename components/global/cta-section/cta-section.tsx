import "./cta-section.css";

export interface CTASectionProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
}

export default function CTASection({
    title,
    subtitle,
    buttonText = "Enroll Now →",
    buttonLink = "#inquiry"
}: CTASectionProps) {
    if (!title) return null;

    return (
        <section className="cta-section" id="cta">
            <div className="container">
                <h2>{title}</h2>
                {subtitle && <p>{subtitle}</p>}
                <a href={buttonLink} className="btn-white">{buttonText}</a>
            </div>
        </section>
    );
}
