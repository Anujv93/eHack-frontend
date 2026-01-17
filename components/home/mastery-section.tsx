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
}

const programs: Program[] = [
    {
        title: 'Certified Ethical Hacker Master Program | CEHᴬᴵ v13 (3 Global Certification)',
        features: [
            "Build expertise in ethical hacking with the world's #1 certification (CEH v13)",
            '3 Global EC-Council Certifications: CEH, CEH Practical, CEH Master',
            'Real-time labs with EC-Council tools & 6 months free membership'
        ],
        duration: '4 Months',
        trainingHours: '100 Hours',
        certifications: '3 Global Certs',
        membership: '6 Months',
        certificateImage: '/images/certificates/masterclass-1.jpeg',
        ctaText: 'Explore Program',
        ctaLink: '/programs/masterclass-ethical-hacking-ceh-v13',
        featured: false
    },
    {
        title: 'Graduate Program in Ethical Hacking and Cybersecurityᴬᴵ (2 Global Certification)',
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
        ctaLink: 'programs/graduate-cybersecurity',
        featured: true
    },
    {
        title: 'Master’s Program in Ethical Hacking & Cybersecurityᴬᴵ (3 Global Certification)',
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
        ctaLink: 'programs/masters-ethical-hacking',
        featured: false
    }
];

export default function MasterySection() {
    return (
        <section className="mastery-section" id="programs">
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
                            <h3 className="program-title">{program.title}</h3>

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
