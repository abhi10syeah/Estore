"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Store, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useCartStore } from '@/hooks/use-cart-store'
import { Badge } from "@/components/ui/badge"

export function Header() {
    const { items } = useCartStore();
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
        setIsClient(true)
    }, [])

    const totalItems = isClient ? items.reduce((total, item) => total + item.quantity, 0) : 0;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Store className="h-6 w-6 text-primary" />
                    <span className="hidden font-bold sm:inline-block font-headline text-lg">LocalStorefront</span>
                </Link>
                <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
                     <Link href="/admin/generate-description" className="text-foreground/60 transition-colors hover:text-foreground/80 flex items-center gap-1">
                        <Wand2 className="h-4 w-4" />
                        AI Tools
                    </Link>
                </nav>
                <div className="flex items-center justify-end space-x-2">
                    <div className="relative">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/cart">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Shopping Cart</span>
                            </Link>
                        </Button>
                        {isClient && totalItems > 0 && (
                            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs">
                                {totalItems}
                            </Badge>
                        )}
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
