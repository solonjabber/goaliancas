// Serviço de API para buscar dados do Payload CMS

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Helper function para fazer requisições
async function fetchFromPayload(endpoint: string, options = {}) {
  try {
    const response = await fetch(`${PAYLOAD_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...((options as any).headers || {}),
      },
    })

    if (!response.ok) {
      throw new Error(`Payload API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching from Payload: ${endpoint}`, error)
    return null
  }
}

// Hero Banners
export async function getHeroBanners() {
  const data = await fetchFromPayload('/hero-banners?where[active][equals]=true&sort=order')
  return data?.docs || []
}

// Site Settings (retorna o primeiro documento)
export async function getSiteSettings() {
  const data = await fetchFromPayload('/site-settings?limit=1')
  return data?.docs?.[0] || null
}

// Testimonials
export async function getTestimonials(options = {}) {
  const { featured = false, approved = true, limit = 100 } = options as any

  let query = `/testimonials?limit=${limit}`

  if (approved) {
    query += '&where[approved][equals]=true'
  }

  if (featured) {
    query += '&where[featured][equals]=true'
  }

  const data = await fetchFromPayload(query)
  return data?.docs || []
}

export async function getFeaturedTestimonials() {
  return getTestimonials({ featured: true, limit: 3 })
}

export async function getTestimonialsForAbout() {
  const data = await fetchFromPayload('/testimonials?where[displayOnAboutPage][equals]=true&where[approved][equals]=true&limit=3')
  return data?.docs || []
}

export async function getTestimonialsForHomepage() {
  const data = await fetchFromPayload('/testimonials?where[displayOnHomepage][equals]=true&where[approved][equals]=true&limit=3')
  return data?.docs || []
}

// Products
export async function getProducts(options = {}) {
  const { category, featured = false, limit = 100, status = 'published' } = options as any

  let query = `/products?limit=${limit}&where[status][equals]=${status}`

  if (category) {
    query += `&where[category][equals]=${category}`
  }

  if (featured) {
    query += '&where[featured][equals]=true'
  }

  const data = await fetchFromPayload(query)
  return data?.docs || []
}

export async function getFeaturedProducts() {
  const products = await getProducts({ featured: true, limit: 4 })
  return products.map(mapPayloadProduct)
}

export async function getProductBySlug(slug: string) {
  const data = await fetchFromPayload(`/products?where[slug][equals]=${slug}&where[status][equals]=published&limit=1`)
  const product = data?.docs?.[0]
  return product ? mapPayloadProduct(product) : null
}

export async function getProductsByCategory(categorySlug: string) {
  const data = await fetchFromPayload(`/products?where[category.slug][equals]=${categorySlug}&where[status][equals]=published`)
  const products = data?.docs || []
  return products.map(mapPayloadProduct)
}

// Categories
export async function getCategories() {
  const data = await fetchFromPayload('/categories')
  return data?.docs || []
}

export async function getFeaturedCategories() {
  const data = await fetchFromPayload('/categories?where[featured][equals]=true')
  return data?.docs || []
}

export async function getCategoryBySlug(slug: string) {
  const data = await fetchFromPayload(`/categories?where[slug][equals]=${slug}&limit=1`)
  return data?.docs?.[0] || null
}

// Media
export async function getMediaById(id: string) {
  const data = await fetchFromPayload(`/media/${id}`)
  return data || null
}

// Helper para obter URL completa da imagem
export function getImageUrl(media: any): string {
  if (!media) return ''

  if (typeof media === 'string') {
    // Se for ID, retorna URL da API
    return `${PAYLOAD_API_URL}/media/${media}`
  }

  // Se for objeto com URL
  return media.url || ''
}

// Converter produto do Payload para formato do frontend
export function mapPayloadProduct(payloadProduct: any): any {
  return {
    id: payloadProduct.id,
    name: payloadProduct.name,
    slug: payloadProduct.slug,
    description: payloadProduct.description,
    price: payloadProduct.price,
    images: payloadProduct.gallery?.map((item: any) => getImageUrl(item.media)) || [],
    category: payloadProduct.category?.slug || '',
    metalType: payloadProduct.material,
    collection: payloadProduct.productCollection,
    weight: payloadProduct.weight,
    width: payloadProduct.dimensions ? parseFloat(payloadProduct.dimensions.match(/\d+/)?.[0] || '0') : undefined,
    inStock: payloadProduct.inStock,
    featured: payloadProduct.featured,
    discount: payloadProduct.salePrice ? Math.round((1 - payloadProduct.salePrice / payloadProduct.price) * 100) : undefined,
    specifications: [],
    customizable: payloadProduct.allowCustomization,
    keywords: [],
    tags: payloadProduct.tags || [],
  }
}
