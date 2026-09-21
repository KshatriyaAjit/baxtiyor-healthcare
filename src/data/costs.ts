import { TreatmentCostItem } from '@/types';

export const TREATMENT_COSTS: TreatmentCostItem[] = [
  {
    treatmentSlug: 'heart-surgery-india',
    procedureName: {
      en: 'Heart Bypass Surgery (CABG / Beating Heart)',
      ar: 'جراحة القلب المفتوح ومجازة الشريان التاجي',
    },
    indicativeRangeUSD: '$4,500 - $7,500 USD',
    hospitalVariationNote: {
      en: 'Pricing varies by surgical method (conventional vs off-pump beating heart), room type, and requirement for single vs multiple valve repairs.',
      ar: 'تختلف التكلفة حسب تقنية الجراحة (على القلب النابض أم ماكينة صناعية)، وفئة الغرفة، وما إذا كانت تشمل استبدال أو إصلاح صمامات متعددة.',
    },
    inclusions: {
      en: ['Surgical fees & cardiac anesthesia', '2-3 days Cardiac ICU', '4-5 days room stay', 'Routine medications & post-op echo'],
      ar: ['أتعاب الجراح والتخدير', '2-3 أيام بالعناية المركزة للقلب', '4-5 أيام بالغرفة الخاصة', 'الأدوية وفحوصات الإيكو أثناء التنويم'],
    },
    exclusions: {
      en: ['Specialized percutaneous valve implants (TAVI)', 'Treatment of unrelated comorbidities'],
      ar: ['صمامات TAVI الخاصة بالقسطرة', 'علاج الحالات المرضية الأخرى غير المرتبطة بالقلب'],
    },
    hospitalStayDays: '6 - 8 Days',
    recoveryDays: '14 - 21 Days',
    lastReviewedDate: '2026-09-21',
    disclaimer: {
      en: 'Indicative range only. Formal hospital estimate provided after cardiologist review of coronary angiogram.',
      ar: 'سعر استرشادي فقط. يُقدم عرض السعر الرسمي بعد مراجعة استشاري القلب لقرص القسطرة التاجية.',
    },
  },
  {
    treatmentSlug: 'kidney-transplant-india',
    procedureName: {
      en: 'Living Donor Kidney Transplant Package',
      ar: 'باقة زراعة الكلى من متبرع حي',
    },
    indicativeRangeUSD: '$12,000 - $16,000 USD',
    hospitalVariationNote: {
      en: 'Covers both recipient and living family donor. Variation depends on blood group compatibility and required induction immunosuppression.',
      ar: 'تشمل المريض والمتبرع الحي من الأقارب. تختلف التكلفة حسب تطابق فصائل الدم والأدوية البيولوجية المطلوبة لتثبيط المناعة.',
    },
    inclusions: {
      en: ['Dual operating theater costs (Recipient & Donor)', 'Donor laparoscopic surgery & stay', 'Recipient ICU & ward stay', 'In-hospital immunosuppressants'],
      ar: ['رسوم غرفتي العمليات (المريض والمتبرع)', 'جراحة المتبرع بالمنظار وإقامته', 'إقامة المريض بالعناية والغرفة', 'أدوية تثبيط المناعة الأساسية أثناء التنويم'],
    },
    exclusions: {
      en: ['Plasmapheresis (for ABO-incompatible transplants)', 'Post-discharge medications and extended guest housing'],
      ar: ['جلسات فصل البلازما (لحالات اختلاف الفصائل)', 'أدوية ما بعد الخروج والسكن الخارجي'],
    },
    hospitalStayDays: '10 - 14 Days (Recipient)',
    recoveryDays: '21 - 30 Days Outpatient',
    lastReviewedDate: '2026-09-21',
    disclaimer: {
      en: 'Organ transplantation requires statutory Authorization Committee legal approval. Commercial organ transactions are strictly prohibited under Indian law.',
      ar: 'تتطلب زراعة الأعضاء موافقة رسمية من لجنة التبرع بالأعضاء المستقلة. يمنع القانون الهندي تجارة الأعضاء منعاً باتاً.',
    },
  },
  {
    treatmentSlug: 'liver-transplant-india',
    procedureName: {
      en: 'Living Donor Liver Transplant Package',
      ar: 'باقة زراعة الكبد من متبرع حي',
    },
    indicativeRangeUSD: '$25,000 - $32,000 USD',
    hospitalVariationNote: {
      en: 'Comprehensive package for recipient and donor. Cost depends on recipient MELD severity score and duration of specialized liver intensive care.',
      ar: 'باقة شاملة للمريض والمتبرع الحي. تعتمد التكلفة على مقياس MELD للمريض ومدة الإقامة في عناية الكبد المركزة.',
    },
    inclusions: {
      en: ['Dual surgical team fees', 'Donor hepatectomy & ICU stay', 'Recipient transplant surgery & 7-10 days Liver ICU', 'Essential intraoperative blood products'],
      ar: ['أتعاب الفريقين الجراحيين المتزامنين', 'استئصال كبد المتبرع وإقامته بالعناية', 'جراحة الزراعة و7-10 أيام بعناية الكبد المركزة', 'مشتقات الدم الأساسية للجراحة'],
    },
    exclusions: {
      en: ['Pre-operative MARS liver dialysis or prolonged pre-existing sepsis management', 'Extended outpatient hotel stay'],
      ar: ['جلسات دعم الكبد (غسيل الكبد) قبل الجراحة أو علاج التسمم الحاد', 'الإقامة الفندقية الخارجية'],
    },
    hospitalStayDays: '18 - 22 Days',
    recoveryDays: '6 - 8 Weeks Total Stay',
    lastReviewedDate: '2026-09-21',
    disclaimer: {
      en: 'Estimate based on standard living related donor pathway under Indian THOTA regulations.',
      ar: 'التقدير مبني على المسار النظامي للتبرع من قريب حي وفق قانون زراعة الأعضاء الهندي.',
    },
  },
  {
    treatmentSlug: 'hip-replacement-india',
    procedureName: {
      en: 'Total Hip Replacement (Single Hip)',
      ar: 'استبدال مفصل الورك الكامل (جانب واحد)',
    },
    indicativeRangeUSD: '$4,800 - $7,200 USD',
    hospitalVariationNote: {
      en: 'Includes internationally certified ceramic/titanium implant. Variation depends on implant brand, surgical approach, and robotic navigation.',
      ar: 'تشمل مفصل سيراميك/تيتانيوم معتمد دولياً. تختلف التكلفة حسب ماركة المفصل والمدخل الجراحي واستخدام الروبوت.',
    },
    inclusions: {
      en: ['Certified US-FDA approved hip implant', 'Orthopedic surgeon & OT charges', '4-5 days room stay', 'In-hospital daily physical therapy'],
      ar: ['مفصل صناعي معتمد من هيئة الغذاء والدواء الأمريكية', 'أتعاب جراح العظام ورسوم العمليات', 'إقامة 4-5 أيام بالمستشفى', 'علاج طبيعي يومي داخل المستشفى'],
    },
    exclusions: {
      en: ['Bilateral simultaneous surgery (available on bundled quote)', 'Extended outpatient physical therapy sessions'],
      ar: ['استبدال كلا الوركين معاً (يتوفر بعرض سعر مجمع)', 'جلسات العلاج الطبيعي الخارجية بعد الخروج'],
    },
    hospitalStayDays: '4 - 5 Days',
    recoveryDays: '14 - 18 Days',
    lastReviewedDate: '2026-09-21',
    disclaimer: {
      en: 'Implant selection is finalized after orthopedic surgeon reviews standing pelvis radiographs.',
      ar: 'يتم تحديد المفصل الأنسب بعد فحص جراح العظام لصور الأشعة السينية في وضعية الوقوف.',
    },
  },
  {
    treatmentSlug: 'knee-replacement-india',
    procedureName: {
      en: 'Robotic Total Knee Replacement (Single Knee)',
      ar: 'استبدال مفصل الركبة بالروبوت (ركبة واحدة)',
    },
    indicativeRangeUSD: '$4,200 - $6,500 USD',
    hospitalVariationNote: {
      en: 'Includes robotic console navigation. Bilateral knee replacement (both knees) is available at bundled rates of approximately $7,500 - $10,500 USD.',
      ar: 'تشمل برمجة واستخدام الروبوت الجراحي. يتوفر استبدال كلا الركبتين معاً بباقة مخفضة بحوالي 7,500 إلى 10,500 دولار.',
    },
    inclusions: {
      en: ['High-flexion certified knee implant', 'Robotic planning & surgery fees', '4-5 days hospital stay', 'Targeted regional nerve block for pain control'],
      ar: ['مفصل ركبة عالي الانثناء معتمد', 'رسوم التخطيط والجراحة بالروبوت', 'إقامة 4-5 أيام بالمستشفى', 'إحصار عصبي موضعي لمنع الألم وتسريع الحركة'],
    },
    exclusions: {
      en: ['Specialized hinged revision prosthesis in severe ligament laxity cases', 'Outpatient rehabilitation beyond discharge'],
      ar: ['المفاصل المفصلية المعقدة الخاصة بتراخي الأربطة الشديد', 'العلاج الطبيعي بالفندق بعد الخروج'],
    },
    hospitalStayDays: '4 - 5 Days',
    recoveryDays: '14 - 18 Days',
    lastReviewedDate: '2026-09-21',
    disclaimer: {
      en: 'Package suitability for simultaneous bilateral replacement requires pre-anesthetic cardiovascular clearance.',
      ar: 'تحديد ملاءمة إجراء كلا الركبتين معاً يخضع لتقييم استشاري القلب والتخدير.',
    },
  },
];

