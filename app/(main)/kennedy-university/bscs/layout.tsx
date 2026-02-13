import './page.css';
import '../../programs/[slug]/program.css';

export default function BSCSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
