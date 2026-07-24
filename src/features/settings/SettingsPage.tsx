import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { SettingsService, UserAppSettings, ThemeMode, AppLanguage } from './settingsService';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<UserAppSettings>(SettingsService.getSettings());
  const [notification, setNotification] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleThemeChange = (theme: ThemeMode) => {
    const updated = SettingsService.updateSettings({ theme });
    setSettings(updated);
    showNotify(`Theme changed to ${theme}`);
  };

  const handleLanguageChange = (language: AppLanguage) => {
    const updated = SettingsService.updateSettings({ language });
    setSettings(updated);
    showNotify(`Language changed to ${language.toUpperCase()}`);
  };

  const handleCreateBackup = () => {
    const backupTime = SettingsService.createBackup();
    setSettings(SettingsService.getSettings());
    showNotify(`Backup created at ${backupTime}`);
  };

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError(null);
    try {
      SettingsService.deleteOwnAccount(deleteConfirmInput);
      navigate('/');
    } catch (err: any) {
      setDeleteError(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f12', color: '#f5f6f8', padding: '32px 24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Application Settings</h1>
            <p style={{ fontSize: '0.88rem', color: '#9da4b0', marginTop: '4px' }}>
              Theme customization, language, backup, and account management
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/chats')}>
            ← Back to Chats
          </Button>
        </div>

        {notification && (
          <div style={{ backgroundColor: '#22c55e', color: '#ffffff', padding: '12px 20px', borderRadius: '12px', marginBottom: '24px', fontWeight: 500 }}>
            ✓ {notification}
          </div>
        )}

        {/* Theme Settings */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '16px' }}>Theme Customization</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <Button
              variant={settings.theme === 'DARK' ? 'primary' : 'outline'}
              onClick={() => handleThemeChange('DARK')}
            >
              🌙 Dark Mode
            </Button>
            <Button
              variant={settings.theme === 'PEACH_GLOW' ? 'primary' : 'outline'}
              onClick={() => handleThemeChange('PEACH_GLOW')}
            >
              🍑 Warm Peach
            </Button>
            <Button
              variant={settings.theme === 'LIGHT' ? 'primary' : 'outline'}
              onClick={() => handleThemeChange('LIGHT')}
            >
              ☀️ Light Theme
            </Button>
          </div>
        </div>

        {/* Language Preferences */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '16px' }}>Language & Region</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'Hindi (हिंदी)' },
              { code: 'es', label: 'Spanish' },
              { code: 'fr', label: 'French' },
            ].map((lang) => (
              <Button
                key={lang.code}
                size="sm"
                variant={settings.language === lang.code ? 'primary' : 'outline'}
                onClick={() => handleLanguageChange(lang.code as AppLanguage)}
              >
                {lang.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Backup & Restore */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '12px' }}>Backup & Restore</h3>
          <p style={{ fontSize: '0.85rem', color: '#9da4b0', marginBottom: '16px' }}>
            Last backup date: <strong style={{ color: '#22c55e' }}>{settings.backup.lastBackupDate || 'Never'}</strong>
          </p>
          <Button variant="secondary" onClick={handleCreateBackup}>
            💾 Create Encrypted Backup Now
          </Button>
        </div>

        {/* Account Deletion Area */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#ef4444', marginBottom: '8px' }}>Danger Zone</h3>
          <p style={{ fontSize: '0.85rem', color: '#9da4b0', marginBottom: '16px' }}>
            Permanently delete your account, private messages, and contacts.
          </p>
          <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
            Delete Account
          </Button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', width: '100%', maxWidth: '420px', border: '1px solid rgba(239,68,68,0.4)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ef4444', marginBottom: '12px' }}>Confirm Account Deletion</h3>
            <p style={{ fontSize: '0.86rem', color: '#9da4b0', marginBottom: '16px', lineHeight: 1.4 }}>
              This action cannot be undone. Type <strong style={{ color: '#ffffff' }}>DELETE</strong> below to confirm.
            </p>

            {deleteError && (
              <div style={{ backgroundColor: 'rgba(239,68,68,0.15)', color: '#ef4444', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '12px' }}>
                {deleteError}
              </div>
            )}

            <form onSubmit={handleDeleteAccount} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Input
                placeholder='Type "DELETE"'
                value={deleteConfirmInput}
                onChange={(e) => setDeleteConfirmInput(e.target.value)}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button fullWidth variant="danger" type="submit">Permanently Delete</Button>
                <Button fullWidth variant="outline" type="button" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
