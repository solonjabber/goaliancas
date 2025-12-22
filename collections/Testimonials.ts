import type { CollectionConfig } from 'payload/types'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'customerName',
    description: 'Depoimentos e avaliações de clientes',
    defaultColumns: ['customerName', 'rating', 'featured', 'approved'],
  },
  access: {
    read: () => true, // Público pode ver
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
      label: 'Nome do Cliente',
    },
    {
      name: 'customerPhoto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto do Cliente',
      admin: {
        description: 'Foto opcional do cliente',
      },
    },
    {
      name: 'city',
      type: 'text',
      label: 'Cidade',
      admin: {
        description: 'Ex: Curitiba',
      },
    },
    {
      name: 'state',
      type: 'text',
      label: 'Estado',
      admin: {
        description: 'Ex: PR',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      label: 'Avaliação (Estrelas)',
      admin: {
        description: 'De 1 a 5 estrelas',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Depoimento',
      admin: {
        description: 'Texto completo do depoimento',
      },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      label: 'Produto Relacionado',
      admin: {
        description: 'Produto que o cliente comprou (opcional)',
      },
    },
    {
      name: 'date',
      type: 'date',
      label: 'Data do Depoimento',
      admin: {
        description: 'Data em que o depoimento foi dado',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Destaque',
      admin: {
        description: 'Marque para exibir na página inicial',
      },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: true,
      label: 'Aprovado',
      admin: {
        description: 'Desmarque para ocultar este depoimento',
      },
    },
    {
      name: 'displayOnAboutPage',
      type: 'checkbox',
      defaultValue: false,
      label: 'Exibir na Página "Sobre"',
    },
    {
      name: 'displayOnHomepage',
      type: 'checkbox',
      defaultValue: false,
      label: 'Exibir na Homepage',
    },
  ],
}
