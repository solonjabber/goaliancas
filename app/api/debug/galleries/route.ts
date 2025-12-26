import { NextRequest, NextResponse } from 'next/server'
import { head } from '@vercel/blob'

const GALLERY_STORAGE_KEY = 'product-galleries.json'

export async function GET(request: NextRequest) {
  try {
    // Verificar se o arquivo existe
    const blobInfo = await head(GALLERY_STORAGE_KEY).catch(() => null)

    if (!blobInfo) {
      return NextResponse.json({
        error: 'Arquivo de galleries não existe',
        exists: false,
      })
    }

    // Buscar o arquivo
    const response = await fetch(blobInfo.url)
    if (!response.ok) {
      return NextResponse.json({
        error: 'Erro ao buscar galleries',
        status: response.status,
        exists: true,
        blobUrl: blobInfo.url,
      })
    }

    const data = await response.json()

    return NextResponse.json({
      exists: true,
      blobUrl: blobInfo.url,
      uploadedAt: blobInfo.uploadedAt,
      size: blobInfo.size,
      productCount: Object.keys(data).length,
      products: Object.keys(data),
      galleries: data,
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Erro ao processar',
      message: error.message,
      stack: error.stack,
    }, { status: 500 })
  }
}
