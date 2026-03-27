export interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  quantity: number
  description: string
  imgUrl: string
  stock: number
}

export interface StockItem {
  productId: string
  available: boolean
  currentStock: number
  requestedQty: number
}
