'use client';
import React, { useState } from 'react';

const faqs = [
    {
        question: "Do I need prior coding or hacking experience to join?",
        answer: "Not at all. Our Advanced Diploma is designed to take you from absolute scratch to an industry-ready professional. We cover all the fundamental networking, Linux, and programming concepts before diving into advanced cybersecurity methodologies."
    },
    {
        question: "Will I get placement assistance after completing the program?",
        answer: "Yes. eHack Academy provides premium, intensive placement aid. With over 10+ years of deep industry connections in Bangalore, we actively help you secure interviews and land high-paying roles as SOC Analysts, Pen-Testers, and Security Engineers."
    },
    {
        question: "What is the duration and structure of the course?",
        answer: "The program spans 6 months of rigorous, 100% practical training. You will engage in live defensive labs, simulated cyber attacks, and real-world project builds rather than sitting through dry, theoretical lectures."
    },
    {
        question: "What certifications will this course prepare me for?",
        answer: "Our curriculum is heavily aligned with global industry standards. You will be fully equipped to clear major global certifications like CEH (Certified Ethical Hacker), CompTIA Security+, and grasp OSCP foundational concepts."
    },
    {
        question: "Is this program suitable for working professionals?",
        answer: "Absolutely. Many of our students are working IT professionals looking to pivot into the high-growth cybersecurity sector. We offer flexible batch timings (including dedicated weekend batches) to seamlessly accommodate your current job schedule."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-slate-50 py-16 sm:py-20 md:py-24 relative overflow-hidden font-inter border-t border-gray-200">
            {/* Background Accent */}
            <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] bg-orange-100 opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-12 items-stretch">
                    
                    {/* Left Column: Heading & CTA */}
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-32 self-start text-center lg:text-left">
                        <div className="inline-block bg-[#ff6b00]/10 border border-[#ff6b00]/20 text-[#ff6b00] px-4 py-2 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-widest mb-4 sm:mb-6">
                            Got Questions?
                        </div>
                        <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b162c] mb-4 sm:mb-6 leading-[1.2] lg:leading-[1.1] tracking-tight">
                            Frequently Asked <br className="hidden sm:block" />
                            <span className="text-[#ff6b00]">Questions</span>
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0">
                            Everything you need to know about the Advanced Diploma, our curriculum, and how we engineer your career.
                        </p>
                        
                        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow text-left">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                            
                            <h4 className="font-montserrat font-bold text-[#0b162c] text-xl mb-3 relative z-10">Still have questions?</h4>
                            <p className="text-gray-500 text-sm mb-8 leading-relaxed relative z-10">Can't find the answer you're looking for? Chat with our friendly team directly on WhatsApp.</p>
                            
                            <a href="https://api.whatsapp.com/send/?phone=919886035330&text=Hi%20EHACK%20Academy%2C%20I%27d%20like%20to%20inquire%20about%20the%20%22Graduate%20cybersecurity%22%20program.%20Can%20you%20help%20me%20with%20the%20admission%20process%20and%20counselor%20details%3F&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full px-6 py-4 bg-[#ff6b00] text-white font-bold rounded-xl hover:bg-[#e65c00] transition-colors shadow-lg hover:shadow-xl group/btn relative z-10">
                                Chat on WhatsApp
                                <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <div 
                                    key={idx} 
                                    className={`bg-white border transition-all duration-300 rounded-2xl overflow-hidden ${isOpen ? 'border-[#ff6b00] shadow-[0_8px_30px_rgb(255,107,0,0.08)]' : 'border-gray-100 shadow-sm hover:border-gray-300'}`}
                                >
                                    <button 
                                        onClick={() => toggleFAQ(idx)}
                                        className="w-full flex items-center justify-between p-5 sm:p-6 md:p-8 text-left focus:outline-none group"
                                    >
                                        <h3 className={`font-montserrat font-bold text-base sm:text-lg md:text-xl pr-4 sm:pr-8 transition-colors duration-300 ${isOpen ? 'text-[#ff6b00]' : 'text-[#0b162c] group-hover:text-[#ff6b00]'}`}>
                                            {faq.question}
                                        </h3>
                                        <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#ff6b00] text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-orange-50 group-hover:text-[#ff6b00]'}`}>
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                    
                                    <div 
                                        className="grid transition-all duration-300 ease-in-out"
                                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-5 sm:p-6 md:p-8 pt-0 relative">
                                                <div className="absolute top-0 left-5 sm:left-8 right-5 sm:right-8 h-px bg-gray-100"></div>
                                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg mt-4 sm:mt-6">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQ;
