import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAdmin } from '../admin/AdminContext';
import AboutEditorDialog from '../about/AboutEditorDialog';
import { Edit } from 'lucide-react';

export default function PartnerLogos() {
  const { isEditMode } = useAdmin();
  const [showEditor, setShowEditor] = useState(false);

  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ['about-content'],
    queryFn: async () => {
        const res = await base44.entities.AboutContent.list();
        return res[0] || {};
    },
    initialData: {}
  });

  const logos = aboutContent?.sub_logos || [];

  // Show only if there are logos OR if we are in edit mode (so admin can add them)
  if (!isEditMode && (isLoading || logos.length === 0)) return null;

  return (
    <>
      <section className="py-16 bg-white border-t border-slate-100 relative group">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center text-slate-400 mb-12">השותפים שלנו</h2>
          
          {logos.length === 0 && isEditMode ? (
            <div className="text-center py-8 border-2 border-dashed border-slate-300 rounded-lg text-slate-400">
              לחץ כדי להוסיף לוגואים של שותפים
            </div>
          ) : (
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {logos.map((logo, index) => (
                <img 
                  key={index}
                  src={logo} 
                  alt={`Partner ${index + 1}`}
                  className="h-12 md:h-16 w-auto object-contain"
                />
              ))}
            </div>
          )}
        </div>

        {isEditMode && (
          <button
            onClick={() => setShowEditor(true)}
            className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-sm z-10"
          >
            <Edit className="w-4 h-4" />
            ערוך שותפים
          </button>
        )}
      </section>

      {showEditor && (
        <AboutEditorDialog 
          open={showEditor} 
          onOpenChange={setShowEditor} 
          content={aboutContent} 
        />
      )}
    </>
  );
}