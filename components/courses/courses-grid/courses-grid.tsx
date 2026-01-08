'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import CourseCard from '../course-card/course-card';
import { programs } from '@/data/programs';
import './courses-grid.css';

interface Course {
    id: number;
    slug: string;
    title: string;
    shortDescription?: string;
    level: string;
    duration?: string;
    partnerSlug?: string;
    partnerName?: string;
    partnerLogo?: string;
    categories?: { slug: string; name: string; colorCode: string }[];
}

interface Partner {
    id: number;
    name: string;
    slug: string;
    logo?: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    colorCode: string;
}

interface CoursesGridProps {
    courses: Course[];
    partners: Partner[];
    categories: Category[];
    initialSearch?: string;
}

// Kennedy University programs
const kennedyPrograms = [
    {
        slug: 'bscs',
        title: 'Bachelor of Science in Computer Science (BSCS)',
        description: 'A 4-year undergraduate degree program in Computer Science with global recognition.',
        duration: '4 Years',
        partner: 'Kennedy University',
        partnerLogo: '/images/kennedy-university-logo.png'
    },
    {
        slug: 'mscs',
        title: 'Master of Science in Computer Science (MSCS)',
        description: 'A 2-year graduate degree program for advanced Computer Science studies.',
        duration: '2 Years',
        partner: 'Kennedy University',
        partnerLogo: '/images/kennedy-university-logo.png'
    },
    {
        slug: 'integrated-bscs-mscs',
        title: 'Integrated BSCS + MSCS Program',
        description: 'A comprehensive 5-year integrated program combining undergraduate and graduate studies.',
        duration: '5 Years',
        partner: 'Kennedy University',
        partnerLogo: '/images/kennedy-university-logo.png'
    }
];

