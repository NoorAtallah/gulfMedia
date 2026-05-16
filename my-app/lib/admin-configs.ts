import type { FieldConfig } from "@/app/admin/component/AdminForm";
import { Buckets } from "@/lib/storage";

export const ARTICLE_FIELDS: FieldConfig[] = [
  { key: "title_ar", label: "عنوان المقال", type: "text", required: true, span: "full" },
  { key: "excerpt_ar", label: "المقتطف", type: "textarea", span: "full" },
  { key: "content_ar", label: "محتوى المقال (HTML)", type: "richtext", span: "full" },
  { key: "cover_url", label: "صورة الغلاف", type: "image", bucket: Buckets.articleCovers },
  {
    key: "journalist_id",
    label: "الإعلامي الكاتب",
    type: "async-select",
    asyncConfig: { table: "journalists", labelColumn: "full_name_ar" },
  },
  {
    key: "category_id",
    label: "التصنيف",
    type: "async-select",
    asyncConfig: { table: "categories", labelColumn: "name_ar" },
  },
  { key: "read_time_minutes", label: "وقت القراءة (دقائق)", type: "number" },
  {
    key: "status",
    label: "الحالة",
    type: "select",
    options: [
      { value: "draft", label: "مسودة" },
      { value: "published", label: "منشور" },
    ],
  },
  { key: "is_featured", label: "مقال مميز؟", type: "boolean" },
  { key: "published_at", label: "تاريخ النشر", type: "text", placeholder: "2025-06-01T00:00:00+03:00" },
];

export const PODCAST_FIELDS: FieldConfig[] = [
  { key: "title_ar", label: "عنوان الحلقة", type: "text", required: true, span: "full" },
  { key: "description_ar", label: "وصف الحلقة", type: "textarea", span: "full" },
  { key: "cover_url", label: "صورة الغلاف", type: "image", bucket: Buckets.podcastCovers },
  { key: "audio_url", label: "رابط الصوت", type: "url" },
  { key: "video_url", label: "رابط الفيديو", type: "url" },
  {
    key: "host_id",
    label: "المضيف",
    type: "async-select",
    asyncConfig: { table: "journalists", labelColumn: "full_name_ar" },
  },
  { key: "duration_seconds", label: "المدة (ثانية)", type: "number" },
  { key: "episode_number", label: "رقم الحلقة", type: "number" },
  { key: "season_number", label: "رقم الموسم", type: "number" },
  { key: "is_featured", label: "حلقة مميزة؟", type: "boolean" },
  {
    key: "status",
    label: "الحالة",
    type: "select",
    options: [
      { value: "draft", label: "مسودة" },
      { value: "published", label: "منشور" },
    ],
  },
  { key: "published_at", label: "تاريخ النشر", type: "text", placeholder: "2025-06-01T00:00:00+03:00" },
];

export const COURSE_FIELDS: FieldConfig[] = [
  { key: "title_ar", label: "عنوان الدورة", type: "text", required: true, span: "full" },
  { key: "description_ar", label: "وصف الدورة", type: "textarea", span: "full" },
  { key: "cover_url", label: "صورة الغلاف", type: "image", bucket: Buckets.courseCovers },
  {
    key: "instructor_id",
    label: "المدرب",
    type: "async-select",
    asyncConfig: { table: "journalists", labelColumn: "full_name_ar" },
  },
  { key: "price", label: "السعر (0 = مجاني)", type: "number" },
  { key: "duration_hours", label: "المدة (ساعات)", type: "number" },
  {
    key: "level",
    label: "المستوى",
    type: "select",
    options: [
      { value: "مبتدئ", label: "مبتدئ" },
      { value: "متوسط", label: "متوسط" },
      { value: "متقدم", label: "متقدم" },
    ],
  },
  {
    key: "status",
    label: "الحالة",
    type: "select",
    options: [
      { value: "draft", label: "مسودة" },
      { value: "published", label: "منشور" },
    ],
  },
];

export const LIBRARY_FIELDS: FieldConfig[] = [
  { key: "title_ar", label: "عنوان المرجع", type: "text", required: true, span: "full" },
  { key: "description_ar", label: "وصف المرجع", type: "textarea", span: "full" },
  { key: "author_name_ar", label: "اسم المؤلف", type: "text" },
  { key: "cover_url", label: "صورة الغلاف", type: "image", bucket: Buckets.libraryCovers },
  { key: "file_url", label: "رابط الملف", type: "file", bucket: Buckets.libraryFiles },
  {
    key: "category_id",
    label: "التصنيف",
    type: "async-select",
    asyncConfig: { table: "categories", labelColumn: "name_ar" },
  },
  {
    key: "type",
    label: "النوع",
    type: "select",
    options: [
      { value: "كتاب", label: "كتاب" },
      { value: "تقرير", label: "تقرير" },
      { value: "دليل", label: "دليل" },
    ],
  },
  { key: "pages", label: "عدد الصفحات", type: "number" },
  { key: "year", label: "سنة الإصدار", type: "text" },
  { key: "tag", label: "تاغ مميز", type: "text", placeholder: "جديد / حصري / الأكثر تحميلاً" },
];

