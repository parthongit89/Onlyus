import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';

export const LoginPage: React.FC = () => {
  const [inviteCode, setInviteCode] = useState('');
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const navigate = useNavigate();

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/auth/otp');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #38241b 0%, #0d0f12 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          backgroundColor: '#16191e',
          borderRadius: '24px',
          padding: '32px 28px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h2
          style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          Invite My Account
        </h2>
        <p
          style={{
            fontSize: '0.88rem',
            color: '#9da4b0',
            textAlign: 'center',
            marginBottom: '28px',
          }}
        >
          OnlyUs is strictly invitation-only.
        </p>

        <form onSubmit={handleRequestAccess} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            placeholder="Invite Token or Email"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
          <Input
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Access Passcode"
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />

          <div style={{ marginTop: '12px' }}>
            <Button fullWidth type="submit" size="lg">
              Request Access
            </Button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/auth/otp')}
            style={{ fontSize: '0.85rem', color: '#f07b42', fontWeight: 500 }}
          >
            Via Passcode / OTP Verification
          </button>
        </div>
      </div>
    </div>
  );
};
