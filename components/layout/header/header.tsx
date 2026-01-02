'use client';

import { useState } from 'react';
import Link from 'next/link';
import './header.css';

interface Partner {
    id: number;
    name: string;
    slug: string;
    logoUrl?: string;
    courseCount: number;
}

interface Course {
    id: number;
    slug: string;
    title: string;
    duration?: string;
    partnerSlug?: string;
}

interface HeaderProps {
    partners: Partner[];
    courses: Course[];
}

export default function Header({ partners, courses }: HeaderProps) {
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [activePartner, setActivePartner] = useState<string | null>(
        partners.length > 0 ? partners[0].slug : null
    );

    const filteredCourses = activePartner
        ? courses.filter(c => c.partnerSlug === activePartner)
        : [];

    const activePartnerData = partners.find(p => p.slug === activePartner);

    return (
        <header className="header">
            <div className="header-container">
                <Link href="/" className="logo">
                    <img src="/ehack-black.png" alt="eHack Academy" className="logo-image" />
                </Link>

                <nav className="nav">
                    <Link href="/courses" className="nav-link">Courses</Link>

                    {/* Learning Options Dropdown */}
                    <div className="dropdown-wrapper">
                        <button className="nav-link nav-dropdown-btn">
                            Learning Options
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className="dropdown-menu">
                            <Link href="/learning-options#live-online" className="dropdown-item">Live Online Training</Link>
                            <Link href="/learning-options#classroom" className="dropdown-item">Classroom Training</Link>
                            <Link href="/learning-options#one-on-one" className="dropdown-item">1-on-1 Training</Link>
                            <Link href="/learning-options#fly-trainer" className="dropdown-item">Fly-Me-a-Trainer</Link>
                            <Link href="/learning-options#flexi" className="dropdown-item">Flexi</Link>
                            <Link href="/learning-options#customized" className="dropdown-item">Customized Training</Link>
                            <Link href="/learning-options#webinar" className="dropdown-item">Webinar as a Service</Link>
                            <Link href="/learning-options#upcoming" className="dropdown-item">Upcoming Webinars</Link>
                        </div>
                    </div>

                    {/* Mega Menu Wrapper */}
                    <div
                        className="mega-menu-wrapper"
                        onMouseEnter={() => setMegaMenuOpen(true)}
                        onMouseLeave={() => setMegaMenuOpen(false)}
                    >
                        <button className="nav-link nav-dropdown-btn">
                            Our Programs
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Mega Menu Dropdown */}
                        <div className={`mega-menu ${megaMenuOpen ? 'mega-menu-open' : ''}`}>
                            <div className="mega-menu-inner">
                                {/* Left Side: Partners */}
                                <div className="mega-menu-left">
                                    <h4 className="mega-menu-heading">Certification Partners</h4>
                                    <div className="mega-partners">
                                        {partners.map((partner) => (
                                            <div
                                                key={partner.id}
                                                className={`mega-partner-card ${activePartner === partner.slug ? 'active' : ''}`}
                                                onMouseEnter={() => setActivePartner(partner.slug)}
                                            >
                                                {partner.logoUrl ? (
                                                    <img src={partner.logoUrl} alt={partner.name} className="partner-logo-img" />
                                                ) : (
                                                    <span className="partner-logo-placeholder">{partner.name[0]}</span>
                                                )}
                                                <div className="partner-info">
                                                    <span className="partner-name">{partner.name}</span>
                                                    <span className="partner-count">{partner.courseCount} Courses</span>
                                                </div>
                                                <span className="partner-arrow">→</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/courses" className="mega-view-all">
                                        View All Courses →
                                    </Link>
                                </div>

                                {/* Middle Section: Courses + eHack Originals */}
                                <div className="mega-menu-middle">
                                    {/* Courses */}
                                    <div className="mega-menu-right">
                                        <h4 className="mega-menu-heading">
                                            {activePartnerData ? `${activePartnerData.name} Courses` : 'Courses'}
                                        </h4>
                                        <div className="mega-courses">
                                            {filteredCourses.length > 0 ? (
                                                filteredCourses.map((course) => (
                                                    <Link
                                                        key={course.id}
                                                        href={`/certificate/${course.slug}`}
                                                        className="mega-course-item"
                                                    >
                                                        <span className="mega-course-name">{course.title}</span>
                                                        {course.duration && (
                                                            <span className="mega-course-duration">{course.duration}</span>
                                                        )}
                                                    </Link>
                                                ))
                                            ) : (
                                                <p className="mega-no-courses">No courses available</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Kennedy University Section - Right Column */}
                                <div className="mega-menu-kennedy">
                                    <h4 className="mega-menu-heading">Global Degrees</h4>
                                    <Link href="/kennedy-university" className="kennedy-partnership-card">
                                        <div className="kennedy-logos">
                                            <img src="/images/kennedy-university-logo.png" alt="Kennedy University" className="kennedy-logo-img" />
                                            <span className="kennedy-logo-divider">×</span>
                                            <img src="/images/ec-council-logo.png" alt="EC-Council" className="kennedy-logo-img ec-council" />
                                        </div>
                                        <p className="kennedy-text">
                                            Earn internationally accredited degrees in collaboration with EC-Council certifications
                                        </p>
                                        <span className="kennedy-cta">Learn More →</span>
                                    </Link>
                                </div>
                            </div>

                            {/* eHack Originals - Full Width */}
                            <div className="mega-menu-originals-full">
                                <h4 className="mega-menu-heading">eHack Originals</h4>
                                <div className="mega-originals-grid">
                                    <Link href="/programs/diploma-cybersecurity" className="mega-original-card">
                                        <span className="original-title">Diploma in Cybersecurity</span>
                                        <span className="original-subtitle">Foundation Program</span>
                                    </Link>
                                    <Link href="/programs/graduate-cybersecurity" className="mega-original-card">
                                        <span className="original-title">Graduate Program</span>
                                        <span className="original-subtitle">Advanced Training</span>
                                    </Link>
                                    <Link href="/programs/masters-ethical-hacking" className="mega-original-card">
                                        <span className="original-title">Masters in Ethical Hacking</span>
                                        <span className="original-subtitle">Expert Level</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/about" className="nav-link">About</Link>
                </nav>

                <div className="header-actions">
                    <Link href="#get-started" className="cta-btn">Get Started</Link>
                </div>
            </div>
        </header>
    );
}
