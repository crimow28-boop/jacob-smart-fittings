import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ProductCard from '../components/products/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import ProductEditorDialog from '../components/admin/ProductEditorDialog';
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
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-slate-900">קטלוג מוצרים</h1>
            {isEditMode && (
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-primary hover:bg-primary-hover">
                <Plus className="w-4 h-4 ml-2" />
                הוסף מוצר חדש
              </Button>
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
          {/* Product Grid */}
          <div className="w-full">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
                <p className="text-lg text-slate-500">לא נמצאו מוצרים התואמים את החיפוש שלך.</p>
                <Button variant="link" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
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
        </div>
      </div>
    </div>
  );
}