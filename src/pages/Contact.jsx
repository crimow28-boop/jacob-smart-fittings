import React, { useState } from 'react';
import { Mail, Phone, Facebook, Instagram, MessageCircle, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';
import SEO from '../components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({ ...prev, consent: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast.error('חובה לאשר את תנאי השימוש ומדיניות הפרטיות');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('ההודעה נשלחה בהצלחה! ניצור איתך קשר בהקדם.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: '',
      consent: false
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white py-12">
      <SEO 
        title="צור קשר" 
        description="צרו קשר עם ג'ייקוב פרזול חכם לכל שאלה או התייעצות. זמינים בטלפון, בוואטסאפ ובמייל."
      />
      <div className="container px-4 md:px-6 w-full mx-auto">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">צור קשר</h1>
            <p className="text-slate-600 text-lg">אנחנו כאן לכל שאלה, בקשה או התייעצות.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
            >
              <h2 className="text-2xl font-bold mb-6 text-slate-800">שלחו לנו הודעה</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">שם מלא</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="שמך המלא" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">טלפון</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      placeholder="מספר נייד" 
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">אימייל</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="כתובת אימייל" 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">הודעה</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="כיצד נוכל לעזור?" 
                    rows={4} 
                    required 
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-start space-x-2 space-x-reverse pt-2">
                  <Checkbox 
                    id="consent" 
                    checked={formData.consent} 
                    onCheckedChange={handleCheckboxChange}
                    className="mt-1"
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600 cursor-pointer"
                  >
                    אני מאשר/ת את <Link to={createPageUrl('Privacy')} className="text-primary hover:underline">מדיניות הפרטיות</Link> ומסכים/ה לקבלת פניות מהחברה.
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full mt-4 bg-primary hover:bg-primary/90 text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'שולח...' : (
                    <>
                      <Send className="w-5 h-5 ml-2" />
                      שליחת הודעה
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="grid gap-6">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">טלפון</h3>
                      <p className="text-slate-600 dir-ltr text-right">054-7391001</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">אימייל</h3>
                      <p className="text-slate-600">office@k-jacob.co.il</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-200">
                <h3 className="font-bold text-xl mb-6 text-slate-800">עקבו אחרינו</h3>
                <div className="flex justify-center gap-6">
                  <a
                    href="https://www.facebook.com/share/1G7AJoYa4L/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2"
                  >
                    <div className="w-12 h-12 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white group-hover:border-[#1877F2] transition-all duration-300 shadow-sm">
                      <Facebook className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">Facebook</span>
                  </a>

                  <a
                    href="https://www.instagram.com/jacob.fittings?igsh=MTRrYTZpbWFpa2pubw%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2"
                  >
                    <div className="w-12 h-12 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center group-hover:bg-[#E4405F] group-hover:text-white group-hover:border-[#E4405F] transition-all duration-300 shadow-sm">
                      <Instagram className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">Instagram</span>
                  </a>

                  <a
                    href="https://wa.me/972547391001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2"
                  >
                    <div className="w-12 h-12 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366] transition-all duration-300 shadow-sm">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}