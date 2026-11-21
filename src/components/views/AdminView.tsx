/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product, Order, JournalArticle, SiteContent } from '@/data/db-schema';
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
  Plus,
  Pencil,
  Trash2,
  Sliders,
  BookOpen,
  RotateCcw,
  Eye,
  Save,
  Truck,
  Phone,
  Clock,
} from 'lucide-react';
import ImageUploader from '../ui/ImageUploader';

const GHANA_COURIERS = [
  { id: 'atelier', name: 'Atelier Dedicated Chauffeur (Kojo Mensah)', phone: '+233 24 999 1122', tag: 'White-Glove' },
  { id: 'fez', name: 'Fez Delivery Ghana', phone: '+233 55 123 4567', tag: 'Accra / Kumasi Same-Day' },
  { id: 'hubtel', name: 'Hubtel Logistics', phone: '+233 30 700 0577', tag: 'On-Demand Dispatch' },
  { id: 'speedaf', name: 'Speedaf Express Ghana', phone: '+233 30 290 8588', tag: 'Nationwide Express' },
  { id: 'yango', name: 'Yango Delivery Ghana', phone: '+233 50 000 8899', tag: 'Motorbike Dispatch' },
  { id: 'bolt', name: 'Bolt Send Ghana', phone: '+233 50 111 2233', tag: 'City Express' },
  { id: 'ems', name: 'Ghana Post EMS', phone: '+233 30 266 8138', tag: 'Postal Nationwide' },
  { id: 'dhl', name: 'DHL Express Ghana', phone: '+233 30 221 3090', tag: 'International' },
];

