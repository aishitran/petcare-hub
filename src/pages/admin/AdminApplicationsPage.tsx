import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AdoptionApplication } from '../../types/application';
import { 
  FileText, 
  Search, 
  Eye, 
  Calendar, 
  Award, 
  Sparkles, 
  Filter, 
  Clock, 
  User,
  X
} from 'lucide-react';

interface AdminApplicationsPageProps {
  navigate: (path: string) => void;
}

export const AdminApplicationsPage: React.FC<AdminApplicationsPageProps> = ({ navigate }) => {
  const { applications } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [inspectApp, setInspectApp] = useState<AdoptionApplication | null>(null);

  const filteredApps = applications.filter(app => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchApplicant = app.applicantName.toLowerCase().includes(q);
      const matchPet = app.petName.toLowerCase().includes(q);
      const matchPoster = app.posterUserName.toLowerCase().includes(q);
      if (!matchApplicant && !matchPet && !matchPoster) return false;
    }

    if (statusFilter !== 'ALL' && app.status !== statusFilter) return false;

    return true;
  });

  return (
    <div className="space-y-6 text-left text-stone-100">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-2xl font-black text-white font-display">
          {isEn ? 'Platform Adoption Applications Audit' : 'Giám sát Đơn nhận nuôi Toàn Hệ Thống'}
        </h1>
        <p className="text-xs text-stone-400 mt-0.5">
          {isEn 
            ? 'Track application submissions, interview appointments, welfare commitments, and success conversions.' 
            : 'Theo dõi toàn bộ luồng nộp đơn, phỏng vấn, ký cam kết và tỷ lệ nhận nuôi thành công.'}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isEn ? 'Search by applicant, pet name, rescuer...' : 'Tìm theo tên người nộp, thú cưng...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-300 font-bold"
        >
          <option value="ALL">{isEn ? 'All Statuses' : 'Tất cả trạng thái'}</option>
          <option value="PENDING">{isEn ? 'Pending (PENDING)' : 'Chờ duyệt (PENDING)'}</option>
          <option value="INTERVIEW">{isEn ? 'Interviewing (INTERVIEW)' : 'Đang phỏng vấn (INTERVIEW)'}</option>
          <option value="APPROVED">{isEn ? 'Approved (APPROVED)' : 'Đã được duyệt (APPROVED)'}</option>
          <option value="BACKUP">{isEn ? 'Backup Queue (BACKUP)' : 'Dự phòng (BACKUP)'}</option>
          <option value="REJECTED">{isEn ? 'Rejected (REJECTED)' : 'Bị từ chối (REJECTED)'}</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 text-stone-400 uppercase font-bold text-[11px] border-b border-stone-800">
              <tr>
                <th className="px-5 py-3.5">{isEn ? 'App ID & Date' : 'Mã đơn & Ngày nộp'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Applicant' : 'Người nộp đơn'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Target Pet' : 'Thú cưng xin nhận'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Pet Poster' : 'Người đăng tin'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Status' : 'Trạng thái'}</th>
                <th className="px-5 py-3.5 text-right">{isEn ? 'Details' : 'Chi tiết'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-stone-800/40 transition">
                  <td className="px-5 py-4">
                    <div className="font-mono font-bold text-white text-xs">#{app.id}</div>
                    <span className="text-[10px] text-stone-500">{new Date(app.submittedAt).toLocaleDateString('vi-VN')}</span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="font-bold text-white">{app.applicantName}</div>
                    <span className="text-[11px] text-stone-400">{app.applicantPhone} • {app.housingType}</span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <img src={app.petAvatar} alt="" className="w-7 h-7 rounded-lg object-cover" />
                      <span className="font-bold text-teal-300">{app.petName}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-stone-300">
                    {app.posterUserName}
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={app.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setInspectApp(app)}
                      className="px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-teal-300 font-bold transition cursor-pointer"
                    >
                      {isEn ? 'View Survey' : 'Xem khảo sát'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECT MODAL */}
      {inspectApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 border border-stone-800 text-stone-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-bold text-white text-base">
                {isEn ? `Application Details: #${inspectApp.id} (${inspectApp.applicantName} → ${inspectApp.petName})` : `Chi tiết đơn: #${inspectApp.id} (${inspectApp.applicantName} → Bé ${inspectApp.petName})`}
              </h3>
              <button onClick={() => setInspectApp(null)} className="text-stone-400 hover:text-white cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 space-y-1">
                <span className="font-bold text-teal-300 uppercase block">{isEn ? '1. Personal Profile:' : '1. Thông tin cá nhân:'}</span>
                <p><b>{isEn ? 'Name:' : 'Họ tên:'}</b> {inspectApp.applicantName} • <b>{isEn ? 'Phone:' : 'SĐT:'}</b> {inspectApp.applicantPhone} • <b>{isEn ? 'Age:' : 'Tuổi:'}</b> {inspectApp.applicantAge || 25} • <b>{isEn ? 'Job:' : 'Nghề nghiệp:'}</b> {inspectApp.applicantOccupation}</p>
                <p><b>{isEn ? 'Address:' : 'Địa chỉ:'}</b> {inspectApp.applicantAddress}, {inspectApp.applicantProvince}</p>
              </div>

              <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 space-y-1">
                <span className="font-bold text-teal-300 uppercase block">{isEn ? '2. Living Space & Pet History:' : '2. Môi trường & Kinh nghiệm:'}</span>
                <p><b>{isEn ? 'Housing:' : 'Loại nhà:'}</b> {inspectApp.housingType} • <b>{isEn ? 'Past Pet Care:' : 'Nuôi pet trước đây:'}</b> {inspectApp.hasOwnedPetsBefore ? (isEn ? 'Yes' : 'Đã từng') : (isEn ? 'No' : 'Chưa')}</p>
                <p><b>{isEn ? 'Daily Time:' : 'Thời gian chăm sóc:'}</b> {inspectApp.dailyHoursForPet} • <b>{isEn ? 'Monthly Budget:' : 'Ngân sách:'}</b> {inspectApp.estimatedMonthlyBudget}</p>
              </div>

              <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 space-y-1">
                <span className="font-bold text-teal-300 uppercase block">{isEn ? '3. Adoption Motivation:' : '3. Lý do nhận nuôi:'}</span>
                <p className="text-stone-300 leading-relaxed">{inspectApp.adoptionReason}</p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-stone-800">
              <button
                onClick={() => setInspectApp(null)}
                className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs cursor-pointer transition"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

