'use client';

import React, { useState } from 'react';
import { Check, Plus, X, Search, Sparkles } from 'lucide-react';

export interface ColorItem {
  name: string;
  hex: string;
  category?: 'neutrals' | 'metals' | 'greens' | 'blues' | 'reds' | 'purples' | 'yellows';
}

export const WORLD_FASHION_COLORS: ColorItem[] = [
  // Neutrals & Classics
  { name: 'Obsidian Black', hex: '#111113', category: 'neutrals' },
  { name: 'Pure White', hex: '#FFFFFF', category: 'neutrals' },
  { name: 'Ivory Cream', hex: '#FFFDD0', category: 'neutrals' },
  { name: 'Sand Beige', hex: '#D9CBB8', category: 'neutrals' },
  { name: 'Warm Taupe', hex: '#B38B6D', category: 'neutrals' },
  { name: 'Charcoal Gray', hex: '#36454F', category: 'neutrals' },
  { name: 'Slate Gray', hex: '#708090', category: 'neutrals' },
  { name: 'Khaki Stone', hex: '#C3B091', category: 'neutrals' },

  // Golds, Metals & Earth
  { name: 'Royal Gold', hex: '#D4AF37', category: 'metals' },
  { name: 'Warm Amber Gold', hex: '#FFBF00', category: 'metals' },
  { name: 'Antique Brass', hex: '#B5A642', category: 'metals' },
  { name: 'Rich Copper', hex: '#B87333', category: 'metals' },
  { name: 'Metallic Bronze', hex: '#CD7F32', category: 'metals' },
  { name: 'Champagne Silk', hex: '#F7E7CE', category: 'metals' },
  { name: 'Metallic Silver', hex: '#C0C0C0', category: 'metals' },
  { name: 'Terracotta Earth', hex: '#E2725B', category: 'metals' },
  { name: 'Rich Espresso', hex: '#3D2314', category: 'metals' },

  // Greens & Forest
  { name: 'Emerald Green', hex: '#1E3A2E', category: 'greens' },
  { name: 'Atelier Forest Green', hex: '#0F1F17', category: 'greens' },
  { name: 'Olive Green', hex: '#556B2F', category: 'greens' },
  { name: 'Sage Green', hex: '#9CAF88', category: 'greens' },
  { name: 'Jade Green', hex: '#00A86B', category: 'greens' },
  { name: 'Mint Green', hex: '#98FF98', category: 'greens' },
  { name: 'Moss Green', hex: '#8A9A5B', category: 'greens' },

  // Blues & Teals
  { name: 'Midnight Navy', hex: '#0A192F', category: 'blues' },
  { name: 'Royal Blue', hex: '#4169E1', category: 'blues' },
  { name: 'Deep Sapphire', hex: '#0F52BA', category: 'blues' },
  { name: 'Ocean Teal', hex: '#008080', category: 'blues' },
  { name: 'Powder Sky Blue', hex: '#87CEEB', category: 'blues' },
  { name: 'Turquoise', hex: '#40E0D0', category: 'blues' },
  { name: 'Cobalt Blue', hex: '#0047AB', category: 'blues' },

  // Reds, Corals & Pinks
  { name: 'Ruby Crimson', hex: '#9B111E', category: 'reds' },
  { name: 'Burgundy Wine', hex: '#800020', category: 'reds' },
  { name: 'Scarlet Red', hex: '#FF2400', category: 'reds' },
  { name: 'Warm Coral', hex: '#FF7F50', category: 'reds' },
  { name: 'Blush Pink', hex: '#FFD1DC', category: 'reds' },
  { name: 'Dusty Rose', hex: '#DCAE96', category: 'reds' },
  { name: 'Electric Fuchsia', hex: '#FF007F', category: 'reds' },

  // Purples & Violets
  { name: 'Imperial Purple', hex: '#66023C', category: 'purples' },
  { name: 'Deep Violet', hex: '#4B0082', category: 'purples' },
  { name: 'Lavender Mist', hex: '#E6E6FA', category: 'purples' },
  { name: 'Plum Silk', hex: '#8E4585', category: 'purples' },

  // Yellows & Oranges
  { name: 'Mustard Ochre', hex: '#E1AD01', category: 'yellows' },
  { name: 'Sunburst Yellow', hex: '#FFD700', category: 'yellows' },
  { name: 'Sunset Tangerine', hex: '#FF5E00', category: 'yellows' },
  { name: 'Warm Peach', hex: '#FFE5B4', category: 'yellows' },
];

export interface ColorPaletteSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function parseColorsString(input: string): { name: string; hex: string }[] {
  if (!input) return [];
  return input
    .split(',')
    .map((item) => {
      const parts = item.split(':').map((s) => s.trim());
      if (parts.length >= 2) {
        return { name: parts[0], hex: parts[1] };
      } else if (parts[0]) {
        return { name: parts[0], hex: '#1E3A2E' };
      }
      return null;
    })
    .filter((c): c is { name: string; hex: string } => c !== null);
}

export function serializeColors(colors: { name: string; hex: string }[]): string {
  return colors.map((c) => `${c.name}: ${c.hex}`).join(', ');
}

