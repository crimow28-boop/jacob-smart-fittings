import React from 'react';
import { useAdmin } from './AdminContext';
import { Edit } from 'lucide-react';

export default function EditableHero({ content, children }) {
  const { isEditMode } = useAdmin();

  if (!isEditMode) return children;

  return (
    <div className="relative group border-2 border-dashed border-blue-400/50 hover:border-blue-500 rounded-lg transition-all">
       {children}
       <button className="absolute top-4 left-4 bg-blue-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
         <Edit className="w-4 h-4" />
       </button>
    </div>
  );
}