export default function AdminView() {
  const {
    products,
    categories,
    articles,
    siteContent,
    orders,
    enquiries,
    updateOrderStatus,
    updateOrderTracking,
    addProduct,
    updateProduct,
    deleteProduct,
    updateSiteContent,
    addArticle,
    updateArticle,
    deleteArticle,
    resetToDefaultData,
    setActiveView,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'inventory' | 'content' | 'journal' | 'orders' | 'enquiries' | 'analytics'
  >('inventory');

  // Selected order for printable packing slip
  const [selectedPackingSlipOrder, setSelectedPackingSlipOrder] = useState<Order | null>(null);

  // Selected order for Ghana Courier & Live Tracking Modal
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [selectedCourierPartner, setSelectedCourierPartner] = useState('atelier');
  const [riderInputName, setRiderInputName] = useState('');
  const [riderInputPhone, setRiderInputPhone] = useState('');

  // Product Add / Edit Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    subtitle: '',
    category: 'Dresses',
    categoryId: 'cat-dresses',
    priceGhc: 8500,
    originalPriceGhc: 0,
    fabric: 'Bonwire Hand-Woven Silk',
    craftsmanship: 'Hand-loomed in the Ashanti region of Bonwire by hereditary master weavers.',
    description: 'An architectural silhouette sculpted with traditional Ghanaian textiles and fluid modern tailoring.',
    careInstructions: 'Dry clean only. Store in breathable canvas garment bag.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
    stockStatus: 'in_stock' as 'in_stock' | 'low_stock' | 'out_of_stock',
    sizes: 'XS, S, M, L, XL',
    isNew: true,
    isTrending: true,
    isSpotlight: false,
  });

  // Product delete confirmation modal
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Site Content Editor state
  const [contentForm, setContentForm] = useState<SiteContent>(siteContent);
  const [contentSaved, setContentSaved] = useState(false);

  // Journal Add / Edit Modal state
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Styling Guide' as 'Styling Guide' | 'Behind The Scenes' | 'Press' | 'Heritage',
    author: 'Kukua-Tracey',
    readTime: '4 min read',
    date: '18 February 2026',
    heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    excerpt: '',
    content: '',
  });
  const [articleToDelete, setArticleToDelete] = useState<JournalArticle | null>(null);

  // Search & Filter in Inventory
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState('all');

  // Analytics computations
  const totalRevenueGhc = orders.reduce((sum, o) => sum + o.totalGhc, 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const lowStockCount = products.filter((p) => p.stockStatus === 'low_stock').length;

  const filteredInventory = products.filter((p) => {
    const matchesCat = inventoryCategoryFilter === 'all' || p.category === inventoryCategoryFilter || p.categoryId === inventoryCategoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(inventorySearch.toLowerCase()) || p.fabric.toLowerCase().includes(inventorySearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Open Product Modal for Create
  const handleOpenCreateProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      subtitle: 'Accra Atelier Ready-to-Wear',
      category: 'Dresses',
      categoryId: 'cat-dresses',
      priceGhc: 8500,
      originalPriceGhc: 0,
      fabric: 'Bonwire Hand-Woven Silk',
      craftsmanship: 'Hand-loomed in the Ashanti region of Bonwire by hereditary master weavers.',
      description: 'An architectural silhouette sculpted with traditional Ghanaian textiles and fluid modern tailoring.',
      careInstructions: 'Dry clean only. Store in breathable canvas garment bag.',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
      stockStatus: 'in_stock',
      sizes: 'XS, S, M, L, XL',
      isNew: true,
      isTrending: true,
      isSpotlight: false,
    });
    setIsProductModalOpen(true);
  };

  // Open Product Modal for Edit
  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProductForm({
      name: p.name,
      subtitle: p.subtitle || '',
      category: p.category,
      categoryId: p.categoryId,
      priceGhc: p.priceGhc,
      originalPriceGhc: p.originalPriceGhc || 0,
      fabric: p.fabric,
      craftsmanship: p.craftsmanship,
      description: p.description,
      careInstructions: p.careInstructions,
      imageUrl: p.images[0] || '',
      stockStatus: p.stockStatus,
      sizes: p.sizes.join(', '),
      isNew: p.isNew,
      isTrending: p.isTrending,
      isSpotlight: p.isSpotlight,
    });
    setIsProductModalOpen(true);
  };

  // Submit Product Form
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const sizeArray = productForm.sizes.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: productForm.name,
        subtitle: productForm.subtitle,
        category: productForm.category,
        categoryId: productForm.categoryId,
        priceGhc: Number(productForm.priceGhc),
        originalPriceGhc: productForm.originalPriceGhc ? Number(productForm.originalPriceGhc) : undefined,
        fabric: productForm.fabric,
        craftsmanship: productForm.craftsmanship,
        description: productForm.description,
        careInstructions: productForm.careInstructions,
        images: [productForm.imageUrl],
        stockStatus: productForm.stockStatus,
        sizes: sizeArray.length > 0 ? sizeArray : ['M'],
        isNew: productForm.isNew,
        isTrending: productForm.isTrending,
        isSpotlight: productForm.isSpotlight,
      });
    } else {
      addProduct({
        name: productForm.name,
        subtitle: productForm.subtitle,
        category: productForm.category,
        categoryId: productForm.categoryId,
        collectionId: 'col-ss26',
        priceGhc: Number(productForm.priceGhc),
        originalPriceGhc: productForm.originalPriceGhc ? Number(productForm.originalPriceGhc) : undefined,
        discountPercent: productForm.originalPriceGhc ? Math.round(((productForm.originalPriceGhc - productForm.priceGhc) / productForm.originalPriceGhc) * 100) : 0,
        isNew: productForm.isNew,
        isTrending: productForm.isTrending,
        isSpotlight: productForm.isSpotlight,
        rating: 5.0,
        reviewCount: 1,
        images: [productForm.imageUrl],
        colors: [{ name: 'Heritage Gold', hex: '#D4AF37' }],
        sizes: sizeArray.length > 0 ? sizeArray : ['XS', 'S', 'M', 'L'],
        variants: [],
        fabric: productForm.fabric,
        craftsmanship: productForm.craftsmanship,
        description: productForm.description,
        careInstructions: productForm.careInstructions,
        stockStatus: productForm.stockStatus,
      });
    }
    setIsProductModalOpen(false);
  };

  // Confirm delete product
  const handleConfirmDeleteProduct = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  // Save Site Content Form
  const handleSaveSiteContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(contentForm);
    setContentSaved(true);
    setTimeout(() => setContentSaved(false), 3000);
  };

  // Open Article Modal for Create
  const handleOpenCreateArticle = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: '',
      category: 'Styling Guide',
      author: 'Tracey Kuukua Quansah',
      readTime: '4 min read',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
      excerpt: '',
      content: '',
    });
    setIsArticleModalOpen(true);
  };

  // Open Article Modal for Edit
  const handleOpenEditArticle = (art: JournalArticle) => {
    setEditingArticleId(art.id);
    setArticleForm({
      title: art.title,
      category: art.category,
      author: art.author,
      readTime: art.readTime,
      date: art.date,
      heroImage: art.heroImage,
      excerpt: art.excerpt,
      content: art.content,
    });
    setIsArticleModalOpen(true);
  };

  // Save Article
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticleId) {
      updateArticle(editingArticleId, {
        title: articleForm.title,
        category: articleForm.category,
        author: articleForm.author,
        readTime: articleForm.readTime,
        date: articleForm.date,
        heroImage: articleForm.heroImage,
        excerpt: articleForm.excerpt,
        content: articleForm.content,
      });
    } else {
      addArticle({
        title: articleForm.title,
        slug: articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: articleForm.category,
        author: articleForm.author,
        readTime: articleForm.readTime,
        date: articleForm.date,
        heroImage: articleForm.heroImage,
        excerpt: articleForm.excerpt,
        content: articleForm.content,
        tags: ['Couture', 'Atelier', 'Accra'],
      });
    }
    setIsArticleModalOpen(false);
  };

  const handleConfirmDeleteArticle = () => {
    if (articleToDelete) {
      deleteArticle(articleToDelete.id);
      setArticleToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#111113] pb-32">
      {/* 1. Admin Header */}
      <section className="bg-[#111113] text-white py-6 sm:py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#6B73F0] flex items-center justify-center text-white flex-shrink-0 mt-0.5 sm:mt-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-xs sm:text-sm tracking-widest uppercase">
                  TRACEY KUUKUA QUANSAH
                </span>
                <span className="bg-[#1F8A4C] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  CMS Operations Active
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight mt-0.5">
                Atelier Administration & Content Management
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveView('home')}
              className="flex-1 sm:flex-initial text-xs bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live Storefront</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Reset products and site content to initial seed defaults?')) {
                  resetToDefaultData();
                  alert('Reset to default seed catalogue!');
                }
              }}
              className="text-xs bg-white/10 hover:bg-[#E5384F]/30 text-white/80 hover:text-white px-3 py-2 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Reset to default seed data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
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
            <span className="text-[11px] text-[#1F8A4C] block mt-1">↑ {totalItemsSold} pieces ordered</span>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6E6EA] shadow-sm">
            <div className="flex items-center justify-between text-[#8A8A8F] mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Catalogue Items</span>
              <Package className="w-4 h-4 text-[#6B73F0]" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-[#111113]">
              {products.length} creations
            </span>
            <span className="text-[11px] text-[#8A8A8F] block mt-1">{categories.length} categories</span>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6E6EA] shadow-sm">
            <div className="flex items-center justify-between text-[#8A8A8F] mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Bespoke Inquiries</span>
              <Scissors className="w-4 h-4 text-[#FF2D8A]" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-[#111113]">
              {enquiries.length} clients
            </span>
            <span className="text-[11px] text-[#6B73F0] block mt-1">Fittings scheduled this week</span>
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
      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-6 sm:mt-8">
        <div className="bg-white rounded-2xl p-1.5 border border-[#E6E6EA] flex space-x-1.5 overflow-x-auto no-scrollbar text-xs font-semibold shadow-xs">
          {[
            { id: 'inventory', label: `Inventory (${products.length})`, icon: Package },
            { id: 'content', label: 'Site Features & Banners', icon: Sliders },
            { id: 'journal', label: `Journal (${articles.length})`, icon: BookOpen },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: Scissors },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'inventory' | 'content' | 'journal' | 'orders' | 'enquiries' | 'analytics')}
                className={`flex-shrink-0 py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
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
        {/* ────────── 1. INVENTORY & PRODUCTS (ADD, EDIT, DELETE) ────────── */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-[#E6E6EA] overflow-hidden shadow-sm space-y-4">
            <div className="p-5 border-b border-[#E6E6EA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#111113]">
                  Product Inventory & Silhouette Registry
                </h3>
                <p className="text-xs text-[#8A8A8F]">
                  Add new gowns, edit pricing and stories, or delete archival pieces in real-time.
                </p>
              </div>

              {/* Add New Garment Button */}
              <button
                onClick={handleOpenCreateProduct}
                className="h-11 px-5 rounded-full bg-[#111113] text-white hover:bg-[#3A3A3F] text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Creation</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <input
                type="text"
                placeholder="Search products by title or fabric..."
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                className="w-full sm:max-w-xs h-10 px-4 rounded-full bg-[#F5F5F7] border border-[#E6E6EA] text-xs outline-none"
              />

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-[#8A8A8F] whitespace-nowrap">Filter category:</span>
                <select
                  value={inventoryCategoryFilter}
                  onChange={(e) => setInventoryCategoryFilter(e.target.value)}
                  className="h-10 px-3 rounded-full bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-medium text-[#111113] outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-[#8A8A8F]">
                  ({filteredInventory.length} items)
                </span>
              </div>
            </div>

            {/* Products Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F5F7] border-b border-[#E6E6EA] text-[#8A8A8F] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Garment</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Fabric</th>
                    <th className="py-3.5 px-4">Price (GH₵)</th>
                    <th className="py-3.5 px-4">Stock Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E6EA]">
                  {filteredInventory.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F5F5F7] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt=""
                            className="w-12 h-14 object-cover object-top rounded-xl bg-[#EDEDF0]"
                          />
                          <div>
                            <span className="font-semibold text-[#111113] block">{p.name}</span>
                            <span className="text-[10px] text-[#8A8A8F]">ID: {p.id} · {p.sizes.join(', ')}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#3A3A3F]">{p.category}</td>
                      <td className="py-3 px-4 text-[#8A8A8F] max-w-[150px] truncate">{p.fabric}</td>
                      <td className="py-3 px-4 font-bold text-[#111113]">
                        GH₵ {p.priceGhc.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {p.stockStatus === 'in_stock' && (
                          <span className="text-[10px] font-bold text-[#1F8A4C] bg-[#E8F5EE] px-2.5 py-1 rounded-full">
                            In Stock
                          </span>
                        )}
                        {p.stockStatus === 'low_stock' && (
                          <span className="text-[10px] font-bold text-[#F5A524] bg-[#FDF4E7] px-2.5 py-1 rounded-full">
                            Low Stock
                          </span>
                        )}
                        {p.stockStatus === 'out_of_stock' && (
                          <span className="text-[10px] font-bold text-[#E5384F] bg-[#FDECEE] px-2.5 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Product */}
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-2 rounded-lg bg-[#EDEDF0] hover:bg-[#111113] hover:text-white transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          {/* Delete Product */}
                          <button
                            onClick={() => setProductToDelete(p)}
                            className="p-2 rounded-lg bg-[#FDECEE] text-[#E5384F] hover:bg-[#E5384F] hover:text-white transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Product Card List (md:hidden) */}
            <div className="md:hidden divide-y divide-[#E6E6EA]">
              {filteredInventory.map((p) => (
                <div key={p.id} className="p-4 space-y-3">
                  <div className="flex gap-3">
                    <img
                      src={p.images[0]}
                      alt=""
                      className="w-16 h-20 object-cover object-top rounded-xl bg-[#EDEDF0] flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-[#111113] line-clamp-1">{p.name}</h4>
                        {p.stockStatus === 'in_stock' && (
                          <span className="text-[9px] font-bold text-[#1F8A4C] bg-[#E8F5EE] px-2 py-0.5 rounded-full flex-shrink-0">
                            In Stock
                          </span>
                        )}
                        {p.stockStatus === 'low_stock' && (
                          <span className="text-[9px] font-bold text-[#F5A524] bg-[#FDF4E7] px-2 py-0.5 rounded-full flex-shrink-0">
                            Low Stock
                          </span>
                        )}
                        {p.stockStatus === 'out_of_stock' && (
                          <span className="text-[9px] font-bold text-[#E5384F] bg-[#FDECEE] px-2 py-0.5 rounded-full flex-shrink-0">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6B73F0] font-medium">{p.category} · {p.fabric}</p>
                      <p className="font-bold text-sm text-[#111113]">GH₵ {p.priceGhc.toLocaleString()}</p>
                      <p className="text-[10px] text-[#8A8A8F]">Sizes: {p.sizes.join(', ')}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#F5F5F7]">
                    <button
                      onClick={() => handleOpenEditProduct(p)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#EDEDF0] hover:bg-[#111113] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setProductToDelete(p)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#FDECEE] text-[#E5384F] hover:bg-[#E5384F] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ────────── 2. SITE FEATURES & BANNERS (HERO, JUST LANDED, ANNOUNCEMENT) ────────── */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-3xl border border-[#E6E6EA] p-6 sm:p-8 space-y-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E6EA] pb-5">
              <div>
                <h3 className="text-base font-bold text-[#111113]">
                  Homepage Features & Content Editor
                </h3>
                <p className="text-xs text-[#8A8A8F]">
                  Modify hero typography, imagery, announcement banner, and toggle marketing sections.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {contentSaved && (
                  <span className="text-xs font-semibold text-[#1F8A4C] flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Saved Live!</span>
                  </span>
                )}
                <button
                  onClick={handleSaveSiteContent}
                  className="h-11 px-6 rounded-full bg-[#111113] text-white hover:bg-[#3A3A3F] text-xs font-semibold flex items-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Live Changes</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveSiteContent} className="space-y-8">
              {/* Top Announcement Bar */}
              <div className="bg-[#F5F5F7] rounded-2xl p-5 border border-[#E6E6EA] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111113] block">
                  Top Scrolling Announcement Bar
                </span>
                <input
                  type="text"
                  value={contentForm.announcementBarText}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, announcementBarText: e.target.value })
                  }
                  className="w-full h-11 px-4 rounded-xl bg-white border border-[#E6E6EA] text-xs font-medium text-[#111113] outline-none focus:border-[#6B73F0]"
                />
              </div>

              {/* Hero Single Photograph & Narrative Editor (CMS) */}
              <div className="bg-[#F5F5F7] rounded-2xl p-5 border border-[#E6E6EA] space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E6E6EA]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#111113] block">
                      Hero Section (Single Photograph & Story)
                    </span>
                    <p className="text-[11px] text-[#8A8A8F]">
                      Manage the single hero image, campaign badge, headline typography, and narrative write-up.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-[#0F5132] bg-emerald-100/70 border border-emerald-300 px-2.5 py-1 rounded-full uppercase">
                    Single Image Mode
                  </span>
                </div>

                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-8 space-y-3">
                      <ImageUploader
                        label="Hero Photograph"
                        value={contentForm.heroImageUrl || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=85'}
                        onChange={(url) => setContentForm({ ...contentForm, heroImageUrl: url })}
                      />

                      <div>
                        <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                          Campaign Badge
                        </label>
                        <input
                          type="text"
                          value={contentForm.heroCampaignBadge || 'T.I.M.E FITS · TAILORED PERFECTION'}
                          onChange={(e) =>
                            setContentForm({ ...contentForm, heroCampaignBadge: e.target.value })
                          }
                          className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs outline-none"
                        />
                      </div>
                    </div>

                    {/* Live Image Thumbnail Preview */}
                    <div className="sm:col-span-4 flex flex-col items-center justify-center">
                      <div className="w-full h-32 rounded-xl overflow-hidden bg-[#EDEDF0] border border-[#E6E6EA] relative shadow-inner">
                        {contentForm.heroImageUrl ? (
                          <img
                            src={contentForm.heroImageUrl}
                            alt="Hero Preview"
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=85';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#8A8A8F]">
                            No image selected
                          </div>
                        )}
                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                          Hero Image
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                        Headline Prefix
                      </label>
                      <input
                        type="text"
                        value={contentForm.heroHeadlinePrefix || 'Welcome to '}
                        onChange={(e) =>
                          setContentForm({ ...contentForm, heroHeadlinePrefix: e.target.value })
                        }
                        className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                        Accent Highlight Word (Green)
                      </label>
                      <input
                        type="text"
                        value={contentForm.heroHeadlineAccent || 'T.I.M.E fits'}
                        onChange={(e) =>
                          setContentForm({ ...contentForm, heroHeadlineAccent: e.target.value })
                        }
                        className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs font-bold text-[#0F5132] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                        Headline Suffix
                      </label>
                      <input
                        type="text"
                        value={contentForm.heroHeadlineSuffix || ' — Timeless Style.'}
                        onChange={(e) =>
                          setContentForm({ ...contentForm, heroHeadlineSuffix: e.target.value })
                        }
                        className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                      Hero Narrative / Story
                    </label>
                    <textarea
                      rows={3}
                      value={contentForm.heroSubtitle || ''}
                      onChange={(e) =>
                        setContentForm({ ...contentForm, heroSubtitle: e.target.value })
                      }
                      className="w-full p-3 rounded-xl bg-white border border-[#E6E6EA] text-xs outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                        Primary Button Text
                      </label>
                      <input
                        type="text"
                        value={contentForm.heroPrimaryCta || 'Explore Collections'}
                        onChange={(e) =>
                          setContentForm({ ...contentForm, heroPrimaryCta: e.target.value })
                        }
                        className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                        Secondary Button Text
                      </label>
                      <input
                        type="text"
                        value={contentForm.heroSecondaryCta || 'Our Story'}
                        onChange={(e) =>
                          setContentForm({ ...contentForm, heroSecondaryCta: e.target.value })
                        }
                        className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Just Landed Pink Banner */}
              <div className="bg-[#F5F5F7] rounded-2xl p-5 border border-[#E6E6EA] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111113]">
                    &quot;Just Landed&quot; Pink-Gradient Drop Banner
                  </span>
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={contentForm.bannerVisible}
                      onChange={(e) =>
                        setContentForm({ ...contentForm, bannerVisible: e.target.checked })
                      }
                      className="rounded text-[#FF2D8A]"
                    />
                    <span>Banner Visible</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                      Banner Badge Tag
                    </label>
                    <input
                      type="text"
                      value={contentForm.bannerBadge}
                      onChange={(e) =>
                        setContentForm({ ...contentForm, bannerBadge: e.target.value })
                      }
                      className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                      Banner Headline
                    </label>
                    <input
                      type="text"
                      value={contentForm.bannerHeadline}
                      onChange={(e) =>
                        setContentForm({ ...contentForm, bannerHeadline: e.target.value })
                      }
                      className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                    Banner Subtitle
                  </label>
                  <input
                    type="text"
                    value={contentForm.bannerSubtitle}
                    onChange={(e) =>
                      setContentForm({ ...contentForm, bannerSubtitle: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                    Discount / Promo Message
                  </label>
                  <input
                    type="text"
                    value={contentForm.bannerDiscountText}
                    onChange={(e) =>
                      setContentForm({ ...contentForm, bannerDiscountText: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs outline-none"
                  />
                </div>
              </div>

              {/* Mobile Floating Save Bar */}
              <div className="sm:hidden sticky bottom-4 z-20 bg-[#111113] text-white p-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3 border border-white/10">
                <span className="text-xs text-white/70">
                  {contentSaved ? (
                    <span className="text-[#1F8A4C] font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-white" /> Saved Live!
                    </span>
                  ) : (
                    'Ready to publish'
                  )}
                </span>
                <button
                  type="button"
                  onClick={handleSaveSiteContent}
                  className="h-9 px-4 rounded-full bg-white text-[#111113] text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95 transition-transform"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Live</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ────────── 3. JOURNAL & EDITORIAL STORIES (ADD, EDIT, DELETE) ────────── */}
        {activeTab === 'journal' && (
          <div className="bg-white rounded-3xl border border-[#E6E6EA] overflow-hidden shadow-sm space-y-4">
            <div className="p-5 border-b border-[#E6E6EA] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#111113]">
                  Spotlight Editorial & Journal Stories
                </h3>
                <p className="text-xs text-[#8A8A8F]">
                  Publish styling guides, artisan behind-the-scenes narratives, and runway reviews.
                </p>
              </div>

              <button
                onClick={handleOpenCreateArticle}
                className="h-11 px-5 rounded-full bg-[#111113] text-white hover:bg-[#3A3A3F] text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Write New Story</span>
              </button>
            </div>

            <div className="divide-y divide-[#E6E6EA]">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F5F5F7] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={art.heroImage}
                      alt=""
                      className="w-16 h-16 rounded-2xl object-cover bg-[#EDEDF0] flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#6B73F0] bg-[#ECEDFD] px-2.5 py-0.5 rounded-full uppercase">
                          {art.category}
                        </span>
                        <span className="text-[11px] text-[#8A8A8F]">{art.date} · {art.readTime}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#111113] mt-1 line-clamp-1">
                        {art.title}
                      </h4>
                      <p className="text-xs text-[#8A8A8F] line-clamp-1">{art.excerpt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleOpenEditArticle(art)}
                      className="p-2 rounded-lg bg-[#EDEDF0] hover:bg-[#111113] hover:text-white transition-colors cursor-pointer"
                      title="Edit Story"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setArticleToDelete(art)}
                      className="p-2 rounded-lg bg-[#FDECEE] text-[#E5384F] hover:bg-[#E5384F] hover:text-white transition-colors cursor-pointer"
                      title="Delete Story"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ────────── 4. ORDERS TAB ────────── */}
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

            {/* Orders Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
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
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as 'Packed' | 'Shipped' | 'Delivered' | 'Returned')}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#EDEDF0] text-[#111113] border-none outline-none cursor-pointer"
                        >
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Returned">Returned</option>
                        </select>
                        {ord.riderName && (
                          <span className="block text-[10px] text-[#6B73F0] font-medium truncate max-w-[140px] mt-0.5">
                            🚚 {ord.riderName}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            setTrackingOrder(ord);
                            setRiderInputName(ord.riderName || 'Kojo Mensah');
                            setRiderInputPhone(ord.riderPhone || '+233 24 999 1122');
                            setSelectedCourierPartner('atelier');
                          }}
                          className="p-2 rounded-lg bg-[#ECEDFD] text-[#6B73F0] hover:bg-[#DADBFA] transition-colors cursor-pointer mr-1.5"
                          title="Manage Ghana Courier & Live Tracking"
                        >
                          <Truck className="w-4 h-4" />
                        </button>
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

            {/* Mobile Orders Card List (md:hidden) */}
            <div className="md:hidden divide-y divide-[#E6E6EA]">
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#111113] block">
                        {ord.orderNumber}
                      </span>
                      <span className="text-[10px] text-[#8A8A8F]">{ord.date}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        ord.paymentStatus === 'Paid'
                          ? 'bg-[#E8F5EE] text-[#1F8A4C]'
                          : 'bg-[#FDF4E7] text-[#F5A524]'
                      }`}
                    >
                      {ord.paymentStatus} · {ord.paymentMethod}
                    </span>
                  </div>

                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-[#111113]">
                      {ord.customerName} · <span className="text-[#8A8A8F] font-normal">{ord.customerPhone}</span>
                    </p>
                    <p className="text-[#8A8A8F]">
                      {ord.city} ({ord.deliveryZone}) · {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                    </p>
                    <p className="font-bold text-sm text-[#111113] pt-0.5">
                      GH₵ {ord.totalGhc.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#F5F5F7]">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-[#8A8A8F] text-[11px]">Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as 'Packed' | 'Shipped' | 'Delivered' | 'Returned')}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#EDEDF0] text-[#111113] outline-none"
                      >
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Returned">Returned</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setTrackingOrder(ord);
                          setRiderInputName(ord.riderName || 'Kojo Mensah');
                          setRiderInputPhone(ord.riderPhone || '+233 24 999 1122');
                          setSelectedCourierPartner('atelier');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#ECEDFD] text-[#6B73F0] hover:bg-[#DADBFA] text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Courier</span>
                      </button>
                      <button
                        onClick={() => setSelectedPackingSlipOrder(ord)}
                        className="px-3 py-1.5 rounded-lg bg-[#EDEDF0] text-[#111113] hover:bg-[#E6E6EA] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Slip</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ────────── 5. BESPOKE ENQUIRIES TAB ────────── */}
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
                    &ldquo;{enq.message}&rdquo;
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

        {/* ────────── 6. FINANCIAL ANALYTICS ────────── */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[#E6E6EA] shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#111113] uppercase tracking-wider">
                Sales Volume by Category
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Dresses & Gala Gowns', percent: 45, volume: 'GH₵ 42,500' },
                  { name: 'Bonwire Kente Corsetry', percent: 30, volume: 'GH₵ 28,300' },
                  { name: 'Tailored Velvet Suits', percent: 15, volume: 'GH₵ 14,200' },
                  { name: 'Streetwear & Adornments', percent: 10, volume: 'GH₵ 9,400' },
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

      {/* ────────── PRODUCT ADD / EDIT MODAL ────────── */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-6 sm:p-8 space-y-6 text-[#111113] relative border border-[#E6E6EA] shadow-2xl my-8">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#EDEDF0] hover:bg-[#E6E6EA] cursor-pointer"
            >
              <X className="w-4 h-4 text-[#111113]" />
            </button>

            <div className="border-b border-[#E6E6EA] pb-3">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#6B73F0]">
                ATELIER PRODUCT CMS
              </span>
              <h3 className="text-xl font-bold text-[#111113]">
                {editingProductId ? 'Edit Archival Silhouette' : 'Create New Creation'}
              </h3>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                    Garment Name
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Ashanti Silk Cape Gown"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-semibold outline-none focus:border-[#6B73F0]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => {
                      const cat = categories.find((c) => c.name === e.target.value);
                      setProductForm({
                        ...productForm,
                        category: e.target.value,
                        categoryId: cat?.id || 'cat-dresses',
                      });
                    }}
                    className="w-full h-11 px-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-semibold outline-none cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                    Price (GH₵)
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.priceGhc}
                    onChange={(e) => setProductForm({ ...productForm, priceGhc: Number(e.target.value) })}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-bold outline-none focus:border-[#6B73F0]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                    Original Price (GH₵)
                  </label>
                  <input
                    type="number"
                    value={productForm.originalPriceGhc}
                    onChange={(e) => setProductForm({ ...productForm, originalPriceGhc: Number(e.target.value) })}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                    Stock Status
                  </label>
                  <select
                    value={productForm.stockStatus}
                    onChange={(e) => setProductForm({ ...productForm, stockStatus: e.target.value as 'in_stock' | 'low_stock' | 'out_of_stock' })}
                    className="w-full h-11 px-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-semibold outline-none cursor-pointer"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock (2 Left)</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                  Fabric & Material Origin
                </label>
                <input
                  type="text"
                  required
                  value={productForm.fabric}
                  onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                  placeholder="e.g. Bonwire Hand-Woven Silk"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                  The Story of This Piece (Displayed prominently in detail modal)
                </label>
                <textarea
                  rows={3}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs outline-none"
                />
              </div>

              <ImageUploader
                label="Product Image"
                value={productForm.imageUrl}
                onChange={(url) => setProductForm({ ...productForm, imageUrl: url })}
              />

              <div>
                <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                  Available Sizes (comma-separated, e.g. XS, S, M, L, XL)
                </label>
                <input
                  type="text"
                  value={productForm.sizes}
                  onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isTrending}
                    onChange={(e) => setProductForm({ ...productForm, isTrending: e.target.checked })}
                    className="rounded text-[#111113]"
                  />
                  <span>Show on Front Page Trending</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isNew}
                    onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                    className="rounded text-[#111113]"
                  />
                  <span>Mark as New Drop</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#E6E6EA]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-1 h-12 rounded-full border border-[#E6E6EA] text-xs font-semibold hover:bg-[#F5F5F7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-12 rounded-full bg-[#111113] text-white text-xs font-semibold hover:bg-[#3A3A3F] shadow-md"
                >
                  {editingProductId ? 'Update Garment' : 'Add to Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ────────── DELETE PRODUCT CONFIRMATION MODAL ────────── */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white rounded-[28px] max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#FDECEE] text-[#E5384F] flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#111113]">Delete this creation?</h3>
              <p className="text-xs text-[#8A8A8F] mt-1">
                &ldquo;{productToDelete.name}&rdquo; will be removed from your store and archival catalogue.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 h-11 rounded-full border border-[#E6E6EA] text-xs font-semibold hover:bg-[#F5F5F7]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeleteProduct}
                className="flex-1 h-11 rounded-full bg-[#E5384F] text-white text-xs font-semibold hover:bg-[#C52B40]"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────── ARTICLE ADD / EDIT MODAL ────────── */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-6 sm:p-8 space-y-5 text-[#111113] relative border border-[#E6E6EA] shadow-2xl my-8">
            <button
              onClick={() => setIsArticleModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#EDEDF0] hover:bg-[#E6E6EA]"
            >
              <X className="w-4 h-4 text-[#111113]" />
            </button>

            <div className="border-b border-[#E6E6EA] pb-3">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#6B73F0]">
                JOURNAL & SPOTLIGHT CMS
              </span>
              <h3 className="text-xl font-bold text-[#111113]">
                {editingArticleId ? 'Edit Editorial Story' : 'Write New Journal Feature'}
              </h3>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="e.g. The Loom of Kings: Inside Bonwire's Hereditary Workshops"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-semibold outline-none focus:border-[#6B73F0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                    Category
                  </label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as 'Styling Guide' | 'Behind The Scenes' | 'Press' | 'Heritage' })}
                    className="w-full h-10 px-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs outline-none cursor-pointer"
                  >
                    <option value="Styling Guide">Styling Guide</option>
                    <option value="Behind The Scenes">Behind The Scenes</option>
                    <option value="Heritage">Heritage</option>
                    <option value="Press">Press</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={articleForm.author}
                    onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={articleForm.readTime}
                    onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs outline-none"
                  />
                </div>
              </div>

              <div>
              <ImageUploader
                label="Hero Image"
                value={articleForm.heroImage}
                onChange={(url) => setArticleForm({ ...articleForm, heroImage: url })}
              />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                  Excerpt (One-sentence summary)
                </label>
                <input
                  type="text"
                  required
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8A8A8F] block mb-1">
                  Full Story Content
                </label>
                <textarea
                  rows={5}
                  required
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs outline-none"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-[#E6E6EA]">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="flex-1 h-11 rounded-full border border-[#E6E6EA] text-xs font-semibold hover:bg-[#F5F5F7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-full bg-[#111113] text-white text-xs font-semibold hover:bg-[#3A3A3F]"
                >
                  {editingArticleId ? 'Save Story' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ────────── DELETE ARTICLE CONFIRMATION MODAL ────────── */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white rounded-[28px] max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#FDECEE] text-[#E5384F] flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#111113]">Delete this story?</h3>
              <p className="text-xs text-[#8A8A8F] mt-1">
                &ldquo;{articleToDelete.title}&rdquo; will be unpublished from the journal.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setArticleToDelete(null)}
                className="flex-1 h-11 rounded-full border border-[#E6E6EA] text-xs font-semibold hover:bg-[#F5F5F7]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeleteArticle}
                className="flex-1 h-11 rounded-full bg-[#E5384F] text-white text-xs font-semibold hover:bg-[#C52B40]"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────── PRINTABLE PACKING SLIP MODAL ────────── */}
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

      {/* ────────── GHANA COURIER & LIVE TRACKING MANAGEMENT MODAL ────────── */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E6EA]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#ECEDFD] text-[#6B73F0] flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#111113]">Ghana Courier &amp; Dispatch</h3>
                  <p className="text-[11px] text-[#8A8A8F]">
                    Order <span className="font-mono font-semibold">{trackingOrder.orderNumber}</span> · {trackingOrder.customerName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTrackingOrder(null)}
                className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#E6E6EA] flex items-center justify-center text-[#8A8A8F] hover:text-[#111113] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Destination & Delivery Summary */}
            <div className="bg-[#F5F5F7] p-3.5 rounded-2xl text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[#8A8A8F]">Destination:</span>
                <span className="font-semibold text-[#111113]">{trackingOrder.city} ({trackingOrder.deliveryZone})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A8A8F]">Address:</span>
                <span className="font-medium text-[#111113] truncate max-w-[240px]">{trackingOrder.deliveryAddress}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A8A8F]">Client Phone:</span>
                <span className="font-mono text-[#111113]">{trackingOrder.customerPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A8A8F]">Est. Arrival:</span>
                <span className="font-semibold text-[#1F8A4C]">{trackingOrder.estimatedDelivery}</span>
              </div>
            </div>

            {/* Courier Service Selection */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-[#8A8A8F] block">
                Assign Ghana Courier Service
              </label>
              <select
                value={selectedCourierPartner}
                onChange={(e) => {
                  const partnerId = e.target.value;
                  setSelectedCourierPartner(partnerId);
                  const p = GHANA_COURIERS.find((c) => c.id === partnerId);
                  if (p) {
                    setRiderInputName(p.name);
                    setRiderInputPhone(p.phone);
                  }
                }}
                className="w-full h-11 px-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-medium outline-none cursor-pointer"
              >
                {GHANA_COURIERS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.tag})
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[11px] font-semibold text-[#8A8A8F] block mb-1">
                    Courier / Rider Name
                  </label>
                  <input
                    type="text"
                    value={riderInputName}
                    onChange={(e) => setRiderInputName(e.target.value)}
                    placeholder="e.g. Kojo Mensah / Fez Rider #12"
                    className="w-full h-10 px-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#8A8A8F] flex items-center gap-1 mb-1">
                    <Phone className="w-3 h-3 text-[#1F8A4C]" />
                    <span>Courier Phone (Ghana format)</span>
                  </label>
                  <input
                    type="text"
                    value={riderInputPhone}
                    onChange={(e) => setRiderInputPhone(e.target.value)}
                    placeholder="+233 24 999 1122"
                    className="w-full h-10 px-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs font-mono outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Live Progress Milestones Control */}
            <div className="space-y-3 pt-2 border-t border-[#E6E6EA]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111113] uppercase tracking-wider">
                  Live Tracking Milestones
                </span>
                <span className="text-[10px] text-[#8A8A8F]">Updates customer tracking card live</span>
              </div>

              <div className="space-y-2">
                {/* Step 1: Order Confirmed */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#1F8A4C] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#111113] block">Order Received &amp; Verified</span>
                      <span className="text-[10px] text-[#8A8A8F]">Atelier order intake verified</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#1F8A4C]">Completed</span>
                </div>

                {/* Step 2: Garment Scenting & Packaging */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#1F8A4C] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#111113] block">Garment Scenting &amp; Packaging</span>
                      <span className="text-[10px] text-[#8A8A8F]">Steamed with signature oud &amp; boxed</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#1F8A4C]">Packed</span>
                </div>

                {/* Step 3: Courier Pick-up */}
                {(() => {
                  const isPickedUp = trackingOrder.status === 'Shipped' || trackingOrder.status === 'Delivered';
                  return (
                    <div className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-colors ${
                      isPickedUp ? 'bg-[#E8F5EE] border-[#B7E4C7]' : 'bg-white border-[#E6E6EA]'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isPickedUp ? 'bg-[#1F8A4C] text-white' : 'border border-[#C7C7CC] bg-white text-[#8A8A8F]'
                        }`}>
                          {isPickedUp ? <Check className="w-3 h-3 stroke-[3]" /> : <Clock className="w-3 h-3" />}
                        </div>
                        <div>
                          <span className="font-semibold text-[#111113] block">Courier Pick-up</span>
                          <span className="text-[10px] text-[#8A8A8F]">
                            {isPickedUp ? `Handed over to ${riderInputName}` : 'Awaiting courier collection at atelier'}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                          const newTimeline = (trackingOrder.trackingTimeline || []).map((step) => {
                            if (step.title.includes('Courier Pick-up') || step.title.includes('Dispatched')) {
                              return { ...step, completed: true, time: `Picked Up at ${nowTime}` };
                            }
                            return step;
                          });
                          updateOrderTracking(trackingOrder.id, {
                            status: 'Shipped',
                            riderName: riderInputName,
                            riderPhone: riderInputPhone,
                            trackingTimeline: newTimeline,
                          });
                          setTrackingOrder({
                            ...trackingOrder,
                            status: 'Shipped',
                            riderName: riderInputName,
                            riderPhone: riderInputPhone,
                            trackingTimeline: newTimeline,
                          });
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isPickedUp
                            ? 'bg-[#1F8A4C] text-white'
                            : 'bg-[#6B73F0] text-white hover:bg-[#525BE8] active:scale-95 shadow-sm'
                        }`}
                      >
                        {isPickedUp ? 'Picked Up ✓' : 'Mark Picked Up'}
                      </button>
                    </div>
                  );
                })()}

                {/* Step 4: Delivered */}
                {(() => {
                  const isDelivered = trackingOrder.status === 'Delivered';
                  return (
                    <div className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-colors ${
                      isDelivered ? 'bg-[#E8F5EE] border-[#B7E4C7]' : 'bg-white border-[#E6E6EA]'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isDelivered ? 'bg-[#1F8A4C] text-white' : 'border border-[#C7C7CC] bg-white text-[#8A8A8F]'
                        }`}>
                          {isDelivered ? <Check className="w-3 h-3 stroke-[3]" /> : <Clock className="w-3 h-3" />}
                        </div>
                        <div>
                          <span className="font-semibold text-[#111113] block">Delivered at Doorstep</span>
                          <span className="text-[10px] text-[#8A8A8F]">
                            {isDelivered ? 'Successfully received & signed' : 'In transit to customer address'}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                          const newTimeline = (trackingOrder.trackingTimeline || []).map((step) => {
                            if (step.title.includes('Courier Pick-up') || step.title.includes('Dispatched') || step.title.includes('Delivered')) {
                              return { ...step, completed: true, time: step.time === 'Pending' ? `Delivered at ${nowTime}` : step.time };
                            }
                            return step;
                          });
                          updateOrderTracking(trackingOrder.id, {
                            status: 'Delivered',
                            riderName: riderInputName,
                            riderPhone: riderInputPhone,
                            trackingTimeline: newTimeline,
                          });
                          setTrackingOrder({
                            ...trackingOrder,
                            status: 'Delivered',
                            riderName: riderInputName,
                            riderPhone: riderInputPhone,
                            trackingTimeline: newTimeline,
                          });
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isDelivered
                            ? 'bg-[#1F8A4C] text-white'
                            : 'bg-[#111113] text-white hover:bg-[#3A3A3F] active:scale-95 shadow-sm'
                        }`}
                      >
                        {isDelivered ? 'Delivered ✓' : 'Mark Delivered'}
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Save Rider & Close */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  updateOrderTracking(trackingOrder.id, {
                    riderName: riderInputName,
                    riderPhone: riderInputPhone,
                  });
                  setTrackingOrder(null);
                }}
                className="flex-1 h-12 rounded-full bg-[#111113] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#3A3A3F] transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Courier Details &amp; Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
