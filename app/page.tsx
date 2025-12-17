import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroBanner } from "@/components/layout/hero-banner"
import { CategoryCards } from "@/components/layout/category-cards"
import { FeaturedProducts } from "@/components/layout/featured-products"
import { Phone, Award, Shield, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main>
        {/* Hero Banner */}
        <HeroBanner />

        {/* Category Cards */}
        <CategoryCards />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Por que escolher a GO Alianças?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Tradição, qualidade e compromisso com seu momento especial
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Award className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-gray-900">
                  Ouro 18k Certificado
                </h3>
                <p className="mt-2 text-gray-600">
                  Máxima pureza e qualidade garantida em todas as peças
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Heart className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-gray-900">
                  Personalização
                </h3>
                <p className="mt-2 text-gray-600">
                  Gravação e personalização exclusiva para tornar sua peça única
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Shield className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-gray-900">
                  Garantia Vitalícia
                </h3>
                <p className="mt-2 text-gray-600">
                  Manutenção e assistência para suas joias por toda vida
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Phone className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-gray-900">
                  Atendimento Exclusivo
                </h3>
                <p className="mt-2 text-gray-600">
                  Consultoria personalizada em Curitiba e região
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-gold-light to-beige py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Pronto para encontrar a joia perfeita?
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Entre em contato conosco e receba atendimento personalizado
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/produtos">
                <Button size="lg">
                  Ver Todos os Produtos
                </Button>
              </Link>
              <Link href="/contato">
                <Button size="lg" variant="outline">
                  Falar com Especialista
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
