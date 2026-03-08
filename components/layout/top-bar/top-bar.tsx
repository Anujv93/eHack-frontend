'use client';

import { useState } from 'react';
import './top-bar.css';
import TrainingModal from './training-modal';

export default function TopBar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="top-bar">
                <div className="top-bar-content">
                    <a href="mailto:info@ehackacademy.com" className="contact-item">
                        <span>info@ehackacademy.com</span>
                    </a>
                    <span className="divider">|</span>
                    <a href="tel:+919886035330" className="contact-item">
                        <span>+91-9886035330</span>
                    </a>
                    <span className="divider">|</span>
                    <button className="holiday-notice" onClick={() => setIsModalOpen(true)}>
                        <span>Open through All the holidays</span>
                    </button>
                </div>
            </div>
            <TrainingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
