import CourseCard from '@/components/courses/course-card/course-card';
import { CourseListItem } from '@/lib/strapi';
import './related-certificates.css';

interface RelatedCertificatesProps {
    title?: string;
    subtitle?: string;
    certificates: CourseListItem[];
}

export default function RelatedCertificates({
    title = "Related Certifications",
    subtitle = "Explore more certifications to advance your career",
    certificates
}: RelatedCertificatesProps) {
    if (!certificates || certificates.length === 0) {
        return null;
    }

    return (
        <section className="related-certificates border-bottom" id="related-certificates">
            <div className="related-certificates-container">
                <div className="related-certificates-header">
                    <div className="header-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        Recommended For You
                    </div>
                    <h2 className="related-certificates-title">{title}</h2>
                    <p className="related-certificates-subtitle">{subtitle}</p>
                </div>

                <div className="related-certificates-grid">
                    {certificates.map((cert) => (
                        <CourseCard
                            key={cert.documentId}
                            slug={cert.slug}
                            title={cert.Title}
                            shortDescription={cert.ShortDescription}
                            level={cert.Level}
                            duration={cert.Duration}
                            partnerName={cert.certification_partner?.Name}
                            partnerLogo={cert.certification_partner?.LogoUrl}
                            categories={cert.certification_categories?.map(cat => ({
                                name: cat.Name,
                                colorCode: cat.ColorCode
                            }))}
                        />
                    ))}
                </div>

                <div className="related-certificates-cta">
                    <a href="/courses" className="view-all-link">
                        View All Certifications
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
