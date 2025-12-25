import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://payload-api-production-9a40.up.railway.app'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE',
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

    console.log('[API] Atualizando produto:', id, payloadData)

    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'PATCH', // Payload usa PATCH para updates parciais
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payloadData),
    })

    const data = await res.json()

    console.log('[API] Resposta do Payload:', { status: res.status, data })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Erro ao atualizar produto', details: data },
        { status: res.status }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Erro ao atualizar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}
