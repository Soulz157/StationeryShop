"use client";

import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ShoppingCart,
  User,
  ChevronDown,
  Grid3X3,
  LayoutList,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import { Badge } from "@/components/ui/badge";

type Category = "all" | "pens" | "notebooks" | "art-supplies" | "accessories";

interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  brand: string;
  inStock: boolean;
  description: string;
  tags: string[];
}

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
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    let result = products;

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.tags.some((t) => t.includes(query)),
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Price range filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) =>
        selectedPriceRanges.some((index) => {
          const range = priceRanges[index];
          return p.price >= range.min && p.price < range.max;
        }),
      );
    }

    // In stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
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

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label className="text-sm font-medium text-slate-700 mb-2 block">
          Search
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-slate-200 focus-visible:ring-teal-500"
          />
        </div>
      </div>

      {/* Brands */}
      <div>
        <Label className="text-sm font-medium text-slate-700 mb-3 block">
          Brands
        </Label>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
                className="border-slate-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm text-slate-600 cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium text-slate-700 mb-3 block">
          Price Range
        </Label>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <div key={range.label} className="flex items-center gap-2">
              <Checkbox
                id={`price-${index}`}
                checked={selectedPriceRanges.includes(index)}
                onCheckedChange={() => togglePriceRange(index)}
                className="border-slate-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
              />
              <Label
                htmlFor={`price-${index}`}
                className="text-sm text-slate-600 cursor-pointer"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <Label className="text-sm font-medium text-slate-700 mb-3 block">
          Availability
        </Label>
        <div className="flex items-center gap-2">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
            className="border-slate-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
          />
          <Label
            htmlFor="in-stock"
            className="text-sm text-slate-600 cursor-pointer"
          >
            In Stock Only
          </Label>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full border-slate-300 text-slate-600 hover:bg-slate-100"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="flex-1 w-full">
        {/* Page Header */}
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

        {/* Products Section */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="flex gap-8">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="font-semibold text-slate-800 mb-4">Filters</h2>
                  <FilterSidebar />
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    {/* Mobile Filter Button */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="lg:hidden border-slate-200 text-slate-600"
                        >
                          <SlidersHorizontal className="h-4 w-4 mr-2" />
                          Filters
                          {activeFiltersCount > 0 && (
                            <Badge className="ml-2 bg-teal-600">
                              {activeFiltersCount}
                            </Badge>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80">
                        <SheetHeader>
                          <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <FilterSidebar />
                        </div>
                      </SheetContent>
                    </Sheet>

                    <p className="text-sm text-slate-500">
                      {filteredProducts.length} products
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Sort */}
                    <Select value={sortBy} onValueChange={setSortBy}>
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

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {searchQuery && (
                      <Badge
                        variant="secondary"
                        className="bg-teal-100 text-teal-700 hover:bg-teal-200 cursor-pointer"
                        onClick={() => setSearchQuery("")}
                      >
                        Search: {searchQuery}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                    {selectedBrands.map((brand) => (
                      <Badge
                        key={brand}
                        variant="secondary"
                        className="bg-teal-100 text-teal-700 hover:bg-teal-200 cursor-pointer"
                        onClick={() => toggleBrand(brand)}
                      >
                        {brand}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                    {selectedPriceRanges.map((index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-teal-100 text-teal-700 hover:bg-teal-200 cursor-pointer"
                        onClick={() => togglePriceRange(index)}
                      >
                        {priceRanges[index].label}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                    {inStockOnly && (
                      <Badge
                        variant="secondary"
                        className="bg-teal-100 text-teal-700 hover:bg-teal-200 cursor-pointer"
                        onClick={() => setInStockOnly(false)}
                      >
                        In Stock
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                    <button
                      onClick={clearFilters}
                      className="text-sm text-slate-500 hover:text-slate-700 underline"
                    >
                      Clear all
                    </button>
                  </div>
                )}

                {/* Products */}
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
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="group overflow-hidden border-slate-200 hover:border-teal-300 transition-all hover:shadow-lg"
                      >
                        <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center relative">
                          {!product.inStock && (
                            <Badge className="absolute top-3 right-3 bg-slate-500">
                              Out of Stock
                            </Badge>
                          )}
                          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-teal-100 to-cyan-100 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <CardContent className="p-4">
                          <p className="text-xs text-teal-600 font-medium mb-1">
                            {product.brand}
                          </p>
                          <h3 className="font-semibold text-slate-800">
                            {product.name}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-lg font-bold text-slate-800">
                              ${product.price.toFixed(2)}
                            </span>
                            <Button
                              size="sm"
                              disabled={!product.inStock}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-300"
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="group overflow-hidden border-slate-200 hover:border-teal-300 transition-all hover:shadow-lg"
                      >
                        <div className="flex">
                          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center shrink-0 relative">
                            {!product.inStock && (
                              <Badge className="absolute top-2 left-2 bg-slate-500 text-xs">
                                Out of Stock
                              </Badge>
                            )}
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-teal-100 to-cyan-100" />
                          </div>
                          <CardContent className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                              <p className="text-xs text-teal-600 font-medium mb-1">
                                {product.brand}
                              </p>
                              <h3 className="font-semibold text-slate-800">
                                {product.name}
                              </h3>
                              <p className="text-sm text-slate-500 mt-1">
                                {product.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <span className="text-lg font-bold text-slate-800">
                                ${product.price.toFixed(2)}
                              </span>
                              <Button
                                size="sm"
                                disabled={!product.inStock}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-300"
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="text-2xl font-bold tracking-tight mb-4 text-slate-800">
            Stationery Store.
          </div>
          <p className="text-slate-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Stationery Store Inc. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
