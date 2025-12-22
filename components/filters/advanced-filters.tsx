"use client"

import * as React from "react"
import { X } from "lucide-react"
import { useSearchStore } from "@/lib/search-store"
import {
  ProductCategory,
  MetalType,
  ProductGender,
  ProductFinish,
  ProductStone,
  ProductAvailability
} from "@/lib/types"
import { collections } from "@/lib/mock-data"
import { FilterSection } from "./filter-section"
import { PriceRangeSlider } from "./price-range-slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AdvancedFiltersProps {
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

const genderLabels: Record<ProductGender, string> = {
  [ProductGender.MASCULINA]: 'Masculina',
  [ProductGender.FEMININA]: 'Feminina',
  [ProductGender.PAR]: 'Par',
  [ProductGender.UNISSEX]: 'Unissex',
}

const finishLabels: Record<ProductFinish, string> = {
  [ProductFinish.POLIDO]: 'Polido',
  [ProductFinish.FOSCO]: 'Fosco',
  [ProductFinish.DIAMANTADO]: 'Diamantado',
  [ProductFinish.ESCOVADO]: 'Escovado',
  [ProductFinish.TEXTURIZADO]: 'Texturizado',
}

const stoneLabels: Record<ProductStone, string> = {
  [ProductStone.SEM_PEDRA]: 'Sem Pedra',
  [ProductStone.DIAMANTE]: 'Diamante',
  [ProductStone.ZIRCONIA]: 'Zircônia',
  [ProductStone.BRILHANTE]: 'Brilhante',
}

const availabilityLabels: Record<ProductAvailability, string> = {
  [ProductAvailability.PRONTA_ENTREGA]: 'Pronta Entrega',
  [ProductAvailability.SOB_ENCOMENDA]: 'Sob Encomenda',
  [ProductAvailability.PRE_VENDA]: 'Pré-venda',
}

export function AdvancedFilters({ className, onClose }: AdvancedFiltersProps) {
  const { filters, setFilter, clearFilters } = useSearchStore()

  const toggleArrayFilter = (
    key: any,
    value: any,
    checked: boolean
  ) => {
    const currentArray = (filters[key as keyof typeof filters] || []) as any[]
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter((v: any) => v !== value)
    setFilter(key, newArray as any)
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.metalTypes.length > 0 ||
    filters.collections.length > 0 ||
    (filters.genders && filters.genders.length > 0) ||
    (filters.finishes && filters.finishes.length > 0) ||
    (filters.stones && filters.stones.length > 0) ||
    (filters.availability && filters.availability.length > 0) ||
    filters.inStockOnly ||
    filters.hasEngraving !== undefined ||
    filters.customizableOnly

  return (
    <div className={cn("bg-white", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Filtros Avançados</h2>
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
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-4">
        {/* Price Range */}
        <FilterSection title="Faixa de Preço">
          <PriceRangeSlider
            min={500}
            max={15000}
            value={filters.priceRange || { min: 500, max: 15000 }}
            onChange={(value) => setFilter('priceRange', value)}
            step={100}
          />
        </FilterSection>

        {/* Category Filter */}
        <FilterSection title="Categoria">
          <div className="space-y-3">
            {Object.entries(categoryLabels).map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${value}`}
                  checked={filters.categories.includes(value as ProductCategory)}
                  onCheckedChange={(checked) =>
                    toggleArrayFilter('categories', value as ProductCategory, checked as boolean)
                  }
                />
                <label
                  htmlFor={`category-${value}`}
                  className="cursor-pointer text-sm font-medium leading-none"
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
                    toggleArrayFilter('metalTypes', value as MetalType, checked as boolean)
                  }
                />
                <label
                  htmlFor={`metal-${value}`}
                  className="cursor-pointer text-sm font-medium leading-none"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Gender Filter */}
        <FilterSection title="Gênero">
          <div className="space-y-3">
            {Object.entries(genderLabels).map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`gender-${value}`}
                  checked={(filters.genders || []).includes(value as ProductGender)}
                  onCheckedChange={(checked) =>
                    toggleArrayFilter('genders', value as ProductGender, checked as boolean)
                  }
                />
                <label
                  htmlFor={`gender-${value}`}
                  className="cursor-pointer text-sm font-medium leading-none"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Finish Filter */}
        <FilterSection title="Acabamento">
          <div className="space-y-3">
            {Object.entries(finishLabels).map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`finish-${value}`}
                  checked={(filters.finishes || []).includes(value as ProductFinish)}
                  onCheckedChange={(checked) =>
                    toggleArrayFilter('finishes', value as ProductFinish, checked as boolean)
                  }
                />
                <label
                  htmlFor={`finish-${value}`}
                  className="cursor-pointer text-sm font-medium leading-none"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Stones Filter */}
        <FilterSection title="Pedras">
          <div className="space-y-3">
            {Object.entries(stoneLabels).map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`stone-${value}`}
                  checked={(filters.stones || []).includes(value as ProductStone)}
                  onCheckedChange={(checked) =>
                    toggleArrayFilter('stones', value as ProductStone, checked as boolean)
                  }
                />
                <label
                  htmlFor={`stone-${value}`}
                  className="cursor-pointer text-sm font-medium leading-none"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Collection Filter */}
        <FilterSection title="Coleção">
          <div className="max-h-64 space-y-3 overflow-y-auto">
            {collections.map((collection) => (
              <div key={collection} className="flex items-center space-x-2">
                <Checkbox
                  id={`collection-${collection}`}
                  checked={filters.collections.includes(collection)}
                  onCheckedChange={(checked) =>
                    toggleArrayFilter('collections', collection, checked as boolean)
                  }
                />
                <label
                  htmlFor={`collection-${collection}`}
                  className="cursor-pointer text-sm font-medium leading-none"
                >
                  {collection}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Availability Filter */}
        <FilterSection title="Disponibilidade">
          <div className="space-y-3">
            {Object.entries(availabilityLabels).map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`availability-${value}`}
                  checked={(filters.availability || []).includes(value as ProductAvailability)}
                  onCheckedChange={(checked) =>
                    toggleArrayFilter('availability', value as ProductAvailability, checked as boolean)
                  }
                />
                <label
                  htmlFor={`availability-${value}`}
                  className="cursor-pointer text-sm font-medium leading-none"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Additional Options */}
        <FilterSection title="Opções">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={filters.inStockOnly}
                onCheckedChange={(checked) => setFilter('inStockOnly', checked as boolean)}
              />
              <label
                htmlFor="in-stock"
                className="cursor-pointer text-sm font-medium leading-none"
              >
                Apenas em estoque
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="customizable"
                checked={filters.customizableOnly}
                onCheckedChange={(checked) => setFilter('customizableOnly', checked as boolean)}
              />
              <label
                htmlFor="customizable"
                className="cursor-pointer text-sm font-medium leading-none"
              >
                Apenas personalizáveis
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="engraving"
                checked={filters.hasEngraving === true}
                onCheckedChange={(checked) =>
                  setFilter('hasEngraving', checked ? true : undefined)
                }
              />
              <label
                htmlFor="engraving"
                className="cursor-pointer text-sm font-medium leading-none"
              >
                Com gravação
              </label>
            </div>
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
              Limpar Todos os Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
