export interface SiteTexts {
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
  }
  luxuryShowcase: {
    items: Array<{
      title: string
      subtitle: string
      link: string
    }>
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
  }
}

export const defaultSiteTexts: SiteTexts = {
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
    subtitle: "Encontre a joia perfeita para cada momento especial"
  },
  luxuryShowcase: {
    items: [
      {
        title: "Alianças de Ouro Amarelo",
        subtitle: "Tradição e elegância que atravessam gerações",
        link: "/produtos?category=aliancas-de-casamento&metal=ouro_18k"
      },
      {
        title: "Brilho Eterno dos Diamantes",
        subtitle: "Sofisticação em cada detalhe",
        link: "/produtos?category=aliancas-de-casamento&stone=diamante"
      },
      {
        title: "Ouro Rosé Exclusivo",
        subtitle: "Romantismo e modernidade em perfeita harmonia",
        link: "/produtos?category=aliancas-de-casamento&metal=ouro_rose"
      }
    ]
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
    }
  }
}
