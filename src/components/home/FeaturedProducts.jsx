import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ProductCard from '../products/ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

export default function FeaturedProducts({ selectedCategory, onCategorySelect }) {
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products-all'],
    queryFn: async () => await base44.entities.Product.list('order'),
    initialData: []
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories-all'],
    queryFn: async () => await base44.entities.Category.list('order'),
    initialData: []
  });

  const displayItems = useMemo(() => {
    if (isLoadingProducts || isLoadingCategories) return [];

    let items = [];

    if (selectedCategory) {
      // If a category is selected, show ONLY products in that category
      items = products.filter(p => p.category_ids?.includes(selectedCategory));
    } else {
      // Root view: Show Categories FIRST, then Products
      // Convert categories to "Product-like" objects
      const categoryItems = categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        // Use category image if available, otherwise null (ProductCard handles fallback)
        images: cat.image ? [cat.image] : [], 
        short_description: cat.description,
        isCategory: true,
        order: cat.order
      }));

      // Combine: Categories first, then Products
      // Or maybe mix them based on 'order' if you want full control?
      // For now, let's put Categories first as "Folders" usually come first
      items = [...categoryItems, ...products];
    }

    return items;
  }, [products, categories, selectedCategory, isLoadingProducts, isLoadingCategories]);

  const currentCategory = categories.find(c => c.id === selectedCategory);

  if (isLoadingProducts || isLoadingCategories) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {selectedCategory ? currentCategory?.name : 'המוצרים שלנו'}
            </h2>
            <p className="text-slate-500 mt-2">
              {selectedCategory 
                ? `${displayItems.length} מוצרים בקטגוריה`
                : 'כל הפתרונות לבית ולנגר'
              }
            </p>
          </div>
          
          {selectedCategory && (
            <Button 
              variant="outline" 
              onClick={() => onCategorySelect(null)}
              className="gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              חזרה לכל המוצרים
            </Button>
          )}
        </div>
        
        {displayItems.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg">
            <p className="text-slate-500">לא נמצאו פריטים להצגה.</p>
            {selectedCategory && (
              <Button variant="link" onClick={() => onCategorySelect(null)}>
                חזרה לראשי
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {displayItems.map((item) => (
              <ProductCard 
                key={`${item.isCategory ? 'cat' : 'prod'}-${item.id}`} 
                product={item} 
                onClick={item.isCategory ? () => onCategorySelect(item.id) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}