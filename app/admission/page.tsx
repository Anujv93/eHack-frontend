'use client';

import { useState, useRef } from 'react';
import './page.css';

// Program options
const PROGRAMS = [
    { value: '', label: 'Select Program *' },
    { value: 'ceh-v13', label: 'Certified Ethical Hacker (CEH v13)' },
    { value: 'ceh-master', label: 'CEH Master Program (3 Certifications)' },
    { value: 'cnd', label: 'Certified Network Defender (CND)' },
    { value: 'chfi', label: 'Computer Hacking Forensic Investigator (CHFI)' },
    { value: 'masters-ethical-hacking', label: 'Masters in Ethical Hacking (6 Certifications)' },
    { value: 'graduate-ethical-hacking', label: 'Graduate in Ethical Hacking' },
    { value: 'bscs', label: 'Bachelor of Science in Cyber Security (BSCS)' },
    { value: 'mscs', label: 'Master of Science in Cyber Security (MSCS)' },
    { value: 'bscs-mscs-integrated', label: 'Integrated BSCS + MSCS (Dual Degree)' },
    { value: 'corporate-training', label: 'Corporate Training' },
    { value: 'other', label: 'Other / Need Guidance' },
];

const QUALIFICATIONS = [
    { value: '', label: 'Highest Qualification *' },
    { value: '10th', label: '10th / SSLC' },
    { value: '12th', label: '12th / PUC / HSC' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'undergraduate', label: 'Undergraduate (Pursuing)' },
    { value: 'graduate', label: 'Graduate (B.E./B.Tech/BCA/BSc/Other)' },
    { value: 'postgraduate', label: 'Post Graduate (M.E./M.Tech/MCA/MSc/MBA)' },
    { value: 'phd', label: 'PhD / Doctorate' },
];

const LEARNING_MODES = [
    { value: '', label: 'Preferred Learning Mode *' },
    { value: 'online', label: 'Online (Live Classes)' },
    { value: 'classroom', label: 'Classroom (Bangalore Center)' },
    { value: 'hybrid', label: 'Hybrid (Online + Classroom)' },
    { value: '1-on-1', label: '1-on-1 Personalized Training' },
];

const BATCH_TIMINGS = [
    { value: '', label: 'Preferred Batch Timing *' },
    { value: 'weekday-morning', label: 'Weekday Morning (10 AM - 1 PM)' },
    { value: 'weekday-evening', label: 'Weekday Evening (6 PM - 9 PM)' },
    { value: 'weekend', label: 'Weekend (Sat-Sun)' },
    { value: 'flexible', label: 'Flexible / Need Discussion' },
];

const PAYMENT_MODES = [
    { value: '', label: 'How will you pay? *' },
    { value: 'full-payment', label: 'Full Payment (One-time)' },
    { value: 'emi-3', label: 'EMI - 3 Months' },
    { value: 'emi-6', label: 'EMI - 6 Months' },
    { value: 'emi-12', label: 'EMI - 12 Months' },
    { value: 'education-loan', label: 'Education Loan' },
    { value: 'need-guidance', label: 'Need Guidance on Payment Options' },
];

const LEAD_SOURCES = [
    { value: '', label: 'How did you hear about us?' },
    { value: 'google', label: 'Google Search' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'friend-referral', label: 'Friend / Family Referral' },
    { value: 'college', label: 'College / University' },
    { value: 'event', label: 'Workshop / Event' },
    { value: 'other', label: 'Other' },
];

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Chandigarh', 'Other'
];

interface FormData {
    // Personal Information
    fullName: string;
    email: string;
    phone: string;
    whatsapp: string;
    dateOfBirth: string;
    gender: string;
    guardianName: string;

    // Address
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;

    // Educational Background
    qualification: string;
    institution: string;
    yearOfPassing: string;
    percentage: string;
    existingCertifications: string;

    // Professional Background
    isWorking: string;
    companyName: string;
    designation: string;
    experience: string;
    currentCtc: string;

    // Program Selection
    programInterest: string;
    learningMode: string;
    batchTiming: string;
    expectedJoiningDate: string;

    // Payment & Reference
    paymentMode: string;
    leadSource: string;
    referralCode: string;

    // Consent
    agreeTerms: boolean;
    agreeWhatsApp: boolean;
    agreeEmail: boolean;
}

const initialFormData: FormData = {
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    dateOfBirth: '',
    gender: '',
    guardianName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    qualification: '',
    institution: '',
    yearOfPassing: '',
    percentage: '',
    existingCertifications: '',
    isWorking: '',
    companyName: '',
    designation: '',
    experience: '',
    currentCtc: '',
    programInterest: '',
    learningMode: '',
    batchTiming: '',
    expectedJoiningDate: '',
    paymentMode: '',
    leadSource: '',
    referralCode: '',
    agreeTerms: false,
    agreeWhatsApp: true,
    agreeEmail: true,
};

