import './page.css';
import '../../programs/[slug]/program.css';

export default function MSCSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
