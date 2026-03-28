'use client'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Product } from '@/types/product'

export function ProductTabs({ product }: { product: Product }) {
  return (
    <Tabs
      defaultValue="description"
      className="mb-16 flex flex-col md:flex-row gap-8 items-center"
    >
      <TabsList className="flex md:flex-col justify-start h-fit bg-slate-100 p-1 rounded-lg w-full md:w-48 shrink-0">
        <TabsTrigger
          value="description"
          className="w-full justify-start py-3 data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="specifications"
          className="w-full justify-start py-3 data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm"
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="w-full justify-start py-3 data-[state=active]:bg-white data-[state=active]:text-slate-800"
        >
          Reviews
        </TabsTrigger>
      </TabsList>
      <div className="flex-1 w-full">
        <TabsContent value="description" className="mt-6">
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed">
              {product.description ||
                `Discover the exceptional quality of ${product.name} by ${product.brand}. ${product.description}. Perfect for professionals and enthusiasts alike.`}
            </p>
            {product.tags && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Key Features
                </h3>
                {product.tags && product.tags.length > 0 ? (
                  <ul className="space-y-2">
                    {product.tags.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-slate-600"
                      >
                        <Check className="h-4 w-4 text-teal-600 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-600 leading-relaxed">
                    No features available
                  </p>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
            <div className="flex py-3 px-4 hover:bg-slate-50 transition-colors">
              <span className="w-1/3 text-slate-500 text-sm">Brand</span>
              <span className="text-slate-800 text-sm font-medium">
                {product.brand || '-'}
              </span>
            </div>

            <div className="flex py-3 px-4 hover:bg-slate-50 transition-colors">
              <span className="w-1/3 text-slate-500 text-sm">Price</span>
              <span className="text-slate-800 text-sm font-medium">
                ฿
                {product.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex py-3 px-4 hover:bg-slate-50 transition-colors">
              <span className="w-1/3 text-slate-500 text-sm">Stock</span>
              <span className="text-slate-800 text-sm font-medium">
                {product.stock} units
              </span>
            </div>

            <div className="flex py-3 px-4 hover:bg-slate-50 transition-colors">
              <span className="w-1/3 text-slate-500 text-sm">Rating</span>
              <span className="text-slate-800 text-sm font-medium">
                {product.rating} / 5.0
              </span>
            </div>

            <div className="flex py-3 px-4 hover:bg-slate-50 transition-colors">
              <span className="w-1/3 text-slate-500 text-sm">Status</span>
              <span
                className={`text-sm font-medium ${
                  product.isActive ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {product.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="flex py-3 px-4 hover:bg-slate-50 transition-colors">
              <span className="w-1/3 text-slate-500 text-sm">Availability</span>
              <span
                className={`text-sm font-medium ${
                  product.stock > 0 && product.isActive
                    ? 'text-teal-600'
                    : 'text-red-500'
                }`}
              >
                {product.stock > 0 && product.isActive
                  ? 'In Stock'
                  : 'Out of Stock'}
              </span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <div className="text-center py-12 text-slate-500">
            <p>No reviews yet. Be the first to review this product!</p>
            <Button
              variant="outline"
              className="mt-4 border-teal-400 text-teal-600 hover:bg-teal-50"
            >
              Write a Review
            </Button>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  )
}
