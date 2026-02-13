"use client";

import React, { useEffect, useState, useRef } from "react";
import { metapsploitLogs } from "../data/programData";

interface TerminalProps {
    customLogs?: any[];
    onComplete?: () => void;
    autoScroll?: boolean;
    isPaused?: boolean;
}

const TerminalAnimation = ({ customLogs, onComplete, autoScroll = true, isPaused = false }: TerminalProps) => {
    const [logs, setLogs] = useState<any[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const hasCompletedRef = useRef(false);
    const currentIndexRef = useRef(0);

    useEffect(() => {
        // Force reset on mount or when logs change
        const sourceLogs = customLogs || metapsploitLogs;
        setLogs([]);
        currentIndexRef.current = 0;
        hasCompletedRef.current = false;

        // Initial setup
        const initialCount = customLogs ? 0 : 5;
        if (!customLogs) {
            setLogs(sourceLogs.slice(0, initialCount));
            currentIndexRef.current = initialCount;
        }
    }, [customLogs]);

    useEffect(() => {
        if (isPaused) return;

        const sourceLogs = customLogs || metapsploitLogs;

        const interval = setInterval(() => {
            setLogs((prev) => {
                if (currentIndexRef.current >= sourceLogs.length) {
                    if (onComplete && !hasCompletedRef.current) {
                        hasCompletedRef.current = true;
                        onComplete();
                        clearInterval(interval);
                        return prev;
                    }
                    if (!customLogs) {
                        // Loop for default logs
                        currentIndexRef.current = 5;
                        return sourceLogs.slice(0, 5);
                    }
                    clearInterval(interval);
                    return prev;
                }
                const nextLog = sourceLogs[currentIndexRef.current];
                currentIndexRef.current++;
                return [...prev, nextLog];
            });
        }, 1200); // Slower, uniform typing speed

        return () => clearInterval(interval);
    }, [customLogs, onComplete, isPaused]);

    useEffect(() => {
        if (autoScroll && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs, autoScroll]);

    return (
        <div className="w-full h-full bg-black rounded-xl border border-gray-800/80 shadow-[0_0_50px_rgba(0,255,100,0.1)] overflow-hidden font-mono text-xs leading-relaxed transform transition-all hover:border-green-500/30 flex flex-col crt-container screen-glow">
            {/* CRT Overlay */}
            <div className="crt-overlay pointer-events-none"></div>

            {/* Terminal Header */}
            <div className="bg-[#161b22] px-4 py-2.5 flex items-center justify-between border-b border-gray-800 shrink-0 z-10 relative">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="text-gray-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    SECURE SHELL - HACKER MODE
                </div>
                <div className="w-10"></div>
            </div>

            {/* Terminal Body */}
            <div
                ref={scrollRef}
                className="flex-1 p-5 overflow-y-auto scrollbar-hide text-green-400 bg-black/90 relative z-10 text-sm font-medium"
            >
                {logs.map((log, index) => (
                    <div key={index} className="animate-fadeIn break-words mb-1.5">
                        {log.type === 'error' ? (
                            <div className="bg-red-500/20 border border-red-500/30 p-2 rounded text-red-400 font-bold animate-pulse">
                                {log.text}
                            </div>
                        ) : log.type === 'progress' ? (
                            <div className="py-2">
                                <div className="flex justify-between text-xs text-green-400/70 mb-1">
                                    <span>{log.text}</span>
                                    <span>[100%]</span>
                                </div>
                                <div className="h-2.5 w-full bg-green-900/30 rounded-full overflow-hidden border border-green-500/30">
                                    <div className="h-full bg-green-500 w-full progress-bar-striped"></div>
                                </div>
                            </div>
                        ) : log.type === 'input' ? (
                            <div className="mt-2 mb-1">
                                <span className="text-blue-400 font-bold font-mono mr-2">$</span>
                                <span className="text-white brightness-125 type-writer">{log.text}</span>
                            </div>
                        ) : log.type === 'success' ? (
                            <span className="text-emerald-400 font-bold block">{log.text}</span>
                        ) : (
                            <span className="text-green-300/80 block">{log.text}</span>
                        )}
                    </div>
                ))}

                {!hasCompletedRef.current && (
                    <div className="mt-2 flex items-center">
                        <span className="text-blue-400 font-bold mr-2">$</span>
                        <span className="w-2.5 h-5 bg-green-500 animate-pulse block"></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TerminalAnimation;
