'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, Check } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, setActiveView } = useStore();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email, name || (mode === 'login' ? 'Ama Mensah-Bonsu' : name));
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsAuthModalOpen(false);
      setActiveView('account');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 z-10 shadow-2xl text-[#111113] border border-[#E6E6EA] my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#EDEDF0] hover:bg-[#E6E6EA] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-[#111113]" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1 mb-6">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-[#8A8A8F] uppercase block">
            TRACEY KUUKUA QUANSAH
          </span>
          <h2 className="text-2xl font-bold text-[#111113]">
            {mode === 'login' ? 'Welcome Back' : 'Join the Atelier'}
          </h2>
          <p className="text-xs text-[#8A8A8F]">
            {mode === 'login'
              ? 'Access your private wardrobe archive, orders, and style points.'
              : 'Create a patron profile to receive invitations and earn points.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-full bg-[#EDEDF0] p-1 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              mode === 'login' ? 'bg-white text-[#111113] shadow-sm' : 'text-[#8A8A8F]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              mode === 'register' ? 'bg-white text-[#111113] shadow-sm' : 'text-[#8A8A8F]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Social Login: 3 across, 56px high each, 12px gap, white bg, border */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Google */}
          <button
            onClick={() => {
              loginUser('ama.mensah@gmail.com', 'Ama Mensah-Bonsu');
              setIsAuthModalOpen(false);
              setActiveView('account');
            }}
            className="h-14 rounded-full border border-[#E6E6EA] bg-white hover:bg-[#F5F5F7] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm text-xs font-medium text-[#111113]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="hidden sm:inline">Google</span>
          </button>

          {/* Apple */}
          <button
            onClick={() => {
              loginUser('ama.mensah@icloud.com', 'Ama Mensah-Bonsu');
              setIsAuthModalOpen(false);
              setActiveView('account');
            }}
            className="h-14 rounded-full border border-[#E6E6EA] bg-white hover:bg-[#F5F5F7] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm text-xs font-medium text-[#111113]"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2.03.6-2.68 1.36-.58.67-.99 1.74-.88 2.78 1.02.08 2.03-.52 2.64-1.27z" />
            </svg>
            <span className="hidden sm:inline">Apple</span>
          </button>

          {/* Guest Direct */}
          <button
            onClick={() => {
              setIsAuthModalOpen(false);
            }}
            className="h-14 rounded-full border border-[#E6E6EA] bg-white hover:bg-[#F5F5F7] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm text-xs font-medium text-[#111113]"
          >
            <Sparkles className="w-4 h-4 text-[#6B73F0]" />
            <span className="hidden sm:inline">Guest</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[#E6E6EA] w-full" />
          <span className="bg-white px-3 text-[11px] text-[#8A8A8F] uppercase tracking-wider absolute">
            Or with email
          </span>
        </div>

        {/* Inputs & Form: 56px high, white bg, 1px border, pill, 20px left icon, padding 0 20px */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div className="relative">
              <User className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-[#8A8A8F]" />
              <input
                type="text"
                required
                placeholder="Full Name (e.g. Ama Mensah)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 pl-12 pr-5 rounded-full bg-white border border-[#E6E6EA] text-sm text-[#111113] placeholder-[#8A8A8F] outline-none focus:border-[#6B73F0] transition-all"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-[#8A8A8F]" />
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 pl-12 pr-5 rounded-full bg-white border border-[#E6E6EA] text-sm text-[#111113] placeholder-[#8A8A8F] outline-none focus:border-[#6B73F0] transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-[#8A8A8F]" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 pl-12 pr-12 rounded-full bg-white border border-[#E6E6EA] text-sm text-[#111113] placeholder-[#8A8A8F] outline-none focus:border-[#6B73F0] transition-all"
            />
            {/* Show/hide password eye: 40x40px tap target */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#8A8A8F] hover:text-[#111113] cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Primary CTA (Log In, Continue): 56px high, full width, padding 0 24px, ink bg, white text, pill */}
          <button
            type="submit"
            className="w-full h-14 rounded-full bg-[#111113] text-white text-[15px] font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-[#3A3A3F] transition-all cursor-pointer mt-4"
          >
            {isSuccess ? (
              <span className="flex items-center gap-1.5 text-[#1F8A4C]">
                <Check className="w-5 h-5" />
                <span>Authenticated ✓</span>
              </span>
            ) : (
              <span>{mode === 'login' ? 'Log In to Atelier' : 'Create Account'}</span>
            )}
          </button>
        </form>

        <p className="text-[11px] text-[#8A8A8F] text-center mt-4">
          By signing in, you agree to Tracey KQ's Terms of Luxury Service and Privacy Policy. Handcrafted in Ghana.
        </p>
      </div>
    </div>
  );
}
