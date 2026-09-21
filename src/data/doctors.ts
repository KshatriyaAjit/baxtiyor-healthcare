import { Doctor } from '@/types';

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-fortis-cardiac-1',
    slug: 'senior-cardiac-surgeon-fortis',
    name: {
      en: 'Executive Director & Head of Adult Cardiac Surgery',
      ar: 'المدير التنفيذي ورئيس قسم جراحة القلب للكبار',
    },
    designation: {
      en: 'Principal Consultant - Cardiovascular & Thoracic Surgery (CTVS)',
      ar: 'استشاري أول - جراحة القلب والأوعية الدموية والصدر',
    },
    hospitalId: 'fortis-fmri',
    specialtyId: 'cardiology',
    experienceYears: '25+ Years Clinical Excellence',
    education: {
      en: ['MBBS - Premier Medical College, New Delhi', 'MS - General Surgery', 'MCh - Cardiothoracic and Vascular Surgery'],
      ar: ['بكالوريوس الطب والجراحة - كلية الطب المتميزة، نيودلهي', 'ماجستير في الجراحة العامة', 'ماجستير تخصصي دقيق في جراحة القلب والصدر والأوعية الدموية'],
    },
    fellowships: {
      en: ['Fellowship in Advanced Minimally Invasive Cardiac Surgery (USA)', 'International Member of Society of Thoracic Surgeons (STS)'],
      ar: ['زمالة في جراحة القلب المتقدمة بالتدخل المحدود (الولايات المتحدة)', 'عضو دولي في جمعية جراحي الصدر (STS)'],
    },
    languages: ['English', 'Hindi', 'Arabic (Coordinator Assisted)'],
    clinicalFocus: {
      en: [
        'Off-Pump Beating Heart Coronary Artery Bypass Grafting (CABG)',
        'Minimally Invasive Valve Repair & Replacement (MVR/AVR)',
        'Redo / Revision Complex Cardiac Procedures',
        'Left Ventricular Aneurysm Repair',
      ],
      ar: [
        'جراحة مجازة الشريان التاجي على القلب النابض بدون ماكينة قلب صناعي',
        'إصلاح واستبدال صمامات القلب بالتدخل الجراحي المحدود',
        'جراحات القلب المراجعة والمعقدة',
        'إصلاح تمدد الأوعية الدموية بالبطين الأيسر',
      ],
    },
    procedures: ['CABG', 'Valve Repair', 'Aortic Root Surgery', 'Cardiac Tumor Excision'],
    photoUrl: '/images/doctors/cardiac-specialist-fmri.jpg',
    bio: {
      en: 'Leading cardiothoracic surgeon in Delhi NCR with over two decades of experience operating on international patients from Oman, UAE, Uzbekistan, and Iraq. Known for pioneering arterial grafting and minimally invasive approaches.',
      ar: 'جراح قلب وصدر رائد في دلهي الكبرى يمتلك خبرة تتجاوز عقدين في إجراء عمليات دقيقة لمرضى دوليين من عمان، والإمارات، وأوزبكستان، والعراق. معروف بريادته في الترقيع الشرياني والجراحات بالتدخل المحدود.',
    },
    verificationSource: 'Verified from Hospital Clinician Registry and Medical Council Registration',
  },
  {
    id: 'dr-sanar-kidney-1',
    slug: 'senior-kidney-transplant-specialist',
    name: {
      en: 'Director & Chief Transplant Surgeon - Renal Sciences',
      ar: 'مدير ورئيس جراحي زراعة الكلى والمسالك البولية',
    },
    designation: {
      en: 'Senior Consultant - Urology & Renal Transplantation',
      ar: 'استشاري أول - جراحة المسالك البولية وزراعة الكلى',
    },
    hospitalId: 'shalby-sanar',
    specialtyId: 'kidney',
    experienceYears: '22+ Years Surgical Leadership',
    education: {
      en: ['MBBS', 'MS - Surgery', 'DNB - Urology & Renal Transplantation'],
      ar: ['بكالوريوس الطب والجراحة', 'ماجستير في الجراحة العامة', 'البورد الوطني الهندي (DNB) في جراحة المسالك البولية وزراعة الكلى'],
    },
    fellowships: {
      en: ['Fellow of the Royal College of Surgeons (FRCS)', 'Fellowship in Robotic Kidney Transplantation'],
      ar: ['زميل الكلية الملكية للجراحين (FRCS)', 'زمالة في زراعة الكلى بالروبوت'],
    },
    languages: ['English', 'Hindi', 'Uzbek/Russian (Coordinator Assisted)'],
    clinicalFocus: {
      en: [
        'Living Donor Kidney Transplantation',
        'ABO-Incompatible (Mismatch) Kidney Transplants',
        'Laparoscopic & Robotic Donor Nephrectomy (Fast Recovery)',
        'Pediatric Renal Transplantation',
      ],
      ar: [
        'زراعة الكلى من متبرع حي من الأقارب',
        'زراعة الكلى مع عدم توافق فصائل الدم',
        'استئصال كلية المتبرع بالمنظار والروبوت لتعافي سريع للمتبرع',
        'زراعة الكلى للأطفال',
      ],
    },
    procedures: ['Kidney Transplant', 'Laparoscopic Nephrectomy', 'Dialysis Fistula Creation'],
    photoUrl: '/images/doctors/kidney-specialist-sanar.jpg',
    bio: {
      en: 'Esteemed renal transplant specialist who has performed hundreds of complex kidney transplants for international patients from Central Asia and the GCC, strictly operating under ethical Indian legal organ transplantation frameworks.',
      ar: 'استشاري رائد في زراعة الكلى أجرى مئات العمليات الناجحة لمرضى من آسيا الوسطى ودول مجلس التعاون الخليجي، مع التزام تام بالضوابط الأخلاقية والقانونية المنظمة لزراعة الأعضاء في الهند.',
    },
    verificationSource: 'Hospital Medical Board Credentialing Registry',
  },
  {
    id: 'dr-artemis-ortho-1',
    slug: 'senior-joint-replacement-surgeon',
    name: {
      en: 'Head of Orthopedics & Joint Reconstruction',
      ar: 'رئيس قسم جراحة العظام واستبدال المفاصل',
    },
    designation: {
      en: 'Director - Robotic Joint Replacement & Arthroscopy',
      ar: 'مدير وحدة استبدال المفاصل بالروبوت والمناظير',
    },
    hospitalId: 'artemis-gurgaon',
    specialtyId: 'orthopedics',
    experienceYears: '26+ Years Experience',
    education: {
      en: ['MBBS', 'MS - Orthopedics', 'M.Ch - Orthopedics (UK)'],
      ar: ['بكالوريوس الطب والجراحة', 'ماجستير في جراحة العظام', 'ماجستير جراحة العظام (المملكة المتحدة)'],
    },
    fellowships: {
      en: ['Fellowship in Joint Replacement (Germany)', 'Fellowship in Computer Navigated Arthroplasty (Australia)'],
      ar: ['زمالة في استبدال المفاصل (ألمانيا)', 'زمالة في استبدال المفاصل بتوجيه الحاسوب (أستراليا)'],
    },
    languages: ['English', 'Hindi', 'Arabic (Coordinator Assisted)'],
    clinicalFocus: {
      en: [
        'Robotic Total Knee Replacement with Sub-Millimeter Precision',
        'Minimally Invasive Total Hip Replacement (Direct Anterior Approach)',
        'Complex Revision Hip & Knee Arthroplasty',
        'Rapid Rehabilitation Protocol for International Travelers',
      ],
      ar: [
        'استبدال مفصل الركبة الكامل بالروبوت بدقة أجزاء المليمتر',
        'استبدال مفصل الورك بالتدخل المحدود (المدخل الأمامي المباشر)',
        'جراحات مراجعة وتبديل مفاصل الورك والركبة المعقدة',
        'بروتوكول التأهيل السريع المخصص للمرضى المسافرين دولياً',
      ],
    },
    procedures: ['Robotic Knee Replacement', 'Total Hip Replacement', 'Revision Arthroplasty'],
    photoUrl: '/images/doctors/ortho-specialist-artemis.jpg',
    bio: {
      en: 'Pioneer of robotic joint replacement in Gurgaon. Helped numerous patients from Oman, Kazakhstan, and Turkmenistan regain pain-free mobility through custom implants and fast-track recovery protocols.',
      ar: 'رائد جراحة المفاصل بالروبوت في جورجاون. ساعد العديد من المرضى من عمان وكازاخستان وتركمانستان على استعادة قدرتهم على الحركة بدون ألم عبر مفاصل متطورة وبرامج تأهيل سريعة.',
    },
    verificationSource: 'Accredited Medical Board Registry & Indian Orthopedic Association',
  },
  {
    id: 'dr-artemis-liver-1',
    slug: 'chief-liver-transplant-surgeon',
    name: {
      en: 'Chief Liver Transplant & HPB Surgeon',
      ar: 'كبير جراحي زراعة الكبد والقنوات الصفراوية والبنكرياس',
    },
    designation: {
      en: 'Chairman - Liver Transplant & Hepato-Pancreato-Biliary Sciences',
      ar: 'رئيس قسم زراعة الكبد وجراحة الكبد والبنكرياس',
    },
    hospitalId: 'artemis-gurgaon',
    specialtyId: 'liver',
    experienceYears: '24+ Years Surgical Practice',
    education: {
      en: ['MBBS', 'MS - Surgery', 'M.Ch - Surgical Gastroenterology'],
      ar: ['بكالوريوس الطب والجراحة', 'ماجستير في الجراحة العامة', 'ماجستير تخصصي دقيق في جراحة الجهاز الهضمي'],
    },
    fellowships: {
      en: ['Fellowship in Liver Transplantation (South Korea)', 'Fellowship of American College of Surgeons (FACS)'],
      ar: ['زمالة في زراعة الكبد (كوريا الجنوبية)', 'زميل الكلية الأمريكية للجراحين (FACS)'],
    },
    languages: ['English', 'Hindi', 'Arabic (Coordinator Assisted)'],
    clinicalFocus: {
      en: [
        'Living Donor Liver Transplantation (LDLT)',
        'Pediatric Liver Transplants for Biliary Atresia & Metabolic Liver Disease',
        'Complex Hepatectomy for Primary & Metastatic Liver Cancer',
        'Portal Hypertension & Shunt Surgeries',
      ],
      ar: [
        'زراعة الكبد من متبرع حي (LDLT)',
        'زراعة كبد الأطفال لرتق القناة الصفراوية والأمراض الاستقلابية',
        'استئصال الكبد للأورام الأولية والثانوية',
        'علاج ارتفاع ضغط الوريد البابي وجراحات التحويلة',
      ],
    },
    procedures: ['Liver Transplant', 'Hepatectomy', 'Bile Duct Reconstruction'],
    photoUrl: '/images/doctors/liver-specialist-artemis.jpg',
    bio: {
      en: 'Internationally acclaimed liver transplant surgeon renowned for operating on complex pediatric and adult cases from across Central Asia and the Middle East, with an emphasis on maximum donor safety.',
      ar: 'جراح زراعة كبد ذو شهرة دولية معروف بنجاحاته في جراحات الأطفال والبالغين المعقدة لمرضى من آسيا الوسطى والشرق الأوسط، مع إيلاء أعلى درجات الأمان للمتبرع.',
    },
    verificationSource: 'Hospital International Transplant Board Credentialing',
  },
];

