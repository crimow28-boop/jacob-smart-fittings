import React, { useState } from 'react';

export default function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(images && images.length > 0 ? images[0] : null);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200">
        <span>No Image Available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-white rounded-xl overflow-hidden border border-slate-200 relative group">
        <img 
          src={mainImage || images[0]} 
          alt="Product Main" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setMainImage(img)}
              className={`w-16 h-16 rounded-lg border-2 flex-shrink-0 overflow-hidden transition-all ${
                (mainImage || images[0]) === img ? 'border-amber-500' : 'border-slate-200 hover:border-slate-300'
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