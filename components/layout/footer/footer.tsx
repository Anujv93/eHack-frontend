import Link from 'next/link';
import './footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo-wrapper">
                            <img src="/ehack-logo.png" alt="eHack Academy" className="footer-logo" />
                        </div>
                        <p className="footer-description">
                            Empowering careers through industry-leading professional training and certifications.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-heading">Courses</h4>
                        <Link href="/courses">Cybersecurity</Link>
                        <Link href="/courses">Digital Marketing</Link>
                        <Link href="/courses">Data Science & AI</Link>
                        <Link href="/courses">IoT & Robotics</Link>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-heading">Company</h4>
                        <Link href="/about">About Us</Link>
                        <Link href="/careers">Careers</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/contact">Contact</Link>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-heading">Support</h4>
                        <Link href="/help">Help Center</Link>
                        <Link href="/terms">Terms of Service</Link>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/faq">FAQ</Link>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 eHack Academy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
