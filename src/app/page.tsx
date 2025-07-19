import { products } from '@/lib/data'
import { ProductCard } from '@/components/product-card'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Welcome to LocalStorefront</h1>
        <p className="mt-4 text-lg text-muted-foreground">Your one-stop shop for locally sourced goods.</p>
      </section>
      
      <section>
        <h2 className="text-3xl font-bold font-headline mb-8">Our Products</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
