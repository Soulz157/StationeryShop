'use client'

import Link from 'next/link'
import { ShoppingCart, X, Plus, Minus, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCart } from '@/stores/cart'
import Image from 'next/image'
import { getImageUrl } from '@/lib/image'
import { useStock } from '@/hooks/product/use-stock'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { StockItem } from '@/types/cart'

export function CartSheet() {
  const router = useRouter()
  const { mutateAsync: checkStock, isPending } = useStock()
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart()

  const handleCheckout = async () => {
    if (items.length === 0) return

    try {
      const payload = items.map(i => ({
        productId: i.id,
        quantity: i.quantity,
      }))

      const errorResults = await checkStock(payload)

      if (Array.isArray(errorResults)) {
        const hasError = errorResults.some((item: StockItem) => !item.available)

        if (hasError) {
          toast.error(
            'อัปเดตตะกร้าสินค้า: สินค้าบางรายการมีการเปลี่ยนแปลงสต๊อก',
          )
          return
        }
      }

      router.push('/orders')
    } catch (error) {
      console.error('Checkout failed', error)
      if (error instanceof Error) {
        toast.error('ระบบขัดข้อง กรุณาลองใหม่อีกครั้ง')
      }
    }
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white transition-colors hover:border-teal-400 hover:bg-teal-50">
          <ShoppingCart className="h-4 w-4 text-slate-600" />
          {totalItems > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-indigo-600 p-0 text-[10px] text-white">
              {totalItems}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-slate-800">
            <ShoppingCart className="h-5 w-5 text-teal-600" />
            Your Cart
            {totalItems > 0 && (
              <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                {totalItems} items
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <ShoppingCart className="h-10 w-10 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">Your cart is empty</p>
            <p className="text-sm text-slate-500 mt-1">
              Add some items to get started
            </p>
            <Link href="/products">
              <Button className="cursor-pointer mt-6 bg-indigo-600 hover:bg-indigo-700 text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4 px-2">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    {/* Product Image Placeholder */}
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-teal-100 to-cyan-100 shrink-0 flex items-center justify-center">
                      <Image
                        src={getImageUrl(item.imgUrl)}
                        alt={item.name}
                        width={64}
                        height={64}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs text-teal-600 font-medium">
                            {item.brand}
                          </p>
                          <h4 className="font-medium text-slate-800 truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 border border-slate-200 rounded-lg bg-white">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}
                            className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-l-lg transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-slate-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= (item.stock ?? 0)}
                            className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-r-lg transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="font-semibold text-slate-800">
                          ฿
                          {(item.price * item.quantity).toLocaleString(
                            'th-TH',
                            {
                              minimumFractionDigits: 2,
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-slate-200 pt-4 space-y-4 px-6">
              {/* Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-700">
                    ฿{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Shipping</span>
                  <span className="text-teal-600 font-medium">Free</span>
                </div>
                <Separator className="bg-slate-200" />
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Total</span>
                  <span className="text-xl font-bold text-slate-800">
                    ฿{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 py-6">
                <Button
                  onClick={handleCheckout}
                  disabled={isPending || items.length === 0}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-400"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking Stock...
                    </>
                  ) : (
                    'Checkout'
                  )}
                </Button>
                <div className="flex gap-2">
                  <Link href="/products" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-slate-200 text-slate-600 hover:bg-slate-100"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearCart}
                    className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
