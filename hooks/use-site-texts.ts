import { useEffect, useState } from 'react'
import { defaultSiteTexts, type SiteTexts } from '@/lib/default-site-texts'

export function useSiteTexts() {
  const [texts, setTexts] = useState<SiteTexts>(defaultSiteTexts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const res = await fetch('/api/admin/site-texts')
        if (res.ok) {
          const data = await res.json()
          setTexts(data)
        }
      } catch (error) {
        console.error('Erro ao carregar textos do site:', error)
        // Usa textos padrão em caso de erro
      } finally {
        setLoading(false)
      }
    }

    fetchTexts()
  }, [])

  return { texts, loading }
}
