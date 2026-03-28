export interface CheckoutPayload {
  items: { productId: string; quantity: number }[]
  shippingInfo: ShippingInfo
  paymentMethod: string
}

export interface ShippingInfo {
  fullName: string
  phone: string
  address: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  paymentMethod: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
}

export type OrderStatus = 'pending' | 'completed' | 'cancelled'
