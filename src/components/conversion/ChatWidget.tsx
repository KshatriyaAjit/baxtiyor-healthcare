'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Locale } from '@/types';
import { getWhatsAppUrl, SITE_CONTACT } from '@/lib/config/contact';
import { trackEvent } from '@/lib/analytics/tracker';
import { LetsTalkModal } from './LetsTalkModal';
import {
  MessageSquare,
  X,
  Send,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  MessageCircle,
  Phone,
  Sparkles,
  ChevronRight,
  Bot,
  RefreshCw,
} from 'lucide-react';

interface ChatWidgetProps {
  locale: Locale;
  treatmentName?: string;
  hospitalName?: string;
}

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  options?: { label: string; action: string }[];
  showEscalation?: boolean;
}

interface PredefinedAnswer {
  keywords: string[];
  en: string;
  ar: string;
  category: string;
}

const KNOWLEDGE_BASE: PredefinedAnswer[] = [
  {
    category: 'how_it_works',
    keywords: ['how', 'work', 'works', 'service', 'baxtiyor', 'process', 'free', 'cost of service', 'fee', 'كيف', 'خدمة', 'مجانا', 'عمل'],
    en: 'Baxtiyor Healthcare is an international patient coordination organization based in Gurugram (Delhi NCR), India. We assist patients from Central Asia (Uzbekistan, Kazakhstan) and Arab nations (Oman, Saudi Arabia, UAE, Iraq) with: \n\n1. Priority Doctor Appointments\n2. Free Medical Review & Treatment Cost Estimates\n3. Visa Invitation Letters & Airport Pickup\n4. Dedicated In-Person Interpreters (Uzbek, Russian, Arabic)\n\nAll our coordination services are 100% free of charge to patients. You pay your medical bills directly to the hospital.',
    ar: 'بختيار للرعاية الصحية هي مؤسسة تنسيق طبي دولية مقرها جورجاون (دلهي الكبرى)، الهند. نساعد المرضى من دول الخليج (عُمان، السعودية، الإمارات، العراق) وآسيا الوسطى في:\n\n1. حجز المواعيد مع كبار الجراحين\n2. تقييم مجاني للتقارير وعروض أسعار رسمية\n3. استخراج التأشيرة الطبية والاستقبال بالمطار\n4. مرافق ومترجم شخصي طوال فترة العلاج\n\nخدمات التنسيق والمرافقة مجانية بالكامل للمريض، ويتم سداد تكاليف العلاج مباشرة للمستشفى.',
  },
  {
    category: 'hospitals',
    keywords: ['hospital', 'hospitals', 'fortis', 'artemis', 'sanar', 'shalby', 'marengo', 'delhi', 'gurgaon', 'مستشفى', 'مستشفيات', 'فورتيس', 'ارتيميس', 'سانار'],
    en: 'We work directly with India’s leading internationally accredited (JCI and NABH) tertiary hospital facilities in Delhi NCR, including:\n\n• Fortis Memorial Research Institute (Gurugram)\n• Artemis Hospital (Gurugram)\n• Shalby Sanar International Hospital (Gurugram)\n• Marengo Asia Hospitals (Gurugram & Faridabad)\n\nThese centers feature state-of-the-art robotic surgery, dedicated organ transplant ICUs, and comprehensive international patient lounges.',
    ar: 'نعمل بتنسيق مباشر مع نخبة المستشفيات المعتمدة دولياً (JCI و NABH) في دلهي وجورجاون، ومن أبرزها:\n\n• معهد فورتيس التذكاري للأبحاث (FMRI)\n• مستشفى أرتيميس التخصصي (Artemis)\n• مستشفى شالبي سانار الدولي (Shalby Sanar)\n• مستشفيات مارينغو آسيا (Marengo Asia)\n\nتتميز هذه الصروح الطبية بأحدث تقنيات الجراحة الروبوتية وأجنحة زراعة الأعضاء المتخصصة وخدمات استقبال دولية متكاملة.',
  },
  {
    category: 'opinion',
    keywords: ['opinion', 'review', 'reports', 'second opinion', 'evaluate', 'doctor', 'راي', 'رأي', 'تقارير', 'طبيب', 'تقييم'],
    en: 'To request a free medical opinion and personalized treatment plan:\n\n1. Share your recent diagnostic records (MRI, CT scan, biopsy, or blood work) with our coordinator desk.\n2. Our medical liaison presents your case to senior specialists at partner hospitals.\n3. Within 24 to 48 hours, you will receive a formal medical opinion outlining the proposed surgical plan, expected stay, and cost estimate.\n\nWould you like to connect with a coordinator right now?',
    ar: 'للحصول على رأي طبي رسمي وخطة علاجية مجانية:\n\n1. شارك أحدث التقارير الطبية (رنين، أشعة مقطعية، أو تحاليل) مع منسقنا.\n2. يعرض فريقنا الطبي ملفك على كبار الاستشاريين بالمستشفيات الشريكة.\n3. خلال 24 إلى 48 ساعة، تستلم تقريراً طبياً رسمياً يتضمن الخطة الجراحية، ومدة الإقامة، والتكلفة التقديرية.\n\nهل ترغب في التحدث مع المنسق الآن؟',
  },
  {
    category: 'cost',
    keywords: ['cost', 'price', 'pricing', 'estimate', 'how much', 'expensive', 'package', 'dollar', 'usd', 'سعر', 'تكلفة', 'اسعار', 'كم', 'تكاليف'],
    en: 'Medical treatment in accredited Indian hospitals is typically 60% to 80% more affordable than Western centers while maintaining strict international clinical standards. \n\nIndicative packages (subject to specific patient evaluation):\n• Heart Bypass (CABG): $4,500 - $6,500\n• Living Donor Kidney Transplant: $13,000 - $16,000\n• Robotic Knee Replacement: $4,500 - $6,000\n• Bone Marrow Transplant: $18,000 - $28,000\n\nAll invoices are paid directly to the hospital cashier. Baxtiyor Healthcare does NOT charge service markups.',
    ar: 'تتميز المستشفيات المعتمدة في الهند بتقديم رعاية طبية عالمية بتكلفة أقل بنسبة 60% إلى 80% مقارنة بالمراكز الغربية.\n\nباقات علاجية تقريبية (تعتمد على تقييم الحالة):\n• جراحة القلب المفتوح/النابض: 4,500 - 6,500 دولار\n• زراعة الكلى من متبرع حي: 13,000 - 16,000 دولار\n• استبدال الركبة بالروبوت: 4,500 - 6,000 دولار\n• زراعة النخاع العظمي: 18,000 - 28,000 دولار\n\nيتم سداد الفاتورة مباشرة للمستشفى دون أي عمولات على المريض.',
  },
  {
    category: 'visa',
    keywords: ['visa', 'travel', 'airport', 'hotel', 'flight', 'stay', 'tickets', 'تأشيرة', 'فيزا', 'سفر', 'مطار', 'فندق', 'طيران'],
    en: 'We assist with every aspect of your travel logistics:\n\n• Visa Assistance: We provide formal Medical Visa Invitation Letters from the hospital within 24-48 hours to secure your e-Medical Visa.\n• Airport Meet & Greet: Private transport from New Delhi International Airport (IGI) directly to the hospital or pre-booked hotel apartment.\n• Accommodation: Access to vetted hotel apartments with kitchens suited for patient recovery.\n• SIM Cards & Local Currency: Immediate assistance upon arrival.',
    ar: 'نقدم دعماً شاملاً في كافة ترتيبات السفر والإقامة:\n\n• التأشيرة الطبية: إصدار خطابات دعوة طبية رسمية من المستشفى خلال 24 - 48 ساعة للحصول على التأشيرة الإلكترونية.\n• الاستقبال بالمطار: سيارة خاصة تنقلك من مطار نيودلهي الدولي (IGI) مباشرة للمستشفى أو الشقة الفندقية.\n• السكن: خيارات شقق فندقية نظيفة مجهزة بمطبخ بالقرب من المستشفى.\n• توفير شرائح الاتصال وصرف العملة بمجرد الوصول.',
  },
  {
    category: 'languages',
    keywords: ['language', 'uzbek', 'russian', 'arabic', 'english', 'translator', 'interpreter', 'لغة', 'مترجم', 'عربي', 'روسي', 'أوزبكي'],
    en: 'You will never have a communication barrier in India. Baxtiyor Healthcare coordinators speak fluent Uzbek, Russian, Arabic, and English. A dedicated coordinator accompanies you through consultations, investigations, hospital admission, and doctor rounds.',
    ar: 'لن تواجه أي عائق لغوي في الهند. يتحدث منسقو بختيار للرعاية الصحية العربية والروسية والأوزبكية والإنجليزية بطلاقة. يرافقك منسق خاص في كافة المواعيد الطبية وجلسات الأطباء والفحوصات.',
  },
];

