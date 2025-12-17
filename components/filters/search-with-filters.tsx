"use client"

import * as React from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { useFilterStore } from "@/lib/filter-store"
import { ProductFilters } from "./product-filters"
import { Button } from "@/components/ui/button"
import * as Dialog from "@radix-ui/react-dialog"

export function SearchWithFilters() {
  const { filters, setSearchQuery, filteredProducts } = useFilterStore()
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState(filters.searchQuery || '')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    setSearchQuery(value)
  }

  const activeFilterCount =
    filters.categories.length +
    filters.metalTypes.length +
    filters.collections.length +
    (filters.inStockOnly ? 1 : 0)

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por alianças, anéis, coleções..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20"
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
        {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
      </div>
    </div>
  )
}
