import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie_consent');
    if (!hasConsented) {
      // Show popup after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
        // If consented, we can enable scripts here if needed
        // For now, we just don't show the popup
        enableTracking();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
    enableTracking();
  };

  const enableTracking = () => {
     // This is where you would initialize analytics pixels, etc.
     // console.log("Tracking enabled");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md z-50"
        >
          <div className="bg-white border border-slate-200 shadow-2xl rounded-lg p-6 flex flex-col gap-4 relative">
             <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-2 left-2 text-slate-400 hover:text-slate-600"
             >
                <X className="w-4 h-4" />
             </button>
             
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
                   <Cookie className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-bold text-lg text-slate-900 mb-1">שימוש בעוגיות (Cookies)</h3>
                   <p className="text-sm text-slate-600 leading-relaxed">
                      אנו משתמשים בעוגיות כדי לשפר את חווית הגלישה שלך, להציג תוכן מותאם אישית ולנתח את התנועה באתר. 
                      למידע נוסף ניתן לעיין ב<Link to={createPageUrl('Privacy')} className="text-primary hover:underline">מדיניות הפרטיות</Link> שלנו.
                   </p>
                </div>
             </div>
             
             <div className="flex gap-3 mt-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>
                   סגור
                </Button>
                <Button size="sm" onClick={handleAccept}>
                   אני מסכים
                </Button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}