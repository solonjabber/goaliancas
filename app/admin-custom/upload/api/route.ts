import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://payload-api-production-9a40.up.railway.app'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(request: NextRequest) {
  console.log('[Upload API] ========== NOVA REQUISIÇÃO POST ==========')
  console.log('[Upload API] URL:', request.url)
  console.log('[Upload API] Method:', request.method)
  console.log('[Upload API] Headers:', Object.fromEntries(request.headers.entries()))

  try {
    console.log('[Upload API] Parseando FormData...')
    const formData = await request.formData()
    console.log('[Upload API] FormData parseado com sucesso')
    console.log('[Upload API] FormData keys:', Array.from(formData.keys()))

    const file = formData.get('file') as File
    console.log('[Upload API] Arquivo extraído:', file ? {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)}KB`,
      type: file.type
    } : 'NENHUM ARQUIVO')

    if (!file) {
      console.error('[Upload API] ERRO: Nenhum arquivo')
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      )
    }

    // Verificar tamanho
    const MAX_SIZE = 4 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      console.error('[Upload API] ERRO: Arquivo muito grande')
      return NextResponse.json(
        { error: `Arquivo muito grande. Máximo 4MB.` },
        { status: 413 }
      )
    }

    console.log('[Upload API] Enviando para Payload:', `${API_URL}/api/media`)

    const res = await fetch(`${API_URL}/api/media`, {
      method: 'POST',
      body: formData,
    })

    console.log('[Upload API] Resposta do Payload:', {
      status: res.status,
      ok: res.ok
    })

    if (!res.ok) {
      const contentType = res.headers.get('content-type')
      let errorData

      if (contentType?.includes('application/json')) {
        errorData = await res.json()
      } else {
        const text = await res.text()
        errorData = { message: text }
      }

      console.error('[Upload API] Erro do Payload:', errorData)

      return NextResponse.json(
        { error: 'Erro ao fazer upload da imagem', details: errorData },
        { status: res.status }
      )
    }

    const data = await res.json()
    console.log('[Upload API] Upload bem-sucedido!', {
      id: data.doc?.id,
      filename: data.doc?.filename
    })

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('[Upload API] EXCEÇÃO:', {
      message: error.message,
      stack: error.stack
    })
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
    console.error('[Upload API] Erro ao deletar:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}
