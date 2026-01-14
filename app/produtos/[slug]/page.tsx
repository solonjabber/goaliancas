"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, calculateInstallment, getWhatsAppLink } from "@/lib/utils"
import { useCartStore } from "@/lib/cart-store"
import { useFilterStore } from "@/lib/filter-store"
import { Product } from "@/lib/types"
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

// Garantir que a URL sempre aponta para a API do Payload CMS
const PAYLOAD_API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.158-173-2-44.nip.io'
const PAYLOAD_API_URL = `${PAYLOAD_API_BASE}/api`

// Função para extrair ID do YouTube
function extractYoutubeId(url: string): string | null {
  if (!url) return null

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
    /(?:youtu\.be\/)([^&\s]+)/,
    /(?:youtube\.com\/embed\/)([^&\s]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [includeEngraving, setIncludeEngraving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [galleryItems, setGalleryItems] = useState<Array<{type: 'image' | 'youtube', src: string}>>([])
  const { addItem } = useCartStore()
  const { allProducts } = useFilterStore()

  // Buscar produto pelo slug
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${PAYLOAD_API_URL}/vps-products`)
        const data = await response.json()

        if (data?.docs && data.docs.length > 0) {
          // Filtrar pelo slug
          const payloadProduct = data.docs.find((p: any) => p.slug === slug)
          
          if (!payloadProduct) {
            console.error("Produto não encontrado:", slug)
            setIsLoading(false)
            return
          }

          // Processar galeria do produto (imagens e vídeos YouTube)
          let galleryImages: string[] = []
          let processedGalleryItems: Array<{type: 'image' | 'youtube', src: string}> = []

          if (payloadProduct.gallery && Array.isArray(payloadProduct.gallery)) {
            // Ordenar: imagem principal primeiro
            const sortedGallery = payloadProduct.gallery.sort((a: any, b: any) =>
              (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0)
            )

            // Processar cada item da galeria
            sortedGallery.forEach((item: any) => {
              if (item.mediaType === 'youtube' && item.youtubeUrl) {
                // Extrair ID do YouTube
                const videoId = extractYoutubeId(item.youtubeUrl)
                if (videoId) {
                  processedGalleryItems.push({
                    type: 'youtube',
                    src: videoId
                  })
                  galleryImages.push(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
                }
              } else if (item.media?.url) {
                processedGalleryItems.push({
                  type: 'image',
                  src: item.media.url
                })
                galleryImages.push(item.media.url)
              }
            })
          }

          setGalleryItems(processedGalleryItems)

          // Construir especificações a partir dos campos do produto
          const specifications: string[] = []

          // Material
          if (payloadProduct.material) {
            const materialLabels: Record<string, string> = {
              'ouro_18k': 'Ouro 18k',
              'ouro_14k': 'Ouro 14k',
              'prata_925': 'Prata 925',
              'ouro_branco': 'Ouro Branco',
              'ouro_rose': 'Ouro Rose'
            }
            const materialLabel = materialLabels[payloadProduct.material] || payloadProduct.material
            specifications.push(`Material: ${materialLabel}`)
          }

          // Peso
          if (payloadProduct.weight) {
            specifications.push(`Peso: ${payloadProduct.weight}g`)
          }

          // Dimensões
          if (payloadProduct.dimensions) {
            specifications.push(`Dimensões: ${payloadProduct.dimensions}`)
          }

          const mappedProduct: Product = {
            id: payloadProduct.id,
            name: payloadProduct.name,
            slug: payloadProduct.slug,
            description: payloadProduct.description,
            price: payloadProduct.price,
            salePrice: payloadProduct.salePrice,
            images: galleryImages,
            category: payloadProduct.category?.slug || '',
            metalType: payloadProduct.material,
            collection: payloadProduct.productCollection,
            weight: payloadProduct.weight,
            inStock: payloadProduct.inStock,
            featured: payloadProduct.featured,
            discount: payloadProduct.salePrice ? Math.round((1 - payloadProduct.salePrice / payloadProduct.price) * 100) : undefined,
            specifications,
            customizable: payloadProduct.allowCustomization,
            keywords: [],
            tags: payloadProduct.tags || [],
            availableSizes: payloadProduct.availableSizes || [],
            engravingPrice: payloadProduct.engravingPrice || 100,
          } as Product

          setProduct(mappedProduct)

          // Buscar produtos relacionados
          if (allProducts.length > 0) {
            const related = allProducts
              .filter((p: Product) => p.category === mappedProduct.category && p.id !== mappedProduct.id)
              .slice(0, 4)
            setRelatedProducts(related)
          }
        }
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [slug, allProducts])

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

  // Calcular preço final incluindo gravação se selecionada
  const basePrice = product.salePrice || product.price
  const engravingCost = includeEngraving ? (product.engravingPrice || 100) : 0
  const finalPrice = basePrice + engravingCost

  // Montar mensagem do WhatsApp com todas as opções selecionadas
  let whatsappMessage = `Olá! Tenho interesse no produto:\n\n*${product.name}*\n`
  if (selectedSize) {
    whatsappMessage += `Tamanho: Aro ${selectedSize}\n`
  }
  if (includeEngraving) {
    whatsappMessage += `Com gravação interna (+${formatCurrency(engravingCost)})\n`
  }
  whatsappMessage += `\n*Valor Total: ${formatCurrency(finalPrice)}*`

  const whatsappLink = getWhatsAppLink("5567992028048", whatsappMessage)

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Carregando produto...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

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
              {/* Main Image/Video */}
              <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                {galleryItems[selectedImage] ? (
                  galleryItems[selectedImage].type === 'youtube' ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${galleryItems[selectedImage].src}?autoplay=0&mute=0&controls=1`}
                      title={product.name}
                      className="h-full w-full"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      src={galleryItems[selectedImage].src}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  )
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
                      {formatCurrency(basePrice)}
                    </p>
                  </div>
                ) : (
                  <p className="text-4xl font-bold text-gold">
                    {formatCurrency(basePrice)}
                  </p>
                )}
                {includeEngraving && (
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-gold/10 p-3">
                    <span className="text-sm font-medium text-gray-700">Gravação interna</span>
                    <span className="text-lg font-bold text-gold">+ {formatCurrency(engravingCost)}</span>
                  </div>
                )}
                {includeEngraving && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total:</span>
                      <span className="text-3xl font-bold text-gold">{formatCurrency(finalPrice)}</span>
                    </div>
                  </div>
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

              {/* Size Selection */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-heading text-lg font-semibold text-gray-900 mb-3">
                    Selecione o Tamanho/Aro
                  </h2>
                  <div className="grid grid-cols-5 gap-2">
                    {product.availableSizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-3 border-2 rounded-lg font-medium transition-colors ${
                          selectedSize === size
                            ? 'border-gold bg-gold text-white'
                            : 'border-gray-300 hover:border-gold'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Engraving Option */}
              {product.customizable && (
                <div className="mt-6">
                  <h2 className="font-heading text-lg font-semibold text-gray-900 mb-3">
                    Personalização
                  </h2>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeEngraving}
                      onChange={(e) => setIncludeEngraving(e.target.checked)}
                      className="w-5 h-5 text-gold border-gray-300 rounded focus:ring-gold"
                    />
                    <span className="text-gray-700">
                      Adicionar gravação interna <span className="font-semibold text-gold">+ {formatCurrency(product.engravingPrice || 100)}</span>
                    </span>
                  </label>
                  {includeEngraving && (
                    <p className="mt-2 text-sm text-gray-600">
                      A gravação será personalizada conforme sua solicitação no WhatsApp
                    </p>
                  )}
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
