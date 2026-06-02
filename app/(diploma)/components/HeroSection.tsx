// 'use client';

// import React from 'react';

// const HeroSection = () => {
//     return (
//         <section className="relative w-full min-h-screen bg-white font-montserrat pt-20 pb-16">
            
//             {/* Header / Logo */}
//             <div className="absolute top-0 left-0 w-full z-50 p-6 lg:px-12 xl:px-20 max-w-[1400px] mx-auto">
//                 <img
//                     src="/images/white-academy.png"
//                     alt="eHack Academy"
//                     className="w-32 sm:w-40 h-auto object-contain filter invert brightness-0"
//                 />
//             </div>

//             <div className="container mx-auto px-6 lg:px-12 xl:px-20 max-w-[1400px] pt-12 sm:pt-20">
                
//                 {/* TOP SECTION: Split Left (Text) / Right (Image) */}
//                 <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-8 lg:mb-12">
                    
//                     {/* Top Left: Typography & CTA */}
//                     <div className="flex-1 flex flex-col justify-center relative z-10">
//                         {/* Starburst Graphic (Decorative) */}
//                         <div className="absolute right-0 bottom-20 w-32 h-32 opacity-20 pointer-events-none hidden md:block">
//                             <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M50 0L53 40L90 10L60 47L100 50L60 53L90 90L53 60L50 100L47 60L10 90L40 53L0 50L40 47L10 10L47 40L50 0Z" fill="#ff6b00"/>
//                             </svg>
//                         </div>

//                         <h1 className="font-montserrat font-black text-[#1a1a1a] text-[3rem] sm:text-[4rem] lg:text-[4.5rem] leading-[1.05] tracking-tight mb-6">
//                             Advanced <br />
//                             Diploma in <br />
//                             <span className="relative inline-block text-[#ff6b00]">
//                                 Cybersecurity.
//                                 {/* Orange Swoosh Underline */}
//                                 <svg className="absolute w-[110%] h-6 -bottom-3 -left-2 text-[#ff6b00]/80" viewBox="0 0 100 20" preserveAspectRatio="none">
//                                     <path d="M0 15 Q 50 0 100 10" stroke="currentColor" strokeWidth="3" fill="transparent" strokeLinecap="round" />
//                                 </svg>
//                             </span>
//                         </h1>

//                         <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-medium mb-10 leading-relaxed max-w-lg">
//                             We equip you with elite skills to protect IT infrastructure, secure data, and run risk analysis. Zero prior IT experience required.
//                         </p>

//                         <div className="flex flex-col sm:flex-row items-center gap-4">
//                             <button className="w-full sm:w-auto px-8 py-3.5 bg-[#ff6b00] text-white rounded-full font-montserrat font-bold text-sm tracking-wide hover:bg-[#e65c00] transition-colors shadow-[0_8px_20px_rgba(255,107,0,0.25)]">
//                                 Download Syllabus
//                             </button>
//                             <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-800 border border-gray-300 rounded-full font-montserrat font-bold text-sm tracking-wide hover:border-gray-400 hover:bg-gray-50 transition-colors shadow-sm">
//                                 Book Counseling
//                             </button>
//                         </div>
//                     </div>

//                     {/* Top Right: Image & Floating Card */}
//                     <div className="flex-1 relative">
//                         <div className="w-full h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-lg relative">
//                             <img 
//                                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
//                                 alt="Cybersecurity Student" 
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>

//                         {/* Floating Card (Overlapping bottom-left of image) */}
//                         <div className="absolute -bottom-8 lg:bottom-12 -left-4 sm:-left-12 lg:-left-16 bg-white rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 w-64 z-20">
//                             <div className="flex justify-between items-center mb-4">
//                                 <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Placement Rate</span>
//                                 <span className="text-gray-400 text-xs">2024 - 25 ▼</span>
//                             </div>
//                             <div className="flex items-center gap-2 mb-2">
//                                 <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
//                                 <span className="font-montserrat font-black text-2xl text-gray-900">100%</span>
//                             </div>
//                             {/* Dummy Graph SVG */}
//                             <svg className="w-full h-12" viewBox="0 0 200 50">
//                                 <path d="M0 40 Q 30 10 50 30 T 100 20 T 150 40 T 200 10" fill="none" stroke="#ff6b00" strokeWidth="3" strokeLinecap="round" />
//                                 <circle cx="100" cy="20" r="4" fill="#1a1a1a" stroke="white" strokeWidth="2" />
//                                 {/* Small label near the dot */}
//                                 <rect x="85" y="0" width="30" height="14" rx="4" fill="#1a1a1a" />
//                                 <text x="100" y="10" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">100%</text>
//                             </svg>
//                         </div>
//                     </div>

//                 </div>

//                 {/* BOTTOM SECTION: 3 Cards Row */}
//                 <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 mt-16 lg:mt-8">
                    
//                     {/* Card 1: Wide Dark Gradient */}
//                     <div className="md:col-span-12 lg:col-span-6 bg-gradient-to-br from-[#1a1a1a] to-[#3a1b0a] rounded-[2rem] p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
//                         {/* Background glow for the gradient feel */}
//                         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#ff6b00] blur-[100px] opacity-40 pointer-events-none"></div>
                        
//                         <div className="flex -space-x-4 relative z-10">
//                             <img className="w-14 h-14 rounded-full border-[3px] border-[#2a2a2a] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
//                             <img className="w-14 h-14 rounded-full border-[3px] border-[#2a2a2a] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
//                             <img className="w-14 h-14 rounded-full border-[3px] border-[#2a2a2a] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
//                             <img className="w-14 h-14 rounded-full border-[3px] border-[#2a2a2a] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
//                         </div>
//                         <div className="relative z-10 text-center sm:text-left">
//                             <p className="font-montserrat font-black text-white text-3xl sm:text-4xl mb-1">2000+</p>
//                             <p className="text-gray-300 text-sm font-medium">Successful Alumni <br className="hidden sm:block" />and Placements</p>
//                         </div>
//                     </div>

//                     {/* Card 2: Light Square */}
//                     <div className="md:col-span-6 lg:col-span-3 bg-[#fff5f0] rounded-[2rem] p-8 flex flex-col justify-center items-center text-center border border-orange-50 shadow-sm">
//                         <p className="font-montserrat font-black text-[#ff6b00] text-4xl sm:text-5xl mb-2">7-9</p>
//                         <p className="text-gray-800 font-bold text-lg mb-1">Months</p>
//                         <p className="text-gray-500 text-xs font-medium">Duration (Classroom + Online)</p>
//                     </div>

//                     {/* Card 3: Solid Orange Square */}
//                     <div className="md:col-span-6 lg:col-span-3 bg-[#ff6b00] rounded-[2rem] p-8 flex flex-col justify-center items-center text-center text-white relative shadow-[0_10px_30px_rgba(255,107,0,0.3)]">
//                         {/* Top right subtle icon */}
//                         <div className="absolute top-6 right-6 opacity-50">
//                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
//                         </div>
                        
//                         {/* Center graphic */}
//                         <div className="mb-4 text-white opacity-90">
//                             <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
//                         </div>

//                         <p className="font-montserrat font-black text-4xl mb-1">200+</p>
//                         <p className="text-white/90 text-sm font-medium">Hours of practical lab training</p>
//                     </div>

//                 </div>

//             </div>
            
//         </section>
//     );
// };

// export default HeroSection;
