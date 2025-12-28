"use client";

import { useState } from "react";
import "./course-details.css";

// ============================================
// Type Definitions
// ============================================

export interface LearnItem {
    id: number;
    number: string;
    title: string;
    description: string;
    tags: string[];
    accentColor?: string;
}

export interface FrameworkStep {
    id: number;
    number: number;
    title: string;
    description: string;
}

export interface CourseModule {
    id: number;
    moduleNumber: string;
    moduleName: string;
    description: string;
    keyTopics: string;
}

export interface ExamInfo {
    examCode: string;
    numberOfQuestions: string;
    duration: string;
    format: string;
    passingScore: string;
    delivery: string;
}

export interface CertificationInfo {
    validity: string;
    recognition: string;
    retakePolicy: string;
    examVoucher: string;
    proctoring: string;
    continuingEducation: string;
}

export interface CourseDetailsProps {
    // What You'll Learn tab data
    learnItems?: LearnItem[];

    // Learning Framework tab data
    frameworkSteps?: FrameworkStep[];

    // Course Outline tab data
    courseTitle?: string;
    courseModules?: CourseModule[];

    // Exam Details tab data
    examInfo?: ExamInfo;
    certificationInfo?: CertificationInfo;

    // Default active tab
    defaultTab?: "learn" | "framework" | "outline" | "exam";
}

// ============================================
// Default Colors for Learn Cards
// ============================================
const defaultColors = [
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#FF6B00", // Orange
    "#06B6D4", // Cyan
    "#64748B", // Slate
];

// ============================================
// Main Component
// ============================================
export default function CourseDetails({
    learnItems = [],
    frameworkSteps = [],
    courseTitle = "Course Outline",
    courseModules = [],
    examInfo,
    certificationInfo,
    defaultTab = "outline",
}: CourseDetailsProps) {
    const [activeTab, setActiveTab] = useState<string>(defaultTab);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(
        courseModules.length > 0 ? courseModules[0].id : null
    );

    const tabs = [
        { id: "learn", label: "What you'll learn" },
        { id: "framework", label: "Learning framework" },
        { id: "outline", label: "Course outline" },
        { id: "exam", label: "Exam details" },
    ];

    const handleAccordionClick = (id: number) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    // Don't render if no content at all
    const hasContent = learnItems.length > 0 || frameworkSteps.length > 0 ||
        courseModules.length > 0 || examInfo || certificationInfo;

    if (!hasContent) {
        return null;
    }

    return (
        <section className="course-details-section">
            <div className="container">
                <div className="course-details-layout">
                    {/* Tab Navigation */}
                    <div className="course-details-tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`course-details-tab ${activeTab === tab.id ? "active" : ""}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="course-details-content">
                        {/* What You'll Learn Panel */}
                        {activeTab === "learn" && (
                            <div className="tab-panel" id="learn-panel">
                                <div className="content-header">
                                    <h3>What You'll Learn</h3>
                                </div>
                                <div className="tab-panel-body">
                                    {learnItems.length > 0 ? (
                                        <div className="learn-grid-clean">
                                            {learnItems.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="learn-card-clean"
                                                    style={{
                                                        borderTopColor: item.accentColor || defaultColors[index % defaultColors.length],
                                                    }}
                                                >
                                                    <span className="learn-number">{item.number}</span>
                                                    <h4>{item.title}</h4>
                                                    <p>{item.description}</p>
                                                    {item.tags.length > 0 && (
                                                        <div className="learn-tags">
                                                            {item.tags.map((tag, tagIndex) => (
                                                                <span key={tagIndex}>{tag}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="no-content">No learning items available.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Learning Framework Panel */}
                        {activeTab === "framework" && (
                            <div className="tab-panel" id="framework-panel">
                                <div className="content-header">
                                    <h3>Learning Framework</h3>
                                </div>
                                <div className="tab-panel-body">
                                    {frameworkSteps.length > 0 ? (
                                        <div className="framework-timeline">
                                            {frameworkSteps.map((step) => (
                                                <div key={step.id} className="timeline-step">
                                                    <div className="timeline-number">{step.number}</div>
                                                    <div className="timeline-content">
                                                        <h4>{step.title}</h4>
                                                        <p>{step.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="no-content">No framework steps available.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Course Outline Panel */}
                        {activeTab === "outline" && (
                            <div className="tab-panel" id="outline-panel">
                                <div className="content-header">
                                    <h3>{courseTitle}</h3>
                                </div>
                                <div className="accordion">
                                    {courseModules.length > 0 ? (
                                        courseModules.map((module) => (
                                            <div
                                                key={module.id}
                                                className={`accordion-item ${activeAccordion === module.id ? "active" : ""}`}
                                            >
                                                <div
                                                    className="accordion-header"
                                                    onClick={() => handleAccordionClick(module.id)}
                                                >
                                                    <div className="accordion-title">
                                                        <span className="module-number">{module.moduleNumber}</span>
                                                        <span className="module-name">{module.moduleName}</span>
                                                    </div>
                                                    <span className="accordion-toggle">+</span>
                                                </div>
                                                <div className="accordion-body">
                                                    <p>{module.description}</p>
                                                    {module.keyTopics && (
                                                        <p className="topics">
                                                            <strong>Key Topics:</strong> {module.keyTopics}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-content">No course modules available.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Exam Details Panel */}
                        {activeTab === "exam" && (
                            <div className="tab-panel" id="exam-panel">
                                <div className="content-header">
                                    <h3>Exam Details</h3>
                                </div>
                                <div className="tab-panel-body">
                                    <div className="exam-details-grid">
                                        {/* Exam Information Card */}
                                        {examInfo && (
                                            <div className="exam-detail-card">
                                                <h4>Exam Information</h4>
                                                <ul className="exam-info-list">
                                                    <li><strong>Exam Code:</strong> {examInfo.examCode}</li>
                                                    <li><strong>Number of Questions:</strong> {examInfo.numberOfQuestions}</li>
                                                    <li><strong>Duration:</strong> {examInfo.duration}</li>
                                                    <li><strong>Format:</strong> {examInfo.format}</li>
                                                    <li><strong>Passing Score:</strong> {examInfo.passingScore}</li>
                                                    <li><strong>Delivery:</strong> {examInfo.delivery}</li>
                                                </ul>
                                            </div>
                                        )}

                                        {/* Certification Details Card */}
                                        {certificationInfo && (
                                            <div className="exam-detail-card">
                                                <h4>Certification Details</h4>
                                                <ul className="exam-info-list">
                                                    <li><strong>Validity:</strong> {certificationInfo.validity}</li>
                                                    <li><strong>Recognition:</strong> {certificationInfo.recognition}</li>
                                                    <li><strong>Retake Policy:</strong> {certificationInfo.retakePolicy}</li>
                                                    <li><strong>Exam Voucher:</strong> {certificationInfo.examVoucher}</li>
                                                    <li><strong>Proctoring:</strong> {certificationInfo.proctoring}</li>
                                                    <li><strong>Continuing Education:</strong> {certificationInfo.continuingEducation}</li>
                                                </ul>
                                            </div>
                                        )}

                                        {!examInfo && !certificationInfo && (
                                            <p className="no-content">No exam details available.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
