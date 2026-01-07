import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TrustSection from '../components/home/TrustSection';
import PartnerLogos from '../components/partners/PartnerLogos';
import EditableHero from '../components/admin/EditableHero';

export default function Home() {
  const { data: siteContent } = useQuery({
    queryKey: ['site-content'],
    queryFn: async () => {
      const content = await base44.entities.SiteContent.list();
      return content[0] || {};
    },
    initialData: {}
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section removed */}
      {/* Trust Section removed */}
      <div className="container mx-auto px-4 md:px-6 pt-12 pb-4 text-center">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6940808a9015b91c711aa067/2499b79f3_7cab1a357_f6a21b46c_Artboard5-1.png" 
          alt="Jacob Smart Fittings" 
          className="h-32 md:h-48 mx-auto object-contain"
        />
      </div>
      <FeaturedProducts />
      <CategoryGrid />
      <PartnerLogos />
    </div>
  );
}