import React, { useEffect } from 'react';
import { Accessibility as AccessibilityIcon, Phone, Mail } from 'lucide-react';

export default function Accessibility() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8 border-b pb-4">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <AccessibilityIcon className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">הצהרת נגישות</h1>
          </div>
          
          <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
            <section>
              <p className="text-lg">
                אנו ב"ג'ייקוב פרזול חכם" רואים חשיבות רבה במתן שירות שוויוני לכלל הלקוחות והגולשים ובשיפור הנגישות באתר האינטרנט לטובת אנשים עם מוגבלויות.
                אנו משקיעים משאבים ומאמצים בהנגשת האתר על מנת לאפשר חווית גלישה נוחה, זמינה ומכבדת לכלל האוכלוסייה, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-slate-900">רמת הנגישות באתר</h2>
              <p>
                אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג 2013.
                ההתאמות בוצעו עפ"י המלצות התקן הישראלי (ת"י 5568) לנגישות תכנים באינטרנט ברמת AA ומסמך WCAG2.0 הבינלאומי.
              </p>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 mt-4">
                <h3 className="font-bold text-lg mb-2">בין התאמות הנגישות שבוצעו באתר:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>האתר מותאם לצפייה ונתמך על ידי הדפדפנים הנפוצים (Chrome, Firefox, Safari, Edge).</li>
                  <li>תכני האתר כתובים בשפה ברורה, פשוטה וקריאה.</li>
                  <li>מבנה האתר מושתת על ניווט נוח וברור, ותפריטים המאפשרים התמצאות קלה.</li>
                  <li>האתר מותאם לגלישה בסביבת עבודה ברזולוציות שונות (עיצוב רספונסיבי למחשב, טאבלט ונייד).</li>
                  <li>לרכיבים גרפיים יש חלופת טקסט (Alt Text) לשם זיהוי ע"י קוראי מסך.</li>
                  <li>האתר מאפשר שינוי גודל הגופן באמצעות המקלדת (Ctrl + / -) או תפריט הנגישות.</li>
                  <li>קיים רכיב נגישות ייעודי המאפשר שליטה בניגודיות צבעים, הדגשת קישורים ושינוי גודל טקסט.</li>
                  <li>אין באתר שימוש במרכיבים מהבהבים או כאלה העלולים לגרום להתקפים אפילפטיים.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-slate-900">הפעלת תפריט הנגישות</h2>
              <p>
                באתר מוטמע תפריט נגישות. לחיצה על כפתור הנגישות (אייקון של איש בכיסא גלגלים/עומד) פותחת תפריט המאפשר לשנות את גודל הטקסט, לשנות את ניגודיות הצבעים ואיפוס ההגדרות.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-slate-900">סייגים לנגישות</h2>
              <p>
                למרות מאמצנו להנגיש את כלל דפי האתר, ייתכן ויתגלו חלקים באתר שטרם הונגשו או שהטכנולוגיה להנגשתם טרם נמצאה.
                אנו ממשיכים במאמצים לשפר את נגישות האתר כחלק ממחויבותנו לאפשר שימוש בו עבור כלל האוכלוסייה, כולל אנשים עם מוגבלויות.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-slate-900">דרכי פניה בנושא נגישות</h2>
              <p>
                אם נתקלתם בבעיה, בקושי בגלישה או שיש לכם הערה או שאלה בנושא נגישות האתר, נשמח אם תפנו אלינו ואנו נדאג לטפל בפנייה בהקדם האפשרי.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 mt-6">
                <div className="flex items-center gap-3 p-4 bg-white border rounded-lg shadow-sm flex-1">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">טלפון</div>
                    <div className="font-semibold dir-ltr text-right">054-7391001</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-white border rounded-lg shadow-sm flex-1">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">אימייל</div>
                    <div className="font-semibold">office@k-jacob.co.il</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}