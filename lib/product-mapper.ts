import { API_CONFIG } from './config'
import { Product } from './types'

/**
 * Maps a product from Payload CMS format to the frontend Product type
 * @param payloadProduct - Product data from Payload CMS API
 * @param gallery - Optional gallery images (for products with external gallery storage)
 * @returns Mapped Product object
 */
export function mapPayloadProduct(payloadProduct: any, gallery?: any[]): Product {
  // Map gallery images
  const images = gallery && gallery.length > 0
    ? gallery.map((item: any) => {
        const media = item.media
        if (!media) return ''
        if (typeof media === 'object' && media.url) {
          return media.url.startsWith('http')
            ? media.url
            : `${API_CONFIG.PAYLOAD_URL}${media.url}`
        }
        if (typeof media === 'string') {
          return `${API_CONFIG.PAYLOAD_URL}/api/media/${media}`
        }
        return ''
      }).filter(Boolean)
    : payloadProduct.gallery?.map((item: any) => {
        const media = item.media
        if (!media) return ''
        if (typeof media === 'object' && media.url) {
          return media.url.startsWith('http')
            ? media.url
            : `${API_CONFIG.PAYLOAD_URL}${media.url}`
        }
        if (typeof media === 'string') {
          return `${API_CONFIG.PAYLOAD_URL}/api/media/${media}`
        }
        return ''
      }).filter(Boolean) || []

  return {
    id: payloadProduct.id,
    name: payloadProduct.name,
    slug: payloadProduct.slug,
    description: payloadProduct.description || '',
    price: payloadProduct.price || 0,
    salePrice: payloadProduct.salePrice,
    category: typeof payloadProduct.category === 'object'
      ? payloadProduct.category.slug
      : payloadProduct.category,
    images,
    material: payloadProduct.material,
    weight: payloadProduct.weight,
    dimensions: payloadProduct.dimensions,
    inStock: payloadProduct.inStock ?? true,
    featured: payloadProduct.featured || false,
    allowCustomization: payloadProduct.allowCustomization || false,
    productCollection: payloadProduct.productCollection,
    tags: payloadProduct.tags || [],
    metalType: payloadProduct.material,
    finish: payloadProduct.finish,
    stones: payloadProduct.stones || [],
    engraving: payloadProduct.engraving,
    gender: payloadProduct.gender,
    availability: payloadProduct.inStock ? 'in_stock' : 'out_of_stock',
  }
}

/**
 * Constructs a full image URL from a relative or absolute path
 * @param url - Image URL (can be relative or absolute)
 * @returns Full image URL
 */
export function getImageUrl(url: string | undefined | null): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${API_CONFIG.PAYLOAD_URL}${url.startsWith('/') ? url : `/${url}`}`
}

/**
 * Gets the primary image from a product's gallery
 * @param product - Product object
 * @returns URL of primary image or first image, or empty string
 */
export function getPrimaryImage(product: Product): string {
  if (!product.images || product.images.length === 0) return ''
  return product.images[0]
}
