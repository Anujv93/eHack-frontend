'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { services, serviceCategories, ServiceItem } from '@/data/services';
import './services.css';

export default function ServicesPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [isSticky, setIsSticky] = useState(false);
    const filtersRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    // Filter services based on active category
    const filteredServices = activeCategory === 'all'
        ? services
        : services.filter(service => service.category === activeCategory);

    // JavaScript-based sticky behavior
    useEffect(() => {
        const handleScroll = () => {
            if (filtersRef.current && placeholderRef.current) {
                const placeholderTop = placeholderRef.current.getBoundingClientRect().top;
                const shouldBeSticky = placeholderTop <= 0;

                if (shouldBeSticky !== isSticky) {
                    setIsSticky(shouldBeSticky);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial state

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isSticky]);

    return (
        <main className="services-page">
            {/* Hero Section */}
            <section className="services-hero">
                <div className="services-hero-content">
                    <span className="services-hero-badge">Corporate Security Solutions</span>
                    <h1 className="services-hero-title">
                        Protect Your Business with<br />
                        <strong>World-Class Security</strong>
                    </h1>
                    <p className="services-hero-subtitle">
                        Comprehensive cybersecurity services including penetration testing, compliance audits,
                        digital forensics, and malware analysis.
                    </p>
                    <div className="services-hero-actions">
                        <a href="#services-list" className="hero-btn hero-btn-primary">
                            Explore Services
                        </a>
                        <Link href="/about" className="hero-btn hero-btn-secondary">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="services-stats">
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Security Assessments</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">100+</span>
                        <span className="stat-label">Enterprise Clients</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">13+</span>
                        <span className="stat-label">Service Offerings</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">24/7</span>
                        <span className="stat-label">Incident Support</span>
                    </div>
                </div>
            </section>

            {/* Services List Section */}
            <section id="services-list" className="services-list-section">
                {/* Placeholder to maintain layout when filters become fixed */}
                <div ref={placeholderRef} className={`category-filters-placeholder ${isSticky ? 'active' : ''}`}></div>

                {/* Sticky Category Filters */}
                <div
                    ref={filtersRef}
                    className={`category-filters-sticky ${isSticky ? 'is-sticky' : ''}`}
                >
                    <div className="category-filters">
                        {serviceCategories.map(category => (
                            <button
                                key={category.id}
                                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className="services-container">
                    <div className="services-grid">
                        {filteredServices.map(service => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="services-cta">
                <div className="cta-container">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to Secure Your Business?</h2>
                        <p className="cta-description">
                            Get in touch with our security experts for a free consultation and discover
                            how we can protect your organization from evolving cyber threats.
                        </p>
                        <div className="cta-actions">
                            <a href="mailto:info@ehack.in" className="cta-btn cta-btn-primary">
                                Get Free Consultation
                            </a>
                            <a href="tel:+919876543210" className="cta-btn cta-btn-secondary">
                                Call Us Now
                            </a>
                        </div>
                    </div>
                    <div className="cta-features">
                        <div className="cta-feature">
                            <span className="cta-feature-icon">✓</span>
                            <span>Free Initial Assessment</span>
                        </div>
                        <div className="cta-feature">
                            <span className="cta-feature-icon">✓</span>
                            <span>Certified Security Experts</span>
                        </div>
                        <div className="cta-feature">
                            <span className="cta-feature-icon">✓</span>
                            <span>Customized Solutions</span>
                        </div>
                        <div className="cta-feature">
                            <span className="cta-feature-icon">✓</span>
                            <span>24/7 Support Available</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Service Card Component
interface ServiceCardProps {
    service: ServiceItem;
    // Removed unused props
}

function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Link
            href={`/services/${service.id}`}
            id={service.id}
            className="service-card"
        >
            <div className="service-card-image">
                <img
                    src={service.image || '/images/services/general.png'}
                    alt={service.title}
                />
            </div>

            <div className="service-card-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.shortDescription}</p>

                <span className="service-link-text">
                    Learn More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </span>
            </div>
        </Link>
    );
}
