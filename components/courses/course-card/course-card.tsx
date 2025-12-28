import Link from 'next/link';
import './course-card.css';

interface CourseCardProps {
    slug: string;
    title: string;
    shortDescription?: string;
    level: string;
    duration?: string;
    partnerName?: string;
    partnerLogo?: string;
    categories?: { name: string; colorCode: string }[];
}

export default function CourseCard({
    slug,
    title,
    shortDescription,
    level,
    duration,
    partnerName,
    partnerLogo,
    categories
}: CourseCardProps) {
    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Beginner': return '#64748B'; // Slate
            case 'Intermediate': return '#64748B'; // Slate
            case 'Advanced': return '#64748B'; // Slate
            case 'Expert': return '#64748B'; // Slate
            default: return '#64748B'; // Slate
        }
    };

    return (
        <Link href={`/certificate/${slug}`} className="course-card">
            <div className="course-card-header">
                {partnerLogo && (
                    <img
                        src={partnerLogo}
                        alt={partnerName || 'Partner'}
                        className="partner-logo"
                    />
                )}
            </div>

            <h3 className="course-title">{title}</h3>

            {shortDescription && (
                <p className="course-description">{shortDescription}</p>
            )}

            <div className="course-meta">
                {duration && (
                    <span className="meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                        {duration}
                    </span>
                )}
                {partnerName && (
                    <span className="meta-item partner-name">
                        {partnerName}
                    </span>
                )}
            </div>

            {categories && categories.length > 0 && (
                <div className="course-categories">
                    {categories.slice(0, 2).map((cat, index) => (
                        <span
                            key={index}
                            className="category-tag"
                            style={{
                                backgroundColor: `${cat.colorCode}15`,
                                color: cat.colorCode
                            }}
                        >
                            {cat.name}
                        </span>
                    ))}
                </div>
            )}

            <div className="course-cta">
                <span>View Course</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}
