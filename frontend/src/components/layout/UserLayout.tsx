import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';

interface UserLayoutProps {
  currentPath: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
}

export const UserLayout: React.FC<UserLayoutProps> = ({ currentPath, navigate, children }) => {
  const { currentUser } = useAuth();
  const { applications, pets } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const myPets = pets.filter(p => p.creatorUserId === currentUser?.id);
  const mySentApps = applications.filter(a => a.applicantId === currentUser?.id);
  const myReceivedApps = applications.filter(a => a.posterUserId === currentUser?.id);

  const menuSections = [
    {
      title: isEn ? 'Core Activities' : 'Hoạt động chính',
      items: [
        { label: isEn ? 'Dashboard Overview' : 'Tổng quan Dashboard', path: '/dashboard' },
        { 
          label: t('nav.myPets'), 
          path: '/my-pets', 
          badge: myPets.length > 0 ? myPets.length : undefined
        },
        { label: `+ ${t('nav.createPet')}`, path: '/my-pets/create', highlight: true },
        { 
          label: t('nav.myApplications'), 
          path: '/applications', 
          badge: mySentApps.length > 0 ? mySentApps.length : undefined
        },
        { 
          label: t('nav.applicationsForMyPets'), 
          path: '/my-pet-applications', 
          badge: myReceivedApps.length > 0 ? myReceivedApps.length : undefined,
          badgeColor: 'bg-[#d46b28] text-white'
        },
      ]
    },
    {
      title: isEn ? 'Process & Post-Adoption' : 'Quy trình & Hậu nhận nuôi',
      items: [
        { label: t('nav.appointments'), path: '/appointments' },
        { label: t('nav.commitments'), path: '/commitments' },
        { label: t('nav.checkIns'), path: '/check-ins' },
        { label: t('nav.feedback'), path: '/feedback' },
      ]
    },
    {
      title: isEn ? 'Account & Safety' : 'Tài khoản & Hỗ trợ',
      items: [
        { label: t('nav.myRescuePosts'), path: '/my-rescue-posts' },
        { label: t('nav.reports'), path: '/reports' }
      ]
    }
  ];

  return (
    <div className="min-h-[85vh] bg-[#fbf8f4] dark:bg-[#181411] py-8 text-left transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar (3 cols on desktop) */}
          <div className="lg:col-span-3 bg-white dark:bg-stone-900 p-5 rounded-3xl border border-[#efe2d3] dark:border-stone-800 shadow-xs space-y-6 sticky top-28">
            
            {/* User Mini Profile */}
            <div className="p-3.5 bg-stone-900 dark:bg-stone-800 text-white rounded-2xl flex items-center gap-3 border border-transparent dark:border-stone-700">
              <img
                src={currentUser?.avatar}
                alt=""
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-stone-700 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{currentUser?.name}</h4>
                <span className="text-[10px] text-stone-400 font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{isEn ? 'Active Member' : 'Thành viên hoạt động'}</span>
                </span>
              </div>
            </div>

            {/* Navigation Sections */}
            <nav className="space-y-5">
              {menuSections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 px-3">
                    {sec.title}
                  </h5>
                  <div className="space-y-0.5">
                    {sec.items.map(item => {
                      const isActive = currentPath === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => navigate(item.path)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between gap-2 cursor-pointer ${
                            isActive
                              ? 'bg-stone-900 dark:bg-amber-600 text-white font-bold shadow-xs'
                              : item.highlight
                              ? 'bg-[#fde2cd] dark:bg-amber-950/60 text-[#9c3810] dark:text-amber-300 font-bold hover:bg-[#fbd5b5] dark:hover:bg-amber-900/60'
                              : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>}
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.badge !== undefined && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isActive ? 'bg-stone-700 dark:bg-amber-800 text-white' : item.badgeColor || 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
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

          {/* Right Main Content Area (9 cols on desktop) */}
          <div className="lg:col-span-9 space-y-6">
            {children}
          </div>

        </div>

      </div>
    </div>
  );
};
