import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AdoptionApplication } from '../../types/application';
import { translateBreed } from '../../utils/petTranslator';
import { translateDynamicText } from '../../utils/dataTranslator';
import { translateAddress } from '../../utils/addressTranslator';
import { 
  FileText, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Eye, 
  X, 
  Trash2, 
  Heart, 
  UserCheck, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface MyApplicationsPageProps {
  navigate: (path: string) => void;
}

export const MyApplicationsPage: React.FC<MyApplicationsPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { applications, cancelApplication } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedAppDetail, setSelectedAppDetail] = useState<AdoptionApplication | null>(null);
  const [cancelModalApp, setCancelModalApp] = useState<AdoptionApplication | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  if (!currentUser) return null;

  const myApplications = applications.filter(a => a.applicantId === currentUser.id);

  const filteredApps = myApplications.filter(app => {
    if (statusFilter === 'ALL') return true;
    return app.status === statusFilter;
  });

  const handleConfirmCancel = () => {
    if (!cancelModalApp) return;
    cancelApplication(cancelModalApp.id, cancelReason || (isEn ? 'Applicant self-cancelled' : 'Người nộp đơn tự hủy'));
    setCancelModalApp(null);
    setCancelReason('');
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 font-display">
            {isEn ? 'My Submitted Applications' : 'Đơn nhận nuôi tôi đã nộp'}
          </h1>
          <p className="text-xs text-stone-500">
            {isEn 
              ? 'Track application review status, interview schedules, and adoption commitment protocols.'
              : 'Theo dõi tiến độ xét duyệt hồ sơ, lịch phỏng vấn và biên bản cam kết đón bé.'}
          </p>
        </div>

        <button
          onClick={() => navigate('/pets')}
          className="px-4 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-950/20"
        >
          <Heart className="w-4 h-4 fill-emerald-300 text-emerald-300" />
          <span>{isEn ? 'Browse More Pets' : 'Tìm thêm bé cưng'}</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'ALL', label: isEn ? `All (${myApplications.length})` : `Tất cả (${myApplications.length})` },
          { id: 'PENDING', label: isEn ? `Pending (${myApplications.filter(a => a.status === 'PENDING').length})` : `Chờ xét duyệt (${myApplications.filter(a => a.status === 'PENDING').length})` },
          { id: 'INTERVIEW', label: isEn ? `Interviewing (${myApplications.filter(a => a.status === 'INTERVIEW').length})` : `Đang phỏng vấn (${myApplications.filter(a => a.status === 'INTERVIEW').length})` },
          { id: 'APPROVED', label: isEn ? `Approved (${myApplications.filter(a => a.status === 'APPROVED').length})` : `Đã được duyệt (${myApplications.filter(a => a.status === 'APPROVED').length})` },
          { id: 'BACKUP', label: isEn ? `Backup (${myApplications.filter(a => a.status === 'BACKUP').length})` : `Dự phòng (${myApplications.filter(a => a.status === 'BACKUP').length})` },
          { id: 'REJECTED', label: isEn ? `Rejected (${myApplications.filter(a => a.status === 'REJECTED').length})` : `Bị từ chối (${myApplications.filter(a => a.status === 'REJECTED').length})` },
          { id: 'CANCELLED', label: isEn ? `Cancelled (${myApplications.filter(a => a.status === 'CANCELLED').length})` : `Đã hủy (${myApplications.filter(a => a.status === 'CANCELLED').length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              statusFilter === tab.id
                ? 'bg-[#9c3810] dark:bg-amber-600 text-white shadow-xs'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[#665851] dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApps.length > 0 ? (
        <div className="space-y-4">
          {filteredApps.map(app => (
            <div
              key={app.id}
              className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-5 shadow-xs space-y-4 hover:border-[#d46b28]/30 dark:hover:border-amber-400/30 transition"
            >
              
              {/* Header row: Pet + Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={app.petAvatar || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=120'}
                    alt={app.petName}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#9c3810]/10 dark:ring-amber-400/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">{app.petName}</h3>
                      <span className="text-xs text-stone-500 dark:text-stone-400">({translateBreed(app.petBreed, language)})</span>
                    </div>
                    <p className="text-xs text-[#665851] dark:text-stone-400">
                      {isEn ? 'Posted by:' : 'Người đăng:'} <span className="font-bold text-[#2b2523] dark:text-stone-200">{app.posterUserName}</span>
                    </p>
                    <span className="text-[10px] text-stone-400">
                      {isEn ? 'Submitted on:' : 'Nộp ngày:'} {new Date(app.submittedAt).toLocaleDateString(isEn ? 'en-US' : 'vi-VN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <StatusBadge status={app.status} />
                </div>
              </div>

              {/* Stepper Progress bar */}
              <div className="bg-stone-50 dark:bg-stone-950 p-3.5 rounded-2xl border border-stone-200/70 dark:border-stone-800">
                <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-semibold">
                  <div className={`p-1.5 rounded-xl ${app.status !== 'CANCELLED' && app.status !== 'REJECTED' ? 'bg-[#fde2cd] dark:bg-amber-950/60 text-[#9c3810] dark:text-amber-300 font-bold' : 'text-stone-400 dark:text-stone-500'}`}>
                    {isEn ? '1. Submitted' : '1. Đã gửi đơn'}
                  </div>
                  <div className={`p-1.5 rounded-xl ${app.status === 'INTERVIEW' || app.status === 'APPROVED' ? 'bg-[#fde2cd] dark:bg-amber-950/60 text-[#9c3810] dark:text-amber-300 font-bold' : 'text-stone-400 dark:text-stone-500'}`}>
                    {isEn ? '2. Interview' : '2. Phỏng vấn'}
                  </div>
                  <div className={`p-1.5 rounded-xl ${app.status === 'APPROVED' ? 'bg-[#fde2cd] dark:bg-amber-950/60 text-[#9c3810] dark:text-amber-300 font-bold' : 'text-stone-400 dark:text-stone-500'}`}>
                    {isEn ? '3. Approved & Contract' : '3. Duyệt & Cam kết'}
                  </div>
                  <div className={`p-1.5 rounded-xl ${app.status === 'APPROVED' ? 'bg-[#fde2cd] dark:bg-amber-950/60 text-[#9c3810] dark:text-amber-300 font-bold' : 'text-stone-400 dark:text-stone-500'}`}>
                    {isEn ? '4. Handover & Check-in' : '4. Bàn giao & Check-in'}
                  </div>
                </div>
              </div>

              {/* Rejection / Backup alert box if any */}
              {app.status === 'REJECTED' && app.rejectionReason && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-300 space-y-1">
                  <span className="font-bold block">{isEn ? 'Rejection reason from poster:' : 'Lý do từ chối từ người đăng tin:'}</span>
                  <p>{translateDynamicText(app.rejectionReason, language)}</p>
                </div>
              )}

              {app.status === 'BACKUP' && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
                  {isEn 
                    ? 'Your application is on the backup list. If the primary adopter does not complete the handover process, you will be prioritized next!'
                    : 'Hồ sơ của bạn đang ở danh sách dự phòng. Nếu người nhận nuôi chính không hoàn tất quy trình bàn giao, hệ thống sẽ ưu tiên liên hệ bạn tiếp theo!'}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
                <button
                  onClick={() => setSelectedAppDetail(app)}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-[#2b2523] dark:text-stone-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Review all responses' : 'Xem lại toàn bộ câu trả lời'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {app.status === 'INTERVIEW' && (
                    <button
                      onClick={() => navigate('/appointments')}
                      className="px-4 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-900 dark:bg-teal-700 dark:hover:bg-teal-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{isEn ? 'View interview schedule' : 'Xem lịch phỏng vấn'}</span>
                    </button>
                  )}

                  {app.status === 'APPROVED' && (
                    <button
                      onClick={() => navigate('/commitments')}
                      className="px-4 py-1.5 rounded-xl bg-[#9c3810] hover:bg-[#852f0d] dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer animate-pulse"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Sign Contract & Handover' : 'Ký cam kết & Bàn giao ngay'}</span>
                    </button>
                  )}

                  {(app.status === 'PENDING' || app.status === 'INTERVIEW') && (
                    <button
                      onClick={() => setCancelModalApp(app)}
                      className="px-3 py-1.5 rounded-xl text-stone-500 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Cancel application' : 'Hủy đơn'}</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-900 p-12 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto text-2xl">
            📋
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">
              {isEn ? 'No adoption applications found' : 'Không có đơn nhận nuôi nào'}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {isEn 
                ? 'You have not submitted any applications or no data matches the current filter.'
                : 'Bạn chưa gửi đơn nào hoặc bộ lọc trạng thái hiện tại không có dữ liệu.'}
            </p>
          </div>
          <button
            onClick={() => navigate('/pets')}
            className="px-5 py-2.5 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-bold transition cursor-pointer"
          >
            {isEn ? 'Find a Companion' : 'Tìm bạn nhỏ nhận nuôi'}
          </button>
        </div>
      )}

      {/* DETAIL MODAL: VIEW FULL 6-STEP SURVEY RESPONSES */}
      {selectedAppDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-left">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl border border-stone-200 dark:border-stone-800">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-900 z-10">
              <div>
                <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">
                  {isEn ? `Adoption Application for ${selectedAppDetail.petName}` : `Chi tiết đơn xin nhận nuôi bé ${selectedAppDetail.petName}`}
                </h3>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  {isEn ? 'Application ID:' : 'Mã đơn:'} #{selectedAppDetail.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedAppDetail(null)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Applicant info */}
            <div className="space-y-2 p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800">
              <span className="text-xs font-bold text-[#9c3810] dark:text-amber-400 uppercase block">
                {isEn ? '1. Personal Information' : '1. Thông tin cá nhân người nhận nuôi'}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Full Name:' : 'Họ và tên:'}</span> <b className="text-[#2b2523] dark:text-stone-100">{selectedAppDetail.applicantName}</b></div>
                <div><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Phone Number:' : 'Số điện thoại:'}</span> <b className="text-[#2b2523] dark:text-stone-100">{selectedAppDetail.applicantPhone}</b></div>
                <div><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Occupation:' : 'Nghề nghiệp:'}</span> <b className="text-[#2b2523] dark:text-stone-100">{translateDynamicText(selectedAppDetail.applicantOccupation, language)}</b></div>
                <div><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Address:' : 'Địa chỉ:'}</span> <b className="text-[#2b2523] dark:text-stone-100">{translateAddress(selectedAppDetail.applicantProvince, language)}</b></div>
              </div>
            </div>

            {/* Step 2: Reason */}
            <div className="space-y-2 p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800 text-xs">
              <span className="font-bold text-[#9c3810] dark:text-amber-400 uppercase block">
                {isEn ? '2. Purpose & Adoption Motivation' : '2. Mục đích & Lý do nhận nuôi'}
              </span>
              <p><span className="text-stone-500 dark:text-stone-400 font-medium">{isEn ? 'Adoption reason:' : 'Lý do nhận nuôi:'}</span> <span className="text-[#2b2523] dark:text-stone-200">{translateDynamicText(selectedAppDetail.adoptionReason, language)}</span></p>
              <p><span className="text-stone-500 dark:text-stone-400 font-medium">{isEn ? 'Why choosing this pet:' : 'Vì sao chọn bé này:'}</span> <span className="text-[#2b2523] dark:text-stone-200">{translateDynamicText(selectedAppDetail.reasonForChoosingPet, language)}</span></p>
            </div>

            {/* Step 3: Living Conditions */}
            <div className="space-y-2 p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800 text-xs">
              <span className="font-bold text-[#9c3810] dark:text-amber-400 uppercase block">
                {isEn ? '3. Living Environment & Conditions' : '3. Môi trường & Điều kiện sống'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Housing type:' : 'Loại nhà ở:'}</span> <span className="text-[#2b2523] dark:text-stone-200 font-semibold">{translateDynamicText(selectedAppDetail.housingType, language)}</span></div>
                <div><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Pets allowed in building:' : 'Cho phép nuôi pet:'}</span> <span className="text-[#2b2523] dark:text-stone-200 font-semibold">{selectedAppDetail.petsAllowedInBuilding ? (isEn ? 'Yes' : 'Có') : (isEn ? 'No' : 'Không')}</span></div>
                <div><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Household members:' : 'Số thành viên:'}</span> <span className="text-[#2b2523] dark:text-stone-200 font-semibold">{selectedAppDetail.householdMembersCount} {isEn ? 'people' : 'người'}</span></div>
                <div><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Has children:' : 'Có trẻ nhỏ:'}</span> <span className="text-[#2b2523] dark:text-stone-200 font-semibold">{selectedAppDetail.hasChildrenInHome ? (isEn ? 'Yes' : 'Có') : (isEn ? 'No' : 'Không')}</span></div>
              </div>
              <p><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Pet living space description:' : 'Mô tả nơi sinh hoạt của pet:'}</span> <span className="text-[#2b2523] dark:text-stone-200">{translateDynamicText(selectedAppDetail.petLivingAreaDescription, language)}</span></p>
            </div>

            {/* Step 4: Experience */}
            <div className="space-y-2 p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800 text-xs">
              <span className="font-bold text-[#9c3810] dark:text-amber-400 uppercase block">
                {isEn ? '4. Pet Care Experience' : '4. Kinh nghiệm nuôi thú cưng'}
              </span>
              <p><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Previous pet ownership:' : 'Từng nuôi thú cưng trước đây:'}</span> <span className="text-[#2b2523] dark:text-stone-200 font-semibold">{selectedAppDetail.hasOwnedPetsBefore ? (isEn ? 'Yes, experienced' : 'Đã từng nuôi') : (isEn ? 'First-time pet owner' : 'Chưa từng')}</span></p>
              {selectedAppDetail.previousPetSpeciesAndDuration && (
                <p><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Details:' : 'Chi tiết:'}</span> <span className="text-[#2b2523] dark:text-stone-200">{translateDynamicText(selectedAppDetail.previousPetSpeciesAndDuration, language)}</span></p>
              )}
              <p><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Currently owning pets:' : 'Hiện tại đang nuôi:'}</span> <span className="text-[#2b2523] dark:text-stone-200 font-semibold">{selectedAppDetail.currentlyHasPets ? (isEn ? `Yes (${selectedAppDetail.currentPetsCount} pets)` : `Có (${selectedAppDetail.currentPetsCount} bé)`) : (isEn ? 'None' : 'Không')}</span></p>
            </div>

            {/* Step 5: Capacity */}
            <div className="space-y-2 p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800 text-xs">
              <span className="font-bold text-[#9c3810] dark:text-amber-400 uppercase block">
                {isEn ? '5. Financial & Time Commitment' : '5. Khả năng tài chính & Chăm sóc'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Daily time for pet:' : 'Thời gian dành cho bé:'}</span> <span className="text-[#2b2523] dark:text-stone-200 font-semibold">{translateDynamicText(selectedAppDetail.dailyHoursForPet, language)}</span></div>
                <div><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Monthly budget:' : 'Ngân sách hàng tháng:'}</span> <span className="text-[#2b2523] dark:text-stone-200 font-semibold">{translateDynamicText(selectedAppDetail.estimatedMonthlyBudget, language)}</span></div>
              </div>
              <p><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Care plan when away/traveling:' : 'Kế hoạch khi đi công tác/du lịch:'}</span> <span className="text-[#2b2523] dark:text-stone-200">{translateDynamicText(selectedAppDetail.travelOrAwayCarePlan, language)}</span></p>
            </div>

            {/* Step 6: Commitments */}
            <div className="space-y-1.5 p-4 bg-[#fde2cd]/40 dark:bg-amber-950/30 rounded-2xl border border-[#efe2d3] dark:border-amber-900/40 text-xs text-[#9c3810] dark:text-amber-300">
              <span className="font-bold uppercase block">
                {isEn ? '6. Animal Welfare Commitment' : '6. Cam kết bảo vệ động vật'}
              </span>
              <p>
                {isEn 
                  ? '✓ Agreed to non-commercial adoption, zero abuse, regular vaccinations, and post-adoption check-ins.'
                  : '✓ Đã đồng ý không mua bán, không ngược đãi, tiêm phòng định kỳ và check-in sau nhận nuôi.'}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedAppDetail(null)}
                className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white font-bold text-xs cursor-pointer"
              >
                {isEn ? 'Close' : 'Đóng'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CANCEL APPLICATION MODAL */}
      {cancelModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-left">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 dark:border-stone-800">
            <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">
              {isEn ? 'Confirm Application Cancellation' : 'Xác nhận hủy đơn nhận nuôi'}
            </h3>
            <p className="text-xs text-[#665851] dark:text-stone-300">
              {isEn 
                ? `Are you sure you want to cancel the adoption application for ${cancelModalApp.petName}?`
                : `Bạn có chắc chắn muốn hủy đơn xin nhận nuôi bé ${cancelModalApp.petName}?`}
            </p>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2b2523] dark:text-stone-200 block">
                {isEn ? 'Cancellation reason (optional):' : 'Lý do hủy (tùy chọn):'}
              </label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder={isEn ? 'e.g., Change in relocation plans...' : 'Ví dụ: Thay đổi kế hoạch chuyển nhà...'}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-[#2b2523] dark:text-stone-100 focus:ring-2 focus:ring-[#d46b28]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCancelModalApp(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-[#2b2523] dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-bold cursor-pointer"
              >
                {isEn ? 'Keep Application' : 'Giữ lại đơn'}
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
              >
                {isEn ? 'Cancel Application' : 'Xác nhận hủy'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
