import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency to Brazilian Real
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

// Calculate installment value
export function calculateInstallment(total: number, installments: number = 12): string {
  const installmentValue = total / installments
  return formatCurrency(installmentValue)
}

// Format weight in grams
export function formatWeight(grams: number): string {
  return `${grams.toFixed(2)}g`
}

// Format dimensions
export function formatDimension(mm: number): string {
  return `${mm.toFixed(1)}mm`
}

// Generate product slug from name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Format phone number to Brazilian format
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

// Format CEP (Brazilian zip code)
export function formatCEP(cep: string): string {
  const cleaned = cep.replace(/\D/g, '')
  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`
  }
  return cep
}

// Get WhatsApp link
export function getWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const baseUrl = 'https://wa.me/55'
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : ''
  return `${baseUrl}${cleaned}${encodedMessage}`
}
