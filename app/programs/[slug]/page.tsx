'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { programs, getProgramBySlug } from '@/data/programs';
import { BriefcaseBusiness, CheckCircle, ArrowRight, Phone, Star, FileText, Gem, Banknote, Landmark, Shield, CreditCard } from 'lucide-react';
import './program.css';
import PlacementSection from '@/components/home/placement-section';
import { ProgramLabsWrapper } from '@/components/global/certificate-labs/ProgramLabsWrapper';
import InquiryForm from '@/components/global/inquiry-form/inquiry-form';
import ProgramToolsSection from '@/components/programs/program-tools-section';

// Navigation sections configuration
const NAV_SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'career', label: 'Career' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'structure', label: 'Who Should Enroll' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'labs', label: 'Hands-On Labs' },
    { id: 'pricing', label: 'Investment' },
    { id: 'faq', label: 'FAQ' },
];

const getHeroImage = (category: string, slug: string) => {
    // Specific program based images
    if (slug === 'masters-ethical-hacking') return '/images/programs/masters-hero-bg.jpg';
    if (slug === 'graduate-cybersecurity') return '/images/programs/graduate-hero-bg.jpg';
    if (slug === 'masterclass-ethical-hacking-ceh-v13') return '/images/programs/ceh-master-hero-bg.jpg';
    if (slug === 'data-science-analytics') return '/images/programs/data-science-hero-bg.jpg';
    if (slug === 'digital-marketing-masterprogram') return '/images/programs/digital-marketing-hero-bg.jpg';
    if (slug === 'robotics-for-all') return '/images/programs/robotics-hero-bg.jpg';
    if (slug === 'personality-softskill-development') return '/images/programs/softskills-hero-bg.jpg';
    if (slug === 'internship-program') return 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80';

    // Fallbacks
    if (category === 'data-science') return '/images/programs/data-science-hero-bg.jpg';
    if (category === 'robotics-iot') return '/images/programs/robotics-hero-bg.jpg';
    if (category === 'digital-marketing') return '/images/programs/digital-marketing-hero-bg.jpg';
    if (slug.includes('corporate')) return '/images/corporate.jpeg';

    return '/images/programs/masters-hero-bg.jpg';
};

