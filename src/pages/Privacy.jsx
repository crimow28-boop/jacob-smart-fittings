import React, { useEffect } from 'react';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-8 text-slate-900">מדיניות פרטיות</h1>
          
          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <p>
                "יעקב פרזול חכם" (להלן: "החברה") מכבדת את פרטיות המשתמשים באתר האינטרנט שהיא מנהלת ומפעילה.
                מדיניות זו מפרטת את האופן שבו החברה אוספת ומשתמשת במידע שנמסר לה על ידי המשתמשים באתר או שנאסף על ידה בעת השימוש באתר.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-slate-800">1. איסוף מידע</h2>
              <p>
                בעת השימוש באתר נאסף מידע טכני באופן אוטומטי (כגון כתובת IP, סוג דפדפן, וכדומה) וכן מידע אישי שנמסר על ידך באופן יזום בעת ביצוע הזמנה, הרשמה לניוזלטר או יצירת קשר (שם, כתובת, טלפון, אימייל).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-slate-800">2. שימוש במידע</h2>
              <p>
                המידע שנאסף ישמש את החברה לצורך:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>תפעול האתר ומתן השירותים.</li>
                  <li>ביצוע משלוחים ויצירת קשר עם הלקוח.</li>
                  <li>שיפור השירות וחווית המשתמש.</li>
                  <li>שליחת עדכונים שיווקיים (במידה והלקוח אישר זאת).</li>
                </ul>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-slate-800">3. אבטחת מידע</h2>
              <p>
                האתר מאובטח באמצעות פרוטוקול SSL, המצפין את המידע העובר בין הדפדפן שלך לשרתי האתר.
                החברה נוקטת באמצעי זהירות מקובלים על מנת לשמור, ככל האפשר, על סודיות המידע. במקרים שאינם בשליטתה ו/או הנובעים מכוח עליון, לא תהא החברה אחראית לכל נזק מכל סוג שהוא, ישר או עקיף, שייגרם ללקוח, אם מידע זה יאבד או יגיע לגורם עוין ו/או יעשה בו שימוש שלא בהרשאה.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-slate-800">4. מסירת מידע לצד שלישי</h2>
              <p>
                החברה מתחייבת שלא להעביר את פרטי הלקוח לצד ג', אלא במקרים הנדרשים לצורך השלמת ההזמנה (למשל, חברת השליחויות או חברת האשראי) או אם נדרשה לכך על פי חוק.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-slate-800">5. Cookies (עוגיות)</h2>
              <p>
                האתר משתמש ב"עוגיות" (Cookies) לצורך תפעולו השוטף והתקין, ובכלל זה כדי לאסוף נתונים סטטיסטיים אודות השימוש באתר, לאימות פרטים, כדי להתאים את האתר להעדפותיך האישיות ולצורכי אבטחת מידע.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}