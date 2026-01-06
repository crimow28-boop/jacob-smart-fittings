import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Lock, LogOut, Edit3, X } from 'lucide-react';
import { useAdmin } from './AdminContext';
import AdminLoginDialog from './AdminLoginDialog';
import { useLocation } from 'react-router-dom';

export default function AdminToolbar() {
  const { isEditMode, setIsEditMode } = useAdmin();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();

  // Basic check - in a real app check user role
  const isAdmin = true; // For demo purposes, or check localStorage

  if (!isAdmin) return null;

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
        <Button
          size="icon"
          className={`rounded-full shadow-lg transition-all ${isEditMode ? 'bg-amber-600 hover:bg-amber-700' : 'bg-slate-900 hover:bg-slate-800'}`}
          onClick={() => setIsLoginOpen(true)}
        >
          {isEditMode ? <Edit3 className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
        </Button>
      </div>

      <AdminLoginDialog 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen}
      />
    </>
  );
}