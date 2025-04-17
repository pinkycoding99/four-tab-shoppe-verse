
import React, { useState } from 'react';
import { ShoppingCart, User, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CartSheet from './CartSheet';
import { Product } from './ProductCard';

interface HeaderProps {
  cartItemCount: number;
  cartItems: Product[];
  onRemoveFromCart: (productId: number) => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, cartItems, onRemoveFromCart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const handleCartClick = () => {
    setIsCartOpen(true);
  };
  
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-shop-purple">ShopVerse</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-shop-purple transition-colors">Home</a>
          <a href="#" className="text-gray-600 hover:text-shop-purple transition-colors">Shop</a>
          <a href="#" className="text-gray-600 hover:text-shop-purple transition-colors">About</a>
          <a href="#" className="text-gray-600 hover:text-shop-purple transition-colors">Contact</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-shop-purple">
            <Search size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-shop-purple">
            <User size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:text-shop-purple relative"
            onClick={handleCartClick}
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-shop-purple text-white text-xs h-5 min-w-5 flex items-center justify-center rounded-full p-0">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
      
      <CartSheet 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveItem={onRemoveFromCart}
      />
    </header>
  );
};

export default Header;
