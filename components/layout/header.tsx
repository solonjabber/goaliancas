"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Heart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { useCartStore } from "@/lib/cart-store"

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCartStore()

  return (
    <>
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Top Bar */}
      <div className="bg-beige py-2">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-700">
            Alianças de Casamento em Ouro 18k | Entrega em Curitiba e Região
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button className="lg:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/imagens/logo-transparente-nome.png"
              alt="GO Alianças - Alianças de Casamento em Ouro 18k"
              className="h-12 w-auto md:h-14"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-8">
            <Link
              href="/produtos"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gold"
            >
              Produtos
            </Link>
            <Link
              href="/aliancas-casamento"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gold"
            >
              Alianças de Casamento
            </Link>
            <Link
              href="/aneis-formatura"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gold"
            >
              Anéis de Formatura
            </Link>
            <Link
              href="/sobre"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gold"
            >
              Sobre Nós
            </Link>
            <Link
              href="/contato"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gold"
            >
              Contato
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex">
              <Heart className="h-5 w-5 text-gray-700 hover:text-gold" />
            </button>
            <button className="hidden sm:flex">
              <User className="h-5 w-5 text-gray-700 hover:text-gold" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700 hover:text-gold" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}
