import { NextRequest, NextResponse } from 'next/server'
import { put, head } from '@vercel/blob'
import { defaultSiteTexts, type SiteTexts } from '@/lib/default-site-texts'

const SITE_TEXTS_KEY = 'site-texts.json'

// Carregar textos do storage
async function loadSiteTexts(): Promise<SiteTexts> {
  try {
    const blobInfo = await head(SITE_TEXTS_KEY).catch(() => null)

    if (!blobInfo) {
      console.log('[SITE-TEXTS] Arquivo não existe, retornando textos padrão')
      return defaultSiteTexts
    }

    const response = await fetch(blobInfo.url)
    if (!response.ok) {
      console.error('[SITE-TEXTS] Erro ao buscar textos:', response.status)
      return defaultSiteTexts
    }

    const data = await response.json()
    console.log('[SITE-TEXTS] Textos carregados com sucesso')
    return data
  } catch (error) {
    console.error('[SITE-TEXTS] Erro ao carregar textos:', error)
    return defaultSiteTexts
  }
}

// Salvar textos no storage
async function saveSiteTexts(texts: SiteTexts) {
  try {
    const jsonString = JSON.stringify(texts, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })

    const result = await put(SITE_TEXTS_KEY, blob, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
    })

    console.log('[SITE-TEXTS] Textos salvos com sucesso:', result.url)
    return result
  } catch (error) {
    console.error('[SITE-TEXTS] Erro ao salvar textos:', error)
    throw error
  }
}

// GET - Buscar textos do site
export async function GET() {
  try {
    const texts = await loadSiteTexts()
    return NextResponse.json(texts)
  } catch (error: any) {
    console.error('[SITE-TEXTS-GET] Erro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}

// PUT - Atualizar textos do site
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('[SITE-TEXTS-PUT] Atualizando textos do site')

    await saveSiteTexts(body)

    return NextResponse.json({ success: true, texts: body })
  } catch (error: any) {
    console.error('[SITE-TEXTS-PUT] Erro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', message: error.message },
      { status: 500 }
    )
  }
}
