export type PageType = 
  | 'home' 
  | 'shop' 
  | 'products' 
  | 'workshop' 
  | 'about' 
  | 'custom-manufacturing' 
  | 'quality' 
  | 'gallery' 
  | 'contact'
  | 'admin'
  | 'privacy'
  | 'terms';

export type ProductCategory = 
  | 'work-safety-gloves'
  | 'tactical-motorcycle-gloves'
  | 'sports-fitness-gloves'
  | 'leather-collection'
  | 'sportswear-apparel'
  | 'custom-oem';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  description: string;
  image: string;
  galleryImages: string[];
  materials: string[];
  colors: string[];
  sizes: string[];
  moq: string;
  sampleAvailable: boolean;
  leadTime: string;
  features: string[];
  brandingOptions: string[];
  packagingOptions: string[];
  salesMode: 'b2b_quote' | 'retail_direct';
  retailPrice?: number; // Only for retail items if set
  inStock?: boolean;
}

export interface QuoteRequest {
  id?: string;
  fullName: string;
  companyName: string;
  email: string;
  country: string;
  phoneOrWhatsApp: string;
  productCategory: string;
  productName?: string;
  estimatedQuantity: string;
  materials: string;
  colors: string;
  sizes: string;
  brandingRequirements: string;
  packagingRequirements: string;
  targetDeliveryDate?: string;
  additionalNotes?: string;
  privacyConsent: boolean;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  isQuoteInquiry?: boolean;
}
