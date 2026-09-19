import React, { createContext, useContext, useState } from 'react';
import { UserProfile, AccountStatus, IdentityStatus } from '../types/user';
import { Pet, PetStatus, PetModerationStatus } from '../types/pet';
import { AdoptionApplication, ApplicationStatus } from '../types/application';
import { Appointment, AppointmentStatus } from '../types/appointment';
import { AdoptionCommitment } from '../types/commitment';
import { HandoverRecord } from '../types/handover';
import { PostAdoptionCheckIn } from '../types/checkIn';
import { AdoptionFeedback } from '../types/feedback';
import { RescuePost, RescueStatus } from '../types/rescue';
import { CommunityReport, ReportStatus } from '../types/report';
import { SystemAuditLog, SystemActionType } from '../types/systemLog';
import { UserNotification } from '../types/notification';
import { FoodFundCampaign, FoodDonation } from '../types/donation';

import { mockUsers } from '../data/mockUsers';
import { mockPets } from '../data/mockPets';
import { mockApplications } from '../data/mockApplications';
import { mockAppointments } from '../data/mockAppointments';
import { mockCommitments } from '../data/mockCommitments';
import { mockHandovers } from '../data/mockHandovers';
import { mockCheckIns } from '../data/mockCheckIns';
import { mockFeedback } from '../data/mockFeedback';
import { mockRescuePosts } from '../data/mockRescuePosts';
import { mockReports } from '../data/mockReports';
import { mockLogs } from '../data/mockLogs';
import { mockNotifications } from '../data/mockNotifications';
import { mockFoodFundCampaign, mockFoodFundCampaigns } from '../data/mockFoodFund';

interface PublicStatistics {
  totalPets: number;
  adoptedPets: number;
  dogsAdopted: number;
  catsAdopted: number;
  adoptionApplications: number;
  petsLookingForHome: number;
}

interface DataContextType {
  // Users & Identity
  users: UserProfile[];
  getUserById: (id: string) => UserProfile | undefined;
  updateUserAccountStatus: (userId: string, status: AccountStatus, reason?: string) => void;
  warnUser: (userId: string, reason: string) => void;
  submitIdentityDocument: (userId: string, idNumber: string, fullName: string, dob: string) => void;
  adminReviewIdentity: (userId: string, status: IdentityStatus, rejectionReason?: string) => void;

  // Pets
  pets: Pet[];
  getPetById: (id: string) => Pet | undefined;
  createPetPost: (petData: Omit<Pet, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'favoritesCount' | 'activeApplicationsCount' | 'moderationStatus' | 'status'>) => Pet;
  updatePetPost: (id: string, updated: Partial<Pet>) => void;
  pausePetPost: (id: string) => void;
  resumePetPost: (id: string) => void;
  adminApprovePet: (id: string) => void;
  adminRejectPet: (id: string, reason: string) => void;
  deletePetPost: (id: string) => void;

  // Applications
  applications: AdoptionApplication[];
  getApplicationById: (id: string) => AdoptionApplication | undefined;
  submitApplication: (data: Omit<AdoptionApplication, 'id' | 'submittedAt' | 'updatedAt' | 'timeline' | 'status'>) => { app: AdoptionApplication; isBackup: boolean };
  acceptApplicationToInterview: (appId: string) => void;
  rejectApplication: (appId: string, reason: string) => void;
  cancelApplication: (appId: string, reason: string) => void;

