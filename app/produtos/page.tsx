"use client"

import { useFilterStore } from "@/lib/filter-store"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SearchWithFilters } from "@/components/filters/search-with-filters"
import { ActiveFilters } from "@/components/filters/active-filters"
import { ProductFilters } from "@/components/filters/product-filters"
import { ProductGrid } from "@/components/product/product-grid"
import { SlidersHorizontal } from "lucide-react"

export default function ProdutosPage() {
  const { filteredProducts } = useFilterStore()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

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
          <div className="relative mb-6">
            <SearchWithFilters />
          </div>

          {/* Active Filters */}
          <ActiveFilters />

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <ProductFilters />
              </div>
            </aside>

            {/* Product Grid */}
            <div>
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
