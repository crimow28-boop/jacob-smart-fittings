import React, { useState } from 'react';
import { useAdmin } from '../admin/AdminContext';
import { Edit } from 'lucide-react';
import AboutEditorDialog from './AboutEditorDialog';

export default function EditableAbout({ content, children }) {
  const { isEditMode } = useAdmin();
  const [showEditor, setShowEditor] = useState(false);

  if (!isEditMode) return children;

  return (
    <>
      <div 
        className="relative group border-2 border-dashed border-blue-400/50 hover:border-blue-500 rounded-lg transition-all p-2 cursor-pointer"
        onClick={() => setShowEditor(true)}
      >
         {children}
         <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-1">
           <Edit className="w-3 h-3" />
           ערוך תוכן
         </div>
      </div>
      
      {showEditor && (
        <AboutEditorDialog 
          open={showEditor} 
          onOpenChange={setShowEditor} 
          content={content} 
        />
      )}
    </>
  );
}