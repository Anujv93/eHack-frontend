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
