import { MongoClient } from 'mongodb'

const MONGODB_URI = 'mongodb+srv://hyoho920219:cNQK27V55hafOgyl@cluster0.jqwot.mongodb.net/goaliancas?appName=Cluster0'

async function checkUsers() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log('✅ Conectado ao MongoDB\n')

    const db = client.db('goaliancas')
    const usersCollection = db.collection('users')

    // Listar todos os usuários
    const users = await usersCollection.find({}).toArray()

    console.log('📋 Usuários no banco de dados:')
    console.log(JSON.stringify(users, null, 2))

  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await client.close()
  }
}

checkUsers()
