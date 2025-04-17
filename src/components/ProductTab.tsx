
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard, { Product } from './ProductCard';

interface ProductTabProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductTab: React.FC<ProductTabProps> = ({ products, onAddToCart }) => {
  // Filter products by category
  const featuredProducts = products.filter(product => product.category === 'featured');
  const newArrivals = products.filter(product => product.category === 'new');
  const bestSellers = products.filter(product => product.category === 'bestseller');
  const saleItems = products.filter(product => product.category === 'sale');

  return (
    <Tabs defaultValue="featured" className="w-full">
      <div className="border-b border-gray-200">
        <TabsList className="bg-transparent h-auto p-0 w-full flex justify-start overflow-x-auto">
          <TabsTrigger 
            value="featured" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-shop-purple data-[state=active]:text-shop-purple px-6 py-3 text-base font-medium"
          >
            Featured
          </TabsTrigger>
          <TabsTrigger 
            value="new" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-shop-purple data-[state=active]:text-shop-purple px-6 py-3 text-base font-medium"
          >
            New Arrivals
          </TabsTrigger>
          <TabsTrigger 
            value="bestsellers" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-shop-purple data-[state=active]:text-shop-purple px-6 py-3 text-base font-medium"
          >
            Best Sellers
          </TabsTrigger>
          <TabsTrigger 
            value="sale" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-shop-purple data-[state=active]:text-shop-purple px-6 py-3 text-base font-medium"
          >
            Sale
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="mt-8">
        <TabsContent value="featured">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="bestsellers">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sale">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {saleItems.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProductTab;
