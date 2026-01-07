import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowLeft } from 'lucide-react';

export default function CategoryGrid() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await base44.entities.Category.list({ sort: { order: 1 } });
    },
    initialData: []
  });

  if (isLoading || categories.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">קטגוריות מובילות</h2>
            <p className="text-slate-500 mt-2">מצא את מה שאתה מחפש לפי קטגוריה</p>
          </div>
          <Link to={createPageUrl('Category')} className="text-primary hover:text-primary-hover font-medium flex items-center gap-1">
            לכל הקטגוריות
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((category) => (
            <Link key={category.id} to={createPageUrl('Category') + `?category=${category.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-slate-200 rounded-none">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[140px]">
                  <div className="w-12 h-12 bg-primary/10 rounded-none flex items-center justify-center mb-4 text-primary font-bold text-lg">
                    {category.name.charAt(0)}
                  </div>
                  <span className="font-medium text-slate-900">{category.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}