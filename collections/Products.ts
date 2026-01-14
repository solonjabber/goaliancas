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
          name: 'mediaType',
          type: 'select',
          required: true,
          defaultValue: 'upload',
          options: [
            { label: 'Upload (Imagem/Vídeo)', value: 'upload' },
            { label: 'Vídeo YouTube', value: 'youtube' },
          ],
          label: 'Tipo de Mídia',
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagem ou Vídeo',
          admin: {
            condition: (data, siblingData) => siblingData?.mediaType === 'upload',
          },
        },
        {
          name: 'youtubeUrl',
          type: 'text',
          label: 'URL do YouTube',
          admin: {
            description: 'Cole o link completo do vídeo. Ex: https://www.youtube.com/watch?v=ABC123 ou https://youtu.be/ABC123',
            placeholder: 'https://www.youtube.com/watch?v=...',
            condition: (data, siblingData) => siblingData?.mediaType === 'youtube',
          },
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

    // Tamanho/Aro disponíveis
    {
      name: 'availableSizes',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Aro 10', value: '10' },
        { label: 'Aro 11', value: '11' },
        { label: 'Aro 12', value: '12' },
        { label: 'Aro 13', value: '13' },
        { label: 'Aro 14', value: '14' },
        { label: 'Aro 15', value: '15' },
        { label: 'Aro 16', value: '16' },
        { label: 'Aro 17', value: '17' },
        { label: 'Aro 18', value: '18' },
        { label: 'Aro 19', value: '19' },
        { label: 'Aro 20', value: '20' },
        { label: 'Aro 21', value: '21' },
        { label: 'Aro 22', value: '22' },
        { label: 'Aro 23', value: '23' },
        { label: 'Aro 24', value: '24' },
        { label: 'Aro 25', value: '25' },
        { label: 'Aro 26', value: '26' },
        { label: 'Aro 27', value: '27' },
        { label: 'Aro 28', value: '28' },
        { label: 'Aro 29', value: '29' },
        { label: 'Aro 30', value: '30' },
      ],
      label: 'Tamanhos/Aros Disponíveis',
      admin: {
        description: 'Selecione todos os tamanhos disponíveis para este produto',
      },
    },

    // Personalização
    {
      name: 'allowCustomization',
      type: 'checkbox',
      defaultValue: true,
      label: 'Permite Personalização/Gravação',
    },
    {
      name: 'engravingPrice',
      type: 'number',
      defaultValue: 100,
      label: 'Preço da Gravação Interna (R$)',
      admin: {
        description: 'Valor adicional para gravação interna (padrão: R$ 100)',
        condition: (data) => data.allowCustomization === true,
      },
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
    {
      name: 'isNewRelease',
      type: 'checkbox',
      defaultValue: false,
      label: 'Lançamento',
      admin: {
        description: 'Produtos marcados como lançamentos aparecem na seção Lançamentos da página inicial',
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
