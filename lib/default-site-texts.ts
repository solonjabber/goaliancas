export interface SiteTexts {
  header: {
    topBar: string
    menuItems: {
      products: string
      weddingRings: string
      graduationRings: string
      about: string
      contact: string
    }
    weddingRingsDropdown: {
      all: { label: string; description: string }
      yellow: { label: string; description: string }
      white: { label: string; description: string }
      rose: { label: string; description: string }
      diamonds: { label: string; description: string }
    }
    graduationRingsDropdown: {
      all: { label: string; description: string }
      law: { label: string; description: string }
      medicine: { label: string; description: string }
      engineering: { label: string; description: string }
      administration: { label: string; description: string }
    }
  }
  whyChooseUs: {
    title: string
    subtitle: string
    features: {
      quality: { title: string; description: string }
      personalization: { title: string; description: string }
      warranty: { title: string; description: string }
      service: { title: string; description: string }
    }
  }
  cta: {
    title: string
    subtitle: string
    primaryButton: string
    secondaryButton: string
  }
  categoryCards: {
    title: string
    subtitle: string
    viewProducts: string
    descriptions: {
      weddingRings: string
      engagementRings: string
      rings: string
      graduationRings: string
    }
  }
  footer: {
    companyDescription: string
    address: string
    phone: string
    email: string
    copyright: string
    socialMedia: {
      instagram: string
      facebook: string
    }
    quickLinks: {
      title: string
      allProducts: string
      weddingRings: string
      graduationRings: string
      about: string
    }
    customerService: {
      title: string
      contact: string
      customization: string
      warranty: string
      faq: string
    }
    contactTitle: string
    privacyPolicy: string
    termsOfUse: string
  }
}

export const defaultSiteTexts: SiteTexts = {
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
