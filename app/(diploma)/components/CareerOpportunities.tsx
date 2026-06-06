'use client';
import React, { useState } from 'react';

const careerRoles = [
    {
        title: "Information Security Analyst",
        description: "An information security analyst safeguards an organization's digital assets and sensitive information from cyber threats and data breaches. They assess IT infrastructure and develop strategies like firewalls, encryption, and authentication to ensure confidentiality and prevent potential threats.",
        companies: [
            { name: "Accenture", url: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
            { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
            { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
            { name: "Ericsson", url: "https://www.google.com/s2/favicons?domain=ericsson.com&sz=128" },
            { name: "Infosys", url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
            { name: "Cognizant", url: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg" }
        ],
        salary: { min: "₹7L", average: "₹9.5L", max: "₹12L", minHeight: "40%", avgHeight: "85%", maxHeight: "55%" }
    },
    {
        title: "Ethical Hacker / Pen Tester",
        description: "An ethical hacker intentionally probes networks and applications to find vulnerabilities before malicious hackers do. They simulate cyberattacks, document security flaws, and provide actionable remediation strategies to fortify the organization's defense mechanisms.",
        companies: [
            { name: "Wipro", url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
            { name: "Cisco", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" },
            { name: "Tech Mahindra", url: "https://www.google.com/s2/favicons?domain=techmahindra.com&sz=128" },
            { name: "Oracle", url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
            { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
            { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" }
        ],
        salary: { min: "₹8L", average: "₹12L", max: "₹18L", minHeight: "45%", avgHeight: "90%", maxHeight: "60%" }
    },
    {
        title: "Security Architect",
        description: "A security architect designs, builds, and maintains a company's computer and network security infrastructure. They anticipate potential threats and design robust architectures that can withstand sophisticated cyber attacks while ensuring compliance with security standards.",
        companies: [
            { name: "Deloitte", url: "https://www.google.com/s2/favicons?domain=deloitte.com&sz=128" },
            { name: "Capgemini", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg" },
            { name: "EY", url: "https://upload.wikimedia.org/wikipedia/commons/3/34/EY_logo_2019.svg" },
            { name: "PwC", url: "https://upload.wikimedia.org/wikipedia/commons/0/05/PricewaterhouseCoopers_Logo.svg" },
            { name: "CrowdStrike", url: "https://www.google.com/s2/favicons?domain=crowdstrike.com&sz=128" },
            { name: "Fortinet", url: "https://www.google.com/s2/favicons?domain=fortinet.com&sz=128" }
        ],
        salary: { min: "₹15L", average: "₹22L", max: "₹35L+", minHeight: "50%", avgHeight: "95%", maxHeight: "65%" }
    }
];

const CareerOpportunities = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="w-full bg-slate-50 pt-10 pb-6 lg:pt-14 lg:pb-8 relative overflow-hidden font-montserrat border-t border-gray-200">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="w-full text-center mb-10 sm:mb-14">
                    <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b162c] mb-6 leading-tight">
                        Career Opportunities After <br className="hidden sm:block" />
                        <span className="text-[#ff6b00]">Cybersecurity Training</span>
                    </h2>
                </div>

                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                    
                    {/* Tabs */}
                    <div className="flex flex-col sm:flex-row w-full border-b border-gray-100 bg-gray-50/50">
                        {careerRoles.map((role, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(idx)}
                                className={`flex-1 py-4 sm:py-6 px-4 text-center sm:text-center font-semibold text-sm sm:text-base transition-all duration-300 relative ${
                                    activeTab === idx 
                                        ? 'text-[#ff6b00] bg-white' 
                                        : 'text-gray-500 hover:text-[#0b162c] hover:bg-gray-50'
                                }`}
                            >
                                {role.title}
                                {activeTab === idx && (
                                    <div className="absolute top-0 left-0 w-1 sm:w-full h-full sm:h-1 bg-[#ff6b00]"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-10 lg:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            
                            {/* Left Side: Description and Companies */}
                            <div className="flex flex-col animate-fadeIn">
                                <p className="font-montserrat font-medium text-gray-700 text-sm sm:text-base leading-relaxed mb-10 text-left">
                                    {careerRoles[activeTab].description}
                                </p>
                                
                                <div>
                                    <h4 className="font-semibold text-[#0b162c] text-base mb-6 text-center sm:text-left">Hiring Companies</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 items-center justify-items-center sm:justify-items-start">
                                        {careerRoles[activeTab].companies.map((company, idx) => (
                                            <div key={idx} className="h-10 sm:h-12 w-full flex items-center justify-center sm:justify-start hover:scale-105 transition-transform duration-300">
                                                <img 
                                                    src={company.url} 
                                                    alt={company.name} 
                                                    className="max-h-full max-w-[90px] sm:max-w-[100px] object-contain"
                                                    title={company.name}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Salary Chart */}
                            <div className="flex flex-col items-center justify-center pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-16 h-full min-h-[300px]">
                                <h4 className="font-semibold text-gray-600 text-base mb-12">Average Salary</h4>
                                
                                <div className="flex items-end justify-center gap-4 sm:gap-10 h-48 sm:h-56 w-full max-w-sm mt-4 mx-auto">
                                    
                                    {/* Min Bar */}
                                    <div className="flex flex-col items-center justify-end h-full w-14 sm:w-16">
                                        <span className="mb-3 text-sm font-bold text-gray-600">{careerRoles[activeTab].salary.min}</span>
                                        <div className="w-full bg-[#ff6b00]/20 rounded-t-lg transition-all duration-500 ease-out" style={{ height: careerRoles[activeTab].salary.minHeight }}></div>
                                        <span className="mt-3 text-xs font-semibold text-gray-500">Min</span>
                                    </div>
                                    
                                    {/* Average Bar */}
                                    <div className="flex flex-col items-center justify-end h-full w-20 sm:w-24 relative group">
                                        <div className="absolute -top-12 bg-[#0b162c] px-3 py-1.5 rounded-lg shadow-md flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-white font-black text-lg">{careerRoles[activeTab].salary.average}</span>
                                        </div>
                                        <span className="mb-3 text-base sm:text-lg font-black text-[#ff6b00] group-hover:opacity-0 transition-opacity duration-300">{careerRoles[activeTab].salary.average}</span>
                                        <div className="w-full bg-[#ff6b00] rounded-t-lg shadow-lg transition-all duration-500 ease-out relative" style={{ height: careerRoles[activeTab].salary.avgHeight }}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-t-lg pointer-events-none"></div>
                                        </div>
                                        <span className="mt-3 text-sm font-bold text-[#ff6b00]">Average</span>
                                    </div>

                                    {/* Max Bar */}
                                    <div className="flex flex-col items-center justify-end h-full w-14 sm:w-16">
                                        <span className="mb-3 text-sm font-bold text-gray-600">{careerRoles[activeTab].salary.max}</span>
                                        <div className="w-full bg-[#ff6b00]/20 rounded-t-lg transition-all duration-500 ease-out" style={{ height: careerRoles[activeTab].salary.maxHeight }}></div>
                                        <span className="mt-3 text-xs font-semibold text-gray-500">Max</span>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default CareerOpportunities;
