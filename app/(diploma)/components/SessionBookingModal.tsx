'use client';

import React, { useState, useMemo } from 'react';

interface SessionBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SessionBookingModal: React.FC<SessionBookingModalProps> = ({ isOpen, onClose }) => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        motive: ''
    });

    // Bot protection state
    const [honeypot, setHoneypot] = useState('');

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const today = currentDate.getDate();

    const [displayMonth, setDisplayMonth] = useState(currentMonth);
    const [displayYear, setDisplayYear] = useState(currentYear);

    // Calendar generation
    const { daysInMonth, firstDayOfMonth } = useMemo(() => {
        const days = new Date(displayYear, displayMonth + 1, 0).getDate();
        const firstDay = new Date(displayYear, displayMonth, 1).getDay(); // 0 is Sunday
        return { daysInMonth: days, firstDayOfMonth: firstDay };
    }, [displayMonth, displayYear]);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const isPastMonth = displayYear < currentYear || (displayYear === currentYear && displayMonth < currentMonth);

    const handlePrevMonth = () => {
        setSelectedDate(null);
        if (displayMonth === 0) {
            setDisplayMonth(11);
            setDisplayYear(displayYear - 1);
        } else {
            setDisplayMonth(displayMonth - 1);
        }
    };

    const handleNextMonth = () => {
        setSelectedDate(null);
        if (displayMonth === 11) {
            setDisplayMonth(0);
            setDisplayYear(displayYear + 1);
        } else {
            setDisplayMonth(displayMonth + 1);
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Bot protection checks
        if (honeypot !== '') return; // Silent fail for bots

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
                    inquiryName: `Website - ${formData.name} - 1:1 Session Booking`,
                    leadSource: 'Website Advanced Diploma Page',
                    courses: [{
                        name: 'Advanced Diploma in Cybersecurity',
                        code: 'adv-diploma',
                        category: 'Diploma',
                        price: 0
                    }],
                    message: `Motive: ${formData.motive} | Requested Date: ${selectedDate} | Time: ${selectedTime}`,
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

            alert('Your one-on-one session request has been submitted successfully!');
            onClose();
        } catch (error) {
            console.error('Error submitting session form:', error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-montserrat">
            <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
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
                        <h2 className="font-montserrat font-black text-3xl sm:text-4xl text-[#0b162c] mb-3">Book Your <span className="text-[#ff6b00]">Live 1:1 Session</span></h2>
                        <p className="text-gray-600 font-medium">Get personalized guidance from our cybersecurity experts.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
                        {/* Left Side: User Details */}
                        <div className="flex-1 space-y-5">
                            <h3 className="font-bold text-lg text-gray-800 border-b pb-2 mb-4">1. Your Details</h3>
                            
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

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Motive of Session</label>
                                <select 
                                    required
                                    value={formData.motive}
                                    onChange={(e) => setFormData({...formData, motive: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-all text-sm font-medium cursor-pointer"
                                >
                                    <option value="" disabled>Select your motive...</option>
                                    <option value="career_transition">Career Transition to Cybersecurity</option>
                                    <option value="skill_enhancement">Skill Enhancement & Certifications</option>
                                    <option value="placement_query">Placement Assistance Details</option>
                                    <option value="course_curriculum">Course Curriculum Query</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Honeypot field (hidden from real users) */}
                            <div className="hidden" aria-hidden="true">
                                <input type="text" tabIndex={-1} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                            </div>
                        </div>

                        {/* Right Side: Calendar & Time Selection */}
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800 border-b pb-2 mb-4">2. Select Date & Time</h3>
                            
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <button 
                                        type="button" 
                                        onClick={handlePrevMonth}
                                        disabled={isPastMonth || (displayYear === currentYear && displayMonth === currentMonth)}
                                        className={`p-1 rounded hover:bg-gray-200 transition-colors ${isPastMonth || (displayYear === currentYear && displayMonth === currentMonth) ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <h4 className="font-bold text-gray-800">{monthNames[displayMonth]} {displayYear}</h4>
                                    <button 
                                        type="button" 
                                        onClick={handleNextMonth}
                                        className="p-1 rounded hover:bg-gray-200 transition-colors text-gray-800"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                    {dayNames.map(day => (
                                        <div key={day} className="text-xs font-bold text-gray-400 py-1">{day}</div>
                                    ))}
                                </div>
                                
                                <div className="grid grid-cols-7 gap-1">
                                    {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                                        <div key={`empty-${index}`} className="p-2"></div>
                                    ))}
                                    
                                    {Array.from({ length: daysInMonth }).map((_, index) => {
                                        const day = index + 1;
                                        const isPast = displayYear < currentYear || (displayYear === currentYear && displayMonth < currentMonth) || (displayYear === currentYear && displayMonth === currentMonth && day < today);
                                        const isSelected = selectedDate === day;
                                        
                                        return (
                                            <button
                                                key={`day-${day}`}
                                                type="button"
                                                disabled={isPast}
                                                onClick={() => setSelectedDate(day)}
                                                className={`
                                                    p-2 text-sm rounded-lg font-medium transition-all flex items-center justify-center aspect-square
                                                    ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-orange-100 cursor-pointer'}
                                                    ${isSelected ? 'bg-[#ff6b00] text-white hover:bg-[#ff6b00] shadow-md shadow-orange-500/30' : (isPast ? '' : 'text-gray-700 bg-white border border-gray-100')}
                                                `}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {selectedDate && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <h4 className="font-bold text-sm text-gray-700 mb-3">Select Time</h4>
                                    <div className="relative">
                                        <input
                                            type="time"
                                            required
                                            value={selectedTime || ''}
                                            onChange={(e) => setSelectedTime(e.target.value)}
                                            className="w-full bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-all font-medium cursor-pointer"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="mt-8">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting || !selectedDate || !selectedTime || !formData.name || !formData.email || !formData.contact || !formData.motive}
                                    className={`
                                        w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2
                                        ${(isSubmitting || !selectedDate || !selectedTime || !formData.name || !formData.email || !formData.contact || !formData.motive)
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
                                            Confirm Booking
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SessionBookingModal;
