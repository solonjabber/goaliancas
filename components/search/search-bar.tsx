"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { useSearchStore } from "@/lib/search-store"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface SearchBarProps {
  className?: string
  placeholder?: string
  showHistory?: boolean
  autoFocus?: boolean
}

export function SearchBar({
  className = "",
  placeholder = "Buscar alianças, anéis...",
  showHistory = true,
  autoFocus = false
}: SearchBarProps) {
  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false)
  const [localQuery, setLocalQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const {
    query,
    setQuery,
    searchHistory,
    clearHistory,
    results
  } = useSearchStore()

  // Sugestões baseadas nos resultados atuais
  const suggestions = results.slice(0, 5)

  // Debounce para a busca
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== query) {
        setQuery(localQuery)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery])

  // Sincronizar query do store com input local
  useEffect(() => {
    setLocalQuery(query)
  }, [query])

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    setLocalQuery(searchQuery)
    setQuery(searchQuery)
    setIsFocused(false)
    router.push('/produtos')
  }

  const handleClear = () => {
    setLocalQuery("")
    setQuery("")
    inputRef.current?.focus()
  }

  const handleHistoryClick = (historyQuery: string) => {
    handleSearch(historyQuery)
  }

  const showDropdown = isFocused && (
    (showHistory && searchHistory.length > 0 && !localQuery) ||
    (localQuery && suggestions.length > 0)
  )

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && localQuery) {
              handleSearch(localQuery)
            }
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-sm transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Dropdown com sugestões ou histórico */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          {/* Histórico de buscas */}
          {!localQuery && showHistory && searchHistory.length > 0 && (
            <div className="p-2">
              <div className="flex items-center justify-between px-3 py-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Clock className="h-4 w-4" />
                  Buscas Recentes
                </h3>
                <button
                  onClick={clearHistory}
                  className="text-xs text-gray-500 hover:text-gold"
                >
                  Limpar
                </button>
              </div>
              {searchHistory.map((historyItem, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(historyItem)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Clock className="h-4 w-4 text-gray-400" />
                  {historyItem}
                </button>
              ))}
            </div>
          )}

          {/* Sugestões de produtos */}
          {localQuery && suggestions.length > 0 && (
            <div className="p-2">
              <h3 className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700">
                <TrendingUp className="h-4 w-4" />
                Sugestões ({results.length} {results.length === 1 ? 'resultado' : 'resultados'})
              </h3>
              {suggestions.map((product) => {
                const finalPrice = product.discount
                  ? product.price * (1 - product.discount / 100)
                  : product.price

                return (
                  <Link
                    key={product.id}
                    href={`/produtos/${product.slug}`}
                    onClick={() => setIsFocused(false)}
                    className="flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-gray-50"
                  >
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-beige">
                        <img
                          src="/imagens/logo-transparente.png"
                          alt={product.name}
                          className="h-8 w-8 object-contain opacity-30"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm font-bold text-gold">
                        {finalPrice.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </p>
                    </div>
                  </Link>
                )
              })}
              <Link
                href="/produtos"
                onClick={() => setIsFocused(false)}
                className="mt-2 block rounded-md bg-gold px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-gold-dark"
              >
                Ver todos os {results.length} resultados
              </Link>
            </div>
          )}

          {/* Sem resultados */}
          {localQuery && suggestions.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500">
                Nenhum produto encontrado para "{localQuery}"
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Tente buscar por: aliança, anel, ouro 18k, casamento, formatura
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
