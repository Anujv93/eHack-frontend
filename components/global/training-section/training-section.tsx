import "./training-section.css";

// Types matching flattened Strapi structure
export interface PricingFeature {
    id: number;
    FeatureName: string;
    isBold?: boolean | null;
}

export interface BatchItem {
    id: number;
    BatchName: string;
    Days: string;
    Duration: string;
    Icon?: string;
}

export interface PricingCard {
    ProgramName: string;
    SubTitle: string;
    OriginalPrice: string;
    DiscountedPrice: string;
    Duration: string;
    ButtonText: string;
    ButtonLink: string;
    UrgencyText: string;
    OfferBadge: string;
}

export interface AdmissionStep {
    id: number;
    stepNumber: string;
    Title: string;
    Description: string;
}

export interface AdmissionProcess {
    Title: string;
    ContactPhone: string;
    ContactEmail: string;
    Location: string;
    steps: AdmissionStep[];
}

// Updated props for flattened structure
interface TrainingSectionProps {
    badgeText?: string;
    title?: string;
    highlightedText?: string;
    subtitle?: string;
    pricing?: PricingCard;
    // Flattened fields from Strapi
    batchScheduleTitle?: string;
    academyHours?: string;
    batchItems?: BatchItem[];
    pricingFeatures?: PricingFeature[];
    admissionProcess?: AdmissionProcess;
}

export default function TrainingSection({
    badgeText,
    title,
    highlightedText,
    subtitle,
    pricing,
    batchScheduleTitle,
    academyHours,
    batchItems,
    pricingFeatures,
    admissionProcess
}: TrainingSectionProps) {
    // Don't render if no content
    if (!title && !pricing && !admissionProcess) {
        return null;
    }

    // Parse title to highlight specific text
    const parseTitle = (titleText: string, highlight?: string) => {
        if (!highlight) return titleText;
        const parts = titleText.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase()
                ? <span key={index} className="highlight-orange">{part}</span>
                : part
        );
    };

    // Format price to make GST text smaller
    const formatPrice = (priceText: string) => {
        // Check if the price contains GST text
        const gstMatch = priceText.match(/(\+\s*GST|\+\s*Taxes?)/i);
        if (gstMatch) {
            const parts = priceText.split(gstMatch[0]);
            return (
                <>
                    {parts[0]}
                    <span className="price-tax">{gstMatch[0]}</span>
                    {parts[1]}
                </>
            );
        }
        return priceText;
    };

    return (
        <section className="ehack-training-section border-bottom" style={{ borderBottom: 'solid 3px #ff6b00' }} id="ehack-training">
            <div className="container">
                {/* Section Header */}
                {(badgeText || title) && (
                    <div className="section-header">
                        {badgeText && (
                            <span className="anniversary-badge">🎉 {badgeText}</span>
                        )}
                        {title && (
                            <>
                                <h2>{parseTitle(title, highlightedText)}</h2>
                                <div className="red-underline-center"></div>
                            </>
                        )}
                        {subtitle && <p className="section-subtitle">{subtitle}</p>}
                    </div>
                )}

                {/* Pricing Grid */}
                {(pricing || batchItems) && (
                    <div className="ehack-pricing-grid">
                        {/* Main Pricing Card */}
                        {pricing && (
                            <div className="ehack-pricing-card featured">
                                {pricing.OfferBadge && (
                                    <div className="pricing-ribbon">{pricing.OfferBadge}</div>
                                )}
                                <h3>{pricing.ProgramName}</h3>
                                {pricing.SubTitle && (
                                    <p className="pricing-tagline">{pricing.SubTitle}</p>
                                )}
                                <div className="pricing-amount">
                                    {pricing.OriginalPrice && (
                                        <span className="original-price">₹{pricing.OriginalPrice}</span>
                                    )}
                                    <span className="offer-price">₹{formatPrice(pricing.DiscountedPrice)}</span>
                                </div>
                                {pricing.Duration && (
                                    <div className="pricing-duration">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        <span>{pricing.Duration}</span>
                                    </div>
                                )}
                                {pricingFeatures && pricingFeatures.length > 0 && (
                                    <ul className="pricing-features">
                                        {pricingFeatures.map((feature: PricingFeature) => (
                                            <li key={feature.id}>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                {feature.isBold ? <strong>{feature.FeatureName}</strong> : feature.FeatureName}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <a href={pricing.ButtonLink || "#inquiry"} className="btn-enroll-now">
                                    {pricing.ButtonText || "Enroll Now"} →
                                </a>
                                {pricing.UrgencyText && (
                                    <p className="seats-left">⚡ {pricing.UrgencyText}</p>
                                )}
                            </div>
                        )}

                        {/* Batch Schedule Card */}
                        {(batchScheduleTitle || batchItems) && (
                            <div className="ehack-info-card">
                                <h4>{batchScheduleTitle || "Batch Schedule Options"}</h4>
                                {batchItems && batchItems.length > 0 && (
                                    <div className="batch-options">
                                        {batchItems.map((batch: BatchItem) => (
                                            <div key={batch.id} className="batch-option">
                                                <div className="batch-icon">{batch.Icon || "📅"}</div>
                                                <div className="batch-details">
                                                    <h5>{batch.BatchName}</h5>
                                                    <p>{batch.Days}</p>
                                                    <span className="batch-time">{batch.Duration}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {academyHours && (
                                    <div className="academy-hours">
                                        <p><strong>Academy Hours:</strong> {academyHours}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Admission Process */}
                {admissionProcess && admissionProcess.steps && admissionProcess.steps.length > 0 && (
                    <div className="admission-process">
                        <h4>{admissionProcess.Title || "Simple Admission Process"}</h4>
                        <div className="process-steps">
                            {admissionProcess.steps.map((step, index) => (
                                <div key={step.id} className="process-step-wrapper">
                                    <div className="process-step">
                                        <div className="step-num">{step.stepNumber}</div>
                                        <div className="step-content">
                                            <h5>{step.Title}</h5>
                                            <p>{step.Description}</p>
                                        </div>
                                    </div>
                                    {index < admissionProcess.steps.length - 1 && (
                                        <div className="process-connector"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Contact Strip */}
                {admissionProcess && (admissionProcess.ContactPhone || admissionProcess.ContactEmail || admissionProcess.Location) && (
                    <div className="ehack-contact-strip">
                        {admissionProcess.ContactPhone && (
                            <div className="contact-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span>{admissionProcess.ContactPhone}</span>
                            </div>
                        )}
                        {admissionProcess.ContactEmail && (
                            <div className="contact-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <span>{admissionProcess.ContactEmail}</span>
                            </div>
                        )}
                        {admissionProcess.Location && (
                            <div className="contact-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>{admissionProcess.Location}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
