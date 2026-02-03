import "./accreditations.css";

export interface Accreditation {
    id: number;
    Name: string;
    BadgeText: string;
    LogoUrl?: string;
}

export interface AccreditationsProps {
    title?: string;
    accreditations?: Accreditation[];
}

export default function Accreditations({ title, accreditations }: AccreditationsProps) {
    if (!accreditations || accreditations.length === 0) return null;

    return (
        <section className="accreditations-section border-bottom" style={{ borderBottom: 'solid 3px #ff6b00' }} id="accreditations">
            <div className="container">
                {title && (
                    <div className="section-header">
                        <h2>{title}</h2>
                    </div>
                )}
                <div className="accreditations-grid">
                    {accreditations.map((accred) => (
                        <div key={accred.id} className="accreditation-item">
                            {accred.LogoUrl ? (
                                <img
                                    src={accred.LogoUrl}
                                    alt={accred.Name}
                                    className="accreditation-logo-img"
                                />
                            ) : (
                                <div className="accreditation-logo">{accred.BadgeText || accred.Name}</div>
                            )}
                            <p className="accreditation-name">{accred.Name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
