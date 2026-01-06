'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { programs, getProgramBySlug } from '@/data/programs';
import { BriefcaseBusiness } from 'lucide-react';
import './program.css';

export default function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    const [program, setProgram] = useState<typeof programs[0] | null>(null);
    const [activeCategory, setActiveCategory] = useState(0);
    const [openQuestion, setOpenQuestion] = useState<number | null>(0);
    const [activeModule, setActiveModule] = useState(0);

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


    return (
        <div className="program-page">
            {/* Hero Section */}
            <section className="hero-section" id="overview">
                <div className="hero-container">
                    {/* Left Content */}
                    <div className="hero-content">
                        <div className="partner-logos">
                            {/* Only show partner logo and divider for cybersecurity programs */}
                            {!program.slug.includes('digital-marketing') && !program.slug.includes('robotics') && (
                                <>
                                    <div className="partner-logo">
                                        <img src={program.partnerLogo} alt={`${program.partner} Accredited Training Center`} className="ec-council-badge" />
                                    </div>
                                    <div className="divider"></div>
                                </>
                            )}
                            <div className="partner-brand">
                                <img src={program.ehackLogo} alt="eHack Academy" className="hero-brand-logo" />
                            </div>
                        </div>

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
                            ) : (
                                program.title
                            )}
                            <span className="cert-count">{program.subtitle}</span>
                        </h1>

                        <p className="hero-description">
                            {program.description}
                        </p>

                        <p className="hero-features">
                            {program.features}
                        </p>

                        <div className="batch-info">
                            <span className="batch-label">NEXT BATCH STARTS</span>
                            <span className="batch-date">{program.batchInfo}</span>
                        </div>
                    </div>

                    {/* Right Form Card */}
                    <div className="form-card">
                        <h2 className="form-title">Book a <span className="text-accent">FREE</span> Live class!</h2>
                        <p className="form-subtitle">Login to get started</p>

                        <div className="phone-input">
                            <div className="country-code">
                                <span className="flag">🇮🇳</span>
                                <span>+91</span>
                            </div>
                            <input type="tel" placeholder="Mobile Number" className="phone-field" />
                        </div>

                        <button className="btn-continue">CONTINUE</button>

                        <label className="checkbox-label">
                            <input type="checkbox" defaultChecked />
                            <span>I wish to receive updates via WhatsApp.</span>
                        </label>

                        <p className="terms-text">
                            By continuing, you agree to eHack's <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="stats-bar">
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-label">START DATE</span>
                        <div className="stat-value"><strong>5th</strong> of Every Month</div>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">DURATION</span>
                        <div className="stat-value"><strong>9-12</strong> Months</div>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">MODE</span>
                        <div className="stat-value"><strong>Classroom</strong> + Live Online</div>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">TOTAL HOURS</span>
                        <div className="stat-value"><strong>300</strong> Hours</div>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">MEMBERSHIP</span>
                        <div className="stat-value"><strong>2 Years</strong> Free Support</div>
                    </div>
                </div>
            </section>

            {/* Schedule Options */}
            <section className="schedule-bar">
                <div className="banner-container">
                    <span className="cert-badge">Schedule Options</span>
                    <span className="cert-text">{program.schedule}</span>
                </div>
            </section>

            {/* Credentials Section */}
            <section className="credentials-section" id="certifications">
                <div className="credentials-wrapper">
                    <div className="section-container">
                        <h2 className="credentials-title">Earn <span className="text-accent">{program.certifications.length} Global Certifications</span></h2>
                        <p className="credentials-subtitle">Graduate with internationally recognized certifications from {program.partner}{program.slug.includes('digital-marketing') ? ', building your expertise in digital marketing' : ', the world\'s leading cybersecurity certification body'}.</p>

                        {/* Certificate Images Gallery */}
                        <div className={`certificates-gallery count-${program.certifications.length}`}>
                            {program.certifications.map((cert, idx) => (
                                <div key={idx} className="certificate-image-card">
                                    <img src={cert.image} alt={`${cert.code} - ${cert.name} Certificate`} className="certificate-img" />
                                    <div className="certificate-overlay">
                                        <span className="cert-badge-label">{cert.code}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="credentials-grid">
                            {program.certifications.map((cert, idx) => (
                                <div key={idx} className="credential-card">
                                    <div className="credential-logo">
                                        <span className="logo-text"><span className="logo-accent">{cert.code.charAt(0)}</span>{cert.code.slice(1)}</span>
                                        <span className="logo-label">{cert.name}</span>
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

            {/* Skills Section */}
            <section className="skills-section">
                <div className="section-container">
                    <h2 className="skills-title">Master <span className="text-accent">{program.slug.includes('digital-marketing') ? 'Digital Marketing' : 'Cybersecurity'}</span> Skills</h2>

                    <div className="skills-grid">
                        {program.skills.map((skill, idx) => (
                            <div key={idx} className="skill-card">
                                <div className="skill-icon">
                                    {['🛡️', '🔐', '⏱️', '💻', '📊', '🗄️'][idx % 6]}
                                </div>
                                <h3 className="skill-name">{skill.name}</h3>
                                <p className="skill-desc">{skill.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ROI Section */}
            <section className="roi-section">
                <div className="section-container">
                    <h2 className="roi-title">Great <span className="text-accent">Career ROI</span></h2>
                    <p className="roi-subtitle">
                        {program.careerROI?.subtitle || "This program equips you with advanced cybersecurity skills essential for protecting organizations from cyber threats. Master ethical hacking, network defense, digital forensics, and penetration testing—preparing you for high-impact roles in the rapidly growing cybersecurity industry."}
                    </p>

                    <h3 className="roi-section-title">Chart Your Earning Potential</h3>

                    <div className="roi-grid">
                        <div className="salary-card">
                            <p className="salary-stat">
                                <span className="text-accent">{program.slug.includes('digital-marketing') ? 'Digital marketing professionals' : 'Cybersecurity professionals'}</span> are {program.slug.includes('digital-marketing') ? 'in high demand with competitive salaries averaging ₹6,00,000 annually' : 'among the highest-paid IT specialists with average salaries exceeding ₹12,00,000 annually'}.
                            </p>
                            <div className="salary-chart">
                                <div className="chart-bars">
                                    <div className="chart-bar-group">
                                        <span className="bar-label">₹8L</span>
                                        <div className="chart-bar bar-1"></div>
                                    </div>
                                    <div className="chart-bar-group">
                                        <span className="bar-label">₹18L</span>
                                        <div className="chart-bar bar-2"></div>
                                    </div>
                                    <div className="chart-bar-group">
                                        <span className="bar-label">₹35L+</span>
                                        <div className="chart-bar bar-3"></div>
                                    </div>
                                </div>
                            </div>
                            <h4 className="chart-title">A {program.slug.includes('digital-marketing') ? 'Digital Marketing Professional\'s' : 'Cybersecurity Expert\'s'} Salary Progression</h4>
                            <p className="chart-desc">{program.slug.includes('digital-marketing') ? 'Companies offer competitive salaries to skilled digital marketers who can drive measurable business growth through online channels.' : 'Organizations offer highly competitive salaries to recruit and retain qualified cybersecurity professionals who can protect their digital assets.'}</p>
                        </div>
                        <div className="testimonial-video-card">
                            <p className="testimonial-intro">Watch how our graduates transformed their careers in {program.slug.includes('digital-marketing') ? 'digital marketing' : 'cybersecurity'}.</p>
                            <div className="video-container">
                                <div className="video-placeholder">
                                    <div className="play-button">
                                        <span>▶</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Roles Section */}
            <section className="jobroles-section">
                <div className="section-container">
                    <h2 className="jobroles-title"><span className="text-accent">{program.jobRoles.length}+</span> {program.slug.includes('digital-marketing') ? 'Digital Marketing' : 'Cybersecurity'} Roles</h2>

                    <div className="jobroles-card">
                        <div className="jobroles-grid">
                            <ul className="jobroles-list">
                                {program.jobRoles.slice(0, 4).map((role, idx) => (
                                    <li key={idx}><span className="role-icon"><BriefcaseBusiness size={18} /></span> {role}</li>
                                ))}
                            </ul>
                            <ul className="jobroles-list">
                                {program.jobRoles.slice(4, 8).map((role, idx) => (
                                    <li key={idx}><span className="role-icon"><BriefcaseBusiness size={18} /></span> {role}</li>
                                ))}
                            </ul>
                            <ul className="jobroles-list">
                                {program.jobRoles.slice(8, 12).map((role, idx) => (
                                    <li key={idx}><span className="role-icon"><BriefcaseBusiness size={18} /></span> {role}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why eHack Section */}
            <section className="why-ehack-section">
                <div className="section-container">
                    <h2 className="roi-title">Why <span className="text-accent">eHack Academy</span>?</h2>
                    <p className="roi-subtitle">{program.slug.includes('digital-marketing') ? 'Passion for Excellence in Digital Marketing Training' : 'Passion for Excellence in Information Security'}</p>

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

            {/* Who Is This For Section */}
            <section className="audience-section" id="structure">
                <div className="section-container">
                    <div className="audience-header">
                        <span className="audience-badge">IDEAL CANDIDATES</span>
                        <h2 className="audience-title">Who is this <span className="text-accent">Program</span> for?</h2>
                        <p className="audience-subtitle">This program is designed for ambitious individuals ready to master {program.slug.includes('digital-marketing') ? 'digital marketing' : 'cybersecurity'}</p>
                    </div>

                    <div className="audience-grid">
                        {program.targetAudience.map((audience, idx) => (
                            <div key={idx} className="audience-card">
                                <div className="audience-icon">
                                    {['👤', '🛡️', '🔐', '💻'][idx % 4]}
                                </div>
                                <h3 className="audience-card-title">{audience.title}</h3>
                                <p className="audience-card-desc">{audience.desc}</p>
                                <div className="audience-tag">{audience.tag}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum Section */}
            <section className="curriculum-section" id="curriculum">
                <div className="curriculum-container">
                    <div className="curriculum-header">
                        <div className="curriculum-header-left">
                            <span className="curriculum-badge">Program Curriculum</span>
                            <h2 className="curriculum-title">Master {program.slug.includes('digital-marketing') ? 'Digital Marketing' : 'Cybersecurity'}<br />Through Practice</h2>
                            <p className="curriculum-subtitle">{program.slug.includes('digital-marketing') ? 'A structured learning path designed by industry experts. Each module builds upon the previous, taking you from fundamentals to advanced digital marketing strategies.' : 'A structured learning path designed by industry experts. Each module builds upon the previous, taking you from fundamentals to advanced penetration testing.'}</p>
                        </div>
                        <div className="curriculum-stats">
                            <div className="curr-stat">
                                <div className="curr-stat-value">{program.curriculum.length}</div>
                                <div className="curr-stat-label">Modules</div>
                            </div>
                            <div className="curr-stat">
                                <div className="curr-stat-value">300+</div>
                                <div className="curr-stat-label">Hours</div>
                            </div>
                            <div className="curr-stat">
                                <div className="curr-stat-value">{program.certifications.length}</div>
                                <div className="curr-stat-label">Certifications</div>
                            </div>
                        </div>
                    </div>

                    <div className="curriculum-modules">
                        {program.curriculum.map((module, idx) => (
                            <div key={idx} className="curriculum-module">
                                <div className={`module-card ${activeModule === idx ? 'active' : ''}`}>
                                    <div className="module-header" onClick={() => toggleModule(idx)}>
                                        <div className="module-number-box">{module.number}</div>
                                        <div className="module-header-content">
                                            <h4 className="module-card-title">{module.title}</h4>
                                            <div className="module-meta">
                                                <span className="module-duration">
                                                    ⏱️ {module.duration}
                                                </span>
                                                <span className="module-cert-badge">{module.certification}</span>
                                            </div>
                                        </div>
                                        <div className="module-expand-icon">
                                            {activeModule === idx ? '▲' : '▼'}
                                        </div>
                                    </div>
                                    {activeModule === idx && (
                                        <div className="module-details">
                                            <p className="module-description">{module.description}</p>
                                            <div className="module-topics-label">What you'll learn</div>
                                            <div className="module-tags">
                                                {module.topics.map((topic, tidx) => (
                                                    <span key={tidx} className="tag">{topic}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="curriculum-footer">
                        <div className="curriculum-total">
                            <div className="total-item">
                                <div className="total-icon">⏱️</div>
                                <div className="total-text">
                                    <strong>300+ Hours</strong>
                                    <span>Hands-on Training</span>
                                </div>
                            </div>
                            <div className="total-item">
                                <div className="total-icon">🛡️</div>
                                <div className="total-text">
                                    <strong>{program.certifications.length} Certifications</strong>
                                    <span>{(program.slug.includes('digital-marketing') || program.slug.includes('robotics')) ? 'Industry Recognized' : 'EC-Council Accredited'}</span>
                                </div>
                            </div>
                        </div>
                        <button className="btn-download-brochure">
                            📥 Download Curriculum
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section" id="faq">
                <div className="section-container">
                    <h2 className="faq-title">Frequently Asked <span className="text-accent">Questions</span></h2>
                    <div className="faq-container">
                        <div className="faq-categories">
                            {program.faq?.map((cat, idx) => (
                                <button
                                    key={idx}
                                    className={`faq-category-btn ${activeCategory === idx ? 'active' : ''}`}
                                    onClick={() => { setActiveCategory(idx); setOpenQuestion(0); }}
                                >
                                    {cat.category}
                                </button>
                            ))}
                        </div>
                        <div className="faq-questions">
                            {program.faq?.[activeCategory]?.questions.map((item, idx) => (
                                <div key={idx} className={`faq-item ${openQuestion === idx ? 'open' : ''}`}>
                                    <button
                                        className="faq-question"
                                        onClick={() => toggleQuestion(idx)}
                                    >
                                        <span>{item.q}</span>
                                        <span className="faq-icon">{openQuestion === idx ? '−' : '+'}</span>
                                    </button>
                                    {openQuestion === idx && (
                                        <div className="faq-answer">
                                            <p>{item.a}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories / Learners Section */}
            <section className="learners-section" id="reviews">
                <div className="learners-container">
                    <span className="learners-badge">SUCCESS STORIES</span>
                    <h2 className="learners-title">What Our Learners Say</h2>

                    {/* Company Logo Marquee */}
                    <div className="logo-marquee-wrapper">
                        <div className="logo-marquee">
                            <div className="logo-track">
                                {['IBM', 'Cognizant', 'Infosys', 'Wipro', 'TCS', 'Accenture', 'Tech Mahindra', 'Capgemini', 'Deloitte', 'EY', 'PwC', 'KPMG'].map((company, idx) => (
                                    <div key={idx} className="company-logo">
                                        <img
                                            src={`https://img.logo.dev/${company.toLowerCase().replace(' ', '')}.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ`}
                                            alt={company}
                                            onError={(e) => { e.currentTarget.parentElement!.innerHTML = `<span>${company}</span>`; }}
                                        />
                                    </div>
                                ))}
                                {['IBM', 'Cognizant', 'Infosys', 'Wipro', 'TCS', 'Accenture'].map((company, idx) => (
                                    <div key={`dup-${idx}`} className="company-logo">
                                        <img
                                            src={`https://img.logo.dev/${company.toLowerCase().replace(' ', '')}.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ`}
                                            alt={company}
                                            onError={(e) => { e.currentTarget.parentElement!.innerHTML = `<span>${company}</span>`; }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="logo-marquee reverse">
                            <div className="logo-track">
                                {['HCL', 'Bosch', 'Siemens', 'Cisco', 'Fortinet', 'Palo Alto', 'Check Point', 'Oracle', 'HPE', 'Dell', 'NTT Data', 'Mphasis'].map((company, idx) => (
                                    <div key={idx} className="company-logo">
                                        <img
                                            src={`https://img.logo.dev/${company.toLowerCase().replace(' ', '')}.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ`}
                                            alt={company}
                                            onError={(e) => { e.currentTarget.parentElement!.innerHTML = `<span>${company}</span>`; }}
                                        />
                                    </div>
                                ))}
                                {['HCL', 'Bosch', 'Siemens', 'Cisco', 'Fortinet', 'Palo Alto'].map((company, idx) => (
                                    <div key={`dup-${idx}`} className="company-logo">
                                        <img
                                            src={`https://img.logo.dev/${company.toLowerCase().replace(' ', '')}.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ`}
                                            alt={company}
                                            onError={(e) => { e.currentTarget.parentElement!.innerHTML = `<span>${company}</span>`; }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Testimonial Cards */}
                    <div className="learner-testimonials">
                        <div className="testimonial-card-learner">
                            <h3 className="learner-name">Rajesh Kumar</h3>
                            <p className="learner-role">Security Analyst at <span className="company-name deloitte">Deloitte</span></p>
                            <p className="learner-quote">The hands-on labs and real-world scenarios helped me understand actual attack patterns. Within months of completing CEH, I landed my dream job as a Security Analyst at Deloitte.</p>
                        </div>
                        <div className="testimonial-card-learner">
                            <h3 className="learner-name">Priyanka Sharma</h3>
                            <p className="learner-role">Penetration Tester at <span className="company-name pwc">PwC</span></p>
                            <p className="learner-quote">eHack's structured curriculum took me from a complete beginner to a certified penetration tester. The CPENT certification opened doors I never thought possible.</p>
                        </div>
                        <div className="testimonial-card-learner">
                            <h3 className="learner-name">Arun Menon</h3>
                            <p className="learner-role">SOC Lead at <span className="company-name kpmg">KPMG</span></p>
                            <p className="learner-quote">The CND training was exactly what I needed to transition into cybersecurity. The instructors are industry veterans who share practical insights beyond textbooks.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Invest In Your Future Section */}
            <section className="invest-section">
                <div className="invest-container">
                    <span className="invest-badge">INVEST IN YOUR FUTURE</span>
                    <h2 className="invest-title">Your Investment</h2>

                    <div className={`certification-cards ${program.slug.includes('data-science') || program.slug.includes('digital-marketing') || program.slug.includes('robotics') ? 'single-card' : ''}`}>
                        {/* eHack Academy Card */}
                        <div className="cert-card cert-card-blue">
                            <div className="cert-image-wrapper">
                                <img
                                    src={program.slug === "masters-ethical-hacking"
                                        ? "/images/certificates/masters-certificate.jpg"
                                        : program.slug === "data-science-analytics"
                                            ? "/images/data_science certificate.jpeg"
                                            : "/images/certificates/graduate-certificate.jpg"}
                                    alt="eHack Academy Certificate"
                                    className="cert-image"
                                />
                            </div>
                            <div className="cert-content">
                                <div className="cert-brand">
                                    <img src="/ehack-logo.png" alt="eHack Academy" className="cert-brand-logo" />
                                    <span className="brand-badge">ACADEMY</span>
                                </div>
                                <h3 className="cert-program-name">{program.title}</h3>
                                <ul className="cert-features">
                                    <li>
                                        <span className="check-icon">✓</span>
                                        1 Program Completion Certificate
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        {program.slug.includes('data-science') ? 'Industry Projects & Portfolio' : 'Real-Time Labs Access'}
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        {program.slug === "masters-ethical-hacking" ? "Placement Support" : program.slug.includes('data-science') ? "100% Job Assistance" : "Internship Opportunity*"}
                                    </li>
                                </ul>
                                <button className="btn-counsellor">Talk to Career Counsellor</button>
                            </div>
                        </div>

                        {/* EC-Council Certifications Card - Only show for cybersecurity programs */}
                        {!program.slug.includes('digital-marketing') && !program.slug.includes('robotics') && !program.slug.includes('data-science') && (
                            <div className="cert-card cert-card-dark">
                                <div className="cert-image-wrapper">
                                    <div className="cert-stack">
                                        {program.certifications.map((cert, idx) => (
                                            <img
                                                key={idx}
                                                src={cert.image}
                                                alt={`${cert.code} Certificate`}
                                                className={`cert-stack-img cert-stack-${program.certifications.length - idx}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="cert-content">
                                    <div className="cert-brand">
                                        <img src="/images/ec-council-badge.png" alt="EC-Council" className="ec-council-logo" />
                                        <span className="partner-text">EC-Council<br /><small>Official Partner</small></span>
                                    </div>
                                    <h3 className="cert-program-name cert-underline">
                                        {program.certifications.length} EC-Council Certifications
                                    </h3>
                                    <ul className="cert-features">
                                        <li>
                                            <span className="check-icon">✓</span>
                                            {program.certifications.map(c => c.code).join(" | ")}
                                        </li>
                                        <li>
                                            <span className="check-icon">✓</span>
                                            Globally Recognized
                                        </li>
                                        <li>
                                            <span className="check-icon">✓</span>
                                            Industry Standard
                                        </li>
                                    </ul>
                                    <button className="btn-counsellor btn-counsellor-dark">Talk to Career Counsellor</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="invest-footer">
                        Connect with our admissions team to know about fees & financing.
                        10th Anniversary Offer: <strong style={{ color: 'var(--accent)' }}>{program.pricing.discounted}</strong> (Original: {program.pricing.original})
                    </p>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section">
                <div className="pricing-container">
                    <span className="pricing-badge">LIMITED TIME OFFER</span>
                    <h2 className="pricing-title">Program Investment</h2>
                    <p className="pricing-subtitle">
                        Transform your career with industry-leading {program.slug.includes('digital-marketing') ? 'digital marketing' : 'cybersecurity'} training. Flexible payment options available.
                    </p>

                    <div className="pricing-card">
                        <span className="offer-badge">🎉 10th Anniversary Special</span>

                        <div className="price-wrapper">
                            <div className="original-price">{program.pricing.original}</div>
                            <div className="current-price">
                                <span className="currency">₹</span>
                                {program.pricing.discounted.replace('₹', '').replace(',', '')}
                            </div>
                            {(() => {
                                const original = parseInt(program.pricing.original.replace(/[₹,]/g, ''));
                                const discounted = parseInt(program.pricing.discounted.replace(/[₹,]/g, ''));
                                const savings = original - discounted;
                                const percentage = Math.round((savings / original) * 100);
                                return (
                                    <span className="savings-badge">
                                        Save ₹{savings.toLocaleString('en-IN')} ({percentage}% OFF)
                                    </span>
                                );
                            })()}
                        </div>

                        <div className="emi-info">
                            💳 <strong>EMI Available:</strong> {program.pricing.emi}
                        </div>

                        <ul className="pricing-benefits">
                            <li>
                                <span className="benefit-icon">✓</span>
                                <span>{program.certifications.length} {program.slug.includes('digital-marketing') ? 'Professional' : 'Global EC-Council'} Certifications</span>
                            </li>
                            <li>
                                <span className="benefit-icon">✓</span>
                                <span>{program.stats.totalHours} of Hands-on Training</span>
                            </li>
                            <li>
                                <span className="benefit-icon">✓</span>
                                <span>Real-Time Labs & Practice Environment</span>
                            </li>
                            <li>
                                <span className="benefit-icon">✓</span>
                                <span>{program.stats.membership} Post-Training Support</span>
                            </li>
                            <li>
                                <span className="benefit-icon">✓</span>
                                <span>Program Completion Certificate</span>
                            </li>
                            <li>
                                <span className="benefit-icon">✓</span>
                                <span>{program.slug === "masters-ethical-hacking" ? "100% Placement Assistance" : "Internship Opportunities"}</span>
                            </li>
                        </ul>

                        <div className="pricing-cta">
                            <button className="btn-enroll">
                                Enroll Now - Secure Your Spot
                                <span>→</span>
                            </button>
                            <p className="contact-info">
                                Have questions? Call us at <a href="tel:+919886035330">+91-9886035330</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cyber Threats News Section */}
            {!program.slug.includes('digital-marketing') && <section className="news-section">
                <div className="news-container">
                    <span className="news-badge">{program.slug.includes('digital-marketing') ? 'DIGITAL MARKETING IS BOOMING' : 'CYBER THREATS ARE RISING'}</span>
                    <h2 className="news-title">Why {program.slug.includes('digital-marketing') ? 'Digital Marketing' : 'Cybersecurity'} Skills Matter Now</h2>

                    <div className="news-grid">
                        <article className="news-card">
                            <div className="news-image">
                                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop" alt="Cybersecurity" />
                            </div>
                            <div className="news-content">
                                <span className="news-date">{program.slug.includes('digital-marketing') ? 'December 2024' : 'December 2024'}</span>
                                <h3 className="news-headline">{program.slug.includes('digital-marketing') ? 'Digital Marketing Industry Expected to Reach $800B by 2026 - Skilled Professionals in High Demand' : 'India Records 500% Increase in Cyberattacks - Skilled Professionals in High Demand'}</h3>
                                <p className="news-source">Economic Times</p>
                            </div>
                        </article>
                        <article className="news-card">
                            <div className="news-image">
                                <img src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=250&fit=crop" alt="Hacking" />
                            </div>
                            <div className="news-content">
                                <span className="news-date">{program.slug.includes('digital-marketing') ? 'November 2024' : 'November 2024'}</span>
                                <h3 className="news-headline">{program.slug.includes('digital-marketing') ? 'Digital Marketing Roles Expected to Grow 40% by 2027 - Content Creators and SEO Experts Lead' : 'Cybersecurity Job Market Expected to Grow 35% by 2027 - CEH Certified Professionals Lead'}</h3>
                                <p className="news-source">Forbes India</p>
                            </div>
                        </article>
                        <article className="news-card">
                            <div className="news-image">
                                <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop" alt="Data Security" />
                            </div>
                            <div className="news-content">
                                <span className="news-date">{program.slug.includes('digital-marketing') ? 'October 2024' : 'October 2024'}</span>
                                <h3 className="news-headline">{program.slug.includes('digital-marketing') ? 'Companies Willing to Pay Premium Salaries for Skilled Digital Marketers and Growth Hackers' : 'Companies Willing to Pay Premium Salaries for Certified Ethical Hackers'}</h3>
                                <p className="news-source">Business Standard</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>}



            {/* Final CTA Section */}
            <section className="program-cta-section">
                <div className="section-container">
                    <h2>Ready to Start Your {program.slug.includes('digital-marketing') ? 'Digital Marketing' : 'Cybersecurity'} Journey?</h2>
                    <p>Join thousands of professionals who have transformed their careers with eHack Academy</p>
                    <div className="cta-buttons">
                        <a href="tel:+919886035330" className="btn-primary btn-large">
                            Call Now: +91-9886035330
                        </a>
                        <Link href="/courses" className="btn-secondary btn-large">
                            Explore Other Programs
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
