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
        companyLogo: '/images/ampcuscyber.png',
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
        companyLogo: '/images/gtlogo.jpg',
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
        companyLogo: '/images/sisa.webp',
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
        companyLogo: '/images/anuvu.png',
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
        companyLogo: '/images/ampcuscyber.png',
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
        companyLogo: '/images/sisa.webp',
        companyColor: '#0530AD',
        image: '/images/testimonials/person6.jpg',
        certification: 'CISM Certified',
        course: 'Masters in Ethical Hacking',
        text: "I served in the Indian Air Force for 20 years before joining eHack… Today, as Director at SISA Security, I’m proud to say age is no barrier."
    },
    {
        name: 'Sneha Sharma',
        role: 'Digital Marketing Specialist',
        company: 'TCS',
        companyLogo: 'https://img.logo.dev/tcs.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#FF4500',
        certification: 'Google Ads Professional',
        course: 'Digital Marketing Masterclass',
        text: "The transition from traditional marketing to digital was seamless with eHack. Their hands-on approach and real-world projects gave me the confidence to lead digital campaigns for global brands."
    },
    {
        name: 'Arjun Mehra',
        role: 'AI Engineer',
        company: 'Microsoft',
        companyLogo: 'https://img.logo.dev/microsoft.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#00BFFF',
        certification: 'AI Specialist',
        course: 'Data Science & AI Bootcamp',
        text: "Building neural networks and understanding deep learning seemed daunting until I joined eHack. The mentors here are exceptional, breaking down complex AI concepts into practical, applicable knowledge."
    },
    {
        name: 'Priya Iyer',
        role: 'IoT Solutions Architect',
        company: 'Cisco',
        companyLogo: 'https://img.logo.dev/cisco.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#32CD32',
        certification: 'IoT Professional',
        course: 'Robotics & IoT Specialist',
        text: "From sensors to cloud integration, eHack's IoT program covers it all. I now design smart home solutions that are efficient and secure, thanks to the comprehensive training I received."
    },
    {
        name: 'Rajesh Kumar',
        role: 'Cloud Security Consultant',
        company: 'IBM',
        companyLogo: 'https://img.logo.dev/ibm.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#4682B4',
        certification: 'AWS Certified Security',
        course: 'Cloud Security Mastery',
        text: "Securing cloud infrastructures is critical today. eHack's mastery program provided me with the tools and techniques to identify vulnerabilities in complex cloud environments and implement robust defenses."
    },
    {
        name: 'Anjali Desai',
        role: 'VAPT Lead',
        company: 'Fortinet',
        companyLogo: 'https://img.logo.dev/fortinet.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#DC143C',
        certification: 'OSCP Certified',
        course: 'Advanced Pentesting Program',
        text: "The advanced pentesting program at eHack is intense and rewarding. The labs simulate real-world attacks, allowing me to refine my hacking skills in a controlled environment."
    },
    {
        name: 'Vikram Singh',
        role: 'SOC Analyst',
        company: 'Oracle',
        companyLogo: 'https://img.logo.dev/oracle.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#2F4F4F',
        certification: 'SOC Analyst L3',
        course: 'SOC Operations & Management',
        text: "Managing a Security Operations Center requires a blend of technical and leadership skills. eHack's SOC program prepared me for the fast-paced nature of incident response and threat hunting."
    },
    {
        name: 'Kavita Reddy',
        role: 'SEO Manager',
        company: 'Cognizant',
        companyLogo: 'https://img.logo.dev/cognizant.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#FFD700',
        certification: 'HubSpot SEO Certified',
        course: 'Digital Marketing Masterclass',
        text: "SEO is more than just keywords. eHack taught me the technical aspects of search engine optimization, which helped me improve organic traffic for my clients by over 200%."
    },
    {
        name: 'Sandeep Patil',
        role: 'Data Scientist',
        company: 'HCL Tech',
        companyLogo: 'https://img.logo.dev/hcltech.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#8A2BE2',
        certification: 'Data Analytics Professional',
        course: 'Data Science Bootcamp',
        text: "Turning raw data into actionable insights is what I do every day. eHack's bootcamp gave me a strong foundation in statistics, Python, and machine learning."
    },
    {
        name: 'Aditi Verma',
        role: 'Robotics Engineer',
        company: 'Bosch',
        companyLogo: 'https://img.logo.dev/bosch.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#FF6347',
        certification: 'ROB Certified',
        course: 'Robotics & IoT Specialist',
        text: "Designing autonomous robots requires a deep understanding of hardware and software. eHack's hands-on labs were instrumental in my journey to becoming a robotics engineer."
    },
    {
        name: 'Rohan Gupta',
        role: 'Security Analyst',
        company: 'Capgemini',
        companyLogo: 'https://img.logo.dev/capgemini.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#556B2F',
        certification: 'Security+ Certified',
        course: 'Graduate Program in Cybersecurity',
        text: "eHack's cybersecurity program is comprehensive and up-to-date. I learned how to protect networks from sophisticated threats and respond to data breaches effectively."
    },
    {
        name: 'Mansi Joshi',
        role: 'ML Ops Specialist',
        company: 'Tech Mahindra',
        companyLogo: 'https://img.logo.dev/techmahindra.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#008080',
        certification: 'TensorFlow Professional',
        course: 'AI & Machine Learning Bootcamp',
        text: "Deploying and managing machine learning models in production is a specialized skill. eHack provided the perfect environment to master MLOps tools and workflows."
    },
    {
        name: 'Rahul Malhotra',
        role: 'Ethical Hacker',
        company: 'United Nations',
        companyLogo: 'https://img.logo.dev/un.org?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#B22222',
        certification: 'CEH Master',
        course: 'Masters in Ethical Hacking',
        text: "I started as a hobbyist, but eHack turned me into a professional ethical hacker. The curriculum covers the latest attack vectors and defense mechanisms."
    },
    {
        name: 'Deepika Nair',
        role: 'Content Strategist',
        company: 'Infosys',
        companyLogo: 'https://img.logo.dev/infosys.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#FF1493',
        certification: 'Social Media Professional',
        course: 'Digital Marketing Masterclass',
        text: "Connecting with audiences through compelling content is an art. eHack's digital marketing program helped me refine my storytelling skills and use data to drive engagement."
    },
    {
        name: 'Sameer Khan',
        role: 'Cloud Architect',
        company: 'Wipro',
        companyLogo: 'https://img.logo.dev/wipro.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ',
        companyColor: '#4169E1',
        certification: 'Azure Solutions Architect',
        course: 'Cloud Security Mastery',
        text: "Designing scalable and secure cloud solutions is what I love. eHack's mentors shared invaluable industry insights that helped me excel in my role as a cloud architect."
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
        <section className="testimonials-section" style={{ borderBottom: 'solid 1px #ff6b00' }} id="testimonials">
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
                                    {testimonial.image && (
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="testimonial-avatar"
                                        />
                                    )}
                                    <div className="testimonial-info" style={!testimonial.image ? { marginLeft: 0 } : {}}>
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
                                <p className="testimonial-text">{testimonial.text}</p>
                                {(testimonial.companyLogo || testimonial.company) && (
                                    <div className="testimonial-company-footer">
                                        {testimonial.companyLogo && (
                                            <div className="company-logo-container" data-company={testimonial.company}>
                                                <img
                                                    src={testimonial.companyLogo}
                                                    alt={testimonial.company}
                                                    className="company-logo-large"
                                                />
                                            </div>
                                        )}
                                        <span className="company-name-footer" style={!testimonial.companyLogo ? { marginLeft: 0 } : {}}>{testimonial.company}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {testimonials.map((testimonial, index) => (
                            <div key={`second-${index}`} className="testimonial-card">
                                <div className="testimonial-header">
                                    {testimonial.image && (
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="testimonial-avatar"
                                        />
                                    )}
                                    <div className="testimonial-info" style={!testimonial.image ? { marginLeft: 0 } : {}}>
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
                                <p className="testimonial-text">{testimonial.text}</p>
                                {(testimonial.companyLogo || testimonial.company) && (
                                    <div className="testimonial-company-footer">
                                        {testimonial.companyLogo && (
                                            <div className="company-logo-container" data-company={testimonial.company}>
                                                <img
                                                    src={testimonial.companyLogo}
                                                    alt={testimonial.company}
                                                    className="company-logo-large"
                                                />
                                            </div>
                                        )}
                                        <span className="company-name-footer" style={!testimonial.companyLogo ? { marginLeft: 0 } : {}}>{testimonial.company}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Highlighted Testimonial - Horizontal Card */}
                <div className="highlighted-testimonial-container">
                    <div className="testimonial-card testimonial-card-horizontal">
                        <div className="testimonial-header horizontal-header">
                            {highlightedTestimonial.image && (
                                <img
                                    src={highlightedTestimonial.image}
                                    alt={highlightedTestimonial.name}
                                    className="testimonial-avatar large-avatar"
                                />
                            )}
                            <div className="testimonial-info">
                                <h3 className="testimonial-name">{highlightedTestimonial.name}</h3>
                                <p className="testimonial-role">{highlightedTestimonial.role}</p>
                            </div>
                        </div>
                        <div className="testimonial-content-wrapper">
                            <p className="testimonial-text">{highlightedTestimonial.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
