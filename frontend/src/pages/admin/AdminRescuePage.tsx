import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RescuePost, RescueStatus } from '../../types/rescue';
import { translateAddress } from '../../utils/addressTranslator';
import { translateDynamicText } from '../../utils/dataTranslator';
import { 
  Flame, 
  Search, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  User 
} from 'lucide-react';

interface AdminRescuePageProps {
  navigate: (path: string) => void;
}

export const AdminRescuePage: React.FC<AdminRescuePageProps> = ({ navigate }) => {
  const { rescuePosts, updateRescuePostStatus } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredPosts = rescuePosts.filter(post => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchCreator = post.creatorUserName.toLowerCase().includes(q);
      if (!matchTitle && !matchCreator) return false;
    }

    if (statusFilter !== 'ALL' && post.status !== statusFilter) return false;

    return true;
  });

  const handleToggleComplete = (post: RescuePost) => {
    const nextStatus: RescueStatus = post.status === 'COMPLETED' ? 'APPROVED' : 'COMPLETED';
    updateRescuePostStatus(post.id, nextStatus);
  };

  return (
    <div className="space-y-6 text-left text-stone-100">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-2xl font-black text-white font-display">
          {isEn ? 'Emergency Rescue & Support Network Audit' : 'Quản lý Mạng lưới Cứu trợ & Tương trợ'}
        </h1>
        <p className="text-xs text-stone-400 mt-0.5">
          {isEn 
            ? 'Monitor community SOS posts, hospital fee aid, foster placements, and emergency response fulfillment.' 
            : 'Giám sát các tin kêu gọi viện phí, lương thực và chỗ nuôi tạm khẩn cấp.'}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isEn ? 'Search by title, rescuer name...' : 'Tìm theo tiêu đề, người đăng...'}
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
          <option value="APPROVED">{isEn ? 'Active SOS (APPROVED)' : 'Đang kêu gọi (APPROVED)'}</option>
          <option value="COMPLETED">{isEn ? 'Completed (COMPLETED)' : 'Đã hoàn thành (COMPLETED)'}</option>
        </select>
      </div>

      {/* Rescue Cases Table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 text-stone-400 uppercase font-bold text-[11px] border-b border-stone-800">
              <tr>
                <th className="px-5 py-3.5">{isEn ? 'Rescue Case' : 'Ca cứu hộ'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Coordinator' : 'Người phụ trách'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Aid Needed' : 'Nhu cầu cần giúp'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Priority' : 'Ưu tiên'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Status' : 'Trạng thái'}</th>
                <th className="px-5 py-3.5 text-right">{isEn ? 'Actions' : 'Thao tác'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filteredPosts.map(post => (
                <tr key={post.id} className="hover:bg-stone-800/40 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={post.images[0]} alt="" className="w-11 h-11 rounded-xl object-cover ring-1 ring-stone-700" />
                      <div>
                        <div className="font-bold text-white text-xs">{translateDynamicText(post.title, language)}</div>
                        <span className="text-[11px] text-stone-400">{translateAddress(post.supportLocation, language)}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-stone-300">
                    <div className="font-bold text-white">{post.creatorUserName}</div>
                    <span className="text-[10px] text-stone-500">{post.creatorUserPhone}</span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="font-bold text-rose-300">{translateDynamicText(post.quantityNeeded, language)}</span>
                    <span className="text-[10px] text-stone-500 block">
                      {isEn ? `${post.supportsCount} help offers recorded` : `Đã có ${post.supportsCount} lượt giúp`}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={post.priority} />
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={post.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleToggleComplete(post)}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs transition cursor-pointer"
                    >
                      {post.status === 'COMPLETED' ? (isEn ? 'Reopen' : 'Mở lại') : (isEn ? 'Mark Resolved' : 'Đánh dấu xong')}
                    </button>
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

