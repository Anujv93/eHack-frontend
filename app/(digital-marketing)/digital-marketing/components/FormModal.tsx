'use client';

import React from 'react';
import LeadForm from './LeadForm';
import { X } from 'lucide-react';

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    buttonText?: string;
    formSource: string;
}

export default function FormModal({
    isOpen,
    onClose,
    title,
    subtitle = "Please fill in your details to continue",
    buttonText = "Submit",
    formSource
}: FormModalProps) {
    if (!isOpen) return null;

    const handleSuccess = () => {
        // We can keep the modal open to show the success state of LeadForm,
        // or close it after a delay. LeadForm shows a nice "Request Received!" message.
        setTimeout(() => {
            onClose();
        }, 3000); // Close after 3 seconds so they see the success message
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-[420px] animate-in fade-in zoom-in duration-200">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                    <X size={18} />
                </button>

                <LeadForm 
                    customTitle={
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                            {title}
                        </h3>
                    }
                    customSubtitle={subtitle}
                    customButtonText={buttonText}
                    showDigitalMarketingTag={false}
                    noShadow={false}
                    paddingClass="p-6 sm:p-8"
                    formSource={formSource}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
}
