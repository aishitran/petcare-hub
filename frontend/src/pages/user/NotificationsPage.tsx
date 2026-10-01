import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { translateDynamicText } from '../../utils/dataTranslator';
import { Bell, CheckCircle2, Clock, FileText, Heart, ShieldAlert, Award } from 'lucide-react';

interface NotificationsPageProps {
  navigate: (path: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { notifications, markNotificationRead } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  if (!currentUser) return null;

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 font-display">
            {isEn ? 'System Notifications' : 'Thông báo hệ thống'}
          </h1>
          <p className="text-xs text-stone-500">
            {isEn 
              ? 'Updates on adoption application status, interviews, check-ins, and feedback.' 
              : 'Cập nhật về tiến độ đơn nhận nuôi, lịch hẹn, check-in và phản hồi.'}
          </p>
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationRead(notif.id);
                if (notif.linkUrl) navigate(notif.linkUrl);
              }}
              className={`p-4 rounded-3xl border transition flex items-start gap-3 cursor-pointer ${
                notif.read
                  ? 'bg-white border-stone-200/80 text-stone-600'
                  : 'bg-emerald-50/60 border-emerald-200 text-stone-900 shadow-sm'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                notif.read ? 'bg-stone-100 text-stone-500' : 'bg-emerald-800 text-white shadow-sm'
              }`}>
                <Bell className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-xs ${notif.read ? 'font-semibold text-stone-800' : 'font-black text-emerald-950'}`}>
                    {translateDynamicText(notif.title, language)}
                  </h4>
                  <span className="text-[10px] text-stone-400 shrink-0">
                    {new Date(notif.createdAt).toLocaleDateString(isEn ? 'en-US' : 'vi-VN')}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {translateDynamicText(notif.message, language)}
                </p>
              </div>

              {!notif.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-dashed border-stone-300 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto text-2xl">
            🔔
          </div>
          <h3 className="font-bold text-stone-900 text-base">
            {isEn ? 'No new notifications' : 'Không có thông báo mới'}
          </h3>
          <p className="text-xs text-stone-500">
            {isEn ? 'Important system updates will appear here.' : 'Mọi thông báo quan trọng sẽ xuất hiện tại đây.'}
          </p>
        </div>
      )}

    </div>
  );
};
