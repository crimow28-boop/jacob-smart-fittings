import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ProductCard from '../products/ProductCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function CategoryProducts({ categoryId }) {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: async () => {
        // Fetch all products sorted by order
        const allProducts = await base44.entities.Product.list('order');
        // Filter in memory for now as API filtering might be limited on array contains
        if (categoryId === 'all' || !categoryId) return allProducts;
        return allProducts.filter(p => p.category_ids?.includes(categoryId));
    },
    enabled: !!categoryId
  });

  const { data: category } = useQuery({
      queryKey: ['category', categoryId],
      queryFn: async () => await base44.entities.Category.get(categoryId),
      enabled: !!categoryId && categoryId !== 'all'
  });

  if (isLoading) {
      return (
          <div className="py-12 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
      );
  }

  if (!products || products.length === 0) {
      return (
          <div className="py-12 text-center text-slate-500">
              <p>לא נמצאו מוצרים בקטגוריה זו.</p>
          </div>
      );
  }

  return (
    <section className="py-12 bg-white min-h-[50vh]">
      <div className="container px-4 md:px-6">
        <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
                {category ? category.name : 'מוצרים'}
            </h2>
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-slate-500">{products.length} מוצרים</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}