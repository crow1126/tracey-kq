/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Order,
  BespokeEnquiry,
  Category,
  JournalArticle,
  SiteContent,
} from '@/data/db-schema';
import {
  SEED_PRODUCTS,
  SEED_CATEGORIES,
  SEED_ARTICLES,
} from '@/data/db-seed';
import { authClient } from '@/lib/auth/client';

export interface CartLineItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColorName: string;
  selectedColorHex: string;
  selectedSize: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
  addresses: Array<{
    id: string;
    label: string;
    address: string;
    city: string;
    isDefault: boolean;
  }>;
  loyaltyPoints: number;
  tier: 'Patron' | 'Connoisseur' | 'Ambassador';
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minSpendGhc?: number;
  description: string;
  isActive: boolean;
}

export const DEFAULT_PROMO_CODES: PromoCode[] = [
  {
    id: 'promo-1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minSpendGhc: 0,
    description: '10% Welcome privilege for new patrons',
    isActive: true,
  },
  {
    id: 'promo-2',
    code: 'VIPGHANA',
    type: 'percentage',
    value: 15,
    minSpendGhc: 5000,
    description: '15% VIP Patron Privilege on orders over GH₵ 5,000',
    isActive: true,
  },
  {
    id: 'promo-3',
    code: 'ACCRA50',
    type: 'fixed',
    value: 50,
    minSpendGhc: 500,
    description: 'GH₵ 50 instant courier credit',
    isActive: true,
  },
  {
    id: 'promo-4',
    code: 'TIMEFITS',
    type: 'percentage',
    value: 20,
    minSpendGhc: 8000,
    description: '20% Couture Launch Celebration on luxury silhouettes',
    isActive: true,
  },
];

export const DEFAULT_SITE_CONTENT: SiteContent = {
  announcementBarText:
    'T.I.M.E FITS · TAILORED PERFECTION, TIMELESS STYLE · ACCRA ATELIER · EXPRESS SAME-DAY DELIVERY IN ACCRA METRO',
  // Hero single photo & narrative
  heroCampaignBadge: 'T.I.M.E FITS · TAILORED PERFECTION',
  heroHeadlinePrefix: 'Welcome to ',
  heroHeadlineAccent: 'T.I.M.E fits',
  heroHeadlineSuffix: ' — Timeless Style.',
  heroSubtitle:
    'Fashion is never just fabric and form. It is identity in motion, confidence made visible, connection you can feel—and sometimes, the memory we carry long after the moment has passed. Welcome to T.I.M.E fits, where meaningful moments become beautifully considered design.',
  heroImageUrl:
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=85',
  heroPrimaryCta: 'Explore Collections',
  heroSecondaryCta: 'Our Story',
  heroPrimaryView: 'collections',
  heroSecondaryView: 'our-story',

  // Backwards compatibility fields
  hero2CampaignBadge: 'T.I.M.E FITS · COUTURE ATELIER',
  hero2HeadlinePrefix: 'Ancestral Craft,',
  hero2HeadlineAccent: 'Contemporary',
  hero2HeadlineSuffix: ' Soul.',
  hero2Subtitle:
    'From the looms of Bonwire to the runways of Accra — each piece carries generations of mastery, reimagined for today.',
  hero2ImageUrl:
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85',
  hero2PrimaryCta: 'Explore Collections',
  hero2SecondaryCta: 'View Lookbook',
  hero2PrimaryView: 'collections',
  hero2SecondaryView: 'collections',

  heroSlideDuration: 5,
  heroAutoplay: false,
  heroTransitionEffect: 'instant',

  // Just Landed Banner
  bannerVisible: true,
  bannerBadge: 'TAILORED PERFECTION · TIMELESS STYLE',
  bannerHeadline: 'Meaning Woven Into Every Thread',
  bannerSubtitle:
    'Enjoy complimentary express delivery across Greater Accra with bespoke garment packaging and fitting consultation.',
  bannerDiscountText: 'We don’t design for seasons; we design for lifetimes.',
};

