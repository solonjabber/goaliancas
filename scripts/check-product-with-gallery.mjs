const API_URL = 'https://payload-api-production-9a40.up.railway.app'
const PAYLOAD_EMAIL = 'hyoho920219@gmail.com'
const PAYLOAD_PASSWORD = 'goaliancas2024'

async function checkProducts() {
  try {
    // Login
    const loginResponse = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: PAYLOAD_EMAIL, password: PAYLOAD_PASSWORD }),
    })

    const loginData = await loginResponse.json()
    const token = loginData.token

    // Buscar todos os produtos
    const productsResponse = await fetch(`${API_URL}/api/products?limit=100&depth=2`, {
      headers: { 'Authorization': `JWT ${token}` },
    })

    const productsData = await productsResponse.json()

    console.log('🔍 Procurando produtos com gallery...\n')

    for (const product of productsData.docs) {
      if (product.gallery && product.gallery.length > 0) {
        console.log('✅ Produto encontrado com gallery:')
        console.log('- ID:', product.id)
        console.log('- Nome:', product.name)
        console.log('- Gallery:', JSON.stringify(product.gallery, null, 2))
        console.log('\n---\n')
        break
      }
    }

  } catch (error) {
    console.error('❌ Erro:', error.message)
  }
}

checkProducts()
