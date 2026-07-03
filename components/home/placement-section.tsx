import React from 'react';
import './placement-section.css';

// Using the images we found in public/images/testimonials
const placementStories = [
    {
        id: 1,
        name: "Anmol Gupta",
        image: "/images/testimonials/person1.jpg",
        before: { role: "B.Tech Student", company: "Fresher" },
        after: { role: "APV-DELIVERY", company: "Ampcuscyber", logo: "/images/ampcuscyber.png" },
        hike: "400%",
        badge: ["Masters Program"]
    },
    {
        id: 2,
        name: "Rajiv Govind",
        image: "/images/testimonials/person2.jpg",
        before: { role: "System Admin", company: "Local IT Firm" },
        after: { role: "Head Teaching Assistant", company: "GTL", logo: "/images/gtlogo.jpg" },
        hike: "140%",
        badge: ["CSU", "CEH", "CCNA"]
    },
    {
        id: 3,
        name: "Vaddi . Paneendar",
        image: "/images/testimonials/person3.jpg",
        before: { role: "Support Engineer", company: "Tech Support" },
        after: { role: "Red Teamer", company: "SISA", logo: "/images/sisa.webp" },
        hike: "300%",
        badge: ["Master Program"]
    },
    {
        id: 4,
        name: "Damini Ranganath",
        image: "/images/testimonials/person4.jpg",
        before: { role: "Software Dev", company: "Startup" },
        after: { role: "Cybersecurity Engineer", company: "Anuvu", logo: "/images/anuvu.png" },
        hike: "120%",
        badge: ["Master Program"]
    },
    {
        id: 5,
        name: "Pranshu Tiwari",
        image: "/images/testimonials/person5.jpg",
        before: { role: "Network Admin", company: "ISP" },
        after: { role: "Director Security Services", company: "Ampcuscyber", logo: "/images/ampcuscyber.png" },
        hike: "160%",
        badge: ["OSCP", "CEH"]
    },
    {
        id: 6,
        name: "Abhinav Choubey",
        image: "/images/testimonials/person6.jpg",
        before: { role: "IT Manager", company: "Mid-size Firm" },
        after: { role: "Associate Director", company: "SISA", logo: "/images/sisa.webp" },
        hike: "200%",
        badge: ["CND", "CEH", "CPENT"]
    },
    {
        id: 7,
        name: "Snigdha Suresh Poonghat ",
        image: "/images/testimonials/person7.jpg",
        before: { role: "IT Manager", company: "Mid-size Firm" },
        after: { role: "Technical Support Engineer", company: "ASK4", logo: "/images/ask4_limited_logo.jpg" },
        hike: "200%",
        badge: ["Graduate Program"]
    },
    {
        id: 8,
        name: "Rohit Prasad",
        image: "/images/testimonials/person8.jpg",
        before: { role: "IT Manager", company: "Mid-size Firm" },
        after: { role: "Advisor", company: "Fiserv", logo: "/images/fiserv.png" },
        hike: "200%",
        badge: ["Master Program"]
    }
];

interface PlacementStory {
    id: number;
    name: string;
    image?: string;
    before: { role: string; company: string };
    after: { role: string; company: string; logo?: string };
    hike: string;
    badge: string[];
}

interface PlacementSectionProps {
    customStories?: PlacementStory[];
}

const PlacementSection = ({ customStories }: PlacementSectionProps = {}) => {
    const storiesToUse = customStories || placementStories;

    return (
        <section className="placement-section" style={{ borderBottom: 'solid 1px #ff6b00' }} id="placements">
            <div className="container">
                <div className="placement-header">
                    <span className="placement-label">Career Transformations</span>
                    <h2 className="placement-title">
                        From Learning to Leading<br />
                        <span className="highlight">eHack Academy</span>
                    </h2>
                    <p className="placement-subtitle">
                        See how our students transformed their careers with<br />
                        <span className="highlight">eHack Academy</span>
                    </p>
                </div>

                <div className="marquee-container">
                    <div className="marquee-track">
                        {/* Render twice for infinite loop */}
                        {[...storiesToUse, ...storiesToUse].map((story, index) => (
                            <div key={`${story.id}-${index}`} className="transformation-card">
                                <div className="card-header-section">
                                    <div className="profile-image-wrapper">
                                        {story.image ? (
                                            <img src={story.image} alt={story.name} className="profile-image" />
                                        ) : (
                                            <div className="profile-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', color: '#9ca3af', fontWeight: 'bold', fontSize: '1.5rem', textTransform: 'uppercase' }}>
                                                {story.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="hike-badge">{story.hike} Hike</div>
                                    </div>
                                    <h3 className="student-name">{story.name}</h3>
                                    <div className="card-badges">
                                        {story.badge.map((cert, idx) => (
                                            <span key={idx} className="card-badge">{cert}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="transformation-path">
                                    <div className="path-step before">
                                        <span className="step-label">Before eHack</span>
                                        <div className="company-text-wrapper">
                                            <p className="step-company">{story.before.company}</p>
                                        </div>
                                        <p className="step-role">{story.before.role}</p>
                                    </div>
                                    <div className="path-arrow">➜</div>
                                    <div className="path-step after">
                                        <span className="step-label">After eHack</span>
                                        {story.after.logo ? (
                                            <div className="company-logo-wrapper" data-company={story.after.company}>
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
                                        <p className="step-role">{story.after.role}</p>
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
