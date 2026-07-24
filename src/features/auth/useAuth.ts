import { useState, useCallback } from 'react';
import { User, DeviceSession } from '../../shared/types';
import { AuthService } from './authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('onlyus_token'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<DeviceSession[]>([]);

  const requestAccess = useCallback(async (inviteCode: string, email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await AuthService.requestAccess(inviteCode, email);
      setIsLoading(false);
      return res;
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Access request failed.');
      throw err;
    }
  }, []);

  const verifyOtp = useCallback(async (email: string, otpCode: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, token, deviceSession } = await AuthService.verifyOtp(email, otpCode);
      setUser(user);
      setToken(token);
      setSessions([deviceSession]);
      localStorage.setItem('onlyus_token', token);
      setIsLoading(false);
      return { user, token };
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'OTP verification failed.');
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      await AuthService.logout(token);
    }
    setUser(null);
    setToken(null);
    setSessions([]);
  }, [token]);

  return {
    user,
    token,
    isLoading,
    error,
    sessions,
    requestAccess,
    verifyOtp,
    logout,
    isAuthenticated: !!user && user.status === 'APPROVED',
    isPendingApproval: !!user && user.status === 'PENDING',
  };
}
