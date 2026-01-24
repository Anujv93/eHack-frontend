'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import './footer.css';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer className="footer">
            {/* Gradient Top Border */}
            <div className="footer-gradient-border" />

            {/* Newsletter CTA Section */}
            <div className="footer-newsletter-section">
                <div className="footer-container">
                    <div className="newsletter-wrapper">
                        <div className="newsletter-content">
                            <div className="newsletter-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="newsletter-text">
                                <h3>Stay Ahead in Your Career</h3>
                                <p>Get exclusive updates on new courses, certifications, and career opportunities</p>
                            </div>
                        </div>
                        <form className="newsletter-form" onSubmit={handleSubscribe}>
                            <div className="newsletter-input-wrapper">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className={subscribed ? 'subscribed' : ''}>
                                    {subscribed ? (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Subscribed!
                                        </>
                                    ) : (
                                        'Subscribe'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* Brand Section */}
                        <div className="footer-brand">
                            <div className="footer-parent-brand">
                                <span className="parent-brand-text">Driving Global Cybersecurity Excellence as a Strategic Initiative of eHack Group</span>
                                <div className="footer-logo-group">
                                    <Image
                                        src="/images/white-global.png"
                                        alt="eHack Global"
                                        width={200}
                                        height={80}
                                        className="footer-logo-global"
                                    />
                                    <Image
                                        src="/images/white-academy.png"
                                        alt="eHack Academy"
                                        width={210}
                                        height={65}
                                        className="footer-logo"
                                    />
                                </div>
                            </div>
                            <p className="footer-description">
                                Empowering global careers through industry-leading training and certifications in Cybersecurity, Digital Marketing, and Emerging Technologies.
                            </p>

                            {/* Social Links */}
                            <div className="footer-social">
                                <h4 className="footer-social-title">Follow Us</h4>
                                <div className="footer-social-links">
                                    <a href="https://www.facebook.com/people/EHack-Academy/100063778066113/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.instagram.com/ehack_academy?igsh=MXF2ZDIyYWJ5b3FkMQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.linkedin.com/company/ehack-academy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                    <a href="https://youtube.com/@ehackacademyindia?si=HOIJ9Cq0NLClTOZ3" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* eHack Original Programs */}
                        <div className="footer-links-column">
                            <h4 className="footer-heading">
                                eHack Original Programs
                            </h4>
                            <ul className="footer-links-list">
                                <li>
                                    <Link href="/programs/masters-ethical-hacking">
                                        <span className="link-badge">Popular</span>
                                        Masters in Ethical Hacking
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/programs/graduate-cybersecurity">
                                        Graduate Cybersecurity Program
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/programs/digital-marketing-masterprogram">
                                        Digital Marketing Masters
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/programs/robotics-for-all">
                                        Robotics for Everyone
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/kennedy-university">
                                        <span className="link-badge new">New</span>
                                        Kennedy University Programs
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Courses */}
                        <div className="footer-links-column">
                            <h4 className="footer-heading">
                                Courses by Domain
                            </h4>
                            <ul className="footer-links-list">
                                <li><Link href="/categories/cybersecurity">Cybersecurity</Link></li>
                                <li><Link href="/categories/digital-marketing">Digital Marketing</Link></li>
                                <li><Link href="/categories/data-science">Data Science & AI</Link></li>
                                <li><Link href="/categories/robotics-iot">IoT & Robotics</Link></li>
                                <li><Link href="/courses">View All Courses →</Link></li>
                            </ul>
                        </div>

                        {/* Partners & Certifications */}
                        <div className="footer-links-column">
                            <h4 className="footer-heading">
                                Partners & Certifications
                            </h4>
                            <div className="footer-partners-grid">
                                <div className="partner-logo-item">
                                    <Image
                                        src="/images/ec-council-logo.png"
                                        alt="EC-Council"
                                        width={100}
                                        height={40}
                                    />
                                    <span>Official Training Partner</span>
                                </div>
                                <div className="partner-logo-item">
                                    <Image
                                        src="/images/kennedy-university-logo.png"
                                        alt="Kennedy University"
                                        width={100}
                                        height={40}
                                        className="kennedy-logo"
                                    />
                                    <span>Academic Partner</span>
                                </div>
                            </div>
                        </div>

                        {/* Company & Resources */}
                        <div className="footer-links-column">
                            <h4 className="footer-heading">
                                Company
                            </h4>
                            <ul className="footer-links-list">
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/services">Corporate Service</Link></li>
                                <li><Link href="/csr">Corporate Social Responsibility</Link></li>
                                <li>
                                    <Link href="/franchise">
                                        <span className="link-badge new">New</span>
                                        Franchise Opportunity
                                    </Link>
                                </li>
                                <li><Link href="/careers">Careers</Link></li>
                            </ul>
                            <h5 className="footer-subheading">Most Popular Certifications</h5>
                            <ul className="footer-links-list partner-certs">
                                <li><Link href="/certificate/ceh-v13">EC-Council CEH</Link></li>
                                <li><Link href="/certificate/ecc-cnd">EC-Council CND</Link></li>
                                <li><Link href="/certificate/ecc-cpent">EC-Council CPENT</Link></li>
                                <li><Link href="/certificate/ecc-chfi">EC-Council CHFI</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Information Bar */}
                    <div className="footer-contact-bar">
                        <div className="contact-item">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <a href="tel:+919886035330">+91 98860 35330</a>
                        </div>
                        <span className="contact-divider">|</span>
                        <div className="contact-item">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <a href="mailto:info@ehackacademy.com">info@ehackacademy.com</a>
                        </div>
                        <span className="contact-divider">|</span>
                        <div className="contact-item">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.657 16.657L13.414 20.9C13.039 21.2746 12.5306 21.485 12.0005 21.485C11.4704 21.485 10.962 21.2746 10.587 20.9L6.343 16.657C5.22422 15.5382 4.46234 14.1127 4.15369 12.5608C3.84504 11.009 4.00349 9.40052 4.60901 7.93872C5.21452 6.47693 6.2399 5.22735 7.55548 4.34858C8.87107 3.46982 10.4178 3.00067 12 3.00067C13.5822 3.00067 15.1289 3.46982 16.4445 4.34858C17.7601 5.22735 18.7855 6.47693 19.391 7.93872C19.9965 9.40052 20.155 11.009 19.8463 12.5608C19.5377 14.1127 18.7758 15.5382 17.657 16.657Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Bangalore, India</span>
                        </div>
                        <span className="contact-divider">|</span>
                        <div className="contact-item">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Tue - Sun: 9:30 AM - 6:30 PM</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <div className="footer-bottom-content">
                        <div className="footer-bottom-left">
                            <p>© 2026 eHack Academy. All rights reserved.</p>
                            <div className="footer-legal-links">
                                <Link href="/terms">Terms of Service</Link>
                                <span className="separator">•</span>
                                <Link href="/privacy">Privacy Policy</Link>
                                <span className="separator">•</span>
                                <Link href="/terms#refund">Refund Policy</Link>
                            </div>
                        </div>
                        <div className="footer-bottom-right">
                            <div className="footer-trust-badges">
                                <div className="trust-badge">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>4.9★ Rated</span>
                                </div>
                                <div className="trust-badge">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>10,000+ Alumni</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
