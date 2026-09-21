import { HospitalFacility } from '@/types';

export const HOSPITALS: HospitalFacility[] = [
  {
    id: 'fortis-fmri',
    slug: 'fortis-memorial-research-institute',
    name: {
      en: 'Fortis Memorial Research Institute (FMRI)',
      ar: 'معهد فورتيس التذكاري للأبحاث (FMRI)',
    },
    location: {
      en: 'Sector 44, Gurugram (Delhi NCR), India',
      ar: 'القطاع 44، جوروجرام (دلهي الكبرى)، الهند',
    },
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India',
    bedsCount: '1000 beds capacity',
    establishedYear: '2013',
    overview: {
      en: 'Fortis Memorial Research Institute (FMRI) is a multi-super-specialty quaternary care hospital known for world-class clinician talent and cutting-edge medical technology. It serves thousands of international patients annually across robotic surgery, cardiac care, oncology, and organ transplantation.',
      ar: 'يُعد معهد فورتيس التذكاري للأبحاث من أبرز المستشفيات التخصصية الفائقة في الهند، ويشتهر بكفاءة نخبة الاستشاريين وأحدث التقنيات الطبية. يستقبل سنوياً آلاف المرضى الدوليين لجراحات الروبوت، ورعاية القلب، والأورام، وزراعة الأعضاء.',
    },
    keySpecialties: ['cardiology', 'oncology', 'neurosurgery', 'kidney', 'liver', 'orthopedics'],
    internationalPatientServices: {
      en: [
        'Dedicated International Patient Lounge with Arabic & Russian coordinators',
        'Direct Airport Pickup & Transfer in private ambulance / cab',
        'In-hospital currency exchange & local SIM card arrangement',
        'Specialized dietary services (Halal, Central Asian menu options)',
        'Visa invitation letter issuance within 24 hours of clinical review',
      ],
      ar: [
        'صالة مخصصة للمرضى الدوليين مع منسقين باللغتين العربية والروسية',
        'استقبال ونقل مباشر من مطار دلهي الدولي بسيارة خاصة أو إسعاف',
        'خدمات صرافة العملات داخل المستشفى وتوفير بطاقات اتصال محلية',
        'خدمات تغذية مخصصة (وجبات حلال وخيارات ملائمة للمطبخ العربي وآسيا الوسطى)',
        'إصدار خطابات الدعوة للتأشيرة الطبية خلال 24 ساعة من التقييم الطبي',
      ],
    },
    accreditationNote: {
      en: 'NABH and JCI accredited facility. Verified hospital option facilitated through Baxtiyor Healthcare patient coordination.',
      ar: 'منشأة معتمدة من قبل اللجنة الدولية المشتركة (JCI) والمجلس الوطني لاعتماد المستشفيات (NABH). خيار مستشفى موثوق بتنسيق بختيار للرعاية الصحية.',
    },
    distanceFromAirport: {
      en: 'Approximately 18 km (25-35 minutes) from Indira Gandhi International Airport (DEL)',
      ar: 'حوالي 18 كم (25-35 دقيقة) من مطار أنديرا غاندي الدولي في دلهي (DEL)',
    },
    nearbyHotelsNote: {
      en: 'Walking distance to verified serviced guest apartments and 3-to-5 star international hotels with Arabic and CIS patient amenities.',
      ar: 'على مسافة قريبة من شقق فندقية مجهزة وفنادق 3 إلى 5 نجوم توفر سبل الراحة للمرضى العرب ومواطني رابطة الدول المستقلة.',
    },
    doctorIds: ['dr-fortis-cardiac-1', 'dr-fortis-transplant-1'],
    treatmentSlugs: ['heart-surgery-india', 'kidney-transplant-india', 'liver-transplant-india', 'brain-tumor-surgery-india'],
    photos: ['/images/hospitals/fortis-fmri-exterior.jpg', '/images/hospitals/fortis-fmri-lounge.jpg'],
  },
  {
    id: 'artemis-gurgaon',
    slug: 'artemis-hospital-gurgaon',
    name: {
      en: 'Artemis Hospital, Gurgaon',
      ar: 'مستشفى أرتيميس، جورجاون',
    },
    location: {
      en: 'Sector 51, Gurugram (Delhi NCR), India',
      ar: 'القطاع 51، جوروجرام (دلهي الكبرى)، الهند',
    },
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India',
    bedsCount: '600+ beds capacity',
    establishedYear: '2007',
    overview: {
      en: 'Artemis Hospital is recognized for clinical excellence in cardiology, joint replacement, neurosurgery, and oncology. It was the first hospital in Gurgaon to achieve JCI and NABH accreditations and has an extensive international patient wing.',
      ar: 'يشتهر مستشفى أرتيميس بتميزه الإكلينيكي في أمراض القلب، وجراحة المفاصل، وجراحة الأعصاب، وعلاج الأورام. كان أول مستشفى في جورجاون يحصل على اعتمادي JCI وNABH ويضم قسماً واسعاً لرعاية المرضى الدوليين.',
    },
    keySpecialties: ['cardiology', 'orthopedics', 'oncology', 'neurosurgery', 'liver'],
    internationalPatientServices: {
      en: [
        'Dedicated Arabic and Russian translators available 24/7',
        'Complimentary airport pickup for patient and attendants',
        'Assistance with medical visa extension and FRRO registration',
        'Private international inpatient suites with attendant beds',
        'Tele-consultation follow-up post patient return home',
      ],
      ar: [
        'مترجمون متخصصون باللغتين العربية والروسية على مدار الساعة',
        'استقبال مجاني من المطار للمريض والمرافقين',
        'مساعدة كاملة في تمديد التأشيرة الطبية وتسجيل الإقامة في الشرطة الهندية (FRRO)',
        'أجنحة تنويم خاصة مجهزة بكافة سبل الراحة للمريض والمرافق',
        'متابعة طبية عن بعد عبر الفيديو بعد عودة المريض إلى وطنه',
      ],
    },
    accreditationNote: {
      en: 'JCI and NABH accredited. Selected hospital option for complex surgical procedures through Baxtiyor Healthcare.',
      ar: 'معتمد من قبل JCI وNABH. خيار معتمد للجراحات المعقدة بتنسيق من بختيار للرعاية الصحية.',
    },
    distanceFromAirport: {
      en: 'Approximately 20 km (30-40 minutes) from Delhi International Airport',
      ar: 'حوالي 20 كم (30-40 دقيقة) من مطار دلهي الدولي',
    },
    nearbyHotelsNote: {
      en: 'Extensive range of long-stay apartments and hotels within a 2 km radius offering kitchen amenities for patient families.',
      ar: 'خيارات متعددة من الشقق الفندقية للإقامة الطويلة والفنادق ضمن دائرة 2 كم مزودة بمطابخ لراحة عائلات المرضى.',
    },
    doctorIds: ['dr-artemis-ortho-1', 'dr-artemis-liver-1'],
    treatmentSlugs: ['knee-replacement-india', 'hip-replacement-india', 'liver-transplant-india', 'heart-surgery-india'],
    photos: ['/images/hospitals/artemis-exterior.jpg'],
  },
  {
    id: 'shalby-sanar',
    slug: 'shalby-sanar-international',
    name: {
      en: 'Shalby Sanar International Hospitals',
      ar: 'مستشفيات شالبي سانار الدولية',
    },
    location: {
      en: 'Golf Course Road, Sector 53, Gurugram, India',
      ar: 'شارع جولف كورس، القطاع 53، جوروجرام، الهند',
    },
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India',
    bedsCount: '150+ specialized surgical beds',
    establishedYear: '2022',
    overview: {
      en: 'Shalby Sanar International Hospitals is a premium boutique quaternary care center specializing in complex surgical interventions, renal transplants, oncology, and orthopedic reconstructions, designed specifically to cater to high-expectation international patients.',
      ar: 'تُعد مستشفيات شالبي سانار الدولية مركزاً متطوراً فائق التخصص يركز على الجراحات الدقيقة، وزراعة الكلى، وعلاج الأورام، وجراحة العظام، وصُمم خصيصاً لتقديم أعلى مستويات الرعاية للمرضى الدوليين.',
    },
    keySpecialties: ['kidney', 'orthopedics', 'oncology', 'cardiology', 'neurosurgery'],
    internationalPatientServices: {
      en: [
        'Personal concierge coordinator assigned from arrival to discharge',
        'Direct coordination for organ donor documentation under legal guidelines',
        'VIP private suites and rapid consultation scheduling',
        'In-house international culinary chef providing customized patient meals',
        'Daily updates transmitted to family members upon consent',
      ],
      ar: [
        'منسق شخصي مخصص يرافق المريض من لحظة الوصول وحتى المغادرة',
        'تنسيق مباشر لملفات التبرع بالأعضاء وفق اللوائح القانونية المنظمة',
        'أجنحة VIP خاصة وجدولة سريعة ومباشرة للمواعيد مع كبار الاستشاريين',
        'طهاة متخصصون لتحضير وجبات المريض والمرافقين حسب الطلب',
        'تقارير يومية منتظمة تُرسل لعائلة المريض بناءً على رغبته',
      ],
    },
    accreditationNote: {
      en: 'NABH accredited center. Verified partner hospital option under Baxtiyor Healthcare patient coordination.',
      ar: 'مركز معتمد من المجلس الوطني لاعتماد المستشفيات (NABH). خيار مستشفى موثوق بتنسيق بختيار للرعاية الصحية.',
    },
    distanceFromAirport: {
      en: 'Approximately 16 km (25-30 minutes) from Delhi International Airport via rapid expressway',
      ar: 'حوالي 16 كم (25-30 دقيقة) من مطار دلهي الدولي عبر طريق سريع ومريح',
    },
    nearbyHotelsNote: {
      en: 'Located in upscale Gurgaon with luxury and business hotels within 5 minutes drive.',
      ar: 'يقع في أرقى أحياء جورجاون بالقرب من الفنادق الفاخرة وشقق الإقامة المريحة.',
    },
    doctorIds: ['dr-sanar-kidney-1'],
    treatmentSlugs: ['kidney-transplant-india', 'knee-replacement-india', 'cancer-treatment-india'],
    photos: ['/images/hospitals/shalby-sanar-exterior.jpg'],
  },
  {
    id: 'marengo-asia',
    slug: 'marengo-asia-international',
    name: {
      en: 'Marengo Asia International Hospitals',
      ar: 'مستشفيات مارينغو آسيا الدولية',
    },
    location: {
      en: 'Sector 56, Gurugram, Delhi NCR, India',
      ar: 'القطاع 56، جوروجرام، دلهي الكبرى، الهند',
    },
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India',
    bedsCount: '250+ beds',
    establishedYear: '2021 (Expanded)',
    overview: {
      en: 'Marengo Asia Hospitals focuses on patient-first clinical delivery with specialized centers of excellence in oncology, cardiology, neurosciences, and critical surgical care for international patients traveling from the Middle East and CIS countries.',
      ar: 'تركز مستشفيات مارينغو آسيا على رعاية المريض أولاً، وتضم مراكز تميز متخصصة في الأورام، وأمراض القلب، والعلوم العصبية، والجراحات الدقيقة للمرضى القادمين من الشرق الأوسط ودول آسيا الوسطى.',
    },
    keySpecialties: ['oncology', 'cardiology', 'neurosurgery', 'orthopedics'],
    internationalPatientServices: {
      en: [
        'Multilingual international support desk with Russian and Arabic interpreters',
        'Hassle-free outpatient registration and prompt diagnostic reports',
        'Airport transfer and accommodation assistance in close proximity',
        'Post-discharge recovery monitoring and telemedicine continuity',
      ],
      ar: [
        'مكتب دعم دولي متعدد اللغات مع مترجمين باللغتين العربية والروسية',
        'تسجيل سريع وإجراء فحوصات تشخيصية عاجلة بدون انتظار',
        'توفير النقل من المطار والمساعدة في اختيار السكن القريب',
        'متابعة فترة النقاهة بعد الخروج واستشارات طبية مستمرة عن بعد',
      ],
    },
    accreditationNote: {
      en: 'NABH and NABL accredited diagnostic laboratories. Verified hospital option coordinated by Baxtiyor Healthcare.',
      ar: 'مختبرات ومرافق معتمدة من NABH وNABL. خيار مستشفى موثوق بتنسيق بختيار للرعاية الصحية.',
    },
    distanceFromAirport: {
      en: 'Approximately 19 km (30-35 minutes) from Delhi International Airport',
      ar: 'حوالي 19 كم (30-35 دقيقة) من مطار دلهي الدولي',
    },
    nearbyHotelsNote: {
      en: 'Close proximity to Metro stations, commercial markets, and patient guest houses.',
      ar: 'بالقرب من محطات المترو، والمراكز التجارية، ومساكن إقامة المرضى وعائلاتهم.',
    },
    doctorIds: ['dr-marengo-neuro-1'],
    treatmentSlugs: ['brain-tumor-surgery-india', 'cancer-treatment-india', 'heart-surgery-india'],
    photos: ['/images/hospitals/marengo-exterior.jpg'],
  },
];

