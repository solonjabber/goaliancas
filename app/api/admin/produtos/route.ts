import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://payload-api-production-9a40.up.railway.app'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Preparar dados no formato que o Payload espera
    const payloadData = {
      name: body.name,
      sku: `SKU-${Date.now()}`, // Gerar SKU único
      price: body.price,
      salePrice: body.salePrice || undefined,
      metal: body.metal || '',
      weight: body.weight || undefined,
      width: body.width || undefined,
      stock: body.stock,
      category: body.category, // ID da categoria
      featured: body.featured || false,
      allowCustomization: body.allowCustomization || false,
      status: 'published', // Sempre publicar
      description: body.description || '',
    }

    console.log('[API] Enviando dados para Payload:', payloadData)

    const res = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}
