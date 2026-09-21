import { Treatment } from '@/types';

export const TREATMENTS: Treatment[] = [
  {
    id: 'kidney-transplant-india',
    slug: 'kidney-transplant-india',
    name: {
      en: 'Kidney Transplant in India',
      ar: 'زراعة الكلى في الهند',
    },
    specialtyId: 'kidney',
    overview: {
      en: 'Kidney transplantation in India is a recognized pathway for international patients with End-Stage Renal Disease (ESRD) seeking advanced surgical expertise, modern laparoscopic donor techniques, and rigorous pre-transplant immunology matching at a fraction of Western healthcare costs.',
      ar: 'تُعد زراعة الكلى في الهند مساراً موثوقاً للمرضى الدوليين المصابين بالفشل الكلوي في مراحله النهائية، حيث توفر مراكز التميز في الهند جراحات استئصال الكلية للمتبرع بالمنظار، وفحوصات تطابق جيني ومناعي فائقة الدقة، ورعاية فائقة الجودة بتكاليف مدروسة ومناسبة.',
    },
    whoRequiresTreatment: {
      en: [
        'Patients with Chronic Kidney Disease Stage 5 (GFR below 15 mL/min)',
        'Individuals experiencing recurring dialysis-related fatigue, cardiovascular strain, or vascular access issues',
        'Patients with diabetic nephropathy, hypertensive glomerulosclerosis, or polycystic kidney disease',
        'International candidates who have an eligible living family donor (first or second-degree relative under legal rules)',
      ],
      ar: [
        'مرضى الفشل الكلوي المزمن في المرحلة الخامسة (معدل الترشيح الكبيبي أقل من 15 مل/دقيقة)',
        'المرضى الخاضعون لجلسات الغسيل الكلوي المنتظم والذين يعانون من مضاعفاته المستمرة',
        'المصابون باعتلال الكلى السكري، أو تصلب الكبيبات الناتج عن ضغط الدم، أو الكلى متعددة الكيسات',
        'المرضى الدوليون الذين لديهم متبرع حي من الأقارب مؤهل طبياً وقانونياً',
      ],
    },
    treatmentOptions: {
      en: [
        'Living Related Donor Kidney Transplant (Standard Gold Standard)',
        'Laparoscopic Donor Nephrectomy (Minimally invasive, allowing donor discharge within 3-4 days)',
        'ABO-Incompatible (Mismatch) Kidney Transplantation via advanced plasmapheresis protocols',
        'Paired Kidney Exchange (Swap Transplantation) under authorized hospital transplant authorization boards',
      ],
      ar: [
        'زراعة الكلى من متبرع حي من الأقارب (المعيار الذهبي الأعلى نجاحاً)',
        'استئصال كلية المتبرع بالمنظار الجراحي (تدخل محدود يسمح بخروج المتبرع خلال 3-4 أيام)',
        'زراعة الكلى مع اختلاف فصيلة الدم عبر بروتوكولات متقدمة لتنقية البلازما',
        'الزراعة التبادلية تحت إشراف اللجان الطبية والقانونية المعتمدة بالمستشفى',
      ],
    },
    hospitalIds: ['shalby-sanar', 'fortis-fmri', 'artemis-gurgaon'],
    doctorIds: ['dr-sanar-kidney-1'],
    costInfo: {
      treatmentSlug: 'kidney-transplant-india',
      procedureName: {
        en: 'Living Donor Kidney Transplant Package',
        ar: 'باقة زراعة الكلى من متبرع حي',
      },
      indicativeRangeUSD: '$12,000 - $16,000 USD',
      hospitalVariationNote: {
        en: 'Costs depend on hospital choice, room category, whether donor and recipient have matching blood groups, and specific post-operative immunosuppressive medications.',
        ar: 'تختلف التكلفة باختلاف المستشفى، وفئة الغرفة، وما إذا كانت فصائل الدم متطابقة أو تحتاج تنقية بلازما، ونوعية أدوية تثبيط المناعة المطلوبة.',
      },
      inclusions: {
        en: [
          'Pre-operative cross-match and HLA tissue typing',
          'Operating theater fees and surgeon fees for both recipient and donor',
          'Standard recipient ICU stay (3-4 days) and room stay (7-10 days)',
          'Donor laparoscopic surgery, ICU stay (1 day) and room stay (3-4 days)',
          'Routine post-transplant monitoring medications during the inpatient period',
        ],
        ar: [
          'فحوصات التطابق النسيجي (HLA) والتطابق التبادلي المسبق',
          'رسوم غرفة العمليات وأتعاب الفريق الجراحي للمريض والمتبرع',
          'إقامة المريض في العناية المركزة (3-4 أيام) وفي الغرفة الخاصة (7-10 أيام)',
          'جراحة المتبرع بالمنظار وإقامته (3-4 أيام)',
          'الأدوية الأساسية لتثبيط المناعة والفحوصات الروتينية أثناء فترة التنويم',
        ],
      },
      exclusions: {
        en: [
          'Management of pre-existing unrelated medical conditions or prolonged ICU stays',
          'Plasmapheresis or rituximab injections in cases of ABO-incompatible transplants',
          'Specialist consultation for unrelated secondary diagnoses',
          'Post-discharge outpatient medications and extended guest-house accommodation',
        ],
        ar: [
          'علاج أي حالات طبية سابقة غير مرتبطة بالزراعة أو الإقامة المطولة بالعناية المركزة',
          'جلسات فصل البلازما أو إبر الريتوكسيماب في حالات عدم تطابق الفصائل',
          'الاستشارات الطبية غير المتعلقة بجراحة الزراعة',
          'أدوية ما بعد الخروج من المستشفى وتكاليف الإقامة الخارجية في الشقق الفندقية',
        ],
      },
      hospitalStayDays: '10 - 14 Days Inpatient (Recipient), 3 - 4 Days (Donor)',
      recoveryDays: '21 - 30 Days Outpatient Observation in India prior to travel clearance',
      lastReviewedDate: '2026-09-21',
      disclaimer: {
        en: 'Indicative estimate only. Actual hospital estimate is provided following in-person clinical and legal evaluation by the hospital authorization committee.',
        ar: 'تقدير استرشادي فقط. يتم إصدار عرض السعر النهائي والمفصل بعد التقييم الطبي والموافقة القانونية من لجنة التبرع بالأعضاء بالمستشفى.',
      },
    },
    hospitalStay: {
      en: 'Recipient: 10 to 14 days in hospital (including 3-4 days in dedicated kidney transplant ICU). Donor: 3 to 4 days.',
      ar: 'المريض: 10 إلى 14 يوماً بالمستشفى (تشمل 3-4 أيام بالعناية المركزة المخصصة لزراعة الكلى). المتبرع: 3 إلى 4 أيام.',
    },
    recoveryTimeline: {
      en: 'Most international patients remain in India for a total of 4 to 6 weeks. After discharge, weekly outpatient blood tests (Creatinine, Tacrolimus levels) monitor graft function before fit-to-fly certificate is granted.',
      ar: 'يقيم معظم المرضى الدوليين في الهند لمدة تتراوح بين 4 إلى 6 أسابيع إجمالاً. بعد الخروج من المستشفى، يتم إجراء فحوصات أسبوعية لمستوى الكرياتينين وتثبيط المناعة قبل منح تصريح السفر الجوي.',
    },
    internationalPatientProcess: {
      en: [
        'Step 1: Free Medical Review of recent kidney function and donor reports by senior transplant surgeons.',
        'Step 2: Issuance of official Medical Visa invitation letter for patient, donor, and 1-2 medical attendants.',
        'Step 3: Airport pickup in Delhi and check-in to vetted nearby patient accommodation or hospital suite.',
        'Step 4: Comprehensive pre-transplant cross-match, cardiology clearance, and Indian Legal Authorization Committee approval.',
        'Step 5: Surgery performed in dual adjoining ultra-clean modular operating theaters.',
        'Step 6: Post-discharge monitoring and continuous coordination for return flight and home follow-up.',
      ],
      ar: [
        'الخطوة 1: تقييم طبي مجاني لتقارير وظائف الكلى وفحوصات المتبرع من قبل كبار استشاريي الزراعة.',
        'الخطوة 2: إصدار خطاب دعوة التأشيرة الطبية الرسمية للمريض والمتبرع والمرافقين.',
        'الخطوة 3: استقبال خاص في مطار دلهي والنقل إلى السكن المريح أو جناح المستشفى.',
        'الخطوة 4: إجراء فحوصات التطابق النهائي وتصريح القلب ومقابلة لجنة الترخيص القانونية الهندية.',
        'الخطوة 5: إجراء الجراحة في غرفتي عمليات متجاورتين مجهزتين بأعلى درجات التعقيم.',
        'الخطوة 6: المتابعة بعد الخروج، وتنسيق تقارير السفر والمتابعة المستمرة عن بعد بعد العودة.',
      ],
    },
    travelAndVisaRequirements: {
      en: 'Requires Indian Medical Visa (MED) for the patient and Medical Attendant Visa (MED-X) for accompanying family members and the donor. Patient must travel with verified legal documentation proving family relationship (birth certificates, marriage certificates, family tree book certified by home ministry of foreign affairs).',
      ar: 'يتطلب الحصول على تأشيرة طبية هندية (MED) للمريض وتأشيرة مرافق طبي (MED-X) للمتبرع والمرافقين. يجب إحضار وثائق إثبات صلة القرابة مصدقة أصولاً من وزارة خارجية بلد المريض.',
    },
    patientStoryIds: ['story-kidney-uzbekistan'],
    faqs: [
      {
        question: {
          en: 'Can an international patient receive a kidney from an Indian donor or deceased donor?',
          ar: 'هل يمكن للمريض الأجنبي الحصول على كلية من متبرع هندي أو متبرع متوفى؟',
        },
        answer: {
          en: 'No. Under the Indian Transplantation of Human Organs and Tissues Act (THOTA), commercial organ buying/selling is strictly prohibited. International patients MUST bring their own legally verified living family donor from their home country.',
          ar: 'لا، يمنع القانون الهندي لنقل وزراعة الأعضاء البشرية منعاً باتاً تجارة الأعضاء. يجب على المريض الدولي إحضار متبرع حي من أفراد عائلته وأقاربه من بلده الأصلي مصحوباً بالوثائق الرسمية.',
        },
      },
      {
        question: {
          en: 'How long must we stay in India after the kidney transplant surgery?',
          ar: 'كم المدة التي يجب أن نقضيها في الهند بعد إجراء زراعة الكلى؟',
        },
        answer: {
          en: 'The recommended total stay in India is approximately 4 to 6 weeks. This allows 1-2 weeks for pre-operative clearance and legal approval, approximately 10-14 days in the hospital, and 2-3 weeks of outpatient recovery and medication titration before flying back.',
          ar: 'تتراوح المدة الموصى بها بين 4 إلى 6 أسابيع إجمالاً. يخصص منها أسبوع للفحوصات واللجنة القانونية، وحوالي أسبوعين داخل المستشفى، وأسبوعين إلى 3 أسابيع للمتابعة وضبط جرعات الأدوية قبل السفر.',
        },
      },
    ],
    medicalDisclaimer: {
      en: 'Clinical evaluation, donor compatibility tests, and approval by the statutory Hospital Authorization Committee are mandatory before any organ transplant surgery in India. Baxtiyor Healthcare facilitates coordination and logistics; all clinical procedures are conducted exclusively by authorized hospital teams.',
      ar: 'التقييم السريري وفحوصات التوافق والموافقة القانونية من لجنة التبرع بالمستشفى متطلبات إلزامية قبل إجراء أي زراعة أعضاء في الهند. تقوم بختيار للرعاية الصحية بالتنسيق والخدمات اللوجستية، وتُجرى كافة الإجراءات حصرياً من قبل الفرق الطبية المعتمدة بالمستشفيات.',
    },
    sources: [
      { title: 'The Transplantation of Human Organs and Tissues Act (THOTA), Ministry of Health & Family Welfare, India', organization: 'Govt. of India' },
      { title: 'Kidney Disease: Improving Global Outcomes (KDIGO) Clinical Practice Guideline for Transplant Candidates', organization: 'KDIGO' },
    ],
  },
  {
    id: 'liver-transplant-india',
    slug: 'liver-transplant-india',
    name: {
      en: 'Living Donor Liver Transplant in India',
      ar: 'زراعة الكبد من متبرع حي في الهند',
    },
    specialtyId: 'liver',
    overview: {
      en: 'India is one of the world leaders in living donor liver transplantation (LDLT), performing hundreds of successful adult and pediatric transplants annually. International patients benefit from high-volume transplant surgical teams and dedicated hepatobiliary intensive care units.',
      ar: 'تُعد الهند من بين أبرز دول العالم في جراحات زراعة الكبد من متبرع حي، حيث تجري مئات العمليات سنوياً للأطفال والبالغين. يستفيد المرضى الدوليون من خبرات جراحية استثنائية ووحدات عناية مركزة متخصصة للكبد.',
    },
    whoRequiresTreatment: {
      en: [
        'End-stage liver disease / decompensated cirrhosis (ascites, recurrent encephalopathy, variceal bleeding)',
        'Early-stage Hepatocellular Carcinoma (HCC) meeting Milan or UCSF criteria',
        'Acute liver failure unresponsive to intensive medical support',
        'Pediatric biliary atresia or genetic metabolic liver conditions',
      ],
      ar: [
        'تليف الكبد المتقدم والمضاعف (الاستسقاء، الغيبوبة الكبدية المتكررة، نزيف دوالي المريء)',
        'أورام الكبد الأولية (سرطان الخلايا الكبدية) المتوافقة مع معايير ميلان الطبية',
        'الفشل الكبدي الحاد غير المستجيب للعلاج التحفظي المكثف',
        'الأطفال المصابون بانسداد القنوات الصفراوية الخلقي أو الأمراض الاستقلابية',
      ],
    },
    treatmentOptions: {
      en: [
        'Adult-to-Adult Living Donor Liver Transplant (Right Lobe Graft)',
        'Adult-to-Child Living Donor Liver Transplant (Left Lateral Segment)',
        'Laparoscopic / Robotic Donor Hepatectomy for accelerated donor healing',
        'Transarterial Chemoembolization (TACE) downstaging prior to transplant',
      ],
      ar: [
        'زراعة الكبد للبالغين من متبرع حي (استئصال الفص الأيمن من كبد المتبرع)',
        'زراعة الكبد للأطفال من متبرع حي (استئصال الجزء الأيسر الجانبي)',
        'استئصال كبد المتبرع بالمنظار الجراحي أو الروبوت لسرعة تعافي المتبرع',
        'العلاج التداخلي للقسطرة الكبدية (TACE) للسيطرة على الورم قبل الزراعة',
      ],
    },
    hospitalIds: ['artemis-gurgaon', 'fortis-fmri', 'shalby-sanar'],
    doctorIds: ['dr-artemis-liver-1'],
    costInfo: {
      treatmentSlug: 'liver-transplant-india',
      procedureName: {
        en: 'Living Donor Liver Transplant Package',
        ar: 'باقة زراعة الكبد من متبرع حي',
      },
      indicativeRangeUSD: '$25,000 - $32,000 USD',
      hospitalVariationNote: {
        en: 'Covers comprehensive recipient surgery and donor hepatectomy. Variations occur based on patient severity (MELD score), pre-existing infections, and length of specialized transplant ICU care.',
        ar: 'تشمل الجراحة الكاملة للمتلقي واستئصال جزء من كبد المتبرع. تختلف التكلفة حسب درجة تدهور وظائف الكبد (مقياس MELD)، والعدوى المسبقة، ومدة العناية المركزة.',
      },
      inclusions: {
        en: [
          'Pre-transplant CT volumetry and donor liver vascular mapping',
          'Surgical team fees for simultaneous donor and recipient operations',
          'Donor hospital stay (7-10 days) including ICU',
          'Recipient hospital stay (18-22 days) including specialized Liver ICU (7-10 days)',
          'Essential intraoperative blood products and initial immunosuppressive drugs',
        ],
        ar: [
          'الأشعة المقطعية لحساب حجم الكبد والتخطيط الوعائي لكبد المتبرع',
          'أتعاب الفريق الجراحي للعمليتين المتزامنتين للمريض والمتبرع',
          'إقامة المتبرع (7-10 أيام) متضمنة العناية المركزة',
          'إقامة المريض (18-22 يوماً) متضمنة العناية المركزة المتخصصة للكبد (7-10 أيام)',
          'مشتقات الدم الأساسية أثناء العملية وأدوية تثبيط المناعة التأسيسية',
        ],
      },
      exclusions: {
        en: [
          'Treatment for severe active sepsis or acute fungal infections requiring prolonged mechanical ventilation',
          'Extracorporeal liver support (MARS/dialysis) if required before surgery',
          'Extended hotel apartment stay for outpatient recovery',
        ],
        ar: [
          'علاج التسمم الدموي الشديد أو العدوى الفطرية التي تتطلب أجهزة تنفس صناعي لفترات ممتدة',
          'أجهزة دعم الكبد المؤقتة (غسيل الكبد MARS) إن استدعت الحالة قبل الجراحة',
          'تكاليف الإقامة الفندقية الخارجية خلال فترة النقاهة',
        ],
      },
      hospitalStayDays: '18 - 22 Days Inpatient (Recipient), 7 - 10 Days (Donor)',
      recoveryDays: '6 - 8 Weeks Total Stay in India',
      lastReviewedDate: '2026-09-21',
      disclaimer: {
        en: 'Costs are indicative. Formal estimates require review of the patient’s MELD score, clinical history, and donor match confirmation.',
        ar: 'الأسعار تقريبية واسترشادية. يتطلب العرض النهائي مراجعة تقارير المريض وحساب مقياس MELD وتقييم المتبرع.',
      },
    },
    hospitalStay: {
      en: 'Recipient: 18 to 22 days (7-10 days in Liver ICU). Donor: 7 to 10 days.',
      ar: 'المريض: 18 إلى 22 يوماً (7-10 أيام في عناية الكبد المركزة). المتبرع: 7 إلى 10 أيام.',
    },
    recoveryTimeline: {
      en: 'Donor recovers normal liver volume through natural regeneration within 6-8 weeks. Recipient requires outpatient blood and imaging follow-up for 4 to 6 weeks post-discharge before returning home.',
      ar: 'يستعيد كبد المتبرع حجمه الطبيعي بالكامل خلال 6 إلى 8 أسابيع بفضل قدرة الكبد الفائقة على التجدد. يحتاج المريض لفترة متابعة خارجية مدتها 4-6 أسابيع بعد الخروج قبل السفر.',
    },
    internationalPatientProcess: {
      en: [
        'Step 1: Rapid review of Liver Function Tests (LFTs), viral markers, and CT Triphasic scans by the Transplant Board.',
        'Step 2: Issuance of prioritized Medical Visa invitation letters.',
        'Step 3: Transfer from airport directly to hospital for donor volumetric evaluation and recipient stabilization.',
        'Step 4: Statutory Legal Authorization Committee review.',
        'Step 5: High-precision microsurgical transplantation.',
        'Step 6: Gradual medication tapering and post-transplant health clearance.',
      ],
      ar: [
        'الخطوة 1: تقييم عاجل لوظائف الكبد، والفيروسات، والأشعة المقطعية ثلاثية المراحل من لجنة الزراعة.',
        'الخطوة 2: إصدار خطابات دعوة التأشيرة الطبية العاجلة للمريض والمتبرع.',
        'الخطوة 3: استقبال خاص من المطار إلى المستشفى للتقييم الحجمي لكبد المتبرع واستقرار حالة المريض.',
        'الخطوة 4: المقابلة الرسمية للجنة الأخلاقيات والترخيص القانوني.',
        'الخطوة 5: إجراء الجراحة الميكروسكوبية الدقيقة لنقل الفص الكبدي وإعادة توصيل الأوعية والقنوات.',
        'الخطوة 6: ضبط جرعات الأدوية ومتابعة التعافي قبل إصدار شهادة اللياقة للسفر.',
      ],
    },
    travelAndVisaRequirements: {
      en: 'Medical Visa (MED) required. Certified relationship proof (government-attested family record) between donor and patient is legally mandatory.',
      ar: 'تأشيرة علاجية (MED) مطلوبة. وثائق صلة قرابة رسمية مصدقة من الجهات الحكومية في بلد المريض إلزامية قانوناً.',
    },
    patientStoryIds: [],
    faqs: [
      {
        question: {
          en: 'Is the liver donor safe after donating part of their liver?',
          ar: 'هل المتبرع بجزء من كبده في أمان بعد التبرع؟',
        },
        answer: {
          en: 'Yes. Donor safety is the absolute primary ethical priority. The human liver possesses a unique ability to regenerate. The remaining liver in the donor regenerates back to approximately 90-100% of its original volume within 6 to 8 weeks without lasting loss of liver function.',
          ar: 'نعم، سلامة المتبرع هي الأولوية القصوى المطلقة للفريق الجراحي. يتميز الكبد البشري بقدرة فريدة على التجدد السريع، حيث يعود كبد المتبرع لحجمه الطبيعي الكامل تقريباً خلال 6 إلى 8 أسابيع دون أي تأثير دائم على صحته.',
        },
      },
    ],
    medicalDisclaimer: {
      en: 'Liver transplantation is a major tertiary surgical intervention. Suitability is determined strictly through in-depth pre-operative clinical workups and independent legal board sanction.',
      ar: 'زراعة الكبد جراحة كبرى تتطلب تقييماً طبياً دقيقاً وشاملاً لكلا الطرفين وموافقة اللجان القانونية المستقلة قبل الشروع في أي خطوة جراحية.',
    },
    sources: [
      { title: 'AASLD Practice Guidelines: Liver Transplantation', organization: 'American Association for the Study of Liver Diseases' },
      { title: 'Indian THOTA Rules & Guidelines for Living Donor Transplants', organization: 'National Organ & Tissue Transplant Organisation (NOTTO)' },
    ],
  },
  {
    id: 'heart-surgery-india',
    slug: 'heart-surgery-india',
    name: {
      en: 'Heart Bypass & Valve Surgery in India',
      ar: 'جراحة القلب المفتوح واستبدال الصمامات في الهند',
    },
    specialtyId: 'cardiology',
    overview: {
      en: 'Cardiothoracic surgical programs at leading Indian centers offer advanced beating-heart bypass grafting (CABG), minimally invasive heart valve replacements (MVR/AVR/TAVI), and complex pediatric cardiac corrections, combining high clinical volumes with internationally benchmarked outcomes.',
      ar: 'تقدم أقسام جراحة القلب والصدر في المراكز الهندية الرائدة عمليات مجازة الشريان التاجي على القلب النابض (CABG)، واستبدال صمامات القلب بالتدخل المحدود، وعلاج تشوهات قلب الأطفال، مع تحقيق نسب نجاح تضاهي أفضل المستشفيات العالمية.',
    },
    whoRequiresTreatment: {
      en: [
        'Patients with multi-vessel coronary artery disease not suitable for standard stenting',
        'Severe aortic or mitral stenosis or regurgitation causing dyspnea and ventricular strain',
        'Complex congenital cardiac anomalies in pediatric and adult patients (e.g. ASD, VSD, Tetralogy of Fallot)',
        'Left main coronary disease requiring urgent revascularization',
      ],
      ar: [
        'مرضى انسداد الشرايين التاجية المتعددة غير الملائمة لتركيب الدعامات العادية',
        'تضيق أو ارتجاع شديد في الصمام الأبهري أو التاجي يسبب ضيق التنفس وضعف عضلة القلب',
        'تشوهات القلب الخلقية للأطفال والبالغين (مثل ثقوب القلب ورباعية فالوت)',
        'تضيق الجذع الرئيسي للشريان التاجي الأيسر الذي يستدعي جراحة عاجلة',
      ],
    },
    treatmentOptions: {
      en: [
        'Off-Pump Coronary Artery Bypass Grafting (Beating Heart CABG)',
        'Minimally Invasive Direct Coronary Artery Bypass (MIDCAB)',
        'Transcatheter Aortic Valve Implantation (TAVI / TAVR)',
        'Mechanical or Bioprosthetic Heart Valve Replacement',
      ],
      ar: [
        'جراحة مجازة الشريان التاجي على القلب النابض بدون ماكينة قلب ورئة صناعية',
        'جراحة الشريان التاجي بالتدخل المحدود (MIDCAB) عبر شق جانبي صغير',
        'زراعة الصمام الأبهري عبر القسطرة (TAVI / TAVR) بدون جراحة مفتوحة',
        'استبدال الصمامات بصمامات ميكانيكية أو بيولوجية متطورة',
      ],
    },
    hospitalIds: ['fortis-fmri', 'artemis-gurgaon', 'marengo-asia'],
    doctorIds: ['dr-fortis-cardiac-1'],
    costInfo: {
      treatmentSlug: 'heart-surgery-india',
      procedureName: {
        en: 'CABG / Valve Replacement Package',
        ar: 'باقة جراحة مجازة الشريان التاجي / استبدال الصمام',
      },
      indicativeRangeUSD: '$4,500 - $7,500 USD',
      hospitalVariationNote: {
        en: 'Costs vary depending on whether the procedure involves standard CABG, multiple valve replacements, or catheter-based TAVI valves (which involve higher implant costs).',
        ar: 'تختلف التكلفة حسب ما إذا كانت العملية مجازة تاجية تقليدية أو استبدال صمامات متعددة أو زراعة عبر القسطرة (TAVI) التي تتضمن تكلفة صمام خاص.',
      },
      inclusions: {
        en: [
          'Pre-operative cardiac diagnostics (Echocardiogram, CT Angio if needed)',
          'Surgeon, perfusionist, and cardiac anesthesiologist fees',
          'ICU stay (2-3 days) and private cardiac room stay (4-5 days)',
          'Standard disposables, arterial/venous harvesting, and recovery telemetry',
        ],
        ar: [
          'الفحوصات التمهيدية (إيكو القلب، قسطرة تشخيصية، أشعة مقطعية)',
          'أتعاب الجراح وطبيب التخدير وأخصائي التروية الدموية',
          'الإقامة بالعناية المركزة للقلب (2-3 أيام) والغرفة الخاصة (4-5 أيام)',
          'المستهلكات الجراحية وأجهزة مراقبة وتخطيط القلب أثناء التنويم',
        ],
      },
      exclusions: {
        en: [
          'Specialized percutaneous TAVI valve implants (billed separately based on manufacturer)',
          'Extended ICU stays due to severe pulmonary or vascular comorbidities',
          'Personal guest house lodging post-discharge',
        ],
        ar: [
          'صمامات TAVI الخاصة بالقسطرة (تُحسب تكلفتها المستقلة حسب الشركة المصنعة)',
          'الإقامة المطولة بالعناية المركزة نتيجة مضاعفات رئوية أو كلوية سابقة',
          'تكاليف السكن الخارجي للمرافقين بعد الخروج من المستشفى',
        ],
      },
      hospitalStayDays: '6 - 8 Days Inpatient',
      recoveryDays: '14 - 21 Days Total Stay in India',
      lastReviewedDate: '2026-09-21',
      disclaimer: {
        en: 'Indicative pricing. Confirmed treatment packages are provided after reviewing recent coronary angiogram films and echocardiogram reports.',
        ar: 'الأسعار استرشادية. يتم توفير باقة السعر المؤكدة بعد مراجعة أفلام القسطرة التاجية وتقارير الإيكو الحديثة.',
      },
    },
    hospitalStay: {
      en: '6 to 8 days in hospital (including 2-3 days in the dedicated Cardiac ICU).',
      ar: '6 إلى 8 أيام بالمستشفى (تشمل 2-3 أيام في العناية المركزة لجراحة القلب).',
    },
    recoveryTimeline: {
      en: 'Patients are encouraged to walk within 48 hours post-op. A post-discharge rest period of 10 to 14 days in Gurgaon is required before travel clearance for commercial flights.',
      ar: 'يبدأ المريض بالمشي الخفيف خلال 48 ساعة بعد الجراحة. يحتاج المريض للإقامة في جورجاون لمدة 10-14 يوماً بعد الخروج قبل الحصول على تصريح السفر الجوي.',
    },
    internationalPatientProcess: {
      en: [
        'Step 1: Send recent Angiography CD/link and 2D Echo report for expert surgeon evaluation.',
        'Step 2: Receive medical opinion with treatment approach (Beating Heart CABG vs Stenting vs Valve Repair).',
        'Step 3: Medical Visa assistance and airport pickup in Delhi NCR.',
        'Step 4: Admission and pre-anesthesia clearance.',
        'Step 5: Surgical procedure and dedicated cardiac rehabilitation monitoring.',
        'Step 6: Fit-to-fly review and comprehensive prescription handover.',
      ],
      ar: [
        'الخطوة 1: إرسال رابط أو قرص القسطرة التشخيصية وتقرير الإيكو لتقييم كبار جراحي القلب.',
        'الخطوة 2: استلام الرأي الطبي المحدد للخطة الجراحية الأنسب.',
        'الخطوة 3: استخراج التأشيرة العلاجية والاستقبال من مطار دلهي.',
        'الخطوة 4: التنويم بالمستشفى وإجراء فحوصات ما قبل التخدير.',
        'الخطوة 5: إجراء العملية وبدء برنامج إعادة التأهيل القلبي المبكر.',
        'الخطوة 6: فحص اللياقة للطيران واستلام التقرير الطبي المفصل وخطة الأدوية.',
      ],
    },
    travelAndVisaRequirements: {
      en: 'Indian Medical Visa (MED) required. Attendant visa (MED-X) for accompanying relatives.',
      ar: 'تأشيرة علاجية هندية (MED) للمريض ومرافق طبي (MED-X) للأقارب المرافقين.',
    },
    patientStoryIds: ['story-heart-oman'],
    faqs: [
      {
        question: {
          en: 'What is off-pump beating-heart surgery and why is it preferred?',
          ar: 'ما هي جراحة القلب المفتوح على القلب النابض (Off-Pump) ولماذا تُفضل؟',
        },
        answer: {
          en: 'In beating-heart CABG, surgeons perform bypass grafts while the heart continues to beat naturally, using advanced stabilization devices. This avoids stopping the heart and connecting to a heart-lung machine, significantly lowering the risk of stroke, kidney strain, and systemic inflammation.',
          ar: 'في جراحة القلب النابض، يقوم الجراح بتوصيل الشرايين التاجية بينما يستمر القلب بالنبض طبيعياً باستخدام مثبتات دقيقة، دون الحاجة لإيقاف القلب واستخدام ماكينة القلب والرئة الصناعية، مما يقلل بشكل كبير من مخاطر الجلطات الدماغية والإجهاد الكلوي.',
        },
      },
    ],
    medicalDisclaimer: {
      en: 'Surgical indications and technique choices depend on coronary anatomy, left ventricular ejection fraction, and overall clinical condition.',
      ar: 'تعتمد دواعي الجراحة ونوعية التقنية المستخدمة على التشريح الدقيق للشرايين التاجية وكفاءة عضلة القلب والحالة العامة للمريض.',
    },
    sources: [
      { title: 'ACC/AHA Guideline for Coronary Artery Revascularization', organization: 'American College of Cardiology / American Heart Association' },
      { title: 'ESC/EACTS Guidelines on Myocardial Revascularization', organization: 'European Society of Cardiology' },
    ],
  },
  {
    id: 'hip-replacement-india',
    slug: 'hip-replacement-india',
    name: {
      en: 'Hip Replacement Surgery in India',
      ar: 'جراحة استبدال مفصل الورك في الهند',
    },
    specialtyId: 'orthopedics',
    overview: {
      en: 'Total hip replacement (arthroplasty) and revision hip surgeries in India utilize cutting-edge robotic navigation, high-durability ceramic and titanium implants from leading international manufacturers, and rapid rehabilitation protocols for long-term mobility.',
      ar: 'تستخدم جراحات استبدال مفصل الورك (الكامل والنصفي) في الهند أحدث تقنيات الملاحة بالروبوت، ومفاصل السيراميك والتيتانيوم عالية التحمل من كبرى الشركات العالمية، مع برامج تأهيل سريعة لاستعادة الحركة الطبيعية بدون ألم.',
    },
    whoRequiresTreatment: {
      en: [
        'Severe osteoarthritis of the hip with joint space obliteration',
        'Avascular Necrosis (AVN) of the femoral head (common in young adults)',
        'Ankylosing spondylitis with fused or severely painful hip joints',
        'Post-traumatic arthritis or failed previous hip fixation',
      ],
      ar: [
        'خشونة وتآكل مفصل الورك الشديد مع صعوبة المشي والحركة',
        'النخر اللاوعائي (تنخر رأس عظمة الفخذ AVN) الشائع لدى فئة الشباب',
        'التهاب الفقار اللاصق المصحوب بتيبس وألم شديد في مفاصل الورك',
        'التهابات المفاصل الناتجة عن كسور قديمة أو فشل عمليات التثبيت السابقة',
      ],
    },
    treatmentOptions: {
      en: [
        'Total Hip Arthroplasty (Ceramic-on-Polyethylene or Ceramic-on-Ceramic)',
        'Direct Anterior Minimally Invasive Hip Replacement (Muscle-sparing)',
        'Robotic-Assisted Total Hip Replacement',
        'Complex Revision Hip Arthroplasty for loosened or infected implants',
      ],
      ar: [
        'استبدال مفصل الورك الكامل بمفاصل سيراميك عالية التحمل',
        'استبدال الورك عبر التدخل المحدود من المدخل الأمامي المباشر للمحافظة على العضلات',
        'استبدال مفصل الورك بمساعدة الروبوت الجراحي',
        'جراحات تبديل المفاصل المراجعة لتغيير المفاصل القديمة المتآكلة أو المرتخية',
      ],
    },
    hospitalIds: ['artemis-gurgaon', 'shalby-sanar', 'fortis-fmri'],
    doctorIds: ['dr-artemis-ortho-1'],
    costInfo: {
      treatmentSlug: 'hip-replacement-india',
      procedureName: {
        en: 'Total Hip Replacement Package (Unilateral)',
        ar: 'باقة استبدال مفصل الورك الكامل (جانب واحد)',
      },
      indicativeRangeUSD: '$4,800 - $7,200 USD',
      hospitalVariationNote: {
        en: 'Cost depends on implant brand (Stryker, DePuy, Zimmer Biomet), bearing surface (ceramic vs poly), and whether robotic assistance is chosen.',
        ar: 'تختلف التكلفة حسب نوع الماركة العالمية للمفصل (سترايكر، ديبوي، زيمر)، ونوع سطح المفصل (سيراميك كامل)، واستخدام الروبوت.',
      },
      inclusions: {
        en: [
          'High-grade internationally certified hip implant (Ceramic/Titanium)',
          'Surgeon and orthopedic team fees',
          'Hospital room stay (4-5 days) with physiotherapy sessions',
          'Standard post-operative medicines, X-rays, and anti-DVT prophylaxis',
        ],
        ar: [
          'مفصل ورك معتمد دولياً من أعلى درجات السيراميك والتيتانيوم',
          'أتعاب جراح العظام والفريق الطبي المتخصص',
          'إقامة بالمستشفى (4-5 أيام) مع جلسات علاج طبيعي يومية',
          'الأدوية ومضادات التخثر وأشعة المتابعة أثناء التنويم',
        ],
      },
      exclusions: {
        en: [
          'Bilateral simultaneous hip replacement (quoted under dual package)',
          'Custom trabecular metal augments in severe revision bone loss cases',
          'Outpatient rehabilitation beyond hospital discharge',
        ],
        ar: [
          'استبدال كلا المفصلين في نفس الجلسة (يخضع لباقة مخصصة)',
          'دعامات العظام التعويضية المعقدة في حالات التآكل العظمي الشديد',
          'جلسات العلاج الطبيعي الخارجية بعد مغادرة المستشفى',
        ],
      },
      hospitalStayDays: '4 - 5 Days Inpatient',
      recoveryDays: '14 - 18 Days Total Stay in India',
      lastReviewedDate: '2026-09-21',
      disclaimer: {
        en: 'Indicative estimate. Final surgical plan and implant specifications are determined based on weight-bearing pelvic radiographs and clinical mobility assessment.',
        ar: 'تقدير استرشادي. يتم تحديد نوعية المفصل الدقيقة والخطة الجراحية بعد فحص الأشعة السينية للحوض وتقييم المدى الحركي للمريض.',
      },
    },
    hospitalStay: {
      en: '4 to 5 days in hospital with active in-room physical therapy starting on Day 1.',
      ar: '4 إلى 5 أيام بالمستشفى مع بدء جلسات العلاج الطبيعي والحركة من اليوم الأول للجراحة.',
    },
    recoveryTimeline: {
      en: 'Patients walk with a support frame on Day 1-2. By Day 10-14, most patients transition to a single cane or independent walking, enabling safe commercial flight travel.',
      ar: 'يبدأ المريض بالوقوف والمشي بمساعدة المشاية في اليوم الأول أو الثاني، وبحلول اليوم 10-14 يتمكن معظم المرضى من المشي بعصا واحدة أو باستقلالية تامة مما يتيح السفر بأمان.',
    },
    internationalPatientProcess: {
      en: [
        'Step 1: Upload pelvis AP and lateral X-rays for orthopedic review.',
        'Step 2: Receive surgeon analysis and implant recommendations.',
        'Step 3: Medical Visa clearance and arrival in Delhi NCR.',
        'Step 4: Pre-operative CT scan for 3D robotic planning.',
        'Step 5: Arthroplasty surgery with rapid mobility protocol.',
        'Step 6: Suture line check and international travel clearance.',
      ],
      ar: [
        'الخطوة 1: رفع صور الأشعة السينية للورك والحوض لتقييم استشاريي العظام.',
        'الخطوة 2: استلام تقرير الطبيب وتحديد خيارات المفاصل الملائمة.',
        'الخطوة 3: استخراج التأشيرة الطبية والاستقبال في دلهي.',
        'الخطوة 4: إجراء أشعة مقطعية للتخطيط ثلاثي الأبعاد لجراحة الروبوت.',
        'الخطوة 5: إجراء الجراحة وبدء برنامج التأهيل الحركي السريع.',
        'الخطوة 6: فحص الجرح والتأكد من التئامه ومنح تصريح السفر.',
      ],
    },
    travelAndVisaRequirements: {
      en: 'Indian Medical Visa required. Wheelchair airport assistance arranged upon request for the flight.',
      ar: 'تأشيرة طبية هندية مطلوبة. يتم التنسيق لتوفير كرسي متحرك بالمطار أثناء السفر.',
    },
    patientStoryIds: [],
    faqs: [
      {
        question: {
          en: 'How long do modern ceramic hip implants last?',
          ar: 'كم تدوم مفاصل الورك السيراميكية الحديثة؟',
        },
        answer: {
          en: 'Modern fourth-generation ceramic-on-ceramic or ceramic-on-crosslinked-polyethylene implants are engineered for extreme durability and wear resistance. Clinical registry studies show that over 90-95% of these implants continue to function excellently for 20 to 25+ years under standard physical activity.',
          ar: 'تتميز مفاصل السيراميك الحديثة من الجيل الرابع بمقاومة استثنائية للتآكل. وتؤكد السجلات الطبية العالمية أن أكثر من 90-95% من هذه المفاصل تستمر في أداء وظيفتها بكفاءة عالية لمدة تتراوح بين 20 إلى أكثر من 25 عاماً مع النشاط الطبيعي.',
        },
      },
    ],
    medicalDisclaimer: {
      en: 'Implant longevity and functional recovery depend on individual patient weight, bone density, compliance with rehabilitation exercises, and physiological conditions.',
      ar: 'يعتمد عمر المفصل ومدى استعادة الحركة على وزن المريض، وكثافة العظام، والالتزام بتعليمات العلاج الطبيعي والحالة الصحية العامة.',
    },
    sources: [
      { title: 'AAOS Clinical Practice Guidelines for Total Hip Arthroplasty', organization: 'American Academy of Orthopaedic Surgeons' },
      { title: 'National Joint Registry Outcomes Report', organization: 'NJR' },
    ],
  },
  {
    id: 'knee-replacement-india',
    slug: 'knee-replacement-india',
    name: {
      en: 'Robotic Knee Replacement in India',
      ar: 'استبدال مفصل الركبة بالروبوت في الهند',
    },
    specialtyId: 'orthopedics',
    overview: {
      en: 'Robotic total and partial knee replacement in India delivers sub-millimeter surgical accuracy, optimal soft-tissue balancing, minimized bone resection, and significantly faster functional recovery for international patients suffering from advanced osteoarthritis.',
      ar: 'توفر جراحات استبدال مفصل الركبة (الكامل والجزئي) بالروبوت في الهند دقة جراحية متناهية بأجزاء المليمتر، وموازنة مثالية للأربطة، وتقليلاً للقطع العظمي، مما يتيح تعافياً أسرع وحركة طبيعية للمرضى المصابين بخشونة الركبة المتقدمة.',
    },
    whoRequiresTreatment: {
      en: [
        'Severe tricompartmental osteoarthritis of the knee with severe pain at rest or weight-bearing',
        'Severe varus or valgus deformity (bowlegs or knock-knees) secondary to arthritis',
        'Failure of conservative therapies including injections, medications, and physical therapy',
        'Significant functional impairment preventing daily prayer, walking, or stairs',
      ],
      ar: [
        'خشونة الركبة الشديدة في الحجرات الثلاث المصحوبة بألم مستمر عند الوقوف أو الراحة',
        'تقوس الساقين الشديد الناتج عن تآكل غضاريف الركبة',
        'عدم الاستجابة للعلاجات التحفظية كالحقن والأدوية والعلاج الطبيعي',
        'صعوبة شديدة في أداء الأنشطة اليومية والصلاة وصعود الدرج',
      ],
    },
    treatmentOptions: {
      en: [
        'Robotic Total Knee Replacement (TKR) with custom ligament tensioning',
        'Unicondylar (Partial) Knee Replacement for isolated medial or lateral wear',
        'Bilateral Knee Replacement (performed staged or simultaneously based on cardiac fitness)',
        'Complex Revision Total Knee Arthroplasty for worn implants',
      ],
      ar: [
        'استبدال الركبة الكامل بالروبوت مع ضبط دقيق لشد الأربطة',
        'استبدال الركبة الجزئي عند اقتصار التآكل على جانب واحد من المفصل',
        'استبدال الركبتين معاً (يُجرى في نفس الجلسة أو بفارق أيام حسب اللياقة القلبية)',
        'جراحات مراجعة الركبة لتبديل المفاصل الصناعية القديمة',
      ],
    },
    hospitalIds: ['artemis-gurgaon', 'shalby-sanar', 'fortis-fmri'],
    doctorIds: ['dr-artemis-ortho-1'],
    costInfo: {
      treatmentSlug: 'knee-replacement-india',
      procedureName: {
        en: 'Robotic Total Knee Replacement (Single Knee)',
        ar: 'باقة استبدال الركبة بالروبوت (ركبة واحدة)',
      },
      indicativeRangeUSD: '$4,200 - $6,500 USD',
      hospitalVariationNote: {
        en: 'Bilateral knee replacement is typically available under bundled rates ($7,500 - $10,500 USD for both knees).',
        ar: 'تتوفر عمليات استبدال كلا الركبتين ضمن باقات مجمعة مخفضة (حوالي 7,500 إلى 10,500 دولار لكلا الركبتين).',
      },
      inclusions: {
        en: [
          'FDA-approved international implant system',
          'Robotic surgical console software licensing and consumables',
          'Inpatient stay (4-5 days) with active daily physiotherapy',
          'Pain management protocol including nerve blocks for painless recovery',
        ],
        ar: [
          'مفصل صناعي معتمد من هيئة الغذاء والدواء الأمريكية (FDA)',
          'برمجيات ومستهلكات الروبوت الجراحي عالي الدقة',
          'إقامة بالمستشفى (4-5 أيام) مع علاج طبيعي مكثف',
          'بروتوكول التحكم في الألم وإحصار الأعصاب الموضعي لتعافٍ خالٍ من الألم',
        ],
      },
      exclusions: {
        en: [
          'Custom hinged revision implants in severe collateral ligament insufficiency',
          'Prolonged hotel physiotherapy beyond planned discharge',
        ],
        ar: [
          'المفاصل المفصلية المعقدة الخاصة بحالات الارتخاء الشديد للأربطة الجانبية',
          'جلسات العلاج الطبيعي الإضافية بالفندق بعد انتهاء البرنامج الأساسي',
        ],
      },
      hospitalStayDays: '4 - 5 Days Inpatient',
      recoveryDays: '14 - 18 Days Total Stay in India',
      lastReviewedDate: '2026-09-21',
      disclaimer: {
        en: 'Indicative package. Suitability for single vs bilateral simultaneous surgery requires cardiologist clearance.',
        ar: 'سعر استرشادي. تحديد إجراء الركبة الواحدة أو كلا الركبتين معاً يتطلب فحص لياقة القلب والأوعية الدموية.',
      },
    },
    hospitalStay: {
      en: '4 to 5 days in hospital with early assisted mobilization.',
      ar: '4 إلى 5 أيام بالمستشفى مع بدء الحركة والمشي بمساعدة في اليوم الأول.',
    },
    recoveryTimeline: {
      en: 'Robotic assistance allows earlier knee bending (up to 110-120 degrees) within 1-2 weeks. Most patients achieve independent unassisted walking before flying home.',
      ar: 'تتيح دقة الروبوت ثني الركبة لزاوية 110-120 درجة خلال أسبوعين. يتمكن معظم المرضى من المشي باستقلالية قبل موعد العودة لبلدهم.',
    },
    internationalPatientProcess: {
      en: [
        'Step 1: Share knee weight-bearing X-rays.',
        'Step 2: Surgeon review determining single vs bilateral suitability.',
        'Step 3: Visa clearance and arrival.',
        'Step 4: Robotic mapping and computer planning.',
        'Step 5: Robotic precision joint replacement.',
        'Step 6: Rehabilitation and discharge.',
      ],
      ar: [
        'الخطوة 1: إرسال صور أشعة الركبة السينية في وضعية الوقوف.',
        'الخطوة 2: تقييم الجراح وتحديد ملاءمة إجراء ركبة واحدة أو الاثنتين معاً.',
        'الخطوة 3: استخراج التأشيرة الطبية والوصول للهند.',
        'الخطوة 4: التخطيط الرقمي وبرمجة ذراع الروبوت الجراحي.',
        'الخطوة 5: إجراء العملية بدقة متناهية للحفاظ على العظام والأنسجة.',
        'الخطوة 6: برنامج العلاج الطبيعي واستلام تقرير السفر.',
      ],
    },
    travelAndVisaRequirements: {
      en: 'Indian Medical Visa required. Wheelchair flight transit pre-booked.',
      ar: 'تأشيرة علاجية هندية مطلوبة مع ترتيب خدمة الكرسي المتحرك للطيران.',
    },
    patientStoryIds: ['story-knee-kazakhstan'],
    faqs: [
      {
        question: {
          en: 'Why choose robotic knee replacement over conventional manual surgery?',
          ar: 'لماذا يُفضل استبدال الركبة بالروبوت على الجراحة اليدوية التقليدية؟',
        },
        answer: {
          en: 'Robotic surgery uses CT-guided 3D mapping to place the implant with sub-millimeter precision tailored to the patient’s exact anatomy. It preserves healthy bone and ligaments, minimizes blood loss, reduces post-operative pain, and promotes faster return to walking.',
          ar: 'يعتمد الروبوت على تخطيط ثلاثي الأبعاد لتثبيت المفصل بدقة ميكرونية تناسب تشريح ركبة المريض بدقة. يحافظ هذا على العظام والأربطة السليمة، ويقلل النزيف والألم بعد الجراحة، ويسرع العودة للمشي الطبيعي.',
        },
      },
    ],
    medicalDisclaimer: {
      en: 'Physical therapy dedication and patient participation in recovery exercises are key determinants of joint flexibility and function.',
      ar: 'الالتزام بتمارين العلاج الطبيعي والمشاركة الفعالة في برنامج التأهيل من أهم عوامل نجاح واستعادة مرونة المفصل.',
    },
    sources: [
      { title: 'Clinical Outcomes of Robotic-Assisted Total Knee Arthroplasty', organization: 'Journal of Arthroplasty' },
      { title: 'Indian Orthopedic Association Joint Replacement Registry', organization: 'IOA' },
    ],
  },
  {
    id: 'brain-tumor-surgery-india',
    slug: 'brain-tumor-surgery-india',
    name: {
      en: 'Brain Tumor & Neurosurgery in India',
      ar: 'جراحة أورام الدماغ والمخ والأعصاب في الهند',
    },
    specialtyId: 'neurosurgery',
    overview: {
      en: 'Leading neurosurgical institutes in India utilize intraoperative MRI (iMRI), high-resolution neuronavigation, awake craniotomy protocols, and stereotactic radiosurgery (CyberKnife) to maximize tumor resection while preserving speech, motor, and cognitive faculties.',
      ar: 'تستخدم كبرى معاهد جراحة الأعصاب في الهند الرنين المغناطيسي أثناء الجراحة (iMRI)، والملاحة العصبية ثلاثية الأبعاد، واستئصال الأورام مع يقظة المريض، والجراحة الإشعاعية التجسيمية (CyberKnife) لاستئصال الأورام بدقة وحماية المراكز الحيوية.',
    },
    whoRequiresTreatment: {
      en: [
        'Patients with diagnosed brain tumors (Gliomas, Meningiomas, Pituitary Adenomas, Acoustic Neuromas)',
        'Individuals experiencing persistent headaches, unexplained seizures, vision loss, or motor weakness',
        'Complex skull-base tumors requiring multidisciplinary ENT and neurosurgical teams',
        'Recurrent tumors requiring re-resection or targeted stereotactic radiosurgery',
      ],
      ar: [
        'المشخصون بأورام الدماغ (الأورام الدبقية، السحائية، أورام الغدة النخامية، ورم العصب السمعي)',
        'الذين يعانون من صداع مستمر، أو نوبات صرع مفاجئة، أو تدهور في البصر أو ضعف حركي',
        'أورام قاعدة الجمجمة المعقدة التي تتطلب تدخلاً مشتركاً لجراحة الأعصاب والأنف والأذن',
        'الأورام المرتجعة التي تحتاج إعادة استئصال أو علاجاً إشعاعياً بالسايبر نايف',
      ],
    },
    treatmentOptions: {
      en: [
        'Image-Guided Craniotomy with Neuro-Navigation and Intraoperative Monitoring',
        'Awake Craniotomy for tumors situated near critical language or motor cortex',
        'Endoscopic Endonasal Transsphenoidal Surgery for Pituitary Adenomas (Through the nose, zero external incisions)',
        'CyberKnife Robotic Radiosurgery for inoperable or residual tumor margins',
      ],
      ar: [
        'فتح الجمجمة بتوجيه الملاحة العصبية والرصد الفسيولوجي المباشر لوظائف الأعصاب',
        'جراحة فتح الجمجمة مع اليقظة للأورام القريبة من مراكز النطق والحركة بالدماغ',
        'استئصال أورام الغدة النخامية بالمنظار عبر الأنف بدون أي شق جراحي خارجي',
        'الجراحة الإشعاعية الروبوتية بسايبر نايف للأورام العميقة أو حواف الأورام المتبقية',
      ],
    },
    hospitalIds: ['fortis-fmri', 'artemis-gurgaon', 'marengo-asia'],
    doctorIds: [],
    costInfo: {
      treatmentSlug: 'brain-tumor-surgery-india',
      procedureName: {
        en: 'Brain Tumor Craniotomy Package',
        ar: 'باقة جراحة استئصال ورم الدماغ',
      },
      indicativeRangeUSD: '$5,500 - $8,500 USD',
      hospitalVariationNote: {
        en: 'Cost depends on tumor location (convexity vs deep skull-base), histology, need for intraoperative MRI, and histopathology genomic testing.',
        ar: 'تعتمد التكلفة على موقع الورم (سطحي أم عميق في قاعدة الجمجمة)، واستخدام الرنين أثناء الجراحة، وفحوصات الجينات النسيجية للأورام.',
      },
      inclusions: {
        en: [
          'Pre-operative high-resolution contrast MRI / functional MRI',
          'Neurosurgical operative charges, neuro-monitoring, and navigation software',
          'Neuro ICU stay (2-3 days) and private room stay (5-7 days)',
          'Post-operative imaging and comprehensive histopathology/biopsy report',
        ],
        ar: [
          'أشعة الرنين المغناطيسي الوظيفية والمقطعية عالية الدقة مع الصبغة',
          'أتعاب الفريق الجراحي واستخدام أنظمة الملاحة العصبية والرصد العصبي',
          'الإقامة بالعناية المركزة للأعصاب (2-3 أيام) والغرفة الخاصة (5-7 أيام)',
          'أشعة الرنين المغناطيسي للمتابعة وفحص الأنسجة وعلم الأمراض المفصل',
        ],
      },
      exclusions: {
        en: [
          'Subsequent chemotherapy or radiation oncology cycles if the tumor is malignant',
          'Specialized molecular genomic next-generation sequencing panels',
        ],
        ar: [
          'جلسات العلاج الكيميائي أو الإشعاعي اللاحقة إذا تبين أن الورم خبيث',
          'الفحوصات الجينية المتقدمة لتسلسل الحمض النووي للأورام',
        ],
      },
      hospitalStayDays: '7 - 10 Days Inpatient',
      recoveryDays: '21 - 28 Days Total Stay in India',
      lastReviewedDate: '2026-09-21',
      disclaimer: {
        en: 'Neurosurgical pricing is customized following neuro-radiological review by senior neurosurgeons.',
        ar: 'يتم تحديد التكلفة النهائية بدقة بعد مراجعة صور الرنين المغناطيسي من قبل كبار جراحي الأعصاب.',
      },
    },
    hospitalStay: {
      en: '7 to 10 days in hospital with 2-3 days in dedicated Neuro ICU.',
      ar: '7 إلى 10 أيام بالمستشفى منها 2-3 أيام في عناية الأعصاب المركزة.',
    },
    recoveryTimeline: {
      en: 'Surgical recovery takes approximately 2 to 3 weeks. If adjuvant radiation or chemotherapy is recommended based on biopsy results, treatment is planned accordingly.',
      ar: 'يستغرق التعافي الجراحي الأولي من أسبوعين إلى 3 أسابيع، وإذا أوصت نتيجة تحليل الأنسجة بعلاج تكميلي يتم التنسيق لبدئه بسلاسة.',
    },
    internationalPatientProcess: {
      en: [
        'Step 1: Upload Brain MRI DICOM files or reports.',
        'Step 2: Neurosurgical tumor board review within 24 hours.',
        'Step 3: Medical Visa assistance and Delhi transfer.',
        'Step 4: Intraoperative navigation planning.',
        'Step 5: Microsurgical resection.',
        'Step 6: Tumor pathology result review and fit-to-fly clearance.',
      ],
      ar: [
        'الخطوة 1: رفع تقارير وأفلام الرنين المغناطيسي للدماغ (DICOM).',
        'الخطوة 2: تقييم عاجل من لجنة جراحة أورام المخ والأعصاب خلال 24 ساعة.',
        'الخطوة 3: إصدار التأشيرة الطبية والاستقبال من المطار.',
        'الخطوة 4: التخطيط للملاحة العصبية والرنين أثناء الجراحة.',
        'الخطوة 5: استئصال الورم ميكروسكوبياً بأعلى درجات الأمان العصبي.',
        'الخطوة 6: مراجعة نتائج تحليل الأنسجة وإصدار تصريح الطيران.',
      ],
    },
    travelAndVisaRequirements: {
      en: 'Medical Visa required. Accompanied by 1-2 attendants recommended.',
      ar: 'تأشيرة علاجية مطلوبة ويوصى بمرافقة شخص أو شخصين من العائلة.',
    },
    patientStoryIds: [],
    faqs: [
      {
        question: {
          en: 'What is an awake craniotomy and when is it necessary?',
          ar: 'ما هي جراحة فتح الجمجمة أثناء اليقظة ومتى تكون ضرورية؟',
        },
        answer: {
          en: 'An awake craniotomy is performed for tumors located directly within or adjacent to areas of the brain that control speech or movement. The patient is gently awakened during the tumor removal phase without experiencing any pain (the brain itself has no pain receptors) to test language and motor functions in real time, ensuring crucial faculties are preserved.',
          ar: 'تُجرى جراحة اليقظة للأورام الواقعة بالقرب من مراكز النطق أو الحركة الحساسة في الدماغ. يتم إيقاظ المريض لفترة وجيزة وبدون أي ألم (حيث لا توجد مستقبلات حسية للألم في نسيج الدماغ نفسه) للتحدث معه وفحص حركة يديه وقدميه مباشرة أثناء الاستئصال لحماية وظائفه الحيوية.',
        },
      },
    ],
    medicalDisclaimer: {
      en: 'Neurosurgical management requires individualized multidisciplinary review by neurosurgeons, neurologists, and neuroradiologists.',
      ar: 'تتطلب خطة علاج أورام الدماغ تقييماً مشتركاً من أطباء وجراحي الأعصاب وأخصائيي الأشعة التداخلية.',
    },
    sources: [
      { title: 'CNS Guidelines for the Treatment of Adult Brain Tumors', organization: 'Congress of Neurological Surgeons' },
      { title: 'NCCN Clinical Practice Guidelines in Oncology: Central Nervous System Cancers', organization: 'NCCN' },
    ],
  },
];

