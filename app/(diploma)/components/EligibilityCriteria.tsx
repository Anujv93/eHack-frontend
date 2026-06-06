import React from 'react';

const EligibilityCriteria = () => {
    return (
        <section className="w-full bg-slate-50 py-8 lg:py-12 font-montserrat relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ff6b00]/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100/40 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    
                    {/* Left Side: Content */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8">
                        <div className="text-left">
                            <h2 className="font-montserrat font-black text-[26px] sm:text-3xl lg:text-[40px] text-[#0b162c] leading-tight mb-3">
                                Eligibility <span className="text-[#ff6b00]">Criteria</span>
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                                Our Advanced Diploma is designed for individuals driven to make an impact in the cybersecurity space. See if you match our ideal candidate profile.
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-4 sm:gap-5">
                            {/* Who Is This For */}
                            <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 transition-all hover:shadow-[0_8px_30px_rgb(255,107,0,0.08)]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-montserrat font-bold text-lg sm:text-xl text-[#0b162c]">Who Is This Program For?</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['Eligible student for this program', 'Cybersecurity Analysts', 'Ethical Hackers', 'IT Professionals'].map((badge, idx) => (
                                        <span key={idx} className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-700 font-medium text-xs sm:text-sm">
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Eligibility Criteria List */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 transition-all hover:shadow-[0_8px_30px_rgb(255,107,0,0.08)]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-montserrat font-bold text-lg sm:text-xl text-[#0b162c]">Required Qualifications</h3>
                                </div>
                                <ul className="flex flex-col gap-3">
                                    <li className="flex items-start gap-2.5">
                                        <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 text-sm sm:text-base leading-snug font-medium">Bachelor's degree with an average score of at least 50%</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 text-sm sm:text-base leading-snug font-medium">Basic understanding of programming concepts</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 text-sm sm:text-base leading-snug font-medium">2 years of work experience is preferred</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side: Image */}
                    <div className="w-full lg:w-1/2 relative group max-w-lg mx-auto">
                        <div className="absolute inset-0 bg-[#ff6b00]/20 rounded-2xl transform rotate-2 scale-105 transition-transform duration-500 group-hover:rotate-3"></div>
                        <div className="absolute inset-0 bg-[#0b162c]/10 rounded-2xl transform -rotate-2 scale-105 transition-transform duration-500 group-hover:-rotate-3"></div>
                        <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] lg:aspect-[4/3]">
                            <img 
                                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600" 
                                alt="Professional students analyzing data" 
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-5 left-5 right-5">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-4">
                                    <p className="text-white font-semibold text-xs sm:text-sm leading-relaxed">
                                        "Success in cybersecurity requires a strong foundation. Are you ready to elevate your career?"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default EligibilityCriteria;
