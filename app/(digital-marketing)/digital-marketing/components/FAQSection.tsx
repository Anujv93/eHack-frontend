'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "What is an advanced digital marketing course?",
        answer: "An advanced digital marketing course goes beyond the basics to cover strategic planning, advanced SEO techniques, performance marketing, data analytics, and marketing automation tools. It is designed to equip you with the practical skills needed to lead successful digital campaigns and manage marketing budgets effectively."
    },
    {
        question: "What will I learn in this online digital marketing course?",
        answer: "You will learn a comprehensive range of topics including Search Engine Optimization (SEO), Search Engine Marketing (SEM), Social Media Marketing (SMM), Content Strategy, Email Marketing, and Web Analytics. The curriculum is highly practical and includes working with industry-standard tools like Google Ads, Google Analytics, and Meta Ads Manager."
    },
    {
        question: "Is this online digital marketing course syllabus suitable for beginners?",
        answer: "Yes, the course is meticulously structured to start from the fundamental concepts before advancing to complex strategies. This makes it highly suitable for beginners, fresh graduates, and professionals from other fields looking to pivot into digital marketing."
    },
    {
        question: "Is this digital marketing course available online or offline?",
        answer: "The course is primarily delivered online through interactive live sessions and comprehensive recorded modules, providing you the flexibility to learn from anywhere at your own pace. We also provide dedicated doubt-clearing sessions and 1-on-1 mentorship."
    },
    {
        question: "Do I need to know coding for this course?",
        answer: "Absolutely not. You do not need any programming or coding knowledge to excel in this course or in a digital marketing career. All technical requirements, such as setting up a WordPress site or implementing tracking codes, are taught using user-friendly interfaces and clear, step-by-step instructions."
    },
    {
        question: "Do you provide placement assistance after course completion?",
        answer: "Yes, we provide extensive career services including resume building, mock interviews, profile optimization, and direct interview opportunities with our hiring partners to help you secure a rewarding job."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);
    
    const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full bg-[#f8f9fa] rounded-2xl pt-2 sm:pt-3 pb-4 sm:pb-5 px-4 sm:px-8 border border-gray-200 relative overflow-hidden mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a202c] font-montserrat mb-4 pl-2 sm:pl-4 relative z-10">
                Digital Marketing Certification Course FAQ
            </h2>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm relative z-10 mb-6">
                <div className="flex flex-col gap-3">
                    {visibleFaqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`rounded-xl border ${openIndex === index ? 'border-gray-300 bg-white shadow-sm' : 'border-transparent bg-[#f1f4f8]'} overflow-hidden transition-all duration-200`}
                        >
                            <button 
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                            >
                                <span className="font-bold text-gray-900 text-[15px] pr-4">{faq.question}</span>
                                <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-4 sm:p-5 pt-0 text-gray-600 text-[14px] leading-relaxed border-t border-gray-100 mt-2">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {faqs.length > 5 && (
                <div className="flex justify-center relative z-10">
                    <button 
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2 bg-[#ff6b00]/10 text-[#ff6b00] font-bold py-2.5 px-6 rounded-lg hover:bg-[#ff6b00]/20 transition-colors text-[15px]"
                    >
                        {showAll ? "View Less" : "View All"} 
                        {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                </div>
            )}
        </div>
    );
}
