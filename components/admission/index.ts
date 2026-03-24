// Export all admission components from a single entry point
export { default as DocumentUpload } from './document-upload';
export type { UploadedDocument } from './document-upload';

export { default as EmailOTP } from './email-otp';

export { default as OnboardingAgreement } from './onboarding-agreement';
export type { AgreementSignature } from './onboarding-agreement';

export { default as RazorpayCheckout } from './razorpay-checkout';
export type { PaymentResult } from './razorpay-checkout';
