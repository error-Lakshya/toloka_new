# الإدارة والمراجعة (MVP)

- صفحة الإدارة: `/admin/submissions` لعرض الطلبات (pending/approved/rejected).
- واجهة API:
  - GET `/api/submissions` لعرض جميع الطلبات.
  - PATCH `/api/submissions/{id}?action=approve|reject` للموافقة/الرفض.
- الموافقة تقوم بإنشاء سجل في جدول `Tool` وربطه بالفئات حسب الـslug، ثم تغيّر حالة الطلب إلى `approved`.
- الرفض يغيّر الحالة إلى `rejected`.
- التحقق من صحة الإدخالات يتم على الخادم باستخدام JSON Schema عبر مكتبة `ajv`.
