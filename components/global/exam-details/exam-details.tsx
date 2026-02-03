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
}

export default function ExamDetails({ title, examCards }: ExamDetailsProps) {
    if (!examCards || examCards.length === 0) return null;

    return (
        <section className="exam-details-section border-bottom" style={{ borderBottom: 'solid 1px #ff6b00' }} id="exam-details">
            <div className="container">
                {title && (
                    <div className="section-header">
                        <h2>{title}</h2>
                        <div className="red-underline-center"></div>
                    </div>
                )}
                <div className={`exam-cards-grid ${examCards.length === 1 ? 'single-card-grid' : ''}`}>
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
            </div>
        </section>
    );
}
