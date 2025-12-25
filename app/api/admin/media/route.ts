import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://payload-api-production-9a40.up.railway.app'

// Configuração para aumentar limite de body (max 4.5MB no Vercel)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      )
    }

    // Verificar tamanho do arquivo (max 4MB para evitar erros no Vercel)
    const MAX_SIZE = 4 * 1024 * 1024 // 4MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `Arquivo muito grande. Tamanho máximo: 4MB. Tamanho do arquivo: ${(file.size / 1024 / 1024).toFixed(2)}MB` },
        { status: 413 }
      )
    }

    console.log('[API] Enviando imagem para Payload:', {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)}KB`,
      type: file.type
    })

    const res = await fetch(`${API_URL}/api/media`, {
      method: 'POST',
      body: formData,
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

      console.error('[API] Erro do Payload:', { status: res.status, errorData })

      return NextResponse.json(
        { error: 'Erro ao fazer upload da imagem', details: errorData },
        { status: res.status }
      )
    }

    const data = await res.json()
    console.log('[API] Upload bem-sucedido:', { id: data.doc?.id, filename: data.doc?.filename })

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('[API] Erro ao fazer upload:', error)
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
