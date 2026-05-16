import "./exam-details.css";

// Strapi Schema:
// Component: global.exam-details
// - Title (Short text)
// - ExamCards (Repeatable component: global.exam-card)
//   - BadgeText (Short text) e.g. "REQUIRED", "OPTIONAL - CEH MASTER"
//   - BadgeType (Enumeration: required, optional) - for styling
//   - CardTitle (Short text) e.g. "Knowledge Exam"
//   - Description (Long text)
//   - Stat1Value (Short text) e.g. "125"
//   - Stat1Label (Short text) e.g. "QUESTIONS"
//   - Stat2Value (Short text) e.g. "4 hrs"
//   - Stat2Label (Short text) e.g. "DURATION"
//   - Stat3Value (Short text) e.g. "MCQ"
//   - Stat3Label (Short text) e.g. "FORMAT"
//   - Stat4Value (Short text) e.g. "60-85%"
//   - Stat4Label (Short text) e.g. "PASSING"

export interface ExamCard {
    id: number;
    BadgeText: string;
    BadgeType?: string;
    CardTitle: string;
    Description: string;
    Stat1Value: string;
    Stat1Label: string;
    Stat2Value: string;
    Stat2Label: string;
    Stat3Value: string;
    Stat3Label: string;
    Stat4Value: string;
    Stat4Label: string;
}

export interface ExamDetailsProps {
    title?: string;
    examCards?: ExamCard[];
    /** Official certification URL for partner compliance (e.g. EC-Council ISO/IEC 17024) */
    certificationUrl?: string;
    /** Partner name to display in the notice */
    partnerName?: string;
}

export default function ExamDetails({ title, examCards, certificationUrl, partnerName }: ExamDetailsProps) {
    if (!examCards || examCards.length === 0) return null;

    return (
        <section className="exam-details-section border-bottom" style={{ borderBottom: 'solid 1px #ff6b00', backgroundColor: '#ffff' }} id="exam-details">
            <div className="container">
                {title && (
                    <div className="section-header">
                        <h2>{title}</h2>
                        <div className="red-underline-center"></div>
                    </div>
                )}
                {examCards.length === 1 ? (
                    <div className="single-exam-container">
                        {examCards.map((card) => (
                            <div key={card.id}>
                                <div className="single-exam-header">
                                    <h3 className="single-exam-title">{card.CardTitle}</h3>
                                    <span className={`single-exam-badge ${card.BadgeType === 'optional' ? 'optional' : 'required'}`}>
                                        {card.BadgeText}
                                    </span>
                                </div>
                                <p className="single-exam-description">{card.Description}</p>
                                <div className="single-exam-stats-bar">
                                    <div className="single-stat-item">
                                        <span className="single-stat-label">{card.Stat1Label}</span>
                                        <div className="single-stat-value">{card.Stat1Value}</div>
                                    </div>
                                    <div className="single-stat-item">
                                        <span className="single-stat-label">{card.Stat2Label}</span>
                                        <div className="single-stat-value">{card.Stat2Value}</div>
                                    </div>
                                    <div className="single-stat-item">
                                        <span className="single-stat-label">{card.Stat3Label}</span>
                                        <div className="single-stat-value">{card.Stat3Value}</div>
                                    </div>
                                    <div className="single-stat-item">
                                        <span className="single-stat-label">{card.Stat4Label}</span>
                                        <div className="single-stat-value">{card.Stat4Value}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="exam-cards-grid">
                        {examCards.map((card) => (
                            <div key={card.id} className="exam-card">
                                <span className={`exam-badge ${card.BadgeType === 'optional' ? 'optional' : 'required'}`}>
                                    {card.BadgeText}
                                </span>
                                <h3>{card.CardTitle}</h3>
                                <p className="exam-description">{card.Description}</p>
                                <div className="exam-stats-grid">
                                    <div className="exam-stat">
                                        <span className="stat-value">{card.Stat1Value}</span>
                                        <span className="stat-label">{card.Stat1Label}</span>
                                    </div>
                                    <div className="exam-stat">
                                        <span className="stat-value">{card.Stat2Value}</span>
                                        <span className="stat-label">{card.Stat2Label}</span>
                                    </div>
                                    <div className="exam-stat">
                                        <span className="stat-value">{card.Stat3Value}</span>
                                        <span className="stat-label">{card.Stat3Label}</span>
                                    </div>
                                    <div className="exam-stat">
                                        <span className="stat-value">{card.Stat4Value}</span>
                                        <span className="stat-label">{card.Stat4Label}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Official Certification Criteria Notice (EC-Council / ISO 17024 compliance) */}
                {certificationUrl && (
                    <div className="cert-official-notice">
                        <div className="cert-notice-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <div className="cert-notice-content">
                            <h4 className="cert-notice-title">
                                Official {partnerName || 'Partner'} Certification Criteria
                            </h4>
                            <p className="cert-notice-text">
                                For the most accurate and up-to-date certification passing criteria, eligibility requirements, and exam policies, please refer to the official {partnerName || 'partner'} certification page.
                            </p>
                            <a
                                href={certificationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cert-notice-link"
                            >
                                <span>Visit Official Certification Page</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
