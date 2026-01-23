import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getRazorpayKeyId } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { amount, applicationId, programName, studentName, email, phone } = body;

        // Validate required fields
        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Valid amount is required' },
                { status: 400 }
            );
        }

        if (!applicationId) {
            return NextResponse.json(
                { error: 'Application ID is required' },
                { status: 400 }
            );
        }

        // Convert amount to paise (smallest currency unit)
        const amountInPaise = Math.round(amount * 100);

        // Generate receipt ID
        const receipt = `EHACK_${applicationId}_${Date.now()}`;

        // Create Razorpay order
        const order = await createOrder({
            amount: amountInPaise,
            currency: 'INR',
            receipt,
            notes: {
                applicationId,
                programName: programName || '',
                studentName: studentName || '',
                email: email || '',
                phone: phone || '',
            },
        });

        if (!order) {
            return NextResponse.json(
                { error: 'Failed to create payment order' },
                { status: 500 }
            );
        }

        // Get Razorpay key for frontend
        const keyId = getRazorpayKeyId();

        return NextResponse.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            keyId,
        });
    } catch (error) {
        console.error('Error creating payment order:', error);
        return NextResponse.json(
            { error: 'Failed to create payment order' },
            { status: 500 }
        );
    }
}
