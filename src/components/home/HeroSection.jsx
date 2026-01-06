import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection({ content }) {
  const { hero_title, hero_subtitle, hero_image } = content || {};

  return (
    <div className="relative w-full h-[600px] flex items-center overflow-hidden bg-slate-900 text-white">
      {/* Background Image */}
      {hero_image && (
        <div className="absolute inset-0 z-0">
          <img 
            src={hero_image} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      )}
      
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            {hero_title || "ברוכים הבאים לחנות שלנו"}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-xl">
            {hero_subtitle || "גלה את המוצרים הטובים ביותר במחירים המשתלמים ביותר. איכות ללא פשרות ושירות מעולה."}
          </p>
          <div className="flex gap-4 pt-4">
            <Link to={createPageUrl('Category')}>
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white text-lg px-8 py-6 h-auto">
                לצפייה בקטלוג
                <ArrowLeft className="mr-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('About')}>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900 text-lg px-8 py-6 h-auto">
                אודותינו
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}