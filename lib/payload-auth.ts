// Helper para autenticação com Payload CMS

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://payload-api-production-9a40.up.railway.app'

// Credenciais do admin do Payload (usar variáveis de ambiente em produção)
const PAYLOAD_EMAIL = process.env.PAYLOAD_ADMIN_EMAIL || 'hyoho920219@gmail.com'
const PAYLOAD_PASSWORD = process.env.PAYLOAD_ADMIN_PASSWORD || 'goaliancas2024'

let cachedToken: string | null = null
let tokenExpiry: number = 0

export async function getPayloadToken(): Promise<string> {
  // Se temos um token em cache e ele ainda não expirou, retornar
  if (cachedToken && Date.now() < tokenExpiry) {
    console.log('[PAYLOAD_AUTH] Usando token em cache')
    return cachedToken
  }

  try {
    console.log('[PAYLOAD_AUTH] Fazendo login no Payload...', { email: PAYLOAD_EMAIL })

    // Fazer login no Payload CMS
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: PAYLOAD_EMAIL,
        password: PAYLOAD_PASSWORD,
      }),
    })

    console.log('[PAYLOAD_AUTH] Status da resposta:', response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error('[PAYLOAD_AUTH] Erro no login:', errorData)
      throw new Error(`Payload login failed: ${response.status} - ${errorData}`)
    }

    const data = await response.json()

    if (!data.token) {
      console.error('[PAYLOAD_AUTH] Sem token na resposta:', data)
      throw new Error('No token received from Payload')
    }

    // Cache do token (expira em 1 hora)
    cachedToken = data.token
    tokenExpiry = Date.now() + 60 * 60 * 1000 // 1 hora

    console.log('[PAYLOAD_AUTH] Login bem-sucedido, token obtido')
    return cachedToken
  } catch (error) {
    console.error('[PAYLOAD_AUTH] Error getting Payload token:', error)
    throw error
  }
}

export async function getAuthHeaders(): Promise<HeadersInit> {
  const token = await getPayloadToken()
  return {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`,
  }
}
