'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { getProgramsByCategory, getCategoryBySlug, programCategories } from '@/data/programs';
import './page.css';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: PageProps) {
    const { slug } = use(params);
    const category = getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const programs = getProgramsByCategory(slug);

    return (
        <main className="category-page">
            <div className="category-header">
                {/* Background Image */}
                <div
                    className="category-header-bg"
                    style={{ backgroundImage: `url('${category.backgroundImage}')` }}
                />
                <div className="category-header-overlay" />
                <div className="container">
                    <h1>{category.name} Programs</h1>
                    <p>{category.description}</p>
                </div>
            </div>

            <section className="category-content">
                <div className="container">
                    {programs.length > 0 ? (
                        <div className={`programs-grid ${programs.length === 1 ? 'single-card' : ''}`}>
                            {programs.map((program) => (
                                <Link
                                    key={program.slug}
                                    href={`/programs/${program.slug}`}
                                    className="program-card"
                                >
                                    <div className="program-card-header">
                                        {slug === 'cybersecurity' ? (
                                            <div className="program-logos-row">
                                                <img src="/ehack-black.png" alt="eHack Academy" className="program-partner-logo" />
                                                {program.partnerLogo && (
                                                    <>
                                                        <div className="logo-separator"></div>
                                                        <img src={program.partnerLogo} alt={program.partner || 'Partner'} className="program-partner-logo" />
                                                    </>
                                                )}
                                            </div>
                                        ) : program.partnerLogo ? (
                                            <img src={program.partnerLogo} alt={program.partner || 'Partner'} className="program-partner-logo" />
                                        ) : (
                                            <img src="/ehack-black.png" alt="eHack Academy" className="program-partner-logo" />
                                        )}
                                    </div>
                                    <h3 className="program-title">{program.title}</h3>
                                    <p className="program-subtitle">{program.subtitle}</p>
                                    <div className="program-meta">
                                        <span className="program-duration">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                            {program.stats.duration}
                                        </span>
                                        <span className="program-mode">{program.stats.mode}</span>
                                    </div>
                                    <div className="program-pricing">
                                        <span className="program-price">{program.pricing.discounted}</span>
                                        <span className="program-original">{program.pricing.original}</span>
                                    </div>
                                    <span className="program-cta">View Program Details →</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="no-programs">
                            <span className="no-programs-icon">🚀</span>
                            <h2>Coming Soon!</h2>
                            <p>We're working on exciting {category.name} programs. Stay tuned!</p>
                            <Link href="/courses" className="browse-courses-btn">
                                Browse All Courses
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Explore More Programs */}
            <section className="explore-more-section">
                <div className="container">
                    <h2>Explore More Programs</h2>
                    <div className="explore-categories-scroll">
                        {programCategories.filter(c => c.slug !== slug).map((cat) => {
                            const catPrograms = getProgramsByCategory(cat.slug);
                            if (catPrograms.length === 0) return null;

                            return (
                                <div key={cat.slug} className="explore-category-block">
                                    <div className="explore-category-title">
                                        <span className="explore-cat-name">{cat.name}</span>
                                        <Link href={`/categories/${cat.slug}`} className="explore-view-all">
                                            View All →
                                        </Link>
                                    </div>
                                    <div className="explore-programs-row">
                                        {catPrograms.slice(0, 2).map((program) => (
                                            <Link
                                                key={program.slug}
                                                href={`/programs/${program.slug}`}
                                                className="explore-program-card"
                                                style={{ backgroundImage: `url('${cat.backgroundImage}')` }}
                                            >
                                                <div className="explore-card-overlay" />
                                                <div className="explore-card-content">
                                                    {program.partnerLogo && (
                                                        <img src={program.partnerLogo} alt={program.partner || 'Partner'} className="explore-partner-logo" />
                                                    )}
                                                    <h4>{program.title}</h4>
                                                    <div className="explore-card-meta">
                                                        <span className="explore-duration">{program.stats.duration}</span>
                                                        <span className="explore-price">{program.pricing.discounted}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
