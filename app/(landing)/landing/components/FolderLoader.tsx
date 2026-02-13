import React, { useEffect, useState } from 'react';

interface FolderLoaderProps {
    onComplete: () => void;
    isPaused?: boolean;
}

const FolderLoader = ({ onComplete, isPaused = false }: FolderLoaderProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Small delay before finishing
                    return 100;
                }
                // Uniform speed
                return prev + 1;
            });
        }, 25);

        return () => clearInterval(interval);
    }, [onComplete, isPaused]);

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#0d1117] font-sans select-none">

            {/* macOS Style Folder Icon */}
            <div className="relative w-28 h-24 mb-6 transition-transform duration-300 transform scale-100 group-hover:scale-105">
                <svg viewBox="0 0 100 85" className="w-full h-full drop-shadow-2xl filter saturate-[1.1]">
                    <defs>
                        <linearGradient id="folderBack" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#60A5FA" />
                            <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                        <linearGradient id="folderFront" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#93C5FD" />
                            <stop offset="100%" stopColor="#60A5FA" />
                        </linearGradient>
                        <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feComponentTransfer in="SourceAlpha">
                                <feFuncA type="table" tableValues="1 0" />
                            </feComponentTransfer>
                            <feGaussianBlur stdDeviation="3" />
                            <feOffset dx="0" dy="2" result="offsetblur" />
                            <feFlood floodColor="rgba(0,0,0,0.2)" result="color" />
                            <feComposite in2="offsetblur" operator="in" />
                            <feComposite in2="SourceAlpha" operator="in" />
                            <feMerge>
                                <feMergeNode in="SourceGraphic" />
                                <feMergeNode />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Back Plate (Darker Blue) */}
                    <path
                        d="M5,10 L35,10 L45,0 L95,0 C97.76,0 100,2.24 100,5 L100,80 C100,82.76 97.76,85 95,85 L5,85 C2.24,85 0,82.76 0,80 L0,15 C0,12.24 2.24,10 5,10 Z"
                        fill="url(#folderBack)"
                    />

                    {/* Paper Insert Animation */}
                    <g transform={`translate(0, ${progress < 50 ? 5 : 0})`} className="transition-transform duration-700 ease-out">
                        <rect x="10" y="5" width="80" height="70" rx="1" fill="#f8fafc" opacity="0.95" />
                        <rect x="15" y="15" width="50" height="2" fill="#cbd5e1" />
                        <rect x="15" y="22" width="70" height="2" fill="#cbd5e1" />
                        <rect x="15" y="29" width="60" height="2" fill="#cbd5e1" />
                    </g>

                    {/* Front Plate (Lighter Blue - Gradient) */}
                    <path
                        d="M0,25 L100,25 L100,80 C100,82.76 97.76,85 95,85 L5,85 C2.24,85 0,82.76 0,80 L0,25 Z"
                        fill="url(#folderFront)"
                        filter="url(#inset-shadow)"
                    />
                    {/* User Icon Emboss */}
                    <path d="M50,45 C55,45 58,49 58,54 C58,59 55,62 50,62 C45,62 42,59 42,54 C42,49 45,45 50,45 A 4 4 0 0 1 50 45" fill="rgba(255,255,255,0.3)" />
                    <path d="M35,75 C35,65 40,63 50,63 C60,63 65,65 65,75" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
            </div>

            {/* macOS Style Progress Bar */}
            <div className="w-56 h-1.5 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-md mb-3 ring-1 ring-white/10">
                <div
                    className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-75 ease-linear rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Clean Typography */}
            <div className="text-center">
                <h3 className="text-white/90 text-sm font-medium tracking-wide">
                    {progress < 100 ? 'Decrypting Student Success Stories...' : 'Access Granted'}
                </h3>
            </div>
        </div>
    );
};

export default FolderLoader;
