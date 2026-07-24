import { User, UserRole } from '../../shared/types';

export interface ServerHealth {
  status: 'HEALTHY' | 'DEGRADED' | 'MAINTENANCE';
  cpuUsagePercent: number;
  memoryUsageMb: number;
  dbConnectionPool: string;
  storageUsedGb: number;
  uptimeHours: number;
}

export interface GlobalServerConfig {
  maintenanceMode: boolean;
  requireAdminApproval: boolean;
  maxUploadSizeMb: number;
  allowNewInvitations: boolean;
}

let MOCK_SERVER_HEALTH: ServerHealth = {
  status: 'HEALTHY',
  cpuUsagePercent: 14.2,
  memoryUsageMb: 512,
  dbConnectionPool: '15 / 50 Connections Active',
  storageUsedGb: 1.25,
  uptimeHours: 342,
};

let MOCK_GLOBAL_CONFIG: GlobalServerConfig = {
  maintenanceMode: false,
  requireAdminApproval: true,
  maxUploadSizeMb: 25,
  allowNewInvitations: true,
};

let MOCK_ADMINS: User[] = [
  {
    id: 'usr_admin1',
    username: 'alice_admin',
    displayName: 'Alice Admin',
    email: 'alice@onlyus.private',
    role: 'ADMIN',
    status: 'APPROVED',
    isOnline: true,
    createdAt: '2026-07-05',
  },
  {
    id: 'usr_admin2',
    username: 'bob_mod',
    displayName: 'Bob Moderator',
    email: 'bob.mod@onlyus.private',
    role: 'ADMIN',
    status: 'APPROVED',
    isOnline: false,
    createdAt: '2026-07-12',
  },
];

export class OwnerService {
  static getServerHealth(): ServerHealth {
    return { ...MOCK_SERVER_HEALTH };
  }

  static getGlobalConfig(): GlobalServerConfig {
    return { ...MOCK_GLOBAL_CONFIG };
  }

  static updateGlobalConfig(updated: Partial<GlobalServerConfig>): GlobalServerConfig {
    MOCK_GLOBAL_CONFIG = { ...MOCK_GLOBAL_CONFIG, ...updated };
    if (MOCK_GLOBAL_CONFIG.maintenanceMode) {
      MOCK_SERVER_HEALTH.status = 'MAINTENANCE';
    } else {
      MOCK_SERVER_HEALTH.status = 'HEALTHY';
    }
    return { ...MOCK_GLOBAL_CONFIG };
  }

  static getAdmins(): User[] {
    return [...MOCK_ADMINS];
  }

  static addAdmin(email: string): User {
    if (!email.trim()) throw new Error('Email is required to grant Admin privileges.');

    const newAdmin: User = {
      id: `usr_adm_${Date.now()}`,
      username: email.split('@')[0],
      displayName: email.split('@')[0],
      email: email.trim(),
      role: 'ADMIN',
      status: 'APPROVED',
      isOnline: true,
      createdAt: new Date().toISOString(),
    };

    MOCK_ADMINS.push(newAdmin);
    return newAdmin;
  }

  static removeAdmin(adminId: string): boolean {
    const idx = MOCK_ADMINS.findIndex((a) => a.id === adminId);
    if (idx === -1) throw new Error('Admin not found.');

    MOCK_ADMINS.splice(idx, 1);
    return true;
  }

  static disableAdmin(adminId: string): User {
    const admin = MOCK_ADMINS.find((a) => a.id === adminId);
    if (!admin) throw new Error('Admin not found.');

    admin.status = 'SUSPENDED';
    return { ...admin };
  }
}
