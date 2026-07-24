import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Avatar } from '../../shared/components/Avatar';
import { ProfileService, UserProfileData } from './profileService';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileData>(ProfileService.getProfile());
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = ProfileService.updateProfile(profile);
    setProfile(updated);
    showNotify('Profile information updated successfully!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    try {
      ProfileService.changePassword(currentPass, newPass);
      setCurrentPass('');
      setNewPass('');
      showNotify('Password updated successfully!');
    } catch (err: any) {
      setPassError(err.message || 'Password change failed.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f12', color: '#f5f6f8', padding: '32px 24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Profile & Account Settings</h1>
            <p style={{ fontSize: '0.88rem', color: '#9da4b0', marginTop: '4px' }}>
              Manage display info, bio, privacy controls, and security
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

        {/* Profile Card */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
            <Avatar name={profile.displayName} size="lg" isOnline={true} />
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{profile.displayName}</h3>
              <p style={{ fontSize: '0.85rem', color: '#f07b42', fontWeight: 500 }}>@{profile.username}</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <Input
              label="Display Name"
              value={profile.displayName}
              onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
            />
            <Input
              label="Username"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
            <Input
              label="Bio / About"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />

            {/* Privacy Controls */}
            <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '20px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '14px', color: '#f07b42' }}>Privacy Settings</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.9rem', color: '#9da4b0' }}>
                  <input
                    type="checkbox"
                    checked={profile.privacy.showOnlineStatus}
                    onChange={(e) => setProfile({ ...profile, privacy: { ...profile.privacy, showOnlineStatus: e.target.checked } })}
                    style={{ width: '18px', height: '18px', accentColor: '#f07b42' }}
                  />
                  Show Online Status to Contacts
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.9rem', color: '#9da4b0' }}>
                  <input
                    type="checkbox"
                    checked={profile.privacy.showLastSeen}
                    onChange={(e) => setProfile({ ...profile, privacy: { ...profile.privacy, showLastSeen: e.target.checked } })}
                    style={{ width: '18px', height: '18px', accentColor: '#f07b42' }}
                  />
                  Show Last Seen Timestamp
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.9rem', color: '#9da4b0' }}>
                  <input
                    type="checkbox"
                    checked={profile.privacy.enableReadReceipts}
                    onChange={(e) => setProfile({ ...profile, privacy: { ...profile.privacy, enableReadReceipts: e.target.checked } })}
                    style={{ width: '18px', height: '18px', accentColor: '#f07b42' }}
                  />
                  Send Read Receipts
                </label>
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <Button fullWidth type="submit" size="lg">Save Profile Settings</Button>
            </div>
          </form>
        </div>

        {/* Change Password Card */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>Security & Password</h3>

          {passError && (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', padding: '10px 14px', borderRadius: '10px', fontSize: '0.84rem', marginBottom: '16px' }}>
              {passError}
            </div>
          )}

          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="At least 6 characters"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <Button fullWidth variant="secondary" type="submit">Update Password</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
