'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { services, serviceCategories, ServiceItem } from '@/data/services';
import './services.css';

export default function ServicesPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedService, setExpandedService] = useState<string | null>(null);
    const [highlightedService, setHighlightedService] = useState<string | null>(null);
    const serviceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const hasScrolled = useRef(false);

    // Effect to handle URL hash on page load
    useEffect(() => {
        // Function to handle hash-based navigation
        const handleHashNavigation = () => {
            const hash = window.location.hash.slice(1); // Remove the '#' character

            if (hash && !hasScrolled.current) {
                // Find the service that matches the hash
                const matchedService = services.find(service => service.id === hash);

                if (matchedService) {
                    // Set the correct category filter if the service isn't in the current view
                    if (matchedService.category !== activeCategory && activeCategory !== 'all') {
                        setActiveCategory('all');
                    }

                    // Expand and highlight the service
                    setExpandedService(hash);
                    setHighlightedService(hash);

                    // Small delay to ensure the DOM is updated before scrolling
                    setTimeout(() => {
                        const element = serviceRefs.current[hash];
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            hasScrolled.current = true;
                        }
                    }, 100);

                    // Remove highlight after animation completes
                    setTimeout(() => {
                        setHighlightedService(null);
                    }, 2500);
                }
            }
        };

        // Run on initial load
        handleHashNavigation();

        // Listen for hash changes (in case user navigates via browser back/forward)
        window.addEventListener('hashchange', handleHashNavigation);

        return () => {
            window.removeEventListener('hashchange', handleHashNavigation);
        };
    }, [activeCategory]);

    const filteredServices = activeCategory === 'all'
        ? services
        : services.filter(service => service.category === activeCategory);

    const toggleService = (id: string) => {
        setExpandedService(expandedService === id ? null : id);
        // Clear highlight when manually toggling
        if (highlightedService) {
            setHighlightedService(null);
        }
    };

    return (
        <main className="services-page">
            {/* Hero Section */}
            <section className="services-hero">
                <div className="services-hero-bg">
                    <div className="hero-gradient-orb hero-orb-1"></div>
                    <div className="hero-gradient-orb hero-orb-2"></div>
                    <div className="hero-gradient-orb hero-orb-3"></div>
                </div>
                <div className="services-hero-content">
                    <span className="services-hero-badge">Corporate Security Solutions</span>
                    <h1 className="services-hero-title">
                        Protect Your Business with
                        <span className="highlight"> World-Class Security</span>
                    </h1>
                    <p className="services-hero-subtitle">
                        Comprehensive cybersecurity services including penetration testing, compliance audits,
                        digital forensics, and malware analysis to safeguard your organization.
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
                <div className="services-container">
                    {/* Category Filters */}
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

                    {/* Services Grid */}
                    <div className="services-grid">
                        {filteredServices.map(service => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                isExpanded={expandedService === service.id}
                                isHighlighted={highlightedService === service.id}
                                onToggle={() => toggleService(service.id)}
                                cardRef={(el) => { serviceRefs.current[service.id] = el; }}
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
    isExpanded: boolean;
    isHighlighted?: boolean;
    onToggle: () => void;
    cardRef?: (el: HTMLDivElement | null) => void;
}

function ServiceCard({ service, isExpanded, isHighlighted, onToggle, cardRef }: ServiceCardProps) {
    return (
        <div
            id={service.id}
            ref={cardRef}
            className={`service-card ${isExpanded ? 'expanded' : ''} ${isHighlighted ? 'highlighted' : ''}`}
        >
            <div className="service-card-header" onClick={onToggle}>
                <div className="service-icon">{service.icon}</div>
                <div className="service-header-content">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-short-desc">{service.shortDescription}</p>
                </div>
                <button className="service-toggle-btn">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
            </div>

            {isExpanded && (
                <div className="service-card-body">
                    {/* Full Description */}
                    <div className="service-section">
                        <h4 className="section-title">About This Service</h4>
                        <p className="section-content">{service.fullDescription}</p>
                    </div>

                    {/* What We Offer */}
                    <div className="service-section">
                        <h4 className="section-title">What We Offer</h4>
                        <ul className="service-list offer-list">
                            {service.whatWeOffer.map((item, index) => (
                                <li key={index}>
                                    <span className="list-icon">→</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* What We Cover */}
                    <div className="service-section">
                        <h4 className="section-title">What We Cover</h4>
                        <ul className="service-list cover-list">
                            {service.whatWeCover.map((item, index) => (
                                <li key={index}>
                                    <span className="list-check">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Why This Service */}
                    <div className="service-section">
                        <h4 className="section-title">Why {service.title}?</h4>
                        <p className="section-content">{service.whyThisService}</p>
                    </div>

                    {/* Why Choose Us */}
                    <div className="service-section why-choose-us">
                        <h4 className="section-title">Why Choose Us</h4>
                        <p className="section-content">{service.whyChooseUs}</p>
                    </div>

                    {/* CTA */}
                    <div className="service-cta">
                        <a href={`mailto:info@ehack.in?subject=Inquiry about ${service.title}`} className="service-cta-btn primary">
                            Request Quote
                        </a>
                        <a href="tel:+919876543210" className="service-cta-btn secondary">
                            Call for Details
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
