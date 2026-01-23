'use client';

import Link from 'next/link';
import './mastery-section.css';

interface Program {
    title: string;
    features: string[];
    duration: string;
    trainingHours: string;
    certifications: string;
    membership: string;
    certificateImage?: string;
    ctaText: string;
    ctaLink: string;
    featured?: boolean;
    badge?: string;
    badgeType?: 'bestseller' | 'choice' | 'premium';
}

const programs: Program[] = [
    {
        title: 'Certified Ethical Hacker Master Program | CEHᴬᴵ v13 (3 Global Certification)',
        features: [
            "Master Real-World Ethical Hacking with AI-Powered Labs",
            "Globally Recognized, Fully Proctored Practical Certification",
            "Become Job-Ready in 5 Days with AI-Enhanced Cybersecurity Training"
        ],
        duration: '4 Months',
        trainingHours: '100 Hours',
        certifications: '3 Global Certs',
        membership: '6 Months',
        certificateImage: '/images/certificates/masterclass-1.jpeg',
        ctaText: 'Explore Program',
        ctaLink: '/programs/masterclass-ethical-hacking-ceh-v13',
        featured: false,
        badge: 'Best Selling',
        badgeType: 'bestseller'
    },
    {
        title: 'Graduate Program in Ethical Hacking and Cybersecurityᴬᴵ (2 Global Certification)',
        features: [
            "Industry-Integrated, AI-Powered Cybersecurity Curriculum",
            "Live Labs, Real Attack Simulations & Tool Mastery",
            "Career-Launch Focus with Global Certification Pathways"
        ],
        duration: '7-9 Months',
        trainingHours: '200+ Hours',
        certifications: 'CSCU, CND',
        membership: '2 Years',
        certificateImage: '/images/certificates/graduate-certificate.jpg',
        ctaText: 'Explore Program',
        ctaLink: 'programs/graduate-cybersecurity',
        featured: true,
        badge: "Student's Choice",
        badgeType: 'choice'
    },
    {
        title: 'Master’s Program in Ethical Hacking & Cybersecurityᴬᴵ (6 Global Certification)',
        features: [
            "Advanced AI-Driven Cybersecurity Mastery",
            "Real-World Cyber Range & Enterprise Attack Simulations",
            "Leadership Role - Focused Career Acceleration"
        ],
        duration: '9-12 Months',
        trainingHours: '300+ Hours',
        certifications: '6 Global Certs',
        membership: '2 Years Support',
        certificateImage: '/images/certificates/masters-certificate.jpg',
        ctaText: 'Explore Program',
        ctaLink: 'programs/masters-ethical-hacking',
        featured: false,
        badge: 'Premium Course',
        badgeType: 'premium'
    }
];

export default function MasterySection() {
    return (
        <section className="mastery-section" style={{ borderBottom: 'solid 2px orange' }} id="programs">
            <div className="mastery-container">
                <div className="mastery-header">
                    <span className="mastery-label">Comprehensive Curriculum</span>
                    <h2 className="mastery-title">Choose Your Path to Mastery</h2>
                </div>

                <div className="programs-grid">
                    {programs.map((program, index) => (
                        <div
                            key={index}
                            className={`program-card ${program.featured ? 'program-card-featured' : ''}`}
                        >
                            {program.badge && (
                                <div className={`program-badge badge-${program.badgeType}`}>
                                    {program.badge}
                                </div>
                            )}
                            <h3 className="program-title">
                                {program.title.includes('(') ? (
                                    <>
                                        {program.title.split('(')[0].trim()}
                                        <br />
                                        <span className="">({program.title.split('(')[1]}</span>
                                    </>
                                ) : (
                                    program.title
                                )}
                            </h3>

                            <ul className="program-features">
                                {program.features.map((feature, idx) => (
                                    <li key={idx} className="program-feature">
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
    );
}
