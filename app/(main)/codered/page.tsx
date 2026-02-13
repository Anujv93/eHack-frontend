'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Award, Target, TrendingUp, Users, Building2 } from 'lucide-react';
import './page.css';

export default function CodeRedPage() {
    const [activeTab, setActiveTab] = useState('overview');

    const features = [
        {
            title: 'New Videos & Courses Every Month',
            description: 'Stay updated with fresh cybersecurity content added monthly by top industry experts.'
        },
        {
            title: 'Anytime, Anywhere & Any Device',
            description: 'Stream world-class cybersecurity videos online from any device at your convenience.'
        },
        {
            title: 'Practical Labs Included',
            description: 'Hands-on learning with iLabs included in Microdegrees for real-world experience.'
        }
    ];

    const keyHighlights = [
        'Hands-on Learning on Latest Cybersecurity Topics',
        'One platform for all Cybersecurity Updates with Certificate of Attendance for every course',
        'Ability to delve deeper into comprehensive topics with Microdegrees and earn Certificate of Completion',
        'New Videos & Courses Every Month',
        'Practical Labs Included in Microdegrees (selected courses)'
    ];

    const courses = [
        {
            title: 'Capture the Flag',
            description: 'Strengthen your pentesting skills through capture the flag exercises with walkthroughs',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/8Z8QkXF5/4yFBnkZGVaDbxF6f',
            category: 'Ethical Hacking',
            level: 'Intermediate',
            image: '/images/Capture the Flag.jpg'
        },
        {
            title: 'Bug Bounty Hunting Essentials',
            description: 'Practical bug bounty hunting for hackers and pentesters with top tools and tricks',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/Us775v10/4yFBnkZGVaDbxF6f',
            category: 'Bug Bounty',
            level: 'Intermediate',
            image: '/images/Bug Bounty Hunting Essentials.jpg'
        },
        {
            title: 'The Ultimate JavaScript Bundle',
            description: 'Complete JavaScript learning path from HTML, CSS to full-stack development',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/GREtvqs8/4yFBnkZGVaDbxF6f',
            category: 'Web Development',
            level: 'Beginner',
            image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Master Open-Source Intelligence',
            description: 'Advanced OSINT techniques for hackers and penetration testers',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/KtG5Oefw/4yFBnkZGVaDbxF6f',
            category: 'OSINT',
            level: 'Advanced',
            image: '/images/Master Open-Source Intelligence.jpg'
        },
        {
            title: 'Mastering Digital Forensics',
            description: 'Linux forensics, digital forensics for pentesters, and computer forensics best practices',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/exNKMTJD/4yFBnkZGVaDbxF6f',
            category: 'Digital Forensics',
            level: 'Advanced',
            image: '/images/services/forensics.png'
        },
        {
            title: 'EC-Council Pro',
            description: 'Get access to the world\'s largest online cybersecurity course library of 500+ courses',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/qYBOo7gz/4yFBnkZGVaDbxF6f',
            category: 'All-Access',
            level: 'All Levels',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Ultimate Red Team Cyber Suite',
            description: 'Build new skills with comprehensive red team operations and offensive security',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/cOXfXsOF/4yFBnkZGVaDbxF6f',
            category: 'Red Team',
            level: 'Advanced',
            image: '/images/Red Team Assessment.png'
        },
        {
            title: 'Unleash the Power of Linux',
            description: 'Master app development, server configuration, and networking with Linux',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/drAJcC5r/4yFBnkZGVaDbxF6f',
            category: 'Linux',
            level: 'Intermediate',
            image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Protecting Data in Microsoft Azure',
            description: 'Master data protection techniques and leverage Microsoft\'s robust security features in Azure',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/XavEAgzZ/4yFBnkZGVaDbxF6f',
            category: 'Cloud Security',
            level: 'Advanced',
            image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Adopting Security and Privacy in Data',
            description: 'Become a data protection expert with GDPR compliance and privacy by design',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/jXN1lRJI/4yFBnkZGVaDbxF6f',
            category: 'Data Privacy',
            level: 'Advanced',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Practical Linux for Security Professionals',
            description: 'Essential Linux skills tailored for cybersecurity and security professionals',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/t8OKNu7M/4yFBnkZGVaDbxF6f',
            category: 'Linux Security',
            level: 'Intermediate',
            image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Becoming a Digital Imaging Professional',
            description: 'Master digital imaging techniques and professional image processing',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/2nAm7Z25/4yFBnkZGVaDbxF6f',
            category: 'Digital Imaging',
            level: 'Intermediate',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Become a Full Stack Developer',
            description: 'Complete full-stack development training from frontend to backend',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/SV1zRMWk/4yFBnkZGVaDbxF6f',
            category: 'Web Development',
            level: 'Intermediate',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Practical Artificial Intelligence for Professionals',
            description: 'Hands-on AI and machine learning for cybersecurity professionals',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/Aydst144/4yFBnkZGVaDbxF6f',
            category: 'AI & ML',
            level: 'Advanced',
            image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Cybersecurity Project Manager',
            description: 'Master project management skills specific to cybersecurity initiatives',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/X24n021f/4yFBnkZGVaDbxF6f',
            category: 'Management',
            level: 'Intermediate',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Integrating Security into IoT',
            description: 'Secure Internet of Things devices and implement IoT security best practices',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/nEnsKy1N/4yFBnkZGVaDbxF6f',
            category: 'IoT Security',
            level: 'Advanced',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Becoming a DevOps Professional',
            description: 'Master DevOps practices, tools, and automation for modern infrastructure',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/Lv8zzscM/4yFBnkZGVaDbxF6f',
            category: 'DevOps',
            level: 'Intermediate',
            image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Becoming a Network Security Engineer',
            description: 'Comprehensive network security engineering and defense strategies',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/RedV2cky/4yFBnkZGVaDbxF6f',
            category: 'Network Security',
            level: 'Advanced',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Cybersecurity Fundamentals for Beginners',
            description: 'Introduction to cybersecurity with hands-on learning covering malware, attacks, and OWASP Top 10',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/kZ3W4tGD/4yFBnkZGVaDbxF6f',
            category: 'Fundamentals',
            level: 'Beginner',
            image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Programming Fundamentals and Security',
            description: 'Secure programming with C, C++, and Java for high-level developers',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/miFznW0d/4yFBnkZGVaDbxF6f',
            category: 'Secure Coding',
            level: 'Intermediate',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Cybersecurity Super Sale',
            description: 'Get premium cybersecurity courses at special pricing',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/YMBjh8vp/4yFBnkZGVaDbxF6f',
            category: 'Special Offer',
            level: 'All Levels',
            image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'EC-Council Learning Platform',
            description: 'Access the complete EC-Council learning platform with flexible plans',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/fAlnap6P/4yFBnkZGVaDbxF6f',
            category: 'Platform Access',
            level: 'All Levels',
            image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'EC-Council Pro - Premium Access',
            description: 'Get access to 500+ courses covering all cybersecurity domains',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/aFTKoM4O/4yFBnkZGVaDbxF6f',
            category: 'All-Access',
            level: 'All Levels',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'ChatGPT for Ethical Hackers',
            description: 'Learn to leverage ChatGPT and AI tools for ethical hacking and penetration testing',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/gzESbpRe/4yFBnkZGVaDbxF6f',
            category: 'AI for Hacking',
            level: 'Intermediate',
            image: '/images/ChatGPT for Ethical Hackers.png'
        },
        {
            title: 'Full Stack Development Specialist',
            description: 'Advanced full-stack development with modern frameworks and technologies',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/Iq2xwZf4/4yFBnkZGVaDbxF6f',
            category: 'Web Development',
            level: 'Advanced',
            image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Practical Linux for Security Professionals',
            description: 'Advanced Linux administration and security for cybersecurity professionals',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/Ud41TTh2/4yFBnkZGVaDbxF6f',
            category: 'Linux Security',
            level: 'Advanced',
            image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Practical Information Security Risk Management',
            description: 'Master information security risk assessment and management frameworks',
            affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/zd8IqN9W/4yFBnkZGVaDbxF6f',
            category: 'Risk Management',
            level: 'Advanced',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
        }
    ];

    const pillars = [
        {
            title: 'Ultra High-Quality Content',
            icon: Award,
            description: 'Premium courses from industry leaders'
        },
        {
            title: 'Skill Oriented',
            icon: Target,
            description: 'Practical, hands-on learning approach'
        },
        {
            title: 'Build Perpetual Skill Sets',
            icon: TrendingUp,
            description: 'Future-proof your career'
        },
        {
            title: 'Experts Only',
            icon: Users,
            description: 'Learn from certified professionals'
        },
        {
            title: 'Enterprise Courses',
            icon: Building2,
            description: 'Industry-standard training'
        }
    ];




    return (
        <>
            {/* Hero Section */}
            <section className="codered-hero-clean">
                <div className="hero-clean-bg">
                    <img src="/images/codered-hero-new.jpg" alt="Background" className="hero-bg-img" />
                    <div className="hero-overlay-gradient"></div>
                </div>

                <div className="container">
                    <div className="hero-clean-content">
                        <div className="clean-brand-header">
                            <span className="clean-code">CODE</span>
                            <span className="clean-red">RED</span>
                        </div>

                        <h1 className="hero-title-clean">
                            Cybersecurity courses
                            <br />
                            for the real world
                        </h1>

                        <p className="hero-subtitle-clean">
                            Get certified with the industry leaders in
                            <br />
                            cybersecurity training
                        </p>

                        <div className="hero-actions-clean">
                            <a href="#register" className="btn-clean-primary">
                                GET TRAINING!
                            </a>
                            <a href="https://codered.eccouncil.org" target="_blank" rel="noopener noreferrer" className="btn-clean-outline">
                                View Platform
                            </a>
                        </div>
                    </div>
                </div>

                <div className="hero-trust-bar">
                    <div className="container">
                        <div className="trust-bar-content">
                            <span className="trust-text">Trusted by 400,000+ Certified Professionals Worldwide</span>
                            <div className="trust-rating">
                                <span className="rating-score">4.7</span>
                                <div className="stars">★★★★★</div>
                                <span className="rating-platform">Trustpilot</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Pillars Section */}
            <section className="codered-pillars">
                <div className="container">
                    <div className="pillars-grid">
                        {pillars.map((pillar, index) => {
                            const IconComponent = pillar.icon;
                            return (
                                <div key={index} className="pillar-item">
                                    <div className="pillar-icon">
                                        <IconComponent size={32} strokeWidth={2} />
                                    </div>
                                    <h3 className="pillar-title">{pillar.title}</h3>
                                    <p className="pillar-description">{pillar.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="codered-highlights">
                <div className="container">
                    <div className="highlights-grid">
                        <div className="highlights-left">
                            <span className="section-badge">KEY HIGHLIGHTS</span>
                            <h2 className="highlights-title">
                                Stream World-class<br />
                                Cybersecurity Videos Online<br />
                                <span className="accent-text">Anytime. Anywhere.</span>
                            </h2>
                        </div>
                        <div className="highlights-right">
                            <ul className="highlights-list">
                                {keyHighlights.map((highlight, index) => (
                                    <li key={index} className="highlight-item">
                                        <span className="check-icon">✓</span>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="codered-features">
                <div className="container">
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section id='courses-grid' className="codered-microdegrees">
                <div className="container">
                    <div className="microdegrees-header">
                        <span className="section-badge">AVAILABLE COURSES</span>
                        <h2 className="section-title">EC-Council CodeRed Certifications</h2>
                        <p className="section-subtitle">
                            Choose from 27 industry-recognized cybersecurity certifications
                            <br />
                            <span className="subtitle-accent">Access world-class training with CodeRed subscription</span>
                        </p>
                    </div>

                    <div className="microdegrees-grid-new">
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className="microdegree-card-new available"
                                style={{ '--card-index': index } as React.CSSProperties}
                            >
                                <div className="card-image-wrapper">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="card-image"
                                    />
                                </div>
                                {/* Category Tag */}
                                <div className="card-category">{course.category}</div>

                                {/* Main Content */}
                                <div className="card-main-content">
                                    <h3 className="card-title">{course.title}</h3>
                                    <p className="card-description">{course.description}</p>
                                </div>

                                {/* Stats Row */}
                                <div className="card-stats">
                                    <div className="stat">
                                        <span className="stat-value">{course.level}</span>
                                        <span className="stat-label">Level</span>
                                    </div>
                                    <div className="stat-divider"></div>
                                    <div className="stat">
                                        <span className="stat-value">EC-Council</span>
                                        <span className="stat-label">Provider</span>
                                    </div>
                                </div>

                                {/* Features Row */}
                                <div className="card-features">
                                    <span className="feature-tag cert">
                                        <span className="feature-dot"></span>
                                        Certificate
                                    </span>
                                    <span className="feature-tag labs">
                                        <span className="feature-dot"></span>
                                        Online Access
                                    </span>
                                </div>

                                {/* CTA */}
                                <div className="card-cta">
                                    <a
                                        href={course.affiliateLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cta-button"
                                    >
                                        <span>Enroll Now</span>
                                        <span className="cta-arrow">→</span>
                                    </a>
                                </div>

                                {/* Decorative Elements */}
                                <div className="card-glow"></div>
                                <div className="card-corner-accent"></div>
                            </div>
                        ))}
                    </div>

                    {/* Section Footer */}
                    <div className="microdegrees-footer">
                        <div className="footer-stats">
                            <div className="footer-stat">
                                <span className="footer-stat-number">27</span>
                                <span className="footer-stat-label">Certifications</span>
                            </div>
                            <div className="footer-stat">
                                <span className="footer-stat-number">400K+</span>
                                <span className="footer-stat-label">Certified Professionals</span>
                            </div>
                            <div className="footer-stat">
                                <span className="footer-stat-number">9000+</span>
                                <span className="footer-stat-label">Training Videos</span>
                            </div>
                        </div>
                        <p className="footer-note">
                            All courses include access to CodeRed platform with certificates of attendance
                        </p>
                    </div>
                </div>
            </section>

            {/* Certificate Section */}
            <section className="codered-certificate">
                <div className="container">
                    <div className="certificate-content">
                        <div className="certificate-info">
                            <span className="section-badge">RECOGNITION</span>
                            <h2 className="section-title">Certificate of Attendance</h2>
                            <p className="certificate-description">
                                Earn a Certificate of Attendance for every course you complete.
                                Showcase your continuous learning journey to employers and stand out
                                in the competitive cybersecurity job market.
                            </p>
                            <ul className="certificate-benefits">
                                <li>✓ Globally recognized EC-Council certification</li>
                                <li>✓ Digital and printable formats</li>
                                <li>✓ Shareable on LinkedIn and other platforms</li>
                                <li>✓ Verifiable online</li>
                            </ul>
                        </div>
                        <div className="certificate-preview">
                            <div className="certificate-image-wrapper">
                                <img
                                    src="/images/codered-certificate.jpg"
                                    alt="CodeRed Certificate of Attendance"
                                    className="cert-img"
                                />
                                <div className="cert-glow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="codered-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Elevate Your Cybersecurity Skills?</h2>
                        <p>Join thousands of cyber professionals who are staying ahead with CodeRed</p>
                        <div className="cta-buttons">
                            <a href="#courses-grid" className="btn-primary-cta">
                                Start Learning Today
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
