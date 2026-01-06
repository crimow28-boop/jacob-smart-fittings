import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { createPageUrl } from '@/utils';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../cart/CartContext';
import EditableProduct from '../admin/EditableProduct';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <EditableProduct product={product} className="h-full">
    <Card className="h-full flex flex-col group overflow-hidden transition-all hover:shadow-lg border-slate-200">
      <div className="relative aspect-square overflow-hidden bg-white p-4">
        {product.images?.[0] ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
            No Image
          </div>
        )}
        
        {product.is_new && (
          <Badge className="absolute top-2 right-2 bg-green-500">חדש</Badge>
        )}
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Link to={createPageUrl('Product') + `?id=${product.id}`}>
            <Button size="icon" variant="secondary" className="rounded-full">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Button 
            size="icon" 
            className="rounded-full"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            disabled={!product.in_stock}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="flex-1 p-4">
        <h3 className="font-medium text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          <Link to={createPageUrl('Product') + `?id=${product.id}`}>
            {product.name}
          </Link>
        </h3>
        {product.short_description && (
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