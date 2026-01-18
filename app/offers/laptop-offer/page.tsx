import './page.css';
import Link from 'next/link';

export const metadata = {
    title: 'Free Laptop Offer | eHack Academy',
    description: 'Get a FREE laptop worth ₹50,000 when you enroll in Masters or Graduate Program with CSO & CSE Bundle. Transform your cybersecurity career today.',
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
                            <span>₹2,45,000</span> ₹1,00,000
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
                                            <span>₹2,45,000</span>
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
                                <span className="bundle-cert-name">Certified Security Engineer (CSE)</span>
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

            {/* Certification Value Breakdown */}
            <section className="offer-section">
                <h2 className="offer-section-title">
                    Your Complete Package Value — <span className="title-highlight">Including Free Laptop</span>
                </h2>
                <p className="offer-section-subtitle">
                    See exactly how much you save with each program — the laptop alone is worth <strong>₹50,000!</strong>
                </p>

                <div className="value-table-container">
                    <table className="value-table">
                        <thead>
                            <tr>
                                <th>Certification</th>
                                <th>Full Name</th>
                                <th>Individual Price</th>
                                <th>Graduate</th>
                                <th className="highlight">Masters</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ITF</td>
                                <td>IT Fundamentals</td>
                                <td className="price">₹40,000</td>
                                <td className="included">Included</td>
                                <td className="included">Included</td>
                            </tr>
                            <tr>
                                <td>CSCU</td>
                                <td>Certified Secure Computer Engineer</td>
                                <td className="price">₹25,000</td>
                                <td className="included">Included</td>
                                <td className="included">Included</td>
                            </tr>
                            <tr>
                                <td>CND</td>
                                <td>Certified Network Defender</td>
                                <td className="price">₹75,000</td>
                                <td className="included">Included</td>
                                <td className="included">Included</td>
                            </tr>
                            <tr>
                                <td>CEH</td>
                                <td>Certified Ethical Hacker</td>
                                <td className="price">₹60,000</td>
                                <td className="not-included">—</td>
                                <td className="included">Included</td>
                            </tr>
                            <tr>
                                <td>CHFI</td>
                                <td>Computer Hacking Forensic Investigator</td>
                                <td className="price">₹75,000</td>
                                <td className="not-included">—</td>
                                <td className="included">Included</td>
                            </tr>
                            <tr>
                                <td>CPENT / LPT</td>
                                <td>Certified Penetration Testing Professional / Licensed Penetration Tester</td>
                                <td className="price">₹95,000</td>
                                <td className="not-included">—</td>
                                <td className="included">Included</td>
                            </tr>
                            <tr>
                                <td>FREE Laptop</td>
                                <td>High-Performance Laptop</td>
                                <td className="price">₹50,000</td>
                                <td className="included">FREE</td>
                                <td className="included">FREE</td>
                            </tr>
                            <tr>
                                <td>CSA & CCSE Bundle</td>
                                <td>Certified CSA Analyst + Certified Security Engineer</td>
                                <td className="price">₹1,15,000</td>
                                <td className="included">Included</td>
                                <td className="included">Included</td>
                            </tr>
                            <tr className="total-row individual-total">
                                <td colSpan={2}><strong>Total If Purchased Individually</strong></td>
                                <td className="price"><strong>₹5,85,000</strong></td>
                                <td className="not-included">—</td>
                                <td className="not-included">—</td>
                            </tr>
                            <tr className="total-row original-price">
                                <td colSpan={2}><strong>Our Program Original Pricing</strong></td>
                                <td>—</td>
                                <td><strong>₹1,50,000</strong></td>
                                <td><strong>₹3,50,000</strong></td>
                            </tr>
                            <tr className="total-row program-price">
                                <td colSpan={2}><strong>Our Offer Price (with CSO & CSE Bundle ₹1,10,000)</strong></td>
                                <td>—</td>
                                <td><strong>₹2,60,000</strong></td>
                                <td><strong>₹4,60,000</strong></td>
                            </tr>
                            <tr className="total-row savings-row">
                                <td colSpan={2}><strong>YOUR TOTAL SAVINGS</strong></td>
                                <td>—</td>
                                <td className="savings-value">Save ₹3,25,000</td>
                                <td className="savings-value">Save ₹1,25,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Laptop Offer Section */}
            <section className="laptop-offer-section">
                <div className="laptop-offer-container">
                    <h2>
                        Get a <span>FREE Laptop Worth ₹50,000</span>
                    </h2>
                    <p className="laptop-offer-condition">
                        Purchase any program above along with our <strong>CSO & CSE Bundle</strong> and
                        walk away with a brand new laptop to power your learning journey.
                    </p>

                    <div className="bundle-details">
                        <h3>CSO & CSE Bundle Includes:</h3>
                        <ul>
                            <li><strong>Certified SOC Analyst (CSA)</strong> — Monitor, detect, and respond to security threats</li>
                            <li><strong>Certified Security Engineer (CSU)</strong> — Essential cybersecurity awareness training</li>
                        </ul>
                        <div className="bundle-price">Bundle Value: ₹1,10,000</div>
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
                                <td>CSO & CSE Bundle</td>
                                <td>₹1,10,000</td>
                                <td>₹1,10,000</td>
                            </tr>
                            <tr className="highlight-row">
                                <td>Total Package Value</td>
                                <td>₹3,10,000</td>
                                <td>₹5,10,000</td>
                            </tr>
                            <tr>
                                <td>You Pay</td>
                                <td>₹2,60,000</td>
                                <td>₹4,60,000</td>
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
