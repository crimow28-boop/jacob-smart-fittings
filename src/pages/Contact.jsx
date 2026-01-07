import React from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    alert('ההודעה נשלחה בהצלחה!');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">צור קשר</h1>
            <p className="text-slate-600">אנחנו כאן לכל שאלה, בקשה או התייעצות.</p>
          </div>

          <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6940808a9015b91c711aa067/6b0f3d334_Screenshot2026-01-07112548.png" 
                alt="Jacob Fittings" 
                className="h-24 md:h-32 w-auto object-contain"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">טלפון</h3>
                    <p className="text-slate-600">054-7391001</p>
                    <p className="text-sm text-slate-500 mt-1">א'-ה': 09:00-18:00</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">אימייל</h3>
                    <p className="text-slate-600">office@k-jacob.co.il</p>
                    <p className="text-sm text-slate-500 mt-1">מענה תוך 24 שעות</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center gap-6 pt-4">
                <a 
                  href="https://www.facebook.com/share/1G7AJoYa4L/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.instagram.com/jacob.fittings?igsh=MTRrYTZpbWFpa2pubw%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>

            </div>


          </div>
        </div>
      </div>
    </div>
  );
}