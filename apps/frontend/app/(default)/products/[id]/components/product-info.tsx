'use client'
import { useState } from 'react'
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/stores/cart'
import type { Product } from '@/types/product'

export function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        description: product.description,
        imgUrl: product.imgUrl,
        stock: product.stock,
      })
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-teal-600 font-medium mb-2">
          {product.brand}
        </p>
        <h1 className="text-3xl font-bold text-slate-800 text-balance">
          {product.name}
        </h1>
        <p className="text-slate-500 mt-2">{product.description}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              className={`h-4 w-4 ${star <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
            />
          ))}
        </div>
        <span className="text-sm text-slate-500">(4.0) 128 reviews</span>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-slate-800">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-lg text-slate-400 line-through">
          ${(product.price * 1.2).toFixed(2)}
        </span>
        <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">
          Save 20%
        </Badge>
      </div>

      <Separator className="bg-slate-200" />

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-700">Quantity:</span>
          <div className="flex items-center gap-1 border border-slate-200 rounded-lg bg-white">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-l-lg transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center font-medium text-slate-700">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-r-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleAddToCart}
            disabled={!product.stock}
            className={`flex-1 h-12 text-base transition-all ${addedToCart ? 'bg-teal-600 hover:bg-teal-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white disabled:bg-slate-300`}
          >
            {addedToCart ? (
              <>
                <Check className="h-5 w-5 mr-2" /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`h-12 w-12 border-slate-200 transition-colors ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'hover:bg-slate-100'}`}
          >
            <Heart
              className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`}
            />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 border-slate-200 hover:bg-slate-100"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 py-4">
        <div className="text-center p-3 rounded-lg bg-slate-100">
          <Truck className="h-5 w-5 mx-auto text-teal-600 mb-1" />
          <p className="text-xs text-slate-600">Free Shipping</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-slate-100">
          <RotateCcw className="h-5 w-5 mx-auto text-teal-600 mb-1" />
          <p className="text-xs text-slate-600">30-Day Returns</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-slate-100">
          <Shield className="h-5 w-5 mx-auto text-teal-600 mb-1" />
          <p className="text-xs text-slate-600">1 Year Warranty</p>
        </div>
      </div>
    </div>
  )
}
