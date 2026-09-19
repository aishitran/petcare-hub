import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { CommunityReport, ReportStatus } from '../../types/report';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Clock, 
  Lock, 
  User, 
  X 
} from 'lucide-react';

interface AdminReportsPageProps {
  navigate: (path: string) => void;
}

export const AdminReportsPage: React.FC<AdminReportsPageProps> = ({ navigate }) => {
  const { reports, updateReportStatus } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [inspectReport, setInspectReport] = useState<CommunityReport | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const pendingReports = reports.filter(r => r.status === 'PENDING' || r.status === 'INVESTIGATING');
  const resolvedReports = reports.filter(r => r.status === 'RESOLVED' || r.status === 'DISMISSED');

  const handleResolve = (reportId: string, status: ReportStatus) => {
    updateReportStatus(reportId, status, adminNote || (isEn ? 'Warning sent / Post removed according to community guidelines' : 'Đã xử lý cảnh cáo / gỡ bài vi phạm theo quy định'));
    setInspectReport(null);
    setAdminNote('');
  };

  return (
    <div className="space-y-6 text-left text-stone-100">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-2xl font-black text-white font-display">
          {isEn ? 'Community Safety & Abuse Reports' : 'Xử lý Báo cáo Vi phạm & An toàn'}
        </h1>
        <p className="text-xs text-stone-400 mt-0.5">
          {isEn 
            ? 'Receive and investigate reports on commercial profiteering, abuse, and misinformation from community members.' 
            : 'Tiếp nhận và điều tra các báo cáo gian lận thương mại, ngược đãi và sai sự thật từ cộng đồng.'}
        </p>
      </div>

      {/* Pending Reports Queue */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-rose-400">
            {isEn ? `Pending Reports (${pendingReports.length})` : `Báo cáo chờ xử lý (${pendingReports.length})`}
          </h2>
        </div>

        {pendingReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingReports.map(rep => (
              <div 
                key={rep.id}
                className="bg-stone-900 rounded-3xl border border-stone-800 p-5 shadow-lg space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <StatusBadge status={rep.reason} />
                    <StatusBadge status={rep.status} />
                  </div>

                  <h3 className="font-bold text-white text-sm">{rep.targetTitle}</h3>
                  
                  <p className="text-xs text-stone-300 bg-stone-950 p-3 rounded-2xl border border-stone-800/80 leading-relaxed">
                    "{rep.description}"
                  </p>

                  <span className="text-[10px] text-stone-500 block">
                    {isEn ? 'Reporter:' : 'Người báo cáo:'} {rep.reporterUserName} • {new Date(rep.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-800 flex justify-end">
                  <button
                    onClick={() => setInspectReport(rep)}
                    className="w-full py-2 rounded-xl bg-rose-800 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center justify-center gap-1 shadow-md cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Investigate & Resolve' : 'Điều tra & Xử lý'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-stone-900/50 p-8 rounded-3xl border border-stone-800 text-center text-xs text-stone-500">
            {isEn ? 'No pending violation reports in the queue.' : 'Không có báo cáo vi phạm nào đang chờ xử lý.'}
          </div>
        )}
      </div>

      {/* Resolved Reports History */}
      <div className="space-y-4 pt-6 border-t border-stone-800">
        <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
          {isEn ? `Resolved Reports History (${resolvedReports.length})` : `Lịch sử báo cáo đã xử lý (${resolvedReports.length})`}
        </h2>

        <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 text-stone-400 uppercase font-bold text-[11px] border-b border-stone-800">
              <tr>
                <th className="px-5 py-3">{isEn ? 'Target Subject' : 'Mục vi phạm'}</th>
                <th className="px-4 py-3">{isEn ? 'Violation Type' : 'Loại vi phạm'}</th>
                <th className="px-4 py-3">{isEn ? 'Admin Findings' : 'Kết luận xử lý'}</th>
                <th className="px-4 py-3">{isEn ? 'Status' : 'Trạng thái'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {resolvedReports.map(r => (
                <tr key={r.id} className="hover:bg-stone-800/40">
                  <td className="px-5 py-3 font-bold text-white">{r.targetTitle}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.reason} /></td>
                  <td className="px-4 py-3 text-stone-400">{r.adminNotes || (isEn ? 'Audited & Cleared' : 'Đã kiểm tra')}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECT MODAL */}
      {inspectReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-stone-900 rounded-3xl max-w-lg w-full p-6 space-y-5 border border-stone-800 text-stone-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-bold text-white text-base">
                {isEn ? `Resolve Report: ${inspectReport.targetTitle}` : `Xử lý báo cáo: ${inspectReport.targetTitle}`}
              </h3>
              <button onClick={() => setInspectReport(null)} className="text-stone-400 hover:text-white cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 space-y-1">
                <div><span className="text-stone-500">{isEn ? 'Report Reason:' : 'Lý do báo cáo:'}</span> <b className="text-rose-400">{inspectReport.reason}</b></div>
                <div><span className="text-stone-500">{isEn ? 'Reporter Details:' : 'Nội dung người gửi phản ánh:'}</span> <p className="text-stone-300 mt-1">"{inspectReport.description}"</p></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-400 mb-1">
                  {isEn ? 'Admin Audit Notes & Enforcement Action *' : 'Ghi chú & Biện pháp xử lý của Admin *'}
                </label>
                <textarea
                  rows={3}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder={isEn ? 'E.g., Warning issued to poster, listing hidden pending medical invoice verification...' : 'Ví dụ: Đã gửi cảnh cáo tới chủ bài đăng, tạm ẩn tin thú cưng để xác minh hóa đơn y tế...'}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
              <button
                onClick={() => handleResolve(inspectReport.id, 'DISMISSED')}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold cursor-pointer transition"
              >
                {isEn ? 'Dismiss Report' : 'Bác bỏ báo cáo'}
              </button>
              <button
                onClick={() => handleResolve(inspectReport.id, 'RESOLVED')}
                className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold cursor-pointer transition"
              >
                {isEn ? 'Confirm Enforcement' : 'Xác nhận đã xử lý'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