interface StoreContextType {
  products: Product[];
  categories: Category[];
  articles: JournalArticle[];
  siteContent: SiteContent;
  cart: CartLineItem[];
  wishlist: string[];
  orders: Order[];
  enquiries: BespokeEnquiry[];
  user: UserAccount;
  activeView: string;
  selectedCategory: string;
  quickViewProduct: Product | null;
  isBespokeModalOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchOpen: boolean;
  isBrandMenuOpen: boolean;
  isAuthModalOpen: boolean;
  authRedirectView: string | null;
  isSizeGuideOpen: boolean;
  selectedDeliveryZone:
    | 'Accra Metro'
    | 'Tema / Spintex'
    | 'Kumasi'
    | 'Takoradi'
    | 'Nationwide Express';
  selectedDeliveryMethod:
    | 'Standard Courier (2-3 Days)'
    | 'Express Same-Day Priority';
  appliedPromoCode: string | null;
  promoDiscountPercent: number;
  promoDiscountFixed: number;

  // Actions
  setSelectedCategory: (catId: string) => void;
  navigateToCategory: (catId: string) => void;
  addToCart: (
    product: Product,
    size?: string,
    colorName?: string,
    colorHex?: string,
    qty?: number
  ) => void;
  removeFromCart: (lineId: string) => void;
  updateCartQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  setActiveView: (view: string) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setIsBespokeModalOpen: (open: boolean) => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsBrandMenuOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setAuthRedirectView: (view: string | null) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
  setSelectedDeliveryZone: (
    zone:
      | 'Accra Metro'
      | 'Tema / Spintex'
      | 'Kumasi'
      | 'Takoradi'
      | 'Nationwide Express'
  ) => void;
  setSelectedDeliveryMethod: (
    method: 'Standard Courier (2-3 Days)' | 'Express Same-Day Priority'
  ) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  submitBespokeEnquiry: (
    enquiry: Omit<BespokeEnquiry, 'id' | 'createdAt' | 'status'>
  ) => void;
  placeOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: string;
    city: string;
    paymentMethod:
      | 'MTN Mobile Money'
      | 'Telecel Cash'
      | 'AirtelTigo Money'
      | 'Credit / Debit Card'
      | 'Cash on Delivery';
  }) => Order;
  updateOrderStatus: (
    orderId: string,
    status: 'Packed' | 'Shipped' | 'Delivered' | 'Returned'
  ) => void;
  updateOrderTracking: (
    orderId: string,
    updates: {
      status?: 'Packed' | 'Shipped' | 'Delivered' | 'Returned';
      riderName?: string;
      riderPhone?: string;
      trackingTimeline?: { title: string; time: string; completed: boolean }[];
    }
  ) => void;
  loginUser: (email: string, name?: string, id?: string) => void;
  logoutUser: () => void;

  // CRUD for Products (Admin)
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // CRUD for Site Content / Banners (Admin)
  updateSiteContent: (updates: Partial<SiteContent>) => void;

  // Promos & Discounts (Admin & Checkout)
  promoCodes: PromoCode[];
  addPromoCode: (promo: Omit<PromoCode, 'id'>) => PromoCode;
  updatePromoCode: (id: string, updates: Partial<PromoCode>) => void;
  deletePromoCode: (id: string) => void;
  togglePromoCode: (id: string) => void;

  // CRUD for Articles / Journal (Admin)
  addArticle: (article: Omit<JournalArticle, 'id'>) => JournalArticle;
  updateArticle: (id: string, updates: Partial<JournalArticle>) => void;
  deleteArticle: (id: string) => void;

  // Reset to default data
  resetToDefaultData: () => void;

  // Calculations
  cartCount: number;
  cartSubtotalGhc: number;
  deliveryFeeGhc: number;
  discountAmountGhc: number;
  cartTotalGhc: number;
  getWhatsAppOrderUrl: (
    product: Product,
    size?: string,
    color?: string
  ) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [categories] = useState<Category[]>(SEED_CATEGORIES);
  const [articles, setArticles] = useState<JournalArticle[]>(SEED_ARTICLES);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  const [cart, setCart] = useState<CartLineItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([
    'prod-01',
    'prod-04',
    'prod-10',
  ]);
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isBespokeModalOpen, setIsBespokeModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBrandMenuOpen, setIsBrandMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectView, setAuthRedirectView] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState<
    | 'Accra Metro'
    | 'Tema / Spintex'
    | 'Kumasi'
    | 'Takoradi'
    | 'Nationwide Express'
  >('Accra Metro');
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<
    'Standard Courier (2-3 Days)' | 'Express Same-Day Priority'
  >('Standard Courier (2-3 Days)');

  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);
  const [promoDiscountFixed, setPromoDiscountFixed] = useState(0);

  // Dynamic promo codes list (Admin CMS editable & localStorage backed)
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tkq_promo_codes');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return DEFAULT_PROMO_CODES;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('tkq_promo_codes', JSON.stringify(promoCodes));
      } catch {}
    }
  }, [promoCodes]);

  const [user, setUser] = useState<UserAccount>({
    id: 'usr-001',
    name: 'Ama Mensah-Bonsu',
    email: 'ama.mensah@prestige.gh',
    phone: '+233 20 891 2345',
    isLoggedIn: false, // Default as guest per specs: "Everything is public. No login wall."
    addresses: [
      {
        id: 'addr-1',
        label: 'Home',
        address: 'House 14, Senchi Street, Airport Residential Area',
        city: 'Accra',
        isDefault: true,
      },
    ],
    loyaltyPoints: 340,
    tier: 'Connoisseur',
  });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-01',
      orderNumber: 'TKQ-2026-0891',
      customerName: 'Ama Mensah-Bonsu',
      customerEmail: 'ama.mensah@prestige.gh',
      customerPhone: '+233 20 891 2345',
      deliveryAddress: 'House 14, Senchi Street, Airport Residential Area',
      city: 'Accra',
      deliveryZone: 'Accra Metro',
      deliveryFeeGhc: 35,
      deliveryMethod: 'Express Same-Day Priority',
      paymentMethod: 'MTN Mobile Money',
      paymentStatus: 'Paid',
      subtotalGhc: 18500,
      discountGhc: 0,
      totalGhc: 18535,
      status: 'Shipped',
      date: '18 February 2026',
      estimatedDelivery: 'Today by 5:00 PM',
      items: [
        {
          id: 'item-1',
          productId: 'prod-01',
          productName: 'The Ashanti Silk Cape Gown',
          productImage:
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85',
          size: 'M',
          colorName: 'Royal Amber Gold',
          quantity: 1,
          priceGhc: 18500,
        },
      ],
      riderName: 'Kwesi Darko',
      riderPhone: '+233 50 123 4567',
      trackingTimeline: [
        { title: 'Order Confirmed', time: '09:15 AM', completed: true },
        {
          title: 'Garment Steamed & Inspected',
          time: '11:30 AM',
          completed: true,
        },
        { title: 'Dispatched with Courier', time: '01:45 PM', completed: true },
        { title: 'Delivered at Doorstep', time: 'Pending', completed: false },
      ],
    },
  ]);

  const [enquiries, setEnquiries] = useState<BespokeEnquiry[]>([
    {
      id: 'enq-01',
      name: 'Yaa Asantewaa Boateng',
      email: 'yaa@capitalgh.com',
      phone: '+233 24 555 7890',
      serviceType: 'Bespoke Tailoring',
      preferredDate: '2026-03-15',
      budgetGhc: 'GH₵ 25,000+',
      message:
        'Looking for a custom Kente gala gown for the Independence Day Ball.',
      createdAt: '2026-02-16',
      status: 'Fitting Scheduled',
    },
  ]);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('tkq_admin_products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }

      const savedContent = localStorage.getItem('tkq_admin_site_content');
      if (savedContent) {
        setSiteContent({ ...DEFAULT_SITE_CONTENT, ...JSON.parse(savedContent) });
      }

      const savedArticles = localStorage.getItem('tkq_admin_articles');
      if (savedArticles) {
        setArticles(JSON.parse(savedArticles));
      }

      const savedCart = localStorage.getItem('tkq_guest_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        // Pre-fill one item for instant experience
        setCart([
          {
            id: 'init-01',
            product: SEED_PRODUCTS[0],
            quantity: 1,
            selectedColorName: SEED_PRODUCTS[0].colors[0]?.name || 'Gold',
            selectedColorHex: SEED_PRODUCTS[0].colors[0]?.hex || '#D4AF37',
            selectedSize: 'M',
          },
        ]);
      }

      const savedWishlist = localStorage.getItem('tkq_guest_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      const savedUser = localStorage.getItem('tkq_user_session');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // LocalStorage access fallback
    }

    // Verify authenticated session with Neon Auth
    authClient
      .getSession()
      .then((session) => {
        if (session?.data?.user) {
          const u = session.data.user;
          setUser((prev) => {
            const updated: UserAccount = {
              ...prev,
              id: u.id,
              name: u.name || prev.name,
              email: u.email,
              isLoggedIn: true,
            };
            try {
              localStorage.setItem('tkq_user_session', JSON.stringify(updated));
            } catch {}
            return updated;
          });
        }
      })
      .catch(() => {});

    // Sync with Neon Database if connected
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data?.products && data.products.length > 0 && data.source === 'neon') {
          setProducts(data.products);
        }
      })
      .catch(() => {});

    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data?.content && data.source === 'neon') {
          setSiteContent({ ...DEFAULT_SITE_CONTENT, ...data.content });
        }
      })
      .catch(() => {});
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tkq_guest_cart', JSON.stringify(cart));
      localStorage.setItem('tkq_guest_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [cart, wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('tkq_admin_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'tkq_admin_site_content',
        JSON.stringify(siteContent)
      );
    } catch {}
  }, [siteContent]);

  useEffect(() => {
    try {
      localStorage.setItem('tkq_admin_articles', JSON.stringify(articles));
    } catch {}
  }, [articles]);

  // Category navigation helper
  const navigateToCategory = (catId: string) => {
    setSelectedCategory(catId);
    setActiveView('shop');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Add / Edit / Delete Products (Admin)
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    // Sync with Neon Database
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    }).catch(() => {});
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    // Sync with Neon Database
    fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    }).catch(() => {});
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // Also remove from cart/wishlist
    setWishlist((prev) => prev.filter((pId) => pId !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    // Sync with Neon Database
    fetch(`/api/products?id=${id}`, {
      method: 'DELETE',
    }).catch(() => {});
  };

  // Site Content Updates (Admin)
  const updateSiteContent = (updates: Partial<SiteContent>) => {
    const updated = { ...siteContent, ...updates };
    setSiteContent(updated);
    // Sync with Neon Database
    fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});
  };

  // Journal Articles CRUD (Admin)
  const addArticle = (articleData: Omit<JournalArticle, 'id'>): JournalArticle => {
    const newArticle: JournalArticle = {
      ...articleData,
      id: `art-${Date.now()}`,
    };
    setArticles((prev) => [newArticle, ...prev]);
    fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newArticle),
    }).catch(() => {});
    return newArticle;
  };

  const updateArticle = (id: string, updates: Partial<JournalArticle>) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
    fetch('/api/articles', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    }).catch(() => {});
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    fetch(`/api/articles?id=${id}`, { method: 'DELETE' }).catch(() => {});
  };

  // Reset to original seed data
  const resetToDefaultData = () => {
    setProducts(SEED_PRODUCTS);
    setSiteContent(DEFAULT_SITE_CONTENT);
    setArticles(SEED_ARTICLES);
    try {
      localStorage.removeItem('tkq_admin_products');
      localStorage.removeItem('tkq_admin_site_content');
      localStorage.removeItem('tkq_admin_articles');
    } catch {}
  };

  const addToCart = (
    product: Product,
    size?: string,
    colorName?: string,
    colorHex?: string,
    qty: number = 1
  ) => {
    const chosenSize = size || product.sizes[0] || 'M';
    const chosenColorName = colorName || product.colors[0]?.name || 'Standard';
    const chosenColorHex = colorHex || product.colors[0]?.hex || '#000000';
    const lineId = `${product.id}-${chosenSize}-${chosenColorName}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === lineId);
      if (existing) {
        return prev.map((item) =>
          item.id === lineId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: lineId,
          product,
          quantity: qty,
          selectedSize: chosenSize,
          selectedColorName: chosenColorName,
          selectedColorHex: chosenColorHex,
        },
      ];
    });

    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (lineId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== lineId));
  };

  const updateCartQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(lineId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === lineId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Delivery fee mapping per zone in GH₵
  const getDeliveryFee = () => {
    let fee = 35;
    if (selectedDeliveryZone === 'Accra Metro') fee = 35;
    if (selectedDeliveryZone === 'Tema / Spintex') fee = 45;
    if (selectedDeliveryZone === 'Kumasi') fee = 65;
    if (selectedDeliveryZone === 'Takoradi') fee = 65;
    if (selectedDeliveryZone === 'Nationwide Express') fee = 85;

    if (selectedDeliveryMethod === 'Express Same-Day Priority') {
      fee += 30;
    }
    return fee;
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalGhc = cart.reduce(
    (sum, item) => sum + item.product.priceGhc * item.quantity,
    0
  );
  const deliveryFeeGhc = cart.length === 0 ? 0 : getDeliveryFee();

  const discountAmountGhc =
    promoDiscountPercent > 0
      ? Math.round((cartSubtotalGhc * promoDiscountPercent) / 100)
      : promoDiscountFixed;

  const cartTotalGhc = Math.max(
    0,
    cartSubtotalGhc - discountAmountGhc + deliveryFeeGhc
  );

  const addPromoCode = (promo: Omit<PromoCode, 'id'>) => {
    const newPromo: PromoCode = {
      ...promo,
      id: `promo-${Date.now()}`,
      code: promo.code.trim().toUpperCase(),
    };
    setPromoCodes((prev) => [newPromo, ...prev]);
    return newPromo;
  };

  const updatePromoCode = (id: string, updates: Partial<PromoCode>) => {
    setPromoCodes((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updates,
              code: updates.code ? updates.code.trim().toUpperCase() : p.code,
            }
          : p
      )
    );
  };

  const deletePromoCode = (id: string) => {
    setPromoCodes((prev) => prev.filter((p) => p.id !== id));
  };

  const togglePromoCode = (id: string) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = promoCodes.find(
      (p) => p.code.toUpperCase() === clean && p.isActive
    );
    if (!found) {
      return {
        success: false,
        message: 'Invalid or inactive promo code.',
      };
    }
    if (found.minSpendGhc && cartSubtotalGhc < found.minSpendGhc) {
      return {
        success: false,
        message: `Minimum order of GH₵ ${found.minSpendGhc.toLocaleString()} required for code ${found.code}.`,
      };
    }
    setAppliedPromoCode(found.code);
    if (found.type === 'percentage') {
      setPromoDiscountPercent(found.value);
      setPromoDiscountFixed(0);
      return {
        success: true,
        message: `${found.value}% discount applied successfully!`,
      };
    } else {
      setPromoDiscountPercent(0);
      setPromoDiscountFixed(found.value);
      return {
        success: true,
        message: `GH₵ ${found.value.toLocaleString()} voucher credit applied!`,
      };
    }
  };

  const removePromoCode = () => {
    setAppliedPromoCode(null);
    setPromoDiscountPercent(0);
    setPromoDiscountFixed(0);
  };

  const submitBespokeEnquiry = (
    data: Omit<BespokeEnquiry, 'id' | 'createdAt' | 'status'>
  ) => {
    const newEnquiry: BespokeEnquiry = {
      ...data,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'New',
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
  };

  const placeOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: string;
    city: string;
    paymentMethod:
      | 'MTN Mobile Money'
      | 'Telecel Cash'
      | 'AirtelTigo Money'
      | 'Credit / Debit Card'
      | 'Cash on Delivery';
  }) => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `TKQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      deliveryAddress: orderData.deliveryAddress,
      city: orderData.city,
      deliveryZone: selectedDeliveryZone,
      deliveryFeeGhc,
      deliveryMethod: selectedDeliveryMethod,
      paymentMethod: orderData.paymentMethod,
      paymentStatus:
        orderData.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      subtotalGhc: cartSubtotalGhc,
      discountGhc: discountAmountGhc,
      totalGhc: cartTotalGhc,
      status: 'Packed',
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      estimatedDelivery:
        selectedDeliveryMethod === 'Express Same-Day Priority'
          ? 'Today by 6:00 PM'
          : '2-3 Business Days',
      items: cart.map((c) => ({
        id: c.id,
        productId: c.product.id,
        productName: c.product.name,
        productImage: c.product.images[0],
        size: c.selectedSize,
        colorName: c.selectedColorName,
        quantity: c.quantity,
        priceGhc: c.product.priceGhc,
      })),
      riderName: 'Kojo Mensah',
      riderPhone: '+233 24 999 1122',
      trackingTimeline: [
        {
          title: 'Order Received & Verified',
          time: 'Just now',
          completed: true,
        },
        {
          title: 'Garment Scenting & Packaging',
          time: 'In Progress',
          completed: true,
        },
        { title: 'Courier Pick-up', time: 'Pending', completed: false },
        { title: 'Delivered', time: 'Pending', completed: false },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    }).catch(() => {});

    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: 'Packed' | 'Shipped' | 'Delivered' | 'Returned'
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const updatedTimeline = (o.trackingTimeline || []).map((step) => {
          if (status === 'Shipped' && step.title === 'Courier Pick-up') {
            return { ...step, completed: true, time: 'Picked up' };
          }
          if (status === 'Delivered') {
            return { ...step, completed: true, time: step.time === 'Pending' ? 'Delivered' : step.time };
          }
          return step;
        });
        return { ...o, status, trackingTimeline: updatedTimeline };
      })
    );
    fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, status }),
    }).catch(() => {});
  };

  const updateOrderTracking = (
    orderId: string,
    updates: {
      status?: 'Packed' | 'Shipped' | 'Delivered' | 'Returned';
      riderName?: string;
      riderPhone?: string;
      trackingTimeline?: { title: string; time: string; completed: boolean }[];
    }
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, ...updates } : o))
    );
    fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, ...updates }),
    }).catch(() => {});
  };

  const loginUser = (email: string, name?: string, id?: string) => {
    setUser((prev) => {
      const updated: UserAccount = {
        ...prev,
        id: id || prev.id,
        email,
        name: name || prev.name,
        isLoggedIn: true,
      };
      try {
        localStorage.setItem('tkq_user_session', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const logoutUser = () => {
    authClient.signOut().catch(() => {});
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
    try {
      localStorage.removeItem('tkq_user_session');
    } catch {}
  };

  const getWhatsAppOrderUrl = (
    product: Product,
    size?: string,
    color?: string
  ) => {
    const s = size || product.sizes[0] || 'M';
    const c = color || product.colors[0]?.name || 'Standard';
    const message = encodeURIComponent(
      `Hello T.I.M.E fits Atelier! I would like to order: ${product.name} (GH₵ ${product.priceGhc.toLocaleString()}) in Size ${s}, Color ${c}. Please guide me on delivery to my address.`
    );
    return `https://wa.me/233208912340?text=${message}`;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        articles,
        siteContent,
        cart,
        wishlist,
        orders,
        enquiries,
        user,
        activeView,
        selectedCategory,
        quickViewProduct,
        isBespokeModalOpen,
        isCartDrawerOpen,
        isSearchOpen,
        isBrandMenuOpen,
        isAuthModalOpen,
        isSizeGuideOpen,
        selectedDeliveryZone,
        selectedDeliveryMethod,
        appliedPromoCode,
        promoDiscountPercent,
        promoDiscountFixed,
        promoCodes,
        addPromoCode,
        updatePromoCode,
        deletePromoCode,
        togglePromoCode,
        setSelectedCategory,
        navigateToCategory,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        setActiveView,
        setQuickViewProduct,
        setIsBespokeModalOpen,
        setIsCartDrawerOpen,
        setIsSearchOpen,
        setIsBrandMenuOpen,
        setIsAuthModalOpen,
        authRedirectView,
        setAuthRedirectView,
        setIsSizeGuideOpen,
        setSelectedDeliveryZone,
        setSelectedDeliveryMethod,
        applyPromoCode,
        removePromoCode,
        submitBespokeEnquiry,
        placeOrder,
        updateOrderStatus,
        updateOrderTracking,
        loginUser,
        logoutUser,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSiteContent,
        addArticle,
        updateArticle,
        deleteArticle,
        resetToDefaultData,
        cartCount,
        cartSubtotalGhc,
        deliveryFeeGhc,
        discountAmountGhc,
        cartTotalGhc,
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
