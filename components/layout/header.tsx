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
import { SearchBar } from "./search-bar"
import { useSiteTexts } from "@/hooks/use-site-texts"

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalItems } = useCartStore()
  const { texts, loading } = useSiteTexts()

  // Garantir que texts.header existe antes de acessar propriedades
  if (!texts || !texts.header) {
    return null // ou um skeleton/loading state
  }

  // Criar arrays DEPOIS da verificação para evitar erros
  const weddingRingsItems = texts.header?.weddingRingsDropdown ? [
    {
      label: texts.header.weddingRingsDropdown.all?.label || 'Todas as Alianças',
      href: "/produtos?category=aliancas-de-casamento",
      description: texts.header.weddingRingsDropdown.all?.description || 'Ver todo o catálogo'
    },
    {
      label: texts.header.weddingRingsDropdown.yellow?.label || 'Ouro Amarelo',
      href: "/produtos?category=aliancas-de-casamento&metal=ouro_18k",
      description: texts.header.weddingRingsDropdown.yellow?.description || 'Clássicas e tradicionais'
    },
    {
      label: texts.header.weddingRingsDropdown.white?.label || 'Ouro Branco',
      href: "/produtos?category=aliancas-de-casamento&metal=ouro_branco",
      description: texts.header.weddingRingsDropdown.white?.description || 'Modernas e elegantes'
    },
    {
      label: texts.header.weddingRingsDropdown.rose?.label || 'Ouro Rosé',
      href: "/produtos?category=aliancas-de-casamento&metal=ouro_rose",
      description: texts.header.weddingRingsDropdown.rose?.description || 'Românticas e exclusivas'
    },
    {
      label: texts.header.weddingRingsDropdown.diamonds?.label || 'Com Diamantes',
      href: "/produtos?category=aliancas-de-casamento&stone=diamante",
      description: texts.header.weddingRingsDropdown.diamonds?.description || 'Sofisticação e brilho'
    },
  ] : []

  const graduationRingsItems = texts.header?.graduationRingsDropdown ? [
    {
      label: texts.header.graduationRingsDropdown.all?.label || 'Todos os Anéis',
      href: "/produtos?category=aneis-de-formatura",
      description: texts.header.graduationRingsDropdown.all?.description || 'Ver todo o catálogo'
    },
    {
      label: texts.header.graduationRingsDropdown.law?.label || 'Direito',
      href: "/produtos?category=aneis-de-formatura&collection=Formatura Direito",
      description: texts.header.graduationRingsDropdown.law?.description || 'Cursos de Direito'
    },
    {
      label: texts.header.graduationRingsDropdown.medicine?.label || 'Medicina',
      href: "/produtos?category=aneis-de-formatura&collection=Formatura Medicina",
      description: texts.header.graduationRingsDropdown.medicine?.description || 'Cursos de Medicina'
    },
    {
      label: texts.header.graduationRingsDropdown.engineering?.label || 'Engenharia',
      href: "/produtos?category=aneis-de-formatura&collection=Formatura Engenharia",
      description: texts.header.graduationRingsDropdown.engineering?.description || 'Cursos de Engenharia'
    },
    {
      label: texts.header.graduationRingsDropdown.administration?.label || 'Administração',
      href: "/produtos?category=aneis-de-formatura&collection=Formatura Administração",
      description: texts.header.graduationRingsDropdown.administration?.description || 'Cursos de Administração'
    },
  ] : []

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
      <div className={`fixed left-0 top-0 z-[70] h-full w-80 bg-white shadow-xl transition-transform duration-300 lg:hidden ${ isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full' }`}>
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

        {/* Search Bar - Mobile */}
        <div className="border-b border-gray-200 p-4">
          <SearchBar />
        </div>

        <nav className="flex flex-col p-4">
          <Link
            href="/produtos"
            className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 hover:text-gold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {texts.header.menuItems.products}
          </Link>

          <MobileNavAccordion
            title={texts.header.menuItems.weddingRings}
            items={weddingRingsItems}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />

          <MobileNavAccordion
            title={texts.header.menuItems.graduationRings}
            items={graduationRingsItems}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />

          <Link
            href="/sobre"
            className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 hover:text-gold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {texts.header.menuItems.about}
          </Link>
          <Link
            href="/contato"
            className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 hover:text-gold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {texts.header.menuItems.contact}
          </Link>
        </nav>
      </div>

    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Top Bar */}
      <div className="bg-beige py-2">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-700">
            {texts.header.topBar}
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-[120px] items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center py-2 flex-shrink-0">
            <img
              src="/imagens/logo-transparente-nome.png"
              alt="GO Alianças - Alianças de Casamento em Ouro 18k"
              className="h-[63px] w-auto max-h-full md:h-[71px]"
            />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex lg:flex-1 lg:max-w-md lg:mx-8">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-8">
            <Link
              href="/produtos"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gold"
            >
              {texts.header.menuItems.products}
            </Link>

            <NavDropdown
              title={texts.header.menuItems.weddingRings}
              items={weddingRingsItems}
            />

            <NavDropdown
              title={texts.header.menuItems.graduationRings}
              items={graduationRingsItems}
            />

            <Link
              href="/sobre"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gold"
            >
              {texts.header.menuItems.about}
            </Link>
            <Link
              href="/contato"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gold"
            >
              {texts.header.menuItems.contact}
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
