import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function PartnerLogos() {
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ['about-content-partners'],
    queryFn: async () => {
        const res = await base44.entities.AboutContent.list();
        return res[0] || {};
    },
    initialData: {}
  });

  const logos = aboutContent?.sub_logos || [];

  if (isLoading || logos.length === 0) return null;

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center text-slate-400 mb-12">השותפים שלנו</h2>
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
      </div>
    </section>
  );
}