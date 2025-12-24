import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import path from 'path'

// Import collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { HeroBanners } from './collections/HeroBanners'
import { SiteSettings } from './collections/SiteSettings'
import { Testimonials } from './collections/Testimonials'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    // Desabilitar admin UI em produção devido a limites de memória do Railway free plan
    disable: process.env.DISABLE_PAYLOAD_ADMIN === 'true',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- GO Alianças',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  onInit: async (payload) => {
    console.log('🎉 [PAYLOAD] Payload completamente inicializado e pronto!')
    if (process.env.DISABLE_PAYLOAD_ADMIN === 'true') {
      console.log('ℹ️  [PAYLOAD] Admin UI desabilitado - API disponível em: /api')
    } else {
      console.log('🎉 [PAYLOAD] Admin panel disponível em: /admin')
    }
  },
  editor: slateEditor({}),
  upload: {
    limits: {
      fileSize: 50000000, // 50MB - aceitar imagens grandes
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Products,
    HeroBanners,
    SiteSettings,
    Testimonials,
  ],
  // MongoDB connection (you need MongoDB - get free cluster at mongodb.com/cloud/atlas)
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/goaliancas',
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
