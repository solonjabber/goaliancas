import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getCategories } from "@/lib/payload-api"

const categoryIcons: Record<string, string> = {
  "aliancas-casamento": "💍",
  "aliancas-noivado": "💎",
  "aneis": "✨",
  "aneis-formatura": "🎓",
}

const categoryGradients: Record<string, string> = {
  "aliancas-casamento": "bg-gradient-to-br from-beige to-mint",
  "aliancas-noivado": "bg-gradient-to-br from-mint to-blue-grey",
  "aneis": "bg-gradient-to-br from-gold-light to-beige",
  "aneis-formatura": "bg-gradient-to-br from-blue-grey to-beige",
}

const categoryDescriptions: Record<string, string> = {
  "aliancas-casamento": "Eternize seu amor",
  "aliancas-noivado": "O início de tudo",
  "aneis": "Elegância única",
  "aneis-formatura": "Conquista celebrada",
}

export async function CategoryCards() {
  const categories = await getCategories()
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Nossas Categorias
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Encontre a joia perfeita para cada momento especial
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
                  {categoryDescriptions[category.slug] || category.description || "Confira nossas opções"}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-gold">
                  Ver produtos
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
