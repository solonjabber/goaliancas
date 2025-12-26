'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload, { GalleryImage } from '../../components/ImageUpload'

export default function NovoProduto() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categorias, setCategorias] = useState([])
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    stock: '',
    category: '',
    material: '',
    weight: '',
    dimensions: '',
    featured: false,
    allowCustomization: false,
    inStock: true,
    productCollection: '',
    tags: [] as string[],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin-custom/login')
      return
    }

    loadCategorias()
  }, [router])

  const loadCategorias = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?limit=100`)
      const data = await res.json()
      setCategorias(data.docs || [])
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Gerar slug a partir do nome
      const slug = formData.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9]+/g, '-') // Substitui caracteres especiais por hífens
        .replace(/^-+|-+$/g, '') // Remove hífens do início e fim

      const payload = {
        ...formData,
        slug,
        price: parseFloat(formData.price),
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
        stock: parseInt(formData.stock),
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        seo: {
          title: formData.seoTitle,
          description: formData.seoDescription,
          keywords: formData.seoKeywords,
        },
        gallery: gallery.map(img => ({
          media: {
            id: img.media.id,
            url: img.media.url,
            alt: img.media.alt || '',
            filename: img.media.filename,
          },
          isPrimary: img.isPrimary,
          id: img.id,
        })),
      }

      const res = await fetch('/api/admin/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        alert('Produto criado com sucesso!')
        router.push('/admin-custom/produtos')
      } else {
        const error = await res.json()
        alert(`Erro: ${error.message || 'Não foi possível criar o produto'}`)
      }
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      alert('Erro ao criar produto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/admin-custom/produtos" className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-amber-900">Novo Produto</h1>
              <p className="text-sm text-gray-600">Adicionar novo produto ao catálogo</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Produto *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Galeria de Imagens */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Galeria de Imagens
                <span className="text-xs text-gray-500 ml-2">(Primeira imagem será a principal)</span>
              </label>
              <ImageUpload images={gallery} onChange={setGallery} maxImages={10} />
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Preços */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço Promocional (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.salePrice}
                  onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Estoque */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estoque *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            {/* Material e Especificações */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material *</label>
                <select
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione o material</option>
                  <option value="ouro_18k">Ouro 18k</option>
                  <option value="ouro_14k">Ouro 14k</option>
                  <option value="prata_925">Prata 925</option>
                  <option value="ouro_branco">Ouro Branco</option>
                  <option value="ouro_rose">Ouro Rose</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Peso (g)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Dimensões e Coleção */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dimensões</label>
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  placeholder="Ex: 20mm x 15mm"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Coleção</label>
                <input
                  type="text"
                  value={formData.productCollection}
                  onChange={(e) => setFormData({ ...formData, productCollection: e.target.value })}
                  placeholder="Ex: Clássica, Anatômica, Premium"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {['novidade', 'mais-vendido', 'exclusivo', 'promocao', 'edicao-limitada'].map((tag) => (
                  <label key={tag} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.tags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, tags: [...formData.tags, tag] })
                        } else {
                          setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
                        }
                      }}
                      className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{tag.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Opções */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <span className="ml-2 text-sm text-gray-700">Em estoque</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <span className="ml-2 text-sm text-gray-700">Produto em destaque</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.allowCustomization}
                  onChange={(e) => setFormData({ ...formData, allowCustomization: e.target.checked })}
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <span className="ml-2 text-sm text-gray-700">Permite personalização</span>
              </label>
            </div>

            {/* SEO */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Otimização para Mecanismos de Busca (SEO)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título SEO</label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    placeholder="Deixe vazio para usar o nome do produto"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Descrição</label>
                  <textarea
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    rows={3}
                    placeholder="Descrição que aparece nos resultados de busca"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Palavras-chave</label>
                  <input
                    type="text"
                    value={formData.seoKeywords}
                    onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                    placeholder="palavra1, palavra2, palavra3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="mt-8 flex justify-end space-x-4">
            <Link
              href="/admin-custom/produtos"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : 'Criar Produto'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
