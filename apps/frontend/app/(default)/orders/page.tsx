'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  CreditCard,
  QrCode,
  Truck,
  Shield,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Phone,
  Copy,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QRCodeSVG } from 'qrcode.react'
import { useOrder } from '@/hooks/product/use-order'
import { useCart } from '@/stores/cart'

export default function OrderPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('qr')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'John Doe',
    phone: '+1 234 567 8900',
    address: '123 Creative Street, Art District, New York, NY 10001',
  })
  const [qrPayload, setQrPayload] = useState<string | null>(null)
  const [realOrderId, setRealOrderId] = useState<string | null>(null)
  const { mutateAsync: createOrder, isPending } = useOrder()

  const shippingCost = totalPrice > 50 ? 0 : 5.99
  const tax = totalPrice * 0.07
  const grandTotal = totalPrice + shippingCost + tax

  const handleCopyOrderId = () => {
    // navigator.clipboard.writeText(orderId)
    // setCopied(true)
    // setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmPayment = async () => {
    try {
      const payload = {
        items: items.map(i => ({ productId: i.id, quantity: i.quantity })),
        shippingInfo,
        paymentMethod,
      }

      const result = await createOrder(payload)

      //   setRealOrderId(result.orderId)

      if (paymentMethod === 'qr') {
        // setQrPayload(result.qrPayload)
      } else {
        setIsComplete(true)
        clearCart()
      }
    } catch (error) {}
  }

  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Truck className="h-10 w-10 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            No items to checkout
          </h2>
          <p className="text-slate-500 mb-6">
            Add some products to your cart first
          </p>
          <Link href="/products">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-slate-200">
          <CardContent className="pt-8 pb-6 text-center">
            <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Order Confirmed!
            </h2>
            <p className="text-slate-500 mb-6">
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>

            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-500 mb-1">Order ID</p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-lg font-mono font-semibold text-slate-800">
                  {realOrderId}
                </code>
                <button
                  onClick={handleCopyOrderId}
                  className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-teal-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/order-history">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  View Order History
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="w-full border-slate-200">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/products"
            className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Cart</span>
          </Link>
          <h1 className="text-lg font-semibold text-slate-900">Checkout</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="text-sm font-medium text-slate-800">Review</span>
          </div>
          <div className="w-12 h-0.5 bg-teal-600" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-sm font-medium text-slate-800">Payment</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="text-sm text-slate-500">Confirm</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="flex items-center gap-2 text-slate-600"
                    >
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={shippingInfo.fullName}
                      onChange={e =>
                        setShippingInfo({
                          ...shippingInfo,
                          fullName: e.target.value,
                        })
                      }
                      className="border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="flex items-center gap-2 text-slate-600"
                    >
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={e =>
                        setShippingInfo({
                          ...shippingInfo,
                          phone: e.target.value,
                        })
                      }
                      className="border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="flex items-center gap-2 text-slate-600"
                  >
                    <MapPin className="h-4 w-4" />
                    Delivery Address
                  </Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={e =>
                      setShippingInfo({
                        ...shippingInfo,
                        address: e.target.value,
                      })
                    }
                    className="border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-slate-800">
                  <span className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-teal-600" />
                    Order Items
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-teal-100 text-teal-700"
                  >
                    {items.length} items
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100"
                    >
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-teal-100 to-cyan-100 shrink-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded bg-teal-200/50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-teal-600 font-medium">
                          {item.brand}
                        </p>
                        <h4 className="font-medium text-slate-800 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-slate-500">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-semibold text-slate-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <CreditCard className="h-5 w-5 text-teal-600" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!qrPayload ? (
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        paymentMethod === 'qr'
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => setPaymentMethod('qr')}
                    >
                      <RadioGroupItem
                        value="qr"
                        id="qr"
                        className="text-teal-600"
                      />
                      <Label
                        htmlFor="qr"
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                          <QrCode className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            QR Code Payment
                          </p>
                          <p className="text-sm text-slate-500">
                            Scan to pay instantly
                          </p>
                        </div>
                      </Label>
                      <Badge className="bg-teal-100 text-teal-700">
                        Recommended
                      </Badge>
                    </div>
                    {/* <div
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        paymentMethod === 'card'
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <RadioGroupItem
                        value="card"
                        id="card"
                        className="text-teal-600"
                      />
                      <Label
                        htmlFor="card"
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            Credit/Debit Card
                          </p>
                          <p className="text-sm text-slate-500">
                            Visa, Mastercard, AMEX
                          </p>
                        </div>
                      </Label>
                    </div> */}
                  </RadioGroup>
                ) : (
                  <div className="text-center p-6 bg-white border border-teal-200 rounded-xl">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">
                      สแกนเพื่อชำระเงิน
                    </h3>
                    <div className="inline-block p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
                      <QRCodeSVG value={qrPayload} size={200} level="H" />
                    </div>
                    <p className="mt-4 text-sm text-slate-600 font-mono">
                      Order: {realOrderId}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      กรุณาไม่ปิดหน้านี้จนกว่าการชำระเงินจะสำเร็จ
                    </p>
                    <Button
                      className="mt-6"
                      onClick={() => {
                        setIsComplete(true)
                        clearCart()
                      }}
                    >
                      (Mock) จำลองว่าจ่ายสำเร็จ
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-slate-200 sticky top-24">
              <CardHeader>
                <CardTitle className="text-slate-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Subtotal ({items.length} items)
                    </span>
                    <span className="text-slate-700">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="text-teal-600 font-medium">Free</span>
                    ) : (
                      <span className="text-slate-700">
                        ${shippingCost.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Tax (7%)</span>
                    <span className="text-slate-700">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="bg-slate-200" />

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-800">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-slate-800">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-base"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    'Confirm Payment'
                  )}
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
                  <div className="text-center">
                    <Truck className="h-5 w-5 text-teal-600 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-5 w-5 text-teal-600 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">Secure Pay</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle2 className="h-5 w-5 text-teal-600 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">Warranty</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
