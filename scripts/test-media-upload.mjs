const API_URL = 'https://payload-api-production-9a40.up.railway.app'
const PAYLOAD_EMAIL = 'hyoho920219@gmail.com'
const PAYLOAD_PASSWORD = 'goaliancas2024'

async function testMediaUpload() {
  try {
    // Login
    console.log('🔐 Fazendo login...\n')
    const loginResponse = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: PAYLOAD_EMAIL, password: PAYLOAD_PASSWORD }),
    })

    const loginData = await loginResponse.json()
    const token = loginData.token

    console.log('✅ Login bem-sucedido!\n')

    // Tentar criar um media
    console.log('📤 Testando criação de media no Payload...\n')

    const mediaData = {
      alt: 'Teste',
      url: 'https://example.com/test.jpg',
      filename: 'test.jpg',
      mimeType: 'image/jpeg',
      filesize: 1024,
    }

    console.log('Dados a enviar:', JSON.stringify(mediaData, null, 2))

    const mediaResponse = await fetch(`${API_URL}/api/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(mediaData),
    })

    console.log('Status da resposta:', mediaResponse.status)

    const responseData = await mediaResponse.json()

    if (!mediaResponse.ok) {
      console.error('❌ Erro ao criar media:')
      console.error(JSON.stringify(responseData, null, 2))
    } else {
      console.log('✅ Media criado com sucesso!')
      console.log('Resposta:', JSON.stringify(responseData, null, 2))
    }

  } catch (error) {
    console.error('❌ Erro:', error.message)
  }
}

testMediaUpload()
