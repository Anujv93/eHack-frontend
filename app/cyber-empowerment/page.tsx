'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Shield, Smartphone, BookOpen, Award, Target, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export default function CyberEmpowermentPage() {
    const impactStats = [
        { value: '1000+', label: 'Participants Impacted' },
        { value: '100+', label: 'Sessions Conducted' },
        { value: '50+', label: 'Institutions Engaged' },
        { value: '90%', label: 'Confidence Increase' },
    ];

    const focusAreas = [
        { icon: <Shield size={28} />, title: 'Cyber Safety & Online Fraud Awareness' },
        { icon: <Smartphone size={28} />, title: 'Safe Usage of UPI, Internet Banking & Digital Payments' },
        { icon: <Users size={28} />, title: 'Social Media Safety & Privacy Protection' },
        { icon: <BookOpen size={28} />, title: 'Cyber Laws & Digital Responsibility' },
        { icon: <Target size={28} />, title: 'Career Awareness in Cyber Security for Youth' },
        { icon: <Award size={28} />, title: 'Introduction to Ethical Hacking & AI in Cyber Security' },
    ];

    const audiences = [
        {
            title: 'Youngsters & Students',
            items: [
                'Cyber Security career awareness',
                'Hands-on exposure to ethical hacking basics',
                'Industry-aligned learning guidance'
            ]
        },
        {
            title: 'Working Professionals',
            items: [
                'Digital safety at workplace',
                'Data protection & cyber hygiene',
                'Secure remote work practices'
            ]
        },
        {
            title: 'Aged People & Senior Citizens',
            items: [
                'Protection from online frauds and scams',
                'Safe use of smartphones, UPI, and social media',
                'Simple, non-technical explanations'
            ]
        }
    ];

    const impactHighlights = [
        'Students Gained Career Clarity in Cyber Security & Ethical Hacking',
        'Senior Citizens Trained to identify fraud calls, phishing links, and fake messages',
        'Parents & Homemakers Empowered with safe digital practices',
        'Institutions & Colleges Engaged for awareness-driven learning'
    ];

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <div style={{ marginBottom: '2rem' }}></div>
                    <span className={styles.heroBadge}>A New Initiative by eHack Academy, Bangalore</span>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.heroHighlight}>Cyber</span> Empowerment for All
                    </h1>
                    {/* <p className={styles.heroSubtitle}>
                        Empowering Young Minds & Experienced Lives in the Digital World
                    </p> */}
                </div>
            </section>

            {/* Introduction Section */}
            <section className={styles.introSection}>
                <div className={styles.container}>
                    <div className={styles.introContent}>
                        <div className={styles.introSplit}>
                            <div className={styles.introTextWrapper}>
                                <h2 className={styles.sectionTitle} style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                    Empowering <span className={styles.textAccent}>Young Minds</span> & <span className={styles.textAccent}>Experienced Lives</span> in the Digital World
                                </h2>
                                <p className={styles.introParagraph} style={{ textAlign: 'left' }}>
                                    In today's fast-evolving digital era, cyber awareness and cyber skills are no longer optional—they are
                                    essential. eHack Academy, Bangalore proudly launches <strong>Cyber Empowerment for All</strong>, a unique initiative
                                    designed to empower youngsters, working professionals, homemakers, senior citizens, and aged
                                    individuals with the knowledge and confidence to thrive safely and smartly in the digital world.
                                </p>
                            </div>
                            <div className={styles.introImageWrapper}>
                                <img
                                    src="/impowerment-2.png"
                                    alt="Empowering Young Minds & Experienced Lives"
                                    className={styles.introImage}
                                />
                            </div>
                        </div>

                        <div className={styles.beliefBox}>
                            <p>
                                This initiative is driven by a simple but powerful belief:
                            </p>
                            <blockquote>
                                "Cyber security awareness and digital confidence should be accessible to everyone,
                                irrespective of age or background."
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why It Matters Section */}
            <section className={styles.whySection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>
                        Why Cyber Empowerment <span className={styles.textAccent}>Matters Today</span>
                    </h2>
                    <div className={styles.whyGrid}>
                        <div className={styles.whyCard}>
                            <p>Rising cyber frauds, online scams, and digital crimes</p>
                        </div>
                        <div className={styles.whyCard}>
                            <p>Increased dependence on online banking, UPI, social media, and e-governance</p>
                        </div>
                        <div className={styles.whyCard}>
                            <p>Lack of structured cyber awareness for non-technical users</p>
                        </div>
                        <div className={styles.whyCard}>
                            <p>Growing interest among youngsters to build careers in Cyber Security</p>
                        </div>
                    </div>
                    <p className={styles.whyConclusion}>
                        <strong>Cyber Empowerment for All</strong> bridges this gap by combining awareness, hands-on learning, and real-world guidance in a simple, relatable, and practical manner.
                    </p>
                </div>
            </section>

            {/* Leadership Section */}
            <section className={styles.leadershipSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>
                        Leadership & <span className={styles.textAccent}>Vision</span>
                    </h2>
                    <div className={styles.leaderCard}>
                        <div className={styles.leaderInfo}>
                            <h3>Ms. Smitha C</h3>
                            <span className={styles.leaderRole}>Center Head – eHack Academy, Bangalore</span>
                            <p>
                                With a strong passion for education and community upliftment, Ms. Smitha C leads this initiative with a
                                people-first approach. Under her leadership, eHack Academy has successfully delivered cyber awareness
                                programs, free webinars, and skill-based sessions that have positively impacted students, professionals,
                                and senior citizens alike.
                            </p>
                            <div className={styles.visionBox}>
                                <strong>Her Vision:</strong>
                                <p>To create a cyber-aware society where people use technology with confidence, responsibility, and security.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Focus Areas Section */}
            <section className={styles.focusSection}>
                <div className={styles.container}>
                    <span className={styles.sectionBadge}>Key Focus Areas Covered</span>
                    <h2 className={styles.sectionTitle}>
                        Free Webinars & Seminars – <span className={styles.textAccent}>Creating Real Impact</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        As part of this initiative, eHack Academy has conducted multiple free cyber awareness webinars and
                        seminars across colleges, institutions, communities, and corporate groups.
                    </p>
                    <div className={styles.focusGrid}>
                        {focusAreas.map((area, index) => (
                            <div key={index} className={styles.focusCard}>
                                <div className={styles.focusIcon}>{area.icon}</div>
                                <h4>{area.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Stats Section */}
            <section className={styles.statsSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>
                        Impact Created <span className={styles.textAccent}>So Far</span>
                    </h2>
                    <div className={styles.statsGrid}>
                        {impactStats.map((stat, index) => (
                            <div key={index} className={styles.statCard}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.impactHighlights}>
                        {impactHighlights.map((highlight, index) => (
                            <div key={index} className={styles.highlightItem}>
                                <CheckCircle size={20} className={styles.checkIcon} />
                                <span>{highlight}</span>
                            </div>
                        ))}
                        <p className={styles.highlightNote}>
                            Participants reported increased confidence in using smartphones, online payments, and
                            social media—while being more alert to cyber threats.
                        </p>
                    </div>
                </div>
            </section>

            {/* Audience Section */}
            <section className={styles.audienceSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>
                        Who Is This Initiative <span className={styles.textAccent}>For?</span>
                    </h2>
                    <div className={styles.audienceGrid}>
                        {audiences.map((audience, index) => (
                            <div key={index} className={styles.audienceCard}>
                                <h3>{audience.title}</h3>
                                <ul>
                                    {audience.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*What Makes eHack Academy*/}
            <section className={styles.differenceSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>
                        What Makes eHack Academy <span className={styles.textAccent}>Different</span>
                    </h2>
                    <div className={styles.differenceGrid}>
                        <div className={styles.differenceItem}>
                            <span className={styles.differenceIcon}>
                                <Award size={24} />
                            </span>
                            <span>Industry-driven Cyber Security training institute</span>
                        </div>
                        <div className={styles.differenceItem}>
                            <span className={styles.differenceIcon}>
                                <Award size={24} />
                            </span>
                            <span>Practical, hands-on learning approach</span>
                        </div>
                        <div className={styles.differenceItem}>
                            <span className={styles.differenceIcon}>
                                <Award size={24} />
                            </span>
                            <span>Community-focused awareness initiatives</span>
                        </div>
                        <div className={styles.differenceItem}>
                            <span className={styles.differenceIcon}>
                                <Award size={24} />
                            </span>
                            <span>Experienced trainers and mentors</span>
                        </div>
                        <div className={styles.differenceItem}>
                            <span className={styles.differenceIcon}>
                                <Award size={24} />
                            </span>
                            <span>Strong commitment to social responsibility and digital inclusion</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div className={styles.ctaContent}>
                        <h2>Join the Cyber Empowerment Movement</h2>
                        <p>
                            We invite schools, colleges, residential communities, NGOs, corporates, and social groups to partner
                            with us in spreading cyber awareness and digital empowerment.
                        </p>
                        <p className={styles.ctaTagline}>
                            <strong>Together, let's build a safer, smarter, and cyber-aware society.</strong>
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="/inquiry" className={styles.ctaPrimaryBtn}>
                                Partner With Us
                            </Link>
                            <Link href="/csr" className={styles.ctaSecondaryBtn}>
                                Explore CSR Initiatives
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Info */}
            <section className={styles.footerInfo}>
                <div className={styles.container}>
                    <div className={styles.footerContent}>
                        <h3>eHack Academy, Bangalore</h3>
                        <p>Empowering Digital Excellence</p>
                        <span className={styles.footerTags}>Bangalore | Cyber Security • Awareness • Training • Empowerment</span>
                        <p className={styles.footerTagline}>
                            <strong>Cyber Empowerment for All</strong> – Because Safety and Knowledge Belong to Everyone.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
