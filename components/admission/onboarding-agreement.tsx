'use client';

import { useState } from 'react';
import './onboarding-agreement.css';

interface OnboardingAgreementProps {
    programName: string;
    studentName: string;
    amount: number;
    paymentMode: string; // 'full-payment' | 'emi-3' | 'emi-6' | 'emi-12'
    onAgreementComplete: (agreements: AgreementSignature) => void;
}

export interface AgreementSignature {
    onboardingLetter: boolean;
    rulesAndRegulations: boolean;
    companyDisclaimer: boolean;
    emiAgreement: boolean;
    signedAt: string;
    ipAddress: string;
}

interface Section {
    id: string;
    title: string;
    icon: string;
    required: boolean;
    content: React.ReactNode;
}

export default function OnboardingAgreement({
    programName,
    studentName,
    amount,
    paymentMode,
    onAgreementComplete,
}: OnboardingAgreementProps) {
    const [expandedSection, setExpandedSection] = useState<string | null>('onboardingLetter');
    const [agreements, setAgreements] = useState({
        onboardingLetter: false,
        rulesAndRegulations: false,
        companyDisclaimer: false,
        emiAgreement: paymentMode === 'full-payment', // Auto-agree if not EMI
    });
    const [ipAddress, setIpAddress] = useState<string>('');

    // Fetch IP address on mount
    useState(() => {
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => setIpAddress(data.ip))
            .catch(() => setIpAddress('Unable to detect'));
    });

    const isEMI = paymentMode !== 'full-payment';
    const currentDate = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const toggleSection = (sectionId: string) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId);
    };

    const handleAgreement = (sectionId: string, agreed: boolean) => {
        const newAgreements = { ...agreements, [sectionId]: agreed };
        setAgreements(newAgreements);

        // Check if all required agreements are completed
        const allRequired = isEMI
            ? newAgreements.onboardingLetter && newAgreements.rulesAndRegulations &&
            newAgreements.companyDisclaimer && newAgreements.emiAgreement
            : newAgreements.onboardingLetter && newAgreements.rulesAndRegulations &&
            newAgreements.companyDisclaimer;

        if (allRequired) {
            onAgreementComplete({
                ...newAgreements,
                signedAt: new Date().toISOString(),
                ipAddress: ipAddress,
            });
        }
    };

    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);

    const sections: Section[] = [
        {
            id: 'onboardingLetter',
            title: 'Onboarding Letter of Confirmation',
            icon: '📋',
            required: true,
            content: (
                <div className="agreement-content">
                    <div className="letter-header">
                        <h4>EHACK ACADEMY</h4>
                        <p>Onboarding Confirmation Letter</p>
                        <p className="date">Date: {currentDate}</p>
                    </div>

                    <p>Dear <strong>{studentName || 'Student'}</strong>,</p>

                    <p>Congratulations on your enrollment in <strong>{programName}</strong> at Ehack Academy!
                        We are delighted to welcome you to our community of cybersecurity professionals.</p>

                    <h5>Program Details:</h5>
                    <ul>
                        <li><strong>Program:</strong> {programName}</li>
                        <li><strong>Fee:</strong> {formattedAmount}</li>
                        <li><strong>Duration:</strong> As per program schedule</li>
                    </ul>

                    <h5>What You&apos;ll Receive:</h5>
                    <ul>
                        <li>Access to world-class training materials</li>
                        <li>Live sessions with industry experts</li>
                        <li>Hands-on lab exercises</li>
                        <li>Certification exam voucher (where applicable)</li>
                        <li>Placement assistance</li>
                    </ul>

                    <p>Your training schedule and batch details will be shared via email and WhatsApp.</p>

                    <p className="signature">
                        <strong>Best Regards,</strong><br />
                        Ehack Academy Team
                    </p>
                </div>
            ),
        },
        {
            id: 'rulesAndRegulations',
            title: 'Rules & Regulations',
            icon: '📖',
            required: true,
            content: (
                <div className="agreement-content">
                    <h4>Student Code of Conduct</h4>

                    <h5>1. Attendance Policy</h5>
                    <ul>
                        <li>Minimum 80% attendance is mandatory for certification eligibility</li>
                        <li>Sessions missed due to emergencies must be reported within 24 hours</li>
                        <li>Makeup sessions may be provided at the discretion of the academy</li>
                    </ul>

                    <h5>2. Academic Integrity</h5>
                    <ul>
                        <li>All assignments must be original work</li>
                        <li>Plagiarism will result in immediate dismissal</li>
                        <li>Sharing exam materials or answers is strictly prohibited</li>
                    </ul>

                    <h5>3. Professional Conduct</h5>
                    <ul>
                        <li>Respectful behavior towards instructors and fellow students is mandatory</li>
                        <li>Harassment of any kind will not be tolerated</li>
                        <li>All learned skills must be used ethically and legally</li>
                    </ul>

                    <h5>4. Termination Clauses</h5>
                    <ul>
                        <li>Violation of code of conduct may lead to suspension or expulsion</li>
                        <li>No refund will be provided in case of disciplinary termination</li>
                        <li>Appeals can be made in writing within 7 days of any action</li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'companyDisclaimer',
            title: 'Company Disclaimer',
            icon: '⚠️',
            required: true,
            content: (
                <div className="agreement-content">
                    <h4>Important Disclaimers</h4>

                    <h5>Training vs Placement</h5>
                    <p>Ehack Academy provides high-quality cybersecurity training and placement <strong>assistance</strong>.
                        While we strive to help students find suitable employment opportunities, <strong>placement is not guaranteed</strong>.
                        Job placement depends on multiple factors including market conditions, student performance, and interview skills.</p>

                    <h5>Certification Authority</h5>
                    <p>Certifications offered are from <strong>EC-Council</strong> and other recognized bodies.
                        Ehack Academy is an <strong>Accredited Training Center (ATC)</strong> and not the certification authority.
                        Exam policies, fees, and passing criteria are determined by the respective certification bodies.</p>

                    <h5>Liability Limitations</h5>
                    <ul>
                        <li>Ehack Academy is not liable for any misuse of skills or knowledge gained</li>
                        <li>Students are responsible for adhering to laws of their jurisdiction</li>
                        <li>Any unauthorized hacking activity is the sole responsibility of the individual</li>
                        <li>Technical issues beyond our control may occasionally affect session delivery</li>
                    </ul>

                    <h5>Intellectual Property</h5>
                    <p>All training materials, recordings, and resources are proprietary.
                        Unauthorized distribution, copying, or sharing is strictly prohibited and may result in legal action.</p>
                </div>
            ),
        },
    ];

    // Add EMI agreement if applicable
    if (isEMI) {
        const emiMonths = parseInt(paymentMode.split('-')[1]) || 3;
        const emiAmount = Math.ceil(amount / emiMonths);

        sections.push({
            id: 'emiAgreement',
            title: 'EMI / Payment Agreement',
            icon: '💰',
            required: true,
            content: (
                <div className="agreement-content">
                    <h4>EMI Payment Agreement</h4>

                    <div className="emi-summary">
                        <div className="emi-row">
                            <span>Total Amount</span>
                            <span>{formattedAmount}</span>
                        </div>
                        <div className="emi-row">
                            <span>Number of Installments</span>
                            <span>{emiMonths} months</span>
                        </div>
                        <div className="emi-row highlight">
                            <span>Monthly EMI</span>
                            <span>₹{emiAmount.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <h5>Terms & Conditions</h5>
                    <ul>
                        <li>EMI payments are due on the same date each month</li>
                        <li>A grace period of 5 days is allowed for payment</li>
                        <li>Late payment may attract a penalty of ₹500 or 2%, whichever is higher</li>
                        <li>Failure to pay 2 consecutive EMIs may result in training suspension</li>
                        <li>Full certification will be provided only after complete payment</li>
                    </ul>

                    <h5>Authorization</h5>
                    <p>By agreeing, you authorize Ehack Academy to:</p>
                    <ul>
                        <li>Send payment reminders via SMS, email, and WhatsApp</li>
                        <li>Process auto-debit (if NACH/e-mandate is set up)</li>
                        <li>Report payment status to relevant authorities if needed</li>
                    </ul>
                </div>
            ),
        });
    }

    const allAgreed = sections.filter(s => s.required).every(s => agreements[s.id as keyof typeof agreements]);

    return (
        <div className="onboarding-agreement-container">
            <div className="agreement-header">
                <h3>📝 Digital Onboarding Agreement</h3>
                <p>Please review and acknowledge the following documents</p>
            </div>

            <div className="sections-list">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className={`agreement-section ${expandedSection === section.id ? 'expanded' : ''} ${agreements[section.id as keyof typeof agreements] ? 'agreed' : ''}`}
                    >
                        <div
                            className="section-header"
                            onClick={() => toggleSection(section.id)}
                        >
                            <div className="section-info">
                                <span className="section-icon">{section.icon}</span>
                                <span className="section-title">{section.title}</span>
                                {section.required && <span className="required-tag">Required</span>}
                            </div>
                            <div className="section-status">
                                {agreements[section.id as keyof typeof agreements] && (
                                    <span className="agreed-badge">✓ Agreed</span>
                                )}
                                <span className={`expand-icon ${expandedSection === section.id ? 'open' : ''}`}>
                                    ▼
                                </span>
                            </div>
                        </div>

                        {expandedSection === section.id && (
                            <div className="section-body">
                                {section.content}

                                <div className="agreement-action">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={agreements[section.id as keyof typeof agreements]}
                                            onChange={(e) => handleAgreement(section.id, e.target.checked)}
                                        />
                                        <span className="checkbox-text">
                                            I have read and agree to the above {section.title}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="signature-section">
                <div className="signature-info">
                    <div className="info-row">
                        <span>🕐 Signed At:</span>
                        <span>{new Date().toLocaleString('en-IN')}</span>
                    </div>
                    <div className="info-row">
                        <span>🌐 IP Address:</span>
                        <span>{ipAddress || 'Detecting...'}</span>
                    </div>
                </div>
            </div>

            <div className={`agreement-status ${allAgreed ? 'complete' : ''}`}>
                {allAgreed ? (
                    <>
                        <span className="status-icon">✓</span>
                        All agreements signed successfully
                    </>
                ) : (
                    <>
                        <span className="status-icon">ℹ️</span>
                        Please review and agree to all required documents
                    </>
                )}
            </div>
        </div>
    );
}
