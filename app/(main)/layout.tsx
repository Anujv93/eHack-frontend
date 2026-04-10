import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import TopBar from "@/components/layout/top-bar/top-bar";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import BackToTop from "@/components/back-to-top/back-to-top";
import FloatingChat from "@/components/chat-bot/FloatingChat";
import { FranchisePopup, WhatsAppButton } from "@/components/global";
import {
  getCertificationPartners,
  getCoursesForListing,
  getStrapiMediaUrl
} from '@/lib/strapi';
import "./globals.css";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "eHack Academy - Ethical Hacking Training in Bangalore",
    template: "%s | eHack Academy",
  },
  description: "Join ethical hacking training Bangalore at eHack Academy. Get ethical hacking certification with expert-led CEH training in Bangalore and hands-on skills.",
  icons: {
    icon: '/favicon.ico?v=2',
    shortcut: '/favicon.ico?v=2',
    apple: '/favicon.ico?v=2',
  },
  keywords: "ethical hacking training Bangalore, ethical hacking certification Bangalore, CEH training Bangalore",
  metadataBase: new URL('https://www.ehackacademy.com'),
  alternates: {
    canonical: '/',
  },
};
//
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch data for header navigation
  const [partnersData, coursesData] = await Promise.all([
    getCertificationPartners(),
    getCoursesForListing()
  ]);

  // Transform courses
  const coursesTransformed = coursesData.map((course) => ({
    id: course.id,
    slug: course.slug,
    title: course.Title,
    level: course.Level,
    duration: course.Duration || undefined,
    partnerSlug: course.certification_partner?.slug,
    partnerName: course.certification_partner?.Name
  }));

  // Count courses per partner
  const courseCountByPartner: Record<string, number> = {};
  coursesTransformed.forEach(course => {
    if (course.partnerSlug) {
      courseCountByPartner[course.partnerSlug] = (courseCountByPartner[course.partnerSlug] || 0) + 1;
    }
  });

  // Transform partners with course count
  const partners = partnersData.map((partner) => ({
    id: partner.id,
    name: partner.Name,
    slug: partner.slug,
    logoUrl: partner.Logo?.url
      ? getStrapiMediaUrl(partner.Logo.url)
      : partner.LogoUrl || undefined,
    courseCount: courseCountByPartner[partner.slug] || 0
  }));

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <meta name="google-site-verification" content="2DSFxgmHx2g5igVDZwHw122NVdz-cgCNg7cgqr_n1-Q" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
            gtag('config', 'AW-17944571400');
          `}
        </Script>
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable}`}
        style={{ fontFamily: 'var(--font-montserrat), var(--font-open-sans), sans-serif' }}
      >
        <TopBar />
        <Header partners={partners} courses={coursesTransformed} />
        {children}
        {/* eHack AI Chatbot */}
        <FloatingChat />
        <Footer />
        <FranchisePopup />
        <BackToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}
