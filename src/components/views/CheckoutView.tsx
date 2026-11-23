'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  Phone,
  Smartphone,
  ChevronRight,
  Sparkles,
  UserCheck,
} from 'lucide-react';

export default function CheckoutView() {
  const {
    cart,
    cartSubtotalGhc,
    deliveryFeeGhc,
    discountAmountGhc,
    cartTotalGhc,
    selectedDeliveryZone,
    setSelectedDeliveryZone,
    selectedDeliveryMethod,
    setSelectedDeliveryMethod,
    placeOrder,
    setActiveView,
    user,
    setIsAuthModalOpen,
    setAuthRedirectView,
  } = useStore();

  // Contact details initialized from authenticated patron account
  const [customerName, setCustomerName] = useState(user.isLoggedIn ? user.name : '');
  const [customerEmail, setCustomerEmail] = useState(user.isLoggedIn ? user.email : '');
  const [customerPhone, setCustomerPhone] = useState(user.isLoggedIn ? user.phone : '+233 20 891 2345');
  const [deliveryAddress, setDeliveryAddress] = useState(
    user.addresses?.[0]?.address || 'House 14, Senchi Street, Airport Residential Area'
  );
  const [city, setCity] = useState(user.addresses?.[0]?.city || 'Accra');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<
    'MTN Mobile Money' | 'Telecel Cash' | 'AirtelTigo Money' | 'Credit / Debit Card' | 'Cash on Delivery'
  >('MTN Mobile Money');

  const [momoNumber, setMomoNumber] = useState('+233 24 555 1234');
  const [momoNetwork, setMomoNetwork] = useState('MTN');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Strict Authentication Gate: Account Required to Checkout
  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F7F7F4] flex items-center justify-center p-4 pb-36">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#E6E6EA] text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#F4F1EA] text-[#1E3A2E] flex items-center justify-center mx-auto border border-[#C7CBB8]/60">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#6B7F67] uppercase">
              AUTHENTICATION REQUIRED
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3A2E]">
              Patron Account Required
            </h2>
            <p className="text-xs text-[#3D4337] leading-relaxed">
              Before proceeding to checkout, an account is required to reserve your garments, assign your bespoke Memory Tag, and access atelier courier tracking.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setAuthRedirectView('checkout');
                setIsAuthModalOpen(true);
              }}
              className="w-full h-12 rounded-full bg-[#1E3A2E] text-[#C7CBB8] font-bold text-xs uppercase tracking-wider hover:bg-[#0F1F17] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In / Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveView('bag');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="w-full h-11 rounded-full bg-transparent text-[#3D4337] border border-[#E6E6EA] hover:bg-gray-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              Return to Shopping Bag
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder({
        customerName: customerName || user.name,
        customerEmail: customerEmail || user.email,
        customerPhone: customerPhone || user.phone,
        deliveryAddress,
        city,
        paymentMethod,
      });

      setIsSubmitting(false);
      setActiveView('confirmation');
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#0F1F17] pb-36">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E6E6EA] py-4 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <button
            onClick={() => setActiveView('bag')}
            className="flex items-center gap-2 text-xs font-semibold text-[#3D4337] hover:text-[#1E3A2E] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </button>

          <span className="font-semibold text-xs tracking-[0.25em] text-[#1E3A2E] uppercase font-serif">
            T.I.M.E FITS · ATELIER CHECKOUT
          </span>

          <div className="flex items-center gap-1 text-xs text-[#1E3A2E] font-semibold bg-[#F4F1EA] px-2.5 py-1 rounded-full border border-[#C7CBB8]/60">
            <Lock className="w-3.5 h-3.5 text-[#1E3A2E]" />
            <span>Secure 256-Bit</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 pt-8 space-y-8">
        <form onSubmit={handlePlaceOrder} className="space-y-8">
          {/* 1. Verified Patron Contact Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E6EA] shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#1E3A2E] text-[#C7CBB8] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg font-bold text-[#1E3A2E]">Recipient & Patron Account</h2>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#1E3A2E] font-semibold bg-[#F4F1EA] px-3 py-1 rounded-full border border-[#C7CBB8]/60">
                <UserCheck className="w-3.5 h-3.5 text-[#1E3A2E]" />
                <span>Verified {user.tier}</span>
              </div>
            </div>

            {/* Authenticated Member Banner */}
            <div className="p-3.5 rounded-2xl bg-[#F4F1EA] border border-[#C7CBB8]/60 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold tracking-wider text-[#6B7F67] uppercase block">
                  Logged In As
                </span>
                <p className="font-bold text-[#1E3A2E] text-sm">
                  {user.name} <span className="text-xs font-normal text-[#3D4337]">({user.email})</span>
                </p>
                <p className="text-[11px] text-[#6B7F67]">
                  {user.tier} Patron Member · {user.loyaltyPoints} Style Points
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAuthRedirectView('checkout');
                  setIsAuthModalOpen(true);
                }}
                className="text-[11px] font-semibold text-[#1E3A2E] hover:underline cursor-pointer"
              >
                Switch Account
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#6B7F67] block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-12 px-4 rounded-full bg-[#F4F1EA] border border-[#C7CBB8]/40 text-xs font-medium text-[#0F1F17] outline-none focus:border-[#1E3A2E]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B7F67] block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-full bg-[#F4F1EA] border border-[#C7CBB8]/40 text-xs font-medium text-[#0F1F17] outline-none focus:border-[#1E3A2E]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B7F67] block mb-1.5">
                  Phone (Ghana MoMo / Courier)
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full h-12 px-4 rounded-full bg-[#F4F1EA] border border-[#C7CBB8]/40 text-xs font-medium text-[#0F1F17] outline-none focus:border-[#1E3A2E]"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Address Card with Edit Option */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E6EA] shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#1E3A2E] text-[#C7CBB8] text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-lg font-bold text-[#1E3A2E]">Delivery Location</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingAddress(!isEditingAddress)}
                className="text-xs font-semibold text-[#1E3A2E] hover:underline cursor-pointer"
              >
                {isEditingAddress ? 'Done Editing' : 'Edit Address'}
              </button>
            </div>

            {isEditingAddress ? (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#6B7F67] block mb-1.5">
                      Street / Landmark / Digital Address (e.g. GA-183-9021)
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full h-12 px-4 rounded-full bg-[#F4F1EA] border border-[#C7CBB8]/40 text-xs font-medium text-[#0F1F17] outline-none focus:border-[#1E3A2E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#6B7F67] block mb-1.5">
                      City / Region
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-12 px-4 rounded-full bg-[#F4F1EA] border border-[#C7CBB8]/40 text-xs font-medium text-[#0F1F17] outline-none focus:border-[#1E3A2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6B7F67] block mb-1.5">
                    Delivery Zone
                  </label>
                  <select
                    value={selectedDeliveryZone}
                    onChange={(e) => setSelectedDeliveryZone(e.target.value as any)}
                    className="w-full h-12 px-4 rounded-full bg-[#F4F1EA] border border-[#C7CBB8]/40 text-xs font-semibold text-[#0F1F17] outline-none cursor-pointer"
                  >
                    <option value="Accra Metro">Accra Metro (GH₵ 35)</option>
                    <option value="Tema / Spintex">Tema / Spintex (GH₵ 45)</option>
                    <option value="Kumasi">Kumasi (GH₵ 65)</option>
                    <option value="Takoradi">Takoradi (GH₵ 65)</option>
                    <option value="Nationwide Express">Nationwide Express (GH₵ 85)</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#F4F1EA] border border-[#C7CBB8]/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#1E3A2E] block">
                    {deliveryAddress}
                  </span>
                  <span className="text-xs text-[#3D4337]">
                    {city} · Zone: <strong className="text-[#1E3A2E]">{selectedDeliveryZone}</strong>
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#1E3A2E] bg-white border border-[#C7CBB8] px-3 py-1 rounded-full">
                  Confirmed
                </span>
              </div>
            )}

            {/* Delivery option cards */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7F67] block">
                Delivery Dispatch Speed
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Standard Card */}
                <div
                  onClick={() => setSelectedDeliveryMethod('Standard Courier (2-3 Days)')}
                  className={`h-[88px] rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all ${
                    selectedDeliveryMethod === 'Standard Courier (2-3 Days)'
                      ? 'border-2 border-[#1E3A2E] bg-white shadow-sm'
                      : 'border border-[#E6E6EA] bg-[#F4F1EA] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E3A2E]">
                      Standard Courier (2-3 Days)
                    </span>
                    {selectedDeliveryMethod === 'Standard Courier (2-3 Days)' && (
                      <span className="w-5 h-5 rounded-full bg-[#1E3A2E] text-[#C7CBB8] flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#C7CBB8]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#6B7F67]">
                    Tracked delivery via dedicated regional courier
                  </span>
                </div>

                {/* Priority Card */}
                <div
                  onClick={() => setSelectedDeliveryMethod('Express Same-Day Priority')}
                  className={`h-[88px] rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all ${
                    selectedDeliveryMethod === 'Express Same-Day Priority'
                      ? 'border-2 border-[#1E3A2E] bg-white shadow-sm'
                      : 'border border-[#E6E6EA] bg-[#F4F1EA] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#1E3A2E]">
                        Express Same-Day Priority
                      </span>
                      <span className="text-[9px] bg-[#1E3A2E] text-[#C7CBB8] px-1.5 py-0.2 rounded-full font-bold">
                        FAST
                      </span>
                    </div>
                    {selectedDeliveryMethod === 'Express Same-Day Priority' && (
                      <span className="w-5 h-5 rounded-full bg-[#1E3A2E] text-[#C7CBB8] flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#C7CBB8]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#6B7F67]">
                    Dispatched within 2 hours in Accra Metro
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Ghana Payment Methods */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E6EA] shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#1E3A2E] text-[#C7CBB8] text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="text-lg font-bold text-[#1E3A2E]">Payment Method</h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'MTN Mobile Money',
                  title: 'MTN Mobile Money',
                  desc: 'Instant prompt pushed to your MTN phone',
                  icon: Smartphone,
                  badge: 'Popular',
                },
                {
                  id: 'Telecel Cash',
                  title: 'Telecel Cash (Vodafone)',
                  desc: 'Pay with your Telecel Cash voucher/PIN',
                  icon: Smartphone,
                },
                {
                  id: 'AirtelTigo Money',
                  title: 'AirtelTigo Money',
                  desc: 'Direct payment via AT Money wallet',
                  icon: Smartphone,
                },
                {
                  id: 'Credit / Debit Card',
                  title: 'Ghana Visa / Mastercard',
                  desc: 'Secured via local Ghana bank gateway',
                  icon: CreditCard,
                },
                {
                  id: 'Cash on Delivery',
                  title: 'Payment on Delivery',
                  desc: 'Cash or MoMo to courier rider upon inspection',
                  icon: Truck,
                },
              ].map((method) => {
                const isSelected = paymentMethod === method.id;
                const Icon = method.icon;

                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'border-2 border-[#1E3A2E] bg-white shadow-xs'
                        : 'border-[#E6E6EA] bg-[#F4F1EA] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-[#1E3A2E] text-[#C7CBB8]' : 'bg-white text-[#3D4337]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1E3A2E]">
                              {method.title}
                            </span>
                            {method.badge && (
                              <span className="text-[9px] bg-[#1E3A2E] text-[#C7CBB8] font-bold px-2 py-0.5 rounded-full">
                                {method.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#6B7F67]">
                            {method.desc}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#1E3A2E] bg-[#1E3A2E]' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#C7CBB8]" />}
                      </div>
                    </div>

                    {/* MoMo Input Field */}
                    {isSelected && method.id.includes('Money') && (
                      <div className="mt-4 pt-3 border-t border-[#E6E6EA] grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-[#6B7F67] block mb-1">
                            Registered Mobile Number
                          </label>
                          <input
                            type="tel"
                            value={momoNumber}
                            onChange={(e) => setMomoNumber(e.target.value)}
                            className="w-full h-11 px-4 rounded-full bg-white border border-[#C7CBB8]/60 text-xs font-semibold text-[#0F1F17] outline-none focus:border-[#1E3A2E]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-[#6B7F67] block mb-1">
                            Network Provider
                          </label>
                          <select
                            value={momoNetwork}
                            onChange={(e) => setMomoNetwork(e.target.value)}
                            className="w-full h-11 px-4 rounded-full bg-white border border-[#C7CBB8]/60 text-xs font-semibold text-[#0F1F17] outline-none cursor-pointer"
                          >
                            <option value="MTN">MTN MoMo</option>
                            <option value="Telecel">Telecel Cash</option>
                            <option value="AirtelTigo">AT Money</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Order Summary Preview */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E6EA] shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#1E3A2E] border-b border-[#E6E6EA] pb-3">
              Order Review ({cart.length} {cart.length === 1 ? 'Garment' : 'Garments'})
            </h2>

            <div className="divide-y divide-[#E6E6EA]">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-xl"
                    />
                    <div>
                      <h4 className="font-semibold text-[#1E3A2E]">{item.product.name}</h4>
                      <p className="text-[11px] text-[#6B7F67]">
                        Size: {item.selectedSize} · Color: {item.selectedColorName} · Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#1E3A2E]">
                    GH₵ {(item.product.priceGhc * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E6E6EA] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#3D4337]">
                <span>Items Subtotal</span>
                <span>GH₵ {cartSubtotalGhc.toLocaleString()}</span>
              </div>
              {discountAmountGhc > 0 && (
                <div className="flex justify-between text-[#1E3A2E] font-medium">
                  <span>Discount</span>
                  <span>- GH₵ {discountAmountGhc.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-[#3D4337]">
                <span>Delivery ({selectedDeliveryZone})</span>
                <span>GH₵ {deliveryFeeGhc.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1E3A2E] pt-2 border-t border-[#E6E6EA]">
                <span>Total Due</span>
                <span>GH₵ {cartTotalGhc.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sticky Desktop / Mobile Bottom Bar */}
          <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E6E6EA] py-3.5 px-6 shadow-lg">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#6B7F67] block">Total to Pay</span>
                <span className="text-xl font-bold text-[#1E3A2E]">
                  GH₵ {cartTotalGhc.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="h-[52px] w-[190px] rounded-full bg-[#1E3A2E] text-[#C7CBB8] text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-[#0F1F17] transition-all disabled:opacity-50 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-[#C7CBB8] border-t-transparent" />
                ) : (
                  <span>Place Order</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
