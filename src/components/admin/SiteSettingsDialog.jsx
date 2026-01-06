import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function SiteSettingsDialog({ open, onOpenChange }) {
  const queryClient = useQueryClient();

  const { data: content, isLoading } = useQuery({
    queryKey: ['site-content-settings'],
    queryFn: async () => {
      const res = await base44.entities.SiteContent.list();
      return res[0] || {};
    }
  });

  const [formData, setFormData] = React.useState({
    primary_color: '#8cb49c',
    primary_hover_color: '#7aa88d',
    accent_color: '#d97706',
    hero_title: '',
    hero_subtitle: '',
    hero_image: '',
  });

  useEffect(() => {
    if (content) {
      setFormData({
        primary_color: content.primary_color || '#8cb49c',
        primary_hover_color: content.primary_hover_color || '#7aa88d',
        accent_color: content.accent_color || '#d97706',
        hero_title: content.hero_title || '',
        hero_subtitle: content.hero_subtitle || '',
        hero_image: content.hero_image || '',
      });
    }
  }, [content]);

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      if (content?.id) {
        return await base44.entities.SiteContent.update(content.id, data);
      } else {
        return await base44.entities.SiteContent.create(data);
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['site-content'] }),
        queryClient.invalidateQueries({ queryKey: ['site-content-settings'] }),
        queryClient.invalidateQueries({ queryKey: ['site-content-layout'] })
      ]);
      toast.success('הגדרות האתר עודכנו בהצלחה');
      onOpenChange(false);
    },
    onError: () => {
      toast.error('שגיאה בעדכון ההגדרות');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>הגדרות אתר ועיצוב</DialogTitle>
          <DialogDescription>
            שנה את צבעי האתר, ותוכן ראשי.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">צבעים</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>צבע ראשי (Primary)</Label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    value={formData.primary_color} 
                    onChange={(e) => handleChange('primary_color', e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input 
                    value={formData.primary_color} 
                    onChange={(e) => handleChange('primary_color', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>צבע ראשי במעבר עכבר (Hover)</Label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    value={formData.primary_hover_color} 
                    onChange={(e) => handleChange('primary_hover_color', e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input 
                    value={formData.primary_hover_color} 
                    onChange={(e) => handleChange('primary_hover_color', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>צבע הדגשה (Accent)</Label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    value={formData.accent_color} 
                    onChange={(e) => handleChange('accent_color', e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input 
                    value={formData.accent_color} 
                    onChange={(e) => handleChange('accent_color', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hero settings removed from form as hero section is removed, but keeping in data just in case */}
          
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