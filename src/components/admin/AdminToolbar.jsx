import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Lock, LogOut, Edit3, X, Palette } from 'lucide-react';
import { useAdmin } from './AdminContext';
import AdminLoginDialog from './AdminLoginDialog';
import SiteSettingsDialog from './SiteSettingsDialog';
import { useLocation } from 'react-router-dom';

export default function AdminToolbar() {
  const { isEditMode, setIsEditMode } = useAdmin();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  // Basic check - in a real app check user role
  const isAdmin = true; // For demo purposes, or check localStorage

  if (!isAdmin) return null;

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
        {isEditMode && (
          <Button
            size="icon"
            className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 transition-all"
            onClick={() => setIsSettingsOpen(true)}
            title="הגדרות אתר וצבעים"
          >
            <Palette className="w-5 h-5" />
          </Button>
        )}
        {/* Login button removed - access via secret code in category search */}
      </div>

      <AdminLoginDialog 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen}
      />
      
      <SiteSettingsDialog 
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </>
  );
}