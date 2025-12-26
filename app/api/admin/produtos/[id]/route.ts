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
    const result = await put(GALLERY_STORAGE_KEY, blob, { access: 'public' })
    console.log('[GALLERY] Salvo com sucesso:', result.url)
    return result
  } catch (error) {
    console.error('[GALLERY] Erro ao salvar:', error)
    throw error
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Obter headers de autenticação
    const authHeaders = await getAuthHeaders()

    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE',
      headers: authHeaders,
    })

    if (!res.ok) {
      const error = await res.json()
      return NextResponse.json(
        { error: 'Erro ao deletar produto', details: error },
        { status: res.status }
      )
    }

    return NextResponse.json({ success: true, message: 'Produto deletado com sucesso' })
  } catch (error: any) {
    console.error('Erro ao deletar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    console.log('[API-UPDATE] Iniciando atualização do produto:', id)
    console.log('[API-UPDATE] Dados recebidos:', body)

    // Preparar dados no formato que o Payload espera
    // NOTA: Não enviamos gallery porque usamos Vercel Blob Storage (externo ao Payload)
    const payloadData = {
      name: body.name,
      price: body.price,
      salePrice: body.salePrice || undefined,
      metal: body.metal || '',
      weight: body.weight || undefined,
      width: body.width || undefined,
      stock: body.stock,
      category: body.category,
      featured: body.featured || false,
      allowCustomization: body.allowCustomization || false,
      description: body.description || '',
      // gallery não é enviada ao Payload - gerenciada separadamente via Vercel Blob
    }

    console.log('[API-UPDATE] Dados preparados para Payload:')
    console.log(JSON.stringify(payloadData, null, 2))

    // Log específico da gallery
    console.log('[API-UPDATE] Gallery detalhada:')
    if (payloadData.gallery && payloadData.gallery.length > 0) {
      payloadData.gallery.forEach((item, index) => {
        console.log(`  [${index}]:`, JSON.stringify(item, null, 2))
      })
    } else {
      console.log('  Gallery vazia ou undefined')
    }

    // Obter headers de autenticação
    console.log('[API-UPDATE] Obtendo headers de autenticação...')
    const authHeaders = await getAuthHeaders()
    console.log('[API-UPDATE] Headers obtidos com sucesso')

    console.log('[API-UPDATE] Enviando requisição para:', `${API_URL}/api/products/${id}`)
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'PATCH', // Payload usa PATCH para updates parciais
      headers: authHeaders,
      body: JSON.stringify(payloadData),
    })

    console.log('[API-UPDATE] Status da resposta:', res.status)

    const data = await res.json()

    console.log('[API-UPDATE] Resposta completa do Payload:')
    console.log(JSON.stringify(data, null, 2))

    if (!res.ok) {
      console.error('[API-UPDATE] Erro na atualização:', data)
      return NextResponse.json(
        { error: 'Erro ao atualizar produto', details: data },
        { status: res.status }
      )
    }

    console.log('[API-UPDATE] Produto atualizado com sucesso no Payload')

    // Salvar gallery separadamente (via Vercel Blob Storage)
    if (body.gallery && Array.isArray(body.gallery)) {
      console.log('[API-UPDATE] Salvando gallery:', body.gallery.length, 'imagens')
      try {
        // Carregar galleries existentes
        const galleries = await loadGalleries()

        // Atualizar gallery do produto
        galleries[id] = body.gallery

        // Salvar de volta
        await saveGalleries(galleries)

        console.log('[API-UPDATE] Gallery salva com sucesso!')
      } catch (error) {
        console.error('[API-UPDATE] Erro ao salvar gallery:', error)
        // Não falhar a requisição se a gallery não for salva
      }
    } else {
      console.log('[API-UPDATE] Nenhuma gallery para salvar')
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('[API-UPDATE] Erro ao atualizar produto:', error)
    console.error('[API-UPDATE] Stack:', error.stack)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message, stack: error.stack },
      { status: 500 }
    )
  }
}
