import React, { useEffect, useState, useRef } from 'react';

interface SuccessCardProps {
    data: {
        name: string;
        role: string;
        company: string;
        package: string;
        hike?: string;
        companyLogo?: string;
        prevRole: string;
        image: string;
    };
}

const SuccessCard = ({ data }: SuccessCardProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    return (
        <div
            className={`
                relative w-full max-w-sm mx-auto transition-all duration-700 ease-out z-50
                ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}
            `}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={cardRef}
                className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-2xl text-gray-800 transform-gpu transition-transform duration-200 ease-out relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Decorative Background Mesh */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-orange-50 rounded-full blur-[40px] sm:blur-[50px] -z-10 translate-x-8 -translate-y-8 sm:translate-x-10 sm:-translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-full blur-[40px] sm:blur-[50px] -z-10 -translate-x-8 translate-y-8 sm:-translate-x-10 sm:translate-y-10"></div>

                {/* Header: Image & Status */}
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-green-500 p-0.5 shadow-lg">
                            <img src={data.image} alt={data.name} className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                            HIRED
                        </div>
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-sm sm:text-lg font-bold text-gray-900 leading-tight truncate pr-2">{data.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            {data.companyLogo && (
                                <img
                                    src={data.companyLogo}
                                    alt={data.company}
                                    className="w-auto object-contain h-6 sm:h-8 origin-left"
                                    style={{
                                        transform:
                                            data.company === 'Ampcus Cyber' ? 'scale(2.5)' :
                                                data.company === 'Fiserv' ? 'scale(2.0)' :
                                                    data.company === 'Anuvu' ? 'scale(2.2)' :
                                                        data.company === 'SISA' ? 'scale(1.0)' :
                                                            'scale(1.2)'
                                    }}
                                />
                            )}
                            {!data.companyLogo && (
                                <span className="text-[10px] sm:text-xs font-bold text-gray-700">{data.company}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* TRANSFORM: Prev Role -> New Role */}
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-100 relative overflow-hidden">
                    {/* Shine Effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>

                    <div className="flex items-start justify-between relative z-10 gap-1">
                        <div className="text-center w-[42%] flex flex-col items-start text-left">
                            <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold mb-0.5 pl-1">Was</p>
                            <p className="text-[10px] sm:text-xs text-gray-600 font-bold leading-tight pl-1 line-clamp-2 min-h-[2.5em] mt-1">{data.prevRole}</p>
                        </div>

                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-2">
                            <span className="text-green-600 font-bold text-base sm:text-lg">➜</span>
                        </div>

                        <div className="text-center w-[42%] flex flex-col items-end text-right">
                            <p className="text-[9px] sm:text-[10px] text-gray-900 uppercase font-bold mb-0.5 pr-1">Now</p>
                            <p className="text-[10px] sm:text-xs text-indigo-600 font-black leading-tight pr-1 line-clamp-2 min-h-[2.5em] mt-1">{data.role}</p>
                        </div>
                    </div>
                </div>

                {/* Footer: Salary Hike / Package */}
                <div className="border-t border-gray-100 pt-2 sm:pt-3 flex justify-between items-center text-[10px] sm:text-xs">
                    <span className="text-gray-500 font-medium shrink-0">Salary Hike Achieved:</span>
                    <span className="font-black text-green-600 text-sm sm:text-base ml-2">{data.hike || data.package}</span>
                </div>
            </div>
        </div>
    );
};

export default SuccessCard;
