'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Home, ShoppingBag, BookOpen, Scissors, User } from 'lucide-react';

export default function BottomNav() {
  const { activeTab, setActiveTab, cartCount } = useStore();

  const navItems: Array<{
    id: 'maison' | 'boutique' | 'lookbook' | 'atelier' | 'patron';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'maison', label: 'Maison', icon: Home },
    { id: 'boutique', label: 'Boutique', icon: ShoppingBag },
    { id: 'lookbook', label: 'Lookbook', icon: BookOpen },
    { id: 'atelier', label: 'Atelier', icon: Scissors },
    { id: 'patron', label: 'Patron', icon: User },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#122410]/95 backdrop-blur-lg border-t border-[#2A4E1F] py-2 px-4 sm:px-8 text-white transition-all shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-300 relative group cursor-pointer ${
                isActive
                  ? 'text-[#C8E96B] scale-105'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {/* Active glow pill background */}
              {isActive && (
                <span className="absolute inset-0 bg-[#2A4E1F]/60 rounded-2xl -z-10 animate-pulse-glow" />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.id === 'boutique' && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#C8E96B] text-[#122410] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </div>

              <span className={`text-[10px] tracking-widest uppercase mt-1 ${isActive ? 'font-black' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
