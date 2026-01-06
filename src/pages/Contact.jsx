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

          <div className="grid md:grid-cols-2 gap-8">
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
                    <p className="text-slate-600">info@store.com</p>
                    <p className="text-sm text-slate-500 mt-1">מענה תוך 24 שעות</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">כתובת</h3>
                    <p className="text-slate-600">רחוב המסחר 1, תל אביב</p>
                    <p className="text-sm text-slate-500 mt-1">חנות הדגל</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-6">שלח לנו הודעה</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">שם מלא</label>
                      <Input id="name" placeholder="השם שלך" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">טלפון</label>
                      <Input id="phone" placeholder="מספר נייד" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">אימייל</label>
                    <Input id="email" type="email" placeholder="example@mail.com" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">הודעה</label>
                    <Textarea id="message" placeholder="כיצד נוכל לעזור?" className="min-h-[120px]" required />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 ml-2" />
                    שלח הודעה
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}