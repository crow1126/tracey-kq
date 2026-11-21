import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

export const metadata: Metadata = {
  title: 'T.I.M.E fits | Tailored Perfection, Timeless Style',
  description:
    'T.I.M.E fits by Kukua-Tracey. We don’t design for seasons; we design for lifetimes. Capturing meaningful moments and telling life’s stories through garments. Accra, Ghana.',
  keywords: ['T.I.M.E fits', 'TIME fits', 'Kukua-Tracey', 'Tailored Perfection', 'Timeless Style', 'Ghanaian fashion', 'African luxury couture', 'Accra'],
  openGraph: {
    title: 'T.I.M.E fits | Tailored Perfection, Timeless Style',
    description: 'We don’t design for seasons; we design for lifetimes.',
    type: 'website',
    images: ['/brand/logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F5F5F7] text-[#111113] selection:bg-[#16A34A] selection:text-white">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
