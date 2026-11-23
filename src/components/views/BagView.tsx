'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck, ShieldCheck, Sparkles, Lock, UserCheck } from 'lucide-react';
import QtyStepper from '../ui/QtyStepper';
import Button from '../ui/Button';

export default function BagView() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartCount,
    cartSubtotalGhc,
    deliveryFeeGhc,
    discountAmountGhc,
    cartTotalGhc,
    appliedPromoCode,
    applyPromoCode,
    removePromoCode,
    selectedDeliveryZone,
    setSelectedDeliveryZone,
    setActiveView,
    clearCart,
    user,
    setIsAuthModalOpen,
    setAuthRedirectView,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; text: string } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback({ success: res.success, text: res.message });
  };

  const handleProceedToCheckout = () => {
    if (!user.isLoggedIn) {
      setAuthRedirectView('checkout');
      setIsAuthModalOpen(true);
      return;
    }
    setActiveView('checkout');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#111113] pb-32">
      {/* Header */}
      <section className="bg-white border-b border-[#E6E6EA] py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium tracking-[0.2em] text-[#8A8A8F] uppercase">
              ORDER SUMMARY
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#111113] tracking-tight">
              Shopping Bag
            </h1>
          </div>
          {cart.length > 0 && (
            <span className="text-xs font-semibold bg-[#EDEDF0] text-[#111113] px-3.5 py-1.5 rounded-full">
              {cartCount} {cartCount === 1 ? 'Creation' : 'Creations'}
            </span>
          )}
        </div>
      </section>

      {/* Bag Content */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E6E6EA] max-w-md mx-auto my-12 space-y-5">
            <div className="w-20 h-20 rounded-full bg-[#EDEDF0] text-[#8A8A8F] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#111113]">Your Bag is Empty</h2>
              <p className="text-xs text-[#8A8A8F] max-w-xs mx-auto">
                Explore our couture gowns, hand-woven Bonwire Kente, and tailored blazers to add pieces to your bag.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => setActiveView('shop')}
              className="flex items-center justify-center gap-2 max-w-xs mx-auto"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Line Items */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A8F]">
                  Garments in Bag
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-[#8A8A8F] hover:text-[#E5384F] transition-colors"
                >
                  Clear Bag
                </button>
              </div>

              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E6E6EA] flex gap-4 sm:gap-6 items-center shadow-sm"
                  >
                    {/* Thumbnail: 14px radius */}
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-[14px] overflow-hidden bg-[#EDEDF0] flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8A8F]">
                            {item.product.category}
                          </span>
                          <h3 className="text-sm sm:text-base font-semibold text-[#111113] line-clamp-1">
                            {item.product.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded-full text-[#8A8A8F] hover:text-[#E5384F] hover:bg-[#EDEDF0] transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant metadata */}
                      <div className="flex items-center gap-3 text-xs text-[#3A3A3F]">
                        <span className="bg-[#EDEDF0] px-2.5 py-0.5 rounded-full font-medium">
                          Size {item.selectedSize}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 rounded-full border border-black/10"
                            style={{ backgroundColor: item.selectedColorHex }}
                          />
                          <span className="text-[#8A8A8F] text-[11px]">
                            {item.selectedColorName}
                          </span>
                        </div>
                      </div>

                      {/* Stepper + Price row */}
                      <div className="flex items-center justify-between pt-2">
                        {/* 40x96px quantity stepper */}
                        <QtyStepper
                          quantity={item.quantity}
                          onIncrease={() => updateCartQuantity(item.id, item.quantity + 1)}
                          onDecrease={() => updateCartQuantity(item.id, item.quantity - 1)}
                        />

                        <div className="text-right">
                          <span className="text-sm sm:text-base font-bold text-[#111113]">
                            GH₵ {(item.product.priceGhc * item.quantity).toLocaleString()}
                          </span>
                          {item.quantity > 1 && (
                            <span className="block text-[10px] text-[#8A8A8F]">
                              GH₵ {item.product.priceGhc.toLocaleString()} each
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Atelier Assurance Perks */}
              <div className="bg-white rounded-3xl p-5 border border-[#E6E6EA] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#3A3A3F]">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-[#6B73F0] flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#111113] block">Same-Day Accra</span>
                    <span className="text-[#8A8A8F] text-[11px]">Dispatched via dedicated riders</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#1F8A4C] flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#111113] block">Authenticity Guaranteed</span>
                    <span className="text-[#8A8A8F] text-[11px]">Hand-loomed certified Kente</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-[#FF2D8A] flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#111113] block">Complimentary Fitting</span>
                    <span className="text-[#8A8A8F] text-[11px]">Free alterations in Accra</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Promo Code */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-[#E6E6EA] space-y-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#111113] border-b border-[#E6E6EA] pb-3">
                  Summary
                </h2>

                {/* Delivery Zone Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#8A8A8F] uppercase tracking-wider block">
                    Delivery Destination
                  </label>
                  <select
                    value={selectedDeliveryZone}
                    onChange={(e) => setSelectedDeliveryZone(e.target.value as any)}
                    className="w-full h-11 px-3.5 rounded-2xl bg-[#EDEDF0] border-transparent text-xs font-semibold text-[#111113] outline-none focus:ring-1 focus:ring-[#6B73F0] cursor-pointer"
                  >
                    <option value="Accra Metro">Accra Metro (GH₵ 35)</option>
                    <option value="Tema / Spintex">Tema / Spintex (GH₵ 45)</option>
                    <option value="Kumasi">Kumasi (GH₵ 65)</option>
                    <option value="Takoradi">Takoradi (GH₵ 65)</option>
                    <option value="Nationwide Express">Nationwide Express (GH₵ 85)</option>
                  </select>
                </div>

                {/* Dashed Promo Code Field (#D4D4DA) */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#8A8A8F] uppercase tracking-wider block">
                    Promo or Gift Voucher
                  </label>
                  {appliedPromoCode ? (
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-[#ECEDFD] border border-[#C9CCF5] text-xs">
                      <div className="flex items-center gap-2 text-[#6B73F0] font-semibold">
                        <Tag className="w-4 h-4" />
                        <span>Code Applied: <strong>{appliedPromoCode}</strong></span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-xs text-[#E5384F] hover:underline font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="e.g. WELCOME10"
                        className="flex-1 h-11 px-4 rounded-full border border-dashed border-[#D4D4DA] text-xs uppercase tracking-wider text-[#111113] placeholder-[#8A8A8F] outline-none focus:border-[#6B73F0]"
                      />
                      <button
                        type="submit"
                        className="h-11 px-5 rounded-full bg-[#111113] text-white text-xs font-semibold hover:bg-[#3A3A3F] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {promoFeedback && (
                    <p
                      className={`text-[11px] font-medium ${
                        promoFeedback.success ? 'text-[#1F8A4C]' : 'text-[#E5384F]'
                      }`}
                    >
                      {promoFeedback.text}
                    </p>
                  )}
                </div>

                {/* Calculation Breakdown */}
                <div className="space-y-3 pt-3 border-t border-[#E6E6EA] text-xs">
                  <div className="flex items-center justify-between text-[#3A3A3F]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#111113]">
                      GH₵ {cartSubtotalGhc.toLocaleString()}
                    </span>
                  </div>

                  {discountAmountGhc > 0 && (
                    <div className="flex items-center justify-between text-[#1F8A4C]">
                      <span>Discount ({appliedPromoCode})</span>
                      <span className="font-semibold">
                        - GH₵ {discountAmountGhc.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[#3A3A3F]">
                    <span>Courier Delivery ({selectedDeliveryZone})</span>
                    <span className="font-semibold text-[#111113]">
                      GH₵ {deliveryFeeGhc.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#E6E6EA] flex items-baseline justify-between">
                    <div>
                      <span className="text-sm font-bold text-[#111113] block">Total Amount</span>
                      <span className="text-[10px] text-[#8A8A8F]">Including all Ghana taxes</span>
                    </div>
                    <span className="text-xl font-bold text-[#111113]">
                      GH₵ {cartTotalGhc.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Account Status / Auth Requirement Notice */}
                {user.isLoggedIn ? (
                  <div className="p-3 rounded-2xl bg-[#F4F1EA] border border-[#C7CBB8]/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#1E3A2E]">
                      <UserCheck className="w-4 h-4 text-[#1E3A2E]" />
                      <span>Ordering as <strong>{user.name}</strong></span>
                    </div>
                    <span className="text-[10px] bg-[#1E3A2E] text-[#C7CBB8] font-bold px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-[#F4F1EA] border border-[#C7CBB8]/80 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-[#1E3A2E] font-bold">
                      <Lock className="w-4 h-4 text-[#1E3A2E]" />
                      <span>Account Required to Checkout</span>
                    </div>
                    <p className="text-[11px] text-[#3D4337] font-light leading-relaxed">
                      Please sign in or create your T.I.M.E fits Patron account to proceed to checkout and secure your garments.
                    </p>
                  </div>
                )}

                {/* 56px High Primary CTA: Proceed to Checkout / Authenticate */}
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full h-14 rounded-full bg-[#1E3A2E] text-[#C7CBB8] text-[15px] font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-[#0F1F17] transition-all cursor-pointer"
                >
                  {user.isLoggedIn ? (
                    <>
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4 text-[#C7CBB8]" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#C7CBB8]" />
                      <span>Sign In & Proceed to Checkout</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
