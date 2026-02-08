import { JobRolesSection as JobRolesSectionType } from '@/lib/strapi';
import './job-roles-section.css';

interface JobRolesSectionProps {
    section: JobRolesSectionType;
}

export default function JobRolesSection({ section }: JobRolesSectionProps) {
    if (!section || !section.JobRoles || section.JobRoles.length === 0) {
        return null;
    }

    return (
        <section className="job-roles-section" id="job-roles">
            <div className="container">
                {/* Section Header */}
                <div className="job-roles-header">
                    <span className="job-roles-badge">Unlock Your Potential</span>
                    <h2 className="job-roles-title">
                        <span className="title-highlight">Career Paths</span> You Can Pursue
                    </h2>
                    {section.Description && (
                        <p className="job-roles-subtitle">{section.Description}</p>
                    )}
                </div>

                {/* Premium Card Layout */}
                <div className="job-roles-showcase">
                    {/* Featured Role - First Item */}
                    <div className="featured-role-card">
                        <div className="featured-badge">Most Popular</div>
                        <h3 className="featured-role-name">{section.JobRoles[0]?.RoleName}</h3>
                        <div className="featured-decoration">
                            <div className="decoration-line"></div>
                            <div className="decoration-dot"></div>
                            <div className="decoration-line"></div>
                        </div>
                    </div>

                    {/* Other Roles Grid */}
                    <div className="roles-grid">
                        {section.JobRoles.slice(1).map((role, index) => (
                            <div key={index} className="role-card">
                                <div className="role-indicator">
                                    <span className="indicator-line"></span>
                                </div>
                                <span className="role-name">{role.RoleName}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Stats Bar */}
                <div className="roles-footer">
                    <div className="footer-stat">
                        <span className="stat-number">50,000+</span>
                        <span className="stat-text">Career Paths</span>
                    </div>
                    <div className="footer-divider"></div>
                    <div className="footer-stat">
                        <span className="stat-number">High</span>
                        <span className="stat-text">Demand Roles</span>
                    </div>
                    <div className="footer-divider"></div>
                    <div className="footer-stat">
                        <span className="stat-number">Global</span>
                        <span className="stat-text">Opportunities</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
