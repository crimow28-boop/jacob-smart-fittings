import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  ChevronRight, 
  Check, 
  Truck,
  Shield,
  MessageCircle,
  FileText,
  Download,
  Edit2,
  X,
  Maximize2
} from 'lucide-react';
import { useCart } from '../components/cart/CartContext';
import ProductGallery from '../components/products/ProductGallery';
import EditableProduct from '../components/admin/EditableProduct';
import { useAdmin } from '../components/admin/AdminContext';

const WHATSAPP_NUMBER = '15551234567';

export default function Product() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  
  const [quantity, setQuantity] = useState(1);
  const [lightboxImage, setLightboxImage] = useState(null);
  const { addToCart, setIsCartOpen } = useCart();
  const { isEditMode } = useAdmin();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const products = await base44.entities.Product.filter({ id: productId });
      return products[0];
    },
    enabled: !!productId,
  });

  // Categories removed

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setIsCartOpen(true);
    }
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      `שלום, אני מעוניין ב${product?.name}.\n\nהאם תוכלו לספק מידע נוסף על המחיר והזמינות?\n\nתודה.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-48 mb-8" />
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-slate-200 rounded-xl" />
              <div>
                <div className="h-8 bg-slate-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-8" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">המוצר לא נמצא</h2>
          <p className="text-slate-500 mb-4">המוצר שאתה מחפש לא קיים.</p>
          <Link to={createPageUrl('Home')}>
            <Button>חזרה לדף הבית</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Combine old and new specs
  const allSpecs = [
    ...(product.specification_url ? [product.specification_url] : []),
    ...(product.specification_urls || [])
  ];

  const handleDownload = (url, index) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `spec-${product.slug}-${index + 1}`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSpecClick = (url, isPdf) => {
    if (isPdf) {
        window.open(url, '_blank');
    } else {
        setLightboxImage(url);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-slate-500">
            <Link to={createPageUrl('Home')} className="hover:text-primary transition-colors">בית</Link>
            <ChevronRight className="w-4 h-4 mx-2 rotate-180" />
            <Link to={createPageUrl('Category')} className="hover:text-primary transition-colors">מוצרים</Link>
            <ChevronRight className="w-4 h-4 mx-2 rotate-180" />
            <span className="text-slate-800 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <EditableProduct product={product}>
              <ProductGallery key={product.id} images={product.images} />
            </EditableProduct>
            
            {allSpecs.map((specUrl, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-800">מפרט טכני {allSpecs.length > 1 ? index + 1 : ''}</h3>
                  <Button variant="ghost" size="sm" onClick={() => handleDownload(specUrl, index)}>
                    <Download className="w-4 h-4 ml-1" />
                    הורד
                  </Button>
                </div>
                {specUrl.toLowerCase().includes('.pdf') ? (
                  <div 
                    className="w-full h-64 border border-slate-200 rounded-lg flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors group"
                    onClick={() => window.open(specUrl, '_blank')}
                  >
                    <FileText className="w-12 h-12 text-slate-400 group-hover:text-primary transition-colors mb-3" />
                    <span className="font-medium text-slate-700">מפרט טכני (PDF)</span>
                    <span className="text-sm text-slate-500 mt-1">לחץ לצפייה או הורדה</span>
                  </div>
                ) : (
                  <div 
                    className="cursor-pointer relative group" 
                    onClick={() => handleSpecClick(specUrl, false)}
                  >
                    <img 
                      src={specUrl} 
                      alt={`Technical Specification ${index + 1}`} 
                      className="w-full h-auto border border-primary rounded-lg hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg pointer-events-none">
                      <Maximize2 className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              {!product.in_stock && (
                <Badge variant="secondary" className="mb-3 bg-red-100 text-red-800">
                  אזל מהמלאי
                </Badge>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                {product.name}
              </h1>
              {/* Price removed */}
            </div>

            <Separator className="my-6" />

            {/* Description */}
            <div className="prose prose-slate max-w-none mb-8">
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Video Section */}
            {product.video_url && (
              <div className="mb-6">
                <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                  {/* YouTube */}
                  {product.video_url.includes('youtube') ? (
                    <iframe
                      src={`${product.video_url}?autoplay=1&mute=1&controls=0&loop=1&playlist=${product.video_url.split('/').pop()}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1`}
                      title={`${product.name} video`}
                      className="w-full h-full pointer-events-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : /* Vimeo */
                  product.video_url.includes('vimeo') ? (
                    <iframe
                      src={`${product.video_url}?background=1&autoplay=1&loop=1&byline=0&title=0`}
                      title={`${product.name} video`}
                      className="w-full h-full pointer-events-none"
                      allow="autoplay; fullscreen"
                    />
                  ) : (
                    /* Direct Video File */
                    <video 
                      src={product.video_url} 
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-600">כמות:</span>
                <div className="flex items-center border border-slate-200 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.in_stock}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.in_stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                >
                  <Plus className="w-4 h-4 ml-2" />
                  הוסף לבקשה
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary-hover text-white shadow-sm hover:shadow-md transition-all"
                  onClick={handleWhatsAppInquiry}
                >
                  <MessageCircle className="w-4 h-4 ml-2" />
                  שאל בוואטסאפ
                </Button>
              </div>
              
              {/* Mobile specs buttons removed, now showing unified view above */}
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-slate-800">משלוח מהיר</div>
                    <div className="text-slate-500">תוך 48 שעות</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-slate-800">אחריות לשנתיים</div>
                    <div className="text-slate-500">כיסוי מלא</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] w-full h-full p-0 bg-white border-none shadow-2xl">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition-colors border border-stone-200"
            >
                <X className="w-6 h-6" />
            </button>
            {lightboxImage && (
                <img 
                    src={lightboxImage} 
                    alt="Spec Preview" 
                    className="max-w-full max-h-full object-contain"
                />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}