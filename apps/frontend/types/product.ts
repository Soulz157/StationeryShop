export type Category =
  | 'all'
  | 'pens'
  | 'notebooks'
  | 'art-supplies'
  | 'accessories'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  brand: string
  stock: number
  description: string
  rating: number
  imgUrl: string
  tags: string[]
  isActive: boolean
}

export const categoryLabels: Record<Category, string> = {
  all: 'All Products',
  pens: 'Pens',
  notebooks: 'Notebooks',
  'art-supplies': 'Art Supplies',
  accessories: 'Accessories',
}

export const products: Product[] = []
