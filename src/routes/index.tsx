import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingPage } from '../features/onboarding/OnboardingPage';
import { LoginPage } from '../features/auth/LoginPage';
import { OtpPage } from '../features/auth/OtpPage';
import { PasswordResetPage } from '../features/auth/PasswordResetPage';
import { ChatListPage } from '../features/chats/ChatListPage';
import { AdminDashboardPage } from '../features/admin/AdminDashboardPage';
import { SettingsPage } from '../features/settings/SettingsPage';
import { ProfilePage } from '../features/profile/ProfilePage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<OnboardingPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/otp" element={<OtpPage />} />
      <Route path="/auth/reset-password" element={<PasswordResetPage />} />
      <Route path="/chats" element={<ChatListPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
