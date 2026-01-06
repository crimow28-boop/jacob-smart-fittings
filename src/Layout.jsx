import React from 'react';
import { CartProvider } from './components/cart/CartContext';
import { AdminProvider } from './components/admin/AdminContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';

export default function Layout({ children }) {
  return (
    <AdminProvider>
      <CartProvider>
        <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900" dir="rtl">
           <Header />
           <main className="flex-1">
             {children}
           </main>
           <WhatsAppButton />
           <Footer />
        </div>
      </CartProvider>
    </AdminProvider>
  );
}