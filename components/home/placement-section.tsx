import React from 'react';
import './placement-section.css';

// Using the images we found in public/images/testimonials
const placementStories = [
    {
        id: 1,
        name: "Ankit Verma",
        image: "/images/testimonials/person1.jpg",
        before: { role: "B.Tech Student", company: "Fresher" },
        after: { role: "Cybersecurity Analyst", company: "Deloitte", logo: "https://img.logo.dev/deloitte.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ" },
        hike: "150%",
        badge: "CEH Certified 🏆"
    },
    {
        id: 2,
        name: "Rahul Sharma",
        image: "/images/testimonials/person2.jpg",
        before: { role: "System Admin", company: "Local IT Firm" },
        after: { role: "SOC Engineer", company: "PwC", logo: "https://img.logo.dev/pwc.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ" },
        hike: "140%",
        badge: "CND Certified ⭐"
    },
    {
        id: 3,
        name: "Vijay Kumar",
        image: "/images/testimonials/person3.jpg",
        before: { role: "Support Engineer", company: "Tech Support" },
        after: { role: "Penetration Tester", company: "KPMG", logo: "https://img.logo.dev/kpmg.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ" },
        hike: "180%",
        badge: "CPENT Certified 🐞"
    },
    {
        id: 4,
        name: "Priya Singh",
        image: "/images/testimonials/person4.jpg",
        before: { role: "Software Dev", company: "Startup" },
        after: { role: "Security Consultant", company: "EY", logo: "https://img.logo.dev/ey.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ" },
        hike: "120%",
        badge: "CHFI Certified 🛡️"
    },
    {
        id: 5,
        name: "Arjun Patel",
        image: "/images/testimonials/person5.jpg",
        before: { role: "Network Admin", company: "ISP" },
        after: { role: "Cloud Security Eng.", company: "Accenture", logo: "https://img.logo.dev/accenture.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ" },
        hike: "160%",
        badge: "CCSE Certified 🚀"
    },
    {
        id: 6,
        name: "Sanjay Mehta",
        image: "/images/testimonials/person6.jpg",
        before: { role: "IT Manager", company: "Mid-size Firm" },
        after: { role: "InfoSec Manager", company: "IBM", logo: "https://img.logo.dev/ibm.com?token=pk_RM4Xs6-nTrO6e8JzPUxMCQ" },
        hike: "200%",
        badge: "CISM Certified 🎓"
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
            </div>
        </section>
    );
};

export default PlacementSection;
