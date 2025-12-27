'use client'

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useSiteTexts } from "@/hooks/use-site-texts"

const categoryIcons: Record<string, string> = {
  "aliancas-de-casamento": "💍",
  "aliancas-noivado": "💎",
  "aneis": "✨",
  "aneis-de-formatura": "🎓",
}

const categoryGradients: Record<string, string> = {
  "aliancas-de-casamento": "bg-gradient-to-br from-beige to-mint",
  "aliancas-noivado": "bg-gradient-to-br from-mint to-blue-grey",
  "aneis": "bg-gradient-to-br from-gold-light to-beige",
  "aneis-de-formatura": "bg-gradient-to-br from-blue-grey to-beige",
}

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://payload-api-production-9a40.up.railway.app'

export function CategoryCards() {
  const [categories, setCategories] = useState<any[]>([])
  const { texts } = useSiteTexts()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${PAYLOAD_API_URL}/api/categories?limit=100`)
        const data = await res.json()
        setCategories(data.docs || [])
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  // Verificar se os dados estão carregados
  if (!texts || !texts.categoryCards) {
    return null
  }

  const getDescription = (slug: string) => {
    const descriptionMap: Record<string, keyof typeof texts.categoryCards.descriptions> = {
      'aliancas-de-casamento': 'weddingRings',
      'aliancas-noivado': 'engagementRings',
      'aneis': 'rings',
      'aneis-de-formatura': 'graduationRings'
    }

    const key = descriptionMap[slug]
    return key ? texts.categoryCards.descriptions[key] : "Confira nossas opções"
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            {texts.categoryCards.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {texts.categoryCards.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category: any) => (
            <Link
              key={category.id}
              href={`/produtos?category=${category.slug}`}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className={`h-48 ${categoryGradients[category.slug] || 'bg-gradient-to-br from-beige to-gold-light'} flex items-center justify-center`}>
                <span className="text-6xl">{categoryIcons[category.slug] || "💍"}</span>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-gray-900 group-hover:text-gold">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {getDescription(category.slug)}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-gold">
                  {texts.categoryCards.viewProducts}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
