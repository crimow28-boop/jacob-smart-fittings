import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function PartnerLogos() {
  const { data: partners, isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => await base44.entities.Partner.list({ sort: { order: 1 } }),
    initialData: []
  });

  if (isLoading || partners.length === 0) return null;

  return (
    <section className="py-12 bg-white border-t border-slate-100">
      <div className="container px-4 md:px-6">
        <h3 className="text-center text-slate-400 font-medium mb-8">המותגים שעובדים איתנו</h3>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-center w-32 h-20">
              <img 
                src={partner.logo_url} 
                alt={partner.name} 
                className="max-w-full max-h-full object-contain"
                title={partner.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}