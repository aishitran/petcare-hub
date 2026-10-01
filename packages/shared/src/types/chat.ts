export type ChatChannelType = 'ASSISTANT' | 'USER_DIRECT';

export interface ChatMessage {
  id: string;
  senderId?: string;
  sender: 'USER' | 'AGENT' | 'SYSTEM' | 'OTHER_USER';
  text: string;
  timestamp: string;
  avatar?: string;
  senderName?: string;
  quickReplies?: string[];
  actionLink?: {
    label: string;
    url?: string;
    actionType?: 'OPEN_DIRECTORY' | 'OPEN_SOS_REPORT' | 'OPEN_FOOD_DONATION' | 'NAVIGATE';
  };
}

export interface UserConversation {
  id: string;
  targetUserId: string;
  targetUserName: string;
  targetUserAvatar: string;
  targetUserRole: string;
  targetPetName?: string;
  targetPetAvatar?: string;
  targetPetBreed?: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface QuickPrompt {
  id: string;
  titleVi: string;
  titleEn: string;
  promptVi: string;
  promptEn: string;
  responseVi: string;
  responseEn: string;
  actionType?: 'OPEN_DIRECTORY' | 'OPEN_SOS_REPORT' | 'OPEN_FOOD_DONATION';
}
