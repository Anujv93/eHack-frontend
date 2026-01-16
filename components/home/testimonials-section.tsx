'use client';

import { useState, useEffect } from 'react';
import './testimonials-section.css';

// All companies for cycling
const allCompanies = [
    // Set 1
    [
        { name: 'Chevron', url: 'https://img.logo.dev/chevron.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'TCS', url: 'https://img.logo.dev/tcs.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'HCL Tech', url: 'https://img.logo.dev/hcltech.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Microsoft', url: 'https://img.logo.dev/microsoft.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'United Nations', url: 'https://img.logo.dev/un.org?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Aramco', url: 'https://img.logo.dev/aramco.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Shell', url: 'https://img.logo.dev/shell.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Infosys', url: 'https://img.logo.dev/infosys.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' }
    ],
    // Set 2
    [
        { name: 'IBM', url: 'https://img.logo.dev/ibm.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Cognizant', url: 'https://img.logo.dev/cognizant.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Wipro', url: 'https://img.logo.dev/wipro.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Accenture', url: 'https://img.logo.dev/accenture.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Deloitte', url: 'https://img.logo.dev/deloitte.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'EY', url: 'https://img.logo.dev/ey.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'PwC', url: 'https://img.logo.dev/pwc.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'KPMG', url: 'https://img.logo.dev/kpmg.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' }
    ],
    // Set 3
    [
        { name: 'Cisco', url: 'https://img.logo.dev/cisco.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Fortinet', url: 'https://img.logo.dev/fortinet.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Oracle', url: 'https://img.logo.dev/oracle.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Bosch', url: 'https://img.logo.dev/bosch.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Tech Mahindra', url: 'https://img.logo.dev/techmahindra.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Capgemini', url: 'https://img.logo.dev/capgemini.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'L&T', url: 'https://img.logo.dev/larsentoubro.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' },
        { name: 'Reliance', url: 'https://img.logo.dev/ril.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ' }
    ]
];

// Highlighted Testimonial
const highlightedTestimonial = {
    name: 'Shri Rajashekara N., IPS',
    role: 'DIG of Police / Director, CDTI, Hyderabad',
    image: '/images/testimonials/pp_person9.jpg',
    text: "eHack Academy's commitment to practical cybersecurity training is commendable. Their comprehensive curriculum in ethical hacking and digital forensics plays a vital role in empowering the next generation of cyber defenders and strengthening our national security infrastructure."
};

const testimonials = [

    {
        name: 'Anmol Gupta',
        role: 'APV-DELIVERY',
        company: 'ampcuscyber',
        companyLogo: 'images/ampcuscyber.png',
        companyColor: '#86BC25',
        image: '/images/testimonials/person1.jpg',
        certification: 'CEH Certified',
        course: 'Masters in Ethical Hacking',
        text: "I joined eHackAcademy with just one year of experience and no cybersecurity background… Today, as Director at Ampcus, I proudly recommend eHack."
    },
    {
        name: 'Rajiv Govind',
        role: 'Head Teaching Assistant',
        company: 'GT',
        companyLogo: 'images/gtlogo.jpg',
        companyColor: '#D04A02',
        image: '/images/testimonials/person2.jpg',
        certification: 'CND Certified',
        course: 'Graduate Program in Cybersecurity',
        text: "I joined eHack in 8th grade, driven by curiosity for coding and cybersecurity… Today, working in a senior role in the US, I proudly credit eHack."
    },
    {
        name: 'Vaddi . Paneendar',
        role: 'Penetration Tester',
        company: 'sisa',
        companyLogo: 'images/sisa.webp',
        companyColor: '#00338D',
        image: '/images/testimonials/person3.jpg',
        certification: 'CPENT Certified',
        course: 'Graduate Program in Ethical Hacking',
        text: "I came from Vijayawada while pursuing my BCA and joined eHack's Masters program. Today, as a Senior Penetration Tester at SISA Security, I proudly recommend eHack"
    },
    {
        name: 'Damini Settappa Ranganath',
        role: 'Cybersecurity Engineer',
        company: 'anuvu',
        companyLogo: 'images/anuvu.png',
        companyColor: '#FFD100',
        image: '/images/testimonials/person4.jpg',
        certification: 'CHFI Certified',
        course: 'Graduate Program in Ethical Hacking',
        text: "I joined eHack right after my BTech with no prior experience. Today, I’m proud to say eHack helped me grow, build my career, and achieve my dreams."
    },
    {
        name: 'Pranshu Tiwari',
        role: 'Director Security Services',
        company: 'ampcuscyber',
        companyLogo: 'images/ampcuscyber.png',
        companyColor: '#A100FF',
        image: '/images/testimonials/person5.jpg',
        certification: 'CCSE Certified',
        course: 'Masters in Ethical Hacking',
        text: "I joined eHack for CEH to enter a top MNC… Today, as Director in Pentesting at Ampcus, I proudly say strong foundations and continuous learning are the keys to success."
    },
    {
        name: 'Abhinav Choubey',
        role: 'Information Security Manager',
        company: 'sisa',
        companyLogo: 'images/sisa.webp',
        companyColor: '#0530AD',
        image: '/images/testimonials/person6.jpg',
        certification: 'CISM Certified',
        course: 'Masters in Ethical Hacking',
        text: "I served in the Indian Air Force for 20 years before joining eHack… Today, as Director at SISA Security, I’m proud to say age is no barrier."
    }
];

export default function TestimonialsSection() {
    const [currentSet, setCurrentSet] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Cycle through logo sets every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentSet((prev) => (prev + 1) % allCompanies.length);
                setIsTransitioning(false);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentCompanies = allCompanies[currentSet];

    return (
        <section className="testimonials-section" id="testimonials">
            <div className="testimonials-container">
                {/* Trusted By Section - Grid Layout */}
                <div className="trusted-by-section">
                    <div className="trusted-by-header">
                        <span className="trusted-text">Trusted by</span>
                    </div>
                    <div className={`company-logos-grid ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                        {currentCompanies.map((company, index) => (
                            <div key={`${currentSet}-${index}`} className="company-logo-card">
                                <div className="company-logo-wrapper">
                                    <img
                                        src={company.url}
                                        alt={company.name}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            if (target.parentElement) {
                                                target.parentElement.innerHTML = `<span class="company-name-fallback">${company.name}</span>`;
                                            }
                                        }}
                                    />
                                </div>
                                <span className="company-card-name">{company.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="testimonials-header">
                    <span className="testimonials-label">Success Stories</span>
                    <h2 className="testimonials-title">What Our Learners Say</h2>
                </div>

                {/* Testimonials Marquee - Moving Left to Right */}
                <div className="testimonials-marquee-wrapper">
                    <div className="testimonials-marquee">
                        {/* First set of cards */}
                        {testimonials.map((testimonial, index) => (
                            <div key={`first-${index}`} className="testimonial-card">
                                <div className="testimonial-header">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="testimonial-avatar"
                                    />
                                    <div className="testimonial-info">
                                        <h3 className="testimonial-name">{testimonial.name}</h3>
                                        <p className="testimonial-role">{testimonial.role}</p>
                                    </div>
                                </div>

                                {(testimonial.certification || testimonial.course) && (
                                    <div className="testimonial-badges">
                                        {testimonial.certification && <span className="badge certification-badge">{testimonial.certification}</span>}
                                        {testimonial.course && <span className="badge course-badge">{testimonial.course}</span>}
                                    </div>
                                )}
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                {(testimonial.companyLogo || testimonial.company) ? (
                                    <div className="testimonial-company-footer">
                                        <img
                                            src={testimonial.companyLogo}
                                            alt={testimonial.company}
                                            className="company-logo-large"
                                        />
                                        <span className="company-name-footer">{testimonial.company}</span>
                                    </div>
                                ) : (
                                    <div className="testimonial-company-footer spacer" style={{ minHeight: '24px' }}></div>
                                )}
                            </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {testimonials.map((testimonial, index) => (
                            <div key={`second-${index}`} className="testimonial-card">
                                <div className="testimonial-header">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="testimonial-avatar"
                                    />
                                    <div className="testimonial-info">
                                        <h3 className="testimonial-name">{testimonial.name}</h3>
                                        <p className="testimonial-role">{testimonial.role}</p>
                                    </div>
                                </div>

                                {(testimonial.certification || testimonial.course) && (
                                    <div className="testimonial-badges">
                                        {testimonial.certification && <span className="badge certification-badge">{testimonial.certification}</span>}
                                        {testimonial.course && <span className="badge course-badge">{testimonial.course}</span>}
                                    </div>
                                )}
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                {(testimonial.companyLogo || testimonial.company) ? (
                                    <div className="testimonial-company-footer">
                                        <img
                                            src={testimonial.companyLogo}
                                            alt={testimonial.company}
                                            className="company-logo-large"
                                        />
                                        <span className="company-name-footer">{testimonial.company}</span>
                                    </div>
                                ) : (
                                    <div className="testimonial-company-footer spacer" style={{ minHeight: '24px' }}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Highlighted Testimonial - Horizontal Card */}
                <div className="highlighted-testimonial-container">
                    <div className="testimonial-card testimonial-card-horizontal">
                        <div className="testimonial-header horizontal-header">
                            <img
                                src={highlightedTestimonial.image}
                                alt={highlightedTestimonial.name}
                                className="testimonial-avatar large-avatar"
                            />
                            <div className="testimonial-info">
                                <h3 className="testimonial-name">{highlightedTestimonial.name}</h3>
                                <p className="testimonial-role">{highlightedTestimonial.role}</p>
                            </div>
                        </div>
                        <div className="testimonial-content-wrapper">
                            <p className="testimonial-text">"{highlightedTestimonial.text}"</p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