  // Appointments
  appointments: Appointment[];
  scheduleAppointment: (data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Appointment;
  rescheduleAppointment: (id: string, date: string, time: string, notes?: string) => void;
  confirmAppointment: (id: string) => void;
  cancelAppointment: (id: string) => void;

  // Commitments & Handovers
  commitments: AdoptionCommitment[];
  signCommitment: (applicationId: string, signatureText: string) => void;
  handovers: HandoverRecord[];
  completeHandover: (applicationId: string, checklist: HandoverRecord['checklist'], photos: string[], notes?: string) => void;

  // Check-ins & Feedback
  checkIns: PostAdoptionCheckIn[];
  submitCheckIn: (data: Omit<PostAdoptionCheckIn, 'id' | 'createdAt' | 'isOverdueReminder' | 'isOverdueWarning'>) => PostAdoptionCheckIn;
  feedback: AdoptionFeedback[];
  submitFeedback: (data: Omit<AdoptionFeedback, 'id' | 'createdAt'>) => AdoptionFeedback;

  // Rescue
  rescuePosts: RescuePost[];
  getRescuePostById: (id: string) => RescuePost | undefined;
  createRescuePost: (data: Omit<RescuePost, 'id' | 'status' | 'supportsCount' | 'createdAt' | 'updatedAt'>) => RescuePost;
  adminApproveRescuePost: (id: string) => void;
  adminRejectRescuePost: (id: string) => void;
  offerRescueSupport: (id: string) => void;
  completeRescuePost: (id: string) => void;

  // Reports
  reports: CommunityReport[];
  submitReport: (data: Omit<CommunityReport, 'id' | 'status' | 'createdAt'>) => CommunityReport;
  adminInvestigateReport: (id: string, notes: string) => void;
  adminResolveReport: (id: string, actionTaken: CommunityReport['actionTaken'], notes: string) => void;
  adminRejectReport: (id: string, notes: string) => void;

  // Notifications
  notifications: UserNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (userId: string) => void;

  // Food Fund Campaign (Multi-campaign support with Shelter organizers & Disclaimers)
  foodFundCampaigns: FoodFundCampaign[];
  activeCampaignId: string;
  setActiveCampaignId: (id: string) => void;
  foodFundCampaign: FoodFundCampaign;
  getCampaignById: (id: string) => FoodFundCampaign | undefined;
  donateToFoodFund: (data: { campaignId?: string; donorName: string; amount: number; message: string; isAnonymous?: boolean; foodPackageName?: string }) => FoodDonation;

  // System Logs & Public Stats
  systemLogs: SystemAuditLog[];
  publicStats: PublicStatistics;

  // Convenient Aliases for UI components
  createPet: (petData: any) => Pet;
  updatePet: (id: string, updated: Partial<Pet>) => void;
  updatePetModerationStatus: (id: string, status: PetModerationStatus) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus, reason?: string) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  supportRescuePost: (id: string) => void;
  updateRescuePostStatus: (id: string, status: RescueStatus) => void;
  updateReportStatus: (id: string, status: ReportStatus, notes?: string) => void;
  addCheckIn: (data: any) => PostAdoptionCheckIn;
  addFeedback: (data: any) => AdoptionFeedback;
  feedbacks: AdoptionFeedback[];
  submitIdentityVerification: (userId: string, data: any) => void;
  updateIdentityStatus: (userId: string, status: IdentityStatus) => void;
  statistics: {
    totalPets: number;
    totalWaitingPets: number;
    totalAdoptedPets: number;
    totalActiveRescuePosts: number;
    totalVerifiedUsers: number;
    successfulAdoptionRate: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserProfile[]>(mockUsers);
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [applications, setApplications] = useState<AdoptionApplication[]>(mockApplications);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [commitments, setCommitments] = useState<AdoptionCommitment[]>(mockCommitments);
  const [foodFundCampaigns, setFoodFundCampaigns] = useState<FoodFundCampaign[]>(mockFoodFundCampaigns);
  const [activeCampaignId, setActiveCampaignId] = useState<string>(mockFoodFundCampaigns[0]?.id || 'FFC-2026-HCM');
  const [handovers, setHandovers] = useState<HandoverRecord[]>(mockHandovers);
  const [checkIns, setCheckIns] = useState<PostAdoptionCheckIn[]>(mockCheckIns);
  const [feedback, setFeedback] = useState<AdoptionFeedback[]>(mockFeedback);
  const [rescuePosts, setRescuePosts] = useState<RescuePost[]>(mockRescuePosts);
  const [reports, setReports] = useState<CommunityReport[]>(mockReports);
  const [notifications, setNotifications] = useState<UserNotification[]>(mockNotifications);
  const [systemLogs, setSystemLogs] = useState<SystemAuditLog[]>(mockLogs);

  // Helper to log system actions
  const logAction = (
    action: SystemActionType,
    entity: string,
    entityId: string,
    details: string,
    userId = 'system',
    userName = 'Hệ thống',
    oldValue?: string,
    newValue?: string
  ) => {
    const newLog: SystemAuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      userName,
      action,
      entity,
      entityId,
      details,
      oldValue,
      newValue,
      ipAddress: '113.161.45.12',
      userAgent: navigator.userAgent || 'Mozilla/5.0',
      timestamp: new Date().toLocaleString('vi-VN')
    };
    setSystemLogs(prev => [newLog, ...prev]);
  };

