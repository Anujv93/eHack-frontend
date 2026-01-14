'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Gift, ArrowRight } from 'lucide-react';
import styles from './offer-announcement-bar.module.css';

interface OfferAnnouncementBarProps {
    offerLink?: string;
    dismissible?: boolean;
}

export default function OfferAnnouncementBar({
    offerLink = '/offers/combo-offer',
    dismissible = true
}: OfferAnnouncementBarProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Check if user has dismissed the banner before
        const dismissed = sessionStorage.getItem('offer-bar-dismissed');
        if (dismissed === 'true') {
            setIsVisible(false);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('offer-bar-dismissed', 'true');
    };

    if (!isMounted || !isVisible) return null;

    return (
        <div className={styles.announcementBar}>
            <div className={styles.shimmerOverlay}></div>
            <div className={styles.content}>
                <span className={styles.iconWrapper}>
                    <Gift className={styles.icon} size={18} />
                </span>
                <span className={styles.text}>
                    <span className={styles.highlight}>LIMITED OFFER:</span>
                    {' '}Get a FREE Laptop worth ₹50,000 with SOC + CSE Combo!
                </span>
                <Link href={offerLink} className={styles.ctaLink}>
                    Claim Now
                    <ArrowRight size={14} className={styles.arrowIcon} />
                </Link>
            </div>
            {dismissible && (
                <button
                    className={styles.closeBtn}
                    onClick={handleDismiss}
                    aria-label="Dismiss offer"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}
