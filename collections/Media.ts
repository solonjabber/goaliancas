import type { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    description: 'Imagens e Vídeos',
  },
  access: {
    read: () => true,
    create: () => true, // Permitir upload de imagens sem autenticação para o admin customizado
  },
  upload: {
    staticDir: 'media',
    disableLocalStorage: false,
    // Aceitar imagens e vídeos
    mimeTypes: ['image/*', 'video/*'],
    // Redimensionar imagens grandes automaticamente (não afeta vídeos)
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        fit: 'cover',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
        fit: 'inside',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
        fit: 'inside',
      },
    ],
    // Configuração do Sharp para processar imagens grandes
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
    // Redimensionar imagem original se for muito grande
    resizeOptions: {
      width: 2400,
      height: 2400,
      fit: 'inside',
      position: 'centre',
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      label: 'Texto Alternativo',
      admin: {
        description: 'Descrição da imagem/vídeo para acessibilidade e SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Legenda',
      admin: {
        description: 'Legenda ou crédito da imagem/vídeo',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Tipo de Mídia',
      admin: {
        readOnly: true,
        description: 'Tipo detectado automaticamente',
      },
      options: [
        { label: 'Imagem', value: 'image' },
        { label: 'Vídeo', value: 'video' },
      ],
    },
    {
      name: 'videoDuration',
      type: 'number',
      label: 'Duração do Vídeo (segundos)',
      admin: {
        condition: (data) => data?.mimeType?.startsWith('video/'),
        description: 'Duração total do vídeo em segundos',
      },
    },
    {
      name: 'videoThumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Miniatura do Vídeo',
      admin: {
        condition: (data) => data?.mimeType?.startsWith('video/'),
        description: 'Imagem de capa/thumbnail para o vídeo',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        // Auto-detectar tipo de mídia
        if (req.file && data) {
          if (req.file.mimetype.startsWith('image/')) {
            data.type = 'image'
          } else if (req.file.mimetype.startsWith('video/')) {
            data.type = 'video'
          }
        }
        return data
      }
    ],
  },
}
