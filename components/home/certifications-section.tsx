'use client';

import React from 'react';
import Image from 'next/image';
import './certifications-section.css';

export default function CertificationsSection() {
    return (
        <section className="cert-section" id="certifications">
            <div className="cert-container">
                <div className="cert-header">
                    <h2 className="cert-title">Globally Recognized & <span className="cert-title-gradient">Authorized</span></h2>
                    <p className="cert-subtitle">eHack Academy is an official partner of industry leaders, delivering curriculum that meets global standards.</p>
                </div>

                <div className="cert-grid">
                    {/* EC-Council Authorization */}
                    <div className="cert-card">
                        <div className="cert-entity-header">
                            <div className="cert-logo-wrapper">
                                <Image
                                    src="/images/ec-council-badge.png"
                                    alt="EC-Council Authorized Partner"
                                    width={180}
                                    height={80}
                                    className="cert-logo"
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div className="cert-badge cert-badge-premium">Premium Partner</div>
                        </div>

                        <div className="cert-content">
                            <h3>Premier Authorized Training Partner</h3>
                            <p>
                                We are officially accredited by EC-Council to deliver world-class cybersecurity training.
                                Our authorization validates our adherence to strict quality standards and ensures you receive
                                official courseware, certified instruction, and globally recognized credentials.
                            </p>
                        </div>

                        <div className="cert-image-container">
                            <Image
                                src="/images/ec-council-authorization-certificate.png"
                                alt="EC-Council Authorization Certificate"
                                width={500}
                                height={350}
                                className="cert-doc-image"
                            />
                        </div>
                    </div>

                    {/* Kennedy University Authorization */}
                    <div className="cert-card">
                        <div className="cert-entity-header">
                            <div className="cert-logo-wrapper">
                                <Image
                                    src="/images/kennedy-university-logo.png"
                                    alt="Kennedy University"
                                    width={180}
                                    height={60}
                                    className="cert-logo dark-logo"
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div className="cert-badge cert-badge-university">University Partner</div>
                        </div>

                        <div className="cert-content">
                            <h3>Accredited Academic Excellence</h3>
                            <p>
                                Through our strategic alliance with Kennedy University, we offer rigorous academic programs
                                that bridge the gap between theoretical knowledge and practical application. Our graduates
                                earn degrees backed by full university accreditation and academic integrity.
                            </p>
                        </div>

                        <div className="cert-image-container">
                            <Image
                                src="/images/kennedy-authorization-certificate.png"
                                alt="Kennedy University Authorization Certificate"
                                width={500}
                                height={350}
                                className="cert-doc-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
