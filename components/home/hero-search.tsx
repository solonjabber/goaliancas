"use client"

import { SearchBar } from "@/components/layout/search-bar"

export function HeroSearch() {
  return (
    <section className="relative -mt-8 z-10 lg:hidden">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Card com sombra para destacar */}
          <div className="rounded-2xl bg-white p-6 shadow-2xl lg:p-8">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                O que você procura?
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Encontre a aliança ou anel perfeito para você
              </p>
            </div>

            {/* Campo de Busca */}
            <div className="mx-auto max-w-xl">
              <SearchBar />
            </div>

            {/* Tags de Busca Rápida */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-gray-500">Busca rápida:</span>
              <a
                href="/produtos?category=aliancas-de-casamento"
                className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700"
              >
                Alianças de Casamento
              </a>
              <a
                href="/produtos?category=aneis-de-formatura"
                className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700"
              >
                Anéis de Formatura
              </a>
              <a
                href="/produtos?metal=ouro_18k"
                className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700"
              >
                Ouro 18k
              </a>
              <a
                href="/produtos?stone=diamante"
                className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700"
              >
                Com Diamantes
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
