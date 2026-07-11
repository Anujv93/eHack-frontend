'use client';

import React from 'react';
import { Users, CheckSquare, Globe, ArrowRight, ChevronDown } from 'lucide-react';
import LeadForm from './LeadForm';

export default function FinalCTASection() {
    return (
        <div className="w-full bg-gradient-to-br from-[#ffe5cc] to-[#ffdbb8] border border-[#ffcca3] rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col lg:flex-row gap-8 lg:gap-10 items-center shadow-sm">
            {/* Left Side: Stats */}
            <div className="flex-1 w-full relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-montserrat mb-6">
                    This course has served
                </h2>

                <div className="flex flex-col gap-4 max-w-sm">
                    {/* Stat Box 1 */}
                    <div className="bg-white/60 border border-white rounded-xl p-5 flex flex-col w-[70%] shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-[#ff6b00]/10 flex items-center justify-center mb-3">
                            <Users size={20} className="text-[#ff6b00]" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 tracking-tight">
                            3,00,000+
                        </h3>
                        <p className="text-gray-600 text-[14px]">
                            Professionals Trained
                        </p>
                    </div>

                    <div className="flex gap-4 w-full">
                        {/* Stat Box 2 */}
                        <div className="bg-white/60 border border-white rounded-xl p-4 flex flex-col flex-1 shadow-sm">
                            <div className="w-9 h-9 rounded-lg bg-[#ff6b00]/10 flex items-center justify-center mb-2">
                                <CheckSquare size={18} className="text-[#ff6b00]" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 tracking-tight">
                                100%
                            </h3>
                            <p className="text-gray-600 text-[13px]">
                                Success Rate
                            </p>
                        </div>

                        {/* Stat Box 3 */}
                        <div className="bg-white/60 border border-white rounded-xl p-4 flex flex-col flex-1 shadow-sm">
                            <div className="w-9 h-9 rounded-lg bg-[#ff6b00]/10 flex items-center justify-center mb-2">
                                <Globe size={18} className="text-[#ff6b00]" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 tracking-tight">
                                100+
                            </h3>
                            <p className="text-gray-600 text-[13px]">
                                Countries
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-[380px] bg-white rounded-xl p-5 sm:p-6 shadow-xl relative z-10 flex-shrink-0">
                <LeadForm 
                    customTitle={
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-montserrat">
                            Drop a Query
                        </h3>
                    }
                    customSubtitle=""
                    customButtonText="Submit"
                    showDigitalMarketingTag={false}
                    noShadow={true}
                    paddingClass="p-0"
                    isCompact={true}
                    formSource="DM Final CTA Section"
                />
            </div>
            
            {/* Background Decorative Blur */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#ff6b00]/5 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#ff6b00]/10 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
    );
}
