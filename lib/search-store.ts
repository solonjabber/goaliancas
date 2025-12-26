import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Fuse from 'fuse.js'
import { Product, ProductFilters, SEARCH_SYNONYMS } from './types'
import { useFilterStore } from './filter-store'

interface SearchState {
  // Estado
  query: string
  filters: ProductFilters
  results: Product[]
  searchHistory: string[]
  isSearching: boolean
  totalResults: number

  // Ações
  setQuery: (query: string) => void
  setFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void
  clearFilters: () => void
  performSearch: () => void
  addToHistory: (query: string) => void
  clearHistory: () => void
  getFilterCounts: () => Record<string, number>
}

// Filtros iniciais
const initialFilters: ProductFilters = {
  categories: [],
  metalTypes: [],
  collections: [],
  inStockOnly: false,
  searchQuery: '',
  genders: [],
  finishes: [],
  stones: [],
  availability: [],
  sortBy: 'relevance',
}

// Função para expandir query com sinônimos
function expandQueryWithSynonyms(query: string): string {
  let expandedQuery = query.toLowerCase()

  Object.entries(SEARCH_SYNONYMS).forEach(([key, synonyms]) => {
    synonyms.forEach(synonym => {
      if (expandedQuery.includes(synonym)) {
        expandedQuery += ` ${key}`
      }
    })
  })

  return expandedQuery
}

// Função para aplicar filtros
function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let filtered = [...products]

  console.log('[APPLY_FILTERS] Iniciando com', filtered.length, 'produtos')
  console.log('[APPLY_FILTERS] Filtros recebidos:', filters)

  // Filtro de categorias
  if (filters.categories.length > 0) {
    filtered = filtered.filter(p => filters.categories.includes(p.category))
    console.log('[APPLY_FILTERS] Após filtro de categoria:', filtered.length, 'produtos')
  }

  // Filtro de metal
  if (filters.metalTypes.length > 0) {
    filtered = filtered.filter(p => filters.metalTypes.includes(p.metalType))
    console.log('[APPLY_FILTERS] Após filtro de metal:', filtered.length, 'produtos')
  }

  // Filtro de preço
  if (filters.priceRange) {
    const before = filtered.length
    filtered = filtered.filter(p => {
      const price = p.discount ? p.price * (1 - p.discount / 100) : p.price
      return price >= (filters.priceRange?.min || 0) &&
             price <= (filters.priceRange?.max || Infinity)
    })
    console.log('[APPLY_FILTERS] Após filtro de preço:', filtered.length, '(antes:', before, ')')
  }

  // Filtro de coleção
  if (filters.collections.length > 0) {
    const before = filtered.length
    filtered = filtered.filter(p =>
      p.collection && filters.collections.includes(p.collection)
    )
    console.log('[APPLY_FILTERS] Após filtro de coleção:', filtered.length, '(antes:', before, ')')
  }

  // Filtro de estoque
  if (filters.inStockOnly) {
    const before = filtered.length
    filtered = filtered.filter(p => p.inStock)
    console.log('[APPLY_FILTERS] Após filtro de estoque:', filtered.length, '(antes:', before, ')')
  }

  // Filtro de gênero
  if (filters.genders && filters.genders.length > 0) {
    const before = filtered.length
    filtered = filtered.filter(p =>
      p.gender && filters.genders!.includes(p.gender)
    )
    console.log('[APPLY_FILTERS] Após filtro de gênero:', filtered.length, '(antes:', before, ')')
  }

  // Filtro de largura
  if (filters.widthRange) {
    const before = filtered.length
    filtered = filtered.filter(p => {
      if (!p.width) return false
      return p.width >= (filters.widthRange?.min || 0) &&
             p.width <= (filters.widthRange?.max || Infinity)
    })
    console.log('[APPLY_FILTERS] Após filtro de largura:', filtered.length, '(antes:', before, ')')
  }

  // Filtro de acabamento
  if (filters.finishes && filters.finishes.length > 0) {
    const before = filtered.length
    filtered = filtered.filter(p =>
      p.finish && p.finish.some(f => filters.finishes!.includes(f))
    )
    console.log('[APPLY_FILTERS] Após filtro de acabamento:', filtered.length, '(antes:', before, ')')
  }

  // Filtro de pedras
  if (filters.stones && filters.stones.length > 0) {
    const before = filtered.length
    filtered = filtered.filter(p =>
      p.stones && p.stones.some(s => filters.stones!.includes(s))
    )
    console.log('[APPLY_FILTERS] Após filtro de pedras:', filtered.length, '(antes:', before, ')')
  }

  // Filtro de gravação
  if (filters.hasEngraving !== undefined) {
    const before = filtered.length
    filtered = filtered.filter(p => p.hasEngraving === filters.hasEngraving)
    console.log('[APPLY_FILTERS] Após filtro de gravação:', filtered.length, '(antes:', before, ')')
  }

  // Filtro de customização
  if (filters.customizableOnly) {
    const before = filtered.length
    filtered = filtered.filter(p => p.customizable)
    console.log('[APPLY_FILTERS] Após filtro de customização:', filtered.length, '(antes:', before, ')')
  }

  // Filtro de disponibilidade
  if (filters.availability && filters.availability.length > 0) {
    const before = filtered.length
    filtered = filtered.filter(p =>
      p.availability && filters.availability!.includes(p.availability)
    )
    console.log('[APPLY_FILTERS] Após filtro de disponibilidade:', filtered.length, '(antes:', before, ')')
  }

  console.log('[APPLY_FILTERS] RESULTADO FINAL:', filtered.length, 'produtos')
  return filtered
}

