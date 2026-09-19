import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Heart, 
  Search, 
  PlusCircle, 
  Bell, 
  Menu, 
  X, 
  User, 
  Shield, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  ChevronDown,
  PhoneCall
} from 'lucide-react';
import { EmergencyShelterModal } from '../rescue/EmergencyShelterModal';
import { ReportStreetRescueModal } from '../rescue/ReportStreetRescueModal';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
  onOpenAdoptionGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate, onOpenAdoptionGuide }) => {
  const { role, currentUser, logout } = useAuth();
  const { notifications, markNotificationRead } = useData();
  const { language, t } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [shelterModalOpen, setShelterModalOpen] = useState(false);
  const [reportStreetModalOpen, setReportStreetModalOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read);

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.pets'), path: '/pets' },
    { label: t('nav.rescue'), path: '/rescue' },
    { label: t('nav.guide'), path: '/#guide' }
  ];

  const handleNav = (path: string) => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    setNotifDropdownOpen(false);
    if (path === '/#guide') {
      if (onOpenAdoptionGuide) {
        onOpenAdoptionGuide();
        return;
      }
    }
    navigate(path);
  };

  return (
    <header className="w-full bg-[#faf4ee]/95 dark:bg-[#1c1917]/95 backdrop-blur-md border-b border-[#efe2d3] dark:border-stone-800 shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-20 w-full">
          
          <div className="flex items-center gap-10 shrink-0">
            <div 
              onClick={() => handleNav('/')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <img 
                src="/logo.png" 
                alt="PetCare Hub Logo" 
                className="w-10 h-10 rounded-full object-cover shadow-xs group-hover:scale-105 transition ring-2 ring-[#d46b28]/30"
              />
              <div className="flex flex-col text-left">
                <span className="text-base font-bold tracking-tight text-[#2b2523] dark:text-stone-100 font-display leading-none">
                  PetCare<span className="text-[#d46b28]">Hub</span>
                </span>
                <span className="text-[10px] font-medium text-[#78665e] dark:text-stone-400 tracking-wider uppercase mt-1">
                  {t('common.tagline')}
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5">
              {navLinks.map(link => {
                const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer ${
                      isActive
                        ? 'text-[#d46b28] dark:text-amber-400 bg-[#fde2cd] dark:bg-amber-950/50 font-bold shadow-2xs'
                        : 'text-[#5c4d46] dark:text-stone-300 hover:text-[#d46b28] dark:hover:text-amber-400 hover:bg-[#f8eade] dark:hover:bg-stone-800'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            
            {/* 24/7 SOS Emergency Hotline Button */}
            <button
              onClick={() => setShelterModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#fde8e8] dark:bg-rose-950/40 hover:bg-[#fbd5d5] dark:hover:bg-rose-900/40 text-[#c53030] dark:text-rose-300 border border-[#f8b4b4] dark:border-rose-800/60 text-xs font-bold transition shadow-2xs cursor-pointer group"
              title={t('emergency.bannerDesc')}
            >
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              <span>{t('nav.emergencyHotline')}</span>
            </button>

            {/* Primary Action Button */}
            {role === 'USER' && (
              <button
                onClick={() => handleNav('/my-pets/create')}
                className="px-4 py-2 bg-[#d46b28] hover:bg-[#ba591a] text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                {t('nav.createPet')}
              </button>
            )}

            {/* Notifications (if User or Admin) */}
            {role !== 'GUEST' && (
              <div className="relative">
                <button
                  onClick={() => { setNotifDropdownOpen(!notifDropdownOpen); setUserMenuOpen(false); }}
                  className="p-2 rounded-xl border border-stone-200/80 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition relative cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifs.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-stone-900 rounded-2xl shadow-lg border border-stone-200/80 dark:border-stone-700 p-3.5 z-50 text-left">
                    <div className="flex items-center justify-between pb-2.5 border-b border-stone-100 dark:border-stone-800 mb-2 px-1">
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{t('nav.notifications')} ({notifications.length})</span>
                      <button 
                        onClick={() => handleNav('/notifications')}
                        className="text-[11px] text-[#d46b28] font-medium hover:underline cursor-pointer"
                      >
                        {t('common.all')}
                      </button>
                    </div>

                    <div className="max-h-72 overflow-y-auto space-y-1.5 divide-y divide-stone-50 dark:divide-stone-800/60">
                      {notifications.slice(0, 4).map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            if (n.linkUrl) handleNav(n.linkUrl);
                          }}
                          className={`p-2.5 rounded-xl text-xs transition cursor-pointer ${
                            !n.read ? 'bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800' : 'hover:bg-stone-50 dark:hover:bg-stone-800/40'
                          }`}
                        >
                          <div className="font-semibold text-stone-900 dark:text-stone-100">{n.title}</div>
                          <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-0.5 line-clamp-2">{n.message}</p>
                          <span className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 block">{n.createdAt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Role-specific User Controls */}
            {role === 'GUEST' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/login')}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={() => handleNav('/register')}
                  className="px-3.5 py-2 bg-stone-900 dark:bg-amber-600 hover:bg-stone-800 dark:hover:bg-amber-700 text-white rounded-xl text-xs font-medium transition shadow-xs cursor-pointer"
                >
                  {t('nav.register')}
                </button>
              </div>
            ) : role === 'ADMIN' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/admin')}
                  className="px-3.5 py-2 bg-stone-900 dark:bg-amber-600 hover:bg-stone-800 dark:hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  {t('nav.adminPortal')}
                </button>
                <button
                  onClick={() => { logout(); handleNav('/'); }}
                  className="px-3 py-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 text-xs font-medium cursor-pointer"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              /* Authenticated User Menu */
              <div className="relative">
                <button
                  onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifDropdownOpen(false); }}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-stone-200/80 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
                >
                  <span className="text-xs font-medium text-stone-800 dark:text-stone-200">{currentUser?.name}</span>
                  <img
                    src={currentUser?.avatar}
                    alt=""
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200/80 dark:border-stone-700 p-2 z-50 text-left text-xs font-normal space-y-0.5">
                    <div className="p-2.5 bg-stone-50 dark:bg-stone-800 rounded-xl mb-1 border border-stone-100 dark:border-stone-700">
                      <div className="font-semibold text-stone-900 dark:text-stone-100">{currentUser?.name}</div>
                      <div className="text-[11px] text-stone-600 dark:text-stone-400 truncate">{currentUser?.email}</div>
                    </div>

                    <button
                      onClick={() => handleNav('/dashboard')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold cursor-pointer"
                    >
                      {t('nav.dashboard')}
                    </button>

                    <button
                      onClick={() => handleNav('/my-pets')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 cursor-pointer"
                    >
                      {t('nav.myPets')} ({currentUser?.stats?.petsPosted || 0})
                    </button>

                    <button
                      onClick={() => handleNav('/applications')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 cursor-pointer"
                    >
                      {t('nav.myApplications')}
                    </button>

                    <button
                      onClick={() => handleNav('/my-pet-applications')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 cursor-pointer"
                    >
                      {t('nav.applicationsForMyPets')}
                    </button>

                    <button
                      onClick={() => handleNav('/appointments')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 cursor-pointer"
                    >
                      {t('nav.appointments')}
                    </button>

                    <button
                      onClick={() => handleNav('/check-ins')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 cursor-pointer"
                    >
                      {t('nav.checkIns')}
                    </button>

                    <div className="border-t border-stone-100 dark:border-stone-800 pt-1 mt-1">
                      <button
                        onClick={() => { logout(); handleNav('/'); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-medium cursor-pointer"
                      >
                        {t('nav.logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Subtle Vertical Divider */}
            <div className="h-5 w-px bg-stone-300/80 dark:bg-stone-700 mx-1" />

            {/* Language & Theme Switcher */}
            <LanguageSwitcher variant="pill" />

          </div>

          {/* Mobile Menu Button (Clean, uncluttered) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 space-y-3 text-left">
          
          {/* Mobile Language & Theme Switcher */}
          <LanguageSwitcher variant="mobile" />

          {/* Mobile SOS Emergency Rescue Button */}
          <button
            onClick={() => { setMobileMenuOpen(false); setShelterModalOpen(true); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-rose-600 text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>{t('nav.emergencyHotline')}</span>
            </span>
            <span className="text-[11px] font-mono bg-rose-700/80 px-2 py-0.5 rounded-md">24/7</span>
          </button>

          <div className="space-y-1">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                {link.label}
              </button>
            ))}
          </div>

          {role === 'USER' && (
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-1">
              <button
                onClick={() => handleNav('/dashboard')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#fde2cd] dark:bg-amber-950/50 text-[#2b2523] dark:text-amber-200"
              >
                {t('nav.dashboard')}
              </button>
              <button
                onClick={() => handleNav('/my-pets/create')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#d46b28] text-white"
              >
                + {t('nav.createPet')}
              </button>
              <button
                onClick={() => handleNav('/applications')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                {t('nav.myApplications')}
              </button>
              <button
                onClick={() => handleNav('/my-pet-applications')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                {t('nav.applicationsForMyPets')}
              </button>
              <button
                onClick={() => handleNav('/appointments')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                {t('nav.appointments')}
              </button>
              <button
                onClick={() => handleNav('/check-ins')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                {t('nav.checkIns')}
              </button>
            </div>
          )}

          {role === 'ADMIN' && (
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={() => handleNav('/admin')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#2c1209] dark:bg-amber-900 text-white"
              >
                {t('nav.adminPortal')}
              </button>
            </div>
          )}

          {role === 'GUEST' && (
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex gap-2">
              <button
                onClick={() => handleNav('/login')}
                className="flex-1 py-2.5 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-300"
              >
                {t('nav.login')}
              </button>
              <button
                onClick={() => handleNav('/register')}
                className="flex-1 py-2.5 bg-stone-900 dark:bg-amber-600 text-white rounded-xl text-xs font-bold"
              >
                {t('nav.register')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Emergency Shelter Directory Modal */}
      <EmergencyShelterModal
        isOpen={shelterModalOpen}
        onClose={() => setShelterModalOpen(false)}
        onReportStreetIncident={() => {
          setShelterModalOpen(false);
          setReportStreetModalOpen(true);
        }}
      />

      {/* Rapid Street Rescue SOS Report Modal */}
      <ReportStreetRescueModal
        isOpen={reportStreetModalOpen}
        onClose={() => setReportStreetModalOpen(false)}
        onSuccessNavigate={(rescueId) => handleNav(`/rescue/${rescueId}`)}
        onOpenDirectory={() => {
          setReportStreetModalOpen(false);
          setShelterModalOpen(true);
        }}
      />

    </header>
  );
};
