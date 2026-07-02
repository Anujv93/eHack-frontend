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
                    
                    {/* Certificate Image Frame */}
                    <div className="relative z-10 w-full max-w-3xl rounded-lg overflow-hidden bg-gradient-to-br from-[#2c2c2c] via-[#1a1a1a] to-[#2c2c2c] shadow-[0_8px_24px_rgba(0,0,0,0.25),0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] p-4 sm:p-[16px]">
                        {/* Outer golden border */}
                        <div className="absolute inset-[4px] pointer-events-none z-20 border-2" style={{ borderImage: 'linear-gradient(135deg, #d4af37 0%, #f4d675 25%, #d4af37 50%, #b8962e 75%, #d4af37 100%) 1' }}></div>
                        {/* Inner golden accent line */}
                        <div className="absolute inset-[10px] pointer-events-none z-20 border border-[#d4af37]/40"></div>
                        
                        <div className="relative z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] bg-transparent w-full">
                            <Image 
                                src="/images/certificates/new-digital-marketing-certification.jpeg" 
                                alt="Digital Marketing Certificate" 
                                width={1200}
                                height={850}
                                className="w-full h-auto object-contain transform hover:scale-[1.02] transition-transform duration-500 rounded-[2px]"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
