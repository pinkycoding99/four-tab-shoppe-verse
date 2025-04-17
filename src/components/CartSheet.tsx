
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { XCircle, Trash2 } from 'lucide-react';
import { Product } from './ProductCard';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onRemoveItem: (productId: number) => void;
}

const CartSheet: React.FC<CartSheetProps> = ({ isOpen, onClose, cartItems, onRemoveItem }) => {
  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = item.discountPercentage 
      ? item.price * (1 - item.discountPercentage / 100) 
      : item.price;
    return sum + itemPrice;
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-shop-purple text-xl">Your Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="py-4 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
              <XCircle className="h-12 w-12 mb-2 text-gray-400" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                // Calculate item price with discount if applicable
                const itemPrice = item.discountPercentage 
                  ? item.price * (1 - item.discountPercentage / 100) 
                  : item.price;
                
                return (
                  <div key={item.id} className="flex gap-4 py-2 border-b border-gray-100">
                    <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <div className="flex items-center mt-1">
                        {item.discountPercentage ? (
                          <div className="flex items-center space-x-1">
                            <span className="text-gray-400 line-through text-sm">${item.price.toFixed(2)}</span>
                            <span className="text-shop-purple font-medium">${itemPrice.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-shop-purple font-medium">${itemPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <SheetFooter className="border-t border-gray-100 pt-4">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Total</span>
              <span className="font-semibold text-shop-purple text-lg">${totalPrice.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full bg-shop-purple hover:bg-purple-700 text-white"
              disabled={cartItems.length === 0}
            >
              Checkout
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
