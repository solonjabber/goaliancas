'use client'

import { useEffect, useState } from 'react'
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const url = `${PAYLOAD_API_URL}/products?limit=4&where[status][equals]=published&where[featured][equals]=true&depth=1&_=${Date.now()}`
        console.log('🔍 Buscando produtos em destaque de:', url)

        const response = await fetch(url, {
          cache: 'no-store'
        })

        console.log('📡 Status da resposta:', response.status, response.statusText)

        if (!response.ok) {
          console.error('❌ Erro ao buscar produtos em destaque:', response.status)
          setLoading(false)
          return
        }

        const data = await response.json()
        console.log('📦 Dados recebidos:', data)
        console.log('📊 Total de produtos em destaque:', data?.docs?.length || 0)

        const products = (data?.docs || []).map((payloadProduct: any) => {
          const images = payloadProduct.gallery?.map((item: any) => {
            const media = item.media
            if (!media) return ''
            if (typeof media === 'object' && media.url) {
              return media.url.startsWith('http') ? media.url : `${PAYLOAD_API_URL}${media.url}`
            }
            if (typeof media === 'string') {
              return `${PAYLOAD_API_URL}/api/media/${media}`
            }
            return ''
          }).filter(Boolean) || []

          return {
            id: payloadProduct.id,
            name: payloadProduct.name,
            slug: payloadProduct.slug,
            description: payloadProduct.description,
            price: payloadProduct.price,
            images,
            category: payloadProduct.category?.slug || payloadProduct.category || '',
            metalType: payloadProduct.material,
            collection: payloadProduct.productCollection,
            weight: payloadProduct.weight,
            width: payloadProduct.dimensions ? parseFloat(payloadProduct.dimensions.match(/\d+/)?.[0] || '0') : undefined,
            inStock: payloadProduct.inStock,
            featured: payloadProduct.featured,
            discount: payloadProduct.salePrice ? Math.round((1 - payloadProduct.salePrice / payloadProduct.price) * 100) : undefined,
            specifications: [],
            customizable: payloadProduct.allowCustomization,
            keywords: [],
            tags: payloadProduct.tags || [],
          }
        })

        setFeaturedProducts(products)
      } catch (error) {
        console.error('Erro ao carregar produtos em destaque:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Produtos em Destaque
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <div className="mt-4 h-4 bg-gray-200 rounded"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

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
          {featuredProducts.map((product: any) => (
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
