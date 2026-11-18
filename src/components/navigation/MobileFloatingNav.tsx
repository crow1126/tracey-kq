'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';

export default function MobileFloatingNav() {
  const { activeView, setActiveView, cartCount, wishlist } = useStore();

  // Hidden on checkout per specification
  if (activeView === 'checkout') return null;

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Browse', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Heart, badgeCount: wishlist.length },
    { id: 'bag', label: 'Bag', icon: ShoppingBag, badgeCount: cartCount },
    { id: 'account', label: 'Profile', icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111113]/95 backdrop-blur-xl border-t border-white/10 px-3 pt-2 pb-[max(12px,env(safe-area-inset-bottom))] shadow-2xl"
      style={{
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      <div className="max-w-md mx-auto flex items-center justify-around h-[60px]">
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
              className="relative w-[54px] h-[54px] flex flex-col items-center justify-center rounded-full cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#6B73F0]"
              aria-label={item.label}
            >
              {/* Active item: 52x52px white circle behind the ink icon */}
              {isActive && (
                <span className="absolute inset-0 bg-white rounded-full shadow-md animate-in fade-in zoom-in-95 duration-200" />
              )}

              <div className="relative z-10 flex flex-col items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-colors ${
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
    </nav>
  );
}
