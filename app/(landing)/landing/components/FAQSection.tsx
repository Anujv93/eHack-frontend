'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "Is this program suitable for beginners with no IT background?",
        answer: "Absolutely. Our curriculum is engineered to take you from zero to hero. We start with fundamental networking and Linux concepts before moving to advanced cybersecurity tactics. 40% of our successful graduates come from non-IT backgrounds."
    },
    {
        question: "How does the 'Placement Support' actually work?",
        answer: "It's not just a job board; it's a partnership. From Day 1, we work on your personal brand. You get dedicated resume reviews, unlimited mock interviews with industry experts, and direct referrals to our network of 500+ hiring partners. We don't stop until you sign an offer letter."
    },
    {
        question: "What makes eHack Academy different from other courses?",
        answer: "Most courses teach you 'theory'. We train you for the 'job'. You will spend 80% of your time in our 24/7 cloud labs, simulating real-world cyber attacks. You don't just watch videos; you hack real targets in a safe environment. Plus, our instructors are active red-teamers, not just academic teachers."
    },
    {
        question: "Can I balance this with my full-time job or college?",
        answer: "Yes. We offer flexible batches including weekend-only options and evening slots. All live sessions are recorded for your review. Our labs are accessible 24/7, so you can practice whenever it fits your schedule. Our success team helps you build a study plan that works for you."
    },
    {
        question: "Are the certifications globally recognized?",
        answer: "Yes. You will be prepared for industry-standard certifications like CEH (Certified Ethical Hacker), OSCP, and more depending on your track. We also provide our own elite certification upon completion, which is recognized by our hiring partners for its practical rigor."
    },
    {
        question: "What is the starting salary I can expect?",
        answer: "While it varies by location and prior experience, our graduates typically start between ₹5 LPA to ₹12 LPA. With the right skill set—which we help you build—cybersecurity offers one of the fastest salary growth trajectories in tech."
    }
];

export default function FAQSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [questionModalOpen, setQuestionModalOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".faq-item",
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section ref={sectionRef} className="py-24 bg-[#fffaf5] relative overflow-hidden">
            {/* Restored Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff6b00]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="text-center mb-20">
                    <span className="text-[#ff6b00] font-black tracking-[0.2em] uppercase mb-4 text-sm md:text-base block">
                        Got Questions?
                    </span>
                    {/* Restored Heading Style */}
                    <h2 className="text-4xl md:text-6xl font-black text-[#1f2937] leading-tight mb-8">
                        Frequently Asked <span className="text-[#ff6b00] relative inline-block">
                            Questions
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#ff6b00] opacity-30" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C2.00025 6.99997 64.9198 3.84232 121.5 2C178.08 0.157675 198 6.99997 198 6.99997" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                        </span>
                    </h2>
                    <p className="text-[#1f2937] text-xl font-medium max-w-2xl mx-auto">
                        Everything you need to know about starting your high-paying career in cybersecurity.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item bg-white rounded-2xl border-2 transition-all duration-200 ${openIndex === index
                                ? 'border-[#ff6b00] shadow-lg shadow-[#ff6b00]/10'
                                : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                                }`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
                            >
                                <span className={`text-lg md:text-xl font-bold pr-8 transition-colors ${openIndex === index ? 'text-[#ff6b00]' : 'text-gray-900 group-hover:text-black'}`}>
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${openIndex === index
                                    ? 'bg-[#ff6b00] border-[#ff6b00] text-white rotate-180'
                                    : 'bg-gray-50 border-gray-200 text-gray-400 rotate-0 group-hover:border-[#ff6b00] group-hover:text-[#ff6b00]'
                                    }`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 md:p-8 pt-0 text-[#1f2937] text-base md:text-lg leading-relaxed font-medium">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-[#1f2937] font-medium mb-6">
                        Still have a specific query? We're here to help.
                    </p>
                    <button
                        onClick={() => setQuestionModalOpen(true)}
                        className="inline-flex items-center gap-2 text-[#ff6b00] font-black uppercase tracking-wider hover:text-[#e66000] transition-colors border-b-2 border-[#ff6b00]/20 hover:border-[#ff6b00] pb-1"
                    >
                        Ask Your Own Question
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                </div>

                <QuestionModal isOpen={questionModalOpen} onClose={() => setQuestionModalOpen(false)} />
            </div>
        </section>
    );
}

const QuestionModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
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

                <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-[#1f2937] mb-2">Ask Your Question</h3>
                    <p className="text-gray-500 text-sm">We'll answer it via WhatsApp or Call.</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name <span className="text-[#ff6b00]">*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            required
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 transition-all font-medium text-[#1f2937]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Question</label>
                        <textarea
                            rows={3}
                            placeholder="e.g., Do you offer job guarantee for freshers?"
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 transition-all font-medium text-[#1f2937] resize-none"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number <span className="text-[#ff6b00]">*</span></label>
                        <input
                            type="tel"
                            placeholder="Enter your registered number"
                            required
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 transition-all font-medium text-[#1f2937]"
                        />
                    </div>
                    <button className="w-full bg-[#ff6b00] text-white rounded-xl py-4 font-bold shadow-lg shadow-[#ff6b00]/20 hover:bg-[#e66000] hover:shadow-xl hover:shadow-[#ff6b00]/30 transition-all transform hover:-translate-y-0.5">
                        Submit Question
                    </button>
                    <p className="text-[10px] text-center text-gray-400 font-medium">
                        Your details are safe with us. No spam.
                    </p>
                </form>
            </div>
        </div>
    );
};
