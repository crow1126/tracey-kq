'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductGrid from '@/components/ProductGrid';
import FeaturedBanner from '@/components/FeaturedBanner';
import LookbookView from '@/components/LookbookView';
import AtelierView from '@/components/AtelierView';
import PatronView from '@/components/PatronView';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import BespokeModal from '@/components/BespokeModal';
import SearchModal from '@/components/SearchModal';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  const { activeTab } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#122410] text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View conditioned on active tab */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeTab === 'maison' && (
          <>
            <HeroSection />
            <ProductGrid />
            <FeaturedBanner />
          </>
        )}

        {activeTab === 'boutique' && (
          <div className="pt-6">
            <ProductGrid />
          </div>
        )}

        {activeTab === 'lookbook' && <LookbookView />}

        {activeTab === 'atelier' && <AtelierView />}

        {activeTab === 'patron' && <PatronView />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <BespokeModal />
      <SearchModal />

      {/* Mobile Bottom Navigation Bar (5 tabs: Maison, Boutique, Lookbook, Atelier, Patron) */}
      <BottomNav />
    </div>
  );
}
