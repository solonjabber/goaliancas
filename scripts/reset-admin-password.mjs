import { MongoClient } from 'mongodb'
import crypto from 'crypto'

const MONGODB_URI = 'mongodb+srv://hyoho920219:cNQK27V55hafOgyl@cluster0.jqwot.mongodb.net/goaliancas?appName=Cluster0'

// Função para criar hash no formato do Payload
function hashPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 25000, 512, 'sha256').toString('hex')
  return { salt, hash }
}

async function resetPassword() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log('✅ Conectado ao MongoDB\n')

    const db = client.db('goaliancas')
    const usersCollection = db.collection('users')

    const adminEmail = 'hyoho920219@gmail.com'
    const newPassword = 'goaliancas2024'

    // Gerar novo salt e hash
    const { salt, hash } = hashPassword(newPassword)

    // Atualizar o usuário
    await usersCollection.updateOne(
      { email: adminEmail },
      {
        $set: {
          salt,
          hash,
          loginAttempts: 0,
          updatedAt: new Date()
        },
        $unset: {
          password: "" // Remover campo password se existir
        }
      }
    )

    console.log('✅ Senha resetada com sucesso!')
    console.log('\n📋 Credenciais do Admin:')
    console.log('Email:', adminEmail)
    console.log('Senha:', newPassword)
    console.log('\n🔗 Use estas credenciais para autenticação no Payload CMS')

  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await client.close()
  }
}

resetPassword()
