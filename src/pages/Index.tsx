
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import ProductTab from '@/components/ProductTab';
import { Product } from '@/components/ProductCard';

// Sample product data
const productData: Product[] = [
  // Featured Products
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'featured'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1599&q=80',
    category: 'featured'
  },
  {
    id: 3,
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    category: 'featured'
  },
  {
    id: 4,
    name: 'Leather Laptop Sleeve',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    category: 'featured'
  },
  
  // New Arrivals
  {
    id: 5,
    name: 'Smart Home Hub',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
    category: 'new'
  },
  {
    id: 6,
    name: 'Wireless Phone Charger',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
    category: 'new'
  },
  {
    id: 7,
    name: 'Noise Cancelling Earbuds',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
    category: 'new'
  },
  {
    id: 8,
    name: 'Smart Water Bottle',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    category: 'new'
  },
  
  // Best Sellers
  {
    id: 9,
    name: 'Designer Coffee Mug',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1577937569399-e53c10b4e4e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    category: 'bestseller'
  },
  {
    id: 10,
    name: 'Ergonomic Mouse',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    category: 'bestseller'
  },
  {
    id: 11,
    name: 'Minimalist Desk Lamp',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    category: 'bestseller'
  },
  {
    id: 12,
    name: 'Bamboo Cutting Board',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1594385311506-2e20a151d3d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    category: 'bestseller'
  },
  
  // Sale Items
  {
    id: 13,
    name: 'Stainless Steel Water Bottle',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    category: 'sale',
    discountPercentage: 15
  },
  {
    id: 14,
    name: 'Premium Yoga Mat',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1605296830253-27dd7a9c95bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    category: 'sale',
    discountPercentage: 20
  },
  {
    id: 15,
    name: 'Portable Power Bank',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1585593778900-bee34b6d64a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
    category: 'sale',
    discountPercentage: 25
  },
  {
    id: 16,
    name: 'Bluetooth Keyboard',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1765&q=80',
    category: 'sale',
    discountPercentage: 30
  }
];

const Index: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
      duration: 2000,
    });
  };
  
  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    toast({
      title: 'Removed from cart',
      description: 'Item has been removed from your cart',
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemCount={cartItems.length} 
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
      />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop Our Products</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of premium products designed for modern living.
            </p>
          </div>
          
          <ProductTab
            products={productData}
            onAddToCart={handleAddToCart}
          />
        </section>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-shop-purple">New Arrivals</a></li>
                <li><a href="#" className="text-gray-600 hover:text-shop-purple">Best Sellers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-shop-purple">Sale</a></li>
                <li><a href="#" className="text-gray-600 hover:text-shop-purple">All Products</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-shop-purple">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-shop-purple">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-shop-purple">Returns</a></li>
                <li><a href="#" className="text-gray-600 hover:text-shop-purple">Shipping</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-shop-purple">Our Story</a></li>
                <li><a href="#" className="text-gray-600 hover:text-shop-purple">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-shop-purple">Sustainability</a></li>
                <li><a href="#" className="text-gray-600 hover:text-shop-purple">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Stay Connected</h3>
              <p className="text-gray-600 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-shop-purple"
                />
                <button className="bg-shop-purple hover:bg-purple-700 text-white px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">© 2025 ShopVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
