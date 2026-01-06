import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TrustSection from '../components/home/TrustSection';

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
      <HeroSection content={siteContent} />
      <TrustSection />
      <FeaturedProducts />
      <CategoryGrid />
    </div>
  );
}