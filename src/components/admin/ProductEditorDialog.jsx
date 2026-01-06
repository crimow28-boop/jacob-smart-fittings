import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { X, FileText } from 'lucide-react';
import FileUploader from './FileUploader';

export default function ProductEditorDialog({ open, onOpenChange, product }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    short_description: '',
    price: 0,
    images: [],
    specification_urls: [],
    video_url: '',
    in_stock: true,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        short_description: product.short_description || '',
        price: product.price || 0,
        images: product.images || [],
        specification_urls: product.specification_urls || [],
        video_url: product.video_url || '',
        in_stock: product.in_stock ?? true,
      });
    }
  }, [product]);

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const formattedData = {
        ...data,
        price: Number(data.price),
      };
      return await base44.entities.Product.update(product.id, formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['product', product.id]);
      queryClient.invalidateQueries(['products']);
      toast.success('המוצר עודכן בהצלחה');
      onOpenChange(false);
    },
    onError: () => {
      toast.error('שגיאה בעדכון המוצר');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>עריכת מוצר: {product?.name}</DialogTitle>
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
                />
              </div>
              <div className="space-y-2">
                <Label>מחיר</Label>
                <Input 
                  type="number"
                  value={formData.price} 
                  onChange={(e) => handleChange('price', e.target.value)}
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-2">
               <Label>תיאור קצר</Label>
               <Input 
                 value={formData.short_description} 
                 onChange={(e) => handleChange('short_description', e.target.value)}
               />
            </div>

            <div className="space-y-2">
               <Label>תיאור מלא</Label>
               <Textarea 
                 value={formData.description} 
                 onChange={(e) => handleChange('description', e.target.value)}
                 className="h-32"
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
             <Button type="submit" disabled={updateMutation.isPending}>
               {updateMutation.isPending ? 'שומר...' : 'שמור שינויים'}
             </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}