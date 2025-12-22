const { mockProducts } = require('../lib/mock-data')
const dotenv = require('dotenv')

dotenv.config({ path: '.env.local' })

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Função para fazer login e obter token
async function login(email: string, password: string) {
  console.log(`   Email: ${email}`)

  const response = await fetch(`${PAYLOAD_API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    console.error('Erro no login:', error)
    throw new Error('Login failed. Please check your credentials.')
  }

  const data = await response.json()
  return data.token
}

// Função para criar categoria
async function createCategory(name: string, slug: string, token: string) {
  const response = await fetch(`${PAYLOAD_API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`,
    },
    body: JSON.stringify({
      name,
      slug,
      featured: false,
    }),
  })

  const data = await response.json()
  return data.doc || data
}

// Função para buscar ou criar categoria
async function getOrCreateCategory(categoryName: string, token: string): Promise<string> {
  const slug = categoryName.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Buscar categoria existente
  const searchResponse = await fetch(`${PAYLOAD_API_URL}/categories?where[slug][equals]=${slug}`, {
    headers: {
      'Authorization': `JWT ${token}`,
    },
  })

  const searchData = await searchResponse.json()

  if (searchData.docs && searchData.docs.length > 0) {
    console.log(`✓ Categoria encontrada: ${categoryName}`)
    return searchData.docs[0].id
  }

  // Criar nova categoria
  console.log(`→ Criando categoria: ${categoryName}`)
  const category = await createCategory(categoryName, slug, token)
  console.log(`✓ Categoria criada: ${categoryName}`)
  return category.id
}

// Mapear categorias dos produtos mockados para nomes de categoria
function getCategoryName(product: any): string {
  if (product.name.includes('Formatura')) {
    return 'Anéis de Formatura'
  }
  if (product.name.includes('Anel')) {
    return 'Anéis'
  }
  if (product.name.includes('Noivado')) {
    return 'Alianças de Noivado'
  }
  return 'Alianças de Casamento'
}

// Mapear metalType para material
function mapMaterialType(metalType: string): string {
  const materialMap: Record<string, string> = {
    'ouro-18k-amarelo': 'ouro_18k',
    'ouro-18k-branco': 'ouro_branco',
    'ouro-18k-rose': 'ouro_rose',
  }
  return materialMap[metalType] || 'ouro_18k'
}

// Mapear tags dos produtos mockados
function mapTags(product: any): string[] {
  const tags: string[] = []
  if (product.featured) tags.push('mais-vendido')
  if (product.discount) tags.push('promocao')
  if (product.collection === 'Premium' || product.collection === 'Imperial') {
    tags.push('exclusivo')
  }
  return tags
}

// Função para criar produto
async function createProduct(product: any, categoryId: string, token: string) {
  const productData = {
    name: product.name,
    slug: product.slug,
    sku: `SKU-${product.id}`,
    status: 'published',
    description: product.description,
    category: categoryId,
    price: product.price,
    salePrice: product.discount ? product.price * (1 - product.discount / 100) : undefined,
    material: mapMaterialType(product.metalType),
    weight: product.weight,
    dimensions: product.width ? `Largura: ${product.width}mm` : undefined,
    inStock: product.inStock !== false,
    stockQuantity: 10,
    allowCustomization: product.customizable || false,
    featured: product.featured || false,
    tags: mapTags(product),
    productCollection: product.collection || '',
    seo: {
      title: product.name,
      description: product.description,
      keywords: `${product.name}, ${product.metalType}, aliança, joia`,
    },
  }

  const response = await fetch(`${PAYLOAD_API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`,
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    const error = await response.json()
    console.error(`✗ Erro ao criar produto ${product.name}:`, error)
    throw new Error(`Failed to create product: ${product.name}`)
  }

  const data = await response.json()
  return data.doc || data
}

// Script principal
async function migrateProducts() {
  console.log('🚀 Iniciando migração de produtos...\n')

  // Obter credenciais dos argumentos ou variáveis de ambiente
  const email = process.argv[2] || process.env.PAYLOAD_ADMIN_EMAIL
  const password = process.argv[3] || process.env.PAYLOAD_ADMIN_PASSWORD

  if (!email || !password) {
    console.error('❌ Erro: Email e senha são obrigatórios!')
    console.log('\nUso: npm run migrate:products <email> <senha>')
    console.log('Ou defina as variáveis PAYLOAD_ADMIN_EMAIL e PAYLOAD_ADMIN_PASSWORD\n')
    process.exit(1)
  }

  try {
    // 1. Fazer login
    console.log('🔐 Fazendo login...')
    const token = await login(email, password)
    console.log('✓ Login realizado com sucesso!\n')

    // 2. Criar/buscar categorias
    console.log('📁 Processando categorias...')
    const categoryMap = new Map<string, string>()

    for (const product of mockProducts) {
      const categoryName = getCategoryName(product)
      if (!categoryMap.has(categoryName)) {
        const categoryId = await getOrCreateCategory(categoryName, token)
        categoryMap.set(categoryName, categoryId)
      }
    }
    console.log(`✓ ${categoryMap.size} categorias processadas\n`)

    // 3. Criar produtos
    console.log('📦 Criando produtos...')
    let successCount = 0
    let errorCount = 0

    for (const product of mockProducts) {
      try {
        const categoryName = getCategoryName(product)
        const categoryId = categoryMap.get(categoryName)!

        console.log(`→ Criando: ${product.name}`)
        await createProduct(product, categoryId, token)
        console.log(`✓ Produto criado: ${product.name}`)
        successCount++
      } catch (error) {
        console.error(`✗ Erro no produto: ${product.name}`, error)
        errorCount++
      }
    }

    console.log('\n✅ Migração concluída!')
    console.log(`   • Produtos criados: ${successCount}`)
    console.log(`   • Erros: ${errorCount}`)
    console.log(`   • Total: ${mockProducts.length}`)
  } catch (error) {
    console.error('❌ Erro na migração:', error)
    process.exit(1)
  }
}

// Executar migração
migrateProducts()
