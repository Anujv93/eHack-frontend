import React, { useEffect, useState } from 'react';

interface UnlockAnimationProps {
    onUnlock: () => void;
}

const UnlockAnimation = ({ onUnlock }: UnlockAnimationProps) => {
    const [step, setStep] = useState<'locked' | 'shaking' | 'unlocked'>('locked');

    useEffect(() => {
        // Step 1: Start Shaking (simulate brute force)
        const shakeTimer = setTimeout(() => {
            setStep('shaking');
        }, 100);

        // Step 2: Unlock and Burst
        const unlockTimer = setTimeout(() => {
            setStep('unlocked');
            // Notify parent quickly after visual unlock to start card transition
            setTimeout(onUnlock, 400);
        }, 1200);

        return () => {
            clearTimeout(shakeTimer);
            clearTimeout(unlockTimer);
        };
    }, [onUnlock]);

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm transition-all">

            {/* Shockwave Effect on Unlock */}
            {step === 'unlocked' && (
                <div className="absolute w-64 h-64 bg-green-500/30 rounded-full animate-shockwave"></div>
            )}

            {/* Lock Icon Container */}
            <div className={`
                relative mb-4 text-6xl text-white transition-all duration-300
                ${step === 'shaking' ? 'animate-shake' : ''}
                ${step === 'unlocked' ? 'animate-unlock-pop text-green-400' : ''}
            `}>
                <div className="relative">
                    {/* Lock Body */}
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                        {step === 'unlocked' ? (
                            // Open Lock
                            <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" />
                        ) : (
                            // Closed Lock
                            <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" />
                        )}
                        <path fillRule="evenodd" d="M18 10V7a6 6 0 00-12 0v3a2.5 2.5 0 00-2.5 2.5v9c0 1.1.9 2 2 2h13a2 2 0 002-2v-9a2.5 2.5 0 00-2.5-2.5zM8 7a4 4 0 118 0v3H8V7z" clipRule="evenodd" />
                    </svg>

                    {/* Unlocked shackle specifically if needed, but simple SVG swap is easier */}
                    {step === 'unlocked' && (
                        <div className="absolute -top-4 right-0 w-8 h-8 text-green-400 animate-bounce">
                            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                    )}
                </div>
            </div>

            {/* Status Text */}
            <div className={`font-mono text-sm font-bold tracking-widest transition-colors duration-300 ${step === 'unlocked' ? 'text-green-400' : 'text-gray-400'}`}>
                {step === 'locked' && "ENCRYPTED OFFER DETECTED"}
                {step === 'shaking' && "DECRYPTING..."}
                {step === 'unlocked' && "ACCESS GRANTED"}
            </div>

            {/* Progress Bar during shaking */}
            {step === 'shaking' && (
                <div className="w-32 h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-green-500 animate-[width_1s_ease-out_forwards]" style={{ width: '100%' }}></div>
                </div>
            )}

        </div>
    );
};

export default UnlockAnimation;
