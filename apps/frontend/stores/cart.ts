import { atom, useAtom, useAtomValue } from 'jotai'
import type { CartItem } from '@/types/cart'

const cartItemsAtom = atom<CartItem[]>([])

const totalItemsAtom = atom(get =>
  get(cartItemsAtom).reduce((sum, item) => sum + item.quantity, 0),
)

const totalPriceAtom = atom(get =>
  get(cartItemsAtom).reduce((sum, item) => sum + item.price * item.quantity, 0),
)

export function useCart() {
  const [items, setItems] = useAtom(cartItemsAtom)

  const totalItems = useAtomValue(totalItemsAtom)
  const totalPrice = useAtomValue(totalPriceAtom)

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
}
