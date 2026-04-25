'use client';

import { useState, useEffect } from 'react';
import EmailOTP from '@/components/admission/email-otp';
import DocumentUpload, { UploadedDocument } from '@/components/admission/document-upload';
import OnboardingAgreement, { AgreementSignature } from '@/components/admission/onboarding-agreement';
import RazorpayCheckout, { PaymentResult } from '@/components/admission/razorpay-checkout';
import './page.css';

// Registration stages matching Zoho Bigin Admission Pipeline
const REGISTRATION_STAGES = [
    { step: 1, name: 'Personal Info', zohoStage: 'Qualification' },
    { step: 2, name: 'Email Verification', zohoStage: 'Email Verified' },
    { step: 3, name: 'Document Upload', zohoStage: 'Documents Submitted' },
    { step: 4, name: 'Course Selection', zohoStage: 'Course Selected' },
    { step: 5, name: 'Agreements', zohoStage: 'Agreement Signed' },
    { step: 6, name: 'Payment', zohoStage: 'Payment Completed' },
];

// Program options
const PROGRAMS = [
    { value: '', label: 'Select Program *', price: 0 },
    { value: 'ceh-v13', label: 'Certified Ethical Hacker (CEH v13)', price: 85000 },
    { value: 'ceh-master', label: 'CEH Master Program (3 Certifications)', price: 145000 },
    { value: 'cnd', label: 'Certified Network Defender (CND)', price: 65000 },
    { value: 'chfi', label: 'Computer Hacking Forensic Investigator (CHFI)', price: 75000 },
    { value: 'masters-ethical-hacking', label: 'Masters in Ethical Hacking (6 Certifications)', price: 250000 },
    { value: 'graduate-ethical-hacking', label: 'Graduate in Ethical Hacking', price: 175000 },
];

const LEARNING_MODES = [
    { value: '', label: 'Select Learning Mode *' },
    { value: 'online', label: 'Online (Live Classes)' },
    { value: 'classroom', label: 'Classroom (Bangalore Center)' },
    { value: 'hybrid', label: 'Hybrid (Online + Classroom)' },
];

const PAYMENT_OPTIONS = [
    { value: 'full-payment', label: 'Full Payment', discount: 5 },
    { value: 'emi-3', label: '3 Month EMI (No Cost)', discount: 0 },
    { value: 'emi-6', label: '6 Month EMI', discount: 0 },
    { value: 'emi-12', label: '12 Month EMI', discount: 0 },
];

interface RegistrationData {
    // Step 1: Personal Info
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    qualification: string;

    // Step 2: Email Verification
    emailVerified: boolean;
    verificationToken: string;

    // Step 3: Documents
    documents: UploadedDocument[];

    // Step 4: Course Selection
    programInterest: string;
    learningMode: string;
    paymentOption: string;

    // Step 5: Agreements
    agreementSignature: AgreementSignature | null;

    // Step 6: Payment
    paymentResult: PaymentResult | null;

    // Metadata
    applicationId: string;
    enrollmentId: string;
}

const initialData: RegistrationData = {
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    qualification: '',
    emailVerified: false,
    verificationToken: '',
    documents: [],
    programInterest: '',
    learningMode: '',
    paymentOption: 'full-payment',
    agreementSignature: null,
    paymentResult: null,
    applicationId: '',
    enrollmentId: '',
};

export default function RegisterPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState<RegistrationData>(initialData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Generate application ID on mount
    useEffect(() => {
        const appId = `EHA-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
        setData(prev => ({ ...prev, applicationId: appId }));
    }, []);

    const updateData = (updates: Partial<RegistrationData>) => {
        setData(prev => ({ ...prev, ...updates }));
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};

        switch (step) {
            case 1:
                if (!data.fullName.trim()) newErrors.fullName = 'Full name is required';
                if (!data.email.trim()) newErrors.email = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
                    newErrors.email = 'Invalid email format';
                if (!data.phone.trim()) newErrors.phone = 'Phone is required';
                else if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\D/g, '')))
                    newErrors.phone = 'Invalid phone number';
                if (!data.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
                break;

            case 2:
                if (!data.emailVerified) newErrors.email = 'Please verify your email';
                break;

            case 3:
                const requiredDocs = ['photo', 'aadhaar_front', 'aadhaar_back', 'highest_qualification'];
                const uploadedTypes = data.documents.map(d => d.documentType);
                const missingDocs = requiredDocs.filter(d => !uploadedTypes.includes(d));
                if (missingDocs.length > 0) {
                    newErrors.documents = `Missing: ${missingDocs.join(', ')}`;
                }
                break;

            case 4:
                if (!data.programInterest) newErrors.programInterest = 'Please select a program';
                if (!data.learningMode) newErrors.learningMode = 'Please select learning mode';
                break;

            case 5:
                if (!data.agreementSignature) newErrors.agreement = 'Please agree to all documents';
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 6));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEmailVerified = (token: string) => {
        updateData({ emailVerified: true, verificationToken: token });
    };

    const handleDocumentsUploaded = (documents: UploadedDocument[]) => {
        updateData({ documents });
    };

    const handleAgreementComplete = (signature: AgreementSignature) => {
        updateData({ agreementSignature: signature });
    };

    const handlePaymentSuccess = async (payment: PaymentResult) => {
        updateData({ paymentResult: payment });

        // Generate enrollment ID
        const enrollmentId = `EHA-ENR-${Date.now().toString().slice(-8)}`;
        updateData({ enrollmentId });

        // Submit to Zoho Bigin
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/zoho/admission', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    enrollmentId,
                    paymentId: payment.paymentId,
                    submittedAt: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                setIsComplete(true);
            }
        } catch (error) {
            console.error('Enrollment submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePaymentFailure = (error: string) => {
        setErrors({ payment: error });
    };

    const getSelectedProgram = () => PROGRAMS.find(p => p.value === data.programInterest);

    const calculateAmount = () => {
        const program = getSelectedProgram();
        if (!program) return 0;

        const paymentOption = PAYMENT_OPTIONS.find(p => p.value === data.paymentOption);
        const discount = paymentOption?.discount || 0;

        return program.price * (1 - discount / 100);
    };

    // Success Screen
    if (isComplete) {
        return (
            <div className="register-page">
                <div className="success-container">
                    <div className="success-icon">🎉</div>
                    <h1>Enrollment Complete!</h1>
                    <p className="success-message">
                        Congratulations! Your enrollment at Ehack Academy has been confirmed.
                    </p>

                    <div className="enrollment-card">
                        <div className="enrollment-id">
                            <span>Enrollment ID</span>
                            <strong>{data.enrollmentId}</strong>
                        </div>
                        <div className="enrollment-details">
                            <div><span>Name:</span> {data.fullName}</div>
                            <div><span>Program:</span> {getSelectedProgram()?.label}</div>
                            <div><span>Payment ID:</span> {data.paymentResult?.paymentId}</div>
                        </div>
                    </div>

                    <div className="next-steps">
                        <h3>📋 Next Steps</h3>
                        <ol>
                            <li>Check your email for confirmation and welcome kit</li>
                            <li>Join our student WhatsApp group (link in email)</li>
                            <li>Attend the orientation session on the scheduled date</li>
                        </ol>
                    </div>

                    <a href="/" className="home-btn">Back to Home</a>
                </div>
            </div>
        );
    }

    return (
        <div className="register-page">
            <div className="register-container">
                {/* Header */}
                <div className="register-header">
                    <h1>Student Registration</h1>
                    <p>Complete your enrollment in a few simple steps</p>
                    <div className="application-id">
                        Application ID: <strong>{data.applicationId}</strong>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-section">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${(currentStep / 6) * 100}%` }}
                        />
                    </div>
                    <div className="progress-steps">
                        {REGISTRATION_STAGES.map((stage) => (
                            <div
                                key={stage.step}
                                className={`progress-step ${currentStep > stage.step ? 'completed' : ''} ${currentStep === stage.step ? 'active' : ''}`}
                            >
                                <div className="step-circle">
                                    {currentStep > stage.step ? '✓' : stage.step}
                                </div>
                                <span className="step-label">{stage.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <div className="form-content">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <div className="form-step">
                            <h2>👤 Personal Information</h2>
                            <p className="step-description">Tell us about yourself</p>

                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>Full Name (as per Aadhaar) *</label>
                                    <input
                                        type="text"
                                        value={data.fullName}
                                        onChange={(e) => updateData({ fullName: e.target.value })}
                                        placeholder="Enter your full name"
                                        className={errors.fullName ? 'error' : ''}
                                    />
                                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Email Address *</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => updateData({ email: e.target.value })}
                                        placeholder="your.email@example.com"
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="error-text">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Mobile Number *</label>
                                    <div className="phone-input">
                                        <span className="country-code">+91</span>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => updateData({ phone: e.target.value })}
                                            placeholder="9876543210"
                                            maxLength={10}
                                            className={errors.phone ? 'error' : ''}
                                        />
                                    </div>
                                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Date of Birth *</label>
                                    <input
                                        type="date"
                                        value={data.dateOfBirth}
                                        onChange={(e) => updateData({ dateOfBirth: e.target.value })}
                                        className={errors.dateOfBirth ? 'error' : ''}
                                    />
                                    {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Highest Qualification</label>
                                    <select
                                        value={data.qualification}
                                        onChange={(e) => updateData({ qualification: e.target.value })}
                                    >
                                        <option value="">Select Qualification</option>
                                        <option value="10th">10th / SSLC</option>
                                        <option value="12th">12th / PUC / HSC</option>
                                        <option value="diploma">Diploma</option>
                                        <option value="graduate">Graduate</option>
                                        <option value="postgraduate">Post Graduate</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Email Verification */}
                    {currentStep === 2 && (
                        <div className="form-step">
                            <h2>📧 Email Verification</h2>
                            <p className="step-description">Verify your email address for secure communication</p>

                            {data.emailVerified ? (
                                <div className="verified-badge">
                                    <span className="verified-icon">✓</span>
                                    <div>
                                        <strong>Email Verified!</strong>
                                        <p>{data.email}</p>
                                    </div>
                                </div>
                            ) : (
                                <EmailOTP
                                    email={data.email}
                                    name={data.fullName}
                                    onVerified={handleEmailVerified}
                                    onEmailChange={(email) => updateData({ email })}
                                />
                            )}
                        </div>
                    )}

                    {/* Step 3: Document Upload */}
                    {currentStep === 3 && (
                        <div className="form-step">
                            <h2>📄 Document Upload</h2>
                            <p className="step-description">Upload required documents for verification</p>

                            <DocumentUpload
                                applicationId={data.applicationId}
                                onUploadComplete={handleDocumentsUploaded}
                            />

                            {errors.documents && (
                                <div className="step-error">{errors.documents}</div>
                            )}
                        </div>
                    )}

                    {/* Step 4: Course Selection */}
                    {currentStep === 4 && (
                        <div className="form-step">
                            <h2>🎓 Course Selection</h2>
                            <p className="step-description">Choose your program and learning preferences</p>

                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>Select Program *</label>
                                    <select
                                        value={data.programInterest}
                                        onChange={(e) => updateData({ programInterest: e.target.value })}
                                        className={errors.programInterest ? 'error' : ''}
                                    >
                                        {PROGRAMS.map(p => (
                                            <option key={p.value} value={p.value}>
                                                {p.label} {p.price > 0 && `- ₹${p.price.toLocaleString()}`}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.programInterest && <span className="error-text">{errors.programInterest}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Learning Mode *</label>
                                    <select
                                        value={data.learningMode}
                                        onChange={(e) => updateData({ learningMode: e.target.value })}
                                        className={errors.learningMode ? 'error' : ''}
                                    >
                                        {LEARNING_MODES.map(m => (
                                            <option key={m.value} value={m.value}>{m.label}</option>
                                        ))}
                                    </select>
                                    {errors.learningMode && <span className="error-text">{errors.learningMode}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Payment Option</label>
                                    <select
                                        value={data.paymentOption}
                                        onChange={(e) => updateData({ paymentOption: e.target.value })}
                                    >
                                        {PAYMENT_OPTIONS.map(p => (
                                            <option key={p.value} value={p.value}>
                                                {p.label} {p.discount > 0 && `(${p.discount}% off)`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {data.programInterest && (
                                <div className="price-summary">
                                    <div className="price-row">
                                        <span>Program Fee</span>
                                        <span>₹{getSelectedProgram()?.price.toLocaleString()}</span>
                                    </div>
                                    {data.paymentOption === 'full-payment' && (
                                        <div className="price-row discount">
                                            <span>Early Bird Discount (5%)</span>
                                            <span>-₹{((getSelectedProgram()?.price || 0) * 0.05).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="price-row total">
                                        <span>Total Payable</span>
                                        <span>₹{calculateAmount().toLocaleString()}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 5: Agreements */}
                    {currentStep === 5 && (
                        <div className="form-step">
                            <OnboardingAgreement
                                programName={getSelectedProgram()?.label || ''}
                                studentName={data.fullName}
                                amount={calculateAmount()}
                                paymentMode={data.paymentOption}
                                onAgreementComplete={handleAgreementComplete}
                            />

                            {errors.agreement && (
                                <div className="step-error">{errors.agreement}</div>
                            )}
                        </div>
                    )}

                    {/* Step 6: Payment */}
                    {currentStep === 6 && (
                        <div className="form-step">
                            <h2>💳 Complete Payment</h2>
                            <p className="step-description">Secure payment powered by Razorpay</p>

                            <RazorpayCheckout
                                amount={calculateAmount()}
                                applicationId={data.applicationId}
                                studentName={data.fullName}
                                email={data.email}
                                phone={data.phone}
                                programName={getSelectedProgram()?.label || ''}
                                onSuccess={handlePaymentSuccess}
                                onFailure={handlePaymentFailure}
                            />

                            {errors.payment && (
                                <div className="step-error">{errors.payment}</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="form-navigation">
                    {currentStep > 1 && currentStep < 6 && (
                        <button type="button" className="prev-btn" onClick={prevStep}>
                            ← Previous
                        </button>
                    )}

                    {currentStep < 6 && (
                        <button
                            type="button"
                            className="next-btn"
                            onClick={nextStep}
                            disabled={
                                (currentStep === 2 && !data.emailVerified) ||
                                (currentStep === 5 && !data.agreementSignature)
                            }
                        >
                            {currentStep === 5 ? 'Proceed to Payment →' : 'Continue →'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
