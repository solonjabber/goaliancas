"use client"

import * as React from "react"
import { ArrowUpDown } from "lucide-react"

interface SortSelectProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const sortOptions = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor Preço' },
  { value: 'price-desc', label: 'Maior Preço' },
  { value: 'name', label: 'Nome (A-Z)' },
  { value: 'newest', label: 'Mais Recentes' },
  { value: 'popular', label: 'Mais Populares' },
]

export function SortSelect({ value, onChange, className = '' }: SortSelectProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ArrowUpDown className="h-4 w-4 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gold focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            Ordenar por: {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
