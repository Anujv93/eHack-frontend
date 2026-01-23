import { NextRequest, NextResponse } from 'next/server';
import { sendOTPEmail } from '@/lib/sendgrid';
import { storeOTP, isRateLimited } from '@/lib/otp-store';

// OTP configuration
const OTP_EXPIRY_MINUTES = 10;

/**
 * Generate a 6-digit OTP
 */
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name } = body;

        // Validate email
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Valid email address is required' },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase();

        // Rate limiting - check if user requested OTP recently
        if (isRateLimited(normalizedEmail, 60000)) {
            return NextResponse.json(
                { error: 'Please wait 60 seconds before requesting another OTP' },
                { status: 429 }
            );
        }

        // Generate OTP
        const otp = generateOTP();

        // Store OTP in SQLite
        storeOTP(normalizedEmail, otp, OTP_EXPIRY_MINUTES);

        // Send OTP via email
        const emailSent = await sendOTPEmail(email, otp, name);

        if (!emailSent) {
            return NextResponse.json(
                { error: 'Failed to send OTP email. Please try again.' },
                { status: 500 }
            );
        }

        console.log(`OTP sent to ${email}`); // Don't log OTP in production

        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully',
            expiresIn: OTP_EXPIRY_MINUTES * 60, // seconds
        });
    } catch (error) {
        console.error('Error in send-otp API:', error);
        return NextResponse.json(
            { error: 'Failed to send OTP' },
            { status: 500 }
        );
    }
}
