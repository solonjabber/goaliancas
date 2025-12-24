import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'
import path from 'path'
import { upload, handleUpload } from './custom-upload'

dotenv.config({ path: '.env.local' })
dotenv.config()

const app = express()

// Aumentar limite de upload para 50MB
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(`\n📡 [${new Date().toISOString()}] ${req.method} ${req.path}`)
  if (req.method === 'POST' && req.path.includes('media')) {
    console.log('🎯 [UPLOAD] Media upload request detected')
    console.log('📋 [UPLOAD] Headers:', JSON.stringify(req.headers, null, 2))
  }
  next()
})

// Adicionar CORS para permitir requisições do Next.js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
})

// Servir arquivos estáticos da pasta media
app.use('/media', express.static(path.join(__dirname, 'media')))

const start = async () => {
  console.log('🔧 [DEBUG] Iniciando Payload...')
  console.log('🔧 [DEBUG] PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? 'Definido ✅' : 'AUSENTE ❌')
  console.log('🔧 [DEBUG] MONGODB_URI:', process.env.MONGODB_URI ? 'Definido ✅' : 'AUSENTE ❌')
  console.log('🔧 [DEBUG] NEXT_PUBLIC_SERVER_URL:', process.env.NEXT_PUBLIC_SERVER_URL || 'Usando fallback')

  try {
    // Initialize Payload
    await payload.init({
      secret: process.env.PAYLOAD_SECRET!,
      express: app,
      onInit: async () => {
        console.log('✅ [PAYLOAD] Payload inicializado com sucesso!')
        console.log('✅ [PAYLOAD] Admin disponível em: /admin')
      },
    })

    console.log('✅ [DEBUG] Payload.init() completado com sucesso')

    // Log das rotas registradas
    const router = (app as any)._router
    if (router && router.stack) {
      console.log(`🔧 [DEBUG] Total de middlewares registrados: ${router.stack.length}`)
      router.stack.forEach((layer: any, index: number) => {
        if (layer.route) {
          console.log(`🔧 [DEBUG] Rota ${index}: ${layer.route.path}`)
        } else if (layer.name === 'router') {
          console.log(`🔧 [DEBUG] Router ${index}: ${layer.regexp}`)
        }
      })
    }
  } catch (error: any) {
    console.error('❌ [ERROR] Erro ao inicializar Payload:', error.message)
    console.error('❌ [ERROR] Stack:', error.stack)
    throw error
  }

  // Endpoint customizado para upload de imagens (depois do Payload)
  app.post('/api/custom-upload', upload.single('file'), handleUpload)

  // Tratamento de erros global (sempre por último!)
  app.use((err: any, req: any, res: any, next: any) => {
    console.error('\n❌ [ERROR] Global error handler triggered')
    console.error('🔴 [ERROR] Error details:', {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method
    })

    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal server error',
        message: err.message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      })
    }
  })

  const port = parseInt(process.env.PORT || '3000', 10)

  app.listen(port, '0.0.0.0', async () => {
    console.log(`🚀 Server running on port ${port}`)
    console.log(`✅ Payload Admin: http://localhost:${port}/admin`)
  })
}

start()
