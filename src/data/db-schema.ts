export interface ProductVariant {
  id: string;
  size: string;
  colorName: string;
  colorHex: string;
  stock: number;
  sku: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  fitsTrueToSize: number; // 0 to 100%
  photos?: string[];
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  categoryId: string;
  collectionId: string;
  priceGhc: number;
  originalPriceGhc?: number;
  discountPercent?: number;
  isNew: boolean;
  isTrending: boolean;
  isSpotlight: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: Array<{ name: string; hex: string }>;
  sizes: string[];
  variants: ProductVariant[];
  fabric: string;
  craftsmanship: string;
  description: string;
  careInstructions: string;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  completeTheLookIds?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  image: string;
  description: string;
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  season: string;
  year: number;
  coverImage: string;
  description: string;
  hotspots: Array<{
    id: string;
    productId: string;
    xPercent: number; // 0-100% position
    yPercent: number; // 0-100% position
  }>;
}

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Styling Guide' | 'Behind The Scenes' | 'Press' | 'Heritage';
  author: string;
  readTime: string;
  date: string;
  heroImage: string;
  excerpt: string;
  content: string;
  shoppableProductId?: string;
  tags: string[];
}

export interface StoreLocation {
  id: string;
  name: string;
  area: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  googleMapsUrl: string;
  isFlagship: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  size: string;
  colorName: string;
  quantity: number;
  priceGhc: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  deliveryZone: 'Accra Metro' | 'Tema / Spintex' | 'Kumasi' | 'Takoradi' | 'Nationwide Express';
  deliveryFeeGhc: number;
  deliveryMethod: 'Standard Courier (2-3 Days)' | 'Express Same-Day Priority';
  paymentMethod: 'MTN Mobile Money' | 'Telecel Cash' | 'AirtelTigo Money' | 'Credit / Debit Card' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending';
  subtotalGhc: number;
  discountGhc: number;
  totalGhc: number;
  status: 'Packed' | 'Shipped' | 'Delivered' | 'Returned';
  date: string;
  estimatedDelivery: string;
  items: OrderItem[];
  riderName?: string;
  riderPhone?: string;
  trackingTimeline: Array<{ title: string; time: string; completed: boolean }>;
}

export interface BespokeEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: 'Bespoke Tailoring' | 'Bridal' | 'Red Carpet' | 'Bulk / Corporate';
  preferredDate: string;
  budgetGhc?: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Fitting Scheduled' | 'Completed';
}
