import type { CollectionConfig } from 'payload/types'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    description: 'Categorias de produtos (Alianças, Anéis, Brincos, etc)',
  },
  access: {
    read: () => true, // Permitir leitura pública
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome da Categoria',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL amigável)',
      admin: {
        description: 'Ex: aliancas-de-casamento',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem da Categoria',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Vídeo YouTube (Opcional)',
      admin: {
        description: 'Cole o link completo do vídeo do YouTube. Ex: https://www.youtube.com/watch?v=ABC123 ou https://youtu.be/ABC123',
        placeholder: 'https://www.youtube.com/watch?v=...',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Categoria em Destaque',
    },
  ],
}
