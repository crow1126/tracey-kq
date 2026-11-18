export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Women' | 'Men' | 'Accessories' | 'Best Seller' | 'New In' | 'Sale';
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  colors: string[];
  sizes: string[];
  description: string;
  details: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'tkq-01',
    name: 'BROWN SUITE',
    subtitle: 'Signature tailored textured wool set',
    category: 'Women',
    price: 65,
    originalPrice: 130,
    discountPercent: 50,
    isNew: true,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    ],
    colors: ['#4A6B35', '#2E4720', '#C8E96B', '#D8CBB5'],
    sizes: ['XS', 'S', 'M', 'L', 'Bespoke'],
    description: 'An architectural piece combining heritage silhouette with contemporary minimalism. Tailored with precision from heavy structured fabric.',
    details: '100% Handcrafted Wool Blend; Silk lining; Recycled brass buttons; Dry clean only.',
  },
  {
    id: 'tkq-02',
    name: 'FORMAL SHIRT',
    subtitle: 'High-neck emerald silk button-down',
    category: 'Accessories',
    price: 57,
    originalPrice: 114,
    discountPercent: 50,
    isNew: false,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    ],
    colors: ['#2A4E1F', '#1E3D1A', '#8BC34A'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Effortless luxury designed for evening galas and distinguished everyday presence. Fluid draping with mother-of-pearl accents.',
    details: 'Mulberry silk crepe de chine; Covered placket; Made in Accra.',
  },
  {
    id: 'tkq-03',
    name: 'CHOCO SUTE',
    subtitle: 'Double-breasted trench in deep moss',
    category: 'Women',
    price: 95,
    originalPrice: 190,
    discountPercent: 50,
    isNew: true,
    rating: 5.0,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    ],
    colors: ['#284420', '#3D612F', '#E5E0D8'],
    sizes: ['XS', 'S', 'M', 'L', 'Bespoke'],
    description: 'Sculptural luxury coat boasting wide collar lapels and matching embossed woven leather handbag.',
    details: 'Heavy organic cotton gabardine; Water-resistant finish; Custom monogram lining.',
  },
  {
    id: 'tkq-04',
    name: 'GREEN SUTE',
    subtitle: 'Classic minimal outerwear set',
    category: 'Best Seller',
    price: 85,
    originalPrice: 170,
    discountPercent: 50,
    isNew: false,
    rating: 4.9,
    reviewsCount: 176,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    ],
    colors: ['#3A5C2D', '#1B3516', '#C8E96B'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Tailored for versatility and commanding posture. An essential investment piece for modern connoisseurs.',
    details: 'Italian merino wool; Hand-finished seams; Made-to-measure ready.',
  },
  {
    id: 'tkq-05',
    name: 'FORMAL SUTE',
    subtitle: 'Oversized structured olive jacket',
    category: 'New In',
    price: 75,
    originalPrice: 150,
    discountPercent: 50,
    isNew: true,
    rating: 4.7,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
    ],
    colors: ['#446A36', '#223B1B', '#F1EDE4'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Clean geometry and intentional ease. Paired seamlessly with voluminous trousers and minimal footwear.',
    details: 'Breathable linen-wool blend; horn buttons; internal ticket pocket.',
  },
  {
    id: 'tkq-06',
    name: 'CASUAL SHIRT',
    subtitle: 'Deep plum cashmere knit cardigan',
    category: 'Men',
    price: 70,
    originalPrice: 140,
    discountPercent: 50,
    isNew: false,
    rating: 4.9,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
    ],
    colors: ['#4A2E35', '#243C1E', '#9E988D'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Ultra-soft tactile knit crafted for chilly city evenings and tranquil resort getaways.',
    details: '100% Mongolian Cashmere; Ribbed hems; Relaxed fit.',
  },
  {
    id: 'tkq-07',
    name: 'MANS JACKET',
    subtitle: 'Sage green knit button-front polo',
    category: 'Men',
    price: 85,
    originalPrice: 170,
    discountPercent: 50,
    isNew: true,
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1000&q=85',
    ],
    colors: ['#C5D1BE', '#2A4E1F', '#4A4E47'],
    sizes: ['M', 'L', 'XL'],
    description: 'Sophisticated leisurewear balancing retro collar proportions with modern slim lines.',
    details: 'Extra-fine merino wool; Corozo nut buttons; Made in small batches.',
  },
  {
    id: 'tkq-08',
    name: 'GREEN JACKET',
    subtitle: 'Minimal double-breasted slate pea coat',
    category: 'Best Seller',
    price: 90,
    originalPrice: 180,
    discountPercent: 50,
    isNew: false,
    rating: 5.0,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=85',
    ],
    colors: ['#596B7A', '#22381E', '#C8E96B'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Weatherproof statement jacket engineered with clean storm flaps and stand collar.',
    details: 'Recycled technical twill; Thermal insulated core; Windproof rating 10k.',
  },
  {
    id: 'tkq-09',
    name: 'THERMAL ECO',
    subtitle: 'FROSTY WEATHER JACKET with hood',
    category: 'Sale',
    price: 75,
    originalPrice: 150,
    discountPercent: 50,
    isNew: true,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
    ],
    colors: ['#304F26', '#1A2F15', '#DDD7CB'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Eco-conscious cold weather luxury. Padded with sustainable down alternative for sublime warmth.',
    details: 'Recycled PET shell; Hypoallergenic bio-down; Water-resistant zippers.',
  },
];

export interface Lookbook {
  id: string;
  title: string;
  subtitle: string;
  season: string;
  theme: string;
  coverImage: string;
  description: string;
}

export const LOOKBOOKS: Lookbook[] = [
  {
    id: 'lb-01',
    title: 'VELORIA FASHION WORLD',
    subtitle: 'Explore bold outfits, redefine yourself, create timeless memories with fashion.',
    season: 'SS 2025',
    theme: 'Calm & Organic Minimalist Luxury',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    description: 'A study in quiet authority. Forest olive textiles meet sculptural Ghanaian silhouettes that breathe with confident grace.',
  },
  {
    id: 'lb-02',
    title: 'THE ASHANTI REGALIA',
    subtitle: 'Golden thread, royal silk and sacred geometric proportions.',
    season: 'AW 2024',
    theme: 'Ancestral Splendor & Modern Couture',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    description: 'Crowning achievements in handcrafted metallic threadwork, silk capes, and tailored waistlines inspired by the Asante court.',
  },
  {
    id: 'lb-03',
    title: 'METROPOLITAN FLORA',
    subtitle: 'Natural hues harmonized with architectural evening wear.',
    season: 'RESORT 2025',
    theme: 'Earth & High Tailoring',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    description: 'Draped silks and botanical greens cut for movement across tropical nights and cosmopolitan capitals.',
  },
];
