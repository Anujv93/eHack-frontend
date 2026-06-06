import React from 'react';

const CurrentCybersecurity = () => {
    return (
        <section className="w-full bg-white py-10 lg:py-16 font-montserrat relative overflow-hidden border-t border-gray-100">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-100/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
                    
                    {/* Left Side: Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center text-center sm:text-left mt-6 lg:mt-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[#ff6b00] text-xs font-bold tracking-wide uppercase mb-4 w-max mx-auto sm:mx-0">
                            <span className="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse"></span>
                            The Industry Need
                        </div>
                        
                        <h2 className="font-montserrat font-black text-[26px] sm:text-4xl lg:text-[38px] text-[#0b162c] leading-tight sm:leading-[1.15] mb-4 sm:mb-5">
                            Bridging the Global <br className="hidden sm:block" />
                            <span className="text-[#ff6b00]">Cybersecurity Skills Gap</span>
                        </h2>
                        
                        <div className="flex flex-col gap-4 text-gray-600 text-sm sm:text-base leading-relaxed text-justify sm:text-left">
                            <p>
                                In today's hyper-connected digital landscape, organizations are under immense pressure to safeguard their sensitive data, networks, and infrastructure against escalating cyber threats. This reality has exposed a severe, global shortage of capable cybersecurity engineers, creating a highly lucrative and fast-growing job market for professionals armed with the right expertise and validated certifications.
                            </p>
                            
                            <div className="border-l-4 border-[#ff6b00] pl-4 py-2 bg-slate-50 rounded-r-xl text-left">
                                <p className="font-medium text-gray-800">
                                    The <strong className="text-[#0b162c]">AI-Powered Advanced Diploma in Cybersecurity</strong> at eHack Academy directly addresses this critical industry gap.
                                </p>
                            </div>
                            
                            <p>
                                By blending advanced threat intelligence with intensive, hands-on defensive and offensive security training, our program transforms passionate learners into elite cybersecurity experts. You won't just learn theory—you'll gain the tactical, real-world experience needed to secure high-impact roles, backed by globally recognized EC-Council certifications that unlock opportunities worldwide.
                            </p>
                        </div>
                        
                        <div className="mt-8 flex items-center justify-center sm:justify-start gap-4 sm:gap-6">
                            <div className="flex flex-col">
                                <span className="font-black text-[22px] sm:text-3xl text-[#0b162c]">3.5M+</span>
                                <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">Unfilled Jobs Globally</span>
                            </div>
                            <div className="w-px h-8 sm:h-10 bg-gray-200"></div>
                            <div className="flex flex-col">
                                <span className="font-black text-[22px] sm:text-3xl text-[#0b162c]">0%</span>
                                <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">Unemployment Rate</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Image */}
                    <div className="w-full lg:w-1/2 relative group max-w-lg mx-auto">
                        {/* Decorative borders */}
                        <div className="absolute -inset-3 bg-gradient-to-r from-[#ff6b00] to-orange-300 rounded-[1.5rem] opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-[1.5rem] transform translate-x-3 translate-y-3 -z-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-500"></div>
                        
                        <div className="relative rounded-[1.5rem] overflow-hidden shadow-xl bg-white aspect-[4/3] lg:aspect-[4/3]">
                            <img 
                                src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1600" 
                                alt="Modern Cybersecurity Infrastructure" 
                                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-in-out"
                            />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0b162c]/60 via-[#0b162c]/10 to-transparent"></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default CurrentCybersecurity;
