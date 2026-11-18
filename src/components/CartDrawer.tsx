'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartTotal,
    discountPercent,
    promoCode,
    applyPromoCode,
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyPromoCode(inputCode);
    if (success) {
      setPromoMessage({ text: '15% Extra Discount Applied!', success: true });
    } else {
      setPromoMessage({ text: 'Invalid code. Try "TKQ50" or "VELORIA"', success: false });
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        clearCart();
        setOrderComplete(false);
        setIsCartDrawerOpen(false);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#183015] text-white shadow-2xl flex flex-col border-l border-[#2A4E1F]">
          {/* Header */}
          <div className="p-6 border-b border-[#2A4E1F] flex items-center justify-between bg-[#122410]">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#C8E96B]" />
              <h3 className="font-serif font-black text-xl tracking-tight text-white">
                YOUR BAG ({cart.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-[#2A4E1F] text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Order Completed Success Screen */}
          {orderComplete ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#C8E96B] text-[#122410] flex items-center justify-center shadow-2xl animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="font-serif font-black text-2xl text-white">
                Order Confirmed!
              </h4>
              <p className="text-sm text-gray-300 font-light">
                Thank you for acquiring Tracey Kuukua Quansah couture. Your order has been dispatched to our Accra atelier for white-glove packaging.
              </p>
              <div className="inline-block bg-[#2A4E1F] px-4 py-1.5 rounded-full text-xs font-mono text-[#C8E96B]">
                REF: TKQ-2025-0891
              </div>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <ShoppingBag className="w-14 h-14 text-gray-600 stroke-1" />
                    <p className="text-base font-serif text-gray-300">Your bag is currently empty.</p>
                    <p className="text-xs text-gray-500 max-w-xs font-light">
                      Explore our ready-to-wear archive or bespoke atelier to discover pieces tailored for you.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-4 p-4 rounded-2xl bg-[#1E3D1A] border border-[#2A4E1F] relative group"
                    >
                      <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#2A4E1F] flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-serif font-bold text-sm text-white truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-gray-400 hover:text-red-400 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-300 mt-0.5">
                            Size: <span className="text-[#C8E96B] font-bold">{item.selectedSize}</span> · Color:{' '}
                            <span
                              className="inline-block w-2.5 h-2.5 rounded-full align-middle ml-0.5 border border-white/40"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="font-serif font-bold text-base text-[#C8E96B]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>

                          <div className="flex items-center gap-2 bg-[#2A4E1F] rounded-lg p-1 border border-[#3A662C]">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:text-[#C8E96B]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:text-[#C8E96B]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo & Summary Footer */}
              {cart.length > 0 && (
                <div className="p-6 bg-[#122410] border-t border-[#2A4E1F] space-y-4">
                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="space-y-1.5">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Promo code (e.g. TKQ50)"
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          className="w-full bg-[#1E3D1A] border border-[#2A4E1F] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8E96B]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#2A4E1F] hover:bg-[#C8E96B] hover:text-[#122410] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p
                        className={`text-xs ${
                          promoMessage.success ? 'text-[#C8E96B]' : 'text-red-400'
                        }`}
                      >
                        {promoMessage.text}
                      </p>
                    )}
                  </form>

                  {/* Calculations */}
                  <div className="space-y-2 text-xs text-gray-300 pt-2 border-t border-[#2A4E1F]/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-serif font-bold text-white">${cartSubtotal.toFixed(2)}</span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-[#C8E96B]">
                        <span>Promo Code ({promoCode})</span>
                        <span>-{discountPercent}%</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping (DHL Express)</span>
                      <span className="text-[#C8E96B] font-bold">COMPLIMENTARY</span>
                    </div>

                    <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-[#2A4E1F]">
                      <span>Total</span>
                      <span className="text-[#C8E96B]">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleSimulateCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-white hover:bg-[#F4F1EA] text-[#1E3D1A] rounded-full font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    {isCheckingOut ? (
                      <Sparkles className="w-5 h-5 animate-spin text-[#1E3D1A]" />
                    ) : (
                      <>
                        <span>PROCEED TO CHECKOUT</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
