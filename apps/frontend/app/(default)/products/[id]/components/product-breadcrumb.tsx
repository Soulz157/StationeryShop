'use client'
import Link from 'next/link'
import type { Product } from '@/types/product'
import { categoryLabels } from '@/types/product'

export function ProductBreadcrumb({ product }: { product: Product }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
      <Link href="/" className="hover:text-teal-600 transition-colors">
        Home
      </Link>
      <span>/</span>
      <Link href="/products" className="hover:text-teal-600 transition-colors">
        Products
      </Link>
      <span>/</span>
      <Link
        href={`/products?category=${product.category}`}
        className="hover:text-teal-600 transition-colors"
      >
        {categoryLabels[product.category]}
      </Link>
      <span>/</span>
      <span className="text-slate-800">{product.name}</span>
    </nav>
  )
}
