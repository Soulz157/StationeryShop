import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CheckoutPayload } from '@/types/order'
import { fetchOrders } from '@/services/order'
import { useCart } from '@/stores/cart'

export const useOrder = () => {
  const { clearCart } = useCart()
  return useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      const data = await fetchOrders()
      clearCart()
      return data
    },
    onError: error => {
      console.error('Order creation failed:', error)
      toast.error('ไม่สามารถสร้างออเดอร์ได้ กรุณาลองใหม่อีกครั้ง')
    },
  })
}
