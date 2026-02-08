'use client';

import { useState } from 'react';
import { CourseOutlineSection as CourseOutlineSectionType } from '@/lib/strapi';
import './course-outline-section.css';

interface CourseOutlineSectionProps {
    section: CourseOutlineSectionType;
    brochureUrl?: string; // Add this prop
}

export default function CourseOutlineSection({ section, brochureUrl }: CourseOutlineSectionProps) {
    const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

    if (!section || !section.Modules || section.Modules.length === 0) {
        return null;
    }

    const toggleModule = (index: number) => {
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedModules(newExpanded);
    };

    return (
        <section className="section section-gray border-bottom" style={{ borderBottom: 'solid 1px #ff6b00' }} id="course-outline">
            <div className="container">
                {/* Section Header */}
                <div className="section-header">
                    <h2>{section.Title}</h2>
                    <div className="red-underline-center"></div>
                </div>

                {/* Modules List */}
                <div className="course-modules-list">
                    {section.Modules.map((module, index) => (
                        <div key={index} className="course-module-item">
                            <button
                                className="module-header"
                                onClick={() => toggleModule(index)}
                                aria-expanded={expandedModules.has(index)}
                            >
                                <span className="module-title">
                                    <span className="module-number">{module.ModuleNumber}:</span>
                                    {' '}
                                    {module.ModuleTitle}
                                </span>

                            </button>

                            {expandedModules.has(index) && module.Topics && module.Topics.length > 0 && (
                                <div className="module-content">
                                    <ul className="module-topics-list">
                                        {module.Topics.map((topic, topicIndex) => (
                                            <li key={topicIndex} className="module-topic-item">
                                                {topic.TopicName}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="course-outline-cta" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                    {section.CTAButtonText && section.CTAButtonLink && (
                        <a href={section.CTAButtonLink} className="btn btn-primary btn-lg">
                            {section.CTAButtonText}
                        </a>
                    )}

                    {brochureUrl ? (
                        <a
                            href={brochureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-lg"
                            download
                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Download Brochure
                        </a>
                    ) : (
                        <button
                            className="btn btn-primary btn-lg"
                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            onClick={() => alert('Brochure is coming soon!')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Download Brochure
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
