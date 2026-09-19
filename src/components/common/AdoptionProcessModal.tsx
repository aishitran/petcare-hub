import React, { useState } from 'react';
import { 
  Heart, 
  FileText, 
  Video, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Home, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  AlertCircle,
  Clock,
  Shield,
  BadgeCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AdoptionProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExplorePets?: () => void;
}

export const AdoptionProcessModal: React.FC<AdoptionProcessModalProps> = ({
  isOpen,
  onClose,
  onExplorePets
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('petcare_hide_adoption_onboarding', 'true');
    }
    onClose();
  };

  const handleExplore = () => {
    if (dontShowAgain) {
      localStorage.setItem('petcare_hide_adoption_onboarding', 'true');
    }
    onClose();
    if (onExplorePets) onExplorePets();
  };

  const timelineSteps = [
    {
      step: '01',
      icon: Heart,
      accentBg: 'bg-rose-500 text-white',
      tagText: isEn ? 'Browse & Connect' : 'Tìm hiểu & Kết nối',
      tagColor: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/50',
      title: isEn ? 'Choose Pet & Review Profile' : 'Chọn bạn nhỏ & Tìm hiểu thông tin',
      desc: isEn 
        ? 'Browse waiting pets, read health history (vaccines, spay/neuter), personality traits, and notes shared by the fosterer or shelter.' 
        : 'Tìm hiểu danh sách các bạn nhỏ cần mái ấm, xem thông tin y tế (tiêm phòng, triệt sản), tính cách và ghi chú từ người nuôi tạm/trạm cứu trợ.'
    },
    {
      step: '02',
      icon: FileText,
      accentBg: 'bg-amber-500 text-white',
      tagText: isEn ? 'Quick Survey' : 'Khảo sát nhanh',
      tagColor: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900/50',
      title: isEn ? 'Submit Adoption Inquiry' : 'Gửi lời ngỏ & Khảo sát nhận nuôi',
      desc: isEn 
        ? 'Share your living space (safe balcony/yard), pet care experience, and how much love and time your family can give to the pet.' 
        : 'Chia sẻ điều kiện không gian sống (ban công/sân vườn an toàn), kinh nghiệm chăm sóc và sự chuẩn bị của gia đình bạn.'
    },
    {
      step: '03',
      icon: Video,
      accentBg: 'bg-teal-600 text-white',
      tagText: isEn ? 'Chat & Meet' : 'Trò chuyện thân tình',
      tagColor: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-900/50',
      title: isEn ? 'Friendly Meet & Greet' : 'Trao đổi & Gặp gỡ thân tình',
      desc: isEn 
        ? 'Directly message, video call, or visit the pet in person to get acquainted and exchange tips on favorite food and daily habits.' 
        : 'Hai bên trực tiếp nhắn tin, gọi video hoặc ghé thăm bé để làm quen tính cách, trao đổi thói quen sinh hoạt và khẩu vị của bé.'
    },
    {
      step: '04',
      icon: Heart,
      accentBg: 'bg-indigo-600 text-white',
      tagText: isEn ? 'Mutual Agreement' : 'Đồng thuận 2 bên',
      tagColor: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/50',
      title: isEn ? 'Agree on Care Terms' : 'Thống nhất & Đồng thuận chăm sóc',
      desc: isEn 
        ? 'Both sides mutually agree on care handover, nutrition, and readiness for a safe home welcoming (non-commercial, humane spirit).' 
        : 'Người nhận nuôi và người nuôi tạm cùng thống nhất cách chăm sóc, dinh dưỡng và chuẩn bị sẵn sàng trước ngày đón bé về nhà mới.'
    },
    {
      step: '05',
      icon: Sparkles,
      accentBg: 'bg-emerald-600 text-white',
      tagText: isEn ? 'Community Joy' : 'Lan tỏa niềm vui',
      tagColor: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50',
      title: isEn ? 'Welcome Home & Share Updates' : 'Đón bé về nhà & Chia sẻ niềm vui',
      desc: isEn 
        ? 'Welcome the pet into your loving family! Feel free to share heartwarming photos and stories with the Petcare Hub community.' 
        : 'Đón bạn nhỏ về tổ ấm mới! Tự do chia sẻ những khoảnh khắc đáng yêu và cuộc sống hạnh phúc của bé cùng cộng đồng Petcare Hub.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in text-left">
      <div className="bg-[#faf4ee] dark:bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#efe2d3] dark:border-stone-800 overflow-hidden transition-colors">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#fde2cd] via-[#f8eade] to-[#faefe5] dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 border-b border-[#efe2d3] dark:border-stone-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#d46b28] text-white flex items-center justify-center shrink-0 shadow-md">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#9c3810]/10 dark:bg-amber-400/10 text-[#9c3810] dark:text-amber-300 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isEn ? 'Adoption Timeline' : 'Timeline Kết nối Nhận nuôi'}</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#2b2523] dark:text-stone-100 font-display tracking-tight leading-tight mt-0.5">
                {isEn ? '5-Step Adoption Journey & Community Guide' : 'Quy trình 5 Bước & Hướng dẫn Nhận nuôi'}
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer shrink-0"
            title={isEn ? 'Close' : 'Đóng'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Timeline Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-white dark:bg-stone-900 text-left">
          
          {/* Timeline Stream */}
          <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#efe2d3] dark:before:bg-stone-800">
            {timelineSteps.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.step} className="relative group">
                  {/* Timeline Node Point */}
                  <div className={`absolute -left-6 sm:-left-8 top-1 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center font-black text-[11px] sm:text-xs shadow-xs ring-4 ring-white dark:ring-stone-900 ${item.accentBg} transition-transform group-hover:scale-110`}>
                    <IconComp className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  </div>

                  {/* Step Content Card */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-[#faf4ee] dark:bg-stone-950 border border-[#efe2d3] dark:border-stone-800 space-y-1 hover:border-[#d46b28]/40 dark:hover:border-amber-400/40 transition">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-[#2b2523] dark:text-stone-100 font-display flex items-center gap-1.5">
                        <span className="text-[#9c3810] dark:text-amber-400 font-black">{item.step}.</span>
                        <span>{item.title}</span>
                      </h4>
                      <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border ${item.tagColor}`}>
                        {item.tagText}
                      </span>
                    </div>

                    <p className="text-xs text-[#5c4d46] dark:text-stone-300 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3 Core Welfare Rules Summary Pill Banner */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-[#fde2cd]/70 dark:bg-stone-950 border border-[#f0ceb2] dark:border-stone-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-[#9c3810] dark:text-amber-300 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-[#d46b28] dark:text-amber-400 shrink-0" />
              <span>{isEn ? '3 Community Guidelines & Principles' : '3 Lưu ý Văn hóa & Trách nhiệm Cộng đồng'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="flex items-start gap-1.5 text-[#5c4d46] dark:text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">
                  <strong>{isEn ? 'Non-Profit:' : 'Phi thương mại:'}</strong> {isEn ? 'Connecting with love, zero trading.' : 'Kết nối nhân đạo, không buôn bán.'}
                </span>
              </div>

              <div className="flex items-start gap-1.5 text-[#5c4d46] dark:text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">
                  <strong>{isEn ? 'Safe Home:' : 'Môi trường phù hợp:'}</strong> {isEn ? 'Safe and caring living environment.' : 'Không gian sống an toàn, chu đáo.'}
                </span>
              </div>

              <div className="flex items-start gap-1.5 text-[#5c4d46] dark:text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">
                  <strong>{isEn ? 'Care & Responsibility:' : 'Tình thương & Trách nhiệm:'}</strong> {isEn ? 'Dedicated care & community sharing.' : 'Chăm sóc tận tâm, gắn kết cộng đồng.'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-[#faf4ee] dark:bg-stone-950 border-t border-[#efe2d3] dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          
          <label className="flex items-center gap-2 text-xs text-[#665851] dark:text-stone-300 cursor-pointer self-start sm:self-auto select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded text-[#d46b28] focus:ring-[#d46b28] w-4 h-4 cursor-pointer"
            />
            <span>{isEn ? "Don't show this again" : 'Đã hiểu và không tự động hiện lại'}</span>
          </label>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleClose}
              className="px-3.5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-[#2b2523] dark:text-stone-200 text-xs font-bold transition cursor-pointer"
            >
              {isEn ? 'Close' : 'Đóng'}
            </button>

            <button
              onClick={handleExplore}
              className="px-4 py-2 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isEn ? 'Find a Pet to Adopt' : 'Tìm bạn nhỏ nhận nuôi'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
