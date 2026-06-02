'use client';
import React, { useState } from 'react';

const FinalCTA = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'student',
        mode: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [honeypot, setHoneypot] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (honeypot !== '') return;
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/zoho/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.name,
                    lastName: '-',
                    email: formData.email.toLowerCase(),
                    phone: formData.phone,
                    city: '',
                    totalAmount: 0,
                    inquiryName: `Website - ${formData.name} - Advanced Diploma Final CTA`,
                    leadSource: 'Website Advanced Diploma Page',
                    courses: [{
                        name: 'Advanced Diploma in Cybersecurity',
                        code: 'adv-diploma',
                        category: 'Diploma',
                        price: 0
                    }],
                    message: `Status: ${formData.status} | Mode: ${formData.mode} | Message: ${formData.message || 'N/A'}`,
                    agreeWhatsApp: true,
                    pipeline: 'eHack Academy Leads',
                    stage: 'New Inquiry',
                    website: honeypot,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.details || 'Failed to submit');
            }

            alert("Thank you for your inquiry! Our admission counselors will contact you shortly.");
            setFormData({ name: '', email: '', phone: '', status: 'student', mode: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-white py-12 md:py-16 relative overflow-hidden font-montserrat border-t border-gray-100">
            {/* Background glowing orbs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[300px] -left-[300px] w-[800px] h-[800px] bg-[#ff6b00] opacity-[0.05] blur-[150px] rounded-full"></div>
                <div className="absolute -bottom-[300px] -right-[300px] w-[800px] h-[800px] bg-blue-500 opacity-[0.03] blur-[150px] rounded-full"></div>
                
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white border border-gray-200 shadow-[0_8px_40px_rgb(0,0,0,0.06)] rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-12 relative overflow-hidden">
                    
                    {/* Inner Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                        
                        {/* Left Content */}
                        <div className="text-center lg:text-left">
                            <div className="inline-block bg-[#ff6b00]/10 border border-[#ff6b00]/20 text-[#ff6b00] px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-6">
                                Limited Seats Available
                            </div>
                            <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b162c] mb-6 leading-[1.2] lg:leading-[1.1] tracking-tight">
                                Secure Your Future in <br className="hidden sm:block" />
                                <span className="text-[#ff6b00]">Cybersecurity.</span>
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 px-2 sm:px-0">
                                Stop waiting for the perfect moment. The industry needs you right now. Drop your details below to get the complete Advanced Diploma syllabus and a free career counseling session.
                            </p>
                            
                            {/* Process Steps */}
                            <div className="flex flex-col gap-6 text-left px-2 sm:px-0 mt-8 relative">
                                {/* Connecting Line */}
                                <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-orange-100 hidden sm:block"></div>

                                {/* Step 1 */}
                                <div className="flex items-start gap-4 sm:gap-5 relative z-10 group">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#ff6b00] text-white flex items-center justify-center shrink-0 font-black text-xl shadow-[0_8px_20px_rgba(255,107,0,0.3)] transition-transform group-hover:scale-110">
                                        1
                                    </div>
                                    <div className="pt-1.5 sm:pt-2">
                                        <h4 className="text-[#0b162c] font-bold text-lg sm:text-xl mb-1.5">Fill the Enquiry Form</h4>
                                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm">Provide your basic details to register your interest and instantly download the syllabus.</p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex items-start gap-4 sm:gap-5 relative z-10 group">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-orange-200 text-[#ff6b00] flex items-center justify-center shrink-0 font-black text-xl shadow-sm transition-colors group-hover:border-[#ff6b00]">
                                        2
                                    </div>
                                    <div className="pt-1.5 sm:pt-2">
                                        <h4 className="text-[#0b162c] font-bold text-lg sm:text-xl mb-1.5">Get Your Career Blueprint</h4>
                                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm">Our experts will call you shortly to understand your goals and map out a custom career blueprint.</p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex items-start gap-4 sm:gap-5 relative z-10 group">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-orange-200 text-[#ff6b00] flex items-center justify-center shrink-0 font-black text-xl shadow-sm transition-colors group-hover:border-[#ff6b00]">
                                        3
                                    </div>
                                    <div className="pt-1.5 sm:pt-2">
                                        <h4 className="text-[#0b162c] font-bold text-lg sm:text-xl mb-1.5">Enroll on Your Terms</h4>
                                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm">Choose a suitable batch date and select your preferred training mode (Live Online or Offline).</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="bg-slate-50 border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm relative">
                            <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-[#0b162c] mb-2 text-center sm:text-left">Request Information</h3>
                            <p className="text-gray-500 text-xs sm:text-sm mb-6 text-center sm:text-left">Fill out the form below and our admission counselors will reach out to you.</p>
                            
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="block text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                                        <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base text-[#0b162c] focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-transparent transition-all font-medium placeholder:font-normal placeholder-gray-400" placeholder="John Doe" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                                        <input type="tel" required pattern="^\+?[0-9\s\-]{10,15}$" title="Please enter a valid phone number (10-15 digits)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base text-[#0b162c] focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-transparent transition-all font-medium placeholder:font-normal placeholder-gray-400" placeholder="+91 9876543210" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                                    <input type="email" required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Please enter a valid email address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base text-[#0b162c] focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-transparent transition-all font-medium placeholder:font-normal placeholder-gray-400" placeholder="john@example.com" />
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Current Status</label>
                                    <div className="relative">
                                        <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base text-[#0b162c] focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-transparent transition-all appearance-none cursor-pointer font-medium">
                                            <option value="student">College Student / Fresher</option>
                                            <option value="professional">Working IT Professional</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Preferred Mode of Class</label>
                                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                        <label className={`
                                            flex items-center justify-center gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all
                                            ${formData.mode === 'offline' ? 'border-[#ff6b00] bg-orange-50/50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}
                                        `}>
                                            <input 
                                                type="radio" 
                                                name="final_class_mode" 
                                                value="offline"
                                                checked={formData.mode === 'offline'}
                                                onChange={(e) => setFormData({...formData, mode: e.target.value})}
                                                className="hidden"
                                                required
                                            />
                                            <span className={`font-bold text-[11px] sm:text-[13px] text-center ${formData.mode === 'offline' ? 'text-[#ff6b00]' : 'text-gray-600'}`}>Offline Classroom</span>
                                        </label>
                                        
                                        <label className={`
                                            flex items-center justify-center gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all
                                            ${formData.mode === 'live-online' ? 'border-[#ff6b00] bg-orange-50/50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}
                                        `}>
                                            <input 
                                                type="radio" 
                                                name="final_class_mode" 
                                                value="live-online"
                                                checked={formData.mode === 'live-online'}
                                                onChange={(e) => setFormData({...formData, mode: e.target.value})}
                                                className="hidden"
                                            />
                                            <span className={`font-bold text-[11px] sm:text-[13px] text-center ${formData.mode === 'live-online' ? 'text-[#ff6b00]' : 'text-gray-600'}`}>Live Online</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Honeypot field (hidden from real users) */}
                                <div className="hidden" aria-hidden="true">
                                    <input type="text" tabIndex={-1} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Any Questions?</label>
                                    <textarea rows={2} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base text-[#0b162c] focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-transparent transition-all resize-none font-medium placeholder:font-normal placeholder-gray-400" placeholder="What would you like to know? (Optional)"></textarea>
                                </div>

                                <button type="submit" disabled={isSubmitting} className="w-full bg-[#ff6b00] text-white font-bold text-base sm:text-lg py-3 sm:py-4 rounded-lg sm:rounded-xl hover:bg-[#e56000] transition-all shadow-lg shadow-[#ff6b00]/30 mt-2 flex justify-center items-center hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        "Apply Now"
                                    )}
                                </button>
                                <p className="text-center text-[10px] text-gray-400 mt-2 font-medium">Your information is 100% secure.</p>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
