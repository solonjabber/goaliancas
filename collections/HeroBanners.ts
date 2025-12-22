import type { CollectionConfig } from 'payload/types'

export const HeroBanners: CollectionConfig = {
  slug: 'hero-banners',
  admin: {
    useAsTitle: 'title',
    description: 'Banners do carrossel da página inicial',
    defaultColumns: ['title', 'order', 'active'],
  },
  access: {
    read: () => true, // Público pode ver
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
      admin: {
        description: 'Título principal do banner',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtítulo',
      admin: {
        description: 'Subtítulo ou descrição curta',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
      admin: {
        description: 'Descrição detalhada (opcional)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagem do Banner',
      admin: {
        description: 'Imagem de fundo do banner (recomendado: 1920x800px)',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Texto do Botão',
      admin: {
        description: 'Texto do botão de ação (ex: "Ver Coleção")',
      },
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'Link do Botão',
      admin: {
        description: 'URL para onde o botão redireciona (ex: /produtos)',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      label: 'Ordem de Exibição',
      admin: {
        description: 'Ordem de exibição no carrossel (1, 2, 3...)',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Ativo',
      admin: {
        description: 'Desmarque para ocultar este banner temporariamente',
      },
    },
  ],
}
