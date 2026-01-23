'use client';

import { useState, useEffect } from 'react';
import './razorpay-checkout.css';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface RazorpayCheckoutProps {
    amount: number; // Amount in INR
    applicationId: string;
    studentName: string;
    email: string;
    phone: string;
    programName: string;
    onSuccess: (payment: PaymentResult) => void;
    onFailure: (error: string) => void;
}

export interface PaymentResult {
    paymentId: string;
    orderId: string;
    amount: number;
    status: string;
}

export default function RazorpayCheckout({
    amount,
    applicationId,
    studentName,
    email,
    phone,
    programName,
    onSuccess,
    onFailure,
}: RazorpayCheckoutProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sdkLoaded, setSdkLoaded] = useState(false);

    // Load Razorpay SDK
    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise<void>((resolve, reject) => {
                if (window.Razorpay) {
                    setSdkLoaded(true);
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                script.onload = () => {
                    setSdkLoaded(true);
                    resolve();
                };
                script.onerror = () => {
                    reject(new Error('Failed to load Razorpay SDK'));
                };
                document.body.appendChild(script);
            });
        };

        loadRazorpayScript().catch((err) => {
            console.error('Razorpay SDK load error:', err);
            setError('Failed to load payment gateway. Please refresh the page.');
        });
    }, []);

    const handlePayment = async () => {
        if (!sdkLoaded) {
            setError('Payment gateway not loaded. Please try again.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Create order on backend
            const orderResponse = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount,
                    applicationId,
                    programName,
                    studentName,
                    email,
                    phone,
                }),
            });

            const orderData = await orderResponse.json();

            if (!orderResponse.ok) {
                throw new Error(orderData.error || 'Failed to create order');
            }

            // Open Razorpay checkout
            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Ehack Academy',
                description: `Admission Fee - ${programName}`,
                order_id: orderData.orderId,
                prefill: {
                    name: studentName,
                    email: email,
                    contact: phone,
                },
                theme: {
                    color: '#ff6b35',
                },
                handler: async function (response: any) {
                    // Verify payment on backend
                    try {
                        const verifyResponse = await fetch('/api/payment/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                applicationId,
                                studentName,
                                email,
                                programName,
                            }),
                        });

                        const verifyData = await verifyResponse.json();

                        if (verifyResponse.ok && verifyData.success) {
                            onSuccess({
                                paymentId: response.razorpay_payment_id,
                                orderId: response.razorpay_order_id,
                                amount: amount,
                                status: 'success',
                            });
                        } else {
                            throw new Error(verifyData.error || 'Payment verification failed');
                        }
                    } catch (err) {
                        console.error('Verification error:', err);
                        onFailure('Payment verification failed. Please contact support.');
                    }
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.on('payment.failed', function (response: any) {
                console.error('Payment failed:', response.error);
                onFailure(response.error.description || 'Payment failed');
            });

            razorpay.open();
        } catch (err) {
            console.error('Payment error:', err);
            setError(err instanceof Error ? err.message : 'Payment failed');
            onFailure(err instanceof Error ? err.message : 'Payment failed');
        } finally {
            setLoading(false);
        }
    };

    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);

    return (
        <div className="razorpay-checkout">
            <div className="payment-summary">
                <div className="payment-amount">
                    <span className="amount-label">Total Amount</span>
                    <span className="amount-value">{formattedAmount}</span>
                </div>
                <div className="payment-details">
                    <div className="detail-row">
                        <span>Program</span>
                        <span>{programName}</span>
                    </div>
                    <div className="detail-row">
                        <span>Application ID</span>
                        <span>{applicationId}</span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="payment-error">
                    <span>⚠️</span> {error}
                </div>
            )}

            <button
                type="button"
                className={`pay-now-btn ${loading ? 'loading' : ''}`}
                onClick={handlePayment}
                disabled={loading || !sdkLoaded}
            >
                {loading ? (
                    <>
                        <span className="btn-spinner"></span>
                        Processing...
                    </>
                ) : (
                    <>
                        <span className="pay-icon">💳</span>
                        Pay {formattedAmount}
                    </>
                )}
            </button>

            <div className="payment-secure">
                <span className="secure-icon">🔒</span>
                <span>Secured by Razorpay</span>
            </div>

            <div className="payment-methods">
                <span>We accept:</span>
                <div className="method-icons">
                    <span title="Credit/Debit Cards">💳</span>
                    <span title="UPI">📱</span>
                    <span title="Net Banking">🏦</span>
                    <span title="Wallets">👝</span>
                </div>
            </div>
        </div>
    );
}
