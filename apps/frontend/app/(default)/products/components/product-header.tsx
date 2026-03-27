'use client'
import { Category } from '@/types/product'

interface ProductsHeaderProps {
  categories: { value: Category; label: string }[]
  selectedCategory: Category
  setSelectedCategory: (cat: Category) => void
}

export default function ProductsHeader({
  categories,
  selectedCategory,
  setSelectedCategory,
}: ProductsHeaderProps) {
  return (
    <section className="bg-gradient-to-b from-slate-100 to-slate-50 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 text-balance">
          {selectedCategory == 'all'
            ? 'All Products'
            : categories.find(c => c.value === selectedCategory)?.label}
        </h1>
        <p className="mt-2 text-slate-500">
          Discover our curated collection of premium stationery.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.value
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-400 hover:text-teal-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
