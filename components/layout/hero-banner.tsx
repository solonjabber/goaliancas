"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const banners = [
  {
    id: 1,
    title: "Alianças de Casamento",
    subtitle: "Eternize seu amor com alianças em ouro 18k",
    description: "Design exclusivo e qualidade incomparável",
    cta: "Ver Coleção",
    href: "/aliancas-casamento",
    bgColor: "from-beige to-mint",
  },
  {
    id: 2,
    title: "Anéis de Formatura",
    subtitle: "Conquista que merece ser celebrada",
    description: "Personalize com o símbolo do seu curso",
    cta: "Personalize Agora",
    href: "/aneis-formatura",
    bgColor: "from-blue-grey to-beige",
  },
  {
    id: 3,
    title: "Ouro 18k Certificado",
    subtitle: "Máxima pureza e durabilidade",
    description: "Peças que atravessam gerações",
    cta: "Conhecer Produtos",
    href: "/produtos",
    bgColor: "from-gold-light to-beige",
  },
]

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="relative h-[500px] overflow-hidden md:h-[600px]">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className={`h-full bg-gradient-to-r ${banner.bgColor}`}>
            <div className="container mx-auto flex h-full items-center px-4">
              <div className="max-w-2xl space-y-6">
                <p className="text-sm font-medium uppercase tracking-wide text-gold">
                  {banner.subtitle}
                </p>
                <h1 className="font-heading text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                  {banner.title}
                </h1>
                <p className="text-xl text-gray-700">
                  {banner.description}
                </p>
                <Link href={banner.href}>
                  <Button size="lg" className="mt-4">
                    {banner.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-gold"
                : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
