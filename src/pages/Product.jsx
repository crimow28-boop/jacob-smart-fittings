import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Maximize2,
  Package
} from 'lucide-react';
import { useCart } from '../components/cart/CartContext';
import ProductGallery from '../components/products/ProductGallery';
import EditableProduct from '../components/admin/EditableProduct';
import { useAdmin } from '../components/admin/AdminContext';

const WHATSAPP_NUMBER = '972547391001';

export default function Product() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!isLoading && (error || !product)) {
      navigate(createPageUrl('Home'), { replace: true });
    }
  }, [isLoading, error, product, navigate]);

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
    return null;
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
          <div className="space-y-4 min-w-0">
            <EditableProduct product={product}>
              <ProductGallery 
                key={product.id} 
                images={product.images} 
                onImageClick={(img) => setLightboxImage(img)}
              />
            </EditableProduct>
            
            {allSpecs.map((specUrl, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-800">מפרט טכני {allSpecs.length > 1 ? index + 1 : ''}</h3>
                  <Button variant="ghost" onClick={() => handleDownload(specUrl, index)}>
                    <Download className="w-4 h-4 ml-2" />
                    הורד
                  </Button>
                </div>
                {specUrl.toLowerCase().includes('.pdf') ? (
                  <div 
                    className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-100 transition-colors w-fit"
                    onClick={() => handleDownload(specUrl, index)}
                  >
                    <FileText className="w-5 h-5 text-red-500" />
                    <span className="font-medium text-slate-700 text-sm">קובץ PDF להורדה</span>
                  </div>
                ) : (
                  <div 
                    className="cursor-pointer relative group" 
                    onClick={() => handleSpecClick(specUrl, false)}
                  >
                    <img 
                      src={specUrl} 
                      alt={`Technical Specification ${index + 1}`} 
                      className="w-full h-auto object-contain border border-primary rounded-none hover:opacity-90 transition-opacity"
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
          <div className="min-w-0">
            <div className="mb-6">
              {!product.in_stock && (
                <Badge variant="secondary" className="mb-3 bg-red-100 text-red-800">
                  אזל מהמלאי
                </Badge>
              )}
              <h1 className="text-2xl lg:text-4xl font-bold text-slate-800 mb-4">
                {product.name}
              </h1>
              {/* Price removed */}
            </div>

            <Separator className="my-6" />

            {/* Description */}
            <div className="prose prose-slate max-w-none mb-8">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{product.description}</p>
            </div>

            {/* Video Section */}
            {product.video_url && (
              <div className="mb-6">
                <div className="aspect-video bg-slate-100 rounded-none overflow-hidden border border-slate-200">
                  {(() => {
                    let videoSrc = product.video_url;
                    let isYoutube = videoSrc.includes('youtube') || videoSrc.includes('youtu.be');
                    let isVimeo = videoSrc.includes('vimeo');
                    
                    if (isYoutube) {
                      let videoId = null;
                      if (videoSrc.includes('youtu.be/')) videoId = videoSrc.split('youtu.be/')[1].split(/[?#]/)[0];
                      else if (videoSrc.includes('v=')) videoId = videoSrc.split('v=')[1].split(/[&?#]/)[0];
                      else if (videoSrc.includes('/embed/')) videoId = videoSrc.split('/embed/')[1].split(/[?#]/)[0];
                      
                      if (videoId) {
                        videoSrc = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
                      }
                    } else if (isVimeo && !videoSrc.includes('player.vimeo.com')) {
                         const match = videoSrc.match(/vimeo\.com\/(\d+)/);
                         if (match && match[1]) {
                             videoSrc = `https://player.vimeo.com/video/${match[1]}`;
                         }
                    }

                    if (isYoutube || isVimeo) {
                         return (
                            <iframe
                                src={videoSrc}
                                title={`${product.name} video`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                         );
                    }
                    
                    return (
                        <video 
                          src={product.video_url} 
                          controls
                          className="w-full h-full object-contain bg-black"
                        />
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-600">כמות:</span>
                <div className="flex items-center border border-slate-200 rounded-none">
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
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white rounded-none"
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                >
                  <Plus className="w-4 h-4 ml-2" />
                  הוסף לבקשה
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary-hover text-white shadow-sm hover:shadow-md transition-all rounded-none"
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
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 lg:w-5 lg:h-5 text-slate-600" />
                  </div>
                  <div className="text-xs lg:text-sm">
                    <div className="font-medium text-slate-800">משלוח מהיר</div>
                    <div className="text-slate-500">עד בית הלקוח</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 lg:w-5 lg:h-5 text-slate-600" />
                  </div>
                  <div className="text-xs lg:text-sm">
                    <div className="font-medium text-slate-800">מלאי זמין</div>
                    <div className="text-slate-500">לפי דרישה</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-screen w-screen h-screen p-0 bg-black/95 border-none shadow-none duration-200">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
                <X className="w-8 h-8" />
            </button>
            {lightboxImage && (
                <img 
                    src={lightboxImage} 
                    alt="Preview" 
                    className="w-full h-full object-contain"
                />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}