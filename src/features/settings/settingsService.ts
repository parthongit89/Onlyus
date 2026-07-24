export type ThemeMode = 'DARK' | 'LIGHT' | 'PEACH_GLOW';
export type AppLanguage = 'en' | 'hi' | 'es' | 'fr';

export interface UserAppSettings {
  theme: ThemeMode;
  language: AppLanguage;
  notifications: {
    pushEnabled: boolean;
    soundEnabled: boolean;
    groupAlerts: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    showLastSeen: boolean;
    enableReadReceipts: boolean;
  };
  backup: {
    autoBackup: boolean;
    lastBackupDate?: string;
    backupFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  };
}

let MOCK_SETTINGS: UserAppSettings = {
  theme: 'DARK',
  language: 'en',
  notifications: {
    pushEnabled: true,
    soundEnabled: true,
    groupAlerts: true,
  },
  privacy: {
    showOnlineStatus: true,
    showLastSeen: true,
    enableReadReceipts: true,
  },
  backup: {
    autoBackup: true,
    lastBackupDate: '2026-07-24 03:00',
    backupFrequency: 'DAILY',
  },
};

export class SettingsService {
  static getSettings(): UserAppSettings {
    return { ...MOCK_SETTINGS };
  }

  static updateSettings(updated: Partial<UserAppSettings>): UserAppSettings {
    MOCK_SETTINGS = {
      ...MOCK_SETTINGS,
      ...updated,
      notifications: { ...MOCK_SETTINGS.notifications, ...(updated.notifications || {}) },
      privacy: { ...MOCK_SETTINGS.privacy, ...(updated.privacy || {}) },
      backup: { ...MOCK_SETTINGS.backup, ...(updated.backup || {}) },
    };
    return { ...MOCK_SETTINGS };
  }

  static createBackup(): string {
    const backupDate = new Date().toLocaleString();
    MOCK_SETTINGS.backup.lastBackupDate = backupDate;
    return backupDate;
  }

  static deleteOwnAccount(confirmationText: string): boolean {
    if (confirmationText !== 'DELETE') {
      throw new Error('Please type DELETE to confirm account deletion.');
    }
    localStorage.removeItem('onlyus_token');
    return true;
  }
}
