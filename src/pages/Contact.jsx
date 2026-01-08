import React from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    alert('ההודעה נשלחה בהצלחה!');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center py-12">
      <div className="container px-4 md:px-6 w-full">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">צור קשר</h1>
            <p className="text-slate-600">אנחנו כאן לכל שאלה, בקשה או התייעצות.</p>
          </div>

          <div className="flex justify-center mb-12">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6940808a9015b91c711aa067/c7db0a771_Screenshot2026-01-07112548.png"
              alt="Jacob Logo"
              className="h-24 md:h-32 object-contain" />

          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">

            {/* Contact Info */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-slate-900">טלפון</h3>
                  <p className="text-slate-600 text-lg dir-ltr">054-7391001</p>
                  <p className="text-slate-500 mt-2 text-sm opacity-0">א'-ה': 09:00-18:00</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-slate-900">אימייל</h3>
                  <p className="text-slate-600 text-lg">office@k-jacob.co.il</p>
                  <p className="text-slate-500 mt-2 text-sm opacity-0">מענה תוך 24 שעות</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center gap-8 mt-12">

            <a
              href="https://www.facebook.com/share/1G7AJoYa4L/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2">

              <div className="w-14 h-14 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white group-hover:border-[#1877F2] transition-all duration-300 shadow-sm">
                <Facebook className="w-7 h-7" />
              </div>
              <span className="text-sm font-medium text-slate-500 group-hover:text-[#1877F2] transition-colors">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/jacob.fittings?igsh=MTRrYTZpbWFpa2pubw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2">

              <div className="w-14 h-14 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl flex items-center justify-center group-hover:bg-[#E4405F] group-hover:text-white group-hover:border-[#E4405F] transition-all duration-300 shadow-sm">
                <Instagram className="w-7 h-7" />
              </div>
              <span className="text-sm font-medium text-slate-500 group-hover:text-[#E4405F] transition-colors">Instagram</span>
            </a>
            <a
              href="https://wa.me/972547391001"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2">

              <div className="w-14 h-14 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366] transition-all duration-300 shadow-sm">
                <MessageCircle className="w-7 h-7" />
              </div>
              <span className="text-sm font-medium text-slate-500 group-hover:text-[#25D366] transition-colors">WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>);

}