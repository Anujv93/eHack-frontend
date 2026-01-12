'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Handshake } from 'lucide-react';
import './header.css';
import './header-search.css';

// Corporate Services Data for dropdown
const corporateServices = [
    { id: 'web-application-security', title: 'Web Application Security Assessment', icon: '🌐' },
    { id: 'mobile-application-security', title: 'Mobile Application Security Assessment', icon: '📱' },
    { id: 'api-security', title: 'API Security Assessment', icon: '🔌' },
    { id: 'secure-source-code-review', title: 'Secure Source Code Review', icon: '💻' },
    { id: 'red-team-assessment', title: 'Red Team Assessment', icon: '🎯' },
    { id: 'infrastructure-security', title: 'Infrastructure Security Assessment', icon: '🏗️' },
    { id: 'thick-client-security', title: 'Thick Client Security Assessment', icon: '🖥️' },
    { id: 'firewall-security', title: 'Firewall Security Assessment', icon: '🛡️' },
    { id: 'digital-forensics', title: 'Digital Forensics & Incident Response', icon: '🔍' },
    { id: 'malware-analysis', title: 'Malware Analysis & Root Cause Detection', icon: '🦠' },
];

const complianceServices = [
    { id: 'gdpr-consulting', title: 'GDPR Consulting and Audit', icon: '🇪🇺' },
    { id: 'pci-dss-compliance', title: 'PCI DSS Compliance Audit', icon: '💳' },
    { id: 'iso-certification', title: 'ISO Certification Advisory', icon: '📋' },
];

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

// eHack Originals programs from programs.ts
const ehackPrograms = [
    { id: 101, slug: 'masters-ethical-hacking', title: 'Masters Program in Ethical Hacking', duration: '9-12 Months', partnerSlug: 'ehack-originals' },
    { id: 102, slug: 'graduate-cybersecurity', title: 'Graduate Program in Ethical Hacking', duration: '7-9 Months', partnerSlug: 'ehack-originals' },
    { id: 103, slug: 'diploma-cybersecurity', title: 'Diploma in Ethical Hacking', duration: '4-6 Months', partnerSlug: 'ehack-originals' },
    { id: 104, slug: 'digital-marketing-masterprogram', title: 'Masters Program in Digital Marketing', duration: '4 Months', partnerSlug: 'ehack-originals' },
    { id: 105, slug: 'robotics-for-all', title: 'Robotics for Every One', duration: '60 Days', partnerSlug: 'ehack-originals' },
];

const ehackOriginalPartner: Partner = {
    id: 999,
    name: 'eHack Popular Courses',
    slug: 'ehack-originals',
    logoUrl: '/ehack-black.png',
    courseCount: ehackPrograms.length
};

// Kennedy University degree programs
const kennedyPrograms = [
    { id: 201, slug: 'bscs', title: 'Bachelor of Science in Cybersecurity (BSCS) – Fast Track', duration: '1 Year', partnerSlug: 'kennedy-university' },
    { id: 202, slug: 'mscs', title: 'Master of Science in Cybersecurity (MSCS) – Fast Track', duration: '1 Year', partnerSlug: 'kennedy-university' },
    { id: 203, slug: 'integrated-bscs-mscs', title: 'Integrated BSCS + MSCS – Accelerated', duration: '15 Months', partnerSlug: 'kennedy-university' },
];

const kennedyPartner: Partner = {
    id: 998,
    name: 'Kennedy University',
    slug: 'kennedy-university',
    logoUrl: '/images/kennedy-university-logo.png',
    courseCount: kennedyPrograms.length
};

