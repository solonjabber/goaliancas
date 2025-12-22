import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, CartItem } from './types'

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, customization?: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, customization) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id && item.customization === customization
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id && item.customization === customization
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          return {
            items: [...state.items, { product, quantity, customization }],
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.discount
            ? item.product.price * (1 - item.product.discount / 100)
            : item.product.price
          return total + price * item.quantity
        }, 0)
      },

      getTotal: () => {
        return get().getSubtotal()
      },
    }),
    {
      name: 'cart-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // Se a versão é diferente, retornar estado inicial
        if (version !== 1) {
          return {
            items: []
          }
        }
        return persistedState as any
      }
    }
  )
)
