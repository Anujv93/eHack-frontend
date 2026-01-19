'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, Briefcase, ChevronRight, Filter } from 'lucide-react';
import { dummyJobs, jobCategories, Job } from './data';
import './career-page.css';

export default function CareerPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredJobs = useMemo(() => {
        return dummyJobs.filter((job) => {
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'all' || job.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-pattern"></div>
                <div className="container">
                    <div className="hero-grid">
                        <div className="hero-content-left">
                            <h1 className="hero-title">Join Our <span className="gradient-text">Mission</span></h1>
                            <p className="hero-subtitle">
                                Help us shape the future of cybersecurity education. We're looking for passionate individuals to join our growing team.
                            </p>

                            <div className="search-container">
                                <div className="search-input-wrapper">
                                    <Search className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search for roles (e.g. Instructor, Designer)"
                                        className="search-input"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="hero-content-right">
                            {/* Optimized Image usage */}
                            <img
                                src="/carrer-hero-image.png"
                                alt="eHack Academy Careers"
                                className="hero-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="categories-section">
                <div className="container">
                    <div className="categories-list">
                        {jobCategories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Jobs Listing */}
            <section className="jobs-section">
                <div className="container">
                    {filteredJobs.length > 0 ? (
                        <div className="jobs-grid">
                            {filteredJobs.map((job) => (
                                <div key={job.id} className="fade-in-up">
                                    <div className="job-card">
                                        <div className="job-header">
                                            <span className="job-type-badge">{job.type}</span>
                                            <span className="job-date">Posted {job.postedDate}</span>
                                        </div>

                                        <h3 className="job-title bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text">
                                            {job.title}
                                        </h3>

                                        <div className="job-meta">
                                            <div className="meta-item">
                                                <MapPin className="meta-icon" />
                                                <span>{job.location}</span>
                                            </div>
                                        </div>

                                        <p className="job-desc">{job.description}</p>

                                        <div className="job-footer">
                                            <div className="salary-tag">{job.salary || 'Competitive'}</div>
                                            <Link href={`/careers/${job.id}`} className="apply-link">
                                                Apply Now <ChevronRight size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
                            <p className="text-gray-500">We couldn't find any roles matching your search. Try different keywords or categories.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                className="mt-4 text-brand-primary font-medium hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
