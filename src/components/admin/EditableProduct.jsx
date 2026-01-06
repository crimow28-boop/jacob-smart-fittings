import React from 'react';
import { useAdmin } from './AdminContext';

export default function EditableProduct({ product, children }) {
  const { isEditMode } = useAdmin();

  if (!isEditMode) return children;

  return (
    <div className="relative group border-2 border-dashed border-transparent hover:border-blue-500 rounded-lg transition-all">
       {children}
       <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-bl opacity-50 group-hover:opacity-100 pointer-events-none z-10">
         Editable
       </div>
    </div>
  );
}