import { Product } from '@/types/product'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/api/public/products`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  const data = await response.json()
  return data.data
}
