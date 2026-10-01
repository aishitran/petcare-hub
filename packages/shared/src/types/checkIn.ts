export interface PostAdoptionCheckIn {
  id: string;
  applicationId: string;
  petId: string;
  petName: string;
  petAvatar?: string;
  adopterId: string;
  adopterName: string;
  originalOwnerId?: string;
  
  milestone?: 'WEEK_1' | 'MONTH_1' | 'MONTH_3' | 'MONTH_6' | 'YEAR_1';
  weekNumber?: number; // e.g. Week 1, Week 2, Week 3, ...
  checkInDate?: string;
  submittedAt?: string;
  status?: string;
  
  healthCondition?: 'EXCELLENT' | 'GOOD' | 'NORMAL' | 'NEEDS_ATTENTION';
  healthNotes?: string;
  behaviorNotes?: string;
  eatingHabits?: 'Ăn rất tốt' | 'Ăn bình thường' | 'Biếng ăn nhẹ' | 'Cần theo dõi';
  dailyActivityLevel?: 'Rất năng động' | 'Bình thường' | 'Hơi nhút nhát' | 'Mệt mỏi';
  mentalState?: 'Hòa nhập tốt, vui vẻ' | 'Đang làm quen không gian' | 'Còn sợ hãi';
  
  photos: string[];
  notes?: string;
  hasIssuesOrQuestions?: boolean;
  issuesDescription?: string;
  
  isOverdueReminder?: boolean;
  isOverdueWarning?: boolean;
  
  createdAt: string;
}
