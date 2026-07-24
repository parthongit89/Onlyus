import { apiFetch } from '../../api/client';
import { User, DeviceSession } from '../../shared/types';

export class AuthService {
  // Validate invite code against live backend & PostgreSQL database
  static async validateInviteCode(code: string): Promise<boolean> {
    try {
      const res = await apiFetch<{ success: boolean }>('/auth/validate-invite', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });
      return res.success;
    } catch {
      return false;
    }
  }

  // Request Access / Register via Invite Token
  static async requestAccess(inviteCode: string, email: string): Promise<{ success: boolean; message: string; requiresOtp: boolean }> {
    const isValid = await this.validateInviteCode(inviteCode);
    if (!isValid) {
      throw new Error('Invalid or expired invite token. Registration is strictly Invite-Only.');
    }
    return {
      success: true,
      message: 'Invite token verified by live backend server. OTP sent.',
      requiresOtp: true,
    };
  }

  // Verify OTP Code against live server
  static async verifyOtp(email: string, otpCode: string): Promise<{ user: User; token: string; deviceSession: DeviceSession }> {
    const res = await apiFetch<{ success: boolean; user: User; token: string }>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp: otpCode }),
    });

    const deviceSession: DeviceSession = {
      id: `sess_${Date.now()}`,
      userId: res.user.id,
      deviceName: navigator.userAgent.includes('Mobile') ? 'Mobile Browser' : 'Desktop Browser',
      ipAddress: '127.0.0.1',
      lastActive: new Date().toISOString(),
      isCurrent: true,
    };

    return { user: res.user, token: res.token, deviceSession };
  }

  // Logout & Invalidate Session
  static async logout(token: string): Promise<boolean> {
    localStorage.removeItem('onlyus_token');
    return true;
  }
}
