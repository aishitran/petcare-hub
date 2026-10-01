import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { UserProfile, AccountStatus } from '../../types/user';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Ban, 
  CheckCircle2, 
  UserCheck, 
  Mail, 
  Phone, 
  Clock,
  Award
} from 'lucide-react';

interface AdminUserManagementPageProps {
  navigate: (path: string) => void;
}

export const AdminUserManagementPage: React.FC<AdminUserManagementPageProps> = ({ navigate }) => {
  const { users, updateUserAccountStatus } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredUsers = users.filter(user => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = user.name.toLowerCase().includes(q);
      const matchEmail = user.email.toLowerCase().includes(q);
      const matchPhone = user.phone.includes(q);
      if (!matchName && !matchEmail && !matchPhone) return false;
    }

    if (roleFilter !== 'ALL' && user.role !== roleFilter) return false;
    if (statusFilter !== 'ALL' && user.accountStatus !== statusFilter) return false;

    return true;
  });

  const handleToggleBan = (user: UserProfile) => {
    const newStatus: AccountStatus = user.accountStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    const actionName = newStatus === 'SUSPENDED' 
      ? (isEn ? 'SUSPEND ACCOUNT' : 'KHÓA TÀI KHOẢN') 
      : (isEn ? 'UNBAN ACCOUNT' : 'MỞ KHÓA TÀI KHOẢN');
    const confirmMsg = isEn 
      ? `Are you sure you want to ${actionName.toLowerCase()} for "${user.name}"?`
      : `Bạn có chắc chắn muốn ${actionName} người dùng "${user.name}"?`;
    if (window.confirm(confirmMsg)) {
      updateUserAccountStatus(user.id, newStatus);
    }
  };

  return (
    <div className="space-y-6 text-left text-stone-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">
            {isEn ? 'Platform User Management' : 'Quản lý Người dùng Toàn Nền Tảng'}
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            {isEn 
              ? 'User directory, verification status, roles, and administrative access control.' 
              : 'Danh bạ người dùng, trạng thái tài khoản, vai trò và phân quyền hệ thống.'}
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isEn ? 'Search by name, email, phone...' : 'Tìm theo tên, email, số điện thoại...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-300 font-bold"
          >
            <option value="ALL">{isEn ? 'All Roles' : 'Tất cả vai trò'}</option>
            <option value="USER">{isEn ? 'User (USER)' : 'Người dùng (USER)'}</option>
            <option value="ADMIN">{isEn ? 'Admin (ADMIN)' : 'Quản trị viên (ADMIN)'}</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-300 font-bold"
          >
            <option value="ALL">{isEn ? 'All Statuses' : 'Tất cả trạng thái'}</option>
            <option value="ACTIVE">{isEn ? 'Active (ACTIVE)' : 'Đang hoạt động (ACTIVE)'}</option>
            <option value="SUSPENDED">{isEn ? 'Suspended (SUSPENDED)' : 'Đã bị khóa (SUSPENDED)'}</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 text-stone-400 uppercase font-bold text-[11px] border-b border-stone-800">
              <tr>
                <th className="px-5 py-3.5">{isEn ? 'User' : 'Người dùng'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Contact' : 'Liên hệ'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Role' : 'Vai trò'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Status' : 'Trạng thái'}</th>
                <th className="px-5 py-3.5 text-right">{isEn ? 'Actions' : 'Thao tác'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-stone-800/40 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt="" className="w-10 h-10 rounded-xl object-cover ring-1 ring-stone-700" />
                      <div>
                        <div className="font-bold text-white text-xs">{user.name}</div>
                        <span className="text-[10px] text-stone-500 font-mono">ID: {user.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-stone-300 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-stone-500" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                      <Phone className="w-3 h-3 text-stone-500" />
                      <span>{user.phone}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      user.role === 'ADMIN' ? 'bg-teal-900/60 text-teal-300 border border-teal-500/30' : 'bg-stone-800 text-stone-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={user.accountStatus} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    {user.role !== 'ADMIN' && (
                      <button
                        onClick={() => handleToggleBan(user)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ml-auto cursor-pointer ${
                          user.accountStatus === 'ACTIVE'
                            ? 'bg-rose-900/40 hover:bg-rose-800/60 text-rose-300 border border-rose-700/40'
                            : 'bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-300 border border-emerald-700/40'
                        }`}
                      >
                        {user.accountStatus === 'ACTIVE' ? (
                          <>
                            <Ban className="w-3.5 h-3.5" />
                            <span>{isEn ? 'Suspend' : 'Khóa'}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isEn ? 'Reactivate' : 'Mở khóa'}</span>
                          </>
                        )}
                      </button>
                    )}
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

