'use client'

import { MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  const whatsappNumber = '5567992028048'
  const message = encodeURIComponent('Bem vindo a GoAlianças!')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group"
      style={{
        padding: isHovered ? '12px 24px 12px 12px' : '12px',
      }}
      aria-label="Fale conosco no WhatsApp"
    >
      <div className="bg-white rounded-full p-3">
        <MessageCircle className="w-6 h-6 text-[#25D366]" />
      </div>

      <span
        className="font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300"
        style={{
          maxWidth: isHovered ? '200px' : '0px',
          opacity: isHovered ? 1 : 0,
        }}
      >
        Fale Conosco
      </span>

      {/* Animação de pulso quando não hover */}
      {!isHovered && (
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      )}
    </a>
  )
}
