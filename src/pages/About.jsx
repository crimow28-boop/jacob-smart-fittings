import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Package, Truck, Wrench, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import EditableAbout from '../components/about/EditableAbout';
import SEO from '../components/SEO';

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
      <SEO 
        title="אודות" 
        description="אודות יעקב פרזול חכם (Jacob Smart Fittings) - מובילים בחדשנות בעולם הפרזול. אנו מספקים פתרונות פרזול איכותיים לנגרים ולקוחות פרטיים עם שירות ללא פשרות."
        keywords="אודות יעקב פרזול, מי אנחנו פרזול, גייקוב פרזול חכם אודות"
      />
      <EditableAbout content={aboutContent}>
        {/* 1. Hero / Large Logo Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pb-12 pt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 md:px-6 text-center"
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6940808a9015b91c711aa067/1ef00d47c_Screenshot2026-01-07112548.png" 
              alt="Jacob Smart Fittings" 
              className="h-32 md:h-40 mx-auto object-contain mb-8 drop-shadow-sm"
            />
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              {aboutContent.main_title || "חדשנות בתחום הנגרות בארץ ובעולם"}
            </h1>
            
            <div className="prose prose-lg mx-auto text-slate-600 leading-relaxed whitespace-pre-wrap max-w-3xl">
              {aboutContent.main_text || `אנו מתמחים בייצור, יבוא ושיווק של פתרונות פרזול חכמים ואיכותיים המשלבים נוחות ופרקטיקה לעבודה.
המוצרים שלנו מיועדים לשימוש מגוון רחב של בעלי מקצוע בכל רחבי הארץ, תמיכה וייעוץ עוד מהשלב הראשון תוך מתן שירות ותשומת לב לפרטים הקטנים.

כל מוצר שלנו נבחר בקפידה ומתוכנן בדגש על חוויית עבודה קלה ויעילה אשר באה לידי ביטוי עוד בשלב הייצור ועד לשלב ההתקנה.`}
            </div>
          </motion.div>
        </div>

        {/* 3. Icons Section */}
        <div className="bg-white border-y border-slate-100 py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-10"
            >
              {[
                { icon: Package, label: "מלאי זמין" },
                { icon: Truck, label: "פריסה ארצית" },
                { icon: Wrench, label: "מותאם לבעלי מקצוע" },
                { icon: Settings, label: "נוחות שימוש" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center gap-4 group cursor-default">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-lg text-slate-800">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 4. Values Section */}
        <div className="bg-slate-50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900"
            >
              הערכים שלנו
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="h-full"
                >
                  <Card className="border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full bg-white group">
                    <CardContent className="p-8 text-center h-full flex flex-col items-center">
                      <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h3 className="font-bold text-xl mb-4 text-slate-900">{value.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{value.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
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