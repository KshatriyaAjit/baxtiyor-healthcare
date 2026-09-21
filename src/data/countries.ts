import { CountryPathway } from '@/types';

export const COUNTRIES: CountryPathway[] = [
  {
    id: 'oman',
    slug: 'oman',
    countryName: {
      en: 'Oman',
      ar: 'سلطنة عُمان',
    },
    region: 'Arab',
    overview: {
      en: 'Omani citizens and residents frequently choose India for complex cardiology, robotic joint replacement, advanced oncology, and specialized neurosurgery due to direct 3-hour flights to Delhi, experienced Arabic coordinators, and transparent treatment pricing.',
      ar: 'يختار المواطنون والمقيمون في سلطنة عُمان الهند لتلقي العلاج المتقدم في جراحة القلب، واستبدال المفاصل بالروبوت، وعلاج الأورام وجراحة الأعصاب، بفضل رحلات الطيران المباشرة (3 ساعات فقط إلى دلهي)، وتوفر منسقين يتحدثون العربية بطلاقة، والأسعار الشفافة.',
    },
    whyPatientsChooseIndia: {
      en: [
        'Direct non-stop flights from Muscat to Delhi International Airport (under 3.5 hours)',
        'Experienced Arabic-speaking patient coordinators at hospitals and guest accommodations',
        'Quick turnaround for clinical appointments without prolonged waiting periods',
        'High availability of Halal food and comfortable apartment accommodations for Omani families',
      ],
      ar: [
        'رحلات طيران مباشرة يومية من مسقط إلى مطار دلهي الدولي (أقل من 3 ساعات ونصف)',
        'منسقون ومترجمون عرب يرافقون المريض في جميع المواعيد والفحوصات',
        'سرعة الحصول على المواعيد الطبية والعمليات الجراحية بدون قوائم انتظار',
        'توفر الوجبات الحلال والشقق الفندقية المفروشة المريحة للعائلات العمانية',
      ],
    },
    commonTreatments: ['heart-surgery-india', 'knee-replacement-india', 'hip-replacement-india', 'kidney-transplant-india'],
    visaInfo: {
      type: {
        en: 'Indian e-Medical Visa (online approval within 24-72 hours)',
        ar: 'تأشيرة طبية هندية إلكترونية (تصدر عبر الإنترنت خلال 24-72 ساعة)',
      },
      processingTime: {
        en: '2 to 3 working days',
        ar: '2 إلى 3 أيام عمل',
      },
      requirements: {
        en: ['Valid Omani Passport (minimum 6 months validity)', 'Hospital Medical Visa Invitation Letter (issued by Baxtiyor)', 'Recent diagnostic medical summary'],
        ar: ['جواز سفر عماني ساري المفعول (صلاحية 6 أشهر على الأقل)', 'خطاب دعوة التأشيرة الطبية من المستشفى (نصدره لك)', 'تقرير طبي حديث يوضح الحالة المرضية'],
      },
      assistanceProvided: {
        en: 'Baxtiyor Healthcare issues authorized hospital visa letters and assists with embassy or e-visa submissions.',
        ar: 'تقوم بختيار للرعاية الصحية بإصدار خطابات المستشفى الرسمية وتسهيل إجراءات التقديم الإلكتروني.',
      },
    },
    flightInfo: {
      en: 'Direct daily flights operated by Oman Air and Air India from Muscat (MCT) to Delhi (DEL).',
      ar: 'رحلات يومية مباشرة عبر الطيران العماني وطيران الهند من مسقط (MCT) إلى دلهي (DEL).',
    },
    languageSupport: {
      en: 'Full Arabic-speaking coordination team from airport pickup to in-hospital doctor consultations.',
      ar: 'فريق تنسيق كامل يتحدث اللغة العربية يرافقك من استقبال المطار وحتى الاستشارات داخل المستشفى.',
    },
    localWhatsAppNumber: '+919999999999', // Verified coordinator contact
    patientStoryIds: ['story-heart-oman'],
  },
  {
    id: 'saudi-arabia',
    slug: 'saudi-arabia',
    countryName: {
      en: 'Saudi Arabia',
      ar: 'المملكة العربية السعودية',
    },
    region: 'Arab',
    overview: {
      en: 'Patients traveling from Saudi Arabia to India seek leading tertiary opinions for complex oncology treatments, robotic surgery, bone marrow transplants, and organ transplant coordination in accredited Indian quaternary centers.',
      ar: 'يتوجه المرضى من المملكة العربية السعودية إلى الهند للحصول على استشارات طبية متقدمة في علاج الأورام، وجراحات الروبوت، وزراعة نخاع العظم، وزراعة الأعضاء في أرقى المستشفيات الهندية المعتمدة دولياً.',
    },
    whyPatientsChooseIndia: {
      en: [
        'Direct flights from Riyadh, Jeddah, and Dammam to New Delhi',
        'Specialized super-specialty tumor boards and genomic cancer therapies',
        'Personal Arabic concierge service with private inpatient suites',
        'Substantial cost advantage for procedures not readily available without long waiting lists',
      ],
      ar: [
        'رحلات مباشرة من الرياض، جدة، والدمام إلى نيودلهي',
        'لجان أورام متعددة التخصصات وعلاجات جينية موجهة لأمراض السرطان',
        'خدمة كونسيرج ومرافقة كاملة باللغة العربية مع أجنحة إقامة خاصة',
        'فروقات تكلفة مجزية وسرعة فائقة في بدء العلاج دون أي تأخير',
      ],
    },
    commonTreatments: ['kidney-transplant-india', 'liver-transplant-india', 'brain-tumor-surgery-india', 'hip-replacement-india'],
    visaInfo: {
      type: {
        en: 'Indian e-Medical Visa',
        ar: 'تأشيرة طبية هندية إلكترونية',
      },
      processingTime: {
        en: '48 to 72 hours',
        ar: '48 إلى 72 ساعة',
      },
      requirements: {
        en: ['Saudi Passport with 6-month validity', 'Baxtiyor Hospital Invitation Letter', 'Patient & Attendant national ID copy'],
        ar: ['جواز سفر سعودي صالح لـ 6 أشهر', 'خطاب دعوة المستشفى المعتمد عبر بختيار', 'صور الهوية الوطنية للمريض والمرافقين'],
      },
      assistanceProvided: {
        en: 'End-to-end documentation preparation and visa verification.',
        ar: 'تجهيز كامل الوثائق الطبية ومتابعة إصدار التأشيرات.',
      },
    },
    flightInfo: {
      en: 'Direct flights from Riyadh (RUH) and Jeddah (JED) to Delhi (DEL) via Saudia and Air India.',
      ar: 'رحلات مباشرة من الرياض (RUH) وجدة (JED) إلى دلهي (DEL) عبر الخطوط السعودية وطيران الهند.',
    },
    languageSupport: {
      en: 'Dedicated Arabic-speaking clinical translators for all doctor meetings and consent reviews.',
      ar: 'مترجمون طبيون باللغة العربية متواجدون في جميع المقابلات الطبية وشرح خطط العلاج.',
    },
    localWhatsAppNumber: '+919999999999',
    patientStoryIds: [],
  },
  {
    id: 'uae',
    slug: 'uae',
    countryName: {
      en: 'United Arab Emirates',
      ar: 'الإمارات العربية المتحدة',
    },
    region: 'Arab',
    overview: {
      en: 'Patients from Dubai, Abu Dhabi, and Sharjah travel to Delhi NCR for complex revision surgeries, specialized pediatric interventions, and executive medical second opinions.',
      ar: 'يسافر المرضى من دبي وأبوظبي والشارقة إلى دلهي الكبرى للحصول على جراحات تصحيحية معقدة، وعلاجات تخصصية للأطفال، واستشارات طبية ثانية من كبار الجراحين.',
    },
    whyPatientsChooseIndia: {
      en: [
        'Short 3-hour flight connectivity from Dubai and Abu Dhabi',
        'Direct access to globally trained surgeon leaders',
        'VIP coordinated hospital stays and private transport',
      ],
      ar: [
        'رحلة طيران قصيرة مدتها 3 ساعات فقط من دبي وأبوظبي',
        'وصول مباشر إلى جراحين عالميين ذوي خبرات دولية',
        'إقامة مستشفى VIP مع توفير سيارات خاصة للاستقبال والتنقل',
      ],
    },
    commonTreatments: ['knee-replacement-india', 'hip-replacement-india', 'heart-surgery-india', 'brain-tumor-surgery-india'],
    visaInfo: {
      type: {
        en: 'Indian e-Medical Visa',
        ar: 'تأشيرة طبية إلكترونية',
      },
      processingTime: {
        en: '24 to 48 hours',
        ar: '24 إلى 48 ساعة',
      },
      requirements: {
        en: ['Valid Passport', 'Hospital Visa Letter', 'Clinical Summary'],
        ar: ['جواز سفر ساري', 'خطاب دعوة المستشفى', 'ملخص التقرير الطبي'],
      },
      assistanceProvided: {
        en: 'Rapid electronic visa letter issuance within 12 hours.',
        ar: 'إصدار خطابات الدعوة العاجلة خلال 12 ساعة.',
      },
    },
    flightInfo: {
      en: 'Multiple daily direct flights by Emirates, Etihad, and Air India.',
      ar: 'رحلات مباشرة متعددة يومياً عبر طيران الإمارات، والاتحاد، وطيران الهند.',
    },
    languageSupport: {
      en: 'Bilingual coordinators available 24/7.',
      ar: 'منسقون يجيدون العربية والإنجليزية على مدار الساعة.',
    },
    localWhatsAppNumber: '+919999999999',
    patientStoryIds: [],
  },
  {
    id: 'uzbekistan',
    slug: 'uzbekistan',
    countryName: {
      en: 'Uzbekistan',
      ar: 'أوزبكستان',
    },
    region: 'Central Asia',
    overview: {
      en: 'Uzbekistan is an established core patient community for Baxtiyor Healthcare. Patients travel to Gurgaon for living donor kidney transplants, liver transplants, complex orthopedic joint replacements, and specialized cancer surgeries.',
      ar: 'تُعد أوزبكستان من أهم الدول التي تحظى بحضور واسع لدى بختيار للرعاية الصحية. يسافر المرضى إلى جورجاون لإجراء زراعة الكلى من متبرع حي، وزراعة الكبد، واستبدال المفاصل، وجراحات الأورام الدقيقة.',
    },
    whyPatientsChooseIndia: {
      en: [
        'Direct flights between Tashkent and New Delhi (under 3 hours)',
        'Extensive native Uzbek and Russian-speaking coordination team',
        'Transparent assistance with legal documentation for living donor transplants',
        'Vast established patient community and trusted track record over 10+ years',
      ],
      ar: [
        'رحلات مباشرة بين طشقند ونيودلهي (أقل من 3 ساعات)',
        'فريق تنسيق متخصص يتحدث الأوزبكية والروسية بطلاقة',
        'مساعدة دقيقة في توثيق ملفات زراعة الأعضاء القانونية',
        'ثقة ممتدة لأكثر من 10 سنوات وتجارب ناجحة لمئات المرضى',
      ],
    },
    commonTreatments: ['kidney-transplant-india', 'liver-transplant-india', 'knee-replacement-india', 'hip-replacement-india'],
    visaInfo: {
      type: {
        en: 'Indian Medical Visa through Indian Embassy in Tashkent or authorized visa center',
        ar: 'تأشيرة طبية هندية عبر السفارة الهندية في طشقند أو المركز المعتمد',
      },
      processingTime: {
        en: '3 to 5 working days',
        ar: '3 إلى 5 أيام عمل',
      },
      requirements: {
        en: ['Uzbek Foreign Travel Passport', 'Official Hospital Invitation Letter', 'Legalized family relationship certificates (for transplants)'],
        ar: ['جواز السفر الأوزبكي', 'خطاب الدعوة الرسمي من المستشفى', 'شهادات القرابة المصدقة قانونياً (لحالات الزراعة)'],
      },
      assistanceProvided: {
        en: 'Complete document verification and direct coordination with Indian Embassy consular department.',
        ar: 'تدقيق كامل الوثائق والتنسيق المباشر مع القسم القنصلي.',
      },
    },
    flightInfo: {
      en: 'Regular non-stop flights from Tashkent (TAS) to Delhi (DEL) via Uzbekistan Airways and IndiGo.',
      ar: 'رحلات منتظمة ومباشرة من طشقند (TAS) إلى دلهي (DEL) عبر الخطوط الأوزبكية وطيران إنديجو.',
    },
    languageSupport: {
      en: 'Dedicated native Uzbek and Russian coordinators accompanying patient at every appointment.',
      ar: 'منسقون أصليون يتحدثون الأوزبكية والروسية يرافقون المريض في كل خطوة.',
    },
    localWhatsAppNumber: '+919999999999',
    patientStoryIds: ['story-kidney-uzbekistan'],
  },
  {
    id: 'kazakhstan',
    slug: 'kazakhstan',
    countryName: {
      en: 'Kazakhstan',
      ar: 'كازاخستان',
    },
    region: 'Central Asia',
    overview: {
      en: 'Patients from Almaty and Astana choose Indian super-specialty hospitals for robotic joint replacements, complex neurosurgeries, pediatric cardiac surgeries, and advanced oncology.',
      ar: 'يختار المرضى من ألماتي وأستانا المستشفيات الهندية المتقدمة لإجراء استبدال المفاصل بالروبوت، وجراحات الأعصاب المعقدة، وجراحات قلب الأطفال، وعلاج الأورام.',
    },
    whyPatientsChooseIndia: {
      en: [
        'Direct flights from Almaty to Delhi (approx. 3.5 hours)',
        'Comprehensive Russian-language medical coordination',
        'State-of-the-art robotic technology matching Western standards at accessible costs',
      ],
      ar: [
        'رحلات مباشرة من ألماتي إلى دلهي (حوالي 3.5 ساعات)',
        'تنسيق طبي متكامل باللغة الروسية',
        'تقنيات روبوتية متطورة تضاهي المعايير الغربية بأسعار معقولة',
      ],
    },
    commonTreatments: ['knee-replacement-india', 'brain-tumor-surgery-india', 'heart-surgery-india', 'hip-replacement-india'],
    visaInfo: {
      type: {
        en: 'Indian e-Medical Visa',
        ar: 'تأشيرة طبية هندية إلكترونية',
      },
      processingTime: {
        en: '2 to 3 business days',
        ar: '2 إلى 3 أيام عمل',
      },
      requirements: {
        en: ['Kazakh Passport', 'Hospital Invitation Letter', 'Recent Medical Reports'],
        ar: ['جواز سفر كازاخي', 'خطاب دعوة المستشفى', 'التقارير الطبية الحديثة'],
      },
      assistanceProvided: {
        en: 'Online visa filing support and invitation certification.',
        ar: 'المساعدة في التقديم الإلكتروني وإصدار الدعوات الطبية المعتمدة.',
      },
    },
    flightInfo: {
      en: 'Direct flights from Almaty (ALA) to Delhi (DEL) via Air Astana and IndiGo.',
      ar: 'رحلات مباشرة من ألماتي إلى دلهي عبر طيران أستانا وإنديجو.',
    },
    languageSupport: {
      en: 'Russian-fluent patient coordinators assigned from arrival.',
      ar: 'منسقون يتحدثون الروسية بطلاقة يرافقون المريض فور وصوله.',
    },
    localWhatsAppNumber: '+919999999999',
    patientStoryIds: ['story-knee-kazakhstan'],
  },
  {
    id: 'turkmenistan',
    slug: 'turkmenistan',
    countryName: {
      en: 'Turkmenistan',
      ar: 'تركمانستان',
    },
    region: 'Central Asia',
    overview: {
      en: 'Turkmen patients frequently visit Delhi NCR for cardiac revascularization, orthopedic reconstructions, and specialized eye and renal treatments.',
      ar: 'يسافر المرضى من تركمانستان إلى دلهي الكبرى لإجراء جراحات القلب والشرايين، وترميم المفاصل والعظام، وجراحات العيون والكلى المتخصصة.',
    },
    whyPatientsChooseIndia: {
      en: [
        'Direct flights from Ashgabat to Delhi',
        'Experienced Russian-speaking patient managers',
        'Transparent hospital quotations with zero hidden surprises',
      ],
      ar: [
        'رحلات مباشرة من عشق آباد إلى دلهي',
        'مديرو رعاية مرضى يتحدثون الروسية بطلاقة',
        'عروض أسعار واضحة وشفافة من المستشفيات بدون رسوم خفية',
      ],
    },
    commonTreatments: ['heart-surgery-india', 'knee-replacement-india', 'kidney-transplant-india'],
    visaInfo: {
      type: {
        en: 'Indian Medical Visa via Indian Embassy in Ashgabat',
        ar: 'تأشيرة علاجية عبر السفارة الهندية في عشق آباد',
      },
      processingTime: {
        en: '3 to 6 working days',
        ar: '3 إلى 6 أيام عمل',
      },
      requirements: {
        en: ['Valid Passport', 'Official Baxtiyor Hospital Invitation Letter', 'Local Medical Diagnosis Certificate'],
        ar: ['جواز سفر ساري', 'خطاب دعوة المستشفى الرسمي', 'شهادة تشخيص طبي من المستشفى المحلي'],
      },
      assistanceProvided: {
        en: 'Official telex visa invitation support.',
        ar: 'توفير خطابات الدعوة والبرقيات الرسمية للسفارة.',
      },
    },
    flightInfo: {
      en: 'Direct flights from Ashgabat (ASB) to Delhi (DEL) via Turkmenistan Airlines.',
      ar: 'رحلات مباشرة من عشق آباد إلى دلهي عبر الخطوط الجوية التركمانية.',
    },
    languageSupport: {
      en: 'Russian and Turkmen language translation assistance.',
      ar: 'مساعدة كاملة في الترجمة باللغتين الروسية والتركمانية.',
    },
    localWhatsAppNumber: '+919999999999',
    patientStoryIds: [],
  },
  {
    id: 'afghanistan',
    slug: 'afghanistan',
    countryName: {
      en: 'Afghanistan',
      ar: 'أفغانستان',
    },
    region: 'Central Asia',
    overview: {
      en: 'Baxtiyor Healthcare has a long history of assisting Afghan patients seeking urgent medical intervention in cardiology, orthopedics, neurology, and reconstructive surgeries in Delhi hospitals.',
      ar: 'تمتلك بختيار للرعاية الصحية تاريخاً طويلاً في مساعدة المرضى الأفغان الباحثين عن تدخلات طبية عاجلة في جراحة القلب، والعظام، والمخ والأعصاب في مستشفيات دلهي.',
    },
    whyPatientsChooseIndia: {
      en: [
        'Geographic proximity and flight connections to Delhi',
        'Dedicated Dari and Pashto translation support',
        'Expertise in complex trauma and delayed orthopedic/reconstructive cases',
      ],
      ar: [
        'القرب الجغرافي وسهولة الوصول إلى دلهي',
        'دعم كامل بالترجمة باللغتين الدرية والبشتو',
        'خبرة متقدمة في علاج إصابات الحوادث المعقدة وحالات العظام المتأخرة',
      ],
    },
    commonTreatments: ['knee-replacement-india', 'hip-replacement-india', 'heart-surgery-india', 'brain-tumor-surgery-india'],
    visaInfo: {
      type: {
        en: 'Indian Medical Visa under prioritized processing guidelines',
        ar: 'تأشيرة علاجية هندية وفق ضوابط المعالجة ذات الأولوية',
      },
      processingTime: {
        en: 'Subject to consular scheduling',
        ar: 'حسب مواعيد المعالجة القنصلية',
      },
      requirements: {
        en: ['Valid Passport', 'Baxtiyor Hospital Medical Visa Letter', 'Hospital Attestation'],
        ar: ['جواز سفر صالح', 'خطاب الدعوة الطبية من المستشفى عبر بختيار', 'تصديق المستشفى'],
      },
      assistanceProvided: {
        en: 'Urgent visa letter generation and appointment facilitation.',
        ar: 'إصدار خطابات الدعوة الطبية العاجلة وتسهيل المواعيد.',
      },
    },
    flightInfo: {
      en: 'Flights from Kabul (KBL) to Delhi (DEL) via Ariana Afghan and Kam Air (schedule dependent).',
      ar: 'رحلات من كابول (KBL) إلى دلهي (DEL) عبر الخطوط الأفغانية وكام إير (حسب جدول الطيران).',
    },
    languageSupport: {
      en: 'Dari, Pashto, and Urdu coordinator support.',
      ar: 'دعم كامل لمنسقين يجيدون الدرية والبشتو والأوردو.',
    },
    localWhatsAppNumber: '+919999999999',
    patientStoryIds: [],
  },
  {
    id: 'russia',
    slug: 'russia',
    countryName: {
      en: 'Russia',
      ar: 'روسيا',
    },
    region: 'CIS',
    overview: {
      en: 'Patients from the Russian Federation travel to India for complex cancer therapies, robotic surgeries, and major orthopedic reconstructions, seeking rapid clinical admission and advanced medical technology.',
      ar: 'يسافر المرضى من روسيا الاتحادية إلى الهند لتلقي علاجات الأورام المتقدمة، وجراحات الروبوت، واستبدال المفاصل، للاستفادة من سرعة بدء العلاج وتوفر أحدث التقنيات الطبية.',
    },
    whyPatientsChooseIndia: {
      en: [
        'Direct flights from Moscow to Delhi (approx. 6 hours)',
        'Full Russian-language coordination at partner hospitals',
        'State-of-the-art oncology infrastructure (CyberKnife, PET-CT, Proton therapy)',
      ],
      ar: [
        'رحلات مباشرة من موسكو إلى دلهي (حوالي 6 ساعات)',
        'تنسيق طبي متكامل باللغة الروسية في المستشفيات الشريكة',
        'بنية تحتية متطورة لعلاج السرطان (سايبر نايف، مسح ذري PET-CT، علاج بالبروتون)',
      ],
    },
    commonTreatments: ['cancer-treatment-india', 'brain-tumor-surgery-india', 'knee-replacement-india', 'hip-replacement-india'],
    visaInfo: {
      type: {
        en: 'Indian e-Medical Visa (online within 72 hours)',
        ar: 'تأشيرة طبية إلكترونية (خلال 72 ساعة)',
      },
      processingTime: {
        en: '2 to 3 days',
        ar: '2 إلى 3 أيام',
      },
      requirements: {
        en: ['Russian International Passport', 'Hospital Medical Invitation Letter', 'Medical Summary'],
        ar: ['جواز السفر الروسي الدولي', 'خطاب الدعوة الطبية من المستشفى', 'التقرير الطبي باللغة الإنجليزية'],
      },
      assistanceProvided: {
        en: 'Assistance with English medical summary translation and e-visa issuance.',
        ar: 'المساعدة في ترجمة التقارير الطبية للإنجليزية وإصدار التأشيرة الإلكترونية.',
      },
    },
    flightInfo: {
      en: 'Direct regular flights from Moscow Sheremetyevo (SVO) to Delhi (DEL) via Aeroflot.',
      ar: 'رحلات منتظمة مباشرة من موسكو (SVO) إلى دلهي (DEL) عبر إيروفلوت.',
    },
    languageSupport: {
      en: 'Russian-fluent patient coordinators assigned throughout the hospital stay.',
      ar: 'منسقون يتقنون الروسية يرافقون المريض طوال فترة إقامته بالمستشفى.',
    },
    localWhatsAppNumber: '+919999999999',
    patientStoryIds: [],
  },
];

