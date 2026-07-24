export type NotificationCategory =
  | 'NEW_MESSAGE'
  | 'GROUP_INVITATION'
  | 'ACCOUNT_APPROVED'
  | 'ACCOUNT_REJECTED'
  | 'ADMIN_ANNOUNCEMENT'
  | 'SYSTEM_UPDATE';

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  isRead: boolean;
  timestamp: string;
}

let MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    category: 'ACCOUNT_APPROVED',
    title: 'Account Approved! 🎉',
    body: 'Your OnlyUs account access request has been approved by the administrator.',
    isRead: false,
    timestamp: '10 min ago',
  },
  {
    id: 'notif_2',
    category: 'NEW_MESSAGE',
    title: 'New Encrypted Message',
    body: 'Parth Sonavane: Welcome to OnlyUs private messenger!',
    isRead: false,
    timestamp: '25 min ago',
  },
  {
    id: 'notif_3',
    category: 'ADMIN_ANNOUNCEMENT',
    title: 'System Announcement',
    body: 'OnlyUs Signal E2EE Protocol upgraded to v2.4.',
    isRead: true,
    timestamp: '2 hours ago',
  },
];

let IS_SILENT_MODE = false;

export class NotificationService {
  static getNotifications(): AppNotification[] {
    return [...MOCK_NOTIFICATIONS];
  }

  static isSilentMode(): boolean {
    return IS_SILENT_MODE;
  }

  static toggleSilentMode(): boolean {
    IS_SILENT_MODE = !IS_SILENT_MODE;
    return IS_SILENT_MODE;
  }

  static markAsRead(id: string): void {
    const n = MOCK_NOTIFICATIONS.find((item) => item.id === id);
    if (n) {
      n.isRead = true;
    }
  }

  static markAllAsRead(): void {
    MOCK_NOTIFICATIONS.forEach((n) => (n.isRead = true));
  }

  static sendPushNotification(category: NotificationCategory, title: string, body: string): AppNotification | null {
    if (IS_SILENT_MODE) {
      console.log('Silent Mode Enabled: Notification suppressed from sound/popups.');
    }

    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      category,
      title,
      body,
      isRead: false,
      timestamp: 'Just now',
    };

    MOCK_NOTIFICATIONS.unshift(newNotif);
    return newNotif;
  }
}
