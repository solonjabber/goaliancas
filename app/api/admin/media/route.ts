import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://payload-api-production-9a40.up.railway.app'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    console.log('[API] Enviando imagem para Payload...')

    const res = await fetch(`${API_URL}/api/media`, {
      method: 'POST',
      body: formData, // Envia o FormData diretamente
    })

    const data = await res.json()

    console.log('[API] Resposta do Payload:', { status: res.status, data })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Erro ao fazer upload da imagem', details: data },
        { status: res.status }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Erro ao fazer upload:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID da imagem é obrigatório' },
        { status: 400 }
      )
    }

    console.log('[API] Deletando imagem:', id)

    const res = await fetch(`${API_URL}/api/media/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      const data = await res.json()
      return NextResponse.json(
        { error: 'Erro ao deletar imagem', details: data },
        { status: res.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Erro ao deletar imagem:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}
