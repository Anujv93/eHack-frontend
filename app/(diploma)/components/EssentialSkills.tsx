import React from 'react';

const skills = [
    "OS and Network Security",
    "Cryptography and PKI",
    "Ethical Hacking",
    "Penetration Testing",
    "Red Teaming and Exploitation",
    "Web & Mobile App Pentesting",
    "Social Engineering and OSINT",
    "Vulnerability Assessment",
    "SOC Operations",
    "Incident Response and Forensics",
    "Blue Teaming and Threat Hunting",
    "Malware and Ransomware Analysis",
    "SIEM and Threat Detection",
    "Endpoint Security and EDR",
    "Cloud Security and CSPM",
    "Cyber Threat Intelligence",
    "Secure Coding and Application Security",
    "Security Architecture",
    "Enterprise Security"
];

const EssentialSkills = () => {
    return (
        <section className="w-full bg-white pt-4 pb-8 sm:pb-10 lg:pt-6 lg:pb-12 font-montserrat">
            <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-montserrat font-black text-[26px] sm:text-3xl lg:text-4xl text-[#0b162c] mb-6 sm:mb-10 text-left">
                    Essentials Skills You will Develop
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-6">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex items-start gap-3 bg-gray-50/50 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
                            <div className="w-5 h-5 rounded-full bg-orange-50 shrink-0 flex items-center justify-center mt-0.5">
                                <svg className="w-3 h-3 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-[#0b162c] text-sm sm:text-base font-medium leading-snug">
                                {skill}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EssentialSkills;
