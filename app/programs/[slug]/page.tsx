import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { programs, getProgramBySlug, getAllProgramSlugs } from '@/data/programs';
import './program.css';

// Generate static params for all programs
export async function generateStaticParams() {
    return getAllProgramSlugs().map((slug) => ({ slug }));
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const program = getProgramBySlug(slug);

    if (!program) {
        return { title: 'Program Not Found' };
    }

    return {
        title: `${program.title} | eHack Academy`,
        description: program.description,
    };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const program = getProgramBySlug(slug);

    if (!program) {
        notFound();
    }

    return (
        <div className="program-page">
            {/* Hero Section */}
            <section className="program-hero">
                <div className="program-container">
                    <div className="hero-content">
                        <div className="partner-logos">
                            <img src={program.partnerLogo} alt={`${program.partner} Accredited`} className="partner-logo-img" />
                            <div className="logo-divider"></div>
                            <img src={program.ehackLogo} alt="eHack Academy" className="ehack-logo-img" />
                        </div>
                        <h1 className="hero-title">
                            {program.title.split(' ').slice(0, -3).join(' ')}{' '}
                            <span className="text-accent">{program.title.split(' ').slice(-3).join(' ')}</span>
                        </h1>
                        <p className="hero-subtitle">{program.subtitle}</p>
                        <p className="hero-description">{program.description}</p>
                        <p className="hero-features">{program.features}</p>
                        <div className="batch-info">
                            <span className="batch-label">NEXT BATCH STARTS</span>
                            <span className="batch-date">{program.batchInfo}</span>
                        </div>
                        <div className="hero-cta">
                            <a href="tel:+919886035330" className="btn-primary">Apply Now</a>
                            <a href="#curriculum" className="btn-secondary">View Curriculum</a>
                        </div>
                    </div>
                    <div className="hero-form">
                        <h3>Book a <span className="text-accent">FREE</span> Demo Class!</h3>
                        <p>Get started on your cybersecurity journey</p>
                        <div className="form-group">
                            <input type="text" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <input type="tel" placeholder="Mobile Number" />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address" />
                        </div>
                        <button className="btn-submit">Request Callback</button>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="stats-bar">
                <div className="program-container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-label">START DATE</span>
                            <span className="stat-value">{program.stats.startDate}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">DURATION</span>
                            <span className="stat-value">{program.stats.duration}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">MODE</span>
                            <span className="stat-value">{program.stats.mode}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">TOTAL HOURS</span>
                            <span className="stat-value">{program.stats.totalHours}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">SUPPORT</span>
                            <span className="stat-value">{program.stats.membership}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section className="certifications-section">
                <div className="program-container">
                    <h2 className="section-title">
                        Earn <span className="text-accent">{program.certifications.length} Global Certifications</span>
                    </h2>
                    <p className="section-subtitle">
                        Graduate with internationally recognized certifications from {program.partner}.
                    </p>
                    <div className="certs-grid">
                        {program.certifications.map((cert, idx) => (
                            <div key={idx} className="cert-card">
                                {cert.image && (
                                    <img src={cert.image} alt={cert.name} className="cert-image" />
                                )}
                                <span className="cert-code">{cert.code}</span>
                                <span className="cert-name">{cert.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="skills-section">
                <div className="program-container">
                    <h2 className="section-title">
                        Master <span className="text-accent">Cybersecurity</span> Skills
                    </h2>
                    <div className="skills-grid">
                        {program.skills.map((skill, idx) => (
                            <div key={idx} className="skill-card">
                                <h3 className="skill-name">{skill.name}</h3>
                                <p className="skill-desc">{skill.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum Section */}
            <section className="curriculum-section" id="curriculum">
                <div className="program-container">
                    <h2 className="section-title">Program Curriculum</h2>
                    <p className="section-subtitle">
                        A structured learning path designed by industry experts.
                    </p>
                    <div className="curriculum-modules">
                        {program.curriculum.map((module, idx) => (
                            <div key={idx} className="module-card">
                                <div className="module-number">{module.number}</div>
                                <div className="module-content">
                                    <div className="module-header">
                                        <h3 className="module-title">{module.title}</h3>
                                        <div className="module-meta">
                                            <span className="module-duration">{module.duration}</span>
                                            <span className="module-cert">{module.certification}</span>
                                        </div>
                                    </div>
                                    <p className="module-desc">{module.description}</p>
                                    <div className="module-topics">
                                        {module.topics.map((topic, tidx) => (
                                            <span key={tidx} className="topic-tag">{topic}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Target Audience Section */}
            <section className="audience-section">
                <div className="program-container">
                    <h2 className="section-title">
                        Who is this <span className="text-accent">Program</span> for?
                    </h2>
                    <div className="audience-grid">
                        {program.targetAudience.map((audience, idx) => (
                            <div key={idx} className="audience-card">
                                <h3 className="audience-title">{audience.title}</h3>
                                <p className="audience-desc">{audience.desc}</p>
                                <span className="audience-tag">{audience.tag}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Roles Section */}
            <section className="jobroles-section">
                <div className="program-container">
                    <h2 className="section-title">
                        <span className="text-accent">{program.jobRoles.length}+</span> Career Opportunities
                    </h2>
                    <div className="jobroles-grid">
                        {program.jobRoles.map((role, idx) => (
                            <div key={idx} className="jobrole-item">
                                <span className="role-icon">✓</span>
                                <span>{role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories Section */}
            <section className="success-section">
                <div className="program-container">
                    <span className="section-badge">SUCCESS STORIES</span>
                    <h2 className="section-title-left">What Our Learners Say</h2>

                    {/* Company Logos */}
                    <div className="company-logos">
                        <img src="/images/companies/capgemini.png" alt="Capgemini" />
                        <img src="/images/companies/infosys.png" alt="Infosys" />
                        <img src="/images/companies/wipro.png" alt="Wipro" />
                        <img src="/images/companies/tcs.png" alt="TCS" />
                        <img src="/images/companies/accenture.png" alt="Accenture" />
                        <img src="/images/companies/cognizant.png" alt="Cognizant" />
                        <img src="/images/companies/oracle.png" alt="Oracle" />
                        <img src="/images/companies/hcl.png" alt="HCL" />
                        <img src="/images/companies/deloitte.png" alt="Deloitte" />
                        <img src="/images/companies/ey.png" alt="EY" />
                    </div>

                    {/* Testimonials */}
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <h4 className="testimonial-name">Rajesh Kumar</h4>
                            <p className="testimonial-role">Security Analyst at <span className="company-badge deloitte">Deloitte</span></p>
                            <p className="testimonial-text">
                                The hands-on labs and real-world scenarios helped me understand actual attack patterns. The CND certification helped me land my dream job as a Security Analyst.
                            </p>
                        </div>
                        <div className="testimonial-card">
                            <h4 className="testimonial-name">Priyanka Sharma</h4>
                            <p className="testimonial-role">Network Security at <span className="company-badge pwc">PwC</span></p>
                            <p className="testimonial-text">
                                eHack's structured curriculum took me from a complete beginner to a certified professional. The practical training was invaluable for my career growth.
                            </p>
                        </div>
                        <div className="testimonial-card">
                            <h4 className="testimonial-name">Arun Menon</h4>
                            <p className="testimonial-role">IT Security at <span className="company-badge kpmg">KPMG</span></p>
                            <p className="testimonial-text">
                                The CSCU training was exactly what I needed to transition into cybersecurity. The instructors share practical insights beyond textbooks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section">
                <div className="program-container">
                    <div className="pricing-card">
                        <div className="pricing-header">
                            <h2>Your Investment</h2>
                            <p>Transform your career with world-class training</p>
                        </div>
                        <div className="pricing-content">
                            <div className="price-original">{program.pricing.original}</div>
                            <div className="price-discounted">{program.pricing.discounted}</div>
                            <div className="price-emi">EMI starting at {program.pricing.emi}</div>
                        </div>
                        <div className="pricing-cta">
                            <a href="tel:+919886035330" className="btn-primary btn-large">Enroll Now</a>
                            <p className="pricing-note">Talk to our counselor for custom payment plans</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="program-cta-section">
                <div className="program-container">
                    <h2>Ready to Start Your Cybersecurity Journey?</h2>
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
