'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Home, Compass, Sparkles, Heart, ShoppingBag } from 'lucide-react';

export default function MobileFloatingNav() {
  const { activeView, setActiveView, cartCount, wishlist } = useStore();

  if (activeView === 'checkout') return null;

  const items = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'shop', label: 'SHOP', icon: Compass },
    { id: 'our-story', label: 'ABOUT', icon: Sparkles },
    { id: 'saved', label: 'SAVED', icon: Heart, badgeCount: wishlist.length },
    { id: 'bag', label: 'BAG', icon: ShoppingBag, badgeCount: cartCount },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-3 left-3 right-3 max-w-md mx-auto z-40 bg-[#0F1F17]/96 backdrop-blur-2xl border border-[#3E5A3F]/60 border-t-2 border-t-[#C7CBB8]/80 rounded-none px-1 py-1 shadow-[0_16px_40px_rgba(0,0,0,0.6)] select-none"
      style={{
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      <div className="flex items-center justify-around h-[48px]">
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
              className="relative flex-1 h-[44px] flex flex-col items-center justify-center rounded-none cursor-pointer select-none outline-none transition-all duration-150"
              aria-label={item.label}
            >
              {/* Active item: sharp, edgy architectural highlight */}
              {isActive && (
                <>
                  <span className="absolute inset-x-0.5 inset-y-0.5 bg-[#1E3A2E] border border-[#C7CBB8]/40 rounded-none shadow-sm animate-in fade-in zoom-in-95 duration-150" />
                  <span className="absolute top-0 inset-x-2 h-[2px] bg-[#C7CBB8] z-20" />
                </>
              )}

              <div className="relative z-10 flex flex-col items-center justify-center space-y-0.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#C7CBB8] stroke-[2.4]' : 'text-[#C7CBB8]/45 hover:text-[#C7CBB8]'
                  }`}
                />
                <span
                  className={`text-[8px] tracking-[0.16em] uppercase transition-colors font-sans ${
                    isActive ? 'text-[#C7CBB8] font-bold' : 'text-[#C7CBB8]/45 font-medium'
                  }`}
                >
                  {item.label}
                </span>

                {/* Badge count - sharp rectangular tag */}
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-0.5 text-[8px] font-black min-w-[14px] h-[14px] px-1 rounded-none flex items-center justify-center shadow-sm ${
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
