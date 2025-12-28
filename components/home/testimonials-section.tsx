'use client';

import './testimonials-section.css';

const row1Companies = [
    { name: 'IBM', url: 'https://img.logo.dev/ibm.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'Cognizant', url: 'https://img.logo.dev/cognizant.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'Infosys', url: 'https://img.logo.dev/infosys.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'Wipro', url: 'https://img.logo.dev/wipro.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'TCS', url: 'https://img.logo.dev/tcs.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'Accenture', url: 'https://img.logo.dev/accenture.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'Tech Mahindra', url: 'https://img.logo.dev/techmahindra.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'Capgemini', url: 'https://img.logo.dev/capgemini.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' }
];

const row2Companies = [
    { name: 'Deloitte', url: 'https://img.logo.dev/deloitte.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'EY', url: 'https://img.logo.dev/ey.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'PwC', url: 'https://img.logo.dev/pwc.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'KPMG', url: 'https://img.logo.dev/kpmg.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'Cisco', url: 'https://img.logo.dev/cisco.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'Fortinet', url: 'https://img.logo.dev/fortinet.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'Oracle', url: 'https://img.logo.dev/oracle.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
    { name: 'Bosch', url: 'https://img.logo.dev/bosch.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' }
];

const testimonials = [
    {
        name: 'Rajesh Kumar',
        role: 'Security Analyst',
        company: 'Deloitte',
        companyColor: '#86BC25',
        text: "The hands-on labs and real-world scenarios helped me understand actual attack patterns. The CND certification helped me land my dream job as a Security Analyst."
    },
    {
        name: 'Priyanka Sharma',
        role: 'Network Security',
        company: 'PwC',
        companyColor: '#D04A02',
        text: "eHack's structured curriculum took me from a complete beginner to a certified professional. The practical training was invaluable for my career growth."
    },
    {
        name: 'Arun Menon',
        role: 'IT Security',
        company: 'KPMG',
        companyColor: '#00338D',
        text: "The CSCU training was exactly what I needed to transition into cybersecurity. The instructors share practical insights beyond textbooks."
    }
];

export default function TestimonialsSection() {
    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <span className="testimonials-label">Success Stories</span>
                    <h2 className="testimonials-title">What Our Learners Say</h2>
                </div>

                {/* Company Logos Marquee */}
                <div className="logo-marquee-wrapper">
                    {/* Row 1: Scrolls Left */}
                    <div className="logo-marquee">
                        <div className="logo-track">
                            {[...row1Companies, ...row1Companies].map((company, index) => (
                                <div key={index} className="company-logo">
                                    <img
                                        src={company.url}
                                        alt={company.name}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            if (target.parentElement) {
                                                target.parentElement.innerHTML = `<span>${company.name}</span>`;
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2: Scrolls Right */}
                    <div className="logo-marquee reverse">
                        <div className="logo-track">
                            {[...row2Companies, ...row2Companies].map((company, index) => (
                                <div key={index} className="company-logo">
                                    <img
                                        src={company.url}
                                        alt={company.name}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            if (target.parentElement) {
                                                target.parentElement.innerHTML = `<span>${company.name}</span>`;
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-header">
                                <div>
                                    <h3 className="testimonial-name">{testimonial.name}</h3>
                                    <p className="testimonial-role">
                                        {testimonial.role} at{' '}
                                        <span
                                            className="testimonial-company"
                                            style={{ backgroundColor: testimonial.companyColor }}
                                        >
                                            {testimonial.company}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <p className="testimonial-text">{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
