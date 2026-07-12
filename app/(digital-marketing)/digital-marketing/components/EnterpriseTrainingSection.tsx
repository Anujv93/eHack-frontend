'use client';

import React, { useState } from 'react';
import { ArrowRight, Trophy, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import FormModal from './FormModal';

const logos = [
    { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Accenture", url: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
    { name: "Cisco", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" },
    { name: "Capgemini", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg" },
    { name: "SAP", url: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" },
    { name: "Oracle", url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
    { name: "Salesforce", url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
    { name: "Infosys", url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" }
];

const features = [
    {
        icon: <Trophy size={20} className="text-emerald-600" />,
        text: "Immersive learning experience blending deep theory with practical application."
    },
    {
        icon: <MessageSquare size={20} className="text-emerald-600" />,
        text: "Results-driven learning journeys empowering your team with critical skills."
    },
    {
        icon: <CheckCircle2 size={20} className="text-emerald-600" />,
        text: "Customized learning pathways specifically tailored to the needs of each role."
    },
    {
        icon: <ShieldCheck size={20} className="text-emerald-600" />,
        text: "Equip your workforce with the essential skills required to thrive in the future."
    }
];

export default function EnterpriseTrainingSection() {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const topLogos = logos.slice(0, 6);
    const bottomLogos = logos.slice(6, 12);
    // Duplicate 4 times to ensure seamless infinite scroll on wide screens
    const topRow = [...topLogos, ...topLogos, ...topLogos, ...topLogos];
    const bottomRow = [...bottomLogos, ...bottomLogos, ...bottomLogos, ...bottomLogos];

    return (
        <div className="w-full bg-[#f8f9fa] rounded-2xl pt-6 sm:pt-8 pb-8 px-4 sm:px-8 border border-gray-200 relative overflow-hidden">
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 sm:mb-10 pl-2 sm:pl-4">
                <div className="flex-1 max-w-2xl">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1a202c] font-montserrat mb-3 sm:mb-4">
                        Comprehensive Training Solutions for Enterprises
                    </h2>
                    <p className="text-gray-600 text-[15px] leading-relaxed">
                        Comprehensive training solutions to empower enterprises with skills needed for growth and innovation. Tailored programs to boost productivity and improve workforce capabilities.
                    </p>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                    <button 
                        onClick={() => setIsFormModalOpen(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff6b00] to-[#ff8c33] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                    >
                        Skill Up Your Team <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            {/* Horizontal Dashed Line */}
            <div className="border-t border-dashed border-gray-300 w-full mb-8 sm:mb-10"></div>

            {/* Logos Marquees */}
            <div className="mb-8 sm:mb-10 overflow-hidden relative w-full flex flex-col gap-4">
                {/* Fade overlays for smooth entry/exit */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none"></div>

                {/* Top Row - Moving Left */}
                <div className="animate-marquee-left flex gap-3 sm:gap-4 pl-0">
                    {topRow.map((logo, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-center h-16 sm:h-20 hover:shadow-md transition-shadow min-w-[140px] sm:min-w-[180px] flex-shrink-0">
                            <img 
                                src={logo.url} 
                                alt={logo.name} 
                                className="max-w-[80%] max-h-[30px] sm:max-h-[35px] object-contain" 
                                title={logo.name}
                            />
                        </div>
                    ))}
                </div>

                {/* Bottom Row - Moving Right */}
                <div className="animate-marquee-right flex gap-3 sm:gap-4 pl-0">
                    {bottomRow.map((logo, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-center h-16 sm:h-20 hover:shadow-md transition-shadow min-w-[140px] sm:min-w-[180px] flex-shrink-0">
                            <img 
                                src={logo.url} 
                                alt={logo.name} 
                                className="max-w-[80%] max-h-[30px] sm:max-h-[35px] object-contain" 
                                title={logo.name}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Middle Divider with Text */}
            <div className="relative flex items-center justify-center mb-8 sm:mb-10">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dashed border-gray-300"></div>
                </div>
                <div className="relative bg-[#f8f9fa] px-4 text-[14px] sm:text-[15px] font-bold text-slate-700 text-center">
                    Curriculum Designed to Fit Your Organization
                </div>
            </div>

            {/* Bottom Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow h-full">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                            {feature.icon}
                        </div>
                        <p className="text-gray-700 text-[13px] leading-relaxed">
                            {feature.text}
                        </p>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes scrollLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scrollRight {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee-left {
                    display: flex;
                    width: max-content;
                    animation: scrollLeft 30s linear infinite;
                }
                .animate-marquee-right {
                    display: flex;
                    width: max-content;
                    animation: scrollRight 30s linear infinite;
                }
                .animate-marquee-left:hover, .animate-marquee-right:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <FormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                title="Corporate Training Request"
                formSource="DM Enterprise Training"
            />
        </div>
    );
}
