import type { CollectionConfig } from 'payload/types'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    description: 'Produtos e Jóias',
  },
  access: {
    read: () => true, // Permitir leitura pública
  },
  fields: [
    // Informações Básicas
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome do Produto',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL amigável)',
      admin: {
        description: 'Ex: alianca-ouro-18k-tradicional',
      },
    },
    {
      name: 'sku',
      type: 'text',
      label: 'Código SKU',
      admin: {
        description: 'Código único do produto para controle de estoque',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Rascunho', value: 'draft' },
        { label: 'Publicado', value: 'published' },
        { label: 'Arquivado', value: 'archived' },
      ],
      label: 'Status',
      admin: {
        description: 'Status de publicação do produto',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Descrição',
    },

    // Categoria
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Categoria',
    },

    // Preço
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Preço (R$)',
      min: 0,
    },
    {
      name: 'salePrice',
      type: 'number',
      label: 'Preço Promocional (R$)',
      min: 0,
      admin: {
        description: 'Deixe vazio se não houver promoção',
      },
    },

    // Especificações da Jóia
    {
      name: 'material',
      type: 'select',
      required: true,
      options: [
        { label: 'Ouro 18k', value: 'ouro_18k' },
        { label: 'Ouro 14k', value: 'ouro_14k' },
        { label: 'Prata 925', value: 'prata_925' },
        { label: 'Ouro Branco', value: 'ouro_branco' },
        { label: 'Ouro Rose', value: 'ouro_rose' },
      ],
      label: 'Material',
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Peso (gramas)',
      admin: {
        description: 'Peso aproximado em gramas',
      },
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensões',
      admin: {
        description: 'Ex: 20mm x 15mm',
      },
    },

    // Mídia (Imagens e Vídeos)
    {
      name: 'gallery',
      type: 'array',
      label: 'Galeria de Mídia (Imagens e Vídeos)',
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagem ou Vídeo',
        },
        {
          name: 'isPrimary',
          type: 'checkbox',
          defaultValue: false,
          label: 'Imagem Principal',
          admin: {
            description: 'Marque apenas UMA imagem como principal',
          },
        },
      ],
    },

    // Estoque
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
      label: 'Em Estoque',
    },
    {
      name: 'stockQuantity',
      type: 'number',
      defaultValue: 0,
      label: 'Quantidade em Estoque',
      min: 0,
    },

    // Personalização
    {
      name: 'allowCustomization',
      type: 'checkbox',
      defaultValue: true,
      label: 'Permite Personalização/Gravação',
    },

    // Destaque
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Produto em Destaque',
      admin: {
        description: 'Produtos em destaque aparecem na página inicial',
      },
    },

    // Tags e Coleção
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Novidade', value: 'novidade' },
        { label: 'Mais Vendido', value: 'mais-vendido' },
        { label: 'Exclusivo', value: 'exclusivo' },
        { label: 'Promoção', value: 'promocao' },
        { label: 'Edição Limitada', value: 'edicao-limitada' },
      ],
      label: 'Tags',
      admin: {
        description: 'Tags para destacar o produto',
      },
    },
    {
      name: 'productCollection',
      type: 'text',
      label: 'Coleção',
      admin: {
        description: 'Nome da coleção (ex: Clássica, Anatômica, Premium)',
      },
    },

    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título SEO',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Descrição',
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Palavras-chave',
        },
      ],
    },
  ],
}
