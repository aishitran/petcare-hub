import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Appointment } from '../../types/appointment';
import { translateDynamicText } from '../../utils/dataTranslator';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Plus, 
  User, 
  Heart,
  MessageSquare
} from 'lucide-react';

interface AppointmentsPageProps {
  navigate: (path: string) => void;
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { appointments, updateAppointmentStatus } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  if (!currentUser) return null;

  const myAppointments = appointments.filter(
    apt => apt.applicantId === currentUser.id || apt.posterUserId === currentUser.id
  );

  const handleComplete = (aptId: string) => {
    updateAppointmentStatus(aptId, 'COMPLETED');
  };

  const handleCancel = (aptId: string) => {
    const confirmMsg = isEn 
      ? 'Are you sure you want to cancel this appointment?' 
      : 'Bạn có chắc chắn muốn hủy lịch hẹn này?';
    if (window.confirm(confirmMsg)) {
      updateAppointmentStatus(aptId, 'CANCELLED');
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 font-display">
            {isEn ? 'Interview & Meetup Appointments' : 'Lịch hẹn phỏng vấn & Gặp gỡ'}
          </h1>
          <p className="text-xs text-stone-500">
            {isEn 
              ? 'Manage online video sessions or in-person meetups for pet adoptions.' 
              : 'Quản lý các buổi trao đổi trực tuyến hoặc gặp mặt trực tiếp để nhận nuôi thú cưng.'}
          </p>
        </div>
      </div>

      {/* Appointments List */}
      {myAppointments.length > 0 ? (
        <div className="space-y-4">
          {myAppointments.map(apt => {
            const isApplicant = apt.applicantId === currentUser.id;
            const counterpartName = isApplicant ? apt.posterUserName : apt.applicantName;
            const roleLabel = isApplicant 
              ? (isEn ? 'Pet Poster' : 'Người đăng tin') 
              : (isEn ? 'Applicant' : 'Người nộp đơn');

            return (
              <div 
                key={apt.id}
                className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-sm space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-bold">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-stone-900 text-base">
                          {isEn ? `Interview for ${apt.petName}` : `Phỏng vấn nhận nuôi bé ${apt.petName}`}
                        </h3>
                        <StatusBadge status={apt.status} />
                      </div>
                      <p className="text-xs text-stone-500">
                        {isEn ? `Counterpart (${roleLabel}):` : `Đối tác (${roleLabel}):`} <b className="text-stone-800">{counterpartName}</b>
                      </p>
                    </div>
                  </div>

                  <div className="text-right self-start sm:self-auto">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                      <Clock className="w-4 h-4 text-emerald-700" />
                      <span>{apt.time} - {apt.date}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 font-semibold block">
                      {isEn ? 'Format:' : 'Hình thức:'} {apt.format === 'ONLINE' ? (isEn ? 'Online Video Meet' : 'Trực tuyến (Online)') : (isEn ? 'In-person Meeting' : 'Gặp trực tiếp')}
                    </span>
                  </div>
                </div>

                {/* Meeting Location / Online Link Box */}
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/70 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {apt.format === 'ONLINE' ? (
                      <Video className="w-4 h-4 text-teal-700 shrink-0" />
                    ) : (
                      <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    )}
                    <span className="text-stone-700 font-medium truncate">
                      {apt.format === 'ONLINE' ? apt.locationOrLink : translateDynamicText(apt.locationOrLink, language)}
                    </span>
                  </div>

                  {apt.format === 'ONLINE' && apt.status === 'SCHEDULED' && (
                    <a
                      href={apt.locationOrLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center gap-1 shrink-0"
                    >
                      <span>{isEn ? 'Join Meeting Room' : 'Vào phòng họp'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {apt.notes && (
                  <p className="text-xs text-stone-600 bg-amber-50/70 p-3 rounded-2xl border border-amber-100">
                    <span className="font-bold text-amber-900 block">{isEn ? 'Notes:' : 'Ghi chú:'}</span>
                    {translateDynamicText(apt.notes, language)}
                  </p>
                )}

                {/* Action Buttons */}
                {apt.status === 'SCHEDULED' && (
                  <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                    <button
                      onClick={() => handleCancel(apt.id)}
                      className="px-3.5 py-1.5 rounded-xl text-stone-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold transition"
                    >
                      {isEn ? 'Cancel Appointment' : 'Hủy lịch hẹn'}
                    </button>
                    <button
                      onClick={() => handleComplete(apt.id)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Mark Interview as Completed' : 'Xác nhận đã hoàn thành phỏng vấn'}</span>
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-dashed border-stone-300 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto text-2xl">
            📅
          </div>
          <h3 className="font-bold text-stone-900 text-base">
            {isEn ? 'No appointments found' : 'Không có lịch hẹn nào'}
          </h3>
          <p className="text-xs text-stone-500">
            {isEn 
              ? 'Interview schedules will automatically appear here once confirmed.' 
              : 'Lịch phỏng vấn sẽ tự động xuất hiện khi bạn hoặc người đăng tin xác nhận thời gian.'}
          </p>
        </div>
      )}

    </div>
  );
};
