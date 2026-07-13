'use client';

import React from 'react';
import { FileText, Gem, Briefcase, Banknote, Landmark, ShieldCheck, CreditCard, CheckCircle2, Check } from 'lucide-react';

export default function PricingSection() {
    return (
        <div className="w-full bg-white rounded-2xl pt-8 pb-10 px-4 sm:px-8 border border-gray-200 relative overflow-hidden shadow-sm">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 font-montserrat">
                Program Investment & Financing
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Left Column: Fees and Payment Plans */}
                <div className="flex flex-col gap-5">
                    
                    {/* Application Fee */}
                    <div className="border border-orange-300 rounded-xl p-5 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
                                    <FileText size={20} />
                                </div>
                                <h3 className="font-bold text-gray-800 text-base sm:text-lg">Application Fee</h3>
                            </div>
                            <span className="font-black text-xl sm:text-2xl text-gray-900">₹1,000</span>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm italic pl-12">
                            Will be adjusted in the program fee. *GST as applicable
                        </p>
                    </div>

                    {/* Program Admission Fee */}
                    <div className="border-2 border-blue-500 rounded-xl p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-[#f0f4ff] shadow-sm relative overflow-hidden">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
                        
                        <div className="flex justify-between items-center mb-2 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <Gem size={20} className="fill-blue-100" />
                                </div>
                                <h3 className="font-bold text-gray-800 text-base sm:text-lg">Program Admission Fee</h3>
                            </div>
                            <span className="font-black text-2xl sm:text-4xl text-blue-800 tracking-tight">₹95,000</span>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm italic pl-12 relative z-10">
                            *GST as applicable
                        </p>
                    </div>

                    {/* Payment Plans */}
                    <div className="mt-4">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Payment Plans</h3>
                        
                        <div className="flex flex-col gap-4">
                            {/* Company EMI Plan */}
                            <div className="border border-orange-300 rounded-xl p-5 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="text-orange-500">
                                            <Briefcase size={20} />
                                        </div>
                                        <h4 className="font-bold text-gray-800 text-[15px] sm:text-base">Company EMI Plan</h4>
                                    </div>
                                    <span className="font-black text-lg sm:text-xl text-[#c45a00]">₹1,10,000</span>
                                </div>
                                <p className="text-gray-500 text-xs sm:text-sm pl-8">
                                    Complete flexibility with company-sponsored EMI option
                                </p>
                            </div>

                            {/* 50% Upfront Payment */}
                            <div className="border border-orange-300 rounded-xl p-5 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="text-orange-500">
                                            <Banknote size={20} />
                                        </div>
                                        <h4 className="font-bold text-gray-800 text-[15px] sm:text-base">50% Upfront Payment</h4>
                                    </div>
                                    <span className="font-black text-lg sm:text-xl text-[#c45a00]">₹55,000</span>
                                </div>
                                <p className="text-gray-500 text-xs sm:text-sm pl-8">
                                    Balance payable in 4 equal EMIs of 13,750 each
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Financing & Inclusions */}
                <div className="flex flex-col gap-6">
                    
                    {/* Financing Options Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Landmark className="text-[#ff6b00]" size={24} />
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Financing Options</h3>
                        </div>
                        <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                            We offer multiple financing solutions to make our programs accessible to all students.
                        </p>

                        <div className="flex flex-col gap-3">
                            {/* No Cost EMI */}
                            <div className="border border-gray-200 bg-gray-50 rounded-xl p-4 sm:p-5 flex items-start gap-4">
                                <div className="p-2 bg-white border border-gray-200 rounded-lg text-gray-700 mt-1">
                                    <ShieldCheck size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm sm:text-[15px] mb-1">No Cost EMI (Internal)</h4>
                                    <p className="text-gray-500 text-xs sm:text-sm">Zero interest installments through our internal program</p>
                                </div>
                            </div>

                            {/* Bank/NBFC Financing */}
                            <div className="border border-gray-200 bg-white rounded-xl p-4 sm:p-5 flex items-start gap-4 shadow-sm">
                                <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 mt-1">
                                    <CreditCard size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm sm:text-[15px] mb-1">Bank/NBFC Financing</h4>
                                    <p className="text-gray-500 text-xs sm:text-sm">Flexible payment plans through partner banks and NBFCs</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* What's Included */}
                    <div className="border border-gray-200 rounded-xl p-6 sm:p-8 bg-white shadow-sm mt-2">
                        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                            <CheckCircle2 className="text-[#ff6b00]" size={22} />
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">What's Included</h3>
                        </div>

                        <ul className="space-y-4">
                            {[
                                "1 eHack Certifications",
                                "250+ of Hands-on Training",
                                "Real-Time Labs & Practice Environment",
                                "2 Years Support Post-Training Support",
                                "Program Completion Certificate",
                                "Internship Opportunities"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <Check className="text-green-500 flex-shrink-0" size={18} strokeWidth={3} />
                                    <span className="text-gray-700 text-sm sm:text-[15px]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
