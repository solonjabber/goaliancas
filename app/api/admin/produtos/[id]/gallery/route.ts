import { NextRequest, NextResponse } from 'next/server'
import { put, head } from '@vercel/blob'

// Usar Vercel Blob para armazenar as galleries como JSON
const GALLERY_STORAGE_KEY = 'product-galleries.json'

interface ProductGallery {
  productId: string
  gallery: Array<{
    media: {
      id: string
      url: string
      alt?: string
      filename: string
    }
    isPrimary: boolean
    id: string
  }>
}

// Carregar todas as galleries do storage
async function loadGalleries(): Promise<Record<string, ProductGallery['gallery']>> {
  try {
    // Verificar se o arquivo existe
    const blobInfo = await head(GALLERY_STORAGE_KEY).catch(() => null)

    if (!blobInfo) {
      console.log('[GALLERY] Arquivo de galleries não existe ainda, retornando objeto vazio')
      return {}
    }

    // Buscar o arquivo
    const response = await fetch(blobInfo.url)
    if (!response.ok) {
      console.error('[GALLERY] Erro ao buscar galleries:', response.status)
      return {}
    }

    const data = await response.json()
    console.log('[GALLERY] Galleries carregadas:', Object.keys(data).length, 'produtos')
    return data
  } catch (error) {
    console.error('[GALLERY] Erro ao carregar galleries:', error)
    return {}
  }
}

// Salvar galleries no storage
async function saveGalleries(galleries: Record<string, ProductGallery['gallery']>) {
  try {
    const jsonString = JSON.stringify(galleries, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })

    const result = await put(GALLERY_STORAGE_KEY, blob, {
      access: 'public',
    })

    console.log('[GALLERY] Galleries salvas com sucesso:', result.url)
    return result
  } catch (error) {
    console.error('[GALLERY] Erro ao salvar galleries:', error)
    throw error
  }
}

// GET - Buscar gallery de um produto
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('[GALLERY-GET] Buscando gallery do produto:', id)

    const galleries = await loadGalleries()
    const productGallery = galleries[id] || []

    console.log('[GALLERY-GET] Gallery encontrada:', productGallery.length, 'imagens')

    return NextResponse.json({
      gallery: productGallery
    })
  } catch (error: any) {
    console.error('[GALLERY-GET] Erro ao buscar gallery:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}

// PUT - Atualizar gallery de um produto
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    console.log('[GALLERY-PUT] Atualizando gallery do produto:', id)
    console.log('[GALLERY-PUT] Nova gallery:', body.gallery?.length || 0, 'imagens')

    // Carregar galleries existentes
    const galleries = await loadGalleries()

    // Atualizar gallery do produto
    galleries[id] = body.gallery || []

    // Salvar de volta
    await saveGalleries(galleries)

    console.log('[GALLERY-PUT] Gallery do produto', id, 'atualizada com sucesso')

    return NextResponse.json({ success: true, gallery: galleries[id] })
  } catch (error: any) {
    console.error('[GALLERY-PUT] Erro ao atualizar gallery:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}
