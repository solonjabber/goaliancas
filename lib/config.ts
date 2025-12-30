// Centralized configuration for the application

export const API_CONFIG = {
  PAYLOAD_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  TIMEOUT: 10000, // 10 seconds
} as const

export const IMAGE_CONFIG = {
  MAX_SIZE: 4 * 1024 * 1024, // 4MB
  ALLOWED_FORMATS: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  QUALITY: 80,
  SIZES: {
    thumbnail: 300,
    medium: 800,
    large: 1200,
  },
} as const

export const CACHE_CONFIG = {
  REVALIDATE_TIME: 3600, // 1 hour
  PRODUCT_CACHE_TIME: 300, // 5 minutes
} as const
