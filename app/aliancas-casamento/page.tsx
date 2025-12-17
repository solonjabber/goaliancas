"use client"

import { useEffect } from "react"
import { useFilterStore } from "@/lib/filter-store"
import { ProductCategory } from "@/lib/types"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SearchWithFilters } from "@/components/filters/search-with-filters"
import { ActiveFilters } from "@/components/filters/active-filters"
import { ProductFilters } from "@/components/filters/product-filters"
import { ProductGrid } from "@/components/product/product-grid"
import { Heart, Award, Sparkles, Crown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AliancasCasamentoPage() {
  const { filteredProducts, setCategory, clearFilters } = useFilterStore()

  useEffect(() => {
    // Filter to show only wedding rings
    clearFilters()
    setCategory(ProductCategory.ALIANCAS_CASAMENTO, true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-beige via-white to-mint py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2">
                <Crown className="h-5 w-5 text-gold" />
                <span className="text-sm font-medium text-gold">
                  Coleção Especial
                </span>
              </div>

              <h1 className="font-heading text-5xl font-bold text-gray-900 md:text-6xl">
                Alianças de Casamento
              </h1>

              <p className="mt-6 text-xl text-gray-700">
                Eternize seu amor com alianças em ouro 18k de alta qualidade.
                Design exclusivo, conforto anatômico e personalização completa.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a href="#produtos">
                  <Button size="lg">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Ver Coleção Completa
                  </Button>
                </a>
                <Link href="/contato">
                  <Button variant="outline" size="lg">
                    Agendar Consulta
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute left-10 top-20 opacity-10">
            <Heart className="h-32 w-32 text-gold" />
          </div>
          <div className="absolute right-10 bottom-20 opacity-10">
            <Heart className="h-24 w-24 text-gold" />
          </div>
        </div>

        {/* Features Section */}
        <section className="border-b border-gray-200 bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Award className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                  Ouro 18k Certificado
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Pureza garantida com certificado de autenticidade
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Heart className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                  Personalização Completa
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Gravação de nomes, datas e mensagens especiais
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Sparkles className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                  Design Anatômico
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Conforto absoluto para uso diário
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Crown className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                  Garantia Vitalícia
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Manutenção e polimento gratuitos
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="produtos" className="py-12">
          <div className="container mx-auto px-4">
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
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-heading text-2xl font-bold text-gray-900">
                    Nossa Coleção
                  </h2>
                  <p className="text-sm text-gray-600">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1 ? "produto" : "produtos"}
                  </p>
                </div>

                <ProductGrid products={filteredProducts} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-gold-light to-beige py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Pronto para encontrar suas alianças perfeitas?
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Visite nossa loja em Curitiba ou entre em contato pelo WhatsApp
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://wa.me/5541999999999?text=Olá! Gostaria de saber mais sobre as alianças de casamento."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">Falar no WhatsApp</Button>
              </a>
              <Link href="/contato">
                <Button size="lg" variant="outline">
                  Agendar Visita
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 font-heading text-3xl font-bold text-gray-900">
                Sobre Nossas Alianças de Casamento
              </h2>

              <div className="space-y-6 text-gray-700">
                <p>
                  As alianças de casamento da GO Alianças são mais do que joias -
                  são símbolos eternos do amor e compromisso entre duas pessoas.
                  Cada peça é cuidadosamente produzida em ouro 18k de alta pureza,
                  garantindo durabilidade e brilho que atravessam gerações.
                </p>

                <h3 className="font-heading text-xl font-semibold text-gray-900">
                  Tipos de Ouro 18k Disponíveis
                </h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Ouro 18k Amarelo:</strong> Clássico e atemporal, perfeito
                    para quem busca a tradição
                  </li>
                  <li>
                    <strong>Ouro 18k Branco:</strong> Moderno e sofisticado, com
                    tonalidade prateada elegante
                  </li>
                  <li>
                    <strong>Ouro 18k Rosé:</strong> Romântico e contemporâneo, com
                    tom rosado único
                  </li>
                </ul>

                <h3 className="font-heading text-xl font-semibold text-gray-900">
                  Estilos Disponíveis
                </h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Tradicional Lisa:</strong> Design clássico com acabamento
                    polido
                  </li>
                  <li>
                    <strong>Anatômica:</strong> Conforto superior para uso diário
                  </li>
                  <li>
                    <strong>Diamantada:</strong> Acabamento texturizado brilhante
                  </li>
                  <li>
                    <strong>Bicolor:</strong> Combinação de dois tons de ouro
                  </li>
                  <li>
                    <strong>Exclusiva:</strong> Designs únicos e personalizados
                  </li>
                </ul>

                <h3 className="font-heading text-xl font-semibold text-gray-900">
                  Personalização
                </h3>
                <p>
                  Todas as nossas alianças podem ser personalizadas com:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Gravação de nomes</li>
                  <li>Data do casamento</li>
                  <li>Mensagens especiais</li>
                  <li>Símbolos e desenhos</li>
                  <li>Ajuste de largura e espessura</li>
                </ul>

                <div className="mt-8 rounded-lg bg-mint p-6">
                  <h3 className="font-heading text-xl font-semibold text-gray-900">
                    Garantia e Manutenção
                  </h3>
                  <p className="mt-2">
                    Oferecemos garantia vitalícia em todas as nossas alianças,
                    incluindo manutenção gratuita, polimento e ajustes de tamanho.
                    Seu investimento está protegido para sempre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
