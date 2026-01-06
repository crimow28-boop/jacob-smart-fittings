import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';

export default function CartDrawer() {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            סל הקניות שלי
          </SheetTitle>
        </SheetHeader>
        
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
            <p>הסל שלך ריק</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 my-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 py-2">
                    <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                      {item.images?.[0] && (
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-slate-500 mt-1">כמות: {item.quantity}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-bold">₪{item.price * item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="pt-4 mt-auto">
              <Separator className="mb-4" />
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">סה"כ לתשלום</span>
                <span className="text-xl font-bold">₪{total}</span>
              </div>
              <Button className="w-full" size="lg">
                מעבר לתשלום
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}