import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Product {
  name: string
  category: string
  price_usd?: number
  price_cdf?: number
}

interface QuoteStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productName: string) => void
  clearCart: () => void
  isInCart: (productName: string) => boolean
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().isInCart(product.name)) {
          set((state) => ({ items: [...state.items, product] }))
        }
      },
      removeItem: (productName) => {
        set((state) => ({
          items: state.items.filter((item) => item.name !== productName),
        }))
      },
      clearCart: () => set({ items: [] }),
      isInCart: (productName) => {
        return get().items.some((item) => item.name === productName)
      },
    }),
    {
      name: 'repower-quote-cart',
    }
  )
)
