import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id?: number
  name: string
  category: string
  price_usd?: number
  price_cdf?: number
  quantity: number
  photo?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (product: { id?: number; name: string; category: string; price_usd?: number; price_cdf?: number; photo?: string }) => void
  removeItem: (productName: string) => void
  clearCart: () => void
  totalUsd: () => number
  totalCdf: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const existing = state.items.find((item) => item.name === product.name)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
              ),
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        })
      },
      removeItem: (productName) => {
        set((state) => {
          const existing = state.items.find((item) => item.name === productName)
          if (existing && existing.quantity > 1) {
            return {
              items: state.items.map((item) =>
                item.name === productName ? { ...item, quantity: item.quantity - 1 } : item
              ),
            }
          }
          return {
            items: state.items.filter((item) => item.name !== productName),
          }
        })
      },
      clearCart: () => set({ items: [] }),
      totalUsd: () => {
        return get().items.reduce((total, item) => {
          return total + (item.price_usd || 0) * item.quantity
        }, 0)
      },
      totalCdf: () => {
        return get().items.reduce((total, item) => {
          return total + (item.price_cdf || 0) * item.quantity
        }, 0)
      },
    }),
    {
      name: 'repower-purchase-cart',
    }
  )
)
