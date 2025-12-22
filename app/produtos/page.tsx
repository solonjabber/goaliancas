"use client"

import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProdutosContent } from "@/components/produtos/produtos-content"

export default function ProdutosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Suspense fallback={<div className="flex-1">Carregando...</div>}>
        <ProdutosContent />
      </Suspense>
      <Footer />
    </div>
  )
}
