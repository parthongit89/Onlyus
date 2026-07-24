import { Chat, ChatMessage, User } from '../../shared/types';

let MOCK_CHATS: Chat[] = [
  {
    id: 'chat_1',
    type: 'PRIVATE',
    participants: [
      {
        id: 'usr_parth',
        username: 'parth',
        displayName: 'Parth Sonavane (Owner)',
        email: 'parth@onlyus.private',
        role: 'OWNER',
        status: 'APPROVED',
        isOnline: true,
        createdAt: '2026-07-01',
      },
    ],
    unreadCount: 0,
    isPinned: true,
    isArchived: false,
    createdAt: '2026-07-24 10:00',
    lastMessage: {
      id: 'msg_101',
      chatId: 'chat_1',
      senderId: 'usr_parth',
      content: 'Welcome to OnlyUs private encrypted chat!',
      isRead: true,
      isStarred: true,
      createdAt: '12:45 PM',
    },
  },
  {
    id: 'chat_2',
    type: 'PRIVATE',
    participants: [
      {
        id: 'usr_alice',
        username: 'alice',
        displayName: 'Alice Engineer',
        email: 'alice@onlyus.private',
        role: 'USER',
        status: 'APPROVED',
        isOnline: true,
        createdAt: '2026-07-10',
      },
    ],
    unreadCount: 1,
    isPinned: false,
    isArchived: false,
    createdAt: '2026-07-24 11:30',
    lastMessage: {
      id: 'msg_201',
      chatId: 'chat_2',
      senderId: 'usr_alice',
      content: 'Are the E2EE keys initialized?',
      isRead: false,
      createdAt: '11:30 AM',
    },
  },
];

let MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  chat_1: [
    {
      id: 'msg_100',
      chatId: 'chat_1',
      senderId: 'usr_parth',
      content: 'Hello! This is a secure 1-to-1 conversation.',
      isRead: true,
      createdAt: '12:40 PM',
    },
    {
      id: 'msg_101',
      chatId: 'chat_1',
      senderId: 'usr_me',
      content: 'Welcome to OnlyUs private encrypted chat!',
      isRead: true,
      isStarred: true,
      createdAt: '12:45 PM',
    },
  ],
  chat_2: [
    {
      id: 'msg_201',
      chatId: 'chat_2',
      senderId: 'usr_alice',
      content: 'Are the E2EE keys initialized?',
      isRead: false,
      createdAt: '11:30 AM',
    },
  ],
};

export class ChatService {
  static getChats(filterArchived: boolean = false): Chat[] {
    return MOCK_CHATS.filter((c) => !!c.isArchived === filterArchived);
  }

  static getMessages(chatId: string): ChatMessage[] {
    return MOCK_MESSAGES[chatId] || [];
  }

  static sendMessage(chatId: string, content: string, replyToId?: string): ChatMessage {
    if (!content.trim()) throw new Error('Message content cannot be empty.');

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      chatId,
      senderId: 'usr_me',
      content: content.trim(),
      replyToId,
      isRead: true,
      isStarred: false,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (!MOCK_MESSAGES[chatId]) {
      MOCK_MESSAGES[chatId] = [];
    }
    MOCK_MESSAGES[chatId].push(newMsg);

    const chat = MOCK_CHATS.find((c) => c.id === chatId);
    if (chat) {
      chat.lastMessage = newMsg;
    }

    return newMsg;
  }

  static deleteMessage(chatId: string, messageId: string): boolean {
    if (MOCK_MESSAGES[chatId]) {
      MOCK_MESSAGES[chatId] = MOCK_MESSAGES[chatId].filter((m) => m.id !== messageId);
      return true;
    }
    return false;
  }

  static toggleStarMessage(chatId: string, messageId: string): boolean {
    const msg = (MOCK_MESSAGES[chatId] || []).find((m) => m.id === messageId);
    if (msg) {
      msg.isStarred = !msg.isStarred;
      return msg.isStarred;
    }
    return false;
  }

  static toggleArchiveChat(chatId: string): boolean {
    const chat = MOCK_CHATS.find((c) => c.id === chatId);
    if (chat) {
      chat.isArchived = !chat.isArchived;
      return chat.isArchived;
    }
    return false;
  }

  static togglePinChat(chatId: string): boolean {
    const chat = MOCK_CHATS.find((c) => c.id === chatId);
    if (chat) {
      chat.isPinned = !chat.isPinned;
      return chat.isPinned;
    }
    return false;
  }

  static searchMessages(chatId: string, query: string): ChatMessage[] {
    const q = query.toLowerCase();
    return (MOCK_MESSAGES[chatId] || []).filter((m) => m.content.toLowerCase().includes(q));
  }
}
