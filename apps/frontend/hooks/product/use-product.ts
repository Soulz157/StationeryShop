import { useCallback, useEffect, useState } from 'react'
import { Product } from '@/types/product'
import { fetchProducts } from '@/services/products'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to load products. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return { products, isLoading, error }
}
