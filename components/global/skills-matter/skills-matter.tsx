import React from 'react';
import "./skills-matter.css";

const newsItems = [
    {
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
        date: "February 2026",
        headline: "Global Cybercrime Costs to Reach $10.5 Trillion Annually by 2025",
        source: "Cybersecurity Ventures"
    },
    {
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=250&fit=crop",
        date: "January 2026",
        headline: "Cybersecurity Workforce Gap Widens to 3.4 Million Globally",
        source: "ISC2 Study"
    },
    {
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
        date: "January 2026",
        headline: "AI-Driven Cyber Attacks on the Rise: How Organizations are Responding",
        source: "TechCrunch"
    },
    {
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=250&fit=crop",
        date: "December 2025",
        headline: "Ransomware Attacks Increased by 93% in 2024",
        source: "The Hacker News"
    },
    {
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop",
        date: "December 2025",
        headline: "Zero Trust Architecture Becomes the New Standard for Enterprise Security",
        source: "CSO Online"
    },
    {
        image: "https://images.unsplash.com/photo-1618060932014-4deda4932554?w=400&h=250&fit=crop",
        date: "November 2025",
        headline: "Cloud Security Failures Will Account for 99% of Breaches Through 2025",
        source: "Gartner"
    },
    {
        image: "https://images.unsplash.com/photo-1504384308090-c54be3855091?w=400&h=250&fit=crop",
        date: "October 2025",
        headline: "India Records 500% Increase in Cyberattacks - Skilled Professionals in High Demand",
        source: "Economic Times"
    },
    {
        image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&h=250&fit=crop",
        date: "October 2025",
        headline: "IoT Vulnerabilities: The Next Big Threat in Cybersecurity",
        source: "Wired"
    },
    {
        image: "https://images.unsplash.com/photo-1526374804325-e4d0d580e309?w=400&h=250&fit=crop",
        date: "September 2025",
        headline: "Data Privacy Regulations Tighten Globally: GDPR and Beyond",
        source: "Reuters"
    },
    {
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop",
        date: "September 2025",
        headline: "The Role of Machine Learning in Threat Detection and Response",
        source: "MIT Tech Review"
    }
];

export default function SkillsMatterSection() {
    return (
        <section className="skills-matter-section">
            <div className="skills-matter-container">
                <span className="skills-matter-badge">
                    CYBER THREATS ARE RISING
                </span>
                <h2 className="skills-matter-title">
                    Why Cybersecurity Skills Matter Now
                </h2>
                <div className="news-marquee-container">
                    <div className="news-marquee-track">
                        {/* Duplicate items for seamless loop */}
                        {[...newsItems, ...newsItems].map((item, idx) => (
                            <article key={idx} className="news-card">
                                <div className="news-image">
                                    <img src={item.image} alt="Cybersecurity News" />
                                </div>
                                <div className="news-content">
                                    <span className="news-date">{item.date}</span>
                                    <h3 className="news-headline">{item.headline}</h3>
                                    <p className="news-source">{item.source}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
