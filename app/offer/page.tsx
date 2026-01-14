'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PlacementSection from '@/components/home/placement-section';
import './page.css';

export default function OfferPage() {
    // Countdown timer state
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const eligiblePrograms = [
        {
            title: 'Graduate Program in Ethical Hacking & Cyber Security',
            features: [
                'Comprehensive program covering IT fundamentals',
                'Ethical hacking, penetration testing, and digital forensics',
                '2 global certifications from EC-Council'
            ],
            duration: '7-9 Months',
            trainingHours: '200+ Hours',
            certifications: 'CSCU, CND',
            membership: '2 Years',
            certificateImage: '/images/certificates/graduate-certificate.jpg',
            ctaText: 'Explore Program',
            ctaLink: '/programs/graduate-cybersecurity',
            featured: true
        },
        {
            title: 'Masters Program with 5 Global Certifications',
            features: [
                'Ultimate cybersecurity mastery program',
                '5 EC-Council certifications: CSCU, CND, CEH, CPENT, CHFI',
                'For serious professionals aiming for advanced expertise'
            ],
            duration: '9-12 Months',
            trainingHours: '300 Hours',
            certifications: '5 Global Certs',
            membership: '2 Years',
            certificateImage: '/images/certificates/masters-certificate.jpg',
            ctaText: 'Explore Program',
            ctaLink: '/programs/masters-ethical-hacking',
            featured: false
        }
    ];

    const certifications = [
        {
            title: 'EC-Council Certified SOC Analyst',
            shortName: 'CSA',
            price: '₹45,000',
            description: 'Master Security Operations Center fundamentals, SIEM tools, log analysis, and incident detection.',
            highlights: ['SOC Operations', 'SIEM & Log Analysis', 'Threat Detection', 'Incident Monitoring']
        },
        {
            title: 'EC-Council Certified Security Engineer',
            shortName: 'CSE',
            price: '₹65,000',
            description: 'Learn cloud security architecture, vulnerability management, and enterprise security implementation.',
            highlights: ['Cloud Security', 'Vulnerability Management', 'Security Architecture', 'Automation']
        }
    ];

    const outcomes = [
        { stat: '₹8-15 LPA', label: 'Starting Salary' },
        { stat: '98%', label: 'Placement Rate' },
        { stat: '500+', label: 'Hiring Partners' },
        { stat: '50,000+', label: 'Trained Professionals' }
    ];

    const faqs = [
        {
            question: 'Which programs are eligible for this offer?',
            answer: 'This offer is available for students enrolling in either the Graduate Program in Cybersecurity (7-9 Months) or the Masters in Ethical Hacking (9-12 Months). When you enroll in one of these programs AND purchase the EC-Council CSA + CSE certification bundle together, you qualify for the free laptop.'
        },
        {
            question: 'What is the EC-Council CSA + CSE Bundle?',
            answer: 'The bundle includes two globally-recognized EC-Council certifications: Certified SOC Analyst (CSA) worth ₹45,000 and Certified Security Engineer (CSE) worth ₹65,000. When purchased together, the bundle costs ₹1,10,000.'
        },
        {
            question: 'How do I get the FREE laptop?',
            answer: 'To receive the free laptop worth ₹50,000, you must enroll in either the Graduate or Masters program AND purchase the EC-Council CSA + CSE bundle (₹1,10,000) together. The laptop will be shipped within 15-20 working days after your enrollment is confirmed.'
        },
        {
            question: 'Can I buy the certifications separately?',
            answer: 'Yes, you can purchase CSA (₹45,000) or CSE (₹65,000) individually. However, the free laptop offer is only valid when you purchase the complete bundle (₹1,10,000) along with a Graduate or Masters program enrollment.'
        },
        {
            question: 'What are the payment options?',
            answer: 'We offer flexible payment options including no-cost EMI. You can pay for the program and certification bundle separately or together. Contact our admissions team for a customized payment plan.'
        },
        {
            question: 'What if I am not satisfied with the program?',
            answer: 'We offer a 7-day money-back guarantee. If you are not satisfied within the first week, you can request a full refund for the program fee - no questions asked.'
        }
    ];

    const features = [
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
            ),
            title: 'Accredited Curriculum',
            description: 'EC-Council certified content developed with industry experts'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
            ),
            title: 'Hands-on Labs',
            description: 'Practice on real security tools with iLabs access included'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
            ),
            title: 'Expert Mentorship',
            description: 'Learn from certified professionals with 10+ years experience'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
            ),
            title: 'Placement Support',
            description: 'Resume building, mock interviews, and 500+ hiring partners'
        }
    ];

    return (
        <div className="offer-page-v2">
            {/* Minimal Top Bar */}
            <div className="offer-topbar">
                <div className="topbar-content">
                    <span className="topbar-badge">Limited Time</span>
                    <span className="topbar-text">FREE Laptop worth ₹50,000 with Graduate/Masters + CSA+CSE Bundle</span>
                    <div className="topbar-timer">
                        <span>{String(timeLeft.days).padStart(2, '0')}d</span>
                        <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                        <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                        <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="offer-hero-v2">
                <div className="hero-container">
                    <div className="hero-left">
                        <div className="hero-partner">
                            <img src="/images/ec-council-logo.png" alt="EC-Council" className="partner-logo" />
                            <span className="partner-divider">×</span>
                            <img src="/images/ehackLogo.png" alt="eHack Academy" className="partner-logo" />
                        </div>

                        <h1 className={`hero-headline ${isVisible ? 'visible' : ''}`}>
                            Get a FREE Laptop
                            <span className="headline-highlight">Worth ₹50,000</span>
                        </h1>

                        <p className="hero-description">
                            Join our <strong>Graduate Program in Cybersecurity</strong> or <strong>Masters in Ethical Hacking</strong>
                            with the EC-Council CSA + CSE Certification Bundle and receive a brand new laptop – absolutely FREE!
                        </p>

                        <div className="hero-meta">
                            <div className="meta-item">
                                <div className="meta-text">
                                    <span className="meta-label">Choose From</span>
                                    <span className="meta-value">2 Programs</span>
                                </div>
                            </div>
                            <div className="meta-item">
                                <div className="meta-text">
                                    <span className="meta-label">Certifications</span>
                                    <span className="meta-value">CSA + CSE</span>
                                </div>
                            </div>
                            <div className="meta-item">
                                <div className="meta-text">
                                    <span className="meta-label">FREE Bonus</span>
                                    <span className="meta-value">₹50K Laptop</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-cta-section">
                            <a href="#enquiry" className="cta-enroll">
                                Get Free Consultation
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                            <p className="cta-subtext">Limited seats available • Expert counsellors will guide you</p>
                        </div>
                    </div>

                    <div className="hero-right">
                        <div className="hero-card">
                            <div className="card-header">
                                <span className="card-badge">HOW IT WORKS</span>
                                <h3>3 Simple Steps</h3>
                            </div>
                            <ul className="card-list steps-list">
                                <li>
                                    <span className="step-number">1</span>
                                    <div>
                                        <strong>Submit Your Enquiry</strong>
                                        <span>Fill the form with your details</span>
                                    </div>
                                </li>
                                <li>
                                    <span className="step-number">2</span>
                                    <div>
                                        <strong>Get Expert Guidance</strong>
                                        <span>Our counsellor will assist you</span>
                                    </div>
                                </li>
                                <li>
                                    <span className="step-number">3</span>
                                    <div>
                                        <strong>Avail the Offer</strong>
                                        <span>Get FREE laptop worth ₹50,000</span>
                                    </div>
                                </li>
                            </ul>
                            <div className="card-footer">
                                <span className="laptop-value">Laptop Value: ₹50,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Outcomes Section */}
            <section className="outcomes-section">
                <div className="container-v2">
                    <div className="outcomes-grid">
                        {outcomes.map((item, index) => (
                            <div key={index} className="outcome-card">
                                <span className="outcome-stat">{item.stat}</span>
                                <span className="outcome-label">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Eligible Programs Section - Using Mastery Section Card Style */}
            <section className="eligible-programs-section">
                <div className="mastery-container">
                    <div className="mastery-header">
                        <span className="mastery-label">Step 1</span>
                        <h2 className="mastery-title">Choose Your Program</h2>
                        <p className="section-subtitle">Select one of these programs to qualify for the offer</p>
                    </div>

                    <div className="programs-grid programs-grid-2col">
                        {eligiblePrograms.map((program, index) => (
                            <div
                                key={index}
                                className={`program-card ${program.featured ? 'program-card-featured' : ''}`}
                            >
                                <h3 className="program-title">{program.title}</h3>

                                <ul className="program-features">
                                    {program.features.map((feature, idx) => (
                                        <li key={idx} className="program-feature">
                                            <svg className="feature-check" viewBox="0 0 20 20" fill="none">
                                                <circle cx="10" cy="10" r="10" fill="#FFF7F0" />
                                                <path d="M6 10l3 3 5-6" stroke="#df6718" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="program-meta">
                                    <div className="meta-item">
                                        <span className="meta-label">Duration</span>
                                        <span className="meta-value">{program.duration}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">Training Hours</span>
                                        <span className="meta-value">{program.trainingHours}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">Certifications</span>
                                        <span className="meta-value">{program.certifications}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">Membership</span>
                                        <span className="meta-value">{program.membership}</span>
                                    </div>
                                </div>

                                <div className="program-certificate">
                                    {program.certificateImage ? (
                                        <img
                                            src={program.certificateImage}
                                            alt={`${program.title} Certificate`}
                                            className="certificate-image"
                                        />
                                    ) : (
                                        <div className="certificate-placeholder">
                                            <span>🎓</span>
                                            <span>Certificate Preview</span>
                                        </div>
                                    )}
                                </div>

                                <Link href={program.ctaLink} className="program-cta">
                                    {program.ctaText}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section className="certifications-section">
                <div className="container-v2">
                    <div className="section-header-v2">
                        <span className="section-eyebrow">Step 2</span>
                        <h2 className="section-title-v2">Add the EC-Council Certification Bundle</h2>
                        <p className="section-desc">Two globally-recognized certifications to supercharge your career</p>
                    </div>

                    <div className="certs-grid">
                        {certifications.map((cert, index) => (
                            <div key={index} className="cert-card">
                                <div className="cert-header">
                                    <span className="cert-badge">{cert.shortName}</span>
                                    <span className="cert-price">{cert.price}</span>
                                </div>
                                <h3 className="cert-title">{cert.title}</h3>
                                <p className="cert-desc">{cert.description}</p>
                                <div className="cert-highlights">
                                    {cert.highlights.map((item, i) => (
                                        <span key={i} className="cert-tag">{item}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bundle-summary">
                        <div className="bundle-calc">
                            <div className="calc-row">
                                <span>CSA Certification</span>
                                <span>₹45,000</span>
                            </div>
                            <div className="calc-row">
                                <span>CSE Certification</span>
                                <span>₹65,000</span>
                            </div>
                            <div className="calc-row total">
                                <span>Bundle Price</span>
                                <span className="bundle-price">₹1,10,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Laptop Bonus Section */}
            <section className="laptop-section-v2">
                <div className="container-v2">
                    <div className="laptop-content">
                        <div className="laptop-info">
                            <span className="section-eyebrow light">Step 3</span>
                            <h2 className="laptop-title">
                                Receive Your <span className="highlight">FREE Laptop</span>
                            </h2>
                            <p className="laptop-desc">
                                When you enroll in a Graduate or Masters program AND purchase the CSA + CSE bundle together,
                                we'll ship you a brand new laptop worth ₹50,000 – absolutely FREE!
                            </p>
                            <ul className="laptop-features">
                                <li>
                                    <span className="feature-check">✓</span>
                                    <span>High-performance laptop for security labs</span>
                                </li>
                                <li>
                                    <span className="feature-check">✓</span>
                                    <span>Pre-installed with security tools</span>
                                </li>
                                <li>
                                    <span className="feature-check">✓</span>
                                    <span>1-year manufacturer warranty</span>
                                </li>
                                <li>
                                    <span className="feature-check">✓</span>
                                    <span>Delivered within 15-20 days</span>
                                </li>
                            </ul>
                        </div>
                        <div className="laptop-visual">
                            <div className="laptop-box">
                                <span className="box-value">₹50,000</span>
                                <span className="box-label">Value</span>
                                <span className="box-tag">FREE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section-v2">
                <div className="container-v2">
                    <div className="section-header-v2">
                        <span className="section-eyebrow">Why eHack Academy</span>
                        <h2 className="section-title-v2">Built for Career Success</h2>
                    </div>

                    <div className="features-grid-v2">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card-v2">
                                <div className="feature-icon-v2">
                                    {feature.icon}
                                </div>
                                <h3 className="feature-title-v2">{feature.title}</h3>
                                <p className="feature-desc-v2">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories - Using Existing PlacementSection Component */}
            <PlacementSection />

            {/* FAQ Section */}
            <section className="faq-section-v2">
                <div className="container-v2">
                    <div className="section-header-v2">
                        <span className="section-eyebrow">FAQs</span>
                        <h2 className="section-title-v2">Common Questions</h2>
                    </div>

                    <div className="faq-container-v2">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item-v2 ${openFaq === index ? 'open' : ''}`}
                            >
                                <button
                                    className="faq-trigger"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span>{faq.question}</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="faq-content-v2">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA - Lead Generation */}
            <section className="final-cta-v2" id="enquiry">
                <div className="container-v2">
                    <div className="cta-wrapper">
                        <div className="cta-left">
                            <h2>Interested in This Offer?</h2>
                            <p>Submit your enquiry and our expert counsellors will guide you through the process</p>

                            <div className="final-price-block">
                                <div className="final-price-row">
                                    <span className="price-label">EC-Council CSA</span>
                                    <span className="price-value">₹45,000</span>
                                </div>
                                <div className="final-price-row">
                                    <span className="price-label">EC-Council CSE</span>
                                    <span className="price-value">₹65,000</span>
                                </div>
                                <div className="final-price-row highlight">
                                    <span className="price-label">Bundle Total</span>
                                    <span className="price-final">₹1,10,000</span>
                                </div>
                                <div className="final-price-row bonus">
                                    <span className="price-label">FREE Laptop Bonus</span>
                                    <span className="price-bonus">₹50,000 value</span>
                                </div>
                            </div>

                            <p className="offer-note">
                                * Our counsellors will explain how to avail this offer
                            </p>
                        </div>

                        <div className="cta-right">
                            <div className="countdown-final">
                                <span className="countdown-title">Offer ends in</span>
                                <div className="countdown-boxes">
                                    <div className="countdown-box">
                                        <span className="box-value">{String(timeLeft.days).padStart(2, '0')}</span>
                                        <span className="box-label">Days</span>
                                    </div>
                                    <div className="countdown-box">
                                        <span className="box-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                                        <span className="box-label">Hours</span>
                                    </div>
                                    <div className="countdown-box">
                                        <span className="box-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                        <span className="box-label">Mins</span>
                                    </div>
                                    <div className="countdown-box">
                                        <span className="box-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                        <span className="box-label">Secs</span>
                                    </div>
                                </div>
                            </div>

                            <div className="cta-buttons">
                                <a href="https://forms.gle/your-enquiry-form" target="_blank" rel="noopener noreferrer" className="cta-final-btn">
                                    Submit Enquiry
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </a>
                                <Link href="/contact" className="cta-final-btn secondary">
                                    Talk to Us
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </div>

                            <div className="trust-strip">
                                <span>Free counselling session</span>
                                <span>No commitment required</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
