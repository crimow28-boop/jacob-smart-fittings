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

export default function ProductEditorDialog({ open, onOpenChange, product }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    short_description: '',
    price: 0,
    images: '', // string joined by newline
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
        images: product.images ? product.images.join('\n') : '',
        video_url: product.video_url || '',
        in_stock: product.in_stock ?? true,
      });
    }
  }, [product]);

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const formattedData = {
        ...data,
        images: data.images.split('\n').filter(url => url.trim() !== ''),
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>עריכת מוצר: {product?.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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

            <div className="space-y-2">
               <Label>תמונות (כתובת URL בכל שורה)</Label>
               <Textarea 
                 value={formData.images} 
                 onChange={(e) => handleChange('images', e.target.value)}
                 className="h-32 font-mono text-xs"
                 placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
               />
            </div>

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