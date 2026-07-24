import { User, InviteToken, AuditLog } from '../../shared/types';

// Mock DB store for Admin Approval System
let USERS_DB: User[] = [
  {
    id: 'usr_owner',
    username: 'parth',
    displayName: 'Parth Sonavane',
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
  {
    id: 'usr_p2',
    username: 'priya_k',
    displayName: 'Priya Kapoor',
    email: 'priya@example.com',
    role: 'USER',
    status: 'PENDING',
    isOnline: false,
    createdAt: '2026-07-24 19:45:00',
  },
  {
    id: 'usr_rej1',
    username: 'spammer99',
    displayName: 'Unknown User',
    email: 'spam@untrusted.com',
    role: 'USER',
    status: 'REJECTED',
    isOnline: false,
    createdAt: '2026-07-22 09:12:00',
  },
];

let INVITES_DB: InviteToken[] = [
  { code: 'ONLYUS-INVITE-2026', createdBy: 'usr_owner', isUsed: false, expiresAt: '2026-12-31', createdAt: '2026-07-01' },
  { code: 'ONLYUS-VIP-FAMILY', createdBy: 'usr_owner', isUsed: false, expiresAt: '2026-12-31', createdAt: '2026-07-01' },
  { code: 'ONLYUS-SECRET-77', createdBy: 'usr_admin1', isUsed: true, usedBy: 'usr_p1', expiresAt: '2026-08-01', createdAt: '2026-07-20' },
];

let AUDIT_LOGS_DB: AuditLog[] = [
  {
    id: 'log_1',
    action: 'REGISTRATION',
    performedBy: 'usr_p1',
    details: 'User requested access via token ONLYUS-SECRET-77',
    timestamp: '2026-07-24 18:20:00',
  },
  {
    id: 'log_2',
    action: 'REGISTRATION',
    performedBy: 'usr_p2',
    details: 'User requested access via token ONLYUS-INVITE-2026',
    timestamp: '2026-07-24 19:45:00',
  },
];

export class AdminService {
  // Fetch users by status filter
  static getUsers(statusFilter?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED' | 'ALL'): User[] {
    if (!statusFilter || statusFilter === 'ALL') {
      return [...USERS_DB];
    }
    return USERS_DB.filter((u) => u.status === statusFilter);
  }

  // Approve User Registration
  static approveUser(userId: string, adminId: string = 'usr_owner'): User {
    const user = USERS_DB.find((u) => u.id === userId);
    if (!user) throw new Error('User not found.');

    user.status = 'APPROVED';

    // Record audit log
    AUDIT_LOGS_DB.unshift({
      id: `log_${Date.now()}`,
      action: 'ACCOUNT_APPROVED',
      performedBy: adminId,
      targetUser: userId,
      details: `Approved registration for ${user.displayName} (${user.email})`,
      timestamp: new Date().toLocaleString(),
    });

    return { ...user };
  }

  // Reject User Registration
  static rejectUser(userId: string, adminId: string = 'usr_owner'): User {
    const user = USERS_DB.find((u) => u.id === userId);
    if (!user) throw new Error('User not found.');

    user.status = 'REJECTED';

    AUDIT_LOGS_DB.unshift({
      id: `log_${Date.now()}`,
      action: 'ACCOUNT_REJECTED',
      performedBy: adminId,
      targetUser: userId,
      details: `Rejected registration for ${user.displayName} (${user.email})`,
      timestamp: new Date().toLocaleString(),
    });

    return { ...user };
  }

  // Suspend Active User
  static suspendUser(userId: string, adminId: string = 'usr_owner'): User {
    const user = USERS_DB.find((u) => u.id === userId);
    if (!user) throw new Error('User not found.');
    if (user.role === 'OWNER') {
      throw new Error('Admin Rule Violation: Owner account cannot be suspended.');
    }

    user.status = 'SUSPENDED';

    AUDIT_LOGS_DB.unshift({
      id: `log_${Date.now()}`,
      action: 'USER_SUSPENDED',
      performedBy: adminId,
      targetUser: userId,
      details: `Suspended account access for ${user.displayName}`,
      timestamp: new Date().toLocaleString(),
    });

    return { ...user };
  }

  // Delete User (Safeguard: Cannot delete Owner)
  static deleteUser(userId: string, adminId: string = 'usr_owner'): boolean {
    const userIndex = USERS_DB.findIndex((u) => u.id === userId);
    if (userIndex === -1) throw new Error('User not found.');

    const targetUser = USERS_DB[userIndex];
    if (targetUser.role === 'OWNER') {
      throw new Error('Admin Rule Violation: Owner account cannot be deleted.');
    }

    USERS_DB.splice(userIndex, 1);

    AUDIT_LOGS_DB.unshift({
      id: `log_${Date.now()}`,
      action: 'SECURITY_EVENT',
      performedBy: adminId,
      details: `Deleted user account ${targetUser.email}`,
      timestamp: new Date().toLocaleString(),
    });

    return true;
  }

  // Search users by keyword
  static searchUsers(query: string): User[] {
    const q = query.toLowerCase();
    return USERS_DB.filter(
      (u) =>
        u.displayName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q)
    );
  }

  // Invitation Management: Generate new token
  static generateInviteToken(createdBy: string = 'usr_owner'): InviteToken {
    const tokenStr = `ONLYUS-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`;
    const newInvite: InviteToken = {
      code: tokenStr,
      createdBy,
      isUsed: false,
      expiresAt: '2026-12-31',
      createdAt: new Date().toLocaleDateString(),
    };
    INVITES_DB.unshift(newInvite);
    return newInvite;
  }

  // Get active invitation tokens
  static getInvitations(): InviteToken[] {
    return [...INVITES_DB];
  }

  // Get system audit logs
  static getAuditLogs(): AuditLog[] {
    return [...AUDIT_LOGS_DB];
  }
}
