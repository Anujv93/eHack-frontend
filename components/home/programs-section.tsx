'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './programs-section.module.css';

interface Partner {
    id: number;
    name: string;
    slug: string;
    logoUrl?: string;
    courseCount: number;
}

interface Course {
    id: number;
    slug: string;
    title: string;
    duration?: string;
    partnerSlug?: string;
}

interface ProgramsSectionProps {
    partners: Partner[];
    courses: Course[];
}

export default function ProgramsSection({ partners, courses }: ProgramsSectionProps) {
    const [activePartner, setActivePartner] = useState<string | null>(
        partners.length > 0 ? partners[0].slug : null
    );

    const filteredCourses = activePartner
        ? courses.filter(c => c.partnerSlug === activePartner)
        : courses.slice(0, 6);

    const activePartnerData = partners.find(p => p.slug === activePartner);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Our Programs</h2>
                    <p className={styles.subtitle}>
                        Explore certifications from world-renowned partners
                    </p>
                </div>

                <div className={styles.content}>
                    {/* Left Side: Partners */}
                    <div className={styles.partnersColumn}>
                        <h4 className={styles.columnHeading}>Certification Partners</h4>
                        <div className={styles.partnersList}>
                            {partners.map((partner) => (
                                <button
                                    key={partner.id}
                                    className={`${styles.partnerCard} ${activePartner === partner.slug ? styles.partnerCardActive : ''}`}
                                    onClick={() => setActivePartner(partner.slug)}
                                >
                                    {partner.logoUrl ? (
                                        <img
                                            src={partner.logoUrl}
                                            alt={partner.name}
                                            className={styles.partnerLogo}
                                        />
                                    ) : (
                                        <span className={styles.partnerLogoPlaceholder}>{partner.name[0]}</span>
                                    )}
                                    <div className={styles.partnerInfo}>
                                        <span className={styles.partnerName}>{partner.name}</span>
                                        <span className={styles.partnerCount}>{partner.courseCount} Courses</span>
                                    </div>
                                    <span className={styles.partnerArrow}>→</span>
                                </button>
                            ))}
                        </div>
                        <Link href="/courses" className={styles.viewAllBtn}>
                            View All Courses →
                        </Link>
                    </div>

                    {/* Right Side: Courses */}
                    <div className={styles.coursesColumn}>
                        <h4 className={styles.columnHeading}>
                            {activePartnerData ? `${activePartnerData.name} Courses` : 'Featured Courses'}
                        </h4>
                        <div className={styles.coursesList}>
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <Link
                                        key={course.id}
                                        href={`/certificate/${course.slug}`}
                                        className={styles.courseItem}
                                    >
                                        <span className={styles.courseName}>{course.title}</span>
                                        {course.duration && (
                                            <span className={styles.courseDuration}>{course.duration}</span>
                                        )}
                                    </Link>
                                ))
                            ) : (
                                <p className={styles.noCourses}>No courses available for this partner yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
