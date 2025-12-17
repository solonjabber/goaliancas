import { create } from 'zustand'
import { Product, ProductCategory, MetalType, ProductFilters } from './types'
import { mockProducts } from './mock-data'

interface FilterState {
  filters: ProductFilters
  filteredProducts: Product[]
  setCategory: (category: ProductCategory, checked: boolean) => void
  setMetalType: (metalType: MetalType, checked: boolean) => void
  setCollection: (collection: string, checked: boolean) => void
  setPriceRange: (min: number, max: number) => void
  setSearchQuery: (query: string) => void
  toggleInStockOnly: () => void
  clearFilters: () => void
  applyFilters: () => void
}

const initialFilters: ProductFilters = {
  categories: [],
  metalTypes: [],
  collections: [],
  inStockOnly: false,
  searchQuery: '',
}

export const useFilterStore = create<FilterState>((set, get) => ({
  filters: initialFilters,
  filteredProducts: mockProducts,

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
    const { filters } = get()
    let products = [...mockProducts]

    // Filter by categories
    if (filters.categories.length > 0) {
      products = products.filter((p) => filters.categories.includes(p.category))
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
