"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/hooks/use-cart-store"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import React from "react"

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code."),
})

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const { toast } = useToast()
  
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      zip: "",
    },
  })

  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  React.useEffect(() => {
    if (items.length === 0) {
      router.replace('/cart')
    }
  }, [items, router]);

  function onSubmit(values: z.infer<typeof checkoutSchema>) {
    console.log("Checkout submitted:", values)
    toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed. We'll notify you when it ships.",
    })
    const orderId = Math.random().toString(36).substr(2, 9);
    clearCart()
    router.push(`/order/${orderId}`)
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-headline mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="123 Main St" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                             <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Anytown" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="zip"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>ZIP Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="12345" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
        <div className="lg:col-span-1 sticky top-24">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {items.map(item => (
                        <div key={item.product.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                                <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                                    <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold">{item.product.name}</p>
                                    <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    <Separator />
                     <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button onClick={form.handleSubmit(onSubmit)} type="submit" className="w-full" size="lg">
                        Place Order & Pay
                    </Button>
                </CardFooter>
            </Card>
            <p className="text-center text-xs text-muted-foreground mt-4">Payment will be handled by our secure Stripe gateway.</p>
        </div>
      </div>
    </div>
  )
}
