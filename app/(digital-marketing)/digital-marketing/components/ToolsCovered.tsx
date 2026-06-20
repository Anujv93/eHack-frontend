'use client';

import React from 'react';

const tools = [
    { name: "LinkedIn Ads", logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" },
    { name: "Meta Ads", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Semrush", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Semrush_logo.svg" },
    { name: "Blogger", logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/Blogger.svg" },
    { name: "Canva", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg" },
    
    { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
    { name: "Google Ads", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg" },
    { name: "Google AdSense", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Google_AdSense_logo.svg" },
    { name: "Google Analytics", logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Google_Analytics_icon.svg" },
    { name: "Search Console", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Google_Search_Console_logo.svg" },
    
    { name: "Grammarly", logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Grammarly_logo.svg" },
    { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/HubSpot_Logo.png" },
    { name: "Medium", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Medium_logo_Monogram.svg" },
    { name: "Mailchimp", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Mailchimp_Logo.svg" },
    { name: "Shopify", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
    
    { name: "Ahrefs", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Ahrefs_logo.svg" },
    { name: "Moz", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Moz_logo.svg" },
    { name: "Wix", logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Wix.com_website_logo.svg" },
    { name: "WordPress", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/WordPress_logo.svg" },
    { name: "YouTube", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" }
];

export default function ToolsCovered() {
    return (
        <div className="w-full bg-gradient-to-br from-[#ffe5cc] to-[#ffdbb8] rounded-2xl pt-6 sm:pt-8 pb-8 sm:pb-10 px-4 sm:px-8 border border-[#ffcca3] shadow-sm relative overflow-hidden">
            {/* Background ambient light */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b00]/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff6b00]/5 blur-[100px] rounded-full pointer-events-none"></div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-montserrat mb-8 pl-2 sm:pl-4 relative z-10">
                Tools Covered
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
                {tools.map((tool, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-white p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow h-20 sm:h-24">
                        <img 
                            src={tool.logo} 
                            alt={tool.name} 
                            className="max-w-[80%] max-h-[35px] sm:max-h-[45px] object-contain opacity-90 hover:opacity-100 transition-opacity"
                            title={tool.name}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
