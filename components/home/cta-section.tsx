'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSiteTexts } from "@/hooks/use-site-texts"

export function CTASection() {
  const { texts } = useSiteTexts()

  // Verificar se os dados estão carregados
  if (!texts || !texts.cta) {
    return null
  }

  return (
    <section className="bg-gradient-to-r from-gold-light to-beige py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
          {texts.cta.title}
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          {texts.cta.subtitle}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/produtos">
            <Button size="lg">
              {texts.cta.primaryButton}
            </Button>
          </Link>
          <Link href="/contato">
            <Button size="lg" variant="outline">
              {texts.cta.secondaryButton}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
