import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TrustSection from '../components/home/TrustSection';
import PartnerLogos from '../components/partners/PartnerLogos';
import EditableHero from '../components/admin/EditableHero';
import SEO from '../components/SEO';

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
      <SEO 
        description="ג'ייקוב פרזול חכם - המרכז המוביל לפתרונות פרזול מתקדמים לנגרים ולבית. קטלוג עשיר של מוצרי פרזול, ידיות, מסילות, צירים ועוד. משלוחים לכל הארץ."
        keywords="ג'ייקוב פרזול חכם, פרזול, נגרות, ידיות, מסילות, צירים, פרזול לנגרים, Jacob Smart Fittings"
      />
      {/* Hero Section removed */}
      {/* Trust Section removed */}
      <div className="container mx-auto px-4 md:px-6 pt-12 pb-4 text-center">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6940808a9015b91c711aa067/96cc46169_Screenshot2026-01-07112548.png" 
          alt="Jacob Smart Fittings" 
          className="h-32 md:h-48 mx-auto object-contain"
        />
      </div>
      <FeaturedProducts />
      <PartnerLogos />
      <CategoryGrid />
    </div>
  );
}