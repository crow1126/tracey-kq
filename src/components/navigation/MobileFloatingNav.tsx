'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';

export default function MobileFloatingNav() {
  const { activeView, setActiveView, cartCount, wishlist, setIsCartDrawerOpen } = useStore();

  // Hidden on checkout per specification
  if (activeView === 'checkout') return null;

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Heart, badgeCount: wishlist.length },
    { id: 'bag', label: 'Bag', icon: ShoppingBag, badgeCount: cartCount, isDrawer: true },
    { id: 'account', label: 'Profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-5 inset-x-4 z-40">
      {/* 72px high floating pill with ink background (#111113) and shadow-lg */}
      <div className="h-[72px] bg-[#111113] rounded-full shadow-lg-nav border border-white/10 px-3 flex items-center justify-around backdrop-blur-md">
        {items.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isDrawer) {
                  setIsCartDrawerOpen(true);
                } else {
                  setActiveView(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="relative w-[56px] h-[56px] flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#6B73F0]"
              aria-label={item.label}
            >
              {/* Active item: 56x56px white circle behind the ink icon */}
              {isActive && (
                <span className="absolute inset-0 bg-white rounded-full shadow-md animate-in fade-in zoom-in-95 duration-200" />
              )}

              <div className="relative z-10 flex items-center justify-center">
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-[#111113] stroke-[2.5]' : 'text-white/70 hover:text-white'
                  }`}
                />

                {/* Badge count */}
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-2 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md ${
                      isActive ? 'bg-[#111113] text-white' : 'bg-[#6B73F0] text-white'
                    }`}
                  >
                    {item.badgeCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
