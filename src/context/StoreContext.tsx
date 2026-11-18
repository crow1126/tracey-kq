'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '@/data/fashion-data';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface UserMeasurements {
  bust: number;
  waist: number;
  hips: number;
  shoulder: number;
  height: number;
  unit: 'inches' | 'cm';
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  activeTab: 'maison' | 'boutique' | 'lookbook' | 'atelier' | 'patron';
  quickViewProduct: Product | null;
  isBespokeModalOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchOpen: boolean;
  promoCode: string;
  discountPercent: number;
  userMeasurements: UserMeasurements;
  addToCart: (product: Product, size?: string, color?: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  setActiveTab: (tab: 'maison' | 'boutique' | 'lookbook' | 'atelier' | 'patron') => void;
  setQuickViewProduct: (product: Product | null) => void;
  setIsBespokeModalOpen: (open: boolean) => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  applyPromoCode: (code: string) => boolean;
  updateMeasurements: (measurements: Partial<UserMeasurements>) => void;
  cartCount: number;
  cartSubtotal: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['tkq-01', 'tkq-03']);
  const [activeTab, setActiveTab] = useState<'maison' | 'boutique' | 'lookbook' | 'atelier' | 'patron'>('maison');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isBespokeModalOpen, setIsBespokeModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const [userMeasurements, setUserMeasurements] = useState<UserMeasurements>({
    bust: 36,
    waist: 28,
    hips: 40,
    shoulder: 15.5,
    height: 67,
    unit: 'inches',
  });

  // Pre-seed cart with 1 sample item so user can immediately experience cart interactions
  useEffect(() => {
    setCart([
      {
        product: PRODUCTS[0],
        quantity: 1,
        selectedColor: PRODUCTS[0].colors[0],
        selectedSize: 'M',
      },
    ]);
  }, []);

  const addToCart = (product: Product, size?: string, color?: string, qty: number = 1) => {
    const chosenSize = size || product.sizes[0];
    const chosenColor = color || product.colors[0];

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor === chosenColor
      );
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: qty,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
        },
      ];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
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
    if (clean === 'VELORIA' || clean === 'TKQ50' || clean === 'TRACEY') {
      setPromoCode(clean);
      setDiscountPercent(15);
      return true;
    }
    return false;
  };

  const updateMeasurements = (patch: Partial<UserMeasurements>) => {
    setUserMeasurements((prev) => ({ ...prev, ...patch }));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountMultiplier = discountPercent > 0 ? (100 - discountPercent) / 100 : 1;
  const cartTotal = Math.round(cartSubtotal * discountMultiplier);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        activeTab,
        quickViewProduct,
        isBespokeModalOpen,
        isCartDrawerOpen,
        isSearchOpen,
        promoCode,
        discountPercent,
        userMeasurements,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        setActiveTab,
        setQuickViewProduct,
        setIsBespokeModalOpen,
        setIsCartDrawerOpen,
        setIsSearchOpen,
        applyPromoCode,
        updateMeasurements,
        cartCount,
        cartSubtotal,
        cartTotal,
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
