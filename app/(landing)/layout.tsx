import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './landing.css';

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Cybersecurity Career Accelerator | eHack Academy',
    description: 'Launch your high-paying career in cybersecurity without a degree.',
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
                {children}
                <Footer />
            </body>
        </html>
    );
}
