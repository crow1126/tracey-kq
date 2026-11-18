'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, OrderItem, Review, BespokeEnquiry } from '@/data/db-schema';
import { SEED_PRODUCTS, SEED_REVIEWS } from '@/data/db-seed';

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

interface StoreContextType {
  products: Product[];
  cart: CartLineItem[];
  wishlist: string[];
  orders: Order[];
  enquiries: BespokeEnquiry[];
  user: UserAccount;
  activeView: string;
  quickViewProduct: Product | null;
  isBespokeModalOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchOpen: boolean;
  isBrandMenuOpen: boolean;
  isAuthModalOpen: boolean;
  isSizeGuideOpen: boolean;
  selectedDeliveryZone: 'Accra Metro' | 'Tema / Spintex' | 'Kumasi' | 'Takoradi' | 'Nationwide Express';
  selectedDeliveryMethod: 'Standard Courier (2-3 Days)' | 'Express Same-Day Priority';
  appliedPromoCode: string | null;
  promoDiscountPercent: number;
  promoDiscountFixed: number;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  navigateToCategory: (catId: string) => void;
  
  // Actions
  addToCart: (product: Product, size?: string, colorName?: string, colorHex?: string, qty?: number) => void;
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
  setIsSizeGuideOpen: (open: boolean) => void;
  setSelectedDeliveryZone: (zone: 'Accra Metro' | 'Tema / Spintex' | 'Kumasi' | 'Takoradi' | 'Nationwide Express') => void;
  setSelectedDeliveryMethod: (method: 'Standard Courier (2-3 Days)' | 'Express Same-Day Priority') => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  submitBespokeEnquiry: (enquiry: Omit<BespokeEnquiry, 'id' | 'createdAt' | 'status'>) => void;
  placeOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: string;
    city: string;
    paymentMethod: 'MTN Mobile Money' | 'Telecel Cash' | 'AirtelTigo Money' | 'Credit / Debit Card' | 'Cash on Delivery';
  }) => Order;
  updateOrderStatus: (orderId: string, status: 'Packed' | 'Shipped' | 'Delivered' | 'Returned') => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;

  // Calculations
  cartCount: number;
  cartSubtotalGhc: number;
  deliveryFeeGhc: number;
  discountAmountGhc: number;
  cartTotalGhc: number;
  getWhatsAppOrderUrl: (product: Product, size?: string, color?: string) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [cart, setCart] = useState<CartLineItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-01', 'prod-04', 'prod-10']);
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isBespokeModalOpen, setIsBespokeModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBrandMenuOpen, setIsBrandMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState<'Accra Metro' | 'Tema / Spintex' | 'Kumasi' | 'Takoradi' | 'Nationwide Express'>('Accra Metro');
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<'Standard Courier (2-3 Days)' | 'Express Same-Day Priority'>('Standard Courier (2-3 Days)');

  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);
  const [promoDiscountFixed, setPromoDiscountFixed] = useState(0);

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
          productImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85',
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
        { title: 'Garment Steamed & Inspected', time: '11:30 AM', completed: true },
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
      message: 'Looking for a custom Kente gala gown for the Independence Day Ball.',
      createdAt: '2026-02-16',
      status: 'Fitting Scheduled',
    },
  ]);

  // Load guest cart and wishlist from localStorage
  useEffect(() => {
    try {
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
            selectedColorName: SEED_PRODUCTS[0].colors[0].name,
            selectedColorHex: SEED_PRODUCTS[0].colors[0].hex,
            selectedSize: 'M',
          },
        ]);
      }

      const savedWishlist = localStorage.getItem('tkq_guest_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  // Save guest cart & wishlist
  useEffect(() => {
    try {
      localStorage.setItem('tkq_guest_cart', JSON.stringify(cart));
      localStorage.setItem('tkq_guest_wishlist', JSON.stringify(wishlist));
    } catch {
      // Fallback
    }
  }, [cart, wishlist]);

  const addToCart = (product: Product, size?: string, colorName?: string, colorHex?: string, qty: number = 1) => {
    const chosenSize = size || product.sizes[0];
    const chosenColorName = colorName || product.colors[0].name;
    const chosenColorHex = colorHex || product.colors[0].hex;
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

  const navigateToCategory = (catId: string) => {
    setSelectedCategory(catId);
    setActiveView('shop');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setAppliedPromoCode(clean);
      setPromoDiscountPercent(10);
      setPromoDiscountFixed(0);
      return { success: true, message: '10% Welcome Discount applied!' };
    }
    if (clean === 'VIPGHANA' || clean === 'TKQ15') {
      setAppliedPromoCode(clean);
      setPromoDiscountPercent(15);
      setPromoDiscountFixed(0);
      return { success: true, message: '15% VIP Patron Discount applied!' };
    }
    if (clean === 'ACCRA50') {
      setAppliedPromoCode(clean);
      setPromoDiscountPercent(0);
      setPromoDiscountFixed(50);
      return { success: true, message: 'GH₵ 50 instant credit applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "WELCOME10" or "VIPGHANA"' };
  };

  const removePromoCode = () => {
    setAppliedPromoCode(null);
    setPromoDiscountPercent(0);
    setPromoDiscountFixed(0);
  };

  const submitBespokeEnquiry = (data: Omit<BespokeEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: BespokeEnquiry = {
      ...data,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'New',
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
  };

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
  const cartSubtotalGhc = cart.reduce((sum, item) => sum + item.product.priceGhc * item.quantity, 0);
  const deliveryFeeGhc = cart.length === 0 ? 0 : getDeliveryFee();

  const discountAmountGhc =
    promoDiscountPercent > 0
      ? Math.round((cartSubtotalGhc * promoDiscountPercent) / 100)
      : promoDiscountFixed;

  const cartTotalGhc = Math.max(0, cartSubtotalGhc - discountAmountGhc + deliveryFeeGhc);

  const placeOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: string;
    city: string;
    paymentMethod: 'MTN Mobile Money' | 'Telecel Cash' | 'AirtelTigo Money' | 'Credit / Debit Card' | 'Cash on Delivery';
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
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      subtotalGhc: cartSubtotalGhc,
      discountGhc: discountAmountGhc,
      totalGhc: cartTotalGhc,
      status: 'Packed',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      estimatedDelivery: selectedDeliveryMethod === 'Express Same-Day Priority' ? 'Today by 6:00 PM' : '2-3 Business Days',
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
        { title: 'Order Received & Verified', time: 'Just now', completed: true },
        { title: 'Garment Scenting & Packaging', time: 'In Progress', completed: true },
        { title: 'Courier Pick-up', time: 'Pending', completed: false },
        { title: 'Delivered', time: 'Pending', completed: false },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: 'Packed' | 'Shipped' | 'Delivered' | 'Returned') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const loginUser = (email: string, name?: string) => {
    setUser((prev) => ({
      ...prev,
      email,
      name: name || prev.name,
      isLoggedIn: true,
    }));
  };

  const logoutUser = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
  };

  const getWhatsAppOrderUrl = (product: Product, size?: string, color?: string) => {
    const s = size || product.sizes[0];
    const c = color || product.colors[0].name;
    const message = encodeURIComponent(
      `Hello Tracey Kuukua Quansah Atelier! I would like to order: ${product.name} (GH₵ ${product.priceGhc.toLocaleString()}) in Size ${s}, Color ${c}. Please guide me on delivery to my address.`
    );
    return `https://wa.me/233208912340?text=${message}`;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        enquiries,
        user,
        activeView,
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
        selectedCategory,
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
        setIsSizeGuideOpen,
        setSelectedDeliveryZone,
        setSelectedDeliveryMethod,
        applyPromoCode,
        removePromoCode,
        submitBespokeEnquiry,
        placeOrder,
        updateOrderStatus,
        loginUser,
        logoutUser,
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
