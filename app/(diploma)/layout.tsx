import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import Script from 'next/script';
import '../(landing)/landing.css';
import Footer from '@/components/layout/footer/footer';
import WhatsAppButton from '@/components/landing/WhatsAppButton';

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Advanced Diploma in Cybersecurity | eHack Academy',
    description: 'Launch your high-paying career in cybersecurity with our AI-powered Advanced Diploma.',
    icons: {
        icon: '/favicon.ico?v=2',
        shortcut: '/favicon.ico?v=2',
        apple: '/favicon.ico?v=2',
    },
};

export default function DiplomaRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${inter.variable} antialiased font-montserrat`}>
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
                <WhatsAppButton message="Hi EHACK Academy, I'd like to inquire about the Advanced Diploma in Cybersecurity program. Can you help me with the admission process and counselor details?" />
                <Footer />
            </body>
        </html>
    );
}
