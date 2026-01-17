'use client';

import CertificateLabs from './CertificateLabs';

interface CertificateLabsWrapperProps {
    certificateSlug: string;
    certificateTitle?: string;
}

export function CertificateLabsWrapper({ certificateSlug, certificateTitle }: CertificateLabsWrapperProps) {
    return (
        <CertificateLabs
            certificateSlug={certificateSlug}
            certificateTitle={certificateTitle}
        />
    );
}

export default CertificateLabsWrapper;
