import type { Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Artisanal Coffee Beans',
    description: 'A rich, full-bodied blend of single-origin coffee beans, ethically sourced and locally roasted. Perfect for a morning pick-me-up.',
    price: 18.99,
    imageUrl: 'https://placehold.co/600x600.png',
    category: 'Pantry',
    stock: 50,
    keywords: ['coffee', 'beverage', 'gourmet']
  },
  {
    id: 2,
    name: 'Handcrafted Sourdough Loaf',
    description: 'A crusty, chewy sourdough bread made with organic flour and a traditional starter. Baked fresh daily.',
    price: 7.50,
    imageUrl: 'https://placehold.co/600x600.png',
    category: 'Bakery',
    stock: 30,
    keywords: ['bread', 'bakery', 'organic']
  },
  {
    id: 3,
    name: 'Organic Honey Jar',
    description: 'Raw, unfiltered honey from local beehives. A sweet, natural addition to your tea, toast, or recipes.',
    price: 12.00,
    imageUrl: 'https://placehold.co/600x600.png',
    category: 'Pantry',
    stock: 100,
    keywords: ['honey', 'sweetener', 'natural']
  },
  {
    id: 4,
    name: 'Ceramic Mug',
    description: 'A beautifully glazed ceramic mug, handcrafted by a local artisan. Each piece is unique.',
    price: 25.00,
    imageUrl: 'https://placehold.co/600x600.png',
    category: 'Homeware',
    stock: 20,
    keywords: ['mug', 'ceramic', 'handmade']
  },
  {
    id: 5,
    name: 'Soy Wax Candle',
    description: 'A long-lasting soy wax candle with a calming lavender and chamomile scent. Poured by hand into a reusable glass jar.',
    price: 22.00,
    imageUrl: 'https://placehold.co/600x600.png',
    category: 'Homeware',
    stock: 40,
    keywords: ['candle', 'homeware', 'scented']
  },
  {
    id: 6,
    name: 'Gourmet Chocolate Bar',
    description: 'A decadent dark chocolate bar infused with sea salt and caramel. Made from fair-trade cocoa beans.',
    price: 6.50,
    imageUrl: 'https://placehold.co/600x600.png',
    category: 'Pantry',
    stock: 80,
    keywords: ['chocolate', 'snack', 'gourmet']
  },
  {
    id: 7,
    name: 'Linen Tote Bag',
    description: 'A durable and stylish linen tote bag, perfect for groceries or daily errands. Features a screen-printed shop logo.',
    price: 30.00,
    imageUrl: 'https://placehold.co/600x600.png',
    category: 'Accessories',
    stock: 25,
    keywords: ['tote bag', 'linen', 'reusable']
  },
  {
    id: 8,
    name: 'Herbal Tea Blend',
    description: 'A soothing blend of organic herbs like peppermint, ginger, and lemongrass. Caffeine-free and delicious.',
    price: 9.99,
    imageUrl: 'https://placehold.co/600x600.png',
    category: 'Pantry',
    stock: 60,
    keywords: ['tea', 'herbal', 'organic']
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
}
