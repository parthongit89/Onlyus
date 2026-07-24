import { User, DeviceSession, InviteToken } from '../../shared/types';

// Mock storage for Phase 2 Authentication state
const MOCK_INVITES: InviteToken[] = [
  { code: 'ONLYUS-INVITE-2026', createdBy: 'usr_owner', isUsed: false, expiresAt: '2026-12-31' },
  { code: 'ONLYUS-VIP-FAMILY', createdBy: 'usr_owner', isUsed: false, expiresAt: '2026-12-31' },
];

const MOCK_USERS: User[] = [
  {
    id: 'usr_owner',
    username: 'parth',
    displayName: 'Parth Sonavane',
    email: 'parth@onlyus.private',
    role: 'OWNER',
    status: 'APPROVED',
    isOnline: true,
    createdAt: '2026-07-01',
  },
  {
    id: 'usr_pending_1',
    username: 'new_member',
    displayName: 'New Member',
    email: 'guest@onlyus.private',
    role: 'USER',
    status: 'PENDING',
    isOnline: false,
    createdAt: '2026-07-24',
  },
];

export class AuthService {
  // Validate invite code (Invite-Only Registration rule)
  static validateInviteCode(code: string): boolean {
    const invite = MOCK_INVITES.find((i) => i.code === code.trim() && !i.isUsed);
    return !!invite;
  }

  // Request Access / Register via Invite Token
  static async requestAccess(inviteCode: string, email: string): Promise<{ success: boolean; message: string; requiresOtp: boolean }> {
    if (!this.validateInviteCode(inviteCode)) {
      throw new Error('Invalid or expired invite token. Registration is strictly Invite-Only.');
    }

    return {
      success: true,
      message: 'Invite token verified. OTP sent to your email address.',
      requiresOtp: true,
    };
  }

  // Verify OTP Code (4-digit code)
  static async verifyOtp(email: string, otpCode: string): Promise<{ user: User; token: string; deviceSession: DeviceSession }> {
    if (otpCode.length !== 4 || !/^\d+$/.test(otpCode)) {
      throw new Error('Invalid OTP format. Please enter a 4-digit numeric code.');
    }

    // Existing or pending user lookup
    let user = MOCK_USERS.find((u) => u.email === email);
    if (!user) {
      // Create new pending account
      user = {
        id: `usr_${Date.now()}`,
        username: email.split('@')[0],
        displayName: email.split('@')[0],
        email: email,
        role: 'USER',
        status: 'PENDING', // Every new user starts as PENDING until Admin/Owner approves
        isOnline: false,
        createdAt: new Date().toISOString(),
      };
      MOCK_USERS.push(user);
    }

    const token = `jwt_session_${user.id}_${Date.now()}`;

    const deviceSession: DeviceSession = {
      id: `sess_${Date.now()}`,
      userId: user.id,
      deviceName: navigator.userAgent.includes('Mobile') ? 'Mobile Browser' : 'Desktop Browser',
      ipAddress: '127.0.0.1',
      lastActive: new Date().toISOString(),
      isCurrent: true,
    };

    return { user, token, deviceSession };
  }

  // Standard Login
  static async login(email: string, pass: string): Promise<{ user: User; token: string }> {
    const user = MOCK_USERS.find((u) => u.email === email || u.username === email);
    if (!user) {
      throw new Error('Account not found. Registration is Invite-Only.');
    }

    if (user.status === 'REJECTED') {
      throw new Error('Your account access request was rejected by the administrator.');
    }

    if (user.status === 'SUSPENDED') {
      throw new Error('Your account has been suspended.');
    }

    const token = `jwt_session_${user.id}_${Date.now()}`;
    return { user, token };
  }

  // Logout & Invalidate Session
  static async logout(token: string): Promise<boolean> {
    localStorage.removeItem('onlyus_token');
    return true;
  }
}
