'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './combo-offer-banner.module.css';

interface ComboOfferBannerProps {
    offerLink?: string;
}

export default function ComboOfferBanner({
    offerLink = '/offers/combo-offer'
}: ComboOfferBannerProps) {
    return (
        <section className={styles.offerSection}>
            <div className={styles.container}>
                <Link href={offerLink} className={styles.bannerLink}>
                    <div className={styles.bannerWrapper}>
                        <Image
                            src="/images/combo-offer-banner-v3.png"
                            alt="EC-Council SOC + CSE Certification Bundle - Includes FREE Laptop Worth ₹50,000"
                            width={1024}
                            height={245}
                            className={styles.bannerImage}
                            priority
                        />
                        <div className={styles.hoverOverlay}>
                            <span className={styles.hoverText}>View Offer Details →</span>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}
