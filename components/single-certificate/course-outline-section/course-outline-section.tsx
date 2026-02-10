'use client';

import { useState } from 'react';
import { CourseOutlineSection as CourseOutlineSectionType } from '@/lib/strapi';
import { CheckCircle } from 'lucide-react';
import './course-outline-section.css';

interface CourseOutlineSectionProps {
    section: CourseOutlineSectionType;
    brochureUrl?: string;
}

export default function CourseOutlineSection({ section, brochureUrl }: CourseOutlineSectionProps) {
    // Match Program page behavior: one active module at a time, default first one open (0), or none (-1)
    // Program page defaults to 0. 
    const [activeModule, setActiveModule] = useState<number>(0);

    if (!section || !section.Modules || section.Modules.length === 0) {
        return null;
    }

    const toggleModule = (index: number) => {
        setActiveModule(activeModule === index ? -1 : index);
    };

    return (
        <section className="curriculum-section-modern" id="course-outline">
            <div className="curriculum-container-modern">
                {/* Header */}
                <div className="curriculum-header-modern">
                    <div className="curriculum-header-content">
                        {section.badge && (
                            <span className="curriculum-eyebrow">{section.badge}</span>
                        )}
                        <h2 className="curriculum-title-modern">
                            {section.Title}
                        </h2>
                        {section.description && (
                            <p className="curriculum-subtitle-modern">
                                {section.description}
                            </p>
                        )}
                    </div>
                    <div className="curriculum-stats-modern">
                        {/* Modules Stat */}
                        <div className="curr-stat-modern">
                            <div className="curr-stat-value-modern">
                                {section.total_module !== undefined ? section.total_module : section.Modules.length}
                            </div>
                            <div className="curr-stat-label-modern">Modules</div>
                        </div>

                        {/* Hours Stat */}
                        {(section.total_hours !== undefined) && (
                            <div className="curr-stat-modern">
                                <div className="curr-stat-value-modern">{section.total_hours}</div>
                                <div className="curr-stat-label-modern">Hours</div>
                            </div>
                        )}

                        {/* Certifications Stat */}
                        {(section.certification !== undefined) && (
                            <div className="curr-stat-modern">
                                <div className="curr-stat-value-modern">{section.certification}</div>
                                <div className="curr-stat-label-modern">Certifications</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Timeline Modules */}
                <div className="curriculum-timeline">
                    {section.Modules.map((module, idx) => (
                        <div key={idx} className={`curriculum-module-modern ${activeModule === idx ? 'active' : ''}`}>
                            {/* Timeline Connector */}
                            <div className="timeline-connector">
                                <div className={`timeline-dot`}>
                                    {module.ModuleNumber || idx + 1}
                                </div>
                                {idx < section.Modules.length - 1 && <div className="timeline-line"></div>}
                            </div>

                            {/* Module Card */}
                            <div className="module-card-modern" onClick={() => toggleModule(idx)}>
                                <div className="module-card-header">
                                    <div className="module-info">
                                        <span className="module-number-label">Module {module.ModuleNumber || idx + 1}</span>
                                        <h4 className="module-title-modern">{module.ModuleTitle}</h4>

                                        {/* Meta info like Duration/Cert could go here if added to Module schema later */}
                                        <div className="module-meta-modern">
                                            {/* Example placeholder if data existed:
                                            <span className="module-duration-modern">
                                                <svg ... /> {module.Duration}
                                            </span>
                                            */}
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
                                        {module.Description && (
                                            <p className="module-description-modern">{module.Description}</p>
                                        )}

                                        {module.Topics && module.Topics.length > 0 && (
                                            <div className="module-topics-modern">
                                                <span className="topics-label">What you'll learn:</span>
                                                <div className="topics-grid">
                                                    {module.Topics.map((topic, tidx) => (
                                                        <span key={tidx} className="topic-item">
                                                            <CheckCircle size={16} strokeWidth={2.5} />
                                                            {topic.TopicName}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
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
                            href={brochureUrl || '#'}
                            className={`btn-download-modern ${!brochureUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
                            target={brochureUrl ? "_blank" : undefined}
                            rel={brochureUrl ? "noopener noreferrer" : undefined}
                            download={brochureUrl ? true : undefined}
                            onClick={(e) => !brochureUrl && e.preventDefault()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            {brochureUrl ? "Download Brochure" : "Brochure Coming Soon"}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
