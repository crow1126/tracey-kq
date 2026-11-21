'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/data/db-schema';
import { SEED_PRODUCTS, SEED_REVIEWS } from '@/data/db-seed';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  MessageCircle,
  Ruler,
  Check,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Share2,
} from 'lucide-react';
import Swatch from '../ui/Swatch';
import SizeSelector from '../ui/SizeSelector';
import QtyStepper from '../ui/QtyStepper';
import Badge from '../ui/Badge';
import SizeGuideModal from './SizeGuideModal';

export default function ProductDetailModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    getWhatsAppOrderUrl,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>('craftsmanship');
  const [bundleAdded, setBundleAdded] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentSize = selectedSize || product.sizes[0];
  const currentColor = selectedColor || product.colors[0];
  const wishlisted = isWishlisted(product.id);

  // Complete the look recommendation
  const completeTheLookProducts = (product.completeTheLookIds || ['prod-04', 'prod-07'])
    .map((id) => SEED_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const handleAddBundle = () => {
    // Add main product + complete look pieces
    addToCart(product, currentSize, currentColor.name, currentColor.hex, 1);
    completeTheLookProducts.forEach((comp) => {
      addToCart(comp, comp.sizes[0], comp.colors[0]?.name, comp.colors[0]?.hex, 1);
    });
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor.name, currentColor.hex, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} from Tracey Kuukua Quansah Accra`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const productReviews = SEED_REVIEWS.filter((r) => r.productId === product.id);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        <div className="relative min-h-screen flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8">
          {/* Main Modal Shell */}
          <div className="relative w-full max-w-5xl bg-[#111113] rounded-none sm:rounded-[32px] overflow-hidden shadow-2xl z-10 border border-white/10 my-0 sm:my-8 text-[#111113]">
            {/* Close & Share floating buttons */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-11 h-11 rounded-full bg-white/80 hover:bg-white text-[#111113] flex items-center justify-center backdrop-blur-md shadow-md transition-all cursor-pointer"
                aria-label="Share piece"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="w-11 h-11 rounded-full bg-white/80 hover:bg-white text-[#111113] flex items-center justify-center backdrop-blur-md shadow-md transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Full-Screen Gallery with thumbnails on dark background (#111113) */}
              <div className="lg:col-span-7 bg-[#111113] p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
                {/* Main Image Display */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group">
                  <img
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 image-scrim pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                    {product.isSpotlight && <Badge variant="accent">SPOTLIGHT COUTURE</Badge>}
                    {product.isNew && <Badge variant="pink">JUST LANDED</Badge>}
                    {product.stockStatus === 'low_stock' && <Badge variant="warning">ONLY 2 REMAINING</Badge>}
                  </div>
                </div>

                {/* Thumbnails Row: 14px radius */}
                {product.images.length > 1 && (
                  <div className="flex items-center gap-3 pt-4 overflow-x-auto no-scrollbar">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-24 rounded-[14px] overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                          activeImageIndex === idx
                            ? 'border-[#6B73F0] ring-2 ring-[#6B73F0]/40'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: White Sheet Below / Beside with 28px top corners */}
              <div className="lg:col-span-5 bg-white sm:rounded-t-[28px] lg:rounded-l-[28px] lg:rounded-tr-none p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
                <div className="space-y-6">
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8A8A8F] uppercase">
                      {product.category} · ACCRA ATELIER
                    </span>
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="flex text-[#F5B400]">
                        {'★'.repeat(Math.floor(product.rating))}
                      </div>
                      <span className="font-bold text-[#111113]">{product.rating}</span>
                      <span className="text-[#8A8A8F]">({product.reviewCount || 14})</span>
                    </div>
                  </div>

                  {/* Product Title: 24/30px, 600 */}
                  <div>
                    <h2 className="text-[24px] leading-[30px] font-semibold text-[#111113]">
                      {product.name}
                    </h2>
                    <p className="text-xs text-[#8A8A8F] mt-1">{product.subtitle}</p>
                  </div>

                  {/* Price (detail page): 22px, 700 */}
                  <div className="flex items-baseline gap-3 pb-2 border-b border-[#E6E6EA]">
                    <span className="text-[22px] font-bold text-[#111113]">
                      GH₵ {product.priceGhc.toLocaleString()}
                    </span>
                    {product.originalPriceGhc && (
                      <span className="text-[14px] text-[#8A8A8F] line-through">
                        GH₵ {product.originalPriceGhc.toLocaleString()}
                      </span>
                    )}
                    <span className="text-xs text-[#1F8A4C] font-semibold bg-[#E8F5EE] px-2.5 py-0.5 rounded-full">
                      Taxes & Duties Included
                    </span>
                  </div>

                  {/* The Story of This Creation */}
                  <div className="bg-[#F5F5F7] rounded-2xl p-4 sm:p-5 border border-[#E6E6EA] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#6B73F0] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>The Story of This Creation</span>
                      </span>
                      <span className="text-[10px] text-[#8A8A8F] uppercase font-semibold">
                        Accra Atelier Archive
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-[#3A3A3F] leading-relaxed font-normal">
                      {product.description}
                    </p>
                    <p className="text-xs text-[#8A8A8F] italic leading-relaxed">
                      "{product.craftsmanship || 'Hand-loomed in the Ashanti region of Bonwire by hereditary master weavers. Finished with French seams and architectural interior boning.'}"
                    </p>
                    <div className="pt-2 border-t border-[#E6E6EA] flex flex-wrap items-center justify-between text-[11px] text-[#8A8A8F] gap-2">
                      <span>Fabric: <strong className="text-[#111113]">{product.fabric}</strong></span>
                      <span className="text-[#0F5132] font-semibold">T.I.M.E fits · Accra Atelier</span>
                    </div>
                  </div>

                  {/* T.I.M.E fits Memory Tag Included */}
                  <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#0F5132] text-white flex items-center justify-center text-xs font-serif font-bold shrink-0">
                      TAG
                    </span>
                    <div className="text-[11px] leading-tight">
                      <span className="font-bold text-[#0F5132] block">T.I.M.E fits Memory Tag Included</span>
                      <span className="text-gray-600 font-light italic">&ldquo;This piece was created to be part of your story.&rdquo; (Date & Occasion card)</span>
                    </div>
                  </div>

                  {/* "Fits True to Size" Meter */}
                  <div className="bg-[#F5F5F7] rounded-2xl p-3.5 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-[#111113] block">Patron Fit Consensus</span>
                      <span className="text-[#8A8A8F] text-[11px]">96% of Accra clients report True to Size</span>
                    </div>
                    <div className="w-24 bg-[#E6E6EA] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#1F8A4C] h-full w-[96%]" />
                    </div>
                  </div>

                  {/* Colour Swatches (44x44px circle, 2px ring when selected with 3px white gap) */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#111113]">
                        Colour: <strong className="text-[#6B73F0]">{currentColor.name}</strong>
                      </span>
                      <span className="text-[#8A8A8F]">{product.colors.length} hand-dyed variants</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {product.colors.map((c) => (
                        <Swatch
                          key={c.name}
                          hex={c.hex}
                          name={c.name}
                          selected={currentColor.name === c.name}
                          onClick={() => setSelectedColor(c)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selectors (XS to XXL): 48px high, min-width 64px, pill, selected = ink bg */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#111113]">Select Silhouette Size</span>
                      {/* Size guide modal trigger */}
                      <button
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="text-[#6B73F0] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Size Guide & Fit Advisor</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <SizeSelector
                          key={size}
                          size={size}
                          selected={currentSize === size}
                          onClick={() => setSelectedSize(size)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quantity Stepper: container 40px high, 96px wide */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold text-[#111113]">Quantity</span>
                    <QtyStepper
                      quantity={quantity}
                      onIncrease={() => setQuantity((q) => q + 1)}
                      onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                    />
                  </div>

                  {/* Primary CTA Row: Add to Bag · price: 56px high, flex-1, beside a 56x56px wishlist button */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className={`h-14 flex-1 rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-200 cursor-pointer ${
                        isAdded
                          ? 'bg-[#1F8A4C] text-white'
                          : 'bg-[#111113] text-white hover:bg-[#3A3A3F]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>Added to Bag ✓</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-5 h-5" />
                          <span>
                            Add to Bag · GH₵ {(product.priceGhc * quantity).toLocaleString()}
                          </span>
                        </>
                      )}
                    </button>

                    {/* Wishlist Heart button on product detail: 56x56px */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="w-14 h-14 rounded-full border border-[#E6E6EA] bg-white flex items-center justify-center hover:bg-[#EDEDF0] transition-colors cursor-pointer"
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-6 h-6 transition-transform active:scale-125 ${
                          wishlisted ? 'text-[#E5384F] fill-[#E5384F]' : 'text-[#111113]'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Order via WhatsApp Button with prefilled message */}
                  <div>
                    <a
                      href={getWhatsAppOrderUrl(product, currentSize, currentColor.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-12 rounded-full border border-[#1F8A4C] text-[#1F8A4C] hover:bg-[#1F8A4C] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order Directly via WhatsApp Concierge</span>
                    </a>
                  </div>

                  {/* Complete the Look Section */}
                  {completeTheLookProducts.length > 0 && (
                    <div className="bg-[#F5F5F7] rounded-3xl p-4 sm:p-5 border border-[#E6E6EA] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#111113] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#6B73F0]" />
                          <span>Complete the Look</span>
                        </span>
                        <button
                          onClick={handleAddBundle}
                          className="text-xs font-semibold text-[#6B73F0] hover:underline cursor-pointer"
                        >
                          {bundleAdded ? 'All Added ✓' : 'Add All to Bag +'}
                        </button>
                      </div>

                      <div className="space-y-2">
                        {completeTheLookProducts.map((comp) => (
                          <div
                            key={comp.id}
                            className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-[#E6E6EA]"
                          >
                            <img
                              src={comp.images[0]}
                              alt={comp.name}
                              className="w-12 h-14 object-cover rounded-xl"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-semibold text-[#111113] truncate">
                                {comp.name}
                              </h4>
                              <p className="text-[11px] text-[#8A8A8F]">
                                GH₵ {comp.priceGhc.toLocaleString()}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                addToCart(comp, comp.sizes[0], comp.colors[0]?.name, comp.colors[0]?.hex, 1)
                              }
                              className="px-3 py-1.5 rounded-full bg-[#EDEDF0] hover:bg-[#111113] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                            >
                              + Add
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accordions: Craftsmanship, Care, Delivery */}
                  <div className="border-t border-[#E6E6EA] pt-4 space-y-3">
                    {/* Craftsmanship */}
                    <div className="border border-[#E6E6EA] rounded-2xl overflow-hidden">
                      <button
                        onClick={() =>
                          setOpenAccordion(openAccordion === 'craftsmanship' ? '' : 'craftsmanship')
                        }
                        className="w-full p-4 text-left font-semibold text-xs text-[#111113] flex items-center justify-between bg-white hover:bg-[#F5F5F7]"
                      >
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#6B73F0]" />
                          <span>Artisanal Heritage & Craftsmanship</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-[#8A8A8F] transition-transform ${
                            openAccordion === 'craftsmanship' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openAccordion === 'craftsmanship' && (
                        <div className="p-4 bg-[#F5F5F7] text-xs text-[#3A3A3F] leading-relaxed border-t border-[#E6E6EA]">
                          {product.craftsmanship ||
                            'Hand-loomed in the Ashanti region of Bonwire by hereditary master weavers. Finished with French seams and architectural interior boning.'}
                        </div>
                      )}
                    </div>

                    {/* Delivery & Concierge */}
                    <div className="border border-[#E6E6EA] rounded-2xl overflow-hidden">
                      <button
                        onClick={() =>
                          setOpenAccordion(openAccordion === 'delivery' ? '' : 'delivery')
                        }
                        className="w-full p-4 text-left font-semibold text-xs text-[#111113] flex items-center justify-between bg-white hover:bg-[#F5F5F7]"
                      >
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#1F8A4C]" />
                          <span>Accra Delivery & Global Courier</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-[#8A8A8F] transition-transform ${
                            openAccordion === 'delivery' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openAccordion === 'delivery' && (
                        <div className="p-4 bg-[#F5F5F7] text-xs text-[#3A3A3F] leading-relaxed border-t border-[#E6E6EA] space-y-1.5">
                          <p>
                            • <strong>Accra Metro:</strong> Same-day express dispatch available for orders placed before 2:00 PM.
                          </p>
                          <p>
                            • <strong>Kumasi & Takoradi:</strong> 1-2 business days via dedicated courier.
                          </p>
                          <p>
                            • <strong>Worldwide:</strong> 3-5 business days via DHL Express with direct customs clearance.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Returns & Alterations */}
                    <div className="border border-[#E6E6EA] rounded-2xl overflow-hidden">
                      <button
                        onClick={() =>
                          setOpenAccordion(openAccordion === 'returns' ? '' : 'returns')
                        }
                        className="w-full p-4 text-left font-semibold text-xs text-[#111113] flex items-center justify-between bg-white hover:bg-[#F5F5F7]"
                      >
                        <div className="flex items-center gap-2">
                          <RotateCcw className="w-4 h-4 text-[#FF2D8A]" />
                          <span>Complimentary In-Boutique Alterations</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-[#8A8A8F] transition-transform ${
                            openAccordion === 'returns' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openAccordion === 'returns' && (
                        <div className="p-4 bg-[#F5F5F7] text-xs text-[#3A3A3F] leading-relaxed border-t border-[#E6E6EA]">
                          Every ready-to-wear gown comes with one complimentary fitting and bespoke hem adjustment at either our Accra Mall or Osu Oxford Street ateliers.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nested Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onSelectSize={(size) => setSelectedSize(size)}
      />
    </>
  );
}
