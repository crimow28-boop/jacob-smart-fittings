import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FileUploader from '@/components/admin/FileUploader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { X } from 'lucide-react';

export default function AboutEditorDialog({ open, onOpenChange, content }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    main_title: content?.main_title || '',
    main_text: content?.main_text || '',
    main_logo: content?.main_logo || '',
    sub_logos: content?.sub_logos || []
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (content?.id) {
        return await base44.entities.AboutContent.update(content.id, data);
      } else {
        return await base44.entities.AboutContent.create(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-content'] });
      toast.success('התוכן עודכן בהצלחה');
      onOpenChange(false);
    },
    onError: () => {
      toast.error('שגיאה בעדכון התוכן');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>עריכת תוכן דף אודות</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>כותרת ראשית</Label>
            <Input 
              value={formData.main_title} 
              onChange={e => setFormData({...formData, main_title: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>טקסט ראשי</Label>
            <Textarea 
              value={formData.main_text} 
              onChange={e => setFormData({...formData, main_text: e.target.value})}
              className="min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <Label>לוגו ראשי</Label>
            <div className="flex gap-4 items-start">
              {formData.main_logo && (
                <div className="relative w-32 aspect-square border rounded-lg p-2 bg-slate-50">
                  <img src={formData.main_logo} alt="Main Logo" className="w-full h-full object-contain" />
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, main_logo: ''})}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="flex-1">
                <FileUploader onUpload={(url) => setFormData({...formData, main_logo: url})} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>לוגואים שותפים</Label>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {formData.sub_logos?.map((url, index) => (
                <div key={index} className="relative aspect-square border rounded-lg p-2 bg-slate-50">
                  <img src={url} alt={`Partner ${index}`} className="w-full h-full object-contain" />
                  <button 
                    type="button"
                    onClick={() => {
                      const newLogos = [...formData.sub_logos];
                      newLogos.splice(index, 1);
                      setFormData({...formData, sub_logos: newLogos});
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <FileUploader 
              label="הוסף לוגו שותף"
              onUpload={(url) => setFormData({
                ...formData, 
                sub_logos: [...(formData.sub_logos || []), url]
              })} 
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>ביטול</Button>
            <Button type="submit" disabled={mutation.isPending}>שמור שינויים</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}