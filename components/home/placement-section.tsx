import React from 'react';
import './placement-section.css';

// Using the images we found in public/images/testimonials
const placementStories = [
    {
        id: 1,
        name: "Rahul Sharma",
        image: "/images/testimonials/person1.jpg",
        before: { role: "B.Tech Student", company: "Fresher" },
        after: { role: "Security Analyst", company: "Deloitte", logo: "/images/companies/deloitte.svg" },
        hike: "150%",
        badge: "Hackathon Winner 🏆"
    },
    {
        id: 2,
        name: "Priya Patel",
        image: "/images/testimonials/person2.jpg",
        before: { role: "System Admin", company: "Local IT Firm" },
        after: { role: "Cloud Security Eng.", company: "Amazon", logo: "/images/companies/amazon.svg" },
        hike: "200%",
        badge: "Top Performer ⭐"
    },
    {
        id: 3,
        name: "Amit Kumar",
        image: "/images/testimonials/person3.jpg",
        before: { role: "Support Engineer", company: "Tech Support" },
        after: { role: "Penetration Tester", company: "EY", logo: "/images/companies/ey.svg" },
        hike: "180%",
        badge: "Bug Bounty Hunter 🐞"
    },
    {
        id: 4,
        name: "Sneha Gupta",
        image: "/images/testimonials/person4.jpg",
        before: { role: "Software Dev", company: "Startup" },
        after: { role: "SOC Analyst", company: "KPMG", logo: "/images/companies/kpmg.svg" },
        hike: "120%",
        badge: "Certified Et. Hacker 🛡️"
    },
    {
        id: 5,
        name: "Vikram Singh",
        image: "/images/testimonials/person5.jpg",
        before: { role: "Network Admin", company: "ISP" },
        after: { role: "Security Consultant", company: "PwC", logo: "/images/companies/pwc.png" },
        hike: "160%",
        badge: "Fast Track Promo 🚀"
    },
    {
        id: 6,
        name: "Anjali Desai",
        image: "/images/testimonials/person6.jpg",
        before: { role: "Fresher", company: "College Grad" },
        after: { role: "Cyber Defense", company: "Infosys", logo: "/images/companies/infosys.svg" },
        hike: "140%",
        badge: "Scholarship Recipient 🎓"
    }
];

const PlacementSection = () => {
    return (
        <section className="placement-section">
            <div className="container">
                <div className="placement-header">
                    <span className="placement-label">Career Transformations</span>
                    <h2 className="placement-title">
                        From Learning to <span className="highlight">Leading</span>
                    </h2>
                    <p className="placement-subtitle">
                        See how our students transformed their careers with eHack Academy
                    </p>
                </div>

                <div className="marquee-container">
                    <div className="marquee-track">
                        {/* Render twice for infinite loop */}
                        {[...placementStories, ...placementStories].map((story, index) => (
                            <div key={`${story.id}-${index}`} className="transformation-card">
                                <div className="card-header-section">
                                    <div className="card-badge">{story.badge}</div>
                                    <div className="profile-image-wrapper">
                                        <img src={story.image} alt={story.name} className="profile-image" />
                                        <div className="hike-badge">{story.hike} Hike</div>
                                    </div>
                                    <h3 className="student-name">{story.name}</h3>
                                </div>

                                <div className="transformation-path">
                                    <div className="path-step before">
                                        <span className="step-label">Before eHack</span>
                                        <p className="step-role">{story.before.role}</p>
                                        <p className="step-company">{story.before.company}</p>
                                    </div>
                                    <div className="path-arrow">➜</div>
                                    <div className="path-step after">
                                        <span className="step-label">After eHack</span>
                                        <p className="step-role">{story.after.role}</p>
                                        {story.after.logo ? (
                                            <div className="company-logo-wrapper">
                                                <img
                                                    src={story.after.logo}
                                                    alt={story.after.company}
                                                    className="step-company-logo"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                        ) : (
                                            <p className="step-company">{story.after.company}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="placement-stats-strip">
                    <div className="strip-item">
                        <span className="strip-value">500+</span>
                        <span className="strip-label">Hiring Partners</span>
                    </div>
                    <div className="strip-divider"></div>
                    <div className="strip-item">
                        <span className="strip-value">12 LPA</span>
                        <span className="strip-label">Avg Package</span>
                    </div>
                    <div className="strip-divider"></div>
                    <div className="strip-item">
                        <span className="strip-value">100%</span>
                        <span className="strip-label">Career Support</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlacementSection;
