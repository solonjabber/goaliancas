import { create } from 'zustand'
import { Product, ProductCategory, MetalType, ProductFilters } from './types'

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

interface FilterState {
  filters: ProductFilters
  filteredProducts: Product[]
  allProducts: Product[]
  isLoading: boolean
  setCategory: (category: ProductCategory, checked: boolean) => void
  setMetalType: (metalType: MetalType, checked: boolean) => void
  setCollection: (collection: string, checked: boolean) => void
  setPriceRange: (min: number, max: number) => void
  setSearchQuery: (query: string) => void
  toggleInStockOnly: () => void
  clearFilters: () => void
  applyFilters: () => void
  loadProducts: () => Promise<void>
}

const initialFilters: ProductFilters = {
  categories: [],
  metalTypes: [],
  collections: [],
  inStockOnly: false,
  searchQuery: '',
}

// Helper para mapear produtos do Payload
function mapPayloadProduct(payloadProduct: any): Product {
  const PAYLOAD_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

  // Mapear imagens
  const images = payloadProduct.gallery?.map((item: any) => {
    const media = item.media
    if (!media) return ''
    // Se media é um objeto com URL
    if (typeof media === 'object' && media.url) {
      return media.url.startsWith('http') ? media.url : `${PAYLOAD_URL}${media.url}`
    }
    // Se media é apenas um ID
    if (typeof media === 'string') {
      return `${PAYLOAD_URL}/api/media/${media}`
    }
    return ''
  }).filter(Boolean) || []

  return {
    id: payloadProduct.id,
    name: payloadProduct.name,
    slug: payloadProduct.slug,
    description: payloadProduct.description,
    price: payloadProduct.price,
    images,
    category: payloadProduct.category?.slug || payloadProduct.category || '',
    metalType: payloadProduct.material,
    collection: payloadProduct.productCollection,
    weight: payloadProduct.weight,
    inStock: payloadProduct.inStock,
    featured: payloadProduct.featured,
    discount: payloadProduct.salePrice ? Math.round((1 - payloadProduct.salePrice / payloadProduct.price) * 100) : undefined,
    specifications: [],
    customizable: payloadProduct.allowCustomization,
    keywords: [],
    tags: payloadProduct.tags || [],
  } as Product
}

export const useFilterStore = create<FilterState>((set, get) => ({
  filters: initialFilters,
  filteredProducts: [],
  allProducts: [],
  isLoading: false,

  loadProducts: async () => {
    set({ isLoading: true })
    try {
      // Adicionar depth=1 para popular relacionamentos (categoria)
      const response = await fetch(`${PAYLOAD_API_URL}/api/products?limit=100&where[status][equals]=published&depth=1`)

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }

      const data = await response.json()

      console.log('[LOAD_PRODUCTS] Produtos carregados:', data?.docs?.length)
      console.log('[LOAD_PRODUCTS] Exemplo de produto:', data?.docs?.[0])

      const products = (data?.docs || []).map(mapPayloadProduct)

      console.log('[LOAD_PRODUCTS] Produtos mapeados:', products.length)
      console.log('[LOAD_PRODUCTS] Exemplo mapeado:', products[0])
      console.log('[LOAD_PRODUCTS] Categorias dos produtos:', products.map(p => ({ name: p.name, category: p.category })))

      set({ allProducts: products, filteredProducts: products, isLoading: false })
    } catch (error) {
      console.error('Erro ao carregar produtos do Payload, usando dados mock:', error)

      // Fallback: carregar dados mock
      const { PRODUCTS } = await import('./mock-data')
      console.log('[LOAD_PRODUCTS] Usando dados mock:', PRODUCTS.length, 'produtos')

      set({ allProducts: PRODUCTS, filteredProducts: PRODUCTS, isLoading: false })
    }
  },

  setCategory: (category, checked) => {
    set((state) => {
      const categories = checked
        ? [...state.filters.categories, category]
        : state.filters.categories.filter((c) => c !== category)
      return {
        filters: { ...state.filters, categories },
      }
    })
    get().applyFilters()
  },

  setMetalType: (metalType, checked) => {
    set((state) => {
      const metalTypes = checked
        ? [...state.filters.metalTypes, metalType]
        : state.filters.metalTypes.filter((m) => m !== metalType)
      return {
        filters: { ...state.filters, metalTypes },
      }
    })
    get().applyFilters()
  },

  setCollection: (collection, checked) => {
    set((state) => {
      const collections = checked
        ? [...state.filters.collections, collection]
        : state.filters.collections.filter((c) => c !== collection)
      return {
        filters: { ...state.filters, collections },
      }
    })
    get().applyFilters()
  },

  setPriceRange: (min, max) => {
    set((state) => ({
      filters: { ...state.filters, priceRange: { min, max } },
    }))
    get().applyFilters()
  },

  setSearchQuery: (query) => {
    set((state) => ({
      filters: { ...state.filters, searchQuery: query },
    }))
    get().applyFilters()
  },

  toggleInStockOnly: () => {
    set((state) => ({
      filters: { ...state.filters, inStockOnly: !state.filters.inStockOnly },
    }))
    get().applyFilters()
  },

  clearFilters: () => {
    set({ filters: initialFilters })
    get().applyFilters()
  },

  applyFilters: () => {
    const { filters, allProducts } = get()
    let products = [...allProducts]

    console.log('[APPLY_FILTERS] Filtros de categoria:', filters.categories)
    console.log('[APPLY_FILTERS] Categorias disponíveis:', [...new Set(allProducts.map(p => p.category))])

    // Filter by categories
    if (filters.categories.length > 0) {
      const beforeCount = products.length
      products = products.filter((p) => {
        const match = filters.categories.includes(p.category)
        if (!match && beforeCount > 0) {
          console.log('[APPLY_FILTERS] Produto rejeitado:', p.name, 'categoria:', p.category, 'filtros:', filters.categories)
        }
        return match
      })
      console.log('[APPLY_FILTERS] Após filtro de categoria:', products.length, 'produtos (antes:', beforeCount, ')')
    }

    // Filter by metal types
    if (filters.metalTypes.length > 0) {
      products = products.filter((p) => filters.metalTypes.includes(p.metalType))
    }

    // Filter by collections
    if (filters.collections.length > 0) {
      products = products.filter(
        (p) => p.collection && filters.collections.includes(p.collection)
      )
    }

    // Filter by price range
    if (filters.priceRange) {
      products = products.filter(
        (p) =>
          p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max
      )
    }

    // Filter by stock
    if (filters.inStockOnly) {
      products = products.filter((p) => p.inStock)
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.collection?.toLowerCase().includes(query)
      )
    }

    set({ filteredProducts: products })
  },
}))
