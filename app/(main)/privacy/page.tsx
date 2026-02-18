import type { Metadata } from 'next';
import './page.css';

export const metadata: Metadata = {
    title: 'Privacy Policy | eHack Academy',
    description: 'Read our privacy policy to understand how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
    return (
        <main className="privacy-page">
            <div className="privacy-container">
                <header className="privacy-header">
                    <h1 className="privacy-title">Privacy Policy</h1>
                    <p className="effective-date">Effective Date: __________</p>
                </header>

                <div className="privacy-content">
                    <section className="privacy-section">
                        <p className="privacy-text">
                            At eHack Academy, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains what information we collect and how we use it when you interact with our website.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">1. Information We Collect</h2>
                        <p className="privacy-text">We collect only the following personal information through our website forms:</p>
                        <ul className="privacy-list">
                            <li>Full Name</li>
                            <li>Email Address</li>
                            <li>Phone Number</li>
                        </ul>
                        <p className="privacy-text">This information is collected solely for counselling, enquiries, and enrollment purposes. We do not collect sensitive or financial data through the website.</p>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">2. Purpose of Collection</h2>
                        <p className="privacy-text">The information collected is used only to:</p>
                        <ul className="privacy-list">
                            <li>Respond to counselling and course enquiries</li>
                            <li>Provide course and enrollment information</li>
                            <li>Communicate important updates related to programs</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">3. Information Sharing</h2>
                        <p className="privacy-text">
                            We do not sell, rent, or trade your personal information. Information may be shared only with authorized internal staff or legal authorities if required by law.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">4. Data Security</h2>
                        <p className="privacy-text">
                            Reasonable technical and administrative measures are taken to protect your information. However, no internet transmission is completely secure.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">5. Data Retention</h2>
                        <p className="privacy-text">
                            Information is retained only as long as necessary for counselling, enrollment, or legal requirements.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">6. Cookies</h2>
                        <p className="privacy-text">
                            Our website may use basic cookies for functionality and analytics. Cookies do not collect personal identification information.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">7. Your Rights</h2>
                        <p className="privacy-text">
                            You may request access, correction, or deletion of your personal information by contacting us.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">8. Policy Updates</h2>
                        <p className="privacy-text">
                            This Privacy Policy may be updated periodically. Changes will be posted on the website with a revised effective date.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">9. Contact Information</h2>
                        <p className="privacy-text">eHack Academy</p>
                        <p className="privacy-text">
                            <strong>Email:</strong> sanjeevgupta7512@gmail.com<br />
                            <strong>Phone:</strong> +91-98860-35330<br />
                            <strong>Address:</strong> No. 202, I Floor, New BEL Road, Opposite HP Petrol Pump, Bangalore - 560094, India
                        </p>
                    </section>
                </div>

                <div className="last-updated">
                    <p>© {new Date().getFullYear()} eHack Academy. All rights reserved.</p>
                </div>
            </div>
        </main>
    );
}
