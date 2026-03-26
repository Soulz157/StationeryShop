// components/FilterSidebar.tsx
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  brands: string[];
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  priceRanges: { label: string; min: number; max: number }[];
  selectedPriceRanges: number[];
  togglePriceRange: (index: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (checked: boolean) => void;
  clearFilters: () => void;
  activeFiltersCount: number;
}

export default function FilterSidebar({
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
}: FilterSidebarProps) {
  return (
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
}
