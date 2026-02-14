import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { CartProvider } from './components/cart/CartContext';
import { AdminProvider } from './components/admin/AdminContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import AdminToolbar from './components/admin/AdminToolbar';
import AccessibilityMenu from './components/accessibility/AccessibilityMenu';
import CookieConsent from './components/legal/CookieConsent';
import { Toaster } from '@/components/ui/sonner';

// Helper to convert hex to HSL string "H S% L%" for Shadcn
function hexToHsl(hex) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      let r = (c >> 16) & 255;
      let g = (c >> 8) & 255;
      let b = c & 255;

      r /= 255;
      g /= 255;
      b /= 255;
      let max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
          h = s = 0; // achromatic
      } else {
          let d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
      }

      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);

      return `${h} ${s}% ${l}%`;
  }
  return '';
}

export default function Layout({ children }) {
  const { data: siteContent } = useQuery({
    queryKey: ['site-content-layout'],
    queryFn: async () => {
      const res = await base44.entities.SiteContent.list();
      return res[0] || {};
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const primaryHsl = siteContent?.primary_color ? hexToHsl(siteContent.primary_color) : '';
  const primaryHoverHsl = siteContent?.primary_hover_color ? hexToHsl(siteContent.primary_hover_color) : '';
  const accentHsl = siteContent?.accent_color ? hexToHsl(siteContent.accent_color) : '';
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!document.querySelector('meta[name="google-site-verification"]')) {
      const meta = document.createElement('meta');
      meta.name = "google-site-verification";
      meta.content = "lYRvW6Iyb2VEF7zN1F-9GoYK4Msr-o31VnFHCwSEuPw";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <AdminProvider>
      <CartProvider>
        {primaryHsl && (
          <style dangerouslySetInnerHTML={{
            __html: `
              :root {
                --primary: ${primaryHsl};
                --primary-foreground: 0 0% 100%; /* White text on primary */
                /* Adjust ring color if needed */
                --ring: ${primaryHsl};
              }
              /* Custom accent color class if used manually, or override destructive/secondary? 
                 Let's just update the specific colors if they were used. 
                 The app used 'amber' and 'primary'. 
                 Primary is now dynamic. 
                 Accent (Amber) replacement: */
              .bg-amber-600 {
                 background-color: ${siteContent.accent_color || '#d97706'} !important;
              }
              .hover\\:bg-amber-700:hover {
                 background-color: ${siteContent.accent_color ? 'color-mix(in srgb, ' + siteContent.accent_color + ', black 10%)' : '#b45309'} !important;
              }
              .text-amber-600 {
                 color: ${siteContent.accent_color || '#d97706'} !important;
              }
            `
          }} />
        )}
        <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900" dir="rtl">
           <Header />
           <main className="flex-1">
             {children}
           </main>
           <WhatsAppButton />
           <AdminToolbar />
           <AccessibilityMenu />
           <CookieConsent />
           <Footer />
           <Toaster />
        </div>
      </CartProvider>
    </AdminProvider>
  );
}