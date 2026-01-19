import './page.css';
import Link from 'next/link';

export const metadata = {
    title: 'Free Laptop Offer | eHack Academy',
    description: 'Get a FREE laptop worth ₹50,000 when you enroll in Masters or Graduate Program with CSA & CCSE Bundle. Transform your cybersecurity career today.',
};

export default function LaptopOfferPage() {
    return (
        <main>
            {/* Hero Section */}
            <section className="offer-hero">
                <div className="offer-hero-container">
                    <span className="offer-hero-badge">Limited Time Offer</span>
                    <h1>
                        Transform Your Career in Cybersecurity<br />
                        <span>+ Get a Free Laptop</span>
                    </h1>
                    <p className="offer-hero-subtitle">
                        Enroll in our Masters or Graduate Program with the Certified SOC Analyst (CSA) & Certified Cloud Security Engineer (CCSE) Bundle
                        and receive a high-performance laptop worth ₹50,000 absolutely FREE.
                    </p>
                </div>
            </section>

            {/* Choose Your Program */}
            <section className="offer-section">
                <h2 className="offer-section-title">
                    Choose Your Path to Success + <span className="title-highlight">Get a Free Laptop</span>
                </h2>
                <p className="offer-section-subtitle">
                    Two powerful programs designed to launch your cybersecurity career — both eligible for a <strong>FREE Laptop worth ₹50,000</strong>
                </p>

                <div className="program-cards">
                    {/* Graduate Program */}
                    <div className="program-card graduate-highlight">
                        <h3>Graduate Program</h3>
                        <div className="program-card-price">
                            <span>₹2,45,000</span> ₹1,50,000
                        </div>
                        <p className="program-card-certs">
                            <strong>2 EC-Council Certifications:</strong><br />
                            CSCU + CND
                        </p>
                        <p className="program-card-best">
                            <strong>Best for:</strong> Beginners looking to enter the cybersecurity field with foundational skills and credentials.
                        </p>
                    </div>

                    {/* Masters Program */}
                    <div className="program-card featured">
                        <span className="program-card-badge">Most Popular</span>
                        <h3>Masters Program</h3>
                        <div className="program-card-price">
                            <span>₹5,00,000</span> ₹3,50,000
                        </div>
                        <p className="program-card-certs">
                            <strong>6 EC-Council Certifications:</strong><br />
                            CSCU + CND + CEH + CHFI + CPENT + LPT
                        </p>
                        <p className="program-card-best">
                            <strong>Best for:</strong> Professionals aiming for advanced cybersecurity roles like Penetration Tester, Security Analyst, or Security Consultant.
                        </p>
                    </div>
                </div>

                {/* Bundle Upsell - Free Laptop Unlock */}
                <div className="bundle-upsell">
                    <div className="bundle-upsell-glow"></div>
                    <div className="bundle-upsell-content">
                        <span className="bundle-upsell-badge">🎁 Unlock Your Free Laptop</span>
                        <h3 className="bundle-upsell-title">
                            Add the <span>CSA + CCSE Bundle</span> to Your Program — Walk Away With a FREE Laptop!
                        </h3>
                        <p className="bundle-upsell-condition">
                            <strong>💡 How it works:</strong> Add this bundle to your <em>Graduate</em> or <em>Masters</em> program above, and the FREE laptop is yours!
                        </p>
                        <p className="bundle-upsell-desc">
                            Here's the deal: Invest just <strong>₹1,15,000</strong> in our CSA & CCSE bundle — and we'll hand you a <strong>brand new laptop worth ₹50,000</strong>. That's not a discount.
                            That's getting <em>almost half your investment back</em> as a high-performance machine to power your career.
                        </p>

                        <div className="bundle-upsell-value">
                            <h4 className="bundle-calc-title">See Your Total Investment</h4>

                            <div className="bundle-calc-grid">
                                {/* Graduate Path */}
                                <div className="bundle-calc-card">
                                    <span className="bundle-calc-label">Graduate + Bundle</span>
                                    <div className="bundle-calc-breakdown">
                                        <div className="calc-row">
                                            <span>Graduate Program</span>
                                            <span>₹1,45,000</span>
                                        </div>
                                        <div className="calc-row">
                                            <span>CSA + CCSE Bundle</span>
                                            <span>₹1,15,000</span>
                                        </div>
                                        <div className="calc-row total">
                                            <span>Total</span>
                                            <span>₹2,65,000</span>
                                        </div>
                                        <div className="calc-row free-laptop">
                                            <span>🎁 FREE Laptop</span>
                                            <span className="free-value">₹50,000</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Masters Path */}
                                <div className="bundle-calc-card featured">
                                    <span className="bundle-calc-badge">Best Value</span>
                                    <span className="bundle-calc-label">Masters + Bundle</span>
                                    <div className="bundle-calc-breakdown">
                                        <div className="calc-row">
                                            <span>Masters Program</span>
                                            <span>₹3,50,000</span>
                                        </div>
                                        <div className="calc-row">
                                            <span>CSA + CCSE Bundle</span>
                                            <span>₹1,15,000</span>
                                        </div>
                                        <div className="calc-row total">
                                            <span>Total</span>
                                            <span>₹4,65,000</span>
                                        </div>
                                        <div className="calc-row free-laptop">
                                            <span>🎁 FREE Laptop</span>
                                            <span className="free-value">₹50,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="bundle-upsell-net">
                                <strong>✨ The laptop is yours FREE</strong> — You're essentially getting ₹50,000 worth of value at no extra cost!
                            </p>
                        </div>

                        <div className="bundle-upsell-certs">
                            <div className="bundle-cert">
                                <span className="bundle-cert-name">SOC Analyst (CSA)</span>
                                <span className="bundle-cert-desc">Master threat detection, SIEM tools, and incident response</span>
                            </div>
                            <div className="bundle-cert">
                                <span className="bundle-cert-name">Certified Security Engineer (CCSE)</span>
                                <span className="bundle-cert-desc">Build and secure enterprise-grade security infrastructure</span>
                            </div>
                        </div>

                        <p className="bundle-upsell-cta-text">
                            ✅ <strong>Remember:</strong> The FREE laptop offer is only valid when you add this bundle to the Graduate or Masters program.
                            Choose your program above + add this bundle = FREE laptop delivered to you!
                        </p>
                    </div>
                </div>
            </section>

            {/* Certification Value Breakdown - New Design */}
            <section className="offer-section certification-breakdown">
                <h2 className="offer-section-title">
                    Program Certification <span className="title-highlight">Comparison</span>
                </h2>
                <p className="offer-section-subtitle">
                    Understand exactly what certifications you'll earn with each program
                </p>

                {/* Legend */}
                <div className="cert-legend">
                    <div className="legend-item">
                        <span className="legend-badge ec-council">EC-Council</span>
                        <span className="legend-text">Globally Recognized Certification</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-badge ehack">eHack Academy</span>
                        <span className="legend-text">Industry-Relevant Training</span>
                    </div>
                </div>

                {/* Side by Side Program Comparison */}
                <div className="program-comparison-grid">
                    {/* Graduate Program */}
                    <div className="program-comparison-card">
                        <div className="program-comparison-header">
                            <h3>Graduate Program</h3>
                            <div className="program-price-badge">
                                <span className="original-price">₹2,45,000</span>
                                <span className="offer-price">₹1,50,000</span>
                            </div>
                        </div>

                        {/* EC-Council Certifications */}
                        <div className="cert-category">
                            <div className="cert-category-header">
                                <span className="category-badge ec-council">EC-Council Global Certifications</span>
                                <span className="cert-count">2 Certifications</span>
                            </div>
                            <div className="cert-list">
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">CSCU</span>
                                        <span className="cert-full">Certified Secure Computer User</span>
                                    </div>
                                    <span className="cert-price">₹25,000</span>
                                </div>
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">CND</span>
                                        <span className="cert-full">Certified Network Defender</span>
                                    </div>
                                    <span className="cert-price">₹75,000</span>
                                </div>
                            </div>
                        </div>

                        {/* eHack Certifications */}
                        <div className="cert-category">
                            <div className="cert-category-header">
                                <span className="category-badge ehack">eHack Academy Certifications</span>
                                <span className="cert-count">2 Courses</span>
                            </div>
                            <div className="cert-list">
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">IT Fundamentals</span>
                                        <span className="cert-full">Foundation in IT & Security Basics</span>
                                    </div>
                                    <span className="cert-price">₹40,000</span>
                                </div>
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">OWASP Top 10</span>
                                        <span className="cert-full">Web Application Security</span>
                                    </div>
                                    <span className="cert-price">₹40,000</span>
                                </div>
                            </div>
                        </div>

                        {/* Total Value */}
                        <div className="program-total">
                            <div className="total-value-row">
                                <span>Total Certification Value</span>
                                <span className="value">₹1,80,000</span>
                            </div>
                            <div className="total-value-row highlight">
                                <span>You Pay</span>
                                <span className="value">₹1,50,000</span>
                            </div>
                            <Link href="/programs/graduate-cybersecurity" className="program-details-link">
                                View Program Details →
                            </Link>
                        </div>
                    </div>

                    {/* Masters Program */}
                    <div className="program-comparison-card featured">
                        <span className="featured-badge">Most Popular</span>
                        <div className="program-comparison-header">
                            <h3>Masters Program</h3>
                            <div className="program-price-badge">
                                <span className="original-price">₹5,00,000</span>
                                <span className="offer-price">₹3,50,000</span>
                            </div>
                        </div>

                        {/* EC-Council Certifications */}
                        <div className="cert-category">
                            <div className="cert-category-header">
                                <span className="category-badge ec-council">EC-Council Global Certifications</span>
                                <span className="cert-count">6 Certifications</span>
                            </div>
                            <div className="cert-list">
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">CSCU</span>
                                        <span className="cert-full">Certified Secure Computer User</span>
                                    </div>
                                    <span className="cert-price">₹25,000</span>
                                </div>
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">CND</span>
                                        <span className="cert-full">Certified Network Defender</span>
                                    </div>
                                    <span className="cert-price">₹75,000</span>
                                </div>
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">CEH</span>
                                        <span className="cert-full">Certified Ethical Hacker</span>
                                    </div>
                                    <span className="cert-price">₹60,000</span>
                                </div>
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">CHFI</span>
                                        <span className="cert-full">Computer Hacking Forensic Investigator</span>
                                    </div>
                                    <span className="cert-price">₹75,000</span>
                                </div>
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">CPENT</span>
                                        <span className="cert-full">Certified Penetration Testing Professional</span>
                                    </div>
                                    <span className="cert-price">₹95,000</span>
                                </div>
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">LPT</span>
                                        <span className="cert-full">Licensed Penetration Tester</span>
                                    </div>
                                    <span className="cert-price">Included</span>
                                </div>
                            </div>
                        </div>

                        {/* eHack Certifications */}
                        <div className="cert-category">
                            <div className="cert-category-header">
                                <span className="category-badge ehack">eHack Academy Certifications</span>
                                <span className="cert-count">4 Courses</span>
                            </div>
                            <div className="cert-list">
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">IT Fundamentals</span>
                                        <span className="cert-full">Foundation in IT & Security Basics</span>
                                    </div>
                                    <span className="cert-price">₹40,000</span>
                                </div>
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">OWASP Top 10</span>
                                        <span className="cert-full">Web Application Security</span>
                                    </div>
                                    <span className="cert-price">₹40,000</span>
                                </div>
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">Soft Skills</span>
                                        <span className="cert-full">Professional Communication & Leadership</span>
                                    </div>
                                    <span className="cert-price">₹25,000</span>
                                </div>
                                <div className="cert-item">
                                    <div className="cert-info">
                                        <span className="cert-name">Internship</span>
                                        <span className="cert-full">Real-World Project Experience</span>
                                    </div>
                                    <span className="cert-price">₹35,000</span>
                                </div>
                            </div>
                        </div>

                        {/* Total Value */}
                        <div className="program-total">
                            <div className="total-value-row">
                                <span>Total Certification Value</span>
                                <span className="value">₹4,70,000</span>
                            </div>
                            <div className="total-value-row highlight">
                                <span>You Pay</span>
                                <span className="value">₹3,50,000</span>
                            </div>
                            <Link href="/programs/masters-ethical-hacking" className="program-details-link">
                                View Program Details →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bundle Add-on Section */}
                <div className="bundle-addon-section">
                    <div className="bundle-addon-header">
                        <span className="addon-badge">🎁 Add Bundle & Get FREE Laptop</span>
                        <h4>CSA & CCSE Bundle — <span>₹1,15,000</span></h4>
                        <p>Add this EC-Council bundle to either program and receive a FREE Laptop worth ₹50,000!</p>
                    </div>

                    <div className="bundle-addon-certs">
                        <div className="addon-cert">
                            <span className="category-badge ec-council">EC-Council</span>
                            <div className="addon-cert-info">
                                <strong>CSA</strong> — Certified SOC Analyst
                            </div>
                        </div>
                        <div className="addon-cert">
                            <span className="category-badge ec-council">EC-Council</span>
                            <div className="addon-cert-info">
                                <strong>CCSE</strong> — Certified Cloud Security Engineer
                            </div>
                        </div>
                    </div>

                    {/* Final Price Comparison */}
                    <div className="final-price-grid">
                        <div className="final-price-card">
                            <h5>Graduate + Bundle</h5>
                            <div className="final-price-breakdown">
                                <div className="price-row">
                                    <span>Graduate Program</span>
                                    <span>₹1,50,000</span>
                                </div>
                                <div className="price-row">
                                    <span>CSA + CCSE Bundle</span>
                                    <span>₹1,15,000</span>
                                </div>
                                <div className="price-row total">
                                    <span>Total Investment</span>
                                    <span>₹2,65,000</span>
                                </div>
                                <div className="price-row bonus">
                                    <span>🎁 FREE Laptop</span>
                                    <span>₹50,000</span>
                                </div>
                            </div>
                            <div className="cert-summary">
                                <span className="summary-badge ec-council">4 EC-Council Certs</span>
                                <span className="summary-badge ehack">2 eHack Courses</span>
                            </div>
                        </div>

                        <div className="final-price-card featured">
                            <span className="best-value-badge">Best Value</span>
                            <h5>Masters + Bundle</h5>
                            <div className="final-price-breakdown">
                                <div className="price-row">
                                    <span>Masters Program</span>
                                    <span>₹3,50,000</span>
                                </div>
                                <div className="price-row">
                                    <span>CSA + CCSE Bundle</span>
                                    <span>₹1,15,000</span>
                                </div>
                                <div className="price-row total">
                                    <span>Total Investment</span>
                                    <span>₹4,65,000</span>
                                </div>
                                <div className="price-row bonus">
                                    <span>🎁 FREE Laptop</span>
                                    <span>₹50,000</span>
                                </div>
                            </div>
                            <div className="cert-summary">
                                <span className="summary-badge ec-council">6 EC-Council Certs</span>
                                <span className="summary-badge ehack">2 eHack Courses + Internship + Project Work</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Total Value Comparison */}
            <section className="offer-section">
                <h2 className="offer-section-title">
                    Your Complete Package Value — <span className="title-highlight">Including Free Laptop</span>
                </h2>
                <p className="offer-section-subtitle">
                    See exactly how much you save with each program — the laptop alone is worth <strong>₹50,000!</strong>
                </p>

                <div className="savings-summary">
                    <table className="savings-table">
                        <thead>
                            <tr>
                                <th>Component</th>
                                <th>Graduate + Bundle</th>
                                <th>Masters + Bundle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Program Value</td>
                                <td>₹1,50,000</td>
                                <td>₹3,50,000</td>
                            </tr>
                            <tr>
                                <td>CSA & CCSE Bundle</td>
                                <td>₹1,15,000</td>
                                <td>₹1,15,000</td>
                            </tr>
                            <tr className="highlight-row">
                                <td>Total Package Value</td>
                                <td>₹3,15,000</td>
                                <td>₹5,15,000</td>
                            </tr>
                            <tr>
                                <td>You Pay</td>
                                <td>₹2,65,000</td>
                                <td>₹4,65,000</td>
                            </tr>
                            <tr className="savings-row">
                                <td>Your Savings</td>
                                <td>₹50,000</td>
                                <td>₹50,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* CTA Section */}
            <section className="offer-cta-section">
                <div className="offer-cta-container">
                    <h2>
                        Start Your <span className="cta-highlight">Cybersecurity Career</span> Today
                    </h2>
                    <p>
                        Don't miss this opportunity to gain world-class certifications, practical skills, and a <strong>FREE laptop</strong> to power your success.
                    </p>
                    <div className="cta-buttons">
                        <Link href="/contact" className="cta-btn cta-btn-primary">
                            Enroll in Masters Program
                        </Link>
                        <Link href="/contact" className="cta-btn cta-btn-secondary">
                            Enroll in Graduate Program
                        </Link>
                    </div>
                    <p className="cta-urgency">
                        Limited seats available — Offer valid while stocks last
                    </p>
                </div>
            </section>
        </main>
    );
}
