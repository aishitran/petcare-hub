export interface AdoptionFeedback {
  id: string;
  applicationId: string;
  petId: string;
  petName: string;
  posterUserId?: string;
  posterUserName?: string;
  fromUserId?: string;
  fromUserName?: string;
  toUserId?: string;
  toUserName?: string;
  adopterUserId?: string;
  adopterName?: string;
  adopterAvatar?: string;
  
  rating?: number;
  ratingStars?: number; // 1 to 5
  comment: string;
  photos?: string[];
  createdAt: string;
}
