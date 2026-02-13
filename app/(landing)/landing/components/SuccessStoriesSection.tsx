'use client';

import React from 'react';
import SuccessCard from './SuccessCard';

const successStories = [
    {
        name: "Rahul Sharma",
        role: "Associate Security Analyst",
        company: "Deloitte",
        package: "8.5 LPA",
        prevRole: "B.Com Graduate",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "Priya Patel",
        role: "Junior Pentester",
        company: "Infosys",
        package: "12 LPA",
        prevRole: "IT Support Assistant",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        name: "Ankit Verma",
        role: "SOC Lead",
        company: "HCL Tech",
        package: "15.5 LPA",
        prevRole: "Unemployed Engineer",
        image: "https://randomuser.me/api/portraits/men/46.jpg"
    }
];

const SuccessStoriesSection = () => {
    return (
        <section className="py-20 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1300px]">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-[#ff6b00] font-bold tracking-widest uppercase mb-4 text-sm">Alumni Impact</h2>
                    <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-gray-900">
                        Real <span className="text-[#ff6b00]">Transformations</span>, Real Results
                    </h3>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                        See how our alumni made the jump from non-technical backgrounds to high-paying cybersecurity careers in record time.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {successStories.map((story, index) => (
                        <SuccessCard key={index} data={story} />
                    ))}
                </div>

                {/* Trust Footer */}
                <div className="mt-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-6 py-3 shadow-sm">
                        <span className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                    <img src={`https://randomuser.me/api/portraits/thumb/men/${i + 10}.jpg`} alt="avatar" />
                                </div>
                            ))}
                        </span>
                        <span className="ml-2 text-sm font-bold text-gray-700">
                            +500 more alumni placed in top MNCs
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuccessStoriesSection;
