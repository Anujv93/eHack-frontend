/**
 * Razorpay Payment Gateway Integration
 * 
 * Handles payment order creation, verification, and subscription management.
 */

import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay instance
const razorpayKeyId = process.env.RAZORPAY_KEY_ID || '';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || '';

let razorpay: Razorpay | null = null;

if (razorpayKeyId && razorpayKeySecret) {
    razorpay = new Razorpay({
        key_id: razorpayKeyId,
        key_secret: razorpayKeySecret,
    });
}

// Get the key ID for frontend use
export function getRazorpayKeyId(): string {
    return razorpayKeyId;
}

export interface OrderOptions {
    amount: number; // Amount in paise (smallest currency unit)
    currency?: string;
    receipt: string;
    notes?: Record<string, string>;
}

export interface RazorpayOrder {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
    created_at: number;
}

/**
 * Create a Razorpay order
 */
export async function createOrder(options: OrderOptions): Promise<RazorpayOrder | null> {
    if (!razorpay) {
        console.error('Razorpay not initialized. Check API credentials.');
        return null;
    }

    try {
        const order = await razorpay.orders.create({
            amount: options.amount,
            currency: options.currency || 'INR',
            receipt: options.receipt,
            notes: options.notes || {},
        });

        console.log('Razorpay order created:', order.id);
        return order as RazorpayOrder;
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return null;
    }
}

/**
 * Verify Razorpay payment signature
 */
export function verifyPaymentSignature(
    orderId: string,
    paymentId: string,
    signature: string
): boolean {
    if (!razorpayKeySecret) {
        console.error('Razorpay key secret not configured');
        return false;
    }

    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
        .createHmac('sha256', razorpayKeySecret)
        .update(body)
        .digest('hex');

    const isValid = expectedSignature === signature;

    if (isValid) {
        console.log('Payment signature verified for:', paymentId);
    } else {
        console.error('Payment signature verification failed for:', paymentId);
    }

    return isValid;
}

/**
 * Fetch payment details
 */
export async function getPaymentDetails(paymentId: string): Promise<any | null> {
    if (!razorpay) {
        console.error('Razorpay not initialized');
        return null;
    }

    try {
        const payment = await razorpay.payments.fetch(paymentId);
        return payment;
    } catch (error) {
        console.error('Error fetching payment details:', error);
        return null;
    }
}

// ============================================
// Subscription (EMI) Management
// ============================================

export interface SubscriptionPlanOptions {
    period: 'monthly' | 'weekly' | 'daily';
    interval: number;
    item: {
        name: string;
        amount: number; // Amount per installment in paise
        currency?: string;
        description?: string;
    };
    notes?: Record<string, string>;
}

export interface SubscriptionOptions {
    planId: string;
    totalCount: number; // Number of installments
    customerNotify?: boolean;
    notes?: Record<string, string>;
}

/**
 * Create a subscription plan for EMI
 */
export async function createSubscriptionPlan(options: SubscriptionPlanOptions): Promise<any | null> {
    if (!razorpay) {
        console.error('Razorpay not initialized');
        return null;
    }

    try {
        const plan = await razorpay.plans.create({
            period: options.period,
            interval: options.interval,
            item: {
                name: options.item.name,
                amount: options.item.amount,
                currency: options.item.currency || 'INR',
                description: options.item.description || '',
            },
            notes: options.notes || {},
        });

        console.log('Subscription plan created:', plan.id);
        return plan;
    } catch (error) {
        console.error('Error creating subscription plan:', error);
        return null;
    }
}

/**
 * Create a subscription for a customer
 */
export async function createSubscription(options: SubscriptionOptions): Promise<any | null> {
    if (!razorpay) {
        console.error('Razorpay not initialized');
        return null;
    }

    try {
        const subscription = await razorpay.subscriptions.create({
            plan_id: options.planId,
            total_count: options.totalCount,
            customer_notify: options.customerNotify ? 1 : 0,
            notes: options.notes || {},
        });

        console.log('Subscription created:', subscription.id);
        return subscription;
    } catch (error) {
        console.error('Error creating subscription:', error);
        return null;
    }
}

/**
 * Calculate EMI breakdown
 */
export function calculateEMI(
    totalAmount: number,
    months: number,
    interestRate: number = 0 // 0 for no-cost EMI
): {
    emiAmount: number;
    totalPayable: number;
    interestAmount: number;
    monthlyBreakdown: { month: number; amount: number; remainingPrincipal: number }[];
} {
    const monthlyInterestRate = interestRate / 12 / 100;

    let emiAmount: number;
    let totalPayable: number;
    let interestAmount: number;

    if (interestRate === 0) {
        // No-cost EMI
        emiAmount = Math.ceil(totalAmount / months);
        totalPayable = totalAmount;
        interestAmount = 0;
    } else {
        // Standard EMI calculation
        emiAmount = Math.ceil(
            (totalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
            (Math.pow(1 + monthlyInterestRate, months) - 1)
        );
        totalPayable = emiAmount * months;
        interestAmount = totalPayable - totalAmount;
    }

    // Generate monthly breakdown
    const monthlyBreakdown = [];
    let remainingPrincipal = totalAmount;

    for (let i = 1; i <= months; i++) {
        const principalPortion = Math.min(emiAmount, remainingPrincipal);
        remainingPrincipal -= principalPortion;

        monthlyBreakdown.push({
            month: i,
            amount: emiAmount,
            remainingPrincipal: Math.max(0, remainingPrincipal),
        });
    }

    return {
        emiAmount,
        totalPayable,
        interestAmount,
        monthlyBreakdown,
    };
}
