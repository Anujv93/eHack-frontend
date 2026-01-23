/**
 * SendGrid Email Integration
 * 
 * Handles all email communications including OTP verification,
 * enrollment confirmation, and payment receipts.
 */

import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'admissions@ehack.in';
const FROM_NAME = 'Ehack Academy';

if (SENDGRID_API_KEY) {
    sgMail.setApiKey(SENDGRID_API_KEY);
}

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

/**
 * Send an email via SendGrid
 */
async function sendEmail(options: EmailOptions): Promise<boolean> {
    if (!SENDGRID_API_KEY) {
        console.error('SendGrid API key not configured');
        return false;
    }

    try {
        await sgMail.send({
            to: options.to,
            from: {
                email: FROM_EMAIL,
                name: FROM_NAME,
            },
            subject: options.subject,
            html: options.html,
            text: options.text || options.html.replace(/<[^>]*>/g, ''),
        });
        console.log(`Email sent successfully to ${options.to}`);
        return true;
    } catch (error) {
        console.error('SendGrid email error:', error);
        return false;
    }
}

/**
 * Send OTP verification email
 */
export async function sendOTPEmail(email: string, otp: string, name?: string): Promise<boolean> {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ff6b35; margin: 0; font-size: 28px;">🔐 Email Verification</h1>
            <p style="color: #ffffff; margin: 10px 0 0; opacity: 0.9;">Ehack Academy Admission</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
                Hi${name ? ` <strong>${name}</strong>` : ''},
            </p>
            <p style="color: #555; font-size: 15px; line-height: 1.6;">
                Thank you for starting your admission application at Ehack Academy. 
                Please use the following OTP to verify your email address:
            </p>
            
            <!-- OTP Box -->
            <div style="background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%); padding: 25px; border-radius: 12px; text-align: center; margin: 30px 0;">
                <p style="color: #fff; margin: 0 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Your Verification Code</p>
                <p style="color: #fff; margin: 0; font-size: 36px; font-weight: bold; letter-spacing: 8px;">${otp}</p>
            </div>
            
            <p style="color: #888; font-size: 13px; text-align: center;">
                ⏰ This code expires in <strong>10 minutes</strong>
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #888; font-size: 13px;">
                If you didn't request this verification, please ignore this email.
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #1a1a2e; padding: 20px; text-align: center;">
            <p style="color: #888; margin: 0; font-size: 12px;">
                © ${new Date().getFullYear()} Ehack Academy. All rights reserved.
            </p>
            <p style="color: #666; margin: 10px 0 0; font-size: 11px;">
                Bangalore, India | admissions@ehack.in
            </p>
        </div>
    </div>
</body>
</html>
    `;

    return sendEmail({
        to: email,
        subject: `${otp} - Your Ehack Academy Verification Code`,
        html,
    });
}

/**
 * Send enrollment confirmation email
 */
export async function sendEnrollmentConfirmation(
    email: string,
    data: {
        name: string;
        enrollmentId: string;
        applicationId: string;
        programName: string;
        learningMode: string;
        batchTiming: string;
        startDate?: string;
    }
): Promise<boolean> {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
            <h1 style="color: #4CAF50; margin: 0; font-size: 28px;">🎉 Enrollment Confirmed!</h1>
            <p style="color: #ffffff; margin: 10px 0 0; opacity: 0.9;">Welcome to Ehack Academy</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <p style="color: #333; font-size: 18px; margin-bottom: 20px;">
                Congratulations, <strong>${data.name}</strong>! 🎓
            </p>
            <p style="color: #555; font-size: 15px; line-height: 1.6;">
                Your enrollment at Ehack Academy has been successfully processed. 
                Here are your enrollment details:
            </p>
            
            <!-- Details Card -->
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #ff6b35;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px;">Enrollment ID</td>
                        <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 14px;">${data.enrollmentId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px;">Application ID</td>
                        <td style="padding: 8px 0; color: #333; font-size: 14px;">${data.applicationId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px;">Program</td>
                        <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 14px;">${data.programName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px;">Learning Mode</td>
                        <td style="padding: 8px 0; color: #333; font-size: 14px;">${data.learningMode}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px;">Batch</td>
                        <td style="padding: 8px 0; color: #333; font-size: 14px;">${data.batchTiming}</td>
                    </tr>
                    ${data.startDate ? `
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px;">Start Date</td>
                        <td style="padding: 8px 0; color: #4CAF50; font-weight: bold; font-size: 14px;">${data.startDate}</td>
                    </tr>
                    ` : ''}
                </table>
            </div>
            
            <!-- Next Steps -->
            <div style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); padding: 20px; border-radius: 8px; margin-top: 25px;">
                <h3 style="color: #2e7d32; margin: 0 0 15px; font-size: 16px;">📋 Next Steps</h3>
                <ol style="color: #555; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li>Join our student WhatsApp group (link will be shared)</li>
                    <li>Access your course materials on the learning portal</li>
                    <li>Attend the orientation session on the start date</li>
                </ol>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #666; font-size: 14px; text-align: center;">
                Questions? Contact us at <a href="mailto:admissions@ehack.in" style="color: #ff6b35;">admissions@ehack.in</a>
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #1a1a2e; padding: 20px; text-align: center;">
            <p style="color: #888; margin: 0; font-size: 12px;">
                © ${new Date().getFullYear()} Ehack Academy. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
    `;

    return sendEmail({
        to: email,
        subject: `Welcome to Ehack Academy! Your Enrollment is Confirmed - ${data.enrollmentId}`,
        html,
    });
}

