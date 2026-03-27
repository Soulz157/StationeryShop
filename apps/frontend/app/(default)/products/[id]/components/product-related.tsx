'use client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import type { Product } from '@/types/product'

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Related Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(p => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <Card className="group overflow-hidden border-slate-200 hover:border-teal-300 transition-all hover:shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-teal-100 to-cyan-100 group-hover:scale-110 transition-transform" />
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-teal-600 font-medium">{p.brand}</p>
                <h3 className="font-semibold text-slate-800 truncate">
                  {p.name}
                </h3>
                <p className="text-lg font-bold text-slate-800 mt-2">
                  ${p.price.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
