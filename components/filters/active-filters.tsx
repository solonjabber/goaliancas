"use client"

import { X } from "lucide-react"
import { useFilterStore } from "@/lib/filter-store"
import { ProductCategory, MetalType } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

export function ActiveFilters() {
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

  if (!hasActiveFilters) return null

  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      <span className="text-sm font-medium text-gray-700">
        Filtros ativos:
      </span>

      {/* Category Badges */}
      {filters.categories.map((category) => (
        <Badge key={category} variant="secondary" className="gap-1">
          {categoryLabels[category]}
          <button
            onClick={() => setCategory(category, false)}
            className="ml-1 rounded-full hover:bg-gray-300"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {/* Metal Type Badges */}
      {filters.metalTypes.map((metalType) => (
        <Badge key={metalType} variant="secondary" className="gap-1">
          {metalTypeLabels[metalType]}
          <button
            onClick={() => setMetalType(metalType, false)}
            className="ml-1 rounded-full hover:bg-gray-300"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {/* Collection Badges */}
      {filters.collections.map((collection) => (
        <Badge key={collection} variant="secondary" className="gap-1">
          {collection}
          <button
            onClick={() => setCollection(collection, false)}
            className="ml-1 rounded-full hover:bg-gray-300"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {/* In Stock Badge */}
      {filters.inStockOnly && (
        <Badge variant="secondary" className="gap-1">
          Em estoque
          <button
            onClick={toggleInStockOnly}
            className="ml-1 rounded-full hover:bg-gray-300"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      {/* Clear All Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={clearFilters}
        className="text-gold hover:text-gold-dark"
      >
        Limpar todos
      </Button>
    </div>
  )
}
