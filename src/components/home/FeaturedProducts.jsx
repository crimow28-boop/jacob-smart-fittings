import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ProductCard from '../products/ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';

export default function FeaturedProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      // Fetch featured products, sorted by featured_order
      return await base44.entities.Product.filter({ featured: true }); // Mocking filter for now, ideally sort too
    },
    initialData: []
  });

  if (isLoading) return null; // Or skeleton

  if (products.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">מוצרים נבחרים</h2>
          <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
            המוצרים הפופולריים והמומלצים ביותר שלנו, נבחרו בקפידה עבורכם.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to={createPageUrl('Category')}>
            <Button variant="outline" size="lg" className="gap-2">
              לכל המוצרים
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}