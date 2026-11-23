'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Home, Compass, Sparkles, Heart, ShoppingBag } from 'lucide-react';

export default function MobileFloatingNav() {
  const { activeView, setActiveView, cartCount, wishlist } = useStore();

  if (activeView === 'checkout') return null;

  const items = [
    { id: 'home',      label: 'Home',  icon: Home },
    { id: 'shop',      label: 'Shop',  icon: Compass },
    { id: 'our-story', label: 'About', icon: Sparkles },
    { id: 'saved',     label: 'Saved', icon: Heart,       badgeCount: wishlist.length },
    { id: 'bag',       label: 'Bag',   icon: ShoppingBag, badgeCount: cartCount },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#E6E6EA] select-none"
    >
      <div className="flex items-center justify-around h-[62px] max-w-md mx-auto px-2">
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
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full cursor-pointer outline-none group"
              aria-label={item.label}
            >
              {/* Active indicator bar at top */}
              {isActive && (
                <span className="absolute top-0 inset-x-3 h-[2.5px] bg-[#1E3A2E] rounded-b-full" />
              )}

              {/* Icon with badge */}
              <span className="relative">
                <Icon
                  className={`w-[22px] h-[22px] transition-colors ${
                    isActive
                      ? 'text-[#1E3A2E]'
                      : 'text-[#9CA3AF] group-hover:text-[#3E5A3F]'
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#1E3A2E] text-[#C7CBB8] text-[9px] font-bold flex items-center justify-center leading-none">
                    {item.badgeCount > 9 ? '9+' : item.badgeCount}
                  </span>
                )}
              </span>

              {/* Label */}
              <span
                className={`text-[10px] font-medium transition-colors leading-none ${
                  isActive ? 'text-[#1E3A2E] font-semibold' : 'text-[#9CA3AF] group-hover:text-[#3E5A3F]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* iOS safe-area padding */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