export default function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    const [program, setProgram] = useState<typeof programs[0] | null>(null);
    const [activeCategory, setActiveCategory] = useState(0);
    const [openQuestion, setOpenQuestion] = useState<number | null>(0);
    const [activeModule, setActiveModule] = useState(0);
    const [activeSection, setActiveSection] = useState('overview');
    const [showStickyNav, setShowStickyNav] = useState(false);
    const stickyNavRef = useRef<HTMLDivElement>(null);

    // Handle scroll to update active section and sticky nav visibility
    useEffect(() => {
        const handleScroll = () => {
            // Show sticky nav after scrolling past the stats bar (approximately 500px)
            const scrollY = window.scrollY;
            setShowStickyNav(scrollY > 500);

            // Find which section is currently in view
            const sectionElements = NAV_SECTIONS.map(section => ({
                id: section.id,
                element: document.getElementById(section.id),
            })).filter(s => s.element);

            const viewportHeight = window.innerHeight;
            const offset = 150; // Account for sticky nav height

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const { id, element } = sectionElements[i];
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= offset + viewportHeight * 0.3) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to section
    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Height of sticky nav
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, []);

    useEffect(() => {
        params.then(p => {
            const foundProgram = getProgramBySlug(p.slug);
            if (foundProgram) {
                setProgram(foundProgram);
            }
        });
    }, [params]);

    if (!program) {
        return <div className="program-page loading">Loading...</div>;
    }

    const toggleQuestion = (idx: number) => {
        setOpenQuestion(openQuestion === idx ? null : idx);
    };

    const toggleModule = (idx: number) => {
        setActiveModule(activeModule === idx ? -1 : idx);
    };

    const programType = program.slug.includes('digital-marketing') ? 'digital-marketing' :
        program.slug.includes('robotics') ? 'robotics' :
            program.slug.includes('internship') ? 'internship' : 'cybersecurity';

    return (
        <div className="program-page">
            {/* 1. HERO SECTION - Attention + Lead Capture */}
            <section className={`hero-section ${program.slug === 'robotics-for-all' ? 'hero-robotics' :
                program.slug === 'personality-softskill-development' ? 'hero-softskills' :
                    program.slug === 'digital-marketing-masterprogram' ? 'hero-digital-marketing' :
                        program.slug === 'data-science-analytics' ? 'hero-data-science' :
                            program.slug === 'masters-ethical-hacking' ? 'hero-masters' :
                                program.slug === 'graduate-cybersecurity' ? 'hero-graduate' :
                                    program.slug === 'masterclass-ethical-hacking-ceh-v13' ? 'hero-ceh-master' :
                                        program.slug === 'internship-program' ? 'hero-internship' : ''
                }`} id="overview">
                <div className="hero-background">
                    <div className="hero-overlay"></div>
                    <div
                        className="hero-image"
                        style={{
                            backgroundImage: `url('${getHeroImage(program.category, program.slug)}')`
                        }}
                    />
                </div>
                <div className="hero-container">
                    <div className="hero-content">

                        <h1 className="hero-title">
                            {program.title.includes('Ethical Hacking') ? (
                                <>
                                    {program.title.split('Ethical Hacking')[0]}
                                    <span className="text-accent">Ethical Hacking & Cyber Security</span>
                                </>
                            ) : program.title.includes('Digital Marketing') ? (
                                <>
                                    {program.title.split('Digital Marketing')[0]}
                                    <span className="text-accent">Digital Marketing</span>
                                </>
                            ) : program.title.includes('Internship') ? (
                                <>
                                    {program.title.split('Internship')[0]}
                                    <span className="text-accent">Internship Program</span>
                                </>
                            ) : (
                                program.title
                            )}
                            <span className="cert-count">{program.subtitle}</span>
                        </h1>

                        <p className="hero-description">{program.description}</p>
                        <p className="hero-features">{program.features}</p>

                        <div className="batch-info">
                            <span className="batch-label">NEXT BATCH STARTS</span>
                            <span className="batch-date">{program.batchInfo}</span>
                        </div>
                    </div>

                    <InquiryForm
                        courseName={program.title}
                        courseCode={program.slug}
                        variant="hero"
                        title="Get Course Information"
                        subtitle="Our counselor will call you within 2 hours"
                    />
                </div>
            </section>

            {/* 2. STATS BAR - Quick Credibility */}
            <section className="stats-bar">
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-label">START DATE</span>
                        <div className="stat-value" dangerouslySetInnerHTML={{ __html: program.stats.startDate.replace(/(\d+)(th|st|nd|rd)/, '<strong>$1$2</strong>') }} />
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">DURATION</span>
                        <div className="stat-value" dangerouslySetInnerHTML={{ __html: program.stats.duration.replace(/(\d+-?\d*)/g, '<strong>$1</strong>') }} />
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">MODE</span>
                        <div className="stat-value" dangerouslySetInnerHTML={{ __html: program.stats.mode.replace(/^([^+]+)/, '<strong>$1</strong>') }} />
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">TOTAL HOURS</span>
                        <div className="stat-value" dangerouslySetInnerHTML={{ __html: program.stats.totalHours.replace(/(\d+\+?)/g, '<strong>$1</strong>') + ' Hours' }} />
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">MEMBERSHIP</span>
                        <div className="stat-value" dangerouslySetInnerHTML={{ __html: program.stats.membership.replace(/(\d+\s+\w+)/g, '<strong>$1</strong>') }} />
                    </div>
                </div>
            </section>

            {/* 3. SCHEDULE BAR */}
            <section className="schedule-bar">
                <div className="banner-container">
                    <span className="schedule-badge">Schedule Options</span>
                    <span className="cert-text">{program.schedule}</span>
                </div>
            </section>

            {/* STICKY SECTION NAVIGATION */}
            <nav
                ref={stickyNavRef}
                className={`sticky-section-nav ${showStickyNav ? 'visible' : ''}`}
            >
                <div className="sticky-nav-container">
                    <div className="sticky-nav-links">
                        {NAV_SECTIONS
                            .filter(section => section.id !== 'labs' || !['data-science', 'robotics-iot', 'digital-marketing', 'internship'].includes(program.category))
                            .map((section) => (
                                <button
                                    key={section.id}
                                    className={`sticky-nav-link ${activeSection === section.id ? 'active' : ''}`}
                                    onClick={() => scrollToSection(section.id)}
                                >
                                    {section.label}
                                </button>
                            ))}
                    </div>
                    <div className="sticky-nav-cta">
                        <a href="tel:+919886035330" className="sticky-nav-call-btn">
                            <Phone size={16} />
                            <span>Call Now</span>
                        </a>
                    </div>
                </div>
            </nav>

            {!['data-science', 'robotics-iot', 'digital-marketing', 'personality-softskills'].includes(program.category) && <PlacementSection />}

            {/* 5. COMBINED ROI + JOB ROLES - Career Value Proposition */}
            {program.category !== 'personality-softskills' && (
                <section className="roi-section" id="career">
                    <div className="section-container">
                        <h2 className="roi-title">
                            {(() => {
                                const title = program.careerROI?.title || 'Great Career';
                                const words = title.split(' ');
                                const lastWord = words.pop();
                                return (
                                    <>
                                        {words.join(' ')} <span className="text-accent">{lastWord}</span>
                                    </>
                                );
                            })()}
                        </h2>
                        <p className="roi-subtitle">{program.careerROI?.subtitle || "This program equips you with advanced skills essential for protecting organizations."}</p>

                        <div className="roi-grid">
                            <div className="salary-card">
                                <h3 className="roi-section-title"><span className="text-accent">Earning</span> {(program.careerROI?.chartTitle || 'Potential').replace('Earning ', '')}</h3>
                                <p className="salary-stat">{program.careerROI?.salaryIntro || 'Professionals in this field are in high demand with competitive salaries.'}</p>
                                <div className="salary-chart">
                                    <div className="salary-graph">
                                        {/* Graph Grid Background */}
                                        <div className="graph-grid">
                                            <div className="grid-line"></div>
                                            <div className="grid-line"></div>
                                            <div className="grid-line"></div>
                                        </div>

                                        {/* Progression Line */}
                                        <svg className="graph-line" viewBox="0 0 300 120" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3" />
                                                    <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.6" />
                                                    <stop offset="100%" stopColor="#FF6B00" stopOpacity="1" />
                                                </linearGradient>
                                                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.2" />
                                                    <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.02" />
                                                </linearGradient>
                                            </defs>
                                            {/* Area fill */}
                                            <path d="M 30 100 L 30 85 Q 75 85 100 65 T 170 40 T 270 15 L 270 100 Z" fill="url(#areaGradient)" />
                                            {/* Line */}
                                            <path d="M 30 85 Q 75 85 100 65 T 170 40 T 270 15" stroke="url(#lineGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                                        </svg>

                                        {/* Data Points */}
                                        <div className="graph-points">
                                            {(program.careerROI?.salaryLevels || [
                                                { label: '₹8L', experience: '0-2 yrs' },
                                                { label: '₹18L', experience: '3-5 yrs' },
                                                { label: '₹35L+', experience: '6+ yrs' }
                                            ]).map((level, idx) => (
                                                <div key={idx} className={`graph-point point-${idx + 1}`}>
                                                    <div className="point-marker">
                                                        <div className="point-pulse"></div>
                                                        <div className="point-dot"></div>
                                                    </div>
                                                    <div className="point-info">
                                                        <span className="point-value">{level.label}</span>
                                                        <span className="point-label">{level.level || ['Entry', 'Mid', 'Senior'][idx]}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <h4 className="chart-title"><span className="text-accent">Salary</span> {(program.careerROI?.chartDesc || 'Progression').replace('Salary ', '')}</h4>
                                <p className="chart-desc">{program.careerROI?.chartNote || 'Companies offer competitive salaries to skilled professionals.'}</p>
                            </div>

                            {/* Job Roles integrated here */}
                            <div className="jobroles-card-integrated">
                                <h3 className="roi-section-title"><span className="text-accent">{program.jobRoles.length}+</span> Career Paths</h3>
                                <div className="jobroles-grid-compact">
                                    {program.jobRoles.slice(0, 9).map((role, idx) => (
                                        <div key={idx} className="job-role-tag">
                                            <BriefcaseBusiness size={14} />
                                            <span>{role}</span>
                                        </div>
                                    ))}
                                </div>
                                {/* <a href="#pricing" className="btn-see-investment">See Your Investment →</a> */}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 6. CREDENTIALS - Authority & Trust */}
            <section className="credentials-section" id="certifications">
                <div className="credentials-wrapper">
                    <div className="section-container">
                        <h2 className="credentials-title">Earn <span className="text-accent">{program.certifications.length} Global Certifications</span></h2>
                        <p className="credentials-subtitle">Graduate with internationally recognized certifications from {program.partner}.</p>

                        {/* Certificate images with names */}
                        <div className={`certificates-gallery count-${program.certifications.length}`}>
                            {program.certifications.map((cert, idx) => (
                                <div key={idx} className="certificate-item-combined">
                                    <div className="certificate-image-card">
                                        <img src={cert.image} alt={`${cert.code} - ${cert.name} Certificate`} className="certificate-img" />
                                        <div className="certificate-overlay">
                                            <span className="cert-badge-label">{cert.code}</span>
                                        </div>
                                    </div>
                                    <div className="credential-card">
                                        <div className="credential-logo">
                                            <span className="logo-text"><span className="logo-accent">{cert.code.charAt(0)}</span>{cert.code.slice(1)}</span>
                                            <span className="logo-label">{cert.name}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="credentials-cta">
                            <a href="tel:+919886035330" className="btn-inquire">Inquire Now <span>→</span></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. WHO IS THIS FOR - Coursera/DeepLearning.ai Inspired Design */}
            <section className="audience-section-modern" id="structure">
                <div className="section-container">
                    <div className="audience-header-modern">
                        <span className="audience-eyebrow">DESIGNED FOR BEGINNERS</span>
                        <h2 className="audience-title-modern">
                            <span className="text-accent">Who</span> should enroll?
                        </h2>
                        <p className="audience-subtitle-modern">
                            {programType === 'cybersecurity'
                                ? "Whether you're a fresh graduate, a student, or looking to switch careers—this program is built for you. No prior cybersecurity experience needed."
                                : programType === 'internship'
                                    ? "This program is perfectly designed for students and fresh graduates looking to gain real-world industry experience and launch their careers."
                                    : `This program is designed for ambitious individuals ready to master ${programType === 'digital-marketing' ? 'digital marketing' : 'robotics'}.`
                            }
                        </p>
                    </div>

                    <div className="audience-grid-modern">
                        {program.targetAudience.map((audience, idx) => (
                            <div key={idx} className="audience-card-modern">
                                <div className="audience-card-number">{String(idx + 1).padStart(2, '0')}</div>
                                <div className="audience-card-content">
                                    <h3 className="audience-card-title-modern">{audience.title}</h3>
                                    <p className="audience-card-desc-modern">{audience.desc}</p>
                                    <span className="audience-tag-modern">{audience.tag}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats Row */}
                    {programType === 'cybersecurity' && program.category !== 'personality-softskills' && (
                        <div className="audience-stats-row">
                            <div className="audience-stat-item">
                                <span className="stat-number">85%</span>
                                <span className="stat-text">of our students are fresh graduates or career changers</span>
                            </div>
                            <div className="audience-stat-divider"></div>
                            <div className="audience-stat-item">
                                <span className="stat-number">Zero</span>
                                <span className="stat-text">prior experience required to get started</span>
                            </div>
                            <div className="audience-stat-divider"></div>
                            <div className="audience-stat-item">
                                <span className="stat-number">₹6-8 LPA</span>
                                <span className="stat-text">average starting salary for freshers</span>
                            </div>
                        </div>
                    )}

                    {/* Modern CTA */}
                    <div className="audience-cta-modern">
                        <div className="cta-content">
                            <h3>Not sure if this is right for you?</h3>
                            <p>Talk to our career counsellor for a personalized learning path recommendation.</p>
                        </div>
                        <a href="tel:+919886035330" className="btn-cta-modern">
                            Get Free Career Advice
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Program Tools Section - Data Science Only */}
            {program.slug === 'data-science-analytics' && (
                <ProgramToolsSection />
            )}

            {/* 12. CURRICULUM SECTION - Modern Redesign */}
            <section className="curriculum-section-modern" id="curriculum">
                <div className="curriculum-container-modern">
                    {/* Header */}
                    <div className="curriculum-header-modern">
                        <div className="curriculum-header-content">
                            <span className="curriculum-eyebrow">LEARNING PATH</span>
                            <h2 className="curriculum-title-modern">
                                Your Journey to Becoming a<br />
                                <span className="text-accent">
                                    {program.category === 'digital-marketing' ? 'Digital Marketing Expert' :
                                        program.category === 'robotics-iot' ? 'Robotics Engineer' :
                                            program.category === 'data-science' ? 'Data Science Professional' :
                                                program.category === 'personality-softskills' ? 'Corporate Professional' :
                                                    program.category === 'internship' ? 'Tech Professional' :
                                                        'Cybersecurity Professional'}
                                </span>
                            </h2>
                            <p className="curriculum-subtitle-modern">
                                {program.category === 'digital-marketing'
                                    ? 'A structured learning path designed by industry experts to take you from beginner to job-ready.'
                                    : program.category === 'robotics-iot'
                                        ? 'A hands-on learning journey designed for absolute beginners.'
                                        : program.category === 'data-science'
                                            ? 'Master data analysis, machine learning, and AI with industry-relevant projects.'
                                            : program.category === 'personality-softskills'
                                                ? 'Enhance your communication and soft skills to excel in your career.'
                                                : program.category === 'internship'
                                                    ? 'Work on real-world projects and build a portfolio that stands out to recruiters.'
                                                    : 'A structured learning path taking you from fundamentals to advanced penetration testing with globally recognized certifications.'
                                }
                            </p>
                        </div>
                        <div className="curriculum-stats-modern">
                            <div className="curr-stat-modern">

                                <div className="curr-stat-value-modern">{program.curriculum.length}</div>
                                <div className="curr-stat-label-modern">Modules</div>
                            </div>
                            <div className="curr-stat-modern">

                                <div className="curr-stat-value-modern">{program.stats.totalHours}</div>
                                <div className="curr-stat-label-modern">Hours</div>
                            </div>
                            <div className="curr-stat-modern">

                                <div className="curr-stat-value-modern">{program.certifications.length}</div>
                                <div className="curr-stat-label-modern">Certifications</div>
                            </div>
                        </div>
                    </div>
                    {/* Commit changes comment */}
                    {/* Timeline Modules */}
                    <div className="curriculum-timeline">
                        {program.curriculum.map((module, idx) => (
                            <div key={idx} className={`curriculum-module-modern ${activeModule === idx ? 'active' : ''}`}>
                                {/* Timeline Connector */}
                                <div className="timeline-connector">
                                    <div className={`timeline-dot ${module.certification ? 'has-cert' : ''}`}>
                                        {module.certification ? '🏅' : module.number}
                                    </div>
                                    {idx < program.curriculum.length - 1 && <div className="timeline-line"></div>}
                                </div>

                                {/* Module Card */}
                                <div className="module-card-modern" onClick={() => toggleModule(idx)}>
                                    <div className="module-card-header">
                                        <div className="module-info">
                                            <span className="module-number-label">Module {module.number}</span>
                                            <h4 className="module-title-modern">{module.title}</h4>
                                            <div className="module-meta-modern">
                                                <span className="module-duration-modern">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                    {module.duration}
                                                </span>
                                                {module.certification && (
                                                    <span className="module-cert-modern">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                                        {module.certification}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="module-expand-modern">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeModule === idx ? 'rotated' : ''}>
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Expanded Content */}
                                    {activeModule === idx && (
                                        <div className="module-content-modern">
                                            <p className="module-description-modern">{module.description}</p>
                                            <div className="module-topics-modern">
                                                <span className="topics-label">What you'll learn:</span>
                                                <div className="topics-grid">
                                                    {module.topics.map((topic, tidx) => (
                                                        <span key={tidx} className="topic-item">
                                                            <CheckCircle size={16} strokeWidth={2.5} />
                                                            {topic}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer CTA */}
                    <div className="curriculum-footer-modern">
                        <div className="footer-content">
                            <div className="footer-info">
                                <h3>Want the complete curriculum details?</h3>
                                <p>Download the detailed syllabus with module breakdowns, project details, and certification information.</p>
                            </div>
                            <a
                                href={program.brochureLink ? `/brochure/${program.brochureLink}` : '#'}
                                className={`btn-download-modern ${!program.brochureLink ? 'opacity-50 cursor-not-allowed' : ''}`}
                                target={program.brochureLink ? "_blank" : undefined}
                                rel={program.brochureLink ? "noopener noreferrer" : undefined}
                                download={program.brochureLink ? true : undefined}
                                onClick={(e) => !program.brochureLink && e.preventDefault()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                {program.brochureLink ? "Download Brochure" : "Brochure Coming Soon"}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hands-On Labs Section */}
            {(program.certifications.length > 0 || ['data-science', 'robotics-iot', 'digital-marketing', 'personality-softskills'].includes(program.category)) && (
                <div id="labs">
                    <ProgramLabsWrapper
                        certificationCodes={program.certifications.map(cert => cert.code)}
                        programTitle={program.title}
                        programSlug={program.slug}
                    />
                </div>
            )}


            {/* Pricing Details */}
            <section className="pricing-section">
                <div className="pricing-container-full">
                    <div className="pricing-header">
                        <h2 className="pricing-title">Program Investment & Financing</h2>
                        <p className="pricing-subtitle">Flexible payment options designed to make quality education accessible</p>
                    </div>

                    <div className="pricing-content-wrapper">
                        {(() => {
                            const hasPaymentPlans = program.pricing.companyEMI || program.pricing.upfrontAmount;

                            const WhatsIncludedContent = (
                                <div className="whats-included-box" style={!hasPaymentPlans ? { marginTop: '24px' } : undefined}>
                                    <h3 className="section-heading">
                                        <span className="heading-icon"><CheckCircle size={20} /></span>
                                        What's Included
                                    </h3>
                                    <ul className="included-list">
                                        <li>{program.certifications.length} {program.category === 'cybersecurity' ? 'Global EC-Council' : 'eHack'} Certifications</li>
                                        <li>{program.stats.totalHours} of Hands-on Training</li>
                                        <li>Real-Time Labs & Practice Environment</li>
                                        <li>{program.stats.membership} Post-Training Support</li>
                                        <li>Program Completion Certificate</li>
                                        <li>{program.slug === "masters-ethical-hacking" ? "100% Placement Assistance" : "Internship Opportunities"}</li>
                                    </ul>
                                </div>
                            );

                            return (
                                <>
                                    <div className="pricing-main-column">
                                        {program.pricing.applicationFee && (
                                            <div className="fee-section">
                                                <div className="fee-row">
                                                    <span className="fee-label-text">
                                                        <span className="fee-icon-wrapper"><FileText size={18} /></span>
                                                        Application Fee
                                                    </span>
                                                    <span className="fee-value">{program.pricing.applicationFee}</span>
                                                </div>
                                                <p className="fee-note-text">Will be adjusted in the program fee. *GST as applicable</p>
                                            </div>
                                        )}
                                        {program.pricing.admissionFee && (
                                            <div className="fee-section primary">
                                                <div className="fee-row">
                                                    <span className="fee-label-text">
                                                        <span className="fee-icon-wrapper primary"><Gem size={18} /></span>
                                                        Program Admission Fee
                                                    </span>
                                                    <span className="fee-value-large">{program.pricing.admissionFee}</span>
                                                </div>
                                                <p className="fee-note-text">*GST as applicable</p>
                                            </div>
                                        )}

                                        {!hasPaymentPlans && WhatsIncludedContent}

                                        {hasPaymentPlans && (
                                            <div className="payment-plans-section">
                                                <h3 className="section-heading">Payment Plans</h3>
                                                {program.pricing.companyEMI && (
                                                    <div className="plan-option">
                                                        <div className="plan-header">
                                                            <div className="plan-title-group">
                                                                <span className="plan-icon"><BriefcaseBusiness size={20} /></span>
                                                                <h4 className="plan-name">Company EMI Plan</h4>
                                                            </div>
                                                            <span className="plan-price">{program.pricing.companyEMI}</span>
                                                        </div>
                                                        <p className="plan-description">Complete flexibility with company-sponsored EMI option</p>
                                                    </div>
                                                )}
                                                {program.pricing.upfrontAmount && (
                                                    <div className="plan-option">
                                                        <div className="plan-header">
                                                            <div className="plan-title-group">
                                                                <span className="plan-icon"><Banknote size={20} /></span>
                                                                <h4 className="plan-name">{program.pricing.upfrontPercentage} Upfront Payment</h4>
                                                            </div>
                                                            <span className="plan-price">{program.pricing.upfrontAmount}</span>
                                                        </div>
                                                        <p className="plan-description">Balance payable in {program.pricing.emiCount} equal EMIs of {program.pricing.emiAmount} each</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="pricing-side-column">
                                        <div className="financing-box">
                                            <h3 className="section-heading">
                                                <span className="heading-icon"><Landmark size={20} /></span>
                                                Financing Options
                                            </h3>
                                            <p className="financing-description">We offer multiple financing solutions to make our programs accessible to all students.</p>
                                            <div className="financing-list">
                                                <div className="financing-item">
                                                    <div className="financing-icon"><Shield size={24} /></div>
                                                    <div>
                                                        <h4 className="financing-name">No Cost EMI (Internal)</h4>
                                                        <p className="financing-desc">Zero interest installments through our internal program</p>
                                                    </div>
                                                </div>
                                                <div className="financing-item">
                                                    <div className="financing-icon"><CreditCard size={24} /></div>
                                                    <div>
                                                        <h4 className="financing-name">Bank/NBFC Financing</h4>
                                                        <p className="financing-desc">Flexible payment plans through partner banks and NBFCs</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {hasPaymentPlans && WhatsIncludedContent}
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                    <div className="pricing-cta-section">
                        <button className="btn-enroll-primary">
                            Enroll Now
                            <ArrowRight size={18} />
                        </button>
                        <p className="cta-contact">Questions? Call us at <a href="tel:+919886035330">+91-9886035330</a></p>
                    </div>
                </div>
            </section>

            {/* 9. FAQ SECTION - Objection Handling (Right After Pricing) */}
            <section className="faq-section" id="faq">
                <div className="section-container">
                    <h2 className="faq-title">Frequently Asked <span className="text-accent">Questions</span></h2>
                    <div className="faq-container">
                        <div className="faq-categories">
                            {program.faq?.map((cat, idx) => (
                                <button key={idx} className={`faq-category-btn ${activeCategory === idx ? 'active' : ''}`} onClick={() => { setActiveCategory(idx); setOpenQuestion(0); }}>{cat.category}</button>
                            ))}
                        </div>
                        <div className="faq-questions">
                            {program.faq?.[activeCategory]?.questions.map((item, idx) => (
                                <div key={idx} className={`faq-item ${openQuestion === idx ? 'open' : ''}`}>
                                    <button className="faq-question" onClick={() => toggleQuestion(idx)}>
                                        <span>{item.q}</span>
                                        <span className="faq-icon">{openQuestion === idx ? '−' : '+'}</span>
                                    </button>
                                    {openQuestion === idx && <div className="faq-answer"><p>{item.a}</p></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* 8. INVEST + PRICING SECTION - Decision Point (Moved Up) */}
            {/* <section className="invest-section border-bottom" id="pricing">
                <div className="invest-container">
                    <span className="invest-badge">INVEST IN YOUR FUTURE</span>
                    <h2 className="invest-title">Your Investment</h2>

                    {/* Certification cards - hidden for personality-softskills */}
            {/* {program.category !== 'personality-softskills' && (
                        <div className={`certification-cards ${program.slug.includes('data-science') || program.slug.includes('digital-marketing') || program.slug.includes('robotics') ? 'single-card' : program.slug.includes('masterclass-ethical-hacking-ceh-v13') ? 'three-cards' : ''}`}>
                            {program.slug.includes('masterclass-ethical-hacking-ceh-v13') ? (
                                // Show 3 individual cards for CEH Master
                                program.certifications.map((cert, idx) => (
                                    <div key={idx} className="cert-card cert-card-dark">
                                        <div className="cert-image-wrapper">
                                            <img src={cert.image} alt={`${cert.code} Certificate`} className="cert-image" />
                                        </div>
                                        <div className="cert-content">
                                            <div className="cert-brand">
                                                <img src="/images/ec-council-badge.png" alt="EC-Council" className="ec-council-logo" />
                                                <span className="partner-text">EC-Council<br /><small>Official Partner</small></span>
                                            </div>
                                            <h3 className="cert-program-name cert-underline">{cert.name}</h3>
                                            <ul className="cert-features">
                                                <li><span className="check-icon">✓</span>{cert.code}</li>
                                                <li><span className="check-icon">✓</span>Globally Recognized</li>
                                                <li><span className="check-icon">✓</span>Industry Standard</li>
                                            </ul>
                                            <button className="btn-counsellor btn-counsellor-dark">Talk to Career Counsellor</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {!program.slug.includes('masterclass-ethical-hacking-ceh-v13') && (
                                        <div className="cert-card cert-card-blue">
                                            <div className="cert-image-wrapper">
                                                <img src={program.slug === "masters-ethical-hacking" ? "/images/certificates/masters-certificate.jpg" : program.slug === "data-science-analytics" ? "/images/data_science certificate.jpeg" : program.slug === "robotics-for-all" ? "/images/certificates/robotics-image.jpeg" : "/images/certificates/graduate-certificate.jpg"} alt="eHack Academy Certificate" className="cert-image" />
                                            </div>
                                            <div className="cert-content">
                                                <div className="cert-brand">

                                                    <img src="/ehack-logo.png" alt="eHack Academy" className="cert-brand-logo" />
                                                    <span className="brand-badge">ACADEMY</span>
                                                </div>
                                                <h3 className="cert-program-name">{program.title}</h3>
                                                <ul className="cert-features">
                                                    <li><span className="check-icon">✓</span>1 Program Completion Certificate</li>
                                                    <li><span className="check-icon">✓</span>{program.slug.includes('data-science') ? 'Industry Projects & Portfolio' : 'Real-Time Labs Access'}</li>
                                                    <li><span className="check-icon">✓</span>{program.slug === "masters-ethical-hacking" ? "Placement Support" : program.slug.includes('data-science') ? "100% Job Assistance" : "Internship Opportunity*"}</li>
                                                </ul>
                                                <button className="btn-counsellor">Talk to Career Counsellor</button>
                                            </div>
                                        </div>
                                    )}

                                    {!program.slug.includes('digital-marketing') && !program.slug.includes('robotics') && !program.slug.includes('data-science') && (
                                        <div className="cert-card cert-card-dark">
                                            <div className="cert-image-wrapper">
                                                <div className="cert-stack">
                                                    {program.certifications.map((cert, idx) => (
                                                        <img key={idx} src={cert.image} alt={`${cert.code} Certificate`} className={`cert-stack-img cert-stack-${program.certifications.length - idx}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="cert-content">
                                                <div className="cert-brand">
                                                    <img src="/images/ec-council-badge.png" alt="EC-Council" className="ec-council-logo" />
                                                    <span className="partner-text">EC-Council<br /><small>Official Partner</small></span>
                                                </div>
                                                <h3 className="cert-program-name cert-underline">{program.certifications.length} EC-Council Certifications</h3>
                                                <ul className="cert-features">
                                                    <li><span className="check-icon">✓</span>{program.certifications.map(c => c.code).join(" | ")}</li>
                                                    <li><span className="check-icon">✓</span>Globally Recognized</li>
                                                    <li><span className="check-icon">✓</span>Industry Standard</li>
                                                </ul>
                                                <button className="btn-counsellor btn-counsellor-dark">Talk to Career Counsellor</button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )} */}

            {/* <p className="invest-footer">
                        Connect with our admissions team to know about fees & financing.
                        Anniversary Offer: <strong style={{ color: 'var(--accent)' }}>{program.pricing.discounted}</strong> (Original: {program.pricing.original})
                    </p>
                </div>
            </section>  */}

            {/* 10. WHY EHACK - Differentiation */}
            <section className="why-ehack-section">
                <div className="section-container">
                    <h2 className="roi-title">Why <span className="text-accent">eHack Academy</span>?</h2>
                    <p className="roi-subtitle">{programType === 'digital-marketing' ? 'Passion for Excellence in Digital Marketing Training' : 'Passion for Excellence in Information Security'}</p>

                    <div className="roi-grid">
                        <div className="salary-card">
                            {program.whyEhack?.slice(0, 2).map((item, idx) => (
                                <div key={idx} className="why-item">
                                    <h3 className="chart-title accent-title">{item.title}</h3>
                                    <p className="chart-desc">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="salary-card">
                            {program.whyEhack?.slice(2, 4).map((item, idx) => (
                                <div key={idx} className="why-item">
                                    <h3 className="chart-title accent-title">{item.title}</h3>
                                    <p className="chart-desc">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. SKILLS SECTION - Hidden for personality-softskills */}
            {program.category !== 'personality-softskills' && (
                <section className="skills-section">
                    <div className="section-container">
                        <h2 className="skills-title">Master <span className="text-accent">{programType === 'digital-marketing' ? 'Digital Marketing' : programType === 'robotics' ? 'Robotics' : 'Cybersecurity'}</span> Skills</h2>
                        <div className="skills-grid">
                            {program.skills.map((skill, idx) => (
                                <div key={idx} className="skill-card">
                                    <h3 className="skill-name">
                                        {(() => {
                                            const words = skill.name.split(' ');
                                            const lastWord = words.pop();
                                            return (
                                                <>
                                                    {words.join(' ')} <span className="text-accent">{lastWord}</span>
                                                </>
                                            );
                                        })()}
                                    </h3>
                                    <p className="skill-desc">{skill.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}



            {/* 13. NEWS SECTION - Industry Validation & Urgency */}
            {program.newsItems && program.newsItems.length > 0 && (
                <section className="news-section">
                    <div className="news-container ">
                        <span className="news-badge">
                            {programType === 'digital-marketing' ? 'DIGITAL TRENDS' :
                                programType === 'robotics' ? 'FUTURE TECH' :
                                    program.category === 'data-science' ? 'DATA INSIGHTS' :
                                        program.category === 'personality-softskills' ? 'CAREER GROWTH' :
                                            'CYBER THREATS ARE RISING'}
                        </span>
                        <h2 className="news-title">
                            {programType === 'digital-marketing' ? 'Why Digital Skills Matter Now' :
                                programType === 'robotics' ? 'Why Robotics is the Future' :
                                    program.category === 'data-science' ? 'Why Data Science Matters Now' :
                                        program.category === 'personality-softskills' ? 'Why Soft Skills Matter' :
                                            'Why Cybersecurity Skills Matter Now'}
                        </h2>
                        <div className="news-marquee-container">
                            <div className="news-marquee-track">
                                {/* Duplicate items for seamless loop */}
                                {[...program.newsItems, ...program.newsItems].map((item, idx) => (
                                    <article key={idx} className="news-card">
                                        <div className="news-image"><img src={item.image} alt="Cybersecurity News" /></div>
                                        <div className="news-content">
                                            <span className="news-date">{item.date}</span>
                                            <h3 className="news-headline">{item.headline}</h3>
                                            <p className="news-source">{item.source}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 14. FINAL CTA SECTION */}
            <section className="program-cta-section">
                <div className="section-container">
                    <h2>Ready to Start Your {program.category === 'personality-softskills' ? 'Professional Development' : programType === 'digital-marketing' ? 'Digital Marketing' : programType === 'robotics' ? 'Robotics' : 'Cybersecurity'} Journey?</h2>
                    <p>Join thousands of professionals who have transformed their careers with eHack Academy</p>
                    <div className="cta-buttons">
                        <a href="tel:+919886035330" className="btn-primary btn-large">Call Now: +91-9886035330</a>
                        <Link href="/courses" className="btn-secondary btn-large">Explore Other Programs</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
// Git push commit
