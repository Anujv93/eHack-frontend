'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const programs = [
    {
        name: "Masterclass",
        highlight: false,
        details: {
            startDate: "5th of Every Month",
            duration: "4 Months",
            mode: "Classroom + Live Online",
            hours: "100+ Hours",
            membership: "6 Months Membership",
            certifications: "3 Global Certifications"
        }
    },
    {
        name: "Graduate",
        highlight: true,
        details: {
            startDate: "5th of Every Month",
            duration: "7-9 Months",
            mode: "Classroom + Live Online",
            hours: "200+ Hours",
            membership: "2 Years",
            certifications: "2 Global Certifications"
        }
    },
    {
        name: "Masters",
        highlight: false,
        details: {
            startDate: "5th of Every Month",
            duration: "9-12 Months",
            mode: "Classroom + Live Online",
            hours: "300+ Hours",
            membership: "2 Years Support",
            certifications: "6 Global Certifications"
        }
    }
];

const rows = [
    { label: "Start Date", key: "startDate" },
    { label: "Duration", key: "duration" },
    { label: "Mode", key: "mode" },
    { label: "Total Hours", key: "hours" },
    { label: "Membership", key: "membership" },
    { label: "Global Certification", key: "certifications" },
];

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            <div className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-[#1f2937] mb-2">Enquire Now</h3>
                    <p className="text-gray-500 text-sm">Get detailed counseling for your career path.</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 transition-all font-medium text-[#1f2937]"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address *"
                            required
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 transition-all font-medium text-[#1f2937]"
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            placeholder="Phone Number *"
                            required
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 transition-all font-medium text-[#1f2937]"
                        />
                    </div>
                    <button className="w-full bg-[#ff6b00] text-white rounded-xl py-4 font-bold shadow-lg shadow-[#ff6b00]/20 hover:bg-[#e66000] hover:shadow-xl hover:shadow-[#ff6b00]/30 transition-all transform hover:-translate-y-0.5">
                        Submit Enquiry
                    </button>
                </form>
            </div>
        </div>
    );
};

export default function ProgramDetailsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(tableRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: tableRef.current,
                    start: "top 85%"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-10 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-12">
                    <span className="text-[#ff6b00] font-bold tracking-widest uppercase mb-4 text-sm md:text-base block">
                        Compare Programs
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-[#1f2937]">
                        Choose Your <span className="text-[#ff6b00]">Path</span>
                    </h3>
                    <p className="text-[#1f2937] text-lg md:text-xl max-w-2xl mx-auto">
                        Detailed breakdown of our elite cybersecurity programs to help you decide.
                    </p>
                </div>

                <div ref={tableRef} className="overflow-hidden bg-white rounded-3xl shadow-xl border-2 border-[#ff6b00]">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-6 text-left w-1/4 bg-gray-50 border-b border-r border-gray-300 border-gray-100">
                                        <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">Features</span>
                                    </th>
                                    {programs.map((prog, idx) => (
                                        <th key={idx} className={`p-6 text-center w-1/4 border-b border-r border-gray-300 last:border-r-0 border-gray-100 ${prog.highlight ? 'bg-[#ff6b00]/5' : 'bg-white'}`}>
                                            <h4 className={`text-xl font-black ${prog.highlight ? 'text-[#ff6b00]' : 'text-[#1f2937]'}`}>
                                                {prog.name}
                                            </h4>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-5 border-b border-r border-gray-300 border-gray-100 font-bold text-[#1f2937] text-sm md:text-base pl-8">
                                            {row.label}
                                        </td>
                                        {programs.map((prog, pIdx) => (
                                            <td key={pIdx} className={`p-5 text-center border-b border-r border-gray-300 last:border-r-0 border-gray-100 text-gray-600 font-medium ${prog.highlight ? 'bg-[#ff6b00]/5' : ''}`}>
                                                {prog.details[row.key as keyof typeof prog.details]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {/* Common Features Rows */}
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-5 border-b border-r border-gray-300 border-gray-100 font-bold text-[#1f2937] text-sm md:text-base pl-8">
                                        Placement Support
                                    </td>
                                    {programs.map((prog, idx) => (
                                        <td key={idx} className={`p-5 text-center border-b border-r border-gray-300 last:border-r-0 border-gray-100 text-gray-600 font-medium ${prog.highlight ? 'bg-[#ff6b00]/5' : ''}`}>
                                            <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            </span>
                                            <span className="ml-2">Included</span>
                                        </td>
                                    ))}
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-5 border-b border-r border-gray-300 border-gray-100 font-bold text-[#1f2937] text-sm md:text-base pl-8">
                                        Internship
                                    </td>
                                    {programs.map((prog, idx) => (
                                        <td key={idx} className={`p-5 text-center border-b border-r border-gray-300 last:border-r-0 border-gray-100 text-gray-600 font-medium ${prog.highlight ? 'bg-[#ff6b00]/5' : ''}`}>
                                            <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            </span>
                                            <span className="ml-2">Included</span>
                                        </td>
                                    ))}
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-5 border-b border-r border-gray-300 border-gray-100 font-bold text-[#1f2937] text-sm md:text-base pl-8">
                                        24/7 Labs
                                    </td>
                                    {programs.map((prog, idx) => (
                                        <td key={idx} className={`p-5 text-center border-b border-r border-gray-300 last:border-r-0 border-gray-100 text-gray-600 font-medium ${prog.highlight ? 'bg-[#ff6b00]/5' : ''}`}>
                                            <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            </span>
                                            <span className="ml-2">Included</span>
                                        </td>
                                    ))}
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-5 border-b border-r border-gray-300 border-gray-100 font-bold text-[#1f2937] text-sm md:text-base pl-8">
                                        EMI Options
                                    </td>
                                    {programs.map((prog, idx) => (
                                        <td key={idx} className={`p-5 text-center border-b border-r border-gray-300 last:border-r-0 border-gray-100 text-gray-600 font-medium ${prog.highlight ? 'bg-[#ff6b00]/5' : ''}`}>
                                            <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            </span>
                                            <span className="ml-2">Available</span>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Schedule Footer */}
                    <div className="bg-gray-900 text-white p-6 text-center">
                        <h5 className="font-bold uppercase tracking-widest text-[#ff6b00] text-sm mb-3">Schedule Options</h5>
                        <p className="md:text-lg font-medium">
                            <span className="block md:inline mb-2 md:mb-0">Weekday (Tue-Fri): <span className="text-white font-bold">2 hrs/day</span></span>
                            <span className="hidden md:inline mx-4 text-gray-600">|</span>
                            <span className="block md:inline">Weekend (Sat-Sun): <span className="text-white font-bold">4 hrs/day</span></span>
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-3 bg-[#ff6b00] text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#ff6b00]/20 hover:bg-[#e66000] hover:scale-105 transition-all group"
                    >
                        ENQUIRE NOW
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                    <p className="mt-4 text-gray-500 text-sm font-medium">
                        Speak to our career counselors starting at <span className="text-[#1f2937] font-bold">₹0</span>
                    </p>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </section>
    );
}
