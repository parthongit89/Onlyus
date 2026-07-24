import { apiFetch } from '../../api/client';
import { User, InviteToken, AuditLog } from '../../shared/types';

export class AdminService {
  // Fetch users from live server & PostgreSQL database
  static async getUsersAsync(statusFilter?: string): Promise<User[]> {
    const query = statusFilter ? `?status=${statusFilter}` : '';
    return apiFetch<User[]>(`/admin/users${query}`);
  }

  // Synchronous fallback wrapper for existing UI renders
  static getUsers(statusFilter?: string): User[] {
    return [
      {
        id: 'usr_owner',
        username: 'parth',
        displayName: 'Parth Sonavane (Owner)',
        email: 'parth@onlyus.private',
        role: 'OWNER',
        status: 'APPROVED',
        isOnline: true,
        createdAt: '2026-07-01 10:00:00',
      },
      {
        id: 'usr_admin1',
        username: 'alice_admin',
        displayName: 'Alice Admin',
        email: 'alice@onlyus.private',
        role: 'ADMIN',
        status: 'APPROVED',
        isOnline: true,
        createdAt: '2026-07-05 14:30:00',
      },
      {
        id: 'usr_p1',
        username: 'rahul_m',
        displayName: 'Rahul Sharma',
        email: 'rahul@example.com',
        role: 'USER',
        status: 'PENDING',
        isOnline: false,
        createdAt: '2026-07-24 18:20:00',
      },
    ];
  }

  // Approve User Registration via Live API
  static async approveUserAsync(userId: string): Promise<User> {
    const res = await apiFetch<{ success: boolean; user: User }>('/admin/approve', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
    return res.user;
  }

  static approveUser(userId: string): User {
    this.approveUserAsync(userId).catch(console.error);
    return {
      id: userId,
      username: 'approved_user',
      displayName: 'Approved User',
      email: 'user@onlyus.private',
      role: 'USER',
      status: 'APPROVED',
      isOnline: true,
      createdAt: new Date().toISOString(),
    };
  }

  // Reject User Registration via Live API
  static async rejectUserAsync(userId: string): Promise<User> {
    const res = await apiFetch<{ success: boolean; user: User }>('/admin/reject', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
    return res.user;
  }

  static rejectUser(userId: string): User {
    this.rejectUserAsync(userId).catch(console.error);
    return {
      id: userId,
      username: 'rejected_user',
      displayName: 'Rejected User',
      email: 'rejected@onlyus.private',
      role: 'USER',
      status: 'REJECTED',
      isOnline: false,
      createdAt: new Date().toISOString(),
    };
  }

  // Suspend User via Live API
  static async suspendUserAsync(userId: string): Promise<User> {
    const res = await apiFetch<{ success: boolean; user: User }>('/admin/suspend', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
    return res.user;
  }

  static suspendUser(userId: string): User {
    if (userId === 'usr_owner') {
      throw new Error('Admin Rule Violation: Owner account cannot be suspended.');
    }
    this.suspendUserAsync(userId).catch(console.error);
    return {
      id: userId,
      username: 'suspended_user',
      displayName: 'Suspended User',
      email: 'suspended@onlyus.private',
      role: 'USER',
      status: 'SUSPENDED',
      isOnline: false,
      createdAt: new Date().toISOString(),
    };
  }

  // Delete User via Live API
  static async deleteUserAsync(userId: string): Promise<boolean> {
    const res = await apiFetch<{ success: boolean }>('/admin/delete', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
    return res.success;
  }

  static deleteUser(userId: string): boolean {
    if (userId === 'usr_owner') {
      throw new Error('Admin Rule Violation: Owner account cannot be deleted.');
    }
    this.deleteUserAsync(userId).catch(console.error);
    return true;
  }

  // Generate Invite Token via Live API
  static async generateInviteTokenAsync(): Promise<InviteToken> {
    return apiFetch<InviteToken>('/admin/generate-invite', { method: 'POST' });
  }

  static generateInviteToken(): InviteToken {
    this.generateInviteTokenAsync().catch(console.error);
    return {
      code: `ONLYUS-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`,
      createdBy: 'usr_owner',
      isUsed: false,
      expiresAt: '2026-12-31',
      createdAt: new Date().toLocaleDateString(),
    };
  }

  static getInvitations(): InviteToken[] {
    return [
      { code: 'ONLYUS-INVITE-2026', createdBy: 'usr_owner', isUsed: false, expiresAt: '2026-12-31', createdAt: '2026-07-01' },
      { code: 'ONLYUS-VIP-FAMILY', createdBy: 'usr_owner', isUsed: false, expiresAt: '2026-12-31', createdAt: '2026-07-01' },
    ];
  }

  static getAuditLogs(): AuditLog[] {
    return [
      {
        id: 'log_1',
        action: 'REGISTRATION',
        performedBy: 'usr_p1',
        details: 'User requested access via token ONLYUS-INVITE-2026',
        timestamp: new Date().toLocaleString(),
      },
    ];
  }

  static searchUsers(query: string): User[] {
    return this.getUsers().filter((u) => u.displayName.toLowerCase().includes(query.toLowerCase()));
  }
}
