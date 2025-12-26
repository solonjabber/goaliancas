import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

// Credenciais do MongoDB do Railway
const MONGODB_URI = 'mongodb+srv://hyoho920219:cNQK27V55hafOgyl@cluster0.jqwot.mongodb.net/goaliancas?appName=Cluster0'

async function createAdminUser() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log('✅ Conectado ao MongoDB')

    const db = client.db('goaliancas')
    const usersCollection = db.collection('users')

    // Email e senha que vamos criar
    const adminEmail = 'admin@goaliancas.com'
    const adminPassword = 'goaliancas2024' // Mesma senha que você usa no admin-custom

    // Verificar se o usuário já existe
    const existingUser = await usersCollection.findOne({ email: adminEmail })

    if (existingUser) {
      console.log('ℹ️  Usuário admin já existe, atualizando senha...')

      // Hash da nova senha
      const hashedPassword = await bcrypt.hash(adminPassword, 10)

      // Atualizar o usuário existente
      await usersCollection.updateOne(
        { email: adminEmail },
        {
          $set: {
            password: hashedPassword,
            name: 'Admin GO Alianças',
            role: 'admin',
            updatedAt: new Date()
          }
        }
      )

      console.log('✅ Senha do admin atualizada com sucesso!')
    } else {
      console.log('📝 Criando novo usuário admin...')

      // Hash da senha
      const hashedPassword = await bcrypt.hash(adminPassword, 10)

      // Criar novo usuário
      await usersCollection.insertOne({
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin GO Alianças',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      })

      console.log('✅ Usuário admin criado com sucesso!')
    }

    console.log('\n📋 Credenciais do Admin:')
    console.log('Email:', adminEmail)
    console.log('Senha:', adminPassword)
    console.log('\n🔗 Use estas credenciais para fazer login no Payload CMS')

  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await client.close()
    console.log('\n👋 Conexão fechada')
  }
}

createAdminUser()
