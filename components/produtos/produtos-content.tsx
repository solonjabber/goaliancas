"use client"

import { useState, useEffect } from "react"
import { useSearchParams, usePathname } from "next/navigation"
import { useFilterStore } from "@/lib/filter-store"
import { useSearchStore } from "@/lib/search-store"
import { SearchBar } from "@/components/search/search-bar"
import { AdvancedFilters } from "@/components/filters/advanced-filters"
import { SortSelect } from "@/components/filters/sort-select"
import { ProductGrid } from "@/components/product/product-grid"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { ProductCategory, MetalType, ProductStone } from "@/lib/types"

export function ProdutosContent() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { filteredProducts, loadProducts, isLoading } = useFilterStore()
  const { results, query, filters, setFilter } = useSearchStore()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Carregar produtos do Payload quando o componente montar
  useEffect(() => {
    loadProducts()
  }, [])

  // Aplicar filtros da URL quando a página carregar ou mudar
  useEffect(() => {
    const category = searchParams.get('category')
    const metal = searchParams.get('metal')
    const stone = searchParams.get('stone')
    const collection = searchParams.get('collection')

    console.log('[FILTROS] Parâmetros da URL:', { category, metal, stone, collection })

    // Criar filtros baseado nos parâmetros da URL
    const newFilters = {
      categories: category ? [category as ProductCategory] : [],
      metalTypes: metal ? [metal as MetalType] : [],
      collections: collection ? [collection] : [],
      stones: stone ? [stone as ProductStone] : [],
      genders: [],
      finishes: [],
      availability: [],
      priceRange: { min: 500, max: 15000 },
      inStockOnly: false,
      hasEngraving: undefined,  // NÃO aplicar filtro de gravação
      customizableOnly: false,
      sortBy: 'relevance' as const,
    }

    console.log('[FILTROS] Filtros criados:', newFilters)

    useSearchStore.setState({
      filters: newFilters,
      query: ''
    })

    // Executar busca
    useSearchStore.getState().performSearch()

    console.log('[FILTROS] Busca executada, results:', useSearchStore.getState().results.length)
  }, [pathname, searchParams])

  // Verificar se há filtros ativos
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.metalTypes.length > 0 ||
    filters.collections.length > 0 ||
    (filters.genders?.length || 0) > 0 ||
    (filters.finishes?.length || 0) > 0 ||
    (filters.stones?.length || 0) > 0

  // Se results está vazio (primeira renderização), usar filteredProducts como fallback
  const displayProducts = results.length > 0 ? results : filteredProducts

  // Contar filtros ativos
  const activeFilterCount =
    filters.categories.length +
    filters.metalTypes.length +
    filters.collections.length +
    (filters.genders?.length || 0) +
    (filters.finishes?.length || 0) +
    (filters.stones?.length || 0) +
    (filters.availability?.length || 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.hasEngraving ? 1 : 0) +
    (filters.customizableOnly ? 1 : 0)

  return (
    <main className="flex-1">
      {/* Page Header */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-beige to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl font-bold text-gray-900">
            Nossos Produtos
          </h1>
          <p className="mt-2 text-gray-600">
            Alianças e anéis em ouro 18k de alta qualidade
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            placeholder="Buscar por alianças, anéis, coleções..."
            showHistory={true}
          />
        </div>

        {/* Toolbar: Filters Button + Sort + Results Count */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile/Desktop Filter Button */}
            <Dialog.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <Dialog.Trigger asChild>
                <Button variant="outline" className="relative">
                  <SlidersHorizontal className="mr-2 h-5 w-5" />
                  Filtros Avançados
                  {activeFilterCount > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </Dialog.Trigger>

              {/* Mobile Filter Dialog */}
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 lg:hidden" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right lg:hidden">
                  <AdvancedFilters onClose={() => setIsFilterOpen(false)} />
                </Dialog.Content>
              </Dialog.Portal>

              {/* Desktop Filter Dropdown */}
              <Dialog.Portal>
                <Dialog.Overlay className="hidden" />
                <Dialog.Content className="fixed left-1/2 top-24 z-50 hidden max-h-[calc(100vh-6rem)] w-full max-w-md -translate-x-1/2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 lg:block">
                  <AdvancedFilters onClose={() => setIsFilterOpen(false)} />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{displayProducts.length}</span>{' '}
              {displayProducts.length === 1 ? 'produto' : 'produtos'}
            </div>
          </div>

          {/* Sort Select */}
          <SortSelect
            value={filters.sortBy || 'relevance'}
            onChange={(value) => setFilter('sortBy', value as any)}
          />
        </div>

        {/* Product Grid */}
        <div>
          <ProductGrid products={displayProducts} />
        </div>
      </div>
    </main>
  )
}
