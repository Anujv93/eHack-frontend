'use client';

import React from 'react';
import { Users, CheckSquare, Globe, ArrowRight, ChevronDown } from 'lucide-react';

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
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-montserrat">
                    Drop a Query
                </h3>

                <form className="flex flex-col gap-3">
                    <div className="w-full">
                        <input 
                            type="text" 
                            placeholder="Full Name*" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 focus:border-[#ff6b00] transition-shadow"
                            required 
                        />
                    </div>
                    <div className="w-full">
                        <input 
                            type="email" 
                            placeholder="Email Id*" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 focus:border-[#ff6b00] transition-shadow"
                            required 
                        />
                    </div>
                    <div className="w-full flex">
                        <div className="border border-gray-300 border-r-0 rounded-l-lg px-2.5 py-2.5 bg-gray-50 flex items-center gap-1.5 flex-shrink-0">
                            <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-4" />
                            <span className="text-[13px] text-gray-600">+91</span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                        <input 
                            type="tel" 
                            placeholder="Phone*" 
                            className="w-full border border-gray-300 rounded-r-lg px-3 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 focus:border-[#ff6b00] transition-shadow"
                            required 
                        />
                    </div>
                    <div className="w-full relative mt-1">
                        <select 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[13px] text-gray-600 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 focus:border-[#ff6b00] transition-shadow cursor-pointer"
                            required
                            defaultValue=""
                        >
                            <option value="" disabled>Select an option</option>
                            <option value="course_details">Course Details</option>
                            <option value="pricing">Pricing & Offers</option>
                            <option value="placement">Placement Assistance</option>
                        </select>
                        <div className="absolute top-0 right-3 h-full flex items-center pointer-events-none">
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                        <div className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500 font-semibold tracking-wide">
                            Purpose*
                        </div>
                    </div>

                    <div className="flex items-start gap-2 mt-2">
                        <div className="flex items-center h-4 mt-0.5">
                            <input 
                                type="checkbox" 
                                id="terms" 
                                className="w-3.5 h-3.5 text-[#ff6b00] border-gray-300 rounded focus:ring-[#ff6b00] cursor-pointer"
                                required
                            />
                        </div>
                        <label htmlFor="terms" className="text-[11px] text-gray-600 leading-snug cursor-pointer">
                            I agree to eHackAcademy's <a href="#" className="underline font-semibold text-gray-700 hover:text-[#ff6b00] transition-colors">Terms & Conditions</a> and <a href="#" className="underline font-semibold text-gray-700 hover:text-[#ff6b00] transition-colors">Privacy Policy</a>.
                        </label>
                    </div>

                    <button 
                        type="submit"
                        className="w-full mt-1 bg-gradient-to-r from-[#ff6b00] to-[#ff8c33] text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 text-[14px]"
                    >
                        Submit <ArrowRight size={16} />
                    </button>
                </form>
            </div>
            
            {/* Background Decorative Blur */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#ff6b00]/5 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#ff6b00]/10 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
    );
}
