# استيراد بيانات الأدوات (دفعات)

- ملف دفعة JSON مثال: `/mnt/data/tools_batch1.json` (يحتوي على مصفوفة من الأدوات)
- أمر الاستيراد بعد ضبط قاعدة البيانات وPrisma:

```bash
node scripts/import_tools.js /mnt/data/tools_batch1.json
```

- يعتمد الربط بالفئات على قائمة `categories` داخل كل عنصر (slugs مثل: text-writing, image-design ...).
