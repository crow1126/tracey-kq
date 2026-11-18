import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

export const metadata: Metadata = {
  title: 'Tracey Kuukua Quansah | Luxury Ghanaian Fashion & Atelier',
  description:
    'Luxury fashion house by Ghanaian designer Tracey Kuukua Quansah. Contemporary minimalism, tailored organic silks, hand-woven Bonwire Kente, and bespoke made-to-measure couture — crafted in Accra.',
  keywords: ['Ghanaian fashion', 'Tracey Kuukua Quansah', 'Accra couture', 'Kente', 'African luxury'],
  openGraph: {
    title: 'Tracey Kuukua Quansah | Luxury Ghanaian Fashion',
    description: 'Hand-crafted couture from Accra, Ghana.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F5F5F7] text-[#111113] selection:bg-[#6B73F0] selection:text-white">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