export default function ColorPaletteSelector({ value, onChange }: ColorPaletteSelectorProps) {
  const currentColors = parseColorsString(value);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customName, setCustomName] = useState('');
  const [customHex, setCustomHex] = useState('#D4AF37');

  const isColorSelected = (hex: string, name: string) => {
    return currentColors.some(
      (c) => c.hex.toLowerCase() === hex.toLowerCase() || c.name.toLowerCase() === name.toLowerCase()
    );
  };

  const toggleColor = (color: ColorItem) => {
    if (isColorSelected(color.hex, color.name)) {
      const filtered = currentColors.filter(
        (c) => c.hex.toLowerCase() !== color.hex.toLowerCase() && c.name.toLowerCase() !== color.name.toLowerCase()
      );
      onChange(serializeColors(filtered));
    } else {
      const updated = [...currentColors, { name: color.name, hex: color.hex }];
      onChange(serializeColors(updated));
    }
  };

  const removeColor = (indexToRemove: number) => {
    const updated = currentColors.filter((_, idx) => idx !== indexToRemove);
    onChange(serializeColors(updated));
  };

  const handleAddCustomColor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const name = customName.trim();
    if (!isColorSelected(customHex, name)) {
      const updated = [...currentColors, { name, hex: customHex }];
      onChange(serializeColors(updated));
      setCustomName('');
    }
  };

  const filteredCatalog = WORLD_FASHION_COLORS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.hex.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-3 bg-[#FBFBFC] rounded-2xl p-4 border border-[#E6E6EA]">
      {/* 1. Header & Active Selected Color Tags */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-[#111113] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Garment Available Colors In Stock ({currentColors.length})</span>
          </label>
          <span className="text-[10px] text-[#8A8A8F]">Click any swatch below to add / remove</span>
        </div>

        {/* Selected Badges */}
        {currentColors.length === 0 ? (
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium">
            No colors selected yet. Choose one or more worldly fashion colors from the palette below.
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-xl border border-[#E6E6EA] min-h-[44px] items-center">
            {currentColors.map((c, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-full text-xs font-bold bg-[#F4F4F6] border border-[#E6E6EA] text-[#111113] shadow-xs group"
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
                <button
                  type="button"
                  onClick={() => removeColor(i)}
                  className="w-4 h-4 rounded-full hover:bg-black/10 flex items-center justify-center text-[#8A8A8F] hover:text-[#E5384F] transition-colors cursor-pointer"
                  title="Remove color"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 2. Search & Category Filters */}
      <div className="space-y-2 pt-1 border-t border-[#E6E6EA]">
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
          {/* Quick Search */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search colors: e.g. Gold, Emerald, Navy, Coral..."
              className="w-full h-9 pl-8 pr-3 bg-white border border-[#E6E6EA] rounded-xl text-xs placeholder-gray-400 outline-none focus:border-[#111113]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 text-[11px] font-semibold">
            {[
              { id: 'all', label: 'All Colors' },
              { id: 'metals', label: 'Golds & Earth' },
              { id: 'greens', label: 'Greens' },
              { id: 'blues', label: 'Blues' },
              { id: 'reds', label: 'Reds & Pinks' },
              { id: 'neutrals', label: 'Neutrals' },
              { id: 'purples', label: 'Purples' },
              { id: 'yellows', label: 'Yellows' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#111113] text-white shadow-xs'
                    : 'bg-white text-[#8A8A8F] hover:text-[#111113] border border-[#E6E6EA]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. World Fashion Color Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-56 overflow-y-auto p-1 pr-1.5 scrollbar-thin">
          {filteredCatalog.map((color) => {
            const isSelected = isColorSelected(color.hex, color.name);
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => toggleColor(color)}
                className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E3A2E] text-white border-[#1E3A2E] shadow-sm font-bold'
                    : 'bg-white hover:bg-[#F5F5F7] text-[#111113] border-[#E6E6EA]'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <span
                    className="w-5 h-5 rounded-full block border border-black/20 shadow-xs"
                    style={{ backgroundColor: color.hex }}
                  />
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] truncate block leading-tight">{color.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Custom Atelier Shade Generator */}
      <div className="pt-2 border-t border-[#E6E6EA]">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="text-[11px] font-bold text-[#8A8A8F] whitespace-nowrap">
            Or Add Custom Shade:
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-[#E6E6EA] flex-shrink-0 cursor-pointer">
              <input
                type="color"
                value={customHex}
                onChange={(e) => setCustomHex(e.target.value)}
                className="w-12 h-12 -translate-x-1 -translate-y-1 cursor-pointer border-none p-0 bg-transparent"
                title="Select custom color"
              />
            </div>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Custom shade name (e.g. Bonwire Kente Indigo)"
              className="flex-1 h-9 px-3 bg-white border border-[#E6E6EA] rounded-xl text-xs placeholder-gray-400 outline-none focus:border-[#111113]"
            />
            <button
              type="button"
              onClick={handleAddCustomColor}
              disabled={!customName.trim()}
              className="h-9 px-3.5 rounded-xl bg-[#111113] disabled:opacity-40 text-white text-xs font-semibold hover:bg-[#3A3A3F] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
