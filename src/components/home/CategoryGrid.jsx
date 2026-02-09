import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowLeft } from 'lucide-react';

export default function CategoryGrid(props) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      // Correct list usage based on previous context fixes
      return await base44.entities.Category.list('order');
    },
    initialData: []
  });

  if (isLoading || categories.length === 0) return null;

  return (
    <section className="py-12 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">קטגוריות מוצרים</h2>
            <p className="text-slate-500 mt-2">בחר קטגוריה לצפייה במוצרים</p>
          </div>
          {/* Only show "All Categories" link if we are not in "interactive" mode or if specifically requested */}
          {!props.onCategorySelect && (
            <Link to={createPageUrl('Category')} className="text-primary hover:text-primary-hover font-medium flex items-center gap-1">
              לכל הקטגוריות
              <ArrowLeft className="w-4 h-4" />
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const isSelected = props.selectedCategory === category.id;
            
            const content = (
              <Card className={`h-full hover:shadow-lg transition-all cursor-pointer border-slate-200 overflow-hidden group ${isSelected ? 'ring-2 ring-primary border-primary' : ''}`}>
                <div className="aspect-[4/3] w-full overflow-hidden bg-white relative">
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                      <span className="text-4xl font-light">{category.name.charAt(0)}</span>
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center backdrop-blur-[1px]">
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">נבחר</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className={`font-bold text-lg mb-1 group-hover:text-primary transition-colors ${isSelected ? 'text-primary' : 'text-slate-900'}`}>
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            );

            if (props.onCategorySelect) {
              return (
                <div key={category.id} onClick={() => props.onCategorySelect(isSelected ? null : category.id)}>
                  {content}
                </div>
              );
            }

            return (
              <Link key={category.id} to={createPageUrl('Category') + `?category=${category.id}`}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}