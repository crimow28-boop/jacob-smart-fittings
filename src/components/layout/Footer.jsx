import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Store</h3>
            <p className="text-sm text-slate-500">החנות המובילה למוצרי איכות ושירות מעולה.</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">קישורים מהירים</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to={createPageUrl('Home')} className="hover:text-primary">דף הבית</Link></li>
              <li><Link to={createPageUrl('Category')} className="hover:text-primary">קטלוג מוצרים</Link></li>
              <li><Link to={createPageUrl('About')} className="hover:text-primary">אודותינו</Link></li>
              <li><Link to={createPageUrl('Contact')} className="hover:text-primary">צור קשר</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">שירות לקוחות</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="#" className="hover:text-primary">מדיניות משלוחים</Link></li>
              <li><Link to="#" className="hover:text-primary">החזרות והחלפות</Link></li>
              <li><Link to="#" className="hover:text-primary">שאלות נפוצות</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">עקבו אחרינו</h4>
            <div className="flex gap-4">
              <ButtonIcon icon={<Facebook className="w-4 h-4" />} />
              <ButtonIcon icon={<Instagram className="w-4 h-4" />} />
              <ButtonIcon icon={<Twitter className="w-4 h-4" />} />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Store. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
}

function ButtonIcon({ icon }) {
  return (
    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
      {icon}
    </div>
  );
}