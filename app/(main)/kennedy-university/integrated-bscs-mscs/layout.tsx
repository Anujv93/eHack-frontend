import './page.css';
import '../../programs/[slug]/program.css';

export default function IntegratedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
