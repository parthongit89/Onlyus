import { apiFetch } from '../../api/client';
import { Chat, ChatMessage } from '../../shared/types';

export class ChatService {
  static getChats(filterArchived: boolean = false): Chat[] {
    return [
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
          content: 'Welcome to OnlyUs live PostgreSQL backend server!',
          isRead: true,
          isStarred: true,
          createdAt: '12:45 PM',
        },
      },
    ];
  }

  static getMessages(chatId: string): ChatMessage[] {
    return [
      {
        id: 'msg_101',
        chatId: chatId,
        senderId: 'usr_me',
        content: 'Welcome to OnlyUs live PostgreSQL backend server!',
        isRead: true,
        isStarred: true,
        createdAt: '12:45 PM',
      },
    ];
  }

  static async sendMessageAsync(chatId: string, content: string, replyToId?: string): Promise<ChatMessage> {
    return apiFetch<ChatMessage>(`/chats/${chatId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content, replyToId }),
    });
  }

  static sendMessage(chatId: string, content: string, replyToId?: string): ChatMessage {
    if (!content.trim()) throw new Error('Message content cannot be empty.');
    this.sendMessageAsync(chatId, content, replyToId).catch(console.error);

    return {
      id: `msg_${Date.now()}`,
      chatId,
      senderId: 'usr_me',
      content: content.trim(),
      replyToId,
      isRead: true,
      isStarred: false,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  static deleteMessage(chatId: string, messageId: string): boolean {
    return true;
  }

  static toggleStarMessage(chatId: string, messageId: string): boolean {
    return true;
  }

  static toggleArchiveChat(chatId: string): boolean {
    return true;
  }

  static togglePinChat(chatId: string): boolean {
    return true;
  }

  static searchMessages(chatId: string, query: string): ChatMessage[] {
    return this.getMessages(chatId).filter((m) => m.content.toLowerCase().includes(query.toLowerCase()));
  }
}
