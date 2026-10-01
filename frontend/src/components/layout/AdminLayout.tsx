import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, X, ExternalLink, LogOut } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  badge?: number;
  badgeColor?: string;
  isAction?: boolean;
  action?: () => void;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface AdminLayoutProps {
  currentPath: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ currentPath, navigate, children }) => {
  const { currentUser, logout } = useAuth();
  const { users, pets, applications, rescuePosts, reports } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingPets = pets.filter(p => p.moderationStatus === 'PENDING_APPROVAL');
  const pendingReports = reports.filter(r => r.status === 'PENDING' || r.status === 'INVESTIGATING');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navSections: NavSection[] = [
    {
      title: isEn ? 'General Administration' : 'Quản trị chung',
      items: [
        { label: isEn ? 'Admin Dashboard' : 'Admin Dashboard', path: '/admin' },
        { label: isEn ? 'User Management' : 'Quản lý Người dùng', path: '/admin/users' },
      ]
    },
    {
      title: isEn ? 'Moderation & Oversight' : 'Kiểm duyệt & Giám sát',
      items: [
        { label: isEn ? 'Pet Listings' : 'Quản lý Thú cưng', path: '/admin/pets' },
        { 
          label: isEn ? 'Pet Post Approvals' : 'Duyệt Tin đăng Thú cưng', 
          path: '/admin/pet-approvals', 
          badge: pendingPets.length > 0 ? pendingPets.length : undefined,
          badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
        },
        { label: isEn ? 'Adoption Applications' : 'Giám sát Đơn nhận nuôi', path: '/admin/applications' },
        { label: isEn ? 'Rescue & Shelters' : 'Quản lý Cứu trợ', path: '/admin/rescue' },
        { 
          label: isEn ? 'Community Reports' : 'Xử lý Báo cáo vi phạm', 
          path: '/admin/reports', 
          badge: pendingReports.length > 0 ? pendingReports.length : undefined,
          badgeColor: 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
        },
      ]
    },
    {
      title: isEn ? 'System & Statistics' : 'Hệ thống & Báo cáo',
      items: [
        { label: isEn ? 'Analytics & Statistics' : 'Báo cáo Thống kê', path: '/admin/statistics' },
        { label: isEn ? 'System Audit Logs' : 'Nhật ký Hệ thống', path: '/admin/logs' },
      ]
    },
    {
      title: isEn ? 'Communication & Support' : 'Tin nhắn & Hỗ trợ',
      items: [
        { 
          label: isEn ? 'User Messages & Support' : 'Tin nhắn từ Người dùng', 
          path: '#admin-chat', 
          badge: 1, 
          badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse',
          isAction: true,
          action: () => {
            window.dispatchEvent(new CustomEvent('open-admin-chat'));
          }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col md:flex-row text-left">
      
      {/* Mobile Admin Header */}
      <div className="md:hidden bg-stone-900 border-b border-stone-800 p-4 flex items-center justify-between sticky top-[37px] z-30">
        <div className="flex items-center gap-2">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="w-6 h-6 rounded-full object-cover" />
          <span className="font-bold text-white text-sm">PetCare Admin Portal</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-stone-800 text-stone-300 cursor-pointer"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Admin Sidebar (Desktop & Mobile Drawer) */}
      <aside className={`
        fixed md:sticky top-0 z-40 h-screen w-64 bg-stone-900 border-r border-stone-800 flex flex-col justify-between p-5 transition-transform
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-6 overflow-y-auto">
          
          {/* Admin Brand */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-800">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="w-9 h-9 rounded-full object-cover shadow-xs ring-1 ring-amber-400/40" />
            <div className="space-y-0.5">
              <h3 className="font-black text-white text-sm tracking-tight leading-none">Admin Portal</h3>
              <p className="text-[10px] text-stone-400 font-medium">
                {isEn ? 'Platform Governance & Analytics' : 'Giám sát & Quản trị Nền tảng'}
              </p>
            </div>
          </div>

          {/* Navigation Sections */}
          <nav className="space-y-5">
            {navSections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-stone-500 px-3">
                  {sec.title}
                </h5>
                <div className="space-y-0.5">
                  {sec.items.map(item => {
                    const isActive = currentPath === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => { 
                          setSidebarOpen(false); 
                          if (item.isAction && item.action) {
                            item.action();
                          } else {
                            navigate(item.path); 
                          }
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between gap-2 cursor-pointer ${
                          isActive
                            ? 'bg-[#d46b28] text-white font-bold shadow-xs'
                            : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>}
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge !== undefined && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.badgeColor || 'bg-stone-800 text-stone-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

        </div>

        {/* Footer Actions: Back to Public + Logout */}
        <div className="pt-4 border-t border-stone-800 space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isEn ? 'Back to Public Site' : 'Về trang người dùng'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-300 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isEn ? 'Logout' : 'Đăng xuất Admin'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        {children}
      </main>

    </div>
  );
};
