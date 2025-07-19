"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/hooks/use-cart-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Trash2, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateItemQuantity } = useCartStore()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  if (!isClient) {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold font-headline mb-8">Shopping Cart</h1>
            <div className="space-y-4">
                <div className="h-28 w-full bg-muted rounded-lg animate-pulse"></div>
                <div className="h-28 w-full bg-muted rounded-lg animate-pulse"></div>
            </div>
        </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-6 text-3xl font-bold font-headline">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-6">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-headline mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <Card key={item.product.id} className="flex items-center p-4">
                <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="ml-4 flex-1">
                    <h2 className="font-semibold font-headline">{item.product.name}</h2>
                    <p className="text-sm text-muted-foreground">₹{item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Input 
                        type="number"
                        min="1"
                        max={item.product.stock}
                        value={item.quantity}
                        onChange={(e) => updateItemQuantity(item.product.id, parseInt(e.target.value) || 1)}
                        className="w-20 text-center"
                        aria-label={`Quantity for ${item.product.name}`}
                    />
                    <Button variant="outline" size="icon" onClick={() => removeItem(item.product.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                         <span className="sr-only">Remove {item.product.name} from cart</span>
                    </Button>
                </div>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1 sticky top-24">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full" size="lg">
                        <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  )
}
