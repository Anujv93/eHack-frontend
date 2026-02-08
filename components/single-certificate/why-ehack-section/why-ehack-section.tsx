import React from 'react';
import './why-ehack-section.css';

interface WhyEhackData {
    title: string;
    desc: string;
}

const WHY_EHACK_DATA: WhyEhackData[] = [
    { title: "Real Time Labs", desc: "Associated with EC-Council and CISCO, we ensure candidates get exposed to real time labs - how vulnerabilities are found and exploited, how pen testing is done for a network." },
    { title: "World Class Infrastructure", desc: "Lab infrastructure built according to EC-Council and Cisco standards with dedicated high speed broadband connectivity and well stacked library resources." },
    { title: "Certified Faculties", desc: "Our experienced instructors are duly certified by EC-Council and CISCO, providing the latest internationally practiced technological knowledge." },
    { title: "Study Abroad Programs", desc: "International collaboration with universities and institutions worldwide to provide an enabling environment through constant engagement with global partners." }
];

interface WhyEhackSectionProps {
    programType?: string;
}

export const WhyEhackSection: React.FC<WhyEhackSectionProps> = ({ programType = "cybersecurity" }) => {
    return (
        <section className="why-ehack-section" id="why-ehack">
            <div className="section-container">
                <h2 className="roi-title">Why <span className="text-accent">eHack Academy</span>?</h2>
                <p className="roi-subtitle">
                    {programType === 'digital-marketing'
                        ? 'Passion for Excellence in Digital Marketing Training'
                        : 'Passion for Excellence in Information Security'}
                </p>

                <div className="roi-grid">
                    <div className="salary-card">
                        {WHY_EHACK_DATA.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="why-item">
                                <h3 className="chart-title accent-title">{item.title}</h3>
                                <p className="chart-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="salary-card">
                        {WHY_EHACK_DATA.slice(2, 4).map((item, idx) => (
                            <div key={idx} className="why-item">
                                <h3 className="chart-title accent-title">{item.title}</h3>
                                <p className="chart-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
