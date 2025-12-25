import { NextRequest, NextResponse } from 'next/server'

// Credenciais simples (em produção, isso deveria estar em variáveis de ambiente)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'goaliancas2024'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Token simples (em produção, use JWT)
      const token = Buffer.from(`${username}:${password}`).toString('base64')

      return NextResponse.json({
        success: true,
        token,
        message: 'Login realizado com sucesso'
      })
    }

    return NextResponse.json(
      { error: 'Credenciais inválidas' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar login' },
      { status: 500 }
    )
  }
}
