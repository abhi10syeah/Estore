"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/hooks/use-cart-store'
import { useToast } from "@/hooks/use-toast"
import { Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(Number(params.id))
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()
  const { toast } = useToast()

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity} x "${product.name}" has been added to your cart.`,
      action: <Button variant="link" size="sm" asChild><Link href="/cart">View Cart</Link></Button>,
    });
  }

  return (
    <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to products
        </Link>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={`${product.category.toLowerCase()} ${product.name.split(' ').slice(0, 1).join('').toLowerCase()}`}
          />
        </div>
        <div>
          <span className="text-sm font-medium text-primary">{product.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mt-2">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mt-4">${product.price.toFixed(2)}</p>
          <p className="mt-6 text-muted-foreground">{product.description}</p>
          
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q-1))}>
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.min(product.stock, q+1))}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <Button onClick={handleAddToCart} size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">{product.stock} in stock</p>
        </div>
      </div>
    </div>
  )
}
