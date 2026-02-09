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
  // Removed viewMode state as we want to always show products
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

  // If a category is selected via URL, we stick to it, otherwise 'all'
  // We don't need effects to switch viewMode anymore

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
    queryFn: async () => await base44.entities.Category.list('order'),
    initialData: []
  });

  // Filter Logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Show all products by default unless a specific category is selected
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
            <h1 className="text-3xl font-bold text-slate-900">מוצרים</h1>
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
          
          {/* Categories Section - Only visible in Edit Mode */}
          {isEditMode && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-4 text-slate-700">סינון לפי קטגוריות (מצב עריכה)</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                 {/* "All" Category Button */}
                 <div 
                    onClick={() => setSelectedCategory('all')}
                    className={`cursor-pointer p-4 rounded-lg border text-center transition-all ${
                        selectedCategory === 'all' 
                        ? 'bg-primary text-white border-primary shadow-md' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
                    }`}
                 >
                    <span className="font-medium">הכל</span>
                 </div>
                 
                 {categories.map((category) => (
                    <div 
                        key={category.id} 
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
                        className={`cursor-pointer p-4 rounded-lg border text-center transition-all flex flex-col items-center gap-2 ${
                            selectedCategory === category.id 
                            ? 'bg-primary text-white border-primary shadow-md' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
                        }`}
                    >
                        {category.image && (
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-white/20">
                             <img src={category.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <span className="font-medium text-sm truncate w-full">{category.name}</span>
                    </div>
                 ))}
              </div>
              <Separator className="mt-8" />
            </div>
          )}
          
          {/* Breadcrumbs / Filter Status */}
          {selectedCategory !== 'all' && (
             <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  className="gap-1 pl-0 hover:bg-transparent hover:text-primary"
                  onClick={() => setSelectedCategory('all')}
                >
                  <ArrowRight className="w-4 h-4" />
                  הצג את כל המוצרים
                </Button>
                <Separator orientation="vertical" className="h-4" />
                <span className="font-medium text-slate-900">{currentCategoryName}</span>
             </div>
          )}

          {/* Product Grid View - Always Visible */}
          <div className="w-full">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
                <p className="text-lg text-slate-500">לא נמצאו מוצרים.</p>
                {(searchTerm || selectedCategory !== 'all') && (
                    <Button variant="link" onClick={() => { 
                      setSearchTerm(''); 
                      setSelectedCategory('all'); 
                    }}>
                      נקה סינון
                    </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}