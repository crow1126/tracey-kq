/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Heart, Plus, MapPin, BookmarkCheck } from 'lucide-react';
import IconButton from '../ui/IconButton';
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
    <div className="space-y-10 sm:space-y-12 pb-32 md:pb-16">
      {/* Logged in personalized greeting banner */}
      {user.isLoggedIn && (
        <div className="bg-emerald-50 border-b border-emerald-200 py-2 px-6 text-center text-xs text-[#1E3A2E]">
          <span>
            {getGreeting()},{' '}
            <strong className="text-[#0F1F17]">{user.name}</strong> · Member · Accra ·{' '}
            <strong className="text-[#1E3A2E]">{user.loyaltyPoints} Style Points</strong> available
          </span>
        </div>
      )}

      {/* 1. Single-Image Editorial Hero Section (No Slideshow, Compact Mobile Buttons) */}
      <HeroMotionSection />

      {/* 2. Modern Category Showcase / Slider */}
      <CategorySlider />

      {/* 3. T.I.M.E fits Signature Green Feature Banner */}
      {siteContent.bannerVisible && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-gradient-to-r from-[#0F1F17] via-[#1E3A2E] to-[#3E5A3F] p-6 sm:p-10 lg:p-12 text-white shadow-xl border border-[#6B7F67]/30">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-[#C7CBB8]/40 text-[#C7CBB8]">
                  {siteContent.bannerBadge || 'TAILORED PERFECTION · TIMELESS STYLE'}
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight leading-tight">
                  {siteContent.bannerHeadline || 'Meaning Woven Into Every Thread'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-200 max-w-lg font-light leading-relaxed">
                  {siteContent.bannerSubtitle ||
                    'Welcome to T.I.M.E fits, where meaningful moments become beautifully considered design. We create beyond the noise of passing trends.'}
                </p>
                {siteContent.bannerDiscountText && (
                  <p className="text-xs font-semibold text-[#E8DCC4] italic border-l-2 border-[#C7CBB8] pl-2.5 py-0.5">
                    &ldquo;{siteContent.bannerDiscountText}&rdquo;
                  </p>
                )}
                <div className="pt-1.5 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => {
                      setActiveView('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="h-10 px-5 rounded-full bg-[#C7CBB8] text-[#0F1F17] text-xs font-bold hover:bg-[#D5D9C8] transition-colors shadow-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Browse All Pieces</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('our-story');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="h-10 px-4 rounded-full bg-white/10 text-[#C7CBB8] border border-[#C7CBB8]/30 hover:bg-white/20 text-xs font-semibold transition-all shadow cursor-pointer"
                  >
                    Read Our Story
                  </button>
                </div>
              </div>

              <div className="md:col-span-4 flex justify-center md:justify-end">
                <div className="w-48 sm:w-56 h-64 sm:h-72 rounded-[20px] overflow-hidden border-2 border-white/20 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85"
                    alt="T.I.M.E fits studio couture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Trending Now Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4 sm:space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#6B7F67] uppercase block">
              DISCOVER
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-[#1E3A2E] tracking-tight font-serif">
              Trending Silhouettes
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs sm:text-[13px] font-bold text-[#1E3A2E] hover:underline cursor-pointer"
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
                className="group bg-white rounded-[20px] sm:rounded-[24px] p-2.5 sm:p-3 border border-[#E6E6EA] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-[16px] sm:rounded-[20px] overflow-hidden bg-gray-100 mb-2.5">
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
                    className="absolute top-2 right-2 z-10"
                  >
                    <IconButton variant="card-heart" isActive={hasHeart} aria-label="Save to wishlist">
                      <Heart className={`w-4 h-4 ${hasHeart ? 'fill-current text-[#1E3A2E]' : ''}`} />
                    </IconButton>
                  </div>

                  {product.discountPercent && (
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-[#1E3A2E] text-[#C7CBB8] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#3E5A3F]">
                        -{product.discountPercent}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1 px-1">
                  <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-[#6B7F67] block">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-xs sm:text-sm text-[#1E3A2E] line-clamp-1 group-hover:text-[#3E5A3F] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#3D4337] line-clamp-1 font-light">
                    {product.fabric}
                  </p>
                  <div className="pt-1.5 flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#1E3A2E] transition-colors">
                    <span>GH₵ {product.priceGhc.toLocaleString()}</span>
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Signature Interactive Feature: The T.I.M.E fits Memory Tag */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#0F1F17] rounded-[24px] sm:rounded-[28px] overflow-hidden text-white p-6 sm:p-10 border border-[#3E5A3F]/40 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-[#1E3A2E] text-[#C7CBB8] px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-[#3E5A3F]">
                <BookmarkCheck className="w-3.5 h-3.5 text-[#C7CBB8]" />
                <span>SIGNATURE BRAND DETAIL</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                The T.I.M.E fits Memory Tag
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                Sometimes, what we wear becomes part of what we remember. Every bespoke or ready-to-wear piece arrives with our signature keepsake card, woven to commemorate the chapter, date, and milestone you celebrate.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveView('our-story');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="h-9 px-4 rounded-full bg-[#C7CBB8] text-[#0F1F17] text-xs font-bold hover:bg-[#D5D9C8] transition-colors shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Learn The Philosophy</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-white text-[#0F1F17] p-5 rounded-2xl shadow-2xl border-2 border-[#C7CBB8] font-serif space-y-2.5">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-[#1E3A2E]">
                    T.I.M.E fits · Tag
                  </span>
                  <span className="text-[9px] text-[#6B7F67] font-sans">ACCRA ATELIER</span>
                </div>
                <p className="text-xs italic text-gray-700 leading-relaxed">
                  &ldquo;This piece was created to be part of your story.&rdquo;
                </p>
                <div className="space-y-1.5 pt-1 text-[11px] font-mono text-gray-800">
                  <div className="flex justify-between border-b border-dotted border-gray-300 pb-0.5">
                    <span>DATE:</span>
                    <span className="text-gray-400">______________</span>
                  </div>
                  <div className="flex justify-between border-b border-dotted border-gray-300 pb-0.5">
                    <span>OCCASION:</span>
                    <span className="text-gray-400">______________</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Spotlight / The Edit */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#0F1F17] rounded-[24px] sm:rounded-[28px] overflow-hidden text-white p-6 sm:p-10 relative shadow-xl border border-[#3E5A3F]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Visual with Shoppable Tag Card */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/5] rounded-[20px] overflow-hidden bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85"
                  alt="T.I.M.E fits studio spotlight"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Shoppable Floating Tag Card */}
              <div
                onClick={() => setQuickViewProduct(products[0])}
                className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md text-[#0F1F17] p-3 sm:p-4 rounded-[16px] sm:rounded-[20px] shadow-2xl flex items-center justify-between border border-[#C7CBB8]/50 cursor-pointer hover:bg-white transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#6B7F67] block">
                    FEATURED CREATION
                  </span>
                  <p className="font-bold text-xs sm:text-sm truncate text-[#1E3A2E]">
                    {products[0]?.name || 'The Ashanti Silk Cape Gown'}
                  </p>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#1E3A2E]">
                    GH₵ {products[0]?.priceGhc.toLocaleString() || '18,500'}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1E3A2E] text-[#C7CBB8] flex items-center justify-center shadow-md">
                  <Plus className="w-3.5 h-3.5 text-[#C7CBB8]" />
                </div>
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#C7CBB8] uppercase">
                SPOTLIGHT / THE EDIT
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-white leading-tight">
                Not Just for the Moment. For a Lifetime.
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                At T.I.M.E fits, we do more than dress the moment. We give it form, feeling and a place in the story that lasts. Discover our refined craftsmanship and bespoke made-to-measure tailoring.
              </p>

              <div className="pt-1 flex flex-wrap gap-2.5">
                <button
                  onClick={() => {
                    setActiveView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="h-10 px-5 rounded-full bg-[#C7CBB8] text-[#0F1F17] text-xs font-bold hover:bg-[#D5D9C8] transition-colors shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Shop The Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setActiveView('our-story');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="h-10 px-4 rounded-full bg-white/10 text-[#C7CBB8] border border-[#C7CBB8]/30 hover:bg-white/20 text-xs font-semibold transition-all shadow cursor-pointer"
                >
                  Our Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Showrooms Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4 sm:space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#1E3A2E] uppercase block">
              FIND US
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-[#0F1F17] tracking-tight font-serif">
              Our Flagship Showrooms & Ateliers
            </h2>
          </div>
          <button
            onClick={() => setActiveView('stores')}
            className="text-xs sm:text-[13px] font-bold text-[#1E3A2E] hover:underline cursor-pointer"
          >
            All Locations →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              name: 'Accra Flagship',
              area: 'Airport Residential Area, Accra',
              image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=85',
            },
            {
              name: 'Osu Atelier',
              area: 'Oxford Street, Accra',
              image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85',
            },
            {
              name: 'Kumasi Boutique',
              area: 'Ahodwo, Kumasi',
              image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85',
            },
            {
              name: 'Takoradi Gallery',
              area: 'Beach Road, Takoradi',
              image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85',
            },
          ].map((st, i) => (
            <div
              key={i}
              onClick={() => setActiveView('stores')}
              className="group bg-white rounded-[20px] p-3.5 border border-emerald-900/10 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-[16px] overflow-hidden bg-gray-100 mb-2.5">
                <img
                  src={st.image}
                  alt={st.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-[#0F1F17] group-hover:text-[#1E3A2E] transition-colors">
                {st.name}
              </h3>
              <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1 font-light">
                <MapPin className="w-3.5 h-3.5 text-[#1E3A2E]" />
                <span>{st.area}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
