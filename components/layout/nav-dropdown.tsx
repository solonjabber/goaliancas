"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface NavDropdownItem {
  label: string
  href: string
  description?: string
}

interface NavDropdownProps {
  title: string
  items: NavDropdownItem[]
}

export function NavDropdown({ title, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger */}
      <button className="flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-gold">
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu - com padding-top para criar "ponte" entre trigger e menu */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <div className="w-64 rounded-lg border border-gray-200 bg-white shadow-xl">
            <div className="p-2">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block rounded-md px-4 py-3 transition-colors hover:bg-beige"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="font-medium text-gray-900">{item.label}</div>
                  {item.description && (
                    <div className="mt-0.5 text-xs text-gray-500">{item.description}</div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
