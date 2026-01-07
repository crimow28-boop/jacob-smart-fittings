import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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
                    <p className="text-slate-600">Office@k-jacob.co.il</p>
                    <p className="text-sm text-slate-500 mt-1">מענה תוך 24 שעות</p>
                  </div>
                </CardContent>
              </Card>


            </div>


          </div>
        </div>
      </div>
    </div>
  );
}