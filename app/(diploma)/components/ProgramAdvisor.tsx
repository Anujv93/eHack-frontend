import React from 'react';

const founderFullProfile = {
    name: "Sanjeev Gupta",
    quote: `"Bridging Learning and Industry to Build Future-Ready Careers."`,
    role: `Founder Director – eHack Academy & eHack Global Technology`,
    messageP1: `eHack was established with a clear belief — careers must be shaped with clarity, relevance, and long-term purpose.`,
    messageP2: `Through eHack Academy, students and professionals are guided toward high-impact careers in Cyber Security, Data Science & AI, Robotics & IoT, and Digital Marketing, with learning paths aligned to real-world roles rather than short-term trends.`,
    messageP3: `In parallel, eHack Global Technology delivers enterprise-grade cyber security services including security assessments, GDPR consulting, PCI DSS compliance, malware analysis, and risk management. This strong integration between education and corporate practice ensures that learning remains practical, current, and globally relevant.`,
    closing: `At eHack, knowledge is not just delivered — it is applied, validated, and transformed into meaningful careers.`
};

const ProgramAdvisor = () => {
    return (
        <section className="w-full bg-slate-50 pt-6 pb-10 lg:pt-8 lg:pb-12 relative overflow-hidden font-montserrat border-t border-gray-200">
            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="text-center mb-10 sm:mb-12">
                    <h2 className="font-montserrat font-black text-3xl sm:text-4xl text-[#0b162c] mb-4 leading-tight">
                        Cybersecurity <span className="text-[#ff6b00]">Program Advisor</span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-2xl mx-auto">
                        Learn under the strategic guidance of an industry veteran who bridges the gap between academic learning and enterprise cybersecurity demands.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col md:flex-row items-center md:items-stretch group">
                    
                    {/* Left Side - Image */}
                    <div className="w-full md:w-[35%] bg-gray-50 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100 relative overflow-hidden">
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative z-10 mb-4 ring-2 ring-gray-100 group-hover:ring-[#ff6b00] transition-colors duration-500">
                            <img 
                                src="https://media.licdn.com/dms/image/v2/D5603AQGej8OwHHuMTA/profile-displayphoto-scale_400_400/B56ZkynTF5HcAg-/0/1757490788077?e=1782345600&v=beta&t=bxNpnL_YfJw5U-P9KaJt1T7S17RtR26qz_efJBXhm6o" 
                                alt="Sanjeev Gupta" 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="font-montserrat font-bold text-xl text-[#0b162c] text-center mb-1">
                            Sanjeev Gupta
                        </h3>
                        <p className="text-[#ff6b00] font-semibold text-sm text-center mb-4">
                            Founder and CEO - eHack Academy
                        </p>
                        <a 
                            href="https://www.linkedin.com/in/sanjeev-gupta-59865214/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-[#0077b5] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#005582] transition-colors shadow-sm"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            Connect on LinkedIn
                        </a>
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full md:w-[65%] p-8 sm:p-10 flex flex-col justify-center bg-white">
                        <svg className="w-10 h-10 text-gray-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        
                        <p className="font-montserrat font-semibold text-lg text-[#0b162c] mb-5 italic leading-relaxed">
                            "A successful cybersecurity career isn't built on short-term trends. It requires clarity, practical relevance, and a deep understanding of enterprise-grade security architecture."
                        </p>
                        
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify sm:text-left mb-6">
                            Drawing from extensive experience leading <strong>eHack Global Technology's</strong> enterprise security operations—including risk management, compliance, and malware analysis—Sanjeev ensures our curriculum stays ahead of the rapidly evolving threat landscape. His mission is to transform students into highly capable professionals ready for high-impact roles.
                        </p>
                        
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-[2px] bg-[#ff6b00]"></div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Program Architect
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default ProgramAdvisor;
