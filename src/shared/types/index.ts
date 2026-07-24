export type UserRole = 'OWNER' | 'ADMIN' | 'USER';

export type UserStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface User {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl?: string;
  bio?: string;
  isOnline: boolean;
  lastSeen?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO';
  replyToId?: string;
  isStarred?: boolean;
  isRead?: boolean;
  createdAt: string;
}

export interface Chat {
  id: string;
  type: 'PRIVATE' | 'GROUP';
  name?: string;
  avatarUrl?: string;
  participants: User[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isPinned?: boolean;
  isArchived?: boolean;
  createdAt: string;
}

export interface SystemSettings {
  inviteOnly: boolean;
  requireAdminApproval: boolean;
  allowMediaUpload: boolean;
  maxFileUploadMb: number;
}
