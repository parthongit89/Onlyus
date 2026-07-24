import { UserRole } from '../../shared/types';

export interface SecurityEvent {
  id: string;
  type: 'RBAC_VIOLATION' | 'RATE_LIMIT_EXCEEDED' | 'XSS_ATTEMPT' | 'INVALID_SESSION';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  details: string;
  ip: string;
  timestamp: string;
}

// Rate Limiting Bucket Store
const RATE_LIMIT_STORE: Record<string, { count: number; resetTime: number }> = {};

const SECURITY_EVENTS_DB: SecurityEvent[] = [
  {
    id: 'sec_1',
    type: 'RBAC_VIOLATION',
    severity: 'HIGH',
    details: 'User (usr_guest) attempted unauthorized access to /api/admin/delete-owner',
    ip: '192.168.1.45',
    timestamp: '2026-07-24 14:10:00',
  },
  {
    id: 'sec_2',
    type: 'RATE_LIMIT_EXCEEDED',
    severity: 'MEDIUM',
    details: 'IP 10.0.0.88 exceeded 100 requests/min threshold on /api/auth/otp',
    ip: '10.0.0.88',
    timestamp: '2026-07-24 15:22:00',
  },
];

export class SecurityService {
  // Input Sanitizer & XSS Prevention
  static sanitizeInput(input: string): string {
    if (!input) return '';
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // Rate Limiter Guard (100 reqs per 60 seconds)
  static checkRateLimit(ip: string = '127.0.0.1', maxRequests: number = 100): { isAllowed: boolean; remaining: number } {
    const now = Date.now();
    const windowMs = 60 * 1000;

    if (!RATE_LIMIT_STORE[ip] || now > RATE_LIMIT_STORE[ip].resetTime) {
      RATE_LIMIT_STORE[ip] = { count: 1, resetTime: now + windowMs };
      return { isAllowed: true, remaining: maxRequests - 1 };
    }

    RATE_LIMIT_STORE[ip].count += 1;
    if (RATE_LIMIT_STORE[ip].count > maxRequests) {
      this.recordSecurityEvent('RATE_LIMIT_EXCEEDED', 'MEDIUM', `IP ${ip} exceeded rate limit of ${maxRequests} requests/min`, ip);
      return { isAllowed: false, remaining: 0 };
    }

    return { isAllowed: true, remaining: maxRequests - RATE_LIMIT_STORE[ip].count };
  }

  // Role-Based Access Control (RBAC) Guard
  static enforceRbac(userRole: UserRole, requiredRole: UserRole): boolean {
    const hierarchy: Record<UserRole, number> = {
      USER: 1,
      ADMIN: 2,
      OWNER: 3,
    };

    if (hierarchy[userRole] < hierarchy[requiredRole]) {
      this.recordSecurityEvent('RBAC_VIOLATION', 'HIGH', `Role ${userRole} attempted access requiring ${requiredRole}`, '127.0.0.1');
      return false;
    }
    return true;
  }

  // Security Logger
  static recordSecurityEvent(
    type: SecurityEvent['type'],
    severity: SecurityEvent['severity'],
    details: string,
    ip: string = '127.0.0.1'
  ): SecurityEvent {
    const event: SecurityEvent = {
      id: `sec_${Date.now()}`,
      type,
      severity,
      details,
      ip,
      timestamp: new Date().toLocaleString(),
    };
    SECURITY_EVENTS_DB.unshift(event);
    return event;
  }

  static getSecurityEvents(): SecurityEvent[] {
    return [...SECURITY_EVENTS_DB];
  }
}
