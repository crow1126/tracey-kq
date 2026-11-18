'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { SEED_CATEGORIES, SEED_COLLECTIONS, SEED_ARTICLES } from '@/data/db-seed';
import { ArrowRight, Heart, Plus, Sparkles, MapPin, ChevronRight, Play } from 'lucide-react';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import Badge from '../ui/Badge';
import CategorySlider from '../ui/CategorySlider';

export default function HomeView() {
  const {
    products,
    setActiveView,
    setQuickViewProduct,
    toggleWishlist,
    isWishlisted,
    addToCart,
    navigateToCategory,
    siteContent,
    user,
  } = useStore();

  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);

  // Time-based greeting for logged-in users
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
        <div className="bg-[#ECEDFD] border-b border-[#C9CCF5] py-2 px-6 text-center text-xs text-[#3A3A3F]">
          <span>{getGreeting()}, <strong className="text-[#111113]">{user.name}</strong> · Member · Accra · <strong className="text-[#6B73F0]">{user.loyaltyPoints} Style Points</strong> available</span>
        </div>
      )}

      {/* 1. Full-Bleed Campaign Hero Section */}
      <section className="relative min-h-[580px] sm:min-h-[640px] bg-[#111113] text-white flex items-center overflow-hidden">
        {/* Background Visual */}
        <div className="absolute inset-0 z-0">
          <img
            src={siteContent.heroImageUrl}
            alt="Tracey Kuukua Quansah Haute Couture"
            className="w-full h-full object-cover object-top filter brightness-[0.78] contrast-105"
          />
          <div className="absolute inset-0 image-scrim" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 py-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-[#6B73F0] animate-ping" />
            <span className="tracking-widest uppercase text-[10px]">
              {siteContent.heroCampaignBadge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.08] font-display">
            {siteContent.heroHeadlinePrefix}{' '}
            <span className="text-[#6B73F0]">{siteContent.heroHeadlineAccent}</span>
            {siteContent.heroHeadlineSuffix}
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-xl font-normal leading-relaxed">
            {siteContent.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="get-started"
              onClick={() => setActiveView('shop')}
              className="flex items-center gap-2 shadow-xl"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5 text-[#111113]" />
            </Button>

            <Button
              variant="outline"
              onClick={() => setActiveView('our-story')}
              className="bg-black/30 backdrop-blur-md text-white border-white/30 hover:bg-white/20"
            >
              <span>Our Story</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Modern Category Showcase / Slider */}
      <CategorySlider />

      {/* 3. Just Landed Pink-Gradient Hero Banner */}
      {siteContent.bannerVisible && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="relative rounded-[24px] overflow-hidden pink-gradient p-8 sm:p-12 text-white shadow-lg-nav">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {siteContent.bannerBadge}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight leading-tight">
                  {siteContent.bannerHeadline}
                </h2>
                <p className="text-sm text-white/90 max-w-md font-light leading-relaxed">
                  {siteContent.bannerSubtitle}
                </p>
                {siteContent.bannerDiscountText && (
                  <p className="text-xs font-semibold text-[#FFCC00]">
                    {siteContent.bannerDiscountText}
                  </p>
                )}
                <div className="pt-2">
                  <Button
                    variant="get-started"
                    onClick={() => setActiveView('explore')}
                    className="shadow-md"
                  >
                    <span>Explore New Arrivals</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div className="md:col-span-4 flex justify-center md:justify-end">
                <div className="w-56 h-64 rounded-[20px] overflow-hidden border-2 border-white/30 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85"
                    alt="Just landed model"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Trending Now 2-Column Product Grid with Hearts & See All (Specification) */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-medium tracking-[0.2em] text-[#8A8A8F] uppercase block">
              DISCOVER
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111113] tracking-tight font-display">
              Trending Now
            </h2>
          </div>
          <button
            onClick={() => setActiveView('shop')}
            className="text-[13px] font-semibold text-[#6B73F0] hover:underline"
          >
            See all ({products.length})
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
                className="group bg-white rounded-[24px] p-3 border border-[#E6E6EA] shadow-sm-card hover:shadow-md-card transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden bg-[#EDEDF0] mb-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Wishlist Heart on Product Cards: 36x36px circle, white bg, 18px icon, 10px from top-right */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 z-10"
                  >
                    <IconButton variant="card-heart" isActive={hasHeart} aria-label="Save to wishlist">
                      <Heart className={`w-[18px] h-[18px] ${hasHeart ? 'fill-current' : ''}`} />
                    </IconButton>
                  </div>

                  {product.discountPercent && (
                    <div className="absolute bottom-2.5 left-2.5">
                      <Badge variant="pink">-{product.discountPercent}%</Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-1 px-1">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#8A8A8F] block">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-[14px] sm:text-[15px] text-[#111113] line-clamp-1 group-hover:text-[#6B73F0] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-[#8A8A8F] line-clamp-1">
                    {product.fabric}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] font-semibold text-[#6B73F0] group-hover:text-[#111113] transition-colors">
                    <span>Discover Story & Price</span>
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Spotlight Preview / "The Edit" with Shoppable Tag Card (Specification) */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="bg-[#111113] rounded-[28px] overflow-hidden text-white p-6 sm:p-12 relative shadow-lg-nav">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual with Shoppable Tag Card */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-[#1C1C1F]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"
                  alt="Spotlight editorial"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Shoppable Floating Tag Card (Specification: glass + quick add + button) */}
              <div
                onClick={() => setQuickViewProduct(products[3] || products[0])}
                className="absolute bottom-4 inset-x-4 glass text-[#111113] p-4 rounded-[20px] shadow-lg flex items-center justify-between border border-white/60 cursor-pointer hover:bg-white transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B73F0] block">
                    FEATURED SILHOUETTE
                  </span>
                  <p className="font-bold text-sm truncate">
                    Bonwire Kente Corset Blazer
                  </p>
                  <p className="text-xs font-semibold text-[#111113]">
                    Handcrafted in Bonwire · Read Story & View Details →
                  </p>
                </div>
                {/* Quick-add "+" on tag card: 40x40px circle, ink bg */}
                <IconButton
                  variant="quick-add"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuickViewProduct(products[3] || products[0]);
                  }}
                  aria-label="View story & details"
                >
                  <Plus className="w-5 h-5 text-white" />
                </IconButton>
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-medium tracking-[0.2em] text-[#6B73F0] uppercase">
                SPOTLIGHT / THE EDIT
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white leading-tight">
                Ancestral Craft Meets Architectural Modernism
              </h2>
              <p className="text-sm sm:text-base text-[#A1A1A8] font-light leading-relaxed">
                Discover the stories behind our master artisans in Bonwire and Kumasi who cast recycled brass buttons and hand-weave pure silk Kente on wooden heirloom looms.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button
                  variant="get-started"
                  onClick={() => setActiveView('spotlight')}
                >
                  <span>Read The Full Journal</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveView('collections')}
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  <span>View Lookbook</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Physical Stores Teaser (Accra Mall, Osu, Kumasi, Takoradi) */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-medium tracking-[0.2em] text-[#8A8A8F] uppercase block">
              FIND US
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111113] tracking-tight font-display">
              Our Flagship Stores & Ateliers
            </h2>
          </div>
          <button
            onClick={() => setActiveView('stores')}
            className="text-[13px] font-semibold text-[#6B73F0] hover:underline"
          >
            All 4 Locations →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Accra Mall', area: 'Tetteh Quarshie, Accra', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80' },
            { name: 'Osu Atelier', area: 'Oxford Street, Accra', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80' },
            { name: 'Kumasi Boutique', area: 'Ahodwo, Kumasi', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80' },
            { name: 'Takoradi Gallery', area: 'Beach Road, Takoradi', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=600&q=80' },
          ].map((st, i) => (
            <div
              key={i}
              onClick={() => setActiveView('stores')}
              className="group bg-white rounded-[24px] p-4 border border-[#E6E6EA] hover:shadow-md-card transition-all cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-[18px] overflow-hidden bg-[#EDEDF0] mb-3">
                <img src={st.image} alt={st.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="font-bold text-sm text-[#111113] group-hover:text-[#6B73F0] transition-colors">{st.name}</h3>
              <p className="text-xs text-[#8A8A8F] flex items-center gap-1 mt-1 font-light">
                <MapPin className="w-3.5 h-3.5" />
                <span>{st.area}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
