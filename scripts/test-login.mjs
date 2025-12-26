const API_URL = 'https://payload-api-production-9a40.up.railway.app'

async function testLogin() {
  try {
    console.log('🔐 Testando login...\n')

    const response = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'hyoho920219@gmail.com',
        password: 'goaliancas2024',
      }),
    })

    const data = await response.json()

    if (response.ok && data.token) {
      console.log('✅ Login bem-sucedido!')
      console.log('\n📋 Informações:')
      console.log('Email:', data.user?.email)
      console.log('Token:', data.token.substring(0, 50) + '...')
      console.log('\n✅ As credenciais estão corretas!')
    } else {
      console.log('❌ Falha no login')
      console.log('Resposta:', data)
    }
  } catch (error) {
    console.error('❌ Erro:', error.message)
  }
}

testLogin()
