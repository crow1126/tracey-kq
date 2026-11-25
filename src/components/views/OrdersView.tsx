'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import {
  Truck,
  CheckCircle2,
  MapPin,
  Phone,
  MessageCircle,
  Copy,
  ChevronRight,
  Search,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { Order } from '@/data/db-schema';

export default function OrdersView() {
  const { orders, setActiveView, user, openAuthModal } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (orderNumber: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(orderNumber);
      setCopiedId(orderNumber);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Filter orders by search query (order number, customer name, phone, or item name)
  const filteredOrders = orders.filter((ord) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      ord.orderNumber.toLowerCase().includes(q) ||
      ord.customerName.toLowerCase().includes(q) ||
      ord.customerPhone.toLowerCase().includes(q) ||
      ord.city.toLowerCase().includes(q) ||
      ord.items.some((item) => item.productName.toLowerCase().includes(q))
    );
  });

  const activeOrder = selectedOrder || filteredOrders[0] || null;

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#0F1F17] pb-32">
      {/* 1. Header Section */}
      <section className="bg-white border-b border-[#E6E6EA] pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-[0.22em] text-[#1E3A2E] bg-[#F4F1EA] px-2.5 py-1 rounded-full uppercase border border-[#C7CBB8]/60">
                  ATELIER CONCIERGE & LOGISTICS
                </span>
                <span className="text-[11px] text-[#6B7F67] font-medium">
                  Real-time Ghana Courier Dispatch
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3A2E]">
                Track Your Garments & Orders
              </h1>
              <p className="text-xs sm:text-sm text-[#3D4337] mt-1 max-w-xl">
                Follow your haute couture pieces from final steam finishing and Memory Tag encoding at our Accra workshop to your doorstep.
              </p>
            </div>

            {/* Quick search input */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                placeholder="Search by Order # or Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-full bg-[#F4F1EA] border border-[#C7CBB8]/60 text-xs text-[#0F1F17] placeholder:text-[#6B7F67] outline-none focus:border-[#1E3A2E] transition-all"
              />
              <Search className="w-4 h-4 text-[#6B7F67] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#6B7F67] hover:text-[#0F1F17]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick stats ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#E6E6EA]">
            <div className="bg-[#F4F1EA] p-3 rounded-2xl border border-[#C7CBB8]/40">
              <span className="text-[10px] text-[#6B7F67] uppercase font-bold block">Total Orders</span>
              <span className="text-lg font-bold text-[#1E3A2E]">{orders.length}</span>
            </div>
            <div className="bg-[#F4F1EA] p-3 rounded-2xl border border-[#C7CBB8]/40">
              <span className="text-[10px] text-[#6B7F67] uppercase font-bold block">In Transit</span>
              <span className="text-lg font-bold text-[#1E3A2E]">
                {orders.filter((o) => o.status === 'Packed' || o.status === 'Shipped').length}
              </span>
            </div>
            <div className="bg-[#F4F1EA] p-3 rounded-2xl border border-[#C7CBB8]/40">
              <span className="text-[10px] text-[#6B7F67] uppercase font-bold block">Delivered</span>
              <span className="text-lg font-bold text-[#1E3A2E]">
                {orders.filter((o) => o.status === 'Delivered').length}
              </span>
            </div>
            <div className="bg-[#F4F1EA] p-3 rounded-2xl border border-[#C7CBB8]/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#6B7F67] uppercase font-bold block">Atelier Support</span>
                <span className="text-xs font-bold text-[#1E3A2E]">Active 24/7</span>
              </div>
              <a
                href="https://wa.me/233208912340"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-[#1E3A2E] text-[#C7CBB8] flex items-center justify-center hover:bg-[#0F1F17]"
                title="WhatsApp Concierge"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Tracking Content */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E6E6EA] max-w-md mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#F4F1EA] flex items-center justify-center mx-auto text-[#1E3A2E] border border-[#C7CBB8]/60">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1E3A2E]">No Active Orders Yet</h3>
              <p className="text-xs text-[#6B7F67]">
                Your bespoke reservations and garment orders will appear here for live courier tracking.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveView('shop')}
                className="h-10 px-5 rounded-full bg-[#1E3A2E] text-[#C7CBB8] text-xs font-bold uppercase tracking-wider hover:bg-[#0F1F17] transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {!user.isLoggedIn && (
                <button
                  type="button"
                  onClick={() => openAuthModal('login', 'orders')}
                  className="h-10 px-5 rounded-full bg-white border border-[#1E3A2E] text-[#1E3A2E] text-xs font-bold hover:bg-[#F4F1EA] transition-all cursor-pointer shadow-sm"
                >
                  Sign In to Atelier
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Order List (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#1E3A2E]">
                  Your Orders ({filteredOrders.length})
                </h2>
                <span className="text-[11px] text-[#6B7F67]">
                  Tap to track live
                </span>
              </div>

              <div className="space-y-3.5">
                {filteredOrders.map((ord) => {
                  const isSelected = activeOrder?.id === ord.id;

                  return (
                    <div
                      key={ord.id}
                      onClick={() => setSelectedOrder(ord)}
                      className={`p-5 rounded-3xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-white border-2 border-[#1E3A2E] shadow-md ring-2 ring-[#1E3A2E]/10'
                          : 'bg-white border-[#E6E6EA] hover:border-[#C7CBB8] shadow-xs'
                      }`}
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#F4F1EA]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#1E3A2E]">
                              {ord.orderNumber}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(ord.orderNumber);
                              }}
                              className="text-[#6B7F67] hover:text-[#1E3A2E] p-0.5"
                              title="Copy order number"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            {copiedId === ord.orderNumber && (
                              <span className="text-[9px] font-bold text-[#1E3A2E] bg-[#F4F1EA] px-1.5 py-0.5 rounded">
                                Copied!
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#6B7F67] block mt-0.5">
                            Placed on {ord.date}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            ord.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-[#1E3A2E] text-[#C7CBB8]'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>

                      {/* Items preview */}
                      <div className="py-3 flex items-center gap-3">
                        <div className="flex -space-x-2 overflow-hidden">
                          {ord.items.slice(0, 3).map((item, idx) => (
                            <div
                              key={item.id || idx}
                              className="relative w-11 h-12 rounded-xl overflow-hidden border-2 border-white shadow-xs bg-[#F4F1EA]"
                            >
                              <Image
                                src={item.productImage}
                                alt={item.productName}
                                fill
                                className="object-cover"
                                sizes="44px"
                                unoptimized
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#1E3A2E] truncate">
                            {ord.items.map((i) => i.productName).join(', ')}
                          </p>
                          <span className="text-[11px] text-[#6B7F67]">
                            {ord.items.length} {ord.items.length === 1 ? 'Garment' : 'Garments'} · {ord.deliveryZone}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-[#1E3A2E] block">
                            GH₵ {ord.totalGhc.toLocaleString()}
                          </span>
                          <span className="text-[9px] text-[#6B7F67]">
                            {ord.paymentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Footer action */}
                      <div className="pt-2 flex items-center justify-between text-[11px] font-semibold text-[#1E3A2E] border-t border-[#F4F1EA]">
                        <span className="flex items-center gap-1.5 text-[#3D4337]">
                          <Truck className="w-3.5 h-3.5 text-[#1E3A2E]" />
                          <span>Est: {ord.estimatedDelivery}</span>
                        </span>
                        <span className="flex items-center gap-1 text-[#1E3A2E]">
                          <span>Track Live</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Live Tracking Detail (7 cols) */}
            {activeOrder && (
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E6EA] shadow-sm space-y-6 sticky top-24">
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E6E6EA]">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg font-serif font-bold text-[#1E3A2E]">
                        Order {activeOrder.orderNumber}
                      </h3>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#1E3A2E] text-[#C7CBB8] uppercase tracking-wider">
                        {activeOrder.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7F67] mt-0.5">
                      Placed on {activeOrder.date} · Payment via {activeOrder.paymentMethod}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(activeOrder.orderNumber)}
                      className="h-9 px-3.5 rounded-full bg-[#F4F1EA] text-[#1E3A2E] text-xs font-semibold flex items-center gap-1.5 border border-[#C7CBB8]/60 hover:bg-[#EAE6DD] transition-all cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === activeOrder.orderNumber ? 'Copied!' : 'Copy Order ID'}</span>
                    </button>
                  </div>
                </div>

                {/* Live Status Progress Bar */}
                <div className="bg-[#F4F1EA] p-4 sm:p-5 rounded-2xl border border-[#C7CBB8]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-[#1E3A2E] uppercase tracking-wider">
                        Live Tracking Dispatch
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#1E3A2E]">
                      {activeOrder.estimatedDelivery}
                    </span>
                  </div>

                  {/* Visual Step Timeline */}
                  <div className="pt-2 space-y-4">
                    {[
                      {
                        title: 'Order Received & Verified',
                        desc: 'Garment reservation confirmed and bespoke measurements checked',
                        time: 'Completed',
                        done: true,
                        icon: CheckCircle2,
                      },
                      {
                        title: 'Atelier Tailoring & Quality Finishing',
                        desc: 'Final steam finishing and hand stitching in Accra workshop',
                        time: 'Completed',
                        done: true,
                        icon: Sparkles,
                      },
                      {
                        title: 'Memory Tag & Authenticity Encoded',
                        desc: 'Digital provenance tag attached with garment story',
                        time: 'Completed',
                        done: true,
                        icon: ShieldCheck,
                      },
                      {
                        title: 'Handed to Dedicated Courier Rider',
                        desc: activeOrder.riderName
                          ? `Assigned to ${activeOrder.riderName} for prompt delivery`
                          : 'Rider dispatch pending route allocation',
                        time: activeOrder.status === 'Delivered' ? 'Completed' : 'In Transit',
                        done: true,
                        active: activeOrder.status !== 'Delivered',
                        icon: Truck,
                      },
                      {
                        title: 'Doorstep Delivery & Client Signature',
                        desc: `Dispatched to ${activeOrder.deliveryAddress}, ${activeOrder.city}`,
                        time: activeOrder.status === 'Delivered' ? 'Delivered' : 'Scheduled Today',
                        done: activeOrder.status === 'Delivered',
                        icon: MapPin,
                      },
                    ].map((step, idx, arr) => {
                      const Icon = step.icon;

                      return (
                        <div key={idx} className="relative flex items-start gap-3.5">
                          {/* Connecting line */}
                          {idx !== arr.length - 1 && (
                            <span
                              className={`absolute left-[13px] top-[26px] bottom-[-16px] w-[2px] ${
                                step.done ? 'bg-[#1E3A2E]' : 'bg-[#C7CBB8]/60'
                              }`}
                            />
                          )}

                          <div
                            className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                              step.done
                                ? 'bg-[#1E3A2E] text-[#C7CBB8] shadow-xs'
                                : 'bg-white border-2 border-[#C7CBB8] text-[#6B7F67]'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>

                          <div className="flex-1 pt-0.5">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-[#1E3A2E]">{step.title}</h4>
                              <span
                                className={`text-[10px] font-semibold ${
                                  step.time === 'Completed'
                                    ? 'text-emerald-700'
                                    : step.active
                                    ? 'text-[#1E3A2E] font-bold animate-pulse'
                                    : 'text-[#6B7F67]'
                                }`}
                              >
                                {step.time}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#6B7F67] leading-relaxed mt-0.5">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Courier & Dispatch Rider Card */}
                {activeOrder.riderName && (
                  <div className="p-4 rounded-2xl bg-white border border-[#E6E6EA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-[#1E3A2E] text-[#C7CBB8] font-bold flex items-center justify-center text-sm shadow-sm">
                        {activeOrder.riderName.charAt(0)}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#6B7F67] uppercase tracking-wider block">
                          Assigned Dispatch Courier
                        </span>
                        <h4 className="text-xs font-bold text-[#1E3A2E]">
                          {activeOrder.riderName}
                        </h4>
                        <span className="text-[11px] text-[#3D4337]">
                          Accra Express Priority Route
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${activeOrder.riderPhone || '+233208912340'}`}
                        className="h-9 px-3.5 rounded-full bg-[#1E3A2E] text-[#C7CBB8] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#0F1F17] transition-all cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Rider</span>
                      </a>
                      <a
                        href="https://wa.me/233208912340"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-9 px-3.5 rounded-full bg-[#F4F1EA] text-[#1E3A2E] text-xs font-semibold border border-[#C7CBB8]/60 flex items-center gap-1.5 hover:bg-[#EAE6DD] transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Garments in this Order */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3A2E]">
                    Garments in this Package ({activeOrder.items.length})
                  </h4>

                  <div className="divide-y divide-[#E6E6EA] border border-[#E6E6EA] rounded-2xl p-4 bg-white">
                    {activeOrder.items.map((item) => (
                      <div key={item.id} className="py-2.5 flex items-center justify-between text-xs first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-14 shrink-0 overflow-hidden rounded-xl border border-[#E6E6EA]">
                            <Image
                              src={item.productImage}
                              alt={item.productName}
                              fill
                              className="object-cover"
                              sizes="48px"
                              unoptimized
                            />
                          </div>
                          <div>
                            <h5 className="font-semibold text-[#1E3A2E]">{item.productName}</h5>
                            <span className="text-[11px] text-[#6B7F67]">
                              Size: {item.size} · Color: {item.colorName} · Qty: {item.quantity}
                            </span>
                          </div>
                        </div>

                        <span className="font-bold text-[#1E3A2E]">
                          GH₵ {(item.priceGhc * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}

                    {/* Order summary breakdown */}
                    <div className="pt-3 mt-3 border-t border-[#E6E6EA] space-y-1.5 text-xs">
                      <div className="flex justify-between text-[#6B7F67]">
                        <span>Delivery Fee ({activeOrder.deliveryZone})</span>
                        <span>GH₵ {activeOrder.deliveryFeeGhc || 35}</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm text-[#1E3A2E] pt-1">
                        <span>Total Paid</span>
                        <span>GH₵ {activeOrder.totalGhc.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Destination Address */}
                <div className="p-4 rounded-2xl bg-[#F4F1EA] border border-[#C7CBB8]/40 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#1E3A2E] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-[#1E3A2E] block">
                      Delivery Address:
                    </span>
                    <p className="text-[#3D4337] mt-0.5">
                      {activeOrder.customerName} · {activeOrder.customerPhone}
                    </p>
                    <p className="text-[#3D4337]">
                      {activeOrder.deliveryAddress}, {activeOrder.city} ({activeOrder.deliveryZone})
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
