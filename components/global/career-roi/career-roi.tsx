"use client";

import "./career-roi.css";

// Certificate-specific data sets
const careerDataSets: Record<string, CareerROIData> = {
    "ceh": {
        title: "Certified Ethical Hacker",
        salaryBefore: 600000,
        salaryAfter: 1500000,
        increasePercent: 150,
        jobOpenings: "12,000+",
        companiesHiring: "850+",
        demandGrowth: "45%",
        avgTimeToJob: "3-6 months",
        topRoles: ["Security Analyst", "Penetration Tester", "Security Engineer"],
        industryDemand: 92
    },
    "chfi": {
        title: "Computer Hacking Forensic Investigator",
        salaryBefore: 700000,
        salaryAfter: 1800000,
        increasePercent: 157,
        jobOpenings: "8,500+",
        companiesHiring: "620+",
        demandGrowth: "52%",
        avgTimeToJob: "2-4 months",
        topRoles: ["Forensic Analyst", "Incident Responder", "Cyber Investigator"],
        industryDemand: 88
    },
    "cpent": {
        title: "Certified Penetration Testing Professional",
        salaryBefore: 800000,
        salaryAfter: 2200000,
        increasePercent: 175,
        jobOpenings: "6,200+",
        companiesHiring: "480+",
        demandGrowth: "62%",
        avgTimeToJob: "1-3 months",
        topRoles: ["Penetration Tester", "Red Team Specialist", "Security Consultant"],
        industryDemand: 95
    },
    "ecsa": {
        title: "EC-Council Certified Security Analyst",
        salaryBefore: 750000,
        salaryAfter: 1700000,
        increasePercent: 127,
        jobOpenings: "7,800+",
        companiesHiring: "550+",
        demandGrowth: "38%",
        avgTimeToJob: "3-5 months",
        topRoles: ["Security Analyst", "SOC Analyst", "Vulnerability Analyst"],
        industryDemand: 85
    },
    "default": {
        title: "Cybersecurity Certification",
        salaryBefore: 650000,
        salaryAfter: 1600000,
        increasePercent: 146,
        jobOpenings: "10,000+",
        companiesHiring: "700+",
        demandGrowth: "48%",
        avgTimeToJob: "2-5 months",
        topRoles: ["Security Professional", "Cyber Analyst", "IT Security Specialist"],
        industryDemand: 90
    }
};

interface CareerROIData {
    title: string;
    salaryBefore: number;
    salaryAfter: number;
    increasePercent: number;
    jobOpenings: string;
    companiesHiring: string;
    demandGrowth: string;
    avgTimeToJob: string;
    topRoles: string[];
    industryDemand: number;
}

interface CareerROIProps {
    certificateSlug: string;
}

function formatSalary(amount: number): string {
    if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
}

export default function CareerROI({ certificateSlug }: CareerROIProps) {
    const data = careerDataSets[certificateSlug.toLowerCase()] || careerDataSets["default"];

    // Calculate bar widths for visualization
    const maxSalary = data.salaryAfter * 1.1;
    const beforeWidth = (data.salaryBefore / maxSalary) * 100;
    const afterWidth = (data.salaryAfter / maxSalary) * 100;

    return (
        <section className="career-roi-section" id="career-roi">
            <div className="container">
                {/* Section Header */}
                <div className="career-roi-header">
                    <span className="career-roi-badge">Career Investment</span>
                    <h2 className="career-roi-title">
                        Your <span className="highlight-orange">Career ROI</span>
                    </h2>
                    <p className="career-roi-subtitle">
                        See how this certification can transform your earning potential
                    </p>
                </div>

                {/* Main Content Grid - 4 Equal Boxes */}
                <div className="career-roi-grid">
                    {/* Salary Comparison Card */}
                    <div className="roi-card">
                        <h3 className="roi-card-title">Salary Comparison</h3>

                        <div className="salary-comparison">
                            <div className="salary-bar-container">
                                <div className="salary-label">
                                    <span className="label-text">Before Certification</span>
                                    <span className="salary-value before">{formatSalary(data.salaryBefore)}</span>
                                </div>
                                <div className="salary-bar-track">
                                    <div
                                        className="salary-bar before-bar"
                                        style={{ width: `${beforeWidth}%` }}
                                    />
                                </div>
                            </div>

                            <div className="salary-bar-container">
                                <div className="salary-label">
                                    <span className="label-text">After Certification</span>
                                    <span className="salary-value after">{formatSalary(data.salaryAfter)}</span>
                                </div>
                                <div className="salary-bar-track">
                                    <div
                                        className="salary-bar after-bar"
                                        style={{ width: `${afterWidth}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="increase-badge">
                            <span className="increase-value">{data.increasePercent}%</span>
                            <span className="increase-text">Average Salary Increase</span>
                        </div>
                    </div>

                    {/* Industry Demand Card */}
                    <div className="roi-card">
                        <h3 className="roi-card-title">Industry Demand</h3>

                        <div className="demand-circle-container">
                            <svg className="demand-circle" viewBox="0 0 120 120">
                                <circle
                                    className="demand-circle-bg"
                                    cx="60"
                                    cy="60"
                                    r="52"
                                    fill="none"
                                    strokeWidth="12"
                                />
                                <circle
                                    className="demand-circle-progress"
                                    cx="60"
                                    cy="60"
                                    r="52"
                                    fill="none"
                                    strokeWidth="12"
                                    strokeDasharray={`${data.industryDemand * 3.27} 327`}
                                    transform="rotate(-90 60 60)"
                                />
                            </svg>
                            <div className="demand-circle-text">
                                <span className="demand-percent">{data.industryDemand}%</span>
                                <span className="demand-label">Demand Score</span>
                            </div>
                        </div>

                        <div className="demand-growth">
                            <span className="growth-value">{data.demandGrowth}</span>
                            <span className="growth-text">YoY Growth</span>
                        </div>
                    </div>

                    {/* Market Opportunities Card */}
                    <div className="roi-card">
                        <h3 className="roi-card-title">Market Opportunities</h3>

                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-value">{data.jobOpenings}</span>
                                <span className="stat-label">Job Openings</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{data.companiesHiring}</span>
                                <span className="stat-label">Companies Hiring</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{data.avgTimeToJob}</span>
                                <span className="stat-label">Avg. Time to Job</span>
                            </div>
                        </div>
                    </div>

                    {/* Top Career Paths Card */}
                    <div className="roi-card">
                        <h3 className="roi-card-title">Top Career Paths</h3>

                        <div className="roles-list">
                            {data.topRoles.map((role, index) => (
                                <div key={index} className="role-item">
                                    <span className="role-number">{index + 1}</span>
                                    <span className="role-name">{role}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
