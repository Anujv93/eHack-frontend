"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const EncryptionAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lockCardRef = useRef<HTMLDivElement>(null);
    const successCardRef = useRef<HTMLDivElement>(null);
    const scanLineRef = useRef<HTMLDivElement>(null);
    const fingerprintRef = useRef<HTMLDivElement>(null);
    const codeRainRef = useRef<HTMLDivElement>(null);

    // New Refs for Holographic elements
    const holoCircleRef = useRef<SVGSVGElement>(null);
    const holoRingsRef = useRef<SVGGElement>(null);

    // Success Elements
    const statsContainerRef = useRef<HTMLDivElement>(null);
    const salaryBadgeRef = useRef<HTMLDivElement>(null);
    const companyBadgeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 4 });

        // Initial Setup
        tl.set(successCardRef.current, { autoAlpha: 0, scale: 0.8, rotationX: 10 });
        tl.set(lockCardRef.current, { autoAlpha: 1, scale: 1, filter: "blur(0px)" });
        tl.set(fingerprintRef.current, { autoAlpha: 0, scale: 0 });
        tl.set(holoCircleRef.current, { opacity: 0, scale: 0.5 });

        // Result elements hidden
        tl.set([salaryBadgeRef.current, companyBadgeRef.current, statsContainerRef.current], {
            y: 20, autoAlpha: 0
        });

        // --- PHASE 1: LOCKED & BIOMETRIC SCAN ---
        // 1. Holo Circle Appears
        tl.to(holoCircleRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out" });
        tl.to(holoRingsRef.current, { rotation: 360, duration: 2, ease: "linear", repeat: 2 }, "<");

        // 2. Fingerprint Scan
        tl.to(fingerprintRef.current, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" }, "-=1.5");
        tl.to(scanLineRef.current, { top: "100%", duration: 1, ease: "power1.inOut", repeat: 3, yoyo: true }, "<");

        // 3. Code Rain Intensifies (Hacking)
        tl.to(codeRainRef.current, { opacity: 0.4, duration: 1 }, "<");

        // 4. Access Granted Flash
        tl.to(lockCardRef.current, {
            boxShadow: "0 0 50px rgba(34, 197, 94, 0.6)",
            borderColor: "#22c55e",
            duration: 0.2,
            yoyo: true,
            repeat: 3
        });

        // --- PHASE 2: DECRYPTION EXPLOSION ---
        // 5. Unlock / Decrypt Boom
        tl.to(lockCardRef.current, {
            duration: 0.5,
            scale: 1.2,
            opacity: 0,
            filter: "blur(10px) brightness(2)",
            ease: "power2.in"
        });

        // --- PHASE 3: SUCCESS REVEAL ---
        // 6. Reveal Success Card (with 3D pop)
        tl.to(successCardRef.current, {
            duration: 0.8,
            autoAlpha: 1,
            scale: 1,
            rotationX: 0,
            ease: "elastic.out(1, 0.7)"
        }, "-=0.2");

        // 7. Pop Stats Sequentially
        tl.to(statsContainerRef.current, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.4");

        tl.to(salaryBadgeRef.current, {
            duration: 0.5,
            scale: 1,
            y: 0,
            autoAlpha: 1,
            ease: "back.out(2)"
        }, "-=0.2");

        tl.to(companyBadgeRef.current, {
            duration: 0.5,
            scale: 1,
            y: 0,
            autoAlpha: 1,
            ease: "back.out(2)"
        }, "-=0.3");

        // 8. Slight Float Animation during hold
        tl.to(successCardRef.current, {
            y: -10,
            duration: 2,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut"
        });

        // 9. Reset
        tl.to([successCardRef.current, statsContainerRef.current, salaryBadgeRef.current, companyBadgeRef.current], {
            duration: 0.5,
            opacity: 0,
            scale: 0.9
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full aspect-[4/3] md:aspect-[16/10] flex items-center justify-center perspective-1000">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff6b00]/10 to-blue-500/10 rounded-full blur-[80px] animate-pulse" />

            {/* --- STATE 1: LOCKED CARD (Biometric Interface) --- */}
            <div
                ref={lockCardRef}
                className="absolute inset-0 max-w-sm mx-auto h-[400px] my-auto bg-neutral-900/95 backdrop-blur-xl border border-neutral-700 rounded-2xl p-6 flex flex-col items-center justify-center shadow-2xl z-20 overflow-hidden"
            >
                {/* Holographic Circle Background */}
                <svg ref={holoCircleRef} className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 200 200">
                    <g ref={holoRingsRef} transform-origin="100 100">
                        <circle cx="100" cy="100" r="80" stroke="#22c55e" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
                        <circle cx="100" cy="100" r="60" stroke="#22c55e" strokeWidth="0.5" fill="none" strokeDasharray="2 6" />
                        <circle cx="100" cy="100" r="40" stroke="#22c55e" strokeWidth="1" fill="none" />
                    </g>
                </svg>

                {/* Matrix Rain Overlay */}
                <div ref={codeRainRef} className="absolute inset-0 opacity-10 font-mono text-[10px] text-green-500 overflow-hidden pointer-events-none p-4 leading-relaxed break-all mask-image-gradient">
                    01ACCESS_DENIED010101010101SYSTEM_LOCKED010101010101
                    1010101SECURITY_PROTOCOL_INIT10101010101010101010101
                    010101010101010101001010101010101010101010101010101001
                    ENCRYPTION_KEY_REQUIRED_XXX_0000_1111_BIOMETRIC_SCAN
                </div>

                {/* Biometric Fingerprint Icon */}
                <div className="relative w-24 h-24 mb-6">
                    <div ref={fingerprintRef} className="absolute inset-0 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                    </div>

                    {/* Scanning Line */}
                    <div ref={scanLineRef} className="absolute left-0 right-0 h-[3px] bg-green-400 shadow-[0_0_20px_rgba(34,197,94,1)] z-30 top-0 opacity-100" />
                </div>

                <h3 className="text-white font-mono text-2xl font-bold mb-1 tracking-widest">IDENTITY LOCKED</h3>
                <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-8">Scan to Decrypt Career</p>

                <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 animate-[loading_2s_ease-in-out_infinite] w-1/2" />
                </div>
            </div>

            {/* --- STATE 2: SUCCESS CARD (UNLOCKED) --- */}
            <div
                ref={successCardRef}
                className="absolute inset-0 max-w-md mx-auto h-[450px] my-auto bg-white border border-gray-100 rounded-3xl p-0 flex flex-col items-center shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-30 overflow-hidden"
            >
                {/* Header Background */}
                <div className="w-full h-24 bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] relative">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                {/* Profile Image - Overlapping Header */}
                <div className="w-28 h-28 -mt-14 rounded-full border-4 border-white shadow-lg overflow-hidden relative z-10 bg-gray-100">
                    {/* Using a placeholder avatar service to ensure image loads */}
                    <img src="https://avatar.iran.liara.run/public/boy?username=Rohan" alt="Student" className="w-full h-full object-cover" />
                    <div className="absolute bottom-1 right-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> HIRED
                    </div>
                </div>

                <div className="text-center mt-3 px-6">
                    <h3 className="text-[#1f2937] font-extrabold text-2xl">Rohan Mehta</h3>
                    <p className="text-[#ff6b00] font-bold text-sm tracking-wide uppercase mt-1">Cyber Security Analyst</p>
                </div>

                {/* Stats Grid */}
                <div ref={statsContainerRef} className="w-full px-6 mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100 shadow-sm">
                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Education</p>
                        <p className="text-gray-800 font-bold text-sm">B.Com (Non-Tech)</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100 shadow-sm">
                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Before</p>
                        <p className="text-gray-800 font-bold text-sm">Unemployed</p>
                    </div>
                </div>

                {/* Floating Badges (Inside common container to keep them relative) */}
                <div className="relative w-full h-20 mt-4">
                    {/* Badge 1: Salary Hike */}
                    <div
                        ref={salaryBadgeRef}
                        className="absolute left-8 top-2 bg-gradient-to-br from-green-500 to-green-600 text-white p-3 rounded-xl shadow-lg shadow-green-500/30 flex items-center gap-3 transform -rotate-2"
                    >
                        <div className="text-center leading-tight">
                            <p className="text-[10px] font-bold opacity-90 uppercase">Salary Hike</p>
                            <p className="text-2xl font-black">+350%</p>
                        </div>
                    </div>

                    {/* Badge 2: Company Logo */}
                    <div
                        ref={companyBadgeRef}
                        className="absolute right-8 top-4 bg-white p-2 pr-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 transform rotate-2"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" className="w-6 h-6" alt="Microsoft" />
                        <div className="text-left leading-tight">
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Placed At</p>
                            <p className="text-sm font-bold text-gray-900">Microsoft</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EncryptionAnimation;
