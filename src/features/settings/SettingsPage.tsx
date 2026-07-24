import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Avatar } from '../../shared/components/Avatar';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f12', color: '#f5f6f8', padding: '32px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Account & Privacy Settings</h1>
          <Button variant="outline" onClick={() => navigate('/chats')}>
            Back to Chats
          </Button>
        </div>

        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Avatar name="Parth Sonavane" size="lg" isOnline={true} />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Parth Sonavane</h3>
              <p style={{ fontSize: '0.85rem', color: '#f07b42', fontWeight: 500 }}>System Owner</p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

          <Input label="Display Name" defaultValue="Parth Sonavane" />
          <Input label="Username" defaultValue="@parth" />
          <Input label="Bio / About" defaultValue="OnlyUs Owner & Maintainer" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <Button fullWidth variant="primary">Save Changes</Button>
            <Button fullWidth variant="danger" onClick={() => navigate('/')}>Log Out</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
