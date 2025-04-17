
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  discountPercentage?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };
  
  // Calculate discounted price if applicable
  const finalPrice = product.discountPercentage 
    ? product.price * (1 - product.discountPercentage / 100) 
    : product.price;
    
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <div className="relative h-60 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.discountPercentage && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <div>
            {product.discountPercentage ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 line-through text-sm">${product.price.toFixed(2)}</span>
                <span className="text-shop-purple font-bold">${finalPrice.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-shop-purple font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          <Button 
            size="sm"
            onClick={handleAddToCart}
            className="bg-shop-purple hover:bg-purple-700 text-white"
          >
            <ShoppingCart size={16} className="mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
