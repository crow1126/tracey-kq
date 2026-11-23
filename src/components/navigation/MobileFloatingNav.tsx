'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Home, Compass, Sparkles, Heart, ShoppingBag } from 'lucide-react';

export default function MobileFloatingNav() {
  const { activeView, setActiveView, cartCount, wishlist } = useStore();

  if (activeView === 'checkout') return null;

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: Compass },
    { id: 'our-story', label: 'About', icon: Sparkles },
    { id: 'saved', label: 'Saved', icon: Heart, badgeCount: wishlist.length },
    { id: 'bag', label: 'Bag', icon: ShoppingBag, badgeCount: cartCount },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-4 left-4 right-4 max-w-sm mx-auto z-40 bg-[#0F1F17]/92 backdrop-blur-2xl border border-[#3E5A3F]/40 rounded-full px-2 py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.5)] select-none"
      style={{
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      <div className="flex items-center justify-around h-[50px]">
        {items.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="relative flex-1 h-[44px] flex flex-col items-center justify-center rounded-full cursor-pointer select-none outline-none transition-all duration-200"
              aria-label={item.label}
            >
              {/* Active item: pill highlight matching iPhone dock style */}
              {isActive && (
                <span className="absolute inset-x-1 inset-y-0.5 bg-[#1E3A2E] border border-[#6B7F67]/50 rounded-full shadow-md animate-in fade-in zoom-in-95 duration-200" />
              )}

              <div className="relative z-10 flex flex-col items-center justify-center -space-y-0.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#C7CBB8] stroke-[2.3]' : 'text-[#C7CBB8]/55 hover:text-[#C7CBB8]'
                  }`}
                />
                <span
                  className={`text-[9px] tracking-tight transition-colors ${
                    isActive ? 'text-[#C7CBB8] font-semibold' : 'text-[#C7CBB8]/50 font-normal'
                  }`}
                >
                  {item.label}
                </span>

                {/* Badge count */}
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-md ${
                      isActive ? 'bg-[#C7CBB8] text-[#0F1F17]' : 'bg-[#C7CBB8] text-[#0F1F17]'
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
    </nav>
  );
}
