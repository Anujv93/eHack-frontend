'use client';

import { useMemo } from 'react';
import { CertificateLabs } from './CertificateLabs';

interface ProgramLabsWrapperProps {
    certificationCodes: string[]; // Array of certification codes like ['CEH', 'CND', 'CHFI']
    programTitle: string;
    programSlug?: string; // Optional program slug for special handling
}

/**
 * Wrapper component for displaying labs on program pages
 * Aggregates labs from multiple certifications in the program
 */
export function ProgramLabsWrapper({ certificationCodes, programTitle, programSlug }: ProgramLabsWrapperProps) {
    // Map certification codes to slugs for the CertificateLabs component
    const primaryCertSlug = useMemo(() => {
        // Special handling for Masters program - show comprehensive labs
        if (programSlug === 'masters-ethical-hacking' || certificationCodes.length >= 5) {
            return 'masters-comprehensive'; // Special slug for comprehensive labs
        }

        // Priority order for determining which labs to show
        const priorityMap: { [key: string]: string } = {
            'CEH': 'ecc-ceh',
            'CPENT': 'ecc-cpent',
            'CHFI': 'ecc-chfi',
            'CND': 'ecc-cnd',
            'CCISO': 'ecc-cciso',
            'OSCP': 'oscp',
            'CSCU': 'ecc-cscu'
        };

        // Find the first matching certification in priority order
        for (const code of certificationCodes) {
            if (priorityMap[code]) {
                return priorityMap[code];
            }
        }

        // Default to CEH if no match found
        return 'ecc-ceh';
    }, [certificationCodes, programSlug]);

    return (
        <CertificateLabs
            certificateSlug={primaryCertSlug}
            certificateTitle={programTitle}
        />
    );
}
