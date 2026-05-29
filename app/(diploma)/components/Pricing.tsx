'use client';
import React, { useState } from 'react';

const Pricing = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('');
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        location: '',
        classMode: '',
        status: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [honeypot, setHoneypot] = useState('');

    const openModal = (plan: string) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (honeypot !== '') return; // Simple bot prevention
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
                    city: formData.location,
                    totalAmount: selectedPlan === 'Upfront' ? 90000 : 135000,
                    inquiryName: `Website - ${formData.name} - Pricing Plan (${selectedPlan})`,
                    leadSource: 'Website Advanced Diploma Page',
                    courses: [{
                        name: 'Advanced Diploma in Cybersecurity',
                        code: 'adv-diploma',
                        category: 'Diploma',
                        price: selectedPlan === 'Upfront' ? 90000 : 135000
                    }],
                    message: `Status: ${formData.status} | Mode: ${formData.classMode} | Selected Plan: ${selectedPlan}`,
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

            alert("Thank you! Our team will contact you shortly to finalize your enrollment.");
            setFormData({ name: '', phone: '', email: '', location: '', classMode: '', status: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error submitting pricing form:', error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-gray-50 py-10 lg:py-14 relative overflow-hidden font-inter border-t border-gray-100">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#eef2f6] skew-x-12 -mr-20 z-0 hidden lg:block opacity-50"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0"></div>

            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-6 shadow-sm mx-auto w-max">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b00] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b00]"></span>
                        </span>
                        <span className="text-[#ff6b00] font-bold text-[11px] uppercase tracking-widest">
                            Investment
                        </span>
                    </div>
                    
                    <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-[#0b162c] leading-tight tracking-tight mb-6">
                        Invest in Your Future: <br className="hidden sm:block" />
                        <span className="text-[#ff6b00]">Real Industry Experience + Assured Stipend</span>
                    </h2>
                    
                    <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
                        Unlock premium career-defining education. Choose a flexible monthly plan or save big with an upfront commitment.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10 max-w-5xl mx-auto">
                    
                    {/* EMI Plan Card */}
                    <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 sm:p-10 shadow-[0_10px_40px_rgb(11,22,44,0.08)] border border-gray-100 hover:shadow-[0_15px_50px_rgb(11,22,44,0.12)] transition-shadow duration-300 relative overflow-hidden group">
                        {/* Orange top border */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 group-hover:bg-[#ff6b00] transition-colors duration-300"></div>
                        
                        <div className="mb-8">
                            <h3 className="font-montserrat font-bold text-2xl text-[#0b162c] mb-2">Flexible EMI Plan</h3>
                            <p className="text-gray-500 text-sm">Spread your investment over 9 months</p>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-baseline gap-2">
                                <span className="font-montserrat font-black text-5xl text-[#0b162c]">₹15,000</span>
                                <span className="text-gray-500 font-medium">/ month</span>
                            </div>
                            <p className="text-[#ff6b00] font-semibold mt-3 text-sm bg-orange-50 inline-block px-3 py-1.5 rounded-md border border-orange-100">Total: ₹1,35,000 (Over 9 months)</p>
                        </div>
                        
                        <ul className="space-y-4 mb-10 text-gray-600">
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>Pay as you learn with 0% EMI</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>Complete value with industry experience</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>Includes assured stipend phase</span>
                            </li>
                        </ul>
                        
                        <button 
                            onClick={() => openModal('EMI')}
                            className="w-full py-4 rounded-xl border-2 border-[#0b162c] text-[#0b162c] font-bold text-lg hover:bg-[#0b162c] hover:text-white transition-colors duration-300">
                            Opt for EMI
                        </button>
                    </div>

                    {/* Upfront Plan Card (Highlighted) */}
                    <div className="w-full lg:w-1/2 bg-[#0b162c] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgb(255,107,0,0.15)] border-2 border-[#ff6b00] relative overflow-hidden transform lg:-translate-y-4">
                        {/* Background flare */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff6b00] rounded-full filter blur-[80px] opacity-40 z-0 pointer-events-none"></div>
                        
                        {/* "Best Value" Badge */}
                        <div className="absolute top-0 right-8 bg-[#ff6b00] text-white text-[11px] font-bold px-4 py-1.5 rounded-b-lg uppercase tracking-wider shadow-md">
                            Best Value
                        </div>
                        
                        <div className="mb-8 relative z-10">
                            <h3 className="font-montserrat font-bold text-2xl text-white mb-2">Upfront Payment</h3>
                            <p className="text-gray-300 text-sm">Save massively by paying all at once</p>
                        </div>
                        
                        <div className="mb-8 relative z-10">
                            <div className="flex items-center gap-3 mb-2 opacity-80">
                                <span className="text-2xl text-gray-400 line-through font-semibold">₹1,35,000</span>
                                <span className="text-[#ff6b00] text-xs font-bold bg-[#ff6b00]/10 px-2 py-1 rounded border border-[#ff6b00]/30 tracking-wide">SAVE ₹45,000</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-montserrat font-black text-5xl md:text-6xl text-white">₹90,000</span>
                                <span className="text-gray-300 font-medium">/ one-time</span>
                            </div>
                        </div>
                        
                        <ul className="space-y-4 mb-10 text-gray-300 relative z-10">
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 rounded-full bg-[#ff6b00]/20 p-1 flex-shrink-0">
                                    <svg className="w-4 h-4 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span>Flat <strong className="text-white">₹45,000 Instant Discount</strong></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 rounded-full bg-[#ff6b00]/20 p-1 flex-shrink-0">
                                    <svg className="w-4 h-4 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span>Complete value + real industry experience</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 rounded-full bg-[#ff6b00]/20 p-1 flex-shrink-0">
                                    <svg className="w-4 h-4 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span className="text-white font-medium">Includes assured stipend phase</span>
                            </li>
                        </ul>
                        
                        <button 
                            onClick={() => openModal('Upfront')}
                            className="w-full py-4 rounded-xl bg-[#ff6b00] text-white font-bold text-lg hover:bg-[#e66000] shadow-[0_5px_20px_rgb(255,107,0,0.4)] hover:shadow-[0_8px_25px_rgb(255,107,0,0.5)] transition-all duration-300 relative z-10 hover:-translate-y-1">
                            Pay Upfront & Save Big
                        </button>
                    </div>

                </div>
                
                {/* Stipend Assurance Banner */}
                <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgb(11,22,44,0.04)] relative overflow-hidden">
                    <div className="absolute left-0 top-0 w-2 h-full bg-[#ff6b00]"></div>
                    <div className="flex items-center gap-5 z-10 relative">
                        <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 border border-orange-100">
                            <svg className="w-8 h-8 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-montserrat font-bold text-xl text-[#0b162c]">Earn while you learn!</h4>
                            <p className="text-gray-600 text-sm mt-1 leading-relaxed">Both plans include our signature industry experience phase with an assured stipend, giving you massive ROI right from the start.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            const courseCurriculum = document.getElementById('curriculum');
                            if (courseCurriculum) {
                                courseCurriculum.scrollIntoView({ behavior: 'smooth' });
                                // Dispatch event to open the Internship module (index 8)
                                window.dispatchEvent(new CustomEvent('openCurriculumModule', { detail: { index: 8 } }));
                            }
                        }}
                        className="flex-shrink-0 text-[#ff6b00] font-bold text-sm bg-orange-50 px-5 py-3 rounded-lg hover:bg-[#ff6b00] hover:text-white transition-colors duration-300">
                        View Curriculum
                    </button>
                </div>

            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className="bg-[#0b162c] p-6 text-white text-center relative">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-white/70 hover:text-white"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            <h3 className="font-montserrat font-bold text-2xl mb-1">Enroll Now</h3>
                            <p className="text-white/80 text-sm">You selected the <span className="font-bold text-[#ff6b00]">{selectedPlan}</span> Plan.</p>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-6 sm:p-8">
                            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                                <div className="hidden" aria-hidden="true">
                                    <input type="text" tabIndex={-1} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff6b00] transition-all text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                                    <input type="tel" required pattern="^\+?[0-9\s\-]{10,15}$" title="Please enter a valid phone number (10-15 digits)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 9876543210" className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff6b00] transition-all text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                    <input type="email" required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Please enter a valid email address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff6b00] transition-all text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Location *</label>
                                    <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="City, State" className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff6b00] transition-all text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Class Mode *</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="classMode" value="Online Live" required onChange={e => setFormData({...formData, classMode: e.target.value})} checked={formData.classMode === 'Online Live'} className="text-[#ff6b00] focus:ring-[#ff6b00]" />
                                            <span className="text-sm text-gray-700">Online Live</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="classMode" value="Offline" required onChange={e => setFormData({...formData, classMode: e.target.value})} checked={formData.classMode === 'Offline'} className="text-[#ff6b00] focus:ring-[#ff6b00]" />
                                            <span className="text-sm text-gray-700">Offline</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Status *</label>
                                    <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff6b00] transition-all text-sm outline-none cursor-pointer">
                                        <option value="" disabled>Select status...</option>
                                        <option value="College Student">College Student</option>
                                        <option value="Working Professional">Working Professional</option>
                                        <option value="Job Seeker">Job Seeker</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <button type="submit" disabled={isSubmitting} className="w-full bg-[#ff6b00] text-white py-3.5 rounded-xl font-bold text-base hover:bg-[#e65c00] transition-all shadow-md mt-2 flex justify-center items-center">
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        "Submit Details"
                                    )}
                                </button>
                                <p className="text-gray-500 text-xs flex items-center justify-center gap-1.5 mt-1">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Your information is secure.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Pricing;
