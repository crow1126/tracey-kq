'use client';

import React, { useState, useCallback } from 'react';
import { useStore } from '@/context/StoreContext';
import SplashScreen from '@/components/ui/SplashScreen';

// Navigation
import DesktopTopNav from '@/components/navigation/DesktopTopNav';
import MobileHeader from '@/components/navigation/MobileHeader';
import MobileFloatingNav from '@/components/navigation/MobileFloatingNav';
import BrandMenuSheet from '@/components/navigation/BrandMenuSheet';
import BrandFooter from '@/components/navigation/BrandFooter';

// Brand Views
import HomeView from '@/components/views/HomeView';
import OurStoryView from '@/components/views/OurStoryView';
import CollectionsView from '@/components/views/CollectionsView';
import SpotlightView from '@/components/views/SpotlightView';
import StoresView from '@/components/views/StoresView';
import BespokeView from '@/components/views/BespokeView';

// Store Views
import ShopView from '@/components/views/ShopView';
import ExploreView from '@/components/views/ExploreView';
import SavedView from '@/components/views/SavedView';
import BagView from '@/components/views/BagView';
import CheckoutView from '@/components/views/CheckoutView';
import OrderConfirmationView from '@/components/views/OrderConfirmationView';
import AccountView from '@/components/views/AccountView';
import OrdersView from '@/components/views/OrdersView';
import AdminView from '@/components/views/AdminView';

// Modals
import ProductDetailModal from '@/components/modals/ProductDetailModal';
import AuthModal from '@/components/modals/AuthModal';
import SearchModal from '@/components/modals/SearchModal';

// UI
import OnboardingSheet from '@/components/ui/OnboardingSheet';

// Views that should NOT show footer
const NO_FOOTER_VIEWS = ['checkout', 'confirmation'];

export default function Home() {
  const { activeView, quickViewProduct } = useStore();
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  // Guaranteed scroll-to-top whenever navigating to any page/view
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [activeView]);

  const showFooter = !NO_FOOTER_VIEWS.includes(activeView);

  return (
    <>
      {/* ─── Splash / landing animation (first visit) ─── */}
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}

      <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
      {/* ─────── Navigation ─────── */}
      <DesktopTopNav />
      <MobileHeader />

      {/* ─────── Main View ─────── */}
      <main className="flex-1">
        {activeView === 'home' && <HomeView />}
        {activeView === 'our-story' && <OurStoryView />}
        {activeView === 'collections' && <CollectionsView />}
        {activeView === 'spotlight' && <SpotlightView />}
        {activeView === 'stores' && <StoresView />}
        {activeView === 'bespoke' && <BespokeView />}
        {activeView === 'shop' && <ShopView />}
        {activeView === 'explore' && <ExploreView />}
        {activeView === 'saved' && <SavedView />}
        {activeView === 'bag' && <BagView />}
        {activeView === 'checkout' && <CheckoutView />}
        {activeView === 'confirmation' && <OrderConfirmationView />}
        {activeView === 'orders' && <OrdersView />}
        {activeView === 'account' && <AccountView />}
        {activeView === 'admin' && <AdminView />}
      </main>

      {/* ─────── Footer ─────── */}
      {showFooter && <BrandFooter />}

      {/* ─────── Global Slide-overs / Modals ─────── */}
      <BrandMenuSheet />
      {quickViewProduct && <ProductDetailModal />}
      <AuthModal />
      <SearchModal />

      {/* ─────── First-Visit 3-Slide Welcome Sheet (mobile only, dismissible) ─────── */}
      <OnboardingSheet />

      {/* ─────── Mobile Bottom Pill Nav ─────── */}
      <MobileFloatingNav />
    </div>
    </>
  );
}
