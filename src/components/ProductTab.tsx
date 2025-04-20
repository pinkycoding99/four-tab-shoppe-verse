
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard, { Product } from './ProductCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductTabProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductTab: React.FC<ProductTabProps> = ({ products, onAddToCart }) => {
  const [currentPage, setCurrentPage] = useState({
    featured: 1,
    new: 1,
    bestsellers: 1,
    sale: 1
  });
  
  const ITEMS_PER_PAGE = 8;
  
  // Filter products by category
  const featuredProducts = products.filter(product => product.category === 'featured');
  const newArrivals = products.filter(product => product.category === 'new');
  const bestSellers = products.filter(product => product.category === 'bestseller');
  const saleItems = products.filter(product => product.category === 'sale');

  const getPaginatedProducts = (productList: Product[], page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return productList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getPageCount = (totalItems: number) => {
    return Math.ceil(totalItems / ITEMS_PER_PAGE);
  };

  const renderPagination = (category: keyof typeof currentPage, totalItems: number) => {
    const pageCount = getPageCount(totalItems);
    const currentPageNumber = currentPage[category];

    if (pageCount <= 1) return null;

    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => ({
                ...prev,
                [category]: Math.max(1, prev[category] - 1)
              }))}
              className={currentPageNumber === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {[...Array(pageCount)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(prev => ({ ...prev, [category]: i + 1 }))}
                isActive={currentPageNumber === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => ({
                ...prev,
                [category]: Math.min(pageCount, prev[category] + 1)
              }))}
              className={currentPageNumber === pageCount ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

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
            {getPaginatedProducts(featuredProducts, currentPage.featured).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
          {renderPagination('featured', featuredProducts.length)}
        </TabsContent>
        
        <TabsContent value="new">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getPaginatedProducts(newArrivals, currentPage.new).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
          {renderPagination('new', newArrivals.length)}
        </TabsContent>
        
        <TabsContent value="bestsellers">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getPaginatedProducts(bestSellers, currentPage.bestsellers).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
          {renderPagination('bestsellers', bestSellers.length)}
        </TabsContent>
        
        <TabsContent value="sale">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getPaginatedProducts(saleItems, currentPage.sale).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
          {renderPagination('sale', saleItems.length)}
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProductTab;
