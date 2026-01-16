'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import styles from '@/app/page.module.css';
import ProgramsSection from './programs-section';
import MasterySection from './mastery-section';
import PlacementSection from './placement-section';
import TestimonialsSection from './testimonials-section';
import StickySectionNav from '@/components/global/sticky-section-nav/sticky-section-nav';

// Types for props
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
    level: string;
    duration?: string;
    partnerSlug?: string;
    partnerName?: string;
    featuredOrder?: number;
}

interface Category {
    id: string;
    name: string;
    slug: string;
    colorCode: string;
}

interface HomePageProps {
    partners: Partner[];
    courses: Course[];
    categories: Category[];
}

// Course category icons (fallback)
const categoryIcons: Record<string, string> = {
    'cybersecurity': '🛡️',
    'digital-marketing': '📈',
    'data-science': '🤖',
    'cloud': '☁️',
    'iot': '🌐',
    'default': '📚'
};

// Our programs (hardcoded for now)
const programs = [
    {
        title: 'Diploma in Ethical Hacking',
        description: 'Comprehensive program with 2 industry certifications',
        duration: '6 Months',
        certifications: 2,
        icon: '🎓',
    },
    {
        title: 'Digital Marketing Masterclass',
        description: 'From strategy to execution - complete digital marketing journey',
        duration: '4 Months',
        certifications: 1,
        icon: '📱',
    },
    {
        title: 'Data Science Bootcamp',
        description: 'Transform into a data-driven decision maker',
        duration: '5 Months',
        certifications: 2,
        icon: '📊',
    },
    {
        title: 'IoT Specialist Program',
        description: 'Build the connected world of tomorrow',
        duration: '4 Months',
        certifications: 1,
        icon: '🌐',
    },
];

// Stats
const stats = [
    { value: '11+', label: 'Years of Excellence' },
    { value: '50,000+', label: 'Students Trained' },
    { value: '98%', label: 'Placement Rate' },
    { value: '10+', label: 'Expert Trainers' },
];

// Learning options
const learningOptions = [
    {
        title: 'Live Online Training',
        description: 'Interactive virtual sessions with real-time instructor engagement',
        link: '/learning-options#live-online'
    },
    {
        title: 'Classroom Training',
        description: 'Traditional instructor-led learning in modern facilities',
        link: '/learning-options#classroom'
    },
    {
        title: '1-on-1 Training',
        description: 'Personalized sessions tailored to your schedule and learning goals',
        link: '/learning-options#one-on-one'
    },
    {
        title: 'Fly-Me-a-Trainer',
        description: 'Bring expert trainers directly to your location',
        link: '/learning-options#fly-trainer'
    },
    {
        title: 'Flexi',
        description: 'Flexible learning that adapts to your schedule and pace',
        link: '/learning-options#flexi'
    },
    {
        title: 'Customized Training',
        description: 'Tailored training programs designed for your specific needs',
        link: '/learning-options#customized'
    },
    {
        title: 'Webinar as a Service',
        description: 'Professional webinar hosting and management solutions',
        link: '/learning-options#webinar'
    },
    {
        title: 'Upcoming Webinars',
        description: 'Join our scheduled live sessions and interactive workshops',
        link: '/learning-options#upcoming'
    }
];

// Unique offerings
const uniqueOfferings = [
    {
        title: '1-on-1 Training',
        description: 'Personalized sessions tailored to your schedule and learning goals',
        icon: '👤',
    },
    {
        title: 'Industry Projects',
        description: 'Work on real-world projects to build practical experience',
        icon: '💼',
    },
    {
        title: 'Placement Support',
        description: 'Dedicated career services to help you land your dream job',
        icon: '🎯',
    },
    {
        title: 'Expert Mentorship',
        description: 'Learn from certified professionals with industry experience',
        icon: '🌟',
    },
];

// Hero Slides Data
const heroSlides = [
    {
        title: "Master the Art of",
        highlight: "Cybersecurity Defense",
        subtitle: "Global certification programs in Ethical Hacking, VAPT, SOC Operations, and Cloud Security.",
        image: "/images/cybersecurity.jpg"
    },
    {
        title: "Unlock the Power of",
        highlight: "Data Science & AI",
        subtitle: "Transform data into insights with Analytics, Machine Learning, and AI curriculum.",
        image: "/images/datascience.jpeg"
    },
    {
        title: "Innovate with",
        highlight: "Robotics & IoT",
        subtitle: "Design the connected world. Hands-on training in Robotics and Smart Technologies.",
        image: "/images/robotics.jpeg"
    },
    {
        title: "Grow Your Brand with",
        highlight: "Digital Marketing",
        subtitle: "From SEO to Social Media — learn strategies that convert clicks into customers.",
        image: "/images/social-media-marketing.jpg"
    },
    {
        title: "Elevate Business with",
        highlight: "Corporate Security Services",
        subtitle: "Premium corporate solutions: VAPT, SOC Management, Cloud Security & Incident Response.",
        image: "/images/corporate.jpeg"
    }
];

