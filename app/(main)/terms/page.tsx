import type { Metadata } from 'next';
import './page.css';

export const metadata: Metadata = {
    title: 'Terms of Service | eHack Academy',
    description: 'Read our terms and conditions, cancellation, and refund policies.',
};

export default function TermsPage() {
    return (
        <main className="terms-page">
            <div className="terms-container">
                <header className="terms-header">
                    <h1 className="terms-title">Disclaimer | Terms & Conditions</h1>
                </header>

                <div className="terms-content">
                    <section className="terms-section">
                        <h2 className="section-title">Program Cancellation Policy</h2>
                        <p className="terms-text">
                            Training programs are subject to a minimum number of participants. If a training program does not meet this criteria, then eHack Academy is entitled to cancel it at its discretion, without liability.
                        </p>
                        <div className="terms-highlight">
                            In such instances, the eHack Academy team can offer the participants alternative options or a refund as applicable.
                        </div>
                    </section>

                    <section className="terms-section" id="refund">
                        <h2 className="section-title">Cancellation and Refund Policy</h2>
                        <p className="terms-text">
                            A full refund less an administration fee of <strong>INR 10,000/-</strong> will be given for cancellation requests received up to <strong>5 working days</strong> before the training.
                        </p>
                        <p className="terms-text">
                            Cancellations must be made via emails only, before the 5 working days deadline.
                        </p>
                        <p className="terms-text">
                            However, if you wish to attend a subsequent scheduling of the course, and you have paid your course fee in full, the same could be done subject to availability of the seats in the subsequent batches. Replacement participants are always welcome.
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
