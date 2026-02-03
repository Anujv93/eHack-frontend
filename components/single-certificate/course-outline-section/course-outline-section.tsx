'use client';

import { useState } from 'react';
import { CourseOutlineSection as CourseOutlineSectionType } from '@/lib/strapi';
import './course-outline-section.css';

interface CourseOutlineSectionProps {
    section: CourseOutlineSectionType;
}

export default function CourseOutlineSection({ section }: CourseOutlineSectionProps) {
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
                                <span className={`expand-icon ${expandedModules.has(index) ? 'expanded' : ''}`}>
                                    +
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

                {/* CTA Button */}
                {section.CTAButtonText && section.CTAButtonLink && (
                    <div className="course-outline-cta">
                        <a href={section.CTAButtonLink} className="btn btn-primary btn-lg">
                            {section.CTAButtonText}
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
