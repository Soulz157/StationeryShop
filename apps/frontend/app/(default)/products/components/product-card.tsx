import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type Category =
  | "all"
  | "pens"
  | "notebooks"
  | "art-supplies"
  | "accessories";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  brand: string;
  inStock: boolean;
  description: string;
  tags: string[];
}

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  if (viewMode === "grid") {
    return (
      <Card className="group overflow-hidden border-slate-200 hover:border-teal-300 transition-all hover:shadow-lg">
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
          <h3 className="font-semibold text-slate-800">{product.name}</h3>
          <p className="text-sm text-slate-500 mt-1">{product.description}</p>
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
    );
  }

  // List View Mode
  return (
    <Card className="group overflow-hidden border-slate-200 hover:border-teal-300 transition-all hover:shadow-lg">
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
            <h3 className="font-semibold text-slate-800">{product.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{product.description}</p>
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
  );
}
