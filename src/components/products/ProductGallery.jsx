import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when images change (e.g. switching products)
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  // Auto-play slideshow logic
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const nextImage = () => {
    if (images && images.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images && images.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200">
        <span>No Image Available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-white rounded-none overflow-hidden border border-slate-200 relative group touch-pan-y">
        <img 
          src={images[currentIndex]} 
          alt="Product Main" 
          className="w-full h-full object-contain transition-opacity duration-300"
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 rounded-full shadow-sm z-10 opacity-70 hover:opacity-100"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 rounded-full shadow-sm z-10 opacity-70 hover:opacity-100"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-16 h-16 rounded-none border-2 flex-shrink-0 overflow-hidden transition-all ${
                currentIndex === idx ? 'border-amber-500' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}