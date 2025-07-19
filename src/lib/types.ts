export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  keywords?: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
    id: string;
    items: CartItem[];
    total: number;
    customer: {
        name: string;
        email: string;
        address: string;
    };
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
    createdAt: Date;
}
