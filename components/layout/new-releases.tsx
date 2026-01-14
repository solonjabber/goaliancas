'use client'

import { useEffect, useState } from 'react'
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { API_CONFIG } from "@/lib/config"
import { mapPayloadProduct } from "@/lib/product-mapper"

const PAYLOAD_API_URL = API_CONFIG.PAYLOAD_URL

export function NewReleases() {
  const [newReleases, setNewReleases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const url = `${PAYLOAD_API_URL}/api/vps-products?_=${Date.now()}`
        console.log('🔍 Buscando lançamentos de:', url)

        const response = await fetch(url, {
          cache: 'no-store'
        })

        console.log('📡 Status da resposta:', response.status, response.statusText)

        if (!response.ok) {
          console.error('❌ Erro ao buscar lançamentos:', response.status)
          setLoading(false)
          return
        }

        const data = await response.json()
        console.log('📦 Dados recebidos:', data)

        // Filtrar apenas produtos publicados e marcados como lançamento
        const newReleaseDocs = (data?.docs || []).filter((p: any) =>
          p.status === 'published' && p.isNewRelease === true
        ).slice(0, 4) // Limitar a 4 produtos

        console.log('📊 Total de lançamentos:', newReleaseDocs.length)

        const products = newReleaseDocs.map((payloadProduct: any) =>
          mapPayloadProduct(payloadProduct)
        )

        setNewReleases(products)
      } catch (error) {
        console.error('Erro ao carregar lançamentos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNewReleases()
  }, [])

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Lançamentos
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

  // Se não há lançamentos, não exibir a seção
  if (newReleases.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Lançamentos
            </h2>
            <p className="mt-2 text-gray-600">
              Nossas peças mais recentes e exclusivas
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
          {newReleases.map((product: any) => (
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
