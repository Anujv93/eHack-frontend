'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function CertificationSection() {
    const [activeTab, setActiveTab] = useState<'internship' | 'course'>('course');

    return (
        <div className="w-full bg-[#f8f9fa] rounded-2xl pt-2 sm:pt-3 pb-2 sm:pb-3 px-4 sm:px-8 border border-gray-200 relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a202c] font-montserrat mb-4 pl-2 sm:pl-4">
                Digital Marketing Course Completion Certificate
            </h2>

            <div className="bg-white rounded-2xl p-4 sm:p-8 border border-gray-200 shadow-sm relative z-10">
                {/* Tabs */}
                <div className="flex justify-center mb-8 sm:mb-12">
                    <div className="flex gap-2 sm:gap-4 w-full sm:w-auto justify-center">
                        <button 
                            onClick={() => setActiveTab('internship')}
                            className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm sm:text-[15px] font-bold transition-colors ${
                                activeTab === 'internship' 
                                    ? 'bg-[#ff6b00]/10 text-[#ff6b00]' 
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            Internship Certificate
                        </button>
                        <button 
                            onClick={() => setActiveTab('course')}
                            className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm sm:text-[15px] font-bold transition-colors ${
                                activeTab === 'course' 
                                    ? 'bg-[#ff6b00]/10 text-[#ff6b00]' 
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            Course Certificate
                        </button>
                    </div>
                </div>

                {/* Certificate Display Area */}
                <div className="relative w-full flex justify-center items-center py-4 sm:py-8">
                    {/* Decorative Background Shapes */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                        <div className="w-[80%] h-[120%] bg-gradient-to-tr from-purple-100/40 to-transparent -rotate-12 transform scale-150 rounded-full blur-3xl absolute -left-20"></div>
                        <div className="w-[80%] h-[120%] bg-gradient-to-bl from-green-100/40 to-transparent rotate-12 transform scale-150 rounded-full blur-3xl absolute -right-20"></div>
                    </div>
                    
                    {/* Certificate Image */}
                    <div className="relative z-10 w-full max-w-3xl rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-4 sm:border-[12px] border-[#f8f9fa] bg-white ring-1 ring-gray-200">
                        <Image 
                            src="/images/certificates/new-digital-marketing-certification.jpeg" 
                            alt="Digital Marketing Certificate" 
                            width={1200}
                            height={850}
                            className="w-full h-auto object-contain transform hover:scale-[1.02] transition-transform duration-500"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
