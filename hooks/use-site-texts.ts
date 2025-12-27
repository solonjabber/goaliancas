import { useEffect, useState } from 'react'
import { defaultSiteTexts, type SiteTexts } from '@/lib/default-site-texts'

export function useSiteTexts() {
  // SEMPRE iniciar com defaultSiteTexts - nunca undefined
  const [texts, setTexts] = useState<SiteTexts>(defaultSiteTexts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const res = await fetch('/api/admin/site-texts', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        })
        if (res.ok) {
          const data = await res.json()
          // Deep merge para garantir todas as propriedades aninhadas
          setTexts({
            header: { ...defaultSiteTexts.header, ...(data.header || {}) },
            whyChooseUs: { ...defaultSiteTexts.whyChooseUs, ...(data.whyChooseUs || {}) },
            cta: { ...defaultSiteTexts.cta, ...(data.cta || {}) },
            categoryCards: { ...defaultSiteTexts.categoryCards, ...(data.categoryCards || {}) },
            footer: { ...defaultSiteTexts.footer, ...(data.footer || {}) }
          })
        } else {
          console.error('Erro ao carregar textos do site:', res.status)
          // Garante que sempre temos valores padrão
          setTexts(defaultSiteTexts)
        }
      } catch (error) {
        console.error('Erro ao carregar textos do site:', error)
        // Garante que sempre temos valores padrão
        setTexts(defaultSiteTexts)
      } finally {
        setLoading(false)
      }
    }

    fetchTexts()
  }, [])

  // SEMPRE retornar objeto válido, nunca undefined
  return {
    texts: texts || defaultSiteTexts,
    loading
  }
}
