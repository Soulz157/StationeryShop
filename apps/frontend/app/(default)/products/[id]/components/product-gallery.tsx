'use client'
import { Badge } from '@/components/ui/badge'
import { getImageUrl } from '@/lib/image'
import type { Product } from '@/types/product'
import Image from 'next/image'

export function ProductGallery({ product }: { product: Product }) {
  const imageSrc = getImageUrl(product.imgUrl)

  if (!imageSrc) {
    return (
      <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-200">
        No Image Available
      </div>
    )
  }
  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center relative overflow-hidden">
        {product.stock === 0 && (
          <Badge className="absolute top-4 left-4 bg-slate-600 text-white">
            Out of Stocks
          </Badge>
        )}
        <Image
          src={imageSrc}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover"
        />
      </div>
      {/* <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map(i => (
          <button
            key={i}
            className={`aspect-square rounded-lg border-2 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center transition-colors ${
              i === 1
                ? 'border-teal-400'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-teal-100 to-cyan-100" />
          </button>
        ))}
      </div> */}
    </div>
  )
}
