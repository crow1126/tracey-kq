/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { SEED_STORES } from '@/data/db-seed';
import { MapPin, Clock, Phone, Navigation, Scissors, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function StoresView() {
  const { setIsBespokeModalOpen, setActiveView } = useStore();

  return (
    <div className="bg-[#F5F5F7] min-h-screen pt-12 pb-32 px-5 sm:px-8 lg:px-12 space-y-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[11px] font-medium tracking-[0.2em] text-[#6B73F0] uppercase">
          GHANA SHOWROOMS & ATELIERS
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111113] font-display">
          Our Stores
        </h1>
        <p className="text-sm sm:text-base text-[#3A3A3F] font-light leading-relaxed">
          Experience our tactile fabrics in person, receive bespoke fitting advice, or pick up your online orders at any of our four national locations.
        </p>
      </div>

      {/* Stores Grid (Specification: Accra Mall, Osu, Kumasi, Takoradi) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SEED_STORES.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-[24px] overflow-hidden border border-[#E6E6EA] shadow-sm-card hover:shadow-md-card transition-all flex flex-col justify-between"
          >
            {/* Store Photo */}
            <div className="relative aspect-[16/10] bg-[#EDEDF0] overflow-hidden">
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-full object-cover"
              />
              {store.isFlagship && (
                <div className="absolute top-4 left-4">
                  <Badge variant="accent">Flagship Maison</Badge>
                </div>
              )}
            </div>

            {/* Store Metadata */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-[#6B73F0] uppercase tracking-wider block">
                    {store.city} · {store.area}
                  </span>
                  <h3 className="text-2xl font-bold text-[#111113] font-display mt-0.5">
                    {store.name}
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs text-[#3A3A3F] font-light">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#8A8A8F] flex-shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#8A8A8F] flex-shrink-0 mt-0.5" />
                    <span>{store.hours}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#8A8A8F] flex-shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Directions & Book a fitting (Specification) */}
              <div className="pt-4 border-t border-[#E6E6EA] flex items-center gap-3">
                {/* Directions: 36px high, padding 0 16px, ink bg, 13px text */}
                <a
                  href={store.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[36px] px-4 rounded-full bg-[#111113] text-white hover:bg-black text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer select-none"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>

                {/* Book a fitting */}
                <button
                  onClick={() => setIsBespokeModalOpen(true)}
                  className="h-[36px] px-4 rounded-full bg-[#EDEDF0] hover:bg-[#E6E6EA] text-[#111113] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer select-none"
                >
                  <Scissors className="w-3.5 h-3.5 text-[#6B73F0]" />
                  <span>Book a Fitting</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shoppable CTA */}
      <div className="bg-[#111113] text-white rounded-[24px] p-8 sm:p-12 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-display">
          Prefer Online Delivery?
        </h2>
        <p className="text-xs sm:text-sm text-[#A1A1A8] font-light max-w-md mx-auto">
          We deliver to your doorstep across Ghana with MTN MoMo, Telecel Cash, and Card payments.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="get-started" onClick={() => setActiveView('shop')}>
            <span>Shop Online Now</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