export function ChatWidget({ locale, treatmentName, hospitalName }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [talkModalOpen, setTalkModalOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isArabic = locale === 'ar';

  const defaultGreeting: ChatMessage = {
    id: 'welcome',
    sender: 'assistant',
    text: isArabic
      ? 'مرحباً بك في بختيار للرعاية الصحية. أنا مساعد التنسيق الطبي الآلي. كيف يمكنني مساعدتك اليوم؟ يمكنك اختيار أحد الأسئلة الشائعة أدناه أو التحدث مباشرة مع منسق بشري.'
      : 'Hello! I am the Baxtiyor Healthcare Coordination Assistant. How can I help you explore medical treatment in India? You can choose a common topic below or connect with a human coordinator.',
    options: [
      { label: isArabic ? 'كيف يعمل التنسيق الطبي؟' : 'How does coordination work?', action: 'how_it_works' },
      { label: isArabic ? 'ما هي المستشفيات الشريكة؟' : 'Partner Hospitals in Delhi', action: 'hospitals' },
      { label: isArabic ? 'كيف أحصل على رأي طبي مجاني؟' : 'Get Free Medical Opinion', action: 'opinion' },
      { label: isArabic ? 'تكاليف وباقات العلاج' : 'Treatment Cost Process', action: 'cost' },
      { label: isArabic ? 'المساعدة في التأشيرة والسفر' : 'Visa & Travel Assistance', action: 'visa' },
      { label: isArabic ? 'اللغات المتوفرة للمرافقة' : 'Supported Languages', action: 'languages' },
    ],
    showEscalation: true,
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([defaultGreeting]);
    }
  }, [locale]);

  useEffect(() => {
    if (isOpen) {
      trackEvent('chat_open', {
        locale,
        language: locale,
        cta_location: 'floating_chat_widget',
      });
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleActionClick = (action: string) => {
    const matched = KNOWLEDGE_BASE.find((k) => k.category === action);
    if (!matched) return;

    const answerText = isArabic ? matched.ar : matched.en;
    const userPrompt = matched.category.replace('_', ' ');

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: 'user', text: userPrompt },
      {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: answerText,
        showEscalation: true,
      },
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    const lower = query.toLowerCase();
    setInput('');

    // Find best match in knowledge base
    let bestMatch: PredefinedAnswer | null = null;
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => lower.includes(kw))) {
        bestMatch = item;
        break;
      }
    }

    const replyText = bestMatch
      ? isArabic
        ? bestMatch.ar
        : bestMatch.en
      : isArabic
      ? 'شكراً لتواصلك. للحصول على إجابة دقيقة ومفصلة لحالتك الخاصة ومناقشة التقارير، نوصي بالتحدث مباشرة مع منسق طبي بشري عبر الواتساب أو الهاتف.'
      : 'Thank you for your inquiry. For specific clinical questions, medical report evaluation, and personalized estimates, we recommend connecting directly with a human coordinator.';

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: 'user', text: query },
      {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        showEscalation: true,
      },
    ]);
  };

  const handleEscalateHuman = () => {
    trackEvent('chat_human_request', {
      locale,
      language: locale,
      cta_location: 'chat_widget_escalation',
    });
    setTalkModalOpen(true);
  };

  const handleWhatsAppEscalate = () => {
    trackEvent('chat_whatsapp_click', {
      locale,
      language: locale,
      cta_location: 'chat_widget_whatsapp',
    });
    const url = getWhatsAppUrl({ locale, sourceContext: 'chat' });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleResetChat = () => {
    setMessages([defaultGreeting]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {/* Placed bottom-20 on mobile to avoid overlapping the bottom navigation bar */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-brand-primary to-brand-teal text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group font-semibold text-xs sm:text-sm"
            aria-label={isArabic ? 'فتح المساعد الطبي الآلي' : 'Open Patient Assistance Chat'}
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 fill-current" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-brand-primary animate-pulse" />
            </div>
            <span>{isArabic ? 'مساعد التنسيق الطبي' : 'Patient Coordinator Chat'}</span>
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50 w-[92vw] sm:w-[400px] h-[540px] max-h-[82vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          role="dialog"
          aria-label={isArabic ? 'محادثة التنسيق الطبي' : 'Patient Coordination Chat'}
        >
          {/* Header */}
          <div className="p-3.5 bg-brand-navy text-white flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold flex items-center gap-1.5">
                  <span>{isArabic ? 'بختيار للرعاية الصحية' : 'Baxtiyor Healthcare'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] text-teal-300 font-medium">
                  {isArabic ? 'مساعد التنسيق الطبي الآلي' : 'Coordination Assistant'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1 text-slate-300 hover:text-white rounded"
                title={isArabic ? 'إعادة ضبط المحادثة' : 'Reset chat'}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-300 hover:text-white rounded"
                aria-label={isArabic ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Strict Non-Diagnostic Medical Disclaimer */}
          <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/50 flex items-start gap-2 text-[10px] text-amber-800 dark:text-amber-300 leading-tight shrink-0">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p>
              {isArabic
                ? 'تنويه طبي: يقدم هذا المساعد معلومات عامة وتنسيقية فقط، ولا يقدم تشخيصاً طبياً أو بديلاً عن استشارة الطبيب المختص.'
                : 'Medical Notice: This chat provides general coordination information. It does not provide medical diagnosis or replace advice from a qualified doctor.'}
            </p>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-slate-50 dark:bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-brand-primary text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Optional Quick Topic Chips */}
                {msg.options && (
                  <div className="mt-2.5 space-y-1.5 w-full">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                      {isArabic ? 'المواضيع الشائعة:' : 'Quick Questions:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.action}
                          onClick={() => handleActionClick(opt.action)}
                          className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 text-[11px] font-medium transition-all shadow-2xs text-left"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary Human Escalation Button */}
                {msg.showEscalation && (
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleEscalateHuman}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-[11px] transition-all shadow-sm active:scale-95"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{isArabic ? 'تحدث مع منسق بشري' : 'Talk to a Human Coordinator'}</span>
                    </button>
                    <button
                      onClick={handleWhatsAppEscalate}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-emerald-700 dark:text-emerald-300 border border-[#25D366]/30 font-semibold text-[11px] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Text Input Footer */}
          <form
            onSubmit={handleSend}
            className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isArabic ? 'اكتب سؤالك عن المستشفيات أو التكاليف...' : 'Ask about hospitals, doctors, costs...'}
              className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-brand-primary text-white hover:bg-opacity-90 disabled:opacity-40 transition-all shrink-0"
              aria-label={isArabic ? 'إرسال' : 'Send'}
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>
        </div>
      )}

      {/* Human Let's Talk Modal */}
      <LetsTalkModal
        isOpen={talkModalOpen}
        onClose={() => setTalkModalOpen(false)}
        locale={locale}
        treatmentName={treatmentName}
        hospitalName={hospitalName}
        sourceContext="chat"
      />
    </>
  );
}

