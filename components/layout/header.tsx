"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { useCartStore } from "@/lib/cart-store"
import { NavDropdown } from "./nav-dropdown"
import { MobileNavAccordion } from "./mobile-nav-accordion"

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalItems } = useCartStore()

  return (
    <>
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`fixed left-0 top-0 z-[70] h-full w-64 bg-white shadow-xl transition-transform duration-300 lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <img
            src="/imagens/logo-transparente-nome.png"
            alt="GO Alianças"
            className="h-12 w-auto"
          />
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <nav className="flex flex-col p-4">
          <Link
            href="/produtos"
            className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 hover:text-gold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Produtos
          </Link>

          <MobileNavAccordion
            title="Alianças de Casamento"
            items={[
              {
                label: "Todas as Alianças",
                href: "/produtos?category=aliancas-casamento",
                description: "Ver todo o catálogo"
              },
              {
                label: "Ouro Amarelo",
                href: "/produtos?category=aliancas-casamento&metal=ouro-18k-amarelo",
                description: "Clássicas e tradicionais"
              },
              {
                label: "Ouro Branco",
                href: "/produtos?category=aliancas-casamento&metal=ouro-18k-branco",
                description: "Modernas e elegantes"
              },
              {
                label: "Ouro Rosé",
                href: "/produtos?category=aliancas-casamento&metal=ouro-18k-rose",
                description: "Românticas e exclusivas"
              },
              {
                label: "Com Diamantes",
                href: "/produtos?category=aliancas-casamento&stone=diamante",
                description: "Sofisticação e brilho"
              },
            ]}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />

          <MobileNavAccordion
            title="Anéis de Formatura"
            items={[
              {
                label: "Todos os Anéis",
                href: "/produtos?category=aneis-formatura",
                description: "Ver todo o catálogo"
              },
              {
                label: "Direito",
                href: "/produtos?category=aneis-formatura&collection=Formatura Direito",
                description: "Cursos de Direito"
              },
              {
                label: "Medicina",
                href: "/produtos?category=aneis-formatura&collection=Formatura Medicina",
                description: "Cursos de Medicina"
              },
              {
                label: "Engenharia",
                href: "/produtos?category=aneis-formatura&collection=Formatura Engenharia",
                description: "Cursos de Engenharia"
              },
              {
                label: "Administração",
                href: "/produtos?category=aneis-formatura&collection=Formatura Administração",
                description: "Cursos de Administração"
              },
            ]}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />

          <Link
            href="/sobre"
            className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 hover:text-gold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sobre Nós
          </Link>
          <Link
            href="/contato"
            className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 hover:text-gold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contato
          </Link>
        </nav>
      </div>

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
      <div className="container mx-auto px-4">
        <div className="flex h-[120px] items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center py-2">
            <img
              src="/imagens/logo-transparente-nome.png"
              alt="GO Alianças - Alianças de Casamento em Ouro 18k"
              className="h-[63px] w-auto max-h-full md:h-[71px]"
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

            <NavDropdown
              title="Alianças de Casamento"
              items={[
                {
                  label: "Todas as Alianças",
                  href: "/produtos?category=aliancas-casamento",
                  description: "Ver todo o catálogo"
                },
                {
                  label: "Ouro Amarelo",
                  href: "/produtos?category=aliancas-casamento&metal=ouro-18k-amarelo",
                  description: "Clássicas e tradicionais"
                },
                {
                  label: "Ouro Branco",
                  href: "/produtos?category=aliancas-casamento&metal=ouro-18k-branco",
                  description: "Modernas e elegantes"
                },
                {
                  label: "Ouro Rosé",
                  href: "/produtos?category=aliancas-casamento&metal=ouro-18k-rose",
                  description: "Românticas e exclusivas"
                },
                {
                  label: "Com Diamantes",
                  href: "/produtos?category=aliancas-casamento&stone=diamante",
                  description: "Sofisticação e brilho"
                },
              ]}
            />

            <NavDropdown
              title="Anéis de Formatura"
              items={[
                {
                  label: "Todos os Anéis",
                  href: "/produtos?category=aneis-formatura",
                  description: "Ver todo o catálogo"
                },
                {
                  label: "Direito",
                  href: "/produtos?category=aneis-formatura&collection=Formatura Direito",
                  description: "Cursos de Direito"
                },
                {
                  label: "Medicina",
                  href: "/produtos?category=aneis-formatura&collection=Formatura Medicina",
                  description: "Cursos de Medicina"
                },
                {
                  label: "Engenharia",
                  href: "/produtos?category=aneis-formatura&collection=Formatura Engenharia",
                  description: "Cursos de Engenharia"
                },
                {
                  label: "Administração",
                  href: "/produtos?category=aneis-formatura&collection=Formatura Administração",
                  description: "Cursos de Administração"
                },
              ]}
            />

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
