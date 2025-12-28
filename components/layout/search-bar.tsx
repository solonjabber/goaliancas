"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"

const TRENDING_SEARCHES = [
  "anel",
  "berloque",
  "pulseira",
  "brinco",
  "colar",
  "relógio feminino",
  "aliança",
  "relogio masculino",
  "relógio",
  "pulseira life"
]

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/produtos?search=${encodeURIComponent(query.trim())}`)
      setSearchQuery("")
      setIsOpen(false)
      setIsFocused(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }

  const handleTrendingClick = (term: string) => {
    handleSearch(term)
  }

  const handleFocus = () => {
    setIsFocused(true)
    setIsOpen(true)
  }

  const handleClear = () => {
    setSearchQuery("")
    setIsOpen(true)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`relative flex items-center rounded-lg border bg-gray-50 transition-all ${
            isFocused ? "border-amber-500 bg-white shadow-md" : "border-gray-300"
          }`}
        >
          <input
            type="text"
            placeholder="Buscar por nome ou código"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            className="w-full bg-transparent px-4 py-2.5 pr-20 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />

          <div className="absolute right-2 flex items-center gap-1">
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              className="rounded-full p-1.5 text-gray-600 hover:bg-amber-50 hover:text-amber-600"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>

      {/* Dropdown de Termos Mais Buscados */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-gray-200 bg-white shadow-xl">
          <div className="p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">
              Termos mais buscados
            </h3>
            <ul className="space-y-1">
              {TRENDING_SEARCHES.map((term, index) => (
                <li key={term}>
                  <button
                    onClick={() => handleTrendingClick(term)}
                    className="flex w-full items-start gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-400">
                      {index + 1}º
                    </span>
                    <span className="text-sm text-gray-700 hover:text-amber-600">
                      {term}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
