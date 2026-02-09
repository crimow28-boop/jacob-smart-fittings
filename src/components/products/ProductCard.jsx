import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { createPageUrl } from '@/utils';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../cart/CartContext';
import EditableProduct from '../admin/EditableProduct';

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart();
  
  // If it's a category or has a custom click handler
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(product);
    }
  };

  const productUrl = createPageUrl('Product') + `?id=${product.id}`;
  const LinkComponent = onClick ? 'div' : Link;
  const linkProps = onClick ? { onClick: handleClick, className: "cursor-pointer" } : { to: productUrl };

  return (
    <EditableProduct product={product} className="h-full">
      <Card className="h-full flex flex-col group overflow-hidden transition-all hover:shadow-lg border-slate-200 rounded-none relative">
        <div className="relative aspect-square overflow-hidden bg-white p-4">
          {product.images?.[0] ? (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
              {product.isCategory ? product.name.charAt(0) : 'No Image'}
            </div>
          )}
          
          {product.is_new && (
            <Badge className="absolute top-2 right-2 bg-green-500 rounded-none">חדש</Badge>
          )}
          
          {/* Main Click Area */}
          {onClick ? (
            <div 
              className="absolute inset-0 cursor-pointer z-10" 
              onClick={handleClick}
            />
          ) : (
            <Link to={productUrl} className="absolute inset-0 z-10" />
          )}
        </div>
        
        <CardContent className="flex-1 p-4 relative z-20 pointer-events-none">
          <h3 className="font-medium text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.features && product.features.length > 0 ? (
            <div className="space-y-0">
              {product.features.map((feature, idx) => (
                <React.Fragment key={idx}>
                  <div className="py-2 text-sm text-slate-600">
                    {feature}
                  </div>
                  {idx < product.features.length - 1 && <div className="h-px bg-slate-200" />}
                </React.Fragment>
              ))}
            </div>
          ) : product.short_description && (
            <p className="text-sm text-slate-500 line-clamp-2">{product.short_description}</p>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div></div>
          {!product.in_stock && (
            <span className="text-xs text-red-500 font-medium">אזל מהמלאי</span>
          )}
        </CardFooter>
      </Card>
    </EditableProduct>
  );
}