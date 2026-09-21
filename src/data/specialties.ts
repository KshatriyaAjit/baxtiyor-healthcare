import { Specialty } from '@/types';

export const SPECIALTIES: Specialty[] = [
  {
    id: 'cardiology',
    slug: 'cardiology',
    name: {
      en: 'Cardiology & Heart Surgery',
      ar: 'أمراض وجراحة القلب',
    },
    shortDescription: {
      en: 'World-renowned cardiac surgeons, advanced catheterization labs, and high-success bypass and valve interventions.',
      ar: 'جراحو قلب على مستوى عالمي، ومختبرات قسطرة متطورة، وعمليات قلب مفتوح واستبدال صمامات بأعلى معايير الدقة.',
    },
    fullDescription: {
      en: 'Our partner hospitals in India provide comprehensive cardiac care including coronary artery bypass grafting (CABG), minimally invasive valve replacements, pediatric cardiac surgery, and complex aortic aneurysm repairs.',
      ar: 'توفر المستشفيات الشريكة في الهند رعاية شاملة للقلب تشمل جراحة مجازة الشريان التاجي، واستبدال الصمامات بالتدخل المحدود، وجراحة قلب الأطفال، وعلاج تمدد الأوعية الدموية المعقدة.',
    },
    iconName: 'HeartPulse',
    treatmentSlugs: ['heart-surgery-india', 'pediatric-cardiac-surgery-india', 'valve-replacement-india'],
    hospitalIds: ['fortis-fmri', 'artemis-gurgaon', 'marengo-asia'],
    keyProcedures: {
      en: ['CABG (Heart Bypass)', 'TAVI / TAVR Valve Replacement', 'Pediatric Heart Hole Closure', 'Electrophysiology Studies'],
      ar: ['جراحة مجازة الشريان التاجي (قلب مفتوح)', 'استبدال الصمام الأبهري عبر القسطرة (TAVI)', 'علاج تشوهات القلب الخلقية للأطفال', 'دراسات فسيولوجيا كهرباء القلب'],
    },
  },
  {
    id: 'oncology',
    slug: 'oncology',
    name: {
      en: 'Oncology & Cancer Care',
      ar: 'علاج الأورام وأمراض السرطان',
    },
    shortDescription: {
      en: 'Comprehensive tumor boards, precision radiation (CyberKnife, Proton Beam), and targeted immunotherapy.',
      ar: 'لجان أورام متعددة التخصصات، وإشعاع فائق الدقة (سايبر نايف، علاج بالبروتون)، وعلاج مناعي وموجه متقدم.',
    },
    fullDescription: {
      en: 'Advanced cancer treatment programs offering personalized genomic profiling, robotic tumor resections, chemotherapy regimens, bone marrow transplants, and organ-preserving oncology surgeries.',
      ar: 'برامج علاج السرطان المتقدمة التي تقدم تحليلات جينية مخصصة، واستئصال الأورام الروبوتي، وجلسات العلاج الكيميائي، وزراعة نخاع العظم، والجراحات المحافظة على الأعضاء.',
    },
    iconName: 'Activity',
    treatmentSlugs: ['cancer-treatment-india', 'bone-marrow-transplant-india', 'radiation-oncology-india'],
    hospitalIds: ['fortis-fmri', 'artemis-gurgaon', 'shalby-sanar', 'marengo-asia'],
    keyProcedures: {
      en: ['Surgical Tumor Resection', 'Bone Marrow Transplant (BMT)', 'CyberKnife Radiosurgery', 'Immunotherapy & Targeted Drugs'],
      ar: ['استئصال الأورام الجراحي', 'زراعة نخاع العظم', 'العلاج الإشعاعي بسايبر نايف', 'العلاج المناعي والعلاجات الموجهة'],
    },
  },
  {
    id: 'neurosurgery',
    slug: 'neurosurgery',
    name: {
      en: 'Neurosurgery & Spine',
      ar: 'جراحة المخ والأعصاب والعمود الفقري',
    },
    shortDescription: {
      en: 'Advanced neuro-navigation, intraoperative MRI, and robotic spine reconstruction for complex neural conditions.',
      ar: 'أنظمة ملاحة عصبية دقيقة، وتصوير بالرنين أثناء الجراحة، وإعادة بناء العمود الفقري بالروبوت.',
    },
    fullDescription: {
      en: 'Expert neurosurgical teams handling benign and malignant brain tumors, deep brain stimulation for Parkinson’s, spinal deformity corrections, and minimally invasive disc surgeries.',
      ar: 'فرق جراحة أعصاب متخصصة في أورام الدماغ الحميدة والخبيثة، والتحفيز العميق للدماغ لمرض باركنسون، وتصحيح تشوهات العمود الفقري، وجراحات الانزلاق الغضروفي بالمنظار.',
    },
    iconName: 'Brain',
    treatmentSlugs: ['brain-tumor-surgery-india', 'spine-fusion-surgery-india', 'deep-brain-stimulation-india'],
    hospitalIds: ['fortis-fmri', 'artemis-gurgaon', 'shalby-sanar'],
    keyProcedures: {
      en: ['Awake Craniotomy for Brain Tumors', 'Minimally Invasive Spine Surgery', 'Deep Brain Stimulation (DBS)', 'Cerebral Aneurysm Coiling'],
      ar: ['استئصال أورام الدماغ مع اليقظة', 'جراحة العمود الفقري بالتدخل المحدود', 'التحفيز العميق للدماغ (DBS)', 'علاج تمدد الأوعية الدموية الدماغية'],
    },
  },
  {
    id: 'orthopedics',
    slug: 'orthopedics',
    name: {
      en: 'Orthopedics & Joint Replacement',
      ar: 'جراحة العظام واستبدال المفاصل',
    },
    shortDescription: {
      en: 'Robotic-assisted joint replacement, complex revision surgeries, and specialized orthopedic oncology.',
      ar: 'استبدال المفاصل بمساعدة الروبوت، وجراحات المفاصل التصحيحية المعقدة، وجراحة أورام العظام.',
    },
    fullDescription: {
      en: 'Top orthopedic centers offering computer-navigated total knee and hip replacements, arthroscopic ligament repairs, limb salvage for bone tumors, and pediatric orthopedic correction.',
      ar: 'مراكز عظام رائدة تقدم عمليات استبدال مفصل الركبة والورك بتوجيه الحاسوب، وإصلاح الأربطة بالمنظار، وجراحات إنقاذ الأطراف لأورام العظام، وتصحيح تشوهات العظام للأطفال.',
    },
    iconName: 'Bone',
    treatmentSlugs: ['hip-replacement-india', 'knee-replacement-india', 'orthopedic-oncology-india'],
    hospitalIds: ['shalby-sanar', 'artemis-gurgaon', 'fortis-fmri', 'marengo-asia'],
    keyProcedures: {
      en: ['Robotic Total Knee Replacement', 'Total Hip Arthroplasty', 'Revision Joint Replacement', 'Arthroscopic ACL/PCL Reconstruction'],
      ar: ['استبدال الركبة بالكامل بالروبوت', 'استبدال مفصل الورك الكامل', 'جراحة تبديل المفاصل المراجعة', 'ترميم الرباط الصليبي بالمنظار'],
    },
  },
  {
    id: 'kidney',
    slug: 'kidney',
    name: {
      en: 'Kidney Transplant & Nephrology',
      ar: 'زراعة الكلى وأمراض الكلى',
    },
    shortDescription: {
      en: 'Pioneering living donor kidney transplant programs, ABO-incompatible transplants, and advanced renal care.',
      ar: 'برامج رائدة لزراعة الكلى من متبرع حي، وعمليات الزراعة غير المتوافقة فصيلة الدم، ورعاية كلوية متكاملة.',
    },
    fullDescription: {
      en: 'Comprehensive kidney care encompassing living related donor kidney transplantation under Indian regulatory frameworks, laparoscopic donor nephrectomy, pediatric dialysis, and management of chronic renal failure.',
      ar: 'رعاية كلوية شاملة تشمل زراعة الكلى من متبرع قريب حي وفق اللوائح القانونية الهندية، واستئصال كلية المتبرع بالمنظار، وغسيل الكلى للأطفال، وعلاج الفشل الكلوي المزمن.',
    },
    iconName: 'ShieldPlus',
    treatmentSlugs: ['kidney-transplant-india', 'dialysis-access-india'],
    hospitalIds: ['shalby-sanar', 'fortis-fmri', 'artemis-gurgaon'],
    keyProcedures: {
      en: ['Living Donor Kidney Transplant', 'ABO-Incompatible Kidney Transplant', 'Laparoscopic Donor Nephrectomy', 'Renal Biopsy & Dialysis Management'],
      ar: ['زراعة الكلى من متبرع حي', 'زراعة الكلى مع عدم تطابق فصائل الدم', 'استئصال كلية المتبرع بالمنظار', 'خزعة الكلى وإدارة الغسيل الكلوي'],
    },
  },
  {
    id: 'liver',
    slug: 'liver',
    name: {
      en: 'Liver Transplant & Hepatology',
      ar: 'زراعة الكبد وأمراض الجهاز الهضمي والكبد',
    },
    shortDescription: {
      en: 'High-volume living donor liver transplant centers with dedicated hepatobiliary ICU teams.',
      ar: 'مراكز عالية الكفاءة في زراعة الكبد من متبرع حي مع وحدات عناية مركزة متخصصة للكبد والقنوات الصفراوية.',
    },
    fullDescription: {
      en: 'Pioneering living donor liver transplantations (LDLT) for end-stage cirrhosis, acute liver failure, pediatric liver disorders, and complex resections for hepatocellular carcinoma.',
      ar: 'عمليات رائدة لزراعة الكبد من متبرع حي لعلاج تليف الكبد المتقدم، والفشل الكبدي الحاد، واعتلالات كبد الأطفال، واستئصال أورام الكبد المعقدة.',
    },
    iconName: 'Stethoscope',
    treatmentSlugs: ['liver-transplant-india', 'hepatectomy-india'],
    hospitalIds: ['artemis-gurgaon', 'fortis-fmri', 'shalby-sanar'],
    keyProcedures: {
      en: ['Living Donor Liver Transplant (LDLT)', 'Pediatric Liver Transplant', 'Major Hepatectomy for Tumors', 'Transarterial Chemoembolization (TACE)'],
      ar: ['زراعة الكبد من متبرع حي للبالغين', 'زراعة الكبد للأطفال', 'استئصال الكبد للأورام', 'الحقن الكيميائي عبر القسطرة الشريانية للكبد (TACE)'],
    },
  },
];

