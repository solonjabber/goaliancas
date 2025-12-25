import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://payload-api-production-9a40.up.railway.app'

// GET - Buscar configurações do site
export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/site-settings?limit=1`)
    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Erro ao buscar configurações', details: data },
        { status: res.status }
      )
    }

    // Retornar primeiro documento ou objeto vazio
    return NextResponse.json(data.docs?.[0] || {})
  } catch (error: any) {
    console.error('Erro ao buscar configurações:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}

// POST - Criar ou atualizar configurações
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Primeiro, verificar se já existe um documento
    const getRes = await fetch(`${API_URL}/api/site-settings?limit=1`)
    const getData = await getRes.json()
    const existingDoc = getData.docs?.[0]

    let res
    if (existingDoc) {
      // Atualizar documento existente
      res = await fetch(`${API_URL}/api/site-settings/${existingDoc.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } else {
      // Criar novo documento
      res = await fetch(`${API_URL}/api/site-settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    }

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Erro ao salvar configurações', details: data },
        { status: res.status }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Erro ao salvar configurações:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}
