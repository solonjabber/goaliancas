"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProductBySlug, mockProducts } from "@/lib/mock-data"
import { formatCurrency, calculateInstallment, getWhatsAppLink } from "@/lib/utils"
import { useCartStore } from "@/lib/cart-store"
import {
  Heart,
  Share2,
  ShoppingCart,
  MessageCircle,
  Truck,
  Shield,
  Award,
  ChevronLeft,
} from "lucide-react"
import { ProductCard } from "@/components/product/product-card"

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-gray-900">
              Produto não encontrado
            </h1>
            <Link href="/produtos" className="mt-4 inline-block">
              <Button>Voltar para produtos</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price

  const whatsappMessage = `Olá! Tenho interesse no produto: ${product.name} - ${formatCurrency(finalPrice)}`
  const whatsappLink = getWhatsAppLink("41999999999", whatsappMessage)

  // Related products
  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-gray-200 bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-gold">
                Início
              </Link>
              <span>/</span>
              <Link href="/produtos" className="hover:text-gold">
                Produtos
              </Link>
              <span>/</span>
              <span className="text-gray-900">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/produtos"
            className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gold"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar para produtos
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                {product.images[selectedImage] ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-beige p-16">
                    <img
                      src="/imagens/logo-transparente.png"
                      alt={product.name}
                      className="h-full w-full object-contain opacity-30"
                    />
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 ${
                        selectedImage === index
                          ? "border-gold"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Collection */}
              {product.collection && (
                <p className="text-sm font-medium uppercase tracking-wide text-gold">
                  Coleção {product.collection}
                </p>
              )}

              {/* Name */}
              <h1 className="mt-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                {product.name}
              </h1>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {product.discount && (
                  <Badge className="bg-red-500">-{product.discount}%</Badge>
                )}
                {product.featured && <Badge>Destaque</Badge>}
                {product.inStock ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Em Estoque
                  </Badge>
                ) : (
                  <Badge variant="secondary">Esgotado</Badge>
                )}
              </div>

              {/* Price */}
              <div className="mt-6 border-y border-gray-200 py-6">
                {product.discount ? (
                  <div className="space-y-2">
                    <p className="text-lg text-gray-500 line-through">
                      De: {formatCurrency(product.price)}
                    </p>
                    <p className="text-4xl font-bold text-gold">
                      {formatCurrency(finalPrice)}
                    </p>
                  </div>
                ) : (
                  <p className="text-4xl font-bold text-gold">
                    {formatCurrency(product.price)}
                  </p>
                )}
                <p className="mt-2 text-gray-600">
                  ou em até 12x de {calculateInstallment(finalPrice, 12)} sem juros
                </p>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h2 className="font-heading text-lg font-semibold text-gray-900">
                  Descrição
                </h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </div>

              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-heading text-lg font-semibold text-gray-900">
                    Especificações
                  </h2>
                  <ul className="mt-2 space-y-2">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gold" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 space-y-4">
                <Button
                  className="w-full"
                  size="lg"
                  disabled={!product.inStock}
                  onClick={() => addItem(product, quantity)}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Adicionar ao Carrinho
                </Button>

                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full" size="lg">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Comprar pelo WhatsApp
                  </Button>
                </a>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    Favoritar
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-8 space-y-4 rounded-lg bg-gray-50 p-6">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-medium text-gray-900">Entrega Garantida</p>
                    <p className="text-sm text-gray-600">
                      Entrega segura em Curitiba e região
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-medium text-gray-900">Garantia Vitalícia</p>
                    <p className="text-sm text-gray-600">
                      Manutenção gratuita para sua joia
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-medium text-gray-900">Ouro 18k Certificado</p>
                    <p className="text-sm text-gray-600">
                      Certificado de autenticidade incluído
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-8 font-heading text-2xl font-bold text-gray-900">
                Produtos Relacionados
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