export default function HomePage({ partners, courses, categories }: HomePageProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(categories[0]?.slug || 'all');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Hero Carousel Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Filter courses for suggestions
    const searchSuggestions = searchQuery.length >= 2
        ? courses.filter(course =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (course.partnerName && course.partnerName.toLowerCase().includes(searchQuery.toLowerCase()))
        ).slice(0, 5)
        : [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuggestions(false);
        if (searchQuery.trim()) {
            // Navigate to courses page with search using Next.js router
            router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleSuggestionClick = (slug: string) => {
        setShowSuggestions(false);
        setSearchQuery('');
        router.push(`/certificate/${slug}`);
    };

    // Get courses for active category
    const filteredCourses = activeCategory === 'all'
        ? courses.slice(0, 4)
        : courses.slice(0, 4); // For now show first 4, can be enhanced later

    // Manual Navigation
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    // Homepage navigation sections
    const homeNavSections = [
        { id: 'partners', label: 'Partners' },
        { id: 'courses', label: 'Courses' },
        { id: 'programs', label: 'Programs' },
        { id: 'learning', label: 'Learning Options' },
        { id: 'placements', label: 'Placements' },
        { id: 'testimonials', label: 'Success Stories' },
    ];

    return (
        <div className={styles.page}>
            {/* Sticky Section Navigation */}
            <StickySectionNav
                sections={homeNavSections}
                scrollThreshold={600}
            />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <div className={styles.heroOverlay}></div>
                    {heroSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={styles.heroImage}
                            style={{
                                backgroundImage: `url('${slide.image}')`,
                                opacity: currentSlide === index ? 1 : 0,
                                transition: 'opacity 1s ease-in-out'
                            }}
                        />
                    ))}

                    {/* Navigation Arrows */}
                    <button
                        className={`${styles.navArrow} ${styles.prevArrow}`}
                        onClick={prevSlide}
                        aria-label="Previous Slide"
                    >
                        &#10094;
                    </button>
                    <button
                        className={`${styles.navArrow} ${styles.nextArrow}`}
                        onClick={nextSlide}
                        aria-label="Next Slide"
                    >
                        &#10095;
                    </button>
                </div>
                <div className={styles.heroContent}>
                    {/* <div className={styles.heroBadge}>
                        <span>🏆</span> Your Trusted Training Partner
                    </div> */}
                    <h1 className={`${styles.heroTitle} ${styles.animateText}`} key={`title-${currentSlide}`}>
                        {heroSlides[currentSlide].title}
                        <span className={styles.heroHighlight}> {heroSlides[currentSlide].highlight}</span>
                    </h1>
                    <p className={`${styles.heroSubtitle} ${styles.animateText}`} key={`subtitle-${currentSlide}`}>
                        {heroSlides[currentSlide].subtitle}
                    </p>

                    {/* Search Bar with Suggestions */}
                    <form onSubmit={handleSearch} className={styles.searchForm}>
                        <div className={styles.searchWrapper}>
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Search courses, certifications, or topics..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            />
                            <button type="submit" className={styles.searchBtn}>
                                Search
                            </button>
                        </div>

                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && searchSuggestions.length > 0 && (
                            <div className={styles.searchSuggestions}>
                                {searchSuggestions.map((course) => {
                                    const partner = partners.find(p => p.slug === course.partnerSlug);
                                    return (
                                        <div
                                            key={course.id}
                                            className={styles.suggestionItem}
                                            onClick={() => handleSuggestionClick(course.slug)}
                                        >
                                            {partner?.logoUrl && (
                                                <img
                                                    src={partner.logoUrl}
                                                    alt={partner.name}
                                                    className={styles.suggestionLogo}
                                                />
                                            )}
                                            <span className={styles.suggestionTitle}>{course.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </form>

                    {/* Quick Links */}
                    <div className={styles.quickLinks}>
                        <span className={styles.quickLinksLabel}>Explore:</span>
                        <Link href="/categories/cybersecurity" className={styles.quickLink}>
                            Cybersecurity
                        </Link>
                        <Link href="/categories/data-science" className={styles.quickLink}>
                            Data Science
                        </Link>
                        <Link href="/categories/robotics-iot" className={styles.quickLink}>
                            Robotics
                        </Link>
                        <Link href="/categories/digital-marketing" className={styles.quickLink}>
                            Digital Marketing
                        </Link>
                        <Link href="/services" className={styles.quickLink}>
                            Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            {/* @ts-ignore */}
            <section className={styles.partners} id="partners">
                <div className={styles.container}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <span className={styles.partnersLabel}>Trusted by World&apos;s Leading Certification Partners</span>
                    </div>
                    <div className={styles.partnersGrid}>
                        {/* Reorder partners: EC-Council first, Kennedy University second */}
                        {(() => {
                            // Kennedy University partner (manually added if not present)
                            const kennedyPartner: Partner = {
                                id: 999,
                                name: 'Kennedy University',
                                slug: 'kennedy-university',
                                logoUrl: '/images/kennedy-university-logo.png',
                                courseCount: 3
                            };

                            // Check if Kennedy University already exists in partners
                            const hasKennedy = partners.some(p => p.slug === 'kennedy-university');

                            // Create final partners list with Kennedy University added if not present
                            const allPartners = hasKennedy ? [...partners] : [...partners, kennedyPartner];

                            // Sort partners: EC-Council first, Kennedy University second, others after
                            const sortedPartners = allPartners.sort((a, b) => {
                                const order: Record<string, number> = {
                                    'ec-council': 1,
                                    'kennedy-university': 2
                                };
                                const orderA = order[a.slug] || 99;
                                const orderB = order[b.slug] || 99;
                                return orderA - orderB;
                            });

                            return sortedPartners.map((partner) => {
                                const isKennedy = partner.slug === 'kennedy-university';
                                return (
                                    <div key={partner.id} className={styles.partnerCard}>
                                        <div className={styles.partnerLogoWrapper}>
                                            {partner.logoUrl ? (
                                                <img
                                                    src={partner.logoUrl}
                                                    alt={partner.name}
                                                    className={isKennedy ? styles.partnerLogoDark : styles.partnerLogo}
                                                />
                                            ) : (
                                                <span className={styles.partnerPlaceholder}>{partner.name[0]}</span>
                                            )}
                                        </div>
                                        <span className={styles.partnerName}>{partner.name}</span>
                                    </div>
                                );
                            });
                        })()}
                    </div>
                </div>
            </section >

            {/* Course Categories */}
            < section id="courses" className={styles.coursesSection} >
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Explore Our Courses</h2>
                        <p className={styles.sectionSubtitle}>
                            Choose from our comprehensive range of professional courses
                        </p>
                    </div>

                    {/* Category Tabs */}
                    {categories.length > 0 && (
                        <div className={styles.categoryTabs}>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`${styles.categoryTab} ${activeCategory === category.slug ? styles.categoryTabActive : ''}`}
                                    onClick={() => setActiveCategory(category.slug)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Course Cards */}
                    <div className={styles.coursesGrid}>
                        {courses.slice(0, 6).map((course) => {
                            const partner = partners.find(p => p.slug === course.partnerSlug);
                            return (
                                <Link
                                    key={course.id}
                                    href={`/certificate/${course.slug}`}
                                    className={styles.courseCard}
                                >
                                    {partner?.logoUrl && (
                                        <div className={styles.coursePartnerLogo}>
                                            <img
                                                src={partner.logoUrl}
                                                alt={partner.name}
                                                className={styles.coursePartnerLogoImg}
                                            />
                                        </div>
                                    )}
                                    <h3 className={styles.courseCardTitle}>{course.title}</h3>
                                    {/* <p className={styles.courseCardMeta}>
                                        {course.partnerName || 'Professional Certification'} • {course.level}
                                    </p> */}
                                    <span className={styles.courseCardLink}>
                                        View Details →
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className={styles.viewAllWrapper}>
                        <Link href="/courses">
                            <button className={styles.viewAllBtn}>View All Courses</button>
                        </Link>
                    </div>
                </div>
            </section >

            {/* Choose Your Path to Mastery */}
            < MasterySection />

            {/* Learning Options */}
            <section className={styles.learningSection} id="learning">
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Flexible Learning Options</h2>
                        <p className={styles.sectionSubtitle}>
                            Choose the learning format that works best for you
                        </p>
                    </div>

                    <div className={styles.learningGrid}>
                        {learningOptions.map((option, index) => (
                            <Link key={index} href={option.link} className={styles.learningCard}>
                                <h3 className={styles.learningTitle}>{option.title}</h3>
                                <p className={styles.learningDescription}>{option.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection} id="stats">
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        {stats.map((stat, index) => (
                            <div key={index} className={styles.statCard}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* 
            Unique Offerings
            <section className={styles.offeringsSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Why Choose eHack Academy?</h2>
                        <p className={styles.sectionSubtitle}>
                            Discover what sets us apart from the rest
                        </p>
                    </div>

                    <div className={styles.offeringsGrid}>
                        {uniqueOfferings.map((offering, index) => (
                            <div key={index} className={styles.offeringCard}>
                                <div className={styles.offeringIcon}>{offering.icon}</div>
                                <h3 className={styles.offeringTitle}>{offering.title}</h3>
                                <p className={styles.offeringDescription}>{offering.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}


            <PlacementSection />

            {/* What Our Learners Say */}
            <TestimonialsSection />

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Ready to Transform Your Career?</h2>
                        <p className={styles.ctaSubtitle}>
                            Join thousands of professionals who have accelerated their careers with us
                        </p>
                        <div className={styles.ctaButtons}>
                            <button className={styles.ctaPrimaryBtn}>Start Learning Today</button>
                            <button className={styles.ctaSecondaryBtn}>Talk to Advisor</button>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
}
