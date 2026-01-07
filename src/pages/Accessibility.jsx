import React, { useEffect } from 'react';

export default function Accessibility() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-8 text-slate-900">הצהרת נגישות</h1>
          
          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <p>
                "יעקב פרזול חכם" רואה חשיבות רבה במתן שירות שוויוני לכלל הלקוחות והגולשים ובשיפור הנגישות באתר האינטרנט לטובת אנשים עם מוגבלויות.
                אנו משקיעים משאבים רבים בהנגשת האתר על מנת לאפשר חווית גלישה נוחה וזמינה לכלל האוכלוסייה.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-slate-800">רמת הנגישות באתר</h2>
              <p>
                אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג 2013.
                ההתאמות בוצעו עפ"י המלצות התקן הישראלי (ת"י 5568) לנגישות תכנים באינטרנט ברמת AA ומסמך WCAG2.0 הבינלאומי.
              </p>
              <p className="mt-2">
                בין היתר, בוצעו ההתאמות הבאות:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>האתר מותאם לצפייה ונתמך על ידי הדפדפנים הנפוצים.</li>
                  <li>תכני האתר כתובים בשפה ברורה וקריאה.</li>
                  <li>מבנה האתר מושתת על ניווט נוח וברור ותפריטים הבנויים באמצעות רשימות המאפשרים התמצאות קלה.</li>
                  <li>האתר מותאם לגלישה בסביבת עבודה ברזולוציות שונות (רספונסיבי).</li>
                  <li>לרכיבים גרפיים יש חלופת טקסט (alt).</li>
                  <li>האתר מאפשר שינוי גודל הגופן על ידי שימוש במקש Ctrl וגלגלת העכבר.</li>
                  <li>קיים תפריט נגישות ייעודי המאפשר שליטה בניגודיות, גודל טקסט ועוד.</li>
                </ul>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-slate-800">סייגים לנגישות</h2>
              <p>
                למרות מאמצנו להנגיש את כלל דפי האתר, ייתכן ויתגלו חלקים באתר שטרם הונגשו.
                אנו ממשיכים במאמצים לשפר את נגישות האתר כחלק ממחויבותנו לאפשר שימוש בו עבור כלל האוכלוסייה, כולל אנשים עם מוגבלויות.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-slate-800">דרכי פניה בנושא נגישות</h2>
              <p>
                אם נתקלתם בבעיה או שיש לכם הערה או שאלה בנושא נגישות האתר, נשמח אם תפנו אלינו ואנו נדאג לטפל בפנייה בהקדם האפשרי.
              </p>
              <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p><strong>פרטי רכז הנגישות בחברה:</strong></p>
                <p>שם: שירות לקוחות</p>
                <p>טלפון: 054-7391001</p>
                <p>אימייל: office@k-jacob.co.il</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}