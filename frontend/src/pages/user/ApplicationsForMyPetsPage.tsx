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
  CheckCircle2, 
  XCircle, 
  Calendar, 
  FileText, 
  UserCheck, 
  Eye, 
  X, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  Filter, 
  Sparkles,
  Phone,
  Home,
  Award
} from 'lucide-react';

interface ApplicationsForMyPetsPageProps {
  navigate: (path: string) => void;
}

export const ApplicationsForMyPetsPage: React.FC<ApplicationsForMyPetsPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { 
    applications, 
    pets, 
    updateApplicationStatus, 
    scheduleAppointment 
  } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [selectedPetFilter, setSelectedPetFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [surveyModalApp, setSurveyModalApp] = useState<AdoptionApplication | null>(null);
  
  // Rejection modal
  const [rejectModalApp, setRejectModalApp] = useState<AdoptionApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Quick Schedule Interview modal
  const [scheduleModalApp, setScheduleModalApp] = useState<AdoptionApplication | null>(null);
  const [interviewDate, setInterviewDate] = useState('2026-09-12');
  const [interviewTime, setInterviewTime] = useState('14:30');
  const [interviewFormat, setInterviewFormat] = useState<'ONLINE' | 'IN_PERSON'>('ONLINE');
  const [interviewNotes, setInterviewNotes] = useState('');

  if (!currentUser) return null;

  const myPets = pets.filter(p => p.creatorUserId === currentUser.id);
  const myReceivedApps = applications.filter(a => a.posterUserId === currentUser.id);

  const filteredApps = myReceivedApps.filter(app => {
    if (selectedPetFilter !== 'ALL' && app.petId !== selectedPetFilter) return false;
    if (selectedStatusFilter !== 'ALL' && app.status !== selectedStatusFilter) return false;
    return true;
  });

  const handleApprove = (app: AdoptionApplication) => {
    const confirmMsg = isEn
      ? `Are you sure you want to APPROVE ${app.applicantName}'s application for ${app.petName}? The pet status will be locked for contract signing & handover.`
      : `Bạn có chắc chắn muốn DUYỆT hồ sơ của ${app.applicantName} nhận nuôi bé ${app.petName}? Bé sẽ được khóa trạng thái để chuẩn bị ký cam kết & bàn giao.`;
    
    if (window.confirm(confirmMsg)) {
      updateApplicationStatus(app.id, 'APPROVED');
    }
  };

  const handleMarkBackup = (app: AdoptionApplication) => {
    updateApplicationStatus(app.id, 'BACKUP');
  };

  const handleConfirmReject = () => {
    if (!rejectModalApp) return;
    const defaultReason = isEn ? 'Does not meet the criteria for this pet at this time' : 'Chưa phù hợp với điều kiện của bé tại thời điểm này';
    updateApplicationStatus(rejectModalApp.id, 'REJECTED', rejectionReason || defaultReason);
    setRejectModalApp(null);
    setRejectionReason('');
  };

  const handleConfirmSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleModalApp) return;

    const defaultLocation = interviewFormat === 'ONLINE' 
      ? 'https://meet.google.com/pet-care-demo' 
      : (isEn ? 'Poster private home address' : 'Địa chỉ nhà riêng người đăng tin');

    scheduleAppointment({
      applicationId: scheduleModalApp.id,
      petId: scheduleModalApp.petId,
      petName: scheduleModalApp.petName,
      applicantId: scheduleModalApp.applicantId,
      applicantName: scheduleModalApp.applicantName,
      applicantPhone: scheduleModalApp.applicantPhone || '0901234567',
      posterUserId: scheduleModalApp.posterUserId,
      posterUserName: scheduleModalApp.posterUserName,
      date: interviewDate,
      time: interviewTime,
      format: interviewFormat,
      locationOrLink: defaultLocation,
      notes: interviewNotes
    });

    updateApplicationStatus(scheduleModalApp.id, 'INTERVIEW');
    setScheduleModalApp(null);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-2xl font-black text-stone-900 font-display">
          {isEn ? 'Applications for My Pets' : 'Đơn nhận nuôi thú cưng của tôi'}
        </h1>
        <p className="text-xs text-stone-500">
          {isEn 
            ? 'Review adoption applications, schedule interviews, and choose the most suitable forever families for your pets.'
            : 'Xem xét các đơn đăng ký nhận nuôi, phỏng vấn ứng viên và lựa chọn gia đình phù hợp nhất cho các bé.'}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Pet Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-[#665851] dark:text-stone-300">{isEn ? 'Filter by pet:' : 'Lọc theo bé:'}</span>
          <select
            value={selectedPetFilter}
            onChange={(e) => setSelectedPetFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold text-[#2b2523] dark:text-stone-100"
          >
            <option value="ALL">
              {isEn ? `All my pets (${myPets.length} pets)` : `Tất cả thú cưng của tôi (${myPets.length} bé)`}
            </option>
            {myPets.map(pet => (
              <option key={pet.id} value={pet.id}>
                {pet.name} ({isEn ? (pet.species === 'DOG' ? 'Dog' : 'Cat') : (pet.species === 'DOG' ? 'Chó' : 'Mèo')})
              </option>
            ))}
          </select>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {[
            { id: 'ALL', label: isEn ? 'All' : 'Tất cả' },
            { id: 'PENDING', label: isEn ? 'Pending' : 'Chờ duyệt' },
            { id: 'INTERVIEW', label: isEn ? 'Interview' : 'Phỏng vấn' },
            { id: 'APPROVED', label: isEn ? 'Approved' : 'Đã duyệt' },
            { id: 'BACKUP', label: isEn ? 'Backup' : 'Dự phòng' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatusFilter(tab.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedStatusFilter === tab.id
                  ? 'bg-[#9c3810] dark:bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-[#665851] dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Applications List */}
      {filteredApps.length > 0 ? (
        <div className="space-y-4">
          {filteredApps.map(app => (
            <div
              key={app.id}
              className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-5 shadow-xs space-y-4 hover:border-[#d46b28]/30 dark:hover:border-amber-400/30 transition"
            >
              
              {/* Applicant Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#fde2cd] dark:bg-amber-950/50 text-[#9c3810] dark:text-amber-300 font-black text-lg flex items-center justify-center shrink-0">
                    {app.applicantName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">{app.applicantName}</h3>
                      <span className="text-xs font-semibold text-[#9c3810] dark:text-amber-400">
                        ({isEn ? `${app.applicantAge} years old` : `${app.applicantAge} tuổi`}, {translateDynamicText(app.applicantOccupation, language)})
                      </span>
                      <StatusBadge status={app.status} />
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2 flex-wrap mt-0.5">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-stone-400" />
                        {app.applicantPhone}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Home className="w-3 h-3 text-stone-400" />
                        {translateDynamicText(app.housingType, language)} ({translateAddress(app.applicantProvince, language)})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pet Target Box */}
                <div className="p-2.5 bg-[#fde2cd]/40 dark:bg-amber-950/30 rounded-2xl border border-[#efe2d3] dark:border-amber-900/40 flex items-center gap-2.5 self-start sm:self-auto">
                  <img
                    src={app.petAvatar || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100'}
                    alt=""
                    className="w-8 h-8 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] text-[#9c3810] dark:text-amber-400 font-bold uppercase block">
                      {isEn ? 'Applying for:' : 'Đăng ký nhận nuôi:'}
                    </span>
                    <span className="text-xs font-black text-[#2b2523] dark:text-stone-100">
                      {isEn ? `Pet ${app.petName}` : `Bé ${app.petName}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Snapshot Survey summary */}
              <div className="p-3.5 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/70 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-stone-400 dark:text-stone-500 text-[11px] block font-semibold">
                    {isEn ? 'Pet care experience:' : 'Kinh nghiệm nuôi thú cưng:'}
                  </span>
                  <span className="font-bold text-[#2b2523] dark:text-stone-200">
                    {app.hasOwnedPetsBefore 
                      ? (isEn ? 'Has owned pets previously' : 'Đã từng nuôi trước đây')
                      : (isEn ? 'First-time pet owner' : 'Người mới nuôi lần đầu')}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 dark:text-stone-500 text-[11px] block font-semibold">
                    {isEn ? 'Daily time for pet:' : 'Thời gian dành cho pet:'}
                  </span>
                  <span className="font-bold text-[#2b2523] dark:text-stone-200">{translateDynamicText(app.dailyHoursForPet, language)}</span>
                </div>
                <div>
                  <span className="text-stone-400 dark:text-stone-500 text-[11px] block font-semibold">
                    {isEn ? 'Monthly care budget:' : 'Ngân sách chi trả hàng tháng:'}
                  </span>
                  <span className="font-bold text-[#2b2523] dark:text-stone-200">{translateDynamicText(app.estimatedMonthlyBudget, language)}</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
                <button
                  onClick={() => setSurveyModalApp(app)}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-[#2b2523] dark:text-stone-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isEn ? 'View all answers' : 'Xem toàn bộ 6 bước khảo sát'}</span>
                </button>

                <div className="flex items-center gap-2 flex-wrap">
                  
                  {/* PENDING -> INTERVIEW */}
                  {app.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => setScheduleModalApp(app)}
                        className="px-3.5 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-900 dark:bg-teal-700 dark:hover:bg-teal-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Schedule Interview' : 'Hẹn phỏng vấn'}</span>
                      </button>

                      <button
                        onClick={() => handleMarkBackup(app)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-xs font-bold transition cursor-pointer"
                      >
                        {isEn ? 'Set as Backup' : 'Lưu dự phòng'}
                      </button>

                      <button
                        onClick={() => setRejectModalApp(app)}
                        className="px-3 py-1.5 rounded-xl text-stone-500 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Decline' : 'Từ chối'}</span>
                      </button>
                    </>
                  )}

                  {/* INTERVIEW -> APPROVE or REJECT */}
                  {app.status === 'INTERVIEW' && (
                    <>
                      <button
                        onClick={() => handleApprove(app)}
                        className="px-4 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Approve for Adoption' : 'Duyệt nhận nuôi chính thức'}</span>
                      </button>

                      <button
                        onClick={() => handleMarkBackup(app)}
                        className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-xs font-bold transition cursor-pointer"
                      >
                        {isEn ? 'Move to Backup' : 'Chuyển sang dự phòng'}
                      </button>

                      <button
                        onClick={() => setRejectModalApp(app)}
                        className="px-3 py-1.5 rounded-xl text-stone-500 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Decline' : 'Từ chối'}</span>
                      </button>
                    </>
                  )}

                  {/* APPROVED STATUS */}
                  {app.status === 'APPROVED' && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {isEn ? 'Official Adopter Selected' : 'Đã chọn người nhận nuôi chính'}
                      </span>
                      <button
                        onClick={() => navigate('/commitments')}
                        className="px-3 py-1.5 rounded-xl bg-[#9c3810] hover:bg-[#852f0d] dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-xs font-bold transition cursor-pointer"
                      >
                        {isEn ? 'Track Handover' : 'Xem bàn giao'}
                      </button>
                    </div>
                  )}

                  {/* BACKUP STATUS */}
                  {app.status === 'BACKUP' && (
                    <button
                      onClick={() => setScheduleModalApp(app)}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-900 dark:bg-teal-700 dark:hover:bg-teal-600 text-white text-xs font-bold transition cursor-pointer"
                    >
                      {isEn ? 'Activate for Interview' : 'Gọi phỏng vấn'}
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
            📬
          </div>
          <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">
            {isEn ? 'No applications received yet' : 'Chưa có đơn đăng ký nào'}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {isEn 
              ? 'Adoption applications submitted for your pets will be displayed here.'
              : 'Các đơn xin nhận nuôi cho thú cưng bạn đã đăng tải sẽ hiển thị tại đây.'}
          </p>
        </div>
      )}

      {/* SCHEDULE INTERVIEW MODAL */}
      {scheduleModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-left">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">
                {isEn ? 'Schedule Interview / Meetup' : 'Đặt lịch phỏng vấn / Gặp mặt'}
              </h3>
              <button onClick={() => setScheduleModalApp(null)} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleConfirmSchedule} className="space-y-4">
              <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800 text-xs space-y-1">
                <div><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Applicant:' : 'Người nhận nuôi:'}</span> <b className="text-[#2b2523] dark:text-stone-100">{scheduleModalApp.applicantName}</b></div>
                <div><span className="text-stone-500 dark:text-stone-400">{isEn ? 'Pet:' : 'Thú cưng:'}</span> <b className="text-[#9c3810] dark:text-amber-400">{isEn ? `Pet ${scheduleModalApp.petName}` : `Bé ${scheduleModalApp.petName}`}</b></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                    {isEn ? 'Appointment Date *' : 'Ngày hẹn *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-[#2b2523] dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                    {isEn ? 'Appointment Time *' : 'Giờ hẹn *'}
                  </label>
                  <input
                    type="time"
                    required
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-[#2b2523] dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                  {isEn ? 'Interview Format *' : 'Hình thức phỏng vấn *'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setInterviewFormat('ONLINE')}
                    className={`py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      interviewFormat === 'ONLINE' ? 'bg-teal-800 dark:bg-teal-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-[#665851] dark:text-stone-300'
                    }`}
                  >
                    {isEn ? 'Online (Google Meet)' : 'Online (Google Meet / Video)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterviewFormat('IN_PERSON')}
                    className={`py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      interviewFormat === 'IN_PERSON' ? 'bg-teal-800 dark:bg-teal-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-[#665851] dark:text-stone-300'
                    }`}
                  >
                    {isEn ? 'In-person (Home visit)' : 'Trực tiếp (Gặp tại nhà)'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2b2523] dark:text-stone-200 mb-1">
                  {isEn ? 'Notes for Applicant' : 'Ghi chú cho ứng viên'}
                </label>
                <textarea
                  rows={2}
                  value={interviewNotes}
                  onChange={(e) => setInterviewNotes(e.target.value)}
                  placeholder={isEn ? 'e.g., Please prepare photos of your balcony / pet living area...' : 'Ví dụ: Vui lòng chuẩn bị hình ảnh ban công / nơi ở của bé...'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-[#2b2523] dark:text-stone-100 focus:ring-2 focus:ring-[#d46b28]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setScheduleModalApp(null)}
                  className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-[#2b2523] dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-bold cursor-pointer"
                >
                  {isEn ? 'Cancel' : 'Hủy'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 dark:bg-teal-700 dark:hover:bg-teal-600 text-white text-xs font-bold cursor-pointer"
                >
                  {isEn ? 'Confirm Schedule' : 'Xác nhận đặt lịch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-left">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 dark:border-stone-800">
            <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">
              {isEn ? 'Reject Adoption Application' : 'Từ chối đơn nhận nuôi'}
            </h3>
            <p className="text-xs text-[#665851] dark:text-stone-300">
              {isEn 
                ? `Please provide a polite reason to ${rejectModalApp.applicantName} to help them understand the criteria for this pet.`
                : `Vui lòng cung cấp lý do lịch sự gửi tới ${rejectModalApp.applicantName} để giúp họ hiểu rõ tiêu chuẩn của bé.`}
            </p>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2b2523] dark:text-stone-200 block">
                {isEn ? 'Rejection Reason *' : 'Lý do từ chối *'}
              </label>
              <textarea
                rows={3}
                required
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder={isEn ? 'e.g., Living space does not have balcony safety netting required for this pet...' : 'Ví dụ: Không gian chung cư chưa có lưới an toàn ban công theo tiêu chuẩn của bé...'}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-[#2b2523] dark:text-stone-100 focus:ring-2 focus:ring-[#d46b28]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectModalApp(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-[#2b2523] dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-bold cursor-pointer"
              >
                {isEn ? 'Cancel' : 'Hủy'}
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
              >
                {isEn ? 'Send Rejection' : 'Gửi từ chối'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL SURVEY MODAL */}
      {surveyModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-left">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-900 z-10">
              <div>
                <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">
                  {isEn ? `Adoption Survey: ${surveyModalApp.applicantName}` : `Khảo sát nhận nuôi của ${surveyModalApp.applicantName}`}
                </h3>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  {isEn ? `Applying for Pet ${surveyModalApp.petName}` : `Ứng tuyển nhận nuôi bé ${surveyModalApp.petName}`}
                </span>
              </div>
              <button onClick={() => setSurveyModalApp(null)} className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800 space-y-2">
                <span className="font-bold text-[#9c3810] dark:text-amber-400 uppercase block">
                  {isEn ? '1. Personal Information & Address' : '1. Thông tin cá nhân & Địa chỉ'}
                </span>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Full Name:' : 'Họ tên:'}</b> {surveyModalApp.applicantName}</p>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Phone:' : 'Số điện thoại:'}</b> {surveyModalApp.applicantPhone}</p>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Occupation:' : 'Nghề nghiệp:'}</b> {translateDynamicText(surveyModalApp.applicantOccupation, language)}</p>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Address:' : 'Địa chỉ:'}</b> {surveyModalApp.applicantAddress ? translateAddress(surveyModalApp.applicantAddress, language) + ', ' : ''}{translateAddress(surveyModalApp.applicantProvince, language)}</p>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800 space-y-2">
                <span className="font-bold text-[#9c3810] dark:text-amber-400 uppercase block">
                  {isEn ? '2. Adoption Motivation & Reason' : '2. Lý do nhận nuôi'}
                </span>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Motivation:' : 'Động lực:'}</b> {translateDynamicText(surveyModalApp.adoptionReason, language)}</p>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Why choosing this pet:' : 'Vì sao chọn bé này:'}</b> {translateDynamicText(surveyModalApp.reasonForChoosingPet, language)}</p>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800 space-y-2">
                <span className="font-bold text-[#9c3810] dark:text-amber-400 uppercase block">
                  {isEn ? '3. Living Environment' : '3. Môi trường sống'}
                </span>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Housing Type:' : 'Loại nhà:'}</b> {translateDynamicText(surveyModalApp.housingType, language)} ({isEn ? 'Pet-friendly: ' : 'Cho phép pet: '}{surveyModalApp.petsAllowedInBuilding ? (isEn ? 'Yes' : 'Có') : (isEn ? 'No' : 'Không')})</p>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Household Members:' : 'Số người trong nhà:'}</b> {surveyModalApp.householdMembersCount} ({isEn ? 'Has children: ' : 'Có trẻ em: '}{surveyModalApp.hasChildrenInHome ? (isEn ? 'Yes' : 'Có') : (isEn ? 'No' : 'Không')})</p>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Pet Living Area:' : 'Không gian sinh hoạt của bé:'}</b> {translateDynamicText(surveyModalApp.petLivingAreaDescription, language)}</p>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800 space-y-2">
                <span className="font-bold text-[#9c3810] dark:text-amber-400 uppercase block">
                  {isEn ? '4. Pet Care Experience' : '4. Kinh nghiệm nuôi thú cưng'}
                </span>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Owned Pets Before:' : 'Từng nuôi:'}</b> {surveyModalApp.hasOwnedPetsBefore ? (isEn ? 'Yes' : 'Có') : (isEn ? 'No' : 'Chưa')}</p>
                {surveyModalApp.previousPetSpeciesAndDuration && <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Details:' : 'Chi tiết:'}</b> {translateDynamicText(surveyModalApp.previousPetSpeciesAndDuration, language)}</p>}
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Currently Owning Pets:' : 'Hiện đang nuôi:'}</b> {surveyModalApp.currentlyHasPets ? (isEn ? `Yes (${surveyModalApp.currentPetsCount} pets)` : `Có (${surveyModalApp.currentPetsCount} bé)`) : (isEn ? 'None' : 'Không')}</p>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800 space-y-2">
                <span className="font-bold text-[#9c3810] dark:text-amber-400 uppercase block">
                  {isEn ? '5. Time & Financial Commitment' : '5. Thời gian & Tài chính'}
                </span>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Daily Care Time:' : 'Thời gian chăm sóc hàng ngày:'}</b> {translateDynamicText(surveyModalApp.dailyHoursForPet, language)}</p>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Estimated Monthly Budget:' : 'Dự trù chi phí hàng tháng:'}</b> {translateDynamicText(surveyModalApp.estimatedMonthlyBudget, language)}</p>
                <p><b className="text-[#2b2523] dark:text-stone-100">{isEn ? 'Care Plan when Away/Traveling:' : 'Kế hoạch khi vắng nhà/đi xa:'}</b> {translateDynamicText(surveyModalApp.travelOrAwayCarePlan, language)}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={() => setSurveyModalApp(null)}
                className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white font-bold text-xs cursor-pointer"
              >
                {isEn ? 'Close' : 'Đóng'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
