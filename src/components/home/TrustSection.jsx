import React from 'react';
import { Shield, Truck, CreditCard, Headphones } from 'lucide-react';

export default function TrustSection() {
  const features = [
    {
      icon: <Truck className="w-10 h-10 text-primary" />,
      title: "משלוח מהיר",
      description: "אספקה מהירה לכל חלקי הארץ תוך 3 ימי עסקים"
    },
    {
      icon: <Shield className="w-10 h-10 text-primary" />,
      title: "קנייה בטוחה",
      description: "אבטחת מידע מתקדמת ותשלום מאובטח ב-100%"
    },
    {
      icon: <CreditCard className="w-10 h-10 text-primary" />,
      title: "תשלום נוח",
      description: "אפשרויות תשלום מגוונות ופריסה לתשלומים"
    },
    {
      icon: <Headphones className="w-10 h-10 text-primary" />,
      title: "שירות לקוחות",
      description: "מענה אנושי ומקצועי לכל שאלה או בעיה"
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}