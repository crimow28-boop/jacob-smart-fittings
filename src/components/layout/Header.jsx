import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const isHome = location.pathname === '/' || location.pathname === '/Home';
    
    if (isHome) {
      const handleScroll = () => {
        if (window.scrollY > 150) {
          setShowLogo(true);
        } else {
          setShowLogo(false);
        }
      };

      // Initial check
      handleScroll();

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setShowLogo(true);
    }
  }, [location.pathname]);

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
      <div className="container mx-auto flex h-16 items-center">
        {/* Right Section (Start) - Nav / Menu */}
        <div className="flex-1 flex items-center justify-start">
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

          <nav className="hidden md:flex gap-6">
            <NavLinks />
          </nav>
        </div>

        {/* Center Section - Logo */}
        <div className={`flex-shrink-0 transition-opacity duration-300 ${showLogo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <Link to={createPageUrl('Home')} className="flex items-center justify-center">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6940808a9015b91c711aa067/2b0d0b633_7cab1a357_f6a21b46c_Artboard5-1.png" 
              alt="JACOB Smart fittings LTD" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Left Section (End) - Cart */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
}