import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

export const metadata: Metadata = {
  title: 'Tracey Kuukua Quansah | Luxury Fashion & Atelier',
  description:
    'Luxury fashion brand by Ghanaian designer Tracey Kuukua Quansah. Contemporary minimalism, tailored organic silks, and bespoke made-to-measure couture.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased bg-[#122410]">
      <body className="min-h-full flex flex-col bg-[#122410] text-white selection:bg-[#C8E96B] selection:text-[#122410]">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
