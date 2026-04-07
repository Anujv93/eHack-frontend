import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'VAPT Course, Bug Bounty Training in Bangalore',
    description: 'Finding ethical hacking classes near Bangalore? Join bug bounty training and VAPT course in Bangalore at eHack Academy to build cybersecurity skills.',
    keywords: 'bug bounty training Bangalore, VAPT course Bangalore, ethical hacking classes near Bangalore',
    alternates: {
        canonical: '/about',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
