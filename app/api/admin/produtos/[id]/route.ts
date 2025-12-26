import { NextRequest, NextResponse } from 'next/server'
import { getAuthHeaders } from '@/lib/payload-auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://payload-api-production-9a40.up.railway.app'

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
      gallery: body.gallery || [], // Galeria de imagens
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

    console.log('[API-UPDATE] Produto atualizado com sucesso')
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
