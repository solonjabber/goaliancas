import { NextRequest, NextResponse } from 'next/server'
import { put, del } from '@vercel/blob'

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
    const response = await fetch(`https://blob.vercel-storage.com/${GALLERY_STORAGE_KEY}`)
    if (!response.ok) return {}
    return await response.json()
  } catch (error) {
    return {}
  }
}

// Salvar galleries no storage
async function saveGalleries(galleries: Record<string, ProductGallery['gallery']>) {
  const blob = new Blob([JSON.stringify(galleries, null, 2)], { type: 'application/json' })
  await put(GALLERY_STORAGE_KEY, blob, {
    access: 'public',
  })
}

// GET - Buscar gallery de um produto
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const galleries = await loadGalleries()

    return NextResponse.json({
      gallery: galleries[id] || []
    })
  } catch (error: any) {
    console.error('Erro ao buscar gallery:', error)
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

    // Carregar galleries existentes
    const galleries = await loadGalleries()

    // Atualizar gallery do produto
    galleries[id] = body.gallery || []

    // Salvar de volta
    await saveGalleries(galleries)

    console.log(`[GALLERY] Gallery do produto ${id} atualizada com sucesso`)

    return NextResponse.json({ success: true, gallery: galleries[id] })
  } catch (error: any) {
    console.error('Erro ao atualizar gallery:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}
