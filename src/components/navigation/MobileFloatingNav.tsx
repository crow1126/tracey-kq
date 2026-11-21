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
      className="md:hidden fixed bottom-0 left-3 right-3 z-40 bg-[#133D27]/95 backdrop-blur-xl border border-emerald-600/30 rounded-t-[28px] px-2 pt-2 pb-[max(12px,env(safe-area-inset-bottom))] shadow-2xl"
      style={{
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      <div className="max-w-md mx-auto flex items-center justify-around h-[56px]">
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
              className="relative w-[52px] h-[48px] flex flex-col items-center justify-center rounded-2xl cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E]"
              aria-label={item.label}
            >
              {/* Active item: deeper luxury emerald pill */}
              {isActive && (
                <span className="absolute inset-0 bg-[#0F5132] border border-[#22C55E]/40 rounded-2xl shadow-md animate-in fade-in zoom-in-95 duration-200" />
              )}

              <div className="relative z-10 flex flex-col items-center justify-center -space-y-0.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white stroke-[2.5]' : 'text-gray-300 hover:text-white'
                  }`}
                />
                <span
                  className={`text-[9px] tracking-tight transition-colors ${
                    isActive ? 'text-white font-bold' : 'text-gray-300 font-medium'
                  }`}
                >
                  {item.label}
                </span>

                {/* Badge count */}
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-md ${
                      isActive ? 'bg-white text-[#0F5132]' : 'bg-[#22C55E] text-[#133D27]'
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
