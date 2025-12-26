import { NextRequest, NextResponse } from 'next/server'
import { getAuthHeaders } from '@/lib/payload-auth'
import { put, head } from '@vercel/blob'

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://payload-api-production-9a40.up.railway.app'
const GALLERY_STORAGE_KEY = 'product-galleries.json'

// Funções para gerenciar galleries
async function loadGalleries(): Promise<Record<string, any[]>> {
  try {
    const blobInfo = await head(GALLERY_STORAGE_KEY).catch(() => null)
    if (!blobInfo) return {}

    const response = await fetch(blobInfo.url)
    if (!response.ok) return {}

    return await response.json()
  } catch (error) {
    console.error('[GALLERY] Erro ao carregar:', error)
    return {}
  }
}

async function saveGalleries(galleries: Record<string, any[]>) {
  try {
    const jsonString = JSON.stringify(galleries, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const result = await put(GALLERY_STORAGE_KEY, blob, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    console.log('[GALLERY] Salvo com sucesso:', result.url)
    return result
  } catch (error) {
    console.error('[GALLERY] Erro ao salvar:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Preparar dados no formato que o Payload espera
    const payloadData = {
      name: body.name,
      slug: body.slug,
      sku: `SKU-${Date.now()}`, // Gerar SKU único
      price: body.price,
      salePrice: body.salePrice || undefined,
      material: body.material,
      weight: body.weight || undefined,
      dimensions: body.dimensions || '',
      stockQuantity: body.stock,
      inStock: body.inStock !== undefined ? body.inStock : true,
      category: body.category, // ID da categoria
      featured: body.featured || false,
      allowCustomization: body.allowCustomization || false,
      productCollection: body.productCollection || '',
      tags: body.tags || [],
      status: 'published', // Sempre publicar
      description: body.description || '',
      seo: body.seo || {},
      gallery: [], // Galeria gerenciada via Vercel Blob Storage
    }

    console.log('[API] Enviando dados para Payload:', payloadData)

    // Obter headers de autenticação
    const authHeaders = await getAuthHeaders()

    const res = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(payloadData),
    })

    const data = await res.json()

    console.log('[API] Resposta do Payload:', { status: res.status, data })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Erro ao criar produto', details: data },
        { status: res.status }
      )
    }

    console.log('[API-CREATE] Produto criado com sucesso no Payload:', data.doc?.id)

    // Salvar gallery separadamente (via Vercel Blob Storage)
    if (body.gallery && Array.isArray(body.gallery) && body.gallery.length > 0) {
      console.log('[API-CREATE] Salvando gallery:', body.gallery.length, 'imagens')
      try {
        const galleries = await loadGalleries()
        galleries[data.doc.id] = body.gallery
        await saveGalleries(galleries)
        console.log('[API-CREATE] Gallery salva com sucesso!')
      } catch (error) {
        console.error('[API-CREATE] Erro ao salvar gallery:', error)
        // Não falhar a requisição se a gallery não for salva
      }
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}
