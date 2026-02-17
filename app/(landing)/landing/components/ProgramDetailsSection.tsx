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
            certifications: "3 Global Certifications",
            ecCouncilCerts: "CEH v13, CEH Practicals, CEH Masters",
            ehackCerts: "Nil",
            careerTraining: "Nil"
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
            certifications: "2 Global Certifications",
            ecCouncilCerts: "CSCU, CND v3",
            ehackCerts: "Cyber Security Fundamentals, Ethical Hacking, Penetration Testing / Digital Forensics, OWASP 10",
            careerTraining: "Personality Development & Soft Skills"
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
            certifications: "6 Global Certifications",
            ecCouncilCerts: "CSCU, CND v3, CEH v13, Cpent v2+LPT, CHFI v11",
            ehackCerts: "Cyber Security Fundamentals, OWASP 10",
            careerTraining: "Personality Development & Soft Skills"
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
    { label: "EC Council Certifications", key: "ecCouncilCerts" },
    { label: "Ehack Academy Certifications", key: "ehackCerts" },
    { label: "Career Development Training", key: "careerTraining" },
];

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [error, setError] = React.useState('');

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setIsSubmitted(false);
            setError('');
            setFormData({ fullName: '', email: '', phone: '' });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.type === 'tel' ? 'phone' : e.target.type === 'email' ? 'email' : 'fullName']: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.phone) {
            setError('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/zoho/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.fullName,
                    lastName: '-',
                    email: formData.email,
                    phone: formData.phone,
                    city: '',
                    totalAmount: 0,
                    inquiryName: `Website - ${formData.fullName} - Choose Your Path`,
                    leadSource: 'Website Landing Page',
                    courses: [{
                        name: 'Choose Your Path Inquiry',
                        code: 'choose-your-path',
                        category: 'General',
                        price: 0
                    }],
                    message: 'Inquiry from Choose Your Path Section',
                    agreeWhatsApp: true,
                    pipeline: 'Leads Pipeline Standard',
                    stage: 'New Inquiry',
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Submission failed:', errorData);
                throw new Error(errorData.details || 'Failed to submit');
            }

            setIsSubmitted(true);
        } catch (err: any) {
            console.error('Error submitting form:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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

                {isSubmitted ? (
                    <div className="text-center py-8 animate-fadeIn">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                        <p className="text-gray-600 mb-6">We have received your enquiry. Our team will contact you shortly to guide you on your path.</p>
                        <button
                            onClick={onClose}
                            className="w-full bg-[#ff6b00] text-white rounded-xl py-3 font-bold shadow-lg hover:bg-[#e66000] transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-black text-[#1f2937] mb-2">Enquire Now</h3>
                            <p className="text-gray-500 text-sm">Get detailed counseling for your career path.</p>
                        </div>

                        {error && <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 text-center">{error}</div>}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 transition-all font-medium text-[#1f2937]"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    required
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 transition-all font-medium text-[#1f2937]"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Phone Number *"
                                    required
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 transition-all font-medium text-[#1f2937]"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#ff6b00] text-white rounded-xl py-4 font-bold shadow-lg shadow-[#ff6b00]/20 hover:bg-[#e66000] hover:shadow-xl hover:shadow-[#ff6b00]/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                            </button>
                        </form>
                    </>
                )}
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
                y: 10,
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: tableRef.current,
                    start: "top 98%"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-6 sm:py-10 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-12">
                    <span className="text-[#ff6b00] font-bold tracking-widest uppercase mb-4 text-sm md:text-base block">
                        Compare Programs
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight text-[#1f2937]">
                        Choose Your <span className="text-[#ff6b00]">Path</span>
                    </h3>
                    <p className="text-[#1f2937] text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                        Detailed breakdown of our elite cybersecurity programs to help you decide.
                    </p>
                </div>

                <div ref={tableRef}>
                    {/* ===== MOBILE: Stacked Program Cards (visible below md) ===== */}
                    <div className="md:hidden space-y-4">
                        {programs.map((prog, idx) => (
                            <div key={idx} className={`rounded-2xl shadow-lg border-2 overflow-hidden ${prog.highlight ? 'border-[#ff6b00]' : 'border-gray-200'}`}>
                                {/* Card Header */}
                                <div className={`p-4 text-center ${prog.highlight ? 'bg-[#ff6b00] text-white' : 'bg-gray-50 text-[#1f2937]'}`}>
                                    {prog.highlight && (
                                        <span className="inline-block bg-white text-[#ff6b00] text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full mb-2">Most Popular</span>
                                    )}
                                    <h4 className="text-xl font-black">{prog.name}</h4>
                                </div>
                                {/* Card Body - Feature Rows */}
                                <div className="divide-y divide-gray-100">
                                    {rows.map((row, rIdx) => (
                                        <div key={rIdx} className="flex justify-between items-start px-4 py-3">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide w-[40%] shrink-0">{row.label}</span>
                                            <span className="text-sm font-medium text-[#1f2937] text-right">{prog.details[row.key as keyof typeof prog.details]}</span>
                                        </div>
                                    ))}
                                    {/* Common features */}
                                    {["Placement Support", "Internship", "24/7 Labs", "EMI Options"].map((feature, fIdx) => (
                                        <div key={fIdx} className="flex justify-between items-center px-4 py-3">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide w-[40%] shrink-0">{feature}</span>
                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                                                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                </span>
                                                {fIdx === 3 ? 'Available' : 'Included'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Mobile Schedule Footer */}
                        <div className="bg-gray-900 text-white p-5 rounded-2xl text-center">
                            <h5 className="font-bold uppercase tracking-widest text-[#ff6b00] text-xs mb-2">Schedule Options</h5>
                            <p className="text-sm font-medium">
                                <span className="block mb-1">Weekday (Tue-Fri): <span className="font-bold">2 hrs/day</span></span>
                                <span className="block">Weekend (Sat-Sun): <span className="font-bold">4 hrs/day</span></span>
                            </p>
                        </div>
                    </div>

                    {/* ===== DESKTOP: Original Comparison Table (visible md+) ===== */}
                    <div className="hidden md:block overflow-hidden bg-white rounded-3xl shadow-xl border-2 border-[#ff6b00]">
                        <table className="w-full border-collapse">
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
                                        <td className="p-5 border-b border-r border-gray-300 border-gray-100 font-bold text-[#1f2937] text-base pl-8">
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
                                {[
                                    { label: "Placement Support", value: "Included" },
                                    { label: "Internship", value: "Included" },
                                    { label: "24/7 Labs", value: "Included" },
                                    { label: "EMI Options", value: "Available" },
                                ].map((common, cIdx) => (
                                    <tr key={cIdx} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-5 border-b border-r border-gray-300 border-gray-100 font-bold text-[#1f2937] text-base pl-8">
                                            {common.label}
                                        </td>
                                        {programs.map((prog, idx) => (
                                            <td key={idx} className={`p-5 text-center border-b border-r border-gray-300 last:border-r-0 border-gray-100 text-gray-600 font-medium ${prog.highlight ? 'bg-[#ff6b00]/5' : ''}`}>
                                                <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                </span>
                                                <span className="ml-2">{common.value}</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Schedule Footer */}
                        <div className="bg-gray-900 text-white p-6 text-center">
                            <h5 className="font-bold uppercase tracking-widest text-[#ff6b00] text-sm mb-3">Schedule Options</h5>
                            <p className="text-lg font-medium">
                                <span>Weekday (Tue-Fri): <span className="text-white font-bold">2 hrs/day</span></span>
                                <span className="mx-4 text-gray-600">|</span>
                                <span>Weekend (Sat-Sun): <span className="text-white font-bold">4 hrs/day</span></span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 sm:gap-3 bg-[#ff6b00] text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-[#ff6b00]/20 hover:bg-[#e66000] hover:scale-105 transition-all group"
                    >
                        ENQUIRE NOW
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                    <p className="mt-4 text-gray-600 text-lg sm:text-xl font-semibold">
                        Speak to our career counselors starting at <span className="text-[#1f2937] font-bold text-xl sm:text-2xl">₹0</span>
                    </p>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </section>
    );
}
