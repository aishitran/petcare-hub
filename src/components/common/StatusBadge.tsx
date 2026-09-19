import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface StatusBadgeProps {
  type?: 'pet' | 'app' | 'identity' | 'account' | 'rescue' | 'priority' | 'report' | 'petMod' | 'commitment';
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, status, size = 'sm' }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs font-semibold',
    md: 'px-3 py-1 text-xs font-bold',
    lg: 'px-3.5 py-1.5 text-sm font-bold',
  }[size];

  // Auto-detect type if not provided
  let detectedType = type;
  if (!detectedType) {
    if (['WAITING', 'UNDER_REVIEW', 'ADOPTED', 'PAUSED', 'COMING_SOON'].includes(status)) detectedType = 'pet';
    else if (['PENDING_APPROVAL', 'APPROVED', 'REJECTED'].includes(status)) detectedType = 'petMod';
    else if (['PENDING', 'INTERVIEW', 'CANCELLED', 'BACKUP'].includes(status)) detectedType = 'app';
    else if (['VERIFIED', 'UNVERIFIED', 'FAILED'].includes(status)) detectedType = 'identity';
    else if (['ACTIVE', 'RESTRICTED', 'BANNED', 'SUSPENDED'].includes(status)) detectedType = 'account';
    else if (['URGENT', 'HIGH', 'MEDIUM', 'LOW'].includes(status)) detectedType = 'priority';
    else if (['COMPLETED', 'INVESTIGATING', 'DISMISSED', 'RESOLVED'].includes(status)) detectedType = 'report';
  }

  // 1. Pet Status
  if (detectedType === 'pet') {
    switch (status) {
      case 'WAITING':
        return (
          <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/30 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {isEn ? 'Seeking Home' : 'Tìm mái ấm'}
          </span>
        );
      case 'UNDER_REVIEW':
        return (
          <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-600/30 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            {isEn ? 'Under Review' : 'Đang xét duyệt'}
          </span>
        );
      case 'ADOPTED':
        return (
          <span className={`inline-flex items-center gap-1.5 rounded-full bg-teal-50 text-teal-800 ring-1 ring-teal-600/30 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            {isEn ? 'Adopted' : 'Đã có chủ mới'}
          </span>
        );
      case 'PAUSED':
        return (
          <span className={`inline-flex items-center gap-1.5 rounded-full bg-stone-100 text-stone-700 ring-1 ring-stone-400/30 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
            {isEn ? 'Paused' : 'Tạm dừng'}
          </span>
        );
      case 'COMING_SOON':
        return (
          <span className={`inline-flex items-center gap-1.5 rounded-full bg-sky-50 text-sky-800 ring-1 ring-sky-600/30 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
            {isEn ? 'Opening Soon' : 'Sắp mở nhận nuôi'}
          </span>
        );
    }
  }

  // 2. Pet Moderation Status
  if (detectedType === 'petMod') {
    switch (status) {
      case 'APPROVED':
        return <span className={`rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/30 ${sizeClasses}`}>{isEn ? 'Approved' : 'Đã duyệt'}</span>;
      case 'PENDING_APPROVAL':
        return <span className={`rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-600/30 ${sizeClasses}`}>{isEn ? 'Pending Review' : 'Chờ kiểm duyệt'}</span>;
      case 'REJECTED':
        return <span className={`rounded-full bg-rose-50 text-rose-800 ring-1 ring-rose-600/30 ${sizeClasses}`}>{isEn ? 'Rejected' : 'Từ chối'}</span>;
    }
  }

  // 3. Application Status
  if (detectedType === 'app') {
    switch (status) {
      case 'PENDING':
        return <span className={`rounded-full bg-sky-50 text-sky-800 ring-1 ring-sky-600/30 ${sizeClasses}`}>{isEn ? 'Pending' : 'Chờ xem xét'}</span>;
      case 'INTERVIEW':
        return <span className={`rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-600/30 ${sizeClasses}`}>{isEn ? 'Interview Scheduled' : 'Hẹn phỏng vấn'}</span>;
      case 'APPROVED':
        return <span className={`rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/30 ${sizeClasses}`}>{isEn ? 'Approved' : 'Đã duyệt nhận nuôi'}</span>;
      case 'REJECTED':
        return <span className={`rounded-full bg-rose-50 text-rose-800 ring-1 ring-rose-600/30 ${sizeClasses}`}>{isEn ? 'Not Suitable' : 'Chưa phù hợp'}</span>;
      case 'CANCELLED':
        return <span className={`rounded-full bg-stone-100 text-stone-600 ring-1 ring-stone-400/30 ${sizeClasses}`}>{isEn ? 'Cancelled' : 'Đã hủy đơn'}</span>;
      case 'BACKUP':
        return <span className={`rounded-full bg-orange-50 text-orange-800 ring-1 ring-orange-600/30 ${sizeClasses}`}>{isEn ? 'Backup Applicant' : 'Đơn dự phòng'}</span>;
    }
  }

  // 4. Identity / Member Status
  if (detectedType === 'identity') {
    switch (status) {
      case 'VERIFIED':
        return <span className={`rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/30 ${sizeClasses}`}>{isEn ? '✓ Verified Member' : '✓ Thành viên xác minh'}</span>;
      case 'PENDING':
        return <span className={`rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-600/30 ${sizeClasses}`}>{isEn ? 'Under Review' : 'Đang duyệt'}</span>;
      case 'FAILED':
        return <span className={`rounded-full bg-rose-50 text-rose-800 ring-1 ring-rose-600/30 ${sizeClasses}`}>{isEn ? 'Unverified' : 'Chưa xác minh'}</span>;
      case 'UNVERIFIED':
      default:
        return <span className={`rounded-full bg-stone-100 text-stone-600 ring-1 ring-stone-400/30 ${sizeClasses}`}>{isEn ? 'New Member' : 'Thành viên mới'}</span>;
    }
  }

  // 5. Account Status
  if (detectedType === 'account') {
    switch (status) {
      case 'ACTIVE':
        return <span className={`rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/30 ${sizeClasses}`}>{isEn ? 'Active' : 'Hoạt động'}</span>;
      case 'RESTRICTED':
        return <span className={`rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-600/30 ${sizeClasses}`}>{isEn ? 'Restricted' : 'Bị hạn chế'}</span>;
      case 'BANNED':
      case 'SUSPENDED':
        return <span className={`rounded-full bg-rose-50 text-rose-800 ring-1 ring-rose-600/30 ${sizeClasses}`}>{isEn ? 'Suspended' : 'Bị khóa'}</span>;
    }
  }

  // 6. Rescue Priority
  if (detectedType === 'priority') {
    switch (status) {
      case 'URGENT':
        return (
          <span className={`inline-flex items-center gap-1.5 rounded-full bg-rose-50 text-rose-900 ring-1 ring-rose-400/40 font-bold ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            {isEn ? 'URGENT' : 'Khẩn cấp'}
          </span>
        );
      case 'HIGH':
        return (
          <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-900 ring-1 ring-amber-400/40 font-semibold ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            {isEn ? 'High Priority' : 'Ưu tiên cao'}
          </span>
        );
      case 'MEDIUM':
        return <span className={`rounded-full bg-stone-100 text-stone-800 ring-1 ring-stone-300/60 font-medium ${sizeClasses}`}>{isEn ? 'Medium' : 'Trung bình'}</span>;
      case 'LOW':
        return <span className={`rounded-full bg-stone-50 text-stone-600 ring-1 ring-stone-200 font-medium ${sizeClasses}`}>{isEn ? 'Normal' : 'Bình thường'}</span>;
    }
  }

  // 7. Rescue Status
  if (detectedType === 'rescue') {
    switch (status) {
      case 'APPROVED':
        return <span className={`rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/30 ${sizeClasses}`}>{isEn ? 'Open for Help' : 'Đang kêu gọi'}</span>;
      case 'COMPLETED':
        return <span className={`rounded-full bg-teal-50 text-teal-800 ring-1 ring-teal-600/30 ${sizeClasses}`}>{isEn ? 'Completed' : 'Đã hoàn thành'}</span>;
      case 'PENDING_APPROVAL':
        return <span className={`rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-600/30 ${sizeClasses}`}>{isEn ? 'Pending' : 'Chờ duyệt'}</span>;
      case 'CANCELLED':
        return <span className={`rounded-full bg-stone-100 text-stone-600 ${sizeClasses}`}>{isEn ? 'Closed' : 'Đã đóng'}</span>;
    }
  }

  // 8. Report Status
  if (detectedType === 'report') {
    switch (status) {
      case 'PENDING':
        return <span className={`rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-600/30 ${sizeClasses}`}>{isEn ? 'Pending' : 'Chờ xử lý'}</span>;
      case 'INVESTIGATING':
        return <span className={`rounded-full bg-blue-50 text-blue-800 ring-1 ring-blue-600/30 ${sizeClasses}`}>{isEn ? 'Investigating' : 'Đang điều tra'}</span>;
      case 'RESOLVED':
        return <span className={`rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/30 ${sizeClasses}`}>{isEn ? 'Resolved' : 'Đã giải quyết'}</span>;
      case 'DISMISSED':
      case 'REJECTED':
        return <span className={`rounded-full bg-stone-100 text-stone-600 ${sizeClasses}`}>{isEn ? 'Dismissed' : 'Bác bỏ'}</span>;
    }
  }

  // 9. Commitment Status
  if (detectedType === 'commitment') {
    switch (status) {
      case 'PENDING_SIGNATURE':
        return <span className={`rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-600/30 ${sizeClasses}`}>{isEn ? 'Pending Signature' : 'Chờ ký cam kết'}</span>;
      case 'SIGNED':
        return <span className={`rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/30 ${sizeClasses}`}>{isEn ? 'Agreement Signed' : 'Đã ký biên bản'}</span>;
      case 'COMPLETED':
        return <span className={`rounded-full bg-teal-50 text-teal-800 ring-1 ring-teal-600/30 ${sizeClasses}`}>{isEn ? 'Handover Completed' : 'Hoàn tất bàn giao'}</span>;
    }
  }

  return <span className={`rounded-full bg-stone-100 text-stone-700 ring-1 ring-stone-300 ${sizeClasses}`}>{status}</span>;
};
