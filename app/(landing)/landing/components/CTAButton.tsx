import React from 'react';

interface CTAButtonProps {
    text?: string;
    subtext?: string;
    onClick?: () => void;
    className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({
    text = "DOWNLOAD FREE ACTION ROADMAP",
    subtext = "(Get your personalized career blueprint)",
    onClick,
    className = ""
}) => {
    return (
        <button
            onClick={onClick}
            className={`
        group relative flex flex-col items-center justify-center overflow-hidden
        bg-[#ff6b00] hover:bg-[#e56000] text-white
        py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105
        transition-all duration-300 ease-in-out
        w-full md:w-auto min-w-0 sm:min-w-[220px]
        border-b-4 border-[#cc5500] active:border-b-0 active:translate-y-1
        cursor-pointer
        ${className}
      `}
        >
            <span className="text-sm md:text-base font-bold uppercase tracking-wide font-montserrat z-10 relative">
                {text}
            </span>
            {subtext && (
                <span className="text-xs font-medium opacity-90 mt-0.5 z-10 relative">
                    {subtext}
                </span>
            )}

            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
        </button>
    );
};

export default CTAButton;
