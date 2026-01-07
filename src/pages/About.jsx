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
      {/* Hero */}
      <EditableAbout content={aboutContent}>
        <div className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{aboutContent.main_title || 'קצת עלינו'}</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              אנחנו מאמינים באיכות, שירות ומחויבות ללקוחות שלנו. הסיפור שלנו מתחיל בתשוקה למוצרים מעולים.
            </p>
          </div>
        </div>

        <div className="container px-4 md:px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg text-slate-600">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">החזון שלנו</h2>
              <p className="whitespace-pre-line">
                {aboutContent.main_text || `אנחנו כאן כדי לספק לכם את המוצרים הטובים ביותר בשוק, תוך הקפדה על איכות ללא פשרות ושירות לקוחות יוצא דופן.
                
                הצוות שלנו מורכב מאנשי מקצוע מנוסים שחיים ונושמים את התחום, ותמיד שמחים לעזור ולייעץ. אנחנו מאמינים שקנייה צריכה להיות חוויה מהנה ובטוחה.`}
              </p>
            </div>
            <div className="flex items-center justify-center">
              {aboutContent.main_logo ? (
                  <img src={aboutContent.main_logo} alt="About Us" className="w-full h-auto rounded-2xl shadow-sm" />
              ) : (
                  <div className="w-full aspect-square bg-slate-100 rounded-2xl flex items-center justify-center p-8">
                    <div className="text-slate-300 font-bold text-4xl">LOGO</div>
                  </div>
              )}
            </div>
          </div>
          {/* Partners Section */}
          {aboutContent.sub_logos && aboutContent.sub_logos.length > 0 && (
            <div className="mt-20 pt-12 border-t border-slate-100">
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
          )}
        </div>
      </EditableAbout>

      {/* Values */}
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
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
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
    </div>
  );
}