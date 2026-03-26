"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X, Grid3X3, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ProductCard, {
  Product,
  Category,
} from "@/app/(default)/products/components/product-card";
import FilterSidebar from "@/app/(default)/products/components/filter-sidebar";

const products: Product[] = [
  {
    id: 1,
    name: "Classic Fountain Pen",
    category: "pens",
    price: 45,
    brand: "Parker",
    inStock: true,
    description: "Matte Black",
    tags: ["fountain", "classic"],
  },
  {
    id: 2,
    name: "Premium Rollerball",
    category: "pens",
    price: 38,
    brand: "Lamy",
    inStock: true,
    description: "Silver Chrome",
    tags: ["rollerball", "premium"],
  },
  {
    id: 3,
    name: "Calligraphy Set",
    category: "pens",
    price: 55,
    brand: "Pilot",
    inStock: false,
    description: "5 Nibs Included",
    tags: ["calligraphy", "set"],
  },
  {
    id: 4,
    name: "Mechanical Pencil Pro",
    category: "pens",
    price: 28,
    brand: "Pentel",
    inStock: true,
    description: "0.5mm Lead",
    tags: ["mechanical", "pencil"],
  },
  {
    id: 5,
    name: "Ballpoint Pen Set",
    category: "pens",
    price: 22,
    brand: "Parker",
    inStock: true,
    description: "Pack of 3",
    tags: ["ballpoint", "set"],
  },
  {
    id: 6,
    name: "Brush Pen Collection",
    category: "pens",
    price: 35,
    brand: "Tombow",
    inStock: true,
    description: "Dual Tip",
    tags: ["brush", "collection"],
  },
  {
    id: 7,
    name: "Leather Journal A5",
    category: "notebooks",
    price: 28,
    brand: "Moleskine",
    inStock: true,
    description: "Dot Grid",
    tags: ["leather", "journal"],
  },
  {
    id: 8,
    name: "Hardcover Notebook",
    category: "notebooks",
    price: 18,
    brand: "Leuchtturm",
    inStock: true,
    description: "Lined, 240 Pages",
    tags: ["hardcover", "lined"],
  },
  {
    id: 9,
    name: "Watercolor Sketchbook",
    category: "notebooks",
    price: 24,
    brand: "Strathmore",
    inStock: true,
    description: "300gsm Paper",
    tags: ["watercolor", "sketch"],
  },
  {
    id: 10,
    name: "Pocket Notebook Set",
    category: "notebooks",
    price: 15,
    brand: "Field Notes",
    inStock: false,
    description: "Pack of 3",
    tags: ["pocket", "set"],
  },
  {
    id: 11,
    name: "Bullet Journal",
    category: "notebooks",
    price: 32,
    brand: "Leuchtturm",
    inStock: true,
    description: "Index Pages Included",
    tags: ["bullet", "journal"],
  },
  {
    id: 12,
    name: "Artist Sketchpad",
    category: "notebooks",
    price: 20,
    brand: "Canson",
    inStock: true,
    description: "A4 Size, 100 Sheets",
    tags: ["artist", "sketch"],
  },
  {
    id: 13,
    name: "Calligraphy Ink Set",
    category: "art-supplies",
    price: 32,
    brand: "Windsor",
    inStock: true,
    description: "3 Colors",
    tags: ["ink", "calligraphy"],
  },
  {
    id: 14,
    name: "Watercolor Paint Set",
    category: "art-supplies",
    price: 48,
    brand: "Winsor & Newton",
    inStock: true,
    description: "24 Colors",
    tags: ["watercolor", "paint"],
  },
  {
    id: 15,
    name: "Fine Liner Set",
    category: "art-supplies",
    price: 26,
    brand: "Staedtler",
    inStock: true,
    description: "12 Tip Sizes",
    tags: ["fineliner", "set"],
  },
  {
    id: 16,
    name: "Brush Set Professional",
    category: "art-supplies",
    price: 42,
    brand: "Princeton",
    inStock: false,
    description: "8 Brushes",
    tags: ["brush", "professional"],
  },
  {
    id: 17,
    name: "Colored Pencils Premium",
    category: "art-supplies",
    price: 38,
    brand: "Prismacolor",
    inStock: true,
    description: "36 Colors",
    tags: ["colored", "pencil"],
  },
  {
    id: 18,
    name: "Pastel Chalk Set",
    category: "art-supplies",
    price: 29,
    brand: "Faber-Castell",
    inStock: true,
    description: "24 Soft Pastels",
    tags: ["pastel", "chalk"],
  },
  {
    id: 19,
    name: "Brass Desk Organizer",
    category: "accessories",
    price: 65,
    brand: "Craft",
    inStock: true,
    description: "Solid Brass",
    tags: ["organizer", "brass"],
  },
  {
    id: 20,
    name: "Pen Case Leather",
    category: "accessories",
    price: 35,
    brand: "Galen",
    inStock: true,
    description: "Holds 5 Pens",
    tags: ["case", "leather"],
  },
  {
    id: 21,
    name: "Desk Mat Premium",
    category: "accessories",
    price: 45,
    brand: "Grovemade",
    inStock: true,
    description: "Wool Felt",
    tags: ["mat", "desk"],
  },
  {
    id: 22,
    name: "Paper Weight Crystal",
    category: "accessories",
    price: 28,
    brand: "Craft",
    inStock: false,
    description: "Hand Blown",
    tags: ["paperweight", "crystal"],
  },
  {
    id: 23,
    name: "Wax Seal Kit",
    category: "accessories",
    price: 38,
    brand: "Artisan",
    inStock: true,
    description: "3 Stamps Included",
    tags: ["wax", "seal"],
  },
  {
    id: 24,
    name: "Ink Blotter",
    category: "accessories",
    price: 22,
    brand: "Craft",
    inStock: true,
    description: "Walnut Wood",
    tags: ["blotter", "wood"],
  },
];

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "pens", label: "Pens" },
  { value: "notebooks", label: "Notebooks" },
  { value: "art-supplies", label: "Art Supplies" },
  { value: "accessories", label: "Accessories" },
];

