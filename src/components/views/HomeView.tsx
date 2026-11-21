/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Heart, Plus, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import Badge from '../ui/Badge';
import CategorySlider from '../ui/CategorySlider';
import HeroMotionSection from '../ui/HeroMotionSection';

export default function HomeView() {
  const {
    products,
    setActiveView,
    setQuickViewProduct,
    toggleWishlist,
    isWishlisted,
    siteContent,
    user,
  } = useStore();

  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-12 pb-32 md:pb-16">
      {/* Logged in personalized greeting banner */}
      {user.isLoggedIn && (
        <div className="bg-emerald-50 border-b border-emerald-200 py-2 px-6 text-center text-xs text-[#0F5132]">
          <span>
            {getGreeting()},{' '}
            <strong className="text-[#0B1910]">{user.name}</strong> · Member · Accra ·{' '}
            <strong className="text-[#16A34A]">{user.loyaltyPoints} Style Points</strong> available
          </span>
        </div>
      )}

      {/* 1. Single-Image Editorial Hero Section (No Slideshow) */}
      <HeroMotionSection />

      {/* 2. Modern Category Showcase / Slider */}
      <CategorySlider />

      {/* 3. T.I.M.E fits Signature Green Feature Banner */}
      {siteContent.bannerVisible && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-r from-[#0B1910] via-[#0F5132] to-[#145A32] p-8 sm:p-12 text-white shadow-xl border border-emerald-500/20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3.5">
                <span className="inline-block bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20 text-[#4ADE80]">
                  {siteContent.bannerBadge || 'TAILORED PERFECTION · TIMELESS STYLE'}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight leading-tight">
                  {siteContent.bannerHeadline || 'Meaning Woven Into Every Thread'}
                </h2>
                <p className="text-sm text-gray-200 max-w-lg font-light leading-relaxed">
                  {siteContent.bannerSubtitle ||
                    'Welcome to T.I.M.E fits, where meaningful moments become beautifully considered design. We create beyond the noise of passing trends.'}
                </p>
                {siteContent.bannerDiscountText && (
                  <p className="text-xs font-semibold text-[#86EFAC] italic border-l-2 border-[#22C55E] pl-3 py-0.5">
                    &ldquo;{siteContent.bannerDiscountText}&rdquo;
                  </p>
                )}
                <div className="pt-2">
                  <Button
                    variant="get-started"
                    onClick={() => setActiveView('collections')}
                    className="h-11 px-6 rounded-full shadow-lg"
                  >
                    <span>Explore Our Collections</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div className="md:col-span-4 flex justify-center md:justify-end">
                <div className="w-56 h-72 rounded-[24px] overflow-hidden border-2 border-white/30 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform">
                  <img
                    src="/brand/photo_9_2026-11-21_13-00-31.jpg"
                    alt="T.I.M.E fits studio editorial"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Trending Now Product Grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0F5132] uppercase block">
              DISCOVER
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1910] tracking-tight font-serif">
              Trending Silhouettes
            </h2>
          </div>
          <button
            onClick={() => setActiveView('shop')}
            className="text-[13px] font-bold text-[#0F5132] hover:underline"
          >
            See all ({products.length}) →
          </button>
        </div>

        {/* 2-Column Grid on Mobile, 4-Column on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {trendingProducts.map((product) => {
            const hasHeart = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                onClick={() => setQuickViewProduct(product)}
                className="group bg-white rounded-[24px] p-3 border border-emerald-900/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Wishlist Heart */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 z-10"
                  >
                    <IconButton variant="card-heart" isActive={hasHeart} aria-label="Save to wishlist">
                      <Heart className={`w-[18px] h-[18px] ${hasHeart ? 'fill-current text-[#0F5132]' : ''}`} />
                    </IconButton>
                  </div>

                  {product.discountPercent && (
                    <div className="absolute bottom-2.5 left-2.5">
                      <Badge variant="success">-{product.discountPercent}%</Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-1 px-1">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-gray-500 block">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-[14px] sm:text-[15px] text-[#0B1910] line-clamp-1 group-hover:text-[#0F5132] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 line-clamp-1">
                    {product.fabric}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-[#0F5132] transition-colors">
                    <span>GH₵ {product.priceGhc.toLocaleString()}</span>
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Spotlight / The Edit */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="bg-[#0B1910] rounded-[28px] overflow-hidden text-white p-6 sm:p-12 relative shadow-xl border border-emerald-900/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual with Shoppable Tag Card */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-black/40">
                <img
                  src="/brand/photo_10_2026-11-21_13-00-31.jpg"
                  alt="T.I.M.E fits studio spotlight"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Shoppable Floating Tag Card */}
              <div
                onClick={() => setQuickViewProduct(products[0])}
                className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md text-[#0B1910] p-4 rounded-[20px] shadow-2xl flex items-center justify-between border border-emerald-200 cursor-pointer hover:bg-white transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F5132] block">
                    FEATURED CREATION
                  </span>
                  <p className="font-bold text-sm truncate">
                    {products[0]?.name || 'Signature Silk Silhouette'}
                  </p>
                  <p className="text-xs font-semibold text-emerald-700">
                    GH₵ {products[0]?.priceGhc.toLocaleString() || '18,500'}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#0F5132] text-white flex items-center justify-center shadow-md">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#4ADE80] uppercase">
                SPOTLIGHT / THE EDIT
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white leading-tight">
                Not Just for the Moment. For a Lifetime.
              </h2>
              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                At T.I.M.E fits, we do more than dress the moment. We give it form, feeling and a place in the story that lasts. Discover our refined craftsmanship and bespoke made-to-measure tailoring.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Button
                  variant="get-started"
                  onClick={() => setActiveView('our-story')}
                  className="h-11 px-6 rounded-full shadow-lg"
                >
                  <span>Our Story & Philosophy</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <button
                  onClick={() => setActiveView('collections')}
                  className="h-11 px-6 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 text-xs font-semibold transition-all shadow cursor-pointer"
                >
                  View Collections
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Showrooms Teaser */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0F5132] uppercase block">
              FIND US
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1910] tracking-tight font-serif">
              Our Flagship Showrooms & Ateliers
            </h2>
          </div>
          <button
            onClick={() => setActiveView('stores')}
            className="text-[13px] font-bold text-[#0F5132] hover:underline"
          >
            All Locations →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Accra Flagship', area: 'Airport Residential Area, Accra', image: '/brand/photo_11_2026-11-21_13-00-31.jpg' },
            { name: 'Osu Atelier', area: 'Oxford Street, Accra', image: '/brand/photo_12_2026-11-21_13-00-32.jpg' },
            { name: 'Kumasi Boutique', area: 'Ahodwo, Kumasi', image: '/brand/photo_13_2026-11-21_13-00-32.jpg' },
            { name: 'Takoradi Gallery', area: 'Beach Road, Takoradi', image: '/brand/photo_14_2026-11-21_13-00-32.jpg' },
          ].map((st, i) => (
            <div
              key={i}
              onClick={() => setActiveView('stores')}
              className="group bg-white rounded-[24px] p-4 border border-emerald-900/10 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-[18px] overflow-hidden bg-gray-100 mb-3">
                <img src={st.image} alt={st.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="font-bold text-sm text-[#0B1910] group-hover:text-[#0F5132] transition-colors">{st.name}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-light">
                <MapPin className="w-3.5 h-3.5 text-[#0F5132]" />
                <span>{st.area}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
