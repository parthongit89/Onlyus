export const APP_NAME = 'OnlyUs';

export const USER_ROLES = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export const USER_STATUSES = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  SUSPENDED: 'SUSPENDED',
} as const;

export const API_BASE_URL = '/api';
