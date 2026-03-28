import { Order } from '@/types/order'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchOrders(): Promise<Order[]> {
  const response = await fetch(`${API_URL}/api/authorized/orders`)
  if (!response.ok) {
    throw new Error('Failed to fetch orders')
  }
  const data = await response.json()
  return data.data
}
