import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Checkbox } from '@/components/ui/checkbox';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { X, FileText } from 'lucide-react';
import FileUploader from './FileUploader';
import { kebabCase } from 'lodash';

export default function ProductEditorDialog({ open, onOpenChange, product }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    short_description: '',
    price: 0,
    order: 0,
    images: [],
    specification_urls: [],
    video_url: '',
    in_stock: true,
    features: [],
    category_ids: [],
  });

  const { data: categories } = useQuery({
    queryKey: ['categories-select'],
    queryFn: async () => await base44.entities.Category.list('order'),
    initialData: [],
    enabled: open
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        short_description: product.short_description || '',
        price: product.price || 0,
        order: product.order || 0,
        images: product.images || [],
        specification_urls: product.specification_urls || [],
        video_url: product.video_url || '',
        in_stock: product.in_stock ?? true,
        features: product.features || [],
        category_ids: product.category_ids || [],
      });
    } else {
      // Reset for new product
      setFormData({
        name: '',
        description: '',
        short_description: '',
        price: 0,
        order: 0,
        images: [],
        specification_urls: [],
        video_url: '',
        in_stock: true,
        features: [],
        category_ids: [],
      });
    }
  }, [product, open]);

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const formattedData = {
        ...data,
        price: isNaN(Number(data.price)) ? 0 : Number(data.price),
        order: isNaN(Number(data.order)) ? 0 : Number(data.order || 0),
        slug: kebabCase(data.name) || `product-${Date.now()}`,
      };
      return await base44.entities.Product.create(formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('המוצר נוצר בהצלחה');
      onOpenChange(false);
    },
    onError: (error) => {
      console.error('Create product error:', error);
      toast.error(`שגיאה ביצירת המוצר: ${error.message || 'שגיאה לא ידועה'}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const formattedData = {
        ...data,
        price: isNaN(Number(data.price)) ? 0 : Number(data.price),
        order: isNaN(Number(data.order)) ? 0 : Number(data.order || 0),
      };
      return await base44.entities.Product.update(product.id, formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['product', product?.id]);
      queryClient.invalidateQueries(['products']);
      toast.success('המוצר עודכן בהצלחה');
      onOpenChange(false);
    },
    onError: (error) => {
      console.error('Update product error:', error);
      toast.error(`שגיאה בעדכון המוצר: ${error.message || 'שגיאה לא ידועה'}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSpecUpload = (url) => {
    setFormData(prev => ({ ...prev, specification_urls: [...prev.specification_urls, url] }));
  };

  const removeSpec = (index) => {
    setFormData(prev => ({
      ...prev,
      specification_urls: prev.specification_urls.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>{product ? `עריכת מוצר: ${product.name}` : 'הוספת מוצר חדש'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
             {/* Name & Price */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>שם המוצר</Label>
                <Input 
                  value={formData.name} 
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label>מחיר</Label>
                <Input 
                  type="number"
                  value={formData.price} 
                  onChange={(e) => handleChange('price', e.target.value)}
                  className="text-right"
                />
              </div>
            </div>

            <div className="space-y-2">
               <Label>סדר תצוגה (נמוך לגבוה)</Label>
               <Input 
                 type="number"
                 value={formData.order} 
                 onChange={(e) => handleChange('order', e.target.value)}
                 className="text-right"
               />
            </div>

            {/* Categories */}
            <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
               <Label className="text-base font-semibold">קטגוריות</Label>
               <div className="grid grid-cols-2 gap-4 max-h-40 overflow-y-auto pr-2">
                 {categories.map((category) => (
                   <div key={category.id} className="flex items-center space-x-2 space-x-reverse">
                     <Checkbox 
                       id={`cat-${category.id}`}
                       checked={formData.category_ids.includes(category.id)}
                       onCheckedChange={(checked) => {
                         if (checked) {
                           setFormData(prev => ({ ...prev, category_ids: [...prev.category_ids, category.id] }));
                         } else {
                           setFormData(prev => ({ ...prev, category_ids: prev.category_ids.filter(id => id !== category.id) }));
                         }
                       }}
                     />
                     <label 
                       htmlFor={`cat-${category.id}`}
                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                     >
                       {category.name}
                     </label>
                   </div>
                 ))}
                 {categories.length === 0 && (
                   <p className="text-sm text-slate-500 col-span-2">אין קטגוריות זמינות. צור קטגוריות דרך מסך ניהול הקטגוריות.</p>
                 )}
               </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-2">
               <Label>תיאור קצר</Label>
               <Input 
                 value={formData.short_description} 
                 onChange={(e) => handleChange('short_description', e.target.value)}
                 className="text-right"
               />
            </div>

            <div className="space-y-2">
               <Label>תכונות/מאפיינים (כל שורה היא מאפיין נפרד)</Label>
               <Textarea 
                 value={formData.features.join('\n')} 
                 onChange={(e) => handleChange('features', e.target.value.split('\n').filter(line => line.trim() !== ''))}
                 className="h-32 text-right"
                 placeholder="הכנס תכונות, כל אחת בשורה חדשה..."
               />
            </div>

            <div className="space-y-2">
               <Label>תיאור מלא</Label>
               <Textarea 
                 value={formData.description} 
                 onChange={(e) => handleChange('description', e.target.value)}
                 className="h-32 text-right"
               />
            </div>

            {/* Images */}
            <div className="space-y-2">
               <Label>תמונות</Label>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                 {formData.images.map((url, index) => (
                   <div key={index} className="relative group aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                     <img src={url} alt="" className="w-full h-full object-cover" />
                     <button 
                       type="button"
                       onClick={() => removeImage(index)}
                       className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       <X className="w-3 h-3" />
                     </button>
                   </div>
                 ))}
                 <div className="aspect-square">
                    <FileUploader onUpload={handleImageUpload} label="הוסף" />
                 </div>
               </div>
            </div>

             {/* Specs */}
            <div className="space-y-2">
               <Label>מפרטים טכניים (PDF)</Label>
               <div className="space-y-2 mb-4">
                 {formData.specification_urls.map((url, index) => (
                   <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                     <div className="flex items-center gap-2 truncate">
                       <FileText className="w-4 h-4 text-slate-400" />
                       <span className="text-sm truncate max-w-[300px]">{url.split('/').pop()}</span>
                     </div>
                     <button 
                       type="button"
                       onClick={() => removeSpec(index)}
                       className="text-red-500 hover:text-red-700"
                     >
                       <X className="w-4 h-4" />
                     </button>
                   </div>
                 ))}
                 <FileUploader onUpload={handleSpecUpload} accept=".pdf,image/*" label="הוסף מפרט" />
               </div>
            </div>

            {/* Video & Stock */}
            <div className="space-y-2">
               <Label>וידאו URL</Label>
               <Input 
                 value={formData.video_url} 
                 onChange={(e) => handleChange('video_url', e.target.value)}
                 className="text-right"
               />
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
               <Switch 
                 checked={formData.in_stock}
                 onCheckedChange={(checked) => handleChange('in_stock', checked)}
               />
               <Label>במלאי</Label>
            </div>
          </div>

          <DialogFooter>
             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>ביטול</Button>
             <Button type="submit" disabled={updateMutation.isPending || createMutation.isPending}>
               {updateMutation.isPending || createMutation.isPending ? 'שומר...' : (product ? 'שמור שינויים' : 'צור מוצר')}
             </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}