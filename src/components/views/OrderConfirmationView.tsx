/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  Check,
  ArrowRight,
  Truck,
  Sparkles,
  Phone,
  MessageCircle,
  Copy,
} from 'lucide-react';
import Button from '../ui/Button';

export default function OrderConfirmationView() {
  const { orders, setActiveView, user, loginUser } = useStore();

  const [copied, setCopied] = useState(false);
  const [accountPassword, setAccountPassword] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);

  // Latest order
  const latestOrder = orders[0] || {
    id: 'ord-01',
    orderNumber: 'TKQ-2026-0891',
    customerName: 'Ama Mensah',
    customerEmail: 'ama.mensah@prestige.gh',
    deliveryAddress: 'House 14, Senchi Street, Airport Residential Area',
    city: 'Accra',
    deliveryZone: 'Accra Metro',
    estimatedDelivery: 'Today by 5:00 PM',
    riderName: 'Kwesi Darko',
    riderPhone: '+233 50 123 4567',
    totalGhc: 18535,
    items: [],
    trackingTimeline: [
      { title: 'Order Confirmed', time: 'Just now', completed: true },
      { title: 'Garment Steamed & Inspected', time: 'In Progress', completed: true },
      { title: 'Dispatched with Courier', time: 'Pending', completed: false },
      { title: 'Delivered at Doorstep', time: 'Pending', completed: false },
    ],
  };

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(latestOrder.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(latestOrder.customerEmail, latestOrder.customerName);
    setAccountCreated(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#111113] pb-32 pt-8">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 space-y-8">
        {/* Success Banner Card */}
        <div className="bg-white rounded-[32px] p-8 sm:p-10 border border-[#E6E6EA] text-center shadow-lg space-y-6">
          {/* Animated check with accent-soft ring (#C9CCF5) */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-[#ECEDFD] animate-ping opacity-75" />
            <span className="absolute -inset-2 rounded-full border-4 border-[#C9CCF5] animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-[#1F8A4C] text-white flex items-center justify-center shadow-md">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest text-[#6B73F0] uppercase">
              ORDER CONFIRMED & RESERVED
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111113]">
              Medaase, {latestOrder.customerName}!
            </h1>
            <p className="text-xs sm:text-sm text-[#3A3A3F] max-w-md mx-auto">
              Your haute couture piece is currently undergoing final quality inspection and steam finishing in our Accra atelier.
            </p>
          </div>

          {/* Order Details Chip */}
          <div className="inline-flex items-center gap-3 bg-[#F5F5F7] px-4 py-2.5 rounded-full border border-[#E6E6EA]">
            <span className="text-xs text-[#8A8A8F]">Order Reference:</span>
            <span className="text-xs font-bold text-[#111113] font-mono">
              {latestOrder.orderNumber}
            </span>
            <button
              onClick={copyOrderNumber}
              className="text-[#6B73F0] hover:text-[#111113] transition-colors cursor-pointer"
              title="Copy Order ID"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            {copied && <span className="text-[10px] text-[#1F8A4C] font-semibold">Copied!</span>}
          </div>
        </div>

        {/* Dispatch & Delivery Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E6EA] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6E6EA]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-[#6B73F0]" />
              <div>
                <span className="text-xs font-bold text-[#111113] block">
                  Delivery to {latestOrder.city}
                </span>
                <span className="text-[11px] text-[#8A8A8F]">
                  Est. Arrival: <strong>{latestOrder.estimatedDelivery}</strong>
                </span>
              </div>
            </div>

            {latestOrder.riderName && (
              <div className="text-right">
                <span className="text-[11px] text-[#8A8A8F] block">Assigned Courier</span>
                <span className="text-xs font-semibold text-[#111113] flex items-center gap-1 justify-end">
                  <Phone className="w-3 h-3 text-[#1F8A4C]" />
                  <span>{latestOrder.riderName}</span>
                </span>
              </div>
            )}
          </div>

          {/* Tracking Timeline */}
          <div className="space-y-4 pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8A8F] block">
              Live Progress
            </span>
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E6E6EA]">
              {latestOrder.trackingTimeline.map((step, idx) => (
                <div key={idx} className="relative flex items-start justify-between text-xs">
                  <span
                    className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      step.completed
                        ? 'border-[#1F8A4C] bg-[#1F8A4C] text-white'
                        : 'border-[#C7C7CC] bg-white'
                    }`}
                  >
                    {step.completed && <Check className="w-2.5 h-2.5" />}
                  </span>
                  <div>
                    <span
                      className={`font-semibold block ${
                        step.completed ? 'text-[#111113]' : 'text-[#8A8A8F]'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8A8A8F] font-mono">{step.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ordered Pieces Thumbnails */}
        {latestOrder.items.length > 0 && (
          <div className="bg-white rounded-3xl p-6 border border-[#E6E6EA] shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A8A8F]">
              Pieces in this order
            </h3>
            <div className="divide-y divide-[#E6E6EA]">
              {latestOrder.items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center gap-3">
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
          </div>
        )}

        {/* Offer "Create account" on the confirmation page for guests per specification */}
        {!user.isLoggedIn && !accountCreated && (
          <div className="bg-[#ECEDFD] rounded-3xl p-6 sm:p-7 border border-[#C9CCF5] space-y-4">
            <div className="flex items-center gap-2 text-[#6B73F0]">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-sm font-bold text-[#111113]">
                Save Your Order & Earn 340 Style Points
              </h3>
            </div>
            <p className="text-xs text-[#3A3A3F]">
              Create an account with one click to track this shipment, save your measurements for future bespoke creations, and access exclusive salon viewings.
            </p>
            <form onSubmit={handleCreateAccount} className="flex flex-col sm:flex-row gap-2">
              <input
                type="password"
                required
                placeholder="Set a secure password..."
                value={accountPassword}
                onChange={(e) => setAccountPassword(e.target.value)}
                className="flex-1 h-11 px-4 rounded-full bg-white border border-[#C9CCF5] text-xs text-[#111113] outline-none"
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-full bg-[#111113] text-white text-xs font-semibold hover:bg-[#3A3A3F] transition-colors cursor-pointer"
              >
                Create Account
              </button>
            </form>
          </div>
        )}

        {accountCreated && (
          <div className="bg-[#E8F5EE] rounded-3xl p-4 border border-[#1F8A4C]/30 text-xs text-[#1F8A4C] font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Account created successfully! Your order has been linked to your profile.</span>
          </div>
        )}

        {/* Actions Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button
            variant="primary"
            onClick={() => {
              setActiveView('orders');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Track Order Live</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <a
            href={`https://wa.me/233208912340?text=Hello%20TIME%20fits%20Concierge%2C%20I%20am%20inquiring%20about%20my%20Order%20${latestOrder.orderNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 px-6 rounded-full bg-white border border-[#E6E6EA] text-xs font-semibold text-[#1E3A2E] flex items-center justify-center gap-2 hover:bg-[#F5F5F7] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
}
