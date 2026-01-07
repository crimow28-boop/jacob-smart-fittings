import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t">
      <div className="container py-6 px-4 md:px-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Store. כל הזכויות שמורות.
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