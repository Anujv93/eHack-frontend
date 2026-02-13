"use client";

import React from "react";
import { heroProgramData } from "../data/programData";

const ProgramStats = () => {
    return (
        <div className="w-full bg-white border border-gray-100 rounded-xl p-5 shadow-xl mt-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"></div>

            <div className="flex justify-between items-end mb-4">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Deployment Stats</h3>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold animate-pulse">
                    System Online
                </span>
            </div>

            <div className="space-y-3">
                {heroProgramData.map((program) => (
                    <div
                        key={program.id}
                        className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-300 group"
                    >
                        {/* Status Indicator */}
                        <div className={`w-1.5 h-12 rounded-full bg-gradient-to-b ${program.color} opacity-70 group-hover:opacity-100 transition-opacity`}></div>

                        <div className="flex-1">
                            <h4 className="text-xs md:text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                {program.title}
                            </h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-[10px] text-gray-500 font-medium">
                                <span className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                    {program.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                    {program.certification}
                                </span>
                            </div>
                        </div>

                        <div className="text-right">
                            <span className="block text-xs font-bold text-[#ff6b00] group-hover:scale-110 transition-transform">
                                {program.highlight}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-[10px] text-gray-400 font-medium">
                    Partners:
                </p>
                <div className="flex gap-4 opacity-50 select-none">
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider">CISCO</span>
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider">EC-COUNCIL</span>
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider">COMPTIA</span>
                </div>
            </div>
        </div>
    );
};

export default ProgramStats;
