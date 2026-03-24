import { NextRequest, NextResponse } from 'next/server';
import { verifyPaymentSignature, getPaymentDetails } from '@/lib/razorpay';
import { sendPaymentReceipt } from '@/lib/sendgrid';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            applicationId,
            studentName,
            email,
            programName,
        } = body;

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json(
                { error: 'Missing payment details' },
                { status: 400 }
            );
        }

        // Verify payment signature
        const isValid = verifyPaymentSignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (!isValid) {
            return NextResponse.json(
                { error: 'Payment verification failed. Invalid signature.' },
                { status: 400 }
            );
        }

        // Get payment details from Razorpay
        const paymentDetails = await getPaymentDetails(razorpay_payment_id);

        if (!paymentDetails) {
            return NextResponse.json(
                { error: 'Failed to fetch payment details' },
                { status: 500 }
            );
        }

        // Payment verified - Update CRM and send receipt
        const paymentData = {
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            amount: paymentDetails.amount / 100, // Convert from paise
            currency: paymentDetails.currency,
            status: paymentDetails.status,
            method: paymentDetails.method,
            email: paymentDetails.email || email,
            contact: paymentDetails.contact,
            createdAt: new Date(paymentDetails.created_at * 1000).toISOString(),
        };

        // TODO: Update Zoho Bigin deal stage to "Payment Completed"
        // This will be implemented when we enhance the Zoho integration

        // Send payment receipt email
        if (email) {
            await sendPaymentReceipt(email, {
                name: studentName || 'Student',
                paymentId: razorpay_payment_id,
                amount: paymentData.amount,
                programName: programName || 'Course Enrollment',
                paymentDate: new Date().toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                }),
                paymentMethod: paymentDetails.method || 'Online',
            });
        }

        console.log('Payment verified and processed:', paymentData);

        return NextResponse.json({
            success: true,
            message: 'Payment verified successfully',
            payment: paymentData,
        });
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: 'Payment verification failed' },
            { status: 500 }
        );
    }
}
