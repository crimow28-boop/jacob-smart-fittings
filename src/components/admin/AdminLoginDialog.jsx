import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAdmin } from './AdminContext';
import { toast } from 'sonner';

export default function AdminLoginDialog({ open, onOpenChange }) {
  const [password, setPassword] = useState('');
  const { isEditMode, setIsEditMode } = useAdmin();

  const handleLogin = () => {
    if (password === 'admin123' || isEditMode) { // Simple mock auth or toggle
      setIsEditMode(!isEditMode);
      onOpenChange(false);
      setPassword('');
      toast.success(isEditMode ? 'מצב עריכה כבוי' : 'מצב עריכה פעיל');
    } else {
      toast.error('סיסמה שגויה');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEditMode ? 'יציאה ממצב עריכה' : 'כניסה לניהול'}
          </DialogTitle>
        </DialogHeader>
        
        {!isEditMode && (
          <div className="py-4">
            <Input
              type="password"
              placeholder="סיסמת ניהול"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
        )}

        <DialogFooter className="sm:justify-center">
          <Button onClick={handleLogin} className="w-full">
            {isEditMode ? 'התנתק' : 'התחבר'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}