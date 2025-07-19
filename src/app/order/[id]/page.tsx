"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const MOCK_ORDER = {
    estimatedDelivery: new Date(new Date().setDate(new Date().getDate() + 3)).toDateString()
}

export default function OrderPage({ params }: { params: { id: string } }) {
    const [orderStatus, setOrderStatus] = useState('Processing');
    const [estimatedDelivery, setEstimatedDelivery] = useState('');

    useEffect(() => {
        setEstimatedDelivery(new Date(new Date().setDate(new Date().getDate() + 3)).toDateString());

        const statuses = ['Processing', 'Shipped', 'Delivered'];
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex++;
            if (currentIndex < statuses.length) {
                setOrderStatus(statuses[currentIndex]);
            } else {
                clearInterval(interval);
            }
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
            <CardTitle className="text-3xl font-headline mt-4">Thank you for your order!</CardTitle>
            <CardDescription>Your order has been placed successfully.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="text-center">
                <p className="text-muted-foreground">Order ID</p>
                <p className="font-mono text-lg">{params.id}</p>
            </div>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-muted-foreground">Order Status</p>
                    <p className="font-semibold text-lg text-primary">{orderStatus}</p>
                </div>
                 <div>
                    <p className="text-muted-foreground">Estimated Delivery</p>
                    <p className="font-semibold text-lg">{estimatedDelivery || 'Calculating...'}</p>
                </div>
            </div>
            <p className="text-center text-muted-foreground text-sm">You will receive an email confirmation shortly with your order details.</p>
            <div className="text-center pt-4">
                 <Button asChild>
                    <Link href="/">Continue Shopping</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
