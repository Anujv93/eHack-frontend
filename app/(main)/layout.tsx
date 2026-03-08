import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import TopBar from "@/components/layout/top-bar/top-bar";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import BackToTop from "@/components/back-to-top/back-to-top";
import { FranchisePopup } from "@/components/global";
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
  title: "eHack Academy | Institute of Emerging Technologies",
  description: "Transform your career with industry-leading courses in Cybersecurity, Digital Marketing, Data Science & AI, and IoT & Robotics. Get certified from EC-Council, ISACA, OffSec, Cisco, and CompTIA.",
  icons: {
    icon: '/favicon.ico?v=2',
    shortcut: '/favicon.ico?v=2',
    apple: '/favicon.ico?v=2',
  },
  keywords: "professional training, cybersecurity, digital marketing, data science, AI, IoT, robotics, certification training, ethical hacking, SEO, machine learning",

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
        {/* Tawk.to Script */}
        <Script id="tawk-to" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/5f2fba4e5c885a1b7fb7822a/default';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
        <Footer />
        <FranchisePopup />
        <BackToTop />
      </body>
    </html>
  );
}
