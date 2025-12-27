'use client'

import { Phone, Award, Shield, Heart } from "lucide-react"
import { useSiteTexts } from "@/hooks/use-site-texts"

export function WhyChooseUs() {
  const { texts } = useSiteTexts()

  const icons = {
    quality: Award,
    personalization: Heart,
    warranty: Shield,
    service: Phone
  }

  // Verificar se os dados estão carregados
  if (!texts || !texts.whyChooseUs) {
    return null
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            {texts.whyChooseUs.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {texts.whyChooseUs.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(texts.whyChooseUs.features).map(([key, feature]) => {
            const Icon = icons[key as keyof typeof icons]
            return (
              <div key={key} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Icon className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