const brands = [...new Set(products.map((p) => p.brand))];

const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $40", min: 25, max: 40 },
  { label: "$40 - $60", min: 40, max: 60 },
  { label: "Over $60", min: 60, max: Infinity },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<
    "featured" | "price-low" | "price-high" | "name"
  >("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      if (
        searchQuery.trim() &&
        !product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ) {
        return false;
      }

      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      if (selectedPriceRanges.length > 0) {
        const matchesRange = selectedPriceRanges.some((index) => {
          const range = priceRanges[index];
          return product.price >= range.min && product.price <= range.max;
        });
        if (!matchesRange) return false;
      }

      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "featured":
      default:
        return filtered;
    }
  }, [
    selectedCategory,
    searchQuery,
    selectedBrands,
    selectedPriceRanges,
    inStockOnly,
    sortBy,
  ]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const togglePriceRange = (index: number) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    setInStockOnly(false);
    setSearchQuery("");
  };

  const activeFiltersCount =
    selectedBrands.length +
    selectedPriceRanges.length +
    (inStockOnly ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="flex-1 w-full">
        <section className="bg-gradient-to-b from-slate-100 to-slate-50 py-12">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 text-balance">
              {selectedCategory === "all"
                ? "All Products"
                : categories.find((c) => c.value === selectedCategory)?.label}
            </h1>
            <p className="mt-2 text-slate-500">
              Discover our curated collection of premium stationery.
            </p>

            {/* Category Pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.value
                      ? "bg-teal-600 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-teal-400 hover:text-teal-600"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

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
                      onValueChange={(value) => {
                        setSortBy(
                          value as
                            | "featured"
                            | "price-low"
                            | "price-high"
                            | "name",
                        );
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
                        onClick={() => setViewMode("grid")}
                        className={`p-2 transition-colors ${
                          viewMode === "grid"
                            ? "bg-teal-600 text-white"
                            : "bg-white text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 transition-colors ${
                          viewMode === "list"
                            ? "bg-teal-600 text-white"
                            : "bg-white text-slate-600 hover:bg-slate-100"
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
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "space-y-4"
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
  );
}
