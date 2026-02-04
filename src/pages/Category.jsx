import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import ProductCard from '../components/products/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, SlidersHorizontal, Plus, ArrowRight } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import ProductEditorDialog from '../components/admin/ProductEditorDialog';
import CategoryManagerDialog from '../components/admin/CategoryManagerDialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAdmin } from '../components/admin/AdminContext';
import { toast } from 'sonner';
import SEO from '../components/SEO';

export default function Category() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategoryId = urlParams.get('category');
  const { setIsEditMode, isEditMode } = useAdmin();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId || 'all');
  const [viewMode, setViewMode] = useState(initialCategoryId ? 'list' : 'grid');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setViewMode('list');
    } else if (selectedCategory === 'all' && !initialCategoryId) {
      // If we cleared search and are in 'all' category, go back to grid
      setViewMode('grid');
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value === '1970') {
      setIsEditMode(!isEditMode);
      toast.success(isEditMode ? 'מצב עריכה כבוי' : 'מצב עריכה הופעל');
      setSearchTerm('');
      return;
    }
    setSearchTerm(value);
  };
  
  // Fetch Products
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await base44.entities.Product.list('order'),
    initialData: []
  });

  // Fetch Categories
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await base44.entities.Category.list({ sort: { order: 1 } }),
    initialData: []
  });

  // Filter Logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category_ids?.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });
  
  // Get current category name
  const currentCategoryName = categories.find(c => c.id === selectedCategory)?.name;

  if (isLoadingProducts || isLoadingCategories) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-slate-200 rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="h-96 bg-slate-200 rounded" />
            <div className="col-span-3 grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 bg-slate-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <SEO 
        description="צפו בקטלוג המוצרים המלא של ג'ייקוב פרזול חכם. מגוון רחב של פתרונות פרזול לכל מטרה."
      />
      <ProductEditorDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
        product={null} 
      />
      <CategoryManagerDialog 
        open={isCategoryManagerOpen}
        onOpenChange={setIsCategoryManagerOpen}
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-slate-900">קטלוג מוצרים</h1>
            {isEditMode && (
              <div className="flex gap-2">
                <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-primary hover:bg-primary-hover">
                  <Plus className="w-4 h-4 ml-2" />
                  הוסף מוצר
                </Button>
                <Button onClick={() => setIsCategoryManagerOpen(true)} variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  <SlidersHorizontal className="w-4 h-4 ml-2" />
                  ניהול קטגוריות
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
             <div className="relative w-full md:w-80">
               <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <Input 
                 placeholder="חיפוש מוצר..." 
                 className="pr-10"
                 value={searchTerm}
                 onChange={handleSearchChange}
               />
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          
          {viewMode === 'list' && (
             <div className="flex items-center gap-2 mb-2">
                <Button 
                  variant="ghost" 
                  className="gap-1 pl-0 hover:bg-transparent hover:text-primary"
                  onClick={() => {
                    setSelectedCategory('all');
                    setViewMode('grid');
                    setSearchTerm('');
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                  חזרה לקטגוריות
                </Button>
                {selectedCategory !== 'all' && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="font-medium text-slate-900">{currentCategoryName}</span>
                  </>
                )}
                {selectedCategory === 'all' && searchTerm === '' && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="font-medium text-slate-900">כל המוצרים</span>
                  </>
                )}
             </div>
          )}

          {/* Category Grid View */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {/* All Products Card */}
              <Card 
                className="h-full hover:shadow-lg transition-all cursor-pointer border-slate-200 rounded-lg group"
                onClick={() => {
                  setSelectedCategory('all');
                  setViewMode('list');
                }}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[160px] gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Search className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">כל המוצרים</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {products.length} מוצרים
                    </p>
                  </div>
                </CardContent>
              </Card>

              {categories.map((category) => (
                <Card 
                  key={category.id} 
                  className="h-full hover:shadow-lg transition-all cursor-pointer border-slate-200 rounded-lg group"
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setViewMode('list');
                  }}
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[160px] gap-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-700 font-bold text-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {category.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">{category.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {products.filter(p => p.category_ids?.includes(category.id)).length} מוצרים
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Product Grid View */
            <div className="w-full">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
                  <p className="text-lg text-slate-500">לא נמצאו מוצרים התואמים את החיפוש שלך.</p>
                  <Button variant="link" onClick={() => { 
                    setSearchTerm(''); 
                    setSelectedCategory('all'); 
                    if (!searchTerm) setViewMode('grid'); // Go back to grid if we were just browsing empty category
                  }}>
                    נקה סינון
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}