/**
 * Send payment receipt email
 */
export async function sendPaymentReceipt(
    email: string,
    data: {
        name: string;
        paymentId: string;
        amount: number;
        programName: string;
        paymentDate: string;
        paymentMethod: string;
    }
): Promise<boolean> {
    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(data.amount);

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
            <h1 style="color: #4CAF50; margin: 0; font-size: 28px;">✅ Payment Received</h1>
            <p style="color: #ffffff; margin: 10px 0 0; opacity: 0.9;">Thank you for your payment</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
                Dear <strong>${data.name}</strong>,
            </p>
            <p style="color: #555; font-size: 15px; line-height: 1.6;">
                We have received your payment successfully. Here are your payment details:
            </p>
            
            <!-- Payment Receipt Card -->
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #e0e0e0;">
                <div style="text-align: center; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px dashed #ccc;">
                    <p style="color: #666; margin: 0 0 5px; font-size: 12px; text-transform: uppercase;">Amount Paid</p>
                    <p style="color: #4CAF50; margin: 0; font-size: 32px; font-weight: bold;">${formattedAmount}</p>
                </div>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; color: #666; font-size: 14px;">Payment ID</td>
                        <td style="padding: 10px 0; color: #333; font-size: 14px; text-align: right;">${data.paymentId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #666; font-size: 14px;">Program</td>
                        <td style="padding: 10px 0; color: #333; font-size: 14px; text-align: right;">${data.programName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #666; font-size: 14px;">Payment Date</td>
                        <td style="padding: 10px 0; color: #333; font-size: 14px; text-align: right;">${data.paymentDate}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #666; font-size: 14px;">Payment Method</td>
                        <td style="padding: 10px 0; color: #333; font-size: 14px; text-align: right;">${data.paymentMethod}</td>
                    </tr>
                </table>
            </div>
            
            <p style="color: #888; font-size: 13px; text-align: center;">
                📧 This receipt has been sent to your registered email address.
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #666; font-size: 14px; text-align: center;">
                For any queries, contact us at <a href="mailto:accounts@ehack.in" style="color: #ff6b35;">accounts@ehack.in</a>
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #1a1a2e; padding: 20px; text-align: center;">
            <p style="color: #888; margin: 0; font-size: 12px;">
                © ${new Date().getFullYear()} Ehack Academy. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
    `;

    return sendEmail({
        to: email,
        subject: `Payment Receipt - ${formattedAmount} | Ehack Academy`,
        html,
    });
}
