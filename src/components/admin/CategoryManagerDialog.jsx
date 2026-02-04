import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { kebabCase } from 'lodash';

export default function CategoryManagerDialog({ open, onOpenChange }) {
  const queryClient = useQueryClient();
  const [newCategoryName, setNewCategoryName] = useState('');

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories-manager'],
    queryFn: async () => await base44.entities.Category.list({ sort: { order: 1 } }),
    enabled: open,
    initialData: []
  });

  const createMutation = useMutation({
    mutationFn: async (name) => {
      return await base44.entities.Category.create({
        name,
        slug: kebabCase(name) || `cat-${Date.now()}`,
        order: categories.length + 1
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      queryClient.invalidateQueries(['categories-manager']);
      setNewCategoryName('');
      toast.success('קטגוריה נוצרה בהצלחה');
    },
    onError: () => toast.error('שגיאה ביצירת קטגוריה')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await base44.entities.Category.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      queryClient.invalidateQueries(['categories-manager']);
      toast.success('קטגוריה נמחקה');
    },
    onError: () => toast.error('שגיאה במחיקת קטגוריה')
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, order }) => await base44.entities.Category.update(id, { order }),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      queryClient.invalidateQueries(['categories-manager']);
    }
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    createMutation.mutate(newCategoryName);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ניהול קטגוריות</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleCreate} className="flex gap-2 mb-4">
          <Input 
            placeholder="שם קטגוריה חדשה..." 
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={createMutation.isPending}>
            <Plus className="w-4 h-4 ml-2" />
            הוסף
          </Button>
        </form>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {categories.map((category, index) => (
            <div key={category.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 group">
              <div className="flex items-center gap-3">
                <span className="font-medium">{category.name}</span>
                <span className="text-xs text-slate-400">({category.slug})</span>
              </div>
              <div className="flex items-center gap-2">
                 {/* Simple order management for now */}
                 <Input 
                   type="number" 
                   className="w-16 h-8 text-center" 
                   value={category.order}
                   onChange={(e) => updateOrderMutation.mutate({ id: category.id, order: Number(e.target.value) })}
                 />
                 <Button 
                   variant="ghost" 
                   size="icon" 
                   className="text-red-500 hover:text-red-700 hover:bg-red-50"
                   onClick={() => {
                     if (window.confirm('האם אתה בטוח שברצונך למחוק קטגוריה זו?')) {
                       deleteMutation.mutate(category.id);
                     }
                   }}
                 >
                   <Trash2 className="w-4 h-4" />
                 </Button>
              </div>
            </div>
          ))}
          {categories.length === 0 && !isLoading && (
            <p className="text-center text-slate-500 py-4">אין קטגוריות עדיין</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}