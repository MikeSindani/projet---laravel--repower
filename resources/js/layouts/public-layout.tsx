import Footer from '@/components/footer';
import Header from '@/components/header';
import ScrollToTop from '@/components/scroll-to-top';
import { WhatsAppButton } from '@/components/whatsapp-button';
import FloatingPurchaseCart from '@/components/FloatingPurchaseCart';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <ScrollToTop />
            <WhatsAppButton />
            <FloatingPurchaseCart />
        </div>
    );
}
