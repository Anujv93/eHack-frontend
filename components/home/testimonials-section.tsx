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

const testimonials = [
    {
        name: 'Ankit Verma',
        role: 'Cybersecurity Analyst',
        company: 'Deloitte',
        companyLogo: 'https://img.logo.dev/deloitte.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#86BC25',
        image: '/images/testimonials/person1.jpg',
        certification: 'CEH Certified',
        course: 'Masters in Ethical Hacking',
        text: "The hands-on labs and real-world scenarios helped me understand actual attack patterns. The CEH certification from eHack Academy was instrumental in landing my dream job at Deloitte."
    },
    {
        name: 'Rahul Sharma',
        role: 'SOC Engineer',
        company: 'PwC',
        companyLogo: 'https://img.logo.dev/pwc.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#D04A02',
        image: '/images/testimonials/person2.jpg',
        certification: 'CND Certified',
        course: 'Graduate Program in Cybersecurity',
        text: "eHack's structured curriculum took me from a complete beginner to a certified SOC professional. The practical training and mentorship were invaluable for my career growth."
    },
    {
        name: 'Vijay Kumar',
        role: 'Penetration Tester',
        company: 'KPMG',
        companyLogo: 'https://img.logo.dev/kpmg.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#00338D',
        image: '/images/testimonials/person3.jpg',
        certification: 'CPENT Certified',
        course: 'Graduate Program in Ethical Hacking',
        text: "The VAPT training was exactly what I needed to transition into offensive security. The live hacking labs and instructor-led sessions gave me real-world skills."
    },
    {
        name: 'Priya Singh',
        role: 'Security Consultant',
        company: 'EY',
        companyLogo: 'https://img.logo.dev/ey.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#FFD100',
        image: '/images/testimonials/person4.jpg',
        certification: 'CHFI Certified',
        course: 'Graduate Program in Ethical Hacking',
        text: "As a woman in cybersecurity, eHack provided an inclusive learning environment. The forensics training helped me specialize in incident response at EY."
    },
    {
        name: 'Arjun Patel',
        role: 'Cloud Security Engineer',
        company: 'Accenture',
        companyLogo: 'https://img.logo.dev/accenture.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#A100FF',
        image: '/images/testimonials/person5.jpg',
        certification: 'CCSE Certified',
        course: 'Masters in Ethical Hacking',
        text: "The cloud security modules were cutting-edge. eHack prepared me perfectly for securing enterprise cloud environments at Accenture."
    },
    {
        name: 'Sanjay Mehta',
        role: 'Information Security Manager',
        company: 'IBM',
        companyLogo: 'https://img.logo.dev/ibm.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#0530AD',
        image: '/images/testimonials/person6.jpg',
        certification: 'CISM Certified',
        course: 'Masters in Ethical Hacking',
        text: "After 10+ years in IT, eHack Academy helped me transition into cybersecurity leadership. The comprehensive curriculum and industry connections opened new career opportunities at IBM."
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

                {/* Testimonials Grid */}
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
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
                            <div className="testimonial-badges">
                                <span className="badge certification-badge">{testimonial.certification}</span>
                                <span className="badge course-badge">{testimonial.course}</span>
                            </div>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="testimonial-company-footer">
                                <img
                                    src={testimonial.companyLogo}
                                    alt={testimonial.company}
                                    className="company-logo-large"
                                />
                                <span className="company-name-footer">{testimonial.company}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
