"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedProducts } from "@/lib/mock-data"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts().slice(0, 4)

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Produtos em Destaque
            </h2>
            <p className="mt-2 text-gray-600">
              Nossas peças mais exclusivas e procuradas
            </p>
          </div>
          <Link href="/produtos" className="hidden md:block">
            <Button variant="outline">
              Ver Todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/produtos">
            <Button variant="outline">
              Ver Todos os Produtos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
