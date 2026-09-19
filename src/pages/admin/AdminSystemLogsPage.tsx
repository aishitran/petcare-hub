import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { SystemAuditLog } from '../../types/systemLog';
import { ScrollText, Search, Filter, ShieldCheck, Clock, User } from 'lucide-react';

interface AdminSystemLogsPageProps {
  navigate: (path: string) => void;
}

export const AdminSystemLogsPage: React.FC<AdminSystemLogsPageProps> = ({ navigate }) => {
  const { systemLogs } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const filteredLogs = systemLogs.filter(log => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchDesc = (log.description || '').toLowerCase().includes(q);
      const matchActor = (log.actorName || '').toLowerCase().includes(q);
      if (!matchDesc && !matchActor) return false;
    }

    if (actionFilter !== 'ALL' && log.actionType !== actionFilter) return false;

    return true;
  });

  return (
    <div className="space-y-6 text-left text-stone-100">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-2xl font-black text-white font-display">
          {isEn ? 'System Audit & Security Logs' : 'Nhật ký Hoạt động Hệ thống (Audit Logs)'}
        </h1>
        <p className="text-xs text-stone-400 mt-0.5">
          {isEn 
            ? 'Complete immutable trail of post approvals, status transitions, eKYC verifications, and safety audits.' 
            : 'Ghi nhận toàn bộ thao tác duyệt bài, thay đổi trạng thái, eKYC và bảo mật trên nền tảng.'}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isEn ? 'Search by description, actor...' : 'Tìm theo mô tả, người thực hiện...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-300 font-bold"
        >
          <option value="ALL">{isEn ? 'All Actions' : 'Tất cả hành động'}</option>
          <option value="PET_CREATED">{isEn ? 'PET_CREATED (Created Pet)' : 'PET_CREATED (Tạo thú cưng)'}</option>
          <option value="PET_MODERATED">{isEn ? 'PET_MODERATED (Moderated Pet)' : 'PET_MODERATED (Duyệt thú cưng)'}</option>
          <option value="APPLICATION_SUBMITTED">{isEn ? 'APPLICATION_SUBMITTED (Submitted App)' : 'APPLICATION_SUBMITTED (Gửi đơn)'}</option>
          <option value="APPLICATION_STATUS_UPDATED">{isEn ? 'APPLICATION_STATUS_UPDATED (Updated App)' : 'APPLICATION_STATUS_UPDATED (Cập nhật đơn)'}</option>
          <option value="REPORT_RESOLVED">{isEn ? 'REPORT_RESOLVED (Resolved Report)' : 'REPORT_RESOLVED (Xử lý vi phạm)'}</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 text-stone-400 uppercase font-bold text-[11px] border-b border-stone-800">
              <tr>
                <th className="px-5 py-3.5">{isEn ? 'Timestamp' : 'Thời gian'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Action' : 'Hành động'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Description' : 'Chi tiết mô tả'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Actor' : 'Người thực hiện'}</th>
                <th className="px-5 py-3.5 text-right">{isEn ? 'Target Subject' : 'Đối tượng liên quan'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-mono">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-stone-800/40 transition">
                  <td className="px-5 py-3.5 text-stone-400 font-sans text-[11px]">
                    {new Date(log.timestamp).toLocaleString(isEn ? 'en-US' : 'vi-VN')}
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-stone-800 text-[10px] text-teal-300 font-bold border border-teal-500/20">
                      {log.actionType}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 font-sans text-stone-200">
                    {log.description}
                  </td>

                  <td className="px-4 py-3.5 font-sans text-stone-300">
                    <div className="font-bold text-white">{log.actorName}</div>
                    <span className="text-[10px] text-stone-500 font-mono">ID: {log.actorId}</span>
                  </td>

                  <td className="px-5 py-3.5 text-right text-stone-500 text-[11px]">
                    {log.targetEntity ? `${log.targetEntity}: ${log.targetId}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

