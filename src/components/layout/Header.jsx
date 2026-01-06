import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { createPageUrl } from '@/utils';
import { useCart } from '../cart/CartContext';
import { useAdmin } from '../admin/AdminContext';
import CartDrawer from '../cart/CartDrawer';

export default function Header() {
  const { cart, setIsCartOpen } = useCart();
  const { isEditMode } = useAdmin();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const NavLinks = () => (
    <>
      <Link to={createPageUrl('Home')} className="text-sm font-medium hover:text-primary transition-colors">בית</Link>
      <Link to={createPageUrl('Category')} className="text-sm font-medium hover:text-primary transition-colors">קטלוג</Link>
      <Link to={createPageUrl('About')} className="text-sm font-medium hover:text-primary transition-colors">אודות</Link>
      <Link to={createPageUrl('Contact')} className="text-sm font-medium hover:text-primary transition-colors">צור קשר</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to={createPageUrl('Home')} className="flex items-center space-x-2 font-bold text-xl">
            {/* Logo will be placed here */}
          </Link>
          <nav className="hidden md:flex gap-6">
            <NavLinks />
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
}