export default function AdmissionPage() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [applicationId, setApplicationId] = useState('');
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const formRef = useRef<HTMLFormElement>(null);

    const totalSteps = 5;

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        switch (step) {
            case 1: // Personal Information
                if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
                if (!formData.email.trim()) newErrors.email = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                    newErrors.email = 'Invalid email format';
                if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
                else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, '')))
                    newErrors.phone = 'Invalid phone number';
                if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
                break;

            case 2: // Educational Background
                if (!formData.qualification) newErrors.qualification = 'Qualification is required';
                if (!formData.institution.trim()) newErrors.institution = 'Institution name is required';
                break;

            case 3: // Program Selection
                if (!formData.programInterest) newErrors.programInterest = 'Please select a program';
                if (!formData.learningMode) newErrors.learningMode = 'Please select learning mode';
                if (!formData.batchTiming) newErrors.batchTiming = 'Please select batch timing';
                break;

            case 4: // Payment
                if (!formData.paymentMode) newErrors.paymentMode = 'Please select payment mode';
                break;

            case 5: // Review & Submit
                if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);

        try {
            // Generate application ID
            const appId = `EHA-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

            // Send to Zoho Bigin
            const response = await fetch('/api/zoho/admission', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    applicationId: appId,
                    submittedAt: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit application');
            }

            const result = await response.json();
            console.log('Admission submission successful:', result);

            setApplicationId(appId);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderProgressBar = () => (
        <div className="progress-container">
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
            </div>
            <div className="progress-steps">
                {['Personal', 'Education', 'Program', 'Payment', 'Review'].map((label, index) => (
                    <div
                        key={label}
                        className={`progress-step ${currentStep > index ? 'completed' : ''} ${currentStep === index + 1 ? 'active' : ''}`}
                    >
                        <div className="step-circle">
                            {currentStep > index + 1 ? '✓' : index + 1}
                        </div>
                        <span className="step-label">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="form-step">
            <h2 className="step-title">Personal Information</h2>
            <p className="step-subtitle">Tell us about yourself</p>

            <div className="form-grid">
                <div className="form-group full-width">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={errors.fullName ? 'error' : ''}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <div className="phone-input">
                        <span className="country-code">🇮🇳 +91</span>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="9876543210"
                            maxLength={10}
                            className={errors.phone ? 'error' : ''}
                        />
                    </div>
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="whatsapp">WhatsApp Number</label>
                    <div className="phone-input">
                        <span className="country-code">🇮🇳 +91</span>
                        <input
                            type="tel"
                            id="whatsapp"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                            placeholder="Same as phone or different"
                            maxLength={10}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth *</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={errors.dateOfBirth ? 'error' : ''}
                    />
                    {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group full-width">
                    <label htmlFor="guardianName">Father&apos;s / Guardian&apos;s Name</label>
                    <input
                        type="text"
                        id="guardianName"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleInputChange}
                        placeholder="Enter guardian's name"
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address, landmark"
                        rows={2}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Your city"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                    >
                        <option value="">Select State</option>
                        {INDIAN_STATES.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="pincode">PIN Code</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="560001"
                        maxLength={6}
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="form-step">
            <h2 className="step-title">Educational & Professional Background</h2>
            <p className="step-subtitle">Help us understand your background</p>

            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="qualification">Highest Qualification *</label>
                    <select
                        id="qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        className={errors.qualification ? 'error' : ''}
                    >
                        {QUALIFICATIONS.map(q => (
                            <option key={q.value} value={q.value}>{q.label}</option>
                        ))}
                    </select>
                    {errors.qualification && <span className="error-text">{errors.qualification}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="institution">Institution / University *</label>
                    <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleInputChange}
                        placeholder="Your college/university name"
                        className={errors.institution ? 'error' : ''}
                    />
                    {errors.institution && <span className="error-text">{errors.institution}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="yearOfPassing">Year of Passing</label>
                    <input
                        type="text"
                        id="yearOfPassing"
                        name="yearOfPassing"
                        value={formData.yearOfPassing}
                        onChange={handleInputChange}
                        placeholder="2024"
                        maxLength={4}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="percentage">Percentage / CGPA</label>
                    <input
                        type="text"
                        id="percentage"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleInputChange}
                        placeholder="75% or 8.5 CGPA"
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="existingCertifications">Existing Certifications (if any)</label>
                    <input
                        type="text"
                        id="existingCertifications"
                        name="existingCertifications"
                        value={formData.existingCertifications}
                        onChange={handleInputChange}
                        placeholder="E.g., CompTIA A+, CCNA, AWS, etc."
                    />
                </div>

                <div className="form-divider full-width">
                    <span>Professional Background</span>
                </div>

                <div className="form-group">
                    <label htmlFor="isWorking">Are you currently working?</label>
                    <select
                        id="isWorking"
                        name="isWorking"
                        value={formData.isWorking}
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        <option value="yes">Yes, Working</option>
                        <option value="no">No, Not Working</option>
                        <option value="fresher">Fresher / Job Seeker</option>
                        <option value="student">Currently Studying</option>
                    </select>
                </div>

                {formData.isWorking === 'yes' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="companyName">Company Name</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="Your company name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="designation">Designation</label>
                            <input
                                type="text"
                                id="designation"
                                name="designation"
                                value={formData.designation}
                                onChange={handleInputChange}
                                placeholder="Your job title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="experience">Work Experience (Years)</label>
                            <select
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Experience</option>
                                <option value="0-1">0-1 Years</option>
                                <option value="1-3">1-3 Years</option>
                                <option value="3-5">3-5 Years</option>
                                <option value="5-10">5-10 Years</option>
                                <option value="10+">10+ Years</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="currentCtc">Current CTC (Optional)</label>
                            <input
                                type="text"
                                id="currentCtc"
                                name="currentCtc"
                                value={formData.currentCtc}
                                onChange={handleInputChange}
                                placeholder="E.g., 6 LPA"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="form-step">
            <h2 className="step-title">Program Selection</h2>
            <p className="step-subtitle">Choose your learning path</p>

            <div className="form-grid">
                <div className="form-group full-width">
                    <label htmlFor="programInterest">Program Interested In *</label>
                    <select
                        id="programInterest"
                        name="programInterest"
                        value={formData.programInterest}
                        onChange={handleInputChange}
                        className={errors.programInterest ? 'error' : ''}
                    >
                        {PROGRAMS.map(p => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                    {errors.programInterest && <span className="error-text">{errors.programInterest}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="learningMode">Preferred Learning Mode *</label>
                    <select
                        id="learningMode"
                        name="learningMode"
                        value={formData.learningMode}
                        onChange={handleInputChange}
                        className={errors.learningMode ? 'error' : ''}
                    >
                        {LEARNING_MODES.map(m => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                    {errors.learningMode && <span className="error-text">{errors.learningMode}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="batchTiming">Preferred Batch Timing *</label>
                    <select
                        id="batchTiming"
                        name="batchTiming"
                        value={formData.batchTiming}
                        onChange={handleInputChange}
                        className={errors.batchTiming ? 'error' : ''}
                    >
                        {BATCH_TIMINGS.map(b => (
                            <option key={b.value} value={b.value}>{b.label}</option>
                        ))}
                    </select>
                    {errors.batchTiming && <span className="error-text">{errors.batchTiming}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="expectedJoiningDate">Expected Joining Date</label>
                    <input
                        type="date"
                        id="expectedJoiningDate"
                        name="expectedJoiningDate"
                        value={formData.expectedJoiningDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
            </div>

            <div className="program-info-box">
                <h4>💡 Not Sure Which Program to Choose?</h4>
                <p>Our career counselors can help you select the right program based on your background and goals. Select &quot;Other / Need Guidance&quot; and we&apos;ll reach out to help you decide.</p>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="form-step">
            <h2 className="step-title">Payment & Reference</h2>
            <p className="step-subtitle">Choose your payment option</p>

            <div className="form-grid">
                <div className="form-group full-width">
                    <label htmlFor="paymentMode">How will you pay? *</label>
                    <select
                        id="paymentMode"
                        name="paymentMode"
                        value={formData.paymentMode}
                        onChange={handleInputChange}
                        className={errors.paymentMode ? 'error' : ''}
                    >
                        {PAYMENT_MODES.map(p => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                    {errors.paymentMode && <span className="error-text">{errors.paymentMode}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="leadSource">How did you hear about us?</label>
                    <select
                        id="leadSource"
                        name="leadSource"
                        value={formData.leadSource}
                        onChange={handleInputChange}
                    >
                        {LEAD_SOURCES.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="referralCode">Referral Code (if any)</label>
                    <input
                        type="text"
                        id="referralCode"
                        name="referralCode"
                        value={formData.referralCode}
                        onChange={handleInputChange}
                        placeholder="Enter referral code"
                    />
                </div>
            </div>

            <div className="payment-info-box">
                <h4>💰 Payment Options Available</h4>
                <ul>
                    <li><strong>Full Payment:</strong> Pay complete fee and get additional benefits</li>
                    <li><strong>EMI:</strong> Split into 3, 6, or 12 monthly installments (0% interest available)</li>
                    <li><strong>Education Loan:</strong> We partner with leading NBFCs for easy education loans</li>
                </ul>
            </div>
        </div>
    );

    const renderStep5 = () => (
        <div className="form-step">
            <h2 className="step-title">Review & Submit</h2>
            <p className="step-subtitle">Please review your application details</p>

            <div className="review-section">
                <div className="review-group">
                    <h4>Personal Information</h4>
                    <div className="review-grid">
                        <div><strong>Name:</strong> {formData.fullName}</div>
                        <div><strong>Email:</strong> {formData.email}</div>
                        <div><strong>Phone:</strong> +91 {formData.phone}</div>
                        <div><strong>DOB:</strong> {formData.dateOfBirth}</div>
                        <div><strong>City:</strong> {formData.city || 'Not provided'}</div>
                        <div><strong>State:</strong> {formData.state || 'Not provided'}</div>
                    </div>
                </div>

                <div className="review-group">
                    <h4>Educational Background</h4>
                    <div className="review-grid">
                        <div><strong>Qualification:</strong> {QUALIFICATIONS.find(q => q.value === formData.qualification)?.label || formData.qualification}</div>
                        <div><strong>Institution:</strong> {formData.institution}</div>
                        <div><strong>Year:</strong> {formData.yearOfPassing || 'Not provided'}</div>
                        <div><strong>Working:</strong> {formData.isWorking === 'yes' ? `Yes, at ${formData.companyName}` : 'No'}</div>
                    </div>
                </div>

                <div className="review-group">
                    <h4>Program Details</h4>
                    <div className="review-grid">
                        <div><strong>Program:</strong> {PROGRAMS.find(p => p.value === formData.programInterest)?.label || formData.programInterest}</div>
                        <div><strong>Mode:</strong> {LEARNING_MODES.find(m => m.value === formData.learningMode)?.label || formData.learningMode}</div>
                        <div><strong>Batch:</strong> {BATCH_TIMINGS.find(b => b.value === formData.batchTiming)?.label || formData.batchTiming}</div>
                        <div><strong>Payment:</strong> {PAYMENT_MODES.find(p => p.value === formData.paymentMode)?.label || formData.paymentMode}</div>
                    </div>
                </div>
            </div>

            <div className="consent-section">
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    I agree to eHack Academy&apos;s <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a> *
                </label>
                {errors.agreeTerms && <span className="error-text">{errors.agreeTerms}</span>}

                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        name="agreeWhatsApp"
                        checked={formData.agreeWhatsApp}
                        onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    I wish to receive updates via WhatsApp
                </label>

                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        name="agreeEmail"
                        checked={formData.agreeEmail}
                        onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    I wish to receive updates via Email
                </label>
            </div>
        </div>
    );

    const renderSuccessPage = () => (
        <div className="success-container">
            <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="16 10 11 16 8 13" />
                </svg>
            </div>
            <h2>Application Submitted Successfully! 🎉</h2>
            <p className="application-id">
                Your Application ID: <strong>{applicationId}</strong>
            </p>
            <p>Thank you for applying to eHack Academy! Our admissions team will review your application and contact you within 24-48 hours.</p>

            <div className="next-steps">
                <h4>What&apos;s Next?</h4>
                <ol>
                    <li>Our team will review your application</li>
                    <li>You&apos;ll receive a call/WhatsApp from our counselor</li>
                    <li>Complete document verification</li>
                    <li>Make payment and get enrolled!</li>
                </ol>
            </div>

            <div className="contact-info">
                <p>Have questions? Contact us:</p>
                <div className="contact-buttons">
                    <a href="tel:+919886035330" className="contact-btn phone">
                        📞 +91 98860 35330
                    </a>
                    <a href="https://wa.me/919886035330" className="contact-btn whatsapp">
                        💬 WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );

    if (isSubmitted) {
        return (
            <main className="admission-page">
                <div className="admission-container">
                    {renderSuccessPage()}
                </div>
            </main>
        );
    }

    return (
        <main className="admission-page">
            <div className="admission-hero">
                <div className="hero-content">
                    <h1>Online Admission Form</h1>
                    <p>Join India&apos;s Leading Cybersecurity Training Academy</p>
                </div>
            </div>

            <div className="admission-container">
                {renderProgressBar()}

                <form ref={formRef} onSubmit={handleSubmit} className="admission-form">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                    {currentStep === 5 && renderStep5()}

                    <div className="form-navigation">
                        {currentStep > 1 && (
                            <button type="button" className="btn-prev" onClick={prevStep}>
                                ← Previous
                            </button>
                        )}

                        {currentStep < totalSteps ? (
                            <button type="button" className="btn-next" onClick={nextStep}>
                                Next →
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        )}
                    </div>
                </form>

                <div className="admission-footer">
                    <p>Need help? Call us at <a href="tel:+919886035330">+91 98860 35330</a> or <a href="https://wa.me/919886035330">WhatsApp</a></p>
                </div>
            </div>
        </main>
    );
}
