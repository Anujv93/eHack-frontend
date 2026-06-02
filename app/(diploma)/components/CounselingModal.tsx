'use client';

import React, { useState } from 'react';

interface CounselingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CounselingModal: React.FC<CounselingModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        status: '',
        mode: ''
    });

    const [honeypot, setHoneypot] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Bot protection
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
                    phone: formData.contact,
                    city: '',
                    totalAmount: 0,
                    inquiryName: `Website - ${formData.name} - Counseling Modal`,
                    leadSource: 'Website Advanced Diploma Page',
                    courses: [{
                        name: 'Advanced Diploma in Cybersecurity',
                        code: 'adv-diploma',
                        category: 'Diploma',
                        price: 0
                    }],
                    message: `Status: ${formData.status} | Mode: ${formData.mode}`,
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

            alert('Thank you! Our career counselor will contact you shortly.');
            onClose();
        } catch (error) {
            console.error('Error submitting counseling form:', error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-montserrat">
            <div className="bg-white rounded-[2rem] w-full max-w-xl max-h-[95vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors z-10"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6 sm:p-8 lg:p-10">
                    <div className="text-center mb-8">
                        <h2 className="font-montserrat font-black text-3xl text-[#0b162c] mb-3">Talk to a <span className="text-[#ff6b00]">Career Expert</span></h2>
                        <p className="text-gray-600 font-medium">Take the first step towards a highly-paid cybersecurity career. Get all your questions answered.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-all text-sm font-medium" 
                                placeholder="John Doe" 
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                <input 
                                    type="email" 
                                    required
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    title="Please enter a valid email address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-all text-sm font-medium" 
                                    placeholder="john@example.com" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
                                <input 
                                    type="tel" 
                                    required
                                    pattern="^\+?[0-9\s\-]{10,15}$"
                                    title="Please enter a valid phone number (10-15 digits)"
                                    value={formData.contact}
                                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-all text-sm font-medium" 
                                    placeholder="+91 98765 43210" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Current Status</label>
                            <select 
                                required
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-all text-sm font-medium cursor-pointer"
                            >
                                <option value="" disabled>Select your status...</option>
                                <option value="12th_pass">12th Pass / Undergraduate</option>
                                <option value="college_student">College Student</option>
                                <option value="fresher">Fresher / Recent Graduate</option>
                                <option value="working_professional">Working Professional</option>
                                <option value="career_break">On a Career Break</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Mode of Class</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`
                                    flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all
                                    ${formData.mode === 'offline' ? 'border-[#ff6b00] bg-orange-50/50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}
                                `}>
                                    <input 
                                        type="radio" 
                                        name="class_mode" 
                                        value="offline"
                                        checked={formData.mode === 'offline'}
                                        onChange={(e) => setFormData({...formData, mode: e.target.value})}
                                        className="hidden"
                                        required
                                    />
                                    <span className={`font-bold text-sm ${formData.mode === 'offline' ? 'text-[#ff6b00]' : 'text-gray-600'}`}>Offline Classroom</span>
                                </label>
                                
                                <label className={`
                                    flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all
                                    ${formData.mode === 'live_online' ? 'border-[#ff6b00] bg-orange-50/50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}
                                `}>
                                    <input 
                                        type="radio" 
                                        name="class_mode" 
                                        value="live_online"
                                        checked={formData.mode === 'live_online'}
                                        onChange={(e) => setFormData({...formData, mode: e.target.value})}
                                        className="hidden"
                                    />
                                    <span className={`font-bold text-sm ${formData.mode === 'live_online' ? 'text-[#ff6b00]' : 'text-gray-600'}`}>Live Online</span>
                                </label>
                            </div>
                        </div>

                        {/* Honeypot field (hidden from real users) */}
                        <div className="hidden" aria-hidden="true">
                            <input type="text" tabIndex={-1} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                        </div>

                        <div className="mt-4">
                            <button 
                                type="submit" 
                                disabled={isSubmitting || !formData.name || !formData.email || !formData.contact || !formData.status || !formData.mode}
                                className={`
                                    w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2
                                    ${(isSubmitting || !formData.name || !formData.email || !formData.contact || !formData.status || !formData.mode)
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-[#ff6b00] text-white hover:bg-[#e65c00] shadow-[0_8px_20px_rgba(255,107,0,0.25)] hover:-translate-y-0.5'
                                    }
                                `}
                            >
                                {isSubmitting ? (
                                    <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        Request Call Back
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1.5 font-medium">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Your information is secure
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CounselingModal;
