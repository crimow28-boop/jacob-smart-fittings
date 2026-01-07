import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Package, Truck, Wrench, Settings } from 'lucide-react';
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
        <div className="container mx-auto px-4 md:px-6 pt-12 pb-8 text-center">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6940808a9015b91c711aa067/1ef00d47c_Screenshot2026-01-07112548.png" 
            alt="Jacob Smart Fittings" 
            className="h-32 md:h-48 mx-auto object-contain"
          />
        </div>

        {/* 2. Text Section */}
        <div className="container mx-auto px-4 md:px-6 pb-16 max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">חדשנות בתחום הנגרות בארץ ובעולם</h1>
          <div className="prose prose-lg mx-auto text-slate-600 leading-relaxed">
            <p className="mb-4">
              אנו מתמחים בייצור, יבוא ושיווק של פתרונות פרזול חכמים ואיכותיים המשלבים נוחות ופרקטיקה לעבודה.
              המוצרים שלנו מיועדים לשימוש מגוון רחב של בעלי מקצוע בכל רחבי הארץ, תמיכה וייעוץ עוד מהשלב הראשון תוך מתן שירות ותשומת לב לפרטים הקטנים.
            </p>
            <p>
              כל מוצר שלנו נבחר בקפידה ומתוכנן בדגש על חוויית עבודה קלה ויעילה אשר באה לידי ביטוי עוד בשלב הייצור ועד לשלב ההתקנה.
            </p>
          </div>
        </div>

        {/* 3. Icons Section */}
        <div className="bg-white border-y border-slate-100 py-12 mb-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Package, label: "מלאי זמין" },
                { icon: Truck, label: "פריסה ארצית" },
                { icon: Wrench, label: "מותאם לבעלי מקצוע" },
                { icon: Settings, label: "נוחות שימוש" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-700">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-slate-800">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Values Section */}
        <div className="bg-slate-50 py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">הערכים שלנו</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: "פיתוח, ייצור ויבוא", 
                  desc: "פיתוח פטנטים, ייצור ויבוא של מגוון מוצרים נבחרים, תוך הקפדה על איכות, התאמה לצורכי השוק ובקרה לאורך כל התהליך." 
                },
                { 
                  title: "חדשנות", 
                  desc: "אנו מביאים גישות חדשות ופתרונות מתקדמים לעולם הפרזול עם דגש על יעילות וחסכון בזמן בהתקנה ובשימוש." 
                },
                { 
                  title: "איכות ואמינות", 
                  desc: "המוצרים שלנו נבחרים ומתוכננים לפרקטיקה בעבודה, עם דגש על עמידות, שימוש יומיומי ואיכות לאורך זמן." 
                },
                { 
                  title: "עיצוב ונראות", 
                  desc: "דגש על פרזול נקי וסמוי מהעין שמשתלב בצורה טבעית בעיצוב ובתוצאה הסופית." 
                }
              ].map((value, i) => (
                <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-3">{value.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Partners Section */}
        {aboutContent.sub_logos && aboutContent.sub_logos.length > 0 && (
          <div className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
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