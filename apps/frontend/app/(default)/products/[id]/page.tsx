'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/product'
import { ProductBreadcrumb } from './components/product-breadcrumb'
import { ProductGallery } from './components/product-gallery'
import { ProductInfo } from './components/product-info'
import { ProductTabs } from './components/product-tab'
import { RelatedProducts } from './components/product-related'
import { useParams } from 'next/navigation'
import { useProducts } from '@/hooks/product/use-product'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  const { products, isLoading, error } = useProducts()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 animate-pulse">กำลังโหลดข้อมูลสินค้า...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า</p>
      </div>
    )
  }

  const singleProduct = products?.find(
    (p: Product) => p.id === productId && p.isActive,
  )

  if (!singleProduct) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Product Not Found
          </h1>
          <p className="text-slate-500">ไม่พบสินค้าที่คุณกำลังมองหา</p>
          <Link href="/products">
            <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter(
      (p: Product) =>
        p.category === singleProduct.category && p.id !== singleProduct.id,
    )
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-6 py-8">
        <ProductBreadcrumb product={singleProduct} />
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <ProductGallery product={singleProduct} />
          <ProductInfo product={singleProduct} />
        </div>
        <ProductTabs product={singleProduct} />
        <RelatedProducts products={relatedProducts} />
      </main>
    </div>
  )
}
