"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface MobileNavItem {
  label: string
  href: string
  description?: string
}

interface MobileNavAccordionProps {
  title: string
  items: MobileNavItem[]
  onItemClick: () => void
}

export function MobileNavAccordion({ title, items, onItemClick }: MobileNavAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-100">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-3 text-sm font-medium text-gray-700 hover:text-gold"
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="pb-3 pl-4">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-beige hover:text-gray-900"
              onClick={onItemClick}
            >
              {item.label}
              {item.description && (
                <div className="mt-0.5 text-xs text-gray-400">{item.description}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
