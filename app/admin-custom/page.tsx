'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    produtos: 0,
    categorias: 0,
    loading: true
  })

  useEffect(() => {
    // Verificar autenticação
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin-custom/login')
      return
    }

    // Carregar estatísticas
    loadStats()
  }, [router])

  const loadStats = async () => {
    try {
      const [produtosRes, categoriasRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      ])

      const produtosData = await produtosRes.json()
      const categoriasData = await categoriasRes.json()

      setStats({
        produtos: produtosData.totalDocs || 0,
        categorias: categoriasData.totalDocs || 0,
        loading: false
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
      setStats(prev => ({ ...prev, loading: false }))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin-custom/login')
  }

  if (stats.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-amber-900">GO Alianças</h1>
              <p className="text-sm text-gray-600">Painel Administrativo</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Produtos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.produtos}</p>
              </div>
              <div className="bg-amber-100 rounded-full p-3">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Categorias</p>
                <p className="text-3xl font-bold text-gray-900">{stats.categorias}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin-custom/produtos"
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all group"
            >
              <div className="bg-amber-100 rounded-lg p-3 group-hover:bg-amber-200 transition-colors">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Gerenciar Produtos</h3>
                <p className="text-sm text-gray-600">Adicionar, editar ou remover produtos</p>
              </div>
            </Link>

            <Link
              href="/admin-custom/categorias"
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="bg-blue-100 rounded-lg p-3 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Gerenciar Categorias</h3>
                <p className="text-sm text-gray-600">Organizar categorias de produtos</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
