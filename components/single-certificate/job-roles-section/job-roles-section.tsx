import { JobRolesSection as JobRolesSectionType } from '@/lib/strapi';
import './job-roles-section.css';

interface JobRolesSectionProps {
    section: JobRolesSectionType;
}

export default function JobRolesSection({ section }: JobRolesSectionProps) {
    if (!section || !section.JobRoles || section.JobRoles.length === 0) {
        return null;
    }

    // Split job roles into two columns
    const midPoint = Math.ceil(section.JobRoles.length / 2);
    const leftColumn = section.JobRoles.slice(0, midPoint);
    const rightColumn = section.JobRoles.slice(midPoint);

    return (
        <section className="job-roles-section" id="job-roles">
            <div className="container">
                <div className="job-roles-card">
                    {/* Icon */}
                    {section.IconSvg && (
                        <div
                            className="job-roles-icon"
                            dangerouslySetInnerHTML={{ __html: section.IconSvg }}
                        />
                    )}

                    {/* Title */}
                    <h3 className="job-roles-title">{section.Title}</h3>

                    {/* Description */}
                    {section.Description && (
                        <p className="job-roles-description">{section.Description}</p>
                    )}

                    {/* Job Roles Grid */}
                    <div className="job-roles-grid">
                        <ul className="job-roles-list">
                            {leftColumn.map((role, index) => (
                                <li key={index} className="job-role-item">
                                    {role.RoleName}
                                </li>
                            ))}
                        </ul>
                        <ul className="job-roles-list">
                            {rightColumn.map((role, index) => (
                                <li key={index} className="job-role-item">
                                    {role.RoleName}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
