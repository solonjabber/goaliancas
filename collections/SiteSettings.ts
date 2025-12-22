import type { CollectionConfig } from 'payload/types'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  admin: {
    useAsTitle: 'siteName',
    description: 'Configurações gerais do site',
  },
  access: {
    read: () => true, // Público pode ver
  },
  fields: [
    // Informações da Empresa
    {
      name: 'companyInfo',
      type: 'group',
      label: 'Informações da Empresa',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          required: true,
          defaultValue: 'GO Alianças',
          label: 'Nome do Site',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          admin: {
            description: 'Logo da empresa (PNG com fundo transparente)',
          },
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Slogan',
          admin: {
            description: 'Ex: "25 anos transformando momentos especiais"',
          },
        },
        {
          name: 'about',
          type: 'richText',
          label: 'Sobre a Empresa',
          admin: {
            description: 'Texto completo sobre a história da empresa',
          },
        },
      ],
    },

    // Contato
    {
      name: 'contact',
      type: 'group',
      label: 'Informações de Contato',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Telefone',
          admin: {
            description: 'Ex: (41) 3045-1188',
          },
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp',
          admin: {
            description: 'Ex: (41) 99144-4783',
          },
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'address',
          type: 'group',
          label: 'Endereço',
          fields: [
            {
              name: 'street',
              type: 'text',
              label: 'Rua/Avenida',
            },
            {
              name: 'number',
              type: 'text',
              label: 'Número',
            },
            {
              name: 'complement',
              type: 'text',
              label: 'Complemento',
            },
            {
              name: 'neighborhood',
              type: 'text',
              label: 'Bairro',
            },
            {
              name: 'city',
              type: 'text',
              label: 'Cidade',
            },
            {
              name: 'state',
              type: 'text',
              label: 'Estado',
            },
            {
              name: 'zipCode',
              type: 'text',
              label: 'CEP',
            },
          ],
        },
        {
          name: 'businessHours',
          type: 'text',
          label: 'Horário de Funcionamento',
          admin: {
            description: 'Ex: Segunda a Sábado, 9:30 às 18:00',
          },
        },
        {
          name: 'mapEmbed',
          type: 'textarea',
          label: 'Google Maps Embed',
          admin: {
            description: 'Cole aqui o código iframe do Google Maps',
          },
        },
      ],
    },

    // Redes Sociais
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Redes Sociais',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram',
          admin: {
            description: 'URL completa: https://instagram.com/...',
          },
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube',
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok',
        },
      ],
    },

    // Números e Estatísticas
    {
      name: 'stats',
      type: 'group',
      label: 'Números e Estatísticas',
      fields: [
        {
          name: 'yearsExperience',
          type: 'number',
          label: 'Anos de Experiência',
          defaultValue: 25,
        },
        {
          name: 'clientsServed',
          type: 'number',
          label: 'Clientes Atendidos',
          defaultValue: 5000,
        },
        {
          name: 'jewelryCreated',
          type: 'number',
          label: 'Joias Criadas',
          defaultValue: 10000,
        },
        {
          name: 'satisfactionRate',
          type: 'number',
          label: 'Taxa de Satisfação (%)',
          defaultValue: 100,
          min: 0,
          max: 100,
        },
      ],
    },

    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
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
