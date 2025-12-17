import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Alianças de Casamento",
    description: "Eternize seu amor",
    href: "/aliancas-casamento",
    image: "bg-gradient-to-br from-beige to-mint",
    icon: "💍",
  },
  {
    name: "Alianças de Noivado",
    description: "O início de tudo",
    href: "/aliancas-noivado",
    image: "bg-gradient-to-br from-mint to-blue-grey",
    icon: "💎",
  },
  {
    name: "Anéis",
    description: "Elegância única",
    href: "/aneis",
    image: "bg-gradient-to-br from-gold-light to-beige",
    icon: "✨",
  },
  {
    name: "Anéis de Formatura",
    description: "Conquista celebrada",
    href: "/aneis-formatura",
    image: "bg-gradient-to-br from-blue-grey to-beige",
    icon: "🎓",
  },
]

export function CategoryCards() {
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
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className={`h-48 ${category.image} flex items-center justify-center`}>
                <span className="text-6xl">{category.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-gray-900 group-hover:text-gold">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {category.description}
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
