import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { QuickWhatsAppWidget } from '@/components/common/QuickWhatsAppWidget';

export const metadata: Metadata = {
  title: 'Orsted Jaya Abadi | Molly Cantik Farm — Ikan Molly Sehat & Terawat',
  description: 'Website Resmi Orsted Jaya Abadi — Molly Cantik Farm. Menghadirkan pilihan ikan Molly berkualitas, bersih, sehat, dan terawat dengan kebersihan air yang terjaga untuk akuarium Anda.',
  keywords: [
    'Orsted Jaya Abadi',
    'Molly Cantik Farm',
    'Ikan Molly',
    'Molly Dalmatian',
    'Black Molly',
    'White Molly',
    'Gold Molly',
    'Balloon Molly',
    'Lyretail Molly',
    'Ikan Hias Sehat',
    'Farm Ikan Molly'
  ],
  authors: [{ name: 'Orsted Jaya Abadi — Molly Cantik Farm' }],
  openGraph: {
    title: 'Orsted Jaya Abadi | Molly Cantik Farm',
    description: 'Pilihan ikan Molly berkualitas, bersih, sehat, dan terawat dari farm resmi Orsted Jaya Abadi.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen bg-[#070d1e] text-slate-100 antialiased selection:bg-cyan-600 selection:text-white">
        <Navbar />
        <main>{children}</main>
        <QuickWhatsAppWidget />
        <Footer />
      </body>
    </html>
  );
}