export default function Header({ partners, courses }: HeaderProps) {
    // Add eHack Originals and Kennedy University to partners list - eHack first
    const allPartners = [ehackOriginalPartner, kennedyPartner, ...partners];
    const allCourses = [...courses, ...ehackPrograms, ...kennedyPrograms];

    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileMegaMenuOpen, setMobileMegaMenuOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
    const [activePartner, setActivePartner] = useState<string | null>(
        allPartners.length > 0 ? allPartners[0].slug : null
    );

    const filteredCourses = activePartner
        ? allCourses.filter(c => c.partnerSlug === activePartner)
        : [];

    const activePartnerData = allPartners.find(p => p.slug === activePartner);

    // Check if we're showing eHack Originals or Kennedy University
    const isEhackOriginals = activePartner === 'ehack-originals';
    const isKennedyUniversity = activePartner === 'kennedy-university';

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Close mobile menu on route change or body scroll lock
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setMobileDropdown(null);
        setMobileMegaMenuOpen(false);
    };

    // Open mobile mega menu
    const openMobileMegaMenu = () => {
        setMobileMegaMenuOpen(true);
    };

    // Close mobile mega menu and go back to main menu
    const closeMobileMegaMenu = () => {
        setMobileMegaMenuOpen(false);
    };

    const toggleMobileDropdown = (id: string) => {
        setMobileDropdown(prev => prev === id ? null : id);
    };

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    // Filter courses for suggestions
    const searchSuggestions = searchQuery.length >= 2
        ? allCourses.filter(course =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (course.partnerSlug && course.partnerSlug.toLowerCase().includes(searchQuery.toLowerCase()))
        ).slice(0, 5)
        : [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuggestions(false);
        if (searchQuery.trim()) {
            router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleSuggestionClick = (slug: string) => {
        setShowSuggestions(false);
        setSearchQuery('');
        // Check if it's an eHack program or Kennedy program to route correctly
        const isEhack = ehackPrograms.some(p => p.slug === slug);
        const isKennedy = kennedyPrograms.some(p => p.slug === slug);

        if (isKennedy) {
            router.push(`/kennedy-university/${slug}`);
        } else if (isEhack) {
            router.push(`/programs/${slug}`);
        } else {
            router.push(`/certificate/${slug}`);
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link href="/" className="logo">
                    <div className="logo-container">
                        <img src="/images/new-eHACK.png" alt="eHack Academy" className="logo-image" />
                    </div>
                </Link>

                <nav className="nav">
                    <Link href="/" className="nav-link">Home</Link>
                    {/* Mega Menu Wrapper */}
                    <div
                        className="mega-menu-wrapper"
                        onMouseEnter={() => setMegaMenuOpen(true)}
                        onMouseLeave={() => setMegaMenuOpen(false)}
                    >
                        <button className="nav-link nav-dropdown-btn highlight-btn">
                            All Courses & Certifications
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Mega Menu Dropdown */}
                        <div className={`mega-menu ${megaMenuOpen ? 'mega-menu-open' : ''}`}>
                            <div className="mega-menu-inner">
                                {/* Left Side: Partners */}
                                <div className="mega-menu-left">
                                    <h4 className="mega-menu-heading">Our Partners & Programs</h4>
                                    <div className="mega-partners">
                                        {allPartners.map((partner) => (
                                            <div
                                                key={partner.id}
                                                className={`mega-partner-card ${activePartner === partner.slug ? 'active' : ''} ${partner.slug === 'ehack-originals' ? 'ehack-originals-partner' : ''} ${partner.slug === 'kennedy-university' ? 'kennedy-university-partner' : ''}`}
                                                onMouseEnter={() => setActivePartner(partner.slug)}
                                            >
                                                {partner.logoUrl ? (
                                                    <img src={partner.logoUrl} alt={partner.name} className="partner-logo-img" />
                                                ) : (
                                                    <span className="partner-logo-placeholder">{partner.name[0]}</span>
                                                )}
                                                <div className="partner-info">
                                                    <span className="partner-name">{partner.name}</span>
                                                    <span className="partner-count">{partner.courseCount} {partner.slug === 'ehack-originals' ? 'Programs' : partner.slug === 'kennedy-university' ? 'Degrees' : 'Courses'}</span>
                                                </div>
                                                <span className="partner-arrow">→</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/courses" className="mega-view-all" onClick={() => setMegaMenuOpen(false)}>
                                        View All Courses →
                                    </Link>
                                </div>

                                {/* Middle Section: Courses or Categories */}
                                <div className="mega-menu-middle">
                                    {/* Show Categories for eHack Originals */}
                                    {isEhackOriginals ? (
                                        <div className="mega-menu-right">
                                            <h4 className="mega-menu-heading">Program Categories</h4>
                                            <div className="mega-categories-grid">
                                                <Link
                                                    href="/categories/cybersecurity"
                                                    className="mega-category-card"
                                                    onClick={() => setMegaMenuOpen(false)}
                                                    style={{ backgroundImage: `url('/images/cybersecurity.jpg')` }}
                                                >
                                                    <div className="mega-cat-overlay"></div>
                                                    <div className="mega-cat-content">
                                                        <span className="mega-cat-name">Cybersecurity Powered by AI</span>
                                                        <span className="mega-cat-count">3 Programs</span>
                                                    </div>
                                                </Link>
                                                <Link
                                                    href="/categories/data-science"
                                                    className="mega-category-card"
                                                    onClick={() => setMegaMenuOpen(false)}
                                                    style={{ backgroundImage: `url('/images/datascience.jpeg')` }}
                                                >
                                                    <div className="mega-cat-overlay"></div>
                                                    <div className="mega-cat-content">
                                                        <span className="mega-cat-name">Data Science Powered by AI</span>
                                                        <span className="mega-cat-count">1 Program</span>
                                                    </div>
                                                </Link>
                                                <Link
                                                    href="/categories/robotics-iot"
                                                    className="mega-category-card"
                                                    onClick={() => setMegaMenuOpen(false)}
                                                    style={{ backgroundImage: `url('/images/robotics.jpeg')` }}
                                                >
                                                    <div className="mega-cat-overlay"></div>
                                                    <div className="mega-cat-content">
                                                        <span className="mega-cat-name">Robotics & IoT Powered by AI</span>
                                                        <span className="mega-cat-count">1 Program</span>
                                                    </div>
                                                </Link>
                                                <Link
                                                    href="/categories/digital-marketing"
                                                    className="mega-category-card"
                                                    onClick={() => setMegaMenuOpen(false)}
                                                    style={{ backgroundImage: `url('/images/social-media-marketing.jpg')` }}
                                                >
                                                    <div className="mega-cat-overlay"></div>
                                                    <div className="mega-cat-content">
                                                        <span className="mega-cat-name">Digital Marketing Powered by AI</span>
                                                        <span className="mega-cat-count">1 Program</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mega-menu-right">
                                            <h4 className="mega-menu-heading">
                                                {activePartnerData ? (isKennedyUniversity ? 'Kennedy University Degrees' : `${activePartnerData.name} Courses`) : 'Courses'}
                                            </h4>
                                            <div className="mega-courses">
                                                {filteredCourses.length > 0 ? (
                                                    filteredCourses.map((course) => (
                                                        <Link
                                                            key={course.id}
                                                            href={isKennedyUniversity ? `/kennedy-university/${course.slug}` : `/certificate/${course.slug}`}
                                                            className="mega-course-item"
                                                            onClick={() => setMegaMenuOpen(false)}
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
                                    )}
                                </div>

                                {/* Kennedy University Section - Right Column */}
                                <div className="mega-menu-kennedy">
                                    <h4 className="mega-menu-heading">Global Degrees</h4>
                                    <Link href="/kennedy-university" className="kennedy-partnership-card" onClick={() => setMegaMenuOpen(false)}>
                                        <div className="kennedy-logos-vertical">
                                            {/* EC-Council on top */}
                                            <div className="kennedy-logo-row">
                                                <img src="/images/ehack-logo.png" alt="EC-Council" className="kennedy-logo-img ec-council" />
                                            </div>
                                            {/* Handshake divider */}
                                            <div className="kennedy-handshake-divider">
                                                <span className="divider-line"></span>
                                                <Handshake className="handshake-icon" size={28} strokeWidth={1.5} />
                                                <span className="divider-line"></span>
                                            </div>
                                            {/* Kennedy University below */}
                                            <div className="kennedy-logo-row">
                                                <img src="/images/kennedy-university-logo.png" alt="Kennedy University" className="kennedy-logo-img" />
                                            </div>
                                        </div>
                                        <p className="kennedy-text">
                                            Earn internationally accredited degrees in collaboration with Kennedy University
                                        </p>
                                        <span className="kennedy-cta">Learn More →</span>
                                    </Link>
                                </div>
                            </div>

                            {/* eHack Originals - Full Width */}
                            <div className="mega-menu-originals-full">
                                <h4 className="mega-menu-heading">eHack Signature Programs</h4>
                                <div className="mega-originals-grid">
                                    <Link href="/programs/graduate-cybersecurity" className="mega-original-card" onClick={() => setMegaMenuOpen(false)}>
                                        <span className="original-title">Graduate Program</span>
                                        <span className="original-subtitle">Advanced Training</span>
                                    </Link>
                                    <Link href="/programs/masters-ethical-hacking" className="mega-original-card" onClick={() => setMegaMenuOpen(false)}>
                                        <span className="original-title">Masters in Ethical Hacking</span>
                                        <span className="original-subtitle">Expert Level</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Accreditation Disclaimer - Fixed at Bottom of Mega Menu */}
                            <div className="mega-menu-disclaimer-full">
                                <span className="disclaimer-icon">ℹ️</span>
                                <p className="disclaimer-text">
                                    <strong>Accredited Partner:</strong> EC-Council & Kennedy University. For other vendors, we provide training; certification is issued by the respective vendor.
                                </p>
                            </div>
                        </div>
                    </div>

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

                    {/* Corporate Services Mega Menu Dropdown */}
                    <div
                        className={`services-dropdown-wrapper ${servicesMenuOpen ? 'open' : ''}`}
                        onMouseEnter={() => setServicesMenuOpen(true)}
                        onMouseLeave={() => setServicesMenuOpen(false)}
                    >
                        <button className="nav-link nav-dropdown-btn services-btn">
                            Corporate Services
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className="services-dropdown-menu">
                            <div className="services-dropdown-inner">
                                {/* Security Assessment Services */}
                                <div className="services-column">
                                    <h4 className="services-column-title">Security Assessment</h4>
                                    <div className="services-list">
                                        {corporateServices.map((service) => (
                                            <Link
                                                key={service.id}
                                                href={`/services/${service.id}`}
                                                className="service-dropdown-item"
                                                onClick={() => setServicesMenuOpen(false)}
                                            >
                                                <span className="service-item-icon">{service.icon}</span>
                                                <span className="service-item-title">{service.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Compliance Services */}
                                <div className="services-column compliance-column">
                                    <h4 className="services-column-title">Compliance Audit</h4>
                                    <div className="services-list">
                                        {complianceServices.map((service) => (
                                            <Link
                                                key={service.id}
                                                href={`/services/${service.id}`}
                                                className="service-dropdown-item"
                                                onClick={() => setServicesMenuOpen(false)}
                                            >
                                                <span className="service-item-icon">{service.icon}</span>
                                                <span className="service-item-title">{service.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link
                                        href="/services"
                                        className="services-view-all"
                                        onClick={() => setServicesMenuOpen(false)}
                                    >
                                        View All Services →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/codered" className="nav-link codered-link">
                        <span className="code-text">CODE</span>
                        <span className="red-text">RED</span>
                    </Link>
                    <Link href="/about" className="nav-link">About eHack</Link>
                </nav>

                {/* Compact Header Search in place of Get Started */}
                <div className="header-search-container">
                    <form onSubmit={handleSearch} className="header-search-form">
                        <div className="header-search-wrapper">
                            <input
                                type="text"
                                className="header-search-input"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            />
                            <button type="submit" className="header-search-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && searchSuggestions.length > 0 && (
                            <div className="header-search-suggestions">
                                {searchSuggestions.map((course) => {
                                    const partner = allPartners.find(p => p.slug === course.partnerSlug);
                                    return (
                                        <div
                                            key={course.id}
                                            className="header-suggestion-item"
                                            onClick={() => handleSuggestionClick(course.slug)}
                                        >
                                            {partner?.logoUrl && (
                                                <img
                                                    src={partner.logoUrl}
                                                    alt={partner.name}
                                                    className="header-suggestion-logo"
                                                />
                                            )}
                                            <span className="header-suggestion-title">{course.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </form>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <div className="hamburger-icon">
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
                onClick={closeMobileMenu}
            />

            {/* Mobile Menu Drawer */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <img src="/images/new-eHACK.png" alt="eHack Academy" className="mobile-menu-logo" />
                    <button className="mobile-menu-close" onClick={closeMobileMenu} aria-label="Close menu">
                        ✕
                    </button>
                </div>

                <nav className="mobile-nav">
                    <Link href="/" className="mobile-nav-item" onClick={closeMobileMenu}>
                        Home
                    </Link>

                    {/* Courses & Certifications - Opens Mobile Mega Menu */}
                    <button
                        className="mobile-nav-item mobile-mega-menu-trigger"
                        onClick={openMobileMegaMenu}
                    >
                        <span>All Courses & Certifications</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Learning Options Dropdown */}
                    <div className={`mobile-nav-dropdown ${mobileDropdown === 'learning' ? 'open' : ''}`}>
                        <button
                            className="mobile-nav-dropdown-btn"
                            onClick={() => toggleMobileDropdown('learning')}
                        >
                            Learning Options
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className="mobile-nav-dropdown-content">
                            <Link href="/learning-options#live-online" className="mobile-nav-subitem" onClick={closeMobileMenu}>
                                Live Online Training
                            </Link>
                            <Link href="/learning-options#classroom" className="mobile-nav-subitem" onClick={closeMobileMenu}>
                                Classroom Training
                            </Link>
                            <Link href="/learning-options#one-on-one" className="mobile-nav-subitem" onClick={closeMobileMenu}>
                                1-on-1 Training
                            </Link>
                            <Link href="/learning-options#fly-trainer" className="mobile-nav-subitem" onClick={closeMobileMenu}>
                                Fly-Me-a-Trainer
                            </Link>
                            <Link href="/learning-options#flexi" className="mobile-nav-subitem" onClick={closeMobileMenu}>
                                Flexi
                            </Link>
                        </div>
                    </div>

                    {/* Services Dropdown */}
                    <div className={`mobile-nav-dropdown ${mobileDropdown === 'services' ? 'open' : ''}`}>
                        <button
                            className="mobile-nav-dropdown-btn"
                            onClick={() => toggleMobileDropdown('services')}
                        >
                            Corporate Services
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="mobile-nav-dropdown-content">
                            <Link href="/services" className="mobile-nav-subitem" onClick={closeMobileMenu}>
                                All Services
                            </Link>
                            <Link href="/services/web-application-security" className="mobile-nav-subitem" onClick={closeMobileMenu}>
                                Web Application Security
                            </Link>
                            <Link href="/services/infrastructure-security" className="mobile-nav-subitem" onClick={closeMobileMenu}>
                                Infrastructure Security
                            </Link>
                            <Link href="/services/digital-forensics" className="mobile-nav-subitem" onClick={closeMobileMenu}>
                                Digital Forensics
                            </Link>
                        </div>
                    </div>

                    <Link href="/codered" className="mobile-nav-item codered-mobile" onClick={closeMobileMenu}>
                        CODE<span className="red-badge">RED</span>
                    </Link>

                    <Link href="/about" className="mobile-nav-item" onClick={closeMobileMenu}>
                        About eHack
                    </Link>
                </nav>

                <div className="mobile-menu-cta">
                    <Link href="/courses" className="mobile-cta-btn" onClick={closeMobileMenu}>
                        Explore Courses
                    </Link>
                </div>
            </div>

            {/* Mobile Mega Menu - Full Screen Overlay */}
            <div className={`mobile-mega-menu ${mobileMegaMenuOpen ? 'open' : ''}`}>
                <div className="mobile-mega-menu-header">
                    <button className="mobile-mega-back" onClick={closeMobileMegaMenu}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </button>
                    <span className="mobile-mega-title">Courses & Certifications</span>
                    <button className="mobile-menu-close" onClick={closeMobileMenu} aria-label="Close menu">
                        ✕
                    </button>
                </div>

                <div className="mobile-mega-menu-content">
                    {/* Partners Section - Grid Layout with Scrollbar (FIRST) */}
                    <div className="mobile-mega-section mobile-mega-partners-section">
                        <h4 className="mobile-mega-section-title">Our Partners & Programs</h4>
                        <div className="mobile-mega-partners-grid-scroll">
                            <div className="mobile-mega-partners-grid">
                                {allPartners.map((partner) => (
                                    <div
                                        key={partner.id}
                                        className={`mobile-mega-partner-box ${activePartner === partner.slug ? 'active' : ''} ${partner.slug === 'kennedy-university' ? 'kennedy-university-mobile' : ''}`}
                                        onClick={() => setActivePartner(partner.slug)}
                                    >
                                        <div className="partner-box-logo">
                                            {partner.logoUrl ? (
                                                <img src={partner.logoUrl} alt={partner.name} className={`mobile-partner-logo-square ${partner.slug === 'kennedy-university' ? 'kennedy-logo' : ''}`} />
                                            ) : (
                                                <span className="mobile-partner-placeholder-square">{partner.name[0]}</span>
                                            )}
                                        </div>
                                        <span className="partner-box-name">{partner.name}</span>
                                        <span className="partner-box-count">
                                            {partner.courseCount} {partner.slug === 'ehack-originals' ? 'Programs' : partner.slug === 'kennedy-university' ? 'Degrees' : 'Courses'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Courses Section for Selected Partner (BELOW Partners) */}
                    {activePartner && (
                        <div className="mobile-mega-section mobile-mega-courses-section">
                            <h4 className="mobile-mega-section-title">
                                {activePartnerData ? (isKennedyUniversity ? 'Kennedy University Degrees' : `${activePartnerData.name} Courses`) : 'Courses'}
                            </h4>
                            <div className="mobile-mega-courses">
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map((course) => (
                                        <Link
                                            key={course.id}
                                            href={isKennedyUniversity ? `/kennedy-university/${course.slug}` : isEhackOriginals ? `/programs/${course.slug}` : `/certificate/${course.slug}`}
                                            className="mobile-mega-course-item"
                                            onClick={closeMobileMenu}
                                        >
                                            <span className="mobile-course-name">{course.title}</span>
                                            {course.duration && (
                                                <span className="mobile-course-duration">{course.duration}</span>
                                            )}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="mobile-no-courses">No courses available</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* eHack Categories */}
                    {isEhackOriginals && (
                        <div className="mobile-mega-section">
                            <h4 className="mobile-mega-section-title">Program Categories</h4>
                            <div className="mobile-mega-categories">
                                <Link href="/categories/cybersecurity" className="mobile-category-card" onClick={closeMobileMenu}>
                                    <span className="cat-icon">🛡️</span>
                                    <span className="cat-name">Cybersecurity Powered by AI</span>
                                </Link>
                                <Link href="/categories/data-science" className="mobile-category-card" onClick={closeMobileMenu}>
                                    <span className="cat-icon">📊</span>
                                    <span className="cat-name">Data Science Powered by AI</span>
                                </Link>
                                <Link href="/categories/robotics-iot" className="mobile-category-card" onClick={closeMobileMenu}>
                                    <span className="cat-icon">🤖</span>
                                    <span className="cat-name">Robotics & IoT Powered by AI</span>
                                </Link>
                                <Link href="/categories/digital-marketing" className="mobile-category-card" onClick={closeMobileMenu}>
                                    <span className="cat-icon">📈</span>
                                    <span className="cat-name">Digital Marketing Powered by AI</span>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Kennedy University CTA */}
                    {!isKennedyUniversity && (
                        <div className="mobile-mega-section mobile-kennedy-cta">
                            <Link href="/kennedy-university" className="mobile-kennedy-card" onClick={closeMobileMenu}>
                                <div className="kennedy-logos-mobile">
                                    <img src="/images/ehack-logo.png" alt="eHack" className="kennedy-logo-small" />
                                    <Handshake className="handshake-icon-mobile" size={20} />
                                    <img src="/images/kennedy-university-logo.png" alt="Kennedy University" className="kennedy-logo-small" />
                                </div>
                                <p className="kennedy-cta-text">Get globally accredited degrees with Kennedy University</p>
                                <span className="kennedy-cta-link">Learn More →</span>
                            </Link>
                        </div>
                    )}

                    {/* View All CTA */}
                    <div className="mobile-mega-footer">
                        <Link href="/courses" className="mobile-view-all-btn" onClick={closeMobileMenu}>
                            View All Courses & Certifications
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
