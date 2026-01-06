import React, { useState } from 'react';
import { useAdmin } from './AdminContext';
import { Edit } from 'lucide-react';
import ProductEditorDialog from './ProductEditorDialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function EditableProduct({ product, children, className }) {
  const { isEditMode } = useAdmin();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!isEditMode) return children;

  return (
    <>
      <div className={cn("relative group border-2 border-dashed border-blue-400/30 hover:border-blue-500 rounded-lg transition-all p-1", className)}>
         {children}
         <Button 
           size="icon"
           className="absolute top-2 right-2 h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20"
           onClick={(e) => {
             e.preventDefault();
             e.stopPropagation();
             setIsDialogOpen(true);
           }}
         >
           <Edit className="w-4 h-4" />
         </Button>
      </div>
      
      {isDialogOpen && (
        <ProductEditorDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen}
          product={product}
        />
      )}
    </>
  );
}