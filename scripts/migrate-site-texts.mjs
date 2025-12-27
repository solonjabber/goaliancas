import { put, head } from '@vercel/blob'

const SITE_TEXTS_KEY = 'site-texts.json'

const defaultSiteTexts = {
  header: {
    topBar: "Alianças de Casamento em Ouro 18k | Entrega em Curitiba e Região",
    menuItems: {
      products: "Produtos",
      weddingRings: "Alianças de Casamento",
      graduationRings: "Anéis de Formatura",
      about: "Sobre Nós",
      contact: "Contato"
    },
    weddingRingsDropdown: {
      all: {
        label: "Todas as Alianças",
        description: "Ver todo o catálogo"
      },
      yellow: {
        label: "Ouro Amarelo",
        description: "Clássicas e tradicionais"
      },
      white: {
        label: "Ouro Branco",
        description: "Modernas e elegantes"
      },
      rose: {
        label: "Ouro Rosé",
        description: "Românticas e exclusivas"
      },
      diamonds: {
        label: "Com Diamantes",
        description: "Sofisticação e brilho"
      }
    },
    graduationRingsDropdown: {
      all: {
        label: "Todos os Anéis",
        description: "Ver todo o catálogo"
      },
      law: {
        label: "Direito",
        description: "Cursos de Direito"
      },
      medicine: {
        label: "Medicina",
        description: "Cursos de Medicina"
      },
      engineering: {
        label: "Engenharia",
        description: "Cursos de Engenharia"
      },
      administration: {
        label: "Administração",
        description: "Cursos de Administração"
      }
    }
  },
  whyChooseUs: {
    title: "Por que escolher a GO Alianças?",
    subtitle: "Tradição, qualidade e compromisso com seu momento especial",
    features: {
      quality: {
        title: "Ouro 18k Certificado",
        description: "Máxima pureza e qualidade garantida em todas as peças"
      },
      personalization: {
        title: "Personalização",
        description: "Gravação e personalização exclusiva para tornar sua peça única"
      },
      warranty: {
        title: "Garantia Vitalícia",
        description: "Manutenção e assistência para suas joias por toda vida"
      },
      service: {
        title: "Atendimento Exclusivo",
        description: "Consultoria personalizada em Curitiba e região"
      }
    }
  },
  cta: {
    title: "Pronto para encontrar a joia perfeita?",
    subtitle: "Entre em contato conosco e receba atendimento personalizado",
    primaryButton: "Ver Todos os Produtos",
    secondaryButton: "Falar com Especialista"
  },
  categoryCards: {
    title: "Nossas Categorias",
    subtitle: "Encontre a joia perfeita para cada momento especial",
    viewProducts: "Ver produtos",
    descriptions: {
      weddingRings: "Eternize seu amor",
      engagementRings: "O início de tudo",
      rings: "Elegância única",
      graduationRings: "Conquista celebrada"
    }
  },
  footer: {
    companyDescription: "Alianças de casamento e anéis de formatura em ouro 18k. Tradição, qualidade e excelência em Curitiba.",
    address: "Curitiba - PR",
    phone: "(41) 99999-9999",
    email: "contato@goaliancas.com.br",
    copyright: "GO Alianças. Todos os direitos reservados.",
    socialMedia: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com"
    },
    quickLinks: {
      title: "Links Rápidos",
      allProducts: "Todos os Produtos",
      weddingRings: "Alianças de Casamento",
      graduationRings: "Anéis de Formatura",
      about: "Sobre Nós"
    },
    customerService: {
      title: "Atendimento",
      contact: "Fale Conosco",
      customization: "Personalização",
      warranty: "Garantia",
      faq: "Perguntas Frequentes"
    },
    contactTitle: "Contato",
    privacyPolicy: "Política de Privacidade",
    termsOfUse: "Termos de Uso"
  }
}

async function loadCurrentTexts() {
  try {
    const response = await head(SITE_TEXTS_KEY, {
      token: process.env.BLOB_READ_WRITE_TOKEN
    })

    if (response.url) {
      const fetchResponse = await fetch(response.url)
      return await fetchResponse.json()
    }
  } catch (error) {
    console.log('No existing texts found, will create new')
  }
  return null
}

async function migrateTexts() {
  try {
    console.log('Loading current site texts...')
    const currentTexts = await loadCurrentTexts()

    let mergedTexts
    if (currentTexts) {
      console.log('Found existing texts, merging with new structure...')
      // Merge existing texts with new defaults, preserving user edits
      mergedTexts = {
        header: defaultSiteTexts.header, // Add missing header section
        whyChooseUs: currentTexts.whyChooseUs || defaultSiteTexts.whyChooseUs,
        cta: currentTexts.cta || defaultSiteTexts.cta,
        categoryCards: currentTexts.categoryCards || defaultSiteTexts.categoryCards,
        footer: currentTexts.footer || defaultSiteTexts.footer
      }
      console.log('Merged successfully')
    } else {
      console.log('No existing texts found, using defaults')
      mergedTexts = defaultSiteTexts
    }

    console.log('Uploading to Vercel Blob...')
    const jsonString = JSON.stringify(mergedTexts, null, 2)
    const blobData = new Blob([jsonString], { type: 'application/json' })

    const blob = await put(SITE_TEXTS_KEY, blobData, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
      allowOverwrite: true
    })

    console.log('✅ Site texts migrated successfully!')
    console.log('Blob URL:', blob.url)
    console.log('\nUpdated sections:')
    console.log('- header (17 fields)')
    console.log('- whyChooseUs (10 fields)')
    console.log('- cta (4 fields)')
    console.log('- categoryCards (7 fields)')
    console.log('- footer (14 fields)')
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

migrateTexts()
