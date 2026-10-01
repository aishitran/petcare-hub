import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { translateAddress } from '../../utils/addressTranslator';
import { translateBreed } from '../../utils/petTranslator';
import { translateDynamicText } from '../../utils/dataTranslator';
import { 
  Users, 
  Heart, 
  CheckSquare, 
  FileText, 
  ShieldAlert, 
  ScrollText, 
  ArrowRight,
  AlertTriangle,
  Shield,
  LogOut,
  UserCheck,
  Building2
} from 'lucide-react';

interface AdminDashboardPageProps {
  navigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ navigate }) => {
  const { 
    users, 
    pets, 
    applications, 
    reports, 
    statistics, 
    systemLogs 
  } = useData();
  const { logout, currentUser } = useAuth();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const pendingPets = pets.filter(p => p.moderationStatus === 'PENDING_APPROVAL');
  const pendingReports = reports.filter(r => r.status === 'PENDING' || r.status === 'INVESTIGATING');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-8 text-left text-stone-100">
      
      {/* Centered Bright Header with Logout Button */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-3xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="text-center sm:text-left flex-1 space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
              <Shield className="w-4 h-4" />
              <span>PetCare Governance & Master Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              {isEn ? 'Platform Governance & Master Dashboard' : 'Bảng điều khiển Quản trị Toàn Nền Tảng'}
            </h1>
            <p className="text-xs text-stone-300">
              {isEn 
                ? 'Monitor user accounts, moderate pet listings, manage rescue campaigns, and investigate safety reports.' 
                : 'Giám sát người dùng, duyệt tin đăng thú cưng, quản lý cứu trợ và xử lý vi phạm an toàn cộng đồng.'}
            </p>
          </div>

          {/* Right Action: Admin Profile + Logout */}
          <div className="flex items-center gap-3 shrink-0">
            {currentUser && (
              <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-stone-950 border border-stone-800 text-xs">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt=""
                  className="w-7 h-7 rounded-xl object-cover ring-1 ring-teal-400/50"
                />
                <div className="text-left">
                  <span className="font-bold text-white block text-xs truncate max-w-[120px]">{currentUser.name}</span>
                  <span className="text-[10px] text-teal-400 font-semibold uppercase">Admin Master</span>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-2xl bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"
              title={isEn ? 'Logout of Admin Session' : 'Đăng xuất khỏi phiên Quản trị'}
            >
              <LogOut className="w-4 h-4" />
              <span>{isEn ? 'Log Out' : 'Đăng xuất'}</span>
            </button>
          </div>

        </div>

        {/* Priority Action Notification Banner */}
        {(pendingPets.length > 0 || pendingReports.length > 0) && (
          <div className="mt-4 pt-4 border-t border-stone-800 flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-2 animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              <span>
                {isEn 
                  ? `Immediate Attention Required: ${pendingPets.length} pets pending approval, ${pendingReports.length} reports open.` 
                  : `Cần xử lý ngay: ${pendingPets.length} tin thú cưng chờ duyệt, ${pendingReports.length} báo cáo vi phạm.`}
              </span>
            </span>

            <div className="flex gap-2">
              {pendingPets.length > 0 && (
                <button
                  onClick={() => navigate('/admin/pet-approvals')}
                  className="px-3 py-1 bg-amber-500/30 hover:bg-amber-500/50 text-amber-200 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  {isEn ? 'Review Pets' : 'Duyệt tin'}
                </button>
              )}
              {pendingReports.length > 0 && (
                <button
                  onClick={() => navigate('/admin/reports')}
                  className="px-3 py-1 bg-rose-500/30 hover:bg-rose-500/50 text-rose-200 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  {isEn ? 'Resolve Reports' : 'Xử lý báo cáo'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Global Stat Cards (4 columns - Lightened & Elevated) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Users */}
        <div 
          onClick={() => navigate('/admin/users')}
          className="bg-stone-850 hover:bg-stone-800 border border-stone-750 hover:border-teal-500/60 p-5 rounded-3xl space-y-3 cursor-pointer transition-all duration-200 shadow-md group"
        >
          <div className="flex items-center justify-between text-stone-300 text-xs font-bold uppercase">
            <span>{isEn ? 'Total Users' : 'Tổng Người dùng'}</span>
            <Users className="w-4 h-4 text-teal-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-3xl font-black text-white">{users.length}</div>
          <div className="text-xs text-stone-400 flex items-center justify-between pt-2 border-t border-stone-800">
            <span>{isEn ? 'Active:' : 'Hoạt động:'} <strong className="text-emerald-400">{users.filter(u => u.accountStatus === 'ACTIVE').length}</strong></span>
            <span>{isEn ? 'Admins:' : 'Quản trị viên:'} <strong className="text-teal-400">{users.filter(u => u.role === 'ADMIN').length}</strong></span>
          </div>
        </div>

        {/* Card 2: Pets */}
        <div 
          onClick={() => navigate('/admin/pets')}
          className="bg-stone-850 hover:bg-stone-800 border border-stone-750 hover:border-rose-500/60 p-5 rounded-3xl space-y-3 cursor-pointer transition-all duration-200 shadow-md group"
        >
          <div className="flex items-center justify-between text-stone-300 text-xs font-bold uppercase">
            <span>{isEn ? 'Pet Listings' : 'Tin Thú cưng'}</span>
            <Heart className="w-4 h-4 text-rose-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-3xl font-black text-white">{pets.length}</div>
          <div className="text-xs text-stone-400 flex items-center justify-between pt-2 border-t border-stone-800">
            <span>{isEn ? 'Approved:' : 'Đã duyệt:'} <strong className="text-emerald-400">{pets.filter(p => p.moderationStatus === 'APPROVED').length}</strong></span>
            <span>{isEn ? 'Pending:' : 'Chờ duyệt:'} <strong className="text-amber-400">{pendingPets.length}</strong></span>
          </div>
        </div>

        {/* Card 3: Applications & Rate */}
        <div 
          onClick={() => navigate('/admin/applications')}
          className="bg-stone-850 hover:bg-stone-800 border border-stone-750 hover:border-blue-500/60 p-5 rounded-3xl space-y-3 cursor-pointer transition-all duration-200 shadow-md group"
        >
          <div className="flex items-center justify-between text-stone-300 text-xs font-bold uppercase">
            <span>{isEn ? 'Applications' : 'Đơn nhận nuôi'}</span>
            <FileText className="w-4 h-4 text-blue-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-3xl font-black text-white">{applications.length}</div>
          <div className="text-xs text-stone-400 flex items-center justify-between pt-2 border-t border-stone-800">
            <span>{isEn ? 'Adopted:' : 'Đã nhận nuôi:'} <strong className="text-emerald-400">{statistics.totalAdoptedPets}</strong></span>
            <span>{isEn ? 'Success Rate:' : 'Tỷ lệ thành công:'} <strong className="text-teal-400">{statistics.successfulAdoptionRate}%</strong></span>
          </div>
        </div>

        {/* Card 4: Reports & Violations */}
        <div 
          onClick={() => navigate('/admin/reports')}
          className="bg-stone-850 hover:bg-stone-800 border border-stone-750 hover:border-rose-500/60 p-5 rounded-3xl space-y-3 cursor-pointer transition-all duration-200 shadow-md group"
        >
          <div className="flex items-center justify-between text-stone-300 text-xs font-bold uppercase">
            <span>{isEn ? 'Violation Reports' : 'Báo cáo Vi phạm'}</span>
            <ShieldAlert className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-3xl font-black text-white">{reports.length}</div>
          <div className="text-xs text-stone-400 flex items-center justify-between pt-2 border-t border-stone-800">
            <span>{isEn ? 'Pending:' : 'Chờ giải quyết:'} <strong className="text-rose-400">{pendingReports.length}</strong></span>
            <span>{isEn ? 'Resolved:' : 'Đã xử lý:'} <strong className="text-emerald-400">{reports.filter(r => r.status === 'RESOLVED').length}</strong></span>
          </div>
        </div>

      </div>

      {/* Moderation Queues Grid (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Pending Pet Listings Moderation */}
        <div className="lg:col-span-7 bg-stone-850 border border-stone-750 p-6 rounded-3xl space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-amber-400" />
                <span>{isEn ? `Pet Moderation Queue (${pendingPets.length})` : `Duyệt Tin đăng Thú cưng (${pendingPets.length})`}</span>
              </h3>
              <p className="text-xs text-stone-400">
                {isEn ? 'Verify veterinary records and photos before publishing' : 'Kiểm tra thông tin sức khỏe & hình ảnh trước khi công khai'}
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/pet-approvals')}
              className="text-xs font-bold text-teal-400 hover:underline cursor-pointer"
            >
              {isEn ? 'View all →' : 'Xem tất cả →'}
            </button>
          </div>

          <div className="space-y-3">
            {pendingPets.length > 0 ? (
              pendingPets.slice(0, 4).map(pet => (
                <div
                  key={pet.id}
                  className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img src={pet.photos[0]} alt="" className="w-12 h-12 rounded-xl object-cover ring-1 ring-stone-700" />
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {isEn ? `Pet ${pet.name}` : `Bé ${pet.name}`} ({translateBreed(pet.breed, language)})
                      </h4>
                      <span className="text-xs text-stone-400">
                        {isEn ? 'Posted by:' : 'Người đăng:'} <b className="text-stone-300">{pet.creatorUserName}</b> • {translateAddress(pet.location, language)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/admin/pet-approvals')}
                    className="px-3 py-1.5 bg-teal-800 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <span>{isEn ? 'Moderate' : 'Kiểm duyệt'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-stone-500 bg-stone-950/50 rounded-2xl">
                {isEn ? 'No pet listings pending approval.' : 'Không có tin đăng nào đang chờ duyệt.'}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pending Safety & Community Reports */}
        <div className="lg:col-span-5 bg-stone-850 border border-stone-750 p-6 rounded-3xl space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>{isEn ? `Safety & Reports Queue (${pendingReports.length})` : `Báo cáo Vi phạm (${pendingReports.length})`}</span>
              </h3>
              <p className="text-xs text-stone-400">
                {isEn ? 'Investigate user community reports' : 'Xử lý phản ánh từ cộng đồng'}
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/reports')}
              className="text-xs font-bold text-teal-400 hover:underline cursor-pointer"
            >
              {isEn ? 'Details →' : 'Chi tiết →'}
            </button>
          </div>

          <div className="space-y-3">
            {pendingReports.length > 0 ? (
              pendingReports.slice(0, 4).map(r => (
                <div key={r.id} className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between">
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <h4 className="font-bold text-white text-xs truncate">{translateDynamicText(r.targetTitle, language)}</h4>
                    <span className="text-[10px] text-stone-400 block truncate">{translateDynamicText(r.description, language)}</span>
                  </div>

                  <button
                    onClick={() => navigate('/admin/reports')}
                    className="px-2.5 py-1 bg-rose-900/40 hover:bg-rose-800 text-rose-200 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer"
                  >
                    {isEn ? 'Resolve' : 'Xử lý'}
                  </button>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-stone-500 bg-stone-950/50 rounded-2xl">
                {isEn ? 'No pending violation reports.' : 'Không có báo cáo vi phạm nào đang chờ xử lý.'}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* System Audit Logs Snapshot with Operator Info */}
      <div className="bg-stone-850 border border-stone-750 p-6 rounded-3xl space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ScrollText className="w-4 h-4 text-teal-400" />
            <span>{isEn ? 'Recent System Audit Logs (With Operator Details)' : 'Nhật ký hoạt động hệ thống gần đây (Kèm thông tin Admin xử lý)'}</span>
          </h3>
          <button
            onClick={() => navigate('/admin/logs')}
            className="text-xs font-bold text-teal-400 hover:underline cursor-pointer"
          >
            {isEn ? 'View all logs →' : 'Xem toàn bộ log →'}
          </button>
        </div>

        <div className="space-y-2">
          {systemLogs.slice(0, 5).map(log => (
            <div key={log.id} className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="px-2 py-0.5 rounded-md bg-stone-800 text-[10px] font-mono font-bold text-teal-300 shrink-0">
                  {log.action || log.actionType}
                </span>
                <span className="text-stone-300 truncate">{translateDynamicText(log.details || log.description, language)}</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-stone-400 text-[11px] font-semibold flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-teal-400" />
                  <span>{log.userName || (isEn ? 'System Admin' : 'Admin Hệ thống')}</span>
                </span>
                <span className="text-[10px] text-stone-500">
                  {log.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
