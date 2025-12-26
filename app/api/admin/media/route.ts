import { NextRequest, NextResponse } from 'next/server'
import { put, del } from '@vercel/blob'
import { getAuthHeaders } from '@/lib/payload-auth'

// Next.js App Router - Configuração de runtime
export const runtime = 'nodejs'
export const maxDuration = 30 // 30 segundos max

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://payload-api-production-9a40.up.railway.app'

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

    console.log('[API] Fazendo upload para Vercel Blob Storage:', {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)}KB`,
      type: file.type
    })

    // Upload para Vercel Blob Storage
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    })

    console.log('[API] Upload para Blob bem-sucedido:', {
      url: blob.url,
      pathname: blob.pathname
    })

    // Criar registro no Payload CMS
    console.log('[API] Criando registro media no Payload CMS...')

    const authHeaders = await getAuthHeaders()

    const payloadResponse = await fetch(`${API_URL}/api/media`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        alt: '',
        url: blob.url,
        filename: file.name,
        mimeType: file.type,
        filesize: file.size,
      }),
    })

    if (!payloadResponse.ok) {
      const errorData = await payloadResponse.json()
      console.error('[API] Erro ao criar media no Payload:', errorData)
      throw new Error('Erro ao criar registro no Payload CMS')
    }

    const payloadData = await payloadResponse.json()

    console.log('[API] Media criado no Payload com sucesso:', {
      id: payloadData.doc.id,
      url: payloadData.doc.url
    })

    // Retornar o documento do Payload CMS (com ID real do MongoDB)
    return NextResponse.json({
      doc: {
        id: payloadData.doc.id, // ID do MongoDB no Payload
        url: blob.url, // URL do Vercel Blob
        filename: file.name,
        alt: '',
        mimeType: file.type,
        filesize: file.size,
      }
    })
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
    const url = searchParams.get('id')

    if (!url) {
      return NextResponse.json(
        { error: 'URL da imagem é obrigatória' },
        { status: 400 }
      )
    }

    console.log('[API] Deletando imagem:', url)

    // Deletar do Vercel Blob Storage
    await del(url)

    console.log('[API] Imagem deletada com sucesso')
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Erro ao deletar imagem:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}
