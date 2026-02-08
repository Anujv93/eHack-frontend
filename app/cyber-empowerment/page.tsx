'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Users, Shield, Smartphone, BookOpen, Award, Target, CheckCircle, Phone } from 'lucide-react';
import styles from './page.module.css';

export default function CyberEmpowermentPage() {
    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState('intro');

    const sections = [
        { id: 'intro', label: 'Overview' },
        { id: 'why-matters', label: 'Why It Matters' },
        { id: 'case-studies', label: 'Case Studies' },
        { id: 'leadership', label: 'Leadership' },
        { id: 'focus', label: 'Focus Areas' },
        { id: 'impact', label: 'Impact' },
        { id: 'audience', label: 'Who Is It For' },
        { id: 'difference', label: 'Why Us' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 400);

            const sectionElements = sections.map(s => document.getElementById(s.id));
            const scrollPosition = window.scrollY + 100;

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const section = sectionElements[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const top = element.offsetTop - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

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

    const caseStudies = [
        {
            title: "Foiling the 'KYC Update' Trap in Pune",
            image: "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?auto=format&fit=crop&q=60&w=800",
            desc: "A senior couple was targeted by a sophisticated SMS phishing scam threatening immediate bank account blockage. Having attended eHack's 'Digital Safety for Seniors' workshop, they successfully identified the urgency triggers and fake link patterns.",
            outcome: "eHack Impact: They ignored the link, contacted their bank directly, and saved their life savings of ₹15 Lakhs."
        },
        {
            title: "Escaping the 'Part-Time Job' Scam in Hyderabad",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60",
            desc: "Recent graduates were lured by fake 'work from home' offers asking for security deposits. eHack's career guidance session highlighted how legitimate companies never ask for money to hire.",
            outcome: "eHack Impact: 200+ job seekers identified the scam operation and reported it to the National Cyber Crime Portal."
        },
        {
            title: "Preventing Ransomware at a Delhi SME",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
            desc: "A healthcare clinic received a malicious 'Invoice' attachment. Thanks to eHack's employee awareness training, the receptionist identified the suspicious sender extension (.exe instead of .pdf) and alerted IT immediately.",
            outcome: "eHack Impact: A potential ransomware attack was thwarted, protecting sensitive patient data and ₹50L in demands."
        }
    ];

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero} style={{ backgroundImage: "url('https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
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

            <nav className={`${styles.stickyNav} ${isSticky ? styles.stickyNavActive : ''}`}>
                <div className={styles.navContainer}>
                    <div className={styles.navLinks}>
                        {sections.map(section => (
                            <button
                                key={section.id}
                                className={`${styles.navBtn} ${activeSection === section.id ? styles.navBtnActive : ''}`}
                                onClick={() => scrollToSection(section.id)}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>
                    <div className={styles.navCta}>
                        <a href="tel:+919886035330" className={styles.navCallBtn}>
                            <Phone size={16} />
                            <span>Call Now</span>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Introduction Section */}
            <section id="intro" className={styles.introSection}>
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
                                    src="https://images.pexels.com/photos/3771097/pexels-photo-3771097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
            <section id="why-matters" className={styles.whySection}>
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

            {/* Case Studies Section */}
            <section id="case-studies" className={styles.caseStudiesSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>
                        Real Stories, <span className={styles.textAccent}>Real Impact</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        See how our initiatives are making a tangible difference in people's digital lives.
                    </p>
                    <div className={styles.caseStudiesGrid}>
                        {caseStudies.map((study, index) => (
                            <div key={index} className={styles.caseStudyCard}>
                                <div className={styles.caseStudyImageWrapper}>
                                    <img src={study.image} alt={study.title} className={styles.caseStudyImage} />
                                </div>
                                <div className={styles.caseStudyContent}>
                                    <h3 className={styles.caseStudyTitle}>{study.title}</h3>
                                    <p className={styles.caseStudyDesc}>{study.desc}</p>
                                    <div className={styles.caseStudyOutcome}>
                                        <strong>Key Outcome</strong>
                                        <p>{study.outcome}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section id="leadership" className={styles.leadershipSection}>
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
            <section id="focus" className={styles.focusSection}>
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
            <section id="impact" className={styles.statsSection}>
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
            <section id="audience" className={styles.audienceSection}>
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
            <section id="difference" className={styles.differenceSection}>
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
