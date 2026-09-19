export type SystemActionType = 
  | 'REGISTER'
  | 'LOGIN'
  | 'LOGOUT'
  | 'VERIFY_IDENTITY'
  | 'CREATE_PET'
  | 'UPDATE_PET'
  | 'APPROVE_PET'
  | 'REJECT_PET'
  | 'CREATE_APPLICATION'
  | 'APPROVE_APPLICATION'
  | 'REJECT_APPLICATION'
  | 'CANCEL_APPLICATION'
  | 'SCHEDULE_APPOINTMENT'
  | 'SIGN_COMMITMENT'
  | 'COMPLETE_HANDOVER'
  | 'SUBMIT_CHECK_IN'
  | 'SUBMIT_FEEDBACK'
  | 'CREATE_RESCUE'
  | 'APPROVE_RESCUE'
  | 'CREATE_REPORT'
  | 'RESOLVE_REPORT'
  | 'WARN_USER'
  | 'RESTRICT_USER'
  | 'BAN_USER'
  | 'UNBAN_USER'
  | 'EXPORT_REPORT';

export interface SystemAuditLog {
  id: string;
  userId?: string;
  userName?: string;
  actorId?: string;
  actorName?: string;
  action?: SystemActionType;
  actionType?: string;
  entity?: string; // 'Pet', 'Application', 'User', 'Rescue', 'Report', 'Identity'
  entityId?: string;
  targetEntity?: string;
  targetId?: string;
  details?: string;
  description?: string;
  oldValue?: string;
  newValue?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}
