import { CareerStatsSection as CareerStatsSectionType } from '@/lib/strapi';
import { TrendingUp, Award, Users, Target, Zap, Shield, Briefcase, BarChart } from 'lucide-react';
import './career-stats-section.css';

interface CareerStatsSectionProps {
    section: CareerStatsSectionType;
    videoLink?: string;
}

// Helper to get embed URL
const getEmbedUrl = (url: string): string => {
    if (!url) return "";
    const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
    return url;
};

// Array of decorative icons to cycle through
const decorativeIcons = [TrendingUp, Award, Users, Target, Zap, Shield, Briefcase, BarChart];

export default function CareerStatsSection({ section, videoLink }: CareerStatsSectionProps) {
    if (!section || !section.Stats || section.Stats.length === 0) {
        return null;
    }

    console.log("CareerStatsSection videoLink:", videoLink);

    return (
        <section className="section section-gray border-bottom" style={{ borderBottom: 'solid 1px #ff6b00' }} id="career-value">
            <div className="container">
                {/* Section Header */}
                <div className="section-header">
                    <h2>{section.Title}</h2>
                    <div className="red-underline-center"></div>
                </div>

                {section.Description && (
                    <p className="career-description">{section.Description}</p>
                )}

                <div className={`career-stats-wrapper ${videoLink ? 'has-video' : ''}`}>
                    <div className="career-stats-cards">
                        {/* Stats Grid */}
                        <div className="career-stats-grid">
                            {section.Stats.map((stat, index) => {
                                const DecorativeIcon = decorativeIcons[index % decorativeIcons.length];
                                // Check if IconSvg has actual content (not just empty tags)
                                const hasValidIcon = stat.IconSvg && stat.IconSvg.trim().length > 20;

                                return (
                                    <div key={index} className="career-stat-card">
                                        {/* Decorative background icon */}
                                        <DecorativeIcon className="decorative-icon" />

                                        <div className="stat-icon">
                                            {hasValidIcon ? (
                                                <div dangerouslySetInnerHTML={{ __html: stat.IconSvg! }} />
                                            ) : (
                                                <DecorativeIcon size={32} strokeWidth={2} />
                                            )}
                                        </div>
                                        <p className="stat-text">{stat.StatText}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {section.ButtonText && section.ButtonLink && (
                            <div className="career-cta-container">
                                <a href={section.ButtonLink} className="btn btn-primary btn-lg">
                                    {section.ButtonText}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Video Column */}
                    {videoLink && (
                        <div className="career-stats-video-container">
                            <iframe
                                src={getEmbedUrl(videoLink)}
                                title="Career Value Video"
                                className="career-stats-video-frame"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
