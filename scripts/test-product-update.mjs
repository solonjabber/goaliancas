const API_URL = 'https://payload-api-production-9a40.up.railway.app'
const PAYLOAD_EMAIL = 'hyoho920219@gmail.com'
const PAYLOAD_PASSWORD = 'goaliancas2024'

async function testProductUpdate() {
  try {
    console.log('🔐 Step 1: Fazendo login...\n')

    // Login
    const loginResponse = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: PAYLOAD_EMAIL,
        password: PAYLOAD_PASSWORD,
      }),
    })

    if (!loginResponse.ok) {
      const error = await loginResponse.text()
      console.error('❌ Login falhou:', error)
      return
    }

    const loginData = await loginResponse.json()
    const token = loginData.token

    console.log('✅ Login bem-sucedido!\n')

    // Buscar produto atual para ver formato da gallery
    console.log('📋 Step 2: Buscando produto atual...\n')

    const productId = '6947f510b4587288b3ad37e8' // Produto com gallery

    const getResponse = await fetch(`${API_URL}/api/products/${productId}?depth=2`, {
      headers: {
        'Authorization': `JWT ${token}`,
      },
    })

    const currentProduct = await getResponse.json()

    console.log('Produto atual:')
    console.log('- Nome:', currentProduct.name)
    console.log('- Gallery:', JSON.stringify(currentProduct.gallery, null, 2))
    console.log('\n')

    // Testar atualização com gallery
    console.log('📝 Step 3: Testando atualização com gallery...\n')

    // Transformar gallery para enviar apenas IDs
    const galleryFormatted = (currentProduct.gallery || []).map(item => ({
      media: typeof item.media === 'object' ? item.media.id : item.media,
      isPrimary: item.isPrimary,
      id: item.id,
    }))

    const productData = {
      name: currentProduct.name,
      price: currentProduct.price,
      metal: currentProduct.metal || 'ouro-18k-amarelo',
      stock: currentProduct.stockQuantity || 10,
      category: typeof currentProduct.category === 'object' ? currentProduct.category.id : currentProduct.category,
      description: currentProduct.description,
      gallery: galleryFormatted,
    }

    console.log('Dados a enviar:', JSON.stringify(productData, null, 2))

    const updateResponse = await fetch(`${API_URL}/api/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(productData),
    })

    console.log('Status da resposta:', updateResponse.status)

    const responseData = await updateResponse.json()

    if (!updateResponse.ok) {
      console.error('❌ Erro na atualização:')
      console.error('Resposta completa:', JSON.stringify(responseData, null, 2))
    } else {
      console.log('✅ Produto atualizado com sucesso!')
    }

  } catch (error) {
    console.error('❌ Erro:', error.message)
    console.error('Stack:', error.stack)
  }
}

testProductUpdate()
