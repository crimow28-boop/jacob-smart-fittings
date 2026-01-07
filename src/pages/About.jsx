import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import EditableAbout from '../components/about/EditableAbout';

export default function About() {
  const { data: aboutContent } = useQuery({
    queryKey: ['about-content'],
    queryFn: async () => {
        const res = await base44.entities.AboutContent.list();
        return res[0] || {};
    },
    initialData: {}
  });

  return (
    <div className="min-h-screen bg-white">
      <EditableAbout content={aboutContent}>
        {/* 1. Large Logo Section */}
        <div className="container mx-auto px-4 md:px-6 pt-12 pb-12 text-center">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6940808a9015b91c711aa067/1ef00d47c_Screenshot2026-01-07112548.png" 
            alt="Jacob Smart Fittings" 
            className="h-32 md:h-48 mx-auto object-contain"
          />
        </div>

        {/* 2. Values Section */}
        <div className="bg-slate-50 py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">הערכים שלנו</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "איכות", desc: "אנחנו לא מתפשרים על איכות המוצרים שלנו." },
                { title: "שירות", desc: "הלקוח תמיד במרכז, ואנחנו כאן בשבילו." },
                { title: "חדשנות", desc: "תמיד מחפשים את הדבר הבא והטוב ביותר." }
              ].map((value, i) => (
                <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-none flex items-center justify-center mx-auto mb-4 text-primary">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                    <p className="text-slate-500">{value.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Partners Section */}
        {aboutContent.sub_logos && aboutContent.sub_logos.length > 0 && (
          <div className="py-20 bg-white">
            <div className="container px-4 md:px-6">
              <h2 className="text-2xl font-bold text-center text-slate-400 mb-12">השותפים שלנו</h2>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                {aboutContent.sub_logos.map((logo, index) => (
                  <img 
                    key={index}
                    src={logo} 
                    alt={`Partner ${index + 1}`}
                    className="h-12 md:h-16 w-auto object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </EditableAbout>
    </div>
  );
}