import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Trash2, Plus, Pencil, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { kebabCase } from 'lodash';
import FileUploader from './FileUploader';

export default function CategoryManagerDialog({ open, onOpenChange }) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Edit State
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    image: '',
    order: 0
  });

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories-manager'],
    queryFn: async () => await base44.entities.Category.list('order'),
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

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => await base44.entities.Category.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      queryClient.invalidateQueries(['categories-manager']);
      setIsEditing(null);
      toast.success('קטגוריה עודכנה בהצלחה');
    },
    onError: () => toast.error('שגיאה בעדכון קטגוריה')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      console.log('Deleting category with ID:', id);
      return await base44.entities.Category.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      queryClient.invalidateQueries(['categories-manager']);
      toast.success('קטגוריה נמחקה');
    },
    onError: (error) => {
      console.error('Failed to delete category:', error);
      toast.error(`שגיאה במחיקת קטגוריה: ${error?.message || 'שגיאה לא ידועה'}`);
    }
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    createMutation.mutate(newCategoryName);
  };

  const startEdit = (category) => {
    setIsEditing(category.id);
    setEditForm({
      name: category.name,
      description: category.description || '',
      image: category.image || '',
      order: category.order
    });
  };

  const saveEdit = () => {
    updateMutation.mutate({ 
      id: isEditing, 
      data: {
        name: editForm.name,
        description: editForm.description,
        image: editForm.image,
        order: Number(editForm.order)
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ניהול קטגוריות</DialogTitle>
        </DialogHeader>

        {!isEditing && (
          <form onSubmit={handleCreate} className="flex gap-2 mb-6">
            <Input 
              placeholder="שם קטגוריה חדשה..." 
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={createMutation.isPending}>
              <Plus className="w-4 h-4 ml-2" />
              הוסף מהיר
            </Button>
          </form>
        )}

        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-slate-50 rounded-lg border border-slate-200 p-4 transition-all">
              {isEditing === category.id ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">עריכת קטגוריה</h3>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>שם הקטגוריה</Label>
                      <Input 
                        value={editForm.name} 
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>סדר תצוגה</Label>
                      <Input 
                        type="number"
                        value={editForm.order} 
                        onChange={(e) => setEditForm({...editForm, order: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>תיאור</Label>
                    <Textarea 
                      value={editForm.description} 
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      placeholder="תיאור קצר של הקטגוריה..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>תמונת קטגוריה</Label>
                    <FileUploader 
                      value={editForm.image ? [editForm.image] : []}
                      onChange={(files) => setEditForm({...editForm, image: files[0] || ''})}
                      maxFiles={1}
                      acceptedTypes={{'image/*': ['.png', '.jpg', '.jpeg', '.webp']}}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setIsEditing(null)}>ביטול</Button>
                    <Button onClick={saveEdit} disabled={updateMutation.isPending}>
                      <Save className="w-4 h-4 ml-2" />
                      שמור שינויים
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="w-12 h-12 rounded-md object-cover bg-white border" />
                    ) : (
                      <div className="w-12 h-12 rounded-md bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                        {category.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900">{category.name}</h4>
                      <div className="text-xs text-slate-500 flex gap-2">
                        <span>סדר: {category.order}</span>
                        <span>•</span>
                        <span>{category.slug}</span>
                      </div>
                      {category.description && (
                         <p className="text-sm text-slate-600 mt-1 line-clamp-1">{category.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                     <Button 
                       variant="ghost" 
                       size="icon"
                       onClick={() => startEdit(category)}
                     >
                       <Pencil className="w-4 h-4 text-slate-500" />
                     </Button>
                     <Button 
                       type="button"
                       variant="ghost" 
                       size="icon" 
                       className="text-red-500 hover:text-red-700 hover:bg-red-50"
                       disabled={deleteMutation.isPending}
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
              )}
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