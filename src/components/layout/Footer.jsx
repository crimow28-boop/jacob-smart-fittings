import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t">
      <div className="container py-8 px-4 md:px-6 flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <a href="https://www.facebook.com/share/1G7AJoYa4L/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
            <ButtonIcon icon={<Facebook className="w-5 h-5" />} />
          </a>
          <a href="https://www.instagram.com/jacob.fittings?igsh=MTRrYTZpbWFpa2pubw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <ButtonIcon icon={<Instagram className="w-5 h-5" />} />
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <Link to={createPageUrl('Terms')} className="hover:text-primary transition-colors">תקנון האתר</Link>
          <Link to={createPageUrl('Privacy')} className="hover:text-primary transition-colors">מדיניות פרטיות</Link>
          <Link to={createPageUrl('Accessibility')} className="hover:text-primary transition-colors">הצהרת נגישות</Link>
        </div>
        <div className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} JACOB Smart fittings LTD. כל הזכויות שמורות.
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