'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { SEED_ARTICLES } from '@/data/db-seed';
import { Plus, ArrowRight, Share2, Clock, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import Badge from '../ui/Badge';

export default function SpotlightView() {
  const { products, setActiveView, setQuickViewProduct, addToCart } = useStore();
  const heroArticle = SEED_ARTICLES[0];
  const featuredProduct = products.find((p) => p.id === heroArticle.shoppableProductId) || products[0];

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#F5F5F7] min-h-screen py-12 px-5 sm:px-8 lg:px-12 space-y-16 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[11px] font-medium tracking-[0.2em] text-[#6B73F0] uppercase">
          THE EDIT & JOURNAL
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111113] font-display">
          Spotlight & Style Stories
        </h1>
        <p className="text-sm sm:text-base text-[#3A3A3F] font-light leading-relaxed">
          Critical essays, styling treatises, behind-the-scenes artisan documentaries, and press chronicles from Accra to Paris.
        </p>
      </div>

      {/* Hero Look with Shoppable Tag Card (Specification) */}
      <div className="bg-[#111113] rounded-[28px] overflow-hidden text-white shadow-lg-nav">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 relative">
            <div className="aspect-[16/11] sm:aspect-[4/3] bg-[#1C1C1F] overflow-hidden">
              <img
                src={heroArticle.heroImage}
                alt={heroArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Shoppable Floating Tag Card (Specification) */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 glass text-[#111113] p-4 rounded-[20px] shadow-2xl border border-white/60">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B73F0] block">
                FEATURED LOOK
              </span>
              <div className="flex items-center justify-between gap-3 mt-1">
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs truncate text-[#111113]">
                    {featuredProduct.name}
                  </h4>
                  <p className="text-xs font-bold text-[#111113]">
                    GH₵ {featuredProduct.priceGhc.toLocaleString()}
                  </p>
                </div>
                {/* 40x40 circle ink button */}
                <IconButton
                  variant="quick-add"
                  onClick={() => addToCart(featuredProduct)}
                  aria-label="Quick add"
                >
                  <Plus className="w-4 h-4 text-white" />
                </IconButton>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-12 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="accent">{heroArticle.category}</Badge>
              <button
                onClick={() => handleShare(heroArticle.title)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white leading-tight">
              {heroArticle.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#A1A1A8] font-light leading-relaxed">
              {heroArticle.excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs text-[#8A8A8F] pt-2">
              <span>{heroArticle.author}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {heroArticle.readTime}
              </span>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <Button
                variant="get-started"
                onClick={() => setQuickViewProduct(featuredProduct)}
              >
                <span>Shop This Look</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* More Stories & Articles Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[#111113] font-display">More Journal Dispatches</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SEED_ARTICLES.slice(1).map((article) => {
            const artProduct = products.find((p) => p.id === article.shoppableProductId);

            return (
              <div
                key={article.id}
                className="bg-white rounded-[24px] overflow-hidden border border-[#E6E6EA] shadow-sm-card hover:shadow-md-card transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-[#EDEDF0] overflow-hidden">
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="neutral">{article.category}</Badge>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-bold text-base text-[#111113] line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-[#3A3A3F] font-light line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E6E6EA] flex items-center justify-between text-xs">
                    <span className="text-[#8A8A8F]">{article.readTime}</span>
                    {artProduct && (
                      <button
                        onClick={() => setQuickViewProduct(artProduct)}
                        className="font-bold text-[#6B73F0] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Shop Look</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shoppable CTA */}
      <div className="bg-[#111113] text-white rounded-[24px] p-8 sm:p-12 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-display">
          Curated Ready-to-Wear
        </h2>
        <p className="text-xs sm:text-sm text-[#A1A1A8] font-light max-w-md mx-auto">
          Explore all the silhouettes featured throughout our journal dispatches.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="get-started" onClick={() => setActiveView('shop')}>
            <span>Shop The Journal</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
