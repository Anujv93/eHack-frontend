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
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="relative">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-green-500 p-0.5 shadow-lg">
                            <img src={data.image} alt={data.name} className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                            HIRED
                        </div>
                    </div>
                    <div>
                        <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{data.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            {data.companyLogo && (
                                <img
                                    src={data.companyLogo}
                                    alt={data.company}
                                    className="w-auto object-contain h-8 sm:h-10 origin-left"
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

                {/* Central Value Prop - Salary Hike */}
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-100 relative overflow-hidden">
                    {/* Shine Effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>

                    <div className="flex items-center justify-between relative z-10">
                        <div className="text-center">
                            <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold">Role</p>
                            <p className="text-[10px] sm:text-xs text-gray-500 font-medium truncate max-w-[60px] sm:max-w-[80px]">{data.prevRole}</p>
                        </div>

                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 font-bold text-base sm:text-lg">➜</span>
                        </div>

                        <div className="text-center">
                            <p className="text-[9px] sm:text-[10px] text-green-600 uppercase font-bold">Salary Hike</p>
                            <p className="text-lg sm:text-xl font-black text-gray-900">{data.hike || data.package}</p>
                        </div>
                    </div>
                </div>

                {/* Footer details */}
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-[10px] sm:text-xs">
                    <span className="text-gray-500">New Role:</span>
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{data.role}</span>
                </div>
            </div>
        </div>
    );
};

export default SuccessCard;
