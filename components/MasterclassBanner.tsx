'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MasterclassData } from '@/data/masterclasses';
import gsap from 'gsap';

interface MasterclassBannerProps {
  data: MasterclassData;
}

export default function MasterclassBanner({ data }: MasterclassBannerProps) {
  const [openDay, setOpenDay] = useState<number | null>(0);
  const animationContainerRef = useRef<HTMLDivElement>(null);

  const toggleDay = (index: number) => {
    if (openDay === index) {
      setOpenDay(null);
    } else {
      setOpenDay(index);
    }
  };

  const pairs = [
      { text: "$100M Offers", book: "/images/books/100m-offers.jpg", author: "/images/books/Alex-Hermozi-Freelancing-removebg-preview.png", authorScale: "h-[140px] sm:h-[180px]" },
      { text: "$100M Leads", book: "/images/books/100m-leads-original-imagvjkcv3cgu8mf.webp", author: "/images/books/Alex-Hermozi-Freelancing-removebg-preview.png", authorScale: "h-[140px] sm:h-[180px]" },
      { text: "Purple Cow", book: "/images/books/purple-cow.jpg", author: "/images/books/seth%20godin.png", authorScale: "h-[120px] sm:h-[160px]" },
      { text: "Traffic Secrets", book: "/images/books/traffic-secrets.jpg", author: "/images/books/Russell%20Brunson.png", authorScale: "h-[140px] sm:h-[180px]" },
      { text: "22 Immutable Laws", book: "/images/books/22-laws.jpg", author: "/images/books/al%20rise.png", authorScale: "h-[140px] sm:h-[180px]" }
  ];

  useEffect(() => {
    if (!animationContainerRef.current) return;
    const slides = animationContainerRef.current.querySelectorAll('.creative-slide');
    
    // Reset any previous animations
    gsap.set(slides, { opacity: 0 });
    
    const tl = gsap.timeline({ repeat: -1 });
    
    slides.forEach((slide) => {
      const book = slide.querySelector('.book-img');
      const author = slide.querySelector('.author-img');
      const text = slide.querySelector('.slide-text');

      // Animate In Sequence
      tl.addLabel('in')
        .set(slide, { opacity: 1 })
        // Book flies in from right with a 3D flip
        .fromTo(book, 
            { x: 150, rotateY: 60, opacity: 0, scale: 0.8 }, 
            { x: 0, rotateY: -15, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" }, 'in'
        )
        // Author slides in from left, slightly delayed
        .fromTo(author, 
            { x: -100, opacity: 0, scale: 0.9 }, 
            { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, 'in+=0.2'
        )
        // Text pill pops up from below
        .fromTo(text, 
            { y: 30, opacity: 0, scale: 0.5 }, 
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" }, 'in+=0.4'
        )
        
      // Hold & Float effect for 2 seconds
      tl.to(book, { y: -8, duration: 1.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 'in+=0.5')
        .to(author, { y: -4, duration: 1.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 'in+=0.5');

      // Animate Out Sequence
      tl.addLabel('out', "+=2")
        .to(book, { x: -100, opacity: 0, rotateY: -45, duration: 0.6, ease: "power2.in" }, 'out')
        .to(author, { x: 100, opacity: 0, duration: 0.6, ease: "power2.in" }, 'out')
        .to(text, { y: -20, opacity: 0, scale: 0.8, duration: 0.4 }, 'out')
        .set(slide, { opacity: 0 }, 'out+=0.6');
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="masterclass-section" className="w-full py-8 sm:py-12 px-4 sm:px-6 flex justify-center bg-[#f8fafc]">
      
      {/* Banner Container */}
      <div className="relative w-full max-w-[1300px] bg-white rounded-2xl lg:rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden flex flex-col lg:flex-row min-h-auto lg:min-h-[550px]">
        
        {/* === BACKGROUND SHAPES === */}
        {/* Dark Slate Base Curve (Angled on mobile, curved on desktop) */}
        <div className="absolute top-[40%] lg:top-[20%] right-[-20%] lg:right-[-10%] w-[150%] lg:w-[75%] h-[150%] bg-[#111827] rounded-[20%] lg:rounded-[100%] rotate-[-8deg] lg:rotate-[-12deg] origin-top-right z-0"></div>
        {/* Primary Orange Curve */}
        <div className="absolute top-[43%] lg:top-[35%] right-[-15%] lg:right-[-5%] w-[140%] lg:w-[70%] h-[150%] bg-[#ff6b00] rounded-[20%] lg:rounded-[100%] rotate-[-10deg] lg:rotate-[-15deg] origin-top-right z-0"></div>
        
        {/* Floating Outline Circles */}
        <div className="absolute top-10 left-[45%] w-8 h-8 rounded-full border-[1.5px] border-[#ff6b00] z-0 opacity-80"></div>
        <div className="absolute top-20 right-[15%] w-10 h-10 rounded-full border-[1.5px] border-white/50 z-10"></div>
        <div className="absolute bottom-16 left-[35%] w-6 h-6 rounded-full border-[1.5px] border-[#111827] z-0 opacity-30"></div>

        {/* === LEFT COLUMN: Typography & Offer === */}
        <div className="w-full lg:w-[40%] relative z-10 p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          
          <div className="font-bold text-gray-900 tracking-widest text-xs sm:text-sm uppercase mb-4 sm:mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ff6b00]"></div>
            Digital Marketing
          </div>

          <div className="mb-4 sm:mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-gray-900 tracking-tight flex flex-col">
              <span className="font-serif italic font-medium text-2xl sm:text-3xl md:text-4xl text-[#ff6b00] mb-1">7-Day Live</span>
              <span className="uppercase text-transparent" style={{ WebkitTextStroke: '2px #111827' }}>MASTER</span>
              <span className="uppercase">CLASS</span>
            </h2>
          </div>

          <p className="text-gray-700 text-sm md:text-base font-semibold leading-relaxed mb-4 max-w-sm">
            Gain the experience of world&apos;s top marketers — in just 7 days.
          </p>

          {/* Early Bird Pricing Block */}
          <div className="bg-[#fff7f0] border border-[#ff6b00]/20 rounded-xl p-3 sm:p-4 mb-5 sm:mb-6 max-w-sm">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="bg-[#ff6b00] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">Early Bird</span>
              <span className="text-[#ff6b00] font-extrabold text-xs sm:text-sm">40% OFF</span>
            </div>
            <div className="flex items-baseline gap-2.5 mb-1.5 sm:mb-2">
              <span className="text-gray-400 line-through text-sm sm:text-base font-medium">₹7,000</span>
              <span className="text-gray-900 font-black text-xl sm:text-2xl md:text-3xl">₹4,200</span>
            </div>
            <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">
              Generate your live class invoice to lock in your 40% discount. A booking token of <span className="font-bold text-gray-700">₹500</span> will appear on your payslip — no money is deducted upfront.
            </p>
          </div>

          <div className="mt-auto flex items-center gap-3 sm:gap-4">
            <button className="bg-[#ff6b00] hover:bg-[#e56000] text-white font-bold py-2.5 px-5 sm:py-3.5 sm:px-8 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(255,107,0,0.3)] hover:-translate-y-1 text-sm sm:text-base">
              Generate Invoice
            </button>
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-widest">Call For Details</span>
              <span className="text-xs sm:text-sm font-black text-gray-900">+91-9513393880</span>
            </div>
          </div>
        </div>

        {/* === RIGHT COLUMN: Creative GSAP Animation & Curriculum === */}
        <div className="w-full lg:w-[60%] relative z-10 p-5 sm:p-8 md:p-12 flex flex-col lg:flex-row items-center justify-end gap-6 sm:gap-8 lg:gap-12 min-h-auto lg:min-h-[550px]">
          
          {/* Creative GSAP 3D Floating Book/Author Animation */}
          <div ref={animationContainerRef} className="relative w-full max-w-[220px] sm:max-w-[280px] h-[220px] sm:h-[280px] lg:absolute lg:left-0 lg:top-[30%] lg:-translate-y-1/2 lg:-translate-x-[25%] z-20 flex-shrink-0 mx-auto lg:mx-0 mt-2 sm:mt-0 lg:mt-0 perspective-[1000px]">
            {/* Ambient Background Glow for the floating elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-white/10 blur-[40px] sm:blur-[50px] rounded-full z-0"></div>

            {pairs.map((pair, idx) => (
              <div key={idx} className="creative-slide absolute inset-0 w-full h-full flex flex-col items-center justify-end z-10 opacity-0 pointer-events-none">
                
                <div className="relative w-full h-[180px] sm:h-[220px] flex items-end justify-center">
                   {/* Book Image */}
                   <img 
                      src={pair.book} 
                      className="book-img absolute right-4 lg:right-0 bottom-4 w-[85px] h-[120px] sm:w-[110px] sm:h-[155px] rounded-md shadow-[0_15px_30px_rgba(0,0,0,0.6)] object-cover z-10 border-[3px] border-white" 
                      alt="Book Cover"
                   />
                   {/* Author Image */}
                   <img 
                      src={pair.author} 
                      className={`author-img absolute left-4 lg:-left-6 bottom-0 ${pair.authorScale} w-auto object-contain z-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]`} 
                      alt="Author"
                   />
                </div>

                {/* Animated Floating Text Pill */}
                <div className="slide-text relative z-30 mt-4 bg-[#111827] rounded-full px-5 py-2 border border-gray-700 text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-xl">
                  {pair.text}
                </div>
              </div>
            ))}
          </div>

          {/* Curriculum Accordion */}
          <div className="w-full max-w-[480px] lg:ml-auto relative z-30 bg-[#fff0e6] rounded-2xl border border-orange-200/50 p-4 sm:p-6 shadow-[0_20px_40px_rgba(17,24,39,0.2)] h-[400px] sm:h-[480px] flex flex-col mb-2 lg:mb-0">
            <div className="flex items-center justify-between border-b border-orange-200 pb-3 sm:pb-4 mb-4 sm:mb-5">
              <h3 className="text-gray-900 font-black uppercase tracking-widest text-sm sm:text-base">
                Curriculum Schedule
              </h3>
              <span className="text-[10px] sm:text-[11px] text-[#ff6b00] font-bold bg-[#ff6b00]/10 px-2 sm:px-3 py-1 rounded-full border border-[#ff6b00]/20">
                7 Modules
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-3 space-y-3 custom-banner-scroll">
              <style dangerouslySetInnerHTML={{__html: `
                .custom-banner-scroll::-webkit-scrollbar { width: 8px; }
                .custom-banner-scroll::-webkit-scrollbar-track { background: #ffe4d6; border-radius: 10px; border: 1px solid #fff0e6; }
                .custom-banner-scroll::-webkit-scrollbar-thumb { background: #ff6b00; border-radius: 10px; border: 2px solid #fff0e6; }
                .custom-banner-scroll::-webkit-scrollbar-thumb:hover { background: #e56000; }
              `}} />

              {data.schedule.map((day, idx) => {
                const isOpen = openDay === idx;
                return (
                  <div key={idx} className="bg-white rounded-xl overflow-hidden transition-all shadow-sm border border-orange-100">
                    <button 
                      onClick={() => toggleDay(idx)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none hover:bg-orange-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] font-black bg-[#ff6b00] text-white px-2.5 py-1 rounded-md shadow-sm">
                          D{day.day}
                        </span>
                        <h4 className="text-xs md:text-sm font-medium text-gray-900 leading-tight">
                          {day.title}
                        </h4>
                      </div>
                      <span className={`text-[#ff6b00] text-sm font-light transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>

                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[400px]' : 'max-h-0'}`}>
                      <div className="px-5 pb-4 pt-2 border-t border-orange-100 bg-orange-50/30">
                        <ul className="space-y-2">
                          {day.sessions.map((session, sIdx) => (
                            <li key={sIdx} className="text-[13px] md:text-sm text-gray-700 font-medium leading-relaxed flex items-start gap-2 p-1.5 rounded hover:bg-orange-100/50 transition-colors">
                              <span className="text-[#ff6b00] font-black mt-1 opacity-70">•</span> 
                              <span className={session.type === 'workshop' ? 'font-bold text-gray-900' : ''}>
                                {session.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
