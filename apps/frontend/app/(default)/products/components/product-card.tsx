import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Product } from '@/types/product'
import Image from 'next/image'
import { useCart } from '@/stores/cart'
import { getImageUrl } from '@/lib/image'

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const imageSrc = getImageUrl(product.imgUrl)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand || '',
      price: product.price,
      description: product.description || '',
      imgUrl: product.imgUrl,
      stock: product.stock,
    })
  }
  if (viewMode === 'grid') {
    return (
      <Card className="group overflow-hidden border-slate-200 hover:border-teal-300 transition-all hover:shadow-lg">
        <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center relative">
          <Image
            src={imageSrc}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain w-full h-full max-h-[200px] mix-blend-multiply"
          />
          {(!product.isActive || product.stock <= 0) && (
            <Badge className="absolute top-3 right-3 bg-slate-500">
              Out of Stock
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-teal-600 font-medium mb-1">
            {product.brand}
          </p>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-slate-800 hover:text-teal-600 transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-slate-500 mt-1">{product.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-slate-800">
              ฿{product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              disabled={product.stock <= 0 || !product.isActive}
              className="bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // List View Mode
  return (
    <Card className="group overflow-hidden border-slate-200 hover:border-teal-300 transition-all hover:shadow-lg">
      <div className="flex">
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center shrink-0 relative">
          <Image
            src={imageSrc}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain w-full h-full max-h-[200px] mix-blend-multiply"
          />

          {!product.isActive ||
            (product.stock <= 0 && (
              <Badge className="absolute top-2 left-2 bg-slate-500 text-xs">
                Out of Stock
              </Badge>
            ))}
        </div>
        <CardContent className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <p className="text-xs text-teal-600 font-medium mb-1">
              {product.brand}
            </p>
            <h3 className="font-semibold text-slate-800">{product.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{product.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-slate-800">
              ฿
              {product.price.toLocaleString('th-TH', {
                minimumFractionDigits: 2,
              })}{' '}
            </span>
            <Button
              size="sm"
              disabled={product.stock <= 0 || !product.isActive}
              className="bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