// Função para ordenar resultados
function sortResults(products: Product[], sortBy: ProductFilters['sortBy']): Product[] {
  const sorted = [...products]

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => {
        const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
        const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
        return priceA - priceB
      })

    case 'price-desc':
      return sorted.sort((a, b) => {
        const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
        const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
        return priceB - priceA
      })

    case 'newest':
      return sorted.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateB - dateA
      })

    case 'popular':
      return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))

    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))

    case 'relevance':
    default:
      return sorted.sort((a, b) => (a.searchScore || 0) - (b.searchScore || 0))
  }
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      filters: initialFilters,
      results: [],
      searchHistory: [],
      isSearching: false,
      totalResults: 0,

      setQuery: (query) => {
        set({ query, isSearching: true })
        get().performSearch()
      },

      setFilter: (key, value) => {
        set(state => ({
          filters: { ...state.filters, [key]: value }
        }))
        get().performSearch()
      },

      clearFilters: () => {
        set({ filters: initialFilters })
        get().performSearch()
      },

      performSearch: () => {
        const { query, filters } = get()
        const filterStoreState = useFilterStore.getState()
        const allProducts = filterStoreState.allProducts

        // Se ainda está carregando ou não há produtos, não fazer busca ainda
        if (filterStoreState.isLoading || allProducts.length === 0) {
          console.log('[PERFORM_SEARCH] Aguardando produtos... (isLoading:', filterStoreState.isLoading, ', produtos:', allProducts.length, ')')
          return
        }

        console.log('[PERFORM_SEARCH] Iniciando busca com query:', query)
        console.log('[PERFORM_SEARCH] Total de produtos disponíveis:', allProducts.length)

        let searchResults: Product[] = allProducts

        // Se houver query, aplicar busca fuzzy
        if (query && query.trim()) {
          const expandedQuery = expandQueryWithSynonyms(query)

          // Configuração Fuse.js
          const fuse = new Fuse(allProducts, {
            keys: [
              { name: 'name', weight: 2 },
              { name: 'description', weight: 1.5 },
              { name: 'keywords', weight: 1.8 },
              { name: 'tags', weight: 1.5 },
              { name: 'category', weight: 1.2 },
              { name: 'collection', weight: 1.0 },
            ],
            threshold: 0.4,
            includeScore: true,
            useExtendedSearch: true,
            ignoreLocation: true,
          })

          const fuseResults = fuse.search(expandedQuery)
          searchResults = fuseResults.map(r => ({
            ...r.item,
            searchScore: r.score
          }))
        }

        console.log('[PERFORM_SEARCH] Produtos antes dos filtros:', searchResults.length)

        // Aplicar filtros
        const filtered = applyFilters(searchResults, filters)

        console.log('[PERFORM_SEARCH] Produtos após filtros:', filtered.length)

        // Ordenar
        const sorted = sortResults(filtered, filters.sortBy)

        console.log('[PERFORM_SEARCH] Produtos após ordenação:', sorted.length)

        set({
          results: sorted,
          totalResults: sorted.length,
          isSearching: false
        })

        console.log('[PERFORM_SEARCH] Estado atualizado, results:', get().results.length)

        // Adicionar ao histórico se houver query
        if (query && query.trim()) {
          get().addToHistory(query.trim())
        }
      },

      addToHistory: (query) => {
        set(state => ({
          searchHistory: [
            query,
            ...state.searchHistory.filter(q => q.toLowerCase() !== query.toLowerCase())
          ].slice(0, 10)
        }))
      },

      clearHistory: () => set({ searchHistory: [] }),

      getFilterCounts: () => {
        // Retorna contagem de produtos por filtro
        const counts: Record<string, number> = {}

        // Implementação futura para mostrar quantos produtos cada filtro tem

        return counts
      },
    }),
    {
      name: 'search-storage',
      version: 1,
      partialize: (state) => ({
        searchHistory: state.searchHistory
      }),
      migrate: (persistedState: any, version: number) => {
        // Se a versão é diferente, retornar estado inicial
        if (version !== 1) {
          return {
            searchHistory: []
          }
        }
        return persistedState as any
      }
    }
  )
)
