import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { RescuePost } from '../../types/rescue';
import { translateAddress, translateShelterName } from '../../utils/addressTranslator';
import { translateRescuePostData } from '../../utils/dataTranslator';
import { 
  Flame, 
  MapPin, 
  Calendar, 
  Phone, 
  HeartHandshake, 
  Share2, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Check, 
  User,
  ShieldCheck,
  Send,
  Building
} from 'lucide-react';

interface RescueDetailPageProps {
  rescueId: string;
  navigate: (path: string) => void;
}

export const RescueDetailPage: React.FC<RescueDetailPageProps> = ({ rescueId, navigate }) => {
  const { rescuePosts, supportRescuePost } = useData();
  const { currentUser } = useAuth();
  const { language, t } = useLanguage();

  const rawPost = rescuePosts.find(r => r.id === rescueId);
  const post = rawPost ? translateRescuePostData(rawPost, language) : null;
  const [activeImg, setActiveImg] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">{language === 'en' ? 'Rescue case not found' : 'Không tìm thấy thông tin cứu trợ'}</h2>
        <button
          onClick={() => navigate('/rescue')}
          className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs hover:bg-black transition cursor-pointer"
        >
          {language === 'en' ? 'Back to Rescue SOS Listing' : 'Về trang danh sách cứu trợ'}
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    supportRescuePost(post.id);
    setSupportSuccess(true);
    setTimeout(() => {
      setSupportSuccess(false);
      setIsSupportModalOpen(false);
      setSupportMessage('');
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      
      {/* Back button & share */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/rescue')}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'en' ? 'Back to Rescue SOS Listing' : 'Quay lại danh sách cứu trợ'}</span>
        </button>

        <button
          onClick={handleShare}
          className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span>{copied ? (language === 'en' ? 'Link Copied!' : 'Đã sao chép link') : (language === 'en' ? 'Share This Case' : 'Chia sẻ ca này')}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Photos & Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Photo */}
          <div className="relative rounded-3xl overflow-hidden bg-stone-900 aspect-[4/3] shadow-md border border-stone-200 dark:border-stone-800">
            <img
              src={post.images[activeImg] || post.images[0]}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            {post.priority === 'URGENT' && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-700 text-white shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span>{language === 'en' ? 'URGENT SOS' : 'KHẨN CẤP'}</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {post.images && post.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {post.images.map((url: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                    activeImg === idx ? 'border-rose-600' : 'border-stone-200 dark:border-stone-700 opacity-70'
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Detailed Description */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">{language === 'en' ? 'Detailed Rescue Case Description' : 'Mô tả chi tiết ca cứu hộ'}</h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line font-normal">
              {post.description}
            </p>
          </div>

          {/* Transparency & Safety Notice */}
          <div className="p-4 bg-stone-100 dark:bg-stone-850 rounded-3xl border border-stone-200 dark:border-stone-700 space-y-2 text-xs text-stone-700 dark:text-stone-300">
            <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100">
              <ShieldCheck className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
              <span>{language === 'en' ? 'PetCare Hub Rescue Transparency Principles' : 'Nguyên tắc minh bạch cứu trợ PetCare Hub'}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">
              {language === 'en'
                ? 'All hospital fees and supplies require clinical receipts, prescriptions, or direct vet confirmation to ensure community integrity.'
                : 'Các thông tin viện phí và vật tư cần được cập nhật hóa đơn, đơn thuốc hoặc xác nhận trực tiếp từ phòng khám/bác sĩ thú y để bảo vệ lòng tin của cộng đồng.'}
            </p>
          </div>

        </div>

        {/* Right Column: Key Needs & Action Card */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5 sticky top-24">
            
            <div className="space-y-2 border-b border-stone-100 dark:border-stone-800 pb-4">
              <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                {t('rescue.priorityUrgent')}
              </span>
              <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100 font-display leading-snug">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
                <MapPin className="w-3.5 h-3.5 text-[#d46b28] dark:text-amber-400 shrink-0" />
                <span>{translateAddress(post.supportLocation, language)}</span>
              </div>
            </div>

            {/* Need Highlights */}
            <div className="p-4 bg-rose-50/80 dark:bg-rose-950/40 rounded-2xl border border-rose-100 dark:border-rose-900/40 space-y-2">
              <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase block">{language === 'en' ? 'Specific Rescue Need:' : 'Nhu cầu cứu trợ cụ thể:'}</span>
              <p className="text-base font-black text-rose-950 dark:text-rose-200 font-display">{post.quantityNeeded}</p>
              <div className="text-[11px] text-stone-600 dark:text-stone-400 flex items-center justify-between pt-1 border-t border-rose-200/50 dark:border-rose-800/40">
                <span>{language === 'en' ? 'Deadline:' : 'Hạn cần tiếp sức:'}</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">{post.requiredDate}</span>
              </div>
            </div>

            {/* DEDICATED SHELTER / RESCUE STATION & HOTLINE & ADDRESS */}
            <div className="p-4 bg-stone-50 dark:bg-stone-800/80 rounded-2xl border border-stone-200/80 dark:border-stone-700 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase block tracking-wider">
                  {t('rescue.shelterStation')}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-[10px] font-bold">
                  {t('common.noProfiteering')}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#d46b28] dark:text-amber-400 shrink-0" />
                  <span>{translateShelterName(post.shelterName, language) || (language === 'vi' ? 'Trạm Cứu Hộ Động Vật Liên Kết' : 'Partner Animal Shelter')}</span>
                </h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-start gap-1.5 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span>{translateAddress(post.shelterAddress || post.supportLocation, language)}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold">{language === 'en' ? 'Station Officer:' : 'Người trực trạm:'}</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">{post.contactPerson}</span>
                </div>
                <a 
                  href={`tel:${post.shelterHotline || post.contactPhone}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-xs shadow-xs transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Call Hotline:' : 'Gọi Hotline:'} {post.shelterHotline || post.contactPhone}</span>
                </a>
              </div>
            </div>

            {/* Non-profit & Anti-Profiteering Pledge */}
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200/80 dark:border-amber-800 text-[11px] text-amber-950 dark:text-amber-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <b>{language === 'en' ? 'Welfare & Anti-Profiteering Commitment:' : 'Nguyên tắc phúc lợi & Không trục lợi:'}</b> {language === 'en' ? 'Rescue operations are 100% non-profit. All funded hospital fees, medication, or supplies are directly dedicated to this pet\'s medical recovery.' : 'Hoạt động cứu hộ hoàn toàn phi lợi nhuận. Mọi khoản viện phí, thuốc men hoặc vật phẩm tài trợ đều được phục vụ trực tiếp cho quá trình điều trị của bé.'}
              </p>
            </div>

            {/* Action CTA */}
            <div className="pt-1 space-y-2">
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-bold tracking-wide shadow-md transition cursor-pointer"
              >
                {language === 'en' ? 'Register Aid for this Pet' : 'Đăng ký hỗ trợ ca này'}
              </button>

              <button
                onClick={() => navigate(`/reports?targetType=RESCUE_POST&targetId=${post.id}`)}
                className="w-full py-2 text-center text-[11px] font-semibold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition cursor-pointer"
              >
                {language === 'en' ? 'Report suspicious or fraudulent post' : 'Báo cáo tin đăng có dấu hiệu gian lận'}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* SUPPORT MODAL */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-stone-200 dark:border-stone-800">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">{t('rescue.supportModalTitle')}</h3>
              <button onClick={() => setIsSupportModalOpen(false)} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer">✕</button>
            </div>

            {supportSuccess ? (
              <div className="p-6 text-center space-y-3 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-base font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">{t('rescue.supportRecorded')}</h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">{language === 'en' ? `Your contact details have been sent to ${post.contactPerson}.` : `Thông tin liên hệ đã được gửi tới ${post.contactPerson}.`}</p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">{t('rescue.supportTypeLabel')}</label>
                  <textarea
                    rows={3}
                    required
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder={t('rescue.supportMsgPlaceholder')}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300">{t('auth.fullName')} *</label>
                    <input
                      type="text"
                      required
                      defaultValue={currentUser?.name || ''}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300">{t('auth.phone')} *</label>
                    <input
                      type="tel"
                      required
                      defaultValue={currentUser?.phone || ''}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSupportModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition cursor-pointer"
                  >
                    {t('common.close')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-bold shadow-sm transition cursor-pointer"
                  >
                    {t('rescue.sendSupportBtn')}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
