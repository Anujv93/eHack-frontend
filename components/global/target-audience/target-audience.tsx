import "./target-audience.css";

export interface AudienceCard {
    id: number;
    Title: string;
    Description: string;
    IconSvg?: string;
}

export interface TargetAudienceProps {
    title?: string;
    audiences?: AudienceCard[];
}

// Default icons matching the reference design
const defaultIcons = [
    // Person icon
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>`,
    // Team icon
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>`,
    // Shield icon
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>`,
    // Education/graduation icon
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>`
];

export default function TargetAudience({ title, audiences }: TargetAudienceProps) {
    if (!audiences || audiences.length === 0) return null;

    return (
        <section className="audience-section border-bottom" style={{ borderBottom: 'solid 3px orange' }} id="target-audience">
            <div className="container">
                {title && (
                    <div className="section-header">
                        <h2>{title}</h2>
                        <div className="red-underline-center"></div>
                    </div>
                )}
                <div className="audience-grid">
                    {audiences.map((audience, index) => (
                        <div key={audience.id} className="audience-card">
                            <div
                                className="audience-icon"
                                dangerouslySetInnerHTML={{
                                    __html: audience.IconSvg || defaultIcons[index % defaultIcons.length]
                                }}
                            />
                            <h3>{audience.Title}</h3>
                            <p>{audience.Description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
