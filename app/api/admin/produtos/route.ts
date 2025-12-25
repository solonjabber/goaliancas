import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://payload-api-production-9a40.up.railway.app'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const res = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

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
