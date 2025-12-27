'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { SiteTexts } from '@/lib/default-site-texts'

export default function TextosSite() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [texts, setTexts] = useState<SiteTexts | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin-custom/login')
      return
    }

    loadTexts()
  }, [router])

  const loadTexts = async () => {
    try {
      const res = await fetch('/api/admin/site-texts')
      const data = await res.json()
      setTexts(data)
    } catch (error) {
      console.error('Erro ao carregar textos:', error)
      alert('Erro ao carregar textos do site')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch('/api/admin/site-texts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(texts),
      })

      if (res.ok) {
        alert('Textos atualizados com sucesso!')
      } else {
        const error = await res.json()
        alert('Erro: ' + (error.message || 'Não foi possível atualizar os textos'))
      }
    } catch (error) {
      console.error('Erro ao salvar textos:', error)
      alert('Erro ao salvar textos')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !texts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando textos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/admin-custom" className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-amber-900">Textos do Site</h1>
              <p className="text-sm text-gray-600">Editar todos os textos que aparecem no site</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seção: Por que escolher */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Seção "Por que escolher"</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  value={texts.whyChooseUs.title}
                  onChange={(e) => setTexts({ ...texts, whyChooseUs: { ...texts.whyChooseUs, title: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
                <input
                  type="text"
                  value={texts.whyChooseUs.subtitle}
                  onChange={(e) => setTexts({ ...texts, whyChooseUs: { ...texts.whyChooseUs, subtitle: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Qualidade */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Qualidade</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Título"
                      value={texts.whyChooseUs.features.quality.title}
                      onChange={(e) => setTexts({
                        ...texts,
                        whyChooseUs: {
                          ...texts.whyChooseUs,
                          features: {
                            ...texts.whyChooseUs.features,
                            quality: { ...texts.whyChooseUs.features.quality, title: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <textarea
                      placeholder="Descrição"
                      value={texts.whyChooseUs.features.quality.description}
                      onChange={(e) => setTexts({
                        ...texts,
                        whyChooseUs: {
                          ...texts.whyChooseUs,
                          features: {
                            ...texts.whyChooseUs.features,
                            quality: { ...texts.whyChooseUs.features.quality, description: e.target.value }
                          }
                        }
                      })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Personalização */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Personalização</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Título"
                      value={texts.whyChooseUs.features.personalization.title}
                      onChange={(e) => setTexts({
                        ...texts,
                        whyChooseUs: {
                          ...texts.whyChooseUs,
                          features: {
                            ...texts.whyChooseUs.features,
                            personalization: { ...texts.whyChooseUs.features.personalization, title: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <textarea
                      placeholder="Descrição"
                      value={texts.whyChooseUs.features.personalization.description}
                      onChange={(e) => setTexts({
                        ...texts,
                        whyChooseUs: {
                          ...texts.whyChooseUs,
                          features: {
                            ...texts.whyChooseUs.features,
                            personalization: { ...texts.whyChooseUs.features.personalization, description: e.target.value }
                          }
                        }
                      })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Garantia */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Garantia</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Título"
                      value={texts.whyChooseUs.features.warranty.title}
                      onChange={(e) => setTexts({
                        ...texts,
                        whyChooseUs: {
                          ...texts.whyChooseUs,
                          features: {
                            ...texts.whyChooseUs.features,
                            warranty: { ...texts.whyChooseUs.features.warranty, title: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <textarea
                      placeholder="Descrição"
                      value={texts.whyChooseUs.features.warranty.description}
                      onChange={(e) => setTexts({
                        ...texts,
                        whyChooseUs: {
                          ...texts.whyChooseUs,
                          features: {
                            ...texts.whyChooseUs.features,
                            warranty: { ...texts.whyChooseUs.features.warranty, description: e.target.value }
                          }
                        }
                      })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Atendimento */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Atendimento</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Título"
                      value={texts.whyChooseUs.features.service.title}
                      onChange={(e) => setTexts({
                        ...texts,
                        whyChooseUs: {
                          ...texts.whyChooseUs,
                          features: {
                            ...texts.whyChooseUs.features,
                            service: { ...texts.whyChooseUs.features.service, title: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <textarea
                      placeholder="Descrição"
                      value={texts.whyChooseUs.features.service.description}
                      onChange={(e) => setTexts({
                        ...texts,
                        whyChooseUs: {
                          ...texts.whyChooseUs,
                          features: {
                            ...texts.whyChooseUs.features,
                            service: { ...texts.whyChooseUs.features.service, description: e.target.value }
                          }
                        }
                      })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção: CTA */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Chamada para Ação (CTA)</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título"
                value={texts.cta.title}
                onChange={(e) => setTexts({ ...texts, cta: { ...texts.cta, title: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Subtítulo"
                value={texts.cta.subtitle}
                onChange={(e) => setTexts({ ...texts, cta: { ...texts.cta, subtitle: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Botão Principal"
                  value={texts.cta.primaryButton}
                  onChange={(e) => setTexts({ ...texts, cta: { ...texts.cta, primaryButton: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Botão Secundário"
                  value={texts.cta.secondaryButton}
                  onChange={(e) => setTexts({ ...texts, cta: { ...texts.cta, secondaryButton: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Seção: Categorias */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Seção de Categorias</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título"
                value={texts.categoryCards.title}
                onChange={(e) => setTexts({ ...texts, categoryCards: { ...texts.categoryCards, title: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Subtítulo"
                value={texts.categoryCards.subtitle}
                onChange={(e) => setTexts({ ...texts, categoryCards: { ...texts.categoryCards, subtitle: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Seção: Footer */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rodapé (Footer)</h2>

            <div className="space-y-4">
              <textarea
                placeholder="Descrição da Empresa"
                value={texts.footer.companyDescription}
                onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, companyDescription: e.target.value } })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Endereço"
                  value={texts.footer.address}
                  onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, address: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Telefone"
                  value={texts.footer.phone}
                  onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, phone: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={texts.footer.email}
                  onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, email: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <input
                type="text"
                placeholder="Texto Copyright"
                value={texts.footer.copyright}
                onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, copyright: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="Link Instagram"
                  value={texts.footer.socialMedia.instagram}
                  onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, socialMedia: { ...texts.footer.socialMedia, instagram: e.target.value } } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="url"
                  placeholder="Link Facebook"
                  value={texts.footer.socialMedia.facebook}
                  onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, socialMedia: { ...texts.footer.socialMedia, facebook: e.target.value } } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/admin-custom"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
