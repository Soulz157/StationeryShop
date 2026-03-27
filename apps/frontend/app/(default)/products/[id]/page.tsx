'use client'

import { use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { products } from '@/types/product'
import { ProductBreadcrumb } from './components/product-breadcrumb'
import { ProductGallery } from './components/product-gallery'
import { ProductInfo } from './components/product-info'
import { ProductTabs } from './components/product-tab'
import { RelatedProducts } from './components/product-related'

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const productId = id
  const product = products.find(p => p.id === productId)

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Product Not Found
          </h1>
          <Link href="/products">
            <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-6 py-8">
        <ProductBreadcrumb product={product} />
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
        <ProductTabs product={product} />
        <RelatedProducts products={relatedProducts} />
      </main>
    </div>
  )
}
