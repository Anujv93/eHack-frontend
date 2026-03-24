'use client';

import { useState, useRef, useEffect } from 'react';
import './email-otp.css';

interface EmailOTPProps {
    email: string;
    name?: string;
    onVerified: (verificationToken: string) => void;
    onEmailChange?: (email: string) => void;
}

export default function EmailOTP({ email, name, onVerified, onEmailChange }: EmailOTPProps) {
    const [currentEmail, setCurrentEmail] = useState(email);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [attempts, setAttempts] = useState(0);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer for resend
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Focus first OTP input when step changes to OTP
    useEffect(() => {
        if (step === 'otp' && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [step]);

    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const sendOTP = async () => {
        if (!validateEmail(currentEmail)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/email/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: currentEmail, name }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send OTP');
            }

            setStep('otp');
            setCountdown(60); // 60 seconds cooldown
            setSuccess('OTP sent! Check your email inbox');
            onEmailChange?.(currentEmail);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleOTPChange = (index: number, value: string) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return;

        const newOTP = [...otp];
        newOTP[index] = value;
        setOtp(newOTP);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-verify when all digits are entered
        if (value && index === 5 && newOTP.every(d => d)) {
            verifyOTP(newOTP.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);

        if (pastedData.length === 6) {
            const newOTP = pastedData.split('');
            setOtp(newOTP);
            verifyOTP(pastedData);
        }
    };

    const verifyOTP = async (otpValue: string) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/email/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: currentEmail, otp: otpValue }),
            });

            const data = await response.json();

            if (!response.ok) {
                setAttempts(prev => prev + 1);
                throw new Error(data.error || 'Invalid OTP');
            }

            setSuccess('Email verified successfully! ✓');
            onVerified(data.verificationToken);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Verification failed');
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const resendOTP = () => {
        setOtp(['', '', '', '', '', '']);
        setAttempts(0);
        sendOTP();
    };

    const editEmail = () => {
        setStep('email');
        setOtp(['', '', '', '', '', '']);
        setError('');
        setSuccess('');
    };

    return (
        <div className="email-otp-container">
            {step === 'email' ? (
                <div className="email-step">
                    <div className="otp-header">
                        <span className="otp-icon">📧</span>
                        <h3>Verify Your Email</h3>
                        <p>We&apos;ll send a 6-digit code to verify your email address</p>
                    </div>

                    <div className="email-input-group">
                        <input
                            type="email"
                            value={currentEmail}
                            onChange={(e) => setCurrentEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className={error ? 'error' : ''}
                            disabled={loading}
                        />
                    </div>

                    {error && <div className="otp-error">{error}</div>}
                    {success && <div className="otp-success">{success}</div>}

                    <button
                        type="button"
                        className="send-otp-btn"
                        onClick={sendOTP}
                        disabled={loading || !currentEmail}
                    >
                        {loading ? (
                            <>
                                <span className="btn-spinner"></span>
                                Sending...
                            </>
                        ) : (
                            'Send Verification Code'
                        )}
                    </button>
                </div>
            ) : (
                <div className="otp-step">
                    <div className="otp-header">
                        <span className="otp-icon">🔐</span>
                        <h3>Enter Verification Code</h3>
                        <p>
                            We sent a code to <strong>{currentEmail}</strong>
                            <button type="button" className="edit-email-btn" onClick={editEmail}>
                                Edit
                            </button>
                        </p>
                    </div>

                    <div className="otp-inputs" onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOTPChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={error ? 'error' : ''}
                                disabled={loading}
                            />
                        ))}
                    </div>

                    {error && <div className="otp-error">{error}</div>}
                    {success && <div className="otp-success">{success}</div>}

                    <div className="resend-section">
                        {countdown > 0 ? (
                            <span className="countdown">
                                Resend code in {countdown}s
                            </span>
                        ) : (
                            <button
                                type="button"
                                className="resend-btn"
                                onClick={resendOTP}
                                disabled={loading}
                            >
                                Resend Code
                            </button>
                        )}
                    </div>

                    {attempts >= 3 && (
                        <div className="otp-warning">
                            Having trouble? Check your spam folder or try a different email.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
