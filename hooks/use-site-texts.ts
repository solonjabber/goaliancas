import { useEffect, useState } from 'react'
import { defaultSiteTexts, type SiteTexts } from '@/lib/default-site-texts'

export function useSiteTexts() {
  const [texts, setTexts] = useState<SiteTexts>(defaultSiteTexts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const res = await fetch('/api/admin/site-texts', {
          cache: 'no-store'
        })
        if (res.ok) {
          const data = await res.json()
          // Garantir que o objeto retornado tem todas as propriedades necessárias
          setTexts({
            ...defaultSiteTexts,
            ...data
          })
        } else {
          console.error('Erro ao carregar textos do site:', res.status)
          setTexts(defaultSiteTexts)
        }
      } catch (error) {
        console.error('Erro ao carregar textos do site:', error)
        // Usa textos padrão em caso de erro
        setTexts(defaultSiteTexts)
      } finally {
        setLoading(false)
      }
    }

    fetchTexts()
  }, [])

  return { texts, loading }
}
