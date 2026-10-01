import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ReportReason, ReportTargetType } from '../../types/report';
import { 
  X, 
  ShieldAlert, 
  AlertTriangle, 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  CheckCircle2, 
  Lock
} from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: ReportTargetType;
  targetId: string;
  targetTitle: string;
  targetUserName?: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitle,
  targetUserName
}) => {
  const { submitReport } = useData();
  const { currentUser } = useAuth();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [reason, setReason] = useState<ReportReason>('SCAM');
  const [description, setDescription] = useState('');
  const [evidenceImages, setEvidenceImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const reasonOptions: { value: ReportReason; labelVi: string; labelEn: string; descVi: string; descEn: string }[] = [
    {
      value: 'SCAM',
      labelVi: 'Lừa đảo / Chiếm đoạt tài sản',
      labelEn: 'Scam / Financial Fraud',
      descVi: 'Yêu cầu chuyển tiền cọc vô lý, bán thú cưng trá hình hoặc mạo danh người khác.',
      descEn: 'Unreasonable deposit requests, masked commercial sale, or identity theft.'
    },
    {
      value: 'COMMERCIAL_SELLING',
      labelVi: 'Buôn bán thương mại trá hình',
      labelEn: 'Commercial Pet Selling',
      descVi: 'Đội lốt nhận nuôi để bán thú giống, kinh doanh nhân giống trái phép.',
      descEn: 'Using adoption shelter guise for commercial breeding or selling.'
    },
    {
      value: 'ANIMAL_ABUSE',
      labelVi: 'Ngược đãi / Bỏ rơi động vật',
      labelEn: 'Animal Abuse / Neglect',
      descVi: 'Hình ảnh, hành vi có dấu hiệu bạo hành, nuôi nhốt trong điều kiện tồi tệ.',
      descEn: 'Signs of abuse, extreme caging, or life-threatening neglect.'
    },
    {
      value: 'FALSE_INFORMATION',
      labelVi: 'Thông tin sai sự thật / Ảnh giả mạo',
      labelEn: 'False Information / Fake Photos',
      descVi: 'Ảnh lấy từ mạng, khai báo sai tuổi, giống loài hoặc bệnh án của bé.',
      descEn: 'Stolen internet photos, fake age/breed/vaccination status.'
    },
    {
      value: 'COMMITMENT_VIOLATION',
      labelVi: 'Vi phạm cam kết nhận nuôi',
      labelEn: 'Adoption Pledge Violation',
      descVi: 'Không phản hồi check-in định kỳ, mang bé đi bán lại hoặc chuyển nhượng trái phép.',
      descEn: 'Refusing follow-up check-ins, reselling adopted pet without consent.'
    },
    {
      value: 'HARASSMENT',
      labelVi: 'Quấy rối / Đe dọa / Hành vi phản cảm',
      labelEn: 'Harassment / Abusive Behavior',
      descVi: 'Ngôn từ xúc phạm, đe dọa hoặc quấy rối người khác trong hệ thống.',
      descEn: 'Toxic language, threats, harassment in chats or comments.'
    },
    {
      value: 'OTHER',
      labelVi: 'Lý do khác',
      labelEn: 'Other Concern',
      descVi: 'Các hành vi vi phạm chuẩn mực cộng đồng khác cần ban quản trị kiểm tra.',
      descEn: 'Other suspicious activity requiring admin investigation.'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (evidenceImages.length >= 4) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEvidenceImages(prev => prev.length < 4 ? [...prev, reader.result as string] : prev);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setEvidenceImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);

    submitReport({
      reporterUserId: currentUser?.id || 'guest-user',
      reporterUserName: currentUser?.name || (isEn ? 'Community Member' : 'Thành viên cộng đồng'),
      targetType,
      targetId,
      targetTitle,
      targetUserName,
      reason,
      description: description.trim(),
      evidenceImages
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setDescription('');
        setEvidenceImages([]);
      }, 2000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 dark:border-stone-800 transition-colors">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/90 dark:bg-stone-950 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900 dark:text-stone-100 font-display">
                {targetType === 'USER' 
                  ? (isEn ? 'Report User Account' : 'Báo cáo Tài khoản Người dùng')
                  : (isEn ? 'Report Post / Content' : 'Báo cáo Bài đăng / Nội dung')}
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                {isEn ? 'Help maintain a safe and transparent pet welfare community' : 'Chung tay xây dựng cộng đồng nhận nuôi an toàn & minh bạch'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content / Form */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-stone-900 dark:text-stone-100">
              {isEn ? 'Report Submitted Successfully' : 'Đã gửi báo cáo vi phạm thành công'}
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
              {isEn 
                ? 'Thank you for your report. Our Admin moderation team has received the evidence and will investigate within 24 hours.' 
                : 'Cảm ơn bạn đã phản ánh. Đội ngũ Kiểm duyệt Admin đã tiếp nhận thông tin và ảnh minh chứng để xác minh trong vòng 24 giờ.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
            
            {/* Target Summary Card */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-[#9c3810] dark:text-amber-400 font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{isEn ? 'Subject being reported:' : 'Đối tượng bị phản ánh:'}</span>
              </div>
              <p className="font-bold text-stone-800 dark:text-stone-200 text-xs truncate">
                {targetTitle}
              </p>
              {targetUserName && (
                <p className="text-[11px] text-stone-600 dark:text-stone-400">
                  {isEn ? 'Related User:' : 'Chủ tài khoản liên quan:'} <b>{targetUserName}</b>
                </p>
              )}
            </div>

            {/* Violation Reason Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                {isEn ? 'Select Violation Category *' : 'Chọn lý do vi phạm *'}
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {reasonOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 p-3 rounded-2xl border text-xs cursor-pointer transition ${
                      reason === opt.value
                        ? 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200 ring-1 ring-rose-400'
                        : 'bg-stone-50/60 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={opt.value}
                      checked={reason === opt.value}
                      onChange={() => setReason(opt.value)}
                      className="mt-0.5 text-rose-600 focus:ring-rose-500"
                    />
                    <div className="space-y-0.5">
                      <span className="font-bold block text-stone-900 dark:text-stone-100">
                        {isEn ? opt.labelEn : opt.labelVi}
                      </span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight block">
                        {isEn ? opt.descEn : opt.descVi}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                {isEn ? 'Detailed Description & Context *' : 'Mô tả chi tiết vi phạm *'}
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isEn 
                  ? 'Please describe specific behaviors, dates, chat details, or unusual money requests...' 
                  : 'Vui lòng mô tả rõ diễn biến, mốc thời gian, nội dung tin nhắn hoặc các yêu cầu bất thường...'}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none placeholder-stone-400"
              />
            </div>

            {/* Evidence Image Upload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                  {isEn ? 'Evidence Screenshots / Photos (Max 4)' : 'Ảnh minh chứng / Ảnh chụp màn hình (Tối đa 4 ảnh)'}
                </label>
                <span className="text-[11px] text-stone-400">
                  {evidenceImages.length}/4 {isEn ? 'images' : 'ảnh'}
                </span>
              </div>

              {/* Upload Drop Zone / Button */}
              <div className="flex flex-wrap gap-2.5 items-center">
                {evidenceImages.map((imgUrl, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 group shadow-2xs">
                    <img src={imgUrl} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-400 transition"
                      title={isEn ? 'Remove image' : 'Xóa ảnh'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {evidenceImages.length < 4 && (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="evidence-file-upload"
                    />
                    <label
                      htmlFor="evidence-file-upload"
                      className="w-20 h-20 rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-rose-400 dark:hover:border-rose-500 bg-stone-50 dark:bg-stone-800/60 flex flex-col items-center justify-center text-stone-500 dark:text-stone-400 hover:text-rose-600 transition cursor-pointer gap-1"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="text-[10px] font-bold">{isEn ? 'Browse' : 'Chọn ảnh'}</span>
                    </label>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-stone-400">
                {isEn 
                  ? 'Supports JPG, PNG, WebP screenshot files showing transactions or chats.' 
                  : 'Hỗ trợ định dạng JPG, PNG, ảnh chụp màn hình tin nhắn hoặc sao kê giao dịch.'}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold transition cursor-pointer"
              >
                {isEn ? 'Cancel' : 'Hủy bỏ'}
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !description.trim()}
                className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>{isSubmitting ? (isEn ? 'Submitting...' : 'Đang gửi...') : (isEn ? 'Submit Report' : 'Gửi báo cáo vi phạm')}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
