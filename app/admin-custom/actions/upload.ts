'use server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://payload-api-production-9a40.up.railway.app'

export async function uploadImage(formData: FormData) {
  try {
    console.log('[Server Action] Iniciando upload de imagem')
    console.log('[Server Action] FormData keys:', Array.from(formData.keys()))

    const file = formData.get('file') as File
    console.log('[Server Action] File object:', {
      exists: !!file,
      type: typeof file,
      name: file?.name,
      size: file?.size,
      fileType: file?.type
    })

    if (!file) {
      console.error('[Server Action] Nenhum arquivo fornecido')
      return { error: 'Nenhum arquivo enviado' }
    }

    // Verificar tamanho do arquivo (max 4MB)
    const MAX_SIZE = 4 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      console.error('[Server Action] Arquivo muito grande:', file.size)
      return {
        error: `Arquivo muito grande. Tamanho máximo: 4MB. Tamanho do arquivo: ${(file.size / 1024 / 1024).toFixed(2)}MB`
      }
    }

    console.log('[Server Action] Enviando para Payload:', {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)}KB`,
      type: file.type,
      payloadUrl: `${API_URL}/api/media`
    })

    // Recriar FormData para garantir que está corretamente formatado
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)

    const res = await fetch(`${API_URL}/api/media`, {
      method: 'POST',
      body: uploadFormData,
    })

    console.log('[Server Action] Resposta do Payload:', {
      status: res.status,
      ok: res.ok,
      headers: Object.fromEntries(res.headers.entries())
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

      console.error('[Server Action] Erro do Payload:', { status: res.status, errorData })
      return { error: 'Erro ao fazer upload da imagem', details: errorData }
    }

    const data = await res.json()
    console.log('[Server Action] Upload bem-sucedido:', {
      id: data.doc?.id,
      filename: data.doc?.filename
    })

    return { data: data.doc }
  } catch (error: any) {
    console.error('[Server Action] Erro:', error)
    return { error: 'Erro interno do servidor', message: error.message }
  }
}

export async function deleteImage(id: string) {
  try {
    console.log('[Server Action] Deletando imagem:', id)

    const res = await fetch(`${API_URL}/api/media/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      const data = await res.json()
      console.error('[Server Action] Erro ao deletar:', data)
      return { error: 'Erro ao deletar imagem', details: data }
    }

    console.log('[Server Action] Imagem deletada com sucesso')
    return { success: true }
  } catch (error: any) {
    console.error('[Server Action] Erro ao deletar:', error)
    return { error: 'Erro interno do servidor', message: error.message }
  }
}
