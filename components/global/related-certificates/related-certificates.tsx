import Link from 'next/link';
import { getProgramBySlug, programCategories } from '@/data/programs';
import { CourseListItem } from '@/lib/strapi';
import './related-certificates.css';

interface RelatedCertificatesProps {
    title?: string;
    subtitle?: string;
    certificates?: CourseListItem[]; // Kept for compatibility but unused
}

export default function RelatedCertificates({
    title = "Explore More Programs",
    subtitle = "Discover our most popular programs in Cybersecurity and beyond",
    certificates
}: RelatedCertificatesProps) {

    // 1. Cybersecurity Programs
    const cyberProgramsSlugs = [
        'masters-ethical-hacking',
        'graduate-cybersecurity',
        'masterclass-ethical-hacking-ceh-v13'
    ];

    // 2. Other Popular Programs
    const otherProgramsSlugs = [
        'robotics-for-all',
        'digital-marketing-masterprogram',
        'data-science-analytics'
    ];

    const cyberPrograms = cyberProgramsSlugs.map(slug => getProgramBySlug(slug)).filter(Boolean);
    const otherPrograms = otherProgramsSlugs.map(slug => getProgramBySlug(slug)).filter(Boolean);

    // Helper to get category background
    const getCategoryBg = (categorySlug: string) => {
        const category = programCategories.find(c => c.slug === categorySlug);
        return category?.backgroundImage || '/images/cybersecurity.jpg';
    };

    return (
        <section className="related-certificates border-bottom" style={{ borderBottom: 'solid 1px #ff6b00', backgroundColor: '#ffff' }} id="related-certificates">
            <div className="related-certificates-container">
                <div className="related-certificates-header">
                    <div className="header-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        Recommended For You
                    </div>
                    <h2 className="related-certificates-title">
                        Explore More <span style={{ color: '#ff6b00' }}>Programs</span>
                    </h2>
                    <p className="related-certificates-subtitle">{subtitle}</p>
                </div>

                {/* Cybersecurity Section */}
                {cyberPrograms.length > 0 && (
                    <div className="related-certificates-section">
                        <h3 className="related-certificates-section-title">
                            Cybersecurity Programs
                        </h3>
                        <div className="explore-programs-row">
                            {cyberPrograms.map((program) => (
                                <Link
                                    key={program!.slug}
                                    href={`/programs/${program!.slug}`}
                                    className="explore-program-card"
                                    style={{ backgroundImage: `url('${getCategoryBg(program!.category)}')` }}
                                >
                                    <div className="explore-card-overlay" />
                                    <div className="explore-card-content">
                                        {program!.partnerLogo && (
                                            <img src={program!.partnerLogo} alt={program!.partner || 'Partner'} className="explore-partner-logo" />
                                        )}
                                        <h4>{program!.title}</h4>
                                        <div className="explore-card-meta">
                                            <span className="explore-duration">{program!.stats.duration}</span>
                                            <span className="explore-price">{program!.pricing.discounted}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Other Programs Section */}
                {otherPrograms.length > 0 && (
                    <div className="related-certificates-section">
                        <h3 className="related-certificates-section-title">
                            Popular in Other Domains
                        </h3>
                        <div className="explore-programs-row">
                            {otherPrograms.map((program) => (
                                <Link
                                    key={program!.slug}
                                    href={`/programs/${program!.slug}`}
                                    className="explore-program-card"
                                    style={{ backgroundImage: `url('${getCategoryBg(program!.category)}')` }}
                                >
                                    <div className="explore-card-overlay" />
                                    <div className="explore-card-content">
                                        {program!.partnerLogo && (
                                            <img src={program!.partnerLogo} alt={program!.partner || 'Partner'} className="explore-partner-logo" />
                                        )}
                                        <h4>{program!.title}</h4>
                                        <div className="explore-card-meta">
                                            <span className="explore-duration">{program!.stats.duration}</span>
                                            <span className="explore-price">{program!.pricing.discounted}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="related-certificates-cta">
                    <Link href="/courses" className="view-all-link">
                        View All Programs
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
