'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './page.css';

export default function LearningOptionsPage() {
    const [activeTab, setActiveTab] = useState('live-online');
    const [isTabsFixed, setIsTabsFixed] = useState(false);
    const heroRef = useRef<HTMLElement>(null);
    const tabsWrapperRef = useRef<HTMLDivElement>(null);
    const tabsPlaceholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Function to update active tab based on hash
        const handleHashUpdate = () => {
            if (window.location.hash) {
                const hash = window.location.hash.substring(1);
                // Update tab if hash exists and is not empty
                if (hash) {
                    setActiveTab(hash);

                    // Scroll to top of tabs section if needed (optional UX improvement)
                    // if (tabsWrapperRef.current) {
                    //    tabsWrapperRef.current.scrollIntoView({ behavior: 'smooth' });
                    // }
                }
            }
        };

        // Initial check
        handleHashUpdate();

        // Listen for events that might change the hash
        window.addEventListener('hashchange', handleHashUpdate);
        window.addEventListener('popstate', handleHashUpdate);

        // Handle Next.js Link clicks which might not trigger hashchange 
        // especially for same-page navigation
        const handleGlobalClick = () => {
            // Small delay to allow URL to update
            setTimeout(handleHashUpdate, 100);
        };
        window.addEventListener('click', handleGlobalClick);

        // Scroll listener for sticky tabs
        const handleScroll = () => {
            if (heroRef.current && tabsWrapperRef.current) {
                const heroBottom = heroRef.current.getBoundingClientRect().bottom;
                const headerHeight = 75; // Approximate header height

                if (heroBottom <= headerHeight) {
                    setIsTabsFixed(true);
                } else {
                    setIsTabsFixed(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount

        return () => {
            window.removeEventListener('hashchange', handleHashUpdate);
            window.removeEventListener('popstate', handleHashUpdate);
            window.removeEventListener('click', handleGlobalClick);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const tabImages: Record<string, string> = {
        'live-online': '/Live Online Training.png',
        'classroom': '/Classroom Training.png',
        'one-on-one': '/1-on-1.jpg',
        'fly-trainer': '/Fly-Me-A-Trainer.jpg',
        'flexi': '/Flexi.jpg',
        'customized': '/Customized Training.jpg',
        'webinar-service': '/Webinar as a Service.jpeg',
        'upcoming-webinars': '/Upcoming Webinars.jpeg'
    };

    const changeTab = (tab: string) => {
        setActiveTab(tab);
        window.location.hash = tab;
    };

    return (
        <>
            {/* Hero Section */}
            <section
                className="learning-hero-light"
                ref={heroRef}
                style={{
                    backgroundImage: `url('${tabImages[activeTab] || '/images/certificates/services.png'}')`,
                    transition: 'background-image 0.5s ease-in-out'
                }}
            >
                <div className="container">
                    <div className="hero-content-compact">
                        <span className="hero-badge-light">FLEXIBLE LEARNING OPTIONS</span>
                        <h1 className="hero-title-light">Learn Your Way, At Your Pace</h1>
                        <p className="hero-subtitle-light">
                            We offer 8 different training modes to match your schedule, location, and learning style. Choose what works best for you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tab-Based Learning Options Section */}
            <section className="learning-tabs-section">
                {/* Placeholder to maintain layout when tabs become fixed */}
                {isTabsFixed && <div className="tabs-placeholder" ref={tabsPlaceholderRef}></div>}

                {/* Tab Navigation - Fixed when scrolling past hero */}
                <div className={`tabs-wrapper ${isTabsFixed ? 'is-fixed' : ''}`} ref={tabsWrapperRef}>
                    <div className="tabs-nav">
                        <button
                            className={`tab-btn ${activeTab === 'live-online' ? 'active' : ''}`}
                            onClick={() => changeTab('live-online')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Live Online</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'classroom' ? 'active' : ''}`}
                            onClick={() => changeTab('classroom')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Classroom</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'one-on-one' ? 'active' : ''}`}
                            onClick={() => changeTab('one-on-one')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>1-on-1</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'fly-trainer' ? 'active' : ''}`}
                            onClick={() => changeTab('fly-trainer')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Fly-Me-a-Trainer</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'flexi' ? 'active' : ''}`}
                            onClick={() => changeTab('flexi')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Flexi</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'customized' ? 'active' : ''}`}
                            onClick={() => changeTab('customized')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Customized</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'webinar-service' ? 'active' : ''}`}
                            onClick={() => changeTab('webinar-service')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Webinar Service</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'upcoming-webinars' ? 'active' : ''}`}
                            onClick={() => changeTab('upcoming-webinars')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Upcoming Webinars</span>
                        </button>
                    </div>
                </div>

                {/* Tab Content inside container */}
                <div className="container">
                    {/* Tab Content Panels */}
                    <div className="tab-content-wrapper">
                        {/* Live Online Training */}
                        {activeTab === 'live-online' && (
                            <div className="tab-panel active">
                                <div className="panel-grid">
                                    <div className="panel-content">
                                        <span className="panel-badge">MOST POPULAR</span>
                                        <h2 className="panel-title">Live Online Training</h2>
                                        <p className="panel-description">
                                            Experience real-time, instructor-led training from the comfort of your home or office. Our advanced virtual classroom platform enables seamless interaction with expert trainers and fellow learners, making distance learning feel personal and engaging.
                                        </p>
                                        <div className="panel-features">
                                            {[
                                                { title: "Real-time Interaction", desc: "Ask questions, participate in discussions, and get instant feedback from instructors" },
                                                { title: "Recorded Sessions", desc: "Access class recordings anytime for revision or if you miss a session" },
                                                { title: "Hands-on Virtual Labs", desc: "Practice on real scenarios using our cloud-based lab environment" },
                                                { title: "Flexible Batch Timings", desc: "Choose from weekday, weekend, or evening batches to fit your schedule" }
                                            ].map((feat, i) => (
                                                <div key={i} className="feature-item">
                                                    <div className="feature-icon">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
                                                        </svg>
                                                    </div>
                                                    <div className="feature-text">
                                                        <strong>{feat.title}</strong>
                                                        <span>{feat.desc}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="panel-sidebar">
                                        <div className="info-card">
                                            <h4>Quick Info</h4>
                                            <div className="info-row"><span>Mode</span><strong>Virtual Classroom</strong></div>
                                            <div className="info-row"><span>Batch Size</span><strong>15-25 Students</strong></div>
                                            <div className="info-row"><span>Duration</span><strong>As per course</strong></div>
                                            <div className="info-row"><span>Support</span><strong>24/7 Doubt Resolution</strong></div>
                                        </div>
                                        <div className="best-for-card">
                                            <h4>Best For</h4>
                                            <ul>
                                                <li>Working professionals</li>
                                                <li>Students with busy schedules</li>
                                                <li>Learners from any location</li>
                                                <li>Those who prefer home learning</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Classroom Training */}
                        {activeTab === 'classroom' && (
                            <div className="tab-panel active">
                                <div className="panel-grid">
                                    <div className="panel-content">
                                        <span className="panel-badge panel-badge-blue">IN-PERSON EXPERIENCE</span>
                                        <h2 className="panel-title">Classroom Training</h2>
                                        <p className="panel-description">
                                            Traditional face-to-face learning at our state-of-the-art training centers. Get the complete campus experience with direct mentorship, networking opportunities, and access to industry-standard infrastructure that enhances your learning journey.
                                        </p>
                                        <div className="panel-features">
                                            {[
                                                { title: "Face-to-Face Instruction", desc: "Direct interaction with instructors for immediate clarification and guidance" },
                                                { title: "Modern Lab Infrastructure", desc: "Access to high-end computers, specialized software, and networking equipment" },
                                                { title: "Peer Networking", desc: "Build connections with fellow learners and industry professionals" },
                                                { title: "Focused Environment", desc: "Dedicated study space free from home distractions for better concentration" }
                                            ].map((feat, i) => (
                                                <div key={i} className="feature-item">
                                                    <div className="feature-icon blue">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
                                                        </svg>
                                                    </div>
                                                    <div className="feature-text">
                                                        <strong>{feat.title}</strong>
                                                        <span>{feat.desc}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="panel-sidebar">
                                        <div className="info-card">
                                            <h4>Quick Info</h4>
                                            <div className="info-row"><span>Mode</span><strong>Physical Classroom</strong></div>
                                            <div className="info-row"><span>Locations</span><strong>Bangalore</strong></div>
                                            <div className="info-row"><span>Batch Size</span><strong>30 Students</strong></div>
                                            <div className="info-row"><span>Timing</span><strong>Weekday/Weekend</strong></div>
                                        </div>
                                        <div className="best-for-card">
                                            <h4>Best For</h4>
                                            <ul>
                                                <li>Full-time students</li>
                                                <li>Career changers</li>
                                                <li>Those who prefer structured environment</li>
                                                <li>Networking enthusiasts</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 1-on-1 Training */}
                        {activeTab === 'one-on-one' && (
                            <div className="tab-panel active">
                                <div className="panel-grid">
                                    <div className="panel-content">
                                        <span className="panel-badge panel-badge-purple">PERSONALIZED ATTENTION</span>
                                        <h2 className="panel-title">1-on-1 Training</h2>
                                        <p className="panel-description">
                                            Exclusive personalized training tailored to your specific needs, goals, and learning pace. Get undivided attention from our top instructors who customize the curriculum and approach based on your strengths and areas requiring improvement.
                                        </p>
                                        <div className="panel-features">
                                            {[
                                                { title: "Customized Curriculum", desc: "Training content tailored to match your specific learning objectives" },
                                                { title: "Flexible Scheduling", desc: "Choose sessions at times that work best for you, including weekends" },
                                                { title: "Focused Attention", desc: "100% of the instructor's time dedicated to your learning" },
                                                { title: "Accelerated Learning", desc: "Progress faster without waiting for batch pace" }
                                            ].map((feat, i) => (
                                                <div key={i} className="feature-item">
                                                    <div className="feature-icon purple">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
                                                        </svg>
                                                    </div>
                                                    <div className="feature-text">
                                                        <strong>{feat.title}</strong>
                                                        <span>{feat.desc}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="panel-sidebar">
                                        <div className="pricing-info-card purple">
                                            <div className="pricing-info-icon">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <h4>Customized Pricing</h4>
                                            <p>1-on-1 training pricing is tailored to your specific requirements, duration, and learning objectives.</p>
                                            <Link href="/contact" className="pricing-cta-btn purple">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Get Custom Quote
                                            </Link>
                                        </div>
                                        <div className="info-card">
                                            <h4>Quick Info</h4>
                                            <div className="info-row"><span>Mode</span><strong>Online / In-Person</strong></div>
                                            <div className="info-row"><span>Batch Size</span><strong>1 Student Only</strong></div>
                                            <div className="info-row"><span>Schedule</span><strong>100% Flexible</strong></div>
                                            <div className="info-row"><span>Support</span><strong>Dedicated Mentor</strong></div>
                                        </div>
                                        <div className="best-for-card">
                                            <h4>Best For</h4>
                                            <ul>
                                                <li>Executives with tight schedules</li>
                                                <li>Professionals needing specific skills</li>
                                                <li>Fast-track learners</li>
                                                <li>Those with unique requirements</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Fly-Me-a-Trainer */}
                        {activeTab === 'fly-trainer' && (
                            <div className="tab-panel active">
                                <div className="panel-grid">
                                    <div className="panel-content">
                                        <span className="panel-badge panel-badge-green">CORPORATE SOLUTION</span>
                                        <h2 className="panel-title">Fly-Me-a-Trainer</h2>
                                        <p className="panel-description">
                                            We bring our expert trainers directly to your location! This premium service is perfect for corporate teams and organizations who need on-site training at their premises. Eliminate travel time for your employees while providing high-quality, consistent training.
                                        </p>
                                        <div className="panel-features">
                                            {[
                                                { title: "On-site Expert Trainers", desc: "Certified trainers travel to your office or preferred venue" },
                                                { title: "Customized Corporate Programs", desc: "Training aligned with your organization's technology stack and goals" },
                                                { title: "Team Building Environment", desc: "Train your team together for consistent skill development" },
                                                { title: "No Employee Travel", desc: "Save time and costs by training at your own premises" }
                                            ].map((feat, i) => (
                                                <div key={i} className="feature-item">
                                                    <div className="feature-icon green">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
                                                        </svg>
                                                    </div>
                                                    <div className="feature-text">
                                                        <strong>{feat.title}</strong>
                                                        <span>{feat.desc}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="panel-sidebar">
                                        <div className="pricing-info-card green">
                                            <div className="pricing-info-icon">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <h4>Corporate Pricing</h4>
                                            <p>On-site training pricing depends on location, batch size, duration, and specific requirements.</p>
                                            <Link href="/contact" className="pricing-cta-btn green">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Request Corporate Quote
                                            </Link>
                                        </div>
                                        <div className="info-card">
                                            <h4>Quick Info</h4>
                                            <div className="info-row"><span>Mode</span><strong>Your Location</strong></div>
                                            <div className="info-row"><span>Coverage</span><strong>Pan India</strong></div>
                                            <div className="info-row"><span>Min. Batch</span><strong>5+ Employees</strong></div>
                                            <div className="info-row"><span>Setup</span><strong>We handle everything</strong></div>
                                        </div>
                                        <div className="best-for-card">
                                            <h4>Best For</h4>
                                            <ul>
                                                <li>Large corporations</li>
                                                <li>Government organizations</li>
                                                <li>Educational institutions</li>
                                                <li>Remote office locations</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Flexi Learning */}
                        {activeTab === 'flexi' && (
                            <div className="tab-panel active">
                                <div className="panel-grid">
                                    <div className="panel-content">
                                        <span className="panel-badge panel-badge-yellow">SELF-PACED</span>
                                        <h2 className="panel-title">Flexi Learning</h2>
                                        <p className="panel-description">
                                            Learn at your own pace with our flexible learning model. This hybrid approach combines pre-recorded HD video content with weekly live doubt-clearing sessions, giving you the freedom to study when it suits you while still having access to instructor support.
                                        </p>
                                        <div className="panel-features">
                                            {[
                                                { title: "Self-paced Learning", desc: "Study whenever you want, pause and rewind as needed" },
                                                { title: "HD Video Content", desc: "Professionally produced training videos with clear explanations" },
                                                { title: "Weekly Mentor Sessions", desc: "Live sessions every week to clarify doubts and discuss concepts" },
                                                { title: "24/7 Content Access", desc: "Access your course materials anytime, anywhere, on any device" }
                                            ].map((feat, i) => (
                                                <div key={i} className="feature-item">
                                                    <div className="feature-icon yellow">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
                                                        </svg>
                                                    </div>
                                                    <div className="feature-text">
                                                        <strong>{feat.title}</strong>
                                                        <span>{feat.desc}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="panel-sidebar">
                                        <div className="info-card">
                                            <h4>Quick Info</h4>
                                            <div className="info-row"><span>Mode</span><strong>Recorded + Live</strong></div>
                                            <div className="info-row"><span>Doubt Sessions</span><strong>Weekly</strong></div>
                                            <div className="info-row"><span>Access</span><strong>1 Year Validity</strong></div>
                                            <div className="info-row"><span>Device</span><strong>Any Device</strong></div>
                                        </div>
                                        <div className="best-for-card">
                                            <h4>Best For</h4>
                                            <ul>
                                                <li>Busy professionals</li>
                                                <li>Night owls & early birds</li>
                                                <li>Slow-paced learners</li>
                                                <li>Those with irregular schedules</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Customized Training */}
                        {activeTab === 'customized' && (
                            <div className="tab-panel active">
                                <div className="panel-grid">
                                    <div className="panel-content">
                                        <span className="panel-badge">TAILORED SOLUTIONS</span>
                                        <h2 className="panel-title">Customized Training</h2>
                                        <p className="panel-description">
                                            Build your own training program from scratch! We work closely with your organization to design a curriculum that matches your specific needs, technology stack, compliance requirements, and business goals. Get training that truly makes a difference.
                                        </p>
                                        <div className="panel-features">
                                            {[
                                                { title: "Tailored Curriculum Design", desc: "Content designed specifically for your organization's needs" },
                                                { title: "Industry-specific Modules", desc: "Case studies and examples relevant to your industry vertical" },
                                                { title: "Assessment Frameworks", desc: "Custom tests and evaluations to measure learning outcomes" },
                                                { title: "ROI-focused Training", desc: "Measurable outcomes that align with your business objectives" }
                                            ].map((feat, i) => (
                                                <div key={i} className="feature-item">
                                                    <div className="feature-icon">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
                                                        </svg>
                                                    </div>
                                                    <div className="feature-text">
                                                        <strong>{feat.title}</strong>
                                                        <span>{feat.desc}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="panel-sidebar">
                                        <div className="info-card">
                                            <h4>Quick Info</h4>
                                            <div className="info-row"><span>Mode</span><strong>Any Preferred Mode</strong></div>
                                            <div className="info-row"><span>Duration</span><strong>Custom</strong></div>
                                            <div className="info-row"><span>Reporting</span><strong>Detailed Analytics</strong></div>
                                            <div className="info-row"><span>Certification</span><strong>Custom Branded</strong></div>
                                        </div>
                                        <div className="best-for-card">
                                            <h4>Best For</h4>
                                            <ul>
                                                <li>Enterprise organizations</li>
                                                <li>Compliance-driven training</li>
                                                <li>Specialized skill requirements</li>
                                                <li>Industry-specific needs</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Webinar as a Service */}
                        {activeTab === 'webinar-service' && (
                            <div className="tab-panel active">
                                <div className="panel-grid">
                                    <div className="panel-content">
                                        <span className="panel-badge panel-badge-cyan">B2B SERVICE</span>
                                        <h2 className="panel-title">Webinar as a Service</h2>
                                        <p className="panel-description">
                                            Host professional, engaging webinars powered by our expert speakers! We provide end-to-end webinar services for corporations, educational institutions, and communities looking to educate their audience on cybersecurity, technology trends, and career development.
                                        </p>
                                        <div className="panel-features">
                                            {[
                                                { title: "Expert Speaker Lineup", desc: "Access to 50+ industry experts and certified professionals" },
                                                { title: "Full Production Support", desc: "Technical setup, moderation, and professional streaming" },
                                                { title: "Q&A Management", desc: "Live Q&A sessions with curated audience questions" },
                                                { title: "Post-event Analytics", desc: "Detailed engagement reports and attendee insights" }
                                            ].map((feat, i) => (
                                                <div key={i} className="feature-item">
                                                    <div className="feature-icon cyan">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
                                                        </svg>
                                                    </div>
                                                    <div className="feature-text">
                                                        <strong>{feat.title}</strong>
                                                        <span>{feat.desc}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="panel-sidebar">
                                        <div className="info-card">
                                            <h4>Quick Info</h4>
                                            <div className="info-row"><span>Platform</span><strong>Zoom/Custom</strong></div>
                                            <div className="info-row"><span>Attendees</span><strong>Up to 10,000</strong></div>
                                            <div className="info-row"><span>Recording</span><strong>HD Quality</strong></div>
                                            <div className="info-row"><span>Branding</span><strong>Full Customization</strong></div>
                                        </div>
                                        <div className="best-for-card">
                                            <h4>Best For</h4>
                                            <ul>
                                                <li>Corporate L&D teams</li>
                                                <li>Universities & colleges</li>
                                                <li>Tech communities</li>
                                                <li>Event organizers</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Upcoming Webinars */}
                        {activeTab === 'upcoming-webinars' && (
                            <div className="tab-panel active">
                                <div className="panel-grid">
                                    <div className="panel-content">
                                        <span className="panel-badge panel-badge-red">FREE TO ATTEND</span>
                                        <h2 className="panel-title">Upcoming Webinars</h2>
                                        <div className="webinar-featured-image">
                                            <img src="/Upcoming Webinars.jpeg" alt="Upcoming Webinars" />
                                        </div>
                                        <p className="panel-description">
                                            Join our free expert-led webinars on the latest tech trends, cybersecurity threats, career guidance, and certification preparation. Learn from industry leaders and certified professionals who share real-world insights and actionable knowledge.
                                        </p>
                                        <div className="upcoming-webinars-list">
                                            <div className="webinar-item-large">
                                                <div className="webinar-date-box">
                                                    <span className="date-day">05</span>
                                                    <span className="date-month">JAN</span>
                                                </div>
                                                <div className="webinar-details">
                                                    <h4>AI in Cybersecurity: 2025 Trends & Predictions</h4>
                                                    <p>Explore how AI is transforming threat detection, response automation, and security operations.</p>
                                                    <div className="webinar-meta">
                                                        <span>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            7:00 PM IST
                                                        </span>
                                                        <span>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            Rajesh Kumar, CEH
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="webinar-item-large">
                                                <div className="webinar-date-box">
                                                    <span className="date-day">12</span>
                                                    <span className="date-month">JAN</span>
                                                </div>
                                                <div className="webinar-details">
                                                    <h4>Career Roadmap: From Zero to Cybersecurity Hero</h4>
                                                    <p>Complete guide to building a successful career in cybersecurity from scratch.</p>
                                                    <div className="webinar-meta">
                                                        <span>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            6:30 PM IST
                                                        </span>
                                                        <span>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            Priya Sharma
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="webinar-item-large">
                                                <div className="webinar-date-box">
                                                    <span className="date-day">20</span>
                                                    <span className="date-month">JAN</span>
                                                </div>
                                                <div className="webinar-details">
                                                    <h4>CEH v13 Deep Dive: What's New & How to Prepare</h4>
                                                    <p>Everything you need to know about the latest CEH version and exam preparation strategies.</p>
                                                    <div className="webinar-meta">
                                                        <span>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            7:30 PM IST
                                                        </span>
                                                        <span>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            EC-Council Expert
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-sidebar">
                                        <div className="info-card">
                                            <h4>Quick Info</h4>
                                            <div className="info-row"><span>Cost</span><strong>100% Free</strong></div>
                                            <div className="info-row"><span>Duration</span><strong>45-60 mins</strong></div>
                                            <div className="info-row"><span>Recording</span><strong>Available</strong></div>
                                            <div className="info-row"><span>Certificate</span><strong>Participation</strong></div>
                                        </div>
                                        <div className="best-for-card">
                                            <h4>Topics Covered</h4>
                                            <ul>
                                                <li>Cybersecurity trends</li>
                                                <li>Career guidance</li>
                                                <li>Certification prep</li>
                                                <li>Tech demonstrations</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Dynamic Contact CTA based on selected learning option */}
            <section className="contact-cta-section">
                <div className="container">
                    <div className={`contact-cta-box ${activeTab === 'classroom' ? 'cta-blue' : activeTab === 'one-on-one' ? 'cta-purple' : activeTab === 'fly-trainer' ? 'cta-green' : activeTab === 'flexi' ? 'cta-yellow' : activeTab === 'webinar-service' ? 'cta-cyan' : activeTab === 'upcoming-webinars' ? 'cta-red' : ''}`}>
                        <div className="cta-content">
                            {activeTab === 'live-online' && (
                                <>
                                    <span className="cta-badge">LIVE ONLINE</span>
                                    <h3>Ready to Start Learning from Home?</h3>
                                    <p>Join our next live online batch and learn from expert instructors in real-time. Get instant access to virtual labs and recorded sessions.</p>
                                </>
                            )}
                            {activeTab === 'classroom' && (
                                <>
                                    <span className="cta-badge cta-badge-blue">CLASSROOM</span>
                                    <h3>Experience In-Person Training at Our Campus</h3>
                                    <p>Visit our state-of-the-art training center in Bangalore. Get hands-on experience with industry-standard infrastructure.</p>
                                </>
                            )}
                            {activeTab === 'one-on-one' && (
                                <>
                                    <span className="cta-badge cta-badge-purple">1-ON-1 TRAINING</span>
                                    <h3>Get Personalized Training from an Expert</h3>
                                    <p>Schedule a free consultation to discuss your learning goals and get a customized training plan tailored just for you.</p>
                                </>
                            )}
                            {activeTab === 'fly-trainer' && (
                                <>
                                    <span className="cta-badge cta-badge-green">CORPORATE</span>
                                    <h3>Bring Expert Training to Your Office</h3>
                                    <p>Get a customized quote for on-site training at your premises. Minimum batch of 5+ employees. Pan-India coverage.</p>
                                </>
                            )}
                            {activeTab === 'flexi' && (
                                <>
                                    <span className="cta-badge cta-badge-yellow">SELF-PACED</span>
                                    <h3>Start Learning at Your Own Pace Today</h3>
                                    <p>Get instant access to HD video content and weekly live mentor sessions. Learn anytime, anywhere, on any device.</p>
                                </>
                            )}
                            {activeTab === 'customized' && (
                                <>
                                    <span className="cta-badge">ENTERPRISE</span>
                                    <h3>Let&apos;s Design Your Custom Training Program</h3>
                                    <p>Schedule a consultation with our training architects to create a tailored curriculum for your organization&apos;s unique needs.</p>
                                </>
                            )}
                            {activeTab === 'webinar-service' && (
                                <>
                                    <span className="cta-badge cta-badge-cyan">B2B SERVICE</span>
                                    <h3>Host a Professional Webinar for Your Audience</h3>
                                    <p>Partner with us to deliver expert-led webinars for your employees, students, or community. Full production support included.</p>
                                </>
                            )}
                            {activeTab === 'upcoming-webinars' && (
                                <>
                                    <span className="cta-badge cta-badge-red">FREE WEBINAR</span>
                                    <h3>Don&apos;t Miss Our Upcoming Free Webinars!</h3>
                                    <p>Register now to secure your spot in our expert-led sessions. Get notified about new webinars and receive recordings.</p>
                                </>
                            )}
                        </div>
                        <div className="cta-actions">
                            {activeTab === 'live-online' && (
                                <>
                                    <Link href="/courses" className="btn-contact-primary">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        View Live Batches
                                    </Link>
                                    <a href="tel:+919886035330" className="btn-contact-secondary">Talk to Counselor</a>
                                </>
                            )}
                            {activeTab === 'classroom' && (
                                <>
                                    <Link href="/contact" className="btn-contact-primary">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Book Campus Visit
                                    </Link>
                                    <a href="tel:+919886035330" className="btn-contact-secondary">Call for Directions</a>
                                </>
                            )}
                            {activeTab === 'one-on-one' && (
                                <>
                                    <Link href="/contact" className="btn-contact-primary">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Schedule Free Consultation
                                    </Link>
                                    <a href="tel:+919886035330" className="btn-contact-secondary">Call Now</a>
                                </>
                            )}
                            {activeTab === 'fly-trainer' && (
                                <>
                                    <Link href="/services" className="btn-contact-primary">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Request Corporate Quote
                                    </Link>
                                    <a href="mailto:info@ehackacademy.com" className="btn-contact-secondary">Email Proposal</a>
                                </>
                            )}
                            {activeTab === 'flexi' && (
                                <>
                                    <Link href="/courses" className="btn-contact-primary">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Start Self-Paced Course
                                    </Link>
                                    <a href="tel:+919886035330" className="btn-contact-secondary">Ask Questions</a>
                                </>
                            )}
                            {activeTab === 'customized' && (
                                <>
                                    <Link href="/services" className="btn-contact-primary">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Schedule Consultation
                                    </Link>
                                    <a href="mailto:info@ehackacademy.com" className="btn-contact-secondary">Send Requirements</a>
                                </>
                            )}
                            {activeTab === 'webinar-service' && (
                                <>
                                    <Link href="/services" className="btn-contact-primary">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Request Webinar Partnership
                                    </Link>
                                    <a href="mailto:info@ehackacademy.com" className="btn-contact-secondary">Discuss Requirements</a>
                                </>
                            )}
                            {activeTab === 'upcoming-webinars' && (
                                <>
                                    <Link href="/contact" className="btn-contact-primary">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Register for Free Webinar
                                    </Link>
                                    <Link href="/courses" className="btn-contact-secondary">Explore Full Courses</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
