"use client";
import "./learning-framework.css";

// Strapi Schema:
// Component: global.learning-framework
// - Title (Short text)
// - Steps (Repeatable component: global.framework-step)
//   - StepNumber (Number)
//   - StepTitle (Short text)
//   - Description (Long text)
//   - LinkText (Short text, optional)
//   - LinkUrl (Short text, optional)

export interface FrameworkStep {
    id: number;
    StepNumber: number;
    StepTitle: string;
    Description: string;
    LinkText?: string;
    LinkUrl?: string;
}

export interface LearningFrameworkProps {
    title?: string;
    steps?: FrameworkStep[];
}

export default function LearningFramework({ title, steps }: LearningFrameworkProps) {
    if (!steps || steps.length === 0) return null;

    return (
        <section className="framework-section border-bottom" id="learning-framework">
            <div className="container">
                {title && (
                    <div className="section-header">
                        <h2>{title}</h2>
                        <div className="red-underline-center"></div>
                    </div>
                )}
                <div className="framework-grid">
                    {steps.map((step) => (
                        <div key={step.id} className="framework-step">
                            <div className="step-header">
                                <span className="step-number">{step.StepNumber}</span>
                                <div className="step-title">{step.StepTitle}</div>
                            </div>
                            <div className="step-body">
                                <p>{step.Description}</p>
                                {step.LinkText && (
                                    <a href={step.LinkUrl || "#"} className="step-link">
                                        {step.LinkText} →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
