"use client"

import * as React from "react"
import { SlidersHorizontal } from "lucide-react"
import { useFilterStore } from "@/lib/filter-store"
import { useSearchStore } from "@/lib/search-store"
import { ProductFilters } from "./product-filters"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search/search-bar"
import * as Dialog from "@radix-ui/react-dialog"

export function SearchWithFilters() {
  const { filters, filteredProducts } = useFilterStore()
  const { results } = useSearchStore()
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)

  const activeFilterCount =
    filters.categories.length +
    filters.metalTypes.length +
    filters.collections.length +
    (filters.inStockOnly ? 1 : 0)

  const displayResults = results.length > 0 ? results : filteredProducts

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchBar
            placeholder="Buscar por alianças, anéis, coleções..."
            showHistory={true}
          />
        </div>

        {/* Filter Button */}
        <Dialog.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <Dialog.Trigger asChild>
            <Button variant="outline" className="relative whitespace-nowrap">
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              Filtros
              {activeFilterCount > 0 && (
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs text-white">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </Dialog.Trigger>

          {/* Mobile Filter Dialog */}
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:hidden" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right md:hidden">
              <ProductFilters onClose={() => setIsFilterOpen(false)} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Desktop Filter Panel */}
      {isFilterOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 hidden w-80 rounded-lg border border-gray-200 bg-white shadow-lg md:block">
          <ProductFilters onClose={() => setIsFilterOpen(false)} />
        </div>
      )}

      {/* Result Count */}
      <div className="mt-2 text-sm text-gray-600">
        {displayResults.length} {displayResults.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
      </div>
    </div>
  )
}