export const EVENT_FIELDS: FieldConfig[] = [
  { key: "title_ar", label: "عنوان الفعالية", type: "text", required: true, span: "full" },
  { key: "description_ar", label: "وصف الفعالية", type: "textarea", span: "full" },
  { key: "cover_url", label: "صورة الغلاف", type: "image", bucket: Buckets.eventCovers },
  { key: "location_ar", label: "المكان", type: "text" },
  {
    key: "location_type",
    label: "نوع الفعالية",
    type: "select",
    options: [
      { value: "in-person", label: "حضوري" },
      { value: "online", label: "أونلاين" },
      { value: "hybrid", label: "هجين" },
    ],
  },
  { key: "starts_at", label: "تاريخ البداية", type: "text", placeholder: "2025-06-15T09:00:00+03:00" },
  { key: "ends_at", label: "تاريخ النهاية", type: "text", placeholder: "2025-06-15T18:00:00+03:00" },
  { key: "capacity", label: "عدد المقاعد", type: "number" },
  {
    key: "status",
    label: "الحالة",
    type: "select",
    options: [
      { value: "draft", label: "مسودة" },
      { value: "published", label: "منشور" },
    ],
  },
];

export const MEDIA_CENTER_FIELDS: FieldConfig[] = [
  { key: "name_ar", label: "اسم المركز", type: "text", required: true },
  {
    key: "country",
    label: "الدولة",
    type: "select",
    options: [
      { value: "السعودية", label: "السعودية" },
      { value: "الإمارات", label: "الإمارات" },
      { value: "الكويت", label: "الكويت" },
      { value: "قطر", label: "قطر" },
      { value: "عُمان", label: "عُمان" },
      { value: "البحرين", label: "البحرين" },
    ],
  },
  { key: "website_url", label: "الموقع الإلكتروني", type: "url" },
  { key: "logo_url", label: "شعار المركز", type: "image", bucket: Buckets.mediaLogos },
  { key: "description_ar", label: "وصف المركز", type: "textarea", span: "full" },
  { key: "display_order", label: "ترتيب العرض", type: "number" },
];

export const PARTNER_FIELDS: FieldConfig[] = [
  { key: "name_ar", label: "اسم الجهة", type: "text", required: true },
  {
    key: "type",
    label: "النوع",
    type: "select",
    options: [
      { value: "partner", label: "شريك" },
      { value: "supporter", label: "داعم" },
    ],
  },
  { key: "website_url", label: "الموقع الإلكتروني", type: "url" },
  { key: "logo_url", label: "الشعار", type: "image", bucket: Buckets.partnerLogos },
  { key: "display_order", label: "ترتيب العرض", type: "number" },
];

export const MEMBERSHIP_FIELDS: FieldConfig[] = [
  { key: "name_ar", label: "اسم الخطة", type: "text", required: true },
  { key: "description_ar", label: "وصف الخطة", type: "textarea", span: "full" },
  { key: "price", label: "السعر (0 = مجاني)", type: "number" },
  { key: "display_order", label: "ترتيب العرض", type: "number" },
];

export const JOURNALIST_FIELDS: FieldConfig[] = [
  { key: "full_name_ar", label: "الاسم الكامل", type: "text", required: true },
 {
  key: "specialty",
  label: "التخصص",
  type: "async-select",
  asyncConfig: { table: "journalist_specialties", labelColumn: "name", valueColumn: "name" },
  },
  {
    key: "country",
    label: "الدولة",
    type: "select",
    options: [
      { value: "السعودية", label: "السعودية" },
      { value: "الإمارات", label: "الإمارات" },
      { value: "الكويت", label: "الكويت" },
      { value: "قطر", label: "قطر" },
      { value: "عُمان", label: "عُمان" },
      { value: "البحرين", label: "البحرين" },
    ],
  },
  { key: "experience_years", label: "سنوات الخبرة", type: "number" },
  { key: "avatar_url", label: "صورة الإعلامي", type: "image", bucket: Buckets.avatars },
  { key: "bio_ar", label: "النبذة التعريفية", type: "textarea", span: "full" },
  { key: "is_featured", label: "إعلامي مميز؟", type: "boolean" },
  { key: "display_order", label: "ترتيب العرض", type: "number" },
];