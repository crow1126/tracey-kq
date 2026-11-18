'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product, Order, BespokeEnquiry } from '@/data/db-schema';
import {
  ShieldCheck,
  Package,
  ShoppingBag,
  Scissors,
  TrendingUp,
  AlertTriangle,
  Check,
  Printer,
  X,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import Badge from '../ui/Badge';

export default function AdminView() {
  const { products, orders, enquiries, updateOrderStatus } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'enquiries' | 'analytics'>('orders');
  const [selectedPackingSlipOrder, setSelectedPackingSlipOrder] = useState<Order | null>(null);

  // Analytics computations
  const totalRevenueGhc = orders.reduce((sum, o) => sum + o.totalGhc, 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const lowStockCount = products.filter((p) => p.stockStatus === 'low_stock').length;

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#111113] pb-32">
      {/* 1. Admin Header */}
      <section className="bg-[#111113] text-white py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#6B73F0] flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-widest uppercase">
                  TRACEY KUUKUA QUANSAH
                </span>
                <span className="bg-[#1F8A4C] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Live Operations
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                Atelier Administration & Backoffice
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-white/70">Currency:</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">
              GH₵ (Ghana Cedi)
            </span>
          </div>
        </div>
      </section>

      {/* 2. Quick KPIs Overview */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 -mt-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6E6EA] shadow-sm">
            <div className="flex items-center justify-between text-[#8A8A8F] mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Gross Revenue</span>
              <TrendingUp className="w-4 h-4 text-[#1F8A4C]" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-[#111113]">
              GH₵ {totalRevenueGhc.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#1F8A4C] block mt-1">↑ +24.8% vs last month</span>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6E6EA] shadow-sm">
            <div className="flex items-center justify-between text-[#8A8A8F] mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
              <ShoppingBag className="w-4 h-4 text-[#6B73F0]" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-[#111113]">
              {orders.length} orders
            </span>
            <span className="text-[11px] text-[#8A8A8F] block mt-1">{totalItemsSold} pieces fulfilled</span>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6E6EA] shadow-sm">
            <div className="flex items-center justify-between text-[#8A8A8F] mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Bespoke Inquiries</span>
              <Scissors className="w-4 h-4 text-[#FF2D8A]" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-[#111113]">
              {enquiries.length} clients
            </span>
            <span className="text-[11px] text-[#6B73F0] block mt-1">1 fitting scheduled this week</span>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6E6EA] shadow-sm">
            <div className="flex items-center justify-between text-[#8A8A8F] mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Low Stock Watch</span>
              <AlertTriangle className="w-4 h-4 text-[#F5A524]" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-[#111113]">
              {lowStockCount} items
            </span>
            <span className="text-[11px] text-[#F5A524] block mt-1">Requires Bonwire re-order</span>
          </div>
        </div>
      </section>

      {/* 3. Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-8">
        <div className="bg-white rounded-2xl p-1.5 border border-[#E6E6EA] flex space-x-1 overflow-x-auto no-scrollbar text-xs font-semibold">
          {[
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'inventory', label: `Inventory & Stock (${products.length})`, icon: Package },
            { id: 'enquiries', label: `Bespoke Enquiries (${enquiries.length})`, icon: Scissors },
            { id: 'analytics', label: 'Financial Analytics', icon: TrendingUp },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#111113] text-white shadow-sm'
                    : 'text-[#8A8A8F] hover:text-[#111113] hover:bg-[#F5F5F7]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Tab Content */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-6">
        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-[#E6E6EA] overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[#E6E6EA] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#111113]">Customer Orders & Logistics</h3>
                <p className="text-xs text-[#8A8A8F]">
                  Manage fulfillment status and print courier packing slips.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F5F7] border-b border-[#E6E6EA] text-[#8A8A8F] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Client</th>
                    <th className="py-3.5 px-4">Destination</th>
                    <th className="py-3.5 px-4">Items</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Payment</th>
                    <th className="py-3.5 px-4">Fulfillment Status</th>
                    <th className="py-3.5 px-4 text-right">Packing Slip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E6EA]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#F5F5F7] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#111113]">
                        {ord.orderNumber}
                        <span className="block text-[10px] text-[#8A8A8F] font-sans font-normal">
                          {ord.date}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#111113] block">
                          {ord.customerName}
                        </span>
                        <span className="text-[11px] text-[#8A8A8F]">{ord.customerPhone}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-[#111113] block">{ord.city}</span>
                        <span className="text-[10px] text-[#8A8A8F]">{ord.deliveryZone}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#111113]">
                          {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#111113]">
                        GH₵ {ord.totalGhc.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[11px] font-medium text-[#3A3A3F] block">
                          {ord.paymentMethod}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                            ord.paymentStatus === 'Paid'
                              ? 'bg-[#E8F5EE] text-[#1F8A4C]'
                              : 'bg-[#FDF4E7] text-[#F5A524]'
                          }`}
                        >
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#EDEDF0] text-[#111113] border-none outline-none cursor-pointer"
                        >
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Returned">Returned</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedPackingSlipOrder(ord)}
                          className="p-2 rounded-lg bg-[#EDEDF0] text-[#111113] hover:bg-[#E6E6EA] transition-colors cursor-pointer"
                          title="Print Packing Slip"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-[#E6E6EA] overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[#E6E6EA] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#111113]">
                  Product Inventory & Silhouette Registry
                </h3>
                <p className="text-xs text-[#8A8A8F]">
                  Real-time inventory levels across ready-to-wear and couture archives.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F5F7] border-b border-[#E6E6EA] text-[#8A8A8F] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Garment</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Fabric</th>
                    <th className="py-3.5 px-4">Price (GH₵)</th>
                    <th className="py-3.5 px-4">Sizes</th>
                    <th className="py-3.5 px-4">Stock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E6EA]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F5F5F7] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt=""
                            className="w-10 h-12 object-cover rounded-lg bg-[#EDEDF0]"
                          />
                          <div>
                            <span className="font-semibold text-[#111113] block">{p.name}</span>
                            <span className="text-[10px] text-[#8A8A8F]">ID: {p.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#3A3A3F]">{p.category}</td>
                      <td className="py-3 px-4 text-[#8A8A8F] max-w-[150px] truncate">{p.fabric}</td>
                      <td className="py-3 px-4 font-bold text-[#111113]">
                        GH₵ {p.priceGhc.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-[#3A3A3F]">
                        {p.sizes.join(', ')}
                      </td>
                      <td className="py-3 px-4">
                        {p.stockStatus === 'in_stock' && (
                          <span className="text-[10px] font-bold text-[#1F8A4C] bg-[#E8F5EE] px-2.5 py-1 rounded-full">
                            In Stock
                          </span>
                        )}
                        {p.stockStatus === 'low_stock' && (
                          <span className="text-[10px] font-bold text-[#F5A524] bg-[#FDF4E7] px-2.5 py-1 rounded-full">
                            Low Stock (2 Left)
                          </span>
                        )}
                        {p.stockStatus === 'out_of_stock' && (
                          <span className="text-[10px] font-bold text-[#E5384F] bg-[#FDECEE] px-2.5 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BESPOKE ENQUIRIES TAB */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl border border-[#E6E6EA] overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[#E6E6EA]">
              <h3 className="text-base font-bold text-[#111113]">
                Custom Tailoring & Bespoke Inquiries
              </h3>
              <p className="text-xs text-[#8A8A8F]">
                Private appointments for gala commissions, bridal parties, and state delegations.
              </p>
            </div>

            <div className="divide-y divide-[#E6E6EA]">
              {enquiries.map((enq) => (
                <div key={enq.id} className="p-5 space-y-2 hover:bg-[#F5F5F7] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#111113]">{enq.name}</span>
                      <span className="text-[10px] font-semibold text-[#6B73F0] bg-[#ECEDFD] px-2.5 py-0.5 rounded-full">
                        {enq.serviceType}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#1F8A4C] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full">
                      {enq.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#3A3A3F] bg-[#F5F5F7] p-3 rounded-xl border border-[#E6E6EA]">
                    "{enq.message}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-xs text-[#8A8A8F] pt-1">
                    <span>
                      Contact: <strong>{enq.phone}</strong> · {enq.email}
                    </span>
                    <span>
                      Target Budget: <strong>{enq.budgetGhc}</strong> · Target Date: <strong>{enq.preferredDate}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FINANCIAL ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[#E6E6EA] shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#111113] uppercase tracking-wider">
                Ghana Payment Network Breakdown
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'MTN Mobile Money', percent: 62, volume: 'GH₵ 38,400' },
                  { name: 'Telecel Cash', percent: 18, volume: 'GH₵ 11,200' },
                  { name: 'Credit / Debit Cards', percent: 14, volume: 'GH₵ 8,700' },
                  { name: 'Pay on Doorstep Delivery', percent: 6, volume: 'GH₵ 3,700' },
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{item.name}</span>
                      <span>{item.volume} ({item.percent}%)</span>
                    </div>
                    <div className="w-full bg-[#EDEDF0] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#111113] h-full rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E6E6EA] shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#111113] uppercase tracking-wider">
                Top Delivery Destinations
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-[#E6E6EA]">
                  <span>Accra Metro (Airport, Cantonments, East Legon)</span>
                  <span className="font-bold text-[#111113]">58% of orders</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E6E6EA]">
                  <span>Tema & Spintex</span>
                  <span className="font-bold text-[#111113]">22% of orders</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E6E6EA]">
                  <span>Kumasi (Ahodwo, Danyame)</span>
                  <span className="font-bold text-[#111113]">12% of orders</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E6E6EA]">
                  <span>Takoradi & Nationwide Express</span>
                  <span className="font-bold text-[#111113]">8% of orders</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 5. Printable Packing Slip Modal */}
      {selectedPackingSlipOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-[#111113] relative border border-[#E6E6EA] shadow-2xl">
            <button
              onClick={() => setSelectedPackingSlipOrder(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#EDEDF0] hover:bg-[#E6E6EA]"
            >
              <X className="w-4 h-4 text-[#111113]" />
            </button>

            <div className="border-b border-[#E6E6EA] pb-4 space-y-1">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#8A8A8F] uppercase">
                TRACEY KUUKUA QUANSAH ATELIER · ACCRA
              </span>
              <h2 className="text-xl font-bold">Official Packing & Delivery Slip</h2>
              <p className="text-xs text-[#8A8A8F]">
                Order Reference: <strong>{selectedPackingSlipOrder.orderNumber}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-[#8A8A8F] block">Recipient</span>
                <span className="font-bold text-[#111113]">{selectedPackingSlipOrder.customerName}</span>
                <p className="text-[#3A3A3F]">{selectedPackingSlipOrder.customerPhone}</p>
              </div>

              <div>
                <span className="font-semibold text-[#8A8A8F] block">Delivery Address</span>
                <p className="text-[#111113] font-medium">{selectedPackingSlipOrder.deliveryAddress}</p>
                <p className="text-[#8A8A8F]">{selectedPackingSlipOrder.city} ({selectedPackingSlipOrder.deliveryZone})</p>
              </div>
            </div>

            <div className="border border-[#E6E6EA] rounded-2xl p-4 text-xs space-y-2">
              <span className="font-bold uppercase tracking-wider text-[#8A8A8F] block">
                Inspected Garments
              </span>
              {selectedPackingSlipOrder.items.map((i) => (
                <div key={i.id} className="flex justify-between items-center py-1 border-b border-[#E6E6EA] last:border-none">
                  <div>
                    <span className="font-semibold text-[#111113]">{i.productName}</span>
                    <span className="text-[10px] text-[#8A8A8F] block">
                      Size: {i.size} | Color: {i.colorName} | Qty: {i.quantity}
                    </span>
                  </div>
                  <span className="font-bold">GH₵ {i.priceGhc.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-[#8A8A8F]">Total Value (Taxes Included):</span>
              <span className="text-base font-bold text-[#111113]">
                GH₵ {selectedPackingSlipOrder.totalGhc.toLocaleString()}
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 h-12 rounded-full bg-[#111113] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#3A3A3F]"
              >
                <Printer className="w-4 h-4" />
                <span>Print Packing Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
