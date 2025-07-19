"use client"

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/hooks/use-cart-store'
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to Cart",
      description: `"${product.name}" has been added to your cart.`,
      action: <Button variant="link" size="sm" asChild><Link href="/cart">View Cart</Link></Button>,
    });
  }

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`} className="block">
          <div className="aspect-square relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={`${product.category.toLowerCase()} ${product.name.split(' ').slice(0, 1).join('').toLowerCase()}`}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col">
        <Link href={`/product/${product.id}`}>
          <CardTitle className="text-lg font-headline leading-tight hover:text-primary transition-colors">{product.name}</CardTitle>
        </Link>
        <p className="mt-2 text-sm text-muted-foreground flex-1">{product.description.substring(0, 100)}...</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-muted/50">
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
        <Button onClick={handleAddToCart} size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
