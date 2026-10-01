import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { SystemAuditLog } from '../../types/systemLog';
import { translateDynamicText } from '../../utils/dataTranslator';
import { ScrollText, Search, Filter, ShieldCheck, Clock, User, Shield, UserCheck, ShieldAlert } from 'lucide-react';

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
      const matchDesc = ((log.details || log.description) || '').toLowerCase().includes(q);
      const matchActor = ((log.userName || log.actorName) || '').toLowerCase().includes(q);
      const matchAction = ((log.action || log.actionType) || '').toLowerCase().includes(q);
      if (!matchDesc && !matchActor && !matchAction) return false;
    }

    if (actionFilter !== 'ALL') {
      const act = log.action || log.actionType;
      if (act !== actionFilter) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 text-left text-stone-100">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4 text-center sm:text-left">
        <h1 className="text-2xl font-black text-white font-display">
          {isEn ? 'System Audit & Security Logs' : 'Nhật ký Hoạt động Hệ thống (Audit Logs)'}
        </h1>
        <p className="text-xs text-stone-400 mt-0.5">
          {isEn 
            ? 'Complete immutable audit trail with operator identity, role, timestamp, and safety actions.' 
            : 'Ghi nhận toàn bộ thao tác duyệt bài, thay đổi trạng thái, eKYC và bảo mật kèm thông tin người xử lý.'}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isEn ? 'Search by description, admin, action...' : 'Tìm theo mô tả, tên admin, hành động...'}
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
          <option value="APPROVE_PET">{isEn ? 'APPROVE_PET (Approved Pet)' : 'APPROVE_PET (Duyệt thú cưng)'}</option>
          <option value="REJECT_PET">{isEn ? 'REJECT_PET (Declined Pet)' : 'REJECT_PET (Từ chối tin)'}</option>
          <option value="RESTRICT_USER">{isEn ? 'RESTRICT_USER (Restricted Account)' : 'RESTRICT_USER (Hạn chế tài khoản)'}</option>
          <option value="CREATE_APPLICATION">{isEn ? 'CREATE_APPLICATION (Submitted App)' : 'CREATE_APPLICATION (Nộp đơn)'}</option>
          <option value="APPROVE_APPLICATION">{isEn ? 'APPROVE_APPLICATION (Approved App)' : 'APPROVE_APPLICATION (Duyệt đơn)'}</option>
          <option value="SUBMIT_CHECK_IN">{isEn ? 'SUBMIT_CHECK_IN (Check-in Submitted)' : 'SUBMIT_CHECK_IN (Gửi check-in)'}</option>
        </select>
      </div>

      {/* Logs Table with Operator Columns */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 text-stone-400 uppercase font-bold text-[11px] border-b border-stone-800">
              <tr>
                <th className="px-5 py-3.5">{isEn ? 'Timestamp' : 'Thời gian'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Action Code' : 'Mã hành động'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Description & Details' : 'Chi tiết nội dung xử lý'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Operator (Admin/User)' : 'Người xử lý (Admin / User)'}</th>
                <th className="px-5 py-3.5 text-right">{isEn ? 'Target Subject' : 'Đối tượng'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filteredLogs.map(log => {
                const operatorName = log.userName || log.actorName || (isEn ? 'System Automated' : 'Hệ thống tự động');
                const operatorAvatar = log.userAvatar || log.actorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100';
                const operatorRole = log.actorRole || (log.userId?.startsWith('admin') ? 'ADMIN' : 'USER');

                return (
                  <tr key={log.id} className="hover:bg-stone-800/40 transition">
                    <td className="px-5 py-3.5 text-stone-400 font-mono text-[11px] whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-stone-800 text-[10px] text-teal-300 font-bold border border-teal-500/20 font-mono">
                        {log.action || log.actionType}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-stone-200">
                      {translateDynamicText(log.details || log.description, language)}
                    </td>

                    {/* Operator Details (Avatar + Name + Role Badge) */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={operatorAvatar}
                          alt=""
                          className="w-8 h-8 rounded-xl object-cover ring-1 ring-stone-700 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-white block text-xs truncate">{operatorName}</span>
                          <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider ${
                            operatorRole === 'ADMIN'
                              ? 'bg-teal-950 text-teal-300 border border-teal-800'
                              : operatorRole === 'SHELTER_STAFF'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-stone-800 text-stone-300'
                          }`}>
                            {operatorRole === 'ADMIN' ? 'Admin Master' : operatorRole === 'SHELTER_STAFF' ? 'Shelter Staff' : 'User Member'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-right text-stone-400 text-[11px] font-mono whitespace-nowrap">
                      {log.targetEntity ? `${log.targetEntity}: ${log.targetId || log.entityId}` : (log.entity ? `${log.entity}: ${log.entityId}` : '-')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
