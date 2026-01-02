import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import TopBar from "@/components/layout/top-bar/top-bar";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import { FranchisePopup } from "@/components/global";
import {
  getCertificationPartners,
  getCoursesForListing,
  getStrapiMediaUrl
} from '@/lib/strapi';
import "./globals.css";

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
  title: "eHack Academy | Premier Professional Training Institute",
  description: "Transform your career with industry-leading courses in Cybersecurity, Digital Marketing, Data Science & AI, and IoT & Robotics. Get certified from EC-Council, ISACA, OffSec, Cisco, and CompTIA.",
  keywords: "professional training, cybersecurity, digital marketing, data science, AI, IoT, robotics, certification training, ethical hacking, SEO, machine learning",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

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
      <body
        className={`${montserrat.variable} ${openSans.variable}`}
        style={{ fontFamily: 'var(--font-montserrat), var(--font-open-sans), sans-serif' }}
      >
        <TopBar />
        <Header partners={partners} courses={coursesTransformed} />
        {children}
        <Footer />
        <FranchisePopup />
      </body>
    </html>
  );
}
