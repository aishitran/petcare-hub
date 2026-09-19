import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ReportReason, ReportTargetType } from '../../types/report';
import { translateDynamicText } from '../../utils/dataTranslator';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Lock 
} from 'lucide-react';

interface ReportSubmissionPageProps {
  navigate: (path: string) => void;
}

export const ReportSubmissionPage: React.FC<ReportSubmissionPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { reports, submitReport, pets, rescuePosts } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [targetType, setTargetType] = useState<ReportTargetType>('PET');
  const [targetId, setTargetId] = useState(pets[0]?.id || '');
  const [reason, setReason] = useState<ReportReason>('COMMERCIAL_SELLING');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!currentUser) return null;

  const mySubmittedReports = reports.filter(r => r.reporterUserId === currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let targetTitle = isEn ? 'Pet' : 'Thú cưng';
    if (targetType === 'PET') {
      const p = pets.find(pet => pet.id === targetId);
      if (p) targetTitle = isEn ? `Pet ${p.name} (ID: ${p.id})` : `Bé ${p.name} (ID: ${p.id})`;
    } else if (targetType === 'RESCUE_POST') {
      const r = rescuePosts.find(res => res.id === targetId);
      if (r) targetTitle = isEn ? `Rescue Case: ${r.title}` : `Ca cứu hộ: ${r.title}`;
    }

    submitReport({
      reporterUserId: currentUser.id,
      reporterUserName: currentUser.name,
      targetType,
      targetId: targetId || 'target-sample',
      targetTitle,
      reason,
      description,
      evidenceImages: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400']
    });

    setSubmitted(true);
    setDescription('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-2xl font-black text-stone-900 font-display">
          {isEn ? 'Community Violation Reports' : 'Báo cáo vi phạm cộng đồng'}
        </h1>
        <p className="text-xs text-stone-500">
          {isEn 
            ? 'Join hands to protect the community by reporting disguised commercial sales, animal cruelty, or fraudulent rescue appeals.' 
            : 'Chung tay bảo vệ cộng đồng bằng cách phản ánh các hành vi buôn bán thương mại trá hình, ngược đãi hoặc thông tin cứu trợ sai sự thật.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Report Form */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-5">
          <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>{isEn ? 'Submit Violation Report to Administrators' : 'Gửi phản ánh mới tới Ban Quản Trị'}</span>
          </h3>

          {submitted ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-emerald-950 text-base">
                {isEn ? 'Report Received!' : 'Đã tiếp nhận báo cáo!'}
              </h4>
              <p className="text-xs text-emerald-800">
                {isEn 
                  ? 'PetCare Hub moderation team will investigate and take action within 12 - 24 hours.' 
                  : 'Đội ngũ kiểm duyệt viên PetCare Hub sẽ điều tra và xử lý vi phạm trong vòng 12 - 24 giờ.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isEn ? 'Report Target *' : 'Đối tượng báo cáo *'}
                </label>
                <select
                  value={targetType}
                  onChange={(e: any) => setTargetType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 font-bold"
                >
                  <option value="PET">{isEn ? 'Pet Listing' : 'Tin đăng thú cưng'}</option>
                  <option value="RESCUE_POST">{isEn ? 'Rescue Appeal Post' : 'Tin kêu gọi cứu hộ'}</option>
                  <option value="USER">{isEn ? 'User / Violating Account' : 'Người dùng / Tài khoản vi phạm'}</option>
                  <option value="APPLICATION">{isEn ? 'Adoption Application with Fraud Signs' : 'Đơn nhận nuôi có dấu hiệu gian lận'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isEn ? 'Violation Category *' : 'Hành vi vi phạm *'}
                </label>
                <select
                  value={reason}
                  onChange={(e: any) => setReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 font-bold text-rose-700"
                >
                  <option value="COMMERCIAL_SELLING">{isEn ? 'Disguised pet sales / Extortionate adoption fees' : 'Mua bán thú cưng trá hình / Ép giá nhận nuôi'}</option>
                  <option value="ANIMAL_ABUSE">{isEn ? 'Signs of animal cruelty, confinement, or neglect' : 'Có dấu hiệu ngược đãi, giam cầm động vật'}</option>
                  <option value="FAKE_RESCUE">{isEn ? 'Fake rescue appeal / Fraudulent hospital fees' : 'Kêu gọi viện phí / cứu hộ giả mạo'}</option>
                  <option value="INCORRECT_INFO">{isEn ? 'Inaccurate health info / Misleading photos' : 'Thông tin sức khỏe / hình ảnh không đúng thực tế'}</option>
                  <option value="HARASSMENT">{isEn ? 'Harassment, intimidation, or toxic language' : 'Quấy rối, đe dọa hoặc ngôn từ thiếu văn minh'}</option>
                  <option value="OTHER">{isEn ? 'Other reason' : 'Lý do khác'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isEn ? 'Detailed Description of Violation *' : 'Mô tả chi tiết vi phạm *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={isEn ? 'Provide evidence, message logs, or specific suspicious behavior...' : 'Cung cấp bằng chứng, nội dung tin nhắn hoặc hành vi bất thường cụ thể...'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl text-[11px] text-stone-500 flex items-center gap-2">
                <Lock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>
                  {isEn 
                    ? 'Reporter identity is 100% confidential and never disclosed to the reported party.' 
                    : 'Danh tính người báo cáo được bảo mật hoàn toàn 100% đối với đối tượng bị báo cáo.'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isEn ? 'Submit Violation Report' : 'Gửi báo cáo vi phạm'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: History of My Reports */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-bold text-stone-900 text-sm">
            {isEn ? `Reports Submitted by You (${mySubmittedReports.length})` : `Báo cáo bạn đã gửi (${mySubmittedReports.length})`}
          </h3>

          {mySubmittedReports.length > 0 ? (
            <div className="space-y-3">
              {mySubmittedReports.map(rep => (
                <div key={rep.id} className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-xs">{translateDynamicText(rep.targetTitle, language)}</h4>
                      <span className="text-[10px] text-stone-400">
                        {isEn ? 'Submitted on:' : 'Gửi ngày:'} {new Date(rep.createdAt).toLocaleDateString(isEn ? 'en-US' : 'vi-VN')}
                      </span>
                    </div>
                    <StatusBadge status={rep.status} />
                  </div>

                  <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-2xl">
                    "{translateDynamicText(rep.description, language)}"
                  </p>

                  {rep.adminNotes && (
                    <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900">
                      <b>{isEn ? 'Admin Feedback:' : 'Phản hồi từ Admin:'}</b> {translateDynamicText(rep.adminNotes, language)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-dashed border-stone-300 text-center text-xs text-stone-400">
              {isEn ? 'You have not submitted any violation reports.' : 'Bạn chưa gửi báo cáo vi phạm nào.'}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
