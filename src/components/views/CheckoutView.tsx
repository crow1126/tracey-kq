'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  Phone,
  Smartphone,
  ChevronRight,
  Sparkles,
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
  } = useStore();

  // Guest details form state
  const [customerName, setCustomerName] = useState(user.isLoggedIn ? user.name : 'Ama Mensah');
  const [customerEmail, setCustomerEmail] = useState(user.isLoggedIn ? user.email : 'ama.mensah@prestige.gh');
  const [customerPhone, setCustomerPhone] = useState(user.isLoggedIn ? user.phone : '+233 20 891 2345');
  const [deliveryAddress, setDeliveryAddress] = useState('House 14, Senchi Street, Airport Residential Area');
  const [city, setCity] = useState('Accra');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<
    'MTN Mobile Money' | 'Telecel Cash' | 'AirtelTigo Money' | 'Credit / Debit Card' | 'Cash on Delivery'
  >('MTN Mobile Money');

  const [momoNumber, setMomoNumber] = useState('+233 24 555 1234');
  const [momoNetwork, setMomoNetwork] = useState('MTN');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder = placeOrder({
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
        city,
        paymentMethod,
      });

      setIsSubmitting(false);
      setActiveView('confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#111113] pb-36">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E6E6EA] py-4 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <button
            onClick={() => setActiveView('bag')}
            className="flex items-center gap-2 text-xs font-semibold text-[#3A3A3F] hover:text-[#111113] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </button>

          <span className="font-semibold text-xs tracking-[0.25em] text-[#111113] uppercase">
            TRACEY KQ · CHECKOUT
          </span>

          <div className="flex items-center gap-1 text-xs text-[#1F8A4C] font-semibold bg-[#E8F5EE] px-2.5 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure 256-Bit</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 pt-8 space-y-8">
        <form onSubmit={handlePlaceOrder} className="space-y-8">
          {/* 1. Guest / Contact Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E6EA] shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#111113] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg font-bold text-[#111113]">Recipient Contact</h2>
              </div>
              {!user.isLoggedIn && (
                <span className="text-xs text-[#6B73F0] font-medium">Guest Checkout</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#8A8A8F] block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-12 px-4 rounded-full bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-medium text-[#111113] outline-none focus:border-[#6B73F0]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8A8A8F] block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-full bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-medium text-[#111113] outline-none focus:border-[#6B73F0]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8A8A8F] block mb-1.5">
                  Phone (Ghana MoMo / Courier)
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full h-12 px-4 rounded-full bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-medium text-[#111113] outline-none focus:border-[#6B73F0]"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Address Card with Edit Option */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E6EA] shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#111113] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-lg font-bold text-[#111113]">Delivery Location</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingAddress(!isEditingAddress)}
                className="text-xs font-semibold text-[#6B73F0] hover:underline cursor-pointer"
              >
                {isEditingAddress ? 'Done Editing' : 'Edit Address'}
              </button>
            </div>

            {isEditingAddress ? (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#8A8A8F] block mb-1.5">
                      Street / Landmark / Digital Address (e.g. GA-183-9021)
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full h-12 px-4 rounded-full bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-medium text-[#111113] outline-none focus:border-[#6B73F0]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#8A8A8F] block mb-1.5">
                      City / Region
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-12 px-4 rounded-full bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-medium text-[#111113] outline-none focus:border-[#6B73F0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#8A8A8F] block mb-1.5">
                    Delivery Zone
                  </label>
                  <select
                    value={selectedDeliveryZone}
                    onChange={(e) => setSelectedDeliveryZone(e.target.value as any)}
                    className="w-full h-12 px-4 rounded-full bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-semibold text-[#111113] outline-none cursor-pointer"
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
              <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E6E6EA] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#111113] block">
                    {deliveryAddress}
                  </span>
                  <span className="text-xs text-[#8A8A8F]">
                    {city} · Zone: <strong className="text-[#111113]">{selectedDeliveryZone}</strong>
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#1F8A4C] bg-[#E8F5EE] px-3 py-1 rounded-full">
                  Confirmed
                </span>
              </div>
            )}

            {/* Delivery option cards: 88px high, half width, 2px ink border when selected */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8A8F] block">
                Delivery Dispatch Speed
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Standard Card */}
                <div
                  onClick={() => setSelectedDeliveryMethod('Standard Courier (2-3 Days)')}
                  className={`h-[88px] rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all ${
                    selectedDeliveryMethod === 'Standard Courier (2-3 Days)'
                      ? 'border-2 border-[#111113] bg-white shadow-sm'
                      : 'border border-[#E6E6EA] bg-[#F5F5F7] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111113]">
                      Standard Courier (2-3 Days)
                    </span>
                    <span className="text-xs font-semibold text-[#3A3A3F]">
                      GH₵ {deliveryFeeGhc}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8A8A8F]">
                    Dispatched with tracking SMS notification
                  </span>
                </div>

                {/* Express Same-Day Card */}
                <div
                  onClick={() => setSelectedDeliveryMethod('Express Same-Day Priority')}
                  className={`h-[88px] rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all ${
                    selectedDeliveryMethod === 'Express Same-Day Priority'
                      ? 'border-2 border-[#111113] bg-white shadow-sm'
                      : 'border border-[#E6E6EA] bg-[#F5F5F7] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111113] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#6B73F0]" />
                      <span>Express Same-Day Priority</span>
                    </span>
                    <span className="text-xs font-semibold text-[#111113]">
                      GH₵ {deliveryFeeGhc + 30}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8A8A8F]">
                    Delivered today by 6:00 PM via dedicated dispatch
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Payment Option Rows: 72px high, 24px radio */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E6EA] shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#111113] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <div>
                <h2 className="text-lg font-bold text-[#111113]">Ghana Payment Gateway</h2>
                <p className="text-xs text-[#8A8A8F]">
                  Supports all local mobile money networks and international Visa / Mastercard.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'MTN Mobile Money',
                  title: 'MTN Mobile Money (MoMo)',
                  subtitle: 'Instant prompt sent to your MTN phone',
                  icon: Smartphone,
                  badge: 'Instant Prompt',
                },
                {
                  id: 'Telecel Cash',
                  title: 'Telecel Cash (formerly Vodafone)',
                  subtitle: 'Direct voucher or wallet prompt',
                  icon: Smartphone,
                },
                {
                  id: 'AirtelTigo Money',
                  title: 'ATMoney / AirtelTigo',
                  subtitle: 'Instant mobile wallet payment',
                  icon: Smartphone,
                },
                {
                  id: 'Credit / Debit Card',
                  title: 'Credit / Debit Card (Visa, Mastercard)',
                  subtitle: 'International cards accepted',
                  icon: CreditCard,
                },
                {
                  id: 'Cash on Delivery',
                  title: 'Pay on Doorstep Delivery',
                  subtitle: 'Cash or MoMo to rider upon inspection',
                  icon: Truck,
                },
              ].map((method) => {
                const isSelected = paymentMethod === method.id;
                const Icon = method.icon;

                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`h-[72px] px-5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-2 border-[#111113] bg-white shadow-sm'
                        : 'border border-[#E6E6EA] bg-[#F5F5F7] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* 24px radio indicator */}
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? 'border-[#111113]' : 'border-[#C7C7CC]'
                        }`}
                      >
                        {isSelected && <div className="w-3 h-3 rounded-full bg-[#111113]" />}
                      </div>

                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-[#3A3A3F]" />
                        <div>
                          <span className="text-xs sm:text-sm font-semibold text-[#111113] block">
                            {method.title}
                          </span>
                          <span className="text-[11px] text-[#8A8A8F]">
                            {method.subtitle}
                          </span>
                        </div>
                      </div>
                    </div>

                    {method.badge && (
                      <span className="text-[10px] font-bold text-[#6B73F0] bg-[#ECEDFD] px-2.5 py-1 rounded-full hidden sm:block">
                        {method.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Money Prompt Preview */}
            {(paymentMethod === 'MTN Mobile Money' ||
              paymentMethod === 'Telecel Cash' ||
              paymentMethod === 'AirtelTigo Money') && (
              <div className="p-4 rounded-2xl bg-[#ECEDFD] border border-[#C9CCF5] text-xs space-y-2">
                <span className="font-semibold text-[#111113] block">
                  How Mobile Money Checkout Works:
                </span>
                <p className="text-[#3A3A3F]">
                  After tapping <strong>Place Order</strong>, you will receive an automatic prompt on <strong>{customerPhone}</strong> requesting approval for <strong>GH₵ {cartTotalGhc.toLocaleString()}</strong>.
                </p>
              </div>
            )}
          </div>

          {/* 4. Order Review Line Items */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E6EA] shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#111113]">Order Items ({cart.length})</h2>
            <div className="divide-y divide-[#E6E6EA]">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-14 h-16 object-cover rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#111113] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-[#8A8A8F]">
                      Size {item.selectedSize} · {item.selectedColorName} · Qty {item.quantity}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#111113]">
                    GH₵ {(item.product.priceGhc * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Total summary */}
            <div className="pt-3 border-t border-[#E6E6EA] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#3A3A3F]">
                <span>Items Subtotal</span>
                <span>GH₵ {cartSubtotalGhc.toLocaleString()}</span>
              </div>
              {discountAmountGhc > 0 && (
                <div className="flex justify-between text-[#1F8A4C]">
                  <span>Discount</span>
                  <span>- GH₵ {discountAmountGhc.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-[#3A3A3F]">
                <span>Delivery ({selectedDeliveryZone})</span>
                <span>GH₵ {deliveryFeeGhc.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#111113] pt-2 border-t border-[#E6E6EA]">
                <span>Total Due</span>
                <span>GH₵ {cartTotalGhc.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sticky Desktop / Mobile Bottom Bar: Total and 52px high, 180px wide "Place Order" button */}
          <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E6E6EA] py-3.5 px-6 shadow-lg">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#8A8A8F] block">Total to Pay</span>
                <span className="text-xl font-bold text-[#111113]">
                  GH₵ {cartTotalGhc.toLocaleString()}
                </span>
              </div>

              {/* 52px high, 180px wide button in sticky footer */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="h-[52px] w-[180px] rounded-full bg-[#111113] text-white text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-[#3A3A3F] transition-all disabled:opacity-50 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
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
