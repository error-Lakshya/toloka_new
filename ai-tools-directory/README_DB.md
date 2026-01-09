# قاعدة البيانات وPrisma (MVP)

## الإعداد
1) جهّز Postgres محليًا وأنشئ قاعدة: `ai_tools`
2) حدّث `DATABASE_URL` في `.env`.
3) ثبّت الحزم: `npm install`
4) أنشئ الجداول: `npm run migrate` (سيطبّق ملف الهجرة الأول)
5) اختياري: زرع بيانات أولية: `npm run seed`

## البحث
- يوجد جدول `tool_search` وتابع/مشغّل لتوليد `tsvector` من الاسم والوصف.
- الواجهة تستخدم Prisma لاستعلامات أساسية؛ يمكن ترقية البحث لاستخدام `to_tsquery` باستعلامات SQL خام لاحقًا.

## الواجهات البرمجية
- GET `/api/tools` مع بارامترات: `q, category, pricing, has_api, language`
- POST `/api/submissions` لإرسال أداة جديدة (status = pending)
