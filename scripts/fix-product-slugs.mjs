import fetch from 'node-fetch'

const API_URL = 'https://payload-api-production-9a40.up.railway.app'
const EMAIL = 'hyoho920219@gmail.com'
const PASSWORD = 'goaliancas2024'

// Função para gerar slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '-') // Substitui caracteres especiais por hífens
    .replace(/^-+|-+$/g, '') // Remove hífens do início e fim
}

async function main() {
  try {
    // 1. Login
    console.log('Fazendo login...')
    const loginRes = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
    })

    const loginData = await loginRes.json()
    if (!loginRes.ok) {
      throw new Error('Erro no login: ' + JSON.stringify(loginData))
    }

    const token = loginData.token
    console.log('Login bem-sucedido!')

    // 2. Buscar todos os produtos
    console.log('\nBuscando produtos...')
    const productsRes = await fetch(`${API_URL}/api/products?limit=100`, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const productsData = await productsRes.json()
    const products = productsData.docs || []
    console.log(`Encontrados ${products.length} produtos`)

    // 3. Atualizar cada produto sem slug
    let updated = 0
    let skipped = 0

    for (const product of products) {
      if (!product.slug || product.slug === '') {
        const newSlug = generateSlug(product.name)
        console.log(`\n[${product.id}] "${product.name}"`)
        console.log(`  Gerando slug: "${newSlug}"`)

        try {
          const updateRes = await fetch(`${API_URL}/api/products/${product.id}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `JWT ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug: newSlug }),
          })

          if (updateRes.ok) {
            console.log(`  ✅ Atualizado com sucesso!`)
            updated++
          } else {
            const error = await updateRes.json()
            console.log(`  ❌ Erro: ${JSON.stringify(error)}`)
          }
        } catch (error) {
          console.log(`  ❌ Erro ao atualizar: ${error.message}`)
        }
      } else {
        console.log(`\n[${product.id}] "${product.name}" - Já tem slug: "${product.slug}"`)
        skipped++
      }
    }

    console.log(`\n\n=== RESUMO ===`)
    console.log(`Total de produtos: ${products.length}`)
    console.log(`Atualizados: ${updated}`)
    console.log(`Pulados (já tinham slug): ${skipped}`)

  } catch (error) {
    console.error('Erro:', error.message)
    process.exit(1)
  }
}

main()
