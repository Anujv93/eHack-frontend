'use client';

import { useState } from 'react';
import { CourseOutlineSection as CourseOutlineSectionType } from '@/lib/strapi';
import { CheckCircle, X } from 'lucide-react';
import InquiryForm from '@/components/global/inquiry-form/inquiry-form';
import './course-outline-section.css';

interface CourseOutlineSectionProps {
    section: CourseOutlineSectionType;
    brochureUrl?: string;
}

export default function CourseOutlineSection({ section, brochureUrl }: CourseOutlineSectionProps) {
    // Match Program page behavior: one active module at a time, default first one open (0), or none (-1)
    // Program page defaults to 0. 
    const [activeModule, setActiveModule] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);

    const handleDownloadClick = (e: React.MouseEvent) => {
        if (!brochureUrl) {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        setShowModal(true);
    };

    const handleFormSuccess = () => {
        // Trigger download
        if (brochureUrl) {
            const link = document.createElement('a');
            link.href = brochureUrl;
            link.target = '_blank';
            link.download = 'brochure.pdf'; // browser might ignore this for cross-origin but worth trying
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        // Close modal after a delay to show success message
        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

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
                        <span className="curriculum-eyebrow">
                            {section.badge || "LEARNING PATH"}
                        </span>
                        <h2 className="curriculum-title-modern">
                            {(() => {
                                const title = section.Title || '';

                                // Helper to process **highlighted** text or <span>highlighted</span> text
                                const processText = (text: string) => {
                                    if (!text) return null;
                                    const parts = text.split(/(\*\*.*?\*\*|<span>.*?<\/span>)/g);
                                    let hasManualHighlight = false;

                                    const processed = parts.map((part, i) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            hasManualHighlight = true;
                                            return <span key={i} className="text-accent">{part.slice(2, -2)}</span>;
                                        }
                                        if (part.startsWith('<span>') && part.endsWith('</span>')) {
                                            hasManualHighlight = true;
                                            return <span key={i} className="text-accent">{part.slice(6, -7)}</span>;
                                        }
                                        return part;
                                    });

                                    return { processed, hasManualHighlight };
                                };

                                const result = processText(title);

                                // Fallback: If no manual highlight, highlight the first word
                                if (!result?.hasManualHighlight && title) {
                                    const words = title.split(' ');
                                    if (words.length > 0) {
                                        return (
                                            <>
                                                <span className="text-accent">{words[0]}</span> {words.slice(1).join(' ')}
                                            </>
                                        );
                                    }
                                }

                                return result?.processed;
                            })()}
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
                            onClick={handleDownloadClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            {brochureUrl ? "Download Brochure" : "Brochure Coming Soon"}
                        </a>
                    </div>
                </div>
            </div>

            {/* Download Brochure Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden" style={{ position: 'relative', width: '100%', maxWidth: '480px', backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden' }}>
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors z-10"
                            style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem', background: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer', zIndex: 10 }}
                        >
                            <X size={20} />
                        </button>

                        <div className="p-6" style={{ padding: '0' }}>
                            <InquiryForm
                                courseName={section.Title || 'Course Brochure'}
                                courseCode={section.Title?.toLowerCase().replace(/\s+/g, '-') || 'brochure-download'}
                                variant="popup"
                                title="Download Brochure"
                                subtitle="Fill the form to download detailed curriculum"
                                onSuccess={handleFormSuccess}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
