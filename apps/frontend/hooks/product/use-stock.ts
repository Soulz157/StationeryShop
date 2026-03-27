// hooks/useStock.ts
import { useMutation } from '@tanstack/react-query'
import { useCart } from '@/stores/cart'
import { fetchStock } from '@/services/stock'
import { toast } from 'sonner'
import { StockItem } from '@/types/cart'

export const useStock = () => {
  const { removeFromCart, updateQuantity } = useCart()

  return useMutation({
    mutationFn: fetchStock,

    onSuccess: result => {
      if (result && result.length > 0) {
        const outOfStockItems = result.filter(
          (item: StockItem) => !item.available,
        )
        if (outOfStockItems.length > 0) {
          outOfStockItems.forEach((item: StockItem) => {
            const { productId, currentStock } = item

            if (currentStock === 0) {
              removeFromCart(productId)
            } else {
              updateQuantity(productId, currentStock)
            }
          })
        }
      }
    },
    onError: error => {
      console.error('Stock check failed:', error)
      toast.error('เกิดข้อผิดพลาดในการตรวจสอบสินค้า')
    },
  })
}
