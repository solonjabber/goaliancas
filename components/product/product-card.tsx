"use client"

import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Product } from "@/lib/types"
import { formatCurrency, calculateInstallment } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg">
      {/* Product Image */}
      <Link href={`/produtos/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-100">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-beige p-8">
            <img
              src="/imagens/logo-transparente.png"
              alt={product.name}
              className="h-full w-full object-contain opacity-30"
            />
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-2">
          {product.discount && (
            <Badge className="bg-red-500 text-white">
              -{product.discount}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="bg-gold text-white">
              Destaque
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary">
              Esgotado
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100">
            <Heart className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4">
        {/* Collection */}
        {product.collection && (
          <p className="text-xs font-medium uppercase tracking-wide text-gold">
            {product.collection}
          </p>
        )}

        {/* Name */}
        <Link
          href={`/produtos/${product.slug}`}
          className="mt-1 font-heading text-lg font-medium text-gray-900 hover:text-gold"
        >
          {product.name}
        </Link>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        {/* Specifications */}
        {product.weight && (
          <p className="mt-2 text-xs text-gray-500">
            Peso aprox: {product.weight}g
          </p>
        )}

        {/* Price */}
        <div className="mt-auto pt-4">
          {product.discount ? (
            <div className="space-y-1">
              <p className="text-sm text-gray-500 line-through">
                {formatCurrency(product.price)}
              </p>
              <p className="text-2xl font-bold text-gold">
                {formatCurrency(finalPrice)}
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-gold">
              {formatCurrency(product.price)}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-600">
            ou 12x de {calculateInstallment(finalPrice, 12)}
          </p>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="mt-4 w-full"
          disabled={!product.inStock}
          onClick={(e) => {
            e.preventDefault()
            addItem(product, 1)
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.inStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
        </Button>
      </div>
    </div>
  )
}
