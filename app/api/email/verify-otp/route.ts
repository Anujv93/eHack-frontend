import { NextRequest, NextResponse } from 'next/server';
import { getOTP, incrementAttempts, deleteOTP } from '@/lib/otp-store';

const MAX_VERIFY_ATTEMPTS = 5;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, otp } = body;

        // Validate inputs
        if (!email || !otp) {
            return NextResponse.json(
                { error: 'Email and OTP are required' },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase();

        // Get stored OTP from SQLite
        const storedData = getOTP(normalizedEmail);

        // Check if OTP exists
        if (!storedData) {
            return NextResponse.json(
                { error: 'No OTP found for this email. Please request a new OTP.' },
                { status: 400 }
            );
        }

        // Check if OTP is expired
        if (Date.now() > storedData.expiresAt) {
            deleteOTP(normalizedEmail);
            return NextResponse.json(
                { error: 'OTP has expired. Please request a new OTP.' },
                { status: 400 }
            );
        }

        // Check max attempts
        if (storedData.attempts >= MAX_VERIFY_ATTEMPTS) {
            deleteOTP(normalizedEmail);
            return NextResponse.json(
                { error: 'Too many failed attempts. Please request a new OTP.' },
                { status: 400 }
            );
        }

        // Verify OTP
        if (storedData.otp !== otp.toString()) {
            const newAttempts = incrementAttempts(normalizedEmail);
            const remainingAttempts = MAX_VERIFY_ATTEMPTS - newAttempts;

            return NextResponse.json(
                {
                    error: `Invalid OTP. ${remainingAttempts} attempts remaining.`,
                    remainingAttempts,
                },
                { status: 400 }
            );
        }

        // OTP is valid - delete it (one-time use)
        deleteOTP(normalizedEmail);

        // Generate a verification token (for session management)
        const verificationToken = Buffer.from(
            JSON.stringify({
                email: normalizedEmail,
                verifiedAt: Date.now(),
                expiresAt: Date.now() + 30 * 60 * 1000, // 30 minutes
            })
        ).toString('base64');

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully',
            verificationToken,
        });
    } catch (error) {
        console.error('Error in verify-otp API:', error);
        return NextResponse.json(
            { error: 'Verification failed' },
            { status: 500 }
        );
    }
}
