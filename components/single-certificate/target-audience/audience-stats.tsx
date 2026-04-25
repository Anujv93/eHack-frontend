'use client';

import React from 'react';
import { useInternationalPricing } from '@/hooks/useInternationalPricing';

export function AudienceStats() {
    const { isInternational } = useInternationalPricing();

    return (
        <div className="audience-stats-row">
            <div className="audience-stat-item">
                <span className="stat-number">85%</span>
                <span className="stat-text">of our students are fresh graduates or career changers</span>
            </div>
            <div className="audience-stat-divider"></div>
            <div className="audience-stat-item">
                <span className="stat-number">Zero</span>
                <span className="stat-text">prior experience required to get started</span>
            </div>
            <div className="audience-stat-divider"></div>
            <div className="audience-stat-item">
                <span className="stat-number">{isInternational ? "$6k-15k" : "₹6-8 LPA"}</span>
                <span className="stat-text">
                    average starting salary for freshers
                    {isInternational ? " (per year)" : ""}
                </span>
            </div>
        </div>
    );
}
