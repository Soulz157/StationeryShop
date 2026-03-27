'use client'

import { useState, useMemo, useEffect } from 'react'
import { Grid3X3, LayoutList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import ProductCard from '@/app/(default)/products/components/product-card'
import FilterSidebar from '@/app/(default)/products/components/filter-sidebar'
import ProductsHeader from './components/product-header'
import { useProducts } from '@/hooks/product/use-product'
import { Category, Product } from '@/types/product'
import { useRouter, useSearchParams } from 'next/navigation'

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'pens', label: 'Pens' },
  { value: 'notebooks', label: 'Notebooks' },
  { value: 'art-supplies', label: 'Art Supplies' },
  { value: 'accessories', label: 'Accessories' },
]

const priceRanges = [
  { label: 'Under ฿25', min: 0, max: 25 },
  { label: '฿25 - ฿40', min: 25, max: 40 },
  { label: '฿40 - ฿60', min: 40, max: 60 },
  { label: 'Over ฿60', min: 60, max: Infinity },
]

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = (searchParams.get('category') as Category) || 'all'

  const handleCategoryChange = (newCategory: Category) => {
    if (newCategory === 'all') {
      router.push('/products')
    } else {
      router.push(`/products?category=${newCategory}`)
    }
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState<
    'featured' | 'price-low' | 'price-high' | 'name'
  >('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const { products, isLoading, error } = useProducts()

  const brands = useMemo(() => {
    return [...new Set(products.map(p => p.brand).filter(Boolean))]
  }, [products])

  const filteredProducts = useMemo(() => {
    const filtered = products?.filter(product => {
      if (!product.isActive) return false

      if (selectedCategory !== 'all' && product.category !== selectedCategory)
        return false

      if (
        searchQuery.trim() &&
        !product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
        return false

      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand))
        return false

      if (selectedPriceRanges.length > 0) {
        const matchesRange = selectedPriceRanges.some(index => {
          const range = priceRanges[index]
          return product.price >= range.min && product.price <= range.max
        })
        if (!matchesRange) return false
      }

      if (inStockOnly && product.stock <= 0) return false

      return true
    })

    // Sorting
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price)
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name))
      case 'featured':
      default:
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }
  }, [
    products,
    selectedCategory,
    searchQuery,
    selectedBrands,
    selectedPriceRanges,
    inStockOnly,
    sortBy,
  ])

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand],
    )
  }

  const togglePriceRange = (index: number) => {
    setSelectedPriceRanges(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    )
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedPriceRanges([])
    setInStockOnly(false)
    setSearchQuery('')
  }

  const activeFiltersCount =
    selectedBrands.length +
    selectedPriceRanges.length +
    (inStockOnly ? 1 : 0) +
    (searchQuery ? 1 : 0)

  const filterProps = {
    searchQuery,
    setSearchQuery,
    brands,
    selectedBrands,
    toggleBrand,
    priceRanges,
    selectedPriceRanges,
    togglePriceRange,
    inStockOnly,
    setInStockOnly,
    clearFilters,
    activeFiltersCount,
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading products...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="flex-1 w-full">
        <ProductsHeader
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
        />

        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="flex gap-8">
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="font-semibold text-slate-800 mb-4">Filters</h2>
                  <FilterSidebar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    brands={brands}
                    selectedBrands={selectedBrands}
                    toggleBrand={toggleBrand}
                    priceRanges={priceRanges}
                    selectedPriceRanges={selectedPriceRanges}
                    togglePriceRange={togglePriceRange}
                    inStockOnly={inStockOnly}
                    setInStockOnly={setInStockOnly}
                    clearFilters={clearFilters}
                    activeFiltersCount={activeFiltersCount}
                  />
                </div>
              </aside>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Sheet>
                      <SheetContent side="left" className="w-80">
                        <SheetHeader>
                          <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <FilterSidebar {...filterProps} />
                        </div>
                      </SheetContent>
                    </Sheet>
                    <p className="text-sm text-slate-500">
                      {filteredProducts.length} products
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Sort */}
                    <Select
                      value={sortBy}
                      onValueChange={value => {
                        setSortBy(
                          value as
                            | 'featured'
                            | 'price-low'
                            | 'price-high'
                            | 'name',
                        )
                      }}
                    >
                      <SelectTrigger className="w-[160px] border-slate-200">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View Toggle */}
                    <div className="hidden sm:flex border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 transition-colors ${
                          viewMode === 'grid'
                            ? 'bg-teal-600 text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 transition-colors ${
                          viewMode === 'list'
                            ? 'bg-teal-600 text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <LayoutList className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products Area */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-slate-500 text-lg">No products found.</p>
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="mt-4 border-teal-400 text-teal-600 hover:bg-teal-50"
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'space-y-4'
                    }
                  >
                    {filteredProducts.map((product: Product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
