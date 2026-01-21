'use client';

import InquiryForm from '@/components/global/inquiry-form/inquiry-form';
import './certificate-inquiry.css';

interface CertificateInquirySectionProps {
    certificateTitle: string;
    certificateSlug: string;
}

export default function CertificateInquirySection({
    certificateTitle,
    certificateSlug,
}: CertificateInquirySectionProps) {
    return (
        <section className="certificate-inquiry-section" id="inquiry">
            <div className="inquiry-container">
                <div className="inquiry-content">
                    <h2 className="inquiry-title">
                        Ready to Get <span className="accent">Certified?</span>
                    </h2>
                    <p className="inquiry-subtitle">
                        Fill out the form and our expert counselor will guide you through the certification process.
                    </p>
                    <ul className="inquiry-benefits">
                        <li>Personalized Learning Path</li>
                        <li>Flexible Batch Timings</li>
                        <li>EMI Options Available</li>
                        <li>100% Placement Assistance</li>
                    </ul>
                </div>
                <div className="inquiry-form-container">
                    <InquiryForm
                        courseName={certificateTitle}
                        courseCode={certificateSlug}
                        variant="section"
                        title="Get Certification Details"
                        subtitle="Our counselor will call you within 2 hours"
                    />
                </div>
            </div>
        </section>
    );
}
