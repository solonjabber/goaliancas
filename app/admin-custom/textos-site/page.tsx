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
  const [expandedSection, setExpandedSection] = useState<string>('header')

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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section)
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

  const SectionHeader = ({ id, title, count }: { id: string; title: string; count?: number }) => (
    <button
      type="button"
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-3">
        <svg
          className={`w-5 h-5 transition-transform ${expandedSection === id ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {count && <span className="text-sm text-gray-500">({count} campos)</span>}
      </div>
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin-custom" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-amber-900">Textos do Site</h1>
                <p className="text-sm text-gray-600">Editar todos os textos da página inicial</p>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {saving ? 'Salvando...' : 'Salvar Tudo'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* HEADER / NAVBAR */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <SectionHeader id="header" title="Cabeçalho / Navbar" count={17} />
            {expandedSection === 'header' && (
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Barra Superior</label>
                  <input
                    type="text"
                    value={texts.header.topBar}
                    onChange={(e) => setTexts({ ...texts, header: { ...texts.header, topBar: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Ex: Alianças de Casamento em Ouro 18k | Entrega em Curitiba"
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Itens do Menu Principal</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Produtos"
                      value={texts.header.menuItems.products}
                      onChange={(e) => setTexts({ ...texts, header: { ...texts.header, menuItems: { ...texts.header.menuItems, products: e.target.value } } })}
                      className="px-3 py-2 border rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Alianças de Casamento"
                      value={texts.header.menuItems.weddingRings}
                      onChange={(e) => setTexts({ ...texts, header: { ...texts.header, menuItems: { ...texts.header.menuItems, weddingRings: e.target.value } } })}
                      className="px-3 py-2 border rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Anéis de Formatura"
                      value={texts.header.menuItems.graduationRings}
                      onChange={(e) => setTexts({ ...texts, header: { ...texts.header, menuItems: { ...texts.header.menuItems, graduationRings: e.target.value } } })}
                      className="px-3 py-2 border rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Sobre Nós"
                      value={texts.header.menuItems.about}
                      onChange={(e) => setTexts({ ...texts, header: { ...texts.header, menuItems: { ...texts.header.menuItems, about: e.target.value } } })}
                      className="px-3 py-2 border rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Contato"
                      value={texts.header.menuItems.contact}
                      onChange={(e) => setTexts({ ...texts, header: { ...texts.header, menuItems: { ...texts.header.menuItems, contact: e.target.value } } })}
                      className="px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Dropdown: Alianças de Casamento</h3>
                  <div className="space-y-3">
                    {Object.entries(texts.header.weddingRingsDropdown).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="text"
                          placeholder="Nome do item"
                          value={value.label}
                          onChange={(e) => setTexts({
                            ...texts,
                            header: {
                              ...texts.header,
                              weddingRingsDropdown: {
                                ...texts.header.weddingRingsDropdown,
                                [key]: { ...value, label: e.target.value }
                              }
                            }
                          })}
                          className="px-3 py-2 border rounded-lg text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Descrição"
                          value={value.description}
                          onChange={(e) => setTexts({
                            ...texts,
                            header: {
                              ...texts.header,
                              weddingRingsDropdown: {
                                ...texts.header.weddingRingsDropdown,
                                [key]: { ...value, description: e.target.value }
                              }
                            }
                          })}
                          className="px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Dropdown: Anéis de Formatura</h3>
                  <div className="space-y-3">
                    {Object.entries(texts.header.graduationRingsDropdown).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="text"
                          placeholder="Nome do item"
                          value={value.label}
                          onChange={(e) => setTexts({
                            ...texts,
                            header: {
                              ...texts.header,
                              graduationRingsDropdown: {
                                ...texts.header.graduationRingsDropdown,
                                [key]: { ...value, label: e.target.value }
                              }
                            }
                          })}
                          className="px-3 py-2 border rounded-lg text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Descrição"
                          value={value.description}
                          onChange={(e) => setTexts({
                            ...texts,
                            header: {
                              ...texts.header,
                              graduationRingsDropdown: {
                                ...texts.header.graduationRingsDropdown,
                                [key]: { ...value, description: e.target.value }
                              }
                            }
                          })}
                          className="px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* POR QUE ESCOLHER */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <SectionHeader id="why" title='Seção "Por que escolher"' count={10} />
            {expandedSection === 'why' && (
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Título"
                  value={texts.whyChooseUs.title}
                  onChange={(e) => setTexts({ ...texts, whyChooseUs: { ...texts.whyChooseUs, title: e.target.value } })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Subtítulo"
                  value={texts.whyChooseUs.subtitle}
                  onChange={(e) => setTexts({ ...texts, whyChooseUs: { ...texts.whyChooseUs, subtitle: e.target.value } })}
                  className="w-full px-4 py-2 border rounded-lg"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {Object.entries(texts.whyChooseUs.features).map(([key, feature]) => (
                    <div key={key} className="border rounded-lg p-4 space-y-2">
                      <h4 className="font-semibold text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                      <input
                        type="text"
                        placeholder="Título"
                        value={feature.title}
                        onChange={(e) => setTexts({
                          ...texts,
                          whyChooseUs: {
                            ...texts.whyChooseUs,
                            features: {
                              ...texts.whyChooseUs.features,
                              [key]: { ...feature, title: e.target.value }
                            }
                          }
                        })}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                      <textarea
                        placeholder="Descrição"
                        value={feature.description}
                        onChange={(e) => setTexts({
                          ...texts,
                          whyChooseUs: {
                            ...texts.whyChooseUs,
                            features: {
                              ...texts.whyChooseUs.features,
                              [key]: { ...feature, description: e.target.value }
                            }
                          }
                        })}
                        rows={2}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <SectionHeader id="cta" title="Chamada para Ação (CTA)" count={4} />
            {expandedSection === 'cta' && (
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Título"
                  value={texts.cta.title}
                  onChange={(e) => setTexts({ ...texts, cta: { ...texts.cta, title: e.target.value } })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Subtítulo"
                  value={texts.cta.subtitle}
                  onChange={(e) => setTexts({ ...texts, cta: { ...texts.cta, subtitle: e.target.value } })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Botão Principal"
                    value={texts.cta.primaryButton}
                    onChange={(e) => setTexts({ ...texts, cta: { ...texts.cta, primaryButton: e.target.value } })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Botão Secundário"
                    value={texts.cta.secondaryButton}
                    onChange={(e) => setTexts({ ...texts, cta: { ...texts.cta, secondaryButton: e.target.value } })}
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>

          {/* CATEGORIAS */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <SectionHeader id="categories" title="Seção de Categorias" count={7} />
            {expandedSection === 'categories' && (
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Título"
                  value={texts.categoryCards?.title || ''}
                  onChange={(e) => setTexts({ ...texts, categoryCards: { ...texts.categoryCards, title: e.target.value } })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Subtítulo"
                  value={texts.categoryCards?.subtitle || ''}
                  onChange={(e) => setTexts({ ...texts, categoryCards: { ...texts.categoryCards, subtitle: e.target.value } })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Texto do botão (ex: Ver produtos)"
                  value={texts.categoryCards?.viewProducts || ''}
                  onChange={(e) => setTexts({ ...texts, categoryCards: { ...texts.categoryCards, viewProducts: e.target.value } })}
                  className="w-full px-4 py-2 border rounded-lg"
                />

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Descrições das Categorias</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Alianças de Casamento</label>
                      <input
                        type="text"
                        value={texts.categoryCards?.descriptions?.weddingRings || ''}
                        onChange={(e) => setTexts({ ...texts, categoryCards: { ...texts.categoryCards, descriptions: { ...texts.categoryCards.descriptions, weddingRings: e.target.value } } })}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Alianças de Noivado</label>
                      <input
                        type="text"
                        value={texts.categoryCards?.descriptions?.engagementRings || ''}
                        onChange={(e) => setTexts({ ...texts, categoryCards: { ...texts.categoryCards, descriptions: { ...texts.categoryCards.descriptions, engagementRings: e.target.value } } })}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Anéis</label>
                      <input
                        type="text"
                        value={texts.categoryCards?.descriptions?.rings || ''}
                        onChange={(e) => setTexts({ ...texts, categoryCards: { ...texts.categoryCards, descriptions: { ...texts.categoryCards.descriptions, rings: e.target.value } } })}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Anéis de Formatura</label>
                      <input
                        type="text"
                        value={texts.categoryCards?.descriptions?.graduationRings || ''}
                        onChange={(e) => setTexts({ ...texts, categoryCards: { ...texts.categoryCards, descriptions: { ...texts.categoryCards.descriptions, graduationRings: e.target.value } } })}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <SectionHeader id="footer" title="Rodapé (Footer)" count={14} />
            {expandedSection === 'footer' && (
              <div className="p-6 space-y-4">
                <textarea
                  placeholder="Descrição da Empresa"
                  value={texts.footer?.companyDescription || ''}
                  onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, companyDescription: e.target.value } })}
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg"
                />

                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Endereço"
                    value={texts.footer?.address || ''}
                    onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, address: e.target.value } })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Telefone"
                    value={texts.footer?.phone || ''}
                    onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, phone: e.target.value } })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={texts.footer?.email || ''}
                    onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, email: e.target.value } })}
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Links Rápidos</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Título da seção"
                      value={texts.footer?.quickLinks?.title || ''}
                      onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, quickLinks: { ...texts.footer.quickLinks, title: e.target.value } } })}
                      className="px-3 py-2 border rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Todos os Produtos"
                      value={texts.footer?.quickLinks?.allProducts || ''}
                      onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, quickLinks: { ...texts.footer.quickLinks, allProducts: e.target.value } } })}
                      className="px-3 py-2 border rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Alianças de Casamento"
                      value={texts.footer?.quickLinks?.weddingRings || ''}
                      onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, quickLinks: { ...texts.footer.quickLinks, weddingRings: e.target.value } } })}
                      className="px-3 py-2 border rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Anéis de Formatura"
                      value={texts.footer?.quickLinks?.graduationRings || ''}
                      onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, quickLinks: { ...texts.footer.quickLinks, graduationRings: e.target.value } } })}
                      className="px-3 py-2 border rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Sobre Nós"
                      value={texts.footer?.quickLinks?.about || ''}
                      onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, quickLinks: { ...texts.footer.quickLinks, about: e.target.value } } })}
                      className="px-3 py-2 border rounded text-sm"
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Atendimento</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Título da seção"
                      value={texts.footer?.customerService?.title || ''}
                      onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, customerService: { ...texts.footer.customerService, title: e.target.value } } })}
                      className="px-3 py-2 border rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Fale Conosco"
                      value={texts.footer?.customerService?.contact || ''}
                      onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, customerService: { ...texts.footer.customerService, contact: e.target.value } } })}
                      className="px-3 py-2 border rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Personalização"
                      value={texts.footer?.customerService?.customization || ''}
                      onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, customerService: { ...texts.footer.customerService, customization: e.target.value } } })}
                      className="px-3 py-2 border rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Garantia"
                      value={texts.footer?.customerService?.warranty || ''}
                      onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, customerService: { ...texts.footer.customerService, warranty: e.target.value } } })}
                      className="px-3 py-2 border rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Perguntas Frequentes"
                      value={texts.footer?.customerService?.faq || ''}
                      onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, customerService: { ...texts.footer.customerService, faq: e.target.value } } })}
                      className="px-3 py-2 border rounded text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Título seção Contato"
                    value={texts.footer?.contactTitle || ''}
                    onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, contactTitle: e.target.value } })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Texto Copyright"
                    value={texts.footer?.copyright || ''}
                    onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, copyright: e.target.value } })}
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="url"
                    placeholder="Link Instagram"
                    value={texts.footer?.socialMedia?.instagram || ''}
                    onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, socialMedia: { ...texts.footer.socialMedia, instagram: e.target.value } } })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="url"
                    placeholder="Link Facebook"
                    value={texts.footer?.socialMedia?.facebook || ''}
                    onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, socialMedia: { ...texts.footer.socialMedia, facebook: e.target.value } } })}
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Política de Privacidade"
                    value={texts.footer?.privacyPolicy || ''}
                    onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, privacyPolicy: e.target.value } })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Termos de Uso"
                    value={texts.footer?.termsOfUse || ''}
                    onChange={(e) => setTexts({ ...texts, footer: { ...texts.footer, termsOfUse: e.target.value } })}
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Botão fixo no final */}
          <div className="sticky bottom-0 bg-white border-t shadow-lg p-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Salvando...' : 'Salvar Todas as Alterações'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
