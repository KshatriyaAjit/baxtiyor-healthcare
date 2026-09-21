import { PatientStory } from '@/types';

export const PATIENT_STORIES: PatientStory[] = [
  {
    id: 'story-kidney-uzbekistan',
    slug: 'kidney-transplant-uzbekistan-india',
    patientName: 'Patient Shokhrukh & Brother (Donor)',
    patientCountry: {
      en: 'Uzbekistan (Tashkent)',
      ar: 'أوزبكستان (طشقند)',
    },
    countryCode: 'UZ',
    condition: {
      en: 'End-Stage Renal Disease (ESRD) secondary to chronic glomerulonephritis, undergoing hemodialysis 3 times weekly',
      ar: 'فشل كلوي في مراحله النهائية ناتج عن التهاب الكبيبات المزمن، مع خضوع لغسيل كلوي 3 مرات أسبوعياً',
    },
    treatmentSlug: 'kidney-transplant-india',
    hospitalId: 'shalby-sanar',
    doctorId: 'dr-sanar-kidney-1',
    journeyTimeline: [
      {
        stage: { en: 'Inquiry & Clinical Review', ar: 'الاستفسار والتقييم الأولي' },
        duration: { en: 'Day 1 - 3', ar: 'الأيام 1 - 3' },
      },
      {
        stage: { en: 'Visa & Documentation Attestation', ar: 'التأشيرة وتصديق ملف القرابة' },
        duration: { en: 'Day 4 - 10', ar: 'الأيام 4 - 10' },
      },
      {
        stage: { en: 'Arrival, Cross-Match & Legal Board', ar: 'الوصول والتطابق والموافقة القانونية' },
        duration: { en: 'Day 11 - 18', ar: 'الأيام 11 - 18' },
      },
      {
        stage: { en: 'Successful Transplant Surgery', ar: 'إجراء الجراحة بنجاح' },
        duration: { en: 'Day 19', ar: 'اليوم 19' },
      },
      {
        stage: { en: 'Recovery & Safe Flight Home', ar: 'النقاهة والعودة للوطن' },
        duration: { en: 'Day 20 - 45', ar: 'الأيام 20 - 45' },
      },
    ],
    storySummary: {
      en: 'After 18 months of exhausting dialysis in Tashkent, 34-year-old Shokhrukh traveled to Gurgaon accompanied by his younger brother as his living donor. Baxtiyor Healthcare guided the family through medical visa paperwork, verified family legal attestations, and coordinated the admission at Shalby Sanar International. The laparoscopic donor surgery allowed his brother to walk comfortably by Day 2, and Shokhrukh achieved normal serum creatinine levels within one week.',
      ar: 'بعد 18 شهراً من المعاناة مع الغسيل الكلوي المرهق في طشقند، سافر شخروخ (34 عاماً) إلى جورجاون بصحبة شقيقه الأصغر كمتبرع حي. تولى فريق بختيار للرعاية الصحية تنسيق ملف التأشيرات الطبية وتوثيق أوراق إثبات القرابة وترتيب التنويم بمستشفيات شالبي سانار. أتاح استئصال كلية المتبرع بالمنظار لشقيقه المشي بسلاسة في اليوم الثاني، واستعاد شخروخ وظائف الكلى الطبيعية خلال أسبوع.',
    },
    quote: {
      en: '"From the airport in Delhi to the legal committee and the hospital room, we had an Uzbek-speaking coordinator with us every single day. We never felt like strangers in India."',
      ar: '"منذ لحظة وصولنا لمطار دلهي وطوال جلسات اللجنة القانونية والتنويم، كان معنا منسق يتحدث الأوزبكية يومياً. لم نشعر أبداً بالغربة في الهند."',
    },
    outcomeNote: {
      en: 'Recipient serum creatinine stabilized at 1.1 mg/dL at 6-month follow-up; donor has completely normal renal function.',
      ar: 'استقر مستوى الكرياتينين لدى المريض عند 1.1 ملغ/ديسيلتر في فحص المتابعة بعد 6 أشهر؛ ويتمتع المتبرع بكفاءة كلوية طبيعية تامة.',
    },
    hasConsent: true,
    mediaType: 'video',
    mediaUrl: '/videos/uzbekistan-kidney-case.mp4',
    videoThumbnailUrl: '/images/patient-stories/uzbekistan-kidney-patient.jpg',
    videoDuration: 'PT3M15S',
    uploadDate: '2024-02-10',
  },
  {
    id: 'story-heart-oman',
    slug: 'heart-bypass-surgery-oman-india',
    patientName: 'Patient Salim & Family',
    patientCountry: {
      en: 'Oman (Muscat)',
      ar: 'سلطنة عُمان (مسقط)',
    },
    countryCode: 'OM',
    condition: {
      en: 'Triple-vessel coronary artery disease with critical 90% stenosis in Left Anterior Descending (LAD) artery',
      ar: 'انسداد متقدم في ثلاثة شرايين تاجية مع تضيق حرج بنسبة 90% في الشريان التاجي الأيسر النازل (LAD)',
    },
    treatmentSlug: 'heart-surgery-india',
    hospitalId: 'fortis-fmri',
    doctorId: 'dr-fortis-cardiac-1',
    journeyTimeline: [
      {
        stage: { en: 'Angiogram Review via WhatsApp', ar: 'تقييم القسطرة عبر الواتساب' },
        duration: { en: '24 Hours', ar: '24 ساعة' },
      },
      {
        stage: { en: 'e-Medical Visa Approval', ar: 'صدور التأشيرة الطبية الإلكترونية' },
        duration: { en: '48 Hours', ar: '48 ساعة' },
      },
      {
        stage: { en: 'Direct Flight Muscat - Delhi & Admission', ar: 'طيران مباشر ودخول المستشفى' },
        duration: { en: 'Day 1', ar: 'اليوم 1' },
      },
      {
        stage: { en: 'Off-Pump Beating Heart Bypass (CABG)', ar: 'جراحة القلب النابض' },
        duration: { en: 'Day 3', ar: 'اليوم 3' },
      },
      {
        stage: { en: 'Discharge to Serviced Hotel Apartment', ar: 'الخروج للشقة الفندقية' },
        duration: { en: 'Day 9', ar: 'اليوم 9' },
      },
      {
        stage: { en: 'Fit-to-Fly Clearance & Return to Muscat', ar: 'تصريح الطيران والعودة لمسقط' },
        duration: { en: 'Day 18', ar: 'اليوم 18' },
      },
    ],
    storySummary: {
      en: 'Salim, a 58-year-old retired civil servant from Muscat, was advised urgent open-heart bypass surgery for severe triple-vessel blockages. His family connected with Baxtiyor Healthcare via WhatsApp, who arranged a prioritized evaluation with the Principal Cardiac Surgeon at Fortis FMRI. Salim underwent off-pump beating-heart surgery using arterial grafts, discharged on Day 6 to a vetted nearby apartment with an Arabic kitchen, and returned safely to Oman with full cardiac rehabilitation guidance.',
      ar: 'سالم، موظف متقاعد (58 عاماً) من مسقط، نُصح بإجراء جراحة قلب مفتوح عاجلة إثر انسدادات حرجة في ثلاثة شرايين. تواصلت عائلته مع بختيار للرعاية الصحية عبر الواتساب، ورتب الفريق تقييماً فورياً مع كبير جراحي القلب بمعهد فورتيس التذكاري (FMRI). خضع سالم لجراحة القلب النابض بدون توقيف القلب، وخرج في اليوم السادس إلى شقة فندقية قريبة مهيأة، وعاد سالماً إلى مسقط مع خطة تأهيل شاملة.',
    },
    quote: {
      en: '"The doctor explained every detail of the beating-heart procedure to my sons in simple terms. The hospital care, Halal meals, and personal attention made all the difference."',
      ar: '"شرح الطبيب لأبنائي كافة تفاصيل جراحة القلب النابض بدقة وطمأنينة. الرعاية المتميزة، والوجبات الحلال، والمرافقة الشخصية جعلت رحلة العلاج مريحة للغاية."',
    },
    outcomeNote: {
      en: 'Complete relief of angina; cardiac stress test at 3 months confirmed excellent revascularization.',
      ar: 'اختفاء تام لآلام الصدر والذبحة الصدرية؛ وأكد اختبار جهد القلب بعد 3 أشهر استعادة التروية الدموية الممتازة.',
    },
    hasConsent: true,
    mediaType: 'video',
    mediaUrl: '/videos/oman-heart-case.mp4',
    videoThumbnailUrl: '/images/patient-stories/oman-heart-patient.jpg',
    videoDuration: 'PT2M45S',
    uploadDate: '2024-03-01',
  },
  {
    id: 'story-knee-kazakhstan',
    slug: 'robotic-knee-replacement-kazakhstan-india',
    patientName: 'Patient Gulnara',
    patientCountry: {
      en: 'Kazakhstan (Almaty)',
      ar: 'كازاخستان (ألماتي)',
    },
    countryCode: 'KZ',
    condition: {
      en: 'Severe Bilateral Knee Osteoarthritis with severe varus deformity, unable to walk more than 50 meters',
      ar: 'خشونة متقدمة في كلا الركبتين مع تقوس في الساقين وصعوبة المشي لأكثر من 50 متراً',
    },
    treatmentSlug: 'knee-replacement-india',
    hospitalId: 'artemis-gurgaon',
    doctorId: 'dr-artemis-ortho-1',
    journeyTimeline: [
      {
        stage: { en: 'Digital X-ray Review & Surgical Plan', ar: 'تقييم الأشعة السينية والخطة' },
        duration: { en: 'Day 1 - 2', ar: 'الأيام 1 - 2' },
      },
      {
        stage: { en: 'Direct Flight Almaty - Delhi', ar: 'رحلة مباشرة ألماتي - دلهي' },
        duration: { en: 'Day 4', ar: 'اليوم 4' },
      },
      {
        stage: { en: 'Simultaneous Bilateral Robotic TKR', ar: 'استبدال الركبتين بالروبوت معاً' },
        duration: { en: 'Day 6', ar: 'اليوم 6' },
      },
      {
        stage: { en: 'Walking with Walker on Day 1 Post-Op', ar: 'المشي في اليوم الأول بعد الجراحة' },
        duration: { en: 'Day 7', ar: 'اليوم 7' },
      },
      {
        stage: { en: 'Unassisted Walking & Return Home', ar: 'المشي المستقل والعودة لألماتي' },
        duration: { en: 'Day 18', ar: 'اليوم 18' },
      },
    ],
    storySummary: {
      en: 'Gulnara, a 62-year-old schoolteacher from Almaty, had suffered for years from crippling knee arthritis. Through Baxtiyor Healthcare, she consulted the Head of Robotic Orthopedics at Artemis Hospital, Gurgaon. She underwent simultaneous bilateral robotic total knee replacement using high-flexion implants. Assisted by the hospital’s fast-track rehabilitation team and Russian coordinator, she stood on Day 1, climbed stairs by Day 8, and flew home to Kazakhstan pain-free.',
      ar: 'عانت جولنارا (62 عاماً) وهي معلمة من ألماتي، لسنوات طويلة من خشونة الركبة التي أعاقتها عن الحركة. عبر بختيار للرعاية الصحية، استشارت رئيس جراحة العظام بالروبوت بمستشفى أرتيميس في جورجاون. خضعت لعملية استبدال الركبتين معاً بالروبوت بمفاصل عالية الانثناء. وبمساعدة فريق التأهيل الحركي السريع والمترجم الروسي، تمكنت من الوقوف في اليوم الأول وصعود الدرج في اليوم الثامن وعادت لبلدها بدون ألم.',
    },
    quote: {
      en: '"I had not walked without severe pain for five years. The robotic precision and gentle care in Gurgaon gave me my independent life back."',
      ar: '"لم أكن أستطيع المشي بدون ألم مبرح طوال خمس سنوات. دقة الروبوت والرعاية الإنسانية الفائقة في جورجاون أعادت لي حياتي وحركتي من جديد."',
    },
    outcomeNote: {
      en: 'Active knee flexion achieved 125 degrees bilaterally; patient returned to teaching without cane assistance.',
      ar: 'حققت الركبتان ثنياً حركياً وصل إلى 125 درجة؛ وعادت المريضة لممارسة التدريس دون الحاجة لعصا المشي.',
    },
    hasConsent: true,
    mediaType: 'video',
    mediaUrl: '/videos/kazakhstan-knee-case.mp4',
    videoThumbnailUrl: '/images/patient-stories/kazakhstan-knee-patient.jpg',
    videoDuration: 'PT2M10S',
    uploadDate: '2024-03-20',
  },
];

