import React from 'react';
import { Link } from 'react-router-dom';
import { CartProvider } from './components/cart/CartContext';
import { AdminProvider } from './components/admin/AdminContext';
import { createPageUrl } from './utils';

export default function Layout({ children }) {
  return (
    <AdminProvider>
      <CartProvider>
        <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
           {/* Header */}
           <header className="border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-md z-50">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
               <Link to={createPageUrl('Home')} className="font-bold text-2xl tracking-tight text-slate-900 hover:opacity-80 transition-opacity">
                 Store
               </Link>
               
               <nav className="flex items-center gap-8">
                 <Link to={createPageUrl('Home')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                   Home
                 </Link>
                 <Link to={createPageUrl('Category')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                   Products
                 </Link>
               </nav>
             </div>
           </header>

           {/* Main Content */}
           <main className="flex-1">
             {children}
           </main>

           {/* Footer */}
           <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <p className="text-slate-500 text-sm">
                 © {new Date().getFullYear()} Store. All rights reserved.
               </p>
             </div>
           </footer>
        </div>
      </CartProvider>
    </AdminProvider>
  );
}