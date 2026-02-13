"use client";

import React, { useState, useEffect, useRef } from "react";
import TerminalAnimation from "./TerminalAnimation";
import SuccessCard from "./SuccessCard";
import FolderLoader from "./FolderLoader";
import { studentTransformationLogs, studentStories } from "../data/programData";

const HeroRightPanel = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [storyIndex, setStoryIndex] = useState(0);
    const [animationState, setAnimationState] = useState<'terminal' | 'unlocking' | 'success'>('terminal');
    const containerRef = useRef<HTMLDivElement>(null);

    const startAnimation = () => {
        setIsPlaying(true);
        setIsPaused(false);
        setStoryIndex(0); // Start from first story
        setAnimationState('terminal');
    };

    const handlePause = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPaused(true);
    };

    const handleResume = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPaused(false);
    };

    const handleTerminalComplete = () => {
        if (isPaused) return;
        setTimeout(() => {
            setAnimationState('unlocking');
        }, 800);
    };

    const handleUnlockComplete = () => {
        if (isPaused) return;
        setAnimationState('success');
    };

    // Auto-loop logic
    useEffect(() => {
        let resetTimer: NodeJS.Timeout;
        if (animationState === 'success' && !isPaused) {
            resetTimer = setTimeout(() => {
                setStoryIndex((prev) => (prev + 1) % studentStories.length);
                setAnimationState('terminal');
            }, 9000);
        }
        return () => clearTimeout(resetTimer);
    }, [animationState, isPaused]);


    return (
        <div className="flex flex-col w-full max-w-[550px] mx-auto perspective-1000 relative z-20">

            {/* ================= MONITOR CONTENT (FRAMELESS) ================= */}
            <div className="group relative z-30">
                {/* Glow behind monitor */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

                {/* Screen Container - No Bezel */}
                <div className="relative w-full h-[300px] sm:h-[340px] bg-black rounded-t-2xl rounded-b-none overflow-hidden shadow-2xl border border-gray-800 border-b-0">

                    {/* 1. START / RESUME OVERLAY */}
                    {(!isPlaying || isPaused) && (
                        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer" onClick={isPlaying ? handleResume : startAnimation}>
                            <div className="group-hover:scale-105 transition-transform duration-300">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#ff6b00] hover:border-[#ff6b00] transition-colors duration-300 shadow-lg">
                                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                            <p className="mt-3 text-white/80 font-sans text-xs font-medium tracking-widest uppercase">
                                {isPlaying ? 'Resume Simulation' : 'Run Simulation'}
                            </p>
                        </div>
                    )}

                    {/* CONTROL: PAUSE OVERLAY (Hover Only, when Playing & Not Paused) */}
                    {isPlaying && !isPaused && (
                        <div
                            className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[0px] opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                            onClick={handlePause}
                        >
                            <div className="transform hover:scale-110 transition-transform duration-300">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-red-500/80 hover:border-red-500 hover:text-white text-white/90 shadow-2xl transition-all">
                                    <svg className="w-8 h-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. TERMINAL LAYER */}
                    <div className={`absolute inset-0 transition-opacity duration-500 bg-[#0c0c0c] ${animationState === 'success' ? 'opacity-0' : 'opacity-100'}`}>
                        {isPlaying && (
                            <TerminalAnimation
                                key={storyIndex}
                                customLogs={studentStories[storyIndex].logs}
                                onComplete={handleTerminalComplete}
                                autoScroll={true}
                                isPaused={isPaused}
                            />
                        )}
                        {!isPlaying && (
                            <div className="h-full w-full flex flex-col items-center justify-center">
                                <div className="text-gray-500 font-mono text-xs tracking-widest">
                                    [ SYSTEM STANDBY ]
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3. UNLOCK & 4. SUCCESS */}
                    {isPlaying && animationState === 'unlocking' && (
                        <div className="absolute inset-0 z-30"><FolderLoader onComplete={handleUnlockComplete} isPaused={isPaused} /></div>
                    )}
                    {isPlaying && animationState === 'success' && (
                        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
                            <SuccessCard data={studentStories[storyIndex]} />
                        </div>
                    )}

                    {/* Subtle Scanline Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[60] bg-[length:100%_2px,3px_100%] opacity-20"></div>
                </div>
            </div>

            {/* ================= SEPARATE FORM CARD ================= */}
            <div className="bg-white rounded-b-2xl rounded-t-none shadow-xl border border-gray-200 border-t-0 overflow-hidden relative z-20">
                <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-900 text-lg">
                            Request <span className="text-[#ff6b00]">Access</span>
                        </h3>
                        <div className="flex items-center gap-2 px-2 py-1 bg-green-50 rounded-full border border-green-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">Admissions Open</span>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00] transition-all" />
                            <input type="tel" placeholder="Phone" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00] transition-all" />
                        </div>
                        <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00] transition-all" />

                        <button type="submit" className="w-full bg-[#1a1a1a] hover:bg-black text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                            Book Your Spot
                            <svg className="w-4 h-4 text-[#ff6b00] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </button>
                    </form>

                    <p className="text-center text-[10px] text-gray-400 mt-4">
                        Limited spots available for the upcoming cohort.
                    </p>
                </div>
            </div>

        </div>
    );
};
export default HeroRightPanel;
