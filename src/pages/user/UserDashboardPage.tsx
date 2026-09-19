import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Heart, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  PlusCircle, 
  UserCheck, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';

interface UserDashboardPageProps {
  navigate: (path: string) => void;
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { pets, applications, appointments, checkIns, rescuePosts } = useData();
  const { language, t } = useLanguage();

  if (!currentUser) return null;

  // Filter user specific data
  const myPets = pets.filter(p => p.creatorUserId === currentUser.id);
  const mySentApplications = applications.filter(a => a.applicantId === currentUser.id);
  const myReceivedApplications = applications.filter(a => a.posterUserId === currentUser.id);
  const myAppointments = appointments.filter(apt => apt.applicantId === currentUser.id || apt.posterUserId === currentUser.id);
  const myCheckIns = checkIns.filter(c => c.adopterId === currentUser.id || c.originalOwnerId === currentUser.id);
  const myRescues = rescuePosts.filter(r => r.creatorUserId === currentUser.id);

  const pendingReceivedApps = myReceivedApplications.filter(a => a.status === 'PENDING' || a.status === 'INTERVIEW');
  const activeAppointments = myAppointments.filter(a => a.status === 'SCHEDULED');

  return (
    <div className="space-y-8 text-left">
      
      {/* Welcome & Identity Status Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">{language === 'en' ? 'Personal Portal' : 'Không gian cá nhân'}</span>
              <span className="text-stone-400">•</span>
              <span className="text-xs text-stone-300 font-medium">{currentUser.email}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              {language === 'en' ? `Welcome back, ${currentUser.name}!` : `Xin chào, ${currentUser.name}!`} 👋
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              {language === 'en'
                ? 'Manage your adoption applications, pet rehoming listings, interviews, and welfare updates.'
                : 'Theo dõi và quản lý toàn bộ quy trình nhận nuôi, đăng tin và chăm sóc thú cưng của bạn.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="px-3.5 py-2 rounded-2xl bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{language === 'en' ? 'Verified Community Member' : 'Thành viên cộng đồng PetCare'}</span>
            </div>

            <button
              onClick={() => navigate('/my-pets/create')}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('nav.createPet')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Actionable Alerts if any */}
      {pendingReceivedApps.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
              🔔
            </div>
            <div>
              <h4 className="font-bold text-amber-950 text-xs">
                {language === 'en'
                  ? `You have ${pendingReceivedApps.length} pending adoption applications awaiting review!`
                  : `Bạn có ${pendingReceivedApps.length} đơn nhận nuôi mới đang chờ duyệt!`}
              </h4>
              <p className="text-[11px] text-amber-800">
                {language === 'en'
                  ? 'Review applicant survey responses and schedule an interview.'
                  : 'Hãy xem xét hồ sơ và liên hệ phỏng vấn người nhận nuôi sớm nhé.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/my-pet-applications')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 transition cursor-pointer"
          >
            {language === 'en' ? 'Review Applications' : 'Xem đơn ngay'}
          </button>
        </div>
      )}

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => navigate('/my-pets')}
          className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs hover:border-[#d46b28]/40 dark:hover:border-amber-400/40 cursor-pointer transition space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">{language === 'en' ? 'My Pet Posts' : 'Tin thú cưng'}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#2b2523] dark:text-stone-100">{myPets.length}</div>
          <span className="text-[11px] text-stone-400 dark:text-stone-400 font-medium">{language === 'en' ? 'Pets seeking homes' : 'Bé bạn đang tìm chủ'}</span>
        </div>

        <div 
          onClick={() => navigate('/applications')}
          className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs hover:border-[#d46b28]/40 dark:hover:border-amber-400/40 cursor-pointer transition space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">{language === 'en' ? 'Sent Applications' : 'Đơn đã gửi'}</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#2b2523] dark:text-stone-100">{mySentApplications.length}</div>
          <span className="text-[11px] text-stone-400 dark:text-stone-400 font-medium">{language === 'en' ? 'Applications to other pets' : 'Đơn xin nhận nuôi bé khác'}</span>
        </div>

        <div 
          onClick={() => navigate('/appointments')}
          className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs hover:border-[#d46b28]/40 dark:hover:border-amber-400/40 cursor-pointer transition space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">{language === 'en' ? 'Interviews' : 'Lịch hẹn'}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#2b2523] dark:text-stone-100">{activeAppointments.length}</div>
          <span className="text-[11px] text-stone-400 dark:text-stone-400 font-medium">{language === 'en' ? 'Upcoming interviews' : 'Buổi phỏng vấn sắp tới'}</span>
        </div>

        <div 
          onClick={() => navigate('/check-ins')}
          className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs hover:border-[#d46b28]/40 dark:hover:border-amber-400/40 cursor-pointer transition space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">{language === 'en' ? 'Check-ins' : 'Check-in'}</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#2b2523] dark:text-stone-100">{myCheckIns.length}</div>
          <span className="text-[11px] text-stone-400 dark:text-stone-400 font-medium">{language === 'en' ? 'Post-adoption updates' : 'Lượt cập nhật hậu nhận nuôi'}</span>
        </div>

      </div>

      {/* Grid: Sent Applications Tracker + My Pets Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Box 1: Sent Applications Tracker */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#9c3810] dark:text-amber-400" />
              <span>{language === 'en' ? 'My Sent Adoption Applications' : 'Tiến độ đơn nhận nuôi tôi đã gửi'}</span>
            </h3>
            <button
              onClick={() => navigate('/applications')}
              className="text-xs font-bold text-[#9c3810] dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'en' ? 'View All' : 'Xem tất cả'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {mySentApplications.length > 0 ? (
            <div className="space-y-3">
              {mySentApplications.slice(0, 3).map(app => (
                <div key={app.id} className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200/70 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={app.petAvatar || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100'}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-[#2b2523] dark:text-stone-100 text-xs">{language === 'en' ? `Pet: ${app.petName}` : `Bé ${app.petName}`}</h4>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400">{language === 'en' ? 'Poster:' : 'Người đăng:'} {app.posterUserName}</span>
                      </div>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-stone-400 space-y-2">
              <p className="text-xs">{language === 'en' ? 'You have not submitted any adoption applications yet.' : 'Bạn chưa gửi đơn nhận nuôi nào.'}</p>
              <button
                onClick={() => navigate('/pets')}
                className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-[#2b2523] dark:text-stone-200 text-xs font-bold cursor-pointer"
              >
                {language === 'en' ? 'Find a Companion' : 'Tìm bạn nhỏ nhận nuôi'}
              </button>
            </div>
          )}
        </div>

        {/* Box 2: Received Applications for My Pets */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#9c3810] dark:text-amber-400" />
              <span>{language === 'en' ? 'Applications for My Pets' : 'Đơn xin nhận nuôi thú cưng của tôi'}</span>
            </h3>
            <button
              onClick={() => navigate('/my-pet-applications')}
              className="text-xs font-bold text-[#9c3810] dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'en' ? 'View All' : 'Xem tất cả'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {myReceivedApplications.length > 0 ? (
            <div className="space-y-3">
              {myReceivedApplications.slice(0, 3).map(app => (
                <div key={app.id} className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200/70 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#2b2523] dark:text-stone-100 text-xs">{app.applicantName}</span>
                        <span className="text-[10px] text-stone-400">{language === 'en' ? 'applied for' : 'xin nhận nuôi'}</span>
                        <span className="font-bold text-[#9c3810] dark:text-amber-400 text-xs">{app.petName}</span>
                      </div>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400">{language === 'en' ? 'Phone:' : 'SĐT:'} {app.applicantPhone}</span>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-stone-400 space-y-2">
              <p className="text-xs">{language === 'en' ? 'No applications received for your pets yet.' : 'Chưa có người nộp đơn cho thú cưng của bạn.'}</p>
              <button
                onClick={() => navigate('/my-pets/create')}
                className="px-4 py-2 rounded-xl bg-[#9c3810] hover:bg-[#852f0d] dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-xs font-bold cursor-pointer"
              >
                {t('nav.createPet')}
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
