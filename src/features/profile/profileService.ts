import { User } from '../../shared/types';

export interface UserProfileData {
  displayName: string;
  username: string;
  bio: string;
  avatarUrl?: string;
  privacy: {
    showOnlineStatus: boolean;
    showLastSeen: boolean;
    enableReadReceipts: boolean;
  };
}

let MOCK_PROFILE: UserProfileData = {
  displayName: 'Parth Sonavane',
  username: 'parth',
  bio: 'OnlyUs Owner & Maintainer. Building private secure communication.',
  avatarUrl: '',
  privacy: {
    showOnlineStatus: true,
    showLastSeen: true,
    enableReadReceipts: true,
  },
};

export class ProfileService {
  static getProfile(): UserProfileData {
    return { ...MOCK_PROFILE };
  }

  static updateProfile(updated: Partial<UserProfileData>): UserProfileData {
    MOCK_PROFILE = {
      ...MOCK_PROFILE,
      ...updated,
      privacy: {
        ...MOCK_PROFILE.privacy,
        ...(updated.privacy || {}),
      },
    };
    return { ...MOCK_PROFILE };
  }

  static changePassword(currentPass: string, newPass: string): boolean {
    if (!newPass || newPass.length < 6) {
      throw new Error('New password must be at least 6 characters long.');
    }
    return true;
  }
}
