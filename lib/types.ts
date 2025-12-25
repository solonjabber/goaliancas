// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: ProductCategory
  metalType: MetalType
  collection?: string
  weight?: number // em gramas
  width?: number // em mm
  thickness?: number // em mm
  inStock: boolean
  featured?: boolean
  discount?: number
  specifications?: string[]
  customizable?: boolean
  // Novos campos para busca avançada
  keywords?: string[]
  gender?: ProductGender
  finish?: ProductFinish[]
  stones?: ProductStone[]
  hasEngraving?: boolean
  availability?: ProductAvailability
  popularity?: number
  createdAt?: Date
  tags?: string[]
  searchScore?: number
}

export enum ProductCategory {
  ALIANCAS_CASAMENTO = 'aliancas-de-casamento',
  ALIANCAS_NOIVADO = 'aliancas-de-noivado',
  ANEIS = 'aneis',
  ANEIS_FORMATURA = 'aneis-de-formatura',
}

export enum MetalType {
  OURO_18K_AMARELO = 'ouro-18k-amarelo',
  OURO_18K_BRANCO = 'ouro-18k-branco',
  OURO_18K_ROSE = 'ouro-18k-rose',
}

export enum ProductGender {
  MASCULINA = 'masculina',
  FEMININA = 'feminina',
  PAR = 'par',
  UNISSEX = 'unissex',
}

export enum ProductFinish {
  POLIDO = 'polido',
  FOSCO = 'fosco',
  DIAMANTADO = 'diamantado',
  ESCOVADO = 'escovado',
  TEXTURIZADO = 'texturizado',
}

export enum ProductStone {
  SEM_PEDRA = 'sem-pedra',
  DIAMANTE = 'diamante',
  ZIRCONIA = 'zirconia',
  BRILHANTE = 'brilhante',
}

export enum ProductAvailability {
  PRONTA_ENTREGA = 'pronta-entrega',
  SOB_ENCOMENDA = 'sob-encomenda',
  PRE_VENDA = 'pre-venda',
}

// Filter Types
export interface ProductFilters {
  categories: ProductCategory[]
  metalTypes: MetalType[]
  priceRange?: {
    min: number
    max: number
  }
  collections: string[]
  inStockOnly: boolean
  searchQuery?: string
  // Novos filtros avançados
  genders?: ProductGender[]
  widthRange?: {
    min: number
    max: number
  }
  finishes?: ProductFinish[]
  stones?: ProductStone[]
  hasEngraving?: boolean
  customizableOnly?: boolean
  availability?: ProductAvailability[]
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'popular' | 'name'
}

// Search Synonyms Map
export const SEARCH_SYNONYMS: Record<string, string[]> = {
  'ouro': ['gold', 'au', 'dourado'],
  'prata': ['silver', 'ag', 'prateado'],
  'aliança': ['alianca', 'anel', 'ring', 'argola'],
  'casamento': ['wedding', 'matrimonio', 'matrimônio', 'noiva', 'noivo'],
  'noivado': ['engagement', 'compromisso', 'pedido'],
  'diamante': ['diamond', 'brilhante', 'pedra'],
  'feminina': ['mulher', 'feminino', 'woman', 'dama', 'senhora'],
  'masculina': ['homem', 'masculino', 'man', 'cavalheiro', 'senhor'],
  'par': ['casal', 'dupla', 'dois', '2'],
  'fosco': ['fosca', 'matte', 'opaco'],
  'polido': ['polida', 'brilhante', 'liso'],
}

// Cart Types
export interface CartItem {
  product: Product
  quantity: number
  customization?: string
}

export interface Cart {
  items: CartItem[]
  total: number
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  items: CartItem[]
  subtotal: number
  discount: number
  total: number
  status: OrderStatus
  customerName: string
  customerEmail: string
  customerPhone: string
  deliveryAddress?: Address
  paymentMethod: PaymentMethod
  createdAt: Date
  updatedAt: Date
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  PIX = 'pix',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BANK_TRANSFER = 'bank_transfer',
}

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}
