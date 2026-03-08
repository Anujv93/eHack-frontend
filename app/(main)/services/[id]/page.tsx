import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceById } from '@/data/services';
import './service-detail.css';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function ServiceDetailPage({ params }: Props) {
    const { id } = await params;
    const service = getServiceById(id);

    if (!service) {
        notFound();
    }

    return (
        <main className="service-detail-page">
            {/* Hero Section - Background Image with Overlay */}
            <div className="service-hero" style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%), url('${service.image}')`
            }}>
                <div className="service-hero-content">
                    {/* Removed Category Badge and Back Link from here */}
                    <h1 className="service-detail-title">{service.title}</h1>
                    <p className="service-detail-subtitle">{service.shortDescription}</p>
                </div>
            </div>

            <div className="service-content-container">
                <div className="service-main-col">
                    {/* Moved Back Link Here */}
                    <Link href="/services" className="back-link-content">
                        ← Back to Services
                    </Link>

                    <section className="detail-section">
                        <h2 className="detail-heading">About This Service</h2>
                        <div className="detail-text" dangerouslySetInnerHTML={{ __html: service.fullDescription.replace(/\n/g, '<br />') }}></div>
                    </section>

                    <section className="detail-section">
                        <h2 className="detail-heading">What We Offer</h2>
                        <div className="offer-grid">
                            {service.whatWeOffer.map((item, index) => (
                                <div key={index} className="offer-card">
                                    <span className="offer-number">{String(index + 1).padStart(2, '0')}</span>
                                    <p className="offer-text">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="detail-section">
                        <h2 className="detail-heading">Coverage Areas</h2>
                        <div className="coverage-grid">
                            {service.whatWeCover.map((item, index) => (
                                <div key={index} className="coverage-card">
                                    <div className="coverage-icon-box">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <span className="coverage-text">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="service-sidebar">
                    <div className="sidebar-widget bg-dark">
                        <h3 className="widget-title">Why Choose Us</h3>
                        <p className="widget-text">{service.whyChooseUs}</p>
                    </div>

                    <div className="sidebar-widget bg-light">
                        <h3 className="widget-title">Need Help?</h3>
                        <p className="widget-text">Get in touch with our experts to discuss your security needs.</p>
                        <Link href="/contact" className="sidebar-cta-btn">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
//Anujv93 commir