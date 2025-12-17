"use client"

import * as React from "react"
import { X } from "lucide-react"
import { useFilterStore } from "@/lib/filter-store"
import { ProductCategory, MetalType } from "@/lib/types"
import { collections } from "@/lib/mock-data"
import { FilterSection } from "./filter-section"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductFiltersProps {
  className?: string
  onClose?: () => void
}

const categoryLabels: Record<ProductCategory, string> = {
  [ProductCategory.ALIANCAS_CASAMENTO]: 'Alianças de Casamento',
  [ProductCategory.ALIANCAS_NOIVADO]: 'Alianças de Noivado',
  [ProductCategory.ANEIS]: 'Anéis',
  [ProductCategory.ANEIS_FORMATURA]: 'Anéis de Formatura',
}

const metalTypeLabels: Record<MetalType, string> = {
  [MetalType.OURO_18K_AMARELO]: 'Ouro 18k Amarelo',
  [MetalType.OURO_18K_BRANCO]: 'Ouro 18k Branco',
  [MetalType.OURO_18K_ROSE]: 'Ouro 18k Rosé',
}

export function ProductFilters({ className, onClose }: ProductFiltersProps) {
  const {
    filters,
    setCategory,
    setMetalType,
    setCollection,
    toggleInStockOnly,
    clearFilters,
  } = useFilterStore()

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.metalTypes.length > 0 ||
    filters.collections.length > 0 ||
    filters.inStockOnly

  return (
    <div className={cn("bg-white", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="p-4">
        {/* Category Filter */}
        <FilterSection title="Categoria">
          <div className="space-y-3">
            {Object.entries(categoryLabels).map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${value}`}
                  checked={filters.categories.includes(value as ProductCategory)}
                  onCheckedChange={(checked) =>
                    setCategory(value as ProductCategory, checked as boolean)
                  }
                />
                <label
                  htmlFor={`category-${value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Metal Type Filter */}
        <FilterSection title="Material">
          <div className="space-y-3">
            {Object.entries(metalTypeLabels).map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`metal-${value}`}
                  checked={filters.metalTypes.includes(value as MetalType)}
                  onCheckedChange={(checked) =>
                    setMetalType(value as MetalType, checked as boolean)
                  }
                />
                <label
                  htmlFor={`metal-${value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Collection Filter */}
        <FilterSection title="Coleção">
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {collections.map((collection) => (
              <div key={collection} className="flex items-center space-x-2">
                <Checkbox
                  id={`collection-${collection}`}
                  checked={filters.collections.includes(collection)}
                  onCheckedChange={(checked) =>
                    setCollection(collection, checked as boolean)
                  }
                />
                <label
                  htmlFor={`collection-${collection}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {collection}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* In Stock Only */}
        <FilterSection title="Disponibilidade">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStockOnly}
              onCheckedChange={toggleInStockOnly}
            />
            <label
              htmlFor="in-stock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Apenas produtos em estoque
            </label>
          </div>
        </FilterSection>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
