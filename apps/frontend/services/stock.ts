import type { StockItem } from '@/types/cart'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchStock(
  items: { productId: string; quantity: number }[],
): Promise<StockItem[]> {
  const response = await fetch(`${API_URL}/api/public/products/check-stock`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(items),
  })
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  const data = await response.json()
  return data.data
}
