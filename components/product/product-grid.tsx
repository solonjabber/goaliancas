"use client"

import { Product } from "@/lib/types"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-12">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gold"></div>
          <h3 className="font-heading text-xl font-semibold text-gray-900">
            Carregando produtos...
          </h3>
          <p className="mt-2 text-gray-600">
            Aguarde enquanto buscamos nossos produtos
          </p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12">
        <div className="text-center">
          <h3 className="font-heading text-2xl font-semibold text-gray-900">
            Nenhum produto encontrado
          </h3>
          <p className="mt-2 text-gray-600">
            Tente ajustar seus filtros ou realize uma nova busca
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