  // Helper to send notifications
  const sendNotification = (
    userId: string,
    title: string,
    message: string,
    type: UserNotification['type'],
    linkUrl?: string
  ) => {
    const newNotif: UserNotification = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      title,
      message,
      type,
      linkUrl,
      read: false,
      createdAt: 'Vừa xong',
      group: 'TODAY'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Public statistics
  const publicStats: PublicStatistics = {
    totalPets: 2846 + pets.length - mockPets.length,
    adoptedPets: 1932 + pets.filter(p => p.status === 'ADOPTED').length - 1,
    dogsAdopted: 1124 + pets.filter(p => p.status === 'ADOPTED' && p.species === 'DOG').length - 1,
    catsAdopted: 808 + pets.filter(p => p.status === 'ADOPTED' && p.species === 'CAT').length,
    adoptionApplications: 3421 + applications.length - mockApplications.length,
    petsLookingForHome: 914 + pets.filter(p => p.status === 'WAITING').length - 4
  };

  // Users & Identity
  const getUserById = (id: string) => users.find(u => u.id === id);

  const updateUserAccountStatus = (userId: string, status: AccountStatus, reason?: string) => {
    const target = users.find(u => u.id === userId);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, accountStatus: status, restrictionReason: reason } : u));
    logAction(
      status === 'BANNED' ? 'BAN_USER' : status === 'RESTRICTED' ? 'RESTRICT_USER' : 'UNBAN_USER',
      'User',
      userId,
      `Cập nhật trạng thái tài khoản: ${status}. Lý do: ${reason || 'Quyết định của quản trị viên'}`,
      'admin-1',
      'Trần Hoàng (Admin)',
      target?.accountStatus,
      status
    );
    sendNotification(userId, `Thông báo trạng thái tài khoản`, `Tài khoản của bạn đã được cập nhật sang trạng thái: ${status}.`, 'SYSTEM');
  };

  const warnUser = (userId: string, reason: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, warningCount: (u.warningCount || 0) + 1 } : u));
    logAction('WARN_USER', 'User', userId, `Gửi cảnh cáo người dùng: ${reason}`, 'admin-1', 'Trần Hoàng (Admin)');
    sendNotification(userId, 'Cảnh cáo vi phạm quy tắc cộng đồng', `Bạn nhận được 1 cảnh cáo từ Quản trị viên: ${reason}. Vui lòng tuân thủ quy tắc để tránh bị hạn chế tài khoản.`, 'SYSTEM');
  };

  const submitIdentityDocument = (userId: string, idNumber: string, fullName: string, dob: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== userId) return u;
      return {
        ...u,
        identityStatus: 'PENDING',
        identityDocument: {
          idNumber,
          fullName: fullName.toUpperCase(),
          dob,
          submittedAt: new Date().toLocaleDateString('vi-VN')
        }
      };
    }));
    logAction('VERIFY_IDENTITY', 'Identity', userId, `Người dùng nộp hồ sơ xác thực tài khoản`, userId, fullName);
    sendNotification(userId, 'Hồ sơ xác minh đã được tiếp nhận', 'Hồ sơ xác minh danh tính của bạn đang được Admin xét duyệt trong vòng 24h làm việc.', 'IDENTITY', '/identity');
  };

  const adminReviewIdentity = (userId: string, status: IdentityStatus, rejectionReason?: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== userId) return u;
      return {
        ...u,
        identityStatus: status,
        identityDocument: u.identityDocument ? {
          ...u.identityDocument,
          verifiedAt: status === 'VERIFIED' ? new Date().toLocaleDateString('vi-VN') : undefined,
          rejectionReason: status === 'FAILED' ? rejectionReason : undefined
        } : undefined
      };
    }));
    logAction('VERIFY_IDENTITY', 'Identity', userId, `Admin xét duyệt hồ sơ danh tính: ${status}`, 'admin-1', 'Trần Hoàng (Admin)');
    sendNotification(
      userId,
      status === 'VERIFIED' ? 'Xác thực danh tính thành công' : 'Xác thực danh tính chưa được duyệt',
      status === 'VERIFIED' 
        ? 'Chúc mừng! Hồ sơ danh tính của bạn đã được xác minh thành công.' 
        : `Hồ sơ xác thực danh tính chưa đạt yêu cầu: ${rejectionReason || 'Thông tin chưa rõ ràng'}. Vui lòng gửi lại.`,
      'IDENTITY',
      '/identity'
    );
  };

  // Pets
  const getPetById = (id: string) => pets.find(p => p.id === id);

  const createPetPost = (petData: Omit<Pet, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'favoritesCount' | 'activeApplicationsCount' | 'moderationStatus' | 'status'>): Pet => {
    const newPet: Pet = {
      ...petData,
      id: `pet-${Date.now()}`,
      status: 'WAITING',
      moderationStatus: 'APPROVED', // Direct display for smooth demo
      createdAt: new Date().toLocaleDateString('vi-VN'),
      updatedAt: new Date().toLocaleDateString('vi-VN'),
      viewsCount: 1,
      favoritesCount: 0,
      activeApplicationsCount: 0
    };
    setPets(prev => [newPet, ...prev]);
    logAction('CREATE_PET', 'Pet', newPet.id, `Đăng tin tìm chủ mới cho bé ${newPet.name}`, petData.creatorUserId, petData.creatorUserName);
    sendNotification(petData.creatorUserId, 'Đăng tin thú cưng thành công', `Tin đăng bé ${newPet.name} đã được xuất bản công khai trên PetCare Hub.`, 'APPLICATION', `/pets/${newPet.id}`);
    return newPet;
  };

  const updatePetPost = (id: string, updated: Partial<Pet>) => {
    setPets(prev => prev.map(p => p.id === id ? { ...p, ...updated, updatedAt: new Date().toLocaleDateString('vi-VN') } : p));
    logAction('UPDATE_PET', 'Pet', id, `Cập nhật thông tin bài đăng thú cưng`);
  };

  const pausePetPost = (id: string) => {
    const pet = pets.find(p => p.id === id);
    setPets(prev => prev.map(p => p.id === id ? { ...p, status: 'PAUSED' } : p));
    logAction('UPDATE_PET', 'Pet', id, `Tạm dừng bài đăng bé ${pet?.name}`);
  };

  const resumePetPost = (id: string) => {
    const pet = pets.find(p => p.id === id);
    setPets(prev => prev.map(p => p.id === id ? { ...p, status: 'WAITING' } : p));
    logAction('UPDATE_PET', 'Pet', id, `Mở lại bài đăng bé ${pet?.name}`);
  };

  const adminApprovePet = (id: string) => {
    const pet = pets.find(p => p.id === id);
    setPets(prev => prev.map(p => p.id === id ? { ...p, moderationStatus: 'APPROVED' } : p));
    logAction('APPROVE_PET', 'Pet', id, `Admin phê duyệt bài đăng ${pet?.name}`, 'admin-1', 'Trần Hoàng (Admin)');
    if (pet) {
      sendNotification(pet.creatorUserId, 'Bài đăng đã được duyệt', `Bài đăng thú cưng ${pet.name} của bạn đã được phê duyệt công khai.`, 'APPLICATION', `/pets/${pet.id}`);
    }
  };

  const adminRejectPet = (id: string, reason: string) => {
    const pet = pets.find(p => p.id === id);
    setPets(prev => prev.map(p => p.id === id ? { ...p, moderationStatus: 'REJECTED', rejectionReason: reason } : p));
    logAction('REJECT_PET', 'Pet', id, `Admin từ chối bài đăng: ${reason}`, 'admin-1', 'Trần Hoàng (Admin)');
    if (pet) {
      sendNotification(pet.creatorUserId, 'Bài đăng bị từ chối', `Bài đăng ${pet.name} không được phê duyệt: ${reason}`, 'APPLICATION', '/my-pets');
    }
  };

  const deletePetPost = (id: string) => {
    setPets(prev => prev.filter(p => p.id !== id));
    logAction('UPDATE_PET', 'Pet', id, `Xóa bài đăng thú cưng`);
  };

  // Applications
  const getApplicationById = (id: string) => applications.find(a => a.id === id);

  const submitApplication = (
    data: Omit<AdoptionApplication, 'id' | 'submittedAt' | 'updatedAt' | 'timeline' | 'status'>
  ): { app: AdoptionApplication; isBackup: boolean } => {
    const targetPet = pets.find(p => p.id === data.petId);
    const existingActiveApp = applications.find(
      a => a.petId === data.petId && (a.status === 'PENDING' || a.status === 'INTERVIEW' || a.status === 'APPROVED')
    );

    const isBackup = !!existingActiveApp;
    const initialStatus: ApplicationStatus = isBackup ? 'BACKUP' : 'PENDING';

    const newApp: AdoptionApplication = {
      ...data,
      id: `app-${Date.now()}`,
      status: initialStatus,
      submittedAt: new Date().toLocaleString('vi-VN'),
      updatedAt: new Date().toLocaleString('vi-VN'),
      timeline: [
        {
          id: `t-${Date.now()}`,
          status: initialStatus,
          title: isBackup ? 'Lưu vào Hàng chờ Dự phòng' : 'Đã nộp đơn nhận nuôi',
          timestamp: new Date().toLocaleString('vi-VN'),
          actorName: data.applicantName,
          notes: isBackup 
            ? 'Bé đang có hồ sơ khác đang được xem xét. Đơn của bạn được xếp vào hàng chờ dự phòng tự động.'
            : 'Đơn đã gửi trực tiếp đến người đăng tin để xem xét hồ sơ.',
          completed: true
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);

    // Lock pet to UNDER_REVIEW if not backup
    if (!isBackup) {
      setPets(prev => prev.map(p => p.id === data.petId ? { ...p, status: 'UNDER_REVIEW', activeApplicationsCount: (p.activeApplicationsCount || 0) + 1 } : p));
    } else {
      setPets(prev => prev.map(p => p.id === data.petId ? { ...p, activeApplicationsCount: (p.activeApplicationsCount || 0) + 1 } : p));
    }

    logAction('CREATE_APPLICATION', 'Application', newApp.id, `Nộp đơn nhận nuôi bé ${data.petName}`, data.applicantId, data.applicantName);
    
    // Notify pet poster
    sendNotification(
      data.posterUserId,
      `Có đơn nhận nuôi mới cho bé ${data.petName}`,
      `${data.applicantName} vừa nộp đơn xin nhận nuôi bé ${data.petName}. Vui lòng xem xét hồ sơ.`,
      'APPLICATION',
      '/my-pet-applications'
    );

    return { app: newApp, isBackup };
  };

  const acceptApplicationToInterview = (appId: string) => {
    const target = applications.find(a => a.id === appId);
    if (!target) return;

    const now = new Date().toLocaleString('vi-VN');
    setApplications(prev => prev.map(a => {
      if (a.id !== appId) return a;
      return {
        ...a,
        status: 'INTERVIEW',
        updatedAt: now,
        timeline: [
          ...a.timeline,
          {
            id: `t-${Date.now()}`,
            status: 'INTERVIEW',
            title: 'Chủ nuôi chấp thuận hồ sơ & Hẹn phỏng vấn',
            timestamp: now,
            actorName: target.posterUserName,
            notes: 'Hồ sơ đạt yêu cầu. Hai bên chuẩn bị tiến hành trao đổi và hẹn lịch gặp bé.',
            completed: true
          }
        ]
      };
    }));

    logAction('APPROVE_APPLICATION', 'Application', appId, `Chấp thuận hồ sơ sang vòng phỏng vấn bé ${target.petName}`, target.posterUserId, target.posterUserName);
    
    sendNotification(
      target.applicantId,
      `Hồ sơ nhận nuôi bé ${target.petName} đã được chấp thuận!`,
      `${target.posterUserName} đã duyệt hồ sơ của bạn và sẵn sàng lên lịch hẹn phỏng vấn gặp mặt.`,
      'APPOINTMENT',
      '/applications'
    );
  };

  const rejectApplication = (appId: string, reason: string) => {
    const target = applications.find(a => a.id === appId);
    if (!target) return;

    const now = new Date().toLocaleString('vi-VN');
    
    setApplications(prev => {
      let updated = prev.map(a => {
        if (a.id !== appId) return a;
        return {
          ...a,
          status: 'REJECTED' as ApplicationStatus,
          rejectionReason: reason,
          updatedAt: now,
          timeline: [
            ...a.timeline,
            {
              id: `t-${Date.now()}`,
              status: 'REJECTED' as ApplicationStatus,
              title: 'Từ chối đơn nhận nuôi',
              timestamp: now,
              actorName: target.posterUserName,
              notes: `Lý do: ${reason}`,
              completed: true
            }
          ]
        };
      });

      // Check if backup application exists for promotion
      const backupApp = updated.find(a => a.petId === target.petId && a.status === 'BACKUP');
      if (backupApp) {
        updated = updated.map(a => {
          if (a.id !== backupApp.id) return a;
          return {
            ...a,
            status: 'PENDING' as ApplicationStatus,
            updatedAt: now,
            timeline: [
              ...a.timeline,
              {
                id: `t-prom-${Date.now()}`,
                status: 'PENDING' as ApplicationStatus,
                title: 'Được đôn lên thành Đơn chính thức',
                timestamp: now,
                actorName: 'Hệ thống tự động',
                notes: 'Đơn trước đó đã kết thúc. Đơn dự phòng của bạn được tự động chuyển sang xét duyệt chính thức.',
                completed: true
              }
            ]
          };
        });
      }

      return updated;
    });

    // Check pet status
    setTimeout(() => {
      setPets(prev => prev.map(p => {
        if (p.id !== target.petId) return p;
        const remainingActive = applications.filter(a => a.petId === p.id && a.id !== appId && (a.status === 'PENDING' || a.status === 'INTERVIEW' || a.status === 'BACKUP'));
        if (remainingActive.length === 0) {
          return { ...p, status: 'WAITING' };
        }
        return p;
      }));
    }, 50);

    logAction('REJECT_APPLICATION', 'Application', appId, `Từ chối đơn nhận nuôi: ${reason}`, target.posterUserId, target.posterUserName);
    
    sendNotification(
      target.applicantId,
      `Thông báo về đơn nhận nuôi bé ${target.petName}`,
      `Chủ nuôi chưa thể duyệt đơn của bạn vào thời điểm này: ${reason}`,
      'APPLICATION',
      '/applications'
    );
  };

  const cancelApplication = (appId: string, reason: string) => {
    const target = applications.find(a => a.id === appId);
    if (!target) return;

    const now = new Date().toLocaleString('vi-VN');
    
    setApplications(prev => {
      let updated = prev.map(a => {
        if (a.id !== appId) return a;
        return {
          ...a,
          status: 'CANCELLED' as ApplicationStatus,
          cancelReason: reason,
          updatedAt: now,
          timeline: [
            ...a.timeline,
            {
              id: `t-${Date.now()}`,
              status: 'CANCELLED' as ApplicationStatus,
              title: 'Người nhận nuôi đã hủy đơn',
              timestamp: now,
              actorName: target.applicantName,
              notes: `Lý do hủy: ${reason}`,
              completed: true
            }
          ]
        };
      });

      const backupApp = updated.find(a => a.petId === target.petId && a.status === 'BACKUP');
      if (backupApp) {
        updated = updated.map(a => {
          if (a.id !== backupApp.id) return a;
          return {
            ...a,
            status: 'PENDING' as ApplicationStatus,
            updatedAt: now,
            timeline: [
              ...a.timeline,
              {
                id: `t-prom-${Date.now()}`,
                status: 'PENDING' as ApplicationStatus,
                title: 'Được đôn lên thành Đơn chính thức',
                timestamp: now,
                actorName: 'Hệ thống tự động',
                notes: 'Đơn trước đó đã hủy. Đơn dự phòng của bạn được tự động đôn lên xét duyệt.',
                completed: true
              }
            ]
          };
        });
      }

      return updated;
    });

    setTimeout(() => {
      setPets(prev => prev.map(p => {
        if (p.id !== target.petId) return p;
        const remainingActive = applications.filter(a => a.petId === p.id && a.id !== appId && (a.status === 'PENDING' || a.status === 'INTERVIEW' || a.status === 'BACKUP'));
        if (remainingActive.length === 0) {
          return { ...p, status: 'WAITING' };
        }
        return p;
      }));
    }, 50);

    logAction('CANCEL_APPLICATION', 'Application', appId, `Người dùng hủy đơn nhận nuôi bé ${target.petName}`, target.applicantId, target.applicantName);
  };

  // Appointments
  const scheduleAppointment = (data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Appointment => {
    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      status: 'CONFIRMED',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      updatedAt: new Date().toLocaleDateString('vi-VN')
    };
    setAppointments(prev => [newApt, ...prev]);
    logAction('SCHEDULE_APPOINTMENT', 'Appointment', newApt.id, `Lên lịch hẹn gặp mặt bé ${data.petName} vào ${data.time} ngày ${data.date}`, data.posterUserId, data.posterUserName);
    
    sendNotification(
      data.applicantId,
      `Lịch hẹn gặp mặt bé ${data.petName}`,
      `Lịch hẹn phỏng vấn trực tiếp đã được ấn định vào ${data.time} ngày ${data.date} tại ${data.locationAddress}.`,
      'APPOINTMENT',
      '/appointments'
    );
    return newApt;
  };

  const rescheduleAppointment = (id: string, date: string, time: string, notes?: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, date, time, notes: notes || a.notes, status: 'RESCHEDULED', updatedAt: new Date().toLocaleDateString('vi-VN') } : a));
    logAction('SCHEDULE_APPOINTMENT', 'Appointment', id, `Dời lịch hẹn sang ${time} ngày ${date}`);
  };

  const confirmAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'CONFIRMED' } : a));
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a));
  };

  // Commitments
  const signCommitment = (applicationId: string, signatureText: string) => {
    const app = applications.find(a => a.id === applicationId);
    if (!app) return;

    const newCommitment: AdoptionCommitment = {
      id: `commit-${Date.now()}`,
      applicationId,
      petId: app.petId,
      petName: app.petName,
      petAvatar: app.petAvatar,
      posterUserId: app.posterUserId,
      posterUserName: app.posterUserName,
      adopterId: app.applicantId,
      adopterName: app.applicantName,
      adopterPhone: app.applicantPhone,
      commitmentConditions: [
        '1. Cam kết tuyệt đối KHÔNG TRỤC LỢI, không buôn bán lại, không chuyển nhượng thương mại, không nhân giống sinh sản vì mục đích kinh doanh.',
        '2. Cam kết NUÔI DƯỠNG CÓ TRÁCH NHIỆM & KHÔNG BỎ RƠI: Chăm sóc trọn đời, không bỏ rơi bé khi chuyển nhà hoặc thay đổi hoàn cảnh sống.',
        '3. Cam kết KHÔNG THẢ RÔNG ngoài đường mà không có dây dắt, bảo đảm an toàn cho bé.',
        '4. Cam kết CHĂM SÓC Y TẾ: Đảm bảo tiêm phòng dại, tiêm vắc xin định kỳ và triệt sản đúng tuổi.',
        '5. Cam kết MINH BẠCH: Đồng ý gửi hình ảnh/video cập nhật sức khỏe định kỳ (1 tuần, 1 tháng, 3 tháng).'
      ],
      agreedChecklist: {
        noProfiteering: true,
        noCommercialBreeding: true,
        noAbandonment: true,
        noSellingOrTrading: true,
        timelyVaccination: true,
        regularCheckIns: true,
        properNutritionAndLivingSpace: true
      },
      signatureText,
      status: 'SIGNED',
      signedAt: new Date().toLocaleString('vi-VN'),
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    setCommitments(prev => [newCommitment, ...prev]);

    // Update application timeline
    setApplications(prev => prev.map(a => {
      if (a.id !== applicationId) return a;
      return {
        ...a,
        timeline: [
          ...a.timeline,
          {
            id: `t-${Date.now()}`,
            status: 'COMMITMENT_SIGNED',
            title: 'Đã ký cam kết nhận nuôi có trách nhiệm',
            timestamp: new Date().toLocaleString('vi-VN'),
            actorName: app.applicantName,
            notes: 'Người nhận nuôi đã xác nhận ký điện tử bản cam kết phúc lợi động vật.',
            completed: true
          }
        ]
      };
    }));

    logAction('SIGN_COMMITMENT', 'Commitment', newCommitment.id, `Ký cam kết nhận nuôi bé ${app.petName}`, app.applicantId, app.applicantName);
    
    sendNotification(
      app.posterUserId,
      `Bản cam kết nhận nuôi đã được ký`,
      `${app.applicantName} đã ký cam kết nhận nuôi bé ${app.petName}. Bạn có thể tiến hành bước bàn giao bé.`,
      'APPLICATION',
      '/handovers'
    );
  };

  // Handover
  const completeHandover = (
    applicationId: string, 
    checklist: HandoverRecord['checklist'], 
    photos: string[], 
    notes?: string
  ) => {
    const app = applications.find(a => a.id === applicationId);
    if (!app) return;

    const newHandover: HandoverRecord = {
      id: `handover-${Date.now()}`,
      applicationId,
      petId: app.petId,
      petName: app.petName,
      petAvatar: app.petAvatar,
      posterUserId: app.posterUserId,
      posterUserName: app.posterUserName,
      adopterId: app.applicantId,
      adopterName: app.applicantName,
      adopterPhone: app.applicantPhone,
      handoverDate: new Date().toLocaleDateString('vi-VN'),
      handoverLocation: app.applicantAddress,
      checklist,
      handoverPhotos: photos,
      notes: notes || 'Đã bàn giao bé thành công và trao gửi tình yêu thương.',
      isCompleted: true,
      completedAt: new Date().toLocaleString('vi-VN')
    };

    setHandovers(prev => [newHandover, ...prev]);

    // Update pet status to ADOPTED!
    setPets(prev => prev.map(p => p.id === app.petId ? { ...p, status: 'ADOPTED' } : p));

    // Update application status to APPROVED
    setApplications(prev => prev.map(a => {
      if (a.id !== applicationId) return a;
      return {
        ...a,
        status: 'APPROVED',
        timeline: [
          ...a.timeline,
          {
            id: `t-${Date.now()}`,
            status: 'HANDED_OVER',
            title: 'Đã hoàn tất bàn giao bé',
            timestamp: new Date().toLocaleString('vi-VN'),
            actorName: 'Hai bên bàn giao',
            notes: 'Bé đã về với mái ấm mới an toàn và hạnh phúc.',
            completed: true
          }
        ]
      };
    }));

    logAction('COMPLETE_HANDOVER', 'Handover', newHandover.id, `Hoàn tất bàn giao bé ${app.petName} sang chủ mới ${app.applicantName}`);
    
    sendNotification(
      app.applicantId,
      `Chào mừng bạn và bé ${app.petName} bước vào hành trình mới!`,
      `Bàn giao hoàn tất. Bạn có thể gửi đánh giá trải nghiệm và bắt đầu cập nhật check-in định kỳ hàng tuần.`,
      'CHECK_IN',
      '/check-ins'
    );
  };

  // Check-ins
  const submitCheckIn = (data: Omit<PostAdoptionCheckIn, 'id' | 'createdAt' | 'isOverdueReminder' | 'isOverdueWarning'>): PostAdoptionCheckIn => {
    const newCheckIn: PostAdoptionCheckIn = {
      ...data,
      id: `checkin-${Date.now()}`,
      isOverdueReminder: false,
      isOverdueWarning: false,
      createdAt: new Date().toLocaleString('vi-VN')
    };
    setCheckIns(prev => [newCheckIn, ...prev]);
    logAction('SUBMIT_CHECK_IN', 'CheckIn', newCheckIn.id, `Gửi cập nhật Tuần ${data.weekNumber} cho bé ${data.petName}`, data.adopterId, data.adopterName);
    return newCheckIn;
  };

  // Feedback
  const submitFeedback = (data: Omit<AdoptionFeedback, 'id' | 'createdAt'>): AdoptionFeedback => {
    const newFb: AdoptionFeedback = {
      ...data,
      id: `fb-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('vi-VN')
    };
    setFeedback(prev => [newFb, ...prev]);
    logAction('SUBMIT_FEEDBACK', 'Feedback', newFb.id, `Gửi đánh giá ${data.ratingStars} sao cho quá trình nhận nuôi bé ${data.petName}`, data.adopterUserId, data.adopterName);
    return newFb;
  };

  // Rescue
  const getRescuePostById = (id: string) => rescuePosts.find(r => r.id === id);

  const createRescuePost = (data: Omit<RescuePost, 'id' | 'status' | 'supportsCount' | 'createdAt' | 'updatedAt'>): RescuePost => {
    const newRescue: RescuePost = {
      ...data,
      id: `rescue-${Date.now()}`,
      status: 'APPROVED', // Direct approved for demo
      supportsCount: 0,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      updatedAt: new Date().toLocaleDateString('vi-VN')
    };
    setRescuePosts(prev => [newRescue, ...prev]);
    logAction('CREATE_RESCUE', 'Rescue', newRescue.id, `Đăng tin kêu gọi cứu trợ: ${data.title}`, data.creatorUserId, data.creatorUserName);
    sendNotification(data.creatorUserId, 'Đăng tin cứu trợ thành công', `Bài kêu gọi hỗ trợ "${data.title}" đã được hiển thị trên chuyên mục Cứu trợ.`, 'RESCUE', `/rescue/${newRescue.id}`);
    return newRescue;
  };

  const adminApproveRescuePost = (id: string) => {
    setRescuePosts(prev => prev.map(r => r.id === id ? { ...r, status: 'APPROVED' } : r));
    logAction('APPROVE_RESCUE', 'Rescue', id, `Admin duyệt bài đăng cứu trợ`, 'admin-1', 'Trần Hoàng (Admin)');
  };

  const adminRejectRescuePost = (id: string) => {
    setRescuePosts(prev => prev.map(r => r.id === id ? { ...r, status: 'CANCELLED' } : r));
    logAction('APPROVE_RESCUE', 'Rescue', id, `Admin từ chối bài đăng cứu trợ`, 'admin-1', 'Trần Hoàng (Admin)');
  };

  const offerRescueSupport = (id: string) => {
    setRescuePosts(prev => prev.map(r => r.id === id ? { ...r, supportsCount: r.supportsCount + 1 } : r));
  };

  const completeRescuePost = (id: string) => {
    setRescuePosts(prev => prev.map(r => r.id === id ? { ...r, status: 'COMPLETED' } : r));
  };

  // Reports
  const submitReport = (data: Omit<CommunityReport, 'id' | 'status' | 'createdAt'>): CommunityReport => {
    const newReport: CommunityReport = {
      ...data,
      id: `rep-${Date.now()}`,
      status: 'PENDING',
      createdAt: new Date().toLocaleString('vi-VN')
    };
    setReports(prev => [newReport, ...prev]);
    logAction('CREATE_REPORT', 'Report', newReport.id, `Gửi báo cáo vi phạm: ${data.reason}`, data.reporterUserId, data.reporterUserName);
    sendNotification(data.reporterUserId, 'Báo cáo vi phạm đã được gửi', 'Cảm ơn bạn đã đóng góp xây dựng cộng đồng an toàn. Đội ngũ kiểm duyệt sẽ xử lý báo cáo trong thời gian sớm nhất.', 'REPORT');
    return newReport;
  };

  const adminInvestigateReport = (id: string, notes: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'INVESTIGATING', investigationNotes: notes } : r));
    logAction('RESOLVE_REPORT', 'Report', id, `Chuyển báo cáo sang trạng thái Đang điều tra: ${notes}`, 'admin-1', 'Trần Hoàng (Admin)');
  };

  const adminResolveReport = (id: string, actionTaken: CommunityReport['actionTaken'], notes: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'RESOLVED', actionTaken, investigationNotes: notes, resolvedAt: new Date().toLocaleString('vi-VN') } : r));
    logAction('RESOLVE_REPORT', 'Report', id, `Giải quyết báo cáo vi phạm: ${actionTaken}. Ghi chú: ${notes}`, 'admin-1', 'Trần Hoàng (Admin)');
  };

  const adminRejectReport = (id: string, notes: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'REJECTED', investigationNotes: notes } : r));
    logAction('RESOLVE_REPORT', 'Report', id, `Bác bỏ báo cáo vi phạm: ${notes}`, 'admin-1', 'Trần Hoàng (Admin)');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = (userId: string) => {
    setNotifications(prev => prev.map(n => n.userId === userId ? { ...n, read: true } : n));
  };

  // Convenient Aliases
  const createPet = (petData: any): Pet => {
    return createPetPost(petData);
  };

  const updatePet = (id: string, updated: Partial<Pet>) => {
    updatePetPost(id, updated);
  };

  const updatePetModerationStatus = (id: string, status: PetModerationStatus) => {
    if (status === 'APPROVED') adminApprovePet(id);
    else if (status === 'REJECTED') adminRejectPet(id, 'Không đáp ứng tiêu chuẩn an toàn');
    else updatePetPost(id, { moderationStatus: status });
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus, reason?: string) => {
    if (status === 'INTERVIEW') acceptApplicationToInterview(id);
    else if (status === 'REJECTED') rejectApplication(id, reason || 'Chưa phù hợp');
    else if (status === 'CANCELLED') cancelApplication(id, reason || 'Người nộp đơn tự hủy');
    else {
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a));
      if (status === 'APPROVED') {
        const targetApp = applications.find(a => a.id === id);
        if (targetApp) {
          updatePetPost(targetApp.petId, { status: 'UNDER_REVIEW' });
        }
      }
    }
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    if (status === 'CONFIRMED') confirmAppointment(id);
    else if (status === 'CANCELLED') cancelAppointment(id);
    else {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a));
    }
  };

  const supportRescuePost = (id: string) => {
    offerRescueSupport(id);
  };

  const updateRescuePostStatus = (id: string, status: RescueStatus) => {
    if (status === 'APPROVED') adminApproveRescuePost(id);
    else if (status === 'COMPLETED') completeRescuePost(id);
    else setRescuePosts(prev => prev.map(r => r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r));
  };

  const updateReportStatus = (id: string, status: ReportStatus, notes?: string) => {
    if (status === 'RESOLVED') adminResolveReport(id, 'CONTENT_REMOVED', notes || '');
    else if (status === 'DISMISSED' || status === 'REJECTED') adminRejectReport(id, notes || '');
    else setReports(prev => prev.map(r => r.id === id ? { ...r, status, adminNotes: notes } : r));
  };

  const addCheckIn = (data: any): PostAdoptionCheckIn => {
    return submitCheckIn(data);
  };

  const addFeedback = (data: any): AdoptionFeedback => {
    return submitFeedback(data);
  };

  const submitIdentityVerification = (userId: string, data: any) => {
    submitIdentityDocument(userId, data.idNumber, users.find(u => u.id === userId)?.name || '', '1998-01-01');
  };

  const updateIdentityStatus = (userId: string, status: IdentityStatus) => {
    adminReviewIdentity(userId, status);
  };

  const statistics = {
    totalPets: pets.length,
    totalWaitingPets: pets.filter(p => p.status === 'WAITING' || p.status === 'UNDER_REVIEW').length,
    totalAdoptedPets: pets.filter(p => p.status === 'ADOPTED').length,
    totalActiveRescuePosts: rescuePosts.filter(r => r.status === 'APPROVED').length,
    totalVerifiedUsers: users.filter(u => u.identityStatus === 'VERIFIED').length,
    successfulAdoptionRate: pets.length > 0 ? Math.round((pets.filter(p => p.status === 'ADOPTED').length / pets.length) * 100) : 78
  };

  const getCampaignById = (id: string) => foodFundCampaigns.find(c => c.id === id);
  const foodFundCampaign = foodFundCampaigns.find(c => c.id === activeCampaignId) || foodFundCampaigns[0] || mockFoodFundCampaign;

  const donateToFoodFund = ({
    campaignId,
    donorName,
    amount,
    message,
    isAnonymous,
    foodPackageName
  }: {
    campaignId?: string;
    donorName: string;
    amount: number;
    message: string;
    isAnonymous?: boolean;
    foodPackageName?: string;
  }): FoodDonation => {
    const targetCampaignId = campaignId || activeCampaignId;
    // 20,000 VND ~ 1kg of high-grade rescue food
    const kgEquivalent = Math.round((amount / 20000) * 10) / 10;
    const pkgName = foodPackageName || (amount >= 500000 ? 'Bao 10kg hạt dinh dưỡng cao cấp' : amount >= 300000 ? 'Gói 6kg hạt + pate bổ sung' : 'Gói hỗ trợ dinh dưỡng');
    
    const newDonation: FoodDonation = {
      id: `FD-${Date.now().toString().slice(-4)}`,
      campaignId: targetCampaignId,
      donorName: isAnonymous ? 'Một người bạn ẩn danh' : donorName || 'Nhà hảo tâm PetCare',
      amount,
      foodPackageName: pkgName,
      kgEquivalent,
      message: message || 'Gửi tình thương và bữa ăn no đủ tới các bé!',
      createdAt: 'Vừa xong',
      isAnonymous
    };

    setFoodFundCampaigns(prev => prev.map(camp => {
      if (camp.id !== targetCampaignId) return camp;
      return {
        ...camp,
        currentAmount: camp.currentAmount + amount,
        currentKg: Math.round((camp.currentKg + kgEquivalent) * 10) / 10,
        totalDonorsCount: camp.totalDonorsCount + 1,
        recentDonations: [newDonation, ...camp.recentDonations.slice(0, 7)]
      };
    }));

    return newDonation;
  };

  return (
    <DataContext.Provider
      value={{
        users,
        getUserById,
        updateUserAccountStatus,
        warnUser,
        submitIdentityDocument,
        adminReviewIdentity,
        pets,
        getPetById,
        createPetPost,
        updatePetPost,
        pausePetPost,
        resumePetPost,
        adminApprovePet,
        adminRejectPet,
        deletePetPost,
        applications,
        getApplicationById,
        submitApplication,
        acceptApplicationToInterview,
        rejectApplication,
        cancelApplication,
        appointments,
        scheduleAppointment,
        rescheduleAppointment,
        confirmAppointment,
        cancelAppointment,
        commitments,
        signCommitment,
        handovers,
        completeHandover,
        checkIns,
        submitCheckIn,
        feedback,
        submitFeedback,
        rescuePosts,
        getRescuePostById,
        createRescuePost,
        adminApproveRescuePost,
        adminRejectRescuePost,
        offerRescueSupport,
        completeRescuePost,
        reports,
        submitReport,
        adminInvestigateReport,
        adminResolveReport,
        adminRejectReport,
        foodFundCampaigns,
        activeCampaignId,
        setActiveCampaignId,
        foodFundCampaign,
        getCampaignById,
        donateToFoodFund,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        systemLogs,
        publicStats,
        createPet,
        updatePet,
        updatePetModerationStatus,
        updateApplicationStatus,
        updateAppointmentStatus,
        supportRescuePost,
        updateRescuePostStatus,
        updateReportStatus,
        addCheckIn,
        addFeedback,
        feedbacks: feedback,
        submitIdentityVerification,
        updateIdentityStatus,
        statistics
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