export default function CoursesGrid({ courses, partners, categories, initialSearch = '' }: CoursesGridProps) {
    const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [activeTab, setActiveTab] = useState<'popular' | 'ehack' | 'kennedy'>('popular');
    const [sortBy, setSortBy] = useState('newest');

    const toggleFilter = (value: string, selected: string[], setSelected: (val: string[]) => void) => {
        if (selected.includes(value)) {
            setSelected(selected.filter(item => item !== value));
        } else {
            setSelected([...selected, value]);
        }
    };

    const filteredCourses = useMemo(() => {
        let result = courses.filter((course) => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesTitle = course.title.toLowerCase().includes(query);
                const matchesDescription = course.shortDescription?.toLowerCase().includes(query);
                const matchesPartner = course.partnerName?.toLowerCase().includes(query);

                if (!matchesTitle && !matchesDescription && !matchesPartner) {
                    return false;
                }
            }

            // Partner filter
            if (selectedPartners.length > 0 && !selectedPartners.includes(course.partnerSlug || '')) {
                return false;
            }

            // Category filter
            if (selectedCategories.length > 0) {
                const hasCategory = course.categories?.some(cat => selectedCategories.includes(cat.slug));
                if (!hasCategory) return false;
            }

            // Level filter
            if (selectedLevels.length > 0 && !selectedLevels.includes(course.level)) {
                return false;
            }

            return true;
        });

        // Sort
        if (sortBy === 'newest') {
            result = [...result].reverse();
        }

        return result;
    }, [courses, selectedPartners, selectedCategories, selectedLevels, searchQuery, sortBy]);

    const handleClearFilters = () => {
        setSelectedPartners([]);
        setSelectedCategories([]);
        setSelectedLevels([]);
        setSearchQuery('');
    };

    const hasActiveFilters = selectedPartners.length > 0 || selectedCategories.length > 0 || selectedLevels.length > 0;

    const uniqueLevels = Array.from(new Set(courses.map(c => c.level)));

    return (
        <div className="courses-layout">
            {/* Sidebar */}
            <aside className="filters-sidebar">
                <div className="filters-header">
                    <h3>Filters</h3>
                    {hasActiveFilters && (
                        <button className="clear-all-btn" onClick={handleClearFilters}>
                            Clear All
                        </button>
                    )}
                </div>

                {/* Partners Filter */}
                <div className="filter-section">
                    <h4 className="filter-heading">Partner</h4>
                    <div className="filter-options">
                        {partners.map((partner) => (
                            <label key={partner.id} className="filter-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedPartners.includes(partner.slug)}
                                    onChange={() => toggleFilter(partner.slug, selectedPartners, setSelectedPartners)}
                                />
                                <span>{partner.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Level Filter */}
                <div className="filter-section">
                    <h4 className="filter-heading">Level</h4>
                    <div className="filter-options">
                        {uniqueLevels.map((level) => (
                            <label key={level} className="filter-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedLevels.includes(level)}
                                    onChange={() => toggleFilter(level, selectedLevels, setSelectedLevels)}
                                />
                                <span>{level}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Categories Filter */}
                <div className="filter-section">
                    <h4 className="filter-heading">Category</h4>
                    <div className="filter-options">
                        {categories.map((category) => (
                            <label key={category.id} className="filter-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category.slug)}
                                    onChange={() => toggleFilter(category.slug, selectedCategories, setSelectedCategories)}
                                />
                                <span>{category.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="courses-main">
                {/* Search Bar */}
                <div className="search-container">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Tabs and Sort */}
                <div className="controls-bar">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'popular' ? 'active' : ''}`}
                            onClick={() => setActiveTab('popular')}
                        >
                            Certifications
                        </button>
                        <button
                            className={`tab ${activeTab === 'ehack' ? 'active' : ''}`}
                            onClick={() => setActiveTab('ehack')}
                        >
                            eHack Programs
                        </button>
                        <button
                            className={`tab ${activeTab === 'kennedy' ? 'active' : ''}`}
                            onClick={() => setActiveTab('kennedy')}
                        >
                            Kennedy University Programs
                        </button>
                    </div>
                    <div className="sort-controls">
                        <span className="sort-label">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="results-info">
                    <h3>
                        {activeTab === 'popular' && 'Courses'}
                        {activeTab === 'ehack' && 'eHack Originals'}
                        {activeTab === 'kennedy' && 'Kennedy University Programs'}
                    </h3>
                </div>

                {/* Most Popular Tab - Strapi Courses */}
                {activeTab === 'popular' && (
                    <>
                        {filteredCourses.length === 0 ? (
                            <div className="no-results">
                                <p>No courses found matching your criteria.</p>
                                <button className="clear-btn" onClick={handleClearFilters}>
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="courses-grid">
                                {filteredCourses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        slug={course.slug}
                                        title={course.title}
                                        shortDescription={course.shortDescription}
                                        level={course.level}
                                        duration={course.duration}
                                        partnerName={course.partnerName}
                                        partnerLogo={course.partnerLogo}
                                        categories={course.categories}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* eHack Originals Tab */}
                {activeTab === 'ehack' && (
                    <div className="courses-grid">
                        {programs.map((program) => (
                            <div key={program.slug} className="course-card">
                                <div className="card-header">
                                    <img
                                        src={program.ehackLogo}
                                        alt="eHack Academy"
                                        className="partner-logo"
                                    />
                                </div>
                                <div className="card-content">
                                    <h3 className="course-title">{program.title}</h3>
                                    <p className="course-description">{program.description}</p>
                                    <div className="course-meta">
                                        {program.stats.duration && (
                                            <span className="meta-item">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 6v6l4 2" />
                                                </svg>
                                                {program.stats.duration}
                                            </span>
                                        )}
                                        <span className="meta-item partner-name">{program.partner}</span>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <Link href={`/programs/${program.slug}`} className="view-course-link">
                                        View Program <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Kennedy University Tab */}
                {activeTab === 'kennedy' && (
                    <div className="courses-grid">
                        {kennedyPrograms.map((program) => (
                            <div key={program.slug} className="course-card kennedy-card">
                                <div className="card-header partnership-header">
                                    <div className="partnership-logos">
                                        <img
                                            src="/ehack-black.png"
                                            alt="eHack Academy"
                                            className="partner-logo ehack-logo"
                                        />
                                        <span className="partnership-separator">
                                            X
                                        </span>
                                        <img
                                            src={program.partnerLogo}
                                            alt="Kennedy University"
                                            className="partner-logo kennedy-logo"
                                        />
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h3 className="course-title">{program.title}</h3>
                                    <p className="course-description">{program.description}</p>
                                    <div className="course-meta">
                                        <span className="meta-item">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 6v6l4 2" />
                                            </svg>
                                            {program.duration}
                                        </span>
                                        <span className="meta-item partner-name">{program.partner}</span>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <Link href={`/kennedy-university/${program.slug}`} className="view-course-link">
                                        View Program <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
