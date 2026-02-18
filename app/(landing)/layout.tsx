import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import './landing.css';

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Cybersecurity Career Accelerator | eHack Academy',
    description: 'Launch your high-paying career in cybersecurity without a degree.',
    icons: {
        icon: '/favicon.ico?v=2',
        shortcut: '/favicon.ico?v=2',
        apple: '/favicon.ico?v=2',
    },

};

import Footer from '@/components/layout/footer/footer';

// ... existing imports

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} antialiased font-montserrat`}>
                {/* Google tag (gtag.js) */}
                <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17944571400" />
                <Script id="google-tag-aw" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'AW-17944571400');
                    `}
                </Script>
                {children}
                <Footer />
            </body>
        </html>
    );
}
