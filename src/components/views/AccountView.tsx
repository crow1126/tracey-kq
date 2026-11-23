'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  User,
  ShoppingBag,
  Heart,
  Award,
  MapPin,
  CreditCard,
  Gift,
  LogOut,
  ChevronRight,
  Truck,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Check,
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function AccountView() {
  const { user, orders, wishlist, logoutUser, setActiveView, setIsAuthModalOpen } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'points' | 'concierge'>('orders');
  const [giftCardCode, setGiftCardCode] = useState('');
  const [giftCardFeedback, setGiftCardFeedback] = useState<string | null>(null);

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] text-[#111113] pb-32 pt-16">
        <div className="max-w-md mx-auto px-5 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#EDEDF0] flex items-center justify-center mx-auto text-[#111113]">
            <User className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#111113]">Patron Portal</h1>
            <p className="text-xs text-[#8A8A8F]">
              Sign in to view your order history, tracked parcels, saved atelier measurements, and loyalty style points.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full"
          >
            Sign In / Register
          </Button>
        </div>
      </div>
    );
  }

  const handleRedeemGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftCardCode.trim()) return;
    setGiftCardFeedback('GH₵ 250 Gift Voucher successfully credited to your account!');
    setGiftCardCode('');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#111113] pb-32">
      {/* 1. Patron Profile Header */}
      <section className="bg-white border-b border-[#E6E6EA] pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Avatar Initial: 56x56 */}
              <div className="w-16 h-16 rounded-full bg-[#111113] text-white text-xl font-bold flex items-center justify-center shadow-md">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#111113]">{user.name}</h1>
                  <span className="text-[10px] font-bold text-[#6B73F0] bg-[#ECEDFD] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {user.tier}
                  </span>
                </div>
                <p className="text-xs text-[#8A8A8F]">{user.email} · {user.phone}</p>
              </div>
            </div>

            <button
              onClick={logoutUser}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A8A8F] hover:text-[#E5384F] transition-colors self-start sm:self-auto"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8">
            <div
              onClick={() => setActiveTab('orders')}
              className="bg-[#F5F5F7] rounded-2xl p-4 text-center cursor-pointer hover:bg-[#EDEDF0] transition-colors"
            >
              <span className="text-xl sm:text-2xl font-bold text-[#111113] block">
                {orders.length}
              </span>
              <span className="text-[11px] text-[#8A8A8F]">Active Orders</span>
            </div>

            <div
              onClick={() => setActiveView('saved')}
              className="bg-[#F5F5F7] rounded-2xl p-4 text-center cursor-pointer hover:bg-[#EDEDF0] transition-colors"
            >
              <span className="text-xl sm:text-2xl font-bold text-[#111113] block">
                {wishlist.length}
              </span>
              <span className="text-[11px] text-[#8A8A8F]">Saved Pieces</span>
            </div>

            <div
              onClick={() => setActiveTab('points')}
              className="bg-[#F5F5F7] rounded-2xl p-4 text-center cursor-pointer hover:bg-[#EDEDF0] transition-colors"
            >
              <span className="text-xl sm:text-2xl font-bold text-[#6B73F0] block">
                {user.loyaltyPoints}
              </span>
              <span className="text-[11px] text-[#8A8A8F]">Style Points</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Navigation Tabs */}
      <section className="bg-white border-b border-[#E6E6EA]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex space-x-6 overflow-x-auto no-scrollbar text-xs font-semibold">
          {[
            { id: 'orders', label: 'Orders & Shipments', icon: ShoppingBag },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'points', label: 'Points & Vouchers', icon: Gift },
            { id: 'concierge', label: 'VIP Concierge', icon: MessageCircle },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-[#111113] text-[#111113]'
                    : 'border-transparent text-[#8A8A8F] hover:text-[#111113]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Tab Content */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">
        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-base font-bold text-[#111113]">Order History ({orders.length})</h2>
              <button
                onClick={() => {
                  setActiveView('orders');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="h-9 px-4 rounded-full bg-[#1E3A2E] text-[#C7CBB8] text-xs font-semibold flex items-center gap-2 hover:bg-[#0F1F17] transition-all cursor-pointer shadow-sm self-start sm:self-auto"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Launch Live Order Tracker &rarr;</span>
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-[#E6E6EA]">
                <ShoppingBag className="w-10 h-10 text-[#8A8A8F] mx-auto mb-3" />
                <p className="text-xs text-[#8A8A8F]">You have no previous orders.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-3xl p-6 border border-[#E6E6EA] shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E6E6EA]">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#111113]">
                            {ord.orderNumber}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              ord.status === 'Delivered'
                                ? 'bg-[#E8F5EE] text-[#1F8A4C]'
                                : 'bg-[#ECEDFD] text-[#6B73F0]'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#8A8A8F]">
                          Placed on {ord.date} · Delivery to {ord.city} ({ord.deliveryZone})
                        </span>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-sm font-bold text-[#111113] block">
                          GH₵ {ord.totalGhc.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#8A8A8F]">
                          Payment: {ord.paymentMethod} ({ord.paymentStatus})
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="divide-y divide-[#E6E6EA]">
                      {ord.items.map((item) => (
                        <div key={item.id} className="py-2 flex items-center gap-3">
                          <img
                            src={item.productImage}
                            alt=""
                            className="w-12 h-14 object-cover rounded-xl"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-semibold text-[#111113] block truncate">
                              {item.productName}
                            </span>
                            <span className="text-[11px] text-[#8A8A8F]">
                              Size {item.size} · {item.colorName} · Qty {item.quantity}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-[#111113]">
                            GH₵ {item.priceGhc.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Courier rider status & track live button */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-[#F5F5F7] p-3 rounded-2xl">
                      <div className="flex items-center gap-2 text-[#3A3A3F]">
                        <Truck className="w-4 h-4 text-[#1E3A2E]" />
                        <span>
                          {ord.riderName ? (
                            <>Courier: <strong>{ord.riderName}</strong> ({ord.riderPhone})</>
                          ) : (
                            <>Status: <strong>{ord.status}</strong></>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-[#1E3A2E] font-semibold">
                          {ord.estimatedDelivery}
                        </span>
                        <button
                          onClick={() => {
                            setActiveView('orders');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3 py-1 rounded-full bg-[#1E3A2E] text-[#C7CBB8] text-[10px] font-bold uppercase tracking-wider hover:bg-[#0F1F17] transition-all cursor-pointer"
                        >
                          Track Live &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#111113]">Saved Addresses</h2>
              <button className="text-xs font-semibold text-[#6B73F0] hover:underline">
                + Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white rounded-3xl p-6 border border-[#E6E6EA] shadow-sm space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#111113]">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold text-[#1F8A4C] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#3A3A3F]">{addr.address}</p>
                  <p className="text-xs text-[#8A8A8F]">{addr.city}, Ghana</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Points & Vouchers */}
        {activeTab === 'points' && (
          <div className="max-w-xl space-y-6">
            <div className="bg-[#ECEDFD] rounded-3xl p-6 sm:p-7 border border-[#C9CCF5] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B73F0]">
                  Patron Style Rewards
                </span>
                <span className="text-2xl font-bold text-[#111113]">
                  {user.loyaltyPoints} Points
                </span>
              </div>
              <p className="text-xs text-[#3A3A3F]">
                Every GH₵ 100 spent in our boutique or bespoke salon earns 10 Style Points. Redeemable for voucher credits and bespoke invitations.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E6E6EA] shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#111113]">Redeem Voucher or Gift Card</h3>
              <form onSubmit={handleRedeemGiftCard} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter gift card or voucher code..."
                  value={giftCardCode}
                  onChange={(e) => setGiftCardCode(e.target.value)}
                  className="flex-1 h-11 px-4 rounded-full bg-[#F5F5F7] border border-[#E6E6EA] text-xs uppercase tracking-wider outline-none"
                />
                <button
                  type="submit"
                  className="h-11 px-6 rounded-full bg-[#111113] text-white text-xs font-semibold hover:bg-[#3A3A3F]"
                >
                  Redeem
                </button>
              </form>
              {giftCardFeedback && (
                <div className="p-3 rounded-2xl bg-[#E8F5EE] text-xs font-semibold text-[#1F8A4C] flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{giftCardFeedback}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Concierge */}
        {activeTab === 'concierge' && (
          <div className="max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E6EA] shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E8F5EE] text-[#1F8A4C] flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#111113]">Private Atelier Concierge</h3>
                <p className="text-xs text-[#8A8A8F]">Direct line to Tracey Kuukua Quansah's styling team</p>
              </div>
            </div>

            <p className="text-xs text-[#3A3A3F] leading-relaxed">
              As a {user.tier} patron, you receive priority scheduling for bespoke appointments, custom fabric sourcing directly from Bonwire, and same-day fitting delivery across Accra.
            </p>

            <a
              href="https://wa.me/233208912340?text=Hello%20Tracey%20KQ%20VIP%20Concierge%2C%20I%20am%20a%20registered%20Patron%20and%20would%20like%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-[#1F8A4C] text-white text-xs font-semibold shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp VIP Desk</span>
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
