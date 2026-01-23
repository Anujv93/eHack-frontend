import Link from 'next/link';
import './online-library-section.css';

interface OnlineLibraryCourse {
    title: string;
    description: string;
    category: string;
    level: string;
    affiliateLink: string;
    image: string;
}

const FEATURED_COURSES: OnlineLibraryCourse[] = [
    {
        title: 'Capture the Flag',
        description: 'Strengthen your pentesting skills through capture the flag exercises with walkthroughs',
        category: 'Ethical Hacking',
        level: 'Intermediate',
        affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/8Z8QkXF5/4yFBnkZGVaDbxF6f',
        image: '/images/Capture the Flag.jpg'
    },
    {
        title: 'Bug Bounty Hunting Essentials',
        description: 'Practical bug bounty hunting for hackers and pentesters with top tools and tricks',
        category: 'Bug Bounty',
        level: 'Intermediate',
        affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/Us775v10/4yFBnkZGVaDbxF6f',
        image: '/images/Bug Bounty Hunting Essentials.jpg'
    },
    {
        title: 'Master Open-Source Intelligence',
        description: 'Advanced OSINT techniques for hackers and penetration testers',
        category: 'OSINT',
        level: 'Advanced',
        affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/KtG5Oefw/4yFBnkZGVaDbxF6f',
        image: '/images/Master Open-Source Intelligence.jpg'
    },
    {
        title: 'Mastering Digital Forensics',
        description: 'Linux forensics, digital forensics for pentesters, and computer forensics best practices',
        category: 'Digital Forensics',
        level: 'Advanced',
        affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/exNKMTJD/4yFBnkZGVaDbxF6f',
        image: '/images/services/forensics.png'
    },
    {
        title: 'Ultimate Red Team Cyber Suite',
        description: 'Build new skills with comprehensive red team operations and offensive security',
        category: 'Red Team',
        level: 'Advanced',
        affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/cOXfXsOF/4yFBnkZGVaDbxF6f',
        image: '/images/Red Team Assessment.png'
    },
    {
        title: 'ChatGPT for Ethical Hackers',
        description: 'Learn to leverage ChatGPT and AI tools for ethical hacking and penetration testing',
        category: 'AI for Hacking',
        level: 'Intermediate',
        affiliateLink: 'https://coderedcheckout.eccouncil.org/referral/gzESbpRe/4yFBnkZGVaDbxF6f',
        image: '/images/ChatGPT for Ethical Hackers.png'
    }
];

const OnlineLibrarySection = () => {
    return (
        <section className="online-library-section" id="online-library">
            <div className="section-container">
                <div className="section-header">
                    <span className="section-badge">OUR ONLINE LIBRARY</span>
                    <h2 className="section-title">
                        World-Class <span className="text-accent">Cybersecurity</span> Courses
                    </h2>
                    <p className="section-subtitle">
                        Powered by <strong className="text-red">EC-Council CodeRed</strong>. Access thousands of premium videos and microdegrees.
                    </p>
                </div>

                <div className="library-courses-grid">
                    {FEATURED_COURSES.map((course, index) => (
                        <div key={index} className="library-card" style={{ '--card-index': index } as React.CSSProperties}>
                            <div className="card-image-wrapper">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="card-image"
                                />
                            </div>
                            <div className="card-category">{course.category}</div>

                            <div className="card-content">
                                <h3 className="card-title">{course.title}</h3>
                                <p className="card-description">{course.description}</p>
                            </div>

                            <div className="card-meta">
                                <span className="meta-badge">{course.level}</span>
                                <div className="meta-divider"></div>
                                <img src="/images/ec-council-logo.png" alt="EC-Council" className="meta-provider-logo" />
                            </div>

                            <div className="card-features">
                                <span className="feature-item">
                                    <span className="feature-dot"></span> Certificate
                                </span>
                                <span className="feature-item">
                                    <span className="feature-dot"></span> Online Access
                                </span>
                            </div>

                            <a
                                href={course.affiliateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-cta"
                            >
                                Enroll Now <span className="arrow">→</span>
                            </a>
                        </div>
                    ))}
                </div>

                <div className="library-footer">
                    <div className="footer-stats">
                        <div className="stat"><strong>27+</strong> <span>Certifications</span></div>
                        <div className="stat"><strong>400K+</strong> <span>Learners</span></div>
                        <div className="stat"><strong>9000+</strong> <span>Videos</span></div>
                    </div>

                    <Link href="/codered" className="view-all-btn">
                        View Complete Library
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default OnlineLibrarySection;
