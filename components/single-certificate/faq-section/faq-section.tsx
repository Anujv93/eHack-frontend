'use client';

import { useState } from 'react';
import { FAQSection as FAQSectionType } from '@/lib/strapi';
import { Plus, Minus } from 'lucide-react';
import './faq-section.css';

interface FAQSectionProps {
    section: FAQSectionType;
}

export default function FAQSection({ section }: FAQSectionProps) {
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());

    if (!section || !section.FAQs || section.FAQs.length === 0) {
        return null;
    }

    // Get unique categories
    const categories = Array.from(new Set(section.FAQs.map(faq => faq.Category)));

    // Set first category as active if none selected
    if (!activeCategory && categories.length > 0) {
        setActiveCategory(categories[0]);
    }

    // Filter FAQs by active category
    const filteredFAQs = activeCategory
        ? section.FAQs.filter(faq => faq.Category === activeCategory)
        : section.FAQs;

    const toggleQuestion = (index: number) => {
        const newOpenQuestions = new Set(openQuestions);
        if (newOpenQuestions.has(index)) {
            newOpenQuestions.delete(index);
        } else {
            newOpenQuestions.add(index);
        }
        setOpenQuestions(newOpenQuestions);
    };

    return (
        <section className="section section-white border-bottom" id="faqs">
            <div className="container">
                {/* Section Header */}
                <div className="section-header">
                    <h2>{section.Title}</h2>
                    <div className="red-underline-center"></div>
                </div>

                <div className="faq-layout">
                    {/* Category Sidebar */}
                    <div className="faq-categories">
                        {categories.map((category, index) => {
                            const categoryCount = section.FAQs.filter(
                                faq => faq.Category === category
                            ).length;

                            return (
                                <button
                                    key={index}
                                    className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    <span className="category-name">{category}</span>
                                    <span className="category-count">{categoryCount}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* FAQ Questions */}
                    <div className="faq-questions">
                        {filteredFAQs.map((faq, index) => {
                            const isOpen = openQuestions.has(index);

                            return (
                                <div
                                    key={index}
                                    className={`faq-item ${isOpen ? 'open' : ''}`}
                                >
                                    <button
                                        className="faq-question"
                                        onClick={() => toggleQuestion(index)}
                                        aria-expanded={isOpen}
                                    >
                                        <span className="question-text">{faq.Question}</span>
                                        <span className="toggle-icon">
                                            {isOpen ? (
                                                <Minus size={20} strokeWidth={2.5} />
                                            ) : (
                                                <Plus size={20} strokeWidth={2.5} />
                                            )}
                                        </span>
                                    </button>
                                    <div className="faq-answer">
                                        <div className="answer-content">
                                            <p>{faq.Answer}</p>
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
}
