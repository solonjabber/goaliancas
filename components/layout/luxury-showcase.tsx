"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

const showcaseItems = [
  {
    image: "/imagens/produtos/alianca-classica-amarela.jpg",
    title: "Alianças de Ouro Amarelo",
    subtitle: "Tradição e elegância que atravessam gerações",
    link: "/produtos?category=aliancas-casamento&metal=ouro-18k-amarelo"
  },
  {
    image: "/imagens/produtos/alianca-diamante-branca.jpg",
    title: "Brilho Eterno dos Diamantes",
    subtitle: "Sofisticação em cada detalhe",
    link: "/produtos?category=aliancas-casamento&stone=diamante"
  },
  {
    image: "/imagens/produtos/alianca-moderna-rose.jpg",
    title: "Ouro Rosé Exclusivo",
    subtitle: "Romantismo e modernidade em perfeita harmonia",
    link: "/produtos?category=aliancas-casamento&metal=ouro-18k-rose"
  }
]

export function LuxuryShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % showcaseItems.length)
        setIsTransitioning(false)
      }, 500)
    }, 5000) // Muda a cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  const currentItem = showcaseItems[currentIndex]

  return (
    <section className="relative overflow-hidden bg-gray-900 py-24 md:py-32">
      {/* Background Image com transição suave */}
      <div className="absolute inset-0">
        {showcaseItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex && !isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
            {/* Overlay escuro para melhor legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
          </div>
        ))}
      </div>

      {/* Efeito de brilho animado */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>

      {/* Conteúdo */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Ícone decorativo */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-gold animate-pulse" />
              <div className="absolute inset-0 animate-ping">
                <Sparkles className="h-12 w-12 text-gold opacity-75" />
              </div>
            </div>
          </div>

          {/* Texto com transição */}
          <div
            className={`transition-all duration-500 ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {currentItem.title}
            </h2>
            <p className="mt-4 text-xl text-gray-200 md:text-2xl">
              {currentItem.subtitle}
            </p>

            {/* Linha decorativa dourada */}
            <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />

            {/* Botões */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href={currentItem.link}>
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gold text-white hover:bg-gold/90"
                >
                  <span className="relative z-10">Explorar Coleção</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </Button>
              </Link>
              <Link href="/produtos">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-gray-900"
                >
                  Ver Todos os Produtos
                </Button>
              </Link>
            </div>
          </div>

          {/* Indicadores de página */}
          <div className="mt-12 flex justify-center gap-2">
            {showcaseItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true)
                  setTimeout(() => {
                    setCurrentIndex(index)
                    setIsTransitioning(false)
                  }, 500)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-gold'
                    : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Ver ${showcaseItems[index].title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Efeito de partículas de brilho (decorativo) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-2 w-2 animate-twinkle rounded-full bg-gold/60" />
        <div className="absolute left-[85%] top-[15%] h-1 w-1 animate-twinkle rounded-full bg-gold/40" style={{ animationDelay: '1s' }} />
        <div className="absolute left-[70%] top-[70%] h-2 w-2 animate-twinkle rounded-full bg-gold/50" style={{ animationDelay: '2s' }} />
        <div className="absolute left-[20%] top-[80%] h-1 w-1 animate-twinkle rounded-full bg-gold/30" style={{ animationDelay: '1.5s' }} />
        <div className="absolute left-[50%] top-[40%] h-1 w-1 animate-twinkle rounded-full bg-gold/40" style={{ animationDelay: '0.5s' }} />
      </div>
    </section>
  )